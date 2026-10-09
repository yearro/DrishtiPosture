import { useCallback, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { ASANA_CATALOG } from '../data/asanaData';
import { NoPersonDetectedBanner } from '../components/ui/NoPersonDetectedBanner';
import { ModelLoadingIndicator } from '../components/pose/ModelLoadingIndicator';
import { useCameraStream } from '../hooks/useCameraStream';
import { usePoseDetector } from '../hooks/usePoseDetector';
import { useAngleCalculator } from '../hooks/useAngleCalculator';
import {
  jointResultsToMetrics,
  calculateOverallPoseScore,
  selectTopFeedback,
} from '../utils/pose-score.utils';
import { CameraView } from '../components/camera/CameraView';
import { CameraControls } from '../components/camera/CameraControls';
import { CameraErrorBanner } from '../components/camera/CameraErrorBanner';

export function WorkoutView() {
  const { state, dispatch, setView, setWorkoutIndex, removeFromWorkout } = useAppContext();
  const { entries, currentIndex } = state.workout;

  const currentEntry = entries[currentIndex];
  const activeAsana = currentEntry
    ? ASANA_CATALOG.find((a) => a.id === currentEntry.asanaId) ?? ASANA_CATALOG[0]
    : null;

  const {
    cameraState,
    stream,
    error,
    mirrorMode,
    startCamera,
    stopCamera,
    toggleMirror,
  } = useCameraStream();

  const {
    detectorState,
    lastPoseFrame,
    error: poseError,
    initialize,
    processFrame,
  } = usePoseDetector();

  const jointResults = useAngleCalculator(lastPoseFrame, activeAsana);

  useEffect(() => {
    if (jointResults.length === 0) return;
    const metrics = jointResultsToMetrics(jointResults);
    const overallScore = calculateOverallPoseScore(metrics);
    const topFeedback = selectTopFeedback(metrics);

    dispatch({ type: 'UPDATE_METRICS', payload: metrics });
    dispatch({ type: 'SET_POSE_SCORE', payload: overallScore / 100 });
    if (topFeedback) {
      dispatch({ type: 'SET_LIVE_FEEDBACK', payload: topFeedback });
    }
  }, [jointResults, dispatch]);

  useEffect(() => {
    if (cameraState === 'active' && detectorState === 'uninitialized') {
      initialize();
    }
  }, [cameraState, detectorState, initialize]);

  useEffect(() => {
    if (cameraState === 'active' && detectorState === 'ready' && activeAsana) {
      dispatch({ type: 'SELECT_ASANA', payload: activeAsana });
    }
  }, [cameraState, detectorState, activeAsana, dispatch]);

  const handleFrameReady = useCallback(
    (_timestamp: DOMHighResTimeStamp, video: HTMLVideoElement) => {
      processFrame(video);
    },
    [processFrame]
  );

  const handlePrev = () => {
    if (currentIndex > 0) setWorkoutIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < entries.length - 1) setWorkoutIndex(currentIndex + 1);
  };

  if (entries.length === 0) {
    return (
      <main
        className="animate-fade-in"
        style={{
          width: '100%',
          minHeight: 'calc(100vh - 80px)',
          paddingTop: '90px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '64px', color: 'var(--color-outline-variant)' }}>
          fitness_center
        </span>
        <h2 className="font-headline-lg" style={{ color: 'var(--color-on-surface)' }}>
          Sin posturas en el entrenamiento
        </h2>
        <p className="font-body-md" style={{ color: 'var(--color-on-surface-variant)', maxWidth: '480px', textAlign: 'center' }}>
          Agrega posturas desde el catálogo para crear tu secuencia de entrenamiento personalizada.
        </p>
        <button
          type="button"
          onClick={() => setView('catalog')}
          style={{
            padding: '12px 28px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-primary)',
            color: '#fff',
            border: 'none',
            fontSize: 'var(--font-size-label-md)',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Ir al Catálogo
        </button>
      </main>
    );
  }

  const poseScorePercent = Math.round(state.poseScore * 100);

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
        flexDirection: 'column',
      }}
    >
      <NoPersonDetectedBanner />

      {detectorState === 'loading' && <ModelLoadingIndicator state={detectorState} />}
      {poseError && <ModelLoadingIndicator state={detectorState} error={poseError} onRetry={() => initialize()} />}
      {error && <CameraErrorBanner error={error} onRetry={startCamera} />}

      {/* Title */}
      <h1 className="font-headline-xl" style={{ fontSize: '28px', color: 'var(--color-on-background)', marginBottom: 'var(--space-md)' }}>
        Entrenamiento
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: 'var(--space-lg)',
          flexGrow: 1,
        }}
      >
        {/* Left: Pose List */}
        <div
          style={{
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--color-surface-low)',
            border: '1px solid var(--color-outline-variant)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              padding: 'var(--space-md)',
              borderBottom: '1px solid var(--color-outline-variant)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span className="font-label-md" style={{ color: 'var(--color-on-surface)' }}>
              Secuencia ({entries.length})
            </span>
            <button
              type="button"
              onClick={() => setView('catalog')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-surface-container)',
                border: '1px solid var(--color-outline-variant)',
                color: 'var(--color-on-surface-variant)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
              Agregar
            </button>
          </div>

          <div style={{ flexGrow: 1, overflowY: 'auto', padding: 'var(--space-sm)' }}>
            {entries.map((entry, idx) => (
              <div
                key={`${entry.asanaId}-${idx}`}
                onClick={() => setWorkoutIndex(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: idx === currentIndex ? 'var(--color-primary-container)' : 'transparent',
                  border: idx === currentIndex ? '1px solid var(--color-primary)' : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  marginBottom: '4px',
                }}
              >
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: idx === currentIndex ? 'var(--color-primary)' : 'var(--color-surface-container-high)',
                    color: idx === currentIndex ? '#fff' : 'var(--color-on-surface-variant)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {idx + 1}
                </span>
                <span
                  className="font-label-md"
                  style={{
                    color: idx === currentIndex ? 'var(--color-on-primary-container)' : 'var(--color-on-surface)',
                    flexGrow: 1,
                  }}
                >
                  {entry.nameEs}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWorkout(idx);
                  }}
                  aria-label={`Quitar ${entry.nameEs}`}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-outline)',
                    cursor: 'pointer',
                    padding: '2px',
                    display: 'flex',
                    opacity: 0.6,
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
                </button>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <div
            style={{
              padding: 'var(--space-sm) var(--space-md)',
              borderTop: '1px solid var(--color-outline-variant)',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-surface-container)',
                border: '1px solid var(--color-outline-variant)',
                color: 'var(--color-on-surface)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                opacity: currentIndex === 0 ? 0.4 : 1,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
              Anterior
            </button>
            <span className="font-label-sm" style={{ color: 'var(--color-on-surface-variant)', alignSelf: 'center' }}>
              {currentIndex + 1} / {entries.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex >= entries.length - 1}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary)',
                border: 'none',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 600,
                cursor: currentIndex >= entries.length - 1 ? 'not-allowed' : 'pointer',
                opacity: currentIndex >= entries.length - 1 ? 0.4 : 1,
              }}
            >
              Siguiente
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Right: Camera + Feedback */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {/* Current pose name */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 20px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-surface-low)',
              border: '1px solid var(--color-outline-variant)',
            }}
          >
            <div>
              <span className="font-label-sm" style={{ color: 'var(--color-on-surface-variant)', textTransform: 'uppercase' }}>
                Escaneando
              </span>
              <h2 className="font-headline-md" style={{ fontSize: '20px', color: 'var(--color-on-surface)', margin: '2px 0 0' }}>
                {currentEntry.nameEs}
              </h2>
            </div>
          </div>

          {/* Camera */}
          <div
            style={{
              position: 'relative',
              minHeight: '380px',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              backgroundColor: '#0a0b0d',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ flexGrow: 1, position: 'relative' }}>
              <CameraView
                stream={stream}
                mirrorMode={mirrorMode}
                onFrameReady={handleFrameReady}
                landmarks={lastPoseFrame?.landmarks}
                jointResults={jointResults}
              />
            </div>
            <CameraControls
              cameraState={cameraState}
              mirrorMode={mirrorMode}
              onStartCamera={startCamera}
              onStopCamera={stopCamera}
              onToggleMirror={toggleMirror}
            />
          </div>

          {/* Bottom: Score + Recommendations */}
          <div
            style={{
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--color-surface-low)',
              border: '1px solid var(--color-outline-variant)',
              padding: 'var(--space-md)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 className="font-headline-md" style={{ fontSize: '18px', color: 'var(--color-on-surface)' }}>
                Calificación y Recomendaciones
              </h3>

              {/* Score circle */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: poseScorePercent >= 80
                    ? 'var(--color-tertiary-container)'
                    : poseScorePercent >= 50
                      ? 'rgba(234, 179, 8, 0.2)'
                      : 'rgba(239, 68, 68, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `3px solid ${poseScorePercent >= 80
                    ? 'var(--color-tertiary)'
                    : poseScorePercent >= 50
                      ? '#EAB308'
                      : '#EF4444'}`,
                }}
              >
                <span style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: poseScorePercent >= 80
                    ? 'var(--color-tertiary)'
                    : poseScorePercent >= 50
                      ? '#EAB308'
                      : '#EF4444',
                }}>
                  {poseScorePercent}
                </span>
              </div>
            </div>

            {/* Joint metrics */}
            {state.metrics.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {state.metrics.map((metric, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '4px', color: 'var(--color-on-surface)' }}>
                      <span>{metric.name}</span>
                      <span style={{ color: metric.status === 'optimal' ? 'var(--color-primary)' : metric.status === 'warning' ? '#EAB308' : '#EF4444' }}>
                        {metric.score}%
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '8px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-surface-container)', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${metric.score}%`,
                          height: '100%',
                          backgroundColor: metric.status === 'optimal' ? 'var(--color-primary)' : metric.status === 'warning' ? '#EAB308' : '#EF4444',
                          borderRadius: 'var(--radius-full)',
                          transition: 'width var(--transition-normal)',
                        }}
                      />
                    </div>
                    <p className="font-label-sm" style={{ color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
                      {metric.detail}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-body-md" style={{ color: 'var(--color-on-surface-variant)' }}>
                Activa la cámara y colócate en la postura para recibir retroalimentación en tiempo real.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}