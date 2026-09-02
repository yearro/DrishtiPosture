import './Footer.css';

export interface FooterProps {
  readonly className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={`app-footer ${className ?? ''}`}>
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand-column">
            <div className="footer-brand">
              <span className="material-symbols-outlined footer-brand-icon">spa</span>
              <span className="footer-brand-text">DrishtiPosture</span>
            </div>
            <span className="footer-tagline">Trusted Tranquility in Motion</span>
          </div>

          <nav className="footer-links" aria-label="Enlaces secundarios del pie de página">
            <a href="#privacy" className="footer-link">
              Privacy
            </a>
            <a href="#terms" className="footer-link">
              Terms
            </a>
            <a href="#contact" className="footer-link">
              Contact
            </a>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>© 2024 DrishtiPosture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
