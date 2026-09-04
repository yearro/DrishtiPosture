import type { PoseDetectorState } from '../../../types/pose-detector.types';

export interface ModelLoadingIndicatorProps {
  state: PoseDetectorState;
  error?: string | null;
  onRetry?: () => void;
  className?: string;
}
