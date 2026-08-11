# PRD: DrishtiPosture

---

## 1. Visión General del Producto

**Nombre del Producto:** DrishtiPosture  
**Tipo de Aplicación:** Web (Client-Side / Progressive Web App)  
**Versión Inicial Target:** v1.0.0  
**Líder de Producto (PM):** Yeri Armenta Rodriguez  
**Lead Técnico:** Yeri Armenta Rodriguez  

### 1.1 Resumen Ejecutivo

DrishtiPosture es una aplicación web de análisis y corrección postural de yoga en tiempo real que opera completamente en el navegador del usuario, sin necesidad de servidores de procesamiento ni almacenamiento de datos. Inspirada en el concepto yóguico *Drishti* —el punto de enfoque consciente—, la app utiliza la cámara web del dispositivo para capturar el flujo de video y procesarlo localmente con MediaPipe Pose (WebAssembly/WebGL), detectando los 33 puntos clave del cuerpo, calculando los ángulos entre articulaciones y comparándolos con los rangos ideales de un catálogo extenso de asanas clásicas.

La retroalimentación es inmediata y visual: un overlay de colores sobre el esqueleto detectado indica el nivel de corrección de la postura, acompañado de indicaciones de texto específicas que guían al usuario hacia la alineación ideal (ej. *"Levanta el brazo derecho 15°"*). No se recopila, transmite ni almacena ningún dato del usuario — ni video, ni imagen, ni métricas — garantizando privacidad total por diseño.

### 1.2 Problema y Oportunidad

Practicar yoga sin un instructor presente implica que el estudiante no tiene retroalimentación objetiva sobre si su alineación es correcta. Los errores posturales repetidos no solo reducen los beneficios de la práctica sino que pueden generar lesiones. Las alternativas actuales —clases presenciales, videos grabados— no ofrecen corrección personalizada en tiempo real. DrishtiPosture llena ese vacío: actúa como un asistente de postura siempre disponible, sin fricción de registro, sin costos de infraestructura de procesamiento y con pleno respeto a la privacidad del usuario.

---

## 2. Objetivos y Métricas de Éxito (KPIs)

### 2.1 Objetivos del Negocio

1. **Utilidad inmediata:** El usuario debe poder iniciar un análisis de postura en menos de 10 segundos desde que abre la app (sin registro, sin configuración inicial).
2. **Cobertura de asanas:** Soportar un catálogo inicial de al menos 20 asanas clásicas de yoga en v1.0.0, ampliable en versiones posteriores.
3. **Precisión de análisis:** La detección de desviaciones posturales debe tener una tasa de falsos negativos < 15% en condiciones estándar de iluminación (medido con conjunto de prueba anotado manualmente).
4. **Rendimiento:** Mantener la inferencia del modelo a 25+ FPS en hardware de gama media-alta (CPU: Intel Core i5/i7 gen 10+, GPU: integrada compatible con WebGL 2.0).
5. **Accesibilidad universal:** Funcionar sin instalación, en cualquier navegador moderno (Chrome, Firefox, Safari, Edge), sin requerir cuenta ni plugins.

### 2.2 Métricas Clave de Rendimiento (KPIs)

| Métrica / KPI | Estado Actual (Baseline) | Meta Target | Método de Medición |
| :--- | :--- | :--- | :--- |
| Tiempo hasta primer análisis activo | N/A | < 10 segundos | Medición manual en lighthouse / user testing |
| FPS del análisis de pose (P50) | N/A | ≥ 25 FPS | `performance.now()` en el render loop |
| FPS del análisis de pose (P95) | N/A | ≥ 15 FPS | Logs de cliente con Performance API |
| Latencia de inferencia MediaPipe (P95) | N/A | < 60ms | `performance.measure()` alrededor de sendImageToWorker |
| Tiempo de carga inicial de la app (TTI) | N/A | < 3s en conexión 10Mbps | Lighthouse CI en GitHub Actions |
| Tamaño del bundle total (gzip) | N/A | < 5MB (incluyendo modelo WASM) | Webpack Bundle Analyzer |
| Cobertura de asanas en catálogo | 0 | ≥ 20 asanas en v1.0 | Conteo en `poses-catalog.ts` |
| Tasa de falsos negativos en detección | N/A | < 15% | Pruebas con dataset de referencia anotado |

