import type { FrameCallback } from '../../../types/camera.types';
import type { IJointAngleResult, ILandmark } from '../../../types/domain.types';

export interface CameraViewProps {
  stream: MediaStream | null;
  mirrorMode?: boolean;
  onFrameReady?: FrameCallback;
  /** Resultados de evaluación angular para colorear el esqueleto en el canvas */
  jointResults?: IJointAngleResult[];
  /** Landmarks del último frame para dibujar el esqueleto */
  landmarks?: ILandmark[];
}
