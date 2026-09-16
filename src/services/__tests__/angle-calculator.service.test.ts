import { describe, it, expect } from 'vitest';
import { calculateJointAngles } from '../angle-calculator.service';
import type {
  IPoseFrame,
  IJointAngleRule,
  ILandmark,
} from '../../types/domain.types';
import { LandmarkIndex } from '../../types/domain.types';

describe('angle-calculator.service > calculateJointAngles', () => {
  const dummyRule: IJointAngleRule = {
    jointName: 'Rodilla derecha',
    landmarkA: LandmarkIndex.RIGHT_HIP, // 24
    landmarkB: LandmarkIndex.RIGHT_KNEE, // 26 (vértice)
    landmarkC: LandmarkIndex.RIGHT_ANKLE, // 28
    idealAngleMin: 85,
    idealAngleMax: 95,
    warningThreshold: 10,
    weight: 1.0,
    feedbackTemplate: 'Ajusta la rodilla {delta}°',
    side: 'right',
  };

  function createLandmark(index: LandmarkIndex, x: number, y: number, visibility = 0.9): ILandmark {
    return { index, name: `LM_${index}`, x, y, z: 0, visibility };
  }

  it('debe calcular correctamente el ángulo y marcar estado "correct" cuando está en rango', () => {
    // 90° exactos
    const landmarks: ILandmark[] = [
      createLandmark(LandmarkIndex.RIGHT_HIP, 0.5, 0.2), // A arriba
      createLandmark(LandmarkIndex.RIGHT_KNEE, 0.5, 0.5), // B vértice
      createLandmark(LandmarkIndex.RIGHT_ANKLE, 0.8, 0.5), // C derecha
    ];

    const poseFrame: IPoseFrame = {
      timestamp: 1000,
      landmarks,
      poseScore: 0.9,
    };

    const results = calculateJointAngles(poseFrame, [dummyRule]);

    expect(results).toHaveLength(1);
    expect(results[0].measuredAngle).toBe(90.0);
    expect(results[0].status).toBe('correct');
    expect(results[0].delta).toBe(0);
    expect(results[0].feedbackMessage).toBeNull();
  });

  it('debe marcar estado "warning" cuando el ángulo está en el margen de advertencia', () => {
    // A=(0,1), B=(0,0). Para obtener ángulo de 100° entre BA (90°) y BC (-10°):
    const rad = (-10 * Math.PI) / 180;
    const landmarks: ILandmark[] = [
      createLandmark(LandmarkIndex.RIGHT_HIP, 0, 1),
      createLandmark(LandmarkIndex.RIGHT_KNEE, 0, 0),
      createLandmark(LandmarkIndex.RIGHT_ANKLE, Math.cos(rad), Math.sin(rad)),
    ];

    const poseFrame: IPoseFrame = { timestamp: 1000, landmarks, poseScore: 0.9 };
    const results = calculateJointAngles(poseFrame, [dummyRule]);

    expect(results[0].status).toBe('warning');
    expect(results[0].measuredAngle).toBe(100.0);
    expect(results[0].delta).toBe(5);
    expect(results[0].feedbackMessage).toBe('Ajusta la rodilla 5°');
  });

  it('debe marcar estado "incorrect" cuando el ángulo supera el margen de advertencia', () => {
    // A=(0,1), B=(0,0). Para obtener ángulo de 120° (cos = -0.5): C=(cos(-30°), sin(-30°)) = (0.866, -0.5)
    const rad = (-30 * Math.PI) / 180;
    const landmarks: ILandmark[] = [
      createLandmark(LandmarkIndex.RIGHT_HIP, 0, 1),
      createLandmark(LandmarkIndex.RIGHT_KNEE, 0, 0),
      createLandmark(LandmarkIndex.RIGHT_ANKLE, Math.cos(rad), Math.sin(rad)),
    ];

    const poseFrame: IPoseFrame = { timestamp: 1000, landmarks, poseScore: 0.9 };
    const results = calculateJointAngles(poseFrame, [dummyRule]);

    expect(results[0].status).toBe('incorrect');
    expect(results[0].measuredAngle).toBe(120.0);
    expect(results[0].delta).toBe(25);
    expect(results[0].feedbackMessage).toBe('Ajusta la rodilla 25°');
  });

  it('debe retornar status "invisible" y measuredAngle null si algún landmark tiene visibility < 0.5', () => {
    const landmarks: ILandmark[] = [
      createLandmark(LandmarkIndex.RIGHT_HIP, 0.5, 0.2, 0.9),
      createLandmark(LandmarkIndex.RIGHT_KNEE, 0.5, 0.5, 0.3), // B baja visibilidad (< 0.5)
      createLandmark(LandmarkIndex.RIGHT_ANKLE, 0.8, 0.5, 0.9),
    ];

    const poseFrame: IPoseFrame = { timestamp: 1000, landmarks, poseScore: 0.9 };
    const results = calculateJointAngles(poseFrame, [dummyRule]);

    expect(results[0].status).toBe('invisible');
    expect(results[0].measuredAngle).toBeNull();
    expect(results[0].delta).toBeNull();
    expect(results[0].feedbackMessage).toBeNull();
  });
});
