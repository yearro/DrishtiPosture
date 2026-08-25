# 🚀 Implementation Plan: POSE - Integración De MediaPipe Pose Para Estimación De Landmarks

> **Módulo / Sección:** Estimación de Pose con MediaPipe
> **Tipo de Entrega:** `Web App`
> **Prioridad:** `P0 - MVP`
> **Estado:** `Ready for Sprint`
> **PRD Ref:** [PRD Specification](../../PRD.md#42-módulo-estimación-de-pose-con-mediapipe)
> **Domain Ref:** [Domain Model](../../DOMAIN.md#poseframe)

---

## 1. 📋 Descripción y Propósito

### 1.1 Contexto

Este módulo integra el modelo **MediaPipe Pose** de Google ejecutado localmente en el navegador vía WebAssembly (WASM) y WebGL. Recibe frames del stream de video capturado por el módulo CAM y devuelve un array de 33 landmarks `{x, y, z, visibility}` normalizados por cada frame. Para no bloquear el hilo principal y mantener la UI fluida a ≥ 25 FPS, la inferencia se ejecuta en un **Web Worker**. La comunicación entre el hilo principal y el Worker se realiza mediante `postMessage` transfiriendo `ImageBitmap` objects (transferibles, zero-copy).

### 1.2 Objetivo Técnico (Engineering Goal)

Diseñar una integración desacoplada de MediaPipe Pose con las siguientes garantías de rendimiento y resiliencia:
- Latencia de inferencia P95 < 60ms por frame (medida con `performance.measure()`).
- Landmarks con `visibility < 0.5` marcados como `null` antes de enviarse al pipeline de ángulos.
- El modelo WASM (~3MB) se carga de forma diferida (lazy) solo cuando el usuario inicia el análisis, con indicador de progreso visible.
- Abstracción detrás de la interfaz `IPoseDetector` para facilitar el reemplazo del proveedor si la API de MediaPipe cambia.
- Versión del SDK de MediaPipe fijada exactamente en `package.json` (no rangos `^`).

---

## 2. 🧰 Stack Tecnológico y Dependencias

| Capa / Componente | Tecnología / Librería | Versión Target | Propósito en el Desarrollo |
| :--- | :--- | :--- | :--- |
| **Frontend / Layout** | `React 18 + Vite` | `^18.3.x / ^5.x` | Hook de integración, indicador de carga del modelo |
| **Estilos / UI System** | `CSS Modules + CSS Variables` | `latest` | Spinner de carga del modelo, overlay de estado |
| **Gestión de Estado** | `useRef + useReducer` | `React 18 built-in` | Estado del Worker, landmarks en memoria por frame |
| **ML Runtime / Worker** | `@mediapipe/tasks-vision` | versión exacta fijada | SDK WASM/WebGL de estimación de pose en el navegador |
| **Validación & SEO** | `TypeScript strict + Zod` | `^5.x / ^3.x` | Validación del output del Worker, interfaces del dominio |

---

## 3. 🛠️ Desglose de Tareas de Implementación (Task Breakdown)

### 3.1 Capa de Datos y Backend (Backend / API Tasks)

- [ ] **Task 3.1.1:** Definir la interfaz de abstracción en `src/types/pose-detector.types.ts`:
  - `interface IPoseDetector { initialize(): Promise<void>; detect(frame: ImageBitmap): Promise<IPoseFrame>; dispose(): void; }`
  - `type PoseDetectorState = 'uninitialized' | 'loading' | 'ready' | 'error'`
  - `type WorkerMessage = WorkerInputMessage | WorkerOutputMessage` con discriminated unions.

- [ ] **Task 3.1.2:** Implementar el adaptador de MediaPipe en `src/services/mediapipe-pose.adapter.ts`:
  - Implementa `IPoseDetector`.
  - Carga `PoseLandmarker` de `@mediapipe/tasks-vision` de forma dinámica con `import()`.
  - Configura el modelo: `numPoses: 1`, `minPoseDetectionConfidence: 0.5`, `minPosePresenceConfidence: 0.5`.
  - Mapea el output de MediaPipe al tipo `IPoseFrame` del dominio (`src/types/domain.types.ts`).
  - Marca como `null` los landmarks con `visibility < 0.5`.

- [ ] **Task 3.1.3:** Crear el Web Worker en `src/workers/pose.worker.ts`:
  - Recibe mensajes de tipo `{ type: 'INIT' }` y `{ type: 'DETECT'; frame: ImageBitmap }`.
  - Responde con `{ type: 'READY' }`, `{ type: 'RESULT'; poseFrame: IPoseFrame }` y `{ type: 'ERROR'; error: string }`.
  - Instancia internamente el adaptador `MediaPipePoseAdapter`.
  - Mide latencia de inferencia con `performance.now()` y la incluye en el mensaje `RESULT`.
  - Llama a `frame.close()` después de la inferencia para liberar memoria del `ImageBitmap`.

- [ ] **Task 3.1.4:** Crear `src/services/pose-detector.service.ts`:
  - Función `createPoseWorker(): Worker` — instancia el Worker.
  - Función `sendFrameToWorker(worker: Worker, bitmap: ImageBitmap): void` — `postMessage` con transfer.
  - Función `terminateWorker(worker: Worker): void` — limpieza.

### 3.2 Capa de Interfaz y Cliente (Frontend App Tasks)

- [ ] **Task 3.2.1:** Crear el Custom Hook `usePoseDetector` en `src/hooks/usePoseDetector.ts`:
  - Estado: `detectorState: PoseDetectorState`, `lastPoseFrame: IPoseFrame | null`, `inferenceLatencyMs: number`.
  - Método `processFrame(video: HTMLVideoElement): void` — captura un `ImageBitmap` del frame actual y lo envía al Worker.
  - Inicialización lazy: el Worker se crea y el modelo se carga solo cuando se llama a `initialize()`.
  - Cleanup en `useEffect`: `terminateWorker` al desmontar el componente.

- [ ] **Task 3.2.2:** Crear el componente `ModelLoadingIndicator` en `src/components/pose/ModelLoadingIndicator.tsx`:
  - Muestra: spinner animado + texto "Cargando modelo de IA (~3MB)..."
  - Props: `state: PoseDetectorState`, `error?: string`.
  - Usa `role="status"` y `aria-live="polite"` para accesibilidad.

- [ ] **Task 3.2.3:** Manejar los estados de UI:
  - `uninitialized`: sin indicador visible.
  - `loading`: `ModelLoadingIndicator` en pantalla completa (overlay sobre canvas).
  - `ready`: indicador oculto, análisis activo.
  - `error`: banner de error con mensaje específico y botón "Reintentar".

### 3.3 Calidad, BDD y Automatización (QA Tasks)

- [ ] **Task 3.3.1:** Pruebas unitarias del adaptador en `src/services/__tests__/mediapipe-pose.adapter.test.ts`:
  - Mock de `@mediapipe/tasks-vision` con `vi.mock`.
  - Test: output de MediaPipe con landmark de baja visibilidad → landmark mapeado como `null`.
  - Test: `IPoseFrame` resultante cumple la interfaz del dominio.
  - Test: latencia medida es un número positivo.

- [ ] **Task 3.3.2:** Pruebas del Worker en `src/workers/__tests__/pose.worker.test.ts`:
  - Test: mensaje `INIT` → responde `READY` tras inicialización.
  - Test: mensaje `DETECT` → responde `RESULT` con `IPoseFrame` válido.
  - Test: `ImageBitmap` liberado (`frame.close()`) después de la inferencia.

- [ ] **Task 3.3.3:** Prueba de rendimiento en `src/hooks/__tests__/usePoseDetector.perf.test.ts`:
  - Simular procesamiento de 60 frames consecutivos.
  - Verificar que la latencia media reportada está por debajo de 60ms (con datos mockeados).

---

## 4. 🤖 Reglas de Contexto para el Modelo LLM (AI Agent System Instructions)

> [!IMPORTANT]
> **Instrucciones de generación de código para Asistentes AI / Agentic Copilots:**
> Al implementar el código de esta sección/funcionalidad, debes seguir estrictamente los siguientes principios:

1. **Rendimiento y Optimización First:**
   - El `ImageBitmap` **siempre** se transfiere al Worker (no se copia): `worker.postMessage(msg, [msg.frame])`.
   - Llamar a `bitmap.close()` en el Worker después de la inferencia para liberar GPU/CPU memory.
   - Fijar la versión del SDK de MediaPipe con versión exacta en `package.json`: `"@mediapipe/tasks-vision": "0.10.x"`, no `"^0.10.x"`.
   - Separación total entre la lógica de inferencia (Worker) y los componentes presentacionales.

2. **Accesibilidad (A11y):**
   - El `ModelLoadingIndicator` debe anunciar el cambio de estado a lectores de pantalla con `aria-live="polite"`.
   - El error del detector debe usar `role="alert"` para notificación inmediata.

3. **Manejo de Errores y Retroalimentación:**
   - Si WebGL no está disponible, capturar el error de inicialización de MediaPipe y mostrar: "Tu dispositivo no soporta la aceleración por GPU necesaria. El análisis puede ser más lento."
   - Si la primera carga del modelo falla (red), ofrecer botón "Reintentar carga".

4. **Clean Code & Abstracción:**
   - Nunca importar `@mediapipe/tasks-vision` directamente en componentes de React. Solo en el adaptador y en el Worker.
   - La interfaz `IPoseDetector` debe ser el único contrato entre el dominio y la librería externa.

---

## 5. 🔬 Criterios de Aceptación y Definición de Hecho (Definition of Done)

- [ ] Todos los escenarios Gherkin automatizados en verde (POSE-01, POSE-02, POSE-03, POSE-04).
- [ ] Latencia de inferencia P95 < 60ms verificada en hardware de referencia (Chrome DevTools Performance).
- [ ] FPS del hilo principal ≥ 25 FPS durante análisis activo (sin jank en la UI).
- [ ] Landmarks con `visibility < 0.5` correctamente marcados como `null` en el `IPoseFrame`.
- [ ] Diseño validado y responsivo en pantallas móviles (360px), tablets (768px) y escritorio (1440px+).
- [ ] Cero advertencias o errores de compilación TypeScript (`tsc --noEmit`).
- [ ] Code Review aprobado e integrado a la rama principal.
