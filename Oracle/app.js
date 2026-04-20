/* =========================================================
   epm1080.lab — app.js  (Oracle 1Z0-1080-25 cert prep)
   flashcards · learn (MC) · quiz · match (timed) · defs · scenarios
   ========================================================= */

const CAT_SLUG = {
  "Application Setup": "setup",
  "Content & Rules":   "rules",
  "Modules":           "modules",
  "Operations":        "ops",
};
const catClass = c => "cat--" + (CAT_SLUG[c] || "setup");

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

/* ---------- global keys ---------- */
document.addEventListener("keydown", e => {
  if (e.target.matches("input, textarea")) return;
  // ignore while typing in learn MC (none currently, but safe)
  const active = document.querySelector(".sheet--active")?.id;
  if (e.key === "ArrowLeft"  && active !== "cards") cycleTab(-1);
  if (e.key === "ArrowRight" && active !== "cards") cycleTab(+1);
});

/* =========================================================
   FLASHCARDS
   ========================================================= */
const WEIGHT_KEY = "epm1080.card.weights";
const weights = JSON.parse(localStorage.getItem(WEIGHT_KEY) || "{}");
function saveWeights(){ localStorage.setItem(WEIGHT_KEY, JSON.stringify(weights)); }

let fcDeck = [];
let fcIdx = 0;
let fcFilter = "all";

function filterCards(filter){
  if (filter === "all") return CARDS.slice();
  return CARDS.filter(c => c.cat === filter);
}

function weightedShuffle(pool){
  const arr = pool.map(c => ({c, w: (weights[c.term] || 1) * (0.5 + Math.random())}));
  arr.sort((a,b) => b.w - a.w);
  return arr.map(x => x.c);
}

function buildDeck(){
  fcDeck = weightedShuffle(filterCards(fcFilter));
  fcIdx = 0;
  showCard();
}

function showCard(){
  const card = fcDeck[fcIdx];
  const fc = document.getElementById("flashcard");
  fc.classList.remove("flipped");
  if (!card){
    document.getElementById("card-front").textContent = "No cards in this deck.";
    document.getElementById("card-back").textContent  = "";
    document.getElementById("card-tag").style.display = "none";
    document.getElementById("card-note").textContent  = "";
    document.getElementById("card-counter").textContent = "0 / 0";
    return;
  }
  document.getElementById("card-front").textContent = card.term;
  document.getElementById("card-back").textContent  = card.def;
  const tag = document.getElementById("card-tag");
  tag.textContent = card.cat;
  tag.className = "fc-badge cat-badge " + catClass(card.cat);
  tag.style.display = "inline-block";
  document.getElementById("card-note").textContent = card.hint || "";
  document.getElementById("card-counter").textContent = `${fcIdx+1} / ${fcDeck.length}`;
}

document.getElementById("flashcard").addEventListener("click", () => {
  document.getElementById("flashcard").classList.toggle("flipped");
});
document.getElementById("flip-card").addEventListener("click", e => {
  e.stopPropagation();
  document.getElementById("flashcard").classList.toggle("flipped");
});
document.getElementById("prev-card").addEventListener("click", e => {
  e.stopPropagation();
  if (!fcDeck.length) return;
  fcIdx = (fcIdx - 1 + fcDeck.length) % fcDeck.length;
  showCard();
});
document.getElementById("next-card").addEventListener("click", e => {
  e.stopPropagation();
  if (!fcDeck.length) return;
  fcIdx = (fcIdx + 1) % fcDeck.length;
  showCard();
});
document.getElementById("knew").addEventListener("click", e => {
  e.stopPropagation();
  const card = fcDeck[fcIdx]; if (!card) return;
  weights[card.term] = Math.max(0.25, (weights[card.term] || 1) * 0.6);
  saveWeights();
  fcIdx = (fcIdx + 1) % fcDeck.length;
  showCard();
});
document.getElementById("missed").addEventListener("click", e => {
  e.stopPropagation();
  const card = fcDeck[fcIdx]; if (!card) return;
  weights[card.term] = Math.min(5, (weights[card.term] || 1) * 1.8);
  saveWeights();
  fcIdx = (fcIdx + 1) % fcDeck.length;
  showCard();
});
document.getElementById("shuffle").addEventListener("click", buildDeck);

