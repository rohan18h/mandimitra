/**
 * MandiMitra — Farmer Journey View (Mobile-First Civic Design)
 * Calm, uncluttered interface providing answers before travelling.
 * Trilingual: Marathi (मराठी), Hindi (हिन्दी), and English.
 */

import { store } from '../store.js';
import { i18n } from '../i18n.js';
import { scheduler } from '../scheduler.js';
import { voiceModal } from '../components/voiceModal.js';

export const farmerView = {
  currentSubView: 'home', // 'home' | 'centres' | 'readiness' | 'booking' | 'my_token' | 'track' | 'help'
  selectedCropId: 'soybean',
  selectedDistrict: 'ahilyanagar',
  selectedCentreId: 'centre-1',
  selectedSlotId: 'slot-103',
  enteredQty: 25,
  bookingStep: 1,
  activeBookingId: null,

  getName(obj) {
    if (!obj) return '';
    const lang = i18n.currentLang;
    if (lang === 'hi') return obj.nameHi || obj.nameMr || obj.nameEn;
    if (lang === 'mr') return obj.nameMr || obj.nameEn;
    return obj.nameEn || obj.nameMr;
  },

  render() {
    return `
      <main class="container-farmer" style="padding-top: var(--space-5); padding-bottom: var(--space-8);">
        ${this.renderSubView()}
      </main>
    `;
  },

  renderSubView() {
    switch (this.currentSubView) {
      case 'centres':
        return this.renderCentresScreen();
      case 'readiness':
        return this.renderReadinessScreen();
      case 'booking':
        return this.renderBookingWizard();
      case 'my_token':
        return this.renderMyTokenScreen();
      case 'track':
        return this.renderProduceTrackScreen();
      case 'help':
        return this.renderHelpScreen();
      case 'home':
      default:
        return this.renderHomeScreen();
    }
  },

  /**
   * Screen 1: Farmer Home (Calm, Action-Oriented)
   */
  renderHomeScreen() {
    const lang = i18n.currentLang;
    const activeBooking = store.data.bookings.find(b => b.farmerId === store.data.activeFarmerProfile.id && b.status === 'BOOKED');
    const centre = activeBooking ? store.data.centres.find(c => c.id === activeBooking.centreId) : null;

    const voiceHeroTitle = lang === 'en'
      ? 'Ask by Voice — मराठी / Hindi / English'
      : (lang === 'hi' ? 'आवाज़ में पूछें — Speak in Hindi / Marathi' : 'मराठीत विचारा — Ask in Marathi');

    const voiceHeroSub = lang === 'en'
      ? 'Ask by voice. Know the right time. Travel with confidence.'
      : (lang === 'hi' ? 'बोलकर पूछें। सही समय जानें। भरोसे के साथ जाएं।' : 'बोलून विचारा. योग्य वेळ जाणून घ्या. खात्रीने जा.');

    return `
      <!-- Dynamic Next Action Banner -->
      <div class="next-action-banner">
        <span class="next-action-tag">
          ${activeBooking 
            ? '📍 ' + (lang === 'en' ? 'Active Appointment' : (lang === 'hi' ? 'निर्धारित भेंट' : 'निश्चित भेट'))
            : '🌾 ' + (lang === 'en' ? 'Start Here' : (lang === 'hi' ? 'शुरुआत करें' : 'सुरुवात करा'))}
        </span>
        <h2 class="next-action-title">
          ${activeBooking 
            ? i18n.t('activeBookingAlert', { time: activeBooking.timeWindow, centre: this.getName(centre) })
            : i18n.t('noActiveBooking')}
        </h2>
        <p class="next-action-details">
          ${activeBooking 
            ? (lang === 'en' 
                ? `Token: <strong>${activeBooking.id}</strong>. Please carry original 7/12 land extract.` 
                : (lang === 'hi' ? `टोकन संख्या: <strong>${activeBooking.id}</strong>। कृपया मूल खसरा नकल साथ लाएं।` : `टोकन क्रमांक: <strong>${activeBooking.id}</strong>. कृपया मूळ ७/१२ उतारा सोबत आणा.`))
            : i18n.t('noActiveBookingSub')}
        </p>
        <div>
          ${activeBooking ? `
            <button class="btn btn-accent btn-sm" id="viewMyTokenActionBtn">
              🎫 ${i18n.t('navMyToken')}
            </button>
          ` : `
            <button class="btn btn-accent btn-sm" id="startCheckCentreActionBtn">
              🔍 ${i18n.t('actionCheckCentreTitle')}
            </button>
          `}
        </div>
      </div>

      <!-- Large Voice Assistant Hero Button -->
      <div class="voice-hero-btn-container">
        <button class="voice-hero-btn" id="openVoiceModalHeroBtn" aria-label="Ask by Voice">
          <div>
            <span class="voice-hero-title">🎙️ ${voiceHeroTitle}</span>
            <span class="voice-hero-subtitle">${voiceHeroSub}</span>
          </div>
          <div class="voice-btn-icon-wrapper">
            <span>🎤</span>
          </div>
        </button>
      </div>

      <!-- 3 Primary Action Cards -->
      <div style="margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--text-base); color: var(--text-muted); margin-bottom: var(--space-3); text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">
          ${i18n.t('orUseText')}
        </h3>
        <div class="primary-actions-grid">
          <!-- Card 1: Check Centre -->
          <div class="action-card" id="cardCheckCentres">
            <div class="action-card-icon blue">🏢</div>
            <div class="action-card-title">${i18n.t('actionCheckCentreTitle')}</div>
            <div class="action-card-desc">${i18n.t('actionCheckCentreDesc')}</div>
          </div>

          <!-- Card 2: Book Token -->
          <div class="action-card" id="cardBookToken">
            <div class="action-card-icon amber">🎟️</div>
            <div class="action-card-title">${i18n.t('actionBookTokenTitle')}</div>
            <div class="action-card-desc">${i18n.t('actionBookTokenDesc')}</div>
          </div>

          <!-- Card 3: Track Produce -->
          <div class="action-card" id="cardTrackProduce">
            <div class="action-card-icon green">⚖️</div>
            <div class="action-card-title">${i18n.t('actionTrackProduceTitle')}</div>
            <div class="action-card-desc">${i18n.t('actionTrackProduceDesc')}</div>
          </div>
        </div>
      </div>

      <!-- Public Trust & Non-Guarantee Notice -->
      <div class="alert alert-info">
        <span style="font-size: 20px;">🛡️</span>
        <div>
          <strong>${lang === 'en' ? 'Official Procurement Rules:' : (lang === 'hi' ? 'सरकारी खरीद नियम व पारदर्शिता:' : 'शासकीय खरेदी नियम व पारदर्शकता:')}</strong>
          <div>${i18n.t('disclaimerShort')}</div>
        </div>
      </div>
    `;
  },

  /**
   * Screen 2: Centre Search & Availability
   */
  renderCentresScreen() {
    const lang = i18n.currentLang;
    const centres = store.data.centres.filter(c => {
      if (this.selectedDistrict && this.selectedDistrict !== 'all' && c.district !== this.selectedDistrict) return false;
      if (this.selectedCropId && this.selectedCropId !== 'all' && !c.handledCrops.includes(this.selectedCropId)) return false;
      return true;
    });

    return `
      <div style="margin-bottom: var(--space-5);">
        <button class="btn btn-secondary btn-sm" id="backToHomeBtn">← ${i18n.t('navHome')}</button>
      </div>

      <h1 style="margin-bottom: var(--space-4);">${i18n.t('searchCentresTitle')}</h1>

      <!-- District & Crop Filters -->
      <div class="centre-search-filters">
        <div class="grid grid-cols-2 gap-3">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">${i18n.t('selectDistrict')}</label>
            <select class="form-control form-select" id="filterDistrictSelect">
              <option value="all">${i18n.t('allDistricts')}</option>
              ${store.data.districts.map(d => `
                <option value="${d.id}" ${this.selectedDistrict === d.id ? 'selected' : ''}>${this.getName(d)}</option>
              `).join('')}
            </select>
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">${i18n.t('selectCrop')}</label>
            <select class="form-control form-select" id="filterCropSelect">
              <option value="all">${i18n.t('allCrops')}</option>
              ${store.data.crops.map(c => `
                <option value="${c.id}" ${this.selectedCropId === c.id ? 'selected' : ''}>${c.icon} ${this.getName(c)}</option>
              `).join('')}
            </select>
          </div>
        </div>
      </div>

      <!-- Centre Cards List -->
      ${centres.length === 0 ? `
        <div class="card text-center" style="padding: var(--space-8);">
          <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
          <h3>${lang === 'en' ? 'No centres match your filter criteria.' : (lang === 'hi' ? 'चुने गए विकल्पों के अनुसार केंद्र नहीं मिला।' : 'निवडलेल्या निकषांनुसार केंद्र आढळले नाही.')}</h3>
          <p style="font-size: var(--text-sm);">${lang === 'en' ? 'Try changing district or crop filters.' : (lang === 'hi' ? 'कृपया अन्य जिला या फसल चुनकर देखें।' : 'कृपया दुसरा जिल्हा किंवा पीक निवडून पहा.')}</p>
        </div>
      ` : centres.map(centre => {
        const isStale = (Date.now() - new Date(centre.lastUpdated).getTime()) > 2 * 60 * 60 * 1000;
        const updatedMinutesAgo = Math.floor((Date.now() - new Date(centre.lastUpdated).getTime()) / (60 * 1000));
        
        let statusBadge = '';
        if (centre.status === 'OPEN') statusBadge = `<span class="badge badge-success">✓ ${i18n.t('openToday')}</span>`;
        else if (centre.status === 'DELAYED') statusBadge = `<span class="badge badge-warning">⏳ ${i18n.t('tempUnavailable')}</span>`;
        else statusBadge = `<span class="badge badge-danger">✕ ${i18n.t('closedToday')}</span>`;

        return `
          <div class="centre-card">
            <div class="centre-card-header">
              <div>
                <div class="centre-name">${this.getName(centre)}</div>
                <div class="centre-location">📍 ${centre.location}</div>
              </div>
              <div>${statusBadge}</div>
            </div>

            <!-- Meta Data Grid -->
            <div class="centre-meta-grid">
              <div class="centre-meta-item">
                <span>⏰ ${i18n.t('workingHours')}</span>
                <strong>${centre.workingHours}</strong>
              </div>
              <div class="centre-meta-item">
                <span>⏱️ ${i18n.t('estWaitTime')}</span>
                <strong>${centre.waitingEstimateMinutes} ${lang === 'en' ? 'mins' : (lang === 'hi' ? 'मिनट' : 'मिनिटे')}</strong>
              </div>
              <div class="centre-meta-item">
                <span>⚖️ ${i18n.t('weighingScales')}</span>
                <strong>${centre.weighingLines} ${lang === 'en' ? 'Lines' : (lang === 'hi' ? 'कांटे' : 'काटे')}</strong>
              </div>
              <div class="centre-meta-item">
                <span>🌾 ${lang === 'en' ? 'Handled Crops' : (lang === 'hi' ? 'स्वीकृत फसलें' : 'स्वीकृत पिके')}</span>
                <strong>${centre.handledCrops.join(', ')}</strong>
              </div>
            </div>

            <!-- Last updated timestamp & Stale warning -->
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12px; margin-bottom: var(--space-4);">
              <span style="color: var(--text-muted);">
                🕒 ${i18n.t('lastUpdated')}: <strong>${updatedMinutesAgo} ${lang === 'en' ? 'mins ago' : (lang === 'hi' ? 'मिनट पहले' : 'मिनिटांपूर्वी')}</strong>
              </span>
              ${isStale ? `<span class="stale-indicator">⚠️ ${i18n.t('staleWarning')}</span>` : ''}
            </div>

            <div style="display: flex; gap: var(--space-3);">
              <button class="btn btn-outline btn-sm flex-1" onclick="alert('${this.getName(centre)}: ${centre.contactPhone}')">
                📞 ${i18n.t('contactHelp')}
              </button>
              ${centre.status === 'OPEN' ? `
                <button class="btn btn-primary btn-sm flex-1 select-centre-book-btn" data-centre-id="${centre.id}">
                  📅 ${i18n.t('actionBookTokenTitle')}
                </button>
              ` : `
                <button class="btn btn-secondary btn-sm flex-1" disabled>
                  ${lang === 'en' ? 'Unavailable' : (lang === 'hi' ? 'वर्तमान में बंद' : 'सध्या स्लॉट बंद')}
                </button>
              `}
            </div>
          </div>
        `;
      }).join('')}
    `;
  },

  /**
   * Screen 3: Preliminary Readiness Check
   */
  renderReadinessScreen() {
    const lang = i18n.currentLang;
    const profile = store.data.activeFarmerProfile;
    const readiness = scheduler.checkReadiness(profile, this.selectedCropId, this.selectedCentreId);
    const crop = store.data.crops.find(c => c.id === this.selectedCropId);
    const centre = store.data.centres.find(c => c.id === this.selectedCentreId);

    let statusBadgeClass = 'badge-success';
    let statusText = i18n.t('readyToVisit');
    if (readiness.status === 'MISSING_INFO') {
      statusBadgeClass = 'badge-danger';
      statusText = i18n.t('infoMissing');
    } else if (readiness.status === 'ACTIVE_TOKEN_EXISTS' || readiness.status === 'VERIFY_CENTRE') {
      statusBadgeClass = 'badge-warning';
      statusText = i18n.t('verifyAtCentre');
    }

    return `
      <div style="margin-bottom: var(--space-5);">
        <button class="btn btn-secondary btn-sm" id="backToCentresFromReadinessBtn">← ${i18n.t('navCentres')}</button>
      </div>

      <h1 style="margin-bottom: var(--space-3);">${i18n.t('readinessTitle')}</h1>
      <p style="font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--space-5);">
        ${lang === 'en' ? 'Verify your readiness before travelling to avoid unexpected delays.' : (lang === 'hi' ? 'केंद्र जाने से पहले सुनिश्चित करें कि आपकी प्रारंभिक तैयारी पूरी है।' : 'केंद्रावर प्रत्यक्ष जाण्यापूर्वी तुमची पूर्वतयारी पूर्ण असल्याची खात्री करा.')}
      </p>

      <div class="readiness-card">
        <div class="flex items-center justify-between" style="margin-bottom: var(--space-4);">
          <div>
            <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">
              ${lang === 'en' ? 'Selected Crop & Centre' : (lang === 'hi' ? 'चुनी गई फसल व केंद्र' : 'निवडलेले पीक व केंद्र')}
            </div>
            <div style="font-size: var(--text-lg); font-weight: 800; color: var(--color-primary);">
              ${this.getName(crop)} @ ${this.getName(centre)}
            </div>
          </div>
          <span class="badge ${statusBadgeClass}" style="font-size: 13px; padding: 6px 12px;">
            ${statusText}
          </span>
        </div>

        <!-- Verification Checklist Items -->
        <div style="margin-bottom: var(--space-5);">
          ${readiness.checks.map(check => `
            <div class="readiness-item">
              <div class="readiness-icon-state ${check.passed ? 'ok' : 'missing'}">
                ${check.passed ? '✓' : '✕'}
              </div>
              <div style="flex: 1;">
                <div style="font-size: var(--text-sm); font-weight: 700; color: var(--text-primary);">
                  ${i18n.t(check.ruleKey)}
                </div>
                <div style="font-size: var(--text-xs); color: var(--text-muted);">
                  ${check.note}
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Non-Guarantee Public Notice Alert -->
        <div class="alert alert-warning" style="margin-bottom: var(--space-5);">
          <span style="font-size: 20px;">⚖️</span>
          <div>
            <strong>${lang === 'en' ? 'Official Acceptance Notice:' : (lang === 'hi' ? 'अंतिम स्वीकृति अस्वीकरण (Disclaimer):' : 'अंतिम मंजुरी अस्वीकरण (Disclaimer):')}</strong>
            <div>${i18n.t('readinessNotice')}</div>
          </div>
        </div>

        <!-- Action Button -->
        <div>
          ${readiness.status === 'READY' ? `
            <button class="btn btn-accent btn-lg w-full" id="proceedToSlotsBtn">
              ➡️ ${lang === 'en' ? 'Proceed to Choose Time Slot' : (lang === 'hi' ? 'सुविधानुसार समय चुनें व टोकन बुक करें' : 'सोयीची वेळ निवडा व टोकन बुक करा')}
            </button>
          ` : `
            <button class="btn btn-secondary btn-lg w-full" id="fixReadinessBtn">
              ⚠️ ${lang === 'en' ? 'Check Missing Details or Pick Another Centre' : (lang === 'hi' ? 'जानकारी जांचें / दूसरा केंद्र चुनें' : 'माहिती तपासा / दुसरे केंद्र निवडा')}
            </button>
          `}
        </div>
      </div>
    `;
  },

  /**
   * Screen 4: 5-Step Capacity-Aware Booking Wizard
   */
  renderBookingWizard() {
    const lang = i18n.currentLang;
    const centre = store.data.centres.find(c => c.id === this.selectedCentreId) || store.data.centres[0];
    const crop = store.data.crops.find(c => c.id === this.selectedCropId) || store.data.crops[0];
    const availableSlots = store.data.slots.filter(s => s.centreId === centre.id);

    return `
      <div style="margin-bottom: var(--space-5);">
        <button class="btn btn-secondary btn-sm" id="backFromBookingBtn">← ${i18n.t('navHome')}</button>
      </div>

      <h1 style="margin-bottom: var(--space-4);">${i18n.t('bookingWizardTitle')}</h1>

      <!-- Step Indicator -->
      <div class="step-indicator">
        <div class="step-dot completed">1</div>
        <div class="step-dot completed">2</div>
        <div class="step-dot active">3</div>
        <div class="step-dot">4</div>
        <div class="step-dot">5</div>
      </div>

      <div class="card" style="margin-bottom: var(--space-6);">
        <!-- Summary Strip -->
        <div style="background-color: var(--color-primary-bg); border-radius: var(--radius-md); padding: var(--space-3) var(--space-4); margin-bottom: var(--space-5); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 11px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">${lang === 'en' ? 'Centre & Crop' : (lang === 'hi' ? 'खरीद केंद्र व फसल' : 'खरेदी केंद्र व पीक')}</div>
            <div style="font-size: var(--text-sm); font-weight: 800; color: var(--color-primary);">
              ${this.getName(centre)} (${this.getName(crop)})
            </div>
          </div>
          <span class="badge badge-success">${lang === 'en' ? 'Capacity OK' : (lang === 'hi' ? 'क्षमता उपलब्ध' : 'क्षमता उपलब्ध')}</span>
        </div>

        <!-- Quantity Input -->
        <div class="form-group">
          <label class="form-label">${i18n.t('quantityInQuintals')}</label>
          <input type="number" class="form-control" id="bookingQtyInput" value="${this.enteredQty}" min="1" max="200" placeholder="${i18n.t('enterQuantity')}">
          <span class="form-hint">${lang === 'en' ? 'Quantity estimate helps centre schedule weighing lines accurately.' : (lang === 'hi' ? 'अनुमानित वजन दर्ज करने से केंद्र पर भीड़ प्रबंधन में मदद मिलती है।' : 'अंदाजे वजन दिल्याने केंद्रावरील गर्दीचे योग्य नियोजन होते.')}</span>
        </div>

        <!-- Slot Selection Grid -->
        <div style="margin-top: var(--space-5); margin-bottom: var(--space-5);">
          <label class="form-label" style="margin-bottom: var(--space-2);">${i18n.t('chooseTimeWindow')}</label>
          
          <div class="slot-grid">
            ${availableSlots.map(slot => {
              const isFull = slot.booked >= slot.capacity;
              const isSelected = this.selectedSlotId === slot.id;
              const remaining = slot.capacity - slot.booked;

              return `
                <div class="slot-card ${isSelected ? 'selected' : ''} ${isFull ? 'disabled' : ''}" data-slot-id="${slot.id}">
                  <div class="slot-time">⏰ ${slot.timeWindow}</div>
                  <div class="slot-capacity">
                    ${isFull 
                      ? `<span style="color: var(--color-danger); font-weight: 700;">✕ ${i18n.t('slotsFull')}</span>`
                      : `<span style="color: var(--color-success); font-weight: 600;">✓ ${remaining} ${lang === 'en' ? 'slots left' : (lang === 'hi' ? 'स्थान शेष' : 'जागा शिल्लक')}</span>`
                    }
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Fairness Explanation Box -->
        <div class="alert alert-info" style="margin-bottom: var(--space-5);">
          <span style="font-size: 18px;">ℹ️</span>
          <div>
            <strong>${lang === 'en' ? 'Capacity Allocation Engine:' : (lang === 'hi' ? 'क्षमता व पारदर्शिता नियम:' : 'क्षमता व पारदर्शकता नियम:')}</strong>
            <div>${i18n.t('fairnessExplanation')}</div>
          </div>
        </div>

        <!-- Confirmation Action Button -->
        <button class="btn btn-accent btn-lg w-full" id="confirmBookingRequestBtn">
          🎟️ ${i18n.t('confirmBookingBtn')}
        </button>
      </div>
    `;
  },

  /**
   * Screen 5: My Token & Appointment Slip
   */
  renderMyTokenScreen(bookingId) {
    const lang = i18n.currentLang;
    const profile = store.data.activeFarmerProfile;
    const targetBooking = bookingId 
      ? store.data.bookings.find(b => b.id === bookingId)
      : store.data.bookings.find(b => b.farmerId === profile.id) || store.data.bookings[0];

    if (!targetBooking) {
      return `
        <div class="card text-center" style="padding: var(--space-8);">
          <div style="font-size: 40px; margin-bottom: 8px;">🎫</div>
          <h3>${lang === 'en' ? 'No active token found.' : (lang === 'hi' ? 'कोई सक्रिय टोकन नहीं मिला।' : 'कोणतेही सक्रिय टोकन आढळले नाही.')}</h3>
          <button class="btn btn-accent btn-sm" id="bookNewTokenFromEmptyBtn" style="margin-top: 16px;">
            ${i18n.t('actionBookTokenTitle')}
          </button>
        </div>
      `;
    }

    const centre = store.data.centres.find(c => c.id === targetBooking.centreId) || store.data.centres[0];
    const crop = store.data.crops.find(c => c.id === targetBooking.cropId) || store.data.crops[0];

    return `
      <div style="margin-bottom: var(--space-5);">
        <button class="btn btn-secondary btn-sm" id="backFromMyTokenBtn">← ${i18n.t('navHome')}</button>
      </div>

      <div class="token-slip" id="printableTokenSlip">
        <div class="token-badge-large">
          <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">
            ${i18n.t('tokenNumberLabel')}
          </div>
          <div class="token-number">${targetBooking.id}</div>
          <div style="font-size: 12px; color: var(--color-success); font-weight: 700; margin-top: 2px;">
            ● ${lang === 'en' ? 'Status: Reserved' : (lang === 'hi' ? 'समय आरक्षित (Status: Booked)' : 'वेळ आरक्षित (Status: Booked)')}
          </div>
        </div>

        <!-- Appointment Details -->
        <div class="grid grid-cols-2 gap-3" style="margin-bottom: var(--space-5);">
          <div>
            <span style="font-size: 11px; color: var(--text-muted);">${i18n.t('scheduledDate')}</span>
            <div style="font-size: var(--text-base); font-weight: 700;">${targetBooking.date}</div>
          </div>
          <div>
            <span style="font-size: 11px; color: var(--text-muted);">${i18n.t('scheduledTime')}</span>
            <div style="font-size: var(--text-base); font-weight: 700; color: var(--color-accent);">${targetBooking.timeWindow}</div>
          </div>
          <div>
            <span style="font-size: 11px; color: var(--text-muted);">${i18n.t('farmerName')}</span>
            <div style="font-size: var(--text-sm); font-weight: 600;">${targetBooking.farmerName}</div>
          </div>
          <div>
            <span style="font-size: 11px; color: var(--text-muted);">${lang === 'en' ? 'Crop & Quantity' : (lang === 'hi' ? 'फसल व मात्रा' : 'पीक व प्रमाण')}</span>
            <div style="font-size: var(--text-sm); font-weight: 600;">${this.getName(crop)} (~${targetBooking.estimatedQtyQuintals} Qt)</div>
          </div>
        </div>

        <!-- Centre Venue Box -->
        <div style="background-color: var(--bg-surface-alt); border-radius: var(--radius-md); padding: var(--space-4); margin-bottom: var(--space-5);">
          <div style="font-size: 11px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">${lang === 'en' ? 'Centre Venue' : (lang === 'hi' ? 'खरीद केंद्र का नाम व पता' : 'खरेदी केंद्राचे नाव व पत्ता')}</div>
          <div style="font-size: var(--text-base); font-weight: 700; color: var(--color-primary); margin-top: 2px;">
            ${this.getName(centre)}
          </div>
          <div style="font-size: var(--text-xs); color: var(--text-secondary); margin-top: 2px;">
            📍 ${centre.location} (Phone: ${centre.contactPhone})
          </div>
        </div>

        <!-- Simulated Visual QR Code -->
        <div class="qr-code-placeholder" title="Verification QR Code">
          <svg width="110" height="110" viewBox="0 0 100 100">
            <rect width="100" height="100" fill="#ffffff" />
            <path d="M10 10h30v30h-30z M15 15v20h20v-20z M20 20h10v10h-10z" fill="#0f2942" />
            <path d="M60 10h30v30h-30z M65 15v20h20v-20z M70 20h10v10h-10z" fill="#0f2942" />
            <path d="M10 60h30v30h-30z M15 65v20h20v-20z M20 70h10v10h-10z" fill="#0f2942" />
            <rect x="50" y="50" width="10" height="10" fill="#d97706" />
            <rect x="70" y="60" width="15" height="15" fill="#0f2942" />
            <rect x="50" y="80" width="20" height="10" fill="#0f2942" />
          </svg>
        </div>
        <div class="text-center" style="font-size: 11px; color: var(--text-muted); margin-bottom: var(--space-4);">
          ${lang === 'en' ? 'Scan this QR code at centre entrance' : (lang === 'hi' ? 'केंद्र के मुख्य द्वार पर यह क्यूआर कोड दिखाएं' : 'केंद्राच्या प्रवेशद्वारावर हा QR कोड स्कॅन करा')}
        </div>

        <!-- Required Documents Checklist -->
        <div style="border-top: 1px dashed var(--border-medium); padding-top: var(--space-4); margin-bottom: var(--space-5);">
          <div style="font-size: 13px; font-weight: 700; color: var(--color-primary); margin-bottom: 6px;">
            📋 ${i18n.t('documentsToCarry')}
          </div>
          <ul style="font-size: 12px; color: var(--text-secondary); padding-left: 18px; line-height: 1.6;">
            <li>${i18n.t('doc1')}</li>
            <li>${i18n.t('doc2')}</li>
            <li>${i18n.t('doc3')}</li>
          </ul>
        </div>

        <!-- Disclaimer -->
        <div class="alert alert-info" style="font-size: 11px; margin-bottom: var(--space-4);">
          🛡️ ${i18n.t('bookingDisclaimer')}
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          <button class="btn btn-outline btn-sm flex-1" onclick="window.print()">
            🖨️ ${i18n.t('downloadSlip')}
          </button>
          <button class="btn btn-danger btn-sm" id="cancelTokenBtn" data-booking-id="${targetBooking.id}">
            ✕ ${i18n.t('cancelSlotBtn')}
          </button>
        </div>
      </div>
    `;
  },

  /**
   * Screen 6: Produce Status Tracking Timeline
   */
  renderProduceTrackScreen() {
    const lang = i18n.currentLang;
    const profile = store.data.activeFarmerProfile;
    const trackedBooking = store.data.bookings.find(b => b.farmerId === profile.id) || store.data.bookings[1];
    const centre = trackedBooking ? store.data.centres.find(c => c.id === trackedBooking.centreId) : null;
    const crop = trackedBooking ? store.data.crops.find(c => c.id === trackedBooking.cropId) : null;

    const stages = ['BOOKED', 'ARRIVED', 'QUALITY_CHECKED', 'ACCEPTED', 'PAYMENT_INITIATED'];
    const currentStageIndex = stages.indexOf(trackedBooking.status === 'RECHECK_REQUIRED' ? 'QUALITY_CHECKED' : trackedBooking.status);

    return `
      <div style="margin-bottom: var(--space-5);">
        <button class="btn btn-secondary btn-sm" id="backFromTrackBtn">← ${i18n.t('navHome')}</button>
      </div>

      <h1 style="margin-bottom: var(--space-2);">${i18n.t('trackingTitle')}</h1>
      <p style="font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--space-5);">
        ${lang === 'en' ? 'Track live status of your produce inspection and DBT payment dispatch.' : (lang === 'hi' ? 'केंद्र पर फसल जमा करने के बाद की सटीक स्थिति यहां देखें।' : 'केंद्रावर माल जमा केल्यानंतरची अचूक स्थिती येथे थेट पहा.')}
      </p>

      <!-- Search Other Token Input -->
      <div class="card" style="margin-bottom: var(--space-5); padding: var(--space-4);">
        <div class="flex gap-2">
          <input type="text" class="form-control flex-1" id="trackTokenInput" placeholder="${i18n.t('enterTokenToTrack')}" value="${trackedBooking.id}">
          <button class="btn btn-primary btn-sm" id="searchTrackBtn">
            🔍 ${i18n.t('trackBtn')}
          </button>
        </div>
      </div>

      <!-- Produce Tracking Card -->
      <div class="card">
        <!-- Farmer & Crop Overview Strip -->
        <div class="flex items-center justify-between" style="border-bottom: 1px solid var(--border-light); padding-bottom: var(--space-4); margin-bottom: var(--space-4);">
          <div>
            <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">
              ${i18n.t('tokenNumberLabel')}
            </div>
            <div style="font-size: var(--text-lg); font-weight: 800; color: var(--color-primary);">
              ${trackedBooking.id}
            </div>
            <div style="font-size: 12px; color: var(--text-secondary);">
              🌾 ${this.getName(crop)} | 🏢 ${this.getName(centre)}
            </div>
          </div>
          <span class="badge badge-info" style="font-size: 12px;">
            ${trackedBooking.status}
          </span>
        </div>

        <!-- 5-Stage Visual Timeline -->
        <div class="tracking-timeline">
          <!-- Stage 1: Booked -->
          <div class="timeline-step ${currentStageIndex >= 0 ? 'completed' : ''}">
            <div class="timeline-dot">1</div>
            <div class="timeline-content">
              <div class="timeline-title">${i18n.t('stage1')}</div>
              <div class="timeline-time">${new Date(trackedBooking.createdAt).toLocaleDateString()} ${trackedBooking.timeWindow}</div>
              <div class="timeline-desc">${lang === 'en' ? 'Slot reserved successfully.' : (lang === 'hi' ? 'समय स्लॉट पक्का हुआ।' : 'वेळ व स्लॉट निश्चित झाला.')}</div>
            </div>
          </div>

          <!-- Stage 2: Arrived -->
          <div class="timeline-step ${currentStageIndex >= 1 ? 'completed' : (currentStageIndex === 0 ? 'current' : '')}">
            <div class="timeline-dot">2</div>
            <div class="timeline-content">
              <div class="timeline-title">${i18n.t('stage2')}</div>
              <div class="timeline-desc">
                ${currentStageIndex >= 1 
                  ? (lang === 'en' ? 'Farmer arrival recorded at centre entry gate.' : (lang === 'hi' ? 'केंद्र के प्रवेश द्वार पर आगमन दर्ज किया गया।' : 'केंद्राच्या प्रवेशद्वारावर शेतकरी आगमन नोंदवले.'))
                  : (lang === 'en' ? 'Awaiting arrival at scheduled time.' : (lang === 'hi' ? 'प्रतीक्षा: निर्धारित समय पर केंद्र पहुंचें।' : 'प्रतिक्षा: नियोजित वेळेत केंद्रावर पोहोचावे.'))}
              </div>
            </div>
          </div>

          <!-- Stage 3: Quality Checked -->
          <div class="timeline-step ${currentStageIndex >= 2 ? (trackedBooking.status === 'RECHECK_REQUIRED' ? 'failed' : 'completed') : ''}">
            <div class="timeline-dot">3</div>
            <div class="timeline-content">
              <div class="timeline-title">${i18n.t('stage3')}</div>
              ${trackedBooking.qualityCheck ? `
                <div style="background: var(--bg-surface-alt); border-radius: var(--radius-md); padding: 8px; margin-top: 6px; font-size: 12px;">
                  <div>💧 ${i18n.t('moistureLevel')}: <strong>${trackedBooking.qualityCheck.moisturePct}%</strong> (मानक: १२%)</div>
                  <div>🌾 ${i18n.t('qualityGrade')}: <strong>${trackedBooking.qualityCheck.grade}</strong></div>
                  <div>👨‍🔬 ${lang === 'en' ? 'Grader' : (lang === 'hi' ? 'निरीक्षक' : 'निरीक्षक')}: <strong>${trackedBooking.qualityCheck.inspectorName}</strong></div>
                  ${trackedBooking.qualityCheck.rejectionReason ? `
                    <div style="color: var(--color-danger); margin-top: 4px; font-weight: 600;">
                      ⚠️ ${trackedBooking.qualityCheck.rejectionReason}
                    </div>
                  ` : ''}
                </div>
              ` : `
                <div class="timeline-desc">${lang === 'en' ? 'Physical inspection and moisture check will be performed.' : (lang === 'hi' ? 'केंद्र पर नमी मीटर व भौतिक ग्रेडिंग की जाएगी।' : 'केंद्रावर आर्द्रता मीटर व भौतिक प्रतवारी केली जाईल.')}</div>
              `}
            </div>
          </div>

          <!-- Stage 4: Accepted / Recheck -->
          <div class="timeline-step ${currentStageIndex >= 3 ? 'completed' : ''}">
            <div class="timeline-dot">4</div>
            <div class="timeline-content">
              <div class="timeline-title">${i18n.t('stage4')}</div>
              <div class="timeline-desc">
                ${trackedBooking.actualWeightQuintals 
                  ? (lang === 'en' ? `Accepted Gross Weight: <strong>${trackedBooking.actualWeightQuintals} Qt</strong>` : (lang === 'hi' ? `स्वीकृत कुल वजन: <strong>${trackedBooking.actualWeightQuintals} क्विंटल</strong>` : `स्वीकारलेले एकूण निव्वळ वजन: <strong>${trackedBooking.actualWeightQuintals} क्विंटल</strong>`))
                  : (lang === 'en' ? 'Final weight will be captured on electronic weighbridge.' : (lang === 'hi' ? 'इलेक्ट्रॉनिक वजन कांटे पर वास्तविक वजन दर्ज होगा।' : 'वजन काट्यावर प्रत्यक्ष वजन नोंदवले जाईल.'))}
              </div>
            </div>
          </div>

          <!-- Stage 5: Payment Started -->
          <div class="timeline-step ${currentStageIndex >= 4 ? 'completed' : ''}">
            <div class="timeline-dot">5</div>
            <div class="timeline-content">
              <div class="timeline-title">${i18n.t('stage5')}</div>
              <div class="timeline-desc">
                ${trackedBooking.paymentRef 
                  ? (lang === 'en' ? `Payment initiated to bank account. Ref: <strong>${trackedBooking.paymentRef}</strong>` : (lang === 'hi' ? `डीबीटी भुगतान प्रक्रिया चालू। संदर्भ: <strong>${trackedBooking.paymentRef}</strong>` : `डीबीटी पेमेंट प्रक्रिया सुरू. ट्रॅकिंग संदर्भ: <strong>${trackedBooking.paymentRef}</strong>`))
                  : (lang === 'en' ? 'Payment is dispatched via DBT to Aadhaar linked bank account.' : (lang === 'hi' ? 'फसल स्वीकृति के ३ से ५ कार्यदिवसों में खाते में राशि जमा होती है।' : 'माल स्वीकारल्यानंतर ३ ते ५ कामकाजाच्या दिवसांत आधार लिंक खात्यात रक्कम जमा होते.'))}
              </div>
            </div>
          </div>
        </div>

        <!-- Appeal & Assistance Box -->
        <div class="alert alert-info" style="margin-top: var(--space-4);">
          📞 <strong>${i18n.t('appealContact')}:</strong>
          <div>${lang === 'en' ? 'For queries regarding quality grade or weight, contact centre manager or toll-free 1800-233-0244.' : (lang === 'hi' ? 'गुणवत्ता या वजन संबंधी किसी भी प्रश्न के लिए केंद्र प्रमुख या १८००-२३३-०२४४ पर संपर्क करें।' : 'गुणवत्ता किंवा वजनाबाबत काही शंका असल्यास केंद्र प्रमुख किंवा १८००-२३३-०२४४ वर संपर्क साधा.')}</div>
        </div>
      </div>
    `;
  },

  /**
   * Screen 7: Help & Operator Helpline
   */
  renderHelpScreen() {
    const lang = i18n.currentLang;

    return `
      <div style="margin-bottom: var(--space-5);">
        <button class="btn btn-secondary btn-sm" id="backFromHelpBtn">← ${i18n.t('navHome')}</button>
      </div>

      <h1 style="margin-bottom: var(--space-4);">${i18n.t('helplineTitle')}</h1>

      <div class="card" style="margin-bottom: var(--space-5);">
        <h3 style="margin-bottom: var(--space-3); color: var(--color-primary);">🏛️ ${i18n.t('stateHelpline')}</h3>
        <p style="font-size: var(--text-sm); margin-bottom: var(--space-4);">
          ${lang === 'en' ? 'Official government toll-free helpline for procurement enquiries & grievances:' : (lang === 'hi' ? 'खरीद केंद्र, एमएसपी नियम व शिकायत निवारण हेतु आधिकारिक सरकारी हेल्पलाइन नंबर:' : 'खरेदी केंद्र, हमीभाव नियम किंवा तक्रार निवारणासाठी अधिकृत शासकीय मदत क्रमांक:')}
        </p>
        <div style="background: var(--color-primary-bg); border-radius: var(--radius-md); padding: var(--space-4); text-align: center;">
          <div style="font-size: var(--text-2xl); font-weight: 800; color: var(--color-primary);">${i18n.t('helplineNumber')}</div>
          <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
            ${lang === 'en' ? '(Monday to Saturday, 9:00 AM to 6:00 PM)' : (lang === 'hi' ? '(सोमवार से शनिवार, सुबह ९ से शाम ६)' : '(सोमवार ते शनिवार, सकाळी ९ ते संध्याकाळी ६)')}
          </div>
        </div>
      </div>

      <div class="card">
        <h3 style="margin-bottom: var(--space-3); color: var(--color-primary);">👨‍💼 ${i18n.t('talukaOperator')}</h3>
        <div class="grid grid-cols-1 gap-3 font-medium" style="font-size: var(--text-sm);">
          <div style="padding: var(--space-3); background: var(--bg-surface-alt); border-radius: var(--radius-md);">
            <strong>राहुरी ऑपरेटर:</strong> श्री. विलास कदम (📞 ९८२२१२३४५६)
          </div>
          <div style="padding: var(--space-3); background: var(--bg-surface-alt); border-radius: var(--radius-md);">
            <strong>कोपरगाव ऑपरेटर:</strong> श्री. संजय घुगे (📞 ९४२०९८७६५४)
          </div>
          <div style="padding: var(--space-3); background: var(--bg-surface-alt); border-radius: var(--radius-md);">
            <strong>अमरावती बाजार समिती प्रतिनिधी:</strong> श्री. अमोल देशमुख (📞 ९७६३११४४५५)
          </div>
        </div>
      </div>
    `;
  },

  attachEvents() {
    const heroVoiceBtn = document.getElementById('openVoiceModalHeroBtn');
    if (heroVoiceBtn) heroVoiceBtn.onclick = () => voiceModal.open();

    const viewTokenBtn = document.getElementById('viewMyTokenActionBtn');
    if (viewTokenBtn) viewTokenBtn.onclick = () => this.navigate('my_token');

    const startCheckBtn = document.getElementById('startCheckCentreActionBtn');
    if (startCheckBtn) startCheckBtn.onclick = () => this.navigate('centres');

    const card1 = document.getElementById('cardCheckCentres');
    if (card1) card1.onclick = () => this.navigate('centres');

    const card2 = document.getElementById('cardBookToken');
    if (card2) card2.onclick = () => this.navigate('centres');

    const card3 = document.getElementById('cardTrackProduce');
    if (card3) card3.onclick = () => this.navigate('track');

    const backHome = document.getElementById('backToHomeBtn');
    if (backHome) backHome.onclick = () => this.navigate('home');

    const backCentres = document.getElementById('backToCentresFromReadinessBtn');
    if (backCentres) backCentres.onclick = () => this.navigate('centres');

    const backBooking = document.getElementById('backFromBookingBtn');
    if (backBooking) backBooking.onclick = () => this.navigate('centres');

    const backToken = document.getElementById('backFromMyTokenBtn');
    if (backToken) backToken.onclick = () => this.navigate('home');

    const backTrack = document.getElementById('backFromTrackBtn');
    if (backTrack) backTrack.onclick = () => this.navigate('home');

    const backHelp = document.getElementById('backFromHelpBtn');
    if (backHelp) backHelp.onclick = () => this.navigate('home');

    const distSelect = document.getElementById('filterDistrictSelect');
    if (distSelect) {
      distSelect.onchange = (e) => {
        this.selectedDistrict = e.target.value;
        this.reRender();
      };
    }

    const cropSelect = document.getElementById('filterCropSelect');
    if (cropSelect) {
      cropSelect.onchange = (e) => {
        this.selectedCropId = e.target.value;
        this.reRender();
      };
    }

    document.querySelectorAll('.select-centre-book-btn').forEach(btn => {
      btn.onclick = () => {
        this.selectedCentreId = btn.dataset.centreId;
        this.navigate('readiness');
      };
    });

    const proceedSlotsBtn = document.getElementById('proceedToSlotsBtn');
    if (proceedSlotsBtn) proceedSlotsBtn.onclick = () => this.navigate('booking');

    const fixReadinessBtn = document.getElementById('fixReadinessBtn');
    if (fixReadinessBtn) fixReadinessBtn.onclick = () => this.navigate('centres');

    document.querySelectorAll('.slot-card:not(.disabled)').forEach(card => {
      card.onclick = () => {
        document.querySelectorAll('.slot-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedSlotId = card.dataset.slotId;
      };
    });

    const confirmBookingBtn = document.getElementById('confirmBookingRequestBtn');
    if (confirmBookingBtn) {
      confirmBookingBtn.onclick = () => {
        const qtyInput = document.getElementById('bookingQtyInput');
        const qty = qtyInput ? Number(qtyInput.value) || 25 : 25;
        const result = scheduler.bookSlot({
          farmerProfile: store.data.activeFarmerProfile,
          centreId: this.selectedCentreId,
          cropId: this.selectedCropId,
          slotId: this.selectedSlotId,
          estimatedQtyQuintals: qty,
          date: '2026-08-31',
          timeWindow: '10:00 - 11:30'
        });

        if (result.success) {
          window.dispatchEvent(new CustomEvent('mandimitra:notify', {
            detail: { message: i18n.t('bookingSuccess'), type: 'success' }
          }));
          this.navigate('my_token');
        } else {
          window.dispatchEvent(new CustomEvent('mandimitra:notify', {
            detail: { message: result.messageMr || result.messageEn, type: 'danger' }
          }));
        }
      };
    }

    const cancelBtn = document.getElementById('cancelTokenBtn');
    if (cancelBtn) {
      cancelBtn.onclick = () => {
        const bId = cancelBtn.dataset.bookingId;
        const confirmMsg = i18n.currentLang === 'en' 
          ? 'Are you sure you want to cancel this token?' 
          : (i18n.currentLang === 'hi' ? 'क्या आप वाकई यह टोकन रद्द करना चाहते हैं?' : 'तुम्हाला हे टोकन नक्की रद्द करायचे आहे का?');

        if (confirm(confirmMsg)) {
          scheduler.cancelBooking(bId);
          window.dispatchEvent(new CustomEvent('mandimitra:notify', {
            detail: { message: i18n.currentLang === 'en' ? 'Token cancelled.' : (i18n.currentLang === 'hi' ? 'टोकन रद्द कर दिया गया।' : 'टोकन रद्द केले.'), type: 'warning' }
          }));
          this.reRender();
        }
      };
    }

    const trackSearchBtn = document.getElementById('searchTrackBtn');
    if (trackSearchBtn) {
      trackSearchBtn.onclick = () => {
        const query = document.getElementById('trackTokenInput')?.value.trim();
        if (query) {
          const match = store.data.bookings.find(b => b.id.toLowerCase() === query.toLowerCase() || b.phone === query);
          if (match) {
            this.navigate('track');
          } else {
            alert(i18n.currentLang === 'en' ? 'No token found with this number.' : (i18n.currentLang === 'hi' ? 'इस नंबर का टोकन नहीं मिला।' : 'या क्रमांकाचे टोकन सापडले नाही.'));
          }
        }
      };
    }
  },

  navigate(viewName) {
    this.currentSubView = viewName;
    this.reRender();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  reRender() {
    const mainArea = document.getElementById('mainContentArea');
    if (mainArea) {
      mainArea.innerHTML = this.render();
      this.attachEvents();
    }
  }
};
