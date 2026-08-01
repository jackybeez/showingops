## A) Give the calculator its own page

- New route `/roi-calculator` (`src/pages/RoiCalculatorPage.tsx`), wired in `src/App.tsx` above the catch-all.
- Page structure: same nav + footer as the landing page, an SEO-focused intro (H1 + short paragraph), the calculator, a short "what drives the numbers" explainer, an FAQ block (3-4 Q&As targeting search intent like "how much do realtors lose on slow lead follow-up"), and a CTA to the beta signup on `/`.
- Remove `<RoiCalculator />` from `src/pages/Index.tsx` (line 371). In its place, a compact teaser band: headline, one-line stat, and a button linking to `/roi-calculator`. Landing page gets meaningfully shorter.
- Add a nav link "ROI Calculator" pointing to `/roi-calculator` on both pages.

### SEO for the new page
- Per-route head tags (title < 60 chars, meta description < 160, canonical `https://showingops.com/roi-calculator`, og/twitter tags) set on mount.
- Single H1, semantic sections, JSON-LD: `WebApplication` + `FAQPage`.
- Static crawlable mirror at `public/roi-calculator/index.html` (same pattern as `/privacy`, `/terms`, `/lead-optin`) so bots read the copy and FAQ without JS.
- Add the URL to `public/robots.txt` sitemap reference only if a sitemap exists; otherwise leave robots alone.

## B) Make the output actually compelling

The problem is the framing, not the math: hours-saved is the weakest number and it's competing with the price. Fixes:

1. **Lead with money, not minutes.** Promote "Commission potential" to the hero metric alongside recovered closings; demote hours saved to a supporting chip. A realtor reads "$9,000–$18,000" and stops scrolling.
2. **Add an ROI multiple.** New line: "That's roughly Nx your annual Showing Ops cost" computed against $35/mo ($420/yr). Even one recovered $9k closing = ~21x. This is the "wow shit" number and it directly kills the "1.8 hrs for $35" comparison.
3. **Reframe hours as dollars.** Show hours saved *and* their value at the agent's own implied hourly rate (commission-based), e.g. "1.8 hrs/wk ≈ 94 hrs/yr ≈ $X of your time back." Hours alone feel small; hours priced feel large.
4. **Raise the input floor so defaults look real.** Default leads 8 → 12, and widen the time model: follow-up, scheduling, and coordination realistically run closer to 60 min/lead plus 3 hrs/wk baseline ops, so a typical agent sees 4-7 hrs/wk instead of 1.8. Still conservative, still disclosed in the "How we calculate this" details.
5. **Add a "cost of doing nothing" line.** Mirror the upside as loss: "Leads going cold are costing you about $X a year right now." Loss aversion converts better than gain framing.
6. **Cap the promise honestly.** Keep the existing rounding-to-whole-deals, the 6-27% recoverable band, and the "estimates, not guarantees" disclaimer. Update the details copy to match new assumptions.

## Technical notes
- `RoiCalculator.tsx` stays a component; only its assumption constants, layout hierarchy, and the new ROI-multiple / time-value / cost-of-inaction blocks change.
- Monthly price ($35) becomes a named constant in the component so it's a one-line change later.
- Nav/footer get extracted only if reuse is trivial; otherwise the new page duplicates the small markup rather than risking a refactor of `Index.tsx`.

## Files touched
- `src/pages/RoiCalculatorPage.tsx` — new
- `public/roi-calculator/index.html` — new (static mirror)
- `src/App.tsx` — add route
- `src/pages/Index.tsx` — remove section, add teaser + nav link
- `src/components/RoiCalculator.tsx` — reframed outputs and assumptions

## Verification
Typecheck, then curl `/roi-calculator` (React route + static mirror) and `/` to confirm 200s and that the new copy appears in raw HTML.