document.querySelectorAll('input[name="deck"]').forEach(r => {
  r.addEventListener("change", e => { fcFilter = e.target.value; buildDeck(); });
});

document.addEventListener("keydown", e => {
  if (document.querySelector(".sheet--active")?.id !== "cards") return;
  if (e.target.matches("input, textarea")) return;
  if (e.code === "Space"){ e.preventDefault(); document.getElementById("flashcard").classList.toggle("flipped"); }
  else if (e.key === "ArrowLeft"){ document.getElementById("prev-card").click(); }
  else if (e.key === "ArrowRight"){ document.getElementById("next-card").click(); }
  else if (e.key === "k" || e.key === "K"){ document.getElementById("knew").click(); }
  else if (e.key === "d" || e.key === "D"){ document.getElementById("missed").click(); }
});

buildDeck();

/* =========================================================
   Shared helpers — unified MC question builder used by
   Learn (essay mode + terms) AND Quiz (easy/medium/hard).
   A normalized question is:
     { prompt, optionsText[], correctText, tag, explain, key }
   ========================================================= */
function shuffleInPlace(a){
  for (let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function shuffledCopy(a){ return shuffleInPlace(a.slice()); }

function pickDistractors(correctTerm, pool, n){
  const others = pool.filter(c => c.term !== correctTerm);
  shuffleInPlace(others);
  return others.slice(0, n);
}

// direction: 'def-to-term' | 'term-to-def' | 'hint-to-term'
function makeTermQuestion(card, direction){
  const distract = pickDistractors(card.term, CARDS, 3);
  if (direction === "term-to-def"){
    const opts = shuffledCopy([card.def, ...distract.map(c => c.def)]);
    return {
      prompt: card.term,
      promptLabel: "term → pick the definition",
      optionsText: opts,
      correctText: card.def,
      tag: card.cat,
      tagClass: catClass(card.cat),
      explain: card.hint || "",
      key: card.term,
    };
  }
  if (direction === "hint-to-term"){
    return {
      prompt: card.hint || card.def,
      promptLabel: "clue → pick the term",
      optionsText: shuffledCopy([card.term, ...distract.map(c => c.term)]),
      correctText: card.term,
      tag: card.cat,
      tagClass: catClass(card.cat),
      explain: card.def,
      key: card.term,
    };
  }
  // default: def-to-term
  return {
    prompt: card.def,
    promptLabel: "definition → pick the term",
    optionsText: shuffledCopy([card.term, ...distract.map(c => c.term)]),
    correctText: card.term,
    tag: card.cat,
    tagClass: catClass(card.cat),
    explain: card.hint || "",
    key: card.term,
  };
}

function makeEssayQuestion(mc){
  return {
    prompt: mc.q,
    promptLabel: "essay concept",
    optionsText: shuffledCopy(mc.opts.slice()),
    correctText: mc.opts[mc.correct],
    tag: "essay · " + mc.topic,
    tagClass: "cat--essay",
    explain: mc.explain,
    key: "essay:" + mc.topic,
  };
}

/* =========================================================
   LEARN (4-option MC, requeue misses) — supports essay mode
   ========================================================= */
let lnQueue = [];
let lnMastered = new Set();
let lnTotal = 0;
let lnCurrent = null;

function getSelected(name){
  const boxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  const cats = [];
  let includeEssays = false;
  boxes.forEach(b => {
    if (b.value === "essays") includeEssays = true;
    else cats.push(b.value);
  });
  return { cats, includeEssays };
}

function poolForSelection(sel, termDirection){
  const pool = [];
  sel.cats.forEach(cat => {
    filterCards(cat).forEach(c => pool.push(makeTermQuestion(c, termDirection)));
  });
  if (sel.includeEssays){
    ESSAY_MC.forEach(e => pool.push(makeEssayQuestion(e)));
  }
  return pool;
}

function startLearn(){
  const sel = getSelected("lfilter");
  if (!sel.cats.length && !sel.includeEssays){
    const c = document.getElementById("learn-sel-count");
    c.textContent = "pick at least one category";
    c.classList.add("is-empty");
    return;
  }
  const pool = poolForSelection(sel, "def-to-term");
  lnQueue = shuffledCopy(pool);
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
  // re-roll options each time so repeat-visits don't memorize positions
  lnCurrent = lnQueue.shift();
  lnCurrent.optionsText = shuffledCopy(lnCurrent.optionsText);

  document.getElementById("learn-mc-cat").textContent = lnCurrent.tag;
  document.getElementById("learn-mc-q").textContent   = lnCurrent.prompt;
  const wrap = document.getElementById("learn-mc-opts");
  wrap.innerHTML = "";
  lnCurrent.optionsText.forEach(txt => {
    const b = document.createElement("button");
    b.className = "learn-opt";
    b.textContent = txt;
    b.addEventListener("click", () => checkLearnMC(b, txt));
    wrap.appendChild(b);
  });
  const fb = document.getElementById("learn-mc-fb");
  fb.textContent = ""; fb.className = "check-feedback";
  document.getElementById("learn-mc-next").style.display = "none";
}

function checkLearnMC(btn, chosenText){
  const all = document.querySelectorAll("#learn-mc-opts .learn-opt");
  all.forEach(b => b.style.pointerEvents = "none");
  const fb = document.getElementById("learn-mc-fb");
  if (chosenText === lnCurrent.correctText){
    btn.classList.add("correct");
    fb.textContent = "✓ Right.";
    fb.className = "check-feedback ok";
    lnMastered.add(lnCurrent.key);
  } else {
    btn.classList.add("wrong");
    all.forEach(b => { if (b.textContent === lnCurrent.correctText) b.classList.add("correct"); });
    fb.textContent = `✗ Answer: "${lnCurrent.correctText}".`;
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
  document.getElementById("learn-done-txt").textContent  = `${lnMastered.size} / ${lnTotal} items.`;
}

document.getElementById("learn-start-btn").addEventListener("click", startLearn);
document.getElementById("learn-mc-next").addEventListener("click", serveLearn);
document.getElementById("learn-restart").addEventListener("click", () => {
  document.getElementById("learn-done").style.display  = "none";
  document.getElementById("learn-start").style.display = "block";
});

/* ---------- multi-select helpers (Learn + Quiz) ---------- */
function selCountFor(name){
  const sel = getSelected(name);
  let n = 0;
  sel.cats.forEach(cat => n += CARDS.filter(c => c.cat === cat).length);
  if (sel.includeEssays) n += ESSAY_MC.length;
  return n;
}
function updateSelCount(name){
  const target = name === "lfilter" ? "learn-sel-count" : "quiz-sel-count";
  const el = document.getElementById(target);
  if (!el) return;
  const n = selCountFor(name);
  if (!n){
    el.textContent = "pick at least one category";
    el.classList.add("is-empty");
  } else {
    el.textContent = `pool: ${n} question${n === 1 ? "" : "s"}`;
    el.classList.remove("is-empty");
  }
}
document.querySelectorAll('input[name="lfilter"], input[name="qfilter"]').forEach(b => {
  b.addEventListener("change", () => updateSelCount(b.name));
});
document.querySelectorAll('button[data-sel]').forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.sel;
    const act  = btn.dataset.act;
    document.querySelectorAll(`input[name="${name}"]`).forEach(b => {
      b.checked = (act === "all");
    });
    updateSelCount(name);
  });
});
updateSelCount("lfilter");
updateSelCount("qfilter");

