## Direction: Editorial high-contrast reveal (v3)

Rebuild the ROI calculator as one bonded unit — white input rail on the left, full-bleed navy verdict panel on the right — and add a real lead-capture finale. Sliders stay.

## Layout

```text
┌──────────────────────┬───────────────────────────────┐
│  WHITE  (5 cols)     │  NAVY  (7 cols)               │
│                      │                               │
│  Your numbers        │  ● YOUR ESTIMATE              │
│                      │                               │
│  Leads/mo      12    │  COMMISSION YOU COULD RECOVER │
│  ▓▓▓▓▓▓░░░░░░░░      │                               │
│                      │  $9,000–$18,000   ← hero      │
│  Commission  $9,000  │                               │
│  ▓▓▓▓▓▓▓░░░░░░░      │  "plain-language sentence      │
│                      │   about their numbers"        │
│  Response     45m    │                               │
│  ▓▓▓▓░░░░░░░░░░      │  78x ROI  │  4.0 hrs/wk back  │
│                      │  vs $420/yr│ ≈$23,500 of time │
│  Going cold    35%   │  ─────────────────────────────│
│  ▓▓▓▓▓░░░░░░░░       │  45 min ──→ under 1 min       │
│                      │  costing ~$32,500/yr today    │
│  ▸ How we calculate  │  ─────────────────────────────│
│  ─────────────────   │  [ Email me my ROI breakdown ]│
│  Speed-to-lead note  │  [ your@email.com ]  [ Send ] │
└──────────────────────┴───────────────────────────────┘
```

Single rounded container, `overflow-hidden`, one border, one shadow. The two halves share a full-height seam, so no dead gap can appear regardless of column height. Below ~1024px it stacks: inputs first, navy panel second.

**Killing the leftover whitespace:** the left rail gets `flex flex-col`, sliders in a `flex-grow` group with generous even spacing, and the methodology `<details>` plus a short speed-to-lead credibility note pinned to the bottom with `mt-auto`. The rail fills its height with real content instead of air.

## Hierarchy — 8 flat cards become 4 tiers

1. **Hero:** recovered commission range, DM Serif Display at ~`text-6xl/7xl` in emerald on navy. The only element with real visual weight.
2. **Assessment sentence:** the existing personalized sentence, italic, ~`text-lg`, directly under the hero — it does the persuading in plain English.
3. **Two secondary stats:** ROI multiple and hours back, side by side, separated by a hairline `border-l`. No boxes.
4. **Loss + speed strip:** one bordered panel on `bg-white/5` combining speed-to-lead before/after with the cost-of-doing-nothing figure. Currently two separate cards; merging them makes the causal link obvious.

Cut as redundant: the standalone "value of that time" card (folds into the hours stat as a subline), the duplicate closings pill (already in the sentence), and the "recovering a single transaction pays for itself" line (the ROI multiple says it better).

## Motion

Hero number counts up on input change via the existing `useAnimatedNumber` hook, ~500ms cubic ease-out, `tabular-nums` so digits don't jitter. Secondary stats animate too but at lower emphasis. Add a `prefers-reduced-motion` guard that snaps to the target instead of animating — the current hook has none.

## The signup lever (the actual conversion change)

Replace the dead `#beta` anchor with an inline capture form in the navy panel:

- Heading: "Want this breakdown in writing?"
- Single email input + submit, plus a small "or start free" text link to `/#beta`.
- On submit, post to the existing `submit-beta` edge function with the four input values and computed outputs so you can see what numbers people are modeling. This needs new nullable columns on `beta_signups` (`roi_leads`, `roi_commission`, `roi_response_min`, `roi_cold_pct`, `roi_recovered_low`, `roi_recovered_high`) added via migration, plus the function passing them through.
- Success state swaps the form for a confirmation line; errors surface via the existing toast.
- Email is the only required field. No pre-checked anything, no SMS consent in this form — it stays entirely clear of the Twilio compliance surface.

Rationale: the moment someone sees a personalized dollar figure is the highest-intent moment on the page, and right now it captures nothing.

## Explicitly not doing

The prototype's "14-day trial · no credit card required" and "Secure Your $68,850 Recovery" CTA are dropped — an unsubstantiated trial claim and hype framing would undercut the conservative methodology that makes these numbers believable. Copy stays measured.

## Technical details

- `src/components/RoiCalculator.tsx` — restructure markup to the bonded two-panel layout; keep `estimateRecoveredClosings` math, `Field`, and `useAnimatedNumber` logic unchanged; add reduced-motion guard; extract the navy panel's capture form into a small local `RoiCaptureForm` component.
- `src/index.css` — add navy-panel-scoped slider styling if needed; any new values go in as semantic tokens, no hardcoded hex in components.
- `src/pages/RoiCalculatorPage.tsx` — no structural change; verify the `showIntro={false}` H1 above the section still reads correctly against the new panel.
- Migration — add the six nullable `roi_*` columns to `beta_signups`.
- `supabase/functions/submit-beta/index.ts` — accept and persist the optional `roi_*` fields; existing homepage submissions keep working unchanged.
- Verification: typecheck, then Playwright at 1440 and 390 wide to confirm no whitespace gap, hero legibility, and a successful capture submission.
