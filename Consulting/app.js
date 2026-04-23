/* =========================================================
   Casen — app.js
   flashcards · learn (MC) · match (timed) · frameworks · cases · formulas
   ========================================================= */

const CATS = Array.from(new Set(CARDS.map(c => c.cat)));

function catSlug(c){
  return c.toLowerCase()
          .replace(/&/g, "and")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
}
const catClass = c => "cat--" + catSlug(c);

/* ---------- tabs ---------- */
const tabs   = document.querySelectorAll(".file-tabs .tab");
const sheets = document.querySelectorAll(".sheet");

function activateTab(name){
  tabs.forEach(t => {
    if (t.dataset.target === "home") return;
    t.classList.toggle("tab--active", t.dataset.target === name);
  });
  sheets.forEach(s => s.classList.toggle("sheet--active", s.id === name));
  // jobs / news / behaviorals are reached through the top nav, not the
  // notebook file-tabs — flag the body so CSS can hide the tab strip there.
  document.body.dataset.activeSheet = name || "";
}
tabs.forEach(t => {
  if (t.dataset.target === "home") return;
  t.addEventListener("click", () => {
    activateTab(t.dataset.target);
    if (history.replaceState) history.replaceState(null, "", "#" + t.dataset.target);
  });
});

function activateFromHash(){
  const id = (location.hash || "").replace(/^#/, "");
  if (!id) return;
  const sheet = document.getElementById(id);
  if (!sheet || !sheet.classList.contains("sheet")) return;
  activateTab(id);
  document.querySelector(".file-tabs")?.scrollIntoView({ block: "start", behavior: "auto" });
}
window.addEventListener("hashchange", activateFromHash);
activateFromHash();

function cycleTab(dir){
  const order = Array.from(tabs).filter(t => t.dataset.target !== "home").map(t => t.dataset.target);
  const cur   = order.findIndex(id => document.getElementById(id).classList.contains("sheet--active"));
  const next  = (cur + dir + order.length) % order.length;
  activateTab(order[next]);
}

document.addEventListener("keydown", e => {
  if (e.target.matches("input, textarea")) return;
  const active = document.querySelector(".sheet--active")?.id;
  if (e.key === "ArrowLeft"  && active !== "cards") cycleTab(-1);
  if (e.key === "ArrowRight" && active !== "cards") cycleTab(+1);
});

/* ---------- filter chip builders ---------- */
function buildFilterChips(containerId, radioName, onChange){
  const bar = document.getElementById(containerId);
  if (!bar) return;
  const frag = document.createDocumentFragment();
  const mkChip = (val, label, checked) => {
    const lbl = document.createElement("label");
    lbl.className = "deck-chip";
    const inp = document.createElement("input");
    inp.type = "radio"; inp.name = radioName; inp.value = val;
    if (checked) inp.checked = true;
    inp.addEventListener("change", () => onChange(val));
    lbl.appendChild(inp);
    lbl.appendChild(document.createTextNode(label));
    return lbl;
  };
  frag.appendChild(mkChip("all", `All (${CARDS.length})`, true));
  CATS.forEach(c => {
    const n = CARDS.filter(x => x.cat === c).length;
    frag.appendChild(mkChip(c, `${c} (${n})`, false));
  });
  // insert before any existing children (e.g., shuffle btn in flashcards bar)
  bar.insertBefore(frag, bar.firstChild);
}

/* =========================================================
   FLASHCARDS — delegated to the shared session module
   (See /assets/flashcards.js for the state machine.)
   ========================================================= */
function filterCards(filter){
  // Still exported for the Learn/Match tabs below that reuse it.
  if (filter === "all") return CARDS.slice();
  return CARDS.filter(c => c.cat === filter);
}

// Bootstrap the shared flashcards session. Filter chips are the deck radios
// built above by buildFilterChips().
buildFilterChips("card-filter-bar", "deck", () => {
  // The shared module auto-rebuilds the run whenever a filter radio changes.
});
window.StudyLab?.flashcards?.init({
  cards:       CARDS,
  fields:      { term: "term", def: "def", hint: "hint", cat: "cat" },
  weightKey:   "darden.card.weights",
  masteredKey: "darden.card.mastered",
  catClass:    c => catClass(c.cat || ""),
});

/* =========================================================
   LEARN (4-option MC, requeue misses)
   ========================================================= */
let lnQueue = [];
let lnMastered = new Set();
let lnTotal = 0;
let lnCurrent = null;
let lnFilter = "all";

function pickDistractors(correct, pool, n){
  const others = pool.filter(c => c.term !== correct.term);
  for (let i = others.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [others[i], others[j]] = [others[j], others[i]];
  }
  return others.slice(0, n);
}

function startLearn(){
  const pool = filterCards(lnFilter);
  lnQueue = pool.slice();
  for (let i = lnQueue.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [lnQueue[i], lnQueue[j]] = [lnQueue[j], lnQueue[i]];
  }
  lnMastered = new Set();
  lnTotal = pool.length;
  document.getElementById("learn-start").style.display = "none";
  document.getElementById("learn-done").style.display  = "none";
  document.getElementById("learn-session").style.display = "block";
  updateLearnProgress();
  serveLearn();
}

function updateLearnProgress(){
  const pct = lnTotal ? Math.round(100 * lnMastered.size / lnTotal) : 0;
  document.getElementById("learn-prog-fill").style.width = pct + "%";
  document.getElementById("learn-prog-txt").textContent = `${lnMastered.size} / ${lnTotal} mastered`;
}

function serveLearn(){
  if (!lnQueue.length){ endLearn(); return; }
  lnCurrent = lnQueue.shift();
  document.getElementById("learn-mc-cat").textContent = lnCurrent.cat;
  document.getElementById("learn-mc-q").textContent   = lnCurrent.def;
  const distract = pickDistractors(lnCurrent, CARDS, 3);
  const opts = [...distract, lnCurrent];
  for (let i = opts.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  const wrap = document.getElementById("learn-mc-opts");
  wrap.innerHTML = "";
  opts.forEach(o => {
    const b = document.createElement("button");
    b.className = "learn-opt";
    b.textContent = o.term;
    b.addEventListener("click", () => checkMC(b, o));
    wrap.appendChild(b);
  });
  const fb = document.getElementById("learn-mc-fb");
  fb.textContent = ""; fb.className = "check-feedback";
  document.getElementById("learn-mc-next").style.display = "none";
}

function checkMC(btn, chosen){
  const all = document.querySelectorAll("#learn-mc-opts .learn-opt");
  all.forEach(b => b.style.pointerEvents = "none");
  const fb = document.getElementById("learn-mc-fb");
  if (chosen.term === lnCurrent.term){
    btn.classList.add("correct");
    fb.textContent = "✓ Right.";
    fb.className = "check-feedback ok";
    lnMastered.add(lnCurrent.term);
  } else {
    btn.classList.add("wrong");
    all.forEach(b => { if (b.textContent === lnCurrent.term) b.classList.add("correct"); });
    fb.textContent = `✗ It's "${lnCurrent.term}".`;
    fb.className = "check-feedback bad";
    const ins = Math.min(lnQueue.length, 3);
    lnQueue.splice(ins, 0, lnCurrent);
  }
  updateLearnProgress();
  document.getElementById("learn-mc-next").style.display = "inline-block";
}

function endLearn(){
  document.getElementById("learn-session").style.display = "none";
  document.getElementById("learn-done").style.display    = "block";
  document.getElementById("learn-done-txt").textContent  = `${lnMastered.size} / ${lnTotal} terms.`;
}

buildFilterChips("learn-filter-bar", "lfilter", v => { lnFilter = v; });

document.getElementById("learn-start-btn").addEventListener("click", startLearn);
document.getElementById("learn-mc-next").addEventListener("click", serveLearn);
document.getElementById("learn-restart").addEventListener("click", () => {
  document.getElementById("learn-done").style.display  = "none";
  document.getElementById("learn-start").style.display = "block";
});

/* =========================================================
   MATH DRILLS — timed single-problem practice (Learn mode 2)
   ========================================================= */
const MD_TYPES = ["All", "Market Sizing", "Breakeven", "CAGR", "Margin / Markup", "Revenue / Profit"];
let mdTypeFilter = "All";
let mdCurrent = null;
let mdTimer = null;
let mdRemaining = 0;
let mdLastId = null;

function fmtNum(n){
  const abs = Math.abs(n);
  if (abs >= 1e9) return (n / 1e9).toFixed(2).replace(/\.?0+$/, "") + "B";
  if (abs >= 1e6) return (n / 1e6).toFixed(2).replace(/\.?0+$/, "") + "M";
  if (abs >= 1e3) return (n / 1e3).toFixed(1).replace(/\.?0+$/, "") + "K";
  if (Number.isInteger(n)) return n.toString();
  return n.toFixed(2).replace(/\.?0+$/, "");
}

function fmtRange(d){
  if (d.exact !== undefined && Math.abs(d.answerHi - d.answerLo) <= Math.max(2, 0.02 * Math.abs(d.exact))){
    return `${fmtNum(d.exact)} ${d.unit}`;
  }
  return `${fmtNum(d.answerLo)} – ${fmtNum(d.answerHi)} ${d.unit}`;
}

function buildMdTypeBar(){
  const bar = document.getElementById("md-type-bar");
  if (!bar) return;
  bar.innerHTML = "";
  MD_TYPES.forEach(t => {
    const count = t === "All"
      ? MATH_DRILLS.length
      : MATH_DRILLS.filter(d => d.type === t).length;
    const lbl = document.createElement("label");
    lbl.className = "deck-chip";
    const inp = document.createElement("input");
    inp.type = "radio"; inp.name = "mdtype"; inp.value = t;
    if (t === mdTypeFilter) inp.checked = true;
    inp.addEventListener("change", () => { mdTypeFilter = t; });
    lbl.appendChild(inp);
    lbl.appendChild(document.createTextNode(`${t === "All" ? "All" : t.toLowerCase()} (${count})`));
    bar.appendChild(lbl);
  });
}

function pickDrill(){
  const pool = mdTypeFilter === "All"
    ? MATH_DRILLS
    : MATH_DRILLS.filter(d => d.type === mdTypeFilter);
  if (!pool.length) return null;
  if (pool.length === 1) return pool[0];
  let pick;
  let tries = 0;
  do {
    pick = pool[Math.floor(Math.random() * pool.length)];
    tries++;
  } while (pick.id === mdLastId && tries < 8);
  mdLastId = pick.id;
  return pick;
}

function startDrill(){
  const d = pickDrill();
  if (!d) return;
  mdCurrent = d;
  mdRemaining = d.timeSec;

  document.getElementById("md-picker").style.display = "none";
  document.getElementById("md-session").style.display = "block";

  document.getElementById("md-type-badge").textContent = d.type.toLowerCase();
  document.getElementById("md-prompt").textContent = d.prompt;
  document.getElementById("md-unit").textContent = d.unit;

  const input = document.getElementById("md-input");
  input.value = "";
  input.disabled = false;
  document.getElementById("md-check").disabled = false;
  document.getElementById("md-show-sol").disabled = false;

  const fb = document.getElementById("md-feedback");
  fb.textContent = ""; fb.className = "md-feedback";

  document.getElementById("md-solution").style.display = "none";
  document.getElementById("md-solution-txt").textContent = d.solution;
  document.getElementById("md-next").style.display = "none";

  updateMdTimer();
  clearInterval(mdTimer);
  mdTimer = setInterval(() => {
    mdRemaining -= 1;
    updateMdTimer();
    if (mdRemaining <= 0){
      clearInterval(mdTimer);
      mdTimer = null;
      timeUpDrill();
    }
  }, 1000);

  setTimeout(() => input.focus(), 50);
}

function updateMdTimer(){
  const el = document.getElementById("md-timer");
  if (!el) return;
  const r = Math.max(0, mdRemaining);
  const m = Math.floor(r / 60);
  const s = r % 60;
  el.textContent = `${m}:${String(s).padStart(2, "0")}`;
  el.classList.toggle("md-timer--warn",  r <= 30 && r > 10);
  el.classList.toggle("md-timer--danger", r <= 10);
}

function timeUpDrill(){
  const fb = document.getElementById("md-feedback");
  fb.textContent = "⏱ time's up — interviewer's waiting. Take your best shot, then check.";
  fb.className = "md-feedback warn";
}

function checkDrill(){
  if (!mdCurrent) return;
  const raw = document.getElementById("md-input").value.trim();
  const val = parseFloat(raw);
  const fb = document.getElementById("md-feedback");
  if (raw === "" || Number.isNaN(val)){
    fb.textContent = "enter a number first.";
    fb.className = "md-feedback bad";
    return;
  }
  const correct = val >= mdCurrent.answerLo && val <= mdCurrent.answerHi;
  if (correct){
    fb.textContent = `✓ in range (target: ${fmtRange(mdCurrent)}).`;
    fb.className = "md-feedback ok";
  } else {
    const delta = val < mdCurrent.answerLo ? "too low" : "too high";
    fb.textContent = `✗ ${delta} — target was ${fmtRange(mdCurrent)}.`;
    fb.className = "md-feedback bad";
  }
  finishDrill();
}

function showSolutionDrill(){
  if (!mdCurrent) return;
  const fb = document.getElementById("md-feedback");
  if (!fb.textContent){
    fb.textContent = `target: ${fmtRange(mdCurrent)}.`;
    fb.className = "md-feedback warn";
  }
  finishDrill();
}

function finishDrill(){
  clearInterval(mdTimer);
  mdTimer = null;
  document.getElementById("md-input").disabled = true;
  document.getElementById("md-check").disabled = true;
  document.getElementById("md-show-sol").disabled = true;
  document.getElementById("md-solution").style.display = "block";
  document.getElementById("md-next").style.display = "inline-block";
}

function backToDrillPicker(){
  clearInterval(mdTimer);
  mdTimer = null;
  mdCurrent = null;
  document.getElementById("md-session").style.display = "none";
  document.getElementById("md-picker").style.display = "block";
}

function setLearnMode(mode){
  const mc   = document.getElementById("learn-mc-mode");
  const math = document.getElementById("learn-math-mode");
  const mm   = document.getElementById("learn-mm-mode");
  const bt   = document.getElementById("learn-bt-mode");
  document.querySelectorAll(".learn-mode-switch .mode-btn").forEach(b => {
    b.classList.toggle("mode-btn--on", b.dataset.lmode === mode);
  });
  mc.style.display   = mode === "mc"   ? "block" : "none";
  math.style.display = mode === "math" ? "block" : "none";
  if (mm) mm.style.display = mode === "mm" ? "block" : "none";
  if (bt) bt.style.display = mode === "bt" ? "block" : "none";
  if (mode !== "math" && mdTimer){ clearInterval(mdTimer); mdTimer = null; }
  if (mode !== "mm" && typeof stopMmTimer === "function") stopMmTimer();
  if (mode !== "bt" && typeof stopBtTimer === "function") stopBtTimer();
}

buildMdTypeBar();

document.querySelectorAll(".learn-mode-switch .mode-btn").forEach(b => {
  b.addEventListener("click", () => setLearnMode(b.dataset.lmode));
});
document.getElementById("md-start-btn").addEventListener("click", startDrill);
document.getElementById("md-check").addEventListener("click", checkDrill);
document.getElementById("md-show-sol").addEventListener("click", showSolutionDrill);
document.getElementById("md-next").addEventListener("click", startDrill);
document.getElementById("md-back").addEventListener("click", backToDrillPicker);
document.getElementById("md-input").addEventListener("keydown", e => {
  if (e.key === "Enter" && !document.getElementById("md-check").disabled){
    e.preventDefault();
    checkDrill();
  }
});

/* =========================================================
   MENTAL MATH — rapid-fire arithmetic round (Learn mode 3)
   Generators for multiplication, division, percentages,
   fractions↔%, and scale/unit conversions. Auto-advancing
   round with per-question timing and end-of-round breakdown.
   ========================================================= */
const MM_CATS = [
  { id: "mix",   label: "Mixed" },
  { id: "mult",  label: "Multiplication" },
  { id: "div",   label: "Division" },
  { id: "pct",   label: "Percentages" },
  { id: "frac",  label: "Fractions ↔ %" },
  { id: "scale", label: "Scale / Units" },
];
const MM_LENGTHS = [10, 20, 30];

let mmCat = "mix";
let mmLen = 10;
let mmQueue = [];
let mmIdx = 0;
let mmOk = 0;
let mmStartTime = 0;
let mmQStartTime = 0;
let mmTimerRaf = null;
let mmTimes = [];
let mmBreakdown = {};
let mmLocked = false;
let mmSession = 0;

function mmRnd(lo, hi){ return Math.floor(Math.random() * (hi - lo + 1)) + lo; }
function mmPick(arr){ return arr[Math.floor(Math.random() * arr.length)]; }

function mmGenMult(){
  const mode = mmPick(["2x2", "3x1", "roundx2"]);
  let a, b;
  if (mode === "2x2"){
    a = mmRnd(12, 29); b = mmRnd(12, 29);
  } else if (mode === "3x1"){
    a = mmRnd(110, 899); b = mmRnd(3, 9);
  } else {
    a = mmPick([20, 25, 40, 50, 75, 80, 120, 150, 250]);
    b = mmRnd(12, 48);
  }
  return {
    prompt: `${a} × ${b}`, unit: "",
    answer: a * b, tolPct: 0, cat: "mult",
    explain: `${a} × ${b} = ${a * b}`
  };
}

function mmGenDiv(){
  const q = mmRnd(11, 89);
  const k = mmPick([4, 5, 6, 7, 8, 9, 11, 12, 15, 16, 20, 25]);
  const N = k * q;
  return {
    prompt: `${N} ÷ ${k}`, unit: "",
    answer: q, tolPct: 0, cat: "div",
    explain: `${N} ÷ ${k} = ${q}`
  };
}

function mmGenPct(){
  const kind = mmPick(["ofY", "whatPct", "growth"]);
  if (kind === "ofY"){
    const pct = mmPick([5, 10, 15, 20, 25, 30, 40, 50, 60, 75]);
    const y = mmPick([200, 400, 500, 800, 1000, 1200, 2000, 2400, 5000]);
    const ans = (pct * y) / 100;
    return {
      prompt: `${pct}% of ${y}`, unit: "",
      answer: ans, tolPct: 0, cat: "pct",
      explain: `${pct}% × ${y} = ${ans}`
    };
  }
  if (kind === "whatPct"){
    const denom = mmPick([100, 200, 400, 500, 800, 1000]);
    const factor = mmPick([0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.40, 0.50, 0.60, 0.75]);
    const num = Math.round(denom * factor);
    const ans = +((100 * num / denom).toFixed(2));
    return {
      prompt: `${num} is what % of ${denom}?`, unit: "%",
      answer: ans, tolPct: 0.5, cat: "pct",
      explain: `${num} / ${denom} = ${ans}%`
    };
  }
  const pct = mmPick([10, 15, 20, 25, 30, 40, 50]);
  const y = mmPick([40, 80, 120, 200, 400, 800]);
  const dir = mmPick(["up", "down"]);
  const ans = dir === "up" ? y * (1 + pct/100) : y * (1 - pct/100);
  const factor = dir === "up" ? (1 + pct/100) : (1 - pct/100);
  return {
    prompt: dir === "up"
      ? `${y} grows ${pct}%. New value?`
      : `${y} falls ${pct}%. New value?`,
    unit: "",
    answer: ans, tolPct: 0, cat: "pct",
    explain: `${y} × ${factor} = ${ans}`
  };
}

function mmGenFrac(){
  const pairs = [
    { f: "1/2",  p: 50 },
    { f: "1/3",  p: 33.33 },
    { f: "2/3",  p: 66.67 },
    { f: "1/4",  p: 25 },
    { f: "3/4",  p: 75 },
    { f: "1/5",  p: 20 },
    { f: "2/5",  p: 40 },
    { f: "3/5",  p: 60 },
    { f: "4/5",  p: 80 },
    { f: "1/6",  p: 16.67 },
    { f: "5/6",  p: 83.33 },
    { f: "1/8",  p: 12.5 },
    { f: "3/8",  p: 37.5 },
    { f: "5/8",  p: 62.5 },
    { f: "7/8",  p: 87.5 },
    { f: "1/10", p: 10 },
    { f: "1/12", p: 8.33 },
    { f: "1/16", p: 6.25 },
  ];
  const pr = mmPick(pairs);
  const kind = mmPick(["fracToPct", "pctToDec"]);
  if (kind === "fracToPct"){
    return {
      prompt: `${pr.f} as a %?`, unit: "%",
      answer: pr.p, tolPct: 0.5, cat: "frac",
      explain: `${pr.f} = ${pr.p}%`
    };
  }
  const dec = +(pr.p / 100).toFixed(4);
  return {
    prompt: `${pr.p}% as a decimal?`, unit: "",
    answer: dec, tolPct: 1, cat: "frac",
    explain: `${pr.p}% = ${pr.f} = ${dec}`
  };
}

function mmGenScale(){
  const kind = mmPick(["BtoM", "MtoK", "unitsPrice", "rule72"]);
  if (kind === "BtoM"){
    const v = mmRnd(10, 48) / 10;
    return {
      prompt: `$${v}B = how many $M?`, unit: "$M",
      answer: Math.round(v * 1000), tolPct: 0, cat: "scale",
      explain: `$${v}B × 1,000 = $${Math.round(v * 1000)}M`
    };
  }
  if (kind === "MtoK"){
    const v = mmRnd(12, 98) * 10;
    return {
      prompt: `$${v}M = how many $K?`, unit: "$K",
      answer: v * 1000, tolPct: 0, cat: "scale",
      explain: `$${v}M × 1,000 = $${(v * 1000).toLocaleString()}K`
    };
  }
  if (kind === "unitsPrice"){
    const units = mmRnd(100, 950) * 1000;
    const price = mmPick([5, 8, 10, 12, 15, 20, 25, 40, 50]);
    const ansM = +(units * price / 1e6).toFixed(2);
    return {
      prompt: `${(units / 1000).toFixed(0)}K units × $${price}/unit = ? ($M)`,
      unit: "$M",
      answer: ansM, tolPct: 1, cat: "scale",
      explain: `${units.toLocaleString()} × $${price} = $${(units * price).toLocaleString()} = $${ansM}M`
    };
  }
  const r = mmPick([4, 6, 8, 9, 12, 18, 24]);
  return {
    prompt: `Rule of 72: ${r}%/yr growth → doubling time?`,
    unit: "years",
    answer: 72 / r, tolPct: 1, cat: "scale",
    explain: `72 / ${r} = ${72 / r} years`
  };
}

function mmGenOne(cat){
  const real = cat === "mix"
    ? mmPick(["mult", "div", "pct", "frac", "scale"])
    : cat;
  if (real === "mult")  return mmGenMult();
  if (real === "div")   return mmGenDiv();
  if (real === "pct")   return mmGenPct();
  if (real === "frac")  return mmGenFrac();
  return mmGenScale();
}

function buildMmPickers(){
  const catBar = document.getElementById("mm-cat-bar");
  const lenBar = document.getElementById("mm-len-bar");
  if (!catBar || !lenBar) return;
  catBar.innerHTML = "";
  MM_CATS.forEach(c => {
    const lbl = document.createElement("label");
    lbl.className = "deck-chip";
    const inp = document.createElement("input");
    inp.type = "radio"; inp.name = "mmcat"; inp.value = c.id;
    if (c.id === mmCat) inp.checked = true;
    inp.addEventListener("change", () => { mmCat = c.id; });
    lbl.appendChild(inp);
    lbl.appendChild(document.createTextNode(c.label));
    catBar.appendChild(lbl);
  });
  lenBar.innerHTML = "";
  MM_LENGTHS.forEach(n => {
    const lbl = document.createElement("label");
    lbl.className = "deck-chip";
    const inp = document.createElement("input");
    inp.type = "radio"; inp.name = "mmlen"; inp.value = String(n);
    if (n === mmLen) inp.checked = true;
    inp.addEventListener("change", () => { mmLen = n; });
    lbl.appendChild(inp);
    lbl.appendChild(document.createTextNode(`${n} questions`));
    lenBar.appendChild(lbl);
  });
}

function startMm(){
  mmSession += 1;
  mmQueue = Array.from({ length: mmLen }, () => mmGenOne(mmCat));
  mmIdx = 0;
  mmOk = 0;
  mmTimes = [];
  mmBreakdown = {};
  mmLocked = false;
  mmStartTime = performance.now();

  document.getElementById("mm-picker").style.display = "none";
  document.getElementById("mm-done").style.display = "none";
  document.getElementById("mm-session").style.display = "block";

  document.getElementById("mm-score-ok").textContent = "0";
  document.getElementById("mm-score-total").textContent = String(mmLen);

  startMmTimer();
  serveMm();
}

function startMmTimer(){
  cancelAnimationFrame(mmTimerRaf);
  const el = document.getElementById("mm-timer");
  if (!el) return;
  const tick = () => {
    const t = (performance.now() - mmStartTime) / 1000;
    el.textContent = `${t.toFixed(1)}s`;
    mmTimerRaf = requestAnimationFrame(tick);
  };
  tick();
}

function stopMmTimer(){
  if (mmTimerRaf){ cancelAnimationFrame(mmTimerRaf); mmTimerRaf = null; }
}

function serveMm(){
  const q = mmQueue[mmIdx];
  mmLocked = false;
  mmQStartTime = performance.now();

  const catLabel = MM_CATS.find(c => c.id === q.cat)?.label || q.cat;
  document.getElementById("mm-cat-badge").textContent = catLabel.toLowerCase();
  document.getElementById("mm-prompt").textContent = q.prompt;
  document.getElementById("mm-unit").textContent = q.unit;
  document.getElementById("mm-score-q").textContent = `Q ${mmIdx + 1} / ${mmLen}`;

  const input = document.getElementById("mm-input");
  input.value = "";
  input.disabled = false;

  const fb = document.getElementById("mm-feedback");
  fb.textContent = "";
  fb.className = "md-feedback mm-feedback";

  setTimeout(() => input.focus(), 30);
}

function mmRecord(cat, ok, ms){
  if (!mmBreakdown[cat]) mmBreakdown[cat] = { ok: 0, total: 0, ms: [] };
  mmBreakdown[cat].total += 1;
  mmBreakdown[cat].ms.push(ms);
  if (ok) mmBreakdown[cat].ok += 1;
}

function submitMm(){
  if (mmLocked) return;
  const q = mmQueue[mmIdx];
  const raw = document.getElementById("mm-input").value.trim();
  const val = parseFloat(raw);
  const fb = document.getElementById("mm-feedback");

  if (raw === "" || Number.isNaN(val)){
    fb.textContent = "type a number first — or hit skip.";
    fb.className = "md-feedback mm-feedback warn";
    return;
  }

  const ms = performance.now() - mmQStartTime;
  mmTimes.push(ms);

  const tol = Math.max(
    q.tolPct ? Math.abs(q.answer) * q.tolPct / 100 : 0,
    0.005
  );
  const ok = Math.abs(val - q.answer) <= tol;

  mmRecord(q.cat, ok, ms);
  mmLocked = true;

  if (ok){
    mmOk += 1;
    fb.textContent = `✓ ${q.explain}`;
    fb.className = "md-feedback mm-feedback ok";
  } else {
    fb.textContent = `✗ was ${q.explain}`;
    fb.className = "md-feedback mm-feedback bad";
  }
  document.getElementById("mm-score-ok").textContent = String(mmOk);
  document.getElementById("mm-input").disabled = true;

  const my = mmSession;
  setTimeout(() => {
    if (my !== mmSession) return;
    advanceMm();
  }, ok ? 600 : 1500);
}

function skipMm(){
  if (mmLocked) return;
  const q = mmQueue[mmIdx];
  const ms = performance.now() - mmQStartTime;
  mmTimes.push(ms);
  mmRecord(q.cat, false, ms);

  const fb = document.getElementById("mm-feedback");
  fb.textContent = `↷ skipped — was ${q.explain}`;
  fb.className = "md-feedback mm-feedback warn";
  mmLocked = true;
  document.getElementById("mm-input").disabled = true;

  const my = mmSession;
  setTimeout(() => {
    if (my !== mmSession) return;
    advanceMm();
  }, 900);
}

function advanceMm(){
  mmIdx += 1;
  if (mmIdx >= mmQueue.length){ finishMm(); return; }
  serveMm();
}

function mmFmtMs(ms){
  const s = ms / 1000;
  return s < 10 ? s.toFixed(1) + "s" : Math.round(s) + "s";
}

function finishMm(){
  stopMmTimer();
  const total = mmTimes.length;
  const elapsed = (performance.now() - mmStartTime) / 1000;
  const avg = total ? mmTimes.reduce((a, b) => a + b, 0) / total : 0;
  const acc = total ? Math.round(100 * mmOk / total) : 0;

  document.getElementById("mm-session").style.display = "none";
  document.getElementById("mm-done").style.display = "block";

  const stats = document.getElementById("mm-done-stats");
  stats.innerHTML = total
    ? `<strong>${mmOk}/${total}</strong> correct · ${acc}% accuracy · avg ${mmFmtMs(avg)}/q · ${elapsed.toFixed(1)}s total`
    : "round ended with no questions answered.";

  const bd = document.getElementById("mm-breakdown");
  bd.innerHTML = "";
  const rows = Object.entries(mmBreakdown);
  if (rows.length <= 1){
    bd.style.display = "none";
  } else {
    bd.style.display = "";
    const head = document.createElement("div");
    head.className = "mm-bd-head";
    head.textContent = "by category";
    bd.appendChild(head);
    rows.forEach(([cat, r]) => {
      const label = MM_CATS.find(c => c.id === cat)?.label || cat;
      const rowAcc = Math.round(100 * r.ok / r.total);
      const rowAvg = r.ms.reduce((a, b) => a + b, 0) / r.ms.length;
      const row = document.createElement("div");
      row.className = "mm-bd-row";
      row.innerHTML =
        `<span class="mm-bd-cat">${label}</span>` +
        `<span class="mm-bd-val">${r.ok}/${r.total} · ${rowAcc}%</span>` +
        `<span class="mm-bd-val">${mmFmtMs(rowAvg)}/q</span>`;
      bd.appendChild(row);
    });
  }
}

function backToMmPicker(){
  mmSession += 1;
  stopMmTimer();
  document.getElementById("mm-session").style.display = "none";
  document.getElementById("mm-done").style.display = "none";
  document.getElementById("mm-picker").style.display = "block";
}

buildMmPickers();
document.getElementById("mm-start-btn")?.addEventListener("click", startMm);
document.getElementById("mm-submit")?.addEventListener("click", submitMm);
document.getElementById("mm-skip")?.addEventListener("click", skipMm);
document.getElementById("mm-end")?.addEventListener("click", () => {
  mmSession += 1;
  stopMmTimer();
  finishMm();
});
document.getElementById("mm-again")?.addEventListener("click", startMm);
document.getElementById("mm-back")?.addEventListener("click", backToMmPicker);
document.getElementById("mm-input")?.addEventListener("keydown", e => {
  if (e.key === "Enter"){
    e.preventDefault();
    if (!mmLocked) submitMm();
  }
});

/* =========================================================
   BRAIN TEASERS — market-sizing & Fermi estimation (Learn mode 4)
   Uses the BRAIN_TEASERS array from content.js. Numeric answer with
   generous tolerance (per-question); reveal shows a step-by-step
   walkthrough. The user can self-rate their attempt so "approach right,
   number off" still counts when the interviewer would credit the
   structure. Round stats + per-category breakdown on completion.
   ========================================================= */
const BT_BANK = (typeof BRAIN_TEASERS !== "undefined" && Array.isArray(BRAIN_TEASERS)) ? BRAIN_TEASERS : [];
const BT_CAT_LABELS = {
  mix:    "Mixed",
  market: "Market Sizing",
  fermi:  "Fermi / Guesstimate",
};
const BT_LENGTHS = [3, 5, 8];

function btCatChipsAvailable(){
  const cats = Array.from(new Set(BT_BANK.map(b => b.cat))).filter(Boolean);
  const out = [{ id: "mix", label: BT_CAT_LABELS.mix }];
  cats.forEach(c => {
    if (BT_CAT_LABELS[c]) out.push({ id: c, label: BT_CAT_LABELS[c] });
    else out.push({ id: c, label: c });
  });
  return out;
}

let btCat = "mix";
let btLen = 5;
let btQueue = [];
let btIdx = 0;
let btOk = 0;
let btStartTime = 0;
let btQStartTime = 0;
let btTimerRaf = null;
let btTimes = [];
let btBreakdown = {};
let btLocked = false;
let btSession = 0;

function btShuffle(arr){
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function btPool(cat){
  return cat === "mix" ? BT_BANK.slice() : BT_BANK.filter(b => b.cat === cat);
}

function buildBtPickers(){
  const catBar = document.getElementById("bt-cat-bar");
  const lenBar = document.getElementById("bt-len-bar");
  if (!catBar || !lenBar) return;
  catBar.innerHTML = "";
  btCatChipsAvailable().forEach(c => {
    const lbl = document.createElement("label");
    lbl.className = "deck-chip";
    const inp = document.createElement("input");
    inp.type = "radio"; inp.name = "btcat"; inp.value = c.id;
    if (c.id === btCat) inp.checked = true;
    inp.addEventListener("change", () => { btCat = c.id; });
    lbl.appendChild(inp);
    lbl.appendChild(document.createTextNode(c.label));
    catBar.appendChild(lbl);
  });
  lenBar.innerHTML = "";
  BT_LENGTHS.forEach(n => {
    const lbl = document.createElement("label");
    lbl.className = "deck-chip";
    const inp = document.createElement("input");
    inp.type = "radio"; inp.name = "btlen"; inp.value = String(n);
    if (n === btLen) inp.checked = true;
    inp.addEventListener("change", () => { btLen = n; });
    lbl.appendChild(inp);
    lbl.appendChild(document.createTextNode(`${n} teasers`));
    lenBar.appendChild(lbl);
  });
}

function startBt(){
  const pool = btPool(btCat);
  if (!pool.length){
    alert("No brain teasers available for that category yet.");
    return;
  }
  btSession += 1;
  const draw = btShuffle(pool);
  btQueue = [];
  // pad queue to requested length (repeat with shuffle if pool < len)
  while (btQueue.length < btLen){
    btQueue = btQueue.concat(draw.length ? btShuffle(pool) : []);
    if (!draw.length) break;
  }
  btQueue = btQueue.slice(0, btLen);

  btIdx = 0;
  btOk = 0;
  btTimes = [];
  btBreakdown = {};
  btLocked = false;
  btStartTime = performance.now();

  document.getElementById("bt-picker").style.display = "none";
  document.getElementById("bt-done").style.display = "none";
  document.getElementById("bt-session").style.display = "block";

  document.getElementById("bt-score-ok").textContent = "0";
  document.getElementById("bt-score-total").textContent = String(btLen);

  startBtTimer();
  serveBt();
}

function startBtTimer(){
  cancelAnimationFrame(btTimerRaf);
  const el = document.getElementById("bt-timer");
  if (!el) return;
  const tick = () => {
    const t = (performance.now() - btStartTime) / 1000;
    el.textContent = t < 60 ? `${t.toFixed(1)}s` : `${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,"0")}`;
    btTimerRaf = requestAnimationFrame(tick);
  };
  tick();
}

function stopBtTimer(){
  if (btTimerRaf){ cancelAnimationFrame(btTimerRaf); btTimerRaf = null; }
}

function serveBt(){
  const q = btQueue[btIdx];
  btLocked = false;
  btQStartTime = performance.now();

  const catLabel = BT_CAT_LABELS[q.cat] || q.cat;
  document.getElementById("bt-cat-badge").textContent = catLabel.toLowerCase();
  document.getElementById("bt-prompt").textContent = q.prompt;
  document.getElementById("bt-unit").textContent = q.unit || "";
  document.getElementById("bt-score-q").textContent = `Q ${btIdx + 1} / ${btLen}`;

  const input = document.getElementById("bt-input");
  input.value = "";
  input.disabled = false;

  const fb = document.getElementById("bt-feedback");
  fb.textContent = "";
  fb.className = "md-feedback mm-feedback";

  document.getElementById("bt-walk").style.display = "none";
  document.getElementById("bt-next").style.display = "none";

  setTimeout(() => input.focus(), 30);
}

function btRecord(cat, ok, ms){
  if (!btBreakdown[cat]) btBreakdown[cat] = { ok: 0, total: 0, ms: [] };
  btBreakdown[cat].total += 1;
  btBreakdown[cat].ms.push(ms);
  if (ok) btBreakdown[cat].ok += 1;
}

function revealBtWalkthrough(q){
  const walk = document.getElementById("bt-walk");
  const steps = document.getElementById("bt-walk-steps");
  const anchor = document.getElementById("bt-anchor");
  steps.innerHTML = "";
  (q.walkthrough || []).forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    steps.appendChild(li);
  });
  anchor.textContent = q.anchor ? `Reality check: ${q.anchor}` : "";
  walk.style.display = "block";
  document.getElementById("bt-next").style.display = "inline-block";
}

function submitBt(){
  if (btLocked) return;
  const q = btQueue[btIdx];
  const raw = document.getElementById("bt-input").value.trim();
  const val = parseFloat(raw);
  const fb = document.getElementById("bt-feedback");

  if (raw === "" || Number.isNaN(val)){
    fb.textContent = "type an estimate first — or hit show walkthrough.";
    fb.className = "md-feedback mm-feedback warn";
    return;
  }

  const ms = performance.now() - btQStartTime;
  btTimes.push(ms);

  const tolPct = q.tolPct || 30;
  const tol = Math.max(Math.abs(q.answer) * tolPct / 100, 0.01);
  const ok = Math.abs(val - q.answer) <= tol;

  btRecord(q.cat, ok, ms);
  btLocked = true;

  if (ok){
    btOk += 1;
    fb.textContent = `✓ within ±${tolPct}% of ${q.answer}${q.unit ? " " + q.unit : ""}.`;
    fb.className = "md-feedback mm-feedback ok";
  } else {
    const diffPct = Math.round(100 * (val - q.answer) / q.answer);
    fb.textContent = `✗ answer ~${q.answer}${q.unit ? " " + q.unit : ""} · you were ${diffPct > 0 ? "+" : ""}${diffPct}%.`;
    fb.className = "md-feedback mm-feedback bad";
  }
  document.getElementById("bt-score-ok").textContent = String(btOk);
  document.getElementById("bt-input").disabled = true;

  revealBtWalkthrough(q);
}

function revealBt(){
  if (btLocked) {
    revealBtWalkthrough(btQueue[btIdx]);
    return;
  }
  const q = btQueue[btIdx];
  const ms = performance.now() - btQStartTime;
  btTimes.push(ms);
  btRecord(q.cat, false, ms);
  btLocked = true;

  const fb = document.getElementById("bt-feedback");
  fb.textContent = `answer: ~${q.answer}${q.unit ? " " + q.unit : ""}.`;
  fb.className = "md-feedback mm-feedback warn";
  document.getElementById("bt-input").disabled = true;

  revealBtWalkthrough(q);
}

function btSelfRate(level){
  // "approach" credits the attempt even if the number was off — bump score
  // without counting it as a wrong answer in the breakdown.
  if (level === "got" || level === "approach"){
    const q = btQueue[btIdx];
    if (btBreakdown[q.cat] && !btBreakdown[q.cat]._bumped){
      // only bump once per question, and only if we originally marked it wrong
      const wasWrong = Math.abs(parseFloat(document.getElementById("bt-input").value || "NaN") - q.answer) > Math.max(Math.abs(q.answer) * (q.tolPct || 30) / 100, 0.01);
      if (wasWrong){
        btOk += 1;
        btBreakdown[q.cat].ok += 1;
        btBreakdown[q.cat]._bumped = true;
        document.getElementById("bt-score-ok").textContent = String(btOk);
      }
    }
  }
  // always advance after self-rate for faster flow
  advanceBt();
}

function advanceBt(){
  btIdx += 1;
  if (btIdx >= btQueue.length){ finishBt(); return; }
  serveBt();
}

function btFmtMs(ms){
  const s = ms / 1000;
  if (s < 10) return s.toFixed(1) + "s";
  if (s < 90) return Math.round(s) + "s";
  return `${Math.floor(s/60)}:${String(Math.round(s%60)).padStart(2,"0")}`;
}

function finishBt(){
  stopBtTimer();
  const total = btTimes.length;
  const elapsed = (performance.now() - btStartTime) / 1000;
  const avg = total ? btTimes.reduce((a, b) => a + b, 0) / total : 0;
  const acc = total ? Math.round(100 * btOk / total) : 0;

  document.getElementById("bt-session").style.display = "none";
  document.getElementById("bt-done").style.display = "block";

  const stats = document.getElementById("bt-done-stats");
  stats.innerHTML = total
    ? `<strong>${btOk}/${total}</strong> within tolerance · ${acc}% accuracy · avg ${btFmtMs(avg)}/teaser · ${btFmtMs(elapsed * 1000)} total`
    : "round ended with no teasers answered.";

  const bd = document.getElementById("bt-breakdown");
  bd.innerHTML = "";
  const rows = Object.entries(btBreakdown);
  if (rows.length <= 1){
    bd.style.display = "none";
  } else {
    bd.style.display = "";
    const head = document.createElement("div");
    head.className = "mm-bd-head";
    head.textContent = "by category";
    bd.appendChild(head);
    rows.forEach(([cat, r]) => {
      const label = BT_CAT_LABELS[cat] || cat;
      const rowAcc = Math.round(100 * r.ok / r.total);
      const rowAvg = r.ms.reduce((a, b) => a + b, 0) / r.ms.length;
      const row = document.createElement("div");
      row.className = "mm-bd-row";
      row.innerHTML =
        `<span class="mm-bd-cat">${label}</span>` +
        `<span class="mm-bd-val">${r.ok}/${r.total} · ${rowAcc}%</span>` +
        `<span class="mm-bd-val">${btFmtMs(rowAvg)}/q</span>`;
      bd.appendChild(row);
    });
  }
}

function backToBtPicker(){
  btSession += 1;
  stopBtTimer();
  document.getElementById("bt-session").style.display = "none";
  document.getElementById("bt-done").style.display = "none";
  document.getElementById("bt-picker").style.display = "block";
}

buildBtPickers();
document.getElementById("bt-start-btn")?.addEventListener("click", startBt);
document.getElementById("bt-submit")?.addEventListener("click", submitBt);
document.getElementById("bt-reveal")?.addEventListener("click", revealBt);
document.getElementById("bt-end")?.addEventListener("click", () => {
  btSession += 1;
  stopBtTimer();
  finishBt();
});
document.getElementById("bt-next")?.addEventListener("click", advanceBt);
document.getElementById("bt-again")?.addEventListener("click", startBt);
document.getElementById("bt-back")?.addEventListener("click", backToBtPicker);
document.getElementById("bt-input")?.addEventListener("keydown", e => {
  if (e.key === "Enter"){
    e.preventDefault();
    if (!btLocked) submitBt();
    else advanceBt();
  }
});
document.querySelectorAll('[data-btrate]').forEach(btn => {
  btn.addEventListener("click", () => btSelfRate(btn.dataset.btrate));
});

/* =========================================================
   MATCH — 6 pairs timed
   ========================================================= */
const MATCH_PAIRS = 6;
let matchState = null;
let matchTimer = null;

function shuffled(arr){
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startMatch(){
  clearInterval(matchTimer);
  const picks = shuffled(CARDS).slice(0, MATCH_PAIRS);
  const tiles = [];
  picks.forEach((c, i) => {
    tiles.push({ id: "t" + i, pair: i, kind: "term", text: c.term });
    tiles.push({ id: "d" + i, pair: i, kind: "def",  text: c.def });
  });
  matchState = {
    tiles: shuffled(tiles),
    selected: null,
    solved: 0,
    start: performance.now(),
    elapsed: 0,
    finished: false,
  };
  document.getElementById("match-pairs").textContent = `0 / ${MATCH_PAIRS}`;
  document.getElementById("match-win").classList.remove("show");
  renderMatch();
  matchTimer = setInterval(() => {
    if (matchState.finished) return;
    const t = (performance.now() - matchState.start) / 1000;
    document.getElementById("match-time").textContent = t.toFixed(1) + "s";
  }, 100);
}

function renderMatch(){
  const grid = document.getElementById("match-grid");
  grid.innerHTML = "";
  matchState.tiles.forEach(t => {
    const b = document.createElement("button");
    b.className = "match-tile" + (t.kind === "term" ? " is-term" : "");
    b.dataset.id = t.id;
    b.dataset.pair = t.pair;
    b.textContent = t.text;
    b.addEventListener("click", () => onMatchClick(b, t));
    grid.appendChild(b);
  });
}

function onMatchClick(btn, tile){
  if (btn.classList.contains("correct")) return;
  if (matchState.selected && matchState.selected.btn === btn){
    btn.classList.remove("selected");
    matchState.selected = null;
    return;
  }
  if (!matchState.selected){
    btn.classList.add("selected");
    matchState.selected = { btn, tile };
    return;
  }
  const prev = matchState.selected;
  matchState.selected = null;
  if (prev.tile.pair === tile.pair && prev.tile.kind !== tile.kind){
    prev.btn.classList.remove("selected");
    prev.btn.classList.add("correct");
    btn.classList.add("correct");
    matchState.solved += 1;
    document.getElementById("match-pairs").textContent = `${matchState.solved} / ${MATCH_PAIRS}`;
    if (matchState.solved === MATCH_PAIRS) finishMatch();
  } else {
    prev.btn.classList.remove("selected");
    btn.classList.add("wrong");
    prev.btn.classList.add("wrong");
    setTimeout(() => {
      btn.classList.remove("wrong");
      prev.btn.classList.remove("wrong");
    }, 350);
  }
}

function finishMatch(){
  matchState.finished = true;
  clearInterval(matchTimer);
  const t = (performance.now() - matchState.start) / 1000;
  document.getElementById("match-time").textContent = t.toFixed(1) + "s";
  const win = document.getElementById("match-win");
  win.textContent = `✓ all 6 matched in ${t.toFixed(1)}s — click "new round" for a fresh draw`;
  win.classList.add("show");
}

document.getElementById("match-new").addEventListener("click", startMatch);
startMatch();

/* =========================================================
   VOCAB — flat grid, filter + search
   ========================================================= */
const vocabGrid   = document.getElementById("vocab-grid");
const vocabSearch = document.getElementById("vocab-search");
let vocabFilter = "all";

function renderVocab(){
  const q = (vocabSearch.value || "").trim().toLowerCase();
  const items = CARDS.filter(c => {
    if (vocabFilter !== "all" && c.cat !== vocabFilter) return false;
    if (!q) return true;
    return c.term.toLowerCase().includes(q)
        || c.def.toLowerCase().includes(q)
        || (c.hint || "").toLowerCase().includes(q);
  });
  if (!items.length){
    vocabGrid.innerHTML = `<div class="vocab-empty">${q ? `no terms match "${escapeHTML(q)}"` : "no terms in this filter"}</div>`;
    return;
  }
  vocabGrid.innerHTML = items.map(v => `
    <div class="vocab-card" data-ask-term="${escapeHTML(v.term)}">
      <div class="vocab-card-head">
        <div class="vocab-de">${escapeHTML(v.term)}</div>
        <button class="ask-ai-btn ask-ai-btn--small" data-ask-explain="${escapeHTML(v.term)}" title="ask AI to explain this term">ask AI ↗</button>
      </div>
      <div class="vocab-en">${escapeHTML(v.def)}</div>
      ${v.hint ? `<div class="vocab-note">${escapeHTML(v.hint)}</div>` : ""}
    </div>
  `).join("");
}

buildFilterChips("vocab-filter-bar", "vfilter", v => { vocabFilter = v; renderVocab(); });
vocabSearch.addEventListener("input", renderVocab);
renderVocab();

/* =========================================================
   FRAMEWORKS — accordion
   ========================================================= */
function renderFrameworks(){
  const list = document.getElementById("fw-list");
  list.innerHTML = "";
  FRAMEWORKS.forEach((f, i) => {
    const item = document.createElement("div");
    item.className = "fw-item";
    const head = document.createElement("button");
    head.className = "fw-head";
    head.type = "button";
    head.innerHTML = `
      <span class="fw-num">${String(i+1).padStart(2,"0")}</span>
      <span class="fw-name">${escapeHTML(f.name)}</span>
      <span class="fw-actions">
        <span class="ask-ai-btn ask-ai-btn--small" data-ask-framework="${escapeHTML(f.name)}" title="ask AI to walk through this framework" role="button" tabindex="0">ask AI ↗</span>
        <span class="fw-toggle">show buckets ▾</span>
      </span>
    `;
    const body = document.createElement("div");
    body.className = "fw-body";
    const ul = document.createElement("ul");
    ul.className = "fw-buckets";
    f.buckets.forEach(b => {
      const li = document.createElement("li");
      li.textContent = b;
      ul.appendChild(li);
    });
    body.appendChild(ul);
    if (f.note){
      const note = document.createElement("p");
      note.className = "fw-note";
      note.textContent = f.note;
      body.appendChild(note);
    }
    head.addEventListener("click", (e) => {
      if (e.target.closest(".ask-ai-btn")) return; // don't toggle on ask-AI click
      const open = body.classList.toggle("open");
      head.querySelector(".fw-toggle").textContent = open ? "hide buckets ▴" : "show buckets ▾";
    });
    item.appendChild(head);
    item.appendChild(body);
    list.appendChild(item);
  });
}
renderFrameworks();

/* =========================================================
   WORKED EXAMPLES — "learn by doing" walkthroughs
   Each example is a case-math post-mortem: framework pick, assumptions,
   steps with their reasoning, answer, sanity check, and traps.
   The accordion model keeps the Examples tab scannable.
   ========================================================= */
const WX_TYPES = ["All", ...Array.from(new Set((typeof WORKED_EXAMPLES !== "undefined" ? WORKED_EXAMPLES : []).map(w => w.type)))];
let wxTypeFilter = "All";

function buildWxFilterBar(){
  const bar = document.getElementById("wx-filter-bar");
  if (!bar || typeof WORKED_EXAMPLES === "undefined") return;
  bar.innerHTML = "";
  WX_TYPES.forEach(t => {
    const count = t === "All"
      ? WORKED_EXAMPLES.length
      : WORKED_EXAMPLES.filter(w => w.type === t).length;
    const lbl = document.createElement("label");
    lbl.className = "deck-chip";
    const inp = document.createElement("input");
    inp.type = "radio"; inp.name = "wxtype"; inp.value = t;
    if (t === wxTypeFilter) inp.checked = true;
    inp.addEventListener("change", () => {
      wxTypeFilter = t;
      renderWorkedExamples();
    });
    lbl.appendChild(inp);
    lbl.appendChild(document.createTextNode(`${t === "All" ? "All" : t.toLowerCase()} (${count})`));
    bar.appendChild(lbl);
  });
}

function renderWorkedExamples(){
  const list = document.getElementById("wx-list");
  if (!list || typeof WORKED_EXAMPLES === "undefined") return;
  list.innerHTML = "";
  const pool = wxTypeFilter === "All"
    ? WORKED_EXAMPLES
    : WORKED_EXAMPLES.filter(w => w.type === wxTypeFilter);

  pool.forEach((w, i) => {
    const item = document.createElement("article");
    item.className = "wx-card";

    const head = document.createElement("button");
    head.className = "wx-head";
    head.type = "button";
    head.innerHTML = `
      <span class="wx-num">${String(i+1).padStart(2,"0")}</span>
      <span class="wx-type">${escapeHTML(w.type)}</span>
      <span class="wx-title">${escapeHTML(w.title)}</span>
      <span class="wx-actions">
        <span class="ask-ai-btn ask-ai-btn--small" data-ask-example="${escapeHTML(w.id)}" title="ask AI to re-walk this example" role="button" tabindex="0">ask AI ↗</span>
        <span class="wx-toggle">open ▾</span>
      </span>
    `;

    const body = document.createElement("div");
    body.className = "wx-body";

    const sections = [];

    // Lede (the "here's what's being tested" intro)
    if (w.lede) sections.push(`<p class="wx-lede">${escapeHTML(w.lede)}</p>`);

    // Framework pick + why
    if (w.framework) {
      sections.push(`
        <section class="wx-section wx-framework">
          <h4 class="wx-h4">Framework picked</h4>
          <div class="wx-fw-row">
            <span class="wx-fw-pick">${escapeHTML(w.framework.picked)}</span>
          </div>
          <p class="wx-why"><span class="wx-why-tag">why</span> ${escapeHTML(w.framework.why)}</p>
        </section>
      `);
    }

    // Assumptions
    if (w.assumptions?.length) {
      const items = w.assumptions.map(a => `
        <li class="wx-assumption">
          <span class="wx-claim">${escapeHTML(a.claim)}</span>
          <span class="wx-why"><span class="wx-why-tag">why</span> ${escapeHTML(a.why)}</span>
        </li>
      `).join("");
      sections.push(`
        <section class="wx-section">
          <h4 class="wx-h4">Assumptions <span class="wx-hint">(call each one out loud)</span></h4>
          <ul class="wx-assumptions">${items}</ul>
        </section>
      `);
    }

    // Steps (the heart of it)
    if (w.steps?.length) {
      const items = w.steps.map((s, idx) => `
        <li class="wx-step">
          <div class="wx-step-n">${idx + 1}</div>
          <div class="wx-step-body">
            <div class="wx-step-label">${escapeHTML(s.label)}</div>
            <div class="wx-step-math">${escapeHTML(s.math)}</div>
            ${s.why ? `<div class="wx-why"><span class="wx-why-tag">why</span> ${escapeHTML(s.why)}</div>` : ""}
          </div>
        </li>
      `).join("");
      sections.push(`
        <section class="wx-section">
          <h4 class="wx-h4">Step-by-step artifact</h4>
          <ol class="wx-steps">${items}</ol>
        </section>
      `);
    }

    // Answer
    if (w.answer) {
      sections.push(`
        <div class="wx-answer">
          <span class="wx-ans-label">answer</span>
          <span class="wx-ans-text">${escapeHTML(w.answer)}</span>
        </div>
      `);
    }

    // Sanity check
    if (w.sanityCheck) {
      sections.push(`
        <section class="wx-section wx-sanity">
          <h4 class="wx-h4">Sanity check</h4>
          <p>${escapeHTML(w.sanityCheck)}</p>
        </section>
      `);
    }

    // Common traps
    if (w.traps?.length) {
      const items = w.traps.map(t => `<li>${escapeHTML(t)}</li>`).join("");
      sections.push(`
        <section class="wx-section wx-traps">
          <h4 class="wx-h4">Common traps</h4>
          <ul>${items}</ul>
        </section>
      `);
    }

    // Variations
    if (w.variations?.length) {
      const items = w.variations.map(v => `
        <li class="wx-variation">
          <span class="wx-var-q">${escapeHTML(v.q)}</span>
          <span class="wx-var-a">${escapeHTML(v.a)}</span>
        </li>
      `).join("");
      sections.push(`
        <section class="wx-section">
          <h4 class="wx-h4">Variations <span class="wx-hint">(same shape, different numbers)</span></h4>
          <ul class="wx-variations">${items}</ul>
        </section>
      `);
    }

    // Tags: vocab + formula + ask-AI
    const tagBits = [];
    if (w.vocabUsed?.length) {
      tagBits.push(`<span class="wx-tags-label">vocab</span>` +
        w.vocabUsed.map(v => `<span class="wx-tag">${escapeHTML(v)}</span>`).join(""));
    }
    if (w.formulasUsed?.length) {
      tagBits.push(`<span class="wx-tags-label">formulas</span>` +
        w.formulasUsed.map(v => `<span class="wx-tag wx-tag--f">${escapeHTML(v)}</span>`).join(""));
    }
    if (tagBits.length) {
      sections.push(`<div class="wx-tags">${tagBits.join(`<span class="wx-tags-sep">·</span>`)}</div>`);
    }

    body.innerHTML = sections.join("");

    head.addEventListener("click", (e) => {
      if (e.target.closest(".ask-ai-btn")) return;
      const open = body.classList.toggle("open");
      head.querySelector(".wx-toggle").textContent = open ? "close ▴" : "open ▾";
      head.classList.toggle("wx-head--open", open);
    });

    item.appendChild(head);
    item.appendChild(body);
    list.appendChild(item);
  });
}

buildWxFilterBar();
renderWorkedExamples();

/* =========================================================
   CASES — progressive reveal
   Expanding a case shows only the prompt (+ behavioral warm-up).
   Each subsequent section (clarifying / framework / math / brainstorm /
   recommendation) is gated behind a "think first, then reveal" button —
   mimics a real case-interview flow instead of dumping the answer key.
   ========================================================= */

// In-memory state keyed by case.id. Preserved across expand/collapse but
// reset on a full page reload.
const caseRevealState = new Map();

function buildCaseStages(c){
  const list2html = arr => "<ul>" + arr.map(x => `<li>${escapeHTML(x)}</li>`).join("") + "</ul>";
  const stages = [];
  if (c.behavioral){
    stages.push({
      id: "behavioral",
      label: "Behavioral warm-up",
      html: `<em>"${escapeHTML(c.behavioral)}"</em>`,
      prompt: null,
    });
  }
  stages.push({
    id: "prompt",
    label: "Prompt",
    html: escapeHTML(c.prompt || ""),
    prompt: null,
  });
  if (c.clarifying?.length){
    stages.push({
      id: "clarifying",
      label: "Clarifying info",
      html: list2html(c.clarifying),
      prompt: "What clarifying questions would you ask? Think of 2–3 (goal, constraints, success metric) before peeking.",
    });
  }
  if (c.framework?.length){
    stages.push({
      id: "framework",
      label: "Framework buckets",
      html: list2html(c.framework),
      prompt: "Lay out your framework — 3–4 top-level buckets, MECE. Say it out loud before revealing the book's answer.",
    });
  }
  if (c.exhibits?.length){
    stages.push({
      id: "exhibits",
      label: "Exhibits",
      html: c.exhibits.map(renderExhibitHTML).join(""),
      prompt: "Before peeking at the interviewer's data — what exhibit would you ask for? Sketch what shape of chart or table would clarify the problem.",
    });
  }
  if (c.math?.length){
    stages.push({
      id: "math",
      label: "Key math",
      html: list2html(c.math),
      prompt: "Set up the formula, work through the numbers. Only then reveal.",
    });
  }
  if (c.brainstorm){
    stages.push({
      id: "brainstorm",
      label: "Brainstorming",
      html: escapeHTML(c.brainstorm),
      prompt: "What creative angles would you explore here? Aim for 4–6 distinct ideas before peeking.",
    });
  }
  if (c.recommendation){
    stages.push({
      id: "recommend",
      label: "Recommendation",
      html: escapeHTML(c.recommendation),
      prompt: "State your recommendation in one sentence, then 2–3 supporting points and a risk. Then reveal how the book answered.",
    });
  }
  return stages;
}

/* =========================================================
   Exhibit renderer — tables, bar charts, simple line charts.
   No external libs; SVG + CSS only.
   ========================================================= */
function renderExhibitHTML(ex){
  const title = escapeHTML(ex.title || "Exhibit");
  const note = ex.note ? `<figcaption class="case-exhibit-note">${escapeHTML(ex.note)}</figcaption>` : "";

  if (ex.type === "table"){
    const thead = "<tr>" + (ex.columns || []).map(c => `<th>${escapeHTML(c)}</th>`).join("") + "</tr>";
    const tbody = (ex.rows || []).map(row =>
      "<tr>" + row.map(cell => `<td>${escapeHTML(cell)}</td>`).join("") + "</tr>"
    ).join("");
    return `
      <figure class="case-exhibit case-exhibit--table">
        <figcaption class="case-exhibit-title">${title}</figcaption>
        <table><thead>${thead}</thead><tbody>${tbody}</tbody></table>
        ${note}
      </figure>`;
  }

  if (ex.type === "bar"){
    const bars = ex.bars || [];
    const max = Math.max(1, ...bars.map(b => Number(b.value) || 0));
    const unit = ex.unit ? " " + escapeHTML(ex.unit) : "";
    const rows = bars.map(b => {
      const v = Number(b.value) || 0;
      const pct = Math.max(2, (v / max) * 100);
      return `
        <div class="case-bar-row">
          <div class="case-bar-label">${escapeHTML(b.label)}</div>
          <div class="case-bar-track"><div class="case-bar-fill" style="width:${pct.toFixed(1)}%"></div></div>
          <div class="case-bar-value">${escapeHTML(String(b.value))}${unit}</div>
        </div>`;
    }).join("");
    return `
      <figure class="case-exhibit case-exhibit--bar">
        <figcaption class="case-exhibit-title">${title}</figcaption>
        <div class="case-bars">${rows}</div>
        ${note}
      </figure>`;
  }

  if (ex.type === "line"){
    const pts = ex.points || [];
    if (!pts.length) return `<figure class="case-exhibit"><figcaption>${title}</figcaption><div class="case-exhibit-empty">no data</div></figure>`;
    const W = 560, H = 200, padL = 44, padR = 14, padT = 14, padB = 34;
    const vals = pts.map(p => Number(p.y) || 0);
    const maxY = Math.max(...vals);
    const minY = Math.min(...vals);
    const range = Math.max(1, maxY - minY);
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;
    const xAt = i => padL + (pts.length > 1 ? (i / (pts.length - 1)) * chartW : chartW / 2);
    const yAt = v => padT + chartH - ((v - minY) / range) * chartH;

    const gridLines = [0.25, 0.5, 0.75].map(t => {
      const y = padT + chartH - t * chartH;
      return `<line x1="${padL}" y1="${y}" x2="${padL + chartW}" y2="${y}" stroke="currentColor" stroke-opacity="0.1" stroke-dasharray="2 3"/>`;
    }).join("");

    const line = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${xAt(i).toFixed(1)} ${yAt(p.y).toFixed(1)}`).join(" ");
    const dots = pts.map((p, i) =>
      `<circle cx="${xAt(i).toFixed(1)}" cy="${yAt(p.y).toFixed(1)}" r="3" fill="currentColor"/>`
    ).join("");
    const xLabels = pts.map((p, i) =>
      `<text x="${xAt(i).toFixed(1)}" y="${H - 12}" text-anchor="middle" font-size="10" fill="currentColor">${escapeHTML(String(p.x))}</text>`
    ).join("");
    const yTop    = `<text x="${padL - 6}" y="${padT + 4}" text-anchor="end" font-size="10" fill="currentColor">${escapeHTML(String(maxY))}</text>`;
    const yBot    = `<text x="${padL - 6}" y="${padT + chartH + 2}" text-anchor="end" font-size="10" fill="currentColor">${escapeHTML(String(minY))}</text>`;

    const unit = ex.unit ? `<div class="case-line-unit">${escapeHTML(ex.unit)}</div>` : "";

    return `
      <figure class="case-exhibit case-exhibit--line">
        <figcaption class="case-exhibit-title">${title}</figcaption>
        <svg class="case-line-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">
          ${gridLines}
          ${yTop}${yBot}
          <path d="${line}" fill="none" stroke="currentColor" stroke-width="2"/>
          ${dots}
          ${xLabels}
        </svg>
        ${unit}
        ${note}
      </figure>`;
  }

  return `<figure class="case-exhibit"><figcaption>${title}</figcaption><div class="case-exhibit-empty">unsupported exhibit type: ${escapeHTML(ex.type || "?")}</div></figure>`;
}

function getInitialRevealed(stages){
  // Reveal everything up to and including the prompt stage.
  const promptIdx = stages.findIndex(s => s.id === "prompt");
  return stages.map((_, i) => i <= promptIdx);
}

function ensureCaseState(c){
  if (!caseRevealState.has(c.id)){
    const stages = buildCaseStages(c);
    caseRevealState.set(c.id, { stages, revealed: getInitialRevealed(stages) });
  }
  return caseRevealState.get(c.id);
}

function renderCaseBody(c, body, opts){
  const state = ensureCaseState(c);
  body.innerHTML = "";

  state.stages.forEach((s, i) => {
    if (!state.revealed[i]) return;
    const wrap = document.createElement("div");
    wrap.className = "case-section";
    wrap.innerHTML = `
      <h5 class="case-section-h">${escapeHTML(s.label)}</h5>
      <div class="case-section-body">${s.html}</div>
    `;
    body.appendChild(wrap);
  });

  const nextIdx = state.revealed.findIndex(r => !r);
  if (nextIdx >= 0){
    const nextStage = state.stages[nextIdx];
    const think = document.createElement("div");
    think.className = "case-think";
    think.innerHTML = `
      ${nextStage.prompt ? `<div class="case-think-prompt">${escapeHTML(nextStage.prompt)}</div>` : ""}
      <div class="case-think-actions">
        <button type="button" class="mini-btn mini-btn--ok" data-act="next">reveal: ${escapeHTML(nextStage.label.toLowerCase())} ↓</button>
        ${nextIdx < state.stages.length - 1 ? `<button type="button" class="mini-btn" data-act="all">reveal all remaining ↓</button>` : ""}
        <button type="button" class="mini-btn" data-act="ask-explain" data-term="${escapeHTML(nextStage.label)}">hint from tutor ↗</button>
      </div>
    `;
    body.appendChild(think);
    think.querySelector('[data-act="next"]').addEventListener("click", (e) => {
      e.stopPropagation();
      state.revealed[nextIdx] = true;
      renderCaseBody(c, body);
    });
    const allBtn = think.querySelector('[data-act="all"]');
    if (allBtn) allBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      state.revealed = state.revealed.map(() => true);
      renderCaseBody(c, body);
    });
    const hintBtn = think.querySelector('[data-act="ask-explain"]');
    if (hintBtn) hintBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!window.ChatLab?.askAI) return;
      window.ChatLab.askAI({
        mode: "chat",
        focus: `${c.title} – ${nextStage.label}`,
        prompt: `For ${sourceFullName(sourceOf(c))} case "${c.title}" (#${c.id}), give me a small nudge on the ${nextStage.label.toLowerCase()} block. Don't reveal the answer — just one guiding question or prompt that would help me think through it.`,
      });
    });
  } else {
    // All revealed — mark completed (unless we got here via bulk "reveal all cases",
    // which is exam-review mode, not actual completion) + offer to reset for another pass.
    if (!opts || !opts.bulk) markCompleted(c.id);
    const reset = document.createElement("button");
    reset.type = "button";
    reset.className = "mini-btn case-reset";
    reset.textContent = "↺ hide sections · start over";
    reset.addEventListener("click", (e) => {
      e.stopPropagation();
      state.revealed = getInitialRevealed(state.stages);
      renderCaseBody(c, body);
    });
    body.appendChild(reset);
  }
}

