"""
MandiMitra — Python Full-Stack Application with STT & TTS Engine
Flask REST API & Static Frontend Server for SIH26032
"""

import sys
import os
import io

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

from flask import Flask, jsonify, request, render_template, send_file
from flask_cors import CORS
from backend.database import db
from backend.scheduler import scheduler
from backend.voice_engine import voice_engine
from backend.audio_service import audio_service

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

# ----------------------------------------------------
# Jinja2 Template Rendering
# ----------------------------------------------------
@app.route("/")
def serve_index():
    return render_template("index.html", api_base="http://localhost:3000")

# ----------------------------------------------------
# Public & Farmer REST API Endpoints
# ----------------------------------------------------
@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "MandiMitra Python Civic Backend",
        "stt_tts_enabled": True,
        "centres_count": len(db.centres),
        "crops_count": len(db.crops)
    })

@app.route("/api/districts", methods=["GET"])
def get_districts():
    return jsonify(db.districts)

@app.route("/api/crops", methods=["GET"])
def get_crops():
    return jsonify(db.crops)

@app.route("/api/centres", methods=["GET"])
def get_centres():
    district = request.args.get("district")
    crop = request.args.get("crop")

    results = db.centres
    if district and district != "all":
        results = [c for c in results if c.get("district") == district]
    if crop and crop != "all":
        results = [c for c in results if crop in c.get("handledCrops", [])]

    return jsonify(results)

@app.route("/api/slots/<centre_id>", methods=["GET"])
def get_slots(centre_id):
    slots = [s for s in db.slots if s.get("centreId") == centre_id]
    return jsonify(slots)

@app.route("/api/readiness/check", methods=["POST"])
def check_readiness():
    data = request.get_json(force=True, silent=True) or {}
    farmer_profile = data.get("farmerProfile", db.active_farmer)
    crop_id = data.get("cropId", "soybean")
    centre_id = data.get("centreId", "centre-1")

    result = scheduler.check_readiness(farmer_profile, crop_id, centre_id)
    return jsonify(result)

@app.route("/api/bookings/reserve", methods=["POST"])
def reserve_slot():
    data = request.get_json(force=True, silent=True) or {}
    result = scheduler.book_slot(data)
    return jsonify(result)

@app.route("/api/bookings/cancel", methods=["POST"])
def cancel_slot():
    data = request.get_json(force=True, silent=True) or {}
    booking_id = data.get("bookingId")
    reason = data.get("reason", "Cancelled by farmer")
    result = scheduler.cancel_booking(booking_id, reason)
    return jsonify(result)

@app.route("/api/bookings/<booking_id>", methods=["GET"])
def get_booking(booking_id):
    booking = next((b for b in db.bookings if b["id"] == booking_id), None)
    if not booking:
        return jsonify({"error": "Booking not found"}), 404
    return jsonify(booking)

@app.route("/api/tracking/<query>", methods=["GET"])
def track_produce(query):
    query_clean = query.strip().lower()
    booking = next((b for b in db.bookings if b["id"].lower() == query_clean or b["phone"] == query_clean), None)
    if not booking:
        booking = db.bookings[0]
    return jsonify(booking)

# ----------------------------------------------------
# STT & TTS Voice Engine Endpoints
# ----------------------------------------------------
@app.route("/api/voice/parse", methods=["POST"])
def parse_voice_query():
    data = request.get_json(force=True, silent=True) or {}
    text = data.get("transcript", "")
    lang = data.get("lang", "mr")
    result = voice_engine.parse_query(text, lang)
    return jsonify(result)

@app.route("/api/voice/tts", methods=["POST"])
def generate_tts():
    """
    Generates high-fidelity Text-to-Speech audio in Marathi, Hindi, or English.
    Returns Base64 audio data URI or MP3 stream.
    """
    data = request.get_json(force=True, silent=True) or {}
    text = data.get("text", "")
    lang = data.get("lang", "mr")
    slow = bool(data.get("slow", False))
    return_base64 = bool(data.get("base64", True))

    if not text:
        return jsonify({"error": "No text provided"}), 400

    try:
        if return_base64:
            b64_audio = audio_service.text_to_speech_base64(text, lang, slow)
            return jsonify({
                "audioUrl": b64_audio,
                "text": text,
                "lang": lang,
                "slow": slow
            })
        else:
            audio_fp = audio_service.text_to_speech_bytes(text, lang, slow)
            return send_file(audio_fp, mimetype="audio/mpeg", as_attachment=False)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/voice/stt", methods=["POST"])
def transcribe_stt():
    """
    Accepts uploaded audio, transcribes speech-to-text, and returns structured NLU analysis.
    """
    lang = request.form.get("lang", "mr")
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file uploaded"}), 400

    audio_file = request.files['audio']
    transcript = audio_service.speech_to_text(audio_file, lang)
    parsed = voice_engine.parse_query(transcript, lang)
    parsed["transcript"] = transcript
    return jsonify(parsed)

