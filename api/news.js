// Vercel Serverless Function — /api/news
//
// Scrapes industry-group news (M&A deals, hiring trends, PE, etc.) from
// Google News RSS. No API key needed — Google News exposes a free search
// RSS endpoint. The first visitor after the cache window triggers a
// refresh; everyone else gets the cached snapshot.
//
// Cache lives in the existing `jobs_cache` Supabase table, keyed per
// industry so one filter doesn't evict another. Falls through to stale
// cache if the upstream feed hiccups, which happens occasionally.
//
// Query:
//   /api/news?industry=all|deals|fig|tmt|healthcare|energy|consumer|industrials|hiring|pe
//
// Env vars (reused from /api/jobs):
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY

const MAX_AGE_MS = 2 * 60 * 60 * 1000; // 2 hours — news moves faster than jobs
const RSS_BASE   = "https://news.google.com/rss/search";
const MAX_ITEMS  = 40;

// Each bucket is a Google News search. Quotes force phrase matching; OR
// widens where a single term would miss. "when:7d" restricts to the last
// 7 days which Google News supports natively.
const INDUSTRIES = {
  all: {
    label: "all M&A",
    query: '("mergers and acquisitions" OR "M&A deal" OR "acquires" OR "agrees to acquire") when:7d',
  },
  deals: {
    label: "announced deals",
    query: '("announces acquisition" OR "to acquire" OR "merger agreement" OR "all-cash deal" OR "take-private") when:7d',
  },
  fig: {
    label: "FIG",
    query: '("financial institutions" OR bank OR insurance OR asset manager OR fintech) ("acquisition" OR "merger" OR "acquires") when:14d',
  },
  tmt: {
    label: "TMT",
    query: '("technology" OR software OR "SaaS" OR media OR telecom) ("acquisition" OR "merger" OR "acquires") when:14d',
  },
  healthcare: {
    label: "healthcare",
    query: '(healthcare OR biotech OR pharma OR "life sciences" OR medtech) ("acquisition" OR "merger" OR "acquires") when:14d',
  },
  energy: {
    label: "energy",
    query: '(energy OR "oil and gas" OR renewables OR utilities OR "power company") ("acquisition" OR "merger" OR "acquires") when:14d',
  },
  consumer: {
    label: "consumer & retail",
    query: '(consumer OR retail OR "e-commerce" OR CPG OR "food and beverage") ("acquisition" OR "merger" OR "acquires") when:14d',
  },
  industrials: {
    label: "industrials",
    query: '(industrial OR manufacturing OR aerospace OR defense OR logistics) ("acquisition" OR "merger" OR "acquires") when:14d',
  },
  hiring: {
    label: "hiring trends",
    query: '("investment banking" OR consulting OR "private equity") (hiring OR layoffs OR bonuses OR "lateral hire" OR "managing director" OR compensation) when:14d',
  },
  pe: {
    label: "private equity",
    query: '("private equity" OR "leveraged buyout" OR LBO OR "take-private" OR "PE firm") (deal OR acquires OR fund OR exit) when:7d',
  },
};

function supaEnv(){
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/+$/, ""), key };
}

async function readCache(key){
  const env = supaEnv();
  if (!env) return null;
  try {
    const r = await fetch(
      `${env.url}/rest/v1/jobs_cache?key=eq.${encodeURIComponent(key)}&select=payload,fetched_at`,
      { headers: { apikey: env.key, Authorization: `Bearer ${env.key}` } }
    );
    if (!r.ok) return null;
    const rows = await r.json();
    return rows[0] || null;
  } catch {
    return null;
  }
}

async function writeCache(key, payload){
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
        key,
        payload,
        fetched_at: new Date().toISOString(),
      }),
    });
  } catch {
    /* swallow — cache failure shouldn't break the response */
  }
}

