import type { IPoseFrame } from './domain.types';

export type PoseDetectorState = 'uninitialized' | 'loading' | 'ready' | 'error';

export interface IPoseDetectorOptions {
  modelAssetPath?: string;
  wasmLoaderPath?: string;
  minPoseDetectionConfidence?: number;
  minPosePresenceConfidence?: number;
  minTrackingConfidence?: number;
}

export interface IPoseDetector {
  initialize(options?: IPoseDetectorOptions): Promise<void>;
  detect(frame: ImageBitmap | HTMLVideoElement | HTMLCanvasElement, timestamp?: number): Promise<IPoseFrame>;
  dispose(): void;
}

export type WorkerInputMessage =
  | { type: 'INIT'; options?: IPoseDetectorOptions }
  | { type: 'DETECT'; frame: ImageBitmap; timestamp: number };

export type WorkerOutputMessage =
  | { type: 'READY' }
  | { type: 'RESULT'; poseFrame: IPoseFrame; latencyMs: number }
  | { type: 'ERROR'; error: string };
