# 🚀 Implementation Plan: CAM - Activación De Cámara Y Captura De Video

> **Módulo / Sección:** Captura de Video y Activación de Cámara
> **Tipo de Entrega:** `Web App`
> **Prioridad:** `P0 - MVP`
> **Estado:** `Ready for Sprint`
> **PRD Ref:** [PRD Specification](../../PRD.md#41-módulo-captura-de-video-y-activación-de-cámara)
> **Domain Ref:** [Domain Model](../../DOMAIN.md#analysissession)

---

## 1. 📋 Descripción y Propósito

### 1.1 Contexto

Este módulo gestiona el ciclo de vida completo del acceso a la cámara web del usuario mediante la API `navigator.mediaDevices.getUserMedia`. Es el **punto de entrada** al pipeline de análisis: sin la captura de video activa, ningún módulo posterior (MediaPipe, cálculo de ángulos, evaluación) puede operar. Debe manejar el stream de video, renderizarlo en un `<video>` y `<canvas>` superpuestos, y canalizar los frames hacia el Web Worker de MediaPipe Pose. La experiencia de activación debe completarse en menos de 2 segundos.

### 1.2 Objetivo Técnico (Engineering Goal)

Implementar un módulo de captura de video totalmente funcional con las siguientes garantías:
- Acceso a `getUserMedia` con restricciones de resolución óptimas (`1280x720` preferred, `640x480` min).
- Liberación correcta del stream (`MediaStreamTrack.stop()`) al detener el análisis para evitar fugas de recursos.
- Sincronización precisa entre el elemento `<video>` y el `<canvas>` de overlay usando `requestAnimationFrame`.
- Ajuste dinámico de la resolución del `<canvas>` al `devicePixelRatio` para nitidez en pantallas HiDPI.
- Modo espejo (`transform: scaleX(-1)`) configurable como preferencia persistida en `localStorage`.
- Manejo explícito de todos los errores de `getUserMedia`: `NotAllowedError`, `NotFoundError`, `NotReadableError`, `OverconstrainedError`.

---

## 2. 🧰 Stack Tecnológico y Dependencias

| Capa / Componente | Tecnología / Librería | Versión Target | Propósito en el Desarrollo |
| :--- | :--- | :--- | :--- |
| **Frontend / Layout** | `React 18 + Vite` | `^18.3.x / ^5.x` | Componentes de cámara, gestión del ciclo de vida con hooks |
| **Estilos / UI System** | `CSS Modules + CSS Variables` | `latest` | Estilos del video overlay, controles, estados de error |
| **Gestión de Estado** | `useRef + useState + useReducer` | `React 18 built-in` | Estado del stream, flags de activación/pausa y modo espejo |
| **Backend / Serverless** | `MediaDevices Web API (browser)` | `getUserMedia W3C` | Acceso nativo a cámara, sin librerías externas |
| **Validación & SEO** | `TypeScript strict` | `^5.x` | Tipado del `MediaStream`, `MediaStreamConstraints`, error narrowing |

---

## 3. 🛠️ Desglose de Tareas de Implementación (Task Breakdown)

### 3.1 Capa de Datos y Backend (Backend / API Tasks)

- [ ] **Task 3.1.1:** Definir las interfaces TypeScript en `src/types/camera.types.ts`:
  - `CameraState`: `'idle' | 'loading' | 'active' | 'stopped' | 'error'`
  - `CameraError`: `{ type: CameraErrorType; message: string; instructions?: string }`
  - `CameraConfig`: `{ constraints: MediaStreamConstraints; mirrorMode: boolean }`

- [ ] **Task 3.1.2:** Crear el servicio de cámara en `src/services/camera.service.ts`:
  - Función `requestCameraAccess(constraints): Promise<MediaStream>` — wrappea `getUserMedia` con manejo de errores tipado.
  - Función `releaseStream(stream: MediaStream): void` — itera y llama a `.stop()` en cada `MediaStreamTrack`.
  - Función `getOptimalConstraints(): MediaStreamConstraints` — retorna constraints preferidos (`1280x720`) con fallback a `640x480`.

- [ ] **Task 3.1.3:** Implementar el servicio de Frame Loop en `src/services/frame-loop.service.ts`:
  - `startFrameLoop(video: HTMLVideoElement, callback: FrameCallback): number` — inicia `requestAnimationFrame`.
  - `stopFrameLoop(rafId: number): void` — cancela el loop con `cancelAnimationFrame`.
  - Tipo `FrameCallback = (timestamp: DOMHighResTimeStamp) => void`.

### 3.2 Capa de Interfaz y Cliente (Frontend App Tasks)

- [ ] **Task 3.2.1:** Crear el Custom Hook `useCameraStream` en `src/hooks/useCameraStream.ts`:
  - Estado: `cameraState: CameraState`, `stream: MediaStream | null`, `error: CameraError | null`.
  - Métodos expuestos: `startCamera()`, `stopCamera()`, `toggleMirror()`.
  - Limpieza automática en `useEffect` cleanup: `releaseStream(stream)` al desmontar.
  - Persistir preferencia de espejo en `localStorage` con key `drishti:mirror-mode`.

- [ ] **Task 3.2.2:** Crear el componente `CameraView` en `src/components/camera/CameraView.tsx`:
  - Renderiza `<video ref={videoRef} autoPlay playsInline muted>` y `<canvas ref={canvasRef}>` superpuestos.
  - Sincroniza dimensiones del canvas con el video en el evento `loadedmetadata` del video, ajustando con `devicePixelRatio`.
  - Aplica `transform: scaleX(-1)` vía clase CSS cuando `mirrorMode === true`.
  - Props: `stream: MediaStream | null`, `onFrameReady: FrameCallback`, `mirrorMode: boolean`.

- [ ] **Task 3.2.3:** Crear el componente `CameraControls` en `src/components/camera/CameraControls.tsx`:
  - Botón "Iniciar análisis" (`aria-label="Activar cámara para análisis de postura"`).
  - Botón "Detener" (`aria-label="Detener cámara y análisis"`).
  - Toggle "Modo Espejo" (`role="switch"`, `aria-checked`).
  - Todos los botones con área táctil mínima de 48x48px.

- [ ] **Task 3.2.4:** Manejar los estados de UI:
  - `idle`: Botón "Iniciar análisis" visible.
  - `loading`: Spinner + texto "Solicitando acceso a cámara..." (deshabilita botón).
  - `active`: Botón "Detener" + toggle de espejo visibles.
  - `error`: Componente `CameraErrorBanner` con el mensaje específico e instrucciones de resolución.
  - `stopped`: Estado idle restaurado.

### 3.3 Calidad, BDD y Automatización (QA Tasks)

- [ ] **Task 3.3.1:** Implementar pruebas unitarias en `src/services/__tests__/camera.service.test.ts`:
  - Mock de `navigator.mediaDevices.getUserMedia` con `vi.fn()`.
  - Test: activación exitosa retorna un `MediaStream` válido.
  - Test: `NotAllowedError` → `CameraError` con `type: 'permission-denied'`.
  - Test: `NotFoundError` → `CameraError` con `type: 'not-found'`.
  - Test: `releaseStream` llama a `.stop()` en todos los tracks.

- [ ] **Task 3.3.2:** Implementar pruebas del hook en `src/hooks/__tests__/useCameraStream.test.ts`:
  - Test del ciclo completo: `startCamera()` → estado `loading` → `active`.
  - Test: cleanup del `useEffect` llama a `releaseStream`.
  - Test: `toggleMirror` actualiza `localStorage`.

- [ ] **Task 3.3.3:** Implementar prueba E2E en `e2e/camera.spec.ts` con Playwright:
  - Mock de permisos de cámara con `context.grantPermissions(['camera'])`.
  - Escenario BDD: "Activación exitosa de la cámara" (CAM-01).
  - Escenario BDD: "Permiso de cámara denegado" (CAM-02) con `context.denyPermissions(['camera'])`.

---

## 4. 🤖 Reglas de Contexto para el Modelo LLM (AI Agent System Instructions)

> [!IMPORTANT]
> **Instrucciones de generación de código para Asistentes AI / Agentic Copilots:**
> Al implementar el código de esta sección/funcionalidad, debes seguir estrictamente los siguientes principios:

1. **Rendimiento y Optimización First:**
   - Tipado estricto en TypeScript sin uso de `any`. El `MediaStream` y sus `MediaStreamTrack` deben estar completamente tipados.
   - El `requestAnimationFrame` loop **nunca** debe ejecutarse cuando la cámara está inactiva. Siempre cancelar con `cancelAnimationFrame(rafId)` en cleanup.
   - Separación total entre la lógica de red/hardware (hooks y servicios) y componentes presentacionales (`CameraView`, `CameraControls`).

2. **Accesibilidad (A11y):**
   - El elemento `<video>` debe tener `aria-label="Stream de video de cámara para análisis de postura"`.
   - Los botones de control deben ser navegables por teclado.
   - El `CameraErrorBanner` debe usar `role="alert"` y `aria-live="assertive"` para lectores de pantalla.

3. **Manejo de Errores y Retroalimentación:**
   - Nunca exponer mensajes de error técnicos del navegador directamente al usuario.
   - Mapear cada `DOMException.name` a un mensaje amigable con instrucciones de resolución específicas.
   - El estado de error **no** debe bloquear el acceso al botón "Intentar nuevamente".

4. **Clean Code & Seguridad:**
   - La app **debe** servirse bajo HTTPS. Documentar esta restricción con un comentario en `camera.service.ts`.
   - No almacenar ni loguear referencias al `MediaStream` fuera del hook `useCameraStream`.

---

## 5. 🔬 Criterios de Aceptación y Definición de Hecho (Definition of Done)

- [ ] Todos los escenarios Gherkin automatizados en verde (CAM-01, CAM-02, CAM-03, CAM-04).
- [ ] Diseño validado y responsivo en pantallas móviles (360px), tablets (768px) y escritorio (1440px+).
- [ ] Cero advertencias o errores de compilación TypeScript (`tsc --noEmit`).
- [ ] Cobertura de tests unitarios ≥ 80% en `camera.service.ts` y `useCameraStream.ts`.
- [ ] Stream liberado correctamente (sin tracks activos) tras llamar a `stopCamera()`, verificado en DevTools → Media.
- [ ] Canvas sincronizado con `devicePixelRatio` — nitidez verificada en pantalla Retina.
- [ ] Code Review aprobado e integrado a la rama principal.
