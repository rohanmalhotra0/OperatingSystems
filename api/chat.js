// Vercel Serverless Function — /api/chat
// POST { tab, messages, mode?, focus?, mockCaseId?, mockBlock?, format? }
// Streams a reply from OpenAI (SSE) by default.
// When format === "json", returns a one-shot JSON response instead (used for
// the end-of-mock grade card).
// The API key lives only in env vars.

const OpenAI = require("openai");
const { summarizeForPrompt, lookupDetail, loadTab } = require("./_content.js");

const DEFAULT_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

const TAB_PERSONA = {
  consulting: {
    label: "Casen — Consulting Casebook (case interviews)",
    subject: "Consulting case-interview prep: profitability, market entry, growth, M&A, operations, pricing, cost cutting, and non-profit cases. Plus formulas, accounting, industry vocab, and 8 named frameworks.",
  },
};

const MODE_INSTRUCTIONS = {
  chat: `Default mode. Be a sharp, concise study partner. Explain terms crisply, probe understanding, suggest next steps. Use bullet points only when they clarify; prefer tight sentences otherwise.`,
  quiz: `Quiz mode. Ask ONE question at a time drawn from the material. Wait for the student's answer. Grade honestly (right / partially right / wrong), give the correct answer with a 1-2 sentence reason, then immediately ask the next question. Track a running score at the bottom of each message like "score: 3/5". If the student asks to stop or switch, oblige.`,
  explain: `Explain mode. Give a rigorous, clean explanation of the term, formula, or concept the student names — include the formal definition, the intuition, a concrete example, and 1-2 common traps. Keep it under 250 words unless asked for more.`,
  mock: `Mock case interview mode. You are the interviewer. Use the CURRENT CASE context below — that's the ground truth for this interview. Walk the student through the 5 blocks in order; the client tells you which block is active. See the MOCK RULES section for details.`,
};

