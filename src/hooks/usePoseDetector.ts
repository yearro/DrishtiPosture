import { useCallback, useEffect, useRef, useState } from 'react';
import { createPoseWorker, initPoseWorker, sendFrameToWorker, terminateWorker } from '../services/pose-detector.service';
import type { IPoseFrame } from '../types/domain.types';
import type { IPoseDetectorOptions, PoseDetectorState, WorkerOutputMessage } from '../types/pose-detector.types';

export interface UsePoseDetectorReturn {
  detectorState: PoseDetectorState;
  lastPoseFrame: IPoseFrame | null;
  inferenceLatencyMs: number;
  error: string | null;
  initialize: (options?: IPoseDetectorOptions) => void;
  processFrame: (video: HTMLVideoElement) => void;
  reset: () => void;
}

export function usePoseDetector(): UsePoseDetectorReturn {
  const [detectorState, setDetectorState] = useState<PoseDetectorState>('uninitialized');
  const [lastPoseFrame, setLastPoseFrame] = useState<IPoseFrame | null>(null);
  const [inferenceLatencyMs, setInferenceLatencyMs] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const workerRef = useRef<Worker | null>(null);
  const isProcessingRef = useRef<boolean>(false);

  const handleWorkerMessage = useCallback((event: MessageEvent<WorkerOutputMessage>) => {
    const data = event.data;
    if (!data) return;

    if (data.type === 'READY') {
      setDetectorState('ready');
      setError(null);
    } else if (data.type === 'RESULT') {
      setLastPoseFrame(data.poseFrame);
      setInferenceLatencyMs(data.latencyMs);
      isProcessingRef.current = false;
    } else if (data.type === 'ERROR') {
      setError(data.error);
      setDetectorState('error');
      isProcessingRef.current = false;
    }
  }, []);

  const initialize = useCallback(
    (options?: IPoseDetectorOptions) => {
      if (detectorState === 'loading' || detectorState === 'ready') {
        return;
      }

      setDetectorState('loading');
      setError(null);

      try {
        if (workerRef.current) {
          terminateWorker(workerRef.current);
        }

        const worker = createPoseWorker();
        workerRef.current = worker;
        worker.onmessage = handleWorkerMessage;

        initPoseWorker(worker, options);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Error creando Web Worker';
        setError(errorMsg);
        setDetectorState('error');
      }
    },
    [detectorState, handleWorkerMessage]
  );

  const processFrame = useCallback(
    (video: HTMLVideoElement) => {
      if (detectorState !== 'ready' || !workerRef.current) {
        return;
      }

      // Evita acumulación de frames en la cola si el worker aún está procesando
      if (isProcessingRef.current) {
        return;
      }

      if (video.readyState < 2 || video.paused || video.ended) {
        return;
      }

      const timestamp = typeof performance !== 'undefined' ? performance.now() : Date.now();

      isProcessingRef.current = true;
      createImageBitmap(video)
        .then((bitmap) => {
          if (workerRef.current && detectorState === 'ready') {
            sendFrameToWorker(workerRef.current, bitmap, timestamp);
          } else {
            bitmap.close();
            isProcessingRef.current = false;
          }
        })
        .catch((err) => {
          console.error('Error al capturar ImageBitmap del video:', err);
          isProcessingRef.current = false;
        });
    },
    [detectorState]
  );

  const reset = useCallback(() => {
    if (workerRef.current) {
      terminateWorker(workerRef.current);
      workerRef.current = null;
    }
    setDetectorState('uninitialized');
    setLastPoseFrame(null);
    setInferenceLatencyMs(0);
    setError(null);
    isProcessingRef.current = false;
  }, []);

  useEffect(() => {
    return () => {
      if (workerRef.current) {
        terminateWorker(workerRef.current);
        workerRef.current = null;
      }
    };
  }, []);

  return {
    detectorState,
    lastPoseFrame,
    inferenceLatencyMs,
    error,
    initialize,
    processFrame,
    reset,
  };
}
