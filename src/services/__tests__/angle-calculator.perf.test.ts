import { describe, it, expect } from 'vitest';
import { calculateJointAngles } from '../angle-calculator.service';
import type { IPoseFrame, IJointAngleRule, ILandmark } from '../../types/domain.types';
import { LandmarkIndex } from '../../types/domain.types';

describe('angle-calculator.service Performance', () => {
  it('debe procesar 300 frames con 5 reglas en menos de 50ms en total', () => {
    // Definir 5 reglas de articulaciones
    const rules: IJointAngleRule[] = [
      {
        jointName: 'Rodilla derecha',
        landmarkA: LandmarkIndex.RIGHT_HIP,
        landmarkB: LandmarkIndex.RIGHT_KNEE,
        landmarkC: LandmarkIndex.RIGHT_ANKLE,
        idealAngleMin: 85,
        idealAngleMax: 95,
        warningThreshold: 10,
        weight: 1.0,
        feedbackTemplate: 'Ajusta la rodilla {delta}°',
        side: 'right',
      },
      {
        jointName: 'Rodilla izquierda',
        landmarkA: LandmarkIndex.LEFT_HIP,
        landmarkB: LandmarkIndex.LEFT_KNEE,
        landmarkC: LandmarkIndex.LEFT_ANKLE,
        idealAngleMin: 85,
        idealAngleMax: 95,
        warningThreshold: 10,
        weight: 1.0,
        feedbackTemplate: 'Ajusta la rodilla {delta}°',
        side: 'left',
      },
      {
        jointName: 'Cadera derecha',
        landmarkA: LandmarkIndex.RIGHT_SHOULDER,
        landmarkB: LandmarkIndex.RIGHT_HIP,
        landmarkC: LandmarkIndex.RIGHT_KNEE,
        idealAngleMin: 160,
        idealAngleMax: 180,
        warningThreshold: 15,
        weight: 1.0,
        feedbackTemplate: 'Ajusta la cadera {delta}°',
        side: 'right',
      },
      {
        jointName: 'Codo derecho',
        landmarkA: LandmarkIndex.RIGHT_SHOULDER,
        landmarkB: LandmarkIndex.RIGHT_ELBOW,
        landmarkC: LandmarkIndex.RIGHT_WRIST,
        idealAngleMin: 170,
        idealAngleMax: 180,
        warningThreshold: 10,
        weight: 0.8,
        feedbackTemplate: 'Extiende el codo {delta}°',
        side: 'right',
      },
      {
        jointName: 'Codo izquierdo',
        landmarkA: LandmarkIndex.LEFT_SHOULDER,
        landmarkB: LandmarkIndex.LEFT_ELBOW,
        landmarkC: LandmarkIndex.LEFT_WRIST,
        idealAngleMin: 170,
        idealAngleMax: 180,
        warningThreshold: 10,
        weight: 0.8,
        feedbackTemplate: 'Extiende el codo {delta}°',
        side: 'left',
      },
    ];

    // Crear 33 landmarks sintéticos
    const landmarks: ILandmark[] = Array.from({ length: 33 }, (_, i) => ({
      index: i as LandmarkIndex,
      name: `LM_${i}`,
      x: 0.1 * (i % 5),
      y: 0.1 * Math.floor(i / 5),
      z: 0,
      visibility: 0.9,
    }));

    const frame: IPoseFrame = {
      timestamp: performance.now(),
      landmarks,
      poseScore: 0.95,
    };

    const iterations = 300;
    const start = performance.now();

    for (let i = 0; i < iterations; i++) {
      calculateJointAngles(frame, rules);
    }

    const elapsedMs = performance.now() - start;
    const perFrameMs = elapsedMs / iterations;

    console.log(
      `[ANGLE PERF] ${iterations} frames procesados en ${elapsedMs.toFixed(2)}ms (${perFrameMs.toFixed(4)}ms/frame)`
    );

    expect(elapsedMs).toBeLessThan(50);
  });
});
