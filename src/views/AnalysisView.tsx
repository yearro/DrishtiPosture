import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { NoPersonDetectedBanner } from '../components/ui/NoPersonDetectedBanner';
import { ASANA_CATALOG } from '../data/asanaData';

export const AnalysisView: React.FC = () => {
  const { state, setView, dispatch } = useAppContext();
  const [cameraActive, setCameraActive] = useState<boolean>(true);
  const activeAsana = state.activeAsana || ASANA_CATALOG[0];

  const handleToggleNoPerson = () => {
    dispatch({ type: 'SET_NO_PERSON_DETECTED', payload: !state.noPersonDetected });
  };

  return (
    <main
      className="animate-fade-in"
      style={{
        width: '100%',
        minHeight: 'calc(100vh - 80px)',
        paddingTop: '90px',
        paddingBottom: 'var(--space-lg)',
        paddingLeft: 'var(--margin-desktop)',
        paddingRight: 'var(--margin-desktop)',
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <NoPersonDetectedBanner />

      {/* Header Status Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-md)',
          marginBottom: 'var(--space-md)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: state.noPersonDetected ? 'var(--color-error)' : 'var(--color-tertiary)',
                boxShadow: '0 0 10px var(--color-tertiary)',
                animation: 'pulseGlow 2s infinite'
              }}
            />
            <span className="font-label-sm" style={{ color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Sesión en Vivo
            </span>
          </div>
          <h1 className="font-headline-xl" style={{ fontSize: '32px', color: 'var(--color-on-background)', marginTop: '2px' }}>
            Análisis de {activeAsana.spanishName} ({activeAsana.sanskritName})
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <button
            type="button"
            onClick={handleToggleNoPerson}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '12px',
              fontWeight: 600,
              backgroundColor: state.noPersonDetected ? 'var(--color-error-container)' : 'var(--color-surface-container-high)',
              color: state.noPersonDetected ? 'var(--color-error)' : 'var(--color-on-surface-variant)',
              border: '1px solid var(--color-outline-variant)',
              cursor: 'pointer'
            }}
          >
            {state.noPersonDetected ? 'Ocultar Simulación Alerta' : 'Simular Pérdida de Detección'}
          </button>

          <button
            type="button"
            onClick={() => setView('catalog')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-surface-container)',
              border: '1px solid var(--color-outline-variant)',
              color: 'var(--color-on-surface)',
              fontSize: 'var(--font-size-label-sm)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              swap_horiz
            </span>
            <span>Cambiar Asana</span>
          </button>
        </div>
      </div>

      {/* Workspace Grid (Split View Desktop, Stack Mobile) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 'var(--space-lg)',
          flexGrow: 1,
          alignItems: 'stretch'
        }}
      >
        {/* Left Panel: Reference & Metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {/* Reference Pose Card */}
          <div
            style={{
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-md)',
              backgroundColor: 'var(--color-card-bg)',
              border: '1px solid var(--color-outline-variant)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h3 className="font-headline-md" style={{ fontSize: '18px', color: 'var(--color-on-surface)' }}>
                Pose de Referencia
              </h3>
              <span className="font-label-sm" style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: 'var(--color-secondary-container)', color: 'var(--color-on-secondary-container)' }}>
                Objetivo
              </span>
            </div>

            <div style={{ height: '180px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '12px' }}>
              <img src={activeAsana.imageUrl} alt={activeAsana.spanishName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <p className="font-body-md" style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              {activeAsana.description}
            </p>
          </div>

          {/* Live Metrics Dashboard */}
          <div
            style={{
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-md)',
              backgroundColor: 'var(--color-surface-low)',
              border: '1px solid var(--color-outline-variant)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              flexGrow: 1
            }}
          >
            <h3 className="font-headline-md" style={{ fontSize: '18px', color: 'var(--color-on-surface)' }}>
              Alineación en Tiempo Real
            </h3>

            {state.metrics.map((metric, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '4px', color: 'var(--color-on-surface)' }}>
                  <span>{metric.name}</span>
                  <span style={{ color: metric.status === 'optimal' ? 'var(--color-primary)' : 'var(--color-tertiary)' }}>
                    {metric.score}%
                  </span>
                </div>
                <div style={{ width: '100%', height: '8px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-surface-container)', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${metric.score}%`,
                      height: '100%',
                      backgroundColor: metric.status === 'optimal' ? 'var(--color-primary)' : 'var(--color-tertiary)',
                      borderRadius: 'var(--radius-full)',
                      transition: 'width var(--transition-normal)'
                    }}
                  />
                </div>
              </div>
            ))}

            {/* AI Insight Floating Card */}
            <div
              style={{
                marginTop: 'auto',
                padding: '16px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'rgba(0, 88, 188, 0.08)',
                border: '1px solid rgba(0, 88, 188, 0.2)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}
            >
              <span className="material-symbols-outlined" style={{ color: 'var(--color-tertiary)', fontSize: '22px' }}>
                psychology
              </span>
              <div>
                <strong className="font-label-md" style={{ color: 'var(--color-on-surface)', display: 'block', marginBottom: '2px' }}>
                  Sugerencia IA Drishti
                </strong>
                <p className="font-body-md" style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
                  {state.liveFeedback}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Camera & Skeleton Overlay */}
        <div
          style={{
            position: 'relative',
            minHeight: '520px',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            backgroundColor: '#0a0b0d',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gridColumn: 'span 1'
          }}
        >
          {/* Background Feed (Simulated AI Scan) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${activeAsana.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: cameraActive ? 'none' : 'grayscale(1) opacity(0.2)',
              transition: 'all var(--transition-normal)'
            }}
          />

          {/* Scanning Line Animation */}
          {cameraActive && <div className="animate-scan" style={{ position: 'absolute', left: 0, right: 0, height: '2px', backgroundColor: 'var(--color-tertiary)', boxShadow: '0 0 16px var(--color-tertiary)' }} />}

          {/* SVG Skeletal Overlay */}
          {cameraActive && (
            <svg
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                filter: 'drop-shadow(0 0 8px rgba(0, 88, 188, 0.7))'
              }}
              viewBox="0 0 800 600"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Connecting Lines */}
              <path d="M 400 150 L 400 250 L 350 250 L 320 350 L 330 450 M 400 250 L 450 250 L 480 320 L 460 400 M 400 250 L 380 400 L 380 550 M 400 250 L 420 400 L 450 480 L 400 480" fill="none" stroke="#388bfd" strokeWidth="2.5" strokeDasharray="4 4" />
              {/* Joints */}
              <circle cx="400" cy="150" r="7" fill="#0058bc" />
              <circle cx="400" cy="250" r="6" fill="#0058bc" />
              <circle cx="350" cy="250" r="5" fill="#0058bc" />
              <circle cx="450" cy="250" r="5" fill="#0058bc" />
              <circle cx="320" cy="350" r="5" fill="#0058bc" />
              <circle cx="480" cy="320" r="5" fill="#0058bc" />
              <circle cx="380" cy="400" r="6" fill="#0058bc" />
              <circle cx="420" cy="400" r="6" fill="#0058bc" />
              <circle cx="380" cy="550" r="5" fill="#0058bc" />
              <circle cx="450" cy="480" r="5" fill="#0058bc" />
            </svg>
          )}

          {/* Camera Feed Top Overlay */}
          <div style={{ position: 'relative', zIndex: 10, padding: 'var(--space-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 600,
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: cameraActive ? '#22c55e' : '#ef4444' }} />
              {cameraActive ? 'Cámara Activa (IA Scannning)' : 'Cámara Desactivada'}
            </span>
          </div>

          {/* Controls Bar Bottom */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              padding: 'var(--space-md)',
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setCameraActive(!cameraActive)}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: cameraActive ? 'var(--color-primary)' : '#374151',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span className="material-symbols-outlined">{cameraActive ? 'videocam' : 'videocam_off'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setView('welcome')}
              style={{
                padding: '10px 24px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-error)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                stop_circle
              </span>
              <span>Finalizar Sesión</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
