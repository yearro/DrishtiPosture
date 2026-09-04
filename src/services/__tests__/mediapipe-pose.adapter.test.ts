import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MediaPipePoseAdapter } from '../mediapipe-pose.adapter';

// Mock de @mediapipe/tasks-vision
const mockDetect = vi.fn();
const mockClose = vi.fn();

vi.mock('@mediapipe/tasks-vision', () => {
  return {
    FilesetResolver: {
      forVisionTasks: vi.fn().mockResolvedValue({}),
    },
    PoseLandmarker: {
      createFromOptions: vi.fn().mockImplementation(() => {
        return Promise.resolve({
          detect: mockDetect,
          close: mockClose,
        });
      }),
    },
  };
});

describe('MediaPipePoseAdapter', () => {
  let adapter: MediaPipePoseAdapter;

  beforeEach(() => {
    vi.clearAllMocks();
    adapter = new MediaPipePoseAdapter();
  });

  it('debe inicializarse correctamente', async () => {
    await adapter.initialize();
    expect(adapter).toBeDefined();
  });

  it('debe mapear el resultado de MediaPipe a IPoseFrame', async () => {
    await adapter.initialize();

    // Crear 33 landmarks de prueba
    const dummyRawLandmarks = Array.from({ length: 33 }, (_, i) => ({
      x: 0.5,
      y: 0.5,
      z: 0.0,
      visibility: i === 11 ? 0.4 : 0.9, // Landmark 11 tiene visibilidad < 0.5
    }));

    mockDetect.mockReturnValueOnce({
      landmarks: [dummyRawLandmarks],
      worldLandmarks: [[]],
    });

    const dummyCanvas = document.createElement('canvas');
    const poseFrame = await adapter.detect(dummyCanvas as unknown as HTMLCanvasElement, 1000);

    expect(poseFrame).toBeDefined();
    expect(poseFrame.timestamp).toBe(1000);
    expect(poseFrame.landmarks).toHaveLength(33);
    expect(poseFrame.landmarks[11].visibility).toBe(0.4);
    expect(poseFrame.landmarks[0].visibility).toBe(0.9);
  });

  it('debe devolver landmarks vacíos si no hay personas detectadas', async () => {
    await adapter.initialize();
    mockDetect.mockReturnValueOnce({ landmarks: [] });

    const dummyCanvas = document.createElement('canvas');
    const poseFrame = await adapter.detect(dummyCanvas as unknown as HTMLCanvasElement);

    expect(poseFrame.landmarks).toEqual([]);
    expect(poseFrame.poseScore).toBe(0);
  });

  it('debe llamar a close() al ejecutar dispose()', async () => {
    await adapter.initialize();
    adapter.dispose();
    expect(mockClose).toHaveBeenCalledOnce();
  });
});
