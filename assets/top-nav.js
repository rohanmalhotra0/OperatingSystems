// Shared top utility nav for Casen. Injected on every page that loads this
// script. Handles auth state via the existing supabase client so the chip
// stays in sync without page-specific code.

import { getUser, signOut, onAuthChange } from "/assets/supabase.js";

const HTML = `
  <a class="cnav-brand" href="/" data-nav="home" aria-label="Casen home">
    <span class="cnav-brand-mark">✎</span>Casen<span class="cnav-brand-dot">.</span>
  </a>
  <div class="cnav-links">
    <a href="/Consulting/" data-nav="prep">prep</a>
    <a href="/Consulting/#jobs" data-nav="jobs">jobs</a>
    <a href="/Consulting/#news" data-nav="news">news</a>
    <a href="/Consulting/#behaviorals" data-nav="behaviorals">behaviorals</a>
    <a href="/chat.html?tab=consulting&amp;mode=mock" data-nav="mock">mock interview</a>
    <a href="/metrics.html" data-nav="metrics">metrics</a>
  </div>
  <a class="cnav-auth" id="cnav-auth" href="/auth.html" aria-label="sign in">
    <span class="cnav-auth-dot"></span>
    <span class="cnav-auth-label">sign in</span>
  </a>
`;

function activeKey() {
  const path = location.pathname || "/";
  const hash = location.hash || "";
  if (path.startsWith("/Consulting")) {
    if (hash === "#jobs")         return "jobs";
    if (hash === "#news")         return "news";
    if (hash === "#behaviorals")  return "behaviorals";
    return "prep";
  }
  if (path.includes("chat")) return "mock";
  if (path.includes("metrics")) return "metrics";
  if (path.includes("auth"))    return null; // auth page — no tab highlighted
  return "home";
}

function paintActive(nav) {
  const key = activeKey();
  nav.querySelectorAll("[data-nav]").forEach((a) => {
    a.classList.toggle("is-active", !!key && a.dataset.nav === key);
  });
}

// Replace the #cnav-auth element with either an <a> (signed out) or a <div>
// (signed in) — we can't just toggle classes on a single element, because a
// <button> inside an <a> is invalid HTML and browsers swallow clicks on the
// nested button in that case. Rebuilding the element per auth state keeps
// the markup valid: either an anchor with no interactive descendants, or a
// plain container div holding the avatar + sign-out button.
function renderAuth(user) {
  const current = document.getElementById("cnav-auth");
  if (!current) return;

  if (user) {
    const email   = user.email || "";
    const handle  = email.includes("@") ? email.split("@")[0] : email;
    const initial = (handle || "").trim().charAt(0).toUpperCase() || "·";

    const wrap = document.createElement("div");
    wrap.id = "cnav-auth";
    wrap.className = "cnav-auth is-signed-in";
    wrap.setAttribute("aria-label", "signed in");

    const avatar = document.createElement("span");
    avatar.className = "cnav-auth-dot";
    avatar.textContent = initial;
    if (email) avatar.title = email;

    const out = document.createElement("button");
    out.className = "cnav-auth-out";
    out.id = "cnav-signout";
    out.type = "button";
    out.title = "sign out";
    out.textContent = "sign out";
    out.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Clear the local Supabase session synchronously so the next page
      // load sees no auth. Awaiting signOut() can hang forever on the
      // server token-revoke call, which would leave the button looking
      // broken; fire it best-effort and navigate immediately.
      try {
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const k = localStorage.key(i);
          if (k && /^sb-.*-auth-token$/.test(k)) localStorage.removeItem(k);
        }
      } catch (_) {}
      try { signOut(); } catch (_) {}
      location.replace("/");
    });

    wrap.append(avatar, out);
    current.replaceWith(wrap);
  } else {
    const link = document.createElement("a");
    link.id = "cnav-auth";
    link.className = "cnav-auth";
    link.href = "/auth.html";
    link.setAttribute("aria-label", "sign in");
    link.innerHTML =
      '<span class="cnav-auth-dot"></span>' +
      '<span class="cnav-auth-label">sign in</span>';
    current.replaceWith(link);
  }
}

function inject() {
  if (document.querySelector(".cnav")) return;
  const nav = document.createElement("nav");
  nav.className = "cnav";
  nav.setAttribute("role", "navigation");
  nav.setAttribute("aria-label", "primary");
  nav.innerHTML = HTML;
  document.body.insertBefore(nav, document.body.firstChild);
  paintActive(nav);
  (async () => { renderAuth(await getUser()); })();
  onAuthChange(renderAuth);
  window.addEventListener("hashchange", () => paintActive(nav));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inject);
} else {
  inject();
}
