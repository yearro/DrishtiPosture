import type { IJointAngleResult } from '../types/domain.types';
import type { IAlignmentMetric } from '../types/app.types';

/**
 * Convierte un status de JointStatus a un status de métrica de alineación.
 */
function statusToAlignmentStatus(status: 'correct' | 'warning' | 'incorrect' | 'invisible'): IAlignmentMetric['status'] {
  switch (status) {
    case 'correct':
      return 'optimal';
    case 'warning':
      return 'warning';
    case 'incorrect':
      return 'critical';
    case 'invisible':
      return 'warning';
  }
}

/**
 * Calcula un score de 0-100 para una métrica a partir del delta y el warningThreshold.
 * - correct / invisible: score fijo (100 / 0)
 * - warning: score decrece linealmente desde 100 hasta 60
 * - incorrect: score decrece linealmente desde 60 hasta 0
 */
function computeMetricScore(result: IJointAngleResult): number {
  if (result.status === 'correct') return 100;
  if (result.status === 'invisible') return 0;

  const threshold = result.rule.warningThreshold;
  const deltaAbs = Math.abs(result.delta ?? 0);

  if (result.status === 'warning') {
    // De 100 (delta=0) a 60 (delta=threshold)
    const ratio = Math.min(deltaAbs / threshold, 1);
    return Math.round(100 - ratio * 40);
  }

  // incorrect: de 60 (delta=threshold) a 0 (delta=2*threshold o más)
  const ratio = Math.min((deltaAbs - threshold) / threshold, 1);
  return Math.round(60 - ratio * 60);
}

/**
 * Convierte una lista de resultados de ángulo articulares a métricas de alineación
 * para el dashboard de la UI.
 *
 * @param jointResults Resultados del cálculo de ángulos
 * @returns Lista de IAlignmentMetric ordenada por score ascendente (peores primero)
 */
export function jointResultsToMetrics(jointResults: IJointAngleResult[]): IAlignmentMetric[] {
  if (!jointResults || jointResults.length === 0) {
    return [];
  }

  return jointResults
    .map((result) => {
      const score = computeMetricScore(result);
      return {
        name: result.rule.jointName,
        score,
        status: statusToAlignmentStatus(result.status),
        detail: result.feedbackMessage ?? (result.status === 'correct' ? 'Alineación correcta' : 'Fuera de rango'),
      };
    })
    .sort((a, b) => a.score - b.score);
}

/**
 * Calcula el score global de postura (0-100) como promedio ponderado de las métricas.
 * Si no hay métricas, retorna 0.
 */
export function calculateOverallPoseScore(metrics: IAlignmentMetric[]): number {
  if (!metrics || metrics.length === 0) return 0;
  const total = metrics.reduce((sum, m) => sum + m.score, 0);
  return Math.round(total / metrics.length);
}

/**
 * Selecciona el mensaje de feedback más urgente (la métrica con peor score).
 */
export function selectTopFeedback(metrics: IAlignmentMetric[]): string | null {
  if (!metrics || metrics.length === 0) return null;
  const worst = metrics[0]; // Ya está ordenado peor primero
  if (worst.status === 'optimal') return null;
  return worst.detail;
}