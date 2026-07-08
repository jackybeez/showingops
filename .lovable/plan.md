## Plan

Fix the ROI calculator so it matches how realtors actually think about leads, follow-up, and closings.

### 1. Rescale the lead input
- Change **New leads per month** to start at `1` and max at `30`.
- Set the default around `6–8` so the first impression feels realistic.
- Keep the slider useful for both solo agents and higher-volume teams.

### 2. Replace fractional closings with realtor-friendly outcomes
- Remove output like `+0.6 closings/year`.
- Use whole-number language instead, such as:
  - `1 likely missed closing / year`
  - `0–1 missed closings / year`
  - `2 likely missed closings / year`
- For lower-volume scenarios, show ranges or probability-style copy instead of fake precision.
- The calculator should never imply someone can close “half a house.”

### 3. Make the math more credible
- Base the model on realistic lead volume and conservative assumptions:
  - Follow-up/admin time: about **45 minutes per lead**
  - Baseline weekly ops/admin work included separately
  - Only a small share of delayed/cold leads become appointments
  - Only a conservative share of those appointments become closed deals
- Under-promise the revenue estimate rather than inflate it.

### 4. Fix the results layout
- Remove the awkward three-card grid with an empty fourth space.
- Use either:
  - a clean 2x2 set of four balanced result cards, or
  - one larger primary result with two supporting metrics underneath.
- Keep the current premium visual identity, colors, typography, spacing, and tokens.

### 5. Rewrite the calculator copy
- Make the section feel less like a generic SaaS ROI calculator and more like a real estate follow-up calculator.
- Emphasize the core question: “What happens when leads wait too long?”
- Keep the disclaimer and assumptions visible, plain-English, and credible.

### Files to update
- `src/components/RoiCalculator.tsx` only.

### What will not change
- No redesign of the overall site.
- No backend changes.
- No changes to waitlist logic, compliance pages, navigation, or brand styling.