/* =====================================================================
   deutsch.lab — interactions
   ===================================================================== */

/* ---------- tab switching ---------- */
const tabs = document.querySelectorAll('.file-tabs .tab');
const sheets = document.querySelectorAll('.sheet');
tabs.forEach(t => {
  if (t.dataset.target === 'home') return;
  t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('tab--active'));
    sheets.forEach(s => s.classList.remove('sheet--active'));
    t.classList.add('tab--active');
    const sec = document.getElementById(t.dataset.target);
    if (sec) sec.classList.add('sheet--active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

document.addEventListener('keydown', e => {
  if (e.target.matches('input, textarea')) return;
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.key === 'ArrowRight' && !isCardsActive()) cycleTab(1);
  else if (e.key === 'ArrowLeft' && !isCardsActive()) cycleTab(-1);
});
function cycleTab(dir){
  const navTabs = [...tabs].filter(t => t.dataset.target !== 'home');
  const active = document.querySelector('.tab--active');
  const i = navTabs.indexOf(active);
  const next = (i + dir + navTabs.length) % navTabs.length;
  navTabs[next].click();
}
function isCardsActive(){ return document.getElementById('cards').classList.contains('sheet--active'); }

/* =========================== FLASHCARDS =========================== */
let currentDeck = 'all';
let cardOrder = [];
let cardIdx = 0;
const cardFront = document.getElementById('card-front');
const cardBack  = document.getElementById('card-back');
const cardTag   = document.getElementById('card-tag');
const cardNote  = document.getElementById('card-note');
const cardEl    = document.getElementById('flashcard');
const cardCounter = document.getElementById('card-counter');
const weights = JSON.parse(localStorage.getItem('deutsch.card.weights') || '{}');

function filterPool(filter){
  if (filter === 'all') return CARDS;
  if (filter === 'GR' || filter === 'VO') return CARDS.filter(c => c.type === filter);
  return CARDS.filter(c => c.ch === filter);
}

function buildDeck(){
  const pool = filterPool(currentDeck);
  const seq = [];
  pool.forEach(c => {
    const key = c.ch + ':' + c.front;
    const w = weights[key] || 1;
    for (let k = 0; k < w; k++) seq.push(c);
  });
  for (let i = seq.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [seq[i], seq[j]] = [seq[j], seq[i]];
  }
  cardOrder = seq;
  cardIdx = 0;
  showCard();
}

function showCard(){
  cardEl.classList.remove('flipped');
  if (!cardOrder.length) {
    cardFront.textContent = 'empty deck';
    cardBack.textContent  = '';
    cardTag.style.display = 'none';
    cardNote.textContent = '';
    cardCounter.textContent = '0 / 0';
    return;
  }
  const c = cardOrder[cardIdx];
  cardFront.textContent = c.front;
  cardBack.textContent  = c.back;
  cardTag.textContent   = c.ch + ' · ' + (c.type === 'GR' ? 'grammar' : 'vocab');
  cardTag.style.display = 'inline-block';
  cardNote.textContent  = c.note || '';
  cardCounter.textContent = `${cardIdx + 1} / ${cardOrder.length}`;
}

document.querySelectorAll('input[name="deck"]').forEach(r => {
  r.addEventListener('change', () => { currentDeck = r.value; buildDeck(); });
});
document.getElementById('shuffle').addEventListener('click', buildDeck);
document.getElementById('flip-card').addEventListener('click', () => cardEl.classList.toggle('flipped'));
cardEl.addEventListener('click', () => cardEl.classList.toggle('flipped'));
document.getElementById('prev-card').addEventListener('click', () => {
  if (!cardOrder.length) return;
  cardIdx = (cardIdx - 1 + cardOrder.length) % cardOrder.length;
  showCard();
});
document.getElementById('next-card').addEventListener('click', () => {
  if (!cardOrder.length) return;
  cardIdx = (cardIdx + 1) % cardOrder.length;
  showCard();
});
document.getElementById('knew').addEventListener('click', () => {
  if (!cardOrder.length) return;
  const c = cardOrder[cardIdx];
  const key = c.ch + ':' + c.front;
  weights[key] = Math.max(1, (weights[key] || 1) - 1);
  localStorage.setItem('deutsch.card.weights', JSON.stringify(weights));
  advance();
});
document.getElementById('missed').addEventListener('click', () => {
  if (!cardOrder.length) return;
  const c = cardOrder[cardIdx];
  const key = c.ch + ':' + c.front;
  weights[key] = Math.min(5, (weights[key] || 1) + 2);
  localStorage.setItem('deutsch.card.weights', JSON.stringify(weights));
  advance();
});
function advance(){ cardIdx = (cardIdx + 1) % cardOrder.length; showCard(); }

document.addEventListener('keydown', e => {
  if (!isCardsActive()) return;
  if (e.target.matches('input, textarea')) return;
  if (e.key === ' ') { e.preventDefault(); cardEl.classList.toggle('flipped'); }
  else if (e.key === 'ArrowRight') { advance(); }
  else if (e.key === 'ArrowLeft')  {
    cardIdx = (cardIdx - 1 + cardOrder.length) % cardOrder.length;
    showCard();
  }
  else if (e.key.toLowerCase() === 'k') { document.getElementById('knew').click(); }
  else if (e.key.toLowerCase() === 'd') { document.getElementById('missed').click(); }
});

buildDeck();

/* ============================= LEARN ============================= */
let learnFilter = 'all';
let learnItems = [];
let learnQueue = [];
let learnCurrent = null;
let learnAnswered = false;
let learnMastered = 0;

document.querySelectorAll('input[name="lfilter"]').forEach(r => {
  r.addEventListener('change', () => { learnFilter = r.value; });
});

document.getElementById('learn-start-btn').addEventListener('click', startLearn);
document.getElementById('learn-restart').addEventListener('click', () => {
  document.getElementById('learn-done').style.display = 'none';
  document.getElementById('learn-start').style.display = 'block';
});

function startLearn(){
  const src = filterPool(learnFilter);
  if (!src.length) return;
  learnItems = src.map(c => ({ card:c, stage:0, mastered:false }));
  for (let i = learnItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [learnItems[i], learnItems[j]] = [learnItems[j], learnItems[i]];
  }
  learnQueue = [...learnItems];
  learnMastered = 0;
  document.getElementById('learn-start').style.display = 'none';
  document.getElementById('learn-done').style.display = 'none';
  document.getElementById('learn-session').style.display = 'block';
  updateLearnProg();
  serveLearn();
}

function updateLearnProg(){
  const t = learnItems.length;
  const pct = t ? Math.round(learnMastered / t * 100) : 0;
  document.getElementById('learn-prog-fill').style.width = pct + '%';
  document.getElementById('learn-prog-txt').textContent = learnMastered + ' / ' + t + ' mastered';
}

function serveLearn(){
  if (!learnQueue.length) {
    if (learnItems.every(x => x.mastered)) { endLearn(); return; }
    learnQueue = learnItems.filter(x => !x.mastered);
    for (let i = learnQueue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [learnQueue[i], learnQueue[j]] = [learnQueue[j], learnQueue[i]];
    }
  }
  learnCurrent = learnQueue.shift();
  learnAnswered = false;
  if (learnCurrent.stage === 0) showLearnMC(); else showLearnWrite();
}

function showLearnMC(){
  document.getElementById('learn-mc').style.display = 'block';
  document.getElementById('learn-write').style.display = 'none';
  const c = learnCurrent.card;
  document.getElementById('learn-mc-ch').textContent = c.ch + ' · ' + (c.type === 'GR' ? 'grammar' : 'vocab');
  document.getElementById('learn-mc-q').textContent = c.front;
  const others = CARDS.filter(x => x.back !== c.back);
  const wrongs = [];
  while (wrongs.length < 3 && others.length > wrongs.length) {
    const r = others[Math.floor(Math.random() * others.length)];
    if (!wrongs.find(w => w.back === r.back)) wrongs.push(r);
  }
  const opts = [c, ...wrongs].sort(() => Math.random() - 0.5);
  const div = document.getElementById('learn-mc-opts');
  div.innerHTML = '';
  opts.forEach(o => {
    const b = document.createElement('button');
    b.className = 'learn-opt';
    b.textContent = o.back;
    b.onclick = () => checkMC(b, o.back === c.back, c.back);
    div.appendChild(b);
  });
  const fb = document.getElementById('learn-mc-fb');
  fb.className = 'check-feedback';
  fb.textContent = '';
  document.getElementById('learn-mc-next').style.display = 'none';
}

function checkMC(btn, correct, right){
  if (learnAnswered) return;
  learnAnswered = true;
  document.querySelectorAll('#learn-mc-opts .learn-opt').forEach(b => {
    if (b.textContent === right) b.classList.add(correct ? 'correct' : 'reveal');
  });
  const fb = document.getElementById('learn-mc-fb');
  if (correct) {
    btn.classList.add('correct');
    learnCurrent.stage = 1;
    fb.className = 'check-feedback ok';
    fb.textContent = '✓ richtig. Jetzt bitte eintippen.';
  } else {
    btn.classList.add('wrong');
    learnQueue.push(learnCurrent);
    fb.className = 'check-feedback bad';
    fb.textContent = '✗ falsch — richtig: ' + right + '. Card kommt zurück.';
  }
  document.getElementById('learn-mc-next').style.display = 'inline-block';
}

document.getElementById('learn-mc-next').addEventListener('click', serveLearn);

function showLearnWrite(){
  document.getElementById('learn-mc').style.display = 'none';
  document.getElementById('learn-write').style.display = 'block';
  const c = learnCurrent.card;
  document.getElementById('learn-wr-ch').textContent = c.ch + ' · ' + (c.type === 'GR' ? 'grammar' : 'vocab');
  document.getElementById('learn-wr-q').textContent = c.front;
  const inp = document.getElementById('learn-wr-input');
  inp.value = '';
  inp.style.borderColor = '';
  const fb = document.getElementById('learn-wr-fb');
  fb.className = 'check-feedback';
  fb.textContent = '';
  document.getElementById('learn-wr-next').style.display = 'none';
  setTimeout(() => inp.focus(), 50);
}

document.getElementById('learn-wr-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') checkWrite();
});
document.getElementById('learn-wr-check').addEventListener('click', checkWrite);
document.getElementById('learn-wr-skip').addEventListener('click', () => {
  learnQueue.push(learnCurrent);
  serveLearn();
});
document.getElementById('learn-wr-next').addEventListener('click', serveLearn);

