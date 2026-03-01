import { Link } from "react-router-dom";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="legal-section">
    <h2 className="legal-h2">{title}</h2>
    {children}
  </div>
);

const Terms = () => (
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
          <h1 className="legal-title">Terms &amp; Conditions</h1>
          <p className="legal-intro">
            Please read these Terms &amp; Conditions carefully before using ShowingOps or joining our waitlist.
            By submitting your email or otherwise engaging with our services, you agree to be bound by these terms.
          </p>
        </div>

        <Section title="1. About ShowingOps">
          <p>
            ShowingOps is an AI-powered workflow agent designed for real estate brokerages. It automates lead
            follow-up sequences and surfaces human-in-the-loop approvals to keep your team in control.
            ShowingOps is currently in pre-launch; access is limited to approved brokerage partners.
          </p>
        </Section>

        <Section title="2. Waitlist & Early Access">
          <p>
            By submitting your email via our waitlist form, you consent to receive product updates,
            launch announcements, and related communications from ShowingOps. You may unsubscribe at
            any time by contacting <a href="mailto:hello@showingops.com" className="legal-link">hello@showingops.com</a>.
          </p>
          <p>
            Joining the waitlist does not guarantee access to the ShowingOps platform. Early access
            invitations are issued at our sole discretion.
          </p>
        </Section>

        <Section title="3. Acceptable Use">
          <p>You agree not to:</p>
          <ul>
            <li>Use ShowingOps to violate any applicable laws or regulations.</li>
            <li>Transmit harmful, fraudulent, or misleading content through our platform.</li>
            <li>Attempt to gain unauthorized access to our systems or data.</li>
            <li>Reverse engineer or attempt to extract the source code of any ShowingOps software.</li>
          </ul>
        </Section>

        <Section title="4. Intellectual Property">
          <p>
            All content, branding, software, and materials associated with ShowingOps are the exclusive
            property of ShowingOps and its licensors. Nothing in these terms grants you any rights to use
            our trademarks, logos, or proprietary materials without prior written consent.
          </p>
        </Section>

        <Section title="5. Disclaimer of Warranties">
          <p>
            ShowingOps is provided on an "as is" and "as available" basis during the pre-launch phase.
            We make no warranties, express or implied, regarding the reliability, accuracy, or fitness for a
            particular purpose of our platform. Real estate outcomes depend on many factors outside our control,
            and we do not guarantee specific business results.
          </p>
        </Section>

        <Section title="6. Limitation of Liability">
          <p>
            To the fullest extent permitted by law, ShowingOps and its officers, directors, and employees
            shall not be liable for any indirect, incidental, special, or consequential damages arising from
            your use of, or inability to use, our services — even if advised of the possibility of such damages.
          </p>
        </Section>

        <Section title="7. Indemnification">
          <p>
            You agree to indemnify and hold ShowingOps harmless from any claims, losses, or damages
            (including legal fees) arising from your violation of these Terms or your misuse of our services.
          </p>
        </Section>

        <Section title="8. Governing Law">
          <p>
            These Terms are governed by the laws of the State of Delaware, United States, without regard to
            conflict of law principles. Any disputes shall be resolved exclusively in the courts of Delaware.
          </p>
        </Section>

        <Section title="9. Changes to These Terms">
          <p>
            We reserve the right to update these Terms at any time. Continued use of ShowingOps after
            changes are posted constitutes acceptance of the revised terms. The "Last updated" date at
            the top of this page will reflect any changes.
          </p>
        </Section>

        <Section title="10. Contact">
          <p>
            Questions about these Terms? Reach us at{" "}
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

export default Terms;
