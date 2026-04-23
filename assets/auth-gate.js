// Client-side auth gate. Runs before the rest of the page boots so users
// without a stored Supabase session get bounced to /auth.html immediately.
// Checks localStorage synchronously for any `sb-*-auth-token` key (the
// Supabase client persists the session there), so no network round-trip.
// Expired tokens still count as "signed in" here — the supabase client will
// auto-refresh on first call; our gate only asks "has this device ever
// authenticated?" so we don't show protected UI to strangers.
(function () {
  var path = location.pathname || "/";

  // Never gate the auth page itself — otherwise you'd loop.
  if (path === "/auth.html" || path.endsWith("/auth.html")) return;

  // Supabase magic-link / OAuth callbacks land on a protected URL with tokens
  // in the hash (or a `?code=`). Let the client process those before we gate.
  var hash = location.hash || "";
  var search = location.search || "";
  if (
    hash.indexOf("access_token=") !== -1 ||
    hash.indexOf("refresh_token=") !== -1 ||
    /[?&]code=/.test(search)
  ) {
    return;
  }

  var signedIn = false;
  try {
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (k && /^sb-.*-auth-token$/.test(k)) {
        var raw = localStorage.getItem(k);
        if (!raw) continue;
        try {
          var s = JSON.parse(raw);
          var tok =
            (s && s.access_token) ||
            (s && s.currentSession && s.currentSession.access_token);
          if (tok) { signedIn = true; break; }
        } catch (_) {}
      }
    }
  } catch (_) {}

  if (signedIn) return;

  // Hide the page immediately to avoid a flash of content, then redirect.
  try { document.documentElement.style.visibility = "hidden"; } catch (_) {}
  var next = path + search + hash;
  location.replace("/auth.html?next=" + encodeURIComponent(next));
})();
