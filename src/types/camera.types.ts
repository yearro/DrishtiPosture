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

export type FrameCallback = (timestamp: DOMHighResTimeStamp) => void;
