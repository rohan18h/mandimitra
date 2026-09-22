# 🌾 MandiMitra (मंडीमित्र / मंडी मित्र) — Python Full-Stack Platform

> **SIH Problem Statement SIH26032:** Farmers wasting hours waiting at procurement centres.  
> **Tagline:** *बोलून विचारा. योग्य वेळ जाणून घ्या. खात्रीने जा.* (Ask by voice. Know the right time. Travel with confidence.)

---

## 🏛️ System Architecture

MandiMitra is built with a **Python Backend (Flask + SQLite/JSON Data Store)**, mathematical **Capacity Allocation Engine**, **7-Layer Marathi Voice Assistant**, and **Trilingual Mobile-First Civic Design** (**मराठी**, **हिन्दी**, **English**).

```
MandiMitra/
├── app.py                   # Main Flask REST API & Web Application Server
├── run.py                   # Single-command server launcher
├── requirements.txt         # Python dependencies (Flask, Flask-CORS, Werkzeug)
│
├── backend/
│   ├── __init__.py          # Package initialization
│   ├── models.py            # Domain models (Dataclasses for Farmer, Crop, Centre, Slot, Booking)
│   ├── database.py          # Persistent data store with Maharashtra seed data & audit logs
│   ├── scheduler.py         # Capacity-Aware Scheduling Engine & Fairness Controller (Python)
│   └── voice_engine.py      # Python NLU Intent Classifier & Entity Normalization Engine
│
├── tests/
│   └── test_api.py          # Automated Python REST API test suite
│
├── css/
│   ├── design-system.css    # Core design tokens, responsive typography, accessible palette
│   ├── farmer.css           # Mobile-first farmer view, voice modal, audio controls, token pass
│   ├── staff.css            # Staff dashboard, arrival queue, quality inspection modal
│   └── admin.css            # District load monitor, capacity gauges, audit log table
│
├── js/
│   ├── app.js               # Frontend bootstrapper & coordinator
│   ├── i18n.js              # Trilingual localization dictionary (मराठी, हिन्दी, English)
│   ├── store.js             # Client reactive store
│   ├── db.js                # Local storage & offline sync queue
│   ├── scheduler.js         # Client capacity calculator
│   ├── voice.js             # 7-layer Web Speech & TTS controller
│   ├── components/          # Navbar, Notifications, VoiceModal
│   └── views/               # FarmerView, StaffView, AdminView
│
└── index.html               # Main entry HTML
```

---

## 🚀 Running the Python Project

### 1. Install Dependencies
```bash
python -m pip install -r requirements.txt
```

### 2. Start the Full-Stack Server
```bash
python run.py
```
*The server will start at **http://localhost:3000/**.*

### 3. Run Automated Tests
```bash
python tests/test_api.py
```

---

## 📡 Python REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status & summary counts |
| `GET` | `/api/districts` | List authorized procurement districts |
| `GET` | `/api/crops` | List MSP-supported crops with moisture thresholds |
| `GET` | `/api/centres` | Filtered list of centres with live status and waiting time |
| `GET` | `/api/slots/<centre_id>` | Capacity-governed time slots for a centre |
| `POST` | `/api/readiness/check` | Preliminary digital readiness assessment |
| `POST` | `/api/bookings/reserve` | Capacity-aware token booking (enforces 1-token fairness) |
| `POST` | `/api/bookings/cancel` | Token cancellation with automatic waitlist re-allocation |
| `GET` | `/api/bookings/<id>` | Fetch token pass and queue details |
| `GET` | `/api/tracking/<query>` | 5-stage produce status timeline |
| `POST` | `/api/voice/parse` | Python NLU intent classifier & entity extractor |
| `POST` | `/api/staff/centre-status` | Update live centre state (`OPEN`, `DELAYED`, `CLOSED`) |
| `POST` | `/api/staff/quality-check` | Record moisture meter reading & quality grade |
| `POST` | `/api/staff/weighing` | Record actual net weight in quintals |
| `POST` | `/api/staff/payment-dispatch` | Trigger DBT direct bank transfer reference |
| `GET` | `/api/admin/metrics` | District capacity load overview & utilization gauges |
| `GET` | `/api/admin/audit-logs` | Immutable audit trail with actor roles and timestamps |

---

## 🌾 Verified Procurement Rules & Non-Guarantee Disclaimers
1. **Preliminary Digital Screening**: Online check does not guarantee final MSP acceptance.
2. **Physical Acceptance & Electronic Weighing**: Official quality grading (moisture meter, foreign matter) and weighing happen on-site at the authorised centre.
3. **Capacity Allocation Fairness**: Tokens are allocated based on active weighing lines and service durations:
   $$\text{Slot Capacity} = \left\lfloor \frac{\text{Slot Duration}}{\text{Avg Service Mins}} \right\rfloor \times \text{Weighing Lines}$$
4. **Fair Access Limit**: 1 active token per registered farmer at a time.
