/**
 * MandiMitra — Main Application Coordinator
 * Connects store, i18n, views, voice assistant, and navigation.
 */

import { store } from './store.js';
import { i18n } from './i18n.js';
import { navbar } from './components/navbar.js';
import { notifications } from './components/notifications.js';
import { voiceModal } from './components/voiceModal.js';
import { farmerView } from './views/farmerView.js';
import { staffView } from './views/staffView.js';
import { adminView } from './views/adminView.js';

export const app = {
  init() {
    // 1. Initialize Localization & Store
    store.loadFromStorage();
    i18n.init();
    notifications.init();

    // 2. Initial DOM Render
    this.render();

    // 3. Subscribe to Store State Changes
    store.subscribe(() => {
      this.render();
    });

    // 4. Global Event Listeners
    window.addEventListener('mandimitra:langChanged', () => {
      this.render();
    });

    window.addEventListener('mandimitra:navigate', (e) => {
      const { view, centreId, bookingId } = e.detail;
      if (store.data.currentUserRole === 'farmer') {
        if (centreId) farmerView.selectedCentreId = centreId;
        if (bookingId) farmerView.activeBookingId = bookingId;
        farmerView.navigate(view);
      }
    });

    // Handle initial online/offline browser state
    window.addEventListener('online', () => store.setOnlineStatus(true));
    window.addEventListener('offline', () => store.setOnlineStatus(false));
  },

  render() {
    const root = document.getElementById('app');
    if (!root) return;

    const currentRole = store.data.currentUserRole;
    document.body.className = `role-${currentRole} ${i18n.currentLang === 'mr' ? 'lang-mr' : ''}`;

    let mainContentHtml = '';
    if (currentRole === 'farmer') {
      mainContentHtml = farmerView.render();
    } else if (currentRole === 'staff') {
      mainContentHtml = staffView.render();
    } else if (currentRole === 'admin') {
      mainContentHtml = adminView.render();
    }

    root.innerHTML = `
      ${navbar.render()}
      <div id="mainContentArea">
        ${mainContentHtml}
      </div>
      <div id="voiceModalContainer">
        ${voiceModal.render()}
      </div>
      ${this.renderFooter()}
    `;

    // Attach all interactive event handlers
    navbar.attachEvents();
    voiceModal.attachEvents();

    if (currentRole === 'farmer') {
      farmerView.attachEvents();
    } else if (currentRole === 'staff') {
      staffView.attachEvents();
    } else if (currentRole === 'admin') {
      adminView.attachEvents();
    }
  },

  renderFooter() {
    const isMr = i18n.currentLang === 'mr';

    return `
      <footer class="app-footer">
        <div class="container">
          <div class="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div style="font-size: var(--text-lg); font-weight: 800; color: #ffffff;">
                🌾 ${i18n.t('appName')} — ${i18n.t('taglineShort')}
              </div>
              <div style="font-size: var(--text-xs); color: #94a3b8; margin-top: 2px;">
                SIH Problem Statement SIH26032: Farmers wasting hours waiting at procurement centres
              </div>
            </div>

            <div style="font-size: var(--text-xs); color: #cbd5e1;">
              <span>📞 ${i18n.t('stateHelpline')}: <strong>${i18n.t('helplineNumber')}</strong></span>
            </div>
          </div>

          <div class="footer-disclaimer">
            <strong>⚖️ ${isMr ? 'महत्त्वाची सूचना (Official Notice):' : 'Important Civic Notice:'}</strong>
            <div>
              ${isMr 
                ? 'मंडीमित्र हे हमीभाव निश्चित करत नाही किंवा थेट पीक खरेदी करत नाही. अंतिम गुणवत्ता तपासणी, वजन, स्वीकार आणि पेमेंट मंजुरी ही अधिकृत खरेदी केंद्राच्या अधिकारात राहते. हे पोर्टल केवळ पारदर्शक वेळ व्यवस्थापन व माहितीसाठी आहे.'
                : 'MandiMitra does not set MSP or directly purchase crops. Final quality grading, electronic weighing, crop acceptance, and DBT payment approval remain with the authorised procurement centre.'}
            </div>
          </div>
        </div>
      </footer>
    `;
  }
};

// Bootstrap application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