/* ---------- Case type normalization (for filter chips) ---------- */
function normalizeCaseType(t){
  if (!t) return "Other";
  const s = String(t).toLowerCase();
  if (s.includes("profit")) return "Profitability";
  if (s.includes("entry")) return "Market Entry";
  if (s === "m&a" || s.includes("acquisition") || s.includes("merger")) return "M&A";
  if (s.includes("growth") || s.includes("opportunity")) return "Growth";
  if (s.includes("pricing")) return "Pricing";
  if (s.includes("cost") || s.includes("operation") || s.includes("customer")) return "Ops / Cost";
  return "Other";
}
const CASE_TYPES = ["Profitability", "Market Entry", "M&A", "Growth", "Pricing", "Ops / Cost", "Other"];

/* ---------- Case progress: localStorage ---------- */
const CASE_PROGRESS_KEY = "darden.lab.v1.cases";
const CASE_PROGRESS_SCRUB_FLAG = "darden.lab.cases.scrub1";
function loadCaseProgress(){
  try {
    const raw = localStorage.getItem(CASE_PROGRESS_KEY);
    if (!raw) return { opened: [], completed: [], starred: [] };
    const p = JSON.parse(raw) || {};
    let completed = Array.isArray(p.completed) ? p.completed.map(Number) : [];
    // One-shot scrub: earlier versions auto-marked every case "completed" when the
    // user hit reveal-all-cases (exam review). Wipe those bogus completions once.
    if (!localStorage.getItem(CASE_PROGRESS_SCRUB_FLAG)){
      completed = [];
      try { localStorage.setItem(CASE_PROGRESS_SCRUB_FLAG, "1"); } catch {}
    }
    return {
      opened:    Array.isArray(p.opened)  ? p.opened.map(Number)  : [],
      completed,
      starred:   Array.isArray(p.starred) ? p.starred.map(Number) : [],
    };
  } catch { return { opened: [], completed: [], starred: [] }; }
}
function saveCaseProgress(){
  try { localStorage.setItem(CASE_PROGRESS_KEY, JSON.stringify(caseProgress)); } catch {}
}
let caseProgress = loadCaseProgress();
saveCaseProgress();
const inList = (arr, id) => arr.includes(Number(id));
function markOpened(id){
  id = Number(id);
  if (!inList(caseProgress.opened, id)){
    caseProgress.opened.push(id);
    saveCaseProgress();
    renderCaseProgressHeader();
  }
}
function markCompleted(id){
  id = Number(id);
  if (!inList(caseProgress.completed, id)){
    caseProgress.completed.push(id);
    saveCaseProgress();
    renderCaseProgressHeader();
    const item = document.querySelector(`.case-item[data-case-id="${id}"]`);
    if (item) item.classList.add("case-item--completed");
  }
}
function toggleStarred(id){
  id = Number(id);
  const i = caseProgress.starred.indexOf(id);
  if (i >= 0) caseProgress.starred.splice(i, 1);
  else caseProgress.starred.push(id);
  saveCaseProgress();
  renderCaseProgressHeader();
}

