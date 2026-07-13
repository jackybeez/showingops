## A) New `/sms-opt-in` "Messaging Terms" page

**Create** a new React route `/sms-opt-in` and a matching static `public/sms-opt-in/index.html` (so bots crawl it without JS, matching the pattern used for `/privacy` and `/terms`).

Content (verbatim from the request):

- H1: **Showing Ops Messaging Terms**
- Intro paragraph explaining the two SMS types.
- Section 1: **Account & workflow notifications (to agents/team members).**
- Section 2: **Client follow-up (to consumers, sent on behalf of agents).**
- **Consent** paragraph clarifying consumers consent at inquiry submission and that agents are responsible for that consent.
- Closing compliance line: message/data rates, STOP/HELP, immediate opt-out honoring, "never sold or shared" line, and a link to the Privacy Policy.

Styling reuses the existing legal page pattern (`legal-container`, `legal-h2`, etc. — same as `PrivacyPolicy.tsx` and `Terms.tsx`) so it matches the site.

**Add route** in `src/App.tsx`: `<Route path="/sms-opt-in" element={<SmsOptInTerms />} />`.

**Footer** (`src/components/Footer.tsx`): add a new link labeled **"Messaging Terms"** pointing to `/sms-opt-in`, alongside the existing Privacy Policy and Terms & Conditions links.

## B) Update Lane 1 (agent sign-up) SMS consent checkbox copy

In `src/components/BetaWaitlist.tsx` and the crawlable `<noscript>` block in `index.html`, replace the current checkbox label text with:

> By checking this box, you agree to receive SMS messages from Showing Ops at the number provided — including workflow approval requests, task reminders, and lead-assignment and account notifications. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. See our [Privacy Policy] and [Messaging Terms].

- Keep the checkbox **optional** (no `required`, keep the "(Optional)" short-label above it as-is).
- Render `[Privacy Policy]` as a link to `/privacy` and `[Messaging Terms]` as a link to `/sms-opt-in` in both the React component and static HTML.

## C) Privacy Policy — add mobile clause

Add this exact paragraph to **both** `src/pages/PrivacyPolicy.tsx` and `public/privacy/index.html` (and `public/privacy-policy/index.html` if it still exists), inside Section 3 "SMS Communications" as a new standalone paragraph near the top of that section:

> Mobile phone numbers and SMS opt-in information collected for text messaging are not sold or shared with third parties or affiliates for marketing purposes. Message and data rates may apply. Reply STOP to opt out or HELP for help.

No other privacy sections change. `/privacy` and `/terms` already resolve (confirmed — `public/privacy/index.html` and `public/terms/index.html` exist and React routes are wired in `App.tsx`).

## Out of scope (item 3 in the request)

The suggested lead-form language for brokerage/team partner sites is guidance for onboarding brokerages to use on **their** lead forms — it does not belong on showingops.com and won't be added to the site. I'll note this back to you in chat after implementation; if you'd like it surfaced anywhere on showingops.com (e.g., a partner/onboarding doc), say the word.

## Files touched

- `src/pages/SmsOptInTerms.tsx` — new
- `public/sms-opt-in/index.html` — new (static, crawlable)
- `src/App.tsx` — add route
- `src/components/Footer.tsx` — add "Messaging Terms" link
- `src/components/BetaWaitlist.tsx` — update checkbox copy + links
- `index.html` — update `<noscript>` checkbox copy + links
- `src/pages/PrivacyPolicy.tsx` — add mobile clause
- `public/privacy/index.html` — add mobile clause
- `public/privacy-policy/index.html` — add mobile clause (if present)

## Verification

After edits: typecheck, then `curl` `/sms-opt-in`, `/privacy`, `/terms`, and `/` locally to confirm each returns 200 with the new copy visible in raw HTML (no JS required).
