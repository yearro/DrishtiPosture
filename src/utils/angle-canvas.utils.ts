import type { IJointAngleResult, ILandmark } from '../types/domain.types';
import { JOINT_STATUS_COLORS } from '../types/domain.types';

export interface CanvasScale {
  width: number;
  height: number;
  isMirrored?: boolean;
}

/**
 * Renderiza los valores numéricos de ángulo en grados sobre el Canvas 2D
 * junto al vértice (landmark B) de cada articulación evaluada.
 *
 * @param ctx Contexto de renderizado Canvas 2D
 * @param results Resultados de cálculo de ángulos del frame
 * @param landmarks Array de 33 landmarks del frame
 * @param scale Dimensiones del canvas y bandera de espejado
 */
export function drawAngleLabels(
  ctx: CanvasRenderingContext2D,
  results: IJointAngleResult[],
  landmarks: ILandmark[],
  scale: CanvasScale
): void {
  if (!results || results.length === 0 || !landmarks || landmarks.length === 0) {
    return;
  }

  // Mapa rápido para ubicar landmarks por índice
  const landmarkMap = new Map<number, ILandmark>();
  for (let i = 0; i < landmarks.length; i++) {
    const lm = landmarks[i];
    if (lm) {
      landmarkMap.set(lm.index, lm);
    }
  }

  ctx.save();
  ctx.font = 'bold 14px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let i = 0; i < results.length; i++) {
    const res = results[i];
    if (!res || res.measuredAngle === null) {
      continue;
    }

    const vertexLm = landmarkMap.get(res.rule.landmarkB);
    if (!vertexLm || vertexLm.visibility < 0.5) {
      continue;
    }

    // Coordenadas escaladas al tamaño del canvas
    let x = vertexLm.x * scale.width;
    const y = vertexLm.y * scale.height;

    if (scale.isMirrored) {
      x = scale.width - x;
    }

    const labelText = `${Math.round(res.measuredAngle)}°`;
    const color = JOINT_STATUS_COLORS[res.status] || '#FFFFFF';

    // 1. Dibujar contorno/sombra blanco de 2px para garantizar accesibilidad y contraste sobre cualquier fondo
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FFFFFF';
    ctx.strokeText(labelText, x + 15, y - 10);

    // 2. Dibujar texto en color indicador según el estado
    ctx.fillStyle = color;
    ctx.fillText(labelText, x + 15, y - 10);
  }

  ctx.restore();
}
