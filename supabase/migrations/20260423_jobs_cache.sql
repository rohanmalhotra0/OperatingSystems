-- Jobs cache — single-row-per-key cache for /api/jobs.
-- Written only by the serverless function (via the service-role key); the
-- anon key used in the browser cannot read or write this table. Clients hit
-- /api/jobs, which handles the 12-hour refresh + fall-through to stale data
-- if the upstream feed is temporarily unavailable.

create table if not exists public.jobs_cache (
  key         text        primary key,
  payload     jsonb       not null,
  fetched_at  timestamptz not null default now()
);

create index if not exists jobs_cache_fetched_at_idx
  on public.jobs_cache (fetched_at desc);

-- RLS ON with no policies — the service_role key bypasses RLS and is the
-- only thing that should touch this table. The anon/publishable key used in
-- the browser gets denied.
alter table public.jobs_cache enable row level security;
