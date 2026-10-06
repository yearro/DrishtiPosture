import { useEffect, useRef } from 'react';
import type { CameraViewProps } from './CameraView.types';
import styles from './CameraView.module.css';
import { startFrameLoop, stopFrameLoop } from '../../../services/frame-loop.service';
import { drawPoseSkeleton } from '../../../utils/canvas-skeleton.utils';

export function CameraView({
  stream,
  mirrorMode = true,
  onFrameReady,
  jointResults,
  landmarks,
}: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (stream) {
      video.srcObject = stream;
      video.play().catch(() => {
        // Play interruption fallback
      });
    } else {
      video.srcObject = null;
    }
  }, [stream]);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const handleLoadedMetadata = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = video.videoWidth || 640;
      const height = video.videoHeight || 480;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // Dibujar esqueleto en el canvas cuando hay landmarks disponibles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !landmarks || landmarks.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);

    drawPoseSkeleton(ctx, landmarks, jointResults ?? [], {
      width: canvas.width / dpr,
      height: canvas.height / dpr,
      isMirrored: mirrorMode,
    });

    ctx.restore();
  }, [landmarks, jointResults, mirrorMode]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !stream || !onFrameReady) return;

    let rafId = 0;
    rafId = startFrameLoop(video, onFrameReady);

    return () => {
      stopFrameLoop(rafId);
    };
  }, [stream, onFrameReady]);

  const mirrorClass = mirrorMode ? styles.mirrored : '';

  return (
    <div className={styles.container}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        aria-label="Stream de video de cámara para análisis de postura"
        className={`${styles.video} ${mirrorClass}`}
      />
      <canvas
        ref={canvasRef}
        className={`${styles.canvas} ${mirrorClass}`}
      />
    </div>
  );
}
