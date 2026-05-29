# Make SMS opt-in the primary CTA on the homepage

## Goal

Make it impossible for a Twilio A2P reviewer to miss the SMS sign-up. Remove the email form from the hero, put the full SMS opt-in form (phone + name + brokerage + checkbox + disclosures) directly in the hero, and have the existing `/sms-opt-in` page mirror it. No more "two paths" — one obvious path: sign up for SMS notifications.

## Changes

### A. Homepage (`src/pages/Index.tsx`) — hero becomes the SMS opt-in

Replace the current hero email form with the full SMS opt-in form, identical in fields and copy to `/sms-opt-in`:

- **Badge**: "SMS Notifications" (keep)
- **Headline**: "No lead ever falls *through the cracks.*" (keep)
- **Subtext**: Short product description (keep, slightly trimmed)
- **Form fields** (matching `/sms-opt-in` exactly):
  - First Name
  - Last Name
  - Phone Number
  - Email Address
  - Brokerage Name
  - Consent checkbox with full TCPA language and links to Privacy + Terms
  - Submit button: "Sign Up for SMS Notifications"
- **Below form**: small line "By signing up you'll receive SMS notifications from ShowingOps. Msg & data rates may apply. Reply STOP to cancel."

Remove the secondary "SMS section" lower on the page — it would now be a duplicate. Keep the Value Props section between hero and footer for context.

### B. Remove email waitlist from the homepage

- Delete the email-only form, its state, and the `submit-waitlist` function call from `Index.tsx`.
- Leave the `submit-waitlist` edge function and `waitlist_signups` table in place (don't break anything backend-side; just stop calling it from the UI). We can resurrect the email form post-Twilio-approval if you want.

### C. Nav

- Remove the "Enable SMS Notifications" nav link — the entire homepage *is* the SMS opt-in now, so the link is redundant and looks weird pointing to a near-duplicate page.
- Keep the `showingops@gmail.com` contact link.

### D. `/sms-opt-in` page stays as-is

- Twilio's CTA review almost always references a dedicated opt-in URL, so we keep `/sms-opt-in` intact. It now matches the homepage hero almost word-for-word, which is exactly what reviewers want to see.
- Footer links to it remain.

### E. Static `<noscript>` mirror in `index.html`

- Update the home section to show the same SMS opt-in form copy (so no-JS Twilio bots see SMS opt-in on `/` too, not a waitlist).

### F. Styling

- Reuse the existing `sms-form`, `sms-input`, `sms-checkbox-label`, `sms-field-group`, `sms-field-row` classes already defined for `/sms-opt-in`. The hero gets a slightly wider form container so it doesn't feel cramped; one small CSS addition in `App.css` for hero-form layout.

## Files touched

- `src/pages/Index.tsx` — rewrite hero, remove email form + duplicate SMS section
- `src/App.css` — minor hero form layout tweak
- `index.html` — update `<noscript>` home section to mirror new hero
- (no changes to `/sms-opt-in`, legal pages, edge functions, or DB)

## What the Twilio reviewer will see

1. Land on `showingops.lovable.app/`
2. See "SMS Notifications" badge → headline → 5-field form → unchecked consent checkbox with full TCPA language + Privacy/Terms links → "Sign Up for SMS Notifications" button.
3. Done. There is no other CTA, no waitlist, no ambiguity.

Want me to ship this?