// -------------------------------------------------------------------------
// PROMPT 1 — Live Interviewer
// MBB-level case interviewer. Runs a full case in a 5-phase arc. Rendered per
// turn with the current case data + current block. Variables in {{BRACES}} are
// substituted by fillMockTemplate() below.
// -------------------------------------------------------------------------
const MOCK_INTERVIEWER_PROMPT = `
You are an MBB-level case interviewer — partner-style, first-round rigor (think Bain / BCG / McKinsey). The user is the candidate. You are evaluating them, not coaching them.

PERSONA + TONE
- Sharp, professional, neutral. Short, direct sentences.
- No "great question!", no excessive praise, no apologies, no hedging.
- Stay in character. Do not break frame to explain what you are doing.
- A realistic, slightly tough interview teaches more than a cheerleader.

5-PHASE ARC
Run the case through these phases IN ORDER. The client advances the phase by sending a "[advance]" control message — never auto-advance.

  1. OPENING  (first assistant turn only)
     - Deliver the prompt in 1-2 crisp sentences: company, situation, question.
     - State the objective and any non-obvious constraint.
     - Close with: "Take a minute, then either walk me through your structure or ask any clarifying questions first."

  2. CLARIFYING  (block "clarify")
     - Answer clarifying questions the way a real interviewer would — share facts a client would know (time horizon, geography, competitors, company size). Refuse to leak the framework, math answer, or final rec.
     - If the candidate asks 5+ clarifying questions, redirect: "Let's move into your structure."
     - If they skip clarifying entirely, note it neutrally and let them structure.

  3. FRAMEWORK  (block "framework")
     - Let them walk through their structure without interruption.
     - When they finish, probe MECE gaps, unclear prioritization, or buckets that do not map to the question.
     - Do NOT feed them the expected framework. They must build it themselves.

  4. ANALYSIS  (blocks "math" then "brainstorm")
     - Math: when asked, give ONLY exhibit-style inputs (costs, volumes, rates, %s). Never do the arithmetic for them.
       If their math is wrong, say "walk me through that again" or "double-check that number" — do not hand them the answer.
     - Brainstorm: push for breadth AND structure. If they stay in one dimension, ask "what's a different angle?"
     - Expect 4-6 distinct ideas, grouped.

  5. RECOMMENDATION  (block "recommend")
     - Ask: "What's your recommendation?"
     - Expect: lead with the answer, 2-3 supporting facts, 1-2 risks, a clear next step.
     - AFTER they answer, briefly compare to the casebook rec (1-2 differences) — do not pre-empt.
     - End with a one-line sign-off, then emit the sentinel on its own line, exactly:
       [INTERVIEW_COMPLETE]

BEHAVIOR RULES
- Never volunteer the expected framework, math answer, or recommendation from CASE DATA. That is your ground truth, not the candidate's.
- 1-3 short paragraphs per turn. Never lecture.
- Correct specific errors precisely — show the exact issue, do not vaguely affirm.
- Plain-text math only. No LaTeX, no MathJax.
- [advance] control: give 2-3 sentences of honest block feedback, then open the next block with a clear prompt.
- [hint] control: give ONE nudge scaled to stuck-ness —
    * 1st hint: a directional question ("have you considered the cost side?")
    * 2nd: a narrower cue ("think volume × price — what's missing?")
    * 3rd: ONE partial scaffold (one piece they're missing, not the answer)
  Never give the final answer as a hint.

CURRENT CASE (ground truth — do NOT leak)
  Case #{{CASE_ID}}: {{CASE_TITLE}}
  {{CASE_META}}

  PROMPT
  {{CASE_PROMPT}}

  CLARIFYING FACTS (share only when asked)
  {{CLARIFYING_FACTS}}

  EXPECTED FRAMEWORK (candidate must build their own — do NOT reveal)
  {{EXPECTED_FRAMEWORK}}

  EXPECTED MATH / EXHIBITS
  {{EXPECTED_MATH}}

  BRAINSTORMING CONTEXT
  {{BRAINSTORM_CONTEXT}}

  EXPECTED RECOMMENDATION (reveal only in Phase 5 AFTER candidate answers)
  {{EXPECTED_RECOMMENDATION}}

  COMMON PITFALLS
  {{COMMON_PITFALLS}}

CURRENT BLOCK: {{BLOCK_ID}}
{{BLOCK_GUIDANCE}}
`;

// -------------------------------------------------------------------------
// PROMPT 2 — Post-Interview Scorer (JSON mode)
// Runs once on the full transcript with case ground truth; returns structured
// feedback matching the schema the grade card expects.
// -------------------------------------------------------------------------
const MOCK_SCORING_PROMPT = `
You are an MBB-level case-interview scorer. You are given the full transcript of a mock case interview plus the case ground truth. Produce structured feedback as JSON.

Scoring scale (0-5):
  0 = did not attempt / far below bar
  1 = well below bar
  2 = below bar
  3 = at bar (passes the round)
  4 = above bar
  5 = exceptional

Return ONLY a valid JSON object matching this exact shape (all fields required; arrays may be empty):
{
  "scores": {
    "clarifying":      { "score": 0-5, "evidence": "short quote or specific moment from the transcript", "feedback": "1-2 sentences, actionable" },
    "framework":       { "score": 0-5, "evidence": "...", "feedback": "..." },
    "math":            { "score": 0-5, "evidence": "...", "feedback": "..." },
    "brainstorm":      { "score": 0-5, "evidence": "...", "feedback": "..." },
    "recommendation":  { "score": 0-5, "evidence": "...", "feedback": "..." },
    "communication":   { "score": 0-5, "evidence": "...", "feedback": "..." }
  },
  "strengths":       ["top 3 — specific, not generic"],
  "improvements":    ["top 3 — specific, actionable"],
  "fillerWords":     { "total": 0, "examples": ["um","like"], "topOffender": "um" },
  "hedgeLanguage":   ["direct quotes of hedging moments, e.g. 'I guess maybe…'"],
  "ramblingMoments": ["1-sentence descriptions of moments where the candidate lost structure"],
  "mathErrors":      ["1-sentence descriptions of each arithmetic or logic error"],
  "nextDrills":      ["specific drill recommendations tied to the weakest dimensions"],
  "overall":         "one tight paragraph — would you pass them at an MBB first round? what is the gap?"
}

Rules:
- "evidence" must be a near-verbatim quote or specific moment from the transcript. Never fabricate.
- Be honest — default to 3 if mediocre, do not inflate. Missing dimension (e.g. candidate skipped brainstorm) = score 1 and note it.
- fillerWords.total counts "um / uh / like / you know / sort of / basically" occurrences in STUDENT turns only.
- mathErrors should catch both arithmetic (5×6=25) and logic (double-counting, wrong denominator) errors — reference the exact claim.
- nextDrills should be specific ("profitability MECE — 10 reps", "market sizing top-down — timed, 2min"), not generic.

CASE GROUND TRUTH
  Prompt:          {{CASE_PROMPT}}
  Expected framework:
{{EXPECTED_FRAMEWORK}}
  Expected math:
{{EXPECTED_MATH}}
  Expected recommendation:
{{EXPECTED_RECOMMENDATION}}
  Common pitfalls:
{{COMMON_PITFALLS}}

TRANSCRIPT
---
{{TRANSCRIPT}}
---

Return ONLY the JSON object. No prose outside it.
`;

