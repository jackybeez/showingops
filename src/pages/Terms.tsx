import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

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
        <a href="mailto:showingops@gmail.com" className="nav-contact">showingops@gmail.com</a>
      </div>
    </header>

    <main className="legal-main">
      <div className="legal-container">
        <div className="legal-header">
          <p className="legal-updated">Last updated: March 3, 2026</p>
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
            any time by contacting <a href="mailto:showingops@gmail.com" className="legal-link">showingops@gmail.com</a>.
          </p>
          <p>
            Joining the waitlist does not guarantee access to the ShowingOps platform. Early access
            invitations are issued at our sole discretion.
          </p>
        </Section>

        <Section title="3. SMS Communications">
          <p>
            By providing your phone number and checking the SMS consent checkbox, you agree to receive
            text messages from ShowingOps including launch updates and product announcements.
            Message and data rates may apply. To opt out at any time, reply <strong>STOP</strong> to any
            text message from ShowingOps. SMS consent is not required as a condition of any purchase or service.
          </p>
        </Section>

        <Section title="4. Acceptable Use">
          <p>You agree not to:</p>
          <ul>
            <li>Use ShowingOps to violate any applicable laws or regulations.</li>
            <li>Transmit harmful, fraudulent, or misleading content through our platform.</li>
            <li>Attempt to gain unauthorized access to our systems or data.</li>
            <li>Reverse engineer or attempt to extract the source code of any ShowingOps software.</li>
          </ul>
        </Section>

        <Section title="5. Intellectual Property">
          <p>
            All content, branding, software, and materials associated with ShowingOps are the exclusive
            property of ShowingOps and its licensors. Nothing in these terms grants you any rights to use
            our trademarks, logos, or proprietary materials without prior written consent.
          </p>
        </Section>

        <Section title="6. Disclaimer of Warranties">
          <p>
            ShowingOps is provided on an "as is" and "as available" basis during the pre-launch phase.
            We make no warranties, express or implied, regarding the reliability, accuracy, or fitness for a
            particular purpose of our platform. Real estate outcomes depend on many factors outside our control,
            and we do not guarantee specific business results.
          </p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>
            To the fullest extent permitted by law, ShowingOps and its officers, directors, and employees
            shall not be liable for any indirect, incidental, special, or consequential damages arising from
            your use of, or inability to use, our services — even if advised of the possibility of such damages.
          </p>
        </Section>

        <Section title="8. Indemnification">
          <p>
            You agree to indemnify and hold ShowingOps harmless from any claims, losses, or damages
            (including legal fees) arising from your violation of these Terms or your misuse of our services.
          </p>
        </Section>

        <Section title="9. Governing Law">
          <p>
            These Terms are governed by the laws of the State of Colorado, United States, without regard to
            conflict of law principles. Any disputes shall be resolved exclusively in the courts of Colorado.
          </p>
        </Section>

        <Section title="10. Changes to These Terms">
          <p>
            We reserve the right to update these Terms at any time. Continued use of ShowingOps after
            changes are posted constitutes acceptance of the revised terms. The "Last updated" date at
            the top of this page will reflect any changes.
          </p>
        </Section>

        <Section title="11. Contact">
          <p>
            Questions about these Terms? Reach us at{" "}
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

export default Terms;
