import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, CheckCircle2 } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

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

  const handleSmsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim() && smsAgreed) {
      setSmsSubmitted(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="page-wrapper">
      {/* Nav */}
      <header className="nav">
        <div className="nav-inner">
          <span className="logo">ShowingOps</span>
          <a href="mailto:hello@showingops.com" className="nav-contact">
            hello@showingops.com
          </a>
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
                <button type="submit" className="waitlist-btn">
                  Join the Waitlist
                </button>
              </form>
            ) : (
              <div className="waitlist-success">
                <span className="success-check">✓</span>
                You're on the list — we'll be in touch soon.
              </div>
            )}

            <p className="waitlist-note">No spam. Early access for brokerages only.</p>
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
                    I agree to receive SMS notifications from ShowingOps. Message and data rates may apply.{" "}
                    Reply STOP to unsubscribe.
                  </span>
                </label>

                <button type="submit" className="waitlist-btn sms-btn">
                  Get Early Access
                </button>
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

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} ShowingOps. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/privacy" className="footer-email">Privacy Policy</Link>
          <Link to="/terms" className="footer-email">Terms &amp; Conditions</Link>
          <a href="mailto:hello@showingops.com" className="footer-email">hello@showingops.com</a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
