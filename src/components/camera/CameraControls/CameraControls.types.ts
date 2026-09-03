import type { CameraState } from '../../../types/camera.types';

export interface CameraControlsProps {
  cameraState: CameraState;
  mirrorMode: boolean;
  onStartCamera: () => void;
  onStopCamera: () => void;
  onToggleMirror: () => void;
}
