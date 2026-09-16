export type CameraState = 'idle' | 'loading' | 'active' | 'stopped' | 'error';

export type CameraErrorType =
  | 'permission-denied'
  | 'not-found'
  | 'not-readable'
  | 'overconstrained'
  | 'unknown';

export interface CameraError {
  type: CameraErrorType;
  message: string;
  instructions?: string;
}

export interface CameraConfig {
  constraints: MediaStreamConstraints;
  mirrorMode: boolean;
}

/**
 * Callback invocado por el frame loop en cada requestAnimationFrame.
 * Recibe el timestamp RAF y una referencia al `<video>` de origen para que los
 * consumidores (ej: detector de pose) puedan extraer un ImageBitmap.
 */
export type FrameCallback = (timestamp: DOMHighResTimeStamp, video: HTMLVideoElement) => void;
