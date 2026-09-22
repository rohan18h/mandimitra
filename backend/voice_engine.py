"""
MandiMitra — Python Voice Engine & Procurement NLU (v2)
Extracts structured intents and entities from farmer queries in Marathi, Hindi & English.
Returns verified answers grounded strictly in the application database.

Supported Intents:
  CENTRE_STATUS     — Is centre open? What are the hours?
  CENTRE_WAIT       — How long is the wait? How busy is it?
  CENTRE_CONTACT    — What is the phone number / contact?
  CROP_AVAILABILITY — Is soybean / cotton / tur accepted?
  MSP_PRICE         — What is the MSP / rate for soybean?
  TOKEN_REQUEST     — I want to book a token for tomorrow
  DOCUMENTS_CHECKLIST — What documents do I need to bring?
  UNSUPPORTED       — Off-topic (weather, fertiliser, loan)
  UNKNOWN           — Could not classify
"""

import re
from typing import Dict, Any, Optional, List
from datetime import datetime, timedelta
from backend.database import db


def _mr(val, fb=""):
    return val if val else fb


class VoiceEngine:
    # ------------------------------------------------------------------ #
    # Entity extraction                                                    #
    # ------------------------------------------------------------------ #
    def extract_entities(self, text: str) -> Dict[str, Any]:
        lower = text.lower()
        entities = {
            "crop": None,
            "centre": None,
            "date": None,
            "dateFormatted": None,
            "timeWindow": None,
            "quantity": None,
            "tokenNumber": None,
        }

        # ── Crop matching (Marathi / Hindi / English) ──
        crop_map = [
            (["सोयाबीन", "soybean", "सोया"], 0),
            (["कापूस", "कपास", "cotton"], 1),
            (["तूर", "तुर", "अरहर", "pigeon pea", "tur", "arhar"], 2),
            (["हरभरा", "चना", "चणा", "gram", "chana", "chick"], 3),
        ]
        for keywords, idx in crop_map:
            if any(kw in lower for kw in keywords):
                entities["crop"] = db.crops[idx]
                break

        # ── Centre matching (Marathi / Hindi / English partial names) ──
        centre_map = [
            (["राहुरी", "rahuri"], 0),
            (["कोपरगाव", "kopargaon", "kopargoan"], 1),
            (["अमरावती", "amravati", "amrawati"], 2),
            (["लातूर", "latur", "lattur"], 3),
            (["मालेगाव", "malegaon", "malegoan"], 4),
        ]
        for keywords, idx in centre_map:
            if any(kw in lower for kw in keywords):
                entities["centre"] = db.centres[idx]
                break

        # ── Date normalization ──
        today = datetime.utcnow()
        if any(w in lower for w in ["उद्या", "कल", "tomorrow"]):
            d = today + timedelta(days=1)
            entities["date"] = d.strftime('%Y-%m-%d')
            entities["dateFormatted"] = d.strftime('%d %B %Y')
        elif any(w in lower for w in ["आज", "aaj", "today", "आता"]):
            entities["date"] = today.strftime('%Y-%m-%d')
            entities["dateFormatted"] = today.strftime('%d %B %Y')

        # ── Time Window ──
        if any(w in lower for w in ["सकाळी", "सुबह", "morning", "10 वाजता", "सकाळचे"]):
            entities["timeWindow"] = "10:00 - 11:30"
        elif any(w in lower for w in ["दुपारी", "दोपहर", "afternoon", "दुपार"]):
            entities["timeWindow"] = "13:30 - 15:00"
        elif any(w in lower for w in ["संध्याकाळी", "शाम", "evening"]):
            entities["timeWindow"] = "15:00 - 16:30"

        # ── Quantity ──
        num_match = re.search(r'\d+', text)
        if num_match:
            entities["quantity"] = int(num_match.group(0))

        # ── Token number ──
        tok_match = re.search(r'MM-[A-Z0-9]+-\d+-\d+', text, re.IGNORECASE)
        if tok_match:
            entities["tokenNumber"] = tok_match.group(0).upper()

        return entities

    # ------------------------------------------------------------------ #
    # Main NLU parser                                                      #
    # ------------------------------------------------------------------ #
    def parse_query(self, text: str, lang: str = "mr") -> Dict[str, Any]:
        lower = text.lower()
        entities = self.extract_entities(text)
        c = entities["centre"] or db.centres[0]          # resolved centre
        cr = entities["crop"] or db.crops[0]             # resolved crop

        # ── Guard: off-topic ──
        if any(w in lower for w in ["हवामान", "रोग", "खत", "कीटकनाशक",
                                     "कर्ज", "weather", "loan", "medicine",
                                     "fertilizer", "pesticide", "बियाणे", "seed"]):
            return self._unsupported(lang)

        # ── Intent 1: Contact / Phone Number ──
        contact_kws = [
            "फोन", "संपर्क", "नंबर", "दूरध्वनी", "फ़ोन", "पत्ता", "मोबाईल", "मोबाइल",
            "phone", "contact", "number", "call", "helpline", "address", "location"
        ]
        if any(w in lower for w in contact_kws):
            return self._intent_contact(c, lang)

        # ── Intent 2: Waiting Time / Queue ──
        wait_kws = [
            "प्रतीक्षा", "वाट", "किती वेळ", "रांग", "गर्दी", "गर्दि", "वेळ किती",
            "wait", "waiting", "queue", "how long", "busy", "crowd",
            "कितना समय", "कितनी देर", "भीड़", "प्रतीक्षा वेळ"
        ]
        if any(w in lower for w in wait_kws):
            return self._intent_wait_time(c, lang)

        # ── Intent 3: Capacity / How many farmers ──
        capacity_kws = [
            "क्षमता", "किती शेतकरी", "capacity", "how many farmers",
            "कितने किसान", "daily capacity", "आजची क्षमता"
        ]
        if any(w in lower for w in capacity_kws):
            return self._intent_capacity(c, lang)

        # ── Intent 4: MSP / Rate / Price ──
        price_kws = [
            "भाव", "दर", "किंमत", "मूल्य", "एमएसपी", "msp", "rate", "price",
            "minimum support", "किती रुपये", "कितने रुपये", "how much",
            "हमी भाव", "समर्थन मूल्य", "क्विंटल"
        ]
        if any(w in lower for w in price_kws):
            return self._intent_msp_price(cr, lang)

        # ── Intent 5: Documents Checklist ──
        doc_kws = [
            "कागदपत्रे", "कागद", "कागज", "दस्तावेज", "document",
            "7/12", "712", "सातबारा", "7-12", "aadhaar",
            "which document", "what documents", "what to bring",
            "काय आणायचे", "क्या लाना", "आवश्यक", "required"
        ]
        if any(w in lower for w in doc_kws):
            return self._intent_documents(lang)

        # ── Intent 6: Token Booking ──
        token_kws = [
            "टोकन हवे", "टोकन बुक", "टोकन हवे आहे", "वेळ हवी",
            "book token", "request token", "want a token", "i want token",
            "token chahiye", "token chahie", "टोकन चाहिए",
            "मला टोकन", "मुझे टोकन", "i need a token", "need token",
            "slot book", "स्लॉट", "slot", "register", "नोंदणी करा"
        ]
        token_combined = (
            ("टोकन" in lower and any(w in lower for w in ["उद्या", "कल", "tomorrow", "सकाळ", "सुबह", "morning", "हवे", "चाहिए", "बुक", "book", "आजचे", "नोंद"]))
            or ("token" in lower and any(w in lower for w in ["tomorrow", "morning", "need", "want", "book", "request", "today"]))
        )
        if any(w in lower for w in token_kws) or token_combined:
            return self._intent_token_request(c, cr, entities, lang)

        # ── Intent 7: Crop Acceptance ──
        crop_mentioned = any(w in lower for w in [
            "सोयाबीन", "कापूस", "तूर", "हरभरा", "चना", "चणा",
            "soybean", "cotton", "tur", "chana", "gram", "कपास", "अरहर"
        ])
        accept_kws = [
            "घेत", "स्वीकार", "accept", "ले रहे", "लेते", "buying",
            "procur", "खरेदी होत", "खरीद हो", "मिळेल", "milel", "घेतात"
        ]
        if crop_mentioned and any(w in lower for w in accept_kws):
            return self._intent_crop_availability(c, cr, lang)

        # ── Intent 8: Centre Status / Hours / Working ──
        status_kws = [
            "केंद्र", "उघडे", "चालू", "सुरू", "खुला", "खुली", "बंद", "विलंब",
            "open", "close", "closed", "status", "centre", "center", "procurement",
            "आज केंद्र", "kendra", "खरेदी केंद्र", "खरीद केंद्र",
            "kab tak", "कधी", "कामाची वेळ", "working hours", "what time",
            "delayed", "delay"
        ]
        if any(w in lower for w in status_kws):
            return self._intent_centre_status(c, lang)

        # ── Default fallback ──
        return self._fallback(lang)

    # ------------------------------------------------------------------ #
    # Intent handlers                                                      #
    # ------------------------------------------------------------------ #
    def _intent_centre_status(self, c: dict, lang: str) -> dict:
        status = c.get("status", "OPEN")
        is_open = status == "OPEN"
        is_delayed = status == "DELAYED"
        reason = c.get("statusReason", "")
        hours = c.get("workingHours", "09:00 - 17:00")
        wait = c.get("waitingEstimateMinutes", 0)

        if lang == "mr":
            if is_open:
                resp = f"हो. {c['nameMr']} येथे आज खरेदी सुरू आहे. कामाची वेळ {hours} आहे. अंदाजे प्रतीक्षा {wait} मिनिटे."
            elif is_delayed:
                resp = f"{c['nameMr']} येथे {reason} मुळे विलंब आहे. अपेक्षित प्रतीक्षा {wait} मिनिटे."
            else:
                resp = f"{c['nameMr']} आज बंद आहे. कारण: {reason}."
        elif lang == "hi":
            if is_open:
                resp = f"हाँ। {c.get('nameHi', c['nameMr'])} पर आज खरीद चालू है। समय: {hours}। अनुमानित प्रतीक्षा: {wait} मिनट।"
            elif is_delayed:
                resp = f"{c.get('nameHi', c['nameMr'])} पर विलंब है: {reason}। प्रतीक्षा: {wait} मिनट।"
            else:
                resp = f"{c.get('nameHi', c['nameMr'])} आज बंद है। कारण: {reason}।"
        else:
            if is_open:
                resp = f"{c['nameEn']} is open today. Hours: {hours}. Estimated wait: {wait} minutes."
            elif is_delayed:
                resp = f"{c['nameEn']} is experiencing a delay: {reason}. Expected wait: {wait} minutes."
            else:
                resp = f"{c['nameEn']} is closed today. Reason: {reason}."

        return {"intent": "CENTRE_STATUS", "understoodText": f"Status of {c['nameMr']}", "responseText": resp, "centreId": c["id"]}

    def _intent_wait_time(self, c: dict, lang: str) -> dict:
        wait = c.get("waitingEstimateMinutes", 0)
        farmers = c.get("maxDailyFarmers", 0)
        avg = c.get("avgMinutesPerFarmer", 15)

        if lang == "mr":
            resp = f"{c['nameMr']} येथे सध्या अंदाजे {wait} मिनिटांची प्रतीक्षा आहे. प्रत्येक शेतकऱ्यासाठी सरासरी {avg} मिनिटे लागतात. आजची दैनिक क्षमता {farmers} शेतकरी आहे."
        elif lang == "hi":
            resp = f"{c.get('nameHi', c['nameMr'])} पर अभी अनुमानित {wait} मिनट की प्रतीक्षा है। प्रत्येक किसान के लिए औसत {avg} मिनट लगते हैं।"
        else:
            resp = f"{c['nameEn']} current estimated wait is {wait} minutes. Average time per farmer: {avg} minutes. Daily capacity: {farmers} farmers."

        return {"intent": "CENTRE_WAIT", "understoodText": f"Wait time at {c['nameMr']}", "responseText": resp, "centreId": c["id"]}

    def _intent_contact(self, c: dict, lang: str) -> dict:
        phone = c.get("contactPhone", "N/A")
        loc = c.get("location", "")

        if lang == "mr":
            resp = f"{c['nameMr']} चा संपर्क क्रमांक: {phone}. पत्ता: {loc}."
        elif lang == "hi":
            resp = f"{c.get('nameHi', c['nameMr'])} का संपर्क नंबर: {phone}। पता: {loc}।"
        else:
            resp = f"Contact for {c['nameEn']}: Phone {phone}. Location: {loc}."

        return {"intent": "CENTRE_CONTACT", "understoodText": f"Contact for {c['nameMr']}", "responseText": resp, "centreId": c["id"]}

    def _intent_msp_price(self, cr: dict, lang: str) -> dict:
        msp = cr.get("mspPerQuintal", 0)
        scheme = cr.get("schemeName", "")
        season_end = cr.get("seasonEnd", "")

        if lang == "mr":
            resp = f"{cr['nameMr']} चा आधारभूत किंमत (MSP) ₹{msp} प्रति क्विंटल आहे. योजना: {scheme}. खरेदी हंगाम: {season_end} पर्यंत."
        elif lang == "hi":
            resp = f"{cr.get('nameHi', cr['nameMr'])} का न्यूनतम समर्थन मूल्य (MSP) ₹{msp} प्रति क्विंटल है। योजना: {scheme}।"
        else:
            resp = f"MSP for {cr['nameEn']} is ₹{msp} per quintal under {scheme}. Season ends: {season_end}."

        return {"intent": "MSP_PRICE", "understoodText": f"MSP for {cr['nameMr']}", "responseText": resp}

    def _intent_crop_availability(self, c: dict, cr: dict, lang: str) -> dict:
        is_handled = cr["id"] in c.get("handledCrops", [])
        moisture = cr.get("maxMoisturePct", 12)

        if lang == "mr":
            if is_handled:
                resp = f"हो. {c['nameMr']} येथे {cr['nameMr']} ची खरेदी सुरू आहे. कमाल आर्द्रता मर्यादा {moisture}% असावी."
            else:
                resp = f"नाही. {c['nameMr']} येथे {cr['nameMr']} खरेदी होत नाही. कोपरगाव किंवा अमरावती केंद्र तपासा."
        elif lang == "hi":
            if is_handled:
                resp = f"हाँ। {c.get('nameHi', c['nameMr'])} पर {cr.get('nameHi', cr['nameMr'])} की खरीद हो रही है। नमी सीमा {moisture}% है।"
            else:
                resp = f"नहीं। {c.get('nameHi', c['nameMr'])} पर {cr.get('nameHi', cr['nameMr'])} की खरीद नहीं होती।"
        else:
            if is_handled:
                resp = f"Yes, {cr['nameEn']} is accepted at {c['nameEn']}. Max moisture: {moisture}%."
            else:
                resp = f"No, {cr['nameEn']} is not procured at {c['nameEn']}. Try Kopargaon or Amravati centre."

        return {"intent": "CROP_AVAILABILITY", "understoodText": f"{cr['nameMr']} @ {c['nameMr']}", "responseText": resp}

    def _intent_token_request(self, c: dict, cr: dict, entities: dict, lang: str) -> dict:
        date_fmt = entities["dateFormatted"] or ("उद्या" if lang == "mr" else ("कल" if lang == "hi" else "Tomorrow"))
        time_win = entities["timeWindow"] or "10:00 - 11:30"

        if lang == "mr":
            resp = f"मी समजलो की तुम्हाला {c['nameMr']} येथे {cr['nameMr']} साठी {date_fmt} रोजी {time_win} चे टोकन हवे आहे. खालील पुष्टी करण्यासाठी 'पुष्टी करा' वर दाबा."
        elif lang == "hi":
            resp = f"समझ आया: {c.get('nameHi', c['nameMr'])} पर {cr.get('nameHi', cr['nameMr'])} के लिए {date_fmt} को {time_win} का टोकन। नीचे पुष्टि करें।"
        else:
            resp = f"Understood: You need a token at {c['nameEn']} for {cr['nameEn']} on {date_fmt} at {time_win}. Please confirm below."

        card = {
            "title": "टोकन आरक्षण पुष्टीकरण",
            "centreId": c["id"],
            "centreName": c["nameMr"],
            "cropId": cr["id"],
            "cropName": cr["nameMr"],
            "date": date_fmt,
            "time": time_win,
            "actionType": "BOOK_TOKEN"
        }
        return {"intent": "TOKEN_REQUEST", "understoodText": f"Book Token for {cr['nameMr']}", "responseText": resp, "confirmationCard": card}

    def _intent_documents(self, lang: str) -> dict:
        if lang == "mr":
            resp = ("केंद्रावर खालील कागदपत्रे सोबत आणा:\n"
                    "१. चालू वर्षाची पीक नोंद असलेला मूळ ७/१२ उतारा\n"
                    "२. आधार कार्ड व आधार-लिंक बँक पासबुक प्रत\n"
                    "३. ई-पीक पाहणी नोंदणी पावती\n"
                    "४. पीक विमा पावती (उपलब्ध असल्यास)")
        elif lang == "hi":
            resp = ("केंद्र पर निम्नलिखित दस्तावेज़ साथ लाएं:\n"
                    "१. मौजूदा फसल की खसरा/खतौनी नकल\n"
                    "२. आधार कार्ड और आधार-लिंक बैंक पासबुक\n"
                    "३. ई-पीक पंजीकरण रसीद\n"
                    "४. फसल बीमा रसीद (यदि उपलब्ध हो)")
        else:
            resp = ("Bring these documents to the centre:\n"
                    "1. Latest 7/12 land record with current crop entry\n"
                    "2. Aadhaar card and Aadhaar-linked bank passbook\n"
                    "3. e-Peek registration receipt\n"
                    "4. Crop insurance receipt (if available)")
        return {"intent": "DOCUMENTS_CHECKLIST", "understoodText": "Documents Required", "responseText": resp}

    def _intent_capacity(self, c: dict, lang: str) -> dict:
        cap = c.get("maxDailyFarmers", 0)
        qt = c.get("dailyCapacityQuintals", 0)
        lines = c.get("weighingLines", 1)

        if lang == "mr":
            resp = f"{c['nameMr']} येथे दैनिक क्षमता {cap} शेतकरी आणि {qt} क्विंटल आहे. {lines} वजन काटे कार्यरत आहेत."
        elif lang == "hi":
            resp = f"{c.get('nameHi', c['nameMr'])} की दैनिक क्षमता {cap} किसान और {qt} क्विंटल है। {lines} तुला कार्यरत हैं।"
        else:
            resp = f"{c['nameEn']} daily capacity: {cap} farmers, {qt} quintals. {lines} weighing lines operating."

        return {"intent": "CENTRE_CAPACITY", "understoodText": f"Capacity of {c['nameMr']}", "responseText": resp, "centreId": c["id"]}

    def _unsupported(self, lang: str) -> dict:
        if lang == "mr":
            msg = "माफ करा, मी फक्त खरेदी केंद्र, टोकन, कागदपत्रे, MSP दर आणि मालाच्या स्थितीबद्दल माहिती देऊ शकतो."
        elif lang == "hi":
            msg = "माफ़ कीजिए, मैं केवल खरीद केंद्र, टोकन, दस्तावेज, MSP दर और उपज की स्थिति के बारे में जानकारी दे सकता हूँ।"
        else:
            msg = "Sorry, I can only help with procurement centres, tokens, documents, MSP prices, and produce status."
        return {"intent": "UNSUPPORTED", "understoodText": "Unsupported query", "responseText": msg}

    def _fallback(self, lang: str) -> dict:
        if lang == "mr":
            fallback = ("मला नीट समजले नाही. खालील प्रश्न विचारून पाहा:\n"
                        "• 'राहुरी केंद्र आज उघडे आहे का?'\n"
                        "• 'सोयाबीन खरेदी होत आहे का?'\n"
                        "• 'प्रतीक्षा वेळ किती आहे?'\n"
                        "• 'MSP भाव काय आहे?'\n"
                        "• 'कागदपत्रे कोणती आणायची?'\n"
                        "• 'टोकन हवे'")
        elif lang == "hi":
            fallback = ("ठीक से समझ नहीं आया। इनमें से कुछ पूछें:\n"
                        "• 'राहुरी केंद्र खुला है क्या?'\n"
                        "• 'सोयाबीन ले रहे हैं क्या?'\n"
                        "• 'कितनी देर प्रतीक्षा करनी होगी?'\n"
                        "• 'MSP दर क्या है?'\n"
                        "• 'कागजात कौन से चाहिए?'\n"
                        "• 'टोकन चाहिए'")
        else:
            fallback = ("Could not understand your query. Try asking:\n"
                        "• 'Is Rahuri centre open today?'\n"
                        "• 'Is soybean being accepted?'\n"
                        "• 'How long is the waiting time?'\n"
                        "• 'What is the MSP for cotton?'\n"
                        "• 'Which documents do I need?'\n"
                        "• 'I need a token for tomorrow morning'")
        return {"intent": "UNKNOWN", "understoodText": "Unrecognized query", "responseText": fallback}


voice_engine = VoiceEngine()
