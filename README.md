# Casen

> the consulting casebook, rebuilt as a study tool

Live site: **[getcasen.com](https://getcasen.com)**

A static study notebook + serverless AI tutor. 71 cases drawn from the canonical MBB casebooks, 8 frameworks, 80+ vocab cards, AI voice mocks, resume-to-STAR behaviorals, a live job board, and M&A news — all in one place.

## Stack

- **Frontend:** static HTML/CSS/JS, no build step. Notebook-paper aesthetic.
- **Backend:** Vercel serverless functions in `/api` (Node 18+).
- **AI:** OpenAI (`gpt-4o-mini` by default) for chat, transcription, and TTS.
- **Auth + sync:** Supabase.
- **External feeds:** JSearch (jobs) via RapidAPI; news feed pulls daily.

## Structure

```
/                         landing.html and entry pages
/Consulting/              the main casebook notebook (71 cases, frameworks, vocab)
/api/                     serverless functions: chat, jobs, news, tts, transcribe, behaviorals
/assets/                  shared JS/CSS — chat widget, voice, supabase, top-nav, etc.
/Resources/               source PDFs (Darden, Tuck casebooks)
/supabase/                schema + migrations
vercel.json               function config + cron schedules
```

## Local dev

```bash
npm install
npm install -g vercel        # one-time
cp .env.local.example .env.local   # then paste your keys
vercel dev                   # http://localhost:3000
```

See [`DEPLOY.md`](./DEPLOY.md) for full deploy + env-var setup.

## Modes

Every chat session has a mode injected into the system prompt:

- **chat** — concise study partner
- **quiz me** — one question at a time, grades answers, running score
- **explain** — definition → intuition → example → traps for one concept
- **mock** — full case interview with feedback + a 3-dimension grade

## Cron jobs

Defined in `vercel.json`:

- `/api/jobs` — daily 06:00 UTC, refreshes the live job board cache
- `/api/news` — daily 07:00 UTC, refreshes the M&A news feed

## Conventions

- No build step. Don't add one without a reason.
- Secrets live only in Vercel env vars. Never in git, never in the browser.
- Static assets are short-cached (60s) via `vercel.json` headers so deploys propagate fast.

## License

Personal study project. Casebook PDFs in `/Resources` belong to their respective MBA clubs.
