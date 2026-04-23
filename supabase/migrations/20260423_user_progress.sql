-- Per-user progress sync.
-- One row per (user, key) — `key` is a localStorage key like
-- e.g. "darden.card.weights" or "rohan.lab.flash.results"; `value` is whatever
-- JSON was previously stored under that key.
--
-- Security model: Row-Level Security. A user can only read/write their own
-- rows. The publishable (anon) key in the client CANNOT bypass this.

create table if not exists public.user_progress (
  user_id     uuid        not null references auth.users(id) on delete cascade,
  key         text        not null,
  value       jsonb       not null,
  updated_at  timestamptz not null default now(),
  primary key (user_id, key)
);

-- Keep updated_at fresh on every upsert.
create or replace function public.user_progress_touch()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists user_progress_touch on public.user_progress;
create trigger user_progress_touch
  before update on public.user_progress
  for each row execute function public.user_progress_touch();

-- Index for "what did I last touch" queries.
create index if not exists user_progress_user_updated_idx
  on public.user_progress (user_id, updated_at desc);

-- RLS ON — required. Without this, anyone with the publishable key could
-- read every user's rows.
alter table public.user_progress enable row level security;

drop policy if exists "user_progress_select_own" on public.user_progress;
drop policy if exists "user_progress_insert_own" on public.user_progress;
drop policy if exists "user_progress_update_own" on public.user_progress;
drop policy if exists "user_progress_delete_own" on public.user_progress;

create policy "user_progress_select_own"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "user_progress_insert_own"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "user_progress_update_own"
  on public.user_progress for update
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "user_progress_delete_own"
  on public.user_progress for delete
  using (auth.uid() = user_id);
