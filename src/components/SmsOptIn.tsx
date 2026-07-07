import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const SmsOptIn = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    brokerageName: "",
  });
  const [smsAgreed, setSmsAgreed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone.trim() || !termsAgreed) return;
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("submit-sms-optin", {
        body: {
          phone: form.phone,
          first_name: form.firstName,
          last_name: form.lastName,
          brokerage_name: form.brokerageName,
          sms_consent: smsAgreed,
        },
      });
      if (!error) setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15";

  return (
    <section id="sms" className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24 grid gap-12 md:grid-cols-2 md:items-start">
        <div>
          <span className="inline-block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-accent">
            SMS Notifications
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl leading-tight tracking-tight text-foreground">
            Opt in to workflow SMS notifications
          </h2>
          <p className="mt-4 text-[0.95rem] leading-7 text-muted-foreground max-w-md">
            ShowingOps sends transactional SMS workflow notifications to real
            estate agents and brokers who have explicitly opted in. Messages
            include workflow approval requests, lead assignment notifications,
            and task reminders specific to your account activity. ShowingOps
            does not send promotional or marketing messages of any kind.
            Message frequency varies. Msg &amp; data rates may apply. Reply
            STOP to opt out. Reply HELP for help.
          </p>
        </div>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-6 md:p-7 shadow-[var(--shadow-card)] flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground" htmlFor="firstName">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  placeholder="Jane"
                  value={form.firstName}
                  onChange={handleChange}
                  className={`${inputCls} mt-1.5`}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground" htmlFor="lastName">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  placeholder="Smith"
                  value={form.lastName}
                  onChange={handleChange}
                  className={`${inputCls} mt-1.5`}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground" htmlFor="phone">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="(555) 000-0000"
                value={form.phone}
                onChange={handleChange}
                className={`${inputCls} mt-1.5`}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-foreground" htmlFor="brokerageName">
                Brokerage name
              </label>
              <input
                id="brokerageName"
                name="brokerageName"
                type="text"
                required
                placeholder="Acme Realty Group"
                value={form.brokerageName}
                onChange={handleChange}
                className={`${inputCls} mt-1.5`}
              />
            </div>

            <label className="flex items-start gap-2.5 text-[0.78rem] leading-[1.55] text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={smsAgreed}
                onChange={(e) => setSmsAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-accent"
              />
              <span>
                (Optional) I agree to receive SMS workflow notifications from
                ShowingOps at the phone number provided. These messages
                include workflow approval requests, task reminders, and lead
                assignment notifications specific to my account. This is not a
                condition of any purchase or service. Message frequency varies
                based on account activity. Message and data rates may apply.
                Reply STOP to opt out at any time. Reply HELP for help.
              </span>
            </label>

            <label className="flex items-start gap-2.5 text-[0.78rem] leading-[1.55] text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                required
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-accent"
              />
              <span>
                I have read and agree to the{" "}
                <Link to="/privacy" className="text-secondary underline underline-offset-2">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link to="/terms" className="text-secondary underline underline-offset-2">
                  Terms of Service
                </Link>
                .
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-1 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? "Signing up…" : "Sign up for SMS notifications"}
            </button>
          </form>
        ) : (
          <div className="rounded-2xl border border-accent/30 bg-accent/10 p-6 flex items-start gap-3 text-foreground">
            <CheckCircle2 className="mt-0.5 text-accent" size={22} />
            <div>
              <p className="font-semibold">You're signed up.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                You'll start receiving SMS notifications from ShowingOps. Reply
                STOP at any time to opt out.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SmsOptIn;
