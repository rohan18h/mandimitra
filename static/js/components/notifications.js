/**
 * MandiMitra — Accessible Toast Notifications Component
 */

export const notifications = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      this.container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 360px;
        pointer-events: none;
      `;
      document.body.appendChild(this.container);

      window.addEventListener('mandimitra:notify', (e) => {
        const { message, type = 'info', duration = 4000 } = e.detail;
        this.show(message, type, duration);
      });
    }
  },

  show(message, type = 'info', duration = 4000) {
    this.init();
    const toast = document.createElement('div');
    toast.className = `alert alert-${type}`;
    toast.style.cssText = `
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      pointer-events: auto;
      animation: slide-in 0.25s ease-out;
      font-size: 14px;
      font-weight: 500;
    `;

    const icon = type === 'success' ? '✅' : type === 'warning' ? '⚠️' : type === 'danger' ? '❌' : 'ℹ️';
    toast.innerHTML = `
      <span style="font-size: 16px;">${icon}</span>
      <div style="flex: 1;">${message}</div>
    `;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};
