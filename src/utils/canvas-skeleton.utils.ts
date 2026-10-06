import type { ILandmark, IJointAngleResult, JointStatus } from '../types/domain.types';
import { LandmarkIndex, JOINT_STATUS_COLORS } from '../types/domain.types';

/** Pares de landmarks que forman las conexiones del esqueleto de MediaPipe Pose */
interface SkeletonEdge {
  from: number;
  to: number;
}

const SKELETON_EDGES: readonly SkeletonEdge[] = [
  // Torso
  { from: LandmarkIndex.LEFT_SHOULDER, to: LandmarkIndex.RIGHT_SHOULDER },
  { from: LandmarkIndex.LEFT_SHOULDER, to: LandmarkIndex.LEFT_HIP },
  { from: LandmarkIndex.RIGHT_SHOULDER, to: LandmarkIndex.RIGHT_HIP },
  { from: LandmarkIndex.LEFT_HIP, to: LandmarkIndex.RIGHT_HIP },
  // Brazo izquierdo
  { from: LandmarkIndex.LEFT_SHOULDER, to: LandmarkIndex.LEFT_ELBOW },
  { from: LandmarkIndex.LEFT_ELBOW, to: LandmarkIndex.LEFT_WRIST },
  // Brazo derecho
  { from: LandmarkIndex.RIGHT_SHOULDER, to: LandmarkIndex.RIGHT_ELBOW },
  { from: LandmarkIndex.RIGHT_ELBOW, to: LandmarkIndex.RIGHT_WRIST },
  // Pierna izquierda
  { from: LandmarkIndex.LEFT_HIP, to: LandmarkIndex.LEFT_KNEE },
  { from: LandmarkIndex.LEFT_KNEE, to: LandmarkIndex.LEFT_ANKLE },
  // Pierna derecha
  { from: LandmarkIndex.RIGHT_HIP, to: LandmarkIndex.RIGHT_KNEE },
  { from: LandmarkIndex.RIGHT_KNEE, to: LandmarkIndex.RIGHT_ANKLE },
];

const DEFAULT_SKELETON_COLOR = 'rgba(255, 255, 255, 0.5)';
const LANDMARK_RADIUS = 4;
const LINE_WIDTH = 2.5;
const VISIBILITY_THRESHOLD = 0.5;

export interface SkeletonScale {
  width: number;
  height: number;
  isMirrored?: boolean;
}

/**
 * Dibuja el esqueleto de MediaPipe Pose sobre un canvas 2D, coloreando las
 * líneas según el estado de evaluación de cada articulación.
 *
 * Las articulaciones que tienen un JointAngleRule asociado se colorean según
 * su status (verde/amarillo/rojo). El resto del esqueleto se dibuja en blanco
 * semitransparente.
 */
export function drawPoseSkeleton(
  ctx: CanvasRenderingContext2D,
  landmarks: ILandmark[],
  jointResults: IJointAngleResult[],
  scale: SkeletonScale
): void {
  if (!landmarks || landmarks.length === 0) return;

  const landmarkMap = new Map<number, ILandmark>();
  for (const lm of landmarks) {
    if (lm && lm.visibility >= VISIBILITY_THRESHOLD) {
      landmarkMap.set(lm.index, lm);
    }
  }

  // Mapa rápido: landmarkB → status para colorear las líneas evaluadas
  const statusByVertex = new Map<number, JointStatus>();
  for (const result of jointResults) {
    if (result.measuredAngle !== null && result.rule) {
      statusByVertex.set(result.rule.landmarkB, result.status);
    }
  }

  ctx.save();

  // Dibujar líneas del esqueleto
  for (const edge of SKELETON_EDGES) {
    const from = landmarkMap.get(edge.from);
    const to = landmarkMap.get(edge.to);
    if (!from || !to) continue;

    let x1 = from.x * scale.width;
    const y1 = from.y * scale.height;
    let x2 = to.x * scale.width;
    const y2 = to.y * scale.height;

    if (scale.isMirrored) {
      x1 = scale.width - x1;
      x2 = scale.width - x2;
    }

    // Determinar color: si el vértice (landmarkB) de esta conexión está
    // evaluado, usar su color; si no, blanco semitransparente
    const color = statusByVertex.get(edge.from) ?? statusByVertex.get(edge.to);
    const strokeColor = color ? JOINT_STATUS_COLORS[color] : DEFAULT_SKELETON_COLOR;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = LINE_WIDTH;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  // Dibujar círculos en cada landmark
  for (const lm of landmarkMap.values()) {
    let x = lm.x * scale.width;
    const y = lm.y * scale.height;
    if (scale.isMirrored) {
      x = scale.width - x;
    }

    ctx.beginPath();
    ctx.arc(x, y, LANDMARK_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fill();
  }

  ctx.restore();
}