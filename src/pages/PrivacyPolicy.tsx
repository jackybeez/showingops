import { Link } from "react-router-dom";

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
        <a href="mailto:hello@showingops.com" className="nav-contact">hello@showingops.com</a>
      </div>
    </header>

    <main className="legal-main">
      <div className="legal-container">
        <div className="legal-header">
          <p className="legal-updated">Last updated: March 1, 2026</p>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-intro">
            ShowingOps ("we," "our," or "us") is committed to protecting your privacy. This policy explains
            what information we collect, how we use it, and your rights regarding that information.
          </p>
        </div>

        <Section title="1. Information We Collect">
          <p>We collect information you provide directly, including:</p>
          <ul>
            <li><strong>Contact information</strong> — email address submitted via our waitlist form.</li>
            <li><strong>Business information</strong> — brokerage name, team size, and related details you share with us.</li>
            <li><strong>Communications</strong> — messages you send us via email or other channels.</li>
          </ul>
          <p>We may also collect certain technical data automatically, such as browser type, IP address, and pages visited, through standard web analytics tools.</p>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide early access and product updates to waitlist members.</li>
            <li>Respond to inquiries and support requests.</li>
            <li>Improve and develop ShowingOps products and services.</li>
            <li>Send product announcements, where you have opted in.</li>
            <li>Comply with legal obligations.</li>
          </ul>
          <p>We will never sell your personal information to third parties.</p>
        </Section>

        <Section title="3. Data Sharing">
          <p>We may share your information with:</p>
          <ul>
            <li><strong>Service providers</strong> — trusted vendors who help us operate our platform (e.g., email delivery, analytics). These providers are bound by confidentiality obligations.</li>
            <li><strong>Legal authorities</strong> — where required by law, regulation, or valid legal process.</li>
          </ul>
          <p>We do not share your data with third-party advertisers or data brokers.</p>
        </Section>

        <Section title="4. Data Retention">
          <p>
            We retain your information for as long as necessary to fulfill the purposes described in this policy,
            or as required by law. Waitlist data is retained until you request removal or ShowingOps ceases operations.
          </p>
        </Section>

        <Section title="5. Your Rights">
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Request correction of inaccurate data.</li>
            <li>Request deletion of your data.</li>
            <li>Withdraw consent for marketing communications at any time.</li>
          </ul>
          <p>To exercise any of these rights, please contact us at <a href="mailto:hello@showingops.com" className="legal-link">hello@showingops.com</a>.</p>
        </Section>

        <Section title="6. Security">
          <p>
            We take reasonable technical and organizational measures to protect your information against
            unauthorized access, loss, or misuse. However, no transmission over the internet is completely secure,
            and we cannot guarantee absolute security.
          </p>
        </Section>

        <Section title="7. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date
            at the top. We encourage you to review this page periodically.
          </p>
        </Section>

        <Section title="8. Contact Us">
          <p>
            If you have any questions about this Privacy Policy, please reach out at{" "}
            <a href="mailto:hello@showingops.com" className="legal-link">hello@showingops.com</a>.
          </p>
        </Section>
      </div>
    </main>

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

export default PrivacyPolicy;