function checkWrite(){
  if (learnAnswered) return;
  const inp = document.getElementById('learn-wr-input');
  const typed = normAns(inp.value);
  const right = normAns(learnCurrent.card.back);
  const core  = normAns(learnCurrent.card.back.replace(/\(.*?\)/g, ''));
  // Accept any comma/slash-separated alternative (but require the
  // typed answer to BE that alternative, not merely contain it).
  const alts = new Set();
  core.split(/\s*[,/]\s*/).forEach(a => { if (a) alts.add(a.trim()); });
  alts.add(right);
  alts.add(core);
  const ok = !!typed && alts.has(typed);
  learnAnswered = true;
  const fb = document.getElementById('learn-wr-fb');
  if (ok) {
    learnCurrent.mastered = true;
    learnMastered++;
    inp.style.borderColor = 'var(--olive)';
    fb.className = 'check-feedback ok';
    fb.textContent = '✓ richtig. Karte gemeistert.';
    updateLearnProg();
  } else {
    learnCurrent.stage = 0;
    learnQueue.push(learnCurrent);
    inp.style.borderColor = 'var(--red)';
    fb.className = 'check-feedback bad';
    fb.textContent = '✗ Antwort: ' + learnCurrent.card.back + '. Card kommt zurück.';
  }
  document.getElementById('learn-wr-next').style.display = 'inline-block';
}