/* ---------- Case filters ---------- */
let caseFilter = { type: "all", source: "all", status: "all" };

function sourceOf(c){
  if (c.source === "practice") return "practice";
  if (c.source === "tuck") return "tuck";
  if (c.source === "mbb") return "mbb";
  return "darden";
}
function sourceLabel(src){
  if (src === "practice") return "practice pack";
  if (src === "tuck") return "tuck";
  if (src === "mbb") return "mbb";
  return "darden";
}
function sourceFullName(src){
  if (src === "practice") return "Practice Pack";
  if (src === "tuck") return "Tuck";
  if (src === "mbb") return "MBB Casebook";
  return "Darden";
}

function buildCaseItem(c){
  const src = sourceOf(c);
  const nType = normalizeCaseType(c.type);
  const starred   = inList(caseProgress.starred,   c.id);
  const completed = inList(caseProgress.completed, c.id);
  const opened    = inList(caseProgress.opened,    c.id);

  const item = document.createElement("div");
  item.className = "case-item case-item--" + src
    + (completed ? " case-item--completed" : "")
    + (opened    ? " case-item--opened"    : "");
  item.dataset.caseId    = String(c.id);
  item.dataset.caseType  = nType;
  item.dataset.caseSource = src;

  const head = document.createElement("button");
  head.className = "case-head";
  head.type = "button";
  head.innerHTML = `
    <span class="case-num">
      <span class="case-num-txt">${String(c.id).padStart(2,"0")}</span>
      <span class="case-num-check" title="completed">✓</span>
    </span>
    <span class="case-title">
      <span class="case-name">${escapeHTML(c.title)}</span>
      <span class="case-meta">${escapeHTML(c.industry || "")} · ${escapeHTML(nType)} · ${escapeHTML(c.difficulty || "")}</span>
    </span>
    <button class="case-star ${starred ? "case-star--on" : ""}" type="button" title="star this case" aria-label="star this case">${starred ? "★" : "☆"}</button>
    <span class="case-source-badge case-source-badge--${src}">${sourceLabel(src)}</span>
    <span class="ask-ai-btn" data-ask-mock="${escapeHTML(String(c.id))}" title="run this case as a mock interview" role="button" tabindex="0">mock this ↗</span>
    <span class="case-toggle">show ▾</span>
  `;

  const body = document.createElement("div");
  body.className = "case-body";

  head.addEventListener("click", (e) => {
    if (e.target.closest(".ask-ai-btn")) return;
    if (e.target.closest(".case-star")) return;
    const open = body.classList.toggle("open");
    head.querySelector(".case-toggle").textContent = open ? "hide ▴" : "show ▾";
    if (open){
      renderCaseBody(c, body);
      markOpened(c.id);
      item.classList.add("case-item--opened");
    }
  });

  const star = head.querySelector(".case-star");
  star.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleStarred(c.id);
    const on = inList(caseProgress.starred, c.id);
    star.classList.toggle("case-star--on", on);
    star.textContent = on ? "★" : "☆";
    if (caseFilter.status === "starred") applyCaseFilter();
  });

  item.appendChild(head);
  item.appendChild(body);
  return item;
}

