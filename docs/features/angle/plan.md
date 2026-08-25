# 🚀 Implementation Plan: ANGLE - Cálculo De Ángulos Articulares

> **Módulo / Sección:** Cálculo de Ángulos Articulares
> **Tipo de Entrega:** `Web App`
> **Prioridad:** `P0 - MVP`
> **Estado:** `Ready for Sprint`
> **PRD Ref:** [PRD Specification](../../PRD.md#44-módulo-cálculo-de-ángulos-articulares)
> **Domain Ref:** [Domain Model](../../DOMAIN.md#jointangleresult)

---

## 1. 📋 Descripción y Propósito

### 1.1 Contexto

Este módulo implementa el **núcleo matemático** del pipeline de análisis postural. Recibe el `IPoseFrame` con los 33 landmarks detectados por MediaPipe y las `IJointAngleRule[]` de la asana activa, y para cada regla calcula el ángulo en grados formado por el trío de landmarks `(A, B, C)` donde `B` es el vértice. El resultado es un mapa de `IJointAngleResult[]` que alimenta directamente el motor de evaluación y el overlay visual del canvas. Es el módulo de mayor densidad matemática y debe ser una **función pura** sin efectos secundarios, fácilmente testeable en aislamiento.

### 1.2 Objetivo Técnico (Engineering Goal)

Implementar un módulo de cálculo geométrico puro con las siguientes propiedades:
- Función `calculateAngle(a, b, c)` usando **producto punto de vectores 2D** para máxima estabilidad numérica en el rango [0°, 180°].
- Manejo explícito de `null` cuando cualquier landmark del trío tiene `visibility < 0.5` (no intenta calcular con datos no confiables).
- Cálculo de todos los ángulos relevantes de la asana activa en una sola pasada por frame, con resultado en `< 1ms` (función síncrona pura).
- Renderizado opcional de los valores numéricos sobre el canvas junto a cada articulación evaluada (ANGLE-03, P1).
- Alta cobertura de tests unitarios (≥ 90%) por ser la función matemática más crítica del sistema.

---

## 2. 🧰 Stack Tecnológico y Dependencias

| Capa / Componente | Tecnología / Librería | Versión Target | Propósito en el Desarrollo |
| :--- | :--- | :--- | :--- |
| **Frontend / Layout** | `React 18 + Vite` | `^18.3.x / ^5.x` | Componente de debug overlay para visualizar ángulos en canvas |
| **Estilos / UI System** | `CSS Modules + Canvas 2D API` | `latest` | Renderizado de etiquetas de ángulo sobre el canvas |
| **Gestión de Estado** | `useRef (sin re-renders)` | `React 18 built-in` | Mapa de resultados por frame sin disparar re-renders de React |
| **Cálculo / Matemáticas** | `Vanilla TypeScript (Math API)` | `^5.x` | Sin dependencias externas: `Math.atan2`, `Math.acos`, producto punto |
| **Validación & Tests** | `TypeScript strict + Vitest` | `^5.x / ^1.x` | Pruebas unitarias exhaustivas de casos límite matemáticos |

---

## 3. 🛠️ Desglose de Tareas de Implementación (Task Breakdown)

### 3.1 Capa de Datos y Backend (Backend / API Tasks)

- [ ] **Task 3.1.1:** Implementar la función pura `calculateAngle` en `src/utils/geometry.utils.ts`:
  ```typescript
  // Algoritmo: producto punto de vectores BA y BC
  // angle = acos( (BA · BC) / (|BA| * |BC|) )
  calculateAngle(
    a: Pick<ILandmark, 'x' | 'y'>,
    b: Pick<ILandmark, 'x' | 'y'>,
    c: Pick<ILandmark, 'x' | 'y'>
  ): number // retorna grados [0, 180]
  ```
  - Manejo de caso degenrado: si `|BA|` o `|BC|` es 0 (landmarks superpuestos), retornar `0`.
  - Resultado redondeado a 1 decimal para estabilidad de la UI.
  - Exportar como función pura nombrada (no método de clase).

- [ ] **Task 3.1.2:** Implementar el motor de cálculo batch en `src/services/angle-calculator.service.ts`:
  - `calculateJointAngles(poseFrame: IPoseFrame, rules: IJointAngleRule[]): IJointAngleResult[]`
  - Itera sobre cada `IJointAngleRule`:
    - Extrae los 3 landmarks (`A`, `B`, `C`) del `poseFrame.landmarks` usando `LandmarkIndex`.
    - Verifica que los 3 tengan `visibility >= 0.5`; si alguno falla → `measuredAngle: null, status: 'invisible'`.
    - Llama a `calculateAngle(a, b, c)` para obtener el ángulo.
    - Determina el `status: JointStatus` comparando el ángulo con `idealAngleMin/Max` y `warningThreshold`.
    - Calcula `delta`: diferencia al límite más cercano del rango ideal (positivo = exceso, negativo = falta).
    - Genera `feedbackMessage` interpolando `feedbackTemplate` con el valor de `delta` (solo si `status !== 'correct'`).
  - Resultado: `IJointAngleResult[]` completo, uno por cada `IJointAngleRule`.

- [ ] **Task 3.1.3:** Implementar la función de interpolación de mensajes en `src/utils/feedback.utils.ts`:
  - `interpolateFeedback(template: string, delta: number): string`
  - Reemplaza `{delta}` en el template con el valor absoluto redondeado de `delta`.
  - Ejemplo: `"Dobla la rodilla derecha {delta}° más"` + `delta: -15` → `"Dobla la rodilla derecha 15° más"`.

### 3.2 Capa de Interfaz y Cliente (Frontend App Tasks)

- [ ] **Task 3.2.1:** Crear el Custom Hook `useAngleCalculator` en `src/hooks/useAngleCalculator.ts`:
  - Entrada: `poseFrame: IPoseFrame | null`, `activeAsana: IAsana | null`.
  - Salida: `jointResults: IJointAngleResult[]` (array vacío si alguna entrada es null).
  - Implementado con `useMemo` — recalcula solo cuando `poseFrame` o `activeAsana` cambia.
  - **No usa `useState`**: los resultados de ángulos no deben disparar re-renders de React ya que cambian a 25+ FPS.

- [ ] **Task 3.2.2:** Crear el utilitario de renderizado en `src/utils/angle-canvas.utils.ts`:
  - `drawAngleLabels(ctx: CanvasRenderingContext2D, results: IJointAngleResult[], landmarks: ILandmark[], scale: CanvasScale): void`
  - Dibuja el valor en grados junto a cada articulación en el canvas.
  - Tipografía: `Space Grotesk` (métricas numéricas, según PRD §6.1) a 14px sobre el canvas.
  - Color del texto según `JointStatus`: verde/amarillo/rojo (accesible con contorno blanco de 2px).
  - Solo dibuja articulaciones con `measuredAngle !== null`.

- [ ] **Task 3.2.3:** Manejar estados de UI:
  - `activeAsana === null`: no se calculan ángulos, overlay vacío.
  - `poseFrame.poseScore < 0.5`: no se calculan ángulos (pose no confiable).
  - Todos `'invisible'`: mostrar mensaje "Articulaciones no detectadas — ajusta tu posición".

### 3.3 Calidad, BDD y Automatización (QA Tasks)

- [ ] **Task 3.3.1:** Pruebas unitarias exhaustivas en `src/utils/__tests__/geometry.utils.test.ts`:
  - Test de ángulo recto (90°): `A=(0,1), B=(0,0), C=(1,0)` → `90°`.
  - Test de ángulo llano (180°): `A=(0,0), B=(1,0), C=(2,0)` → `180°`.
  - Test de ángulo agudo (45°): verificar con valores exactos.
  - Test de caso degenerado: landmarks superpuestos → retorna `0` sin excepción.
  - Cobertura objetivo: ≥ 95%.

- [ ] **Task 3.3.2:** Pruebas del servicio en `src/services/__tests__/angle-calculator.service.test.ts`:
  - Test ANGLE-01: `calculateJointAngles` con frame válido → ángulo correcto para cada regla.
  - Test ANGLE-02 (error): landmark con `visibility: 0.3` → `status: 'invisible'`, `measuredAngle: null`.
  - Test de `status` correcto: ángulo dentro del rango → `'correct'`, ángulo en warning → `'warning'`, fuera → `'incorrect'`.
  - Test de `delta` calculado correctamente para cada estado.
  - Test de `feedbackMessage`: `null` si `correct`, mensaje interpolado si `warning`/`incorrect`.

- [ ] **Task 3.3.3:** Prueba de rendimiento `src/services/__tests__/angle-calculator.perf.test.ts`:
  - Calcular 300 frames consecutivos (simulando 10 segundos a 30 FPS) con 5 reglas activas.
  - Verificar que el tiempo total es < 50ms (< 0.17ms por frame).

---

## 4. 🤖 Reglas de Contexto para el Modelo LLM (AI Agent System Instructions)

> [!IMPORTANT]
> **Instrucciones de generación de código para Asistentes AI / Agentic Copilots:**
> Al implementar el código de esta sección/funcionalidad, debes seguir estrictamente los siguientes principios:

1. **Rendimiento y Optimización First:**
   - `calculateAngle` y `calculateJointAngles` son **funciones puras síncronas** — sin `async/await`, sin efectos secundarios, sin referencias a `window` o `document`.
   - No usar `Math.sqrt` para normalización si puede evitarse con producto punto normalizado; usar `Math.hypot` como alternativa más legible.
   - El hook `useAngleCalculator` **no debe usar `useState`** para el resultado — usar `useMemo` o un `useRef` actualizable para evitar re-renders a 25+ FPS.

2. **Accesibilidad (A11y):**
   - Las etiquetas de ángulo en el canvas son elementos visuales — el panel de texto del módulo EVAL es el canal accesible primario para usuarios con daltonismo.
   - Incluir contorno blanco de 2px en los textos del canvas para legibilidad sobre cualquier fondo.

3. **Manejo de Errores y Retroalimentación:**
   - Un `null` en `measuredAngle` es un caso válido y esperado — nunca tratar como error.
   - Si `poseScore < 0.5`, no calcular ángulos del frame (resultados no confiables) — retornar array vacío.

4. **Clean Code:**
   - `geometry.utils.ts` debe contener **solo funciones matemáticas puras**. Nada de React, DOM o estado.
   - Nombrar las funciones con verbos en imperativo: `calculateAngle`, `calculateJointAngles`, `interpolateFeedback`.
   - Documentar con JSDoc cada función pública indicando el algoritmo usado y las unidades de retorno.

---

## 5. 🔬 Criterios de Aceptación y Definición de Hecho (Definition of Done)

- [ ] Todos los escenarios Gherkin automatizados en verde (ANGLE-01, ANGLE-02, ANGLE-03).
- [ ] `calculateAngle` retorna valores en [0°, 180°] para todos los casos de prueba.
- [ ] Landmarks con `visibility < 0.5` correctamente marcados como `null` sin lanzar excepciones.
- [ ] Cobertura de tests unitarios ≥ 90% en `geometry.utils.ts` y `angle-calculator.service.ts`.
- [ ] Tiempo de cálculo batch (5 reglas) < 0.5ms por frame verificado en prueba de rendimiento.
- [ ] Diseño validado y responsivo en pantallas móviles (360px), tablets (768px) y escritorio (1440px+).
- [ ] Cero advertencias o errores de compilación TypeScript (`tsc --noEmit`).
- [ ] Code Review aprobado e integrado a la rama principal.