const BLOCK_DETAILS = {
  clarify: {
    label: "Clarifying Questions",
    phase: "Phase 2 — CLARIFYING",
    guidance: "If this is your first turn, do the OPENING first (deliver the prompt per the arc). Otherwise answer clarifying questions like a real interviewer — share facts a client would know, refuse to leak framework/math/rec. Redirect after ~5 Qs.",
  },
  framework: {
    label: "Framework",
    phase: "Phase 3 — FRAMEWORK",
    guidance: "Let the candidate walk through their structure. Probe MECE gaps and prioritization. Do NOT read them the expected framework.",
  },
  math: {
    label: "Math / Exhibits",
    phase: "Phase 4a — ANALYSIS (math)",
    guidance: "Share exhibit-style inputs when asked. Never do the arithmetic for them. On errors, say 'walk me through that again' — do not hand them the answer.",
  },
  brainstorm: {
    label: "Brainstorming",
    phase: "Phase 4b — ANALYSIS (brainstorm)",
    guidance: "Push for breadth AND structure. Ask 'what's a different angle?' if they stay in one dimension. Aim for 4-6 distinct, grouped ideas.",
  },
  recommend: {
    label: "Recommendation",
    phase: "Phase 5 — RECOMMENDATION",
    guidance: "Ask for their recommendation. Expect answer + 2-3 supports + 1-2 risks + next step. Only AFTER they answer, compare briefly to the casebook rec. End with a one-line sign-off and emit [INTERVIEW_COMPLETE] on its own line.",
  },
};

function bulletList(arr, indent = "  ") {
  if (!Array.isArray(arr) || !arr.length) return `${indent}(none — treat as not-provided)`;
  return arr.map(s => `${indent}- ${s}`).join("\n");
}

function extractPitfalls(caseData) {
  // Case data has no explicit "pitfalls" field; pull implicit traps from
  // the brainstorm + recommendation text (often labeled "Trap:", "Risks:",
  // "Bad recs:"). Scan each field separately so a "Risks:" clause in the
  // recommendation doesn't run into the "Next steps:" section, and so
  // brainstorm traps don't bleed into the recommendation body.
  const traps = [];
  const scan = (text) => {
    if (!text) return;
    const re = /(?:Trap|Bad recs|Risks|Pitfall)s?\s*[:\-–]\s*(.+?)(?=\s*(?:Next steps|Trap|Bad recs|Risks|Pitfall)s?\s*[:\-–]|$)/gi;
    let m; while ((m = re.exec(text)) !== null) {
      const clause = m[1].trim().replace(/[.;\s]+$/, "");
      if (clause) traps.push(clause.length > 220 ? clause.slice(0, 217) + "…" : clause);
    }
  };
  scan(caseData.brainstorm);
  scan(caseData.recommendation);
  const deduped = Array.from(new Set(traps));
  if (!deduped.length) deduped.push("Generic: skipping clarifying Qs, non-MECE framework, math w/o setting up formula first, recommendation without risks or next steps.");
  return deduped;
}

