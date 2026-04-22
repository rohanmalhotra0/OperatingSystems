// Vercel Serverless Function — /api/chat
// POST { tab, messages, mode?, focus? }
// Streams a reply from OpenAI. The API key lives only in env vars.

const OpenAI = require("openai");
const { summarizeForPrompt, lookupDetail } = require("./_content.js");

const DEFAULT_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

const TAB_PERSONA = {
  consulting: {
    label: "Darden Casebook (consulting / case interviews)",
    subject: "UVA Darden 2024-25 casebook: profitability, market entry, growth, M&A, operations, pricing, cost cutting, and non-profit cases. Plus formulas, accounting, industry vocab, and 8 named frameworks.",
  },
  politics: {
    label: "POL-UA 500 Exam #2",
    subject: "political science — voting & participation, ethnicity & identity, parties & systems. 30 terms, 10 essay prompts.",
  },
  oracle: {
    label: "Oracle 1Z0-1080-25 EPM Planning Cert",
    subject: "Oracle Planning 2025 Implementation Professional: dimensions, rules, modules, IPM, approvals.",
  },
  german: {
    label: "German II (K5–K8)",
    subject: "German grammar & vocab — Dativ, two-way prepositions, Perfekt/Präteritum, Relativpronomen, Konjunktiv II, Passiv.",
  },
  studytool: {
    label: "CS202 Operating Systems",
    subject: "x86-64 paging, fork/exec/pipe, mutexes, WeensyOS, file systems, crash recovery.",
  },
};

const MODE_INSTRUCTIONS = {
  chat: `Default mode. Be a sharp, concise study partner. Explain terms crisply, probe understanding, suggest next steps. Use bullet points only when they clarify; prefer tight sentences otherwise.`,
  quiz: `Quiz mode. Ask ONE question at a time drawn from the material. Wait for the student's answer. Grade honestly (right / partially right / wrong), give the correct answer with a 1-2 sentence reason, then immediately ask the next question. Track a running score at the bottom of each message like "score: 3/5". If the student asks to stop or switch, oblige.`,
  explain: `Explain mode. Give a rigorous, clean explanation of the term, formula, or concept the student names — include the formal definition, the intuition, a concrete example, and 1-2 common traps. Keep it under 250 words unless asked for more.`,
  mock: `Mock case interview mode. You are the interviewer. Open with the prompt from the chosen case (or a similar one if the student picked "random"). Walk through all five blocks — clarifying Qs, framework, math, brainstorming, recommendation — in order. After each block, give short feedback (what was strong / what was missing) before advancing. At the end, give a 3-dimension grade (Case Execution / Communication / Behavioral) and a concrete practice focus.`,
};

function buildSystemPrompt({ tab, mode, focus }) {
  const persona = TAB_PERSONA[tab] || { label: "Study Notebook", subject: "general study help" };
  const modeInstr = MODE_INSTRUCTIONS[mode] || MODE_INSTRUCTIONS.chat;
  const summary = summarizeForPrompt(tab);
  const detail = focus ? lookupDetail(tab, focus) : null;

  return [
    `You are the in-notebook AI tutor for "${persona.label}" (rohan.lab study site).`,
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
    detail ? `\nFOCUSED DETAIL (student asked about this)\n${detail}` : "",
  ].filter(Boolean).join("\n");
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

  const { tab = "", messages = [], mode = "chat", focus = "", model } = req.body || {};

  if (!Array.isArray(messages) || !messages.length) {
    res.status(400).json({ error: "messages[] required" });
    return;
  }
  // Trim to reasonable size to guard against runaway client state
  const trimmed = messages.slice(-30).map(m => ({
    role: m.role === "assistant" ? "assistant" : (m.role === "system" ? "system" : "user"),
    content: String(m.content || "").slice(0, 8000),
  }));

  const system = buildSystemPrompt({ tab: String(tab).toLowerCase(), mode, focus });
  const openai = new OpenAI({ apiKey });

  // SSE streaming to the browser
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
      temperature: mode === "quiz" ? 0.4 : 0.6,
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
