/**
 * MandiMitra — Top-Notch, Ultra-Glossy React 18 Application with STT & TTS
 * Integrated with Python Server-Side STT & TTS (gTTS + SpeechRecognition)
 * Pixel-Perfect Layouts, Glowing Micro-Interactions, 3D Elevation & Rich Depth.
 * Trilingual: Marathi (मराठी), Hindi (हिन्दी), English.
 */

const { useState, useEffect, useMemo, useRef, useCallback } = React;

// -----------------------------------------------------------------------------
// SVG Icon Components (Lucide-Inspired Clean Vectors)
// -----------------------------------------------------------------------------
const Icons = {
  Mic: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>,
  Building: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M16 18h.01"/></svg>,
  Ticket: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>,
  Scale: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>,
  Clock: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  MapPin: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>,
  Phone: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  ShieldCheck: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>,
  Sparkles: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>,
  Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Check: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  ArrowRight: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  Printer: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>,
  Volume2: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
};

// -----------------------------------------------------------------------------
// Trilingual Localization Dictionary
// -----------------------------------------------------------------------------
const I18N = {
  mr: {
    appTitle: "मंडीमित्र",
    tagline: "बोलून विचारा. योग्य वेळ जाणून घ्या. खात्रीने जा.",
    farmerRole: "शेतकरी",
    staffRole: "कर्मचारी",
    adminRole: "अधिकारी",
    heroVoiceTitle: "मराठीत विचारा — Ask in Marathi",
    heroVoiceSub: "खरेदी केंद्र, वेळ, कागदपत्रे किंवा मालाच्या स्थितीबद्दल बोलून विचारा.",
    activeBooking: "तुमची नियोजित भेट",
    noActiveBooking: "केंद्रावर जाण्यापूर्वी सद्यस्थिती जाणून घ्या",
    noActiveBookingSub: "वेळ व स्लॉट आरक्षित करून विनाअडथळा खरेदीचा लाभ घ्या.",
    checkCentres: "खरेदी केंद्र व सद्यस्थिती",
    checkCentresDesc: "जवळचे केंद्र चालू आहे का आणि गर्दी किती आहे ते तपासा.",
    bookToken: "वेळ व टोकन आरक्षण",
    bookTokenDesc: "काट्यावरील क्षमतेनुसार सोयीची वेळ निश्चित करा.",
    trackProduce: "जमा मालाची स्थिती ट्रॅक करा",
    trackProduceDesc: "वजन, प्रतवारी आणि DBT पेमेंटची थेट स्थिती पहा.",
    searchCentres: "अधिकृत शासकीय खरेदी केंद्र शोध",
    filterDistrict: "जिल्हा निवडा",
    filterCrop: "पीक निवडा",
    allDistricts: "सर्व जिल्हे",
    allCrops: "सर्व पिके",
    openToday: "आज खरेदी सुरू",
    delayed: "तांत्रिक देखभाल / विलंब",
    closed: "आज केंद्र बंद",
    estWaitTime: "अंदाजे प्रतीक्षा",
    workingHours: "कामाची वेळ",
    weighingScales: "कार्यरत वजन काटे",
    staleWarning: "माहिती २ तासांपेक्षा जुनी असू शकते",
    readinessTitle: "केंद्रावर जाण्यापूर्वी प्राथमिक तयारी",
    readyToVisit: "तयारी पूर्ण — टोकन बुक करा",
    bookingWizardTitle: "क्षमता-आधारित टोकन आरक्षण",
    quantityQuintals: "अंदाजे वजन (क्विंटल)",
    chooseSlot: "सोयीची वेळ निवडा",
    slotsFull: "क्षमता पूर्ण (प्रतीक्षा यादी उपलब्ध)",
    confirmBooking: "टोकन आरक्षण निश्चित करा",
    tokenPassTitle: "अधिकृत भेट व रांग टोकन पावती",
    scanQR: "प्रवेशद्वारावर हा QR कोड दाखवा",
    documentsChecklist: "सोबत आणायची आवश्यक कागदपत्रे",
    doc1: "१. चालू वर्षाची पीक नोंद असलेला मूळ ७/१२ उतारा",
    doc2: "२. आधार कार्ड व आधार लिंक बँक पासबुक प्रत",
    doc3: "३. ई-पीक पाहणी नोंदणी पावती",
    cancelToken: "टोकन रद्द करा",
    downloadSlip: "पावती डाऊनलोड / प्रिंट",
    timelineTitle: "जमा मालाची ५-टप्प्यांची थेट स्थिती",
    stage1: "१. वेळ व टोकन आरक्षित",
    stage2: "२. केंद्रावर आगमन नोंदवले",
    stage3: "३. गुणवत्ता व आर्द्रता तपासणी",
    stage4: "४. वजन काट्यावर स्वीकृती",
    stage5: "५. DBT पेमेंट प्रक्रिया सुरू",
    disclaimer: "अंतिम गुणवत्ता, वजन व हमीभाव स्वीकृतीचा निर्णय केंद्रावरील प्रत्यक्ष तपासणीनंतरच घेतला जाईल.",
    voiceListening: "ऐकत आहे...",
    voiceTapToSpeak: "बोलण्यासाठी माईक दाबा",
    voicePromptHelp: "खरेदी केंद्र, टोकन किंवा मालाच्या स्थितीबद्दल बोला:",
    voiceRecognized: "तुम्ही विचारलेला प्रश्न:",
    voiceEdit: "मजकूर बदला",
    voiceSpeakAgain: "पुन्हा बोला",
    voiceConfirm: "पुष्टी करा",
    voiceClose: "व्हॉइस सहाय्यक बंद करा",
    adminLoadMonitor: "जिल्हा केंद्र भार व क्षमता नियंत्रण",
    auditLog: "अपरिवर्तनीय ऑडिट नोंदी",
    privacyNote: "तुमचा आवाज फक्त हा प्रश्न समजून घेण्यासाठी वापरला जातो. रेकॉर्डिंग साठवले जात नाही."
  },
  hi: {
    appTitle: "मंडीमित्र",
    tagline: "बोलकर पूछें। सही समय जानें। भरोसे के साथ जाएं।",
    farmerRole: "किसान",
    staffRole: "कर्मचारी",
    adminRole: "अधिकारी",
    heroVoiceTitle: "आवाज़ में पूछें — Speak by Voice",
    heroVoiceSub: "खरीद केंद्र, समय, दस्तावेज या उपज की स्थिति बोलकर जानें।",
    activeBooking: "आपकी निर्धारित भेंट",
    noActiveBooking: "केंद्र जाने से पहले सटीक स्थिति जानें",
    noActiveBookingSub: "समय और टोकन आरक्षित करके बिना भीड़ के फसल बेचें।",
    checkCentres: "खरीद केंद्र व स्थिति",
    checkCentresDesc: "नजदीकी केंद्र खुला है या नहीं तथा प्रतीक्षा समय जानें।",
    bookToken: "समय व टोकन आरक्षण",
    bookTokenDesc: "कांटा क्षमता के अनुसार अपनी सुविधानुसार समय चुनें।",
    trackProduce: "उपज स्थिति ट्रैक करें",
    trackProduceDesc: "वजन, ग्रेडिंग और डीबीटी भुगतान की लाइव स्थिति देखें।",
    searchCentres: "अधिकृत सरकारी खरीद केंद्र खोजें",
    filterDistrict: "जिला चुनें",
    filterCrop: "फसल चुनें",
    allDistricts: "सभी जिले",
    allCrops: "सभी फसलें",
    openToday: "आज खरीद चालू",
    delayed: "तकनीकी रखरखाव / विलंब",
    closed: "आज केंद्र बंद",
    estWaitTime: "अनुमानित प्रतीक्षा",
    workingHours: "कार्य समय",
    weighingScales: "सक्रिय वजन कांटे",
    staleWarning: "जानकारी २ घंटे से पुरानी हो सकती है",
    readinessTitle: "केंद्र जाने से पहले प्रारंभिक तैयारी",
    readyToVisit: "तैयारी पूर्ण — टोकन बुक करें",
    bookingWizardTitle: "क्षमता-आधारित टोकन आरक्षण",
    quantityQuintals: "अनुमानित वजन (क्विंटल)",
    chooseSlot: "सुविधानुसार समय स्लॉट चुनें",
    slotsFull: "क्षमता पूर्ण (प्रतीक्षा सूची उपलब्ध)",
    confirmBooking: "टोकन आरक्षण पक्का करें",
    tokenPassTitle: "अधिकृत भेंट पर्ची व टोकन पास",
    scanQR: "प्रवेश द्वार पर यह क्यूआर कोड दिखाएं",
    documentsChecklist: "साथ लाने हेतु आवश्यक दस्तावेज",
    doc1: "१. चालू फसल प्रविष्टि वाली मूल खसरा/खतौनी नकल",
    doc2: "२. आधार कार्ड व आधार लिंक बैंक पासबुक फोटोकॉपी",
    doc3: "३. किसान पंजीकरण व ई-उपार्जन पर्ची",
    cancelToken: "टोकन रद्द करें",
    downloadSlip: "पर्ची डाउनलोड / प्रिंट",
    timelineTitle: "उपज की ५-स्तरीय लाइव स्थिति",
    stage1: "१. समय व टोकन आरक्षित",
    stage2: "२. केंद्र पर आगमन दर्ज",
    stage3: "३. गुणवत्ता व नमी जांच",
    stage4: "४. वजन कांटे पर स्वीकृति",
    stage5: "५. डीबीटी भुगतान प्रक्रिया चालू",
    disclaimer: "अंतिम गुणवत्ता, वजन व एमएसपी स्वीकृति का निर्णय केंद्र पर भौतिक निरीक्षण के बाद ही होगा।",
    voiceListening: "सुन रहा हूँ...",
    voiceTapToSpeak: "बोलने के लिए माइक दबाएं",
    voicePromptHelp: "खरीद केंद्र, टोकन या फसल स्थिति के बारे में बोलें:",
    voiceRecognized: "पहचाना गया प्रश्न:",
    voiceEdit: "टेक्स्ट बदलें",
    voiceSpeakAgain: "दोबारा बोलें",
    voiceConfirm: "पुष्टि करें",
    voiceClose: "आवाज़ सहायक बंद करें",
    adminLoadMonitor: "जिला खरीद केंद्र भार व भीड़ नियंत्रण",
    auditLog: "अपरिवर्तनीय ऑडिट रिकॉर्ड",
    privacyNote: "आपकी आवाज़ केवल इस अनुरोध को समझने हेतु प्रयुक्त होती है। रिकॉर्डिंग सुरक्षित नहीं की जाती।"
  },
  en: {
    appTitle: "MandiMitra",
    tagline: "Ask by voice. Know the right time. Travel with confidence.",
    farmerRole: "Farmer",
    staffRole: "Staff",
    adminRole: "Admin",
    heroVoiceTitle: "Ask by Voice — मराठी / हिन्दी / English",
    heroVoiceSub: "Check procurement centres, time slots, documents, or produce status.",
    activeBooking: "Your Scheduled Visit",
    noActiveBooking: "Know Before You Travel",
    noActiveBookingSub: "Check real-time capacity and reserve a slot before travelling.",
    checkCentres: "Centres & Live Status",
    checkCentresDesc: "Check operating status, crop acceptance, and estimated wait time.",
    bookToken: "Capacity-Aware Token",
    bookTokenDesc: "Choose an arrival window aligned with weighing line throughput.",
    trackProduce: "Track Produce Status",
    trackProduceDesc: "Live 5-stage inspection, scale weighing, and DBT payment tracker.",
    searchCentres: "Authorised MSP Procurement Centres",
    filterDistrict: "Select District",
    filterCrop: "Select Crop",
    allDistricts: "All Districts",
    allCrops: "All Crops",
    openToday: "Open Today",
    delayed: "Delayed / Maintenance",
    closed: "Closed Today",
    estWaitTime: "Est. Wait Time",
    workingHours: "Working Hours",
    weighingScales: "Weighbridge Lines",
    staleWarning: "Data may be older than 2 hours",
    readinessTitle: "Preliminary Digital Readiness Check",
    readyToVisit: "Ready to Book Token",
    bookingWizardTitle: "Capacity-Aware Token Booking",
    quantityQuintals: "Estimated Quantity (Quintals)",
    chooseSlot: "Choose Time Slot",
    slotsFull: "Slots Full (Waitlist Available)",
    confirmBooking: "Confirm Token Reservation",
    tokenPassTitle: "Official Queue Token & Appointment Pass",
    scanQR: "Scan this QR code at centre entrance",
    documentsChecklist: "Mandatory Documents Checklist",
    doc1: "1. Original 7/12 Land Record Extract with active crop entry",
    doc2: "2. Aadhaar card & linked bank account passbook copy",
    doc3: "3. Farmer registration certificate",
    cancelToken: "Cancel Token",
    downloadSlip: "Download / Print Slip",
    timelineTitle: "5-Stage Produce Status Timeline",
    stage1: "1. Slot & Token Reserved",
    stage2: "2. Arrival Recorded at Gate",
    stage3: "3. Quality & Moisture Inspected",
    stage4: "4. Accepted on Weighbridge",
    stage5: "5. DBT Payment Dispatched",
    disclaimer: "Final quality grading, net weight, and MSP acceptance decisions are made on-site at the authorised centre.",
    voiceListening: "Listening...",
    voiceTapToSpeak: "Tap to Speak",
    voicePromptHelp: "Ask about your centre, token, documents, or produce status:",
    voiceRecognized: "Recognised Speech:",
    voiceEdit: "Edit Text",
    voiceSpeakAgain: "Speak Again",
    voiceConfirm: "Confirm",
    voiceClose: "Close Voice Assistant",
    adminLoadMonitor: "District Capacity Load & Congestion Monitor",
    auditLog: "Immutable Audit Log Trail",
    privacyNote: "Your voice is used only for this request. We do not store raw recordings."
  }
};