function fillMockTemplate(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in vars ? String(vars[k]) : ""));
}

function buildMockVars(caseData, blockId) {
  const blk = BLOCK_DETAILS[blockId] || BLOCK_DETAILS.clarify;
  return {
    CASE_ID: caseData.id ?? "",
    CASE_TITLE: caseData.title || "",
    CASE_META: [caseData.industry, caseData.type, `difficulty ${caseData.difficulty || "?"}`].filter(Boolean).join(" · "),
    CASE_PROMPT: caseData.prompt || "",
    CLARIFYING_FACTS: bulletList(caseData.clarifying),
    EXPECTED_FRAMEWORK: bulletList(caseData.framework),
    EXPECTED_MATH: bulletList(caseData.math),
    BRAINSTORM_CONTEXT: caseData.brainstorm ? `  ${caseData.brainstorm}` : "  (none)",
    EXPECTED_RECOMMENDATION: caseData.recommendation ? `  ${caseData.recommendation}` : "  (none)",
    COMMON_PITFALLS: bulletList(extractPitfalls(caseData)),
    BLOCK_ID: `${blockId.toUpperCase()} (${blk.phase})`,
    BLOCK_GUIDANCE: `  ${blk.guidance}`,
  };
}

function renderCaseForMock(caseData, blockId) {
  return fillMockTemplate(MOCK_INTERVIEWER_PROMPT.trim(), buildMockVars(caseData, blockId));
}

function renderMockScoringPrompt(caseData, transcript) {
  return fillMockTemplate(MOCK_SCORING_PROMPT.trim(), {
    CASE_PROMPT: caseData.prompt || "",
    EXPECTED_FRAMEWORK: bulletList(caseData.framework),
    EXPECTED_MATH: bulletList(caseData.math),
    EXPECTED_RECOMMENDATION: caseData.recommendation ? `  ${caseData.recommendation}` : "  (none)",
    COMMON_PITFALLS: bulletList(extractPitfalls(caseData)),
    TRANSCRIPT: transcript || "(empty)",
  });
}