function renderCaseProgressHeader(){
  const bar = document.getElementById("case-progress");
  if (!bar) return;
  const total = CASES.length;
  const done  = caseProgress.completed.filter(id => CASES.some(c => c.id === id)).length;
  const star  = caseProgress.starred.filter(id => CASES.some(c => c.id === id)).length;
  const open  = caseProgress.opened.filter(id => CASES.some(c => c.id === id)).length;
  const pct   = total ? Math.round(100 * done / total) : 0;
  bar.innerHTML = `
    <div class="cp-bar-track"><div class="cp-bar-fill" style="width:${pct}%"></div></div>
    <div class="cp-bar-stats">
      <strong>${done}</strong> <span>/ ${total} completed</span>
      <span class="cp-sep">·</span>
      <strong>${open}</strong> <span>opened</span>
      <span class="cp-sep">·</span>
      <strong>${star}</strong> <span>starred</span>
      ${done > 0 ? `<button class="cp-reset" id="cp-reset-btn" type="button" title="clear local progress">reset</button>` : ""}
    </div>
  `;
  const resetBtn = document.getElementById("cp-reset-btn");
  if (resetBtn){
    resetBtn.addEventListener("click", () => {
      if (!confirm("Clear all case progress (opened, completed, starred)?")) return;
      caseProgress = { opened: [], completed: [], starred: [] };
      saveCaseProgress();
      renderCases();
    });
  }
}

