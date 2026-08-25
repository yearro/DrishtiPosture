# 🚀 Implementation Plan: CAT - Catálogo De Asanas Y Definición De Ángulos De Referencia

> **Módulo / Sección:** Catálogo de Asanas y Definición de Ángulos de Referencia
> **Tipo de Entrega:** `Web App`
> **Prioridad:** `P0 - MVP`
> **Estado:** `Ready for Sprint`
> **PRD Ref:** [PRD Specification](../../PRD.md#43-módulo-catálogo-de-asanas-y-definición-de-ángulos-de-referencia)
> **Domain Ref:** [Domain Model](../../DOMAIN.md#asana)

---

## 1. 📋 Descripción y Propósito

### 1.1 Contexto

Este módulo es la **fuente de verdad estática** del sistema de análisis postural. Define en TypeScript compilado el catálogo de 20+ asanas de yoga clásicas con sus nombres en inglés, español y sánscrito, imágenes de referencia, niveles de dificultad, zonas corporales y — lo más crítico — las `JointAngleRule[]` que definen qué ángulos articulares se evalúan para cada asana y cuál es el rango ideal aceptable. Dado que toda la lógica opera en el cliente sin backend, este catálogo es un módulo de configuración importado en tiempo de build y no requiere API ni base de datos. El usuario interactúa con él mediante un selector con filtros en tiempo real.

### 1.2 Objetivo Técnico (Engineering Goal)

Diseñar un catálogo de asanas como módulo de datos inmutable y bien tipado, con las siguientes características:
- Catálogo inicial de exactamente **20 asanas** definidas en `src/data/poses-catalog.ts`, completamente tipado con `IAsana[]`.
- Cada asana con al menos 3 `JointAngleRule` específicas y valores de ángulo basados en referencias biomecánicas de yoga.
- Función de filtrado reactivo por `Difficulty` y `BodyZone` en tiempo real sin recarga de página.
- Búsqueda por nombre (inglés, español o sánscrito) insensible a acentos y mayúsculas.
- Imágenes de referencia en formato WebP/AVIF con lazy loading y dimensiones explícitas para evitar CLS.

---

## 2. 🧰 Stack Tecnológico y Dependencias

| Capa / Componente | Tecnología / Librería | Versión Target | Propósito en el Desarrollo |
| :--- | :--- | :--- | :--- |
| **Frontend / Layout** | `React 18 + Vite` | `^18.3.x / ^5.x` | Componentes del selector de asanas y panel de referencia |
| **Estilos / UI System** | `CSS Modules + CSS Variables` | `latest` | Grid de asanas, filtros, split-view de referencia |
| **Gestión de Estado** | `useState + useMemo` | `React 18 built-in` | Filtrado reactivo del catálogo, asana seleccionada activa |
| **Backend / Datos** | `TypeScript static data module` | `^5.x` | Catálogo compilado en el bundle, sin API calls |
| **Validación** | `TypeScript strict` | `^5.x` | Tipado completo de `IAsana`, `IJointAngleRule`, enums |

---

## 3. 🛠️ Desglose de Tareas de Implementación (Task Breakdown)

### 3.1 Capa de Datos y Backend (Backend / API Tasks)

- [ ] **Task 3.1.1:** Crear el archivo de datos `src/data/poses-catalog.ts`:
  - Exportar `POSES_CATALOG: readonly IAsana[]` con las 20 asanas definidas en el DOMAIN.md (§1.5).
  - Para cada asana, definir al menos 3 `IJointAngleRule` con valores de ángulo biomecánicamente válidos.
  - Ejemplo de reglas para `warrior-i`:
    - Rodilla delantera: `landmarkA=HIP, B=KNEE, C=ANKLE`, `idealAngleMin: 85, idealAngleMax: 100, warningThreshold: 10`.
    - Cadera: `landmarkA=SHOULDER, B=HIP, C=KNEE`, `idealAngleMin: 160, idealAngleMax: 180`.
    - Brazo posterior: `landmarkA=ELBOW, B=SHOULDER, C=HIP`, `idealAngleMin: 150, idealAngleMax: 180`.
  - Usar `Object.freeze()` para garantizar inmutabilidad en runtime.

- [ ] **Task 3.1.2:** Crear el servicio de catálogo en `src/services/catalog.service.ts`:
  - `getAsanaById(id: string): IAsana | undefined`
  - `filterAsanas(catalog: IAsana[], filters: AsanaFilters): IAsana[]`
  - `searchAsanas(catalog: IAsana[], query: string): IAsana[]` — normalización de acentos con `String.normalize('NFD')`.
  - `type AsanaFilters = { difficulty?: Difficulty; bodyZone?: BodyZone; query?: string }`

- [ ] **Task 3.1.3:** Agregar las imágenes de referencia de asanas en `public/assets/poses/`:
  - Formato: `{asana-id}.webp` con fallback `{asana-id}.jpg`.
  - Dimensiones estándar: `480x480px` (cuadrado), optimizadas con `vite-imagetools` o preprocesamiento manual.
  - Incluir `alt` descriptivo generado desde `IAsana.description` en el componente.

### 3.2 Capa de Interfaz y Cliente (Frontend App Tasks)

- [ ] **Task 3.2.1:** Crear el componente `AsanaCatalog` en `src/components/catalog/AsanaCatalog.tsx`:
  - Contiene el campo de búsqueda y los filtros de `Difficulty` y `BodyZone`.
  - Usa `useMemo` para filtrar `POSES_CATALOG` reactivamente en cada cambio de filtros.
  - Grid responsivo de cards de asanas (2 columnas en móvil, 4 en desktop).
  - Emite `onAsanaSelect: (asana: IAsana) => void` al componente padre.

- [ ] **Task 3.2.2:** Crear el componente `AsanaCard` en `src/components/catalog/AsanaCard.tsx`:
  - Muestra: imagen de referencia (lazy load con `loading="lazy"`), nombre en español, nombre en sánscrito, nivel de dificultad (chip/badge) y zonas corporales.
  - Estado `selected` con borde y fondo resaltado.
  - `aria-selected` para accesibilidad en el contexto de `role="listbox"`.

- [ ] **Task 3.2.3:** Crear el componente `AsanaReferencePanel` en `src/components/catalog/AsanaReferencePanel.tsx`:
  - Split-view: imagen de referencia de la asana (izquierda) + stream de cámara (derecha).
  - En móvil: stack vertical (imagen arriba, cámara abajo).
  - Muestra el nombre completo (español + sánscrito), descripción y lista de articulaciones a evaluar.

- [ ] **Task 3.2.4:** Crear el Custom Hook `useAsanaCatalog` en `src/hooks/useAsanaCatalog.ts`:
  - Estado: `selectedAsana: IAsana | null`, `filters: AsanaFilters`, `filteredAsanas: IAsana[]`.
  - Computed: `filteredAsanas` derivado de `useMemo(filterAsanas(POSES_CATALOG, filters), [filters])`.
  - Método: `selectAsana(id: string): void`, `updateFilters(filters: Partial<AsanaFilters>): void`.

- [ ] **Task 3.2.5:** Manejar estados de UI:
  - Sin filtros activos: muestra todas las asanas (20).
  - Filtro sin resultados: estado vacío con mensaje "No se encontraron asanas para estos filtros."
  - Asana seleccionada: `AsanaReferencePanel` visible, card resaltada en el catálogo.

### 3.3 Calidad, BDD y Automatización (QA Tasks)

- [ ] **Task 3.3.1:** Pruebas unitarias del servicio en `src/services/__tests__/catalog.service.test.ts`:
  - Test: `filterAsanas` por `difficulty: 'beginner'` retorna solo las 15 asanas de nivel principiante.
  - Test: `filterAsanas` por `bodyZone: 'balance'` retorna las asanas correctas.
  - Test: `searchAsanas` con query "guerrero" retorna las 3 variantes de Warrior.
  - Test: `searchAsanas` con acentos ("Árbol") retorna `tree` correctamente (normalización NFD).
  - Test: `POSES_CATALOG` contiene exactamente 20 asanas con al menos 3 `jointRules` cada una.

- [ ] **Task 3.3.2:** Pruebas de componente en `src/components/catalog/__tests__/AsanaCatalog.test.tsx`:
  - Test: filtrando por "Principiante" actualiza el grid en tiempo real.
  - Test: clic en una `AsanaCard` emite `onAsanaSelect` con la asana correcta.
  - Test: estado vacío visible cuando no hay resultados.

- [ ] **Task 3.3.3:** Prueba E2E en `e2e/catalog.spec.ts`:
  - Escenario BDD CAT-01: selección de asana "Guerrero I" → panel de referencia visible.
  - Escenario BDD CAT-04: filtro por "Principiante" → grid actualizado en tiempo real.

---

## 4. 🤖 Reglas de Contexto para el Modelo LLM (AI Agent System Instructions)

> [!IMPORTANT]
> **Instrucciones de generación de código para Asistentes AI / Agentic Copilots:**
> Al implementar el código de esta sección/funcionalidad, debes seguir estrictamente los siguientes principios:

1. **Rendimiento y Optimización First:**
   - `POSES_CATALOG` debe ser importado una sola vez y compartido como módulo singleton. Nunca instanciar el array dentro de un componente.
   - El filtrado con `useMemo` debe incluir `filters` como única dependencia — no incluir referencias a funciones que cambien en cada render.
   - Las imágenes de referencia deben tener `width` y `height` explícitos en el `<img>` para eliminar CLS.
   - Prohibido importar librerías de filtrado/búsqueda externas (Fuse.js, etc.) para una búsqueda simple — `String.includes` + normalización NFD es suficiente.

2. **Accesibilidad (A11y):**
   - El grid de asanas debe tener `role="listbox"` con `aria-label="Catálogo de asanas"`.
   - Cada `AsanaCard` debe tener `role="option"` y `aria-selected`.
   - Las imágenes de referencia deben tener `alt` descriptivo: `"{nameEs} - Imagen de referencia de postura de yoga"`.
   - Los chips de dificultad deben ser legibles por lectores de pantalla sin depender del color.

3. **Manejo de Errores y Retroalimentación:**
   - Si una imagen de referencia no carga, mostrar un placeholder SVG con el nombre de la asana.
   - El estado vacío del catálogo debe ser informativo y sugerir limpiar los filtros.

4. **Clean Code & SEO Semántico:**
   - Los datos del catálogo (`poses-catalog.ts`) son código de configuración, no lógica de negocio. Mantenerlos separados de los servicios.
   - Usar `as const` y tipos literales para garantizar inmutabilidad del catálogo en tiempo de compilación.

---

## 5. 🔬 Criterios de Aceptación y Definición de Hecho (Definition of Done)

- [ ] Todos los escenarios Gherkin automatizados en verde (CAT-01, CAT-02, CAT-03, CAT-04).
- [ ] Catálogo contiene exactamente 20 asanas, cada una con ≥ 3 `JointAngleRule` completas.
- [ ] Filtrado por nivel y zona del cuerpo funciona en tiempo real sin recarga.
- [ ] Búsqueda por nombre funciona con acentos (ej. "Árbol" encuentra `tree`).
- [ ] Imágenes de referencia con `loading="lazy"` y sin CLS en Lighthouse.
- [ ] Diseño validado y responsivo en pantallas móviles (360px), tablets (768px) y escritorio (1440px+).
- [ ] Cero advertencias o errores de compilación TypeScript (`tsc --noEmit`).
- [ ] Code Review aprobado e integrado a la rama principal.
