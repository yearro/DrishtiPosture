import type { CameraError } from '../../../types/camera.types';

export interface CameraErrorBannerProps {
  error: CameraError;
  onRetry: () => void;
}
