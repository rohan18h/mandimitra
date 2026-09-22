/**
 * MandiMitra — District & Administrator Overview View
 * Operational oversight, capacity load monitoring, season schemes & append-only audit log.
 * Trilingual: Marathi (मराठी), Hindi (हिन्दी), and English.
 */

import { store } from '../store.js';
import { i18n } from '../i18n.js';

export const adminView = {
  currentTab: 'overview', // 'overview' | 'audit' | 'schemes'
  auditSearch: '',

  getName(obj) {
    if (!obj) return '';
    const lang = i18n.currentLang;
    if (lang === 'hi') return obj.nameHi || obj.nameMr || obj.nameEn;
    if (lang === 'mr') return obj.nameMr || obj.nameEn;
    return obj.nameEn || obj.nameMr;
  },

  render() {
    const lang = i18n.currentLang;
    const totalCentres = store.data.centres.length;
    const activeCentres = store.data.centres.filter(c => c.status === 'OPEN').length;
    const totalBookings = store.data.bookings.length;
    const totalQuintals = store.data.bookings.reduce((acc, b) => acc + (b.actualWeightQuintals || b.estimatedQtyQuintals), 0);

    const subHeader = lang === 'en' 
      ? 'Maharashtra State Agricultural Marketing Board — District Monitor'
      : (lang === 'hi' ? 'महाराष्ट्र राज्य कृषि विपणन बोर्ड — जिला निगरानी' : 'महाराष्ट्र राज्य कृषी पणन मंडळ — जिल्हा संनियंत्रण');

    return `
      <div class="container" style="padding-top: var(--space-5); padding-bottom: var(--space-8);">
        <!-- Admin Title Strip -->
        <div class="admin-header-strip">
          <div>
            <h1 style="font-size: var(--text-2xl);">${i18n.t('adminTitle')}</h1>
            <div style="font-size: var(--text-sm); color: var(--text-muted); margin-top: 2px;">
              🏛️ ${subHeader}
            </div>
          </div>

          <!-- Top Navigation Tabs -->
          <div class="flex gap-2">
            <button class="btn ${this.currentTab === 'overview' ? 'btn-primary' : 'btn-secondary'} btn-sm" id="adminTabOverviewBtn">
              📊 ${lang === 'en' ? 'Capacity Overview' : (lang === 'hi' ? 'क्षमता व भीड़ नियंत्रण' : 'क्षमता व गर्दी नियंत्रण')}
            </button>
            <button class="btn ${this.currentTab === 'audit' ? 'btn-primary' : 'btn-secondary'} btn-sm" id="adminTabAuditBtn">
              📜 ${i18n.t('auditLogTitle')}
            </button>
          </div>
        </div>

        <!-- 4 Key District Metric Cards -->
        <div class="stats-grid-4">
          <div class="stat-card">
            <span class="stat-card-label">${i18n.t('totalCentresCount')}</span>
            <span class="stat-card-value">${totalCentres}</span>
            <span class="stat-card-subtext">${activeCentres} ${lang === 'en' ? 'Active today' : (lang === 'hi' ? 'आज चालू' : 'आज कार्यरत')}</span>
          </div>

          <div class="stat-card">
            <span class="stat-card-label">${i18n.t('activeCentresCount')}</span>
            <span class="stat-card-value" style="color: var(--color-success);">${activeCentres}</span>
            <span class="stat-card-subtext">${Math.round((activeCentres / totalCentres) * 100)}% ${lang === 'en' ? 'Operational' : (lang === 'hi' ? 'सक्रिय' : 'कार्यरत')}</span>
          </div>

          <div class="stat-card">
            <span class="stat-card-label">${i18n.t('totalFarmersServed')}</span>
            <span class="stat-card-value">${totalBookings}</span>
            <span class="stat-card-subtext">${lang === 'en' ? 'Registered Tokens' : (lang === 'hi' ? 'पंजीकृत टोकन' : 'नोंदणीकृत टोकन्स')}</span>
          </div>

          <div class="stat-card">
            <span class="stat-card-label">${i18n.t('totalProcuredQuintals')}</span>
            <span class="stat-card-value" style="color: var(--color-accent);">${totalQuintals.toLocaleString()}</span>
            <span class="stat-card-subtext">${lang === 'en' ? 'Quintals Received' : (lang === 'hi' ? 'क्विंटल आवक' : 'क्विंटल आवक')}</span>
          </div>
        </div>

        <!-- Active View Content -->
        ${this.currentTab === 'audit' ? this.renderAuditTab() : this.renderOverviewTab()}
      </div>
    `;
  },

  /**
   * Tab 1: Centre Load & Congestion Monitor
   */
  renderOverviewTab() {
    const lang = i18n.currentLang;
    const centres = store.data.centres;

    return `
      <!-- Load Monitor Section -->
      <div style="margin-bottom: var(--space-6);">
        <div class="flex items-center justify-between" style="margin-bottom: var(--space-4);">
          <h2 style="font-size: var(--text-lg);">${i18n.t('loadMonitorTitle')}</h2>
          <span style="font-size: var(--text-xs); color: var(--text-muted);">
            🔄 Live Capacity Calculation Engine
          </span>
        </div>

        <div class="load-monitor-grid">
          ${centres.map(c => {
            const centreBookings = store.data.bookings.filter(b => b.centreId === c.id);
            const loadPercent = Math.min(100, Math.round((centreBookings.length / (c.maxDailyFarmers || 30)) * 100));
            
            let loadState = 'optimal';
            let loadStateLabel = i18n.t('loadNormal');
            let barClass = 'success';

            if (loadPercent >= 85) {
              loadState = 'overloaded';
              loadStateLabel = i18n.t('loadOverloaded');
              barClass = 'danger';
            } else if (loadPercent < 30) {
              loadState = 'underused';
              loadStateLabel = i18n.t('loadUnderused');
              barClass = 'warning';
            }

            return `
              <div class="load-card ${loadState}">
                <div class="flex items-start justify-between">
                  <div>
                    <h3 style="font-size: var(--text-base); color: var(--color-primary);">${this.getName(c)}</h3>
                    <div style="font-size: 11px; color: var(--text-muted);">District: ${c.district.toUpperCase()} | Lines: ${c.weighingLines}</div>
                  </div>
                  <span class="badge ${barClass === 'danger' ? 'badge-danger' : (barClass === 'warning' ? 'badge-warning' : 'badge-success')}">
                    ${loadStateLabel}
                  </span>
                </div>

                <div class="progress-bar-wrap">
                  <div class="progress-bar-fill ${barClass}" style="width: ${loadPercent}%;"></div>
                </div>

                <div class="flex items-center justify-between" style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
                  <span>${lang === 'en' ? 'Today Load:' : (lang === 'hi' ? 'आज का भार:' : 'आजचा भार:')} <strong>${centreBookings.length} / ${c.maxDailyFarmers} ${lang === 'en' ? 'farmers' : 'किसान / शेतकरी'} (${loadPercent}%)</strong></span>
                  <span>⏱️ ${c.waitingEstimateMinutes} ${lang === 'en' ? 'mins wait' : 'मि. प्रतीक्षा'}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Active Schemes & Crop Price Support Rules -->
      <div class="card">
        <h2 style="font-size: var(--text-lg); margin-bottom: var(--space-4);">
          🌾 ${lang === 'en' ? 'Active Minimum Support Price (MSP) & Scheme Policy' : (lang === 'hi' ? 'अधिकृत न्यूनतम समर्थन मूल्य (MSP) व खरीद योजना' : 'अधिकृत हमीभाव (MSP) व खरेदी योजना २०२६-२७')}
        </h2>
        <div class="grid grid-cols-2 gap-4">
          ${store.data.crops.map(crop => `
            <div style="background: var(--bg-surface-alt); border-radius: var(--radius-md); padding: var(--space-4);">
              <div class="flex items-center justify-between">
                <strong style="font-size: var(--text-base); color: var(--color-primary);">${crop.icon} ${this.getName(crop)}</strong>
                <span class="badge badge-success">₹${crop.mspPerQuintal.toLocaleString()} / Qt</span>
              </div>
              <div style="font-size: var(--text-xs); color: var(--text-secondary); margin-top: 4px;">
                📜 Scheme: ${crop.schemeName}
              </div>
              <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">
                💧 Max Moisture: <strong>${crop.maxMoisturePct}%</strong> | Impurities: <strong>${crop.maxForeignMatterPct}%</strong>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  /**
   * Tab 2: Append-Only Immutable Audit Log Table
   */
  renderAuditTab() {
    const lang = i18n.currentLang;
    const logs = store.data.auditLogs.filter(l => {
      if (this.auditSearch) {
        const q = this.auditSearch.toLowerCase();
        return l.id.toLowerCase().includes(q) || l.action.toLowerCase().includes(q) || l.details.toLowerCase().includes(q) || l.actorName.toLowerCase().includes(q);
      }
      return true;
    });

    return `
      <div class="card">
        <div class="flex items-center justify-between flex-wrap gap-3" style="margin-bottom: var(--space-4);">
          <div>
            <h2 style="font-size: var(--text-lg);">${i18n.t('auditLogTitle')} (${logs.length})</h2>
            <div style="font-size: var(--text-xs); color: var(--text-muted);">
              ${lang === 'en' ? 'Immutable audit trail with timestamps, actor roles, and justifications.' : (lang === 'hi' ? 'प्रत्येक कार्यवाही का समय, कर्ता व कारण सुरक्षित किया जाता है।' : 'प्रत्येक कृतीची वेळ, कर्ता व कारण अपरिवर्तनीय नोंदीत साठवले जाते.')}
            </div>
          </div>

          <input type="text" class="form-control" id="auditSearchInput" placeholder="${i18n.t('auditSearchPlaceholder')}" value="${this.auditSearch}" style="max-width: 280px; min-height: 38px;">
        </div>

        <div class="audit-table-wrap">
          <table class="audit-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>${i18n.t('colTimestamp')}</th>
                <th>${i18n.t('colActor')}</th>
                <th>${i18n.t('colActionType')}</th>
                <th>${i18n.t('colDetails')}</th>
              </tr>
            </thead>
            <tbody>
              ${logs.map(log => `
                <tr>
                  <td style="font-family: monospace; font-weight: 700; color: var(--color-primary);">${log.id}</td>
                  <td style="white-space: nowrap; color: var(--text-muted); font-size: 11px;">
                    ${new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td>
                    <span class="audit-actor-badge ${log.actorRole}">
                      ${log.actorRole.toUpperCase()}
                    </span>
                    <div style="font-size: 11px; margin-top: 2px; font-weight: 600;">${log.actorName}</div>
                  </td>
                  <td>
                    <strong style="font-size: 11px; color: var(--color-primary);">${log.action}</strong>
                    <div style="font-size: 10px; color: var(--text-muted);">${log.targetId}</div>
                  </td>
                  <td style="font-size: 12px; line-height: 1.4;">
                    ${log.details}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  attachEvents() {
    const tabOverviewBtn = document.getElementById('adminTabOverviewBtn');
    const tabAuditBtn = document.getElementById('adminTabAuditBtn');

    if (tabOverviewBtn) {
      tabOverviewBtn.onclick = () => {
        this.currentTab = 'overview';
        this.reRender();
      };
    }

    if (tabAuditBtn) {
      tabAuditBtn.onclick = () => {
        this.currentTab = 'audit';
        this.reRender();
      };
    }

    const searchInput = document.getElementById('auditSearchInput');
    if (searchInput) {
      searchInput.oninput = (e) => {
        this.auditSearch = e.target.value;
        this.reRender();
      };
    }
  },

  reRender() {
    const mainArea = document.getElementById('mainContentArea');
    if (mainArea) {
      mainArea.innerHTML = this.render();
      this.attachEvents();
    }
  }
};
