import type { FrameCallback } from '../../../types/camera.types';

export interface CameraViewProps {
  stream: MediaStream | null;
  mirrorMode?: boolean;
  onFrameReady?: FrameCallback;
}