function endLearn(){
  document.getElementById('learn-session').style.display = 'none';
  document.getElementById('learn-done').style.display = 'block';
  document.getElementById('learn-done-txt').textContent =
    'Du hast alle ' + learnItems.length + ' Karten gemeistert. Viel Erfolg auf der Prüfung!';
}

/* ============================= QUIZ ============================= */
const quizArea = document.getElementById('quiz-area');
const quizScore = document.getElementById('quiz-score');

function renderQuiz(setKey){
  const items = (setKey === 'all') ? QUIZ : QUIZ.filter(q => q.set === setKey);
  quizArea.innerHTML = items.map((q, idx) => renderQuizItem(q, idx)).join('');
  quizScore.classList.add('hidden');

  quizArea.querySelectorAll('.q-submit').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      gradeOne(items[id], id);
    });
  });

  const gradeAll = document.createElement('button');
  gradeAll.className = 'mini-btn';
  gradeAll.textContent = 'grade all';
  gradeAll.style.marginBottom = '20px';
  gradeAll.addEventListener('click', () => {
    let correct = 0;
    items.forEach((q, i) => { if (gradeOne(q, i)) correct++; });
    quizScore.classList.remove('hidden');
    const total = items.length;
    quizScore.innerHTML = `grade: <b>${correct} / ${total}</b> · ${Math.round(100*correct/total)}%<br>
      <span style="font-family:'IBM Plex Mono',monospace;font-size:13px;color:var(--pencil)">
      red = missed — reread the explanations under each item.</span>`;
    quizScore.scrollIntoView({ behavior: 'smooth' });
  });
  quizArea.prepend(gradeAll);
}

