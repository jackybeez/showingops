import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const ValueProp = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <div className="value-prop">
    <span className="value-prop-icon">{icon}</span>
    <div>
      <h3 className="value-prop-title">{title}</h3>
      <p className="value-prop-desc">{description}</p>
    </div>
  </div>
);

const Index = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    brokerageName: "",
  });
  const [smsAgreed, setSmsAgreed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [smsSubmitted, setSmsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone.trim() || !smsAgreed || !termsAgreed) return;
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("submit-sms-optin", {
        body: {
          phone: form.phone,
          first_name: form.firstName,
          last_name: form.lastName,
          brokerage_name: form.brokerageName,
        },
      });
      if (!error) setSmsSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      {/* Nav */}
      <header className="nav">
        <div className="nav-inner">
          <span className="logo">ShowingOps</span>
          <div className="nav-actions">
            <a href="mailto:showingops@gmail.com" className="nav-contact">
              showingops@gmail.com
            </a>
          </div>
        </div>
      </header>

      {/* Hero — SMS Opt-In is the primary CTA */}
      <main>
        <section className="hero">
          <div className="hero-image-wrap">
            <img src={heroBg} alt="" className="hero-image" aria-hidden="true" />
            <div className="hero-image-fade" />
          </div>

          <div className="hero-content">
            <div className="badge">
              <span className="badge-dot" />
              SMS Notifications
            </div>

            <h1 className="hero-headline">
              No lead ever falls<br />
              <em>through the cracks.</em>
            </h1>

            <p className="hero-subtext">
              ShowingOps is an AI-powered workflow agent for real estate brokerages.
              Sign up below to receive SMS notifications — new lead alerts, follow-up
              reminders, and workflow approval prompts — directly to your phone.
            </p>

            {!smsSubmitted ? (
              <form onSubmit={handleSubmit} className="sms-form sms-page-form hero-sms-form">
                <div className="sms-field-row">
                  <div className="sms-field-group">
                    <label className="sms-field-label" htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      placeholder="Jane"
                      value={form.firstName}
                      onChange={handleChange}
                      className="sms-input sms-text-input"
                    />
                  </div>
                  <div className="sms-field-group">
                    <label className="sms-field-label" htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      placeholder="Smith"
                      value={form.lastName}
                      onChange={handleChange}
                      className="sms-input sms-text-input"
                    />
                  </div>
                </div>

                <div className="sms-field-group">
                  <label className="sms-field-label" htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    value={form.phone}
                    onChange={handleChange}
                    className="sms-input sms-text-input"
                  />
                </div>




                <div className="sms-field-group">
                  <label className="sms-field-label" htmlFor="brokerageName">Brokerage Name</label>
                  <input
                    id="brokerageName"
                    name="brokerageName"
                    type="text"
                    required
                    placeholder="Acme Realty Group"
                    value={form.brokerageName}
                    onChange={handleChange}
                    className="sms-input sms-text-input"
                  />
                </div>

                <label className="sms-checkbox-label">
                  <input
                    type="checkbox"
                    required
                    checked={smsAgreed}
                    onChange={(e) => setSmsAgreed(e.target.checked)}
                    className="sms-checkbox"
                  />
                  <span>
                    By checking this box, I agree to receive SMS messages from ShowingOps
                    including lead notifications, follow-up reminders, and workflow approvals.
                    Msg frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out,
                    HELP for help. See our <Link to="/privacy" className="footer-email">Privacy Policy</Link> and{" "}
                    <Link to="/terms" className="footer-email">Terms</Link>.
                  </span>
                </label>

                <button type="submit" className="waitlist-btn sms-btn" disabled={loading}>
                  {loading ? "Signing up…" : "Sign Up for SMS Notifications"}
                </button>
              </form>
            ) : (
              <div className="sms-success">
                <CheckCircle2 size={20} />
                <div>
                  <p className="sms-success-title">You're signed up!</p>
                  <p className="sms-success-sub">
                    You'll start receiving SMS notifications from ShowingOps. Reply STOP at any time to opt out.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Value Props */}
        <section className="value-section">
          <div className="value-inner">
            <ValueProp
              icon="⚡"
              title="Automated follow-up"
              description="Every new lead triggers a smart workflow — SMS messages and reminders that run on your behalf without missing a beat."
            />
            <div className="value-divider" />
            <ValueProp
              icon="🔁"
              title="Human-in-the-loop approvals"
              description="Your agents stay in control. ShowingOps surfaces decisions that need a human touch — so automation never goes rogue."
            />
            <div className="value-divider" />
            <ValueProp
              icon="📊"
              title="Built for brokerages"
              description="Team-level visibility, agent accountability, and pipeline health — all in one place. Designed for how real estate teams actually work."
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
