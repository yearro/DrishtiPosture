import type { CameraError, CameraErrorType } from '../types/camera.types';

// NOTE: MediaDevices API requires secure context (HTTPS or localhost) to access getUserMedia.

export function getOptimalConstraints(): MediaStreamConstraints {
  return {
    video: {
      width: { ideal: 1280, min: 640 },
      height: { ideal: 720, min: 480 },
      facingMode: 'user',
    },
    audio: false,
  };
}

export function parseCameraError(error: unknown): CameraError {
  if (error instanceof DOMException || (error && typeof error === 'object' && 'name' in error)) {
    const errName = (error as { name: string }).name;
    switch (errName) {
      case 'NotAllowedError':
      case 'PermissionDeniedError':
        return {
          type: 'permission-denied',
          message: 'Permiso de cámara denegado.',
          instructions: 'Haz clic en el icono de candado/cámara en la barra de direcciones del navegador y concede acceso a la cámara.',
        };
      case 'NotFoundError':
      case 'DevicesNotFoundError':
        return {
          type: 'not-found',
          message: 'No se detectó ninguna cámara.',
          instructions: 'Asegúrate de tener una cámara web conectada y encendida en tu dispositivo.',
        };
      case 'NotReadableError':
      case 'TrackStartError':
        return {
          type: 'not-readable',
          message: 'La cámara está ocupada o no se puede leer.',
          instructions: 'Cierra otras aplicaciones o pestañas que puedan estar utilizando la cámara web (ej. Zoom, Meet).',
        };
      case 'OverconstrainedError':
      case 'ConstraintNotSatisfiedError':
        return {
          type: 'overconstrained',
          message: 'Resolución de cámara no compatible.',
          instructions: 'Tu cámara no soporta las restricciones de video configuradas.',
        };
      default:
        break;
    }
  }

  return {
    type: 'unknown',
    message: 'Error al conectar con la cámara.',
    instructions: 'Ocurrió un problema inesperado. Por favor reinicia la página e inténtalo nuevamente.',
  };
}

export async function requestCameraAccess(
  constraints: MediaStreamConstraints = getOptimalConstraints()
): Promise<MediaStream> {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw {
      type: 'not-found' as CameraErrorType,
      message: 'Navegador no compatible con la API de cámara.',
      instructions: 'Utiliza un navegador moderno como Google Chrome, Mozilla Firefox, Safari o Microsoft Edge.',
    };
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  } catch (error) {
    throw parseCameraError(error);
  }
}

export function releaseStream(stream: MediaStream | null): void {
  if (!stream) return;
  const tracks = stream.getTracks();
  tracks.forEach((track) => {
    track.stop();
  });
}
