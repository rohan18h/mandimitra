"""
MandiMitra — Python Database & Store
In-memory and JSON/SQLite persistent store with realistic Maharashtra seed dataset.
"""

import json
import os
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional

class Database:
    def __init__(self):
        self.data_file = os.path.join(os.path.dirname(__file__), 'data_store.json')
        self.active_farmer = {
            "id": "FARM-084",
            "name": "दत्तात्रय रामभाऊ पाटील (Dattatraya R. Patil)",
            "phone": "9822345678",
            "aadhaarMasked": "XXXX-XXXX-4812",
            "district": "ahilyanagar",
            "taluka": "Rahuri",
            "village": "Vambori",
            "landHoldingAcres": 4.5,
            "has712Extract": True,
            "bankLinkedAadhaar": True
        }
        self.districts = []
        self.crops = []
        self.centres = []
        self.slots = []
        self.bookings = []
        self.audit_logs = []
        self.sync_queue = []
        self.init_seed_data()
        self.load_from_disk()

    def init_seed_data(self):
        self.districts = [
            {"id": "ahilyanagar", "nameMr": "अहिल्यानगर (अहमदनगर)", "nameHi": "अहिल्यानगर (अहमदनगर)", "nameEn": "Ahilyanagar (Ahmednagar)"},
            {"id": "amravati", "nameMr": "अमरावती", "nameHi": "अमरावती", "nameEn": "Amravati"},
            {"id": "latur", "nameMr": "लातूर", "nameHi": "लातूर", "nameEn": "Latur"},
            {"id": "nashik", "nameMr": "नाशिक", "nameHi": "नासिक", "nameEn": "Nashik"},
            {"id": "jalgaon", "nameMr": "जळगाव", "nameHi": "जलगांव", "nameEn": "Jalgaon"}
        ]

        self.crops = [
            {
                "id": "soybean",
                "nameMr": "सोयाबीन (Soybean)",
                "nameHi": "सोयाबीन (Soybean)",
                "nameEn": "Soybean (Yellow)",
                "mspPerQuintal": 4892,
                "schemeName": "Price Support Scheme (PSS) Kharif 2026",
                "seasonStart": "2026-10-01",
                "seasonEnd": "2026-12-31",
                "maxMoisturePct": 12.0,
                "maxForeignMatterPct": 2.0,
                "icon": "🌱"
            },
            {
                "id": "cotton",
                "nameMr": "कापूस (Cotton)",
                "nameHi": "कपास (Cotton)",
                "nameEn": "Cotton (Medium Staple)",
                "mspPerQuintal": 7121,
                "schemeName": "CCI Minimum Support Price Kharif 2026",
                "seasonStart": "2026-10-15",
                "seasonEnd": "2027-02-28",
                "maxMoisturePct": 8.0,
                "maxForeignMatterPct": 3.0,
                "icon": "☁️"
            },
            {
                "id": "tur",
                "nameMr": "तूर / अरहर (Pigeon Pea)",
                "nameHi": "अरहर / तूर (Pigeon Pea)",
                "nameEn": "Tur / Arhar (Pigeon Pea)",
                "mspPerQuintal": 7550,
                "schemeName": "NAFED Price Support Scheme 2026-27",
                "seasonStart": "2026-12-01",
                "seasonEnd": "2027-03-31",
                "maxMoisturePct": 10.0,
                "maxForeignMatterPct": 1.5,
                "icon": "🌿"
            },
            {
                "id": "chana",
                "nameMr": "हरभरा / चणा (Gram)",
                "nameHi": "चना / ग्राम (Gram)",
                "nameEn": "Gram / Chana",
                "mspPerQuintal": 5440,
                "schemeName": "Rabi PSS Procurement 2026-27",
                "seasonStart": "2027-02-15",
                "seasonEnd": "2027-05-30",
                "maxMoisturePct": 10.0,
                "maxForeignMatterPct": 2.0,
                "icon": "🌾"
            }
        ]

        now = datetime.utcnow()
        self.centres = [
            {
                "id": "centre-1",
                "nameMr": "राहुरी तालुका शेतकरी सहकारी खरेदी-विक्री संघ",
                "nameHi": "राहुरी तालुका किसान सहकारी क्रय-विक्रय संघ",
                "nameEn": "Rahuri Taluka Farmers Coop Procurement Centre",
                "district": "ahilyanagar",
                "location": "Rahuri Factory Road, APMC Yard",
                "contactPhone": "02426-232411",
                "status": "OPEN",
                "statusReason": "नियमित खरेदी सुरू आहे",
                "lastUpdated": (now - timedelta(minutes=25)).isoformat() + "Z",
                "workingHours": "08:30 - 17:30",
                "weighingLines": 2,
                "avgMinutesPerFarmer": 15,
                "dailyCapacityQuintals": 800,
                "maxDailyFarmers": 40,
                "handledCrops": ["soybean", "tur", "cotton"],
                "waitingEstimateMinutes": 35
            },
            {
                "id": "centre-2",
                "nameMr": "कोपरगाव कृषी उत्पन्न बाजार समिती उपकेंद्र",
                "nameHi": "कोपरगांव कृषि उपज मंडी उपकेंद्र",
                "nameEn": "Kopargaon APMC Sub-Procurement Yard",
                "district": "ahilyanagar",
                "location": "Station Road, Kopargaon",
                "contactPhone": "02423-222145",
                "status": "OPEN",
                "statusReason": "आजची क्षमता पूर्णत्वाकडे",
                "lastUpdated": (now - timedelta(minutes=55)).isoformat() + "Z",
                "workingHours": "09:00 - 17:00",
                "weighingLines": 2,
                "avgMinutesPerFarmer": 18,
                "dailyCapacityQuintals": 650,
                "maxDailyFarmers": 32,
                "handledCrops": ["soybean", "cotton"],
                "waitingEstimateMinutes": 45
            },
            {
                "id": "centre-3",
                "nameMr": "अमरावती मुख्य कृषी बाजार खरेदी केंद्र",
                "nameHi": "अमरावती मुख्य कृषि उपज खरीद केंद्र",
                "nameEn": "Amravati Main APMC Procurement Centre",
                "district": "amravati",
                "location": "Cotton Market Road, Amravati",
                "contactPhone": "0721-2567890",
                "status": "OPEN",
                "statusReason": "सुरळीत कामकाज चालू आहे",
                "lastUpdated": (now - timedelta(minutes=15)).isoformat() + "Z",
                "workingHours": "08:00 - 18:00",
                "weighingLines": 3,
                "avgMinutesPerFarmer": 12,
                "dailyCapacityQuintals": 1200,
                "maxDailyFarmers": 60,
                "handledCrops": ["soybean", "cotton", "tur"],
                "waitingEstimateMinutes": 20
            },
            {
                "id": "centre-4",
                "nameMr": "लातूर डाळिंब व धान्य खरेदी केंद्र",
                "nameHi": "लातूर दलहन व अनाज खरीद केंद्र",
                "nameEn": "Latur Grain & Pulses Procurement Centre",
                "district": "latur",
                "location": "MIDC Road, Latur",
                "contactPhone": "02382-243511",
                "status": "DELAYED",
                "statusReason": "वजन काटा सर्व्हर तांत्रिक देखभाल सुरू (अंदाजे १ तास)",
                "lastUpdated": (now - timedelta(minutes=140)).isoformat() + "Z",
                "workingHours": "09:00 - 17:30",
                "weighingLines": 2,
                "avgMinutesPerFarmer": 20,
                "dailyCapacityQuintals": 700,
                "maxDailyFarmers": 35,
                "handledCrops": ["soybean", "tur", "chana"],
                "waitingEstimateMinutes": 75
            },
            {
                "id": "centre-5",
                "nameMr": "मालेगाव तालुका खरेदी-विक्री संघ",
                "nameHi": "मालेगांव तालुका क्रय-विक्रय संघ",
                "nameEn": "Malegaon Taluka Procurement Sangh",
                "district": "nashik",
                "location": "Camp Area, Malegaon",
                "contactPhone": "02554-232112",
                "status": "CLOSED",
                "statusReason": "साप्ताहिक सुट्टी / साठा निर्गती दिवस",
                "lastUpdated": (now - timedelta(minutes=300)).isoformat() + "Z",
                "workingHours": "09:00 - 17:00",
                "weighingLines": 1,
                "avgMinutesPerFarmer": 15,
                "dailyCapacityQuintals": 400,
                "maxDailyFarmers": 20,
                "handledCrops": ["soybean", "chana"],
                "waitingEstimateMinutes": 0
            }
        ]

        self.slots = [
            {"id": "slot-101", "centreId": "centre-1", "date": "2026-08-31", "timeWindow": "08:30 - 10:00", "capacity": 8, "booked": 6, "waitlist": []},
            {"id": "slot-102", "centreId": "centre-1", "date": "2026-08-31", "timeWindow": "10:00 - 11:30", "capacity": 8, "booked": 8, "waitlist": ["FARM-109"]},
            {"id": "slot-103", "centreId": "centre-1", "date": "2026-08-31", "timeWindow": "11:30 - 13:00", "capacity": 8, "booked": 5, "waitlist": []},
            {"id": "slot-104", "centreId": "centre-1", "date": "2026-08-31", "timeWindow": "13:30 - 15:00", "capacity": 8, "booked": 4, "waitlist": []},
            {"id": "slot-105", "centreId": "centre-1", "date": "2026-08-31", "timeWindow": "15:00 - 16:30", "capacity": 8, "booked": 3, "waitlist": []},
            {"id": "slot-201", "centreId": "centre-2", "date": "2026-08-31", "timeWindow": "09:00 - 10:30", "capacity": 6, "booked": 6, "waitlist": []},
            {"id": "slot-202", "centreId": "centre-2", "date": "2026-08-31", "timeWindow": "10:30 - 12:00", "capacity": 6, "booked": 6, "waitlist": []},
            {"id": "slot-301", "centreId": "centre-3", "date": "2026-08-31", "timeWindow": "08:00 - 10:00", "capacity": 15, "booked": 10, "waitlist": []},
            {"id": "slot-302", "centreId": "centre-3", "date": "2026-08-31", "timeWindow": "10:00 - 12:00", "capacity": 15, "booked": 12, "waitlist": []}
        ]

        self.bookings = [
            {
                "id": "MM-RAH-2026-084",
                "farmerId": "FARM-084",
                "farmerName": "दत्तात्रय रामभाऊ पाटील",
                "phone": "9822345678",
                "aadhaarMasked": "XXXX-XXXX-4812",
                "district": "ahilyanagar",
                "centreId": "centre-1",
                "cropId": "soybean",
                "estimatedQtyQuintals": 30,
                "date": "2026-08-31",
                "timeWindow": "10:00 - 11:30",
                "slotId": "slot-102",
                "status": "BOOKED",
                "createdAt": "2026-08-30T10:15:00.000Z",
                "qualityCheck": None,
                "actualWeightQuintals": None,
                "paymentRef": None,
                "history": [
                    {
                        "stage": "BOOKED",
                        "timestamp": "2026-08-30T10:15:00.000Z",
                        "actorRole": "farmer",
                        "noteMr": "राहुरी केंद्रावर १०:०० ते ११:३० दरम्यान वेळ आरक्षित केली.",
                        "noteHi": "राहुरी केंद्र पर १०:०० से ११:३० के बीच समय आरक्षित किया।",
                        "noteEn": "Slot reserved at Rahuri centre for 10:00 - 11:30 AM."
                    }
                ]
            },
            {
                "id": "MM-RAH-2026-081",
                "farmerId": "FARM-052",
                "farmerName": "ज्ञानेश्वर विठ्ठल तांबे",
                "phone": "9421098765",
                "aadhaarMasked": "XXXX-XXXX-2190",
                "district": "ahilyanagar",
                "centreId": "centre-1",
                "cropId": "soybean",
                "estimatedQtyQuintals": 45,
                "date": "2026-08-30",
                "timeWindow": "08:30 - 10:00",
                "slotId": "slot-101",
                "status": "PAYMENT_INITIATED",
                "createdAt": "2026-08-29T14:20:00.000Z",
                "qualityCheck": {
                    "moisturePct": 11.2,
                    "foreignMatterPct": 1.1,
                    "grade": "GRADE_A",
                    "inspectorName": "एस. के. काळे (ग्रेडर)",
                    "passed": True,
                    "rejectionReason": None
                },
                "actualWeightQuintals": 44.80,
                "paymentRef": "DBT-MH-2026-9812401",
                "history": [
                    {"stage": "BOOKED", "timestamp": "2026-08-29T14:20:00.000Z", "actorRole": "farmer", "noteMr": "टोकन नोंदणी पूर्ण.", "noteHi": "टोकन पंजीकरण पूर्ण।", "noteEn": "Token booked."},
                    {"stage": "ARRIVED", "timestamp": "2026-08-30T08:42:00.000Z", "actorRole": "staff", "noteMr": "केंद्रावर प्रत्यक्ष आगमन नोंदवले.", "noteHi": "केंद्र पर आगमन दर्ज।", "noteEn": "Arrived at centre."},
                    {"stage": "QUALITY_CHECKED", "timestamp": "2026-08-30T09:05:00.000Z", "actorRole": "staff", "noteMr": "आर्द्रता ११.२% - प्रत अ.", "noteHi": "नमी ११.२% - ग्रेड ए।", "noteEn": "Moisture 11.2% - Grade A."},
                    {"stage": "ACCEPTED", "timestamp": "2026-08-30T09:25:00.000Z", "actorRole": "staff", "noteMr": "एकूण वजन ४४.८० क्विंटल स्वीकारले.", "noteHi": "कुल वजन ४४.८० क्विंटल स्वीकृत।", "noteEn": "Accepted gross 44.80 Qt."},
                    {"stage": "PAYMENT_INITIATED", "timestamp": "2026-08-30T11:10:00.000Z", "actorRole": "staff", "noteMr": "डीबीटी प्रक्रिया सुरू.", "noteHi": "डीबीटी भुगतान चालू।", "noteEn": "Payment initiated."}
                ]
            }
        ]

        self.audit_logs = [
            {"id": "AUD-001", "timestamp": "2026-08-30T08:30:00.000Z", "actorRole": "staff", "actorName": "राजेंद्र देशमुख (केंद्र प्रमुख)", "action": "CENTRE_STATUS_UPDATED", "targetId": "centre-1", "details": "केंद्राची स्थिती 'सुरू' (OPEN) म्हणून चिन्हांकित केली."},
            {"id": "AUD-002", "timestamp": "2026-08-30T08:42:00.000Z", "actorRole": "staff", "actorName": "एस. के. काळे (ग्रेडर)", "action": "FARMER_ARRIVED", "targetId": "MM-RAH-2026-081", "details": "शेतकरी ज्ञानेश्वर विठ्ठल तांबे यांचे आगमन नोंदवले."},
            {"id": "AUD-003", "timestamp": "2026-08-30T09:05:00.000Z", "actorRole": "staff", "actorName": "एस. के. काळे (ग्रेडर)", "action": "QUALITY_INSPECTION_RECORDED", "targetId": "MM-RAH-2026-081", "details": "गुणवत्ता तपासणी: आर्द्रता ११.२% - प्रत अ (Grade A)."},
            {"id": "AUD-004", "timestamp": "2026-08-30T10:15:00.000Z", "actorRole": "farmer", "actorName": "दत्तात्रय रामभाऊ पाटील", "action": "TOKEN_BOOKED", "targetId": "MM-RAH-2026-084", "details": "राहुरी केंद्रासाठी ३० क्विंटल सोयाबीन वेळ बुक केली."}
        ]

    def add_audit_log(self, actor_role: str, actor_name: str, action: str, target_id: str, details: str):
        log_entry = {
            "id": f"AUD-{str(len(self.audit_logs) + 1).zfill(3)}",
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "actorRole": actor_role,
            "actorName": actor_name,
            "action": action,
            "targetId": target_id,
            "details": details
        }
        self.audit_logs.insert(0, log_entry)
        self.save_to_disk()
        return log_entry

    def save_to_disk(self):
        try:
            data = {
                "centres": self.centres,
                "slots": self.slots,
                "bookings": self.bookings,
                "auditLogs": self.audit_logs
            }
            with open(self.data_file, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"Error saving data store: {e}")

    def load_from_disk(self):
        if os.path.exists(self.data_file):
            try:
                with open(self.data_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    if "centres" in data: self.centres = data["centres"]
                    if "slots" in data: self.slots = data["slots"]
                    if "bookings" in data: self.bookings = data["bookings"]
                    if "auditLogs" in data: self.audit_logs = data["auditLogs"]
            except Exception as e:
                print(f"Error loading data store: {e}")

db = Database()
