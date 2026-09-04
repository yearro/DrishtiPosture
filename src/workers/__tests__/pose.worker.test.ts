import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock de MediaPipePoseAdapter para el worker
vi.mock('../../services/mediapipe-pose.adapter', () => {
  return {
    MediaPipePoseAdapter: vi.fn().mockImplementation(() => {
      return {
        initialize: vi.fn().mockResolvedValue(undefined),
        detect: vi.fn().mockResolvedValue({
          timestamp: 100,
          landmarks: Array.from({ length: 33 }, (_, i) => ({
            index: i,
            name: `LANDMARK_${i}`,
            x: 0.5,
            y: 0.5,
            z: 0.0,
            visibility: 0.9,
          })),
          poseScore: 0.95,
        }),
        dispose: vi.fn(),
      };
    }),
  };
});

describe('Pose Worker Communication Logic', () => {
  let postMessageSpy: ReturnType<typeof vi.fn>;
  let closeSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    postMessageSpy = vi.fn();
    closeSpy = vi.fn();

    // Mock global self.postMessage
    vi.stubGlobal('postMessage', postMessageSpy);
  });

  it('debe responder READY tras mensaje INIT', async () => {
    // Importación dinámica para ejecutar el setup del worker
    await import('../pose.worker');

    const initEvent = new MessageEvent('message', {
      data: { type: 'INIT' },
    });

    // Simular el handler del worker
    if (self.onmessage) {
      await (self.onmessage as (ev: MessageEvent) => Promise<void>)(initEvent);
    }

    expect(postMessageSpy).toHaveBeenCalledWith({ type: 'READY' });
  });

  it('debe responder RESULT y llamar a frame.close() tras mensaje DETECT', async () => {
    await import('../pose.worker');

    const mockFrame = {
      close: closeSpy,
    } as unknown as ImageBitmap;

    const detectEvent = new MessageEvent('message', {
      data: { type: 'DETECT', frame: mockFrame, timestamp: 12345 },
    });

    if (self.onmessage) {
      await (self.onmessage as (ev: MessageEvent) => Promise<void>)(detectEvent);
    }

    expect(postMessageSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'RESULT',
        poseFrame: expect.objectContaining({ timestamp: 100 }),
      })
    );
    expect(closeSpy).toHaveBeenCalledOnce();
  });
});
