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
  const match = Array.from(tabs).find(t => t.dataset.target === id);
  if (match) {
    activateTab(id);
    document.querySelector(".file-tabs")?.scrollIntoView({ block: "start", behavior: "auto" });
  }
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
  const mc = document.getElementById("learn-mc-mode");
  const math = document.getElementById("learn-math-mode");
  document.querySelectorAll(".learn-mode-switch .mode-btn").forEach(b => {
    b.classList.toggle("mode-btn--on", b.dataset.lmode === mode);
  });
  if (mode === "mc"){
    mc.style.display  = "block";
    math.style.display = "none";
    if (mdTimer){ clearInterval(mdTimer); mdTimer = null; }
  } else {
    mc.style.display  = "none";
    math.style.display = "block";
  }
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
        mode: "explain",
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
  return "darden";
}
function sourceLabel(src){
  if (src === "practice") return "practice pack";
  if (src === "tuck") return "tuck";
  return "darden";
}
function sourceFullName(src){
  if (src === "practice") return "Practice Pack";
  if (src === "tuck") return "Tuck";
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
  filterWrap.appendChild(buildFilterGroup("source", "source", ["darden", "tuck", "practice"], {
    darden: "darden", tuck: "tuck", practice: "practice pack"
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

  // Split into Darden + Tuck + Practice Pack
  const darden   = CASES.filter(c => sourceOf(c) === "darden");
  const tuck     = CASES.filter(c => sourceOf(c) === "tuck");
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
    "Practice Pack",
    "Original supplemental cases in the Darden style · 15 cases · exhibits included",
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
      mode: "explain",
      focus: term,
      prompt: `Explain "${term}" in depth — definition, intuition, one concrete example, and 1-2 common traps a student might fall into.`,
    });
  } else if (btn.hasAttribute("data-ask-framework")){
    const name = btn.getAttribute("data-ask-framework");
    window.ChatLab.askAI({
      mode: "explain",
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
      mode: "explain",
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
