import { MediaPipePoseAdapter } from '../services/mediapipe-pose.adapter';
import type { WorkerInputMessage, WorkerOutputMessage } from '../types/pose-detector.types';

const adapter = new MediaPipePoseAdapter();

self.onmessage = async (event: MessageEvent<WorkerInputMessage>) => {
  const message = event.data;

  if (!message) return;

  if (message.type === 'INIT') {
    try {
      await adapter.initialize(message.options);
      const readyMsg: WorkerOutputMessage = { type: 'READY' };
      self.postMessage(readyMsg);
    } catch (error) {
      const errorMsg: WorkerOutputMessage = {
        type: 'ERROR',
        error: error instanceof Error ? error.message : 'Failed to initialize MediaPipe Pose worker',
      };
      self.postMessage(errorMsg);
    }
    return;
  }

  if (message.type === 'DETECT') {
    const { frame, timestamp } = message;
    try {
      const startTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
      const poseFrame = await adapter.detect(frame, timestamp);
      const endTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
      const latencyMs = endTime - startTime;

      const resultMsg: WorkerOutputMessage = {
        type: 'RESULT',
        poseFrame,
        latencyMs,
      };
      self.postMessage(resultMsg);
    } catch (error) {
      const errorMsg: WorkerOutputMessage = {
        type: 'ERROR',
        error: error instanceof Error ? error.message : 'Error detecting pose in worker',
      };
      self.postMessage(errorMsg);
    } finally {
      // Liberación obligatoria de memoria de GPU/CPU para el ImageBitmap
      if (frame && typeof frame.close === 'function') {
        frame.close();
      }
    }
  }
};
