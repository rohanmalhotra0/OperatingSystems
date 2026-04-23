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

function renderCaseBody(c, body){
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
    // All revealed — offer to reset for another pass.
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
  const item = document.createElement("div");
  item.className = "case-item case-item--" + src;
  item.dataset.caseId = String(c.id);

  const head = document.createElement("button");
  head.className = "case-head";
  head.type = "button";
  head.innerHTML = `
    <span class="case-num">${String(c.id).padStart(2,"0")}</span>
    <span class="case-title">
      <span class="case-name">${escapeHTML(c.title)}</span>
      <span class="case-meta">${escapeHTML(c.industry || "")} · ${escapeHTML(c.type || "")} · ${escapeHTML(c.difficulty || "")}</span>
    </span>
    <span class="case-source-badge case-source-badge--${src}">${sourceLabel(src)}</span>
    <span class="ask-ai-btn" data-ask-mock="${escapeHTML(String(c.id))}" title="run this case as a mock interview" role="button" tabindex="0">mock this ↗</span>
    <span class="case-toggle">show ▾</span>
  `;

  const body = document.createElement("div");
  body.className = "case-body";

  head.addEventListener("click", (e) => {
    if (e.target.closest(".ask-ai-btn")) return;
    const open = body.classList.toggle("open");
    head.querySelector(".case-toggle").textContent = open ? "hide ▴" : "show ▾";
    if (open) renderCaseBody(c, body);
  });

  item.appendChild(head);
  item.appendChild(body);
  return item;
}

function renderCases(){
  const list = document.getElementById("case-list");
  list.innerHTML = "";

  // toolbar: reveal / hide all cases (overrides per-case state)
  const toolbar = document.getElementById("case-toolbar");
  toolbar.innerHTML = "";
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
  toolbar.appendChild(revealAll);
  toolbar.appendChild(resetAll);
  toolbar.appendChild(collapseAll);

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
      const id = item.dataset.caseId;
      const c = CASES.find(x => String(x.id) === id);
      if (!c) return;
      const state = ensureCaseState(c);
      state.revealed = state.revealed.map(() => true);
      const body = item.querySelector(".case-body");
      body.classList.add("open");
      item.querySelector(".case-toggle").textContent = "hide ▴";
      renderCaseBody(c, body);
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
      if (body.classList.contains("open")) renderCaseBody(c, body);
    });
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