function renderQuizItem(q, id){
  const name = `q-${id}`;
  let opts;
  if (q.type === 'multi') {
    opts = q.opts.map((o,i) => `
      <label><input type="checkbox" name="${name}" value="${i}"> ${escapeHtml(o)}</label>
    `).join('');
  } else {
    opts = q.opts.map((o,i) => `
      <label><input type="radio" name="${name}" value="${i}"> ${escapeHtml(o)}</label>
    `).join('');
  }
  return `
    <div class="q-item" id="q-item-${id}">
      <div class="q-head">
        <span class="q-tag">${escapeHtml(q.tag)}</span>
        <span>Q${id + 1}</span>
      </div>
      <div class="q-prompt">${escapeHtml(q.q)}</div>
      <div class="q-opts">${opts}</div>
      <button class="mini-btn q-submit" data-id="${id}" style="margin-top:10px">submit</button>
      <div class="q-feedback" id="q-fb-${id}"></div>
      <div class="q-explain" id="q-ex-${id}" style="display:none">${escapeHtml(q.explain || '')}</div>
    </div>
  `;
}

function gradeOne(q, id){
  const fb = document.getElementById('q-fb-' + id);
  const ex = document.getElementById('q-ex-' + id);
  let correct = false;

  if (q.type === 'multi') {
    const picked = [...document.querySelectorAll(`input[name="q-${id}"]:checked`)]
      .map(x => parseInt(x.value, 10)).sort((a,b)=>a-b);
    const want = [...q.a].sort((a,b)=>a-b);
    correct = picked.length === want.length && picked.every((v,i) => v === want[i]);
  } else {
    const p = document.querySelector(`input[name="q-${id}"]:checked`);
    if (p) correct = parseInt(p.value, 10) === q.a;
  }

  fb.className = 'q-feedback show ' + (correct ? 'ok' : 'bad');
  fb.textContent = correct ? '✓ richtig' : '✗ falsch';
  ex.style.display = 'block';
  return correct;
}

document.querySelectorAll('.quiz-picker .tabline').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.quiz-picker .tabline').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    renderQuiz(b.dataset.qset);
  });
});
document.querySelector('.quiz-picker .tabline[data-qset="all"]').classList.add('active');
renderQuiz('all');

