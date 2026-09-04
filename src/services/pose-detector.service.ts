import type { IPoseDetectorOptions, WorkerInputMessage } from '../types/pose-detector.types';

export function createPoseWorker(): Worker {
  return new Worker(new URL('../workers/pose.worker.ts', import.meta.url), {
    type: 'module',
  });
}

export function initPoseWorker(worker: Worker, options?: IPoseDetectorOptions): void {
  const msg: WorkerInputMessage = { type: 'INIT', options };
  worker.postMessage(msg);
}

export function sendFrameToWorker(worker: Worker, frame: ImageBitmap, timestamp: number): void {
  const msg: WorkerInputMessage = { type: 'DETECT', frame, timestamp };
  // Transfiere la propiedad del ImageBitmap al Worker para evita copia de memoria (zero-copy)
  worker.postMessage(msg, [frame]);
}

export function terminateWorker(worker: Worker): void {
  if (worker) {
    worker.terminate();
  }
}