// -----------------------------------------------------------------------------
// Seed Data Fallback Cache
// -----------------------------------------------------------------------------
const SEED_DATA = {
  districts: [
    { id: "ahilyanagar", nameMr: "अहिल्यानगर (अहमदनगर)", nameHi: "अहिल्यानगर (अहमदनगर)", nameEn: "Ahilyanagar (Ahmednagar)" },
    { id: "amravati", nameMr: "अमरावती", nameHi: "अमरावती", nameEn: "Amravati" },
    { id: "latur", nameMr: "लातूर", nameHi: "लातूर", nameEn: "Latur" },
    { id: "nashik", nameMr: "नाशिक", nameHi: "नासिक", nameEn: "Nashik" },
    { id: "jalgaon", nameMr: "जळगाव", nameHi: "जलगांव", nameEn: "Jalgaon" }
  ],
  crops: [
    { id: "soybean", nameMr: "सोयाबीन (Soybean)", nameHi: "सोयाबीन (Soybean)", nameEn: "Soybean (Yellow)", mspPerQuintal: 4892, schemeName: "Price Support Scheme (PSS) Kharif 2026", maxMoisturePct: 12.0, icon: "🌱" },
    { id: "cotton", nameMr: "कापूस (Cotton)", nameHi: "कपास (Cotton)", nameEn: "Cotton (Medium)", mspPerQuintal: 7121, schemeName: "CCI Minimum Support Price Kharif 2026", maxMoisturePct: 8.0, icon: "☁️" },
    { id: "tur", nameMr: "तूर / अरहर (Pigeon Pea)", nameHi: "अरहर / तूर", nameEn: "Tur / Arhar", mspPerQuintal: 7550, schemeName: "NAFED Price Support Scheme 2026-27", maxMoisturePct: 10.0, icon: "🌿" },
    { id: "chana", nameMr: "हरभरा / चणा (Gram)", nameHi: "चना / ग्राम", nameEn: "Gram / Chana", mspPerQuintal: 5440, schemeName: "Rabi PSS Procurement 2026-27", maxMoisturePct: 10.0, icon: "🌾" }
  ],
  centres: [
    {
      id: "centre-1",
      nameMr: "राहुरी तालुका शेतकरी सहकारी खरेदी-विक्री संघ",
      nameHi: "राहुरी तालुका किसान सहकारी क्रय-विक्रय संघ",
      nameEn: "Rahuri Taluka Farmers Coop Procurement Centre",
      district: "ahilyanagar",
      location: "Rahuri Factory Road, APMC Yard",
      contactPhone: "02426-232411",
      status: "OPEN",
      statusReason: "नियमित खरेदी सुरू आहे",
      lastUpdated: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      workingHours: "08:30 - 17:30",
      weighingLines: 2,
      avgMinutesPerFarmer: 15,
      dailyCapacityQuintals: 800,
      maxDailyFarmers: 40,
      handledCrops: ["soybean", "tur", "cotton"],
      waitingEstimateMinutes: 35
    },
    {
      id: "centre-2",
      nameMr: "कोपरगाव कृषी उत्पन्न बाजार समिती उपकेंद्र",
      nameHi: "कोपरगांव कृषि उपज मंडी उपकेंद्र",
      nameEn: "Kopargaon APMC Sub-Procurement Yard",
      district: "ahilyanagar",
      location: "Station Road, Kopargaon",
      contactPhone: "02423-222145",
      status: "OPEN",
      statusReason: "आजची क्षमता पूर्णत्वाकडे",
      lastUpdated: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
      workingHours: "09:00 - 17:00",
      weighingLines: 2,
      avgMinutesPerFarmer: 18,
      dailyCapacityQuintals: 650,
      maxDailyFarmers: 32,
      handledCrops: ["soybean", "cotton"],
      waitingEstimateMinutes: 45
    },
    {
      id: "centre-3",
      nameMr: "अमरावती मुख्य कृषी बाजार खरेदी केंद्र",
      nameHi: "अमरावती मुख्य कृषि उपज खरीद केंद्र",
      nameEn: "Amravati Main APMC Procurement Centre",
      district: "amravati",
      location: "Cotton Market Road, Amravati",
      contactPhone: "0721-2567890",
      status: "OPEN",
      statusReason: "सुरळीत कामकाज चालू आहे",
      lastUpdated: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      workingHours: "08:00 - 18:00",
      weighingLines: 3,
      avgMinutesPerFarmer: 12,
      dailyCapacityQuintals: 1200,
      maxDailyFarmers: 60,
      handledCrops: ["soybean", "cotton", "tur"],
      waitingEstimateMinutes: 20
    },
    {
      id: "centre-4",
      nameMr: "लातूर डाळिंब व धान्य खरेदी केंद्र",
      nameHi: "लातूर दलहन व अनाज खरीद केंद्र",
      nameEn: "Latur Grain & Pulses Procurement Centre",
      district: "latur",
      location: "MIDC Road, Latur",
      contactPhone: "02382-243511",
      status: "DELAYED",
      statusReason: "सर्व्हर तांत्रिक देखभाल सुरू (अंदाजे १ तास)",
      lastUpdated: new Date(Date.now() - 140 * 60 * 1000).toISOString(),
      workingHours: "09:00 - 17:30",
      weighingLines: 2,
      avgMinutesPerFarmer: 20,
      dailyCapacityQuintals: 700,
      maxDailyFarmers: 35,
      handledCrops: ["soybean", "tur", "chana"],
      waitingEstimateMinutes: 75
    },
    {
      id: "centre-5",
      nameMr: "मालेगाव तालुका खरेदी-विक्री संघ",
      nameHi: "मालेगांव तालुका क्रय-विक्रय संघ",
      nameEn: "Malegaon Taluka Procurement Sangh",
      district: "nashik",
      location: "Camp Area, Malegaon",
      contactPhone: "02554-232112",
      status: "CLOSED",
      statusReason: "साप्ताहिक सुट्टी / साठा निर्गती दिवस",
      lastUpdated: new Date(Date.now() - 300 * 60 * 1000).toISOString(),
      workingHours: "09:00 - 17:00",
      weighingLines: 1,
      avgMinutesPerFarmer: 15,
      dailyCapacityQuintals: 400,
      maxDailyFarmers: 20,
      handledCrops: ["soybean", "chana"],
      waitingEstimateMinutes: 0
    }
  ],
  slots: [
    { id: "slot-101", centreId: "centre-1", date: "2026-08-31", timeWindow: "08:30 - 10:00", capacity: 8, booked: 6 },
    { id: "slot-102", centreId: "centre-1", date: "2026-08-31", timeWindow: "10:00 - 11:30", capacity: 8, booked: 8 },
    { id: "slot-103", centreId: "centre-1", date: "2026-08-31", timeWindow: "11:30 - 13:00", capacity: 8, booked: 5 },
    { id: "slot-104", centreId: "centre-1", date: "2026-08-31", timeWindow: "13:30 - 15:00", capacity: 8, booked: 4 },
    { id: "slot-105", centreId: "centre-1", date: "2026-08-31", timeWindow: "15:00 - 16:30", capacity: 8, booked: 3 }
  ],
  bookings: [
    {
      id: "MM-RAH-2026-084",
      farmerId: "FARM-084",
      farmerName: "दत्तात्रय रामभाऊ पाटील",
      phone: "9822345678",
      aadhaarMasked: "XXXX-XXXX-4812",
      district: "ahilyanagar",
      centreId: "centre-1",
      cropId: "soybean",
      estimatedQtyQuintals: 30,
      date: "2026-08-31",
      timeWindow: "10:00 - 11:30",
      slotId: "slot-102",
      status: "BOOKED",
      createdAt: "2026-08-30T10:15:00.000Z",
      qualityCheck: null,
      actualWeightQuintals: null,
      paymentRef: null
    },
    {
      id: "MM-RAH-2026-081",
      farmerId: "FARM-052",
      farmerName: "ज्ञानेश्वर विठ्ठल तांबे",
      phone: "9421098765",
      aadhaarMasked: "XXXX-XXXX-2190",
      district: "ahilyanagar",
      centreId: "centre-1",
      cropId: "soybean",
      estimatedQtyQuintals: 45,
      date: "2026-08-30",
      timeWindow: "08:30 - 10:00",
      slotId: "slot-101",
      status: "PAYMENT_INITIATED",
      createdAt: "2026-08-29T14:20:00.000Z",
      qualityCheck: { moisturePct: 11.2, foreignMatterPct: 1.1, grade: "GRADE_A", inspectorName: "एस. के. काळे (Grader)", passed: true },
      actualWeightQuintals: 44.80,
      paymentRef: "DBT-MH-2026-9812401"
    }
  ],
  auditLogs: [
    { id: "AUD-001", timestamp: "2026-08-30T08:30:00.000Z", actorRole: "staff", actorName: "राजेंद्र देशमुख (Supervisor)", action: "CENTRE_STATUS_UPDATED", targetId: "centre-1", details: "केंद्राची स्थिती OPEN केली." },
    { id: "AUD-002", timestamp: "2026-08-30T08:42:00.000Z", actorRole: "staff", actorName: "एस. के. काळे (Grader)", action: "FARMER_ARRIVED", targetId: "MM-RAH-2026-081", details: "शेतकरी आगमन नोंदवले." },
    { id: "AUD-003", timestamp: "2026-08-30T09:05:00.000Z", actorRole: "staff", actorName: "एस. के. काळे (Grader)", action: "QUALITY_INSPECTION_RECORDED", targetId: "MM-RAH-2026-081", details: "आर्द्रता ११.२% - ग्रेड A." },
    { id: "AUD-004", timestamp: "2026-08-30T10:15:00.000Z", actorRole: "farmer", actorName: "दत्तात्रय रामभाऊ पाटील", action: "TOKEN_BOOKED", targetId: "MM-RAH-2026-084", details: "राहुरी केंद्रासाठी ३० क्विंटल वेळ बुक केली." }
  ]
};

