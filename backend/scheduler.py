"""
MandiMitra — Python Capacity-Aware Scheduling Engine & Fairness Controller
Algorithmic visit slot allocation governed by real centre capacity and fairness rules.
"""

from typing import Dict, Any, Optional
from datetime import datetime
from backend.database import db

class CapacityScheduler:
    def check_readiness(self, farmer_profile: Dict[str, Any], crop_id: str, centre_id: str) -> Dict[str, Any]:
        crop = next((c for c in db.crops if c["id"] == crop_id), None)
        centre = next((c for c in db.centres if c["id"] == centre_id), None)

        today_str = datetime.utcnow().strftime('%Y-%m-%d')
        is_season_active = bool(crop and (not crop.get("seasonStart") or today_str >= crop["seasonStart"]) and (not crop.get("seasonEnd") or today_str <= crop["seasonEnd"]))

        is_registration_complete = bool(farmer_profile and farmer_profile.get("has712Extract") and farmer_profile.get("bankLinkedAadhaar"))

        farmer_id = farmer_profile.get("id") or farmer_profile.get("farmerId") if farmer_profile else None
        existing_active = next(
            (b for b in db.bookings if b["farmerId"] == farmer_id and b["status"] in ["BOOKED", "ARRIVED", "QUALITY_CHECKED"]),
            None
        )

        does_centre_handle_crop = bool(centre and crop_id in centre.get("handledCrops", []))

        status = "READY"
        summary_mr = "तुम्ही वेळ आणि टोकन बुक करण्यासाठी तयार आहात."
        summary_hi = "आप समय और टोकन बुक करने के लिए तैयार हैं।"
        summary_en = "You are ready to book a token."

        if not is_registration_complete:
            status = "MISSING_INFO"
            summary_mr = "७/१२ उतारा किंवा बँक खाते आधार लिंक माहिती अपूर्ण आहे."
            summary_hi = "खसरा/खतौनी नकल या बैंक खाता आधार लिंक जानकारी अधूरी है।"
            summary_en = "Land record (7/12) or Aadhaar bank linkage information missing."
        elif existing_active:
            status = "ACTIVE_TOKEN_EXISTS"
            summary_mr = f"तुमचे आधीच एक सक्रिय टोकन ({existing_active['id']}) चालू आहे. एका वेळी एकच सक्रिय टोकन अनुज्ञेय आहे."
            summary_hi = f"आपका पहले से ही एक सक्रिय टोकन ({existing_active['id']}) मौजूद है।"
            summary_en = f"You already have an active token ({existing_active['id']}). Only 1 active slot allowed."
        elif not does_centre_handle_crop:
            status = "VERIFY_CENTRE"
            summary_mr = "निवडलेल्या केंद्रावर हे पीक घेतले जात नाही."
            summary_hi = "चुने गए केंद्र पर इस फसल की खरीद नहीं होती।"
            summary_en = "Selected centre does not handle this crop."

        return {
            "status": status,
            "summaryMr": summary_mr,
            "summaryHi": summary_hi,
            "summaryEn": summary_en,
            "checks": [
                {"ruleKey": "ruleSeason", "passed": is_season_active, "note": crop.get("schemeName", "") if crop else ""},
                {"ruleKey": "ruleRegistration", "passed": is_registration_complete, "note": "7/12 & Aadhaar linked" if is_registration_complete else "Incomplete"},
                {"ruleKey": "ruleActiveToken", "passed": not existing_active, "note": f"Active: {existing_active['id']}" if existing_active else "No active booking (Fairness OK)"},
                {"ruleKey": "ruleCropMatch", "passed": does_centre_handle_crop, "note": centre.get("nameMr", "") if centre else ""}
            ]
        }

    def book_slot(self, request: Dict[str, Any]) -> Dict[str, Any]:
        farmer_profile = request.get("farmerProfile", db.active_farmer)
        centre_id = request.get("centreId")
        crop_id = request.get("cropId")
        slot_id = request.get("slotId")
        qty = float(request.get("estimatedQtyQuintals", 25))
        date = request.get("date", "2026-08-31")
        time_window = request.get("timeWindow", "10:00 - 11:30")

        readiness = self.check_readiness(farmer_profile, crop_id, centre_id)
        if readiness["status"] == "ACTIVE_TOKEN_EXISTS":
            return {
                "success": False,
                "errorKey": "activeTokenExists",
                "messageMr": readiness["summaryMr"],
                "messageHi": readiness["summaryHi"],
                "messageEn": readiness["summaryEn"]
            }

        slot = next((s for s in db.slots if s["id"] == slot_id), None)
        centre = next((c for c in db.centres if c["id"] == centre_id), None)

        if not slot or not centre:
            return {"success": False, "messageMr": "स्लॉट किंवा केंद्र आढळले नाही.", "messageEn": "Slot or Centre not found."}

        if centre.get("status") == "CLOSED":
            return {"success": False, "messageMr": "हे केंद्र आज बंद आहे.", "messageEn": "This centre is currently closed."}

        is_full = slot["booked"] >= slot["capacity"]
        if is_full:
            if "waitlist" not in slot: slot["waitlist"] = []
            if farmer_profile["id"] not in slot["waitlist"]:
                slot["waitlist"].append(farmer_profile["id"])
            db.save_to_disk()
            return {
                "success": True,
                "isWaitlisted": True,
                "slotId": slot["id"],
                "messageMr": "स्लॉट पूर्ण असल्याने आपले नाव प्रतीक्षा यादीत (Waitlist) नोंदवले गेले आहे.",
                "messageHi": "स्लॉट भर जाने के कारण आपका नाम प्रतीक्षा सूची में दर्ज किया गया है।",
                "messageEn": "Slot is full. You have been placed on the waitlist."
            }

        centre_code = centre["id"].replace("centre-", "C")
        token_number = f"MM-{centre_code.upper()}-2026-{str(len(db.bookings) + 101).zfill(3)}"

        new_booking = {
            "id": token_number,
            "farmerId": farmer_profile["id"],
            "farmerName": farmer_profile["name"],
            "phone": farmer_profile["phone"],
            "aadhaarMasked": farmer_profile.get("aadhaarMasked", "XXXX-XXXX-4812"),
            "district": centre["district"],
            "centreId": centre["id"],
            "cropId": crop_id,
            "estimatedQtyQuintals": qty,
            "date": date,
            "timeWindow": time_window,
            "slotId": slot["id"],
            "status": "BOOKED",
            "createdAt": datetime.utcnow().isoformat() + "Z",
            "qualityCheck": None,
            "actualWeightQuintals": None,
            "paymentRef": None,
            "history": [
                {
                    "stage": "BOOKED",
                    "timestamp": datetime.utcnow().isoformat() + "Z",
                    "actorRole": "farmer",
                    "noteMr": f"{centre['nameMr']} येथे {time_window} दरम्यान वेळ आरक्षित केली.",
                    "noteHi": f"{centre.get('nameHi', centre['nameMr'])} पर {time_window} के बीच समय आरक्षित किया।",
                    "noteEn": f"Slot reserved at {centre['nameEn']} for {time_window}."
                }
            ]
        }

        slot["booked"] += 1
        db.bookings.insert(0, new_booking)
        db.add_audit_log("farmer", farmer_profile["name"], "TOKEN_BOOKED", new_booking["id"], f"टोकन बुक केले: {centre['nameMr']}, पीक: {crop_id}, वेळ: {time_window}")
        db.save_to_disk()

        return {
            "success": True,
            "isWaitlisted": False,
            "booking": new_booking
        }

    def cancel_booking(self, booking_id: str, reason: str = "Cancelled by farmer") -> Dict[str, Any]:
        booking = next((b for b in db.bookings if b["id"] == booking_id), None)
        if not booking or booking["status"] == "CANCELLED":
            return {"success": False, "message": "Invalid booking"}

        booking["status"] = "CANCELLED"
        booking["history"].append({
            "stage": "CANCELLED",
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "actorRole": "farmer",
            "noteMr": f"टोकन रद्द केले. कारण: {reason}",
            "noteHi": f"टोकन रद्द किया गया। कारण: {reason}",
            "noteEn": f"Token cancelled. Reason: {reason}"
        })

        # Release slot capacity & promote waitlist
        slot = next((s for s in db.slots if s["id"] == booking.get("slotId")), None)
        if slot and slot["booked"] > 0:
            slot["booked"] -= 1
            if slot.get("waitlist") and len(slot["waitlist"]) > 0:
                promoted = slot["waitlist"].pop(0)
                db.add_audit_log("system", "Capacity Engine", "WAITLIST_PROMOTED", promoted, f"Farmer {promoted} promoted from waitlist.")

        db.add_audit_log("farmer", booking["farmerName"], "TOKEN_CANCELLED", booking["id"], reason)
        db.save_to_disk()

        return {"success": True, "messageMr": "टोकन यशस्वीरित्या रद्द करण्यात आले.", "messageEn": "Token cancelled successfully."}

scheduler = CapacityScheduler()
