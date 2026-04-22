/* =========================================================
   darden.lab — app.js
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
  t.addEventListener("click", () => activateTab(t.dataset.target));
});

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
   VOCAB — flat grid, filter + search (matches German pattern)
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
      <span class="ask-ai-btn ask-ai-btn--small" data-ask-framework="${escapeHTML(f.name)}" title="ask AI to walk through this framework" role="button" tabindex="0">ask AI ↗</span>
      <span class="fw-toggle">show buckets ▾</span>
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
   CASES — accordion with sub-sections + show/hide answers
   ========================================================= */
function renderCases(){
  const list = document.getElementById("case-list");
  list.innerHTML = "";

  // toolbar: expand all / collapse all
  const toolbar = document.getElementById("case-toolbar");
  toolbar.innerHTML = "";
  const expandAll   = document.createElement("button");
  expandAll.className = "mini-btn";
  expandAll.textContent = "expand all";
  const collapseAll = document.createElement("button");
  collapseAll.className = "mini-btn";
  collapseAll.textContent = "collapse all";
  toolbar.appendChild(expandAll);
  toolbar.appendChild(collapseAll);

  CASES.forEach(c => {
    const item = document.createElement("div");
    item.className = "case-item";

    const head = document.createElement("button");
    head.className = "case-head";
    head.type = "button";
    head.innerHTML = `
      <span class="case-num">${String(c.id).padStart(2,"0")}</span>
      <span class="case-title">
        <span class="case-name">${escapeHTML(c.title)}</span>
        <span class="case-meta">${escapeHTML(c.industry || "")} · ${escapeHTML(c.type || "")} · ${escapeHTML(c.difficulty || "")}</span>
      </span>
      <span class="ask-ai-btn" data-ask-mock="${escapeHTML(String(c.id))}" title="run this case as a mock interview" role="button" tabindex="0">mock this ↗</span>
      <span class="case-toggle">show ▾</span>
    `;

    const body = document.createElement("div");
    body.className = "case-body";

    const section = (label, html) => {
      const wrap = document.createElement("div");
      wrap.className = "case-section";
      const h = document.createElement("h5");
      h.className = "case-section-h";
      h.textContent = label;
      const d = document.createElement("div");
      d.className = "case-section-body";
      d.innerHTML = html;
      wrap.appendChild(h);
      wrap.appendChild(d);
      return wrap;
    };

    const list2html = arr =>
      "<ul>" + arr.map(x => `<li>${escapeHTML(x)}</li>`).join("") + "</ul>";

    if (c.behavioral)
      body.appendChild(section("Behavioral warm-up", `<em>"${escapeHTML(c.behavioral)}"</em>`));
    body.appendChild(section("Prompt", escapeHTML(c.prompt)));
    if (c.clarifying?.length)
      body.appendChild(section("Clarifying info", list2html(c.clarifying)));
    if (c.framework?.length)
      body.appendChild(section("Framework buckets", list2html(c.framework)));
    if (c.math?.length)
      body.appendChild(section("Key math", list2html(c.math)));
    if (c.brainstorm)
      body.appendChild(section("Brainstorming", escapeHTML(c.brainstorm)));
    if (c.recommendation)
      body.appendChild(section("Recommendation", escapeHTML(c.recommendation)));

    head.addEventListener("click", (e) => {
      if (e.target.closest(".ask-ai-btn")) return; // don't toggle on ask-AI click
      const open = body.classList.toggle("open");
      head.querySelector(".case-toggle").textContent = open ? "hide ▴" : "show ▾";
    });

    item.appendChild(head);
    item.appendChild(body);
    list.appendChild(item);
  });

  expandAll.addEventListener("click", () => {
    document.querySelectorAll(".case-body").forEach(b => b.classList.add("open"));
    document.querySelectorAll(".case-head .case-toggle").forEach(t => t.textContent = "hide ▴");
  });
  collapseAll.addEventListener("click", () => {
    document.querySelectorAll(".case-body").forEach(b => b.classList.remove("open"));
    document.querySelectorAll(".case-head .case-toggle").forEach(t => t.textContent = "show ▾");
  });
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
  const btn = e.target.closest("[data-ask-explain], [data-ask-framework], [data-ask-mock]");
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
  }
});
