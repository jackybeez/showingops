import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const SmsOptIn = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    brokerageName: "",
  });
  const [smsAgreed, setSmsAgreed] = useState(false);
  const [smsSubmitted, setSmsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone.trim() || !smsAgreed) return;
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
      <header className="nav">
        <div className="nav-inner">
          <Link to="/" className="logo" style={{ textDecoration: "none" }}>ShowingOps</Link>
          <a href="mailto:showingops@gmail.com" className="nav-contact">showingops@gmail.com</a>
        </div>
      </header>

      <main className="sms-page-main">
        <div className="sms-page-container">
          <span className="sms-eyebrow">SMS Notifications</span>
          <h1 className="sms-page-heading">Opt In to ShowingOps SMS Notifications</h1>
          <p className="sms-page-sub">
            ShowingOps sends SMS account notifications to real estate agents and brokers. These messages include
            new lead alerts, follow-up reminders, and workflow approval prompts. Message frequency varies based
            on lead activity.
          </p>

          {!smsSubmitted ? (
            <form onSubmit={handleSubmit} className="sms-form sms-page-form">
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
                  I agree to receive SMS account notifications from ShowingOps including new lead alerts,
                  follow-up reminders, and approval prompts. Message frequency varies. Message and data rates
                  may apply. Reply STOP to opt out at any time. Reply HELP for help.
                </span>
              </label>

              <button type="submit" className="waitlist-btn" disabled={loading}>
                {loading ? "Submitting…" : "Opt In to SMS Notifications"}
              </button>

              <div className="sms-legal-links">
                <Link to="/privacy" className="sms-legal-link">Privacy Policy</Link>
                <span className="sms-legal-sep">·</span>
                <Link to="/terms" className="sms-legal-link">Terms of Service</Link>
              </div>
            </form>
          ) : (
            <div className="sms-success">
              <CheckCircle2 size={20} />
              <div>
                <p className="sms-success-title">You're enrolled!</p>
                <p className="sms-success-sub">
                  You'll receive SMS notifications from ShowingOps. Reply STOP at any time to opt out.
                </p>
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
