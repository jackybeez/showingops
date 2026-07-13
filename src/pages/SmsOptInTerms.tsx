import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="legal-section">
    <h2 className="legal-h2">{title}</h2>
    {children}
  </div>
);

const SmsOptInTerms = () => (
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
          <p className="legal-updated">Messaging Terms</p>
          <h1 className="legal-title">Showing Ops Messaging Terms</h1>
          <p className="legal-intro">
            Showing Ops supports two distinct types of SMS communication. Both are strictly transactional
            and tied to explicit opt-in. Showing Ops does not send promotional or marketing SMS messages.
          </p>
        </div>

        <Section title="1. Account & workflow notifications (to agents and team members)">
          <p>
            Real estate agents, team leads, and brokerage staff who explicitly opt in receive SMS messages
            from Showing Ops related to their account activity. These include workflow approval requests,
            task reminders, and lead-assignment and account notifications. Message frequency varies based
            on account activity.
          </p>
        </Section>

        <Section title="2. Client follow-up (to consumers, sent on behalf of agents)">
          <p>
            When a consumer submits an inquiry on a brokerage or agent website that uses Showing Ops,
            Showing Ops may send follow-up SMS messages to that consumer on behalf of the agent — for
            example, to schedule a showing or share property information the consumer requested. These
            messages are transactional and tied to the consumer's own inquiry.
          </p>
        </Section>

        <Section title="3. Consent">
          <p>
            Consumers provide SMS consent at the point of inquiry submission on the brokerage or agent
            website — not on showingops.com. Agents and brokerages using Showing Ops are responsible for
            collecting that consent through their own lead-capture forms and for complying with all
            applicable messaging laws and regulations. Showing Ops only sends client follow-up SMS where
            valid consumer consent has been captured.
          </p>
        </Section>

        <Section title="4. Rates, opt-out, and privacy">
          <p>
            Message and data rates may apply. Reply <strong>STOP</strong> to opt out at any time; opt-outs
            are honored immediately. Reply <strong>HELP</strong> for help.
          </p>
          <p>
            Mobile phone numbers and SMS opt-in information are never sold or shared with third parties or
            affiliates for marketing purposes. See our{" "}
            <Link to="/privacy" className="legal-link">Privacy Policy</Link> for full details.
          </p>
        </Section>
      </div>
    </main>

    <Footer />
  </div>
);

export default SmsOptInTerms;
