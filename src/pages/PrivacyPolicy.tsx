import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="legal-section">
    <h2 className="legal-h2">{title}</h2>
    {children}
  </div>
);

const PrivacyPolicy = () => (
  <div className="page-wrapper">
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="logo" style={{ textDecoration: "none" }}>ShowingOps</Link>
        <a href="mailto:showingops@gmail.com" className="nav-contact">showingops@gmail.com</a>
      </div>
    </header>

    <main className="legal-main">
      <div className="legal-container">
        <div className="legal-header">
          <p className="legal-updated">Last updated: March 3, 2026</p>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-intro">
            ShowingOps ("we," "our," or "us") is committed to protecting your privacy. This policy explains
            what information we collect, how we use it, and your rights regarding that information.
          </p>
        </div>

        <Section title="1. Information We Collect">
          <p>We collect information you provide directly, including:</p>
          <ul>
            <li><strong>Email address</strong> — submitted via our waitlist form.</li>
            <li><strong>Phone number</strong> — submitted when you opt in to receive SMS communications from ShowingOps.</li>
            <li><strong>Business information</strong> — brokerage name, team size, and related details you share with us.</li>
            <li><strong>Communications</strong> — messages you send us via email or other channels.</li>
          </ul>
          <p>We may also collect certain technical data automatically, such as browser type, IP address, and pages visited, through standard web analytics tools.</p>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide early access and product updates to waitlist members via email.</li>
            <li>Send SMS notifications to users who have explicitly opted in, including launch updates and priority access information.</li>
            <li>Respond to inquiries and support requests.</li>
            <li>Improve and develop ShowingOps products and services.</li>
            <li>Comply with legal obligations.</li>
          </ul>
          <p>We will never sell your personal information to third parties.</p>
        </Section>

        <Section title="3. SMS Communications">
          <p>
            If you provide your phone number and check the SMS opt-in checkbox, you consent to receive text messages from ShowingOps,
            including launch announcements and product updates. Message and data rates may apply.
          </p>
          <p><strong>To opt out of SMS communications at any time, reply STOP to any message we send you.</strong> You may also contact us at <a href="mailto:showingops@gmail.com" className="legal-link">showingops@gmail.com</a> to request removal.</p>
          <p>SMS opt-in is entirely voluntary and separate from the email waitlist.</p>
        </Section>

        <Section title="4. Data Sharing">
          <p>We may share your information with:</p>
          <ul>
            <li><strong>Service providers</strong> — trusted vendors who help us operate our platform (e.g., email delivery, SMS messaging, analytics). These providers are bound by confidentiality obligations.</li>
            <li><strong>Legal authorities</strong> — where required by law, regulation, or valid legal process.</li>
          </ul>
          <p>We do not share your data with third-party advertisers or data brokers.</p>
        </Section>

        <Section title="5. Data Retention">
          <p>
            We retain your information for as long as necessary to fulfill the purposes described in this policy,
            or as required by law. You may request deletion of your data at any time by contacting us.
          </p>
        </Section>

        <Section title="6. Your Rights & Opt-Out">
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Request correction of inaccurate data.</li>
            <li>Request deletion of your data.</li>
            <li>Withdraw consent for SMS or email marketing communications at any time.</li>
          </ul>
          <p>
            To opt out of SMS: reply <strong>STOP</strong> to any text message from ShowingOps.<br />
            To opt out of email or request data deletion: email us at{" "}
            <a href="mailto:showingops@gmail.com" className="legal-link">showingops@gmail.com</a>.
          </p>
        </Section>

        <Section title="7. Security">
          <p>
            We take reasonable technical and organizational measures to protect your information against
            unauthorized access, loss, or misuse. However, no transmission over the internet is completely secure,
            and we cannot guarantee absolute security.
          </p>
        </Section>

        <Section title="8. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date
            at the top. We encourage you to review this page periodically.
          </p>
        </Section>

        <Section title="9. Contact Us">
          <p>
            If you have any questions about this Privacy Policy, please reach out at{" "}
            <a href="mailto:showingops@gmail.com" className="legal-link">showingops@gmail.com</a> or write to us at:
          </p>
          <address style={{ fontStyle: "normal", marginTop: "0.5rem" }}>
            ShowingOps<br />
            4150 Jason St<br />
            Denver, CO 80211<br />
            Phone: +1 (970) 309-5645
          </address>
        </Section>
      </div>
    </main>

    <Footer />
  </div>
);

export default PrivacyPolicy;