---

## 3. Personas y Casos de Uso

### 3.1 Usuarios Objetivo (Personas)

#### Persona 1: Practicante de Yoga Independiente
- **Perfil y Contexto:** Persona de 25-45 años que practica yoga en casa 3-5 veces por semana a través de videos de YouTube o apps de guía. No tiene instructor presencial.
- **Puntos de Dolor:**
  - No sabe si está ejecutando las asanas correctamente, especialmente las que involucran alineación de columna y caderas.
  - Las apps de yoga actuales son solo video pregrabado sin retroalimentación de su postura real.
  - Contratar un instructor presencial es costoso o logísticamente inviable.
- **Necesidades Clave:** Retroalimentación visual inmediata, sin crear cuenta, que funcione mientras ve simultáneamente un tutorial en otra ventana.

#### Persona 2: Instructor de Yoga en Formación
- **Perfil y Contexto:** Estudiante de formación de instructores de yoga (RYT-200) que necesita practicar y verificar su propia ejecución de asanas para el examen de certificación.
- **Puntos de Dolor:**
  - Necesita referencias objetivas de ángulos y alineación, no solo observación subjetiva.
  - Practicar frente a un espejo no muestra los ángulos desde múltiples planos.
- **Necesidades Clave:** Información precisa de ángulos articulares, catálogo amplio de asanas, indicaciones específicas de corrección.

---

## 4. Requisitos Funcionales y Historias de Usuario

### 4.1 Módulo: Captura de Video y Activación de Cámara

Este módulo gestiona el acceso a la cámara web del navegador mediante la API `getUserMedia`, el renderizado del stream de video en un elemento `<video>` y la canalización de frames hacia el pipeline de análisis de MediaPipe Pose.

| ID | Historia de Usuario / Requisito | Criterios de Aceptación | Prioridad |
| :--- | :--- | :--- | :--- |
| CAM-01 | Como usuario, quiero activar mi cámara con un clic para comenzar el análisis | Botón "Iniciar análisis", solicita permiso de cámara vía `getUserMedia`, stream visible en < 2s tras conceder permiso | **P0** |
| CAM-02 | Como usuario, quiero ver un mensaje claro si mi navegador no soporta la API o si deniego el permiso | Mensaje de error específico: "Permiso de cámara denegado" / "Cámara no disponible", con instrucciones de resolución | **P0** |
| CAM-03 | Como usuario, quiero poder detener el análisis y apagar la cámara con un clic | Botón "Detener", libera el stream (`track.stop()`), oculta el video y detiene el loop de inferencia | **P0** |
| CAM-04 | Como usuario, quiero poder espejear horizontalmente la vista de cámara (modo selfie) | Toggle de espejado configurable, aplicado con CSS `transform: scaleX(-1)` sobre el canvas | **P1** |

