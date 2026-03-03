
## Plan: Landing Page Compliance & Data Collection Updates

This is a substantial update touching 10 requirements. Here's the breakdown:

### What needs to change

**1. SMS opt-in section on main page (Index.tsx)**
- Update checkbox text to exact: "I agree to receive SMS notifications from ShowingOps. Message and data rates may apply. Reply STOP to unsubscribe at any time."
- Add message below form submit button: "By joining you agree to receive SMS and email communications from ShowingOps. Reply STOP to opt out at any time."
- Make checkbox required before submission (already present, just verify)

**2. Also update SmsOptIn.tsx**
- Same checkbox text update
- Add the consent message below submit button

**3. Privacy Policy page (PrivacyPolicy.tsx)**
- Update to explicitly include: data we collect, SMS communication usage, opt-out instructions

**4. Terms of Service page (Terms.tsx)**
- Review/update as needed

**5. Footer updates (Index.tsx, PrivacyPolicy.tsx, Terms.tsx, SmsOptIn.tsx)**
- Change email to `showingops@gmail.com` (currently `hello@showingops.com`)
- Add physical address: 4150 Jason St Denver, CO 80211
- Add phone: +1 (970) 309-5645
- Add a visible link to the SMS opt-in page (not just footer)

**6. Nav email update**
- Same email change across all pages

**7. Store waitlist signups & SMS opt-ins**
- This requires a backend. I'll use **Lovable Cloud** (no external Supabase needed) to spin up a small backend with a Supabase table + edge function
- Create two tables: `waitlist_signups` (email, created_at) and `sms_optins` (phone, agreed_at)
- Create edge functions to insert into these tables
- Wire up the forms to call the edge functions on submit

### Files to touch
- `src/pages/Index.tsx` — SMS form text, consent message, link to opt-in page, call edge function
- `src/pages/SmsOptIn.tsx` — SMS form text, consent message, call edge function
- `src/pages/PrivacyPolicy.tsx` — Updated content + footer
- `src/pages/Terms.tsx` — Footer email/address/phone
- `src/App.css` — Footer layout for address/phone
- `supabase/functions/submit-waitlist/index.ts` — New edge function
- `supabase/functions/submit-sms-optin/index.ts` — New edge function
- Supabase migrations for the two tables

### Order of operations
1. Set up Lovable Cloud + DB tables via migrations
2. Create two edge functions
3. Update all 4 page files (footer + form logic)
4. Update CSS for footer address/phone layout

### Clarification on requirement 9
"opt-in page linked and not only in the footer" — I'll add a link/button in the main hero section or nav to the `/sms-opt-in` page.

### Shared footer component
Rather than update 4 separate files, I'll extract a `Footer` component to keep things DRY and consistent.
