(() => {
  'use strict';

  const root = document.querySelector('.cl-soon06');
  if (!root) return;

  
  const initProgress = () => {
    const bar = root.querySelector('[data-progress]');
    if (!bar) return;
    const value = Math.max(0, Math.min(100, parseInt(bar.dataset.progress, 10) || 0));
    bar.setAttribute('aria-valuenow', String(value));
    bar.setAttribute('aria-valuetext', `${value} percent built`);
    const pct = root.querySelector('[data-percent]');
    if (pct) pct.textContent = `${value}%`;
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => bar.style.setProperty('--cl-soon06-p', `${value}%`)));
  };

  
  const initDate = () => {
    const el = root.querySelector('[data-launch-date]');
    if (!el) return;
    let t = Date.parse(root.dataset.launch || '');
    if (Number.isNaN(t) || t < Date.now()) {
      const d = new Date();
      d.setDate(d.getDate() + (parseInt(root.dataset.days, 10) || 18));
      t = d.getTime();
    }
    el.textContent = new Intl.DateTimeFormat(undefined, { weekday: 'long', day: 'numeric', month: 'long' }).format(t);
    el.setAttribute('datetime', new Date(t).toISOString().slice(0, 10));
  };

  
  const initPhases = () => {
    root.querySelectorAll('[data-phase-toggle]').forEach((btn) => {
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) return;
      btn.addEventListener('click', () => {
        const open = btn.getAttribute('aria-expanded') !== 'true';
        btn.setAttribute('aria-expanded', String(open));
        panel.hidden = !open;
      });
    });
  };

  initProgress();
  initDate();
  initPhases();
})();

