## Goals

Tighten three specific pieces without touching the visual identity, layout, or compliance surfaces:

1. Make the demo's final step visibly show a scheduled meeting (calendar view).
2. Rebalance the ROI calculator so numbers feel believable and the payoff feels meaningful.
3. Rewrite the "Join Beta" CTAs to be more enticing.

No new pages. No design system changes. Reuse existing tokens (`bg-card`, `text-accent`, `border-border`, DM Serif/DM Sans, existing shadows).

---

## 1. `LeadLifecycleDemo.tsx` — clearer "meeting scheduled" moment

Replace the current generic "Done / Sparkles" final card with a mini calendar mock so the outcome is obvious.

New final `MockCard` ("done" step):
- Header: "Showing confirmed" · tag "Added to calendar"
- A small week strip (Mon–Sun initials) with Thursday highlighted in `accent`.
- One prominent event block for Thursday:
  - Time: `Thu, Jul 9 · 3:00 PM`
  - Title: `Showing — John Smith`
  - Location line: `Denver, CO · 45 min`
  - A green `CheckCircle2` + "Confirmed with John" row.
- Small footer line: "Synced to your calendar & Follow Up Boss."

Also update the step rail entry for `done`:
- Title: "Showing scheduled on your calendar"
- Meta: "Thu, Jul 9 · 3:00 PM — confirmed with John"
- Icon: `CalendarCheck` (swap from `Sparkles`)

Keep animations, autoplay, branching, and step count identical. Pure presentation change inside the existing card.

---

## 2. `RoiCalculator.tsx` — believable inputs, more attractive outputs

### Slider ranges (rescaled)

| Field | Current | New | Default |
|---|---|---|---|
| Leads per month | 10–500 | 5–150 | 25 |
| Average commission | $2k–$30k | $4k–$20k | $9,000 |
| Current avg response time | 1–240 min | 5–180 min | 60 |
| Leads that go cold today | 5–80% | 10–70% | 45% |

### Formula rework (more realistic + more attractive hours)

Assumptions surfaced in a small "How we calculate this" collapsible under the results:

- `recoveredRate = clamp(responseMin / 120, 0.1, 0.6)` — faster follow-up recovers up to 60% of cold leads.
- `recoveredLeads = leads * (coldPct/100) * recoveredRate`
- `apptsRecovered = recoveredLeads * 0.45`
- `closeRate = 0.22`
- `revenueMonthly = apptsRecovered * closeRate * commission`
- `hoursMonthly = leads * 0.6 + 8` — reflects real per-lead follow-up work (~35 min/lead) plus baseline weekly ops. At 25 leads → ~23 hrs/mo; at 60 → ~44 hrs/mo. Much more compelling than 4 hrs.
- `annual = revenueMonthly * 12`

Round appts to 1 decimal, revenue/hours/annual to whole numbers.

### Copy tweaks
- Section eyebrow stays "ROI".
- Headline stays.
- Sub: "Move the sliders to match your business. See what one dropped lead per week is actually costing you."
- Rename metric labels for punch:
  - "Extra appointments / month"
  - "Revenue you're leaving on the table"
  - "Hours back every month"
  - "Recovered revenue / year"
- CTA button text → "Get my hours back" (see CTA section).

Add tiny "based on industry benchmarks" note next to the disclaimer.

---

## 3. Join Beta CTAs — more enticing copy

Audit every CTA and update in place. No new components.

| Location | Current | New |
|---|---|---|
| Nav (`Index.tsx` header) | "Join Beta →" | "Get early access →" |
| Hero primary CTA | (whatever "Join Beta" variant) | "Claim your founding spot →" |
| Hero secondary/inline | — | leave as is if it's "See it in action" |
| Lead Lifecycle Demo bottom (if present) | n/a | n/a |
| ROI calculator CTA | "Claim these hours back" | "Get my hours back →" |
| Founding Member section CTA area (`BetaWaitlist` submit button) | "Join Beta" | "Claim my founding spot →" |
| Any mid-page "Join Beta" strip | "Join Beta" | "Reserve early access →" |
| Footer CTA (if any) | "Join Beta" | "Get early access →" |

Also add a small trust microcopy line beneath the primary hero + waitlist CTAs (only where not already present):
> "Free during private beta · Locked-in founding pricing · No credit card"

Only edit the button label + adjacent microcopy — do not touch form logic, Edge Function calls, `BetaWaitlist` submission behavior, or SMS compliance text.

---

## Files touched

- `src/components/LeadLifecycleDemo.tsx` — final step card + rail entry.
- `src/components/RoiCalculator.tsx` — ranges, formulas, labels, CTA text.
- `src/components/BetaWaitlist.tsx` — submit button label + microcopy only (leave form/handler intact).
- `src/pages/Index.tsx` — nav + hero CTA labels, any inline "Join Beta" strings.
- `src/components/Footer.tsx` — CTA label if one exists there.

## Not touched

- Design tokens, fonts, colors, spacing scale.
- Supabase edge functions, tables, waitlist submission logic.
- SMS opt-in text, `/privacy`, `/terms`, `/sms-opt-in`, footer legal.
- Site structure — still a single-page flow.