// Decode common XML/HTML entities from RSS feeds. Google News feeds include
// &amp;, &#39;, &quot;, and numeric entities inside titles and descriptions.
function decodeEntities(s){
  if (!s) return "";
  return s
    .replace(/&#(\d+);/g,  (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&amp;/g,  "&")
    .replace(/&lt;/g,   "<")
    .replace(/&gt;/g,   ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g,  "'")
    .replace(/&nbsp;/g, " ");
}

function stripTags(s){
  return decodeEntities(String(s || "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function pickTag(xml, tag){
  // CDATA-aware tag extraction. Handles both <tag>text</tag> and
  // <tag><![CDATA[...]]></tag> since Google News uses both.
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  if (!m) return "";
  const raw = m[1].trim();
  const cdata = raw.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  return (cdata ? cdata[1] : raw).trim();
}

function parseRss(xml){
  const items = [];
  const re = /<item\b[\s\S]*?<\/item>/gi;
  let m;
  while ((m = re.exec(xml)) !== null){
    const block = m[0];
    const title  = decodeEntities(pickTag(block, "title"));
    const link   = decodeEntities(pickTag(block, "link"));
    const pub    = pickTag(block, "pubDate");
    const desc   = pickTag(block, "description");
    // <source url="https://nytimes.com">The New York Times</source>
    const srcMatch = block.match(/<source\b[^>]*>([\s\S]*?)<\/source>/i);
    const source = srcMatch ? decodeEntities(srcMatch[1].trim()) : "";
    if (!title || !link) continue;
    items.push({
      title,
      link,
      source,
      published: pub ? new Date(pub).toISOString() : null,
      snippet:   stripTags(desc).slice(0, 240),
    });
    if (items.length >= MAX_ITEMS) break;
  }
  return items;
}

async function fetchRss(industry){
  const spec = INDUSTRIES[industry] || INDUSTRIES.all;
  const url = `${RSS_BASE}?q=${encodeURIComponent(spec.query)}&hl=en-US&gl=US&ceid=US:en`;
  const r = await fetch(url, {
    headers: {
      // Google sometimes returns an empty body to generic UAs.
      "User-Agent": "Mozilla/5.0 (compatible; CasenBot/1.0; +https://casen.app)",
      "Accept":     "application/rss+xml, application/xml, text/xml",
    },
  });
  if (!r.ok){
    const body = await r.text().catch(() => "");
    const err = new Error(`Google News ${r.status}: ${body.slice(0, 200)}`);
    err.code = r.status === 429 ? "rate_limited" : "upstream_error";
    throw err;
  }
  const xml = await r.text();
  const items = parseRss(xml);
  return {
    source: "google-news",
    industry,
    label:  spec.label,
    query:  spec.query,
    items,
  };
}

function respond(res, status, body){
  res.status(status);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300");
  res.end(JSON.stringify(body));
}

module.exports = async function handler(req, res){
  try {
    const qIndustry = (req.query?.industry || "all").toString().toLowerCase();
    const industry  = INDUSTRIES[qIndustry] ? qIndustry : "all";
    const cacheKey  = `news_${industry}`;

    const cached = await readCache(cacheKey);
    const now = Date.now();
    const ageMs = cached ? now - new Date(cached.fetched_at).getTime() : Infinity;

    if (cached && ageMs < MAX_AGE_MS){
      return respond(res, 200, {
        industry,
        label:      cached.payload?.label || INDUSTRIES[industry].label,
        items:      cached.payload?.items || [],
        source:     cached.payload?.source || "cache",
        fetched_at: cached.fetched_at,
        stale:      false,
        age_ms:     ageMs,
      });
    }

    try {
      const payload = await fetchRss(industry);
      await writeCache(cacheKey, payload);
      return respond(res, 200, {
        industry,
        label:      payload.label,
        items:      payload.items,
        source:     payload.source,
        fetched_at: new Date().toISOString(),
        stale:      false,
        age_ms:     0,
      });
    } catch (fetchErr) {
      if (cached){
        return respond(res, 200, {
          industry,
          label:      cached.payload?.label || INDUSTRIES[industry].label,
          items:      cached.payload?.items || [],
          source:     cached.payload?.source || "cache",
          fetched_at: cached.fetched_at,
          stale:      true,
          age_ms:     ageMs,
          warning:    fetchErr.code === "rate_limited"
                        ? "upstream rate-limited — cached snapshot"
                        : "live feed unavailable — cached snapshot",
        });
      }
      return respond(res, 503, {
        industry,
        label:  INDUSTRIES[industry].label,
        items:  [],
        stale:  true,
        error:  fetchErr.message || "feed unavailable",
      });
    }
  } catch (e) {
    return respond(res, 500, { items: [], error: e.message || "internal error" });
  }
};
