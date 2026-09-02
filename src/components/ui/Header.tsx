import type { MouseEvent } from 'react';
import { useAppContext } from '../../context/AppContext';
import { ThemeToggle } from './ThemeToggle';
import type { AppView } from '../../types/app.types';
import './Header.css';

export interface HeaderProps {
  readonly className?: string;
}

export function Header({ className }: HeaderProps) {
  const { state, setView } = useAppContext();

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, view: AppView) => {
    e.preventDefault();
    setView(view);
  };

  return (
    <header className={`app-header ${className ?? ''}`}>
      <a
        href="#"
        className="header-brand"
        onClick={(e) => handleNavClick(e, 'welcome')}
        aria-label="DrishtiPosture Inicio"
      >
        <span className="material-symbols-outlined header-brand-icon">spa</span>
        <span className="header-brand-text">DrishtiPosture</span>
      </a>

      <nav className="header-nav" aria-label="Navegación principal">
        <a
          href="#"
          className={`header-nav-link ${state.view === 'welcome' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, 'welcome')}
        >
          Home
        </a>
        <a
          href="#"
          className={`header-nav-link ${state.view === 'catalog' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, 'catalog')}
        >
          New Scan
        </a>
        <a
          href="#"
          className={`header-nav-link ${state.view === 'analysis' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, 'analysis')}
        >
          History
        </a>
        <a
          href="#"
          className="header-nav-link"
          onClick={(e) => handleNavClick(e, 'welcome')}
        >
          Profile
        </a>
      </nav>

      <div className="header-actions">
        <ThemeToggle />
        <button
          type="button"
          className="header-user-btn"
          aria-label="Perfil de usuario"
          onClick={() => setView('welcome')}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            person
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;