/* =========================================================
   QUIZ — graded, 3 difficulties, score + review of misses
   easy   (10): def → term
   medium (15): mix of def → term AND term → def
   hard   (20): def→term + term→def + clue→term + essay MC
   ========================================================= */
let qzQueue = [];
let qzTotal = 0;
let qzIdx = 0;
let qzRight = 0;
let qzMissed = [];
let qzCurrent = null;
let qzDiff = "easy";

function buildQuizQuestions(diff, sel){
  const cards = shuffledCopy(
    CARDS.filter(c => sel.cats.includes(c.cat))
  );
  const essays = sel.includeEssays ? shuffledCopy(ESSAY_MC) : [];
  const q = [];
  const pick = (arr, n) => arr.slice(0, Math.min(n, arr.length));

  if (diff === "easy"){
    // 10 questions from the selected pool. If essays are the only thing
    // selected, just serve essay MC; otherwise def→term from terms,
    // padded with essays if the term pool is short.
    const target = 10;
    if (!cards.length){
      pick(essays, target).forEach(e => q.push(makeEssayQuestion(e)));
    } else {
      pick(cards, target).forEach(c => q.push(makeTermQuestion(c, "def-to-term")));
      if (q.length < target && essays.length){
        pick(essays, target - q.length).forEach(e => q.push(makeEssayQuestion(e)));
      }
    }
  } else if (diff === "medium"){
    const target = 15;
    if (!cards.length){
      pick(essays, target).forEach(e => q.push(makeEssayQuestion(e)));
    } else {
      const half = Math.ceil(Math.min(cards.length, target) / 2);
      pick(cards, half).forEach(c => q.push(makeTermQuestion(c, "def-to-term")));
      cards.slice(half, Math.min(cards.length, target)).forEach(c => q.push(makeTermQuestion(c, "term-to-def")));
      if (q.length < target && essays.length){
        pick(essays, target - q.length).forEach(e => q.push(makeEssayQuestion(e)));
      }
    }
  } else { // hard
    const target = 20;
    if (!cards.length){
      pick(essays, target).forEach(e => q.push(makeEssayQuestion(e)));
    } else {
      const termSlots = sel.includeEssays
        ? Math.min(cards.length, Math.max(target - 5, Math.ceil(target * 0.75)))
        : Math.min(cards.length, target);
      const third = Math.ceil(termSlots / 3);
      const shuf = cards.slice(0, termSlots);
      shuf.slice(0, third).forEach(c => q.push(makeTermQuestion(c, "def-to-term")));
      shuf.slice(third, third * 2).forEach(c => q.push(makeTermQuestion(c, "term-to-def")));
      shuf.slice(third * 2).forEach(c => q.push(makeTermQuestion(c, "hint-to-term")));
      if (essays.length){
        pick(essays, target - q.length).forEach(e => q.push(makeEssayQuestion(e)));
      }
    }
  }
  return shuffledCopy(q);
}

