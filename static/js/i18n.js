/**
 * MandiMitra — Trilingual Localization Dictionary (Marathi, Hindi & English)
 * Strict public-service tone: Direct, clear, and dignified.
 */

export const i18n = {
  currentLang: 'mr', // 'mr' | 'hi' | 'en'

  dict: {
    // ----------------------------------------------------
    // MARATHI (मराठी)
    // ----------------------------------------------------
    mr: {
      appName: 'मंडीमित्र',
      appTagline: 'प्रवासाआधी माहिती, योग्य वेळ आणि विश्वास',
      taglineShort: 'प्रवासाआधी नक्की माहिती घ्या',
      disclaimerShort: 'हे अधिकृत केंद्र टोकन सहाय्यक आहे. अंतिम तपासणी व स्वीकार केंद्रावरच होईल.',
      
      // Topbar & Nav
      roleFarmer: 'शेतकरी मित्र',
      roleStaff: 'खरेदी केंद्र कर्मचारी',
      roleAdmin: 'जिल्हा प्रशासन',
      offlineMode: 'ऑफलाइन मोड',
      onlineStatus: 'कनेक्टेड (Online)',
      offlineStatus: 'इंटरनेट नाही (Offline)',
      changesSavedLocally: 'बदल या फोन/डिव्हाइसवर सेव्ह केले आहेत',
      
      // Farmer Navigation
      navHome: 'मुख्य पान',
      navCentres: 'केंद्र शोधा',
      navMyToken: 'माझे टोकन',
      navTrack: 'मालाची स्थिती',
      navHelp: 'मदत व संपर्क',
      
      // Farmer Home Screen
      nextActionTitle: 'तुमची पुढील पायरी',
      noActiveBooking: 'केंद्रावर जाण्यापूर्वी माहिती तपासा.',
      noActiveBookingSub: 'तुमच्या पिकाची खरेदी सुरू आहे का आणि वेळ उपलब्ध आहे का हे आधीच जाणून घ्या.',
      activeBookingAlert: 'तुमची भेट उद्या सकाळी {time} वाजता {centre} येथे निश्चित आहे.',
      tokenNumberLabel: 'टोकन क्रमांक',
      
      // Voice Hero Button
      askInMarathi: 'आवाजात बोला / विचारा (Voice)',
      voiceHeroSub: 'केंद्र स्थिती, चालू पिके किंवा टोकनबद्दल थेट विचारा',
      orUseText: 'किंवा खालील पर्याय निवडा',
      
      // 3 Primary Action Cards
      actionCheckCentreTitle: '१. खरेदी केंद्र तपासा',
      actionCheckCentreDesc: 'केंद्राची चालू स्थिती, आजची गर्दी व पिकांची खरेदी माहिती जाणून घ्या.',
      actionBookTokenTitle: '२. वेळ / टोकन बुक करा',
      actionBookTokenDesc: 'केंद्रावर न ताटकळता तुमच्या सोयीची वेळ आधीच आरक्षित करा.',
      actionTrackProduceTitle: '३. जमा मालाची स्थिती पहा',
      actionTrackProduceDesc: 'वजन, गुणवत्ता तपासणी व पेमेंट मंजुरीचा टप्पा थेट ट्रॅक करा.',
      
      // Centre Search & Details
      searchCentresTitle: 'अधिकृत खरेदी केंद्र शोधा',
      selectDistrict: 'जिल्हा निवडा',
      selectCrop: 'पीक निवडा',
      allDistricts: 'सर्व जिल्हे',
      allCrops: 'सर्व पिके',
      openToday: 'आज चालू आहे',
      closedToday: 'आज बंद आहे',
      tempUnavailable: 'तात्पुरते स्थगित',
      slotsAvailable: 'स्लॉट उपलब्ध आहेत',
      slotsFull: 'आजची क्षमता पूर्ण',
      lastUpdated: 'माहिती अद्यतन वेळ',
      staleWarning: 'माहिती जुनी असू शकते (> २ तास)',
      estWaitTime: 'अंदाजे वेळ (अंदाज)',
      workingHours: 'कामाचे तास',
      dailyCapacity: 'दैनिक क्षमता',
      weighingScales: 'वजन काटे (लाईन्स)',
      contactHelp: 'केंद्राशी संपर्क साधा',
      viewDetails: 'तपशील व स्लॉट पहा',
      
      // Readiness Check
      readinessTitle: 'केंद्रावर जाण्यापूर्वी पूर्व-तपासणी (Readiness Check)',
      readinessNotice: 'टीप: ही प्राथमिक डिजिटल पडताळणी आहे. अंतिम गुणवत्ता तपासणी आणि स्वीकार खरेदी केंद्रावरच होईल.',
      readyToVisit: 'भेट निश्चित करण्यासाठी तयार (Ready)',
      infoMissing: 'काही माहिती अपूर्ण आहे',
      verifyAtCentre: 'केंद्रावर पडताळणी आवश्यक',
      ruleSeason: 'चालू खरेदी हंगाम वैध आहे',
      ruleRegistration: 'शेतकरी नोंदणी (7/12 व आधार लिंक खाते)',
      ruleActiveToken: 'सक्रिय टोकन मर्यादा (१ शेतकरी १ टोकन)',
      ruleCropMatch: 'निवडलेले केंद्र या पिकाची खरेदी करते',
      
      // Booking Wizard
      bookingWizardTitle: 'वेळ आणि टोकन आरक्षण',
      step1: '१. पीक',
      step2: '२. केंद्र',
      step3: '३. प्रमाण',
      step4: '४. वेळ',
      step5: '५. पावती',
      quantityInQuintals: 'अंदाजे पीक प्रमाण (क्विंटलमध्ये)',
      enterQuantity: 'उदा. २५',
      chooseTimeWindow: 'तुमची सोयीची वेळ निवडा',
      fairnessExplanation: 'केंद्राच्या वजन काटा क्षमतेनुसार ही वेळ उपलब्ध करण्यात आली आहे.',
      confirmBookingBtn: 'टोकन निश्चित करा',
      cancelBtn: 'रद्द करा',
      bookingSuccess: 'तुमचे टोकन यशस्वीरित्या बुक झाले आहे!',
      bookingDisclaimer: 'हे टोकन केवळ वेळेचे नियोजन करते. हमीभाव किंवा खरेदीची अंतिम मान्यता केंद्रावरील भौतिक तपासणीवर अवलंबून आहे.',
      
      // My Token Slip
      myTokenTitle: 'तुमचा अधिकृत भेट पास / टोकन',
      scheduledDate: 'नियोजित तारीख',
      scheduledTime: 'नियोजित वेळ',
      farmerName: 'शेतकऱ्याचे नाव',
      contactPhone: 'मोबाईल क्रमांक',
      documentsToCarry: 'केंद्रावर नेताना लागणारी कागदपत्रे:',
      doc1: '१. मूळ ७/१२ उतारा (चालू पीक नोंद असलेला)',
      doc2: '२. आधार कार्ड व आधार लिंक बँक पासबुक झेरॉक्स',
      doc3: '३. शेतकरी नोंदणी पावती व मोबाईल',
      downloadSlip: 'टोकन पावती डाऊनलोड करा / प्रिंट करा',
      cancelSlotBtn: 'टोकन रद्द करा',
      rescheduleBtn: 'वेळ बदला (Reschedule)',
      waitlistAlert: 'सध्या स्लॉट पूर्ण आहेत. तुमचे नाव प्रतीक्षा यादीत (Waitlist) नोंदवले गेले आहे. स्लॉट उपलब्ध होताच कळवले जाईल.',
      
      // Produce Tracking
      trackingTitle: 'जमा मालाचा प्रवास व स्थिती',
      enterTokenToTrack: 'टोकन क्रमांक किंवा मोबाईल नंबर टाका',
      trackBtn: 'स्थिती पहा',
      stage1: 'टोकन नोंदणी पूर्ण',
      stage2: 'केंद्रावर आगमन नोंदवले',
      stage3: 'गुणवत्ता व आर्द्रता तपासणी',
      stage4: 'माल स्वीकारला / पुनर्पडताळणी',
      stage5: 'पेमेंट प्रक्रिया सुरू',
      inspectorNotes: 'गुणवत्ता निरीक्षकाची नोंद',
      moistureLevel: 'आर्द्रतेचे प्रमाण (Moisture)',
      foreignMatter: 'कचरा / विजातीय घटक',
      qualityGrade: 'गुणवत्ता प्रत (Grade)',
      rejectionReason: 'पुनर्पडताळणी / न स्वीकारण्याचे कारण',
      appealContact: 'काही शंका असल्यास संपर्क',
      
      // Voice Assistant Modal
      voiceModalTitle: 'व्हॉइस सहाय्यक (Voice Assistant)',
      listeningPrompt: 'मी ऐकत आहे... तुमचा प्रश्न बोला',
      micClickToSpeak: 'माईकवर क्लिक करून बोला',
      recognizedTextLabel: 'तुम्ही विचारले:',
      systemUnderstood: 'मी समजलो की:',
      confirmYes: 'हो, बरोबर आहे',
      confirmNo: 'नाही, पुन्हा बोला',
      voiceExamplesTitle: 'तुम्ही हे विचारू शकता:',
      intent1: '“राहुरी केंद्रावर आज सोयाबीन घेत आहेत का?”',
      intent2: '“उद्या सकाळी टोकन मिळेल का?”',
      intent3: '“खरेदीसाठी कोणती कागदपत्रे लागतील?”',
      intent4: '“माझ्या टोकनची स्थिती काय आहे?”',
      intent5: '“मदत प्रतिनिधीशी बोलायचे आहे”',
      voiceFallback: 'मला नीट समजले नाही. कृपया पुन्हा बोला किंवा मदतीसाठी केंद्र प्रतिनिधीशी संपर्क करा.',
      
      // Staff Portal
      staffDashboardTitle: 'खरेदी केंद्र कर्मचारी डॅशबोर्ड',
      selectMyCentre: 'माझे केंद्र निवडा:',
      centreControls: 'केंद्राचे थेट नियंत्रण',
      statusOpen: 'खरेदी सुरू (Open)',
      statusClosed: 'आज बंद (Closed)',
      statusDelayed: 'तांत्रिक अडचण / विलंब',
      reasonForStatus: 'स्थिती बदलण्याचे कारण (शेतकऱ्यांना दिसेल)',
      saveStatusBtn: 'स्थिती अपडेट करा',
      
      capacitySettingsTitle: 'दैनिक क्षमता व वजन काटे कॉन्फिगरेशन',
      activeWeighingLines: 'सक्रिय वजन काटे (Lines)',
      avgServiceMinutes: 'प्रति शेतकरी सरासरी वेळ (मिनिटे)',
      maxDailyFarmers: 'दैनिक कमाल शेतकरी मर्यादा',
      saveCapacityBtn: 'क्षमता सेव्ह करा',
      
      arrivalsQueueTitle: 'आजच्या अपेक्षित शेतकरी आगमनाची यादी',
      searchFarmerPlaceholder: 'टोकन क्रमांक किंवा फोन नंबर शोधा...',
      colToken: 'टोकन',
      colFarmer: 'शेतकरी',
      colCropQty: 'पीक व प्रमाण',
      colSlot: 'वेळ',
      colStatus: 'सद्यस्थिती',
      colAction: 'कृती',
      markArrivedBtn: 'आगमन नोंदवा (Arrived)',
      performQCBtn: 'गुणवत्ता तपासणी करा',
      recordWeightBtn: 'वजन नोंदवा',
      startPaymentBtn: 'पेमेंट पाठवा',
      
      // Staff Quality Modal
      qcModalTitle: 'गुणवत्ता व आर्द्रता तपासणी फॉर्म',
      qcMoistureLabel: 'आर्द्रता मीटर वाचन (%) (मानक: १२% पर्यंत)',
      qcGradeLabel: 'गुणवत्ता प्रत (Grade)',
      gradeA: 'उत्कृष्ट (Grade A)',
      gradeB: 'स्वीकार्य (Grade B)',
      gradeRecheck: 'पुनर्पडताळणी आवश्यक (Recheck / Dry Needed)',
      qcReasonLabel: 'पुनर्पडताळणी / अस्वीकाराचे कारण (जर लागू असेल तर):',
      reasonHighMoisture: 'आर्द्रता अधिक आहे (कृपया उन्हात सुकवून आणावे)',
      reasonForeignMatter: 'कचरा / मातीचे प्रमाण विहित मर्यादेपेक्षा जास्त आहे',
      reasonDamagedGrain: 'कीडग्रस्त किंवा डागी दाण्यांचे प्रमाण जास्त आहे',
      reasonDocMismatch: '७/१२ उतारा किंवा बँक खात्यात विसंगती',
      submitQCBtn: 'तपासणी निष्कर्ष जतन करा',
      
      // Offline Sync & Conflicts
      syncQueueTitle: 'ऑफलाइन सिंक व्यवस्थापक (Offline Sync Manager)',
      pendingSyncItems: 'स्थानिक पातळीवर जतन केलेले बदल (Pending Sync):',
      syncNowBtn: 'आताच सर्व डेटा सिंक करा',
      conflictAlertTitle: 'डेटा अपडेट विसंगती (Sync Conflict Detected)',
      conflictDesc: 'डिव्हाइसवरील डेटा आणि मुख्य सर्व्हरवरील माहितीमध्ये फरक आढळला आहे.',
      keepServerVersion: 'सर्व्हरवरील अद्ययावत ठेवा',
      keepLocalVersion: 'माझे ऑफलाइन बदल लागू करा',
      resolveConflictBtn: 'तंटा सोडवा व सिंक करा',
      
      // District / Administrator
      adminTitle: 'जिल्हा खरेदी नियंत्रण व ऑडिट प्रशासन',
      totalCentresCount: 'एकूण नोंदणीकृत केंद्रे',
      activeCentresCount: 'आज सुरू असलेली केंद्रे',
      totalFarmersServed: 'आज सेवा दिलेले शेतकरी',
      totalProcuredQuintals: 'आज खरेदी केलेला माल (क्विंटल)',
      loadMonitorTitle: 'केंद्र क्षमता व गर्दी नियंत्रण (Load Monitor)',
      loadNormal: 'सुरळीत क्षमता (Optimal)',
      loadOverloaded: 'अति-गर्दी / भारित (Overloaded)',
      loadUnderused: 'कमी वापर (Underused)',
      
      auditLogTitle: 'अपरिवर्तनीय ऑडिट इतिहास (Append-Only Audit History)',
      auditSearchPlaceholder: 'टोकन, शेतकरी किंवा कृती शोधा...',
      colTimestamp: 'वेळ व तारीख',
      colActor: 'कर्ता (Role)',
      colActionType: 'कृती (Action)',
      colDetails: 'तपशील व कारण',
      
      // Helpline
      helplineTitle: 'शेतकरी मदत कक्ष व ऑपरेटर संपर्क',
      talukaOperator: 'तालुका खरेदी ऑपरेटर',
      stateHelpline: 'राज्य कृषी पणन महामंडळ टोल-फ्री क्रमांक',
      helplineNumber: '1800-233-0244 / 020-24260241'
    },

    // ----------------------------------------------------
    // HINDI (हिन्दी)
    // ----------------------------------------------------
    hi: {
      appName: 'मंडीमित्र',
      appTagline: 'सफ़र से पहले जानकारी, सही समय और भरोसा',
      taglineShort: 'सफ़र से पहले पूरी जानकारी लें',
      disclaimerShort: 'यह आधिकारिक खरीद केंद्र टोकन सहायक है। अंतिम निरीक्षण व स्वीकृति केंद्र पर ही होगी।',
      
      // Topbar & Nav
      roleFarmer: 'किसान मित्र',
      roleStaff: 'खरीद केंद्र कर्मी',
      roleAdmin: 'जिला प्रशासन',
      offlineMode: 'ऑफलाइन मोड',
      onlineStatus: 'कनेक्टेड (Online)',
      offlineStatus: 'इंटरनेट नहीं (Offline)',
      changesSavedLocally: 'बदलाव इस फोन/डिवाइस पर सुरक्षित कर लिए गए हैं',
      
      // Farmer Navigation
      navHome: 'मुख्य पृष्ठ',
      navCentres: 'केंद्र खोजें',
      navMyToken: 'मेरा टोकन',
      navTrack: 'उपज की स्थिति',
      navHelp: 'मदद व संपर्क',
      
      // Farmer Home Screen
      nextActionTitle: 'आपका अगला कदम',
      noActiveBooking: 'केंद्र जाने से पहले जानकारी जांचें।',
      noActiveBookingSub: 'जानिए क्या आपकी फसल की खरीद चालू है और क्या समय स्लॉट उपलब्ध है।',
      activeBookingAlert: 'आपकी भेंट कल सुबह {time} बजे {centre} पर निर्धारित है।',
      tokenNumberLabel: 'टोकन संख्या',
      
      // Voice Hero Button
      askInMarathi: 'आवाज़ में बोलें / पूछें (Voice)',
      voiceHeroSub: 'केंद्र स्थिति, चालू फसलें या टोकन के बारे में सीधे पूछें',
      orUseText: 'या नीचे दिए गए विकल्प चुनें',
      
      // 3 Primary Action Cards
      actionCheckCentreTitle: '१. खरीद केंद्र जांचें',
      actionCheckCentreDesc: 'केंद्र की चालू स्थिति, आज की भीड़ व फसल खरीद की जानकारी पाएं।',
      actionBookTokenTitle: '२. समय / टोकन बुक करें',
      actionBookTokenDesc: 'केंद्र पर बिना लाइन में लगे अपनी सुविधानुसार समय पहले से आरक्षित करें।',
      actionTrackProduceTitle: '३. जमा फसल की स्थिति देखें',
      actionTrackProduceDesc: 'वजन, गुणवत्ता जांच व बैंक भुगतान की स्थिति सीधे ट्रैक करें।',
      
      // Centre Search & Details
      searchCentresTitle: 'अधिकृत खरीद केंद्र खोजें',
      selectDistrict: 'जिला चुनें',
      selectCrop: 'फसल चुनें',
      allDistricts: 'सभी जिले',
      allCrops: 'सभी फसलें',
      openToday: 'आज खुला है',
      closedToday: 'आज बंद है',
      tempUnavailable: 'अस्थायी रूप से स्थगित',
      slotsAvailable: 'स्लॉट उपलब्ध हैं',
      slotsFull: 'आज की क्षमता पूर्ण',
      lastUpdated: 'अंतिम अपडेट समय',
      staleWarning: 'जानकारी पुरानी हो सकती है (> २ घंटे)',
      estWaitTime: 'अनुमानित समय (अनुमान)',
      workingHours: 'कार्य समय',
      dailyCapacity: 'दैनिक क्षमता',
      weighingScales: 'वजन कांटे (लाइन्स)',
      contactHelp: 'केंद्र से संपर्क करें',
      viewDetails: 'विवरण व स्लॉट देखें',
      
      // Readiness Check
      readinessTitle: 'केंद्र जाने से पूर्व-जांच (Readiness Check)',
      readinessNotice: 'सूचना: यह प्रारंभिक डिजिटल जांच है। अंतिम गुणवत्ता जांच और स्वीकृति खरीद केंद्र पर ही होगी।',
      readyToVisit: 'भेंट तय करने के लिए तैयार (Ready)',
      infoMissing: 'कुछ जानकारी अधूरी है',
      verifyAtCentre: 'केंद्र पर सत्यापन आवश्यक',
      ruleSeason: 'चालू खरीद सीजन वैध है',
      ruleRegistration: 'किसान पंजीकरण (खसरा/खतौनी व आधार लिंक खाता)',
      ruleActiveToken: 'सक्रिय टोकन सीमा (१ किसान १ टोकन)',
      ruleCropMatch: 'चुना हुआ केंद्र इस फसल की खरीद करता है',
      
      // Booking Wizard
      bookingWizardTitle: 'समय और टोकन आरक्षण',
      step1: '१. फसल',
      step2: '२. केंद्र',
      step3: '३. मात्रा',
      step4: '४. समय',
      step5: '५. पावती',
      quantityInQuintals: 'अनुमानित फसल मात्रा (क्विंटल में)',
      enterQuantity: 'उदा. २५',
      chooseTimeWindow: 'अपनी सुविधानुसार समय चुनें',
      fairnessExplanation: 'केंद्र के वजन कांटा क्षमता के अनुसार यह समय उपलब्ध कराया गया है।',
      confirmBookingBtn: 'टोकन पक्का करें',
      cancelBtn: 'रद्द करें',
      bookingSuccess: 'आपका टोकन सफलतापूर्वक बुक हो गया है!',
      bookingDisclaimer: 'यह टोकन केवल समय का नियोजन करता है। एमएसपी या खरीद की अंतिम मंजूरी केंद्र पर भौतिक जांच पर निर्भर है।',
      
      // My Token Slip
      myTokenTitle: 'आपका अधिकृत पास / टोकन',
      scheduledDate: 'निर्धारित तिथि',
      scheduledTime: 'निर्धारित समय',
      farmerName: 'किसान का नाम',
      contactPhone: 'मोबाइल नंबर',
      documentsToCarry: 'केंद्र पर साथ ले जाने वाले आवश्यक दस्तावेज:',
      doc1: '१. मूल खसरा/खतौनी नकल (चालू फसल प्रविष्टि सहित)',
      doc2: '२. आधार कार्ड व आधार लिंक बैंक पासबुक फोटोकॉपी',
      doc3: '३. किसान पंजीकरण पर्ची व मोबाइल',
      downloadSlip: 'टोकन पर्ची डाउनलोड / प्रिंट करें',
      cancelSlotBtn: 'टोकन रद्द करें',
      rescheduleBtn: 'समय बदलें (Reschedule)',
      waitlistAlert: 'वर्तमान में स्लॉट भरे हैं। आपका नाम प्रतीक्षा सूची (Waitlist) में दर्ज किया गया है।',
      
      // Produce Tracking
      trackingTitle: 'जमा फसल का विवरण व स्थिति',
      enterTokenToTrack: 'टोकन नंबर या मोबाइल नंबर दर्ज करें',
      trackBtn: 'स्थिति देखें',
      stage1: 'टोकन पंजीकरण पूर्ण',
      stage2: 'केंद्र पर आगमन दर्ज',
      stage3: 'गुणवत्ता व नमी जांच',
      stage4: 'फसल स्वीकृत / पुनर्निरीक्षण',
      stage5: 'भुगतान प्रक्रिया चालू',
      inspectorNotes: 'गुणवत्ता निरीक्षक की टिप्पणी',
      moistureLevel: 'नमी का स्तर (Moisture)',
      foreignMatter: 'कचरा / अशुद्धियां',
      qualityGrade: 'गुणवत्ता ग्रेड (Grade)',
      rejectionReason: 'पुनर्निरीक्षण / अस्वीकृति का कारण',
      appealContact: 'सहायता संपर्क',
      
      // Voice Assistant Modal
      voiceModalTitle: 'वॉइस सहायक (Voice Assistant)',
      listeningPrompt: 'मैं सुन रहा हूँ... अपना सवाल बोलें',
      micClickToSpeak: 'माइक पर क्लिक करके बोलें',
      recognizedTextLabel: 'आपने पूछा:',
      systemUnderstood: 'मैं समझा कि:',
      confirmYes: 'हाँ, सही है',
      confirmNo: 'नहीं, दोबारा बोलें',
      voiceExamplesTitle: 'आप यह पूछ सकते हैं:',
      intent1: '“क्या राहुरी केंद्र पर आज सोयाबीन ले रहे हैं?”',
      intent2: '“क्या कल सुबह का टोकन मिलेगा?”',
      intent3: '“खरीद के लिए कौन से दस्तावेज लगेंगे?”',
      intent4: '“मेरे टोकन की स्थिति क्या है?”',
      intent5: '“हेल्पलाइन अधिकारी से बात करनी है”',
      voiceFallback: 'मुझे ठीक से समझ नहीं आया। कृपया दोबारा बोलें या सहायता के लिए केंद्र ऑपरेटर से संपर्क करें।',
      
      // Staff Portal
      staffDashboardTitle: 'खरीद केंद्र कर्मी डैशबोर्ड',
      selectMyCentre: 'मेरा केंद्र चुनें:',
      centreControls: 'केंद्र का सीधा नियंत्रण',
      statusOpen: 'खरीद चालू (Open)',
      statusClosed: 'आज बंद (Closed)',
      statusDelayed: 'तकनीकी विलंब / रुकावट',
      reasonForStatus: 'स्थिति बदलने का कारण (किसानों को दिखेगा)',
      saveStatusBtn: 'स्थिति अपडेट करें',
      
      capacitySettingsTitle: 'दैनिक क्षमता व वजन कांटे विन्यास',
      activeWeighingLines: 'सक्रिय वजन कांटे (Lines)',
      avgServiceMinutes: 'प्रति किसान औसत समय (मिनट)',
      maxDailyFarmers: 'दैनिक अधिकतम किसान सीमा',
      saveCapacityBtn: 'क्षमता सुरक्षित करें',
      
      arrivalsQueueTitle: 'आज के अपेक्षित किसान आगमन की सूची',
      searchFarmerPlaceholder: 'टोकन नंबर या फोन नंबर खोजें...',
      colToken: 'टोकन',
      colFarmer: 'किसान',
      colCropQty: 'फसल व मात्रा',
      colSlot: 'समय',
      colStatus: 'वर्तमान स्थिति',
      colAction: 'कार्यवाही',
      markArrivedBtn: 'आगमन दर्ज करें (Arrived)',
      performQCBtn: 'गुणवत्ता जांच करें',
      recordWeightBtn: 'वजन दर्ज करें',
      startPaymentBtn: 'भुगतान भेजें',
      
      // Staff Quality Modal
      qcModalTitle: 'गुणवत्ता व नमी जांच फॉर्म',
      qcMoistureLabel: 'नमी मीटर रीडिंग (%) (मानक: अधिकतम १२%)',
      qcGradeLabel: 'गुणवत्ता ग्रेड (Grade)',
      gradeA: 'उत्कृष्ट (Grade A)',
      gradeB: 'स्वीकार्य (Grade B)',
      gradeRecheck: 'पुनर्निरीक्षण आवश्यक (Recheck / Dry Needed)',
      qcReasonLabel: 'पुनर्निरीक्षण / अस्वीकृति का कारण (यदि लागू हो):',
      reasonHighMoisture: 'नमी अधिक है (कृपया धूप में सुखाकर लाएं)',
      reasonForeignMatter: 'कचरा / धूल-मिट्टी निर्धारित सीमा से अधिक है',
      reasonDamagedGrain: 'क्षतिग्रस्त या दागी दानों की मात्रा अधिक है',
      reasonDocMismatch: 'दस्तावेज या बैंक खाते में विसंगति',
      submitQCBtn: 'जांच निष्कर्ष सुरक्षित करें',
      
      // Offline Sync & Conflicts
      syncQueueTitle: 'ऑफलाइन सिंक प्रबंधक (Offline Sync Manager)',
      pendingSyncItems: 'स्थानीय मेमोरी में सुरक्षित बदलाव (Pending Sync):',
      syncNowBtn: 'अभी सारा डेटा सिंक करें',
      conflictAlertTitle: 'डेटा अपडेट विसंगति (Sync Conflict Detected)',
      conflictDesc: 'डिवाइस के डेटा और मुख्य सर्वर की जानकारी में अंतर पाया गया है।',
      keepServerVersion: 'सर्वर संस्करण रखें',
      keepLocalVersion: 'मेरा ऑफलाइन बदलाव लागू करें',
      resolveConflictBtn: 'विवाद हल करें व सिंक करें',
      
      // District / Administrator
      adminTitle: 'जिला खरीद नियंत्रण व ऑडिट प्रशासन',
      totalCentresCount: 'कुल पंजीकृत केंद्र',
      activeCentresCount: 'आज चालू केंद्र',
      totalFarmersServed: 'आज सेवा प्राप्त किसान',
      totalProcuredQuintals: 'आज खरीदी गई उपज (क्विंटल)',
      loadMonitorTitle: 'केंद्र क्षमता व भीड़ नियंत्रण (Load Monitor)',
      loadNormal: 'संतुलित क्षमता (Optimal)',
      loadOverloaded: 'अति-भारित (Overloaded)',
      loadUnderused: 'कम उपयोग (Underused)',
      
      auditLogTitle: 'अपरिवर्तनीय ऑडिट इतिहास (Append-Only Audit History)',
      auditSearchPlaceholder: 'टोकन, किसान या कार्य खोजें...',
      colTimestamp: 'समय व तिथि',
      colActor: 'कर्ता (Role)',
      colActionType: 'कार्यवाही (Action)',
      colDetails: 'विवरण व कारण',
      
      // Helpline
      helplineTitle: 'किसान सहायता केंद्र व ऑपरेटर संपर्क',
      talukaOperator: 'तालुका खरीद ऑपरेटर',
      stateHelpline: 'राज्य कृषि विपणन बोर्ड टोल-फ्री नंबर',
      helplineNumber: '1800-233-0244 / 020-24260241'
    },

    // ----------------------------------------------------
    // ENGLISH
    // ----------------------------------------------------
    en: {
      appName: 'MandiMitra',
      appTagline: 'Information, the right time, and confidence before your journey',
      taglineShort: 'Know Before You Go',
      disclaimerShort: 'Authorized procurement token assistant. Final inspection & acceptance remains at the centre.',
      
      // Topbar & Nav
      roleFarmer: 'Farmer Portal',
      roleStaff: 'Centre Staff Portal',
      roleAdmin: 'District Admin',
      offlineMode: 'Offline Mode',
      onlineStatus: 'Online',
      offlineStatus: 'Offline',
      changesSavedLocally: 'Changes saved locally on this device',
      
      // Farmer Navigation
      navHome: 'Home',
      navCentres: 'Check Centres',
      navMyToken: 'My Token',
      navTrack: 'Track Produce',
      navHelp: 'Help & Support',
      
      // Farmer Home Screen
      nextActionTitle: 'Your Next Action',
      noActiveBooking: 'Check a centre before you travel.',
      noActiveBookingSub: 'Verify whether procurement is active for your crop and check available time slots.',
      activeBookingAlert: 'Your appointment is tomorrow at {time} at {centre}.',
      tokenNumberLabel: 'Token Number',
      
      // Voice Hero Button
      askInMarathi: 'Ask by Voice (Voice Assistant)',
      voiceHeroSub: 'Check centre status, active crops, or book your slot directly',
      orUseText: 'Or choose an option below',
      
      // 3 Primary Action Cards
      actionCheckCentreTitle: '1. Check My Centre',
      actionCheckCentreDesc: 'View live centre status, crowd levels, and crop availability before travelling.',
      actionBookTokenTitle: '2. Book Token / Time Slot',
      actionBookTokenDesc: 'Reserve your time window without waiting in long unorganized queues.',
      actionTrackProduceTitle: '3. Track My Produce',
      actionTrackProduceDesc: 'Monitor your produce submission, quality inspection, and payment processing.',
      
      // Centre Search & Details
      searchCentresTitle: 'Authorized Procurement Centres',
      selectDistrict: 'Select District',
      selectCrop: 'Select Crop',
      allDistricts: 'All Districts',
      allCrops: 'All Crops',
      openToday: 'Open Today',
      closedToday: 'Closed Today',
      tempUnavailable: 'Temporarily Unavailable',
      slotsAvailable: 'Slots Available',
      slotsFull: 'Full For Today',
      lastUpdated: 'Last Updated',
      staleWarning: 'Information may be stale (> 2 hrs)',
      estWaitTime: 'Estimated Wait (Estimate)',
      workingHours: 'Working Hours',
      dailyCapacity: 'Daily Capacity',
      weighingScales: 'Weighing Scales',
      contactHelp: 'Contact Centre',
      viewDetails: 'View Details & Slots',
      
      // Readiness Check
      readinessTitle: 'Preliminary Readiness Check',
      readinessNotice: 'Note: This is a preliminary digital screening. Final quality inspection and acceptance remain with the procurement centre.',
      readyToVisit: 'Ready to plan a visit',
      infoMissing: 'Information Missing',
      verifyAtCentre: 'Please verify at the centre',
      ruleSeason: 'Active procurement season window',
      ruleRegistration: 'Farmer registration & Aadhaar linked bank',
      ruleActiveToken: 'Active slot fairness check (1 active slot limit)',
      ruleCropMatch: 'Selected centre handles this crop',
      
      // Booking Wizard
      bookingWizardTitle: 'Token & Time-Slot Reservation',
      step1: '1. Crop',
      step2: '2. Centre',
      step3: '3. Quantity',
      step4: '4. Slot',
      step5: '5. Pass',
      quantityInQuintals: 'Estimated Quantity (in Quintals)',
      enterQuantity: 'e.g. 25',
      chooseTimeWindow: 'Choose a Suitable Time Window',
      fairnessExplanation: 'This slot is allocated based on active weighing line capacity.',
      confirmBookingBtn: 'Confirm Token',
      cancelBtn: 'Cancel',
      bookingSuccess: 'Your token has been booked successfully!',
      bookingDisclaimer: 'This token reserves a planned visit time. It does not guarantee final crop acceptance or MSP payment, which depends on physical quality inspection at the centre.',
      
      // My Token Slip
      myTokenTitle: 'Your Official Appointment Pass / Token',
      scheduledDate: 'Scheduled Date',
      scheduledTime: 'Scheduled Time',
      farmerName: 'Farmer Name',
      contactPhone: 'Mobile Number',
      documentsToCarry: 'Required Documents to Bring:',
      doc1: '1. Original 7/12 land extract with active crop endorsement',
      doc2: '2. Aadhaar card & linked bank passbook copy',
      doc3: '3. Farmer registration slip & phone',
      downloadSlip: 'Download / Print Token Slip',
      cancelSlotBtn: 'Cancel Token',
      rescheduleBtn: 'Reschedule Slot',
      waitlistAlert: 'Slots are currently full. You have been placed on the waitlist. You will be notified as soon as a slot is released.',
      
      // Produce Tracking
      trackingTitle: 'Produce Status Timeline',
      enterTokenToTrack: 'Enter Token Number or Mobile Number',
      trackBtn: 'Track Status',
      stage1: 'Token Booked',
      stage2: 'Arrived at Centre',
      stage3: 'Quality & Moisture Checked',
      stage4: 'Accepted / Sent for Rechecking',
      stage5: 'Payment Processing Started',
      inspectorNotes: 'Quality Inspector Notes',
      moistureLevel: 'Moisture Level',
      foreignMatter: 'Foreign Matter / Impurities',
      qualityGrade: 'Quality Grade',
      rejectionReason: 'Reason for Rechecking / Non-acceptance',
      appealContact: 'Assistance Contact',
      
      // Voice Assistant Modal
      voiceModalTitle: 'Voice Assistant',
      listeningPrompt: 'Listening... Please ask your question',
      micClickToSpeak: 'Click microphone to speak',
      recognizedTextLabel: 'You asked:',
      systemUnderstood: 'Understood:',
      confirmYes: 'Yes, Confirm',
      confirmNo: 'No, Repeat',
      voiceExamplesTitle: 'Sample questions you can ask:',
      intent1: '“Is Rahuri centre open for soybean today?”',
      intent2: '“Are slots available tomorrow morning?”',
      intent3: '“Which documents should I bring?”',
      intent4: '“What is the status of my token?”',
      intent5: '“Connect me with an operator”',
      voiceFallback: 'Could not understand clearly. Please repeat or contact centre operator for assistance.',
      
      // Staff Portal
      staffDashboardTitle: 'Procurement Centre Staff Dashboard',
      selectMyCentre: 'Select My Centre:',
      centreControls: 'Live Centre Controls',
      statusOpen: 'Open for Procurement',
      statusClosed: 'Closed Today',
      statusDelayed: 'Delayed / Technical Pause',
      reasonForStatus: 'Reason for status update (publicly visible)',
      saveStatusBtn: 'Update Status',
      
      capacitySettingsTitle: 'Daily Capacity & Weighing Configuration',
      activeWeighingLines: 'Active Weighing Scales (Lines)',
      avgServiceMinutes: 'Avg Service Time per Farmer (Mins)',
      maxDailyFarmers: 'Max Daily Farmer Capacity',
      saveCapacityBtn: 'Save Capacity Settings',
      
      arrivalsQueueTitle: "Today's Expected Farmer Arrivals",
      searchFarmerPlaceholder: 'Search by token or phone...',
      colToken: 'Token',
      colFarmer: 'Farmer',
      colCropQty: 'Crop & Qty',
      colSlot: 'Slot',
      colStatus: 'Status',
      colAction: 'Action',
      markArrivedBtn: 'Mark Arrived',
      performQCBtn: 'Record Quality Check',
      recordWeightBtn: 'Record Weight',
      startPaymentBtn: 'Dispatch Payment',
      
      // Staff Quality Modal
      qcModalTitle: 'Physical Inspection & Moisture Check',
      qcMoistureLabel: 'Moisture Meter Reading (%) (Standard: max 12%)',
      qcGradeLabel: 'Crop Quality Grade',
      gradeA: 'Grade A (FAQ Standard)',
      gradeB: 'Grade B (Acceptable with deductions)',
      gradeRecheck: 'Rechecking / Sun-Drying Needed',
      qcReasonLabel: 'Standard Reason for Rechecking (if applicable):',
      reasonHighMoisture: 'Moisture exceeds permissible limit (please sun-dry for 24h)',
      reasonForeignMatter: 'Foreign matter / dirt exceeds standard limit',
      reasonDamagedGrain: 'Percentage of damaged or shriveled grains is high',
      reasonDocMismatch: 'Discrepancy in 7/12 extract or bank linkage',
      submitQCBtn: 'Save Inspection Record',
      
      // Offline Sync & Conflicts
      syncQueueTitle: 'Offline Sync Manager',
      pendingSyncItems: 'Locally Saved Updates (Pending Sync):',
      syncNowBtn: 'Synchronize All Data Now',
      conflictAlertTitle: 'Sync Conflict Detected',
      conflictDesc: 'Difference detected between local offline update and server state.',
      keepServerVersion: 'Keep Server Version',
      keepLocalVersion: 'Apply Local Offline Version',
      resolveConflictBtn: 'Resolve & Synchronize',
      
      // District / Administrator
      adminTitle: 'District Procurement & Audit Administration',
      totalCentresCount: 'Total Registered Centres',
      activeCentresCount: 'Active Centres Today',
      totalFarmersServed: 'Farmers Served Today',
      totalProcuredQuintals: 'Total Procured (Quintals)',
      loadMonitorTitle: 'Centre Load & Congestion Monitor',
      loadNormal: 'Optimal Load',
      loadOverloaded: 'Overloaded',
      loadUnderused: 'Underutilized',
      
      auditLogTitle: 'Append-Only Audit History',
      auditSearchPlaceholder: 'Search token, farmer or action...',
      colTimestamp: 'Timestamp',
      colActor: 'Actor Role',
      colActionType: 'Action Type',
      colDetails: 'Details & Justification',
      
      // Helpline
      helplineTitle: 'Farmer Support & Human Assistance',
      talukaOperator: 'Taluka Procurement Operator',
      stateHelpline: 'Maharashtra State Agr. Marketing Board Helpline',
      helplineNumber: '1800-233-0244 / 020-24260241'
    }
  },

  t(key, params = {}) {
    const lang = this.currentLang;
    let text = (this.dict[lang] && this.dict[lang][key]) || (this.dict.en && this.dict.en[key]) || key;
    for (const [pKey, pVal] of Object.entries(params)) {
      text = text.replace(`{${pKey}}`, pVal);
    }
    return text;
  },

  setLanguage(lang) {
    if (['mr', 'hi', 'en'].includes(lang)) {
      this.currentLang = lang;
      document.body.classList.remove('lang-mr', 'lang-hi', 'lang-en');
      document.body.classList.add(`lang-${lang}`);
      localStorage.setItem('mandimitra_lang', lang);
      window.dispatchEvent(new CustomEvent('mandimitra:langChanged', { detail: { lang } }));
    }
  },

  init() {
    const saved = localStorage.getItem('mandimitra_lang') || 'mr';
    this.setLanguage(saved);
  }
};
