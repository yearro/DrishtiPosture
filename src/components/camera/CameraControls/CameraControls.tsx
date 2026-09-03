import type { CameraControlsProps } from './CameraControls.types';
import styles from './CameraControls.module.css';

export function CameraControls({
  cameraState,
  mirrorMode,
  onStartCamera,
  onStopCamera,
  onToggleMirror,
}: CameraControlsProps) {
  const isActive = cameraState === 'active';
  const isLoading = cameraState === 'loading';

  return (
    <div className={styles.controlsContainer}>
      <div className={styles.leftGroup}>
        {!isActive ? (
          <button
            type="button"
            onClick={onStartCamera}
            disabled={isLoading}
            aria-label="Activar cámara para análisis de postura"
            className={`${styles.actionButton} ${styles.startButton}`}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {isLoading ? 'sync' : 'videocam'}
            </span>
            <span>{isLoading ? 'Solicitando cámara...' : 'Iniciar análisis'}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onStopCamera}
            aria-label="Detener cámara y análisis"
            className={`${styles.actionButton} ${styles.stopButton}`}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              videocam_off
            </span>
            <span>Detener cámara</span>
          </button>
        )}

        <button
          type="button"
          role="switch"
          aria-checked={mirrorMode}
          aria-label="Modo espejo de cámara"
          onClick={onToggleMirror}
          className={`${styles.mirrorToggle} ${mirrorMode ? styles.mirrorToggleActive : ''}`}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            flip
          </span>
          <span>Espejo {mirrorMode ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      <div className={styles.statusIndicator}>
        <span
          className={`${styles.pulseDot} ${
            isActive
              ? styles.dotActive
              : isLoading
              ? styles.dotLoading
              : styles.dotInactive
          }`}
          aria-hidden="true"
        />
        <span>
          {isActive
            ? 'Cámara activa'
            : isLoading
            ? 'Cargando cámara...'
            : 'Cámara inactiva'}
        </span>
      </div>
    </div>
  );
}
