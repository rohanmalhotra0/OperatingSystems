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
   FLASHCARDS — finite session model
   K retires the card · D requeues 3–5 cards later · U undoes last rating.
   Persists per-card mastery timestamp so tomorrow's session shows yesterday's progress.
   ========================================================= */
const WEIGHT_KEY   = "darden.card.weights";
const MASTERED_KEY = "darden.card.mastered";   // { term: timestampMs }
const weights  = JSON.parse(localStorage.getItem(WEIGHT_KEY)   || "{}");
const mastered = JSON.parse(localStorage.getItem(MASTERED_KEY) || "{}");
function saveWeights(){  localStorage.setItem(WEIGHT_KEY,   JSON.stringify(weights));  }
function saveMastered(){ localStorage.setItem(MASTERED_KEY, JSON.stringify(mastered)); }

let fcFilter = "all";
let fcSession = null; // { queue, total, masteredCount, missed:[], history:[], hintShown:bool, phase:'active'|'done' }

function filterCards(filter){
  if (filter === "all") return CARDS.slice();
  return CARDS.filter(c => c.cat === filter);
}

function weightedShuffle(pool){
  // Weight = higher if recently missed; lower if known. Plus a random jitter.
  const arr = pool.map(c => ({ c, w: (weights[c.term] || 1) * (0.5 + Math.random()) }));
  arr.sort((a,b) => b.w - a.w);
  return arr.map(x => x.c);
}

/* ---------- session lifecycle ---------- */
function startSession(pool){
  const queue = pool && pool.length ? pool.slice() : weightedShuffle(filterCards(fcFilter));
  fcSession = {
    queue,
    total: queue.length,
    masteredCount: 0,
    missed: [],
    history: [],
    hintShown: false,
    phase: queue.length ? "active" : "done",
  };
  renderSession();
}

function renderSession(){
  if (!fcSession) return;
  document.getElementById("fc-stage-active").style.display = fcSession.phase === "done" ? "none" : "";
  document.getElementById("fc-stage-done").style.display   = fcSession.phase === "done" ? "flex" : "none";
  renderProgress();
  if (fcSession.phase === "done"){
    renderDone();
  } else {
    showCard();
  }
  document.getElementById("undo-card").disabled = !fcSession.history.length;
}

function renderProgress(){
  const { masteredCount, total, queue } = fcSession;
  const pct = total ? Math.round(100 * masteredCount / total) : 0;
  document.getElementById("fc-prog-fill").style.width = pct + "%";
  document.getElementById("fc-prog-txt").textContent  = `${masteredCount} / ${total} mastered`;
  const left = queue.length;
  document.getElementById("fc-prog-queue").textContent = left ? `· ${left} in queue` : "";
}

function showCard(){
  const card = fcSession.queue[0];
  const fc = document.getElementById("flashcard");
  fc.classList.remove("flipped");

  if (!card){
    fcSession.phase = "done";
    renderSession();
    return;
  }
  document.getElementById("card-front").textContent = card.term;
  document.getElementById("card-back").textContent  = card.def;
  const tag = document.getElementById("card-tag");
  tag.textContent = card.cat || "";
  tag.className = "fc-badge cat-badge " + catClass(card.cat || "");
  tag.style.display = card.cat ? "inline-block" : "none";

  // hint hidden by default (active recall); reveal on H or button click
  const note   = document.getElementById("card-note");
  const toggle = document.getElementById("card-hint-toggle");
  if (card.hint){
    note.textContent = card.hint;
    note.hidden = !fcSession.hintShown;
    toggle.style.display = "inline-block";
    toggle.textContent = fcSession.hintShown ? "hide hint" : "show hint";
  } else {
    note.textContent = "";
    note.hidden = true;
    toggle.style.display = "none";
  }

  // position shown = mastered so far + 1 (what you're looking at), capped at total
  const pos = Math.min(fcSession.total, fcSession.masteredCount + 1);
  document.getElementById("card-counter").textContent = `${pos} / ${fcSession.total}`;

  decorateMasteryBadge(card);
}

function decorateMasteryBadge(card){
  const existing = document.getElementById("card-mastery-badge");
  if (existing) existing.remove();
  if (!mastered[card.term]) return;
  const badge = document.createElement("div");
  badge.id = "card-mastery-badge";
  badge.className = "fc-mastery-badge";
  badge.textContent = "seen before ✓";
  document.querySelector(".card-front").appendChild(badge);
}

function renderDone(){
  const { masteredCount, total, missed } = fcSession;
  const pct = total ? Math.round(100 * masteredCount / total) : 0;
  const stats = document.getElementById("fc-done-stats");
  stats.innerHTML = `
    <span class="fc-done-score">${masteredCount}<span>/${total}</span></span>
    <span class="fc-done-pct">${pct}%</span>
    ${missed.length
      ? `<span class="fc-done-missed">${missed.length} needed another pass before you nailed them</span>`
      : `<span class="fc-done-missed fc-done-missed--clean">no re-tries needed</span>`}
  `;
  document.getElementById("fc-retry-missed").style.display = missed.length ? "inline-block" : "none";
}

