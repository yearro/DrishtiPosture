import React from 'react';
import { useAppContext } from '../../context/AppContext';

export const ThemeToggle: React.FC = () => {
  const { state, toggleTheme } = useAppContext();
  const isLight = state.theme === 'light';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={`Cambiar a modo ${isLight ? 'oscuro' : 'claro'}`}
      onClick={toggleTheme}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'var(--color-surface-container)',
        border: '1px solid var(--color-outline-variant)',
        color: 'var(--color-on-surface)',
        cursor: 'pointer',
        fontSize: 'var(--font-size-label-sm)',
        fontWeight: 600,
        transition: 'all var(--transition-fast)'
      }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: '18px', color: isLight ? '#d97706' : '#a855f7' }}>
        {isLight ? 'light_mode' : 'dark_mode'}
      </span>
      <span>{isLight ? 'Claro' : 'Oscuro'}</span>
    </button>
  );
};
