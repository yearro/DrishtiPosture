/**
 * Tipos e Interfaces del Dominio de DrishtiPosture.
 * Basado en la especificación de docs/DOMAIN.md
 */

/** Índices de los 33 landmarks de MediaPipe Pose */
export const LandmarkIndex = {
  NOSE: 0,
  LEFT_EYE_INNER: 1,
  LEFT_EYE: 2,
  LEFT_EYE_OUTER: 3,
  RIGHT_EYE_INNER: 4,
  RIGHT_EYE: 5,
  RIGHT_EYE_OUTER: 6,
  LEFT_EAR: 7,
  RIGHT_EAR: 8,
  MOUTH_LEFT: 9,
  MOUTH_RIGHT: 10,
  LEFT_SHOULDER: 11,
  RIGHT_SHOULDER: 12,
  LEFT_ELBOW: 13,
  RIGHT_ELBOW: 14,
  LEFT_WRIST: 15,
  RIGHT_WRIST: 16,
  LEFT_PINKY: 17,
  RIGHT_PINKY: 18,
  LEFT_INDEX: 19,
  RIGHT_INDEX: 20,
  LEFT_THUMB: 21,
  RIGHT_THUMB: 22,
  LEFT_HIP: 23,
  RIGHT_HIP: 24,
  LEFT_KNEE: 25,
  RIGHT_KNEE: 26,
  LEFT_ANKLE: 27,
  RIGHT_ANKLE: 28,
  LEFT_HEEL: 29,
  RIGHT_HEEL: 30,
  LEFT_FOOT_INDEX: 31,
  RIGHT_FOOT_INDEX: 32,
} as const;

export type LandmarkIndex = (typeof LandmarkIndex)[keyof typeof LandmarkIndex];

export type JointStatus = 'correct' | 'warning' | 'incorrect' | 'invisible';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type BodyZone =
  | 'legs'
  | 'core'
  | 'arms'
  | 'shoulders'
  | 'hips'
  | 'balance'
  | 'spine';

export type Side = 'left' | 'right' | 'bilateral' | 'none';

/** Un punto articular detectado por MediaPipe Pose en un frame de video */
export interface ILandmark {
  index: LandmarkIndex;
  name: string;
  /** Coordenada horizontal normalizada [0, 1] */
  x: number;
  /** Coordenada vertical normalizada [0, 1] */
  y: number;
  /** Coordenada de profundidad relativa (ref: plano de caderas) */
  z: number;
  /** Score de visibilidad [0, 1]. Se descarta si < 0.5 */
  visibility: number;
}

/** Resultado de MediaPipe Pose para un único frame de video */
export interface IPoseFrame {
  /** Timestamp del frame — performance.now() */
  timestamp: DOMHighResTimeStamp;
  /** Array de landmarks detectados */
  landmarks: ILandmark[];
  /** Score de confianza global de la detección [0, 1] */
  poseScore: number;
}

/** Regla que define el rango angular ideal de una articulación para una asana */
export interface IJointAngleRule {
  /** Nombre legible de la articulación (ej: "Rodilla derecha") */
  jointName: string;
  /** Primer landmark del trío (punto A) */
  landmarkA: LandmarkIndex;
  /** Vértice del ángulo (punto B) */
  landmarkB: LandmarkIndex;
  /** Tercer landmark del trío (punto C) */
  landmarkC: LandmarkIndex;
  /** Ángulo mínimo aceptable en grados [0-180] */
  idealAngleMin: number;
  /** Ángulo máximo aceptable en grados [0-180] */
  idealAngleMax: number;
  /** Margen en grados para zona de advertencia (amarillo) antes de pasar a rojo */
  warningThreshold: number;
  /** Peso relativo [0-1] para el cálculo del score global de postura */
  weight: number;
  /**
   * Plantilla de mensaje de corrección.
   * Usa {delta} como placeholder para la magnitud de la desviación.
   */
  feedbackTemplate: string;
  side: Side;
}

/** Una postura de yoga del catálogo, con sus reglas de evaluación */
export interface IAsana {
  /** Identificador único (ej: "warrior-i") */
  id: string;
  nameEn: string;
  nameEs: string;
  nameSanskrit: string;
  difficulty: Difficulty;
  bodyZones: BodyZone[];
  /** Ruta relativa a la imagen de referencia */
  referenceImageUrl: string;
  description: string;
  /** Lista de reglas angulares que definen la postura correcta */
  jointRules: IJointAngleRule[];
}

/** Resultado del cálculo de ángulo y evaluación para una articulación en un frame */
export interface IJointAngleResult {
  /** La regla que originó este resultado */
  rule: IJointAngleRule;
  /**
   * Ángulo medido en grados [0-180].
   * null si algún landmark del trío tiene visibility < 0.5
   */
  measuredAngle: number | null;
  status: JointStatus;
  /**
   * Diferencia en grados respecto al límite más cercano del rango ideal.
   */
  delta: number | null;
  /** Mensaje de corrección generado, null si está en estado 'correct' */
  feedbackMessage: string | null;
}