/* ============================= GRAMMAR ============================= */
const grammarList = document.getElementById('grammar-list');
grammarList.innerHTML = GRAMMAR.map(g => {
  const header = g.rows[0];
  const body = g.rows.slice(1);
  return `
    <div class="gr-block">
      <div class="gr-title">${escapeHtml(g.title)}</div>
      ${g.sub ? `<div class="gr-sub">${escapeHtml(g.sub)}</div>` : ''}
      <table>
        <tr>${header.map(h => `<th>${escapeHtml(h)}</th>`).join('')}</tr>
        ${body.map(row => `<tr>${row.map((cell, i) => {
          // highlight first column of header-like tables, and middle columns that look like forms
          const isHl = i > 0 && cell && /^[-a-zäöüßA-ZÄÖÜ]{1,20}$/.test(cell) && !/ /.test(cell);
          const isEx = cell && / /.test(cell) && /[.!?]/.test(cell);
          const cls = isEx ? 'ex' : (isHl && i === 1 ? 'hl' : '');
          return `<td${cls ? ` class="${cls}"` : ''}>${escapeHtml(cell)}</td>`;
        }).join('')}</tr>`).join('')}
      </table>
    </div>
  `;
}).join('');

/* ============================= VOCAB ============================= */
const vocabGrid = document.getElementById('vocab-grid');
const vocabSearch = document.getElementById('vocab-search');
let vocabFilter = 'all';

function renderVocab(){
  const f = (vocabSearch.value || '').trim().toLowerCase();
  const items = VOCAB.filter(v => {
    if (vocabFilter !== 'all' && v.ch !== vocabFilter) return false;
    if (!f) return true;
    return v.de.toLowerCase().includes(f) ||
           v.en.toLowerCase().includes(f) ||
           (v.note || '').toLowerCase().includes(f);
  });
  vocabGrid.innerHTML = items.map(v => `
    <div class="vocab-card">
      <div class="vocab-de">${escapeHtml(v.de)}</div>
      <div class="vocab-en">${escapeHtml(v.en)}</div>
      ${v.note ? `<div class="vocab-note">${escapeHtml(v.note)}</div>` : ''}
    </div>
  `).join('');
}
document.querySelectorAll('input[name="vfilter"]').forEach(r => {
  r.addEventListener('change', () => { vocabFilter = r.value; renderVocab(); });
});
vocabSearch.addEventListener('input', renderVocab);
renderVocab();

/* ============================= K8 ============================= */
const k8 = document.getElementById('k8-content');
k8.innerHTML = K8_SECTIONS.map(s => `
  <div class="k8-section">
    <h3>${escapeHtml(s.title)}</h3>
    <div class="k8-grid">
      ${s.items.map(it => `
        <div class="k8-item${s.flavor === 'purple' ? ' purple' : ''}">
          <div class="k8-de">${escapeHtml(it.de)}</div>
          <div class="k8-en">${escapeHtml(it.en)}</div>
          ${it.note ? `<div class="k8-note">${escapeHtml(it.note)}</div>` : ''}
        </div>
      `).join('')}
    </div>
  </div>
`).join('');

/* ============================= MATCH ============================= */
const MATCH_PAIRS = 6;
let matchFilter = 'all';
let matchState = null;
let matchTimerId = null;
const MATCH_BEST_KEY = 'deutsch.match.best';
const matchBest = JSON.parse(localStorage.getItem(MATCH_BEST_KEY) || '{}');

