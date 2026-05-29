# Twilio A2P Re-submission Plan

## 1. Crawlability — confirmed

Yes, 100%. Here's exactly what a no-JS bot (Twilio, Googlebot, anything with `curl`) sees today on `showingops.lovable.app`:

- `/`, `/sms-opt-in`, `/privacy`, `/privacy-policy`, `/terms` — all return raw HTML on the very first response (no JS execution required).
- The SMS opt-in form, the unchecked consent checkbox, the exact TCPA language ("Message and data rates may apply", "Reply STOP to opt out", "Reply HELP for help"), the Privacy Policy ("text messaging originator opt-in data and consent will not be shared with any third parties"), and the Terms ("SMS Terms") are all present in the raw HTML source.
- `robots.txt` explicitly allows all user agents.
- Static HTML files exist at `public/sms-opt-in/index.html`, `public/privacy-policy/index.html`, `public/terms/index.html`, and the SPA shell `index.html` carries a full `<noscript>` mirror of every page. Twilio's crawler cannot miss it.

There is nothing more to do for crawlability. If they still claim they can't see it, the issue is on their end, not ours.

## 2. Why Twilio actually rejected the CTA

"CTA" in A2P 10DLC review = **Call-to-Action**, meaning *the exact place and wording where a user opts in to SMS*. It is **not** marketing copy. Twilio reviewers want to see, on the public website, a flow that matches what you wrote in your campaign submission:

1. A clearly labeled opt-in (not buried under "early access" or "waitlist" — those words make reviewers think SMS is a side-effect of joining a waitlist, which is a red flag for them).
2. An unchecked consent checkbox the user must tick.
3. Exact disclosures next to the checkbox: program name, message types, frequency, "Msg & data rates may apply", "Reply STOP to cancel, HELP for help", and a link to Privacy Policy + Terms.
4. Privacy Policy must say opt-in data is not shared. (Already done.)

The current page uses "Join the Waitlist", "Get Early Access", "Be the first to know when we launch" — reviewers read this as a marketing list, not an SMS service, and reject it.

## 3. What I'll change

### A. Homepage (`src/pages/Index.tsx`)
- Remove "Coming Soon" badge → replace with "SMS Notifications".
- Headline subtext: remove "Early access for brokerages only".
- Email form button: "Join the Waitlist" → **"Sign Up"**. Heading copy near it stays product-focused (no waitlist language).
- SMS section:
  - Eyebrow "Early Access" → **"SMS Sign-Up"**
  - Heading "Be the first to know when we launch." → **"Sign up for ShowingOps SMS notifications."**
  - Sub: "Get launch updates and priority access directly to your phone." → **"Receive lead alerts, follow-up reminders, and workflow approval prompts from ShowingOps. Msg frequency varies. Msg & data rates may apply. Reply STOP to cancel, HELP for help."**
  - Button "Get Early Access" → **"Sign Up for SMS"**.
  - Checkbox label rewritten to the exact Twilio-preferred form: *"By checking this box, I agree to receive SMS messages from ShowingOps including lead notifications, follow-up reminders, and workflow approvals. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. See our [Privacy Policy] and [Terms]."* (with real links)
- Nav link "Enable SMS Notifications" stays — it's already good.

### B. Standalone `/sms-opt-in` page (`public/sms-opt-in/index.html` + `src/pages/SmsOptIn.tsx`)
- Rename heading from any "early access" wording to **"Sign up for ShowingOps SMS notifications"**.
- Mirror the exact checkbox language above.
- Ensure both the static HTML and the React version match word-for-word — Twilio reviewers may screenshot either one.

### C. Static `<noscript>` mirror in root `index.html`
- Update the embedded copy to match the new wording so the no-JS view matches the live view exactly. (Mismatch between `<noscript>` and rendered page is itself a rejection risk.)

### D. Footer / misc
- No structural changes; links already correct.

## 4. Extra tips from prior Twilio A2P rejections

These move the needle more than copy changes alone:

1. **Re-submit with screenshots.** In the campaign re-submission, attach a screenshot of `/sms-opt-in` showing the form + checkbox + disclosures, and a screenshot of the Privacy Policy section that says opt-in data won't be shared. Reviewers approve faster when they don't have to hunt.
2. **Paste the opt-in URL directly into the "Call to Action / Message Flow" field** — e.g. `https://showingops.lovable.app/sms-opt-in`. Don't just say "see our website".
3. **Sample messages must match the use case.** If your campaign says "Account Notifications", your sample messages should look like `"ShowingOps: New lead assigned to you - Jane Doe, 123 Main St. Reply STOP to opt out."` — not marketing/promo content.
4. **Opt-in keywords field**: enter `START`. Opt-out: `STOP`. Help: `HELP`. These must be handled by your number.
5. **Brand vetting**: make sure the Brand registered with TCR matches "ShowingOps" exactly and the website URL on the Brand matches the URL Twilio is crawling.
6. **Volume/throughput**: keep daily message volume low (under 200/day) on the first submission. Easier to get approved, can raise later.

## 5. Files touched

- `src/pages/Index.tsx` — copy changes only
- `src/pages/SmsOptIn.tsx` — copy changes only
- `public/sms-opt-in/index.html` — copy changes only
- `index.html` — update `<noscript>` mirror to match

No backend, schema, or routing changes. Pure copy + crawlable-HTML alignment.
