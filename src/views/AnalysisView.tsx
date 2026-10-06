import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { NoPersonDetectedBanner } from '../components/ui/NoPersonDetectedBanner';
import { ModelLoadingIndicator } from '../components/pose/ModelLoadingIndicator';
import { ASANA_CATALOG } from '../data/asanaData';
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

const PERFECT_POSE_DURATION_MS = 1500;

export function AnalysisView() {
  const { state, setView, dispatch } = useAppContext();
  const [showSuccess, setShowSuccess] = useState(false);
  const showSuccessRef = useRef(false);
  const correctStartRef = useRef<number | null>(null);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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
    inferenceLatencyMs,
    error: poseError,
    initialize,
    processFrame,
  } = usePoseDetector();

  const activeAsana = state.activeAsana || ASANA_CATALOG[0];

  // Calcular ángulos articulares reactivamente contra la asana activa
  const jointResults = useAngleCalculator(lastPoseFrame, activeAsana);

  // Actualizar el estado global (métricas, score, feedback) cuando llegue un nuevo frame
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

  // Temporizador de postura perfecta: animación de éxito tras 1.5s sostenidos
  useEffect(() => {
    const isAllCorrect = jointResults.length > 0
      && jointResults.every((r) => r.status === 'correct' || r.status === 'invisible')
      && jointResults.some((r) => r.status === 'correct');

    if (isAllCorrect) {
      if (correctStartRef.current === null) {
        correctStartRef.current = performance.now();
      }

      const elapsed = performance.now() - correctStartRef.current;
      const remaining = PERFECT_POSE_DURATION_MS - elapsed;

      if (remaining <= 0 && !showSuccessRef.current) {
        showSuccessRef.current = true;
        setShowSuccess(true);
        correctStartRef.current = null;
        successTimerRef.current = setTimeout(() => {
          showSuccessRef.current = false;
          setShowSuccess(false);
        }, 2500);
      }
    } else if (showSuccessRef.current) {
      // Reset solo si ya estaba en éxito — evitar setState innecesario
      showSuccessRef.current = false;
      setShowSuccess(false);
      correctStartRef.current = null;
    } else {
      correctStartRef.current = null;
    }

    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
        successTimerRef.current = null;
      }
    };
  }, [jointResults]);

  // Inicializar el detector de pose MediaPipe cuando la cámara esté activa
  useEffect(() => {
    if (cameraState === 'active' && detectorState === 'uninitialized') {
      initialize();
    }
  }, [cameraState, detectorState, initialize]);

  // Procesar cada frame del loop de video a través del worker
  const handleFrameReady = useCallback(
    (_timestamp: DOMHighResTimeStamp, video: HTMLVideoElement) => {
      processFrame(video);
    },
    [processFrame]
  );

  const handleToggleNoPerson = () => {
    dispatch({ type: 'SET_NO_PERSON_DETECTED', payload: !state.noPersonDetected });
  };

  // Detección automática de ausencia de persona: si poseScore < 0.5 por más de 1s
  const noPersonTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const poseScore = lastPoseFrame?.poseScore ?? 0;

    if (poseScore < 0.5 && detectorState === 'ready') {
      if (!noPersonTimerRef.current) {
        noPersonTimerRef.current = setTimeout(() => {
          dispatch({ type: 'SET_NO_PERSON_DETECTED', payload: true });
        }, 1000);
      }
    } else {
      if (noPersonTimerRef.current) {
        clearTimeout(noPersonTimerRef.current);
        noPersonTimerRef.current = null;
      }
      if (state.noPersonDetected) {
        dispatch({ type: 'SET_NO_PERSON_DETECTED', payload: false });
      }
    }

    return () => {
      if (noPersonTimerRef.current) {
        clearTimeout(noPersonTimerRef.current);
        noPersonTimerRef.current = null;
      }
    };
  }, [lastPoseFrame?.poseScore, detectorState, state.noPersonDetected, dispatch]);

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

      {detectorState === 'loading' && (
        <ModelLoadingIndicator state={detectorState} />
      )}

      {poseError && (
        <ModelLoadingIndicator
          state={detectorState}
          error={poseError}
          onRetry={() => initialize()}
        />
      )}

      {error && (
        <CameraErrorBanner
          error={error}
          onRetry={startCamera}
        />
      )}

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
                backgroundColor: cameraState === 'active' ? 'var(--color-tertiary)' : 'var(--color-error)',
                boxShadow: cameraState === 'active' ? '0 0 10px var(--color-tertiary)' : 'none',
                animation: cameraState === 'active' ? 'pulseGlow 2s infinite' : 'none'
              }}
            />
            <span className="font-label-sm" style={{ color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Sesión en Vivo
            </span>
          </div>
          <h1 className="font-headline-xl" style={{ fontSize: '32px', color: 'var(--color-on-background)', marginTop: '2px' }}>
            Análisis de {activeAsana.nameEs} ({activeAsana.nameSanskrit})
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
              <img src={new URL(`../assets/poses/${activeAsana.referenceImageUrl}`, import.meta.url).toString()} alt={activeAsana.nameEs} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

            {/* Inference Latency Indicator */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-surface-container)',
                border: '1px solid var(--color-outline-variant)',
                fontSize: '12px',
                color: 'var(--color-on-surface-variant)'
              }}
            >
              <span>Latencia de Inferencia (P95 objetivo: &lt;60ms)</span>
              <span style={{ color: inferenceLatencyMs < 60 ? 'var(--color-tertiary)' : 'var(--color-error)', fontWeight: 600 }}>
                {inferenceLatencyMs.toFixed(1)}ms
              </span>
            </div>

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

        {/* Right Panel: Real Camera Feed Component */}
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
          <div style={{ flexGrow: 1, position: 'relative', minHeight: '440px' }}>
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
      </div>
    {showSuccess && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 100,
            padding: '32px 48px',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'rgba(34, 197, 94, 0.95)',
            color: '#ffffff',
            boxShadow: '0 20px 60px rgba(34, 197, 94, 0.4)',
            textAlign: 'center',
            animation: 'fadeIn 0.5s ease forwards',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>
            verified
          </span>
          <h2 className="font-headline-md" style={{ color: '#ffffff', margin: 0 }}>
            ¡Postura perfecta!
          </h2>
          <p className="font-body-md" style={{ color: 'rgba(255,255,255,0.9)', margin: 0 }}>
            Todas las articulaciones están correctamente alineadas
          </p>
        </div>
      )}

    </main>
  );
}
