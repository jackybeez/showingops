## Twilio compliance text cleanup

Text-only sweep. No visual/design changes. Logo/brand mark stays "ShowingOps"; all business/legal/compliance copy switches to "Showing Ops".

### Changes

**1. Domain: replace `showingops.lovable.app` → `showingops.com`** everywhere crawlable
- `index.html` (any remaining canonical/og/twitter/noscript/business info text)
- `public/privacy-policy/index.html`, `public/privacy/index.html` — canonical
- `public/terms/index.html` — canonical
- `src/pages/PrivacyPolicy.tsx`, `src/pages/Terms.tsx` — any URL references
- `src/pages/Index.tsx` — Business Information section
- Any other match found by ripgrep

**2. Business name: "ShowingOps" → "Showing Ops"** in legal/compliance/business-info contexts only
- Homepage Business Information section (`src/pages/Index.tsx`)
- Footer copyright line (`src/components/Footer.tsx`)
- Privacy Policy: title, opening line, contact block (both static HTML at `public/privacy*` and React `src/pages/PrivacyPolicy.tsx`)
- Terms: title, opening line, contact block (both static HTML at `public/terms` and React `src/pages/Terms.tsx`)
- `index.html` noscript compliance/business info blocks
- Keep as "ShowingOps": nav logo, hero brand mark, product feature copy, page `<title>` brand suffix

**3. Address: add "Apt 620" + "United States"** everywhere
- New canonical form:
  ```
  Showing Ops
  4150 Jason St Apt 620
  Denver, CO 80211
  United States
  ```
- Update: `src/components/Footer.tsx`, `src/pages/Index.tsx` Business Info, `public/privacy/index.html`, `public/privacy-policy/index.html`, `public/terms/index.html`, `src/pages/PrivacyPolicy.tsx`, `src/pages/Terms.tsx`, `index.html` noscript blocks, any JSON-LD/meta address fields

**4. Preserved unchanged**
- Routes `/privacy` and `/terms` remain live (React routes + static HTML fallbacks under `public/`)
- All SMS compliance: opt-in language, STOP/HELP, consent checkbox, Privacy + Terms links, message frequency, rates disclosure
- Email `showingops@gmail.com`, phone `+1 (970) 309-5645`
- Visual design, layout, colors, typography

### Verification

After edits, run ripgrep across the repo to confirm zero matches for:
- `showingops.lovable.app`
- `4150 Jason St, Denver` (old comma form, without Apt 620)

And confirm Business Information / Privacy / Terms / Footer render "Showing Ops" as the legal name.
