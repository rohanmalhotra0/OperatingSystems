// Vercel Serverless Function — /api/behaviorals
//
// Three actions dispatched via POST body { action, ... }:
//
//   action: "parse_resume"
//     body:   { resume: string }
//     return: { profile: { name, headline, experiences[], projects[], education[], skills[], awards[] } }
//
//   action: "build_stories"
//     body:   { profile }
//     return: { stories: [{ id, title, source, themes[], star: { situation, task, action, result } }] }
//
//   action: "answer_question"
//     body:   { question, stories[] }
//     return: { picked_story_id, answer }
//
// Env:
//   OPENAI_KEY    required
//   OPENAI_MODEL  optional, defaults to gpt-4o-mini

const OpenAI = require("openai");

const DEFAULT_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const MAX_RESUME = 20000;
const MAX_QUESTION = 500;

const PARSE_SYSTEM = `You extract structured information from a resume for behavioral-interview story building.
Return ONLY valid JSON matching this schema:
{
  "name": string,
  "headline": string,
  "experiences": [{
    "id": string,
    "company": string,
    "role": string,
    "start": string,
    "end": string,
    "location": string,
    "bullets": [string]
  }],
  "projects": [{
    "id": string,
    "title": string,
    "context": string,
    "bullets": [string]
  }],
  "education": [{ "school": string, "degree": string, "year": string }],
  "skills": [string],
  "awards": [string]
}
Rules:
- Every id is a short kebab-case slug unique inside its array (e.g. "goldman-2023", "nyu-capstone").
- "start"/"end" use "MMM YYYY" or "YYYY" format; use "Present" for current roles.
- Preserve bullet wording as-is — do NOT rewrite or summarize.
- If a field is missing, use "" for strings and [] for arrays.
- Include internships, research, leadership, volunteering as experiences. Class/hackathon/personal work goes under projects.`;

const STORIES_SYSTEM = `You turn resume bullets into STAR stories for behavioral interviews.
A STAR story has: Situation (context), Task (the problem/goal), Action (what YOU did), Result (outcome with metrics if possible).

Return ONLY valid JSON:
{
  "stories": [{
    "id": string,
    "title": string,
    "source": string,
    "themes": [string],
    "star": {
      "situation": string,
      "task": string,
      "action": string,
      "result": string
    }
  }]
}

Rules:
- Create ONE story per bullet that could plausibly answer a behavioral question. Skip bureaucratic bullets like "attended weekly meetings", "maintained documentation", etc.
- "source" should be a short label like "Goldman Sachs · Summer Analyst" or "NYU Capstone".
- "themes" is 3-5 tags drawn from: leadership, impact, conflict, ambiguity, analytical, influence, initiative, failure, learning, teamwork, communication, ownership, prioritization, accountability, adaptability, EQ, problem-solving, motivation.
- NEVER invent numbers, names, client details, or facts not present in the source bullets. If a bullet has no metric, describe the outcome qualitatively.
- Write in first person, past tense. Use "I" rather than "we" where appropriate.
- Each field (situation/task/action/result) is 1-4 sentences. Total story under 220 words.
- "title" is 3-6 words (e.g. "Turnaround of a stalled client project").`;

const ANSWER_SYSTEM = `You answer a behavioral interview question using ONE of the user's existing stories, formatted as a crisp STAR answer.

You receive:
- the interview question
- an array of stories, each with id, title, themes, source, and star (S/T/A/R text)

Return ONLY valid JSON:
{ "picked_story_id": string, "answer": string }

Where "answer" is a spoken-style first-person response of 120-180 words, written as 4 paragraphs corresponding to Situation → Task → Action → Result. Do NOT label the paragraphs. Start with the Situation directly.

Rules:
- Pick the story whose themes/content best fit the question.
- Rephrase the story's facts to directly answer THIS question — don't just paste STAR fields.
- Never invent facts not in the story.
- If no story fits well, pick the closest and deliver a solid answer; only acknowledge a gap if it's critical.`;

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (c) => {
      raw += c;
      if (raw.length > 200000) {
        req.destroy();
        reject(new Error("payload too large"));
      }
    });
    req.on("end", () => {
      if (!raw) return resolve({});
      try { resolve(JSON.parse(raw)); }
      catch { reject(new Error("invalid JSON body")); }
    });
    req.on("error", reject);
  });
}

async function callJson(client, system, user) {
  const r = await client.chat.completions.create({
    model: DEFAULT_MODEL,
    response_format: { type: "json_object" },
    temperature: 0.5,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });
  const text = r.choices?.[0]?.message?.content || "{}";
  return JSON.parse(text);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return send(res, 405, { error: "method_not_allowed" });
  if (!process.env.OPENAI_KEY) {
    return send(res, 500, { error: "server_misconfigured", message: "OPENAI_KEY not set" });
  }

  let body;
  try { body = await readJsonBody(req); }
  catch (e) { return send(res, 400, { error: "bad_request", message: e.message }); }

  const action = body.action;
  const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });

  try {
    if (action === "parse_resume") {
      const resume = String(body.resume || "").slice(0, MAX_RESUME).trim();
      if (!resume) return send(res, 400, { error: "empty_resume" });
      const out = await callJson(client, PARSE_SYSTEM, "Parse this resume:\n\n" + resume);
      return send(res, 200, { profile: out });
    }

    if (action === "build_stories") {
      const profile = body.profile || {};
      const hasContent = (profile.experiences || []).length + (profile.projects || []).length > 0;
      if (!hasContent) return send(res, 400, { error: "empty_profile", message: "No experiences or projects to build stories from." });
      const out = await callJson(client, STORIES_SYSTEM, "Build STAR stories from this profile:\n\n" + JSON.stringify(profile));
      return send(res, 200, { stories: Array.isArray(out.stories) ? out.stories : [] });
    }

    if (action === "answer_question") {
      const question = String(body.question || "").slice(0, MAX_QUESTION).trim();
      const stories = Array.isArray(body.stories) ? body.stories : [];
      if (!question) return send(res, 400, { error: "missing_question" });
      if (!stories.length) return send(res, 400, { error: "no_stories", message: "Build stories first." });
      const out = await callJson(client, ANSWER_SYSTEM, "Question: " + question + "\n\nStories:\n" + JSON.stringify(stories));
      return send(res, 200, out);
    }

    return send(res, 400, { error: "unknown_action" });
  } catch (e) {
    console.error("[behaviorals] error:", e?.message || e);
    return send(res, 500, { error: "upstream_error", message: e?.message || "failed" });
  }
};
