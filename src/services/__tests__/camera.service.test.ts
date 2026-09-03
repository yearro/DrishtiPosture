import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  requestCameraAccess,
  releaseStream,
  getOptimalConstraints,
  parseCameraError,
} from '../camera.service';

describe('camera.service', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('getOptimalConstraints retorna la configuración predeterminada', () => {
    const constraints = getOptimalConstraints();
    expect(constraints).toEqual({
      video: {
        width: { ideal: 1280, min: 640 },
        height: { ideal: 720, min: 480 },
        facingMode: 'user',
      },
      audio: false,
    });
  });

  it('parseCameraError mapea NotAllowedError a permission-denied', () => {
    const err = new DOMException('Permission denied', 'NotAllowedError');
    const parsed = parseCameraError(err);
    expect(parsed.type).toBe('permission-denied');
    expect(parsed.message).toContain('denegado');
  });

  it('parseCameraError mapea NotFoundError a not-found', () => {
    const err = new DOMException('Device not found', 'NotFoundError');
    const parsed = parseCameraError(err);
    expect(parsed.type).toBe('not-found');
  });

  it('requestCameraAccess retorna MediaStream en caso de éxito', async () => {
    const mockTrack = { stop: vi.fn() } as unknown as MediaStreamTrack;
    const mockStream = {
      getTracks: () => [mockTrack],
    } as unknown as MediaStream;

    Object.defineProperty(navigator, 'mediaDevices', {
      value: {
        getUserMedia: vi.fn().mockResolvedValue(mockStream),
      },
      writable: true,
      configurable: true,
    });

    const stream = await requestCameraAccess();
    expect(stream).toBe(mockStream);
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalled();
  });

  it('releaseStream detiene todos los MediaStreamTracks activos', () => {
    const stopFn1 = vi.fn();
    const stopFn2 = vi.fn();
    const mockStream = {
      getTracks: () => [
        { stop: stopFn1 } as unknown as MediaStreamTrack,
        { stop: stopFn2 } as unknown as MediaStreamTrack,
      ],
    } as unknown as MediaStream;

    releaseStream(mockStream);
    expect(stopFn1).toHaveBeenCalledTimes(1);
    expect(stopFn2).toHaveBeenCalledTimes(1);
  });
});