📌 Issue GitHub: [Feat_1: Activación de cámara y captura de video](https://github.com/yearro/DrishtiPosture/issues/1)

---

### 4.2 Módulo: Estimación de Pose con MediaPipe

Este módulo integra el modelo MediaPipe Pose de Google ejecutado en el navegador vía WebAssembly/WebGL. Recibe frames del stream de video y devuelve los 33 landmarks del cuerpo con coordenadas `(x, y, z)` normalizadas y scores de visibilidad. Opera en un Web Worker para no bloquear el hilo principal de la UI.

| ID | Historia de Usuario / Requisito | Criterios de Aceptación | Prioridad |
| :--- | :--- | :--- | :--- |
| POSE-01 | Como sistema, debo cargar el modelo MediaPipe Pose en el navegador al iniciar la app | Modelo WASM cargado y listo antes del primer frame de análisis; indicador de carga visible durante la inicialización | **P0** |
| POSE-02 | Como sistema, debo procesar cada frame de video y extraer los 33 landmarks con sus scores de visibilidad | Output: array de 33 objetos `{x, y, z, visibility}` normalizados (0-1) por frame; inferencia < 60ms P95 | **P0** |
| POSE-03 | Como sistema, debo descartar landmarks con score de visibilidad < 0.5 para evitar falsos positivos | Landmarks con visibility < 0.5 marcados como `null`/`undefined`; los ángulos que dependen de ellos no se calculan | **P0** |
| POSE-04 | Como sistema, debo ejecutar la inferencia en un Web Worker para mantener la UI a ≥ 25 FPS | El thread principal nunca bloquea por inferencia; comunicación vía `postMessage` con `OffscreenCanvas` o `ImageBitmap` | **P1** |

📌 Issue GitHub: [Feat_2: Integración de MediaPipe Pose para estimación de landmarks](https://github.com/yearro/DrishtiPosture/issues/2)

---

### 4.3 Módulo: Catálogo de Asanas y Definición de Ángulos de Referencia

Este módulo define el catálogo de asanas de yoga clásicas soportadas por el sistema. Para cada asana, almacena en un archivo de configuración JSON/TypeScript los ángulos de referencia ideales entre articulaciones clave (rodilla, cadera, codo, hombro, tobillo) y los rangos de tolerancia aceptables (mín/máx en grados).

| ID | Historia de Usuario / Requisito | Criterios de Aceptación | Prioridad |
| :--- | :--- | :--- | :--- |
| CAT-01 | Como usuario, quiero seleccionar una asana del catálogo para que el sistema analice mi postura respecto a ella | Selector/buscador de asanas con nombre en español e inglés, imagen de referencia y nivel de dificultad | **P0** |
| CAT-02 | Como sistema, el catálogo debe contener al menos 20 asanas clásicas en v1.0.0 con sus ángulos de referencia documentados | 20+ asanas con al menos 3 ángulos articulares de referencia cada una, definidos en `poses-catalog.ts` | **P0** |
| CAT-03 | Como usuario, quiero ver una imagen de referencia de la asana seleccionada junto a mi vista de cámara | Panel de referencia lado a lado (split view): imagen/ilustración de la asana a la izquierda, cámara a la derecha | **P1** |
| CAT-04 | Como usuario, quiero filtrar el catálogo por nivel (Principiante, Intermedio, Avanzado) o por zona del cuerpo | Filtros en la UI de selección; las asanas se filtran en tiempo real sin recarga de página | **P1** |

📌 Issue GitHub: [Feat_3: Catálogo de asanas y definición de ángulos de referencia](https://github.com/yearro/DrishtiPosture/issues/3)

---

### 4.4 Módulo: Cálculo de Ángulos Articulares

Este módulo recibe los landmarks detectados por MediaPipe y calcula los ángulos entre tríos de articulaciones (ej. cadera-rodilla-tobillo para el ángulo de la rodilla) usando geometría vectorial 2D/3D. Los ángulos calculados son la entrada para el motor de evaluación de postura.

| ID | Historia de Usuario / Requisito | Criterios de Aceptación | Prioridad |
| :--- | :--- | :--- | :--- |
| ANGLE-01 | Como sistema, debo calcular el ángulo entre tres landmarks dados (A-B-C, donde B es el vértice) | Función `calculateAngle(A, B, C): number` que retorna el ángulo en grados [0-180] usando producto punto de vectores | **P0** |
| ANGLE-02 | Como sistema, debo calcular todos los ángulos relevantes para la asana activa en cada frame | Mapa de ángulos calculados por frame: `{ [jointName: string]: number \| null }` donde null si landmarks no visibles | **P0** |
| ANGLE-03 | Como usuario, quiero ver los valores de ángulo en tiempo real sobre la vista de cámara | Valores numéricos en grados renderizados en el canvas junto al joint correspondiente, actualizados por frame | **P1** |

📌 Issue GitHub: [Feat_4: Cálculo de ángulos articulares](https://github.com/yearro/DrishtiPosture/issues/4)

---

### 4.5 Módulo: Motor de Evaluación y Retroalimentación Visual

Este es el módulo central de retroalimentación. Compara los ángulos calculados con los rangos ideales de la asana activa y genera un overlay visual sobre el canvas: el esqueleto se pinta de **verde** cuando la articulación está dentro del rango ideal, **amarillo** cuando está cerca del límite y **rojo** cuando está fuera de rango. Además, genera indicaciones de texto específicas (ej. *"Extiende la rodilla izquierda 20°"*) que se muestran en un panel de feedback.

| ID | Historia de Usuario / Requisito | Criterios de Aceptación | Prioridad |
| :--- | :--- | :--- | :--- |
| EVAL-01 | Como usuario, quiero ver el esqueleto superpuesto sobre mi imagen con colores que indiquen si cada articulación está bien posicionada | Overlay en canvas: conexiones y joints pintados en verde (dentro de rango), amarillo (±10° del límite) o rojo (fuera de rango) | **P0** |
| EVAL-02 | Como usuario, quiero recibir indicaciones de texto específicas que me digan exactamente qué ajustar | Panel de feedback con hasta 3 instrucciones priorizadas por mayor desviación; formato: "Articulación: acción + magnitud" | **P0** |
| EVAL-03 | Como usuario, quiero ver un indicador de "score" global de la postura actual (0-100%) | Badge numérico de score calculado como promedio ponderado de articulaciones dentro de rango; actualizado por frame | **P1** |
| EVAL-04 | Como usuario, quiero que el feedback sea dinámico y desaparezca cuando corrijo la articulación | Las instrucciones del panel desaparecen en < 500ms cuando el ángulo entra al rango ideal; la conexión en el canvas cambia a verde | **P1** |
| EVAL-05 | Como usuario, quiero un mensaje de felicitación cuando toda la postura esté correcta (score = 100%) | Overlay visual con animación de éxito cuando todas las articulaciones relevantes están en rango por ≥ 1.5 segundos consecutivos | **P2** |

📌 Issue GitHub: [Feat_5: Motor de evaluación y retroalimentación visual](https://github.com/yearro/DrishtiPosture/issues/5)

---

### 4.6 Módulo: Interfaz de Usuario y Experiencia

Este módulo define la experiencia de navegación: pantalla de bienvenida, selección de asana, pantalla de análisis activo y panel de referencia. Todo funciona en single-page sin routing complejo.

| ID | Historia de Usuario / Requisito | Criterios de Aceptación | Prioridad |
| :--- | :--- | :--- | :--- |
| UI-01 | Como usuario, quiero una pantalla de bienvenida que explique qué hace la app y cómo usarla, con un CTA claro | Landing con título, descripción de 2-3 líneas, botón "Comenzar análisis" visible above the fold | **P0** |
| UI-02 | Como usuario, quiero que la interfaz funcione en modo landscape y portrait en pantallas de escritorio y tablet | Layout responsive: en desktop, split-view horizontal (referencia + cámara); en tablet, stack vertical | **P1** |
| UI-03 | Como usuario, quiero un modo oscuro como predeterminado que no genere reflejo en el espacio donde practico | Tema oscuro por defecto; toggle de tema claro disponible en la UI | **P1** |
| UI-04 | Como usuario, quiero ver claramente cuando la app no detecta ningún cuerpo en el frame | Mensaje "No se detecta ninguna persona en el encuadre" cuando `pose.score < 0.5` por más de 1 segundo | **P1** |

📌 Issue GitHub: [Feat_6: Interfaz de usuario y experiencia](https://github.com/yearro/DrishtiPosture/issues/6)

---

## 5. Arquitectura Técnica y Especificaciones del Sistema

### 5.1 Autenticación, Autorización y Seguridad

**Sin autenticación.** La app es completamente anónima y sin estado del lado del servidor. No requiere cuenta, login ni tokens.

**Consideraciones de seguridad relevantes:**
- **Acceso a cámara:** Gestionado 100% por el navegador vía Permissions API (`navigator.mediaDevices.getUserMedia`). El dominio debe servirse bajo **HTTPS** (requerimiento obligatorio del browser para acceder a la cámara).
- **Sin transmisión de datos:** Ningún frame, imagen, coordenada o dato del usuario sale del navegador. El modelo y la inferencia corren completamente en el cliente (WebAssembly + WebGL). Esto es verificable en modo avión.
- **Content Security Policy (CSP):** Headers estrictos para prevenir XSS. La directiva `script-src` debe incluir `'wasm-unsafe-eval'` requerido por WebAssembly.
- **CORS:** No aplica — no hay peticiones cross-origin a APIs propias. Solo se descargan assets estáticos del CDN/hosting propio.

### 5.2 Capa de Persistencia y Almacenamiento de Datos

**Sin persistencia.** El sistema no almacena datos entre sesiones. Todo el estado es efímero y vive en memoria durante la sesión activa del navegador.

| Tipo de Dato | Dónde Vive | TTL |
| :--- | :--- | :--- |
| Stream de video de la cámara | `HTMLVideoElement` en memoria | Duración de la sesión activa |
| Landmarks de pose (frame actual) | Estado en memoria del Web Worker / `useRef` | Un frame (sobrescrito en cada inferencia) |
| Catálogo de asanas y ángulos de referencia | Bundle JavaScript estático (importado en build time) | Indefinido (código compilado) |
| Selección de asana activa | Estado de React/Vanilla JS en memoria | Duración de la sesión activa |
| Preferencia de tema (claro/oscuro) | `localStorage` del navegador | Persistente en el dispositivo |

### 5.3 Integraciones y Servicios de Terceros

| Servicio / API Externa | Propósito de la Integración | Método de Comunicación | Plan de Contingencia / Fallback |
| :--- | :--- | :--- | :--- |
| **MediaPipe Pose (Google)** | Inferencia de estimación de pose (33 landmarks) en el navegador | SDK JavaScript + WASM/WebGL, ejecutado localmente | Si WebGL no está disponible, fallback a WASM CPU-only (más lento pero funcional) |
| **CDN de Assets Estáticos** | Distribución del bundle JS/WASM y assets del catálogo | HTTPS (descarga en primera carga, cacheado por Service Worker) | Service Worker cachea los assets para funcionamiento offline en visitas posteriores |

> **Nota:** No hay integraciones con APIs externas de procesamiento. Todo corre en el cliente.

### 5.4 Observabilidad, Telemetría y Logging

**Sin telemetría de comportamiento del usuario.** No se integra ningún sistema de analytics (Google Analytics, Mixpanel, etc.) para respetar la privacidad por diseño.

**Logging de rendimiento (solo en cliente, sin transmisión):**
- `performance.measure()` para medir la latencia de inferencia frame-a-frame, disponible en DevTools del navegador.
- Logs de consola estructurados en `development` build: `[MediaPipe][INFO] Model loaded in 1200ms`.
- En `production` build, los logs de consola están deshabilitados.

**Monitoreo de disponibilidad (hosting):**
- El hosting estático (Firebase Hosting / GitHub Pages / Vercel) proporciona SLA y métricas de disponibilidad sin configuración adicional.

---

## 6. Especificaciones Específicas de la Plataforma Web

### 6.1 Requisitos de Experiencia de Usuario (UI/UX) y Accesibilidad

**Stack de UI:**
- Framework: **React** (con Vite como bundler) o **Vanilla JS + Canvas API** según complejidad final determinada en fase de diseño técnico.
- Estilos: CSS Variables + módulos CSS. Paleta oscura base con acentos en tonos índigo/violeta — coherente con el concepto espiritual del nombre Drishti.
- Tipografía: Google Fonts `Inter` (UI general) + `Space Grotesk` (métricas numéricas de ángulos).

**Canvas y renderizado:**
- El overlay de esqueleto y feedback visual se renderiza en un elemento `<canvas>` superpuesto sobre el `<video>` usando `requestAnimationFrame`.
- La resolución del canvas se ajusta dinámicamente al tamaño real del elemento en pantalla (`devicePixelRatio`) para nitidez en pantallas Retina/HiDPI.

**Accesibilidad (WCAG 2.1 AA):**
- Contraste mínimo de color: 4.5:1 para texto, 3:1 para elementos gráficos de UI.
- El panel de retroalimentación textual asegura que usuarios con daltonismo reciban la misma información que el overlay de colores (no depende únicamente del color).
- Áreas táctiles mínimas: 48x48px.
- La app incluye texto alternativo en las imágenes de referencia del catálogo.

### 6.2 Estrategia Offline y Caché

- **Service Worker:** Implementado con Workbox (si se usa Vite). Estrategia `CacheFirst` para assets estáticos del bundle y el modelo WASM de MediaPipe.
- **Primera carga:** Requiere conexión para descargar el bundle (~3-5MB incluyendo modelo). Las visitas posteriores son completamente offline.
- **Sin sincronización:** Al no haber datos persistidos del lado del servidor, no hay conflictos de sync ni colas de reintentos.

---

## 7. Requisitos No Funcionales (NFRs)

### 7.1 Rendimiento y Escalabilidad

- **FPS objetivo:** ≥ 25 FPS en hardware gama media-alta (Chrome en macOS/Windows con GPU integrada compatible con WebGL 2.0).
- **Latencia de inferencia:** P50 < 30ms, P95 < 60ms, P99 < 100ms por frame.
- **Tamaño del bundle:** < 5MB total (gzip). El modelo WASM de MediaPipe Pose (~3MB) se separa en chunk lazy-loaded.
- **Tiempo hasta interactividad (TTI):** < 3 segundos en conexión 10Mbps.
- **Escalabilidad:** Infinita — no hay servidores de cómputo. Cada usuario procesa en su propia máquina. El único recurso compartido es el servidor estático de hosting, que escala con CDN.
- **Memoria RAM:** < 300MB consumidas por la pestaña del navegador durante análisis activo.

### 7.2 Cumplimiento Normativo y Privacidad

- **Privacidad por diseño:** Ningún dato de video, imagen, coordenadas ni métricas se transmite fuera del navegador. Cumple con el principio de minimización de datos del GDPR.
- **HTTPS obligatorio:** Requerido por el navegador para acceder a `getUserMedia`. El hosting debe servir únicamente bajo HTTPS con HSTS habilitado.
- **Sin cookies de seguimiento:** No se usan cookies de terceros ni pixels de tracking.
- **Política de privacidad:** Página de política breve requerida para claridad con el usuario, indicando explícitamente que no se recopilan datos.

### 7.3 Disponibilidad y SLA

| Componente | SLA Objetivo | Notas |
| :--- | :--- | :--- |
| Análisis de pose (on-device) | 100% (sin dependencia de red tras carga inicial) | Funciona offline tras primera carga con Service Worker |
| Hosting estático (CDN) | ≥ 99.9% | Dependiente del proveedor (Firebase Hosting / Vercel / GitHub Pages) |

---

## 8. Estrategia de Despliegue, CI/CD y Distribución

**Stack CI/CD:** GitHub Actions

**Pipelines:**

| Pipeline | Trigger | Pasos |
| :--- | :--- | :--- |
| `ci.yml` | Push a `main` / PR | Lint (ESLint), Type check (TSC), Tests unitarios (Vitest), Build de producción |
| `cd.yml` | Push a `main` (merge aprobado) | Build de producción, Deploy a Firebase Hosting / Vercel / GitHub Pages |

**Entornos:**

| Entorno | URL | Propósito |
| :--- | :--- | :--- |
| `preview` | URL por PR (Vercel preview) | Revisión de cambios antes de merge |
| `production` | `drishtiposture.app` (o subdominio) | Usuarios finales |

**Distribución:** Aplicación web estática (SPA/PWA). No hay paquetes de App Store ni binarios nativos en v1.0.0. Los usuarios acceden directamente desde el navegador. La PWA puede ser instalada en el homescreen del dispositivo por iniciativa del usuario.

---

## 9. Estrategia de Pruebas y Calidad (QA)

| Nivel de Prueba | Cobertura Target / Enfoque | Herramientas Recomendadas |
| :--- | :--- | :--- |
| **Unitarias** | ≥ 80% en funciones de cálculo de ángulos (`calculateAngle`), motor de evaluación de postura y lógica del catálogo | Vitest, `@testing-library/react` |
| **Integración** | Flujos de UI críticos: activación de cámara (mock), selección de asana, render del overlay en canvas | Vitest + jsdom, MSW para mocks |
| **Snapshot de Canvas** | Verificar que el overlay se renderiza correctamente dado un set de landmarks de prueba | `jest-canvas-mock` o comparación manual |
| **E2E** | Happy paths: cargar app → seleccionar asana → activar cámara (mock de video) → verificar feedback visible | Playwright |
| **Rendimiento** | FPS del loop de análisis bajo distintas resoluciones de video y condiciones de carga | Chrome DevTools Performance Panel, Lighthouse CI |
| **Compatibilidad** | Verificar funcionamiento en Chrome, Firefox, Safari (macOS/iOS), Edge | BrowserStack (manual en v1.0.0) |

---

## 10. Fuera de Alcance (Out of Scope) — v1.0.0

1. **Almacenamiento de sesiones o historial:** No se guardan métricas, puntuaciones ni grabaciones de sesiones previas.
2. **Cuentas de usuario o autenticación:** Sin registro, login ni perfiles de usuario.
3. **Soporte para múltiples personas en el frame:** El sistema analiza una sola persona por frame en v1.0.0.
4. **Detección de secuencias o flujos (Vinyasa):** No se analizan transiciones entre asanas ni rutinas completas; solo postura estática por asana seleccionada.
5. **Versión móvil nativa (iOS/Android):** La v1.0.0 es únicamente web. El soporte de cámara en móvil vía navegador puede funcionar pero no es el target optimizado.

---

## 11. Plan de Lanzamiento y Fases (Roadmap)

| Fase | Hito / Entregable | Alcance Principal | Fecha Estimada |
| :--- | :--- | :--- | :--- |
| **Fase 1** | MVP / Alpha | Captura de cámara, integración MediaPipe Pose, overlay de esqueleto básico, catálogo de 5 asanas, feedback de color (rojo/verde), indicaciones de texto simples | TBD |
| **Fase 2** | Beta Pública | Catálogo expandido a 20+ asanas, filtros por nivel/zona, score de postura 0-100%, modo oscuro/claro, imagen de referencia split-view, accesibilidad WCAG 2.1 AA, PWA con Service Worker | TBD |
| **Fase 3** | General Availability (GA) | Catálogo completo (40+ asanas), animación de éxito, Web Worker para inferencia, optimización de bundle, compatibilidad cross-browser certificada, política de privacidad, landing page pública | TBD |

---

## 12. Riesgos, Dependencias y Supuestos

### 12.1 Matriz de Riesgos

| Riesgo Detectado | Impacto | Probabilidad | Plan de Mitigación |
| :--- | :--- | :--- | :--- |
| **Rendimiento insuficiente en hardware gama baja** (< 15 FPS) | Alto | Media | Implementar throttling adaptativo: reducir resolución de análisis a 320x240 y FPS a 15 si el hardware no soporta la carga; comunicarlo al usuario con mensaje en la UI |
| **MediaPipe Pose no detecta landmarks bajo condiciones de poca luz o ropa de colores similares al fondo** | Alto | Media | Onboarding con recomendaciones de uso: ropa ajustada de color contrastante, iluminación frontal; umbral de visibilidad estricto (≥ 0.5) para evitar landmarks incorrectos |
| **Safari (iOS/macOS) no soporta completamente WebAssembly o WebGL 2.0** | Medio | Baja | Validar compatibilidad con MediaPipe en Safari durante la Fase 2; documentar limitaciones conocidas; el fallback CPU-only de MediaPipe cubre Safari con WASM básico |
| **El modelo WASM de MediaPipe (~3MB) genera una primera carga lenta en conexiones lentas** | Medio | Alta | Lazy loading del modelo solo cuando el usuario inicia el análisis; spinner de carga con mensaje "Cargando modelo de IA (~3MB)..."; cacheado agresivo con Service Worker para visitas posteriores |
| **Cambios en la API de MediaPipe Pose por parte de Google** | Bajo | Baja | Abstraer la integración detrás de una interfaz `IPoseDetector`; versionar el SDK de MediaPipe en `package.json` con versión exacta (no rangos) |

### 12.2 Dependencias Clave

- **MediaPipe Pose SDK (Google):** Dependencia crítica y sin alternativa directa en v1.0.0. El core del producto depende de la disponibilidad y estabilidad de este modelo.
- **WebAssembly + WebGL 2.0:** Requeridos por el runtime de MediaPipe. La app no puede funcionar en navegadores que no soporten estas APIs (IE11, Chrome < 79).
- **Navegador con `getUserMedia` API:** Requerido para acceso a cámara. Depende del permiso del usuario y de que la app sirva bajo HTTPS.
- **Proveedor de Hosting Estático:** Firebase Hosting, Vercel o GitHub Pages. Decisión de infraestructura a confirmar antes de la Fase 1.

---

## 13. Glosario

| Término | Definición |
| :--- | :--- |
| **Drishti** | Término sánscrito del yoga: punto de enfoque visual. Inspira el nombre del producto. |
| **Asana** | Postura de yoga. Término sánscrito que en la tradición clásica designa la posición corporal estática o dinámica practicada. |
| **Landmark** | Punto clave del cuerpo detectado por el modelo de visión (ej. hombro izquierdo, rodilla derecha). MediaPipe Pose detecta 33 landmarks. |
| **Ángulo articular** | Ángulo en grados formado por tres landmarks donde el landmark central es el vértice (ej. cadera-rodilla-tobillo). |
| **Score de postura** | Métrica de 0 a 100% que indica qué porcentaje de articulaciones relevantes están dentro del rango ideal para la asana activa. |
| **WebAssembly (WASM)** | Formato binario de bajo nivel que permite ejecutar código de alto rendimiento (C/C++/Rust) en el navegador a velocidades cercanas al nativo. |
| **Web Worker** | Hilo de JavaScript separado del hilo principal de la UI. Se usa para ejecutar la inferencia de MediaPipe sin bloquear el renderizado de la interfaz. |
| **TTI** | Time to Interactive: tiempo desde que el usuario navega a la URL hasta que la app está completamente interactiva. |

---

*Documento generado el 2026-08-10. Repositorio: [yearro/DrishtiPosture](https://github.com/yearro/DrishtiPosture). Ver también: [DOMAIN.md](./DOMAIN.md)*