function applyCaseFilter(){
  const items = document.querySelectorAll(".case-list .case-item");
  items.forEach(item => {
    const t = item.dataset.caseType;
    const s = item.dataset.caseSource;
    const id = Number(item.dataset.caseId);
    const typeOk   = caseFilter.type === "all" || caseFilter.type === t;
    const sourceOk = caseFilter.source === "all" || caseFilter.source === s;
    let statusOk = true;
    if (caseFilter.status === "starred")   statusOk = inList(caseProgress.starred,   id);
    if (caseFilter.status === "completed") statusOk = inList(caseProgress.completed, id);
    if (caseFilter.status === "unopened")  statusOk = !inList(caseProgress.opened,   id);
    item.style.display = (typeOk && sourceOk && statusOk) ? "" : "none";
  });
  // Hide empty section banners
  document.querySelectorAll(".case-list .case-section-banner").forEach(banner => {
    let next = banner.nextElementSibling;
    let anyVisible = false;
    while (next && !next.classList.contains("case-section-banner")){
      if (next.classList.contains("case-item") && next.style.display !== "none"){
        anyVisible = true; break;
      }
      next = next.nextElementSibling;
    }
    banner.style.display = anyVisible ? "" : "none";
  });
  // Empty state
  const anyShown = Array.from(document.querySelectorAll(".case-list .case-item")).some(i => i.style.display !== "none");
  let empty = document.getElementById("case-empty");
  const list = document.getElementById("case-list");
  if (!anyShown){
    if (!empty){
      empty = document.createElement("div");
      empty.id = "case-empty";
      empty.className = "case-empty";
      empty.innerHTML = `No cases match this filter. <button class="mini-btn" id="case-empty-reset" type="button">clear filters</button>`;
      list.appendChild(empty);
      document.getElementById("case-empty-reset").addEventListener("click", () => {
        caseFilter = { type: "all", source: "all", status: "all" };
        document.querySelectorAll(".case-filter-chip").forEach(c => {
          c.classList.toggle("case-filter-chip--on", c.dataset.value === "all");
        });
        applyCaseFilter();
      });
    }
  } else if (empty){
    empty.remove();
  }
}

