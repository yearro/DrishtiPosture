import { FilesetResolver, PoseLandmarker } from '@mediapipe/tasks-vision';
import type { ILandmark, IPoseFrame } from '../types/domain.types';
import { LandmarkIndex, LANDMARK_NAMES } from '../types/domain.types';
import type { IPoseDetector, IPoseDetectorOptions } from '../types/pose-detector.types';

export class MediaPipePoseAdapter implements IPoseDetector {
  private poseLandmarker: PoseLandmarker | null = null;

  async initialize(options?: IPoseDetectorOptions): Promise<void> {
    const wasmPath =
      options?.wasmLoaderPath ||
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.20/wasm';

    const modelPath =
      options?.modelAssetPath ||
      'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task';

    const vision = await FilesetResolver.forVisionTasks(wasmPath);

    try {
      this.poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: modelPath,
          delegate: 'GPU',
        },
        runningMode: 'IMAGE',
        numPoses: 1,
        minPoseDetectionConfidence: options?.minPoseDetectionConfidence ?? 0.5,
        minPosePresenceConfidence: options?.minPosePresenceConfidence ?? 0.5,
        minTrackingConfidence: options?.minTrackingConfidence ?? 0.5,
      });
    } catch (gpuError) {
      console.warn('GPU delegate initialization failed. Falling back to CPU.', gpuError);
      this.poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: modelPath,
          delegate: 'CPU',
        },
        runningMode: 'IMAGE',
        numPoses: 1,
        minPoseDetectionConfidence: options?.minPoseDetectionConfidence ?? 0.5,
        minPosePresenceConfidence: options?.minPosePresenceConfidence ?? 0.5,
        minTrackingConfidence: options?.minTrackingConfidence ?? 0.5,
      });
    }
  }

  async detect(
    frame: ImageBitmap | HTMLVideoElement | HTMLCanvasElement,
    timestamp?: number
  ): Promise<IPoseFrame> {
    if (!this.poseLandmarker) {
      throw new Error('MediaPipePoseAdapter is not initialized.');
    }

    const now = timestamp ?? (typeof performance !== 'undefined' ? performance.now() : Date.now());
    const result = this.poseLandmarker.detect(frame);

    if (!result || !result.landmarks || result.landmarks.length === 0) {
      return {
        timestamp: now,
        landmarks: [],
        poseScore: 0,
      };
    }

    const rawLandmarks = result.landmarks[0];
    const landmarks: ILandmark[] = rawLandmarks.map((lm, idx) => {
      const visibility = lm.visibility ?? 1.0;
      return {
        index: idx as LandmarkIndex,
        name: LANDMARK_NAMES[idx as LandmarkIndex] || `LANDMARK_${idx}`,
        x: lm.x,
        y: lm.y,
        z: lm.z,
        visibility,
      };
    });

    // poseLandmarksScore puede ser number[] o no existir
    const poseScore =
      result.worldLandmarks && result.worldLandmarks.length > 0 ? 0.95 : 0.8;

    return {
      timestamp: now,
      landmarks,
      poseScore,
    };
  }

  dispose(): void {
    if (this.poseLandmarker) {
      try {
        this.poseLandmarker.close();
      } catch (e) {
        console.error('Error disposing PoseLandmarker:', e);
      }
      this.poseLandmarker = null;
    }
  }
}
