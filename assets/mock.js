/* =========================================================
   rohan.lab — Mock Case Interview module
   Exposes: window.ChatLab.mock = { mount, unmount }
   Picker → stepper + chat → grade card. The same instance is used by the
   widget (stacked layout) and /chat.html (two-column on wide screens).
   ========================================================= */
(function(){
  "use strict";

  const BLOCKS = [
    { id: "clarify",    label: "Clarify",    full: "Clarifying Qs" },
    { id: "framework",  label: "Framework",  full: "Framework" },
    { id: "math",       label: "Math",       full: "Math & Exhibits" },
    { id: "brainstorm", label: "Brainstorm", full: "Brainstorming" },
    { id: "recommend",  label: "Recommend",  full: "Recommendation" },
  ];

  const MOCKS_LOG_KEY = "rohan.lab.mock.history"; // array of finished runs

  function mount(container, opts){
    if (!container) return null;
    const m = new MockRun(container, opts || {});
    m.begin();
    return m;
  }
  function unmount(instance){
    if (instance && typeof instance.teardown === "function") instance.teardown();
  }

  class MockRun {
    constructor(container, opts){
      this.root = container;
      this.tabId = opts.tabId || "consulting";
      this.tabLabel = opts.tabLabel || this.tabId;
      this.surface = opts.surface || "widget"; // "widget" | "page"
      this.onExit = typeof opts.onExit === "function" ? opts.onExit : () => {};
      this.streamClient = opts.streamClient || window.ChatLab?.client;

      this.allCases = [];
      this.filter = { type: "all", difficulty: "all" };
      this.selected = null;
      this.blockIdx = 0;
      this.messages = [];       // visible chat messages
      this.streaming = false;
      this.streamCtrl = null;
      this.phase = "loading";   // loading | picker | running | done
      this.grade = null;
    }

    async begin(){
      this.renderLoading();
      try {
        this.allCases = await loadCases(this.tabId);
      } catch (err) {
        this.renderError(err.message || String(err));
        return;
      }
      if (!this.allCases.length){
        this.renderError("no cases available for this tab — mock mode is built for Consulting cases.");
        return;
      }
      this.phase = "picker";
      this.renderPicker();
    }

    teardown(){
      if (this.streamCtrl) try { this.streamCtrl.abort(); } catch {}
      this.root.innerHTML = "";
      this.root.classList.remove("cw-mock--mounted");
    }

    /* ---------- screens ---------- */

    renderLoading(){
      this.root.innerHTML = `<div class="cw-mock-loading">loading cases…</div>`;
      this.root.classList.add("cw-mock--mounted");
    }

    renderError(msg){
      this.root.innerHTML = `
        <div class="cw-mock-err">${esc(msg)}</div>
        <div class="cw-mock-actions"><button class="cw-iconbtn" data-act="exit">back to chat</button></div>
      `;
      this.root.querySelector('[data-act="exit"]').addEventListener("click", () => this.onExit());
    }

    renderPicker(){
      const types = uniq(this.allCases.map(c => c.type)).filter(Boolean).sort();
      const diffs = ["1 / 1 / 1","2 / 1 / 1","2 / 1 / 2","2 / 2 / 1","2 / 2 / 2","2 / 2 / 3","2 / 3 / 1","2 / 3 / 2","3 / 2 / 3","3 / 3 / 2","3 / 3 / 3"]; // overall
      // Build a coarse difficulty bucket (overall star only) from case.difficulty like "2 / 2 / 3"
      const filtered = this.allCases.filter(c => {
        if (this.filter.type !== "all" && c.type !== this.filter.type) return false;
        if (this.filter.difficulty !== "all"){
          const overall = overallStar(c.difficulty);
          if (String(overall) !== this.filter.difficulty) return false;
        }
        return true;
      });

      const chip = (on, val, label, name) => `
        <button class="cw-mock-chip${on ? " cw-mock-chip--on" : ""}" data-${name}="${esc(val)}">${esc(label)}</button>`;

      this.root.innerHTML = `
        <div class="cw-mock-picker">
          <div class="cw-mock-hdrrow">
            <div class="cw-mock-h1">pick a case</div>
            <button class="cw-iconbtn cw-iconbtn--ghost" data-act="exit">back to chat</button>
          </div>

          <div class="cw-mock-section">
            <div class="cw-mock-lbl">case type</div>
            <div class="cw-mock-chiprow">
              ${chip(this.filter.type === "all", "all", `all (${this.allCases.length})`, "type")}
              ${types.map(t => chip(this.filter.type === t, t, `${t} (${countIn(this.allCases, "type", t)})`, "type")).join("")}
            </div>
          </div>

          <div class="cw-mock-section">
            <div class="cw-mock-lbl">difficulty (overall ★)</div>
            <div class="cw-mock-chiprow">
              ${chip(this.filter.difficulty === "all", "all", "any", "diff")}
              ${["1","2","3"].map(d => chip(this.filter.difficulty === d, d, `${d}★ (${countByOverall(this.allCases, d)})`, "diff")).join("")}
            </div>
          </div>

          <div class="cw-mock-section">
            <div class="cw-mock-lbl">${filtered.length} cases</div>
            <div class="cw-mock-caselist">
              <button class="cw-mock-case cw-mock-case--rand" data-rand>
                <span class="cw-mock-case-num">?</span>
                <span class="cw-mock-case-body">
                  <span class="cw-mock-case-title">random from filter</span>
                  <span class="cw-mock-case-meta">interviewer picks · you don't peek</span>
                </span>
              </button>
              ${filtered.map(c => `
                <button class="cw-mock-case" data-case="${esc(String(c.id))}">
                  <span class="cw-mock-case-num">${esc(String(c.id).padStart(2,"0"))}</span>
                  <span class="cw-mock-case-body">
                    <span class="cw-mock-case-title">${esc(c.title)}</span>
                    <span class="cw-mock-case-meta">${esc(c.industry || "")} · ${esc(c.type || "")} · ${esc(c.difficulty || "")}</span>
                  </span>
                </button>`).join("")}
            </div>
          </div>
        </div>
      `;

      this.root.querySelector('[data-act="exit"]').addEventListener("click", () => this.onExit());
      this.root.querySelectorAll('[data-type]').forEach(b => {
        b.addEventListener("click", () => { this.filter.type = b.dataset.type; this.renderPicker(); });
      });
      this.root.querySelectorAll('[data-diff]').forEach(b => {
        b.addEventListener("click", () => { this.filter.difficulty = b.dataset.diff; this.renderPicker(); });
      });
      this.root.querySelector('[data-rand]').addEventListener("click", () => {
        if (!filtered.length) return;
        const pick = filtered[Math.floor(Math.random() * filtered.length)];
        this.startCase(pick);
      });
      this.root.querySelectorAll('[data-case]').forEach(b => {
        b.addEventListener("click", () => {
          const id = b.dataset.case;
          const c = this.allCases.find(x => String(x.id) === id);
          if (c) this.startCase(c);
        });
      });
    }

    startCase(caseData){
      this.selected = caseData;
      this.blockIdx = 0;
      this.messages = [];
      this.grade = null;
      this.phase = "running";
      this.renderRun();
      // kick off the interviewer: send a starter user message to prompt the AI to open the case
      this.sendControl("Ready when you are — give me the prompt and open the first block.");
    }

    renderRun(){
      const c = this.selected;
      const blk = BLOCKS[this.blockIdx];
      const stepHTML = BLOCKS.map((b, i) => {
        const state = i < this.blockIdx ? "done" : i === this.blockIdx ? "active" : "todo";
        return `
          <div class="cw-mock-step cw-mock-step--${state}" data-step="${i}">
            <span class="cw-mock-step-n">${i+1}</span>
            <span class="cw-mock-step-lbl">${esc(b.label)}</span>
          </div>`;
      }).join('<span class="cw-mock-step-sep"></span>');

      this.root.innerHTML = `
        <div class="cw-mock-run cw-mock-run--${this.surface}">
          <div class="cw-mock-stepper">${stepHTML}</div>

          <div class="cw-mock-split">
            <aside class="cw-mock-casepane">
              <div class="cw-mock-case-hdr">
                <div class="cw-mock-case-hdr-num">#${esc(String(c.id))}</div>
                <div>
                  <div class="cw-mock-case-hdr-title">${esc(c.title)}</div>
                  <div class="cw-mock-case-hdr-meta">${esc(c.industry || "")} · ${esc(c.type || "")} · diff ${esc(c.difficulty || "")}</div>
                </div>
              </div>
              <div class="cw-mock-case-section">
                <div class="cw-mock-case-lbl">prompt</div>
                <div class="cw-mock-case-body">${esc(c.prompt)}</div>
              </div>
              <div class="cw-mock-case-section">
                <div class="cw-mock-case-lbl">current block</div>
                <div class="cw-mock-case-body"><b>${esc(blk.full)}</b></div>
              </div>
              <div class="cw-mock-case-section cw-mock-tips">
                <div class="cw-mock-case-lbl">tips</div>
                <ul class="cw-mock-tips-list">${tipsFor(blk.id).map(t => `<li>${esc(t)}</li>`).join("")}</ul>
              </div>
            </aside>

            <section class="cw-mock-chatpane">
              <div class="cw-mock-msgs" id="cw-mock-msgs"></div>
              <div class="cw-mock-input-row">
                <textarea class="cw-textarea" id="cw-mock-input" rows="1" placeholder="your answer to the interviewer…"></textarea>
                <button class="cw-send" id="cw-mock-send">send</button>
              </div>
              <div class="cw-mock-runbar">
                <button class="cw-iconbtn cw-iconbtn--ghost" data-act="exit">exit</button>
                <button class="cw-iconbtn" data-act="hint" title="ask for a nudge without giving the answer">?  hint</button>
                <span class="cw-mock-runbar-spacer"></span>
                <button class="cw-iconbtn${this.blockIdx === BLOCKS.length - 1 ? " cw-iconbtn--primary" : ""}" data-act="advance">
                  ${this.blockIdx === BLOCKS.length - 1 ? "finish & grade →" : `next: ${esc(BLOCKS[this.blockIdx+1].label)} →`}
                </button>
              </div>
            </section>
          </div>
        </div>
      `;
      this.root.classList.add("cw-mock--mounted");

      this.renderMessages();

      const send = () => this.onUserSend();
      const input = this.root.querySelector("#cw-mock-input");
      this.root.querySelector("#cw-mock-send").addEventListener("click", send);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey){ e.preventDefault(); send(); }
      });
      input.addEventListener("input", () => {
        input.style.height = "auto";
        input.style.height = Math.min(160, input.scrollHeight) + "px";
      });

      this.root.querySelector('[data-act="exit"]').addEventListener("click", () => {
        if (confirm("exit the mock? your progress will be discarded.")) this.onExit();
      });
      this.root.querySelector('[data-act="hint"]').addEventListener("click", () => this.requestHint());
      this.root.querySelector('[data-act="advance"]').addEventListener("click", () => this.advanceBlock());

      setTimeout(() => input.focus(), 50);
    }

    renderMessages(){
      const box = this.root.querySelector("#cw-mock-msgs");
      if (!box) return;
      box.innerHTML = "";
      this.messages.forEach(m => this.appendMsgEl(m.role, m.content, m.hidden));
      this.scrollMsgsBottom();
    }

    appendMsgEl(role, content, hidden){
      if (hidden) return null;  // control messages don't render
      const box = this.root.querySelector("#cw-mock-msgs");
      if (!box) return null;
      const wrap = document.createElement("div");
      wrap.className = "cw-msg cw-msg--" + (role === "user" ? "user" : (role === "error" ? "err" : "ai"));
      const roleTxt = role === "user" ? "you" : (role === "error" ? "error" : "interviewer");
      wrap.innerHTML = `<div class="cw-msg-role">${roleTxt}</div><div class="cw-msg-body"></div>`;
      wrap.querySelector(".cw-msg-body").textContent = content;
      box.appendChild(wrap);
      return wrap;
    }

    scrollMsgsBottom(){
      const box = this.root.querySelector("#cw-mock-msgs");
      if (box) box.scrollTop = box.scrollHeight;
    }

    /* ---------- conversation mechanics ---------- */

    pushVisible(role, content){
      this.messages.push({ role, content });
    }
    pushHidden(role, content){
      this.messages.push({ role, content, hidden: true });
    }

    onUserSend(){
      if (this.streaming) return;
      const input = this.root.querySelector("#cw-mock-input");
      const text = (input.value || "").trim();
      if (!text) return;
      input.value = "";
      input.style.height = "auto";
      this.pushVisible("user", text);
      this.appendMsgEl("user", text);
      this.runTurn();
    }

    sendControl(text){
      // A starter that looks like a user message from the student's side, used
      // to kick off the case without the student having to type.
      this.pushVisible("user", text);
      this.appendMsgEl("user", text);
      this.runTurn();
    }

    requestHint(){
      if (this.streaming) return;
      this.pushHidden("user", "[hint]");
      this.runTurn();
    }

    advanceBlock(){
      if (this.streaming) return;
      if (this.blockIdx >= BLOCKS.length - 1){
        this.finishAndGrade();
        return;
      }
      const next = BLOCKS[this.blockIdx + 1];
      this.pushHidden("user", `[advance] The student is ready to move from ${BLOCKS[this.blockIdx].full} to ${next.full}. Give 2-3 sentences of feedback on the block we just finished, then open the next block with an opening prompt.`);
      this.blockIdx += 1;
      this.updateStepperAndCase();
      this.runTurn();
    }

    updateStepperAndCase(){
      // re-render just the stepper + case pane (not messages)
      const stepper = this.root.querySelector(".cw-mock-stepper");
      if (stepper){
        stepper.innerHTML = BLOCKS.map((b, i) => {
          const state = i < this.blockIdx ? "done" : i === this.blockIdx ? "active" : "todo";
          return `
            <div class="cw-mock-step cw-mock-step--${state}" data-step="${i}">
              <span class="cw-mock-step-n">${i+1}</span>
              <span class="cw-mock-step-lbl">${esc(b.label)}</span>
            </div>`;
        }).join('<span class="cw-mock-step-sep"></span>');
      }
      const blk = BLOCKS[this.blockIdx];
      const currBlkEl = this.root.querySelector(".cw-mock-case-section:nth-of-type(2) .cw-mock-case-body b");
      if (currBlkEl) currBlkEl.textContent = blk.full;
      const tipsEl = this.root.querySelector(".cw-mock-tips-list");
      if (tipsEl) tipsEl.innerHTML = tipsFor(blk.id).map(t => `<li>${esc(t)}</li>`).join("");
      const advBtn = this.root.querySelector('[data-act="advance"]');
      if (advBtn){
        advBtn.textContent = this.blockIdx === BLOCKS.length - 1 ? "finish & grade →" : `next: ${BLOCKS[this.blockIdx+1].label} →`;
        advBtn.classList.toggle("cw-iconbtn--primary", this.blockIdx === BLOCKS.length - 1);
      }
    }

    async runTurn(){
      if (this.streaming) return;
      this.streaming = true;
      this.streamCtrl = new AbortController();
      const aiEl = this.appendMsgEl("assistant", "");
      if (aiEl) aiEl.classList.add("cw-msg--typing");
      const bodyEl = aiEl?.querySelector(".cw-msg-body");
      this.pushVisible("assistant", "");
      let buf = "";
      const send = this.root.querySelector("#cw-mock-send");
      if (send) send.disabled = true;

      try {
        await this.streamClient.streamChat({
          tab: this.tabId,
          mode: "mock",
          mockCaseId: this.selected?.id,
          mockBlock: BLOCKS[this.blockIdx].id,
          messages: this.messages.slice(0, -1).map(m => ({ role: m.role, content: m.content })),
          signal: this.streamCtrl.signal,
          onDelta: (t) => { buf += t; if (bodyEl) bodyEl.textContent = buf; this.scrollMsgsBottom(); },
          onDone: () => {
            if (aiEl) aiEl.classList.remove("cw-msg--typing");
            this.messages[this.messages.length - 1].content = buf;
          },
          onError: (err) => {
            if (aiEl){ aiEl.classList.remove("cw-msg--typing","cw-msg--ai"); aiEl.classList.add("cw-msg--err"); }
            if (bodyEl) bodyEl.textContent = err.message || "mock failed";
            this.messages[this.messages.length - 1].content = `[error: ${err.message || "mock failed"}]`;
          },
        });
      } finally {
        this.streaming = false;
        this.streamCtrl = null;
        if (send) send.disabled = false;
      }
    }

    /* ---------- grading ---------- */
    async finishAndGrade(){
      if (this.streaming) return;
      this.phase = "done";
      this.renderGradingLoading();

      const transcript = this.messages
        .filter(m => !m.hidden)
        .map(m => (m.role === "user" ? "STUDENT" : "INTERVIEWER") + ": " + m.content)
        .join("\n");

      const gradeRequest = [
        { role: "user", content:
          `The mock interview is complete. Based on the transcript and the case ground truth you have, produce a grade as JSON with exactly this shape:
{
  "dimensions": {
    "caseExecution": { "score": 0-5, "note": "one sentence" },
    "communication": { "score": 0-5, "note": "one sentence" },
    "behavioral":    { "score": 0-5, "note": "one sentence" }
  },
  "blocks": {
    "clarify":    "one sentence of what happened",
    "framework":  "...",
    "math":       "...",
    "brainstorm": "...",
    "recommend":  "..."
  },
  "strengths":    ["bullet","bullet"],
  "improvements": ["specific actionable bullet","specific actionable bullet"],
  "overall":      "one short paragraph"
}

TRANSCRIPT
---
${transcript}
---
Only return the JSON object. No prose outside it.`
        }
      ];

      try {
        const grade = await this.streamClient.jsonChat({
          tab: this.tabId,
          mode: "mock",
          mockCaseId: this.selected?.id,
          mockBlock: "recommend",
          messages: gradeRequest,
        });
        this.grade = grade;
        logFinishedMock(this.tabId, this.selected, grade);
        this.renderDone();
      } catch (err) {
        this.renderError(`grading failed: ${err.message || err}`);
      }
    }

    renderGradingLoading(){
      this.root.innerHTML = `<div class="cw-mock-loading">grading your interview…</div>`;
    }

    renderDone(){
      const g = this.grade || {};
      const dims = g.dimensions || {};
      const blocks = g.blocks || {};
      const strengths = Array.isArray(g.strengths) ? g.strengths : [];
      const improvements = Array.isArray(g.improvements) ? g.improvements : [];

      const dimCard = (key, label) => {
        const d = dims[key] || {};
        const score = Math.max(0, Math.min(5, Number(d.score) || 0));
        const pct = (score / 5) * 100;
        return `
          <div class="cw-mock-dim">
            <div class="cw-mock-dim-lbl">${esc(label)}</div>
            <div class="cw-mock-dim-score">${score}<span>/5</span></div>
            <div class="cw-mock-dim-bar"><div class="cw-mock-dim-fill" style="width:${pct}%"></div></div>
            ${d.note ? `<div class="cw-mock-dim-note">${esc(d.note)}</div>` : ""}
          </div>`;
      };

      this.root.innerHTML = `
        <div class="cw-mock-donecard">
          <div class="cw-mock-done-hdr">
            <div class="cw-mock-done-title">interview complete</div>
            <div class="cw-mock-done-sub">${esc(this.selected?.title || "")}</div>
          </div>

          <div class="cw-mock-dimrow">
            ${dimCard("caseExecution", "Case execution")}
            ${dimCard("communication", "Communication")}
            ${dimCard("behavioral",    "Behavioral")}
          </div>

          ${g.overall ? `<div class="cw-mock-overall">${esc(g.overall)}</div>` : ""}

          ${strengths.length ? `
            <div class="cw-mock-listblock">
              <div class="cw-mock-listblock-h">strengths</div>
              <ul>${strengths.map(s => `<li>${esc(s)}</li>`).join("")}</ul>
            </div>` : ""}

          ${improvements.length ? `
            <div class="cw-mock-listblock">
              <div class="cw-mock-listblock-h">practice focus</div>
              <ul>${improvements.map(s => `<li>${esc(s)}</li>`).join("")}</ul>
            </div>` : ""}

          ${Object.keys(blocks).length ? `
            <div class="cw-mock-listblock">
              <div class="cw-mock-listblock-h">per-block notes</div>
              <ul class="cw-mock-blocknotes">
                ${BLOCKS.map(b => blocks[b.id] ? `<li><b>${esc(b.full)}</b> — ${esc(blocks[b.id])}</li>` : "").join("")}
              </ul>
            </div>` : ""}

          <div class="cw-mock-actions">
            <button class="cw-iconbtn cw-iconbtn--ghost" data-act="exit">back to chat</button>
            <button class="cw-iconbtn" data-act="another">run another case →</button>
          </div>
        </div>
      `;
      this.root.querySelector('[data-act="exit"]').addEventListener("click", () => this.onExit());
      this.root.querySelector('[data-act="another"]').addEventListener("click", () => {
        this.selected = null;
        this.blockIdx = 0;
        this.messages = [];
        this.grade = null;
        this.phase = "picker";
        this.renderPicker();
      });
    }
  }

  /* =========================================================
     Helpers
     ========================================================= */
  async function loadCases(tabId){
    try {
      // eslint-disable-next-line no-undef
      if (typeof CASES !== "undefined" && Array.isArray(CASES) && CASES.length){
        // eslint-disable-next-line no-undef
        return CASES.slice();
      }
    } catch (_) {}
    const res = await fetch(`/api/content?tab=${encodeURIComponent(tabId)}`);
    if (!res.ok) throw new Error(`content ${res.status}`);
    const pack = await res.json();
    return Array.isArray(pack.CASES) ? pack.CASES : [];
  }

  function uniq(a){ return Array.from(new Set(a)); }
  function countIn(arr, key, v){ return arr.filter(x => x[key] === v).length; }
  function countByOverall(arr, digit){
    return arr.filter(c => String(overallStar(c.difficulty)) === digit).length;
  }
  function overallStar(diff){
    // "2 / 3 / 1" → 2
    const m = String(diff || "").match(/^\s*(\d)/);
    return m ? Number(m[1]) : 0;
  }
  function esc(s){
    return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[c]));
  }
  function tipsFor(blockId){
    return ({
      clarify:    ["Repeat the goal in your own words.", "Ask about constraints: time horizon, budget, success metric.", "Keep it to 2–3 questions — interviewers mark structure over breadth."],
      framework:  ["Pick 3–4 top-level buckets that are MECE.", "Say out loud: 'Here's my structure — then I'll drill into each.'", "Match the case type (profitability vs market entry vs M&A)."],
      math:       ["Ask for exhibits or numbers you need.", "Set up the formula BEFORE you plug numbers in.", "Sanity-check the order of magnitude before announcing."],
      brainstorm: ["Use a quick mini-framework (internal/external, short/long, risks/opportunities).", "Aim for 4–6 distinct ideas.", "Call out the top 2 and why."],
      recommend:  ["Lead with the recommendation in one sentence.", "Support with 2–3 data points from earlier.", "Name 1–2 risks and one next step."],
    })[blockId] || [];
  }
  function logFinishedMock(tabId, caseData, grade){
    try {
      const log = JSON.parse(localStorage.getItem(MOCKS_LOG_KEY) || "[]");
      log.push({
        tab: tabId,
        caseId: caseData?.id,
        caseTitle: caseData?.title,
        ts: Date.now(),
        dimensions: grade?.dimensions || null,
        overall: grade?.overall || "",
      });
      if (log.length > 200) log.splice(0, log.length - 200);
      localStorage.setItem(MOCKS_LOG_KEY, JSON.stringify(log));
    } catch {}
  }

  window.ChatLab = window.ChatLab || {};
  window.ChatLab.mock = { mount, unmount };
})();
