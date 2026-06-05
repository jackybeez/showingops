
# Make SMS consent checkbox optional

Twilio/TCR rejected because the SMS consent checkbox is currently `required` and `handleSubmit` blocks submission unless `smsAgreed` is true. Consent must be 100% optional.

## Changes (src/pages/Index.tsx only)

1. **Remove `required` from the SMS consent checkbox** and remove `smsAgreed` from the submit gate.
   - Current submit guard: `if (!form.phone.trim() || !smsAgreed || !termsAgreed) return;`
   - New: `if (!form.phone.trim() || !termsAgreed) return;`
   - Remove `required` attribute on the SMS consent `<input type="checkbox">`.
   - Keep the Terms of Service checkbox `required` (only required box).

2. **Prefix the SMS consent label with "(Optional)"**:
   - New text starts: `"(Optional) I agree to receive SMS workflow notifications from ShowingOps at the phone number provided. These messages include workflow approval requests, task reminders, and lead assignment notifications specific to my account. This is not a condition of any purchase or service. Message frequency varies based on account activity. Message and data rates may apply. Reply STOP to opt out at any time. Reply HELP for help."`

3. **Pass consent state to backend** so unchecked submissions don't get enrolled in SMS:
   - Send `sms_consent: smsAgreed` in the edge function payload (for record-keeping). No backend/schema changes in this plan — the existing function ignores unknown fields. If the user wants the DB to store the consent flag, that's a follow-up.

## Not changing

- Hero subtext copy, value props, footer, privacy policy, terms — all unchanged.
- No changes to `submit-sms-optin` edge function or DB schema.
- Terms of Service checkbox stays required.

## Verification after build

- Load `/`, fill name + phone + brokerage + check ONLY Terms → submit succeeds.
- Check both boxes → submit succeeds.
- Leave Terms unchecked → submit blocked.
