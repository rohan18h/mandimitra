/**
 * MandiMitra — Production Voice UI Component
 * Dedicated Question-and-Answer Interface with Audio Player Controls,
 * Transcript Review / Inline Editing, Consequential Action Slips, and Privacy Notice.
 */

import { voiceAssistant } from '../voice.js';
import { i18n } from '../i18n.js';

export const voiceModal = {
  isOpen: false,
  transcript: '',
  isEditingTranscript: false,
  understoodText: '',
  responseText: '',
  confirmationCard: null,
  followupOptions: null,
  actionData: null,

  render() {
    const lang = i18n.currentLang;
    const isPlaying = voiceAssistant.isPlayingAudio;
    const isPaused = voiceAssistant.isPausedAudio;
    const isSlow = voiceAssistant.playbackRate < 1.0;
    const isMuted = voiceAssistant.isMuted;

    const privacyNote = lang === 'en'
      ? 'Your voice is processed only for this request. We do not store raw recordings.'
      : (lang === 'hi' ? 'आपकी आवाज़ केवल इस अनुरोध को समझने हेतु प्रयुक्त होती है। रिकॉर्डिंग सुरक्षित नहीं की जाती।' : 'तुमचा आवाज केवळ या प्रश्नाची माहिती समजून घेण्यासाठी वापरला जातो. रेकॉर्डिंग साठवले जात नाही.');

    const promptTitle = lang === 'en'
      ? 'Ask about your centre, token, documents, or produce status:'
      : (lang === 'hi' ? 'खरीद केंद्र, टोकन, दस्तावेज या फसल स्थिति के बारे में बोलें:' : 'खरेदी केंद्र, टोकन, कागदपत्रे किंवा मालाच्या स्थितीबद्दल विचारा:');

    // Intent Chips in 3 languages
    const chips = [
      {
        label: lang === 'en' ? 'Is centre open today?' : (lang === 'hi' ? 'आज केंद्र खुला है কি?' : 'आज केंद्र उघडे आहे का?'),
        query: lang === 'en' ? 'Is centre open today?' : (lang === 'hi' ? 'आज केंद्र खुला है क्या?' : 'आज केंद्र उघडे आहे का?')
      },
      {
        label: lang === 'en' ? 'Is soybean accepted today?' : (lang === 'hi' ? 'आज सोयाबीन ले रहे हैं क्या?' : 'आज सोयाबीन घेत आहेत का?'),
        query: lang === 'en' ? 'Is soybean accepted today?' : (lang === 'hi' ? 'आज सोयाबीन ले रहे हैं क्या?' : 'आज सोयाबीन घेत आहेत का?')
      },
      {
        label: lang === 'en' ? 'How many slots left?' : (lang === 'hi' ? 'आज कितनी जगह उपलब्ध है?' : 'आज किती जागा उपलब्ध आहे?'),
        query: lang === 'en' ? 'How many slots left?' : (lang === 'hi' ? 'आज कितनी जगह उपलब्ध है?' : 'आज किती जागा उपलब्ध आहे?')
      },
      {
        label: lang === 'en' ? 'When should I come?' : (lang === 'hi' ? 'मैं कब आऊँ?' : 'मी कधी यावे?'),
        query: lang === 'en' ? 'When should I come?' : (lang === 'hi' ? 'मैं कब आऊँ?' : 'मी कधी यावे?')
      },
      {
        label: lang === 'en' ? 'I want a token for tomorrow' : (lang === 'hi' ? 'मुझे कल का टोकन चाहिए' : 'मला उद्याचे टोकन हवे आहे'),
        query: lang === 'en' ? 'I want a token for tomorrow morning' : (lang === 'hi' ? 'मुझे कल सुबह का टोकन चाहिए' : 'मला उद्या सकाळचे टोकन हवे आहे')
      },
      {
        label: lang === 'en' ? 'What is my token status?' : (lang === 'hi' ? 'मेरे टोकन की स्थिति क्या है?' : 'माझ्या टोकनची स्थिती काय आहे?'),
        query: lang === 'en' ? 'What is my token status?' : (lang === 'hi' ? 'मेरे टोकन की स्थिति क्या है?' : 'माझ्या टोकनची स्थिती काय आहे?')
      },
      {
        label: lang === 'en' ? 'What happened to my produce?' : (lang === 'hi' ? 'मेरी फसल का क्या हुआ?' : 'माझ्या मालाचे काय झाले?'),
        query: lang === 'en' ? 'What happened to my produce?' : (lang === 'hi' ? 'मेरी फसल का क्या हुआ?' : 'माझ्या मालाचे काय झाले?')
      },
      {
        label: lang === 'en' ? 'Which documents to bring?' : (lang === 'hi' ? 'कागजात कौन से लाने हैं?' : 'कागदपत्रे कोणती आणायची?'),
        query: lang === 'en' ? 'Which documents to bring?' : (lang === 'hi' ? 'कागजात कौन से लाने हैं?' : 'कागदपत्रे कोणती आणायची?')
      },
      {
        label: lang === 'en' ? 'Cancel my token' : (lang === 'hi' ? 'मेरा टोकन रद्द करें' : 'माझे टोकन रद्द करा'),
        query: lang === 'en' ? 'Cancel my token' : (lang === 'hi' ? 'मेरा टोकन रद्द करें' : 'माझे टोकन रद्द करा')
      },
      {
        label: lang === 'en' ? 'I need human assistance' : (lang === 'hi' ? 'मुझे सहायता चाहिए' : 'मला मदत हवी आहे'),
        query: lang === 'en' ? 'I need human assistance' : (lang === 'hi' ? 'मुझे सहायता चाहिए' : 'मला मदत हवी आहे')
      }
    ];

    return `
      <div class="modal-overlay ${this.isOpen ? 'active' : ''}" id="voiceModalOverlay" aria-modal="true" role="dialog">
        <div class="modal-card voice-modal-card">
          <!-- Voice Top Bar -->
          <div class="modal-header">
            <div class="flex items-center gap-2">
              <span style="font-size: 22px;">🎙️</span>
              <h3 style="font-size: var(--text-base); font-weight: 800; color: var(--color-primary);">${i18n.t('voiceModalTitle')}</h3>
            </div>
            
            <div class="flex items-center gap-2">
              <!-- Inline Language Switcher -->
              <div style="display: inline-flex; background: var(--bg-surface-alt); border: 1px solid var(--border-medium); border-radius: 16px; padding: 1px;">
                <button class="voice-lang-btn ${lang === 'mr' ? 'active' : ''}" data-vlang="mr" style="padding: 2px 8px; border-radius: 14px; font-size: 11px; font-weight: 700; background: ${lang === 'mr' ? 'var(--color-accent)' : 'transparent'}; color: ${lang === 'mr' ? '#fff' : 'inherit'};">मराठी</button>
                <button class="voice-lang-btn ${lang === 'hi' ? 'active' : ''}" data-vlang="hi" style="padding: 2px 8px; border-radius: 14px; font-size: 11px; font-weight: 700; background: ${lang === 'hi' ? 'var(--color-accent)' : 'transparent'}; color: ${lang === 'hi' ? '#fff' : 'inherit'};">हिन्दी</button>
                <button class="voice-lang-btn ${lang === 'en' ? 'active' : ''}" data-vlang="en" style="padding: 2px 8px; border-radius: 14px; font-size: 11px; font-weight: 700; background: ${lang === 'en' ? 'var(--color-accent)' : 'transparent'}; color: ${lang === 'en' ? '#fff' : 'inherit'};">EN</button>
              </div>

              <button class="btn btn-icon" id="closeVoiceModalBtn" aria-label="Close voice assistant">✕</button>
            </div>
          </div>

          <div class="modal-body voice-modal-content">
            <!-- Privacy Notice Banner -->
            <div class="voice-privacy-badge">
              <span>🔒</span>
              <span>${privacyNote}</span>
            </div>

            <!-- Central Push-to-Talk Button -->
            <div style="position: relative;">
              <button class="voice-mic-wave ${voiceAssistant.isListening ? 'listening' : ''}" id="micTriggerBtn" title="${i18n.t('micClickToSpeak')}">
                <svg width="46" height="46" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>

              <!-- Sound Equalizer Indicator -->
              <div class="sound-wave-indicator ${voiceAssistant.isListening ? 'listening' : ''}">
                <div class="sound-bar"></div>
                <div class="sound-bar"></div>
                <div class="sound-bar"></div>
                <div class="sound-bar"></div>
                <div class="sound-bar"></div>
              </div>
            </div>

            <div class="voice-status-text" id="voiceStatusText">
              ${voiceAssistant.isListening ? i18n.t('listeningPrompt') : (lang === 'en' ? 'Tap to Speak' : 'बोलण्यासाठी माईक दाबा')}
            </div>

            <p style="font-size: var(--text-xs); color: var(--text-muted); margin-bottom: var(--space-3);">
              ${promptTitle}
            </p>

            <!-- Cancel Listening Button if Active -->
            ${voiceAssistant.isListening ? `
              <button class="btn btn-sm btn-outline" id="cancelListeningBtn" style="margin-bottom: 12px;">
                ✕ ${lang === 'en' ? 'Cancel Recording' : 'रेकॉर्डिंग थांबवा'}
              </button>
            ` : ''}

            <!-- Recognized Transcript Review Card -->
            ${this.transcript ? `
              <div class="transcript-card">
                <div class="transcript-header">
                  <span>${lang === 'en' ? 'Recognised Speech:' : 'तुम्ही विचारलेला प्रश्न (Recognised):'}</span>
                  <span style="color: var(--color-success); font-weight: 800;">✓ Ready</span>
                </div>

                ${this.isEditingTranscript ? `
                  <input type="text" class="transcript-edit-input" id="inlineTranscriptInput" value="${this.transcript}">
                ` : `
                  <div class="transcript-body">
                    “${this.transcript}”
                  </div>
                `}

                <div class="transcript-actions">
                  ${this.isEditingTranscript ? `
                    <button class="btn btn-sm btn-primary" id="saveEditedTranscriptBtn">
                      💾 ${lang === 'en' ? 'Done' : 'जतन करा'}
                    </button>
                  ` : `
                    <button class="btn btn-sm btn-secondary" id="editTranscriptBtn">
                      ✏️ ${lang === 'en' ? 'Edit Text' : 'मजकूर बदला'}
                    </button>
                  `}
                  <button class="btn btn-sm btn-secondary" id="speakAgainBtn">
                    🔄 ${lang === 'en' ? 'Speak Again' : 'पुन्हा बोला'}
                  </button>
                  <button class="btn btn-sm btn-accent" id="confirmTranscriptBtn">
                    ✓ ${lang === 'en' ? 'Confirm' : 'पुष्टी करा'}
                  </button>
                </div>
              </div>
            ` : ''}

            <!-- Verified Answer Card with Audio Player Toolbar -->
            ${this.responseText ? `
              <div class="voice-answer-card">
                <div class="voice-answer-title">
                  <span>🏛️</span>
                  <span>${this.understoodText ? `${i18n.t('systemUnderstood')} ${this.understoodText}` : 'अधिकृत उत्तर:'}</span>
                </div>
                <div class="voice-answer-text">
                  ${this.responseText}
                </div>

                <!-- Text-to-Speech Controls Toolbar -->
                <div class="audio-player-toolbar">
                  <div class="audio-btn-group">
                    ${isPlaying ? `
                      <button class="audio-ctrl-btn active" id="voicePauseBtn" title="Pause">
                        ⏸️ ${lang === 'en' ? 'Pause' : 'थांबवा'}
                      </button>
                    ` : `
                      <button class="audio-ctrl-btn" id="voicePlayBtn" title="Play">
                        ▶️ ${lang === 'en' ? 'Play' : 'सुरू'}
                      </button>
                    `}
                    <button class="audio-ctrl-btn" id="voiceReplayBtn" title="Replay">
                      🔄 ${lang === 'en' ? 'Replay' : 'पुन्हा ऐका'}
                    </button>
                    <button class="audio-ctrl-btn ${isSlow ? 'active' : ''}" id="voiceSlowBtn" title="Slow 0.75x">
                      🐢 ${lang === 'en' ? 'Slow' : 'हळू'} ${isSlow ? '(0.75x)' : ''}
                    </button>
                    <button class="audio-ctrl-btn" id="voiceStopBtn" title="Stop">
                      ⏹️ ${lang === 'en' ? 'Stop' : 'बंद'}
                    </button>
                  </div>

                  <button class="audio-ctrl-btn" id="voiceMuteBtn" title="Toggle Mute">
                    ${isMuted ? '🔇 Unmute' : '🔊 Mute'}
                  </button>
                </div>
              </div>
            ` : ''}

            <!-- Consequential Action Confirmation Slip -->
            ${this.confirmationCard ? `
              <div class="voice-confirm-card">
                <div class="confirm-card-header">
                  <span>⚠️</span>
                  <span>${this.confirmationCard.title}</span>
                </div>

                <div class="confirm-details-grid">
                  <div>
                    <span>${lang === 'en' ? 'Centre:' : 'खरेदी केंद्र:'}</span>
                    <strong>${this.confirmationCard.centreName}</strong>
                  </div>
                  <div>
                    <span>${lang === 'en' ? 'Crop:' : 'पीक:'}</span>
                    <strong>${this.confirmationCard.cropName}</strong>
                  </div>
                  <div>
                    <span>${lang === 'en' ? 'Date:' : 'तारीख:'}</span>
                    <strong>${this.confirmationCard.date}</strong>
                  </div>
                  <div>
                    <span>${lang === 'en' ? 'Time Window:' : 'नियोजित वेळ:'}</span>
                    <strong>${this.confirmationCard.time}</strong>
                  </div>
                </div>

                <div class="flex gap-2 justify-end">
                  <button class="btn btn-sm btn-danger" id="actionCancelBtn">
                    ✕ ${lang === 'en' ? 'Cancel' : 'रद्द करा'}
                  </button>
                  <button class="btn btn-sm btn-secondary" id="actionChangeBtn">
                    ✏️ ${lang === 'en' ? 'Change' : 'बदला'}
                  </button>
                  <button class="btn btn-sm btn-success" id="actionConfirmBtn">
                    ✓ ${lang === 'en' ? 'Confirm Action' : 'पुष्टी करा'}
                  </button>
                </div>
              </div>
            ` : ''}

            <!-- Quick Supported Voice Questions Chips -->
            <div style="margin-top: 20px; text-align: left;">
              <div style="font-size: 11px; font-weight: 800; color: var(--color-primary); margin-bottom: 6px; text-transform: uppercase;">
                💡 ${i18n.t('voiceExamplesTitle')} (1-Click Test)
              </div>
              <div class="voice-chips-container">
                ${chips.map(chip => `
                  <button class="voice-chip" data-query="${chip.query}">
                    ${chip.label}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary w-full" id="closeVoiceFooterBtn">
              ${lang === 'en' ? 'Close Voice Assistant' : 'व्हॉइस सहाय्यक बंद करा'}
            </button>
          </div>
        </div>
      </div>
    `;
  },

  open() {
    this.isOpen = true;
    this.transcript = '';
    this.isEditingTranscript = false;
    this.understoodText = '';
    this.responseText = '';
    this.confirmationCard = null;
    this.followupOptions = null;
    this.actionData = null;
    this.reRender();
    voiceAssistant.init();
    voiceAssistant.startListening();
  },

  close() {
    this.isOpen = false;
    voiceAssistant.stopListening();
    voiceAssistant.stopSpeaking();
    this.reRender();
  },

  reRender() {
    const modalWrap = document.getElementById('voiceModalContainer');
    if (modalWrap) {
      modalWrap.innerHTML = this.render();
      this.attachEvents();
    }
  },

  attachEvents() {
    const closeBtn = document.getElementById('closeVoiceModalBtn');
    const closeFooterBtn = document.getElementById('closeVoiceFooterBtn');
    const micBtn = document.getElementById('micTriggerBtn');
    const cancelListenBtn = document.getElementById('cancelListeningBtn');

    if (closeBtn) closeBtn.onclick = () => this.close();
    if (closeFooterBtn) closeFooterBtn.onclick = () => this.close();

    if (micBtn) {
      micBtn.onclick = () => {
        if (voiceAssistant.isListening) {
          voiceAssistant.stopListening();
        } else {
          voiceAssistant.startListening();
        }
      };
    }

    if (cancelListenBtn) {
      cancelListenBtn.onclick = () => voiceAssistant.stopListening();
    }

    // Language pills inside voice modal
    document.querySelectorAll('[data-vlang]').forEach(btn => {
      btn.onclick = () => {
        const nextLang = btn.dataset.vlang;
        i18n.setLanguage(nextLang);
        voiceAssistant.updateLanguage();
        this.reRender();
      };
    });

    // Transcript Actions
    const editBtn = document.getElementById('editTranscriptBtn');
    const saveEditBtn = document.getElementById('saveEditedTranscriptBtn');
    const speakAgainBtn = document.getElementById('speakAgainBtn');
    const confirmBtn = document.getElementById('confirmTranscriptBtn');

    if (editBtn) {
      editBtn.onclick = () => {
        this.isEditingTranscript = true;
        this.reRender();
      };
    }

    if (saveEditBtn) {
      saveEditBtn.onclick = () => {
        const val = document.getElementById('inlineTranscriptInput')?.value;
        if (val) this.transcript = val;
        this.isEditingTranscript = false;
        voiceAssistant.handleTranscript(this.transcript);
      };
    }

    if (speakAgainBtn) {
      speakAgainBtn.onclick = () => {
        this.transcript = '';
        this.responseText = '';
        this.confirmationCard = null;
        voiceAssistant.startListening();
        this.reRender();
      };
    }

    if (confirmBtn) {
      confirmBtn.onclick = () => {
        if (this.transcript) {
          voiceAssistant.handleTranscript(this.transcript);
        }
      };
    }

    // Audio Player Controls
    const playBtn = document.getElementById('voicePlayBtn');
    const pauseBtn = document.getElementById('voicePauseBtn');
    const replayBtn = document.getElementById('voiceReplayBtn');
    const slowBtn = document.getElementById('voiceSlowBtn');
    const stopBtn = document.getElementById('voiceStopBtn');
    const muteBtn = document.getElementById('voiceMuteBtn');

    if (playBtn) playBtn.onclick = () => voiceAssistant.resumeAudio();
    if (pauseBtn) pauseBtn.onclick = () => voiceAssistant.pauseAudio();
    if (replayBtn) replayBtn.onclick = () => voiceAssistant.replayAudio();
    if (slowBtn) slowBtn.onclick = () => voiceAssistant.toggleSlowAudio();
    if (stopBtn) stopBtn.onclick = () => voiceAssistant.stopSpeaking();
    if (muteBtn) muteBtn.onclick = () => voiceAssistant.toggleMute();

    // Consequential Action Confirmation Buttons
    const actionConfirmBtn = document.getElementById('actionConfirmBtn');
    const actionCancelBtn = document.getElementById('actionCancelBtn');
    const actionChangeBtn = document.getElementById('actionChangeBtn');

    if (actionConfirmBtn) {
      actionConfirmBtn.onclick = () => {
        voiceAssistant.handleTranscript(i18n.currentLang === 'hi' ? 'हाँ' : (i18n.currentLang === 'mr' ? 'हो' : 'yes'));
      };
    }

    if (actionCancelBtn) {
      actionCancelBtn.onclick = () => {
        voiceAssistant.handleTranscript(i18n.currentLang === 'hi' ? 'नहीं' : (i18n.currentLang === 'mr' ? 'नाही' : 'no'));
      };
    }

    if (actionChangeBtn) {
      actionChangeBtn.onclick = () => {
        this.close();
        window.dispatchEvent(new CustomEvent('mandimitra:navigate', { detail: { view: 'booking' } }));
      };
    }

    // Quick Test Chips
    document.querySelectorAll('.voice-chip').forEach(chip => {
      chip.onclick = () => {
        const query = chip.dataset.query;
        this.transcript = query;
        voiceAssistant.handleTranscript(query);
      };
    });

    // Voice Event Listeners
    window.addEventListener('mandimitra:voiceStart', () => {
      const statusText = document.getElementById('voiceStatusText');
      const micWave = document.getElementById('micTriggerBtn');
      if (statusText) statusText.innerText = i18n.t('listeningPrompt');
      if (micWave) micWave.classList.add('listening');
    });

    window.addEventListener('mandimitra:voiceEnd', () => {
      const statusText = document.getElementById('voiceStatusText');
      const micWave = document.getElementById('micTriggerBtn');
      if (statusText) statusText.innerText = i18n.currentLang === 'en' ? 'Tap to Speak' : 'बोलण्यासाठी माईक दाबा';
      if (micWave) micWave.classList.remove('listening');
    });

    window.addEventListener('mandimitra:voiceInterim', (e) => {
      const { transcript } = e.detail;
      const statusText = document.getElementById('voiceStatusText');
      if (statusText && transcript) {
        statusText.innerText = `“${transcript}…”`;
      }
    });

    window.addEventListener('mandimitra:voiceResult', (e) => {
      const { transcript, understoodText, responseText, confirmationCard, followupOptions, action } = e.detail;
      this.transcript = transcript || this.transcript;
      this.understoodText = understoodText || '';
      this.responseText = responseText || '';
      this.confirmationCard = confirmationCard || null;
      this.followupOptions = followupOptions || null;
      this.actionData = action || null;
      this.reRender();

      // If navigation action present and no confirmation pending, navigate smoothly
      if (action && !confirmationCard) {
        setTimeout(() => {
          if (!voiceAssistant.isPlayingAudio) {
            this.close();
            window.dispatchEvent(new CustomEvent('mandimitra:navigate', { detail: action }));
          }
        }, 2800);
      }
    });

    window.addEventListener('mandimitra:audioState', () => {
      this.reRender();
    });
  }
};
