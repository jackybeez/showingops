import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, CheckCircle2 } from "lucide-react";
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
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState("");
  const [smsAgreed, setSmsAgreed] = useState(false);
  const [smsSubmitted, setSmsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [smsLoading, setSmsLoading] = useState(false);

  const handleSmsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !smsAgreed) return;
    setSmsLoading(true);
    try {
      const { error } = await supabase.functions.invoke("submit-sms-optin", {
        body: { phone },
      });
      if (!error) setSmsSubmitted(true);
    } finally {
      setSmsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("submit-waitlist", {
        body: { email },
      });
      if (!error) setSubmitted(true);
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
            <Link to="/sms-opt-in" className="nav-sms-link">Enable SMS Notifications</Link>
            <a href="mailto:showingops@gmail.com" className="nav-contact">
              showingops@gmail.com
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
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
            ShowingOps is an AI-powered workflow agent built for real estate brokerages.
            It automates follow-up sequences, surfaces the right actions at the right time,
            and keeps your team in control with human-in-the-loop approvals.
          </p>

          {/* Email sign-up */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="waitlist-form">
              <input
                type="email"
                required
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="waitlist-input"
              />
              <button type="submit" className="waitlist-btn" disabled={loading}>
                {loading ? "Signing up…" : "Sign Up"}
              </button>
            </form>
          ) : (
            <div className="waitlist-success">
              <span className="success-check">✓</span>
              You're signed up — we'll be in touch soon.
            </div>
          )}

          <p className="waitlist-note">No spam. For real estate brokerages.</p>
          <p className="waitlist-consent">
            By signing up you agree to receive email communications from ShowingOps. To receive SMS notifications, opt in separately on our <Link to="/sms-opt-in" className="footer-email">SMS Opt-In page</Link>.
          </p>
        </div>
      </section>


        {/* Value Props */}
        <section className="value-section">
          <div className="value-inner">
            <ValueProp
              icon="⚡"
              title="Automated follow-up"
              description="Every new lead triggers a smart workflow — texts, emails, and reminders that run on your behalf without missing a beat."
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

        {/* SMS Opt-in */}
        <section className="sms-section">
          <div className="sms-inner">
            <div className="sms-text">
              <span className="sms-eyebrow">SMS Sign-Up</span>
              <h2 className="sms-heading">Sign up for ShowingOps SMS notifications.</h2>
              <p className="sms-sub">
                Receive new lead alerts, follow-up reminders, and workflow approval prompts from ShowingOps. Message frequency varies. Msg &amp; data rates may apply. Reply STOP to cancel, HELP for help.
              </p>
            </div>

            {!smsSubmitted ? (
              <form onSubmit={handleSmsSubmit} className="sms-form">
                <div className="sms-input-wrap">
                  <Phone size={15} className="sms-input-icon" />
                  <input
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="sms-input"
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
                    By checking this box, I agree to receive SMS messages from ShowingOps including lead notifications, follow-up reminders, and workflow approvals. Msg frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help. See our <Link to="/privacy" className="footer-email">Privacy Policy</Link> and <Link to="/terms" className="footer-email">Terms</Link>.
                  </span>
                </label>

                <button type="submit" className="waitlist-btn sms-btn" disabled={smsLoading}>
                  {smsLoading ? "Signing up…" : "Sign Up for SMS"}
                </button>
              </form>
            ) : (
              <div className="sms-success">
                <CheckCircle2 size={20} />
                <div>
                  <p className="sms-success-title">You're signed up!</p>
                  <p className="sms-success-sub">You'll start receiving SMS notifications from ShowingOps. Reply STOP at any time to opt out.</p>
                </div>
              </div>
            )}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Index;