# ----------------------------------------------------
# Procurement Centre Staff Endpoints
# ----------------------------------------------------
@app.route("/api/staff/centre-status", methods=["POST"])
def update_centre_status():
    data = request.get_json(force=True, silent=True) or {}
    centre_id = data.get("centreId")
    status = data.get("status")
    reason = data.get("reason", "Regular procurement")

    centre = next((c for c in db.centres if c["id"] == centre_id), None)
    if centre:
        centre["status"] = status
        centre["statusReason"] = reason
        db.add_audit_log("staff", "Centre Supervisor", "CENTRE_STATUS_UPDATED", centre_id, f"Status: {status} ({reason})")
        db.save_to_disk()
        return jsonify({"success": True, "centre": centre})
    return jsonify({"error": "Centre not found"}), 404

@app.route("/api/staff/quality-check", methods=["POST"])
def record_quality_check():
    data = request.get_json(force=True, silent=True) or {}
    booking_id = data.get("bookingId")
    moisture = float(data.get("moisturePct", 11.4))
    foreign_matter = float(data.get("foreignMatterPct", 1.2))
    grade = data.get("grade", "GRADE_A")
    rejection_reason = data.get("rejectionReason")

    booking = next((b for b in db.bookings if b["id"] == booking_id), None)
    if booking:
        is_recheck = grade == "RECHECK" or moisture > 12.0
        new_status = "RECHECK_REQUIRED" if is_recheck else "QUALITY_CHECKED"
        booking["status"] = new_status
        booking["qualityCheck"] = {
            "moisturePct": moisture,
            "foreignMatterPct": foreign_matter,
            "grade": grade,
            "inspectorName": "S. K. Kale (Grader)",
            "passed": not is_recheck,
            "rejectionReason": rejection_reason if is_recheck else None
        }
        db.add_audit_log("staff", "Grader", "QUALITY_INSPECTION_RECORDED", booking_id, f"Moisture: {moisture}%, Grade: {grade}")
        db.save_to_disk()
        return jsonify({"success": True, "booking": booking})
    return jsonify({"error": "Booking not found"}), 404

@app.route("/api/staff/weighing", methods=["POST"])
def record_weighing():
    data = request.get_json(force=True, silent=True) or {}
    booking_id = data.get("bookingId")
    weight = float(data.get("actualWeightQuintals", 25.0))

    booking = next((b for b in db.bookings if b["id"] == booking_id), None)
    if booking:
        booking["status"] = "ACCEPTED"
        booking["actualWeightQuintals"] = weight
        db.add_audit_log("staff", "Weighmaster", "WEIGHT_ACCEPTED", booking_id, f"Actual weight: {weight} Qt")
        db.save_to_disk()
        return jsonify({"success": True, "booking": booking})
    return jsonify({"error": "Booking not found"}), 404

@app.route("/api/staff/payment-dispatch", methods=["POST"])
def dispatch_payment():
    data = request.get_json(force=True, silent=True) or {}
    booking_id = data.get("bookingId")
    ref = f"DBT-MH-2026-{os.urandom(4).hex()}"

    booking = next((b for b in db.bookings if b["id"] == booking_id), None)
    if booking:
        booking["status"] = "PAYMENT_INITIATED"
        booking["paymentRef"] = ref
        db.add_audit_log("staff", "Manager", "PAYMENT_DISPATCH_TRIGGERED", booking_id, f"DBT Ref: {ref}")
        db.save_to_disk()
        return jsonify({"success": True, "paymentRef": ref, "booking": booking})
    return jsonify({"error": "Booking not found"}), 404

# ----------------------------------------------------
# District Administrator & Audit Trail Endpoints
# ----------------------------------------------------
@app.route("/api/admin/metrics", methods=["GET"])
def get_admin_metrics():
    total_centres = len(db.centres)
    active_centres = len([c for c in db.centres if c.get("status") == "OPEN"])
    total_bookings = len(db.bookings)
    total_quintals = sum(float(b.get("actualWeightQuintals") or b.get("estimatedQtyQuintals") or 0) for b in db.bookings)

    return jsonify({
        "totalCentres": total_centres,
        "activeCentres": active_centres,
        "totalBookings": total_bookings,
        "totalQuintals": total_quintals,
        "centres": db.centres
    })

@app.route("/api/admin/audit-logs", methods=["GET"])
def get_audit_logs():
    return jsonify(db.audit_logs)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 3000))
    print(f"MandiMitra Python Server running on http://localhost:{port}")
    app.run(host="0.0.0.0", port=port, debug=False, threaded=True)
