import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const SmsOptIn = () => {
  const [phone, setPhone] = useState("");
  const [smsAgreed, setSmsAgreed] = useState(false);
  const [smsSubmitted, setSmsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !smsAgreed) return;
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("submit-sms-optin", {
        body: { phone },
      });
      if (!error) setSmsSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <header className="nav">
        <div className="nav-inner">
          <Link to="/" className="logo" style={{ textDecoration: "none" }}>ShowingOps</Link>
          <a href="mailto:showingops@gmail.com" className="nav-contact">showingops@gmail.com</a>
        </div>
      </header>

      <main className="sms-page-main">
        <div className="sms-page-container">
          <span className="sms-eyebrow">Early Access</span>
          <h1 className="sms-page-heading">Be the first to know when we launch.</h1>
          <p className="sms-page-sub">
            Get launch updates and priority access delivered directly to your phone.
          </p>

          {!smsSubmitted ? (
            <form onSubmit={handleSubmit} className="sms-form sms-page-form">
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

              <button type="submit" className="waitlist-btn" disabled={loading}>
                {loading ? "Submitting…" : "Get Early Access"}
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
      </main>

      <Footer />
    </div>
  );
};

export default SmsOptIn;
