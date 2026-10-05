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
            <span className="footer-tagline">Tranquilidad Confiable en Movimiento</span>
          </div>

          <nav className="footer-links" aria-label="Enlaces secundarios del pie de página">
            <a href="#privacy" className="footer-link">
              Privacidad
            </a>
            <a href="#terms" className="footer-link">
              Términos
            </a>
            <a href="#contact" className="footer-link">
              Contacto
            </a>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>© 2024 DrishtiPosture. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
