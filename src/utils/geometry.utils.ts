import type { ILandmark } from '../types/domain.types';

/**
 * Calcula el ángulo en grados [0, 180] formado por tres puntos en 2D (A, B, C)
 * donde B es el vértice.
 *
 * Algoritmo: Producto punto de vectores normalizados BA y BC.
 * cos(θ) = (BA · BC) / (|BA| * |BC|)
 *
 * @param a Primer punto del trío (A)
 * @param b Vértice del ángulo (B)
 * @param c Tercer punto del trío (C)
 * @returns Ángulo en grados en el rango [0, 180], redondeado a 1 decimal. Retorna 0 si los puntos son degenerados.
 */
export function calculateAngle(
  a: Pick<ILandmark, 'x' | 'y'>,
  b: Pick<ILandmark, 'x' | 'y'>,
  c: Pick<ILandmark, 'x' | 'y'>
): number {
  // Vector BA: de B hacia A
  const baX = a.x - b.x;
  const baY = a.y - b.y;

  // Vector BC: de B hacia C
  const bcX = c.x - b.x;
  const bcY = c.y - b.y;

  // Magnitudes de los vectores
  const magBA = Math.hypot(baX, baY);
  const magBC = Math.hypot(bcX, bcY);

  // Evitar división por cero en casos degenerados (puntos superpuestos)
  if (magBA < 1e-7 || magBC < 1e-7) {
    return 0;
  }

  // Producto punto BA · BC
  const dotProduct = baX * bcX + baY * bcY;

  // Coseno del ángulo
  const cosTheta = dotProduct / (magBA * magBC);

  // Clampear cosTheta al rango [-1, 1] para evitar errores de precisión flotante con acos
  const clampedCos = Math.max(-1, Math.min(1, cosTheta));

  // Ángulo en radianes y conversión a grados
  const angleRad = Math.acos(clampedCos);
  const angleDeg = (angleRad * 180) / Math.PI;

  // Redondear a 1 decimal para estabilidad numérica y visual
  return Math.round(angleDeg * 10) / 10;
}
