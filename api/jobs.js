// Vercel Serverless Function — /api/jobs
//
// Returns a list of recent consulting job postings. Refreshes from the
// RapidAPI JSearch feed (which aggregates LinkedIn, Indeed, Google Jobs,
// ZipRecruiter, etc.) at most once every 12 hours. The fresh payload is
// cached in the `jobs_cache` Supabase table so every subsequent request
// within the window is served from the cache.
//
// Env vars:
//   RAPIDAPI_KEY                 RapidAPI key subscribed to JSearch
//   SUPABASE_URL                 Supabase project URL
//   SUPABASE_SERVICE_ROLE_KEY    Server-only key; bypasses RLS
//
// If RAPIDAPI_KEY is missing, returns a clear error payload the frontend
// can render ("feed not configured"). If the cache layer is unavailable
// (Supabase env missing), the function still serves live results but with
// no caching — useful for local dev.

const CACHE_KEY    = "consulting_jobs";
const MAX_AGE_MS   = 12 * 60 * 60 * 1000;
const JSEARCH_URL  = "https://jsearch.p.rapidapi.com/search";
const JSEARCH_HOST = "jsearch.p.rapidapi.com";

// Broad query tuned for consulting roles across levels. JSearch treats the
// query as Google-Jobs-style free text.
const JSEARCH_QUERY = "management consulting analyst OR associate consultant";

function supaEnv(){
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/+$/, ""), key };
}

async function readCache(){
  const env = supaEnv();
  if (!env) return null;
  try {
    const r = await fetch(
      `${env.url}/rest/v1/jobs_cache?key=eq.${encodeURIComponent(CACHE_KEY)}&select=payload,fetched_at`,
      { headers: { apikey: env.key, Authorization: `Bearer ${env.key}` } }
    );
    if (!r.ok) return null;
    const rows = await r.json();
    return rows[0] || null;
  } catch {
    return null;
  }
}

async function writeCache(payload){
  const env = supaEnv();
  if (!env) return;
  try {
    await fetch(`${env.url}/rest/v1/jobs_cache?on_conflict=key`, {
      method: "POST",
      headers: {
        apikey: env.key,
        Authorization: `Bearer ${env.key}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify({
        key: CACHE_KEY,
        payload,
        fetched_at: new Date().toISOString(),
      }),
    });
  } catch {
    /* swallow — cache failure shouldn't break the response */
  }
}

async function fetchJSearch(){
  const key = process.env.RAPIDAPI_KEY;
  if (!key){
    const err = new Error("RAPIDAPI_KEY is not set in Vercel env vars");
    err.code = "no_key";
    throw err;
  }
  const params = new URLSearchParams({
    query: JSEARCH_QUERY,
    page: "1",
    num_pages: "1",
    date_posted: "week",
    employment_types: "FULLTIME",
  });
  const r = await fetch(`${JSEARCH_URL}?${params}`, {
    headers: { "X-RapidAPI-Key": key, "X-RapidAPI-Host": JSEARCH_HOST },
  });
  if (!r.ok){
    const body = await r.text().catch(() => "");
    const err = new Error(`JSearch ${r.status}: ${body.slice(0, 200)}`);
    err.code = r.status === 429 ? "rate_limited" : "upstream_error";
    throw err;
  }
  const body = await r.json();
  const raw = Array.isArray(body?.data) ? body.data : [];
  const jobs = raw
    .map(j => ({
      id:        j.job_id || null,
      title:     j.job_title || "",
      firm:      j.employer_name || "",
      city:      j.job_city || null,
      region:    j.job_state || null,
      country:   j.job_country || null,
      url:       j.job_apply_link || j.job_google_link || "",
      publisher: j.job_publisher || null,
      type:      j.job_employment_type || null,
      posted:    j.job_posted_at_datetime_utc || null,
      remote:    !!j.job_is_remote,
    }))
    .filter(j => j.title && j.url);
  return { source: "jsearch", query: JSEARCH_QUERY, jobs };
}

function respond(res, status, body){
  res.status(status);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300");
  res.end(JSON.stringify(body));
}

module.exports = async function handler(req, res){
  try {
    const cached = await readCache();
    const now = Date.now();
    const ageMs = cached ? now - new Date(cached.fetched_at).getTime() : Infinity;

    if (cached && ageMs < MAX_AGE_MS){
      return respond(res, 200, {
        jobs:       cached.payload?.jobs || [],
        source:     cached.payload?.source || "cache",
        fetched_at: cached.fetched_at,
        stale:      false,
        age_ms:     ageMs,
      });
    }

    try {
      const payload = await fetchJSearch();
      await writeCache(payload);
      return respond(res, 200, {
        jobs:       payload.jobs,
        source:     payload.source,
        fetched_at: new Date().toISOString(),
        stale:      false,
        age_ms:     0,
      });
    } catch (fetchErr) {
      if (cached){
        return respond(res, 200, {
          jobs:       cached.payload?.jobs || [],
          source:     cached.payload?.source || "cache",
          fetched_at: cached.fetched_at,
          stale:      true,
          age_ms:     ageMs,
          warning:    fetchErr.code === "rate_limited"
                        ? "upstream rate-limited — cached snapshot"
                        : "live feed unavailable — cached snapshot",
        });
      }
      const status = fetchErr.code === "no_key" ? 501 : 503;
      return respond(res, status, {
        jobs:  [],
        stale: true,
        error: fetchErr.code === "no_key"
                 ? "feed not configured — set RAPIDAPI_KEY in Vercel env"
                 : fetchErr.message || "feed unavailable",
      });
    }
  } catch (e) {
    return respond(res, 500, { jobs: [], error: e.message || "internal error" });
  }
};
