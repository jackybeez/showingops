## Problem

- The footer and React Router link to `/privacy`, but the only static HTML mirror lives at `public/privacy-policy/index.html` (served at `/privacy-policy`).
- On the published Lovable host, `/privacy` falls back to the SPA `index.html` and React Router renders `PrivacyPolicy`. That works for humans, but Twilio / basic crawlers that don't execute JS see an empty shell — and depending on cache state can get a 404-looking response.
- We need `/privacy` to return a complete static HTML privacy policy (same content Twilio reviewers expect).

## Fix

1. **Create `public/privacy/index.html`** — copy of the current `public/privacy-policy/index.html`, with:
   - `<link rel="canonical" href="https://showingops.lovable.app/privacy" />`
   - Internal links unchanged (`/`, `/terms`).
   - All existing legal copy preserved verbatim (sections 1–9, address, contact).

2. **Update `public/privacy-policy/index.html`** so the old path still works but points crawlers at the canonical `/privacy`:
   - Change `<link rel="canonical">` to `https://showingops.lovable.app/privacy`.
   - Add `<meta http-equiv="refresh" content="0; url=/privacy" />` so any old inbound link forwards to `/privacy`.
   - Leave full content in place as a fallback for non-JS clients that ignore the refresh.

3. **Leave React app alone** — `App.tsx` already has `<Route path="/privacy">`, and `Footer.tsx` already links to `/privacy`. No code changes there.

4. **Verify after publish**: `curl -sI https://showingops.com/privacy` returns `200` and `curl -s https://showingops.com/privacy | grep "Privacy Policy"` shows the static H1 — confirming bots get full HTML without running JS.

## Why this is safe

- No business logic, no form, no consent flow touched.
- Static `/privacy/index.html` is served directly by Lovable's static hosting (takes precedence over the SPA fallback), so crawlers get raw HTML on first byte.
- `/privacy-policy` keeps working for any legacy reference Twilio may have cached.