function startQuiz(diff){
  const sel = getSelected("qfilter");
  if (!sel.cats.length && !sel.includeEssays){
    const c = document.getElementById("quiz-sel-count");
    c.textContent = "pick at least one category";
    c.classList.add("is-empty");
    return;
  }
  qzDiff = diff;
  qzQueue = buildQuizQuestions(diff, sel);
  qzTotal = qzQueue.length;
  qzIdx = 0;
  qzRight = 0;
  qzMissed = [];

  document.getElementById("quiz-start").style.display   = "none";
  document.getElementById("quiz-done").style.display    = "none";
  document.getElementById("quiz-session").style.display = "block";

  const badge = document.getElementById("quiz-diff-badge");
  badge.textContent = diff;
  badge.className = "quiz-diff-badge is-" + diff;

  updateQuizProgress();
  serveQuiz();
}

function updateQuizProgress(){
  const pct = qzTotal ? Math.round(100 * qzIdx / qzTotal) : 0;
  document.getElementById("quiz-prog-fill").style.width = pct + "%";
  document.getElementById("quiz-prog-txt").textContent  = `${qzIdx} / ${qzTotal}`;
  document.getElementById("quiz-score").textContent     = `${qzRight} correct`;
}

function serveQuiz(){
  if (qzIdx >= qzTotal){ endQuiz(); return; }
  qzCurrent = qzQueue[qzIdx];
  qzCurrent.optionsText = shuffledCopy(qzCurrent.optionsText);

  document.getElementById("quiz-type-label").textContent = qzCurrent.promptLabel;
  document.getElementById("quiz-mc-cat").textContent     = qzCurrent.tag;
  document.getElementById("quiz-mc-q").textContent       = qzCurrent.prompt;

  const wrap = document.getElementById("quiz-mc-opts");
  wrap.innerHTML = "";
  qzCurrent.optionsText.forEach(txt => {
    const b = document.createElement("button");
    b.className = "learn-opt";
    b.textContent = txt;
    b.addEventListener("click", () => checkQuizMC(b, txt));
    wrap.appendChild(b);
  });

  const fb = document.getElementById("quiz-mc-fb");
  fb.textContent = ""; fb.className = "check-feedback";
  const explain = document.getElementById("quiz-mc-explain");
  explain.style.display = "none";
  explain.textContent = "";
  document.getElementById("quiz-mc-next").style.display = "none";
}

