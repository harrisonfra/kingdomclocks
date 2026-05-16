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
  // ── Share platform icons ───────────────────────────────────────────
  facebook:  `<svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/></svg>`,
  instagram: `<svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/></svg>`,
  xTwitter:  `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  whatsapp:  `<svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/></svg>`,
  messenger: `<svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.64.64 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.64.64 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76m5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z"/></svg>`,
  sms:       `<svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/></svg>`,
  email:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  copy:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
};

// ── Clock data ────────────────────────────────────────────────────────
const progressData = [
  // ── Top 3 (kept) ──────────────────────────────────────────────────
  {
    value: 100,
    label: 'Christian Fellowship',
    iconSvg: ICONS.book,
    description: "100% of countries around the world now have Christian presence. Christians now live and gather in every nation on earth. In some places this is public and protected. In others, it is private, limited, or under pressure. This does not mean every person has easy access to a church, but it does show that the body of Christ has spread across every nation and region of the world. This is a major sign of progress.",
    sourceUrl: 'https://operationworld.org/locations/world/',
  },
  {
    value: 75,
    label: 'Bible Access',
    iconSvg: ICONS.book,
    description: "75% of people worldwide now have access to the full Bible in a language they know and understand best. That means more than 6.1 billion people have the opportunity to read the complete scriptures in their heart language. This is a major sign of progress.",
    sourceUrl: 'https://www.biblesociety.org.au/blog/the-bible-in-heart-languages-for-6-1-billion-people/?utm_source=chatgpt.com',
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
    value: 46,
    label: 'Christian Support',
    iconSvg: ICONS.cross,
    description: "Only 46% of U.S. Christians say science does more good than harm. Among evangelicals, that number falls to 39%. At the same time, science shapes medicine, food, energy, communication, and nearly every tool we use to serve our neighbors. The need is clear: more work needs to be done here.",
    sourceUrl: 'https://www.pewresearch.org/religion/2025/02/26/religion-and-views-of-science/?utm_source=chatgpt.com',
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

// ── Share modal ────────────────────────────────────────────────────────
const shareOverlay = document.getElementById('share-modal-overlay');
const shareCard    = document.getElementById('share-modal-card');

const SHARE_PLATFORMS = [
  { label: 'Facebook',   icon: ICONS.facebook,  color: '#1877F2', iconColor: '#fff',
    action: (url) => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, 'fb-share', 'width=580,height=520,resizable=yes') },
  { label: 'Instagram',  icon: ICONS.instagram, color: '#E1306C', iconColor: '#fff',
    action: async (url) => {
      if (navigator.share) {
        try { await navigator.share({ title: 'Kingdom Clocks', text: 'What time is it in God\'s Kingdom?', url }); return; } catch (_) {}
      }
      await navigator.clipboard.writeText(url);
      showToast('Link copied — paste on Instagram!');
    }},
  { label: 'X',          icon: ICONS.xTwitter,  color: '#000',    iconColor: '#fff',
    action: (url) => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent('What time is it in God\'s Kingdom? See Kingdom Clocks.')}`, '_blank') },
  { label: 'WhatsApp',   icon: ICONS.whatsapp,  color: '#25D366', iconColor: '#fff',
    action: (url) => window.open(`https://wa.me/?text=${encodeURIComponent('Check out Kingdom Clocks: ' + url)}`, '_blank') },
  { label: 'Messenger',  icon: ICONS.messenger, color: '#0084FF', iconColor: '#fff',
    action: (url) => {
      navigator.clipboard?.writeText(url);
      const a = document.createElement('a');
      a.href = `fb-messenger://share/?link=${encodeURIComponent(url)}`;
      a.click();
      showToast('Opening Messenger… link also copied!');
    }},
  { label: 'iMessage',   icon: ICONS.sms,       color: '#34C759', iconColor: '#fff',
    action: (url) => window.location.href = `sms:?&body=${encodeURIComponent('Check out Kingdom Clocks: ' + url)}` },
  { label: 'Email',      icon: ICONS.email,     color: '#c9821a', iconColor: '#fff',
    action: (url) => window.location.href = `mailto:?subject=${encodeURIComponent('Kingdom Clocks')}&body=${encodeURIComponent('Check out Kingdom Clocks: ' + url)}` },
  { label: 'Copy Link',  icon: ICONS.copy,      color: '#4a3820', iconColor: '#fff',
    action: (url) => { navigator.clipboard.writeText(url); showToast('Link copied to clipboard!'); } },
];

(function buildShareGrid() {
  const grid = document.getElementById('share-options-grid');
  const url  = window.location.href;
  SHARE_PLATFORMS.forEach(platform => {
    const btn = document.createElement('button');
    btn.className = 'share-option-btn';

    const iconWrap = document.createElement('div');
    iconWrap.className = 'share-option-icon';
    iconWrap.style.background = platform.color;
    iconWrap.style.color = platform.iconColor;
    iconWrap.innerHTML = platform.icon;

    const label = document.createElement('span');
    label.className = 'share-option-label';
    label.textContent = platform.label;

    btn.appendChild(iconWrap);
    btn.appendChild(label);
    btn.addEventListener('click', async () => {
      runTransaction(shareCountRef, (current) => (current || 0) + 1);
      closeShareModal();
      await platform.action(url);
    });
    grid.appendChild(btn);
  });
})();

function openShareModal() {
  shareOverlay.classList.add('open');
  shareOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeShareModal() {
  shareOverlay.classList.remove('open');
  shareOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.getElementById('share-modal-cancel').addEventListener('click', closeShareModal);
shareOverlay.addEventListener('click', (e) => { if (!shareCard.contains(e.target)) closeShareModal(); });
document.getElementById('share-action-btn').addEventListener('click', openShareModal);

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
