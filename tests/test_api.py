"""
MandiMitra — Python Backend Integration & STT/TTS Validation Suite
"""

import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

import unittest
from app import app

class TestMandiMitraAPI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = app.test_client()

    def test_01_health(self):
        res = self.client.get("/api/health")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data.get("status"), "healthy")
        self.assertTrue(data.get("stt_tts_enabled"))
        print("[PASS] Health Check with STT & TTS Enabled")

    def test_02_districts(self):
        res = self.client.get("/api/districts")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(len(data), 5)
        print(f"[PASS] Districts Check ({len(data)} districts)")

    def test_03_crops(self):
        res = self.client.get("/api/crops")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(len(data), 4)
        print(f"[PASS] Crops Check ({len(data)} crops)")

    def test_04_centres(self):
        res = self.client.get("/api/centres")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertGreaterEqual(len(data), 5)
        print(f"[PASS] Centres Check ({len(data)} centres)")

    def test_05_voice_marathi_nlu(self):
        res = self.client.post("/api/voice/parse", json={
            "transcript": "राहुरी केंद्र आज चालू आहे का?",
            "lang": "mr"
        })
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertIn("राहुरी", data.get("responseText", ""))
        print(f"[PASS] Voice Marathi NLU: {data.get('responseText')}")

    def test_06_tts_marathi(self):
        res = self.client.post("/api/voice/tts", json={
            "text": "हो. राहुरी खरेदी केंद्र आज चालू आहे.",
            "lang": "mr"
        })
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data.get("audioUrl", "").startswith("data:audio/mp3;base64,"))
        print(f"[PASS] Marathi TTS Generation: audio length={len(data.get('audioUrl'))}")

    def test_07_tts_hindi(self):
        res = self.client.post("/api/voice/tts", json={
            "text": "हाँ, राहुरी खरीद केंद्र आज खुला है।",
            "lang": "hi"
        })
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data.get("audioUrl", "").startswith("data:audio/mp3;base64,"))
        print(f"[PASS] Hindi TTS Generation: audio length={len(data.get('audioUrl'))}")

    def test_08_tts_english(self):
        res = self.client.post("/api/voice/tts", json={
            "text": "Yes, Rahuri procurement centre is open today.",
            "lang": "en"
        })
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data.get("audioUrl", "").startswith("data:audio/mp3;base64,"))
        print(f"[PASS] English TTS Generation: audio length={len(data.get('audioUrl'))}")

    def test_09_readiness_check(self):
        res = self.client.post("/api/readiness/check", json={
            "farmerProfile": {
                "farmerId": "FARM-084",
                "registeredCrops": ["soybean"]
            },
            "cropId": "soybean",
            "centreId": "centre-1"
        })
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertIn("status", data)
        print(f"[PASS] Readiness Check: status={data.get('status')}")

    def test_10_admin_metrics(self):
        res = self.client.get("/api/admin/metrics")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertGreaterEqual(data.get("totalCentres"), 5)
        print(f"[PASS] Admin Metrics: Total Centres={data.get('totalCentres')}")

if __name__ == "__main__":
    print("Testing MandiMitra Python Backend & STT/TTS Endpoints...")
    unittest.main(verbosity=0)
