import { useState } from "react";
import logo from "@/assets/logo.png";
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
          <img src={logo} alt="ShowingOps" className="nav-logo" />
          <div className="nav-actions">
            <Link to="/sms-opt-in" className="nav-sms-link">Get SMS Updates</Link>
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
              Coming Soon
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

            {/* Waitlist */}
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
                  {loading ? "Joining…" : "Join the Waitlist"}
                </button>
              </form>
            ) : (
              <div className="waitlist-success">
                <span className="success-check">✓</span>
                You're on the list — we'll be in touch soon.
              </div>
            )}

            <p className="waitlist-note">No spam. Early access for brokerages only.</p>
            <p className="waitlist-consent">
              By joining you agree to receive SMS and email communications from ShowingOps. Reply STOP to opt out at any time.
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
              <span className="sms-eyebrow">Early Access</span>
              <h2 className="sms-heading">Be the first to know when we launch.</h2>
              <p className="sms-sub">Get launch updates and priority access directly to your phone.</p>
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
                    I agree to receive SMS notifications from ShowingOps. Message and data rates may apply. Reply STOP to unsubscribe at any time.
                  </span>
                </label>

                <button type="submit" className="waitlist-btn sms-btn" disabled={smsLoading}>
                  {smsLoading ? "Submitting…" : "Get Early Access"}
                </button>
                <p className="waitlist-consent">
                  By joining you agree to receive SMS and email communications from ShowingOps. Reply STOP to opt out at any time.
                </p>
              </form>
            ) : (
              <div className="sms-success">
                <CheckCircle2 size={20} />
                <div>
                  <p className="sms-success-title">You're in!</p>
                  <p className="sms-success-sub">We'll text you as soon as ShowingOps launches.</p>
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
