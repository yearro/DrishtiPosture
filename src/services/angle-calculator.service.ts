import type {
  IPoseFrame,
  IJointAngleRule,
  IJointAngleResult,
  JointStatus,
  ILandmark,
} from '../types/domain.types';
import { calculateAngle } from '../utils/geometry.utils';
import { interpolateFeedback } from '../utils/feedback.utils';

/** Umbral mínimo de visibilidad para considerar confiable un landmark */
const VISIBILITY_THRESHOLD = 0.5;

/**
 * Evalúa los ángulos articulares de un frame de pose contra las reglas de una asana.
 *
 * @param poseFrame Frame de pose procesado por MediaPipe
 * @param rules Lista de reglas angulares de la asana activa
 * @returns Lista de resultados de evaluación por cada regla
 */
export function calculateJointAngles(
  poseFrame: IPoseFrame,
  rules: IJointAngleRule[]
): IJointAngleResult[] {
  if (!poseFrame || !poseFrame.landmarks || poseFrame.landmarks.length === 0) {
    return [];
  }

  // Mapa rápido de landmark por índice para acceso O(1)
  const landmarkMap = new Map<number, ILandmark>();
  for (let i = 0; i < poseFrame.landmarks.length; i++) {
    const lm = poseFrame.landmarks[i];
    if (lm) {
      landmarkMap.set(lm.index, lm);
    }
  }

  return rules.map((rule) => {
    const lmA = landmarkMap.get(rule.landmarkA);
    const lmB = landmarkMap.get(rule.landmarkB);
    const lmC = landmarkMap.get(rule.landmarkC);

    // Si algún landmark no existe o tiene visibilidad < 0.5, marcar como invisible
    const isVisible =
      lmA &&
      lmB &&
      lmC &&
      lmA.visibility >= VISIBILITY_THRESHOLD &&
      lmB.visibility >= VISIBILITY_THRESHOLD &&
      lmC.visibility >= VISIBILITY_THRESHOLD;

    if (!isVisible) {
      return {
        rule,
        measuredAngle: null,
        status: 'invisible' as JointStatus,
        delta: null,
        feedbackMessage: null,
      };
    }

    // Calcular el ángulo en grados usando geometría vectorial 2D
    const measuredAngle = calculateAngle(lmA, lmB, lmC);

    let status: JointStatus = 'correct';
    let delta: number = 0;
    let feedbackMessage: string | null = null;

    if (measuredAngle >= rule.idealAngleMin && measuredAngle <= rule.idealAngleMax) {
      status = 'correct';
      delta = 0;
      feedbackMessage = null;
    } else if (measuredAngle < rule.idealAngleMin) {
      const diff = rule.idealAngleMin - measuredAngle;
      delta = measuredAngle - rule.idealAngleMin; // Valor negativo
      status = diff <= rule.warningThreshold ? 'warning' : 'incorrect';
      feedbackMessage = interpolateFeedback(rule.feedbackTemplate, delta);
    } else {
      // measuredAngle > rule.idealAngleMax
      const diff = measuredAngle - rule.idealAngleMax;
      delta = measuredAngle - rule.idealAngleMax; // Valor positivo
      status = diff <= rule.warningThreshold ? 'warning' : 'incorrect';
      feedbackMessage = interpolateFeedback(rule.feedbackTemplate, delta);
    }

    return {
      rule,
      measuredAngle,
      status,
      delta,
      feedbackMessage,
    };
  });
}
