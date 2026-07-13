import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="footer">
    <div className="footer-top">
      <p>© {new Date().getFullYear()} Showing Ops. All rights reserved.</p>
      <address className="footer-address">
        4150 Jason St Apt 620, Denver, CO 80211, United States &nbsp;·&nbsp;
        <a href="tel:+19703095645" className="footer-email">+1 (970) 309-5645</a>
      </address>
    </div>
    <div className="footer-links">
      <Link to="/privacy" className="footer-email">Privacy Policy</Link>
      <Link to="/terms" className="footer-email">Terms &amp; Conditions</Link>
      <Link to="/sms-opt-in" className="footer-email">Messaging Terms</Link>
      <a href="mailto:showingops@gmail.com" className="footer-email">showingops@gmail.com</a>
    </div>
  </footer>
);

export default Footer;
