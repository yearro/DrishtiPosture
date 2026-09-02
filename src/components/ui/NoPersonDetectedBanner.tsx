import React from 'react';
import { useAppContext } from '../../context/AppContext';

export const NoPersonDetectedBanner: React.FC = () => {
  const { state } = useAppContext();

  if (!state.noPersonDetected) {
    return null;
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        position: 'fixed',
        top: '84px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 90,
        width: '90%',
        maxWidth: '640px',
        padding: '12px 20px',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'rgba(186, 26, 26, 0.95)',
        color: '#ffffff',
        boxShadow: 'var(--shadow-md)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: 'var(--font-size-body-sm)',
        fontWeight: 600,
        animation: 'fadeIn 0.3s ease forwards'
      }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: '24px', flexShrink: 0 }}>
        warning
      </span>
      <span>
        No se detecta ninguna persona en el encuadre — ajusta tu posición en la cámara o mejora la iluminación del espacio.
      </span>
    </div>
  );
};
