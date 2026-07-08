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
          <p className="legal-updated">Last updated: March 4, 2026</p>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-intro">
            Showing Ops ("we," "our," or "us") is committed to protecting your privacy. This policy explains
            what information we collect, how we use it, and your rights regarding that information.
          </p>
        </div>

        <Section title="1. Information We Collect">
          <p>We collect information you provide directly, including:</p>
          <ul>
            <li><strong>First and last name</strong> — submitted when you opt in to SMS communications.</li>
            <li><strong>Phone number</strong> — submitted when you opt in to receive SMS notifications from Showing Ops.</li>
            <li><strong>Brokerage name</strong> — submitted to identify your real estate organization.</li>
            <li><strong>Communications</strong> — messages you send us via our contact channels.</li>
          </ul>
          <p>We may also collect certain technical data automatically, such as browser type, IP address, and pages visited, through standard web analytics tools.</p>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul>
            <li>Send transactional SMS workflow notifications to users who have explicitly opted in, including <strong>workflow approval requests, task reminders, and lead assignment notifications</strong>.</li>
            <li>Respond to inquiries and support requests.</li>
            <li>Improve and develop Showing Ops products and services.</li>
            <li>Comply with legal obligations.</li>
          </ul>
          <p>We will never sell your personal information to third parties.</p>
        </Section>

        <Section title="3. SMS Communications">
          <p>
            By providing your phone number and checking the SMS consent box, you consent to receive
            transactional SMS workflow notifications from Showing Ops. These messages are account-specific
            and include workflow approval requests, task reminders, and lead assignment notifications.
            Showing Ops does not send promotional or marketing SMS messages.
          </p>
          <p>
            Message frequency varies based on account activity. Message and data rates may apply.
            Reply <strong>STOP</strong> to unsubscribe or <strong>HELP</strong> for assistance.
          </p>
          <p>
            <strong>No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.</strong>
          </p>
          <p>
            <strong>Text messaging originator opt-in data and consent will not be shared with any third parties.</strong>
          </p>
          <p>SMS opt-in is entirely voluntary.</p>
        </Section>

        <Section title="4. Data Sharing">
          <p>
            <strong>We do NOT sell or share phone numbers with third parties under any circumstances.</strong>
          </p>
          <p>We may share your information only with:</p>
          <ul>
            <li><strong>Service providers</strong> — trusted vendors who help us operate our platform (e.g., SMS messaging). These providers are bound by confidentiality obligations and are prohibited from using your data for their own purposes.</li>
            <li><strong>Legal authorities</strong> — where required by law, regulation, or valid legal process.</li>
          </ul>
          <p>We do not share your data with third-party advertisers, data brokers, or any marketing partners.</p>
        </Section>

        <Section title="5. Data Retention">
          <p>
            We retain your information for as long as necessary to fulfill the purposes described in this policy,
            or as required by law. You may request deletion of your data at any time by contacting us.
          </p>
        </Section>

        <Section title="6. Your Rights & Opt-Out">
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Request correction of inaccurate data.</li>
            <li>Request deletion of your data.</li>
            <li>Withdraw consent for SMS communications at any time.</li>
          </ul>
          <p>
            To opt out of SMS: reply <strong>STOP</strong> to any text message from Showing Ops.<br />
            For SMS help: reply <strong>HELP</strong> to any message.<br />
            For data deletion requests, contact us at{" "}
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
            Showing Ops<br />
            4150 Jason St Apt 620<br />
            Denver, CO 80211<br />
            United States<br />
            Phone: +1 (970) 309-5645
          </address>
        </Section>
      </div>
    </main>

    <Footer />
  </div>
);

export default PrivacyPolicy;
