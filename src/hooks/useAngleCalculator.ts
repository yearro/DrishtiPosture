import { useMemo } from 'react';
import type { IAsana } from '../types/app.types';
import type { IPoseFrame } from '../types/domain.types';
import { calculateJointAngles } from '../services/angle-calculator.service';

/** Umbral de score de pose para considerar confiable el frame entero */
const MIN_POSE_SCORE = 0.5;

/**
 * Hook reactivo que calcula los ángulos articulares para la asana activa en cada frame.
 * Utiliza `useMemo` para evitar re-renders innecesarios en la UI de React.
 *
 * @param poseFrame Frame de pose actual
 * @param activeAsana Asana seleccionada en el catálogo
 * @returns Array de IJointAngleResult (vacío si no hay pose activa o es poco confiable)
 */
export function useAngleCalculator(
  poseFrame: IPoseFrame | null,
  activeAsana: IAsana | null
): import('../types/domain.types').IJointAngleResult[] {
  return useMemo(() => {
    if (!poseFrame || !activeAsana || poseFrame.poseScore < MIN_POSE_SCORE) {
      return [];
    }

    if (!activeAsana.jointRules || activeAsana.jointRules.length === 0) {
      return [];
    }

    return calculateJointAngles(poseFrame, activeAsana.jointRules);
  }, [poseFrame, activeAsana]);
}
