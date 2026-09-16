import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ASANA_CATALOG } from '../data/asanaData';
import type { AsanaDifficulty, IAsana } from '../types/app.types';

export const CatalogView: React.FC = () => {
  const { state, selectAsana, setView } = useAppContext();
  const [filter, setFilter] = useState<AsanaDifficulty | 'all'>('all');

  const selectedAsana: IAsana = state.activeAsana || ASANA_CATALOG[0];

  const filteredAsanas = ASANA_CATALOG.filter((item) => {
    if (filter === 'all') return true;
    return item.difficulty === filter;
  });

  const handleSelect = (asana: IAsana) => {
    selectAsana(asana);
  };

  const handleStartAnalysis = () => {
    setView('analysis');
  };

  return (
    <main
      className="animate-fade-in"
      style={{
        width: '100%',
        minHeight: 'calc(100vh - 80px)',
        paddingTop: '100px',
        paddingBottom: 'var(--space-xl)',
        paddingLeft: 'var(--margin-desktop)',
        paddingRight: 'var(--margin-desktop)',
        maxWidth: '1440px',
        margin: '0 auto'
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <span
          className="font-label-md"
          style={{ color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
        >
          Selección de Práctica
        </span>
        <h1 className="font-headline-xl" style={{ color: 'var(--color-on-background)', marginTop: '4px' }}>
          Catálogo de Asanas
        </h1>
        <p className="font-body-md" style={{ color: 'var(--color-on-surface-variant)', maxWidth: '600px', marginTop: '8px' }}>
          Elige una postura para comenzar la evaluación anatómica con visión por computador en tiempo real.
        </p>

        {/* Filter Chips */}
        <div style={{ display: 'flex', gap: '8px', marginTop: 'var(--space-md)', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'Todas' },
            { id: 'beginner', label: 'Principiante' },
            { id: 'intermediate', label: 'Intermedio' },
            { id: 'advanced', label: 'Avanzado' }
          ].map((chip) => {
            const isActive = filter === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setFilter(chip.id as AsanaDifficulty | 'all')}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-size-label-sm)',
                  fontWeight: 600,
                  border: isActive ? '1px solid var(--color-primary)' : '1px solid var(--color-outline-variant)',
                  backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-surface-container)',
                  color: isActive ? 'var(--color-on-primary)' : 'var(--color-on-surface)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-lg)',
          alignItems: 'start'
        }}
      >
        {/* Asana Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--space-md)' }}>
          {filteredAsanas.map((asana) => {
            const isSelected = selectedAsana.id === asana.id;
            const dinamicRoute = new URL(`../assets/poses/${asana.imageUrl}`, import.meta.url).toString();
            return (
              <div
                key={asana.id}
                onClick={() => handleSelect(asana)}
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-card-bg)',
                  border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-outline-variant)',
                  boxShadow: isSelected ? '0 0 16px rgba(77, 96, 84, 0.25)' : 'var(--shadow-sm)',
                  cursor: 'pointer',
                  transition: 'transform var(--transition-fast), border-color var(--transition-fast)'
                }}
              >
                <div style={{ height: '180px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={dinamicRoute}
                    alt={asana.spanishName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(0, 0, 0, 0.65)',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      backdropFilter: 'blur(4px)'
                    }}
                  >
                    {asana.difficulty}
                  </span>
                </div>

                <div style={{ padding: 'var(--space-md)' }}>
                  <div className="font-label-sm" style={{ color: 'var(--color-primary)' }}>
                    {asana.sanskritName}
                  </div>
                  <h3 className="font-headline-md" style={{ fontSize: '18px', color: 'var(--color-on-surface)', marginTop: '2px' }}>
                    {asana.spanishName}
                  </h3>
                  <p className="font-body-md" style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '6px', height: '38px', overflow: 'hidden' }}>
                    {asana.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Asana Detail Panel */}
        <div
          style={{
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-md)',
            backgroundColor: 'var(--color-surface-container)',
            border: '1px solid var(--color-outline-variant)',
            boxShadow: 'var(--shadow-md)',
            position: 'sticky',
            top: '100px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-sm)' }}>
            <span className="font-label-sm" style={{ color: 'var(--color-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Vista Previa de Alineación
            </span>
            <span style={{ fontSize: '12px', padding: '4px 10px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-secondary-container)', color: 'var(--color-on-secondary-container)', fontWeight: 600 }}>
              {selectedAsana.category}
            </span>
          </div>

          <h2 className="font-headline-lg" style={{ fontSize: '24px', color: 'var(--color-on-surface)' }}>
            {selectedAsana.spanishName} ({selectedAsana.sanskritName})
          </h2>

          <div style={{ height: '220px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginTop: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
            <img src={new URL(`../assets/poses/${selectedAsana.imageUrl}`, import.meta.url).toString()} alt={selectedAsana.spanishName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <h3 className="font-label-md" style={{ color: 'var(--color-on-surface)', marginBottom: '8px' }}>
            Puntos Clave de Alineación:
          </h3>
          <ul style={{ paddingLeft: '20px', marginBottom: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {selectedAsana.alignmentPoints.map((pt, idx) => (
              <li key={idx} className="font-body-md" style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
                {pt}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={handleStartAnalysis}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-on-primary)',
              fontSize: 'var(--font-size-body-md)',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: 'var(--shadow-md)',
              transition: 'all var(--transition-fast)'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
              center_focus_strong
            </span>
            <span>Iniciar Análisis en Vivo</span>
          </button>
        </div>
      </div>
    </main>
  );
};
