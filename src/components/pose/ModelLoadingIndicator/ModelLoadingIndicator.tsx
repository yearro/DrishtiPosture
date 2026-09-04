import styles from './ModelLoadingIndicator.module.css';
import type { ModelLoadingIndicatorProps } from './ModelLoadingIndicator.types';

export function ModelLoadingIndicator({
  state,
  error,
  onRetry,
  className = '',
}: ModelLoadingIndicatorProps) {
  if (state === 'uninitialized' || state === 'ready') {
    return null;
  }

  if (state === 'error') {
    return (
      <div
        className={`${styles.container} ${styles.errorContainer} ${className}`}
        role="alert"
        aria-live="assertive"
      >
        <div className={styles.errorIcon} aria-hidden="true">
          ⚠️
        </div>
        <h3 className={styles.title}>Error al cargar el modelo de IA</h3>
        <p className={styles.errorText}>
          {error || 'No se pudo inicializar la aceleración WebGL/WebAssembly de MediaPipe.'}
        </p>
        {onRetry && (
          <button
            type="button"
            className={styles.retryButton}
            onClick={onRetry}
            aria-label="Reintentar carga del modelo de IA"
          >
            Reintentar
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={`${styles.container} ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner} aria-hidden="true" />
      </div>
      <h3 className={styles.title}>Cargando modelo de IA</h3>
      <p className={styles.subtitle}>
        Descargando y preparando MediaPipe Pose (~3MB)...
      </p>
    </div>
  );
}
