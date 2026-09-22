/**
 * MandiMitra — Procurement-Centre Staff Dashboard & Offline Workflow
 * Handles live centre controls, arrival queue, quality checks, weighing, and offline sync.
 * Trilingual: Marathi (मराठी), Hindi (हिन्दी), and English.
 */

import { store } from '../store.js';
import { i18n } from '../i18n.js';
import { db } from '../db.js';

export const staffView = {
  currentTab: 'queue', // 'queue' | 'capacity' | 'qc' | 'sync'
  activeModalBookingId: null,
  searchQuery: '',

  getName(obj) {
    if (!obj) return '';
    const lang = i18n.currentLang;
    if (lang === 'hi') return obj.nameHi || obj.nameMr || obj.nameEn;
    if (lang === 'mr') return obj.nameMr || obj.nameEn;
    return obj.nameEn || obj.nameMr;
  },

  render() {
    const lang = i18n.currentLang;
    const isOnline = store.data.isOnline;
    const currentCentre = store.data.centres.find(c => c.id === store.data.selectedStaffCentreId) || store.data.centres[0];
    const pendingSyncCount = store.data.syncQueue.filter(i => i.status === 'PENDING').length;

    return `
      <div class="container" style="padding-top: var(--space-5); padding-bottom: var(--space-8);">
        <!-- Staff Top Strip -->
        <div class="admin-header-strip">
          <div>
            <h1 style="font-size: var(--text-2xl);">${i18n.t('staffDashboardTitle')}</h1>
            <div style="font-size: var(--text-sm); color: var(--text-muted); margin-top: 2px;">
              🏢 <strong>${this.getName(currentCentre)}</strong> (District: ${currentCentre.district.toUpperCase()})
            </div>
          </div>

          <!-- Switch Centre Dropdown -->
          <div class="flex items-center gap-2">
            <span style="font-size: var(--text-xs); font-weight: 700; color: var(--text-muted);">${i18n.t('selectMyCentre')}</span>
            <select class="form-control form-select" id="staffCentreSelect" style="min-height: 38px; font-size: var(--text-sm);">
              ${store.data.centres.map(c => `
                <option value="${c.id}" ${c.id === currentCentre.id ? 'selected' : ''}>${this.getName(c)}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <!-- Offline Sync Banner -->
        ${(!isOnline || pendingSyncCount > 0) ? `
          <div class="offline-sync-banner">
            <div class="flex items-center gap-3">
              <span style="font-size: 24px;">📡</span>
              <div>
                <strong>${!isOnline ? i18n.t('changesSavedLocally') : (lang === 'en' ? 'Sync Pending' : (lang === 'hi' ? 'सिंक प्रतीक्षित बदलाव' : 'सिंक प्रतिक्षेत असलेले बदल'))}</strong>
                <div style="font-size: var(--text-xs); color: #78350f;">
                  ${pendingSyncCount} ${lang === 'en' ? 'actions queued offline.' : (lang === 'hi' ? 'बदलाव स्थानीय मेमोरी में सुरक्षित हैं।' : 'बदल स्थानिक मेमरीमध्ये साठवले आहेत.')}
                </div>
              </div>
            </div>
            ${isOnline ? `
              <button class="btn btn-accent btn-sm" id="triggerSyncNowBtn">
                🔄 ${i18n.t('syncNowBtn')}
              </button>
            ` : `
              <span class="badge badge-warning" style="font-size: 11px;">Offline Mode</span>
            `}
          </div>
        ` : ''}

        <!-- Live Centre Status Controller -->
        <div class="centre-status-bar">
          <div class="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">
                ${i18n.t('centreControls')}
              </div>
              <div style="font-size: var(--text-lg); font-weight: 800; color: var(--color-primary); margin-top: 2px;">
                ${lang === 'en' ? 'Current Status:' : (lang === 'hi' ? 'वर्तमान स्थिति:' : 'सद्यस्थिती:')} 
                <span style="color: ${currentCentre.status === 'OPEN' ? 'var(--color-success)' : (currentCentre.status === 'DELAYED' ? 'var(--color-warning)' : 'var(--color-danger)')}">
                  ● ${currentCentre.status} (${currentCentre.statusReason})
                </span>
              </div>
            </div>

            <!-- Quick Status Buttons -->
            <div class="status-toggle-group">
              <button class="status-pill-btn ${currentCentre.status === 'OPEN' ? 'active open' : ''}" data-set-status="OPEN">
                ✓ ${i18n.t('statusOpen')}
              </button>
              <button class="status-pill-btn ${currentCentre.status === 'DELAYED' ? 'active delayed' : ''}" data-set-status="DELAYED">
                ⏳ ${i18n.t('statusDelayed')}
              </button>
              <button class="status-pill-btn ${currentCentre.status === 'CLOSED' ? 'active closed' : ''}" data-set-status="CLOSED">
                ✕ ${i18n.t('statusClosed')}
              </button>
            </div>
          </div>
        </div>

        <!-- Main Staff Workspace -->
        <div class="staff-layout">
          <!-- Sidebar Navigation -->
          <aside class="staff-sidebar">
            <button class="staff-nav-item ${this.currentTab === 'queue' ? 'active' : ''}" data-tab="queue">
              📋 ${i18n.t('arrivalsQueueTitle')}
            </button>
            <button class="staff-nav-item ${this.currentTab === 'capacity' ? 'active' : ''}" data-tab="capacity">
              ⚙️ ${i18n.t('capacitySettingsTitle')}
            </button>
            <button class="staff-nav-item ${this.currentTab === 'sync' ? 'active' : ''}" data-tab="sync">
              🔄 ${i18n.t('syncQueueTitle')} ${pendingSyncCount > 0 ? `(${pendingSyncCount})` : ''}
            </button>
          </aside>

          <!-- Tab Content Area -->
          <section class="staff-main-content">
            ${this.renderActiveTab(currentCentre)}
          </section>
        </div>
      </div>

      <!-- Quality Check Modal -->
      ${this.activeModalBookingId ? this.renderQualityCheckModal() : ''}
    `;
  },

  renderActiveTab(currentCentre) {
    switch (this.currentTab) {
      case 'capacity':
        return this.renderCapacityTab(currentCentre);
      case 'sync':
        return this.renderSyncTab();
      case 'queue':
      default:
        return this.renderQueueTab(currentCentre);
    }
  },

  /**
   * Tab 1: Today's Arrival Queue & Action Transitions
   */
  renderQueueTab(currentCentre) {
    const lang = i18n.currentLang;
    const bookings = store.data.bookings.filter(b => {
      if (b.centreId !== currentCentre.id) return false;
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        return b.id.toLowerCase().includes(q) || b.phone.includes(q) || b.farmerName.toLowerCase().includes(q);
      }
      return true;
    });

    return `
      <div class="card" style="margin-bottom: var(--space-4);">
        <div class="flex items-center justify-between flex-wrap gap-3" style="margin-bottom: var(--space-4);">
          <h2 style="font-size: var(--text-lg);">${i18n.t('arrivalsQueueTitle')} (${bookings.length})</h2>
          
          <!-- Search input -->
          <input type="text" class="form-control" id="staffQueueSearchInput" placeholder="${i18n.t('searchFarmerPlaceholder')}" value="${this.searchQuery}" style="max-width: 280px; min-height: 38px;">
        </div>

        <div class="queue-table-container">
          <table class="queue-table">
            <thead>
              <tr>
                <th>${i18n.t('colToken')}</th>
                <th>${i18n.t('colFarmer')}</th>
                <th>${i18n.t('colCropQty')}</th>
                <th>${i18n.t('colSlot')}</th>
                <th>${i18n.t('colStatus')}</th>
                <th>${i18n.t('colAction')}</th>
              </tr>
            </thead>
            <tbody>
              ${bookings.length === 0 ? `
                <tr>
                  <td colspan="6" class="text-center" style="padding: var(--space-6); color: var(--text-muted);">
                    ${lang === 'en' ? 'No farmer appointments found for this centre today.' : (lang === 'hi' ? 'इस केंद्र पर आज कोई किसान पंजीकरण नहीं मिला।' : 'या केंद्रावर आज कोणतीही नोंदणी आढळली नाही.')}
                  </td>
                </tr>
              ` : bookings.map(b => {
                const crop = store.data.crops.find(c => c.id === b.cropId);
                let badgeClass = 'badge-neutral';
                if (b.status === 'BOOKED') badgeClass = 'badge-info';
                else if (b.status === 'ARRIVED') badgeClass = 'badge-warning';
                else if (b.status === 'QUALITY_CHECKED') badgeClass = 'badge-primary';
                else if (b.status === 'ACCEPTED' || b.status === 'PAYMENT_INITIATED') badgeClass = 'badge-success';
                else if (b.status === 'RECHECK_REQUIRED' || b.status === 'CANCELLED') badgeClass = 'badge-danger';

                return `
                  <tr>
                    <td>
                      <strong style="font-family: monospace; color: var(--color-primary);">${b.id}</strong>
                    </td>
                    <td>
                      <div style="font-weight: 600;">${b.farmerName}</div>
                      <div style="font-size: 11px; color: var(--text-muted);">📱 ${b.phone}</div>
                    </td>
                    <td>
                      <div>${this.getName(crop)}</div>
                      <div style="font-size: 11px; color: var(--text-muted);">${b.estimatedQtyQuintals} Qt (~Est)</div>
                    </td>
                    <td>
                      <span class="badge badge-neutral">${b.timeWindow}</span>
                    </td>
                    <td>
                      <span class="badge ${badgeClass}">${b.status}</span>
                    </td>
                    <td>
                      ${b.status === 'BOOKED' ? `
                        <button class="btn btn-primary btn-sm mark-arrived-btn" data-booking-id="${b.id}">
                          📍 ${i18n.t('markArrivedBtn')}
                        </button>
                      ` : ''}

                      ${b.status === 'ARRIVED' ? `
                        <button class="btn btn-accent btn-sm open-qc-modal-btn" data-booking-id="${b.id}">
                          🔬 ${i18n.t('performQCBtn')}
                        </button>
                      ` : ''}

                      ${b.status === 'QUALITY_CHECKED' ? `
                        <button class="btn btn-success btn-sm record-weight-btn" data-booking-id="${b.id}">
                          ⚖️ ${i18n.t('recordWeightBtn')}
                        </button>
                      ` : ''}

                      ${b.status === 'ACCEPTED' ? `
                        <button class="btn btn-accent btn-sm trigger-payment-btn" data-booking-id="${b.id}">
                          💸 ${i18n.t('startPaymentBtn')}
                        </button>
                      ` : ''}

                      ${b.status === 'PAYMENT_INITIATED' ? `
                        <span style="font-size: 11px; color: var(--color-success); font-weight: 700;">
                          ✓ PFMS Sent (${b.paymentRef})
                        </span>
                      ` : ''}

                      ${b.status === 'RECHECK_REQUIRED' ? `
                        <button class="btn btn-outline btn-sm open-qc-modal-btn" data-booking-id="${b.id}">
                          🔄 ${lang === 'en' ? 'Re-check' : (lang === 'hi' ? 'पुनर्निरीक्षण' : 'पुनर्तपासणी')}
                        </button>
                      ` : ''}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  /**
   * Tab 2: Capacity Configuration
   */
  renderCapacityTab(currentCentre) {
    const lang = i18n.currentLang;

    return `
      <div class="card">
        <h2 style="font-size: var(--text-lg); margin-bottom: var(--space-4);">${i18n.t('capacitySettingsTitle')}</h2>
        <p style="font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--space-5);">
          ${lang === 'en' ? 'Slot allocation limits are mathematically governed by active weighbridge count.' : (lang === 'hi' ? 'वजन कांटे व कर्मियों की संख्या के अनुसार स्लॉट क्षमता निर्धारित होती है।' : 'वजन काटे व कर्मचाऱ्यांच्या संख्येनुसार स्लॉट क्षमतेचे गणित स्वयंचलित केले जाते.')}
        </p>

        <form id="capacityConfigForm">
          <div class="grid grid-cols-2 gap-4">
            <div class="form-group">
              <label class="form-label">${i18n.t('activeWeighingLines')}</label>
              <input type="number" class="form-control" id="cfgWeighingLines" min="1" max="5" value="${currentCentre.weighingLines}">
              <span class="form-hint">${lang === 'en' ? 'Parallel servicing scale lines.' : (lang === 'hi' ? 'समानांतर वजन कांटे।' : 'प्रत्येक काट्यामुळे समांतर शेतकरी प्रक्रिया वाढते.')}</span>
            </div>

            <div class="form-group">
              <label class="form-label">${i18n.t('avgServiceMinutes')}</label>
              <input type="number" class="form-control" id="cfgAvgMinutes" min="5" max="45" value="${currentCentre.avgMinutesPerFarmer}">
              <span class="form-hint">${lang === 'en' ? 'Average time per farmer weighing.' : (lang === 'hi' ? 'प्रति किसान औसत वजन समय।' : 'वजन, सॅम्पलिंग व पावती बनवण्याचा वेळ.')}</span>
            </div>

            <div class="form-group">
              <label class="form-label">${i18n.t('maxDailyFarmers')}</label>
              <input type="number" class="form-control" id="cfgMaxFarmers" min="10" max="150" value="${currentCentre.maxDailyFarmers}">
            </div>

            <div class="form-group">
              <label class="form-label">${i18n.t('dailyCapacity')} (Quintals)</label>
              <input type="number" class="form-control" id="cfgDailyQuintals" min="100" max="2500" value="${currentCentre.dailyCapacityQuintals}">
            </div>
          </div>

          <div style="margin-top: var(--space-5);">
            <button type="submit" class="btn btn-primary">
              💾 ${i18n.t('saveCapacityBtn')}
            </button>
          </div>
        </form>
      </div>
    `;
  },

  /**
   * Tab 3: Offline Sync Queue Inspector
   */
  renderSyncTab() {
    const lang = i18n.currentLang;
    const queue = store.data.syncQueue;

    return `
      <div class="card">
        <div class="flex items-center justify-between flex-wrap gap-3" style="margin-bottom: var(--space-4);">
          <h2 style="font-size: var(--text-lg);">${i18n.t('syncQueueTitle')}</h2>
          <button class="btn btn-accent btn-sm" id="manualSyncTriggerBtn">
            🔄 ${i18n.t('syncNowBtn')}
          </button>
        </div>

        ${queue.length === 0 ? `
          <div class="text-center" style="padding: var(--space-6); color: var(--text-muted);">
            <div style="font-size: 32px; margin-bottom: 6px;">✅</div>
            <strong>${lang === 'en' ? 'All local changes are fully synced with server.' : (lang === 'hi' ? 'सभी स्थानीय बदलाव सर्वर के साथ सिंक हैं।' : 'सर्व डेटा मुख्य सर्व्हरसोबत अद्ययावत (Synced) आहे.')}</strong>
          </div>
        ` : `
          <div class="flex flex-col gap-3">
            ${queue.map(item => `
              <div class="card" style="border-left: 4px solid ${item.status === 'CONFLICT' ? 'var(--color-danger)' : 'var(--color-warning)'}; padding: var(--space-4);">
                <div class="flex items-center justify-between">
                  <strong style="font-size: var(--text-sm);">${item.actionType}</strong>
                  <span class="badge ${item.status === 'CONFLICT' ? 'badge-danger' : 'badge-warning'}">${item.status}</span>
                </div>
                <div style="font-size: var(--text-xs); color: var(--text-secondary); margin-top: 4px;">
                  ${item.description}
                </div>
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">
                  🕒 ${new Date(item.timestamp).toLocaleTimeString()}
                </div>

                ${item.status === 'CONFLICT' ? `
                  <div class="conflict-card" style="margin-top: 10px;">
                    <strong>⚠️ ${i18n.t('conflictAlertTitle')}</strong>
                    <div style="font-size: 12px; margin-top: 4px;">${i18n.t('conflictDesc')}</div>
                    <div class="flex gap-2" style="margin-top: 8px;">
                      <button class="btn btn-sm btn-primary resolve-conflict-btn" data-id="${item.id}" data-choice="USE_LOCAL">
                        ${i18n.t('keepLocalVersion')}
                      </button>
                      <button class="btn btn-sm btn-secondary resolve-conflict-btn" data-id="${item.id}" data-choice="DISCARD_LOCAL">
                        ${i18n.t('keepServerVersion')}
                      </button>
                    </div>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  },

  /**
   * Modal: Quality Inspection
   */
  renderQualityCheckModal() {
    const booking = store.data.bookings.find(b => b.id === this.activeModalBookingId);
    if (!booking) return '';

    const crop = store.data.crops.find(c => c.id === booking.cropId);

    return `
      <div class="modal-overlay active" id="qcModalOverlay">
        <div class="modal-card">
          <div class="modal-header">
            <h3>🔬 ${i18n.t('qcModalTitle')}</h3>
            <button class="btn btn-icon" id="closeQCModalBtn">✕</button>
          </div>

          <div class="modal-body">
            <div style="background: var(--color-primary-bg); border-radius: var(--radius-md); padding: var(--space-3) var(--space-4); margin-bottom: var(--space-4); font-size: var(--text-sm);">
              <strong>${booking.farmerName}</strong> (${booking.id}) — ${this.getName(crop)}
            </div>

            <!-- Moisture Input -->
            <div class="form-group">
              <label class="form-label">${i18n.t('qcMoistureLabel')}</label>
              <input type="number" step="0.1" class="form-control" id="qcMoistureInput" value="11.4" min="5" max="25">
              <span class="form-hint">${i18n.currentLang === 'en' ? 'Permissible FAQ moisture limit: max 12.0%' : (i18n.currentLang === 'hi' ? 'अधिकतम मानक नमी सीमा: १२.०%' : 'मानक आर्द्रता मर्यादा: कमाल १२.०%')}</span>
            </div>

            <!-- Foreign Matter Input -->
            <div class="form-group">
              <label class="form-label">${i18n.t('foreignMatter')} (%)</label>
              <input type="number" step="0.1" class="form-control" id="qcForeignMatterInput" value="1.2" min="0" max="10">
            </div>

            <!-- Quality Grade Selection -->
            <div class="form-group">
              <label class="form-label">${i18n.t('qcGradeLabel')}</label>
              <div class="grade-btn-group">
                <button type="button" class="grade-btn selected" data-grade="GRADE_A">${i18n.t('gradeA')}</button>
                <button type="button" class="grade-btn" data-grade="GRADE_B">${i18n.t('gradeB')}</button>
                <button type="button" class="grade-btn" data-grade="RECHECK">${i18n.t('gradeRecheck')}</button>
              </div>
            </div>

            <!-- Standard Rejection Reason dropdown -->
            <div class="form-group" id="recheckReasonGroup" style="display: none;">
              <label class="form-label">${i18n.t('qcReasonLabel')}</label>
              <select class="form-control form-select" id="qcStandardReasonSelect">
                <option value="${i18n.t('reasonHighMoisture')}">${i18n.t('reasonHighMoisture')}</option>
                <option value="${i18n.t('reasonForeignMatter')}">${i18n.t('reasonForeignMatter')}</option>
                <option value="${i18n.t('reasonDamagedGrain')}">${i18n.t('reasonDamagedGrain')}</option>
                <option value="${i18n.t('reasonDocMismatch')}">${i18n.t('reasonDocMismatch')}</option>
              </select>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" id="cancelQCModalBtn">${i18n.t('cancelBtn')}</button>
            <button class="btn btn-primary" id="saveQCInspectionBtn">
              💾 ${i18n.t('submitQCBtn')}
            </button>
          </div>
        </div>
      </div>
    `;
  },

  attachEvents() {
    const centreSelect = document.getElementById('staffCentreSelect');
    if (centreSelect) {
      centreSelect.onchange = (e) => {
        store.data.selectedStaffCentreId = e.target.value;
        store.notify();
      };
    }

    document.querySelectorAll('[data-set-status]').forEach(btn => {
      btn.onclick = () => {
        const newStatus = btn.dataset.setStatus;
        const currentCentre = store.data.centres.find(c => c.id === store.data.selectedStaffCentreId);
        if (!currentCentre) return;

        let reason = 'नियमित खरेदी सुरू';
        if (newStatus === 'DELAYED') reason = 'तांत्रिक देखभाल सुरू';
        if (newStatus === 'CLOSED') reason = 'साप्ताहिक सुट्टी / साठा निर्गती';

        if (!store.data.isOnline) {
          db.queueOfflineAction('UPDATE_CENTRE', {
            targetId: currentCentre.id,
            status: newStatus,
            statusReason: reason
          }, `Centre status set to ${newStatus}`);
          window.dispatchEvent(new CustomEvent('mandimitra:notify', { detail: { message: i18n.t('changesSavedLocally'), type: 'warning' } }));
        } else {
          currentCentre.status = newStatus;
          currentCentre.statusReason = reason;
          currentCentre.lastUpdated = new Date().toISOString();
          store.addAuditLog('staff', 'Supervisor', 'CENTRE_STATUS_UPDATED', currentCentre.id, `Status updated to ${newStatus} (${reason})`);
          store.notify();
        }
      };
    });

    document.querySelectorAll('.staff-nav-item').forEach(btn => {
      btn.onclick = () => {
        this.currentTab = btn.dataset.tab;
        this.reRender();
      };
    });

    const searchInput = document.getElementById('staffQueueSearchInput');
    if (searchInput) {
      searchInput.oninput = (e) => {
        this.searchQuery = e.target.value;
        this.reRender();
      };
    }

    const syncBtn = document.getElementById('triggerSyncNowBtn');
    const manualSyncBtn = document.getElementById('manualSyncTriggerBtn');
    const doSync = async () => {
      const result = await db.synchronize();
      window.dispatchEvent(new CustomEvent('mandimitra:notify', {
        detail: { message: result.message, type: result.success ? 'success' : 'danger' }
      }));
      this.reRender();
    };
    if (syncBtn) syncBtn.onclick = doSync;
    if (manualSyncBtn) manualSyncBtn.onclick = doSync;

    document.querySelectorAll('.mark-arrived-btn').forEach(btn => {
      btn.onclick = () => {
        const bId = btn.dataset.bookingId;
        const booking = store.data.bookings.find(b => b.id === bId);
        if (!booking) return;

        if (!store.data.isOnline) {
          db.queueOfflineAction('UPDATE_BOOKING_STATUS', {
            targetId: bId,
            status: 'ARRIVED',
            historyEntry: {
              stage: 'ARRIVED',
              timestamp: new Date().toISOString(),
              actorRole: 'staff',
              noteMr: 'केंद्रावर उपस्थिती नोंदवली.',
              noteHi: 'केंद्र पर उपस्थिति दर्ज की।',
              noteEn: 'Farmer arrival recorded.'
            }
          }, `Marked arrival for ${bId}`);
          window.dispatchEvent(new CustomEvent('mandimitra:notify', { detail: { message: i18n.t('changesSavedLocally'), type: 'warning' } }));
        } else {
          booking.status = 'ARRIVED';
          booking.history.push({
            stage: 'ARRIVED',
            timestamp: new Date().toISOString(),
            actorRole: 'staff',
            noteMr: 'केंद्रावर उपस्थिती नोंदवली.',
            noteHi: 'केंद्र पर उपस्थिति दर्ज की।',
            noteEn: 'Farmer arrival recorded.'
          });
          store.addAuditLog('staff', 'Gate Clerk', 'FARMER_ARRIVED', bId, `Arrival recorded: ${booking.farmerName}`);
          store.notify();
        }
      };
    });

    document.querySelectorAll('.open-qc-modal-btn').forEach(btn => {
      btn.onclick = () => {
        this.activeModalBookingId = btn.dataset.bookingId;
        this.reRender();
      };
    });

    const closeQC = document.getElementById('closeQCModalBtn');
    const cancelQC = document.getElementById('cancelQCModalBtn');
    if (closeQC) closeQC.onclick = () => { this.activeModalBookingId = null; this.reRender(); };
    if (cancelQC) cancelQC.onclick = () => { this.activeModalBookingId = null; this.reRender(); };

    let selectedGrade = 'GRADE_A';
    document.querySelectorAll('.grade-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.grade-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedGrade = btn.dataset.grade;
        const recheckGroup = document.getElementById('recheckReasonGroup');
        if (recheckGroup) {
          recheckGroup.style.display = selectedGrade === 'RECHECK' ? 'block' : 'none';
        }
      };
    });

    const saveQC = document.getElementById('saveQCInspectionBtn');
    if (saveQC) {
      saveQC.onclick = () => {
        const moisture = Number(document.getElementById('qcMoistureInput')?.value) || 11.4;
        const foreignMatter = Number(document.getElementById('qcForeignMatterInput')?.value) || 1.2;
        const standardReason = document.getElementById('qcStandardReasonSelect')?.value;

        const isRecheck = selectedGrade === 'RECHECK' || moisture > 12.0;
        const booking = store.data.bookings.find(b => b.id === this.activeModalBookingId);

        const qcData = {
          moisturePct: moisture,
          foreignMatterPct: foreignMatter,
          grade: selectedGrade,
          inspectorName: 'एस. के. काळे (Grader)',
          passed: !isRecheck,
          rejectionReason: isRecheck ? (standardReason || 'Moisture limit exceeded') : null
        };

        const newStatus = isRecheck ? 'RECHECK_REQUIRED' : 'QUALITY_CHECKED';

        if (!store.data.isOnline) {
          db.queueOfflineAction('UPDATE_BOOKING_STATUS', {
            targetId: booking.id,
            status: newStatus,
            qualityCheck: qcData,
            historyEntry: {
              stage: newStatus,
              timestamp: new Date().toISOString(),
              actorRole: 'staff',
              noteMr: `गुणवत्ता तपासणी: आर्द्रता ${moisture}%, प्रत: ${selectedGrade}`,
              noteHi: `गुणवत्ता जांच: नमी ${moisture}%, ग्रेड: ${selectedGrade}`,
              noteEn: `QC Inspection: Moisture ${moisture}%, Grade: ${selectedGrade}`
            }
          }, `QC record for ${booking.id}`);
          window.dispatchEvent(new CustomEvent('mandimitra:notify', { detail: { message: i18n.t('changesSavedLocally'), type: 'warning' } }));
        } else {
          booking.status = newStatus;
          booking.qualityCheck = qcData;
          booking.history.push({
            stage: newStatus,
            timestamp: new Date().toISOString(),
            actorRole: 'staff',
            noteMr: `गुणवत्ता तपासणी: आर्द्रता ${moisture}%, प्रत: ${selectedGrade}`,
            noteHi: `गुणवत्ता जांच: नमी ${moisture}%, ग्रेड: ${selectedGrade}`,
            noteEn: `QC Inspection: Moisture ${moisture}%, Grade: ${selectedGrade}`
          });
          store.addAuditLog('staff', 'Grader', 'QUALITY_INSPECTION_RECORDED', booking.id, `Moisture: ${moisture}%, Grade: ${selectedGrade}`);
          store.notify();
        }

        this.activeModalBookingId = null;
        this.reRender();
      };
    }

    document.querySelectorAll('.record-weight-btn').forEach(btn => {
      btn.onclick = () => {
        const bId = btn.dataset.bookingId;
        const booking = store.data.bookings.find(b => b.id === bId);
        const inputWeight = prompt(i18n.currentLang === 'en' ? 'Enter electronic scale gross weight (Qt):' : (i18n.currentLang === 'hi' ? 'इलेक्ट्रॉनिक कांटे का वास्तविक वजन (क्विंटल):' : 'काट्यावरील प्रत्यक्ष वजन नोंदवा (क्विंटल):'), booking.estimatedQtyQuintals);
        if (inputWeight) {
          const weight = Number(inputWeight) || booking.estimatedQtyQuintals;
          booking.status = 'ACCEPTED';
          booking.actualWeightQuintals = weight;
          booking.history.push({
            stage: 'ACCEPTED',
            timestamp: new Date().toISOString(),
            actorRole: 'staff',
            noteMr: `स्वीकारलेले निव्वळ वजन: ${weight} क्विंटल.`,
            noteHi: `स्वीकृत कुल वजन: ${weight} क्विंटल।`,
            noteEn: `Actual net weight accepted: ${weight} Qt.`
          });
          store.addAuditLog('staff', 'Weighmaster', 'WEIGHT_ACCEPTED', bId, `Net weight: ${weight} Qt`);
          store.notify();
        }
      };
    });

    document.querySelectorAll('.trigger-payment-btn').forEach(btn => {
      btn.onclick = () => {
        const bId = btn.dataset.bookingId;
        const booking = store.data.bookings.find(b => b.id === bId);
        const ref = `DBT-MH-2026-${Math.floor(1000000 + Math.random() * 9000000)}`;
        booking.status = 'PAYMENT_INITIATED';
        booking.paymentRef = ref;
        booking.history.push({
          stage: 'PAYMENT_INITIATED',
          timestamp: new Date().toISOString(),
          actorRole: 'staff',
          noteMr: `डीबीटी पेमेंट प्रक्रिया सुरू. संदर्भ: ${ref}`,
          noteHi: `डीबीटी भुगतान प्रक्रिया चालू। संदर्भ: ${ref}`,
          noteEn: `DBT Payment dispatched. Ref: ${ref}`
        });
        store.addAuditLog('staff', 'Manager', 'PAYMENT_DISPATCH_TRIGGERED', bId, `DBT Reference: ${ref}`);
        store.notify();
      };
    });

    const capForm = document.getElementById('capacityConfigForm');
    if (capForm) {
      capForm.onsubmit = (e) => {
        e.preventDefault();
        const currentCentre = store.data.centres.find(c => c.id === store.data.selectedStaffCentreId);
        if (currentCentre) {
          currentCentre.weighingLines = Number(document.getElementById('cfgWeighingLines')?.value) || 2;
          currentCentre.avgMinutesPerFarmer = Number(document.getElementById('cfgAvgMinutes')?.value) || 15;
          currentCentre.maxDailyFarmers = Number(document.getElementById('cfgMaxFarmers')?.value) || 40;
          currentCentre.dailyCapacityQuintals = Number(document.getElementById('cfgDailyQuintals')?.value) || 800;
          store.addAuditLog('staff', 'Manager', 'CAPACITY_UPDATED', currentCentre.id, `Lines: ${currentCentre.weighingLines}, Avg Mins: ${currentCentre.avgMinutesPerFarmer}`);
          store.notify();
          window.dispatchEvent(new CustomEvent('mandimitra:notify', { detail: { message: i18n.t('saveCapacityBtn'), type: 'success' } }));
        }
      };
    }

    document.querySelectorAll('.resolve-conflict-btn').forEach(btn => {
      btn.onclick = () => {
        const syncId = btn.dataset.id;
        const choice = btn.dataset.choice;
        db.resolveConflict(syncId, choice);
        this.reRender();
      };
    });
  },

  reRender() {
    const mainArea = document.getElementById('mainContentArea');
    if (mainArea) {
      mainArea.innerHTML = this.render();
      this.attachEvents();
    }
  }
};
