// ── Config ────────────────────────────────────────────────────────────
const SHARE_COUNT = 1582;
const SHARE_GOAL  = 10000;

// ── Clock data ────────────────────────────────────────────────────────
const progressData = [
  {
    value: 92.6,
    label: 'Bible Translation',
    icon: '📖',
    description: "92.6% of all living languages have a Bible translation work started. That means of the world's 7,396 living languages, 776 languages have a full translation, with 1,798 having only the new testament, with 1,433 in progress and only portion's completed.",
    sourceUrl: 'https://wycliffe.net/global-scripture-access/',
  },
  {
    value: 96.3,
    label: 'Child Survival',
    icon: '👶',
    description: "96.3% of children now survive to age 5, up from just 80% in 1960. Child mortality has dropped dramatically thanks to vaccines, improved nutrition, and better healthcare access worldwide.",
    sourceUrl: 'https://ourworldindata.org/child-mortality',
  },
  {
    value: 92,
    label: 'Electricity Access',
    icon: '⚡',
    description: "92% of the world's population now has access to electricity, up from 83% in 2010. Progress has been fastest in Sub-Saharan Africa and South Asia through rural electrification programs.",
    sourceUrl: 'https://trackingsdg7.esmap.org/',
  },
  {
    value: 85,
    label: 'DTP3 Vaccination',
    icon: '🛡️',
    description: "85% of infants worldwide receive the DTP3 vaccine, protecting against diphtheria, tetanus, and pertussis. This coverage prevents millions of deaths annually.",
    sourceUrl: 'https://www.who.int/immunization/monitoring_surveillance/en/',
  },
  {
    value: 83,
    label: 'School Enrollment',
    icon: '🎓',
    description: "83% of children of primary school age are enrolled in school globally. Universal education remains a cornerstone of building thriving communities and reducing poverty.",
    sourceUrl: 'https://data.worldbank.org/indicator/SE.PRM.ENRR',
  },
  {
    value: 74,
    label: 'Clean Drinking Water',
    icon: '💧',
    description: "74% of the global population now has access to safely managed drinking water. While significant progress has been made, 2 billion people still lack safe water at home.",
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/drinking-water',
  },
];

const needsWorkData = [
  {
    value: 75,
    label: 'Deaths from Age-Related Disease',
    icon: '📈',
    inverted: true,
    description: "75% of all deaths globally are from age-related diseases. Cardiovascular disease, cancer, and neurodegeneration account for the vast majority. Advances in longevity research could dramatically reduce this number.",
    sourceUrl: 'https://ourworldindata.org/causes-of-death',
  },
  {
    value: 10,
    label: 'Global Organ Need Met',
    icon: '❤️',
    description: "Only 10% of the global need for organ transplants is currently being met. Over 130,000 patients in the US alone are on transplant waiting lists, with 20 people dying each day while waiting.",
    sourceUrl: 'https://www.who.int/transplantation/organ/en/',
  },
  {
    value: 8,
    label: 'NIA Budget to Aging Biology',
    icon: '🔬',
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
  const card = document.createElement('div');
  card.className = 'clock-card';
  card.appendChild(makeDial(data.value, data.inverted));

  const icon = document.createElement('span');
  icon.className = 'clock-icon';
  icon.textContent = data.icon;

  const label = document.createElement('span');
  label.className = 'clock-label';
  label.textContent = data.label;

  card.appendChild(icon);
  card.appendChild(label);

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
  // Build large dial
  const dialWrap = document.getElementById('modal-dial-wrap');
  dialWrap.innerHTML = '';
  dialWrap.appendChild(makeDial(data.value, data.inverted));

  document.getElementById('modal-clock-title').textContent   = data.label;
  document.getElementById('modal-clock-icon').textContent    = data.icon;
  document.getElementById('modal-description').textContent   = data.description;
  document.getElementById('modal-source-link').href          = data.sourceUrl;
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
  if (!clockModalCard.contains(e.target)) closeClockModal();
});

// ── Join modal ─────────────────────────────────────────────────────────
const joinOverlay  = document.getElementById('join-modal-overlay');
const joinCard     = document.getElementById('join-modal-card');

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

joinOverlay.addEventListener('click', (e) => {
  if (!joinCard.contains(e.target)) closeJoinModal();
});

document.getElementById('join-btn').addEventListener('click', openJoinModal);
document.getElementById('desktop-join-btn').addEventListener('click', openJoinModal);

document.querySelector('.join-submit-btn').addEventListener('click', () => {
  closeJoinModal();
  showToast('Thank you for joining!');
});

// ── Interest grid: rebuilt without modal-open listener ─────────────────
// (We rebuilt cards in the loop above but the click handler still fires openClockModal
//  because createClockCard adds it. Fix by rebuilding interest cards cleanly.)
(function rebuildInterestGrid() {
  const grid = document.getElementById('interest-grid');
  grid.innerHTML = '';
  needsWorkData.forEach(d => {
    const card = document.createElement('div');
    card.className = 'clock-card';
    card.appendChild(makeDial(d.value, d.inverted));

    const icon = document.createElement('span');
    icon.className = 'clock-icon';
    icon.textContent = d.icon;

    const label = document.createElement('span');
    label.className = 'clock-label';
    label.textContent = d.label;

    card.appendChild(icon);
    card.appendChild(label);

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
