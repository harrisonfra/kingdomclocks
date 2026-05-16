// ── Firebase ──────────────────────────────────────────────────────────
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getDatabase, ref, onValue, runTransaction } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js';
import { firebaseConfig } from './firebase-config.js';

const firebaseApp = initializeApp(firebaseConfig);
const db          = getDatabase(firebaseApp);
const shareCountRef = ref(db, 'shareCount');

// ── SVG icon library ──────────────────────────────────────────────────
const ICONS = {
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  pencil: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>`,
  zap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  droplet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
  wifi: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor" stroke="none"/></svg>`,
  cross: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="2" x2="12" y2="22"/><line x1="3" y1="8" x2="21" y2="8"/></svg>`,
  flask: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M9 2v7L4.5 17A2 2 0 0 0 6.31 20h11.38a2 2 0 0 0 1.81-3L15 9V2"/><line x1="6" y1="2" x2="18" y2="2"/><line x1="9" y1="12" x2="15" y2="12"/></svg>`,
  shieldPlus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="9" x2="12" y2="15"/><line x1="9" y1="12" x2="15" y2="12"/></svg>`,
  activity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  heartPlus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/><line x1="12" y1="9" x2="12" y2="15"/><line x1="9" y1="12" x2="15" y2="12"/></svg>`,
  microscope: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M9 3h6v7H9z"/><path d="M12 10v4"/><circle cx="12" cy="17" r="3"/><line x1="6" y1="21" x2="18" y2="21"/><line x1="12" y1="20" x2="12" y2="21"/></svg>`,
  help: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="none"/></svg>`,
};

// ── Clock data ────────────────────────────────────────────────────────
const progressData = [
  // ── Top 3 (kept) ──────────────────────────────────────────────────
  {
    value: 72,
    label: 'Book Of Mormon',
    iconSvg: ICONS.book,
    description: "The Church lists 188 published languages, and the Book of Mormon has 115 official translations plus 21 selections. That means at least some Book of Mormon text exists in about 72.3% of Church-published languages.",
    sourceUrl: 'https://newsroom.churchofjesuschrist.org/facts-and-statistics/state',
  },
  {
    value: 90,
    label: 'Church Service',
    iconSvg: ICONS.globe,
    description: "The Church provides humanitarian relief and development aid in 175 of the world's 195 countries. That means Church-supported aid reaches about 90% of all nations, bringing food, clean water, emergency relief, medical support, education, and self-reliance resources to people across the world.",
    sourceUrl: 'https://newsroom.churchofjesuschrist.org/facts-and-statistics/state',
  },
  {
    value: 86,
    label: 'Adult Literacy',
    iconSvg: ICONS.pencil,
    description: "More than 86% of the world's adults can now read and write. When the Relief Society's modern adult literacy effort began in 1991, global adult literacy was about 75%. Since then, the world has added roughly 2.7 billion more literate adults. Literacy opens the door to scripture, education, work, family teaching, and fuller participation in society.",
    sourceUrl: 'https://www.unesco.org/en/literacy/need-know',
  },

  // ── New 6 ──────────────────────────────────────────────────────────
  {
    value: 92,
    label: 'Accessible Electricity',
    iconSvg: ICONS.zap,
    description: "92% of humanity has access to electricity. Reliable power supports light, refrigeration, communication, education, medical care, and modern work. It allows children to study after dark, clinics to store medicine safely, families to stay connected, and communities to build more stable lives. This is a major sign of progress.",
    sourceUrl: 'https://www.worldbank.org/en/topic/energy/publication/tracking-sdg-7-the-energy-progress-report-2025',
  },
  {
    value: 74,
    label: 'Safe Water',
    iconSvg: ICONS.droplet,
    description: "74% of humanity has safely managed drinking water. Clean water protects families from disease, supports sanitation, improves child health, and gives communities a stronger foundation for daily life. This is a major sign of progress, however around 2.1 billion people still lack safely managed drinking water, including 106 million who collect water directly from rivers, lakes, or other untreated surface sources.",
    sourceUrl: 'https://data.unicef.org/topic/water-and-sanitation/drinking-water/',
  },
  {
    value: 74,
    label: 'Internet Access',
    iconSvg: ICONS.wifi,
    description: "74% of humanity has internet access. The internet gives people access to scripture, education, communication, work, health information, and tools for building better lives. It allows families to stay connected, students to learn from anywhere, churches to share the gospel, and communities to access knowledge at a global scale. This is a major sign of progress.",
    sourceUrl: 'https://www.itu.int/itu-d/reports/statistics/2025/10/15/ff25-internet-use/',
  },
  {
    value: 25,
    label: 'Christian Scientists',
    iconSvg: ICONS.cross,
    description: "Only 25% of scientists in the US are Christian. As one of the most influential fields in shaping the future, science needs more people of faith who can bring God's perspective to research, medicine, technology, and innovation.",
    sourceUrl: 'https://wycliffe.net/global-scripture-access/',
  },
  {
    value: 3,
    label: 'Non-profit R&D',
    iconSvg: ICONS.flask,
    description: "In the U.S., nonprofit organizations performed only 3% of total R&D in 2023. Most science is driven by business and government, not mission-first institutions.",
    sourceUrl: 'https://wycliffe.net/global-scripture-access/',
  },
  {
    value: 10,
    label: 'Organ Donation',
    iconSvg: ICONS.heartPlus,
    description: "Only 10% of global organ transplant need is being met. In the United States alone, more than 103,000 people are waiting for an organ transplant, with about 13 people dying every day before one becomes available. The need is clear: more work needs done here.",
    sourceUrl: 'https://www.who.int/health-topics/transplantation',
  },
];

// Dynamically derived: the 3 lowest-percentage non-placeholder clocks, descending
const needsWorkData = [...progressData]
  .filter(d => !d.isPlaceholder)
  .sort((a, b) => a.value - b.value)
  .slice(0, 3)
  .reverse();

// Progress grid excludes any clock already shown in Needs Work
const needsWorkSet = new Set(needsWorkData);
const progressDisplayData = progressData.filter(d => !needsWorkSet.has(d));

// ── Dial geometry ──────────────────────────────────────────────────────
const R            = 30;
const CX           = 36;
const CY           = 36;
const CIRCUMFERENCE = 2 * Math.PI * R;

function getColor(pct) {
  const p = Math.max(0, Math.min(100, pct));
  const hue = Math.round(p * 1.2); // 0% → 0° red, 50% → 60° yellow, 100% → 120° green
  return `hsl(${hue}, 72%, 42%)`;
}

function makeDial(pct, inverted = false, isPlaceholder = false) {
  const color = isPlaceholder ? '#ccc' : getColor(inverted ? (100 - pct) : pct);
  const offset = isPlaceholder
    ? CIRCUMFERENCE  // empty arc for placeholder
    : CIRCUMFERENCE * (1 - Math.max(0, Math.min(100, pct)) / 100);

  const wrapper = document.createElement('div');
  wrapper.className = 'dial-wrapper';
  wrapper.innerHTML = `
    <svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
      <circle class="dial-bg"       cx="${CX}" cy="${CY}" r="${R}"/>
      <circle class="dial-progress" cx="${CX}" cy="${CY}" r="${R}"
        stroke="${color}"
        stroke-dasharray="${CIRCUMFERENCE.toFixed(2)}"
        stroke-dashoffset="${offset.toFixed(2)}"
      />
    </svg>
    <div class="dial-value" style="color:${color}">${isPlaceholder ? '?' : pct + '%'}</div>
  `;
  return wrapper;
}

function createClockCard(data) {
  const color = data.isPlaceholder
    ? '#ccc'
    : getColor(data.inverted ? (100 - data.value) : data.value);

  const card = document.createElement('div');
  card.className = 'clock-card';
  if (data.isPlaceholder) card.classList.add('clock-card--placeholder');
  card.appendChild(makeDial(data.value, data.inverted, data.isPlaceholder));

  const iconEl = document.createElement('div');
  iconEl.className = 'clock-icon';
  iconEl.innerHTML = data.iconSvg;
  iconEl.style.color = color;

  const labelEl = document.createElement('span');
  labelEl.className = 'clock-label';
  labelEl.textContent = data.label;

  card.appendChild(iconEl);
  card.appendChild(labelEl);
  card.addEventListener('click', () => openClockModal(data));
  return card;
}

// ── Render grids ───────────────────────────────────────────────────────
onValue(shareCountRef, (snapshot) => {
  const count = snapshot.val() || 0;
  document.getElementById('share-count').textContent = `${count.toLocaleString()} Shares`;
});

progressDisplayData.forEach(d => document.getElementById('progress-grid').appendChild(createClockCard(d)));
needsWorkData.forEach(d => document.getElementById('needs-work-grid').appendChild(createClockCard(d)));

// ── Clock detail modal ─────────────────────────────────────────────────
const clockOverlay    = document.getElementById('clock-modal-overlay');
const clockModalCard  = document.getElementById('clock-modal-card');
const clockModalClose = document.getElementById('clock-modal-close');

function openClockModal(data) {
  const color = data.isPlaceholder
    ? '#ccc'
    : getColor(data.inverted ? (100 - data.value) : data.value);

  const dialWrap = document.getElementById('modal-dial-wrap');
  dialWrap.innerHTML = '';
  dialWrap.appendChild(makeDial(data.value, data.inverted, data.isPlaceholder));

  document.getElementById('modal-clock-title').textContent = data.label;

  const iconEl = document.getElementById('modal-clock-icon');
  iconEl.innerHTML = data.iconSvg;
  iconEl.style.color = color;

  document.getElementById('modal-description').textContent     = data.description;
  document.getElementById('modal-source-link').href            = data.sourceUrl;
  document.getElementById('modal-source-url-text').textContent = data.sourceUrl === '#' ? '' : data.sourceUrl;

  const sourceSection = document.querySelector('.modal-source-caption');
  sourceSection.style.display = data.sourceUrl === '#' ? 'none' : '';

  clockOverlay.classList.add('open');
  clockOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeClockModal() {
  clockOverlay.classList.remove('open');
  clockOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

clockModalClose.addEventListener('click', closeClockModal);
clockOverlay.addEventListener('click', (e) => {
  if (!clockModalCard.contains(e.target) && e.target !== clockModalClose) closeClockModal();
});

// ── Join modal ─────────────────────────────────────────────────────────
const joinOverlay = document.getElementById('join-modal-overlay');
const joinCard    = document.getElementById('join-modal-card');

function openJoinModal() {
  joinOverlay.classList.add('open');
  joinOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeJoinModal() {
  joinOverlay.classList.remove('open');
  joinOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

joinOverlay.addEventListener('click', (e) => { if (!joinCard.contains(e.target)) closeJoinModal(); });
document.getElementById('join-btn').addEventListener('click', openJoinModal);
document.getElementById('desktop-join-btn').addEventListener('click', openJoinModal);
document.querySelector('.join-submit-btn').addEventListener('click', () => { closeJoinModal(); showToast('Thank you for joining!'); });

// ── Interest grid (selectable needs-work clocks in join modal) ─────────
(function buildInterestGrid() {
  const grid = document.getElementById('interest-grid');
  needsWorkData.forEach(d => {
    const color = getColor(d.value);
    const card = document.createElement('div');
    card.className = 'clock-card';
    card.appendChild(makeDial(d.value));

    const iconEl = document.createElement('div');
    iconEl.className = 'clock-icon';
    iconEl.innerHTML = d.iconSvg;
    iconEl.style.color = color;

    const labelEl = document.createElement('span');
    labelEl.className = 'clock-label';
    labelEl.textContent = d.label;

    card.appendChild(iconEl);
    card.appendChild(labelEl);
    card.addEventListener('click', () => card.classList.toggle('selected'));
    grid.appendChild(card);
  });
})();

// ── Share button ───────────────────────────────────────────────────────
document.getElementById('share-action-btn').addEventListener('click', async () => {
  runTransaction(shareCountRef, (current) => (current || 0) + 1);
  const url = window.location.href;
  if (navigator.share) {
    try { await navigator.share({ title: 'Kingdom Clocks', url }); } catch (_) {}
  } else if (navigator.clipboard) {
    await navigator.clipboard.writeText(url);
    showToast('Link copied to clipboard!');
  }
});

// ── Toast ──────────────────────────────────────────────────────────────
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2500);
}
