/* =========================================================
   pol500.lab — app.js
   flashcards · learn (MC) · match (timed) · essays
   ========================================================= */

const CAT_SLUG = {
  "Voting & Participation": "voting",
  "Ethnicity & Identity":   "ethnicity",
  "Parties & Systems":      "parties",
};
const catClass = c => "cat--" + (CAT_SLUG[c] || "parties");

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
const WEIGHT_KEY = "pol500.card.weights";
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
   LEARN (4-option MC, requeue misses)
   ========================================================= */
let lnQueue = [];
let lnMastered = new Set();
let lnTotal = 0;
let lnCurrent = null;

function pickDistractors(correct, pool, n){
  const others = pool.filter(c => c.term !== correct.term);
  // shuffle
  for (let i = others.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [others[i], others[j]] = [others[j], others[i]];
  }
  return others.slice(0, n);
}

function startLearn(){
  const filter = document.querySelector('input[name="lfilter"]:checked').value;
  const pool = filterCards(filter);
  lnQueue = pool.slice();
  // shuffle queue
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
    // requeue: insert 2-3 slots ahead
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