function buildSystemPrompt({ tab, mode, focus, mockCase, mockBlock }) {
  // Mock mode owns the entire system prompt — the live-interviewer template
  // already contains its own persona, rules, and case ground truth. Sharing
  // the generic tutor rules would dilute the interviewer persona.
  if (mode === "mock" && mockCase) {
    return renderCaseForMock(mockCase, mockBlock || "clarify");
  }

  const persona = TAB_PERSONA[tab] || { label: "Study Notebook", subject: "general study help" };
  const modeInstr = MODE_INSTRUCTIONS[mode] || MODE_INSTRUCTIONS.chat;
  const summary = summarizeForPrompt(tab);
  const detail = focus ? lookupDetail(tab, focus) : null;

  const parts = [
    `You are the in-notebook AI tutor for "${persona.label}" (Casen study site).`,
    `Subject: ${persona.subject}`,
    ``,
    `OPERATING RULES`,
    `- You are a MASTER of the material listed below. Ground every factual claim in it. If the student asks about something outside the listed scope, say so and offer the closest in-scope topic.`,
    `- Match how the site teaches it. Use the exact term names, framework buckets, and formula names shown below; don't invent new ones.`,
    `- Be direct and tight. No preamble, no "great question!" filler. Skip restating the question.`,
    `- Render math with plain text (no LaTeX) since this renders in a chat bubble.`,
    `- When the student gets something wrong, correct it specifically and show the fix, don't just vaguely affirm.`,
    ``,
    `MODE: ${mode || "chat"}`,
    modeInstr,
    ``,
    summary ? `MATERIAL IN SCOPE\n${summary}` : `MATERIAL: (no content pack loaded for this tab — stay general)`,
  ];

  if (detail) parts.push("", `FOCUSED DETAIL (student asked about this)\n${detail}`);

  return parts.join("\n");
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }
  const apiKey = process.env.OPENAI_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "server misconfigured: OPENAI_KEY not set" });
    return;
  }

  const {
    tab = "",
    messages = [],
    mode = "chat",
    focus = "",
    mockCaseId = null,
    mockBlock = null,
    scoring = false,     // when true + mode="mock" + format="json", run the scorer
    transcript = "",     // pre-rendered transcript string for scoring
    format = "stream",   // "stream" | "json"
    model,
  } = req.body || {};

  // Scoring runs without a turn-by-turn messages array — the transcript is a
  // single string. Everything else requires messages[].
  const isScoring = scoring === true && mode === "mock" && format === "json";
  if (!isScoring && (!Array.isArray(messages) || !messages.length)) {
    res.status(400).json({ error: "messages[] required" });
    return;
  }
  const trimmed = (messages || []).slice(-30).map(m => ({
    role: m.role === "assistant" ? "assistant" : (m.role === "system" ? "system" : "user"),
    content: String(m.content || "").slice(0, 8000),
  }));

  // Resolve mock case server-side from the tab's content pack
  let mockCase = null;
  if (mode === "mock" && mockCaseId != null) {
    const pack = loadTab(String(tab).toLowerCase());
    if (pack && Array.isArray(pack.CASES)) {
      mockCase = pack.CASES.find(c => String(c.id) === String(mockCaseId)) || null;
    }
  }

  // Scoring path takes over: the system prompt is the scorer template with
  // ground truth + transcript baked in, and the "user" message is a trivial
  // trigger (the model already has everything it needs from the system).
  let system, scoringMessages = null;
  if (isScoring && mockCase) {
    const transcriptText = String(transcript || "").slice(0, 32000)
      || trimmed.map(m => (m.role === "user" ? "STUDENT" : "INTERVIEWER") + ": " + m.content).join("\n");
    system = renderMockScoringPrompt(mockCase, transcriptText);
    scoringMessages = [{ role: "user", content: "Score this interview per the schema. Return only the JSON object." }];
  } else {
    system = buildSystemPrompt({
      tab: String(tab).toLowerCase(),
      mode,
      focus,
      mockCase,
      mockBlock,
    });
  }
  const openai = new OpenAI({ apiKey });

  const temperature =
    mode === "quiz" ? 0.4 :
    mode === "mock" ? 0.5 :
    0.6;

  // Non-streaming JSON mode — used for the end-of-mock grade card
  if (format === "json") {
    try {
      const r = await openai.chat.completions.create({
        model: model || DEFAULT_MODEL,
        temperature: isScoring ? 0.3 : temperature,
        response_format: { type: "json_object" },
        messages: [{ role: "system", content: system }, ...(scoringMessages || trimmed)],
      });
      const raw = r.choices?.[0]?.message?.content || "{}";
      let parsed = {};
      try { parsed = JSON.parse(raw); } catch { parsed = { error: "model returned invalid JSON", raw }; }
      res.status(200).json(parsed);
    } catch (err) {
      console.error("chat json error:", err);
      res.status(500).json({ error: err.message || "chat failed" });
    }
    return;
  }

  // Streaming SSE (default)
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  const send = (event, data) => {
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  try {
    const stream = await openai.chat.completions.create({
      model: model || DEFAULT_MODEL,
      stream: true,
      temperature,
      messages: [{ role: "system", content: system }, ...trimmed],
    });

    for await (const chunk of stream) {
      const delta = chunk.choices?.[0]?.delta?.content;
      if (delta) send("delta", { text: delta });
    }
    send("done", { ok: true });
    res.end();
  } catch (err) {
    console.error("chat error:", err);
    send("error", { message: err.message || "chat failed" });
    res.end();
  }
};
