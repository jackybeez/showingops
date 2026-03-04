
## What needs to change

The current site has most of the foundation in place. Here's a precise summary of what's new vs. what needs updating:

### 1. index.html
- Replace `<title>` with "ShowingOps | AI Workflow Agent for Real Estate Brokerages"
- Replace `<meta name="description">` with the exact new text
- Remove `<meta name="twitter:site" content="@Lovable">` (Lovable branding)
- Add all 9 `business:contact_data` meta tags
- Add `<noscript>` block in `<body>` with full static content

### 2. /sms-opt-in page (SmsOptIn.tsx) — significant rework
Current page only has: phone, checkbox (wrong text), single-field form
New page needs:
- New headline: "Opt In to ShowingOps SMS Notifications"
- New description paragraph above form
- Fields: First Name, Last Name, Phone Number, Email, Brokerage Name
- Checkbox text update to the full new exact wording
- Button text: "Opt In to SMS Notifications"
- Success message update
- Links to Privacy Policy + Terms directly below form

The edge function `submit-sms-optin` will need to accept the extra fields. The `sms_optins` table needs new columns too — will need a DB migration for `first_name`, `last_name`, `email`, `brokerage_name`.

### 3. /privacy page (PrivacyPolicy.tsx) — content updates
- Address update: add "Apt 620" 
- Add explicit "We do NOT sell or share phone numbers with third parties under any circumstances"
- Update SMS section: types of messages (lead alerts, follow-up reminders, approval prompts), frequency varies by lead activity, reply HELP for help
- Update contact address to include Apt 620

### 4. /terms page (Terms.tsx) — address update
- Add "Apt 620" to address

### 5. Footer (Footer.tsx) — address update
- Change "4150 Jason St" to "4150 Jason St, Apt 620"

### 6. Homepage (Index.tsx) — checkbox text update
- Update SMS checkbox text from "...Reply STOP to unsubscribe at any time." to "...Reply STOP to opt out at any time."
- The consent line below button is already present

### 7. Lovable branding removal
- Remove `<meta name="twitter:site" content="@Lovable">` from index.html
- Check if any badge is showing (the Lovable badge is controlled via project settings, not code — I'll note this)

### 8. DB migration
The `sms_optins` table needs new columns: `first_name`, `last_name`, `email`, `brokerage_name`. Need a migration for this.

### 9. Edge function update
`submit-sms-optin` needs to accept and store the new fields.

### Files to change
- `index.html` — meta tags, title, noscript
- `src/pages/SmsOptIn.tsx` — full form rework
- `src/pages/PrivacyPolicy.tsx` — content updates
- `src/pages/Terms.tsx` — address fix
- `src/components/Footer.tsx` — address fix
- `src/pages/Index.tsx` — checkbox text tweak
- `supabase/functions/submit-sms-optin/index.ts` — accept new fields
- DB migration for `sms_optins` new columns
- CSS additions for multi-field form layout
