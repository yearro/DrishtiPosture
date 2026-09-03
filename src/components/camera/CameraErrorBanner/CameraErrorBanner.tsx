import type { CameraErrorBannerProps } from './CameraErrorBanner.types';
import styles from './CameraErrorBanner.module.css';

export function CameraErrorBanner({ error, onRetry }: CameraErrorBannerProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={styles.banner}
    >
      <span className={`material-symbols-outlined ${styles.icon}`} aria-hidden="true">
        videocam_off
      </span>
      <div className={styles.content}>
        <h4 className={styles.title}>{error.message}</h4>
        {error.instructions && <p className={styles.instructions}>{error.instructions}</p>}
        <button
          type="button"
          onClick={onRetry}
          aria-label="Intentar conectar con la cámara de nuevo"
          className={styles.retryButton}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }} aria-hidden="true">
            refresh
          </span>
          <span>Intentar nuevamente</span>
        </button>
      </div>
    </div>
  );
}
