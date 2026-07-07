
# ShowingOps homepage repositioning + beta waitlist

Reframe the site as an **AI Operations Platform for Real Estate** ("AI Chief of Staff for realtors"), replace the dark/gloomy palette with a light, premium SaaS look, and add a real beta waitlist — while leaving every Twilio/TCR compliance surface functionally identical.

---

## Guardrails (do NOT change)

- SMS opt-in form fields, labels, `(Optional)` prefix, STOP/HELP text, Msg & data rates disclosure.
- Privacy Policy (`/privacy`, `/privacy-policy/`) and Terms (`/terms`) — content and URLs.
- Static crawlable HTML (`index.html`, `public/privacy/`, `public/privacy-policy/`, `public/terms/`) — copy stays intact; only visual styling may be lightly refreshed if needed.
- `submit-sms-optin` edge function, `sms_optins` table, contact email `showingops@gmail.com`.
- Terms checkbox stays the only required checkbox on the SMS form.

---

## 1. New design system (light, professional)

Replace tokens in `src/index.css` and register them in `tailwind.config.ts`. Palette from the user:

```
--background:    #F8FAFC   (page)
--card:          #FFFFFF
--foreground:    #111827   (text)
--muted-fg:      #6B7280
--border:        #E5E7EB
--primary:       #111827   (deep navy — brand/buttons)
--accent:        #10B981   (emerald — highlights, success chips)
--secondary:     #2563EB   (secondary CTA / links)
--success:#16A34A  --warning:#F59E0B  --destructive:#DC2626
```

- Typography: keep DM Serif Display for headlines, DM Sans for body — retune sizes (larger, more air).
- Add subtle shadows (`0 1px 2px rgba(17,24,39,0.04), 0 8px 24px -12px rgba(17,24,39,0.08)`), 12px radius on cards, generous section padding.
- Retire the amber glow / dark gradient. Hero background becomes soft white with a faint emerald→blue gradient wash and a subtle grid pattern (Linear-style).

---

## 2. Homepage structure (`src/pages/Index.tsx` — rewrite)

New section order:

1. **Nav** — logo left, links (Product, How it Works, Beta), "Join Beta" primary button right.
2. **Hero**
   - Eyebrow: "AI Operations Platform for Real Estate"
   - H1: **"No lead ever slips through the cracks."**
   - Sub: One sentence — an always-on AI that follows up, updates your CRM, and keeps every opportunity moving.
   - Primary CTA: "Join the Beta" → scrolls to waitlist. Secondary: "See how it works".
   - Right side: product workflow visualization (SVG/HTML, no image gen needed) — a vertical pipeline card showing Lead → Route → Follow-up → CRM update → Schedule → Human approval.
3. **Logo/trust strip** — placeholder "Built for teams at" line (kept generic; no fake logos).
4. **The Problem** — 4 short cards: Missed follow-up · Forgotten conversations · Stale CRM · Dropped opportunities.
5. **The Solution** — animated/step diagram of the ops loop (Lead → Route → Remind → Draft → Update CRM → Schedule → Repeat).
6. **Core Capabilities** — 8 feature cards in a bento/grid: Speed-to-Lead, AI Follow-up, CRM Automation, Smart Scheduling, AI Operational Memory, Inbox Management, Lead Intelligence, Human-in-the-loop Approvals.
7. **How It Works** — 3 steps: Connect your CRM · AI runs your operations · Close more deals.
8. **Why Realtors Love It** — outcome list with emerald checkmarks (more conversations, faster response, cleaner CRM, more appointments…).
9. **Future Vision** — short paragraph: "Becoming the operating system for residential real estate." Explicit note that some capabilities are on the roadmap.
10. **Beta Waitlist section** (id=`beta`) — new form (see §3).
11. **SMS Notifications section** (id=`sms`) — the existing SMS opt-in form, unchanged in fields/consent copy, restyled to match the new light theme. Includes the full compliance paragraph currently in the hero.
12. **Footer** — unchanged links, restyled.

Copy avoids: "chatbot", "automation", "ChatGPT", "LLM", "assistant". Uses: "AI Operations", "AI Chief of Staff", "operational memory", "always-on".

---

## 3. Beta waitlist (new)

**Backend — one migration:**

```sql
CREATE TABLE public.beta_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  brokerage text,
  team_size text,
  crm text,
  market text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.beta_signups TO anon;
GRANT ALL ON public.beta_signups TO service_role;
ALTER TABLE public.beta_signups ENABLE ROW LEVEL SECURITY;
CREATE POLICY anon_insert_beta ON public.beta_signups FOR INSERT TO anon WITH CHECK (true);
```

**Edge function** `supabase/functions/submit-beta/index.ts` — mirrors `submit-sms-optin`: CORS, Zod-validated body, service-role insert, JSON response.

**Frontend** — new `<BetaWaitlist />` component with fields Name, Email, Brokerage, Team Size (select: 1–5 / 6–20 / 21–50 / 50+), CRM (select: Follow Up Boss / kvCORE / Sierra / Chime / Other), Market (text). Success state mirrors SMS success card.

---

## 4. Compliance-safe changes to static HTML

- `index.html`: only update `<title>`, meta description, and OG tags to reflect new positioning ("AI Operations Platform for Real Estate"). The crawlable `<noscript>` SMS form + consent text stay byte-identical.
- `public/privacy/`, `public/privacy-policy/`, `public/terms/`, `/sms-opt-in` (if present): untouched.

---

## 5. Files touched

- `src/index.css`, `tailwind.config.ts` — new tokens.
- `src/pages/Index.tsx` — full rewrite around new sections; SMS form JSX preserved verbatim, moved into its own section component.
- `src/components/BetaWaitlist.tsx` (new), `src/components/SmsOptIn.tsx` (extracted from current hero), `src/components/WorkflowDiagram.tsx` (new SVG).
- `src/components/Footer.tsx` — restyle only.
- `supabase/functions/submit-beta/index.ts` (new).
- `index.html` — meta/title only.
- Migration for `beta_signups`.

---

## Verification

- Load `/`: new light theme, hero shows beta CTA, SMS section still present near footer with `(Optional)` prefix and Terms-only required.
- Submit SMS form with only Terms checked → still succeeds (no regression).
- Submit beta form → row appears in `beta_signups`.
- View-source of `/` still contains the full SMS consent paragraph and STOP/HELP language.
- `/privacy` and `/terms` return 200 with unchanged content.
