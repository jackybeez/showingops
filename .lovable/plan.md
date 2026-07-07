## Goal

Refine ShowingOps homepage messaging and consolidate the two forms into a single "Join the Private Beta" experience. **No visual redesign** — keep palette, typography, spacing, and layout exactly as-is.

---

## 1. Messaging rewrite (`src/pages/Index.tsx`)

Positioning shift: from "AI that responds to leads" → "AI Operations Manager that runs the operational side of your business."

**Hero**
- Eyebrow: "AI Operations Manager for Real Estate"
- H1 stays: "No lead ever slips through the cracks."
- Sub: reframe to emphasize continuous background operations, not lead routing.
- Remove any language implying ShowingOps assigns/routes/distributes leads.

**Workflow / How It Works section — full rewrite to 6 steps:**
1. A new lead is assigned to you (through your CRM)
2. ShowingOps responds instantly — you get a notification, AI prepares first outreach
3. You stay in control — call now, approve an AI draft, or let approved workflows run
4. Your CRM updates itself — calls, texts, activities, notes, tasks, timeline
5. Appointments get coordinated — scheduling, calendar, showings, reminders
6. Nothing gets forgotten — continues until closed or lost

Update the hero's workflow visualization (pipeline card) to match this 6-step flow — same visual component, new labels.

**Capabilities (bento grid) — keep layout, rewrite copy** so each answers "why should I care?":
- Speed-to-Lead — respond to newly assigned leads in under a minute, even mid-showing
- Intelligent Follow-up — persistent personalized follow-up until someone responds
- CRM Automation — every call/note/task/activity written back automatically (flag as key differentiator)
- Smart Scheduling — coordinate using real calendar availability, no back-and-forth
- Operational Memory — remembers every conversation, preference, commitment, timeline
- Inbox Management — routine work stays automated; only important convos interrupt you
- Lead Intelligence — surface which leads deserve attention first based on engagement
- Human Approval — sensitive messages pause for approval; automation never goes rogue

**New section: "Your AI Operations Manager"** (inserted after Capabilities, before Beta)
- Narrative/story format, not cards
- Opening: "While you're showing homes, ShowingOps is…"
- Emerald-checkmark list: responding to newly assigned leads, following up with prospects, updating your CRM, drafting messages, scheduling appointments, remembering every conversation, watching for stalled opportunities, surfacing only what needs your attention
- Closer: "ShowingOps quietly runs the operational side of your business so you can focus on relationships and closing deals."

**Why Realtors Love It / Future Vision** — light copy pass to reinforce: continuous work, human approval, clean CRM, remembered conversations, background execution, more time selling.

---

## 2. Consolidate forms into one "Join the Private Beta" experience

Merge `BetaWaitlist` + `SmsOptIn` into a single `BetaWaitlist` section (id=`beta`). Remove the standalone SMS section from the page. The nav "SMS" link (if any) points to the same beta section or is removed.

**Single form fields:**
- Name (required)
- Email (required)
- Brokerage
- Team size (select)
- CRM (select)
- Primary market
- Phone number — labeled "(optional but recommended)"

**Below the form, optional SMS opt-in block (visible, crawlable, unchanged compliance text):**
- Checkbox: "I'd like to receive ShowingOps workflow notifications by SMS if I'm accepted into the beta."
- Directly underneath: the full existing Twilio consent paragraph verbatim (workflow approval requests, task reminders, lead assignment notifications, not a condition of purchase, message frequency varies, msg & data rates may apply, Reply STOP to opt out, Reply HELP for help).
- Required Terms + Privacy checkbox stays, with the same links to `/privacy` and `/terms`.

**Submission behavior:**
- Always POST to `submit-beta` with all fields including `phone` and `sms_consent` boolean.
- If `sms_consent === true` AND `phone` present, the edge function ALSO inserts into `sms_optins` (reusing the existing table + its compliance columns) so nothing about A2P recordkeeping changes.
- Success card: single unified "You're on the list" state.

**Backend changes:**
- Migration: `ALTER TABLE public.beta_signups ADD COLUMN phone text, ADD COLUMN sms_consent boolean NOT NULL DEFAULT false`.
- Update `supabase/functions/submit-beta/index.ts` to accept `phone` + `sms_consent`, insert into `beta_signups`, and conditionally insert into `sms_optins` when consent given.
- Keep `submit-sms-optin` function and `sms_optins` table untouched (still used, still compliant).

---

## 3. Static crawlable HTML (`index.html`)

The `<noscript>` SMS consent block must remain crawlable. Update it in place so it reflects the new unified experience while preserving every required disclosure:
- Keep the full "(Optional) I agree to receive SMS workflow notifications…" paragraph, STOP/HELP, msg & data rates, Privacy Policy + Terms links — byte-equivalent language.
- Wrap it under a heading like "Join the Private Beta — SMS notifications (optional)" so crawlers see it as part of the consolidated flow.
- No changes to `/privacy`, `/privacy-policy/`, `/terms/`, `/sms-opt-in`.

---

## 4. Guardrails (unchanged)

- All Twilio A2P consent language stays visible and crawlable.
- STOP / HELP / msg-frequency / msg & data rates disclosures preserved verbatim.
- Privacy Policy + Terms links preserved.
- `sms_optins` table + `submit-sms-optin` function untouched.
- No visual redesign — same tokens, fonts, spacing, shadows, section rhythm.

---

## Files touched

- `src/pages/Index.tsx` — messaging rewrite, new "AI Operations Manager" section, remove standalone SMS section
- `src/components/BetaWaitlist.tsx` — add phone field + optional SMS consent block with full compliance text
- `src/components/WorkflowDiagram.tsx` (or inline in Index) — relabel to 6-step flow
- `src/components/SmsOptIn.tsx` — deleted (language migrated into BetaWaitlist)
- `supabase/functions/submit-beta/index.ts` — accept phone + sms_consent, conditional sms_optins insert
- Migration — add `phone`, `sms_consent` to `beta_signups`
- `index.html` — restructure noscript block wording around unified beta flow, keep compliance verbatim

## Verification

- `/` shows one form labeled "Join the Private Beta" with phone + optional SMS checkbox and full consent text visible.
- Submitting with SMS checkbox unchecked → row in `beta_signups`, no row in `sms_optins`.
- Submitting with SMS checkbox checked + phone → row in both tables.
- View-source of `/` still contains STOP/HELP, msg & data rates, Privacy + Terms links.
- No lead-routing/assignment language anywhere on the page.