function buildFilterGroup(label, group, values, chipLabels){
  const wrap = document.createElement("div");
  wrap.className = "case-filter-group";
  wrap.innerHTML = `<span class="case-filter-label">${label}</span>`;
  ["all", ...values].forEach(v => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "case-filter-chip" + (caseFilter[group] === v ? " case-filter-chip--on" : "");
    chip.dataset.group = group;
    chip.dataset.value = v;
    chip.textContent = v === "all" ? "all" : (chipLabels?.[v] || v);
    chip.addEventListener("click", () => {
      caseFilter[group] = v;
      wrap.querySelectorAll(".case-filter-chip").forEach(c => {
        c.classList.toggle("case-filter-chip--on", c.dataset.value === v);
      });
      applyCaseFilter();
    });
    wrap.appendChild(chip);
  });
  return wrap;
}

function renderCases(){
  const list = document.getElementById("case-list");
  list.innerHTML = "";

  // toolbar: filters + reveal / hide all
  const toolbar = document.getElementById("case-toolbar");
  toolbar.innerHTML = "";

  // Progress header
  let progressEl = document.getElementById("case-progress");
  if (!progressEl){
    progressEl = document.createElement("div");
    progressEl.id = "case-progress";
    progressEl.className = "case-progress";
    toolbar.appendChild(progressEl);
  } else {
    toolbar.appendChild(progressEl);
  }

  // Filter rows
  const filterWrap = document.createElement("div");
  filterWrap.className = "case-filters";
  filterWrap.appendChild(buildFilterGroup("type", "type", CASE_TYPES));
  filterWrap.appendChild(buildFilterGroup("source", "source", ["darden", "tuck", "mbb", "practice"], {
    darden: "darden", tuck: "tuck", mbb: "mbb", practice: "practice pack"
  }));
  filterWrap.appendChild(buildFilterGroup("status", "status", ["starred", "completed", "unopened"]));
  toolbar.appendChild(filterWrap);

  // Bulk actions
  const actions = document.createElement("div");
  actions.className = "case-actions";
  const revealAll = document.createElement("button");
  revealAll.className = "mini-btn";
  revealAll.type = "button";
  revealAll.textContent = "reveal all cases (exam review)";
  const resetAll = document.createElement("button");
  resetAll.className = "mini-btn";
  resetAll.type = "button";
  resetAll.textContent = "hide all (practice mode)";
  const collapseAll = document.createElement("button");
  collapseAll.className = "mini-btn";
  collapseAll.type = "button";
  collapseAll.textContent = "collapse all";
  actions.appendChild(revealAll);
  actions.appendChild(resetAll);
  actions.appendChild(collapseAll);
  toolbar.appendChild(actions);

  renderCaseProgressHeader();

  // Split into Darden + Tuck + MBB + Practice Pack
  const darden   = CASES.filter(c => sourceOf(c) === "darden");
  const tuck     = CASES.filter(c => sourceOf(c) === "tuck");
  const mbb      = CASES.filter(c => sourceOf(c) === "mbb");
  const practice = CASES.filter(c => sourceOf(c) === "practice");

  const renderSection = (label, sublabel, items, sourceKey) => {
    if (!items.length) return;
    const header = document.createElement("div");
    header.className = "case-section-banner case-section-banner--" + sourceKey;
    header.innerHTML = `
      <div class="case-section-banner-main">${escapeHTML(label)}</div>
      <div class="case-section-banner-sub">${escapeHTML(sublabel)}</div>
    `;
    list.appendChild(header);
    items.forEach(c => list.appendChild(buildCaseItem(c)));
  };

  renderSection(
    "Darden 2024-25 Casebook",
    "UVA Darden School of Business · 15 cases",
    darden,
    "darden"
  );
  renderSection(
    "Tuck Consulting Club 2024",
    "Tuck School of Business at Dartmouth · 12 cases · exhibits included",
    tuck,
    "tuck"
  );
  renderSection(
    "MBB Casebook 2021",
    "Peter K. · 24 cases · McKinsey, BCG, Bain, L.E.K., Kearney · RRRN format",
    mbb,
    "mbb"
  );
  renderSection(
    "Practice Pack",
    "Original supplemental cases in the Darden style · 20 cases · exhibits included",
    practice,
    "practice"
  );

  revealAll.addEventListener("click", () => {
    document.querySelectorAll(".case-item").forEach(item => {
      if (item.style.display === "none") return;
      const id = item.dataset.caseId;
      const c = CASES.find(x => String(x.id) === id);
      if (!c) return;
      const state = ensureCaseState(c);
      state.revealed = state.revealed.map(() => true);
      const body = item.querySelector(".case-body");
      body.classList.add("open");
      item.querySelector(".case-toggle").textContent = "hide ▴";
      renderCaseBody(c, body, { bulk: true });
    });
  });
  resetAll.addEventListener("click", () => {
    document.querySelectorAll(".case-item").forEach(item => {
      const id = item.dataset.caseId;
      const c = CASES.find(x => String(x.id) === id);
      if (!c) return;
      const state = ensureCaseState(c);
      state.revealed = getInitialRevealed(state.stages);
      const body = item.querySelector(".case-body");
      if (body.classList.contains("open")) renderCaseBody(c, body, { bulk: true });
    });
  });
  collapseAll.addEventListener("click", () => {
    document.querySelectorAll(".case-body").forEach(b => b.classList.remove("open"));
    document.querySelectorAll(".case-head .case-toggle").forEach(t => t.textContent = "show ▾");
  });

  applyCaseFilter();
}

function escapeHTML(s){
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

renderCases();

/* =========================================================
   FORMULAS — reference list
   ========================================================= */
function renderFormulas(){
  const list = document.getElementById("formula-list");
  list.innerHTML = "";
  FORMULAS.forEach(f => {
    const item = document.createElement("div");
    item.className = "formula-item";
    item.innerHTML = `
      <div class="formula-head">
        <div class="formula-name">${escapeHTML(f.name)}</div>
        <button class="ask-ai-btn ask-ai-btn--small" data-ask-explain="${escapeHTML(f.name)}" title="ask AI to walk through this formula">ask AI ↗</button>
      </div>
      <pre class="formula-body">${escapeHTML(f.formula)}</pre>
      <div class="formula-note">${escapeHTML(f.note || "")}</div>
    `;
    list.appendChild(item);
  });
}
renderFormulas();

/* =========================================================
   Ask-AI delegation — any element with data-ask-explain / data-ask-framework /
   data-ask-mock routes through window.ChatLab.askAI. Single listener covers
   everything rendered above (vocab cards, frameworks, cases, formulas).
   ========================================================= */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-ask-explain], [data-ask-framework], [data-ask-mock], [data-ask-example]");
  if (!btn) return;
  if (!window.ChatLab?.askAI) return;
  e.preventDefault();
  e.stopPropagation();

  if (btn.hasAttribute("data-ask-explain")){
    const term = btn.getAttribute("data-ask-explain");
    window.ChatLab.askAI({
      mode: "chat",
      focus: term,
      prompt: `Explain "${term}" in depth — definition, intuition, one concrete example, and 1-2 common traps a student might fall into.`,
    });
  } else if (btn.hasAttribute("data-ask-framework")){
    const name = btn.getAttribute("data-ask-framework");
    window.ChatLab.askAI({
      mode: "chat",
      focus: name,
      prompt: `Walk me through the "${name}" framework — list the bucket set, when to reach for it vs alternatives, and one concrete case where it applies.`,
    });
  } else if (btn.hasAttribute("data-ask-mock")){
    const caseId = btn.getAttribute("data-ask-mock");
    window.ChatLab.askAI({ mode: "mock", caseId });
  } else if (btn.hasAttribute("data-ask-example")){
    const exId = btn.getAttribute("data-ask-example");
    const ex = (typeof WORKED_EXAMPLES !== "undefined" ? WORKED_EXAMPLES : []).find(w => w.id === exId);
    const title = ex?.title || exId;
    window.ChatLab.askAI({
      mode: "chat",
      focus: title,
      prompt: `Re-walk the worked example "${title}" from scratch in your own words. Use a DIFFERENT set of assumption numbers than the canned version so I can practice the logic without memorizing the arithmetic. Then ask me one follow-up variation to solve.`,
    });
  }
});