/* ---------- actions ---------- */
function actKnew(){
  if (!fcSession || fcSession.phase === "done") return;
  const card = fcSession.queue.shift();
  if (!card) return;
  const priorW = weights[card.term] || 1;
  const wasMasteredBefore = !!mastered[card.term];
  weights[card.term]  = Math.max(0.25, priorW * 0.6);
  mastered[card.term] = Date.now();
  saveWeights(); saveMastered();
  fcSession.masteredCount++;
  fcSession.history.push({ card, action:"knew", wasMasteredBefore, priorWeight: priorW });
  fcSession.hintShown = false;
  if (!fcSession.queue.length) fcSession.phase = "done";
  renderSession();
}

function actMissed(){
  if (!fcSession || fcSession.phase === "done") return;
  const card = fcSession.queue.shift();
  if (!card) return;
  const priorW = weights[card.term] || 1;
  weights[card.term] = Math.min(5, priorW * 1.8);
  saveWeights();
  const insertAt = Math.min(fcSession.queue.length, 3 + Math.floor(Math.random() * 3));
  fcSession.queue.splice(insertAt, 0, card);
  fcSession.missed.push(card);
  fcSession.history.push({ card, action:"missed", priorWeight: priorW, insertAt });
  fcSession.hintShown = false;
  renderSession();
}

function actUndo(){
  if (!fcSession) return;
  const last = fcSession.history.pop();
  if (!last) return;
  if (last.action === "knew"){
    fcSession.queue.unshift(last.card);
    fcSession.masteredCount = Math.max(0, fcSession.masteredCount - 1);
    if (!last.wasMasteredBefore) delete mastered[last.card.term];
  } else if (last.action === "missed"){
    const insertedAt = last.insertAt ?? 0;
    const idx = fcSession.queue.findIndex((c,i) => c === last.card && i >= Math.max(0, insertedAt - 1));
    if (idx >= 0) fcSession.queue.splice(idx, 1);
    fcSession.queue.unshift(last.card);
    const popIdx = fcSession.missed.lastIndexOf(last.card);
    if (popIdx >= 0) fcSession.missed.splice(popIdx, 1);
  }
  weights[last.card.term] = last.priorWeight;
  saveWeights(); saveMastered();
  fcSession.phase = "active";
  fcSession.hintShown = false;
  renderSession();
}

function toggleHint(){
  if (!fcSession) return;
  fcSession.hintShown = !fcSession.hintShown;
  const note = document.getElementById("card-note");
  const btn  = document.getElementById("card-hint-toggle");
  note.hidden = !fcSession.hintShown;
  btn.textContent = fcSession.hintShown ? "hide hint" : "show hint";
}

function flipCard(){
  document.getElementById("flashcard").classList.toggle("flipped");
}

/* ---------- wiring ---------- */
buildFilterChips("card-filter-bar", "deck", v => { fcFilter = v; startSession(); });

document.getElementById("flashcard").addEventListener("click", (e) => {
  if (e.target.closest(".fc-hint-toggle")) return;
  flipCard();
});
document.getElementById("flip-card").addEventListener("click", e => { e.stopPropagation(); flipCard(); });
document.getElementById("undo-card").addEventListener("click", e => { e.stopPropagation(); actUndo(); });
document.getElementById("knew").addEventListener("click",   e => { e.stopPropagation(); actKnew(); });
document.getElementById("missed").addEventListener("click", e => { e.stopPropagation(); actMissed(); });
document.getElementById("shuffle").addEventListener("click", () => startSession());
document.getElementById("card-hint-toggle").addEventListener("click", e => { e.stopPropagation(); toggleHint(); });

document.getElementById("fc-retry-missed").addEventListener("click", () => {
  const seen = new Set(); const uniq = [];
  (fcSession?.missed || []).forEach(c => { if (!seen.has(c.term)){ seen.add(c.term); uniq.push(c); } });
  startSession(uniq);
});
document.getElementById("fc-new-run").addEventListener("click", () => startSession());
document.getElementById("fc-switch-filter").addEventListener("click", () => {
  document.querySelector("#card-filter-bar .deck-chip input")?.focus();
});

document.addEventListener("keydown", e => {
  if (document.querySelector(".sheet--active")?.id !== "cards") return;
  if (e.target.matches("input, textarea")) return;
  if (fcSession?.phase === "done") return;
  if (e.code === "Space"){ e.preventDefault(); flipCard(); }
  else if (e.key === "k" || e.key === "K"){ actKnew(); }
  else if (e.key === "d" || e.key === "D"){ actMissed(); }
  else if (e.key === "u" || e.key === "U"){ actUndo(); }
  else if (e.key === "h" || e.key === "H"){ toggleHint(); }
});

startSession();

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
    <div class="vocab-card">
      <div class="vocab-de">${escapeHTML(v.term)}</div>
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
    head.innerHTML = `
      <span class="fw-num">${String(i+1).padStart(2,"0")}</span>
      <span class="fw-name">${f.name}</span>
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
    head.addEventListener("click", () => {
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
    head.innerHTML = `
      <span class="case-num">${String(c.id).padStart(2,"0")}</span>
      <span class="case-title">
        <span class="case-name">${c.title}</span>
        <span class="case-meta">${c.industry} · ${c.type} · ${c.difficulty}</span>
      </span>
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

    head.addEventListener("click", () => {
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
      <div class="formula-name">${escapeHTML(f.name)}</div>
      <pre class="formula-body">${escapeHTML(f.formula)}</pre>
      <div class="formula-note">${escapeHTML(f.note || "")}</div>
    `;
    list.appendChild(item);
  });
}
renderFormulas();
