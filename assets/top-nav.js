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

function renderAuth(user) {
  const chip = document.getElementById("cnav-auth");
  if (!chip) return;
  if (user) {
    chip.classList.add("is-signed-in");
    chip.removeAttribute("href");
    chip.setAttribute("aria-label", "signed in");
    const email = user.email || "";
    const handle = email.includes("@") ? email.split("@")[0] : email;
    const initial = (handle || "").trim().charAt(0).toUpperCase() || "·";
    chip.replaceChildren();
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
    out.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      await signOut();
    });
    chip.append(avatar, out);
  } else {
    chip.classList.remove("is-signed-in");
    chip.setAttribute("href", "/auth.html");
    chip.setAttribute("aria-label", "sign in");
    chip.innerHTML =
      '<span class="cnav-auth-dot"></span>' +
      '<span class="cnav-auth-label">sign in</span>';
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