/* ---------- Resources: timeline track switcher ---------- */
document.querySelectorAll(".tl-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tl;
    document.querySelectorAll(".tl-tab").forEach(t => t.classList.toggle("tl-tab--active", t === tab));
    document.querySelectorAll(".tl-track").forEach(tr => tr.classList.toggle("tl-track--active", tr.id === target));
  });
});

/* ---------- Resources: cheat-sheet PDF download (uses browser print → Save as PDF) ---------- */
const cheatBtn = document.getElementById("cheat-download");
if (cheatBtn) {
  cheatBtn.addEventListener("click", () => {
    const prevTitle = document.title;
    document.title = "darden-lab-cheat-sheet";
    window.print();
    setTimeout(() => { document.title = prevTitle; }, 500);
  });
}

/* =========================================================
   JOBS — live consulting postings (via /api/jobs)
   The serverless endpoint handles the 12-hour refresh cadence
   and caching. The client just fetches once when the tab is
   opened, and on explicit reload.
   ========================================================= */
let jobsLoaded = false;
let jobsLoading = false;

function jobsEsc(s){
  return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function jobsFmtPosted(iso){
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const days = Math.max(0, Math.round((Date.now() - then) / 86400000));
  if (days === 0) return "today";
  if (days === 1) return "1 day ago";
  if (days < 7)   return `${days} days ago`;
  if (days < 14)  return "1 week ago";
  if (days < 30)  return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} mo ago`;
}

function jobsFmtAge(fetchedAt){
  if (!fetchedAt) return "";
  const ms = Date.now() - new Date(fetchedAt).getTime();
  const mins = Math.max(0, Math.round(ms / 60000));
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}

function renderJobs(payload){
  const list = document.getElementById("jobs-list");
  const meta = document.getElementById("jobs-meta");
  if (!list || !meta) return;
  const { jobs = [], fetched_at, stale, error, warning } = payload || {};

  if (error){
    list.innerHTML = `<div class="jobs-empty jobs-error">${jobsEsc(error)}</div>`;
    meta.textContent = "feed unavailable";
    return;
  }
  if (!jobs.length){
    list.innerHTML = `<div class="jobs-empty">no consulting postings in the last 7 days — check back later.</div>`;
    meta.textContent = fetched_at ? `refreshed ${jobsFmtAge(fetched_at)}` : "";
    return;
  }

  const bits = [`<strong>${jobs.length}</strong> postings`];
  if (stale) bits.push(`<span class="jobs-stale">· cached snapshot</span>`);
  if (warning) bits.push(`<span class="jobs-stale">· ${jobsEsc(warning)}</span>`);
  bits.push(`<span class="jobs-fetched">· refreshed ${jobsFmtAge(fetched_at)}</span>`);
  meta.innerHTML = bits.join(" ");

  list.innerHTML = jobs.map(j => {
    const where = [j.city, j.region, j.country].filter(Boolean).join(", ");
    const remote = j.remote
      ? `<span class="jobs-badge jobs-badge--remote">remote</span>`
      : "";
    const type = j.type
      ? `<span class="jobs-badge">${jobsEsc(j.type.toLowerCase())}</span>`
      : "";
    const posted = j.posted
      ? `<span class="job-posted">${jobsEsc(jobsFmtPosted(j.posted))}</span>`
      : "";
    const publisher = j.publisher
      ? `<div class="jobs-pub">via ${jobsEsc(j.publisher)}</div>`
      : "";
    return `
      <a class="job-card" href="${jobsEsc(j.url)}" target="_blank" rel="noopener">
        <div class="job-title">${jobsEsc(j.title)}</div>
        <div class="job-firm">${jobsEsc(j.firm || "—")}</div>
        <div class="job-meta">
          <span class="job-where">${jobsEsc(where || "location n/a")}</span>
          ${remote}${type}${posted}
        </div>
        ${publisher}
      </a>
    `;
  }).join("");
}

async function loadJobs(force){
  if (jobsLoading) return;
  if (jobsLoaded && !force) return;
  jobsLoading = true;
  const meta = document.getElementById("jobs-meta");
  const list = document.getElementById("jobs-list");
  if (meta) meta.textContent = force ? "refreshing…" : "fetching latest postings…";
  if (list && force) list.innerHTML = `<div class="jobs-empty">refreshing…</div>`;
  try {
    const r = await fetch("/api/jobs", { cache: "no-store" });
    const body = await r.json().catch(() => ({ error: "bad response" }));
    if (!r.ok && !body?.jobs?.length){
      renderJobs({ error: body?.error || `status ${r.status}` });
    } else {
      renderJobs(body);
      jobsLoaded = true;
    }
  } catch (e){
    renderJobs({ error: e.message || "network error" });
  } finally {
    jobsLoading = false;
  }
}

tabs.forEach(t => {
  if (t.dataset.target === "jobs"){
    t.addEventListener("click", () => loadJobs(false));
  }
});
window.addEventListener("hashchange", () => {
  if (location.hash === "#jobs") loadJobs(false);
});
if (location.hash === "#jobs") loadJobs(false);

document.getElementById("jobs-refresh")?.addEventListener("click", () => loadJobs(true));


/* =========================================================
   NEWS — M&A deals + industry + hiring trends (via /api/news)
   One cache entry per industry, 2h TTL on the server. The client
   keeps a small cache of rendered payloads so switching back to
   a filter is instant — force=true bypasses it on reload.
   ========================================================= */
let newsIndustry  = "all";
const newsCache   = new Map();   // industry -> rendered payload
const newsLoading = new Set();   // industry in-flight

function newsEsc(s){
  return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

// Google News RSS stuffs <a>…</a> and publisher markup into the description.
// Strip tags + decode common entities so we render a plain-text blurb (or
// nothing if the feed gave us nothing substantive beyond the headline).
// Defense-in-depth: cached feed payloads may already contain raw markup
// from when the server-side strip was buggy, so scrub aggressively here too.
function newsCleanSnippet(s){
  if (!s) return "";
  // Decode entities first so encoded tags (&lt;a&gt;) become real tags.
  const decoded = String(s)
    .replace(/&#(\d+);/g,        (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&amp;/g,  "&")
    .replace(/&lt;/g,   "<")
    .replace(/&gt;/g,   ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g,  "'")
    .replace(/&nbsp;/g, " ");
  // Strip well-formed tags, then cut at the first remaining `<` (which
  // means a truncated tag — happens when the source sliced mid-tag).
  const noTags = decoded.replace(/<[^>]*>/g, " ");
  const cut = noTags.includes("<") ? noTags.slice(0, noTags.indexOf("<")) : noTags;
  const text = cut.replace(/\s+/g, " ").trim();
  // If what's left looks like a bare URL blob (e.g. Google News rss link
  // fragment), treat it as no snippet.
  if (/^https?:\/\/\S+$/i.test(text)) return "";
  return text;
}

function newsFmtPosted(iso){
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const mins = Math.max(0, Math.round((Date.now() - then) / 60000));
  if (mins < 60)       return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24)        return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 7)        return `${days}d ago`;
  if (days < 30)       return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function newsFmtAge(fetchedAt){
  if (!fetchedAt) return "";
  const ms = Date.now() - new Date(fetchedAt).getTime();
  const mins = Math.max(0, Math.round(ms / 60000));
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}

function renderNews(payload){
  const list = document.getElementById("news-list");
  const meta = document.getElementById("news-meta");
  if (!list || !meta) return;
  const { items = [], fetched_at, stale, error, warning, label } = payload || {};

  if (error){
    list.innerHTML = `<div class="news-empty news-error">${newsEsc(error)}</div>`;
    meta.textContent = "feed unavailable";
    return;
  }
  if (!items.length){
    list.innerHTML = `<div class="news-empty">no headlines in this bucket yet — try another industry or reload in a few minutes.</div>`;
    meta.textContent = fetched_at ? `refreshed ${newsFmtAge(fetched_at)}` : "";
    return;
  }

  const bits = [`<strong>${items.length}</strong> headlines`];
  if (label)   bits.push(`· <em>${newsEsc(label)}</em>`);
  if (stale)   bits.push(`<span class="news-stale">· cached snapshot</span>`);
  if (warning) bits.push(`<span class="news-stale">· ${newsEsc(warning)}</span>`);
  bits.push(`<span class="news-fetched">· refreshed ${newsFmtAge(fetched_at)}</span>`);
  meta.innerHTML = bits.join(" ");

  list.innerHTML = items.map(n => {
    const src  = n.source
      ? `<span class="news-src">${newsEsc(n.source)}</span>`
      : "";
    const when = n.published
      ? `<span class="news-when">${newsEsc(newsFmtPosted(n.published))}</span>`
      : "";
    const snipText = newsCleanSnippet(n.snippet);
    // Google News usually leaves a snippet that's just the title again — skip
    // those so the card doesn't show redundant text.
    const snip = snipText && snipText !== (n.title || "").trim()
      ? `<div class="news-snip">${newsEsc(snipText)}</div>`
      : "";
    return `
      <a class="news-card" href="${newsEsc(n.link)}" target="_blank" rel="noopener">
        <div class="news-title">${newsEsc(n.title)}</div>
        ${snip}
        <div class="news-meta-row">${src}${when}</div>
      </a>
    `;
  }).join("");
}

function paintNewsFilter(){
  document.querySelectorAll("#news-filter .news-chip").forEach(c => {
    c.classList.toggle("is-active", c.dataset.industry === newsIndustry);
  });
}

async function loadNews(industry, force){
  const ind = industry || newsIndustry;
  if (!force && newsCache.has(ind)){
    renderNews(newsCache.get(ind));
    return;
  }
  if (newsLoading.has(ind)) return;
  newsLoading.add(ind);

  const meta = document.getElementById("news-meta");
  const list = document.getElementById("news-list");
  if (meta) meta.textContent = force ? "refreshing…" : "fetching latest headlines…";
  if (list) list.innerHTML = `<div class="news-empty">${force ? "refreshing…" : "fetching latest headlines…"}</div>`;

  try {
    const r = await fetch(`/api/news?industry=${encodeURIComponent(ind)}`, { cache: "no-store" });
    const body = await r.json().catch(() => ({ error: "bad response" }));
    if (!r.ok && !body?.items?.length){
      renderNews({ error: body?.error || `status ${r.status}` });
    } else {
      newsCache.set(ind, body);
      if (ind === newsIndustry) renderNews(body);
    }
  } catch (e){
    renderNews({ error: e.message || "network error" });
  } finally {
    newsLoading.delete(ind);
  }
}

document.querySelectorAll("#news-filter .news-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    newsIndustry = chip.dataset.industry || "all";
    paintNewsFilter();
    loadNews(newsIndustry, false);
  });
});

document.getElementById("news-refresh")?.addEventListener("click", () => {
  newsCache.delete(newsIndustry);
  loadNews(newsIndustry, true);
});

tabs.forEach(t => {
  if (t.dataset.target === "news"){
    t.addEventListener("click", () => loadNews(newsIndustry, false));
  }
});
window.addEventListener("hashchange", () => {
  if (location.hash === "#news") loadNews(newsIndustry, false);
});
if (location.hash === "#news") loadNews(newsIndustry, false);


// =====================================================================
// BEHAVIORALS — resume → parsed profile → STAR stories → answers
// =====================================================================

const BEH_KEYS = {
  resume:  "casen_beh_resume",
  profile: "casen_beh_profile",
  stories: "casen_beh_stories",
};

const BEH_QUESTIONS = [
  { id: "leadership",     q: "Tell me about a time you led a team." },
  { id: "failure",        q: "Tell me about a time you failed — and what you learned." },
  { id: "conflict",       q: "Tell me about a time you had a conflict with a teammate." },
  { id: "persuade",       q: "Tell me about a time you had to persuade someone." },
  { id: "ambiguity",      q: "Tell me about a time you worked with ambiguous or incomplete information." },
  { id: "prioritize",     q: "Tell me about a time you juggled competing priorities." },
  { id: "above",          q: "Tell me about a time you went above and beyond." },
  { id: "mistake",        q: "Tell me about a mistake you made and how you handled it." },
  { id: "impact",         q: "Tell me about the biggest impact you've had." },
  { id: "difficult",      q: "Tell me about a time you worked with a difficult person." },
  { id: "learn_fast",     q: "Tell me about a time you had to learn something new quickly." },
  { id: "influence",      q: "Tell me about a time you influenced without authority." },
  { id: "analytical",     q: "Tell me about a complex analytical problem you solved." },
  { id: "initiative",     q: "Tell me about a time you took initiative on something nobody asked you to do." },
  { id: "why_consulting", q: "Why consulting?" },
];

let behProfile = null;
let behStories = [];
let behLastAnswer = null;
let behBusy = false;

function behEsc(s){
  return String(s ?? "").replace(/[&<>"']/g, ch => ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[ch]));
}
function behSave(key, val){
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}
function behLoad(key, fallback){
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}
function behStatus(elId, text, kind){
  const el = document.getElementById(elId);
  if (!el) return;
  el.textContent = text || "";
  el.className = "beh-status" + (kind ? " beh-status--" + kind : "");
}
function behSetBusy(on){
  behBusy = !!on;
  ["beh-parse","beh-build","beh-answer","beh-regen"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = !!on;
  });
}

async function behApi(action, payload){
  const r = await fetch("/api/behaviorals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, ...payload }),
  });
  const body = await r.json().catch(() => ({ error: "bad_response" }));
  if (!r.ok) throw new Error(body?.message || body?.error || ("status " + r.status));
  return body;
}

// ---- rendering: profile ----------------------------------------------------

function renderBehProfile(){
  const host = document.getElementById("beh-profile");
  const step = document.getElementById("beh-profile-step");
  if (!host || !step) return;
  if (!behProfile){ step.hidden = true; return; }
  step.hidden = false;

  const p = behProfile;
  const exps = Array.isArray(p.experiences) ? p.experiences : [];
  const projs = Array.isArray(p.projects) ? p.projects : [];

  const expHtml = exps.map((e, i) => `
    <div class="beh-card" data-kind="exp" data-idx="${i}">
      <div class="beh-card-head">
        <input class="beh-inline beh-inline--role" data-field="role"    value="${behEsc(e.role||"")}" placeholder="role">
        <span class="beh-at">@</span>
        <input class="beh-inline beh-inline--co"   data-field="company" value="${behEsc(e.company||"")}" placeholder="company">
        <span class="beh-when">
          <input class="beh-inline beh-inline--date" data-field="start" value="${behEsc(e.start||"")}" placeholder="start">
          <span class="beh-dash">—</span>
          <input class="beh-inline beh-inline--date" data-field="end"   value="${behEsc(e.end||"")}" placeholder="end">
        </span>
        <button class="beh-x" data-act="rm-exp" title="remove">×</button>
      </div>
      <ul class="beh-bullets" data-role="bullets">
        ${(e.bullets||[]).map(b => `<li><textarea class="beh-bullet" rows="2">${behEsc(b)}</textarea><button class="beh-x beh-x--small" data-act="rm-bullet" title="remove bullet">×</button></li>`).join("")}
      </ul>
      <button class="mini-btn beh-btn-ghost beh-add-bullet" data-act="add-bullet" type="button">+ bullet</button>
    </div>
  `).join("");

  const projHtml = projs.map((pr, i) => `
    <div class="beh-card" data-kind="proj" data-idx="${i}">
      <div class="beh-card-head">
        <input class="beh-inline beh-inline--role" data-field="title"   value="${behEsc(pr.title||"")}" placeholder="project title">
        <span class="beh-at">·</span>
        <input class="beh-inline beh-inline--co"   data-field="context" value="${behEsc(pr.context||"")}" placeholder="class / hackathon / personal">
        <button class="beh-x" data-act="rm-proj" title="remove">×</button>
      </div>
      <ul class="beh-bullets" data-role="bullets">
        ${(pr.bullets||[]).map(b => `<li><textarea class="beh-bullet" rows="2">${behEsc(b)}</textarea><button class="beh-x beh-x--small" data-act="rm-bullet" title="remove bullet">×</button></li>`).join("")}
      </ul>
      <button class="mini-btn beh-btn-ghost beh-add-bullet" data-act="add-bullet" type="button">+ bullet</button>
    </div>
  `).join("");

  host.innerHTML = `
    <div class="beh-id-row">
      <label class="beh-id-label">name<input class="beh-inline" id="beh-name" value="${behEsc(p.name||"")}"></label>
      <label class="beh-id-label">headline<input class="beh-inline beh-inline--wide" id="beh-headline" value="${behEsc(p.headline||"")}"></label>
    </div>
    <div class="beh-group">
      <div class="beh-group-h">experiences <button class="mini-btn beh-btn-ghost" data-act="add-exp" type="button">+ add</button></div>
      <div id="beh-exps">${expHtml || '<div class="beh-empty">no experiences parsed.</div>'}</div>
    </div>
    <div class="beh-group">
      <div class="beh-group-h">projects <button class="mini-btn beh-btn-ghost" data-act="add-proj" type="button">+ add</button></div>
      <div id="beh-projs">${projHtml || '<div class="beh-empty">no projects parsed.</div>'}</div>
    </div>
  `;
  wireBehProfileEdits();
}

function readBehProfileFromDOM(){
  if (!behProfile) return behProfile;
  const p = { ...behProfile };
  const nameEl = document.getElementById("beh-name");
  const headEl = document.getElementById("beh-headline");
  if (nameEl) p.name = nameEl.value;
  if (headEl) p.headline = headEl.value;
  const readCards = (selector, fields) => Array.from(document.querySelectorAll(selector)).map(card => {
    const o = {};
    fields.forEach(f => {
      const el = card.querySelector(`[data-field="${f}"]`);
      if (el) o[f] = el.value;
    });
    o.bullets = Array.from(card.querySelectorAll(".beh-bullet")).map(t => t.value).filter(s => s.trim());
    return o;
  });
  p.experiences = readCards('#beh-exps .beh-card', ["role","company","start","end","location"]);
  p.projects    = readCards('#beh-projs .beh-card', ["title","context"]);
  return p;
}

function wireBehProfileEdits(){
  const host = document.getElementById("beh-profile");
  if (!host) return;
  host.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-act]");
    if (!btn) return;
    const act = btn.dataset.act;
    behProfile = readBehProfileFromDOM();
    if (act === "add-exp"){
      behProfile.experiences = behProfile.experiences || [];
      behProfile.experiences.push({ role:"", company:"", start:"", end:"", bullets:[""] });
    } else if (act === "add-proj"){
      behProfile.projects = behProfile.projects || [];
      behProfile.projects.push({ title:"", context:"", bullets:[""] });
    } else if (act === "rm-exp"){
      const card = btn.closest(".beh-card");
      const idx = +card.dataset.idx;
      behProfile.experiences.splice(idx, 1);
    } else if (act === "rm-proj"){
      const card = btn.closest(".beh-card");
      const idx = +card.dataset.idx;
      behProfile.projects.splice(idx, 1);
    } else if (act === "add-bullet"){
      const card = btn.closest(".beh-card");
      const idx  = +card.dataset.idx;
      const arr  = card.dataset.kind === "exp" ? behProfile.experiences : behProfile.projects;
      arr[idx].bullets = arr[idx].bullets || [];
      arr[idx].bullets.push("");
    } else if (act === "rm-bullet"){
      const card = btn.closest(".beh-card");
      const li   = btn.closest("li");
      const bulletIdx = Array.from(card.querySelectorAll("li")).indexOf(li);
      const idx  = +card.dataset.idx;
      const arr  = card.dataset.kind === "exp" ? behProfile.experiences : behProfile.projects;
      arr[idx].bullets.splice(bulletIdx, 1);
    } else return;
    behSave(BEH_KEYS.profile, behProfile);
    renderBehProfile();
  });
  host.addEventListener("change", () => {
    behProfile = readBehProfileFromDOM();
    behSave(BEH_KEYS.profile, behProfile);
  });
}

// ---- rendering: stories ----------------------------------------------------

function renderBehStories(){
  const host = document.getElementById("beh-stories-list");
  const stepStories = document.getElementById("beh-stories-step");
  const stepQuestion = document.getElementById("beh-question-step");
  if (!host) return;

  if (!behStories.length){
    if (stepStories) stepStories.hidden = true;
    if (stepQuestion) stepQuestion.hidden = true;
    return;
  }
  if (stepStories) stepStories.hidden = false;
  if (stepQuestion) stepQuestion.hidden = false;

  host.innerHTML = behStories.map((s, i) => `
    <div class="beh-story" data-idx="${i}">
      <div class="beh-story-head">
        <input class="beh-inline beh-inline--wide" data-field="title" value="${behEsc(s.title||"")}" placeholder="story title">
        <button class="beh-x" data-act="rm-story" title="remove story">×</button>
      </div>
      <div class="beh-story-src">${behEsc(s.source||"")}</div>
      <div class="beh-themes">${(s.themes||[]).map(t => `<span class="beh-theme">${behEsc(t)}</span>`).join("")}</div>
      <div class="beh-star-grid">
        <label><span class="beh-star-k">S · situation</span><textarea data-field="situation" rows="2">${behEsc(s.star?.situation||"")}</textarea></label>
        <label><span class="beh-star-k">T · task</span><textarea data-field="task" rows="2">${behEsc(s.star?.task||"")}</textarea></label>
        <label><span class="beh-star-k">A · action</span><textarea data-field="action" rows="4">${behEsc(s.star?.action||"")}</textarea></label>
        <label><span class="beh-star-k">R · result</span><textarea data-field="result" rows="2">${behEsc(s.star?.result||"")}</textarea></label>
      </div>
    </div>
  `).join("");

  populateBehQuestionPicker();
}

function onBehStoryEdit(e){
  const card = e.target.closest(".beh-story");
  if (!card) return;
  const idx = +card.dataset.idx;
  const s = behStories[idx];
  if (!s) return;
  const field = e.target.dataset.field;
  if (!field) return;
  if (field === "title"){ s.title = e.target.value; }
  else if (["situation","task","action","result"].includes(field)){
    s.star = s.star || {};
    s.star[field] = e.target.value;
  }
  behSave(BEH_KEYS.stories, behStories);
}
function onBehStoryClick(e){
  const btn = e.target.closest("[data-act='rm-story']");
  if (!btn) return;
  const card = btn.closest(".beh-story");
  const idx = +card.dataset.idx;
  behStories.splice(idx, 1);
  behSave(BEH_KEYS.stories, behStories);
  renderBehStories();
}

function populateBehQuestionPicker(){
  const sel = document.getElementById("beh-question");
  if (!sel) return;
  sel.innerHTML =
    '<option value="">— pick a question —</option>' +
    BEH_QUESTIONS.map(q => `<option value="${behEsc(q.q)}">${behEsc(q.q)}</option>`).join("");
}

// ---- answer rendering ------------------------------------------------------

function renderBehAnswer(){
  const out = document.getElementById("beh-answer-out");
  const used = document.getElementById("beh-used-story");
  const text = document.getElementById("beh-answer-text");
  if (!out || !used || !text) return;
  if (!behLastAnswer){ out.hidden = true; return; }
  const story = behStories.find(s => s.id === behLastAnswer.picked_story_id);
  used.innerHTML = story
    ? `<span class="beh-used-label">using story:</span> <strong>${behEsc(story.title)}</strong> <span class="beh-story-src">${behEsc(story.source||"")}</span>`
    : '<span class="beh-used-label">story not found — showing answer anyway.</span>';
  text.innerHTML = behEsc(behLastAnswer.answer || "").split(/\n\n+/).map(p => `<p>${p}</p>`).join("");
  out.hidden = false;
}

// ---- actions ---------------------------------------------------------------

async function behParseResume(){
  if (behBusy) return;
  const ta = document.getElementById("beh-resume");
  const resume = (ta?.value || "").trim();
  if (!resume){ behStatus("beh-parse-status", "paste a resume first.", "err"); return; }
  behSave(BEH_KEYS.resume, resume);
  behSetBusy(true);
  behStatus("beh-parse-status", "parsing with AI…", "info");
  try {
    const { profile } = await behApi("parse_resume", { resume });
    behProfile = profile || {};
    behSave(BEH_KEYS.profile, behProfile);
    renderBehProfile();
    behStatus("beh-parse-status", "parsed. review below ↓", "ok");
  } catch (e){
    behStatus("beh-parse-status", "parse failed: " + e.message, "err");
  } finally {
    behSetBusy(false);
  }
}

async function behBuildStories(){
  if (behBusy) return;
  behProfile = readBehProfileFromDOM();
  behSave(BEH_KEYS.profile, behProfile);
  behSetBusy(true);
  behStatus("beh-build-status", "building STAR stories…", "info");
  try {
    const { stories } = await behApi("build_stories", { profile: behProfile });
    behStories = Array.isArray(stories) ? stories : [];
    behSave(BEH_KEYS.stories, behStories);
    renderBehStories();
    behStatus("beh-build-status", `built ${behStories.length} ${behStories.length === 1 ? "story" : "stories"}. edit below ↓`, "ok");
    document.getElementById("beh-stories-step")?.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (e){
    behStatus("beh-build-status", "build failed: " + e.message, "err");
  } finally {
    behSetBusy(false);
  }
}

async function behAnswerQuestion(){
  if (behBusy) return;
  const sel = document.getElementById("beh-question");
  const custom = document.getElementById("beh-custom-q");
  const question = (custom?.value || "").trim() || sel?.value || "";
  if (!question){ behStatus("beh-answer-status", "pick a question or type one.", "err"); return; }
  if (!behStories.length){ behStatus("beh-answer-status", "build stories first.", "err"); return; }
  behSetBusy(true);
  behStatus("beh-answer-status", "generating answer…", "info");
  try {
    const out = await behApi("answer_question", { question, stories: behStories });
    behLastAnswer = out;
    renderBehAnswer();
    behStatus("beh-answer-status", "", "");
  } catch (e){
    behStatus("beh-answer-status", "generation failed: " + e.message, "err");
  } finally {
    behSetBusy(false);
  }
}

function behClearAll(){
  if (!confirm("Clear your resume, parsed profile, and all stories? This can't be undone.")) return;
  try {
    localStorage.removeItem(BEH_KEYS.resume);
    localStorage.removeItem(BEH_KEYS.profile);
    localStorage.removeItem(BEH_KEYS.stories);
  } catch {}
  behProfile = null;
  behStories = [];
  behLastAnswer = null;
  const ta = document.getElementById("beh-resume"); if (ta) ta.value = "";
  document.getElementById("beh-profile-step").hidden = true;
  document.getElementById("beh-stories-step").hidden = true;
  document.getElementById("beh-question-step").hidden = true;
  document.getElementById("beh-answer-out").hidden = true;
  behStatus("beh-parse-status", "cleared.", "info");
}

function behInit(){
  const resume = behLoad(BEH_KEYS.resume, "");
  const ta = document.getElementById("beh-resume");
  if (ta && resume) ta.value = resume;
  behProfile = behLoad(BEH_KEYS.profile, null);
  behStories = behLoad(BEH_KEYS.stories, []);
  const storiesHost = document.getElementById("beh-stories-list");
  if (storiesHost){
    storiesHost.addEventListener("input", onBehStoryEdit);
    storiesHost.addEventListener("click", onBehStoryClick);
  }
  if (behProfile) renderBehProfile();
  if (behStories.length) renderBehStories();
  populateBehQuestionPicker();
}

document.getElementById("beh-parse")?.addEventListener("click", behParseResume);
document.getElementById("beh-build")?.addEventListener("click", behBuildStories);
document.getElementById("beh-answer")?.addEventListener("click", behAnswerQuestion);
document.getElementById("beh-regen")?.addEventListener("click", behAnswerQuestion);
document.getElementById("beh-clear")?.addEventListener("click", behClearAll);
document.getElementById("beh-copy")?.addEventListener("click", () => {
  if (!behLastAnswer?.answer) return;
  navigator.clipboard?.writeText(behLastAnswer.answer).then(() => {
    behStatus("beh-answer-status", "copied.", "ok");
    setTimeout(() => behStatus("beh-answer-status", "", ""), 1500);
  });
});
document.getElementById("beh-custom-q")?.addEventListener("keydown", (e) => {
  if (e.key === "Enter"){ e.preventDefault(); behAnswerQuestion(); }
});

behInit();
