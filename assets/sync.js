// Progress sync: localStorage <-> Supabase user_progress table.
//
// Flow:
//   - On sign-in (or page load while signed in): pull all rows for this user
//     and write them into localStorage. Server wins on first pull.
//   - On any localStorage.setItem that touches a tracked key: debounced
//     upsert to Supabase (800ms). Also flushed on beforeunload.
//   - On sign-out: nothing to do — next sign-in pulls fresh.
//
// Tracked keys are anything under the known app prefixes. Add more prefixes
// here as new study packs land.

import { supabase, getUser, onAuthChange } from "/assets/supabase.js";

const TRACKED_PREFIXES = [
  "rohan.lab.",   // cross-course logs (flash, quiz, mock)
  "darden.",      // consulting casebook
];

function isTracked(key){
  if (typeof key !== "string") return false;
  return TRACKED_PREFIXES.some(p => key.startsWith(p));
}

// Keep the original setItem around so we can write without re-triggering
// our own hook (important for the pull path).
const originalSetItem = Storage.prototype.setItem;

const pendingKeys = new Set();
let pushTimer = null;

Storage.prototype.setItem = function(key, value){
  originalSetItem.call(this, key, value);
  if (this === localStorage && isTracked(key)) {
    pendingKeys.add(key);
    schedulePush();
  }
};

function schedulePush(){
  if (pushTimer) return;
  pushTimer = setTimeout(flushPush, 800);
}

async function flushPush(){
  pushTimer = null;
  if (pendingKeys.size === 0) return;
  const user = await getUser();
  if (!user) { pendingKeys.clear(); return; }
  const keys = Array.from(pendingKeys);
  pendingKeys.clear();
  await pushKeys(user.id, keys);
}

async function pushKeys(userId, keys){
  const rows = [];
  for (const key of keys) {
    const raw = localStorage.getItem(key);
    if (raw === null) continue;
    let value;
    try { value = JSON.parse(raw); }
    catch { value = raw; } // store as string if not JSON
    rows.push({ user_id: userId, key, value });
  }
  if (!rows.length) return;
  const { error } = await supabase
    .from("user_progress")
    .upsert(rows, { onConflict: "user_id,key" });
  if (error) console.error("[sync] push failed:", error.message);
  else window.dispatchEvent(new CustomEvent("progress-pushed", { detail: { count: rows.length } }));
}

async function pullAll(userId){
  const { data, error } = await supabase
    .from("user_progress")
    .select("key, value, updated_at")
    .eq("user_id", userId);
  if (error) { console.error("[sync] pull failed:", error.message); return 0; }
  let n = 0;
  for (const row of data || []) {
    const serialized = typeof row.value === "string" ? row.value : JSON.stringify(row.value);
    originalSetItem.call(localStorage, row.key, serialized);
    n++;
  }
  return n;
}

// Track which user we've already pulled for so we don't re-pull on every
// TOKEN_REFRESHED event.
let lastPulledUserId = null;

async function handleAuth(user){
  if (!user) { lastPulledUserId = null; return; }
  if (user.id === lastPulledUserId) return;
  lastPulledUserId = user.id;
  const count = await pullAll(user.id);
  window.dispatchEvent(new CustomEvent("progress-synced", { detail: { count, userId: user.id } }));
}

// Run once on load in case the user is already signed in.
(async () => { handleAuth(await getUser()); })();
onAuthChange(handleAuth);

// Best-effort flush on page exit. Can't await a promise here; the browser
// may kill the request. This is a nice-to-have, not a guarantee.
window.addEventListener("beforeunload", () => {
  if (pendingKeys.size === 0) return;
  const keys = Array.from(pendingKeys);
  pendingKeys.clear();
  getUser().then(user => { if (user) pushKeys(user.id, keys); });
});

// Manual sync for a "sync now" button.
export async function syncNow(){
  const user = await getUser();
  if (!user) return { error: "not signed in" };
  const pulled = await pullAll(user.id);
  const allLocal = Object.keys(localStorage).filter(isTracked);
  await pushKeys(user.id, allLocal);
  return { pulled, pushed: allLocal.length };
}
