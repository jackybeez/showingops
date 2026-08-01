Yes — I'm with you. Showing Ops is the always-on operations teammate, not follow-up software. This is a copy-only pass: no layout, palette, form logic, or compliance changes.

## Positioning spine (used everywhere)

- One line: "Showing Ops is the always-on AI operations platform for real estate."
- Promise: it continuously manages the operational work behind every transaction, and only involves the agent when their expertise is actually needed.
- Banned words enforced across all copy: revolutionary, game-changing, AI-powered, cutting edge, automate everything, seamless, streamline, plus "AI texting," "CRM automation," and "AI employee" (replaced with "operations teammate" / "operations platform").

## Homepage (`src/pages/Index.tsx`)

- Hero: keep "No lead ever slips through the cracks." Rewrite subhead to the operational-teammate framing — continuously monitors leads, conversations, CRM activity, tasks, and approvals; the agent steps in only when judgment is required.
- Nav labels stay, but "The Manager" becomes "The Platform."
- Problem section: reframe the four cards to the real causes — delayed follow-up, forgotten conversations, outdated CRM data, lost context, dropped tasks, not enough hours.
- Capabilities: collapse 12 feature cards into 6 outcome-led groups (Response & follow-up, Conversation memory & context, CRM accuracy, Scheduling & preparation, Reminders & task management, Decisions that need you). Fewer cards, calmer page, less feature-listing.
- "While you're showing homes…" section: rewrite the checklist in outcome language and drop chief-of-staff phrasing in favor of operations teammate.
- Outcomes section: rewrite to "I don't have to manage everything anymore" territory.
- Vision section: widen beyond SMS/follow-up — conversation and call intelligence, operational summaries, showing preparation, task creation, team and brokerage visibility, framed as the operating system quietly running a real estate business, with roadmap items still marked as roadmap.
- ROI teaser: reframe from "inconsistent follow-up" to the cost of operational drag.

## Supporting sections

- `LeadLifecycleDemo.tsx`: keep the mechanics; retitle section copy so the demo reads as operational workflow, not a texting sequence.
- `OperationsFeed.tsx`: replace "Watch your AI employee quietly working" with operations-platform language; keep the timestamped-record trust points.
- `FoundingMember.tsx`: light tone pass only — perks and beta framing stay.
- `RoiCalculator.tsx` / `RoiCalculatorPage.tsx`: headline and framing shift from follow-up speed to hours of operational work removed. Calculation logic, sliders, and the 4-hour minimum are untouched.

## Metadata and static mirrors

- `index.html`: new title (<60 chars) and meta description (<160 chars) on the operations-platform positioning, with matching og/twitter title and description.
- The `<noscript>` block in `index.html` gets the same marketing-copy updates so crawlers see identical text — every SMS consent line, TCPA disclosure, "(Optional)" label, and legal wording stays byte-identical.
- Privacy Policy, Terms, `/sms-opt-in`, `/lead-optin`, and all `public/*/index.html` mirrors: not touched.

## Verification

Grep the whole repo for the banned-word list and for the removed phrasings to confirm zero remaining hits, then screenshot the homepage and `/roi-calculator` at desktop and mobile widths to confirm no copy overflow or broken layout.