// -----------------------------------------------------------------------------
// Root Application Coordinator
// -----------------------------------------------------------------------------
function MandiMitraApp() {
  const [lang, setLang] = useState('mr');
  const [theme, setTheme] = useState('light');
  const [role, setRole] = useState('farmer');
  const [farmerSubView, setFarmerSubView] = useState('home');

  // Data Store
  const [districts, setDistricts] = useState(SEED_DATA.districts);
  const [crops, setCrops] = useState(SEED_DATA.crops);
  const [centres, setCentres] = useState(SEED_DATA.centres);
  const [slots, setSlots] = useState(SEED_DATA.slots);
  const [bookings, setBookings] = useState(SEED_DATA.bookings);
  const [auditLogs, setAuditLogs] = useState(SEED_DATA.auditLogs);

  // Booking Flow State
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedCropId, setSelectedCropId] = useState('soybean');
  const [selectedCentreId, setSelectedCentreId] = useState('centre-1');
  const [selectedSlotId, setSelectedSlotId] = useState('slot-103');
  const [enteredQty, setEnteredQty] = useState(25);
  const [activeBookingId, setActiveBookingId] = useState('MM-RAH-2026-084');

  // Voice Modal & Toast
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Sync Python API
  useEffect(() => {
    fetch('/api/centres').then(r => r.json()).then(d => { if (Array.isArray(d)) setCentres(d); }).catch(() => {});
    fetch('/api/crops').then(r => r.json()).then(d => { if (Array.isArray(d)) setCrops(d); }).catch(() => {});
  }, []);

  useEffect(() => {
    if (theme === 'dark') document.body.classList.add('theme-dark');
    else document.body.classList.remove('theme-dark');
  }, [theme]);

  const t = useCallback(k => I18N[lang]?.[k] || I18N['en']?.[k] || k, [lang]);
  const getName = useCallback(obj => {
    if (!obj) return '';
    if (lang === 'hi') return obj.nameHi || obj.nameMr || obj.nameEn;
    if (lang === 'mr') return obj.nameMr || obj.nameEn;
    return obj.nameEn || obj.nameMr;
  }, [lang]);

  const showToast = (msg, type = 'success') => {
    setToast({ text: msg, type });
    setTimeout(() => setToast(null), 3800);
  };

  const activeFarmerBooking = useMemo(() => {
    return bookings.find(b => b.farmerId === 'FARM-084' && b.status === 'BOOKED');
  }, [bookings]);

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Ambient Lighting Orbs */}
      <div className="ambient-scene">
        <div className="ambient-light ambient-amber"></div>
        <div className="ambient-light ambient-emerald"></div>
        <div className="ambient-light ambient-indigo"></div>
      </div>

      {/* Top Ticker Tape */}
      <div className="ticker-tape-wrap">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <span style={{ color: 'var(--accent-gold)', fontWeight: 800 }}>🌾 MSP Kharif 2026:</span>
          <span className="ticker-item">सोयाबीन: <span className="ticker-rate-badge">₹4,892/Qt</span></span>
          <span className="ticker-item">कापूस: <span className="ticker-rate-badge">₹7,121/Qt</span></span>
          <span className="ticker-item">तूर: <span className="ticker-rate-badge">₹7,550/Qt</span></span>
          <span className="ticker-item">हरभरा: <span className="ticker-rate-badge">₹5,440/Qt</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#94a3b8' }}>
          <span style={{ color: '#10b981' }}>●</span> Python STT & TTS Active
        </div>
      </div>

      {/* Floating Glass Navigation Bar */}
      <header className="floating-navbar">
        <div className="navbar-glass-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a href="#" className="brand-badge" onClick={(e) => { e.preventDefault(); setFarmerSubView('home'); }}>
              <div className="brand-icon-gem">🌾</div>
              <div>
                <span style={{ color: 'var(--accent-gold)', fontWeight: 800 }}>Mandi</span>
                <span style={{ fontWeight: 800 }}>Mitra</span>
              </div>
            </a>
          </div>

          {/* Role Switcher */}
          <div className="role-segmented-control">
            <button className={`role-tab-btn ${role === 'farmer' ? 'active' : ''}`} onClick={() => setRole('farmer')}>
              👨‍🌾 {t('farmerRole')}
            </button>
            <button className={`role-tab-btn ${role === 'staff' ? 'active' : ''}`} onClick={() => setRole('staff')}>
              🏢 {t('staffRole')}
            </button>
            <button className={`role-tab-btn ${role === 'admin' ? 'active' : ''}`} onClick={() => setRole('admin')}>
              🏛️ {t('adminRole')}
            </button>
          </div>

          {/* Header Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Language Switcher */}
            <div style={{ display: 'inline-flex', background: 'rgba(0,0,0,0.06)', borderRadius: 'var(--radius-pill)', padding: '2px' }}>
              {['mr', 'hi', 'en'].map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-pill)',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 700,
                    background: lang === l ? 'var(--accent-gold)' : 'transparent',
                    color: lang === l ? '#ffffff' : 'var(--text-dim)',
                    cursor: 'pointer'
                  }}
                >
                  {l === 'mr' ? 'मराठी' : (l === 'hi' ? 'हिन्दी' : 'EN')}
                </button>
              ))}
            </div>

            {/* Dark / Light Toggle */}
            <button
              className="btn-glass"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              style={{ width: '36px', height: '36px', borderRadius: '50%', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Toggle Theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* Voice Pill Button */}
            <button
              className="btn-core btn-gold"
              onClick={() => setIsVoiceOpen(true)}
              style={{ padding: '6px 14px', fontSize: '13px' }}
            >
              <Icons.Mic />
              <span>{lang === 'mr' ? 'विचारा' : (lang === 'hi' ? 'बोलें' : 'Voice')}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px 80px', position: 'relative', zIndex: 1 }}>
        {role === 'farmer' && (
          <FarmerExperience
            t={t}
            lang={lang}
            getName={getName}
            subView={farmerSubView}
            setSubView={setFarmerSubView}
            centres={centres}
            crops={crops}
            districts={districts}
            slots={slots}
            bookings={bookings}
            activeBooking={activeFarmerBooking}
            selectedDistrict={selectedDistrict}
            setSelectedDistrict={setSelectedDistrict}
            selectedCropId={selectedCropId}
            setSelectedCropId={setSelectedCropId}
            selectedCentreId={selectedCentreId}
            setSelectedCentreId={setSelectedCentreId}
            selectedSlotId={selectedSlotId}
            setSelectedSlotId={setSelectedSlotId}
            enteredQty={enteredQty}
            setEnteredQty={setEnteredQty}
            activeBookingId={activeBookingId}
            setActiveBookingId={setActiveBookingId}
            onOpenVoice={() => setIsVoiceOpen(true)}
            showToast={showToast}
            setBookings={setBookings}
          />
        )}

        {role === 'staff' && (
          <StaffDashboard
            t={t}
            lang={lang}
            getName={getName}
            centres={centres}
            setCentres={setCentres}
            bookings={bookings}
            setBookings={setBookings}
            crops={crops}
            showToast={showToast}
          />
        )}

        {role === 'admin' && (
          <AdminOverview
            t={t}
            lang={lang}
            getName={getName}
            centres={centres}
            bookings={bookings}
            crops={crops}
            auditLogs={auditLogs}
          />
        )}
      </main>

      {/* Dedicated Voice Experience Modal with STT & TTS */}
      {isVoiceOpen && (
        <VoiceAssistantModal
          t={t}
          lang={lang}
          setLang={setLang}
          getName={getName}
          onClose={() => setIsVoiceOpen(false)}
          centres={centres}
          crops={crops}
          onBookingConfirmed={(newB) => {
            setBookings(prev => [newB, ...prev]);
            setActiveBookingId(newB.id);
            setFarmerSubView('token');
            showToast(lang === 'mr' ? 'टोकन यशस्वीरित्या आरक्षित झाले!' : 'Token booked successfully!');
          }}
        />
      )}

      {/* Floating Toast Notification */}
      {toast && (
        <div
          className="glass-box"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 200,
            padding: '12px 20px',
            borderLeft: `4px solid ${toast.type === 'danger' ? 'var(--ruby-500)' : 'var(--emerald-500)'}`,
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'slideInModal 0.3s ease'
          }}
        >
          <span>{toast.type === 'danger' ? '⚠️' : '✅'}</span>
          <strong style={{ fontSize: '14px' }}>{toast.text}</strong>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Component: Farmer Experience (Mobile-First Civic Architecture)
// -----------------------------------------------------------------------------
function FarmerExperience(props) {
  const {
    t, lang, getName, subView, setSubView, centres, crops, districts, slots,
    bookings, activeBooking, selectedDistrict, setSelectedDistrict, selectedCropId,
    setSelectedCropId, selectedCentreId, setSelectedCentreId, selectedSlotId,
    setSelectedSlotId, enteredQty, setEnteredQty, activeBookingId, setActiveBookingId,
    onOpenVoice, showToast, setBookings
  } = props;

  // View 1: Farmer Home
  if (subView === 'home') {
    const centre = activeBooking ? centres.find(c => c.id === activeBooking.centreId) : null;
    return (
      <div>
        {/* Dynamic Appointment Banner */}
        <div className="hero-glow-card">
          <span className="pill-badge warning" style={{ marginBottom: '14px' }}>
            {activeBooking ? '📍 ' + t('activeBooking') : '🌾 ' + (lang === 'mr' ? 'सुरुवात करा' : 'Start Here')}
          </span>
          <h2 style={{ fontSize: '2rem', marginBottom: '8px', color: '#ffffff', letterSpacing: '-0.02em' }}>
            {activeBooking
              ? `${activeBooking.timeWindow} @ ${getName(centre)}`
              : t('noActiveBooking')}
          </h2>
          <p style={{ opacity: 0.9, marginBottom: '22px', fontSize: '0.96rem', maxWidth: '680px' }}>
            {activeBooking
              ? (lang === 'mr' ? `टोकन क्रमांक: ${activeBooking.id}. कृपया मूळ ७/१२ उतारा सोबत आणा.` : `Token: ${activeBooking.id}. Please carry original 7/12 land extract.`)
              : t('noActiveBookingSub')}
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {activeBooking ? (
              <button className="btn-core btn-gold" onClick={() => setSubView('token')}>
                <Icons.Ticket />
                <span>{lang === 'mr' ? 'माझे टोकन पावती पहा' : 'View My Token Pass'}</span>
              </button>
            ) : (
              <button className="btn-core btn-gold" onClick={() => setSubView('centres')}>
                <Icons.Search />
                <span>{t('checkCentres')}</span>
              </button>
            )}
            <button className="btn-core btn-glass" onClick={() => setSubView('track')}>
              <Icons.Scale />
              <span>{t('trackProduce')}</span>
            </button>
          </div>
        </div>

        {/* Pulsating Voice Assistant Hero Banner */}
        <div className="voice-radar-bar" onClick={onOpenVoice}>
          <div>
            <div className="pill-badge warning" style={{ marginBottom: '8px' }}>
              <Icons.Sparkles />
              <span>Python gTTS & SpeechRecognition Active</span>
            </div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-900)', marginBottom: '4px' }}>
              {t('heroVoiceTitle')}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>
              {t('heroVoiceSub')}
            </p>
          </div>
          <div className="radar-mic-circle">
            <Icons.Mic />
          </div>
        </div>

        {/* 3 Primary Action Cards */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="grid-3-col">
            <div className="glass-box" onClick={() => setSubView('centres')} style={{ padding: '24px', cursor: 'pointer' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(59, 130, 246, 0.15)', color: 'var(--primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Icons.Building />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-900)', marginBottom: '6px' }}>
                {t('checkCentres')}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                {t('checkCentresDesc')}
              </p>
            </div>

            <div className="glass-box" onClick={() => setSubView('centres')} style={{ padding: '24px', cursor: 'pointer' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Icons.Ticket />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginBottom: '6px' }}>
                {t('bookToken')}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                {t('bookTokenDesc')}
              </p>
            </div>

            <div className="glass-box" onClick={() => setSubView('track')} style={{ padding: '24px', cursor: 'pointer' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--emerald-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Icons.Scale />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--emerald-500)', marginBottom: '6px' }}>
                {t('trackProduce')}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                {t('trackProduceDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Public Service Transparency Notice */}
        <div className="glass-box" style={{ padding: '18px 24px', display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '4px solid var(--accent-gold)' }}>
          <Icons.ShieldCheck />
          <div style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>
            <strong>{lang === 'mr' ? 'शासकीय खरेदी नियम व पारदर्शकता:' : 'Official Procurement Rules:'}</strong> {t('disclaimer')}
          </div>
        </div>
      </div>
    );
  }

  // View 2: Centres Explorer
  if (subView === 'centres') {
    const filteredCentres = centres.filter(c => {
      if (selectedDistrict !== 'all' && c.district !== selectedDistrict) return false;
      if (selectedCropId !== 'all' && !c.handledCrops.includes(selectedCropId)) return false;
      return true;
    });

    return (
      <div>
        <button className="btn-core btn-glass" onClick={() => setSubView('home')} style={{ marginBottom: '18px' }}>
          ← {lang === 'mr' ? 'मुख्यपृष्ठ' : 'Back to Home'}
        </button>

        <h1 style={{ fontSize: '2rem', marginBottom: '18px' }}>{t('searchCentres')}</h1>

        <div className="glass-box" style={{ padding: '18px', marginBottom: '24px' }}>
          <div className="grid-2-col">
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dim)', display: 'block', marginBottom: '6px' }}>
                {t('filterDistrict')}
              </label>
              <select className="input-glass" value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)}>
                <option value="all">{t('allDistricts')}</option>
                {districts.map(d => (
                  <option key={d.id} value={d.id}>{getName(d)}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dim)', display: 'block', marginBottom: '6px' }}>
                {t('filterCrop')}
              </label>
              <select className="input-glass" value={selectedCropId} onChange={e => setSelectedCropId(e.target.value)}>
                <option value="all">{t('allCrops')}</option>
                {crops.map(c => (
                  <option key={c.id} value={c.id}>{c.icon} {getName(c)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid-2-col">
          {filteredCentres.map(centre => {
            const isStale = (Date.now() - new Date(centre.lastUpdated).getTime()) > 2 * 60 * 60 * 1000;
            const updatedMins = Math.floor((Date.now() - new Date(centre.lastUpdated).getTime()) / (60 * 1000));
            return (
              <div key={centre.id} className="glass-box" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-900)' }}>{getName(centre)}</h3>
                    <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Icons.MapPin />
                      <span>{centre.location}</span>
                    </div>
                  </div>
                  <span className={`pill-badge ${centre.status === 'OPEN' ? 'success' : (centre.status === 'DELAYED' ? 'warning' : 'danger')}`}>
                    ● {centre.status === 'OPEN' ? t('openToday') : (centre.status === 'DELAYED' ? t('delayed') : t('closed'))}
                  </span>
                </div>

                <div className="glass-subtle" style={{ padding: '14px', marginBottom: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
                  <div>
                    <span style={{ color: 'var(--text-dim)' }}>⏱️ {t('estWaitTime')}</span>
                    <div style={{ fontWeight: 800, fontSize: '15px', marginTop: '2px' }}>{centre.waitingEstimateMinutes} {lang === 'en' ? 'mins' : 'मि.'}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-dim)' }}>⚖️ {t('weighingScales')}</span>
                    <div style={{ fontWeight: 800, fontSize: '15px', marginTop: '2px' }}>{centre.weighingLines} Scales Active</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-dim)', marginBottom: '18px' }}>
                  <span>🕒 Last updated: {updatedMins}m ago</span>
                  {isStale && <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>⚠️ {t('staleWarning')}</span>}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn-core btn-glass" style={{ flex: 1 }} onClick={() => alert(`${getName(centre)}: ${centre.contactPhone}`)}>
                    <Icons.Phone />
                    <span>Contact</span>
                  </button>
                  {centre.status === 'OPEN' ? (
                    <button
                      className="btn-core btn-gold"
                      style={{ flex: 1 }}
                      onClick={() => {
                        setSelectedCentreId(centre.id);
                        setSubView('readiness');
                      }}
                    >
                      <Icons.Ticket />
                      <span>{t('bookToken')}</span>
                    </button>
                  ) : (
                    <button className="btn-core" style={{ flex: 1, opacity: 0.5, cursor: 'not-allowed' }} disabled>
                      Unavailable
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // View 3: Readiness Check
  if (subView === 'readiness') {
    const crop = crops.find(c => c.id === selectedCropId) || crops[0];
    const centre = centres.find(c => c.id === selectedCentreId) || centres[0];

    return (
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <button className="btn-core btn-glass" onClick={() => setSubView('centres')} style={{ marginBottom: '18px' }}>
          ← {lang === 'mr' ? 'केंद्र निवडीकडे परत' : 'Back to Centres'}
        </button>

        <div className="glass-box" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <span className="pill-badge warning">Verification</span>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-900)', marginTop: '4px' }}>
                {getName(crop)} @ {getName(centre)}
              </h2>
            </div>
            <span className="pill-badge success">{t('readyToVisit')}</span>
          </div>

          <div className="glass-subtle" style={{ padding: '18px', marginBottom: '22px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: 'var(--emerald-500)', fontSize: '20px' }}>✓</span>
                <div>
                  <strong style={{ fontSize: '14px' }}>खरेदी हंगाम वैध (Procurement Season Active)</strong>
                  <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{crop.schemeName} (MSP ₹{crop.mspPerQuintal}/Qt)</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: 'var(--emerald-500)', fontSize: '20px' }}>✓</span>
                <div>
                  <strong style={{ fontSize: '14px' }}>७/१२ पीक नोंद व बँक आधार लिंक</strong>
                  <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>४.५ एकर शेती नोंदणी उपलब्ध (Aadhaar Linked)</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: 'var(--emerald-500)', fontSize: '20px' }}>✓</span>
                <div>
                  <strong style={{ fontSize: '14px' }}>पारदर्शकता व १-सक्रिय टोकन मर्यादा</strong>
                  <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>सध्या कोणतेही सक्रिय टोकन नाही (Fairness Limit Verified)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-subtle" style={{ padding: '16px', marginBottom: '22px', borderLeft: '4px solid var(--accent-gold)', fontSize: '12px', color: 'var(--text-sub)' }}>
            <strong>⚖️ अंतिम मंजुरी अस्वीकरण:</strong> {t('disclaimer')}
          </div>

          <button className="btn-core btn-gold" style={{ width: '100%', padding: '14px', fontSize: '15px' }} onClick={() => setSubView('booking')}>
            <span>{lang === 'mr' ? 'सोयीची वेळ निवडा व टोकन बुक करा' : 'Proceed to Choose Time Slot'}</span>
            <Icons.ArrowRight />
          </button>
        </div>
      </div>
    );
  }

  // View 4: 5-Step Capacity Booking Wizard
  if (subView === 'booking') {
    const centre = centres.find(c => c.id === selectedCentreId) || centres[0];
    const crop = crops.find(c => c.id === selectedCropId) || crops[0];
    const availableSlots = slots.filter(s => s.centreId === centre.id);

    const handleConfirmBooking = () => {
      const newBooking = {
        id: `MM-${centre.id.toUpperCase()}-2026-${Math.floor(100 + Math.random() * 900)}`,
        farmerId: 'FARM-084',
        farmerName: 'दत्तात्रय रामभाऊ पाटील',
        phone: '9822345678',
        aadhaarMasked: 'XXXX-XXXX-4812',
        district: centre.district,
        centreId: centre.id,
        cropId: crop.id,
        estimatedQtyQuintals: enteredQty,
        date: '2026-08-31',
        timeWindow: '10:00 - 11:30',
        slotId: selectedSlotId,
        status: 'BOOKED',
        createdAt: new Date().toISOString()
      };

      setBookings(prev => [newBooking, ...prev]);
      setActiveBookingId(newBooking.id);
      showToast(lang === 'mr' ? 'टोकन यशस्वीरित्या आरक्षित झाले!' : 'Token booked successfully!');
      setSubView('token');
    };

    return (
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <button className="btn-core btn-glass" onClick={() => setSubView('readiness')} style={{ marginBottom: '18px' }}>
          ← {lang === 'mr' ? 'मागे जा' : 'Back'}
        </button>

        <div className="glass-box" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '6px' }}>{t('bookingWizardTitle')}</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '22px' }}>
            {getName(centre)} — {getName(crop)}
          </p>

          <div style={{ marginBottom: '22px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
              {t('quantityQuintals')}
            </label>
            <input
              type="number"
              className="input-glass"
              value={enteredQty}
              onChange={e => setEnteredQty(Number(e.target.value) || 25)}
              min="1"
              max="200"
            />
          </div>

          <div style={{ marginBottom: '26px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '10px' }}>
              {t('chooseSlot')}
            </label>
            <div className="grid-2-col">
              {availableSlots.map(slot => {
                const isFull = slot.booked >= slot.capacity;
                const isSelected = selectedSlotId === slot.id;
                const remaining = slot.capacity - slot.booked;
                return (
                  <div
                    key={slot.id}
                    className="glass-subtle"
                    onClick={() => !isFull && setSelectedSlotId(slot.id)}
                    style={{
                      padding: '16px',
                      cursor: isFull ? 'not-allowed' : 'pointer',
                      border: isSelected ? '2px solid var(--accent-gold)' : '1px solid var(--border-medium)',
                      background: isSelected ? 'var(--accent-gold-glow)' : 'var(--panel-bg)',
                      opacity: isFull ? 0.55 : 1
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--primary-900)' }}>
                      ⏰ {slot.timeWindow}
                    </div>
                    <div style={{ fontSize: '12px', marginTop: '4px' }}>
                      {isFull ? (
                        <span style={{ color: 'var(--ruby-500)', fontWeight: 700 }}>✕ {t('slotsFull')}</span>
                      ) : (
                        <span style={{ color: 'var(--emerald-500)', fontWeight: 700 }}>✓ {remaining} जागा शिल्लक (Slots Left)</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button className="btn-core btn-gold" style={{ width: '100%', padding: '14px', fontSize: '15px' }} onClick={handleConfirmBooking}>
            <Icons.Ticket />
            <span>{t('confirmBooking')}</span>
          </button>
        </div>
      </div>
    );
  }

  // View 5: Perforated Ticket Pass
  if (subView === 'token') {
    const booking = bookings.find(b => b.id === activeBookingId) || bookings[0];
    const centre = booking ? centres.find(c => c.id === booking.centreId) : centres[0];
    const crop = booking ? crops.find(c => c.id === booking.cropId) : crops[0];

    return (
      <div style={{ maxWidth: '660px', margin: '0 auto' }}>
        <button className="btn-core btn-glass" onClick={() => setSubView('home')} style={{ marginBottom: '18px' }}>
          ← {lang === 'mr' ? 'मुख्यपृष्ठ' : 'Back to Home'}
        </button>

        <div className="perforated-ticket">
          <div style={{ textAlign: 'center', marginBottom: '22px' }}>
            <span className="pill-badge success" style={{ marginBottom: '10px' }}>● Verified Appointment Token</span>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--primary-900)', letterSpacing: '0.05em', fontFamily: 'monospace' }}>
              {booking.id}
            </div>
          </div>

          <div className="glass-subtle" style={{ padding: '18px', marginBottom: '22px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '13px' }}>
            <div>
              <span style={{ color: 'var(--text-dim)' }}>Date:</span>
              <div style={{ fontWeight: 800, fontSize: '14px' }}>{booking.date}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-dim)' }}>Time Window:</span>
              <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--accent-gold)' }}>{booking.timeWindow}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-dim)' }}>Farmer:</span>
              <div style={{ fontWeight: 700 }}>{booking.farmerName}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-dim)' }}>Crop & Qty:</span>
              <div style={{ fontWeight: 700 }}>{getName(crop)} (~{booking.estimatedQtyQuintals} Qt)</div>
            </div>
          </div>

          <div style={{ background: '#ffffff', width: '136px', height: '136px', margin: '0 auto 12px', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="120" height="120" viewBox="0 0 100 100">
              <rect width="100" height="100" fill="#ffffff" />
              <path d="M10 10h30v30h-30z M15 15v20h20v-20z M20 20h10v10h-10z" fill="#0f2942" />
              <path d="M60 10h30v30h-30z M65 15v20h20v-20z M70 20h10v10h-10z" fill="#0f2942" />
              <path d="M10 60h30v30h-30z M15 65v20h20v-20z M20 70h10v10h-10z" fill="#0f2942" />
              <rect x="50" y="50" width="10" height="10" fill="#f59e0b" />
              <rect x="70" y="60" width="15" height="15" fill="#0f2942" />
              <rect x="50" y="80" width="20" height="10" fill="#0f2942" />
            </svg>
          </div>
          <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-dim)', marginBottom: '22px' }}>
            {t('scanQR')}
          </div>

          <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '18px', marginBottom: '22px' }}>
            <strong style={{ fontSize: '13px', display: 'block', marginBottom: '6px' }}>📋 {t('documentsChecklist')}</strong>
            <ul style={{ paddingLeft: '18px', fontSize: '12px', color: 'var(--text-sub)', lineHeight: 1.6 }}>
              <li>{t('doc1')}</li>
              <li>{t('doc2')}</li>
              <li>{t('doc3')}</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-core btn-glass" style={{ flex: 1 }} onClick={() => window.print()}>
              <Icons.Printer />
              <span>{t('downloadSlip')}</span>
            </button>
            <button
              className="btn-core"
              style={{ flex: 1, background: 'var(--ruby-500)', color: '#fff' }}
              onClick={() => {
                if (confirm('Cancel this token appointment?')) {
                  setBookings(prev => prev.filter(b => b.id !== booking.id));
                  showToast(lang === 'mr' ? 'टोकन रद्द केले.' : 'Token cancelled.', 'warning');
                  setSubView('home');
                }
              }}
            >
              ✕ {t('cancelToken')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // View 6: Produce Status Tracker
  if (subView === 'track') {
    const trackedBooking = bookings.find(b => b.id === 'MM-RAH-2026-081') || bookings[0];
    const centre = trackedBooking ? centres.find(c => c.id === trackedBooking.centreId) : centres[0];
    const crop = trackedBooking ? crops.find(c => c.id === trackedBooking.cropId) : crops[0];

    const stages = ['BOOKED', 'ARRIVED', 'QUALITY_CHECKED', 'ACCEPTED', 'PAYMENT_INITIATED'];
    const currentIdx = stages.indexOf(trackedBooking.status);

    return (
      <div style={{ maxWidth: '740px', margin: '0 auto' }}>
        <button className="btn-core btn-glass" onClick={() => setSubView('home')} style={{ marginBottom: '18px' }}>
          ← {lang === 'mr' ? 'मुख्यपृष्ठ' : 'Back to Home'}
        </button>

        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>{t('timelineTitle')}</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '22px' }}>
          {trackedBooking.farmerName} — Token: {trackedBooking.id} ({getName(crop)} @ {getName(centre)})
        </p>

        <div className="glass-box" style={{ padding: '28px' }}>
          <div className="timeline-modern">
            <div className={`timeline-step-row ${currentIdx >= 0 ? 'completed' : ''}`}>
              <div className="timeline-dot-gem">1</div>
              <div>
                <strong style={{ fontSize: '15px' }}>{t('stage1')}</strong>
                <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{trackedBooking.date} {trackedBooking.timeWindow}</div>
              </div>
            </div>

            <div className={`timeline-step-row ${currentIdx >= 1 ? 'completed' : (currentIdx === 0 ? 'active' : '')}`}>
              <div className="timeline-dot-gem">2</div>
              <div>
                <strong style={{ fontSize: '15px' }}>{t('stage2')}</strong>
                <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
                  {currentIdx >= 1 ? 'Arrival checked at entry gate.' : 'Awaiting arrival.'}
                </div>
              </div>
            </div>

            <div className={`timeline-step-row ${currentIdx >= 2 ? 'completed' : ''}`}>
              <div className="timeline-dot-gem">3</div>
              <div>
                <strong style={{ fontSize: '15px' }}>{t('stage3')}</strong>
                {trackedBooking.qualityCheck ? (
                  <div className="glass-subtle" style={{ padding: '10px 14px', marginTop: '6px', fontSize: '13px' }}>
                    💧 Moisture: <strong>{trackedBooking.qualityCheck.moisturePct}%</strong> | Grade: <strong>{trackedBooking.qualityCheck.grade}</strong> (Passed)
                  </div>
                ) : (
                  <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Electronic moisture test & visual grading.</div>
                )}
              </div>
            </div>

            <div className={`timeline-step-row ${currentIdx >= 3 ? 'completed' : ''}`}>
              <div className="timeline-dot-gem">4</div>
              <div>
                <strong style={{ fontSize: '15px' }}>{t('stage4')}</strong>
                <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
                  {trackedBooking.actualWeightQuintals
                    ? `Net Accepted Gross: ${trackedBooking.actualWeightQuintals} Quintals`
                    : 'Weighbridge capture.'}
                </div>
              </div>
            </div>

            <div className={`timeline-step-row ${currentIdx >= 4 ? 'completed' : ''}`}>
              <div className="timeline-dot-gem">5</div>
              <div>
                <strong style={{ fontSize: '15px' }}>{t('stage5')}</strong>
                <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
                  {trackedBooking.paymentRef
                    ? `DBT Dispatched to Aadhaar Bank. Ref: ${trackedBooking.paymentRef}`
                    : 'Direct bank transfer dispatch.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// -----------------------------------------------------------------------------
// Component: Staff Dashboard
// -----------------------------------------------------------------------------
function StaffDashboard({ t, lang, getName, centres, setCentres, bookings, setBookings, crops, showToast }) {
  const [selectedStaffCentreId, setSelectedStaffCentreId] = useState(centres[0]?.id || 'centre-1');
  const currentCentre = centres.find(c => c.id === selectedStaffCentreId) || centres[0];

  const handleSetStatus = (newStatus) => {
    setCentres(prev => prev.map(c => {
      if (c.id === currentCentre.id) {
        return { ...c, status: newStatus, lastUpdated: new Date().toISOString() };
      }
      return c;
    }));
    showToast(`Centre status set to ${newStatus}`);
  };

  const handleMarkArrived = (bId) => {
    setBookings(prev => prev.map(b => b.id === bId ? { ...b, status: 'ARRIVED' } : b));
    showToast('Farmer arrival recorded');
  };

  const handleRecordQC = (bId) => {
    setBookings(prev => prev.map(b => b.id === bId ? {
      ...b,
      status: 'QUALITY_CHECKED',
      qualityCheck: { moisturePct: 11.4, foreignMatterPct: 1.2, grade: 'GRADE_A', inspectorName: 'S. K. Kale (Grader)', passed: true }
    } : b));
    showToast('Quality check recorded: Grade A (11.4% Moisture)');
  };

  const handleRecordWeight = (bId) => {
    const inputWeight = prompt('Enter weighbridge net weight in quintals:', '30.0');
    if (inputWeight) {
      setBookings(prev => prev.map(b => b.id === bId ? { ...b, status: 'ACCEPTED', actualWeightQuintals: Number(inputWeight) || 30.0 } : b));
      showToast(`Weighbridge accepted: ${inputWeight} Qt`);
    }
  };

  const handleDispatchPayment = (bId) => {
    const ref = `DBT-MH-2026-${Math.floor(1000000 + Math.random() * 9000000)}`;
    setBookings(prev => prev.map(b => b.id === bId ? { ...b, status: 'PAYMENT_INITIATED', paymentRef: ref } : b));
    showToast(`Payment initiated. Ref: ${ref}`);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>Procurement Centre Staff Portal</h1>
          <div style={{ fontSize: '14px', color: 'var(--text-dim)' }}>
            🏢 {getName(currentCentre)} (District: {currentCentre.district.toUpperCase()})
          </div>
        </div>

        <select className="input-glass" style={{ maxWidth: '300px' }} value={selectedStaffCentreId} onChange={e => setSelectedStaffCentreId(e.target.value)}>
          {centres.map(c => (
            <option key={c.id} value={c.id}>{getName(c)}</option>
          ))}
        </select>
      </div>

      <div className="glass-box" style={{ padding: '22px', marginBottom: '26px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Live Centre Control</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '2px' }}>
              Current Status: <span style={{ color: currentCentre.status === 'OPEN' ? 'var(--emerald-500)' : 'var(--ruby-500)' }}>● {currentCentre.status}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className={`btn-core ${currentCentre.status === 'OPEN' ? 'btn-emerald' : 'btn-glass'}`} onClick={() => handleSetStatus('OPEN')}>
              ✓ Open
            </button>
            <button className={`btn-core ${currentCentre.status === 'DELAYED' ? 'btn-gold' : 'btn-glass'}`} onClick={() => handleSetStatus('DELAYED')}>
              ⏳ Delayed
            </button>
            <button className={`btn-core ${currentCentre.status === 'CLOSED' ? 'btn-glass' : 'btn-glass'}`} onClick={() => handleSetStatus('CLOSED')} style={{ color: 'var(--ruby-500)' }}>
              ✕ Closed
            </button>
          </div>
        </div>
      </div>

      <div className="glass-box" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '18px' }}>Today's Expected Appointments</h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-light)', color: 'var(--text-dim)' }}>
                <th style={{ padding: '12px 10px' }}>Token</th>
                <th style={{ padding: '12px 10px' }}>Farmer</th>
                <th style={{ padding: '12px 10px' }}>Crop & Qty</th>
                <th style={{ padding: '12px 10px' }}>Slot</th>
                <th style={{ padding: '12px 10px' }}>Status</th>
                <th style={{ padding: '12px 10px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '14px 10px', fontWeight: 800, fontFamily: 'monospace', color: 'var(--primary-900)' }}>{b.id}</td>
                  <td style={{ padding: '14px 10px' }}>
                    <div style={{ fontWeight: 700 }}>{b.farmerName}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>📱 {b.phone}</div>
                  </td>
                  <td style={{ padding: '14px 10px' }}>{b.cropId} (~{b.estimatedQtyQuintals} Qt)</td>
                  <td style={{ padding: '14px 10px' }}><span className="pill-badge info">{b.timeWindow}</span></td>
                  <td style={{ padding: '14px 10px' }}>
                    <span className={`pill-badge ${b.status === 'BOOKED' ? 'info' : (b.status === 'ARRIVED' ? 'warning' : 'success')}`}>
                      {b.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 10px' }}>
                    {b.status === 'BOOKED' && (
                      <button className="btn-core btn-navy" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handleMarkArrived(b.id)}>
                        📍 Check-In
                      </button>
                    )}
                    {b.status === 'ARRIVED' && (
                      <button className="btn-core btn-gold" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handleRecordQC(b.id)}>
                        🔬 Grade QC
                      </button>
                    )}
                    {b.status === 'QUALITY_CHECKED' && (
                      <button className="btn-core btn-emerald" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handleRecordWeight(b.id)}>
                        ⚖️ Scale Weight
                      </button>
                    )}
                    {b.status === 'ACCEPTED' && (
                      <button className="btn-core btn-gold" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handleDispatchPayment(b.id)}>
                        💸 Trigger DBT
                      </button>
                    )}
                    {b.status === 'PAYMENT_INITIATED' && (
                      <span style={{ fontSize: '12px', color: 'var(--emerald-500)', fontWeight: 800 }}>✓ Sent ({b.paymentRef})</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Component: Administrator Overview
// -----------------------------------------------------------------------------
function AdminOverview({ t, lang, getName, centres, bookings, crops, auditLogs }) {
  const totalCentres = centres.length;
  const activeCentres = centres.filter(c => c.status === 'OPEN').length;
  const totalQuintals = bookings.reduce((acc, b) => acc + (b.actualWeightQuintals || b.estimatedQtyQuintals || 0), 0);

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>District Procurement & Capacity Monitor</h1>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '26px' }}>
        Maharashtra State Agricultural Marketing Board — Live Congestion Oversight
      </p>

      <div className="grid-4-col" style={{ marginBottom: '26px' }}>
        <div className="glass-box" style={{ padding: '22px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>Total Centres</span>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--primary-900)', marginTop: '4px' }}>{totalCentres}</div>
          <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Authorized APMC Yards</span>
        </div>

        <div className="glass-box" style={{ padding: '22px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>Active Today</span>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--emerald-500)', marginTop: '4px' }}>{activeCentres}</div>
          <span style={{ fontSize: '12px', color: 'var(--emerald-500)' }}>{Math.round((activeCentres / totalCentres) * 100)}% Operational</span>
        </div>

        <div className="glass-box" style={{ padding: '22px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>Tokens Registered</span>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--accent-gold)', marginTop: '4px' }}>{bookings.length}</div>
          <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Farmers Scheduled</span>
        </div>

        <div className="glass-box" style={{ padding: '22px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>Procured Quintals</span>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--indigo-500)', marginTop: '4px' }}>{totalQuintals.toLocaleString()}</div>
          <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Total Gross Received</span>
        </div>
      </div>

      <div className="glass-box" style={{ padding: '24px', marginBottom: '26px' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '18px' }}>{t('adminLoadMonitor')}</h3>
        <div className="grid-2-col">
          {centres.map(c => {
            const centreBookings = bookings.filter(b => b.centreId === c.id);
            const loadPct = Math.min(100, Math.round((centreBookings.length / (c.maxDailyFarmers || 30)) * 100));
            const isOverloaded = loadPct >= 85;
            return (
              <div key={c.id} className="glass-subtle" style={{ padding: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <strong style={{ fontSize: '15px' }}>{getName(c)}</strong>
                  <span className={`pill-badge ${isOverloaded ? 'danger' : 'success'}`}>
                    {isOverloaded ? 'Overloaded' : 'Optimal'}
                  </span>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.08)', borderRadius: 'var(--radius-pill)', height: '10px', overflow: 'hidden', marginBottom: '8px' }}>
                  <div style={{ width: `${loadPct}%`, height: '100%', background: isOverloaded ? 'var(--ruby-500)' : 'var(--emerald-500)', transition: 'width 0.5s ease' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-dim)' }}>
                  <span>Load: {centreBookings.length} / {c.maxDailyFarmers} farmers ({loadPct}%)</span>
                  <span>⏱️ {c.waitingEstimateMinutes}m wait</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass-box" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '18px' }}>{t('auditLog')}</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-light)', color: 'var(--text-dim)' }}>
                <th style={{ padding: '10px 8px' }}>ID</th>
                <th style={{ padding: '10px 8px' }}>Time</th>
                <th style={{ padding: '10px 8px' }}>Actor</th>
                <th style={{ padding: '10px 8px' }}>Action</th>
                <th style={{ padding: '10px 8px' }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map(log => (
                <tr key={log.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '12px 8px', fontFamily: 'monospace', fontWeight: 800, color: 'var(--primary-900)' }}>{log.id}</td>
                  <td style={{ padding: '12px 8px', color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>{new Date(log.timestamp).toLocaleTimeString()}</td>
                  <td style={{ padding: '12px 8px' }}><span className="pill-badge info">{log.actorRole}</span> {log.actorName}</td>
                  <td style={{ padding: '12px 8px', fontWeight: 800 }}>{log.action}</td>
                  <td style={{ padding: '12px 8px', color: 'var(--text-sub)' }}>{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Component: Dedicated Voice Assistant Experience Modal with STT & TTS
// -----------------------------------------------------------------------------
function VoiceAssistantModal({ t, lang, setLang, getName, onClose, centres, crops, onBookingConfirmed }) {
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [understoodText, setUnderstoodText] = useState('');
  const [confirmationCard, setConfirmationCard] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSlow, setIsSlow] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const recognitionRef = useRef(null);
  const audioPlayerRef = useRef(null);
  // langRef keeps the closure always up-to-date with the current lang
  const langRef = useRef(lang);
  useEffect(() => { langRef.current = lang; }, [lang]);

  // Reset response when language changes so stale Hindi response clears
  useEffect(() => {
    setResponseText('');
    setUnderstoodText('');
    setConfirmationCard(null);
  }, [lang]);

  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = lang === 'mr' ? 'mr-IN' : (lang === 'hi' ? 'hi-IN' : 'en-IN');

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event) => {
        const lastResult = event.results[event.results.length - 1];
        const text = lastResult[0].transcript;
        setTranscript(text);
        if (lastResult.isFinal) {
          // Use langRef.current so we always use the latest selected language
          processVoiceQuery(text, langRef.current);
        }
      };

      recognitionRef.current = recognition;
    }
  }, [lang]);

  const startListening = () => {
    stopSpeaking();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.lang = lang === 'mr' ? 'mr-IN' : (lang === 'hi' ? 'hi-IN' : 'en-IN');
        recognitionRef.current.start();
      } catch (e) {
        console.log('Voice start error:', e);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
    setIsListening(false);
  };

  // Process NLU query & generate audio via Python /api/voice/tts
  // activeLang defaults to the current prop, but can be passed explicitly (fixes stale closure in onresult)
  const processVoiceQuery = (queryText, activeLang) => {
    const useLang = activeLang || lang;
    setIsLoading(true);
    setResponseText('');
    setUnderstoodText('');
    setConfirmationCard(null);

    fetch('/api/voice/parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript: queryText, lang: useLang })
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setIsLoading(false);
        setUnderstoodText(data.understoodText || '');
        setResponseText(data.responseText || '');
        setConfirmationCard(data.confirmationCard || null);
        if (data.responseText) speakResponse(data.responseText, useLang);
      })
      .catch(() => {
        setIsLoading(false);
        // Offline fallback — derive answers from live centres/crops props
        const lower = queryText.toLowerCase();
        const firstOpenCentre = (centres || []).find(c => c.status === 'OPEN') || (centres || [])[0];
        const firstCrop = (crops || [])[0];
        const cName = firstOpenCentre
          ? (useLang === 'mr' ? firstOpenCentre.nameMr : (useLang === 'hi' ? firstOpenCentre.nameHi : firstOpenCentre.nameEn))
          : (useLang === 'mr' ? 'खरेदी केंद्र' : (useLang === 'hi' ? 'खरीद केंद्र' : 'Procurement Centre'));
        const crName = firstCrop
          ? (useLang === 'mr' ? firstCrop.nameMr : (useLang === 'hi' ? firstCrop.nameHi : firstCrop.nameEn))
          : (useLang === 'mr' ? 'पीक' : (useLang === 'hi' ? 'फसल' : 'crop'));
        const hours = firstOpenCentre ? firstOpenCentre.workingHours : '08:30 - 17:30';
        const waitMins = firstOpenCentre ? firstOpenCentre.waitingEstimateMinutes : 0;

        let resp = '';
        let understood = '';

        if (lower.includes('केंद्र') || lower.includes('open') || lower.includes('status') || lower.includes('centre') || lower.includes('खुला') || lower.includes('चालू') || lower.includes('उघडे')) {
          if (firstOpenCentre && firstOpenCentre.status === 'OPEN') {
            resp = useLang === 'mr'
              ? `हो. ${firstOpenCentre.nameMr} येथे आज खरेदी सुरू आहे. कामाची वेळ ${hours} आहे. प्रतीक्षा ${waitMins} मिनिटे.`
              : (useLang === 'hi' ? `हाँ। ${firstOpenCentre.nameHi} पर आज खरीद चालू है। समय: ${hours}।` : `Yes, ${firstOpenCentre.nameEn} is open today. Hours: ${hours}.`);
          } else {
            resp = useLang === 'mr' ? 'सध्या कोणतेही केंद्र उपलब्ध माहिती नाही. इंटरनेट तपासा.' : (useLang === 'hi' ? 'अभी केंद्र की जानकारी उपलब्ध नहीं है।' : 'Centre info unavailable. Please check your connection.');
          }
          understood = useLang === 'mr' ? 'केंद्र स्थिती' : (useLang === 'hi' ? 'केंद्र की स्थिति' : 'Centre Status');
        } else if (lower.includes('प्रतीक्षा') || lower.includes('wait') || lower.includes('how long') || lower.includes('गर्दी') || lower.includes('queue') || lower.includes('कितना समय')) {
          resp = useLang === 'mr'
            ? `${firstOpenCentre ? firstOpenCentre.nameMr : cName} येथे अंदाजे ${waitMins} मिनिटांची प्रतीक्षा आहे.`
            : (useLang === 'hi' ? `${cName} पर अनुमानित ${waitMins} मिनट की प्रतीक्षा है।` : `${cName}: estimated wait is ${waitMins} minutes.`);
          understood = useLang === 'mr' ? 'प्रतीक्षा वेळ' : (useLang === 'hi' ? 'प्रतीक्षा समय' : 'Wait Time');
        } else if (lower.includes('सोयाबीन') || lower.includes('कापूस') || lower.includes('तूर') || lower.includes('हरभरा')
                || lower.includes('soybean') || lower.includes('cotton') || lower.includes('tur') || lower.includes('chana')
                || lower.includes('कपास') || lower.includes('अरहर') || lower.includes('चना')) {
          resp = useLang === 'mr'
            ? `${cName} येथे ${crName} खरेदी होत आहे. केंद्रावर संपर्क करा.`
            : (useLang === 'hi' ? `${cName} पर ${crName} की खरीद हो रही है।` : `${crName} procurement is active at ${cName}.`);
          understood = useLang === 'mr' ? `पीक — ${crName}` : (useLang === 'hi' ? `फसल — ${crName}` : `Crop — ${crName}`);
        } else if (lower.includes('टोकन') || lower.includes('token') || lower.includes('slot')) {
          resp = useLang === 'mr'
            ? `मी समजलो की तुम्हाला ${cName} येथे टोकन हवे आहे.`
            : (useLang === 'hi' ? `समझ आया: आप ${cName} के लिए टोकन चाहते हैं।` : `Understood: You need a token at ${cName}.`);
          understood = useLang === 'mr' ? 'टोकन विनंती' : (useLang === 'hi' ? 'टोकन अनुरोध' : 'Token Request');
          if (firstOpenCentre && firstCrop) {
            setConfirmationCard({ centreId: firstOpenCentre.id, centreName: firstOpenCentre.nameMr, cropId: firstCrop.id, cropName: firstCrop.nameMr, date: 'उद्या', time: '10:00 - 11:30', actionType: 'BOOK_TOKEN' });
          }
        } else if (lower.includes('कागदपत्रे') || lower.includes('document') || lower.includes('कागज') || lower.includes('7/12') || lower.includes('712')) {
          resp = useLang === 'mr'
            ? '७/१२ उतारा, आधार कार्ड, बँक पासबुक आणि ई-पीक पाहणी पावती सोबत आणा.'
            : (useLang === 'hi' ? 'खसरा/खतौनी, आधार, बैंक पासबुक और ई-पीक रसीद साथ लाएं।' : 'Bring 7/12 land record, Aadhaar, bank passbook and e-Peek receipt.');
          understood = useLang === 'mr' ? 'कागदपत्रे यादी' : (useLang === 'hi' ? 'दस्तावेज़ सूची' : 'Documents Checklist');
        } else {
          resp = useLang === 'mr'
            ? 'मला नीट समजले नाही. कृपया "केंद्र चालू आहे का", "प्रतीक्षा वेळ किती", "सोयाबीन घेत आहेत का", "टोकन हवे" असे बोला.'
            : (useLang === 'hi' ? 'ठीक से समझ नहीं आया। "केंद्र खुला है", "प्रतीक्षा कितनी", "सोयाबीन ले रहे हैं" या "टोकन चाहिए" कहें।' : 'Could not understand. Try: "Is centre open?", "What is the wait time?", "Accepting soybean?", or "I need a token".');
          understood = useLang === 'mr' ? 'अज्ञात प्रश्न' : (useLang === 'hi' ? 'अज्ञात प्रश्न' : 'Unknown Query');
        }
        setUnderstoodText(understood);
        setResponseText(resp);
        speakResponse(resp, useLang);
      });
  };

  // TTS with Python Backend gTTS Stream & SpeechSynthesis Fallback
  // overrideLang allows passing the correct lang even from inside stale closures
  const speakResponse = (text, overrideLang, rate) => {
    if (isMuted) return;
    const useLangTts = overrideLang || langRef.current;
    const useRate = rate !== undefined ? rate : (isSlow ? 0.75 : 1.0);

    fetch('/api/voice/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, lang: useLangTts, slow: isSlow, base64: true })
    })
      .then(res => res.json())
      .then(data => {
        if (data.audioUrl) {
          if (audioPlayerRef.current) { audioPlayerRef.current.pause(); }
          const audio = new Audio(data.audioUrl);
          audioPlayerRef.current = audio;
          setIsPlayingAudio(true);
          audio.onended = () => setIsPlayingAudio(false);
          audio.onerror = () => fallbackBrowserSpeech(text, useRate, useLangTts);
          audio.play().catch(() => fallbackBrowserSpeech(text, useRate, useLangTts));
        } else {
          fallbackBrowserSpeech(text, useRate, useLangTts);
        }
      })
      .catch(() => fallbackBrowserSpeech(text, useRate, useLangTts));
  };

  const fallbackBrowserSpeech = (text, rate, overrideLang) => {
    if (!('speechSynthesis' in window)) return;
    const useLang = overrideLang || langRef.current;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = useLang === 'mr' ? 'mr-IN' : (useLang === 'hi' ? 'hi-IN' : 'en-IN');
    utterance.rate = rate || 1.0;
    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  };

  // Prompt chips — language-specific, send correct language text to the NLU
  const promptChips = lang === 'hi' ? [
    { label: 'आज केंद्र खुला है क्या?', query: 'आज केंद्र खुला है क्या?' },
    { label: 'प्रतीक्षा कितनी देर है?', query: 'कितनी देर प्रतीक्षा करनी होगी?' },
    { label: 'आज सोयाबीन ले रहे हैं क्या?', query: 'आज सोयाबीन ले रहे हैं क्या?' },
    { label: 'MSP दर क्या है?', query: 'सोयाबीन का MSP दर क्या है?' },
    { label: 'मुझे कल सुबह का टोकन चाहिए', query: 'मुझे कल सुबह का टोकन चाहिए' },
    { label: 'कागजात कौन से चाहिए?', query: 'कागजात कौन से चाहिए?' }
  ] : lang === 'en' ? [
    { label: 'Is the centre open today?', query: 'Is the centre open today?' },
    { label: 'What is the wait time?', query: 'How long is the waiting time?' },
    { label: 'Is soybean being accepted?', query: 'Is soybean being accepted today?' },
    { label: 'What is the MSP for soybean?', query: 'What is the MSP rate for soybean?' },
    { label: 'I need a token tomorrow', query: 'I want a token for tomorrow morning' },
    { label: 'Which documents to bring?', query: 'Which documents should I bring?' }
  ] : [
    { label: 'आज केंद्र उघडे आहे का?', query: 'आज केंद्र उघडे आहे का?' },
    { label: 'प्रतीक्षा वेळ किती आहे?', query: 'प्रतीक्षा वेळ किती आहे? रांग किती आहे?' },
    { label: 'आज सोयाबीन घेत आहेत का?', query: 'आज सोयाबीन घेत आहेत का? स्वीकार करत आहेत का?' },
    { label: 'सोयाबीन MSP भाव किती?', query: 'सोयाबीन चा MSP भाव किती आहे? आधारभूत किंमत काय?' },
    { label: 'उद्या सकाळचे टोकन हवे', query: 'मला उद्या सकाळी टोकन हवे आहे. टोकन बुक करायचे आहे.' },
    { label: 'कागदपत्रे कोणती आणायची?', query: 'कागदपत्रे कोणती आणायची? आवश्यक कागदपत्रे कोणती?' }
  ];

  return (
    <div className="glass-overlay-bg">
      <div className="glass-modal-card" style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '26px' }}>🎙️</span>
            <strong style={{ fontSize: '1.2rem' }}>MandiMitra Voice Engine (STT & TTS)</strong>
          </div>
          <button className="btn-core btn-glass" onClick={() => { stopSpeaking(); stopListening(); onClose(); }} style={{ padding: '6px 12px' }}>
            ✕
          </button>
        </div>

        <div style={{ fontSize: '12px', color: 'var(--text-dim)', background: 'rgba(0,0,0,0.06)', borderRadius: 'var(--radius-pill)', padding: '6px 14px', display: 'inline-block', marginBottom: '22px' }}>
          🔒 {t('privacyNote')}
        </div>

        {/* Large Push-to-Talk Button */}
        <div style={{ margin: '0 auto 18px', display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={isListening ? stopListening : startListening}
            className="radar-mic-circle"
            style={{
              width: '96px',
              height: '96px',
              fontSize: '44px',
              background: isListening ? 'linear-gradient(135deg, #ef4444, #f97316)' : 'linear-gradient(135deg, #f59e0b, #d97706)',
              cursor: 'pointer',
              border: '4px solid #ffffff'
            }}
          >
            <Icons.Mic />
          </button>
        </div>

        {/* Sound Equalizer Wave */}
        <div className={`sound-equalizer ${isListening ? 'listening' : ''}`} style={{ justifyContent: 'center', marginBottom: '14px' }}>
          <div className="sound-bar-unit"></div>
          <div className="sound-bar-unit"></div>
          <div className="sound-bar-unit"></div>
          <div className="sound-bar-unit"></div>
          <div className="sound-bar-unit"></div>
        </div>

        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '4px' }}>
          {isListening ? t('voiceListening') : t('voiceTapToSpeak')}
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '18px' }}>
          {t('voicePromptHelp')}
        </p>

        {/* Transcript Review */}
        {transcript && (
          <div className="glass-subtle" style={{ padding: '16px', textAlign: 'left', marginBottom: '18px', borderLeft: '4px solid var(--accent-gold)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>
              {t('voiceRecognized')}
            </div>
            {isEditing ? (
              <input
                type="text"
                className="input-glass"
                value={transcript}
                onChange={e => setTranscript(e.target.value)}
                style={{ marginTop: '6px' }}
              />
            ) : (
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary-900)', margin: '6px 0' }}>
                “{transcript}”
              </div>
            )}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button className="btn-core btn-glass" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Done' : `✏️ ${t('voiceEdit')}`}
              </button>
              <button className="btn-core btn-glass" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={startListening}>
                🔄 {t('voiceSpeakAgain')}
              </button>
              <button className="btn-core btn-gold" style={{ padding: '6px 14px', fontSize: '12px' }} onClick={() => processVoiceQuery(transcript)}>
                ✓ {t('voiceConfirm')}
              </button>
            </div>
          </div>
        )}

        {/* Verified Answer Card with HD Audio Player */}
        {responseText && (
          <div className="glass-subtle" style={{ padding: '18px', textAlign: 'left', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.35)', marginBottom: '18px' }}>
            <div style={{ fontSize: '11px', color: 'var(--accent-gold-hover)', fontWeight: 800, textTransform: 'uppercase' }}>
              🏛️ अधिकृत उत्तर (Verified Response):
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', margin: '8px 0', lineHeight: 1.5 }}>
              {responseText}
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '12px', flexWrap: 'wrap' }}>
              <button className="btn-core btn-glass" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => speakResponse(responseText)}>
                ▶️ Play
              </button>
              <button className="btn-core btn-glass" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={stopSpeaking}>
                ⏹️ Stop
              </button>
              <button
                className={`btn-core ${isSlow ? 'btn-gold' : 'btn-glass'}`}
                style={{ padding: '6px 12px', fontSize: '12px' }}
                onClick={() => {
                  const next = !isSlow;
                  setIsSlow(next);
                  speakResponse(responseText, next ? 0.75 : 1.0);
                }}
              >
                🐢 Slow (0.75x)
              </button>
              <button className="btn-core btn-glass" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? '🔇 Unmute' : '🔊 Mute'}
              </button>
            </div>
          </div>
        )}

        {/* Consequential Action Confirmation */}
        {confirmationCard && (
          <div className="glass-subtle" style={{ padding: '16px', textAlign: 'left', border: '2px solid var(--accent-gold)', marginBottom: '18px' }}>
            <strong style={{ color: 'var(--accent-gold)', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
              ⚠️ टोकन आरक्षण पुष्टीकरण (Confirm Action)
            </strong>
            <div style={{ fontSize: '13px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
              <div>Centre: <strong>{confirmationCard.centreName}</strong></div>
              <div>Crop: <strong>{confirmationCard.cropName}</strong></div>
              <div>Date: <strong>{confirmationCard.date}</strong></div>
              <div>Time: <strong>{confirmationCard.time}</strong></div>
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button className="btn-core btn-glass" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setConfirmationCard(null)}>
                ✕ Cancel
              </button>
              <button
                className="btn-core btn-emerald"
                style={{ padding: '6px 16px', fontSize: '12px' }}
                onClick={() => {
                  // Build booking payload from server-provided confirmationCard data
                  const card = confirmationCard;
                  const centreId = card.centreId || (centres && centres.find(c => c.nameMr === card.centreName)?.id) || 'centre-1';
                  const cropId = card.cropId || (crops && crops.find(c => c.nameMr === card.cropName || c.nameEn === card.cropName)?.id) || 'soybean';
                  const chosenCentre = (centres || []).find(c => c.id === centreId) || {};
                  const payload = {
                    farmerId: 'FARM-084',
                    centreId,
                    cropId,
                    estimatedQtyQuintals: 25,
                    timeWindow: card.time || '10:00 - 11:30'
                  };
                  // Call server to persist the booking
                  fetch('/api/bookings/reserve', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                  })
                    .then(r => r.json())
                    .then(data => {
                      onBookingConfirmed(data.booking || data);
                      setConfirmationCard(null);
                      onClose();
                    })
                    .catch(() => {
                      // Offline fallback — create a local booking using card data
                      const fallbackBooking = {
                        id: `MM-VOICE-${Math.floor(100 + Math.random() * 900)}`,
                        farmerId: 'FARM-084',
                        centreId,
                        cropId,
                        estimatedQtyQuintals: 25,
                        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                        timeWindow: card.time || '10:00 - 11:30',
                        status: 'BOOKED',
                        createdAt: new Date().toISOString()
                      };
                      onBookingConfirmed(fallbackBooking);
                      setConfirmationCard(null);
                      onClose();
                    });
                }}
              >
                ✓ Confirm Action
              </button>
            </div>
          </div>
        )}

        {/* 1-Click Sample Chips */}
        <div style={{ textAlign: 'left', marginTop: '18px' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary-900)', textTransform: 'uppercase', marginBottom: '8px' }}>
            💡 1-Click Test Queries:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {promptChips.map((chip, idx) => (
              <button
                key={idx}
                className="btn-core btn-glass"
                style={{ padding: '6px 12px', fontSize: '11px' }}
                onClick={() => {
                  setTranscript(chip.query);
                  processVoiceQuery(chip.query);
                }}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Mount React 18 Application
const container = document.getElementById('root') || document.getElementById('app');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<MandiMitraApp />);
}