function checkQuizMC(btn, chosenText){
  const all = document.querySelectorAll("#quiz-mc-opts .learn-opt");
  all.forEach(b => b.style.pointerEvents = "none");
  const fb = document.getElementById("quiz-mc-fb");
  const correct = chosenText === qzCurrent.correctText;
  if (correct){
    btn.classList.add("correct");
    fb.textContent = "✓ Correct.";
    fb.className = "check-feedback ok";
    qzRight += 1;
  } else {
    btn.classList.add("wrong");
    all.forEach(b => { if (b.textContent === qzCurrent.correctText) b.classList.add("correct"); });
    fb.textContent = `✗ Answer: "${qzCurrent.correctText}".`;
    fb.className = "check-feedback bad";
    qzMissed.push({
      prompt: qzCurrent.prompt,
      correct: qzCurrent.correctText,
      chosen: chosenText,
      explain: qzCurrent.explain,
    });
  }
  // always show the explain line so review is productive
  const explain = document.getElementById("quiz-mc-explain");
  if (qzCurrent.explain){
    explain.textContent = qzCurrent.explain;
    explain.style.display = "block";
  }
  qzIdx += 1;
  updateQuizProgress();
  const nextBtn = document.getElementById("quiz-mc-next");
  nextBtn.textContent = (qzIdx >= qzTotal) ? "see results →" : "next →";
  nextBtn.style.display = "inline-block";
}

function endQuiz(){
  document.getElementById("quiz-session").style.display = "none";
  document.getElementById("quiz-done").style.display    = "block";

  const pct = qzTotal ? Math.round(100 * qzRight / qzTotal) : 0;
  const icon = document.getElementById("quiz-done-icon");
  icon.textContent = pct >= 80 ? "A" : pct >= 65 ? "B" : pct >= 50 ? "C" : "?";

  document.getElementById("quiz-done-title").textContent = pct >= 80 ? "Strong pass." : pct >= 50 ? "Not bad — review misses below." : "Keep studying.";
  document.getElementById("quiz-done-txt").textContent   = `${qzDiff} · ${qzRight} / ${qzTotal} correct`;

  const slip = document.getElementById("quiz-score-slip");
  slip.textContent = `score: ${qzRight} / ${qzTotal} (${pct}%)`;

  const missedWrap = document.getElementById("quiz-missed-wrap");
  const missedList = document.getElementById("quiz-missed-list");
  missedList.innerHTML = "";
  if (qzMissed.length){
    qzMissed.forEach(m => {
      const li = document.createElement("li");
      const q  = document.createElement("div"); q.className = "qm-q"; q.textContent = m.prompt;
      const a  = document.createElement("div"); a.className = "qm-a";
      a.innerHTML = `you said: "${m.chosen}" · correct: <strong>${m.correct}</strong>`;
      li.appendChild(q); li.appendChild(a);
      if (m.explain){
        const ex = document.createElement("div");
        ex.style.fontFamily = "'IBM Plex Mono',monospace";
        ex.style.fontSize = "12px";
        ex.style.color = "var(--pencil)";
        ex.style.marginTop = "4px";
        ex.textContent = m.explain;
        li.appendChild(ex);
      }
      missedList.appendChild(li);
    });
    missedWrap.style.display = "block";
  } else {
    missedWrap.style.display = "none";
  }
}