function matchPool(filter){
  if (filter === 'all') return CARDS;
  if (filter === 'VO')  return CARDS.filter(c => c.type === 'VO');
  return CARDS.filter(c => c.ch === filter);
}
function shuffledCopy(a){
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

function startMatch(){
  clearInterval(matchTimerId);
  const pool = matchPool(matchFilter);
  if (pool.length < MATCH_PAIRS){
    document.getElementById('match-grid').innerHTML =
      `<div style="grid-column:1/-1;font-family:'IBM Plex Mono',monospace;font-size:13px;color:var(--pencil)">Not enough cards in this filter — pick another.</div>`;
    document.getElementById('match-pairs').textContent = `0 / ${MATCH_PAIRS}`;
    document.getElementById('match-time').textContent = '0.0s';
    return;
  }
  const picks = shuffledCopy(pool).slice(0, MATCH_PAIRS);
  const tiles = [];
  picks.forEach((c, i) => {
    tiles.push({ id:'t'+i, pair:i, kind:'term', text:c.front });
    tiles.push({ id:'d'+i, pair:i, kind:'def',  text:c.back  });
  });
  matchState = {
    tiles: shuffledCopy(tiles),
    selected: null,
    solved: 0,
    start: performance.now(),
    finished: false,
  };
  document.getElementById('match-pairs').textContent = `0 / ${MATCH_PAIRS}`;
  document.getElementById('match-win').classList.remove('show');
  document.getElementById('match-best').textContent = matchBest[matchFilter]
    ? matchBest[matchFilter].toFixed(1) + 's'
    : '—';
  renderMatch();
  matchTimerId = setInterval(() => {
    if (!matchState || matchState.finished) return;
    const t = (performance.now() - matchState.start) / 1000;
    document.getElementById('match-time').textContent = t.toFixed(1) + 's';
  }, 100);
}
function renderMatch(){
  const grid = document.getElementById('match-grid');
  grid.innerHTML = '';
  matchState.tiles.forEach(t => {
    const b = document.createElement('button');
    b.className = 'match-tile' + (t.kind === 'term' ? ' is-term' : '');
    b.dataset.id = t.id;
    b.dataset.pair = t.pair;
    b.textContent = t.text;
    b.addEventListener('click', () => onMatchClick(b, t));
    grid.appendChild(b);
  });
}
function onMatchClick(btn, tile){
  if (btn.classList.contains('correct')) return;
  if (matchState.selected && matchState.selected.btn === btn){
    btn.classList.remove('selected');
    matchState.selected = null;
    return;
  }
  if (!matchState.selected){
    btn.classList.add('selected');
    matchState.selected = { btn, tile };
    return;
  }
  const prev = matchState.selected;
  matchState.selected = null;
  if (prev.tile.pair === tile.pair && prev.tile.kind !== tile.kind){
    prev.btn.classList.remove('selected');
    prev.btn.classList.add('correct');
    btn.classList.add('correct');
    matchState.solved += 1;
    document.getElementById('match-pairs').textContent = `${matchState.solved} / ${MATCH_PAIRS}`;
    if (matchState.solved === MATCH_PAIRS) finishMatch();
  } else {
    prev.btn.classList.remove('selected');
    btn.classList.add('wrong');
    prev.btn.classList.add('wrong');
    setTimeout(() => {
      btn.classList.remove('wrong');
      prev.btn.classList.remove('wrong');
    }, 350);
  }
}
function finishMatch(){
  matchState.finished = true;
  clearInterval(matchTimerId);
  const t = (performance.now() - matchState.start) / 1000;
  document.getElementById('match-time').textContent = t.toFixed(1) + 's';
  const win = document.getElementById('match-win');
  const prev = matchBest[matchFilter];
  let msg = `✓ all 6 matched in ${t.toFixed(1)}s`;
  if (!prev || t < prev){
    matchBest[matchFilter] = t;
    localStorage.setItem(MATCH_BEST_KEY, JSON.stringify(matchBest));
    document.getElementById('match-best').textContent = t.toFixed(1) + 's';
    msg += ' — neue Bestzeit!';
  }
  win.textContent = msg;
  win.classList.add('show');
}
document.querySelectorAll('input[name="mfilter"]').forEach(r => {
  r.addEventListener('change', () => { matchFilter = r.value; startMatch(); });
});
document.getElementById('match-new').addEventListener('click', startMatch);
startMatch();

/* ============================= DRILLS ============================= */
const drillPicker = document.getElementById('drill-picker');
drillPicker.querySelectorAll('.tabline').forEach(b => {
  b.addEventListener('click', () => {
    drillPicker.querySelectorAll('.tabline').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    const tgt = b.dataset.drill;
    document.getElementById('drill-conjugate').style.display = (tgt === 'conjugate') ? 'block' : 'none';
    document.getElementById('drill-lucken').style.display    = (tgt === 'lucken')    ? 'block' : 'none';
  });
});

/* ---------- Conjugate ---------- */
let cjPool = [];
let cjCurrent = null;
let cjChFilter = 'all';
let cjForm = 'pret';
let cjStreak = 0;
let cjRight = 0;
let cjAsked = 0;
let cjAnswered = false;

function cjBuildPool(){
  cjPool = (cjChFilter === 'all') ? VERBS.slice() : VERBS.filter(v => v.ch === cjChFilter);
}
function cjPickForm(){
  if (cjForm !== 'mixed') return cjForm;
  const forms = ['pret','part','aux','perfekt'];
  return forms[Math.floor(Math.random() * forms.length)];
}
function cjServe(){
  if (!cjPool.length) cjBuildPool();
  if (!cjPool.length) return;
  cjCurrent = { verb: cjPool[Math.floor(Math.random() * cjPool.length)], form: cjPickForm() };
  cjAnswered = false;
  const v = cjCurrent.verb;
  const labels = {
    pret:    'type the Präteritum (3.Sg.)',
    part:    'type the Partizip II',
    aux:     'type the auxiliary (haben or sein)',
    perfekt: 'type the Perfekt (aux + Partizip II)',
  };
  document.getElementById('cj-task').textContent   = labels[cjCurrent.form];
  document.getElementById('cj-prompt').textContent = `${v.inf} — ${v.en}`;
  const inp = document.getElementById('cj-input');
  inp.value = ''; inp.style.borderColor = '';
  const fb = document.getElementById('cj-fb');
  fb.className = 'check-feedback'; fb.textContent = '';
  const ex = document.getElementById('cj-explain');
  ex.style.display = 'none'; ex.textContent = '';
  setTimeout(() => inp.focus(), 40);
}
function cjExpected(){
  const v = cjCurrent.verb;
  switch (cjCurrent.form){
    case 'pret':    return [v.pret];
    case 'part':    return [v.part];
    case 'aux':     return [v.aux];
    case 'perfekt': return [`${v.aux} ${v.part}`, `${v.aux} + ${v.part}`];
  }
}
function cjCheck(){
  if (cjAnswered || !cjCurrent) return;
  const typed = normAns(document.getElementById('cj-input').value);
  if (!typed) return;
  const expected = cjExpected().map(normAns);
  const ok = expected.includes(typed);
  cjAnswered = true;
  cjAsked += 1;
  const fb = document.getElementById('cj-fb');
  const ex = document.getElementById('cj-explain');
  if (ok){
    cjStreak += 1; cjRight += 1;
    fb.className = 'check-feedback ok';
    fb.textContent = '✓ richtig';
    document.getElementById('cj-input').style.borderColor = 'var(--olive)';
  } else {
    cjStreak = 0;
    fb.className = 'check-feedback bad';
    fb.textContent = '✗ Antwort: ' + cjExpected()[0];
    document.getElementById('cj-input').style.borderColor = 'var(--red)';
  }
  const v = cjCurrent.verb;
  ex.textContent = `${v.inf} → ${v.pret} · ${v.part} · aux: ${v.aux}`;
  ex.style.display = 'block';
  document.getElementById('cj-streak').textContent = 'streak: ' + cjStreak;
  document.getElementById('cj-score').textContent  = `score: ${cjRight} / ${cjAsked}`;
}
function cjReveal(){
  if (!cjCurrent) return;
  document.getElementById('cj-input').value = cjExpected()[0];
  cjCheck();
}

document.querySelectorAll('input[name="cjch"]').forEach(r => {
  r.addEventListener('change', () => { cjChFilter = r.value; cjBuildPool(); cjServe(); });
});
document.querySelectorAll('input[name="cjform"]').forEach(r => {
  r.addEventListener('change', () => { cjForm = r.value; cjServe(); });
});
document.getElementById('cj-check').addEventListener('click', cjCheck);
document.getElementById('cj-next').addEventListener('click', cjServe);
document.getElementById('cj-skip').addEventListener('click', () => { cjStreak = 0; cjServe(); });
document.getElementById('cj-hint').addEventListener('click', cjReveal);
document.getElementById('cj-input').addEventListener('keydown', e => {
  if (e.key === 'Enter'){ cjAnswered ? cjServe() : cjCheck(); }
});
cjBuildPool();
cjServe();

/* ---------- Lücken ---------- */
let lkPool = [];
let lkCurrent = null;
let lkChFilter = 'all';
let lkStreak = 0;
let lkRight = 0;
let lkAsked = 0;
let lkAnswered = false;

function lkBuildPool(){
  lkPool = (lkChFilter === 'all') ? LUCKEN.slice() : LUCKEN.filter(x => x.ch === lkChFilter);
}
function lkServe(){
  if (!lkPool.length) lkBuildPool();
  if (!lkPool.length) return;
  lkCurrent = lkPool[Math.floor(Math.random() * lkPool.length)];
  lkAnswered = false;
  document.getElementById('lk-tag').textContent      = lkCurrent.ch + ' · ' + lkCurrent.tag;
  document.getElementById('lk-sentence').textContent = lkCurrent.sentence;
  const inp = document.getElementById('lk-input');
  inp.value = ''; inp.style.borderColor = '';
  const fb = document.getElementById('lk-fb');       fb.className = 'check-feedback'; fb.textContent = '';
  const ex = document.getElementById('lk-explain');  ex.style.display = 'none'; ex.textContent = '';
  const hn = document.getElementById('lk-hint');     hn.style.display = 'none'; hn.textContent = '';
  setTimeout(() => inp.focus(), 40);
}
function lkAccepted(){
  const a = [lkCurrent.answer, ...(lkCurrent.alts || [])];
  return a.map(normAns);
}
function lkCheck(){
  if (lkAnswered || !lkCurrent) return;
  const typed = normAns(document.getElementById('lk-input').value);
  if (!typed) return;
  const ok = lkAccepted().includes(typed);
  lkAnswered = true;
  lkAsked += 1;
  const fb = document.getElementById('lk-fb');
  const ex = document.getElementById('lk-explain');
  if (ok){
    lkStreak += 1; lkRight += 1;
    fb.className = 'check-feedback ok';
    fb.textContent = '✓ richtig';
    document.getElementById('lk-input').style.borderColor = 'var(--olive)';
  } else {
    lkStreak = 0;
    fb.className = 'check-feedback bad';
    fb.textContent = '✗ Antwort: ' + lkCurrent.answer;
    document.getElementById('lk-input').style.borderColor = 'var(--red)';
  }
  if (lkCurrent.explain){
    ex.textContent = lkCurrent.explain;
    ex.style.display = 'block';
  }
  document.getElementById('lk-streak').textContent = 'streak: ' + lkStreak;
  document.getElementById('lk-score').textContent  = `score: ${lkRight} / ${lkAsked}`;
}
function lkShowHint(){
  if (!lkCurrent || !lkCurrent.hint) return;
  const hn = document.getElementById('lk-hint');
  hn.textContent = 'hint: ' + lkCurrent.hint;
  hn.style.display = 'block';
}
document.querySelectorAll('input[name="lkch"]').forEach(r => {
  r.addEventListener('change', () => { lkChFilter = r.value; lkBuildPool(); lkServe(); });
});
document.getElementById('lk-check').addEventListener('click', lkCheck);
document.getElementById('lk-next').addEventListener('click', lkServe);
document.getElementById('lk-hint-btn').addEventListener('click', lkShowHint);
document.getElementById('lk-input').addEventListener('keydown', e => {
  if (e.key === 'Enter'){ lkAnswered ? lkServe() : lkCheck(); }
});
lkBuildPool();
lkServe();

/* ============================= util ============================= */
// Normalize answer for forgiving comparison: trim, lowercase, collapse
// whitespace, and fold common German umlaut ASCII substitutes.
function normAns(s){
  return (s ?? '').toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/ä/g, 'a').replace(/ae/g, 'a')
    .replace(/ö/g, 'o').replace(/oe/g, 'o')
    .replace(/ü/g, 'u').replace(/ue/g, 'u')
    .replace(/ß/g, 'ss');
}

function escapeHtml(s){
  return (s ?? '').toString()
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#39;');
}