/** Evaluación completa de un PoseFrame contra la asana activa */
export interface IPoseEvaluation {
  frameTimestamp: DOMHighResTimeStamp;
  asanaId: string;
  /** Score global de postura [0-100] */
  overallScore: number;
  /** Resultado por cada JointAngleRule de la asana activa */
  jointResults: IJointAngleResult[];
  /** Hasta 3 mensajes de corrección, ordenados por magnitud de delta descendente */
  topFeedbackMessages: string[];
  /** true si todas las articulaciones visibles están en estado 'correct' */
  isFullyCorrect: boolean;
}

/** Estado en memoria de la sesión de análisis activa */
export interface IAnalysisSession {
  activeAsana: IAsana | null;
  isCameraActive: boolean;
  lastPoseFrame: IPoseFrame | null;
  lastEvaluation: IPoseEvaluation | null;
  consecutiveCorrectMs: number;
}

/** Color hexadecimal del overlay según el estado de la articulación */
export const JOINT_STATUS_COLORS: Record<JointStatus, string> = {
  correct: '#22C55E',   // Verde
  warning: '#EAB308',   // Amarillo
  incorrect: '#EF4444', // Rojo
  invisible: '#6B7280', // Gris
} as const;

/** Mapa de nombre de landmark por índice */
export const LANDMARK_NAMES: Record<LandmarkIndex, string> = {
  [LandmarkIndex.NOSE]: 'NOSE',
  [LandmarkIndex.LEFT_EYE_INNER]: 'LEFT_EYE_INNER',
  [LandmarkIndex.LEFT_EYE]: 'LEFT_EYE',
  [LandmarkIndex.LEFT_EYE_OUTER]: 'LEFT_EYE_OUTER',
  [LandmarkIndex.RIGHT_EYE_INNER]: 'RIGHT_EYE_INNER',
  [LandmarkIndex.RIGHT_EYE]: 'RIGHT_EYE',
  [LandmarkIndex.RIGHT_EYE_OUTER]: 'RIGHT_EYE_OUTER',
  [LandmarkIndex.LEFT_EAR]: 'LEFT_EAR',
  [LandmarkIndex.RIGHT_EAR]: 'RIGHT_EAR',
  [LandmarkIndex.MOUTH_LEFT]: 'MOUTH_LEFT',
  [LandmarkIndex.MOUTH_RIGHT]: 'MOUTH_RIGHT',
  [LandmarkIndex.LEFT_SHOULDER]: 'LEFT_SHOULDER',
  [LandmarkIndex.RIGHT_SHOULDER]: 'RIGHT_SHOULDER',
  [LandmarkIndex.LEFT_ELBOW]: 'LEFT_ELBOW',
  [LandmarkIndex.RIGHT_ELBOW]: 'RIGHT_ELBOW',
  [LandmarkIndex.LEFT_WRIST]: 'LEFT_WRIST',
  [LandmarkIndex.RIGHT_WRIST]: 'RIGHT_WRIST',
  [LandmarkIndex.LEFT_PINKY]: 'LEFT_PINKY',
  [LandmarkIndex.RIGHT_PINKY]: 'RIGHT_PINKY',
  [LandmarkIndex.LEFT_INDEX]: 'LEFT_INDEX',
  [LandmarkIndex.RIGHT_INDEX]: 'RIGHT_INDEX',
  [LandmarkIndex.LEFT_THUMB]: 'LEFT_THUMB',
  [LandmarkIndex.RIGHT_THUMB]: 'RIGHT_THUMB',
  [LandmarkIndex.LEFT_HIP]: 'LEFT_HIP',
  [LandmarkIndex.RIGHT_HIP]: 'RIGHT_HIP',
  [LandmarkIndex.LEFT_KNEE]: 'LEFT_KNEE',
  [LandmarkIndex.RIGHT_KNEE]: 'RIGHT_KNEE',
  [LandmarkIndex.LEFT_ANKLE]: 'LEFT_ANKLE',
  [LandmarkIndex.RIGHT_ANKLE]: 'RIGHT_ANKLE',
  [LandmarkIndex.LEFT_HEEL]: 'LEFT_HEEL',
  [LandmarkIndex.RIGHT_HEEL]: 'RIGHT_HEEL',
  [LandmarkIndex.LEFT_FOOT_INDEX]: 'LEFT_FOOT_INDEX',
  [LandmarkIndex.RIGHT_FOOT_INDEX]: 'RIGHT_FOOT_INDEX',
} as const;
