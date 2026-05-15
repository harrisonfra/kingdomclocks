// SVG dial geometry
const RADIUS = 33;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CX = 42, CY = 42; // center of 84x84 viewBox

// Color scale: red → orange → yellow → green
function getColor(pct) {
  const p = Math.max(0, Math.min(100, pct));
  let h, s, l;

  if (p >= 85) {
    // Yellow-green → rich green
    const t = (p - 85) / 15;
    h = 80 + t * 40;   // 80→120
    s = 60;
    l = 36 + t * 2;    // 36→38
  } else if (p >= 65) {
    // Gold-yellow → yellow-green
    const t = (p - 65) / 20;
    h = 45 + t * 35;   // 45→80
    s = 75;
    l = 40;
  } else if (p >= 40) {
    // Orange → gold
    const t = (p - 40) / 25;
    h = 22 + t * 23;   // 22→45
    s = 82;
    l = 42;
  } else {
    // Deep red → orange
    const t = p / 40;
    h = 2 + t * 20;    // 2→22
    s = 78;
    l = 40 + t * 4;
  }

  return `hsl(${Math.round(h)}, ${s}%, ${l}%)`;
}

// Build the SVG path offset for a given percentage
function dashOffset(pct) {
  return CIRCUMFERENCE * (1 - Math.max(0, Math.min(100, pct)) / 100);
}

// Create a single clock card DOM element
function createClockCard({ value, label, icon, inverted = false }) {
  const pct = parseFloat(value) || 0;
  const colorPct = inverted ? (100 - pct) : pct;
  const color = getColor(colorPct);
  const offset = dashOffset(pct);

  const card = document.createElement('div');
  card.className = 'clock-card';

  card.innerHTML = `
    <div class="dial-wrapper">
      <svg viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg">
        <circle class="dial-bg" cx="${CX}" cy="${CY}" r="${RADIUS}"/>
        <circle class="dial-progress"
          cx="${CX}" cy="${CY}" r="${RADIUS}"
          stroke="${color}"
          stroke-dasharray="${CIRCUMFERENCE.toFixed(2)}"
          stroke-dashoffset="${offset.toFixed(2)}"
        />
      </svg>
      <div class="dial-value" style="color: ${color}">${pct}%</div>
    </div>
    <span class="clock-icon">${icon}</span>
    <span class="clock-label">${label}</span>
  `;

  return card;
}

// ── Data ─────────────────────────────────────────────────────────────────
const progressData = [
  { value: 92.6, label: 'Bible Translation',    icon: '📖' },
  { value: 96.3, label: 'Child Survival',        icon: '👶' },
  { value: 92,   label: 'Electricity Access',    icon: '⚡' },
  { value: 85,   label: 'DTP3 Vaccination',      icon: '🛡️' },
  { value: 83,   label: 'School Enrollment',     icon: '🎓' },
  { value: 74,   label: 'Clean Drinking Water',  icon: '💧' },
  { value: 68,   label: 'Internet Access',       icon: '🌐' },
];

const needsWorkData = [
  { value: 75, label: 'Deaths from Age-Related Disease', icon: '📈', inverted: true },
  { value: 10, label: 'Global Organ Need Met',            icon: '❤️' },
  { value: 8,  label: 'NIA Budget to Aging Biology',      icon: '🔬' },
];

// ── Render ────────────────────────────────────────────────────────────────
const progressGrid   = document.getElementById('progress-grid');
const needsWorkGrid  = document.getElementById('needs-work-grid');

progressData.forEach(d  => progressGrid.appendChild(createClockCard(d)));
needsWorkData.forEach(d => needsWorkGrid.appendChild(createClockCard(d)));

// ── Toast helper ──────────────────────────────────────────────────────────
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ── Top nav buttons ───────────────────────────────────────────────────────
document.getElementById('share-btn').addEventListener('click', async () => {
  const url = window.location.href;
  if (navigator.share) {
    try { await navigator.share({ title: 'Kingdom Clocks', url }); } catch (_) {}
  } else if (navigator.clipboard) {
    await navigator.clipboard.writeText(url);
    showToast('Link copied to clipboard!');
  } else {
    showToast('Copy this URL: ' + url);
  }
});

document.getElementById('translate-btn').addEventListener('click', () => {
  const url = 'https://translate.google.com/translate?sl=en&tl=es&u=' +
    encodeURIComponent(window.location.href);
  window.open(url, '_blank', 'noopener');
});

// Menu drawer
const menuBtn     = document.getElementById('menu-btn');
const menuDrawer  = document.getElementById('menu-drawer');
const menuOverlay = document.getElementById('menu-overlay');
const menuClose   = document.getElementById('menu-close');

function openMenu()  { menuDrawer.classList.add('open'); menuOverlay.classList.add('open'); }
function closeMenu() { menuDrawer.classList.remove('open'); menuOverlay.classList.remove('open'); }

menuBtn.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);

// Join button
document.getElementById('join-btn').addEventListener('click', () => {
  showToast('Redirecting to join page…');
});
