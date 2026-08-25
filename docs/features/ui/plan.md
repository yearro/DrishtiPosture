# 🚀 Implementation Plan: UI - Interfaz De Usuario Y Experiencia

> **Módulo / Sección:** Interfaz de Usuario y Experiencia
> **Tipo de Entrega:** `Web App`
> **Prioridad:** `P0 - MVP`
> **Estado:** `Ready for Sprint`
> **PRD Ref:** [PRD Specification](../../PRD.md#46-módulo-interfaz-de-usuario-y-experiencia)
> **Domain Ref:** [Domain Model](../../DOMAIN.md#analysissession)

---

## 1. 📋 Descripción y Propósito

### 1.1 Contexto

Este módulo define la **capa de presentación y experiencia de usuario** de DrishtiPosture. Es el único módulo que el usuario ve directamente y orquesta la composición de todos los módulos anteriores (CAM, POSE, CAT, ANGLE, EVAL) en una single-page application cohesionada y fluida. Define las tres "vistas" o estados de la app: (1) **Pantalla de Bienvenida** (welcome state con CTA), (2) **Selección de Asana** (catálogo), y (3) **Análisis Activo** (cámara + overlay + feedback). Todo funciona sin routing complejo — transiciones de estado en memoria. El **modo oscuro** es el predeterminado para evitar reflejo durante la práctica de yoga.

### 1.2 Objetivo Técnico (Engineering Goal)

Diseñar la UI principal de la aplicación alineada con el sistema de diseño "Zen-Tech Balance" del proyecto Stitch (`projects/13646989968875348763`), con las siguientes especificaciones:
- **Tipografía:** `Noto Serif` para headlines + `Manrope` para UI y body (según el design system del proyecto).
- **Paleta:** Sage Green (`#4d6054`) como primario, Deep Slate (`#51606d`) como secundario, Electric Blue (`#0058bc`) para estados activos de IA/scan.
- **Fondo base:** Soft Sand (`#fcf9f4`) en modo claro, superficie oscura complementaria en modo oscuro.
- **Modo oscuro predeterminado** con toggle persistido en `localStorage`.
- Diseño responsivo con layout split-view en desktop y stack vertical en tablet/móvil.
- Tiempo hasta la primera interacción (TTI) < 3 segundos en conexión de 10 Mbps.
- Detección y aviso cuando no se detecta ningún cuerpo en el frame (`poseScore < 0.5` > 1 segundo).

---

## 2. 🧰 Stack Tecnológico y Dependencias

| Capa / Componente | Tecnología / Librería | Versión Target | Propósito en el Desarrollo |
| :--- | :--- | :--- | :--- |
| **Frontend / Layout** | `React 18 + Vite` | `^18.3.x / ^5.x` | Shell de la app, composición de vistas, transiciones de estado |
| **Estilos / UI System** | `CSS Modules + CSS Custom Properties` | `latest` | Design tokens del sistema Zen-Tech Balance, temas claro/oscuro |
| **Gestión de Estado** | `useState + Context API` | `React 18 built-in` | Estado global de la sesión (`AppView`, tema, asana activa, cámara) |
| **Tipografía** | `Google Fonts (Noto Serif + Manrope)` | `latest` | Headlines de asanas y UI general del sistema |
| **Validación & SEO** | `TypeScript strict` | `^5.x` | Tipado del estado de la app, vistas y preferencias |

---

## 3. 🛠️ Desglose de Tareas de Implementación (Task Breakdown)

### 3.1 Capa de Datos y Backend (Backend / API Tasks)

- [ ] **Task 3.1.1:** Definir el sistema de diseño como CSS Custom Properties en `src/styles/design-tokens.css`:
  - Colores del sistema Zen-Tech Balance: sage green, slate, electric blue, soft sand.
  - Tipografía: `--font-headline: 'Noto Serif'`, `--font-body: 'Manrope'`.
  - Espaciado base 8px: `--space-xs: 4px`, `--space-sm: 12px`, `--space-md: 24px`, `--space-lg: 48px`, `--space-xl: 80px`.
  - Radios: `--radius-sm: 4px`, `--radius-md: 8px`, `--radius-lg: 12px`, `--radius-xl: 24px`.
  - Tokens de tema: `--color-surface`, `--color-on-surface`, `--color-primary`, etc.

- [ ] **Task 3.1.2:** Implementar el sistema de temas en `src/styles/themes.css`:
  - `[data-theme="dark"]`: variables de superficie oscura, texto claro, acentos sage/electric.
  - `[data-theme="light"]`: variables de superficie sand (`#fcf9f4`), texto oscuro (`#1c1c19`).
  - Tema oscuro como predeterminado aplicado en el elemento raíz `<html>`.

- [ ] **Task 3.1.3:** Definir el tipo `AppView` y el estado global en `src/types/app.types.ts`:
  - `type AppView = 'welcome' | 'catalog' | 'analysis'`
  - `interface AppState { view: AppView; theme: 'dark' | 'light'; activeAsana: IAsana | null; }`
  - `type AppAction = SetViewAction | ToggleThemeAction | SelectAsanaAction | ...`

- [ ] **Task 3.1.4:** Crear el Context y reducer en `src/context/AppContext.tsx`:
  - `AppContext` con `useReducer` para el estado global de la aplicación.
  - Persistir `theme` en `localStorage` con key `drishti:theme` (leer en la inicialización).
  - Hook `useAppContext(): AppContextValue` para consumir el contexto.

### 3.2 Capa de Interfaz y Cliente (Frontend App Tasks)

- [ ] **Task 3.2.1:** Crear el componente raíz `App.tsx`:
  - Renderiza la vista activa según `appState.view`: `<WelcomeView>`, `<CatalogView>`, `<AnalysisView>`.
  - Aplica `data-theme` al `<div id="app">` según el estado del tema.
  - Lazy loading de las vistas pesadas con `React.lazy + Suspense`.

- [ ] **Task 3.2.2:** Crear la vista `WelcomeView` en `src/views/WelcomeView.tsx`:
  - `<h1>` con "DrishtiPosture" (Noto Serif, 48px en desktop, 32px en móvil).
  - Subtítulo: descripción de 2 líneas de la app.
  - CTA "Comenzar análisis" (Sage Green, 56px altura en modo práctica).
  - Breve explicación de privacidad: "Todo el análisis ocurre en tu dispositivo. Nada se sube a servidores."
  - Toggle de tema claro/oscuro en la esquina superior derecha.

- [ ] **Task 3.2.3:** Crear la vista `CatalogView` en `src/views/CatalogView.tsx`:
  - Composición de `<AsanaCatalog>` del módulo CAT.
  - Botón "Volver" y botón "Iniciar análisis" (deshabilitado hasta que se seleccione una asana).
  - Layout: grid de catálogo a pantalla completa en móvil, split-view en desktop (catálogo izquierda, preview asana derecha).

- [ ] **Task 3.2.4:** Crear la vista `AnalysisView` en `src/views/AnalysisView.tsx`:
  - Layout split-view desktop: `AsanaReferencePanel` (izquierda, 35%) + `CameraView + SkeletonOverlay` (derecha, 65%).
  - Layout tablet/móvil: imagen de asana arriba, cámara abajo.
  - Panel de feedback (`FeedbackPanel`) superpuesto o lateral según el espacio disponible.
  - `NoPersonDetectedBanner` visible cuando `poseScore < 0.5` durante > 1 segundo.
  - Botón flotante "Cambiar asana" para regresar al catálogo sin perder el stream.

- [ ] **Task 3.2.5:** Crear el componente `NoPersonDetectedBanner` en `src/components/ui/NoPersonDetectedBanner.tsx`:
  - Aparece cuando `poseScore < 0.5` se mantiene durante > 1 segundo (debounce de 1000ms).
  - Mensaje: "No se detecta ninguna persona en el encuadre — ajusta tu posición o mejora la iluminación."
  - `role="alert"`, `aria-live="assertive"`.
  - Desaparece automáticamente cuando se detecta una pose nuevamente.

- [ ] **Task 3.2.6:** Crear el componente `ThemeToggle` en `src/components/ui/ThemeToggle.tsx`:
  - Botón `role="switch"`, `aria-checked={theme === 'light'}`, `aria-label="Cambiar a modo claro/oscuro"`.
  - Icono de sol/luna con transición CSS.
  - Persiste preferencia en `localStorage`.

- [ ] **Task 3.2.7:** Manejar los estados de UI de la sesión completa:
  - `welcome`: pantalla de bienvenida con CTA.
  - `catalog`: catálogo de asanas para seleccionar.
  - `analysis / idle`: cámara inactiva, asana seleccionada visible.
  - `analysis / active`: cámara activa, análisis corriendo.
  - `analysis / noPersonDetected`: banner de advertencia visible.

### 3.3 Calidad, BDD y Automatización (QA Tasks)

- [ ] **Task 3.3.1:** Pruebas unitarias del Context en `src/context/__tests__/AppContext.test.tsx`:
  - Test: estado inicial tiene `view: 'welcome'` y `theme: 'dark'`.
  - Test: `SetViewAction` actualiza `view` correctamente.
  - Test: `ToggleThemeAction` alterna entre `'dark'` y `'light'` y persiste en `localStorage`.
  - Test: `SelectAsanaAction` actualiza `activeAsana`.

- [ ] **Task 3.3.2:** Pruebas de componente en `src/views/__tests__/WelcomeView.test.tsx`:
  - Test BDD UI-01: `<h1>` con "DrishtiPosture" visible, botón CTA "Comenzar análisis" presente.
  - Test: clic en CTA navega a la vista `catalog`.

- [ ] **Task 3.3.3:** Prueba E2E en `e2e/ui.spec.ts`:
  - Escenario BDD UI-01: carga inicial → tema oscuro por defecto → CTA visible.
  - Escenario BDD UI-03: tema oscuro predeterminado verificado en `document.documentElement.dataset.theme`.
  - Escenario BDD UI-04: mock de `poseScore < 0.5` → banner de advertencia visible después de 1 segundo.
  - Test de responsividad: viewport 360px → layout stack vertical; viewport 1440px → split-view horizontal.

- [ ] **Task 3.3.4:** Audit de Lighthouse en `ci.yml`:
  - Score > 90 en Performance, Accessibility, Best Practices y SEO.
  - TTI < 3 segundos en throttling de red 10Mbps.

---

## 4. 🤖 Reglas de Contexto para el Modelo LLM (AI Agent System Instructions)

> [!IMPORTANT]
> **Instrucciones de generación de código para Asistentes AI / Agentic Copilots:**
> Al implementar el código de esta sección/funcionalidad, debes seguir estrictamente los siguientes principios:

1. **Rendimiento y Optimización First:**
   - Cargar Google Fonts con `<link rel="preconnect">` y `display=swap` para evitar bloqueo del render.
   - Las vistas `CatalogView` y `AnalysisView` deben usar `React.lazy()` para code splitting — el bundle inicial debe contener solo `WelcomeView`.
   - Usar `CSS Custom Properties` (variables) para todos los tokens de diseño — nunca hardcodear colores en componentes.
   - El tema se debe aplicar con `data-theme` en el elemento raíz, no con clases dinámicas en cada componente.

2. **Accesibilidad (A11y):**
   - `<h1>` único por vista: "DrishtiPosture" en welcome, "Selecciona una asana" en catalog, nombre de la asana activa en analysis.
   - El `ThemeToggle` debe anunciar el cambio de tema a lectores de pantalla: `aria-label="Cambiar a modo [claro/oscuro]"`.
   - El `NoPersonDetectedBanner` debe usar `role="alert"` para comunicación inmediata con tecnologías asistivas.
   - Las transiciones entre vistas deben respetar `prefers-reduced-motion`.

3. **Manejo de Errores y Retroalimentación:**
   - Estado de loading durante la carga lazy de vistas: `<Suspense fallback={<AppLoadingScreen />}>`.
   - Si la carga de Google Fonts falla (modo offline), la app debe funcionar con fuentes del sistema como fallback.

4. **Clean Code & SEO Semántico:**
   - Usar HTML semántico: `<main>`, `<header>`, `<nav>`, `<section>` con etiquetas ARIA apropiadas.
   - El `<title>` de la página debe ser "DrishtiPosture — Análisis de postura de yoga en tiempo real".
   - Meta description: "Corrige tu postura de yoga en tiempo real con IA. Sin instalación, sin registro, sin envío de datos. Todo ocurre en tu navegador."
   - `<meta name="theme-color">` actualizado dinámicamente cuando cambia el tema.

---

## 5. 🔬 Criterios de Aceptación y Definición de Hecho (Definition of Done)

- [ ] Todos los escenarios Gherkin automatizados en verde (UI-01, UI-02, UI-03, UI-04).
- [ ] Tema oscuro aplicado por defecto en la primera visita (sin flash de contenido claro - FOUC).
- [ ] Toggle de tema persiste correctamente en `localStorage` entre recargas.
- [ ] Banner "No se detecta persona" visible en < 1.1 segundos tras pérdida de detección.
- [ ] Lighthouse > 90 en Performance, Accessibility, Best Practices y SEO.
- [ ] TTI < 3 segundos verificado con throttling de red 10 Mbps en Lighthouse CI.
- [ ] Diseño validado y responsivo en pantallas móviles (360px), tablets (768px) y escritorio (1440px+).
- [ ] Cero advertencias o errores de compilación TypeScript (`tsc --noEmit`).
- [ ] Code Review aprobado e integrado a la rama principal.
