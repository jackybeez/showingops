import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";

const LeadOptIn = () => {
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!phone.trim()) {
      setError("Please enter your mobile phone number.");
      return;
    }
    if (!consent) {
      setError("Please check the consent box to be contacted by text.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 px-6 py-16">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold mb-8">
          Request Real Estate Info
        </h1>

        {submitted ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
            <p className="text-emerald-900 font-medium">Thank you.</p>
            <p className="text-emerald-800 mt-2">
              A licensed real estate agent will contact you shortly by text about your inquiry.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Mobile Phone Number<span className="text-red-600">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="(555) 555-5555"
                autoComplete="tel"
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-5 w-5 shrink-0"
              />
              <label htmlFor="consent" className="text-sm text-slate-800 leading-relaxed">
                Yes, I'd like a licensed real estate agent to contact me by text message about my real estate inquiry. I understand these are conversational messages related to my request.
              </label>
            </div>

            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <p>
                <strong>Message Frequency:</strong> Message frequency varies based on your conversation.
              </p>
              <p>
                <strong>Standard Rates:</strong> Message and data rates may apply depending on your mobile plan.
              </p>
              <p>
                <strong>Help &amp; Stop:</strong> Reply HELP for help or STOP to opt out at any time. By providing your number and checking this box, you agree to be contacted by your real estate agent/brokerage — and Showing Ops acting on the agent's behalf — by text about your inquiry. Consent is not a condition of any purchase.
              </p>
              <p>
                <Link to="/terms" className="underline">Terms of Service</Link>
                {" · "}
                <Link to="/privacy" className="underline">Privacy Policy</Link>
              </p>
            </div>

            {error && (
              <p className="text-sm text-red-600" role="alert">{error}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-md bg-slate-900 text-white px-6 py-3 font-medium hover:bg-slate-800 transition-colors"
            >
              Yes, contact me
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default LeadOptIn;
