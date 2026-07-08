
# Homepage Conversion Upgrade — Plan

Goal: transform the homepage from "marketing site" into an "interactive product preview" so a realtor understands Showing Ops in under 60 seconds and wants to join the beta — without redesigning the existing visual identity (dark slate/amber, DM Serif/DM Sans, current nav, footer, hero).

Nothing about compliance, footer business info, Privacy, Terms, SMS opt-in flow, or the existing beta signup functionality will change.

## Structure

Single-page scroll (keeps SEO + Twilio crawlable identity simple), with new sections inserted into `src/pages/Index.tsx` in this order:

```text
Hero  (unchanged)
Trust strip  (unchanged)
NEW  1. See Showing Ops in Action     (interactive lifecycle walkthrough)
NEW  2. Meet Your Operations Feed     (animated activity timeline mock)
     3. Problem                        (existing, kept)
     4. How it works                   (existing, kept)
NEW  5. What Showing Ops Actually Handles  (replaces / upgrades existing Capabilities grid)
NEW  6. ROI Calculator                 (interactive)
     7. AI Operations Manager narrative (existing, kept)
     8. Outcomes + Vision              (existing, kept)
NEW  9. Founding Member section       (wraps existing BetaWaitlist — form itself untouched)
Footer  (unchanged)
```

Existing "Capabilities" grid gets replaced by the new "What Showing Ops Actually Handles" section since they overlap; content is expanded with the 10 items requested.

## New Sections — Detail

### 1. See Showing Ops in Action  (`src/components/LeadLifecycleDemo.tsx`)
- Auto-advancing stepper of the exact lead flow described (assigned → detected → call prompt → no answer → drafted text → approved → reply → showing times → FUB updated → done).
- Left column: vertical step rail with active-step highlight, check marks fill in as it progresses.
- Right column: a phone/card mock that swaps content per step (approval card, call screen, drafted SMS with Approve button, incoming reply bubble, showing-times chip picker, "FUB updated" confirmation).
- Controls: Play / Pause / Restart, and clickable steps to jump. One "YES / NO" prompt is actually clickable and branches (NO → shows "we'll follow up later" path; YES → continues main flow) so the visitor feels agency.
- Pure CSS transitions + a small `useEffect` interval. No new deps.

### 2. Meet Your Operations Feed  (`src/components/OperationsFeed.tsx`)
- Faux live activity log styled like Linear/Vercel event feeds.
- Timestamped rows (11:02 AM … 11:20 AM) that fade/slide in one at a time on scroll into view, then loop subtly.
- Each row: time · status dot (accent) · icon · event label · tiny meta (e.g. "Follow Up Boss", "SMS", "Calendar").
- Small "Live" pill in the header with pulsing dot.

### 3. What Showing Ops Actually Handles  (replaces current Capabilities grid)
- Modern card grid (matches existing card styling) with all 10 items: Speed-to-Lead, Guided calling workflow, AI-generated follow-up drafts, SMS & email coordination, Conversation memory, Showing scheduling, Automatic Follow Up Boss updates, Activity timeline, Intelligent follow-up sequences, Quiet hours & compliance.
- One realtor-benefit sentence each. Keeps the "Differentiator" accent on CRM automation.
- Framed with clarifier copy: "Showing Ops takes over after a lead is assigned — it is not just an AI texting tool."

### 4. ROI Calculator  (`src/components/RoiCalculator.tsx`)
- Title: "What could faster follow-up be worth?"
- Inputs (shadcn `Slider` + numeric display):
  - Leads per month
  - Average commission ($)
  - Current avg response time (minutes)
  - % of leads that go cold
- Outputs (live-computed, animated number transitions):
  - Appointments recovered / mo
  - Revenue recovered / mo
  - Hours saved / mo
  - Estimated annual ROI
- Formulas (conservative, disclosed):
  - `recovered_cold_rate = min(0.5, response_time_minutes / 60 * 0.25)`
  - `appointments_recovered = leads * cold_pct * recovered_cold_rate * 0.4`
  - `revenue = appointments_recovered * commission * 0.25` (25% close on recovered appts)
  - `hours_saved = leads * 0.15` (9 min/lead of ops work)
  - `annual_roi = revenue * 12`
- Small disclaimer under the outputs: "Conservative estimates for illustration only — not a guarantee of results."

### 5. Founding Member section (wraps existing `BetaWaitlist`)
- New intro block above the existing form with the 6 value props listed (Free beta access, Locked-in pricing, White-glove onboarding, Direct founder access, Priority support, Shape the roadmap) as check-rows.
- Headline: "Founding Members". Sub: "A small group of brokerages and top producers helping shape Showing Ops."
- The `<BetaWaitlist />` form component and its Edge Function stay exactly as-is.

## Visual / UX Rules
- Reuse existing tokens only (`bg-card`, `border-border`, `text-accent`, `shadow-[var(--shadow-card)]`, `font-serif`, etc.). No new colors, no new fonts.
- Animations: rely on existing Tailwind keyframes (`animate-fade-in`, `animate-scale-in`) + small `setInterval`-driven step index. No new animation libs.
- All new UI is presentation-only React — no backend changes, no schema changes, no new env vars.

## Compliance / Untouched
- `src/components/BetaWaitlist.tsx` form fields, consent copy, SMS opt-in behavior: unchanged.
- `supabase/functions/*`, `waitlist_signups`, `sms_optins`: unchanged.
- `Footer.tsx`, `/privacy`, `/terms`, `/sms-opt-in`, `index.html` metadata, STOP/HELP language: unchanged.
- Business identity (Showing Ops, showingops.com, address, phone, email): unchanged.

## Files
- New: `src/components/LeadLifecycleDemo.tsx`, `src/components/OperationsFeed.tsx`, `src/components/RoiCalculator.tsx`, `src/components/FoundingMember.tsx`.
- Edit: `src/pages/Index.tsx` (insert sections, replace old Capabilities block with new "What Showing Ops Actually Handles", wrap BetaWaitlist inside FoundingMember).
- No edits to: Footer, BetaWaitlist internals, edge functions, index.html, legal pages, Tailwind config, index.css.

## Out of Scope (explicit)
- No redesign of hero, nav, colors, or typography.
- No new routes / pages — kept as one cohesive scroll per current IA.
- No new dependencies.
- No backend, DB, or auth changes.
