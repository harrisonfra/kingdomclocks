// ── Config ────────────────────────────────────────────────────────────
const SHARE_COUNT = 1582;
const SHARE_GOAL  = 10000;

// ── SVG icon library ──────────────────────────────────────────────────
const ICONS = {
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,

  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,

  pencil: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>`,

  shieldPlus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="9" x2="12" y2="15"/><line x1="9" y1="12" x2="15" y2="12"/></svg>`,

  graduationCap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,

  droplet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,

  activity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,

  heartPlus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/><line x1="12" y1="9" x2="12" y2="15"/><line x1="9" y1="12" x2="15" y2="12"/></svg>`,

  microscope: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M9 3h6v7H9z"/><path d="M12 10v4"/><circle cx="12" cy="17" r="3"/><line x1="6" y1="21" x2="18" y2="21"/><line x1="12" y1="20" x2="12" y2="21"/></svg>`,
};

// ── Clock data ────────────────────────────────────────────────────────
const progressData = [
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
  {
    value: 85,
    label: 'DTP3 Vaccination',
    iconSvg: ICONS.shieldPlus,
    description: "85% of infants worldwide receive the DTP3 vaccine, protecting against diphtheria, tetanus, and pertussis. This coverage prevents millions of deaths annually.",
    sourceUrl: 'https://www.who.int/immunization/monitoring_surveillance/en/',
  },
  {
    value: 83,
    label: 'School Enrollment',
    iconSvg: ICONS.graduationCap,
    description: "83% of children of primary school age are enrolled in school globally. Universal education remains a cornerstone of building thriving communities and reducing poverty.",
    sourceUrl: 'https://data.worldbank.org/indicator/SE.PRM.ENRR',
  },
  {
    value: 74,
    label: 'Clean Drinking Water',
    iconSvg: ICONS.droplet,
    description: "74% of the global population now has access to safely managed drinking water. While significant progress has been made, 2 billion people still lack safe water at home.",
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/drinking-water',
  },
];

const needsWorkData = [
  {
    value: 75,
    label: 'Deaths from Age-Related Disease',
    iconSvg: ICONS.activity,
    inverted: true,
    description: "75% of all deaths globally are from age-related diseases. Cardiovascular disease, cancer, and neurodegeneration account for the vast majority. Advances in longevity research could dramatically reduce this number.",
    sourceUrl: 'https://ourworldindata.org/causes-of-death',
  },
  {
    value: 10,
    label: 'Global Organ Need Met',
    iconSvg: ICONS.heartPlus,
    description: "Only 10% of the global need for organ transplants is currently being met. Over 130,000 patients in the US alone are on transplant waiting lists, with 20 people dying each day while waiting.",
    sourceUrl: 'https://www.who.int/transplantation/organ/en/',
  },
  {
    value: 8,
    label: 'NIA Budget to Aging Biology',
    iconSvg: ICONS.microscope,
    description: "Only 8% of the National Institute on Aging's budget is directed toward the fundamental biology of aging itself. Most funding goes to individual diseases rather than the underlying aging process.",
    sourceUrl: 'https://www.nia.nih.gov/about/budget',
  },
];

// ── Dial geometry ──────────────────────────────────────────────────────
const R            = 30;
const CX           = 36;
const CY           = 36;
const CIRCUMFERENCE = 2 * Math.PI * R;

function getColor(pct) {
  const p = Math.max(0, Math.min(100, pct));
  if (p >= 85) {
    const t = (p - 85) / 15;
    return `hsl(${Math.round(78 + t * 42)}, 60%, 37%)`;
  } else if (p >= 65) {
    const t = (p - 65) / 20;
    return `hsl(${Math.round(44 + t * 34)}, 78%, 40%)`;
  } else if (p >= 40) {
    const t = (p - 40) / 25;
    return `hsl(${Math.round(20 + t * 24)}, 83%, 43%)`;
  } else {
    const t = p / 40;
    return `hsl(${Math.round(2 + t * 18)}, 76%, 41%)`;
  }
}

function makeDial(pct, inverted = false) {
  const colorPct = inverted ? (100 - pct) : pct;
  const color    = getColor(colorPct);
  const offset   = CIRCUMFERENCE * (1 - Math.max(0, Math.min(100, pct)) / 100);

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
    <div class="dial-value" style="color:${color}">${pct}%</div>
  `;
  return wrapper;
}

function createClockCard(data) {
  const colorPct = data.inverted ? (100 - data.value) : data.value;
  const color    = getColor(colorPct);

  const card = document.createElement('div');
  card.className = 'clock-card';
  card.appendChild(makeDial(data.value, data.inverted));

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
document.getElementById('share-count').textContent = `${SHARE_COUNT.toLocaleString()} Shares`;

progressData.forEach(d  => document.getElementById('progress-grid').appendChild(createClockCard(d)));
needsWorkData.forEach(d => document.getElementById('needs-work-grid').appendChild(createClockCard(d)));

// ── Clock detail modal ─────────────────────────────────────────────────
const clockOverlay    = document.getElementById('clock-modal-overlay');
const clockModalCard  = document.getElementById('clock-modal-card');
const clockModalClose = document.getElementById('clock-modal-close');

function openClockModal(data) {
  const colorPct = data.inverted ? (100 - data.value) : data.value;
  const color    = getColor(colorPct);

  const dialWrap = document.getElementById('modal-dial-wrap');
  dialWrap.innerHTML = '';
  dialWrap.appendChild(makeDial(data.value, data.inverted));

  document.getElementById('modal-clock-title').textContent = data.label;

  const iconEl = document.getElementById('modal-clock-icon');
  iconEl.innerHTML = data.iconSvg;
  iconEl.style.color = color;

  document.getElementById('modal-description').textContent     = data.description;
  document.getElementById('modal-source-link').href            = data.sourceUrl;
  document.getElementById('modal-source-url-text').textContent = data.sourceUrl;

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
    const colorPct = d.inverted ? (100 - d.value) : d.value;
    const color    = getColor(colorPct);

    const card = document.createElement('div');
    card.className = 'clock-card';
    card.appendChild(makeDial(d.value, d.inverted));

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
