import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCameraStream } from '../useCameraStream';
import * as cameraService from '../../services/camera.service';

vi.mock('../../services/camera.service', () => ({
  requestCameraAccess: vi.fn(),
  releaseStream: vi.fn(),
  getOptimalConstraints: vi.fn(),
}));

describe('useCameraStream hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('inicia con estado idle y mirrorMode true por defecto', () => {
    const { result } = renderHook(() => useCameraStream());
    expect(result.current.cameraState).toBe('idle');
    expect(result.current.stream).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.mirrorMode).toBe(true);
  });

  it('startCamera cambia a active si requestCameraAccess tiene éxito', async () => {
    const mockTrack = { stop: vi.fn() } as unknown as MediaStreamTrack;
    const mockStream = { getTracks: () => [mockTrack] } as unknown as MediaStream;
    vi.mocked(cameraService.requestCameraAccess).mockResolvedValueOnce(mockStream);

    const { result } = renderHook(() => useCameraStream());

    await act(async () => {
      await result.current.startCamera();
    });

    expect(result.current.cameraState).toBe('active');
    expect(result.current.stream).toBe(mockStream);
    expect(result.current.error).toBeNull();
  });

  it('startCamera cambia a error si requestCameraAccess falla', async () => {
    const mockError = {
      type: 'permission-denied' as const,
      message: 'Permiso denegado',
    };
    vi.mocked(cameraService.requestCameraAccess).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useCameraStream());

    await act(async () => {
      await result.current.startCamera();
    });

    expect(result.current.cameraState).toBe('error');
    expect(result.current.stream).toBeNull();
    expect(result.current.error).toEqual(mockError);
  });

  it('stopCamera libera el stream y cambia a estado stopped', async () => {
    const mockTrack = { stop: vi.fn() } as unknown as MediaStreamTrack;
    const mockStream = { getTracks: () => [mockTrack] } as unknown as MediaStream;
    vi.mocked(cameraService.requestCameraAccess).mockResolvedValueOnce(mockStream);

    const { result } = renderHook(() => useCameraStream());

    await act(async () => {
      await result.current.startCamera();
    });

    act(() => {
      result.current.stopCamera();
    });

    expect(cameraService.releaseStream).toHaveBeenCalledWith(mockStream);
    expect(result.current.stream).toBeNull();
    expect(result.current.cameraState).toBe('stopped');
  });

  it('toggleMirror cambia el estado y actualiza localStorage', () => {
    const { result } = renderHook(() => useCameraStream());

    act(() => {
      result.current.toggleMirror();
    });

    expect(result.current.mirrorMode).toBe(false);
    expect(localStorage.getItem('drishti:mirror-mode')).toBe('false');
  });
});
