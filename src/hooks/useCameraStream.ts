import { useState, useCallback, useEffect, useRef } from 'react';
import type { CameraState, CameraError } from '../types/camera.types';
import { requestCameraAccess, releaseStream } from '../services/camera.service';

const MIRROR_MODE_KEY = 'drishti:mirror-mode';

export interface UseCameraStreamReturn {
  cameraState: CameraState;
  stream: MediaStream | null;
  error: CameraError | null;
  mirrorMode: boolean;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  toggleMirror: () => void;
}

export function useCameraStream(): UseCameraStreamReturn {
  const [cameraState, setCameraState] = useState<CameraState>('idle');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<CameraError | null>(null);
  const [mirrorMode, setMirrorMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(MIRROR_MODE_KEY);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const streamRef = useRef<MediaStream | null>(null);
  streamRef.current = stream;

  const startCamera = useCallback(async () => {
    setCameraState('loading');
    setError(null);

    try {
      if (streamRef.current) {
        releaseStream(streamRef.current);
      }
      const newStream = await requestCameraAccess();
      setStream(newStream);
      setCameraState('active');
    } catch (err) {
      setStream(null);
      setError(err as CameraError);
      setCameraState('error');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      releaseStream(streamRef.current);
      setStream(null);
    }
    setCameraState('stopped');
  }, []);

  const toggleMirror = useCallback(() => {
    setMirrorMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(MIRROR_MODE_KEY, JSON.stringify(next));
      } catch {
        // localStorage non-critical fallback
      }
      return next;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        releaseStream(streamRef.current);
      }
    };
  }, []);

  return {
    cameraState,
    stream,
    error,
    mirrorMode,
    startCamera,
    stopCamera,
    toggleMirror,
  };
}