document.querySelectorAll(".diff-btn").forEach(b => {
  b.addEventListener("click", () => startQuiz(b.dataset.diff));
});
document.getElementById("quiz-mc-next").addEventListener("click", serveQuiz);
document.getElementById("quiz-restart").addEventListener("click", () => {
  document.getElementById("quiz-done").style.display  = "none";
  document.getElementById("quiz-start").style.display = "block";
});
document.getElementById("quiz-quit").addEventListener("click", () => {
  if (!confirm("Quit this quiz? Progress will be lost.")) return;
  document.getElementById("quiz-session").style.display = "none";
  document.getElementById("quiz-start").style.display   = "block";
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
   DEFINITIONS — glossary with filter + search
   ========================================================= */
const CAT_ORDER = ["Application Setup", "Content & Rules", "Modules", "Operations"];
let defFilter = "all";
let defQuery  = "";

function renderDefs(){
  const list = document.getElementById("def-list");
  list.innerHTML = "";
  const q = defQuery.trim().toLowerCase();
  const pool = CARDS.filter(c => defFilter === "all" || c.cat === defFilter);
  const cats = defFilter === "all" ? CAT_ORDER : [defFilter];
  let shown = 0;
  let idx = 0;

  cats.forEach(cat => {
    const items = pool.filter(c => c.cat === cat);
    const visible = items.filter(c => {
      if (!q) return true;
      return (c.term + " " + c.def + " " + (c.hint || "")).toLowerCase().includes(q);
    });
    if (!visible.length) return;
    const group = document.createElement("div");
    group.className = "def-group";
    const h = document.createElement("h3");
    h.className = "def-group-h";
    h.textContent = cat + " — " + visible.length;
    group.appendChild(h);

    visible.forEach(c => {
      const globalIdx = CARDS.indexOf(c) + 1;
      const item = document.createElement("div");
      item.className = "def-item";
      item.innerHTML = `
        <div class="def-row-top">
          <span class="def-num">${String(globalIdx).padStart(2,"0")}</span>
          <span class="def-term">${c.term}</span>
          <span class="def-cat-badge ${catClass(c.cat)}">${c.cat}</span>
        </div>
        <p class="def-def">${c.def}</p>
        ${c.hint ? `<button class="def-hint-toggle" type="button">show hint ▾</button>
        <div class="def-hint">${c.hint}</div>` : ""}
      `;
      if (c.hint){
        const btn = item.querySelector(".def-hint-toggle");
        const hint = item.querySelector(".def-hint");
        btn.addEventListener("click", () => {
          const open = hint.classList.toggle("open");
          btn.textContent = open ? "hide hint ▴" : "show hint ▾";
        });
      }
      group.appendChild(item);
      shown++;
      idx++;
    });
    list.appendChild(group);
  });

  if (!shown){
    const empty = document.createElement("div");
    empty.className = "def-empty";
    empty.textContent = "no terms match that search";
    list.appendChild(empty);
  }

  const total = defFilter === "all" ? CARDS.length : CARDS.filter(c => c.cat === defFilter).length;
  document.getElementById("def-count").textContent = q
    ? `${shown} / ${total} shown`
    : `${total} term${total === 1 ? "" : "s"}`;
}

document.querySelectorAll('input[name="dfilter"]').forEach(r => {
  r.addEventListener("change", () => {
    if (r.checked){ defFilter = r.value; renderDefs(); }
  });
});
document.getElementById("def-search").addEventListener("input", (e) => {
  defQuery = e.target.value;
  renderDefs();
});
renderDefs();

/* =========================================================
   ESSAYS — accordion
   ========================================================= */
function renderEssays(){
  const list = document.getElementById("essay-list");
  list.innerHTML = "";
  ESSAYS.forEach((e, i) => {
    const item = document.createElement("div");
    item.className = "essay-item";
    const head = document.createElement("button");
    head.className = "essay-head";
    head.innerHTML = `
      <span class="essay-num">${String(i+1).padStart(2,"0")}</span>
      <span class="essay-q">${e.q}</span>
      <span class="essay-toggle">show hint ▾</span>
    `;
    const body = document.createElement("div");
    body.className = "essay-body";
    const hint = document.createElement("div");
    hint.className = "essay-hint";
    hint.textContent = e.hint;
    body.appendChild(hint);
    head.addEventListener("click", () => {
      const open = body.classList.toggle("open");
      head.querySelector(".essay-toggle").textContent = open ? "hide hint ▴" : "show hint ▾";
    });
    item.appendChild(head);
    item.appendChild(body);
    list.appendChild(item);
  });
}
renderEssays();
