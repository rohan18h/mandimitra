/**
 * MandiMitra — Global Navbar & Role Switcher Component
 * Supports Trilingual selection (मराठी | हिन्दी | English)
 */

import { store } from '../store.js';
import { i18n } from '../i18n.js';

export const navbar = {
  render() {
    const currentLang = i18n.currentLang;
    const isOnline = store.data.isOnline;
    const currentRole = store.data.currentUserRole;

    const topbarNotice = currentLang === 'mr' 
      ? 'महाराष्ट्र शासन मान्यताप्राप्त खरेदी सहाय्यक प्रणाली'
      : (currentLang === 'hi' ? 'महाराष्ट्र शासन मान्यता प्राप्त खरीद सहायक प्रणाली' : 'Government Authorized Procurement Assistant');

    return `
      <header class="app-header">
        <!-- Top Operational Bar -->
        <div class="app-topbar">
          <div class="container app-topbar-inner">
            <div class="topbar-tagline">
              <span>🌾 ${topbarNotice}</span>
            </div>
            
            <!-- Quick Role Switcher for Hackathon Evaluation -->
            <div class="role-switcher">
              <span style="color: #94a3b8; font-size: 11px; margin-right: 4px;">Role:</span>
              <button class="role-btn ${currentRole === 'farmer' ? 'active' : ''}" data-role="farmer" title="Farmer Experience">
                👨‍🌾 ${i18n.t('roleFarmer')}
              </button>
              <button class="role-btn ${currentRole === 'staff' ? 'active' : ''}" data-role="staff" title="Staff Portal">
                🏢 ${i18n.t('roleStaff')}
              </button>
              <button class="role-btn ${currentRole === 'admin' ? 'active' : ''}" data-role="admin" title="District Administrator">
                📊 ${i18n.t('roleAdmin')}
              </button>
            </div>
          </div>
        </div>

        <!-- Main Branding & Controls -->
        <div class="app-navbar-main">
          <div class="container flex items-center justify-between flex-wrap gap-2">
            <a href="#" class="brand-logo-wrap" data-nav="home">
              <div class="brand-icon">M</div>
              <div class="brand-name">
                <span>${i18n.t('appName')}</span>
                <span class="brand-subtitle">${i18n.t('taglineShort')}</span>
              </div>
            </a>

            <div class="flex items-center gap-2 flex-wrap">
              <!-- Network Online/Offline Simulator Toggle -->
              <button class="network-status-indicator ${isOnline ? 'online' : 'offline'}" id="toggleNetworkBtn" title="Click to simulate Online/Offline mode">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: currentColor;"></span>
                <span>${isOnline ? i18n.t('onlineStatus') : i18n.t('offlineStatus')}</span>
              </button>

              <!-- 3-Language Switcher Group -->
              <div class="lang-switcher-group" style="display: inline-flex; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 20px; padding: 2px;">
                <button class="lang-btn ${currentLang === 'mr' ? 'active' : ''}" data-set-lang="mr" style="padding: 4px 10px; border-radius: 16px; font-size: 12px; font-weight: 700; color: ${currentLang === 'mr' ? '#ffffff' : '#cbd5e1'}; background: ${currentLang === 'mr' ? 'var(--color-accent)' : 'transparent'}; transition: all 0.2s;">
                  मराठी
                </button>
                <button class="lang-btn ${currentLang === 'hi' ? 'active' : ''}" data-set-lang="hi" style="padding: 4px 10px; border-radius: 16px; font-size: 12px; font-weight: 700; color: ${currentLang === 'hi' ? '#ffffff' : '#cbd5e1'}; background: ${currentLang === 'hi' ? 'var(--color-accent)' : 'transparent'}; transition: all 0.2s;">
                  हिन्दी
                </button>
                <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-set-lang="en" style="padding: 4px 10px; border-radius: 16px; font-size: 12px; font-weight: 700; color: ${currentLang === 'en' ? '#ffffff' : '#cbd5e1'}; background: ${currentLang === 'en' ? 'var(--color-accent)' : 'transparent'}; transition: all 0.2s;">
                  English
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Farmer Bottom Navigation (Mobile View) -->
      ${currentRole === 'farmer' ? `
        <nav class="bottom-nav" aria-label="Farmer Navigation">
          <div class="bottom-nav-inner">
            <button class="bottom-nav-item active" data-nav="home">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
              <span>${i18n.t('navHome')}</span>
            </button>
            <button class="bottom-nav-item" data-nav="centres">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
              <span>${i18n.t('navCentres')}</span>
            </button>
            <button class="bottom-nav-item" data-nav="my_token">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/></svg>
              <span>${i18n.t('navMyToken')}</span>
            </button>
            <button class="bottom-nav-item" data-nav="track">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>${i18n.t('navTrack')}</span>
            </button>
            <button class="bottom-nav-item" data-nav="help">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
              <span>${i18n.t('navHelp')}</span>
            </button>
          </div>
        </nav>
      ` : ''}
    `;
  },

  attachEvents() {
    // Role switchers
    document.querySelectorAll('.role-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const newRole = btn.dataset.role;
        store.setRole(newRole);
      });
    });

    // 3-Language selection buttons
    document.querySelectorAll('[data-set-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.setLang;
        i18n.setLanguage(lang);
      });
    });

    // Network toggle simulator
    const netBtn = document.getElementById('toggleNetworkBtn');
    if (netBtn) {
      netBtn.addEventListener('click', () => {
        const nextOnline = !store.data.isOnline;
        store.setOnlineStatus(nextOnline);
        const msg = nextOnline 
          ? i18n.t('onlineStatus')
          : i18n.t('offlineStatus');
        window.dispatchEvent(new CustomEvent('mandimitra:notify', { detail: { message: msg, type: nextOnline ? 'success' : 'warning' } }));
      });
    }

    // Farmer Bottom Navigation Links
    document.querySelectorAll('.bottom-nav-item, [data-nav]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const navTarget = item.dataset.nav;
        if (navTarget) {
          window.dispatchEvent(new CustomEvent('mandimitra:navigate', { detail: { view: navTarget } }));
          // Update active pill
          document.querySelectorAll('.bottom-nav-item').forEach(b => b.classList.remove('active'));
          item.classList.add('active');
        }
      });
    });
  }
};
