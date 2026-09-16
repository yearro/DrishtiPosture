import type { FrameCallback } from '../types/camera.types';

export function startFrameLoop(
  video: HTMLVideoElement,
  callback: FrameCallback
): number {
  let rafId: number;

  const loop = (timestamp: DOMHighResTimeStamp) => {
    if (video.readyState >= 2) {
      callback(timestamp, video);
    }
    rafId = requestAnimationFrame(loop);
  };

  rafId = requestAnimationFrame(loop);
  return rafId;
}

export function stopFrameLoop(rafId: number): void {
  if (rafId) {
    cancelAnimationFrame(rafId);
  }
}