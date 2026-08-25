# 🚀 Implementation Plan: EVAL - Motor De Evaluación Y Retroalimentación Visual

> **Módulo / Sección:** Motor de Evaluación y Retroalimentación Visual
> **Tipo de Entrega:** `Web App`
> **Prioridad:** `P0 - MVP`
> **Estado:** `Ready for Sprint`
> **PRD Ref:** [PRD Specification](../../PRD.md#45-módulo-motor-de-evaluación-y-retroalimentación-visual)
> **Domain Ref:** [Domain Model](../../DOMAIN.md#poseevaluation)

---

## 1. 📋 Descripción y Propósito

### 1.1 Contexto

Este es el **módulo de salida central** del pipeline. Recibe el `IJointAngleResult[]` del módulo ANGLE y la `IAsana` activa, y produce dos tipos de retroalimentación simultánea: (1) un **overlay visual** sobre el canvas con el esqueleto pintado en verde/amarillo/rojo según el estado de cada articulación, y (2) un **panel de texto** con hasta 3 instrucciones de corrección priorizadas por magnitud de desviación. Adicionalmente, calcula y muestra un score global de postura [0-100%] y detecta cuándo la postura está completamente correcta para disparar una animación de éxito. Es el módulo que el usuario "ve" en todo momento durante la práctica.

### 1.2 Objetivo Técnico (Engineering Goal)

Implementar el renderizado de feedback con las siguientes garantías de calidad:
- Overlay de canvas actualizado en cada frame con `requestAnimationFrame` — sin re-renders de React en el render loop.
- Latencia del feedback visual < 500ms desde el momento en que el ángulo entra/sale del rango ideal.
- Esqueleto de 33 landmarks dibujado con las conexiones estándar de MediaPipe Pose (33 puntos, ~30 conexiones).
- Score global calculado como promedio ponderado de las articulaciones con `status === 'correct'` sobre el total de peso de reglas visibles.
- Detección de "postura perfecta" persistida durante ≥ 1500ms consecutivos para disparar la animación de éxito (EVAL-05, P2).
- El panel de texto es el canal principal accesible — no depender exclusivamente del color del overlay.

---

## 2. 🧰 Stack Tecnológico y Dependencias

| Capa / Componente | Tecnología / Librería | Versión Target | Propósito en el Desarrollo |
| :--- | :--- | :--- | :--- |
| **Frontend / Layout** | `React 18 + Vite` | `^18.3.x / ^5.x` | Panel de feedback, score badge, overlay de éxito |
| **Estilos / UI System** | `CSS Modules + CSS Variables + Canvas 2D API` | `latest` | Renderizado del esqueleto, animación de éxito, panel de instrucciones |
| **Gestión de Estado** | `useRef + useState + useCallback` | `React 18 built-in` | Timer de éxito, score, mensajes de feedback |
| **Backend / Cálculo** | `Vanilla TypeScript` | `^5.x` | Motor de score ponderado, lógica de detección de éxito |
| **Validación** | `TypeScript strict` | `^5.x` | Tipado de `IPoseEvaluation`, `JointStatus`, colores de overlay |

---

## 3. 🛠️ Desglose de Tareas de Implementación (Task Breakdown)

### 3.1 Capa de Datos y Backend (Backend / API Tasks)

- [ ] **Task 3.1.1:** Crear el servicio de evaluación en `src/services/pose-evaluator.service.ts`:
  - `evaluatePose(jointResults: IJointAngleResult[], asana: IAsana, frameTimestamp: DOMHighResTimeStamp): IPoseEvaluation`
  - Calcula `overallScore`: suma de `weight` de articulaciones con `status === 'correct'` dividida entre la suma total de `weight` de las articulaciones visibles, multiplicado por 100.
  - Genera `topFeedbackMessages`: extrae los `feedbackMessage` no nulos, los ordena por `Math.abs(delta)` descendente y toma los 3 primeros.
  - Determina `isFullyCorrect`: `true` si todas las articulaciones visibles tienen `status === 'correct'`.

- [ ] **Task 3.1.2:** Crear el utilitario de renderizado del esqueleto en `src/utils/skeleton-canvas.utils.ts`:
  - `MEDIAPIPE_CONNECTIONS: readonly [LandmarkIndex, LandmarkIndex][]` — 30 pares de conexiones estándar de MediaPipe Pose.
  - `drawSkeleton(ctx: CanvasRenderingContext2D, landmarks: ILandmark[], jointResults: IJointAngleResult[], scale: CanvasScale): void`
    - Dibuja cada conexión como una línea coloreada según el `JointStatus` de la articulación más relevante (la de peor estado).
    - Dibuja círculos en cada landmark visible.
    - Colores del overlay: `#22C55E` (correct), `#EAB308` (warning), `#EF4444` (incorrect), `#6B7280` (invisible), siguiendo `JOINT_STATUS_COLORS`.
    - Landmarks invisibles dibujados en gris semitransparente.
    - Grosor de línea: 3px para conexiones, radio 6px para joints.

- [ ] **Task 3.1.3:** Crear el motor de detección de éxito en `src/services/success-detector.service.ts`:
  - `class SuccessDetector` con método `update(isFullyCorrect: boolean, timestamp: DOMHighResTimeStamp): boolean`
  - Retorna `true` si `isFullyCorrect` ha sido `true` continuamente durante ≥ 1500ms.
  - Resetea el timer a 0 en cuanto `isFullyCorrect` es `false`.

### 3.2 Capa de Interfaz y Cliente (Frontend App Tasks)

- [ ] **Task 3.2.1:** Crear el Custom Hook `usePoseEvaluator` en `src/hooks/usePoseEvaluator.ts`:
  - Entrada: `jointResults: IJointAngleResult[]`, `activeAsana: IAsana | null`.
  - Salida: `evaluation: IPoseEvaluation | null`, `isSuccessTriggered: boolean`.
  - Llama a `evaluatePose` en cada frame nuevo.
  - Usa `SuccessDetector` para detectar postura perfecta sostenida.
  - `isSuccessTriggered` se resetea automáticamente después de 3 segundos (duración de la animación).

- [ ] **Task 3.2.2:** Crear el componente `SkeletonOverlay` en `src/components/evaluation/SkeletonOverlay.tsx`:
  - Recibe `canvasRef: RefObject<HTMLCanvasElement>`, `evaluation: IPoseEvaluation | null`, `poseFrame: IPoseFrame | null`.
  - Ejecuta el render del esqueleto en el `requestAnimationFrame` loop (no en el ciclo de React).
  - Limpia el canvas con `ctx.clearRect` en cada frame antes de redibujar.
  - No renderiza nada si `poseFrame === null` o `poseFrame.poseScore < 0.5`.

- [ ] **Task 3.2.3:** Crear el componente `FeedbackPanel` en `src/components/evaluation/FeedbackPanel.tsx`:
  - Muestra: badge de score (`overallScore%`) con color según rango (rojo < 60%, amarillo 60-85%, verde > 85%).
  - Lista de hasta 3 instrucciones de `topFeedbackMessages`.
  - Mensaje "¡Postura perfecta! Mantén la posición" cuando `overallScore === 100%`.
  - `role="region"` con `aria-label="Panel de retroalimentación postural"` y `aria-live="polite"`.

- [ ] **Task 3.2.4:** Crear el componente `SuccessOverlay` en `src/components/evaluation/SuccessOverlay.tsx` (P2 — EVAL-05):
  - Animación de éxito: overlay semitransparente verde con ícono de check y texto "¡Alineación perfecta!".
  - Animación CSS: `fade-in` + `scale` de 0.8 a 1.0 en 300ms, sostenida 2 segundos, `fade-out` en 300ms.
  - Visible solo cuando `isSuccessTriggered === true`.
  - `role="status"` con `aria-live="assertive"`.

- [ ] **Task 3.2.5:** Manejar estados de UI:
  - Sin asana seleccionada: panel de feedback con mensaje "Selecciona una asana para comenzar el análisis".
  - Cámara inactiva: overlay de canvas vacío.
  - Pose no detectada (`poseScore < 0.5`): panel con "Ajusta tu posición — no se detecta pose".
  - Éxito sostenido ≥ 1500ms: `SuccessOverlay` visible.

### 3.3 Calidad, BDD y Automatización (QA Tasks)

- [ ] **Task 3.3.1:** Pruebas unitarias del evaluador en `src/services/__tests__/pose-evaluator.service.test.ts`:
  - Test EVAL-01: `evaluatePose` con todas las articulaciones `correct` → `overallScore: 100`, `isFullyCorrect: true`.
  - Test EVAL-02: `evaluatePose` con 2 articulaciones `incorrect` → `topFeedbackMessages` tiene 2 items, ordenados por `|delta|`.
  - Test EVAL-03: Score ponderado correcto (articulaciones con distintos `weight`).
  - Test EVAL-04: articulación pasa de `incorrect` a `correct` → `feedbackMessage: null`, score sube.

- [ ] **Task 3.3.2:** Pruebas del detector de éxito en `src/services/__tests__/success-detector.service.test.ts`:
  - Test: 1400ms consecutivos `isFullyCorrect=true` → retorna `false`.
  - Test: 1500ms consecutivos `isFullyCorrect=true` → retorna `true`.
  - Test: 1600ms con interrupción de 1 frame en ms 800 → retorna `false` (timer reseteado).

- [ ] **Task 3.3.3:** Prueba E2E en `e2e/evaluation.spec.ts`:
  - Escenario BDD EVAL-01/EVAL-02: mock de landmarks de "Guerrero I" con desviación → overlay rojo visible + instrucción en panel.
  - Escenario BDD EVAL-04: corrección de articulación → feedback desaparece en < 500ms.

---

## 4. 🤖 Reglas de Contexto para el Modelo LLM (AI Agent System Instructions)

> [!IMPORTANT]
> **Instrucciones de generación de código para Asistentes AI / Agentic Copilots:**
> Al implementar el código de esta sección/funcionalidad, debes seguir estrictamente los siguientes principios:

1. **Rendimiento y Optimización First:**
   - El renderizado del canvas (`drawSkeleton`) **nunca** debe estar dentro de un componente React ni disparado por `setState`. Siempre ejecutar en el `requestAnimationFrame` loop del módulo CAM.
   - `FeedbackPanel` puede ser un componente de React con estado, pero debe actualizar solo cuando `topFeedbackMessages` o `overallScore` cambian (usar `React.memo` o `useMemo`).
   - No usar `JSON.stringify` para comparar arrays de feedback — comparar por referencia o longitud.

2. **Accesibilidad (A11y):**
   - El overlay del canvas es puramente decorativo para usuarios videntes. El `FeedbackPanel` de texto es el canal accesible primario.
   - No transmitir información solo a través del color del overlay (WCAG SC 1.4.1). El panel de texto debe reproducir la misma información.
   - El `FeedbackPanel` debe anunciar cambios con `aria-live="polite"` para no interrumpir agresivamente.

3. **Manejo de Errores y Retroalimentación:**
   - Si `evaluation === null` (sin asana o sin frame), mostrar estado neutro — nunca un score de 0%.
   - El `SuccessOverlay` debe respetar `prefers-reduced-motion`: si está activo, mostrar el estado de éxito sin animación de scale.

4. **Clean Code:**
   - `MEDIAPIPE_CONNECTIONS` es una constante de configuración — definirla en un archivo de constantes, no inline en la función de dibujo.
   - `SuccessDetector` es una clase con estado mutable — no hacerla un módulo singleton; instanciarla en el hook para que sea destruida con el ciclo de vida del componente.

---

## 5. 🔬 Criterios de Aceptación y Definición de Hecho (Definition of Done)

- [ ] Todos los escenarios Gherkin automatizados en verde (EVAL-01, EVAL-02, EVAL-03, EVAL-04, EVAL-05).
- [ ] Overlay del canvas actualizado con colores correctos (verde/amarillo/rojo) en cada frame.
- [ ] Panel de feedback actualizado en < 500ms tras cambio de estado articular.
- [ ] Score global calculado correctamente como promedio ponderado.
- [ ] Animación de éxito respeta `prefers-reduced-motion`.
- [ ] Diseño validado y responsivo en pantallas móviles (360px), tablets (768px) y escritorio (1440px+).
- [ ] Cero advertencias o errores de compilación TypeScript (`tsc --noEmit`).
- [ ] Code Review aprobado e integrado a la rama principal.
