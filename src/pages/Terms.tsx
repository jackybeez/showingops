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
        <Link to="/" className="logo" style={{ textDecoration: "none" }}>Showing Ops</Link>
        <a href="mailto:showingops@gmail.com" className="nav-contact">showingops@gmail.com</a>
      </div>
    </header>

    <main className="legal-main">
      <div className="legal-container">
        <div className="legal-header">
          <p className="legal-updated">Last updated: March 4, 2026</p>
          <h1 className="legal-title">Terms &amp; Conditions</h1>
          <p className="legal-intro">
            Please read these Terms &amp; Conditions carefully before using Showing Ops. By opting in to
            SMS notifications or otherwise engaging with our services, you agree to be bound by these terms.
          </p>
        </div>

        <Section title="1. About Showing Ops">
          <p>
            Showing Ops is an AI-powered workflow agent designed for real estate brokerages. It automates lead
            follow-up sequences and surfaces human-in-the-loop approvals to keep your team in control.
          </p>
        </Section>

        <Section title="2. SMS Terms">
          <p>
            Users who opt in to SMS communications may receive operational notifications related to
            Showing Ops account activity, workflow approvals, assigned leads, and platform notifications.
          </p>
          <p>
            Message and data rates may apply. SMS consent is not required as a condition of any purchase or service.
          </p>
          <p>
            Users may opt out at any time by replying <strong>STOP</strong>.
          </p>
        </Section>

        <Section title="3. Agent Consent Attestation">
          <p>
            Users who send messages to their own leads or clients through the platform represent and
            warrant that they have obtained all necessary consent from those recipients to be contacted
            by phone, SMS, and email, and are solely responsible for compliance with applicable law
            (including TCPA). Showing Ops sends such messages on the user's behalf.
          </p>
        </Section>

        <Section title="4. Acceptable Use">
          <p>You agree not to:</p>
          <ul>
            <li>Use Showing Ops to violate any applicable laws or regulations.</li>
            <li>Transmit harmful, fraudulent, or misleading content through our platform.</li>
            <li>Attempt to gain unauthorized access to our systems or data.</li>
            <li>Reverse engineer or attempt to extract the source code of any Showing Ops software.</li>
          </ul>
        </Section>

        <Section title="5. Intellectual Property">

          <p>
            All content, branding, software, and materials associated with Showing Ops are the exclusive
            property of Showing Ops and its licensors. Nothing in these terms grants you any rights to use
            our trademarks, logos, or proprietary materials without prior written consent.
          </p>
        </Section>

        <Section title="6. Disclaimer of Warranties">
          <p>
            Showing Ops is provided on an "as is" and "as available" basis during the pre-launch phase.
            We make no warranties, express or implied, regarding the reliability, accuracy, or fitness for a
            particular purpose of our platform. Real estate outcomes depend on many factors outside our control,
            and we do not guarantee specific business results.
          </p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>
            To the fullest extent permitted by law, Showing Ops and its officers, directors, and employees
            shall not be liable for any indirect, incidental, special, or consequential damages arising from
            your use of, or inability to use, our services — even if advised of the possibility of such damages.
          </p>
        </Section>

        <Section title="8. Indemnification">
          <p>
            You agree to indemnify and hold Showing Ops harmless from any claims, losses, or damages
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
            We reserve the right to update these Terms at any time. Continued use of Showing Ops after
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

export default Terms;
