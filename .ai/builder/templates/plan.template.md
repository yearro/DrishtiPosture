# 🚀 Implementation Plan: {{ feature.id | upper }} - {{ feature.title | title }}

> **Módulo / Sección:** {{ feature.module_name }}  
> **Tipo de Entrega:** `{{ project.type | default:"Web App / Landing Page" }}`  
> **Prioridad:** `{{ feature.priority | upper | default:"P0 - MVP" }}`  
> **Estado:** `{{ feature.status | default:"Draft / Ready for Sprint" }}`  
> **PRD Ref:** [PRD Specification](../../PRD.md#{{ feature.prd_section_anchor }})  
{% if project.type == "Web App" %}> **Domain Ref:** [Domain Model](../../DOMAIN.md#{{ feature.domain_entity_anchor }}){% endif %}

---

## 1. 📋 Descripción y Propósito

### 1.1 Contexto
{{ feature.description }}

### 1.2 Objetivo Técnico (Engineering Goal)
{# Describe el objetivo técnico (ej. Web App: API resiliente y estado local; Landing Page: 100/100 en Lighthouse, SEO semántico y captación de leads). #}
{{ feature.engineering_goal }}

---

## 2. 🧰 Stack Tecnológico y Dependencias

| Capa / Componente | Tecnología / Librería | Versión Target | Propósito en el Desarrollo |
| :--- | :--- | :--- | :--- |
| **Frontend / Layout** | `{{ tech.frontend | default:"Next.js / Astro / React Native" }}` | `{{ tech.frontend_version | default:"latest" }}` | Maquetación, renderizado (SSR/SSG/Client) y componentes. |
| **Estilos / UI System** | `{{ tech.styling | default:"Tailwind CSS / Shadcn UI" }}` | `{{ tech.styling_version | default:"latest" }}` | Sistema de diseño, diseño responsivo y animaciones. |
| **Gestión de Estado / Captación** | `{{ tech.state_or_form | default:"Zustand / React Hook Form" }}` | `{{ tech.state_version | default:"latest" }}` | Manejo de formularios, estado global o estado de UI. |
| **Backend / Serverless / Integración** | `{{ tech.backend | default:"Node.js API / Serverless Functions / CRM Webhook" }}` | `{{ tech.backend_version | default:"latest" }}` | Procesamiento de peticiones o envío de leads. |
| **Validación & SEO** | `{{ tech.validation_seo | default:"Zod / Next-SEO / Schema.org" }}` | `{{ tech.val_version | default:"latest" }}` | Validación de datos y metadatos estructurados. |

---

## 3. 🛠️ Desglose de Tareas de Implementación (Task Breakdown)

{% if project.type == "Landing Page" %}
### 3.1 Maquetación, UI & UX (Landing / Component Tasks)
- [ ] **Task 3.1.1:** Crear la estructura semántica HTML5 / JSX para la sección en `src/components/landing/{{ feature.id | lower }}.tsx`.
- [ ] **Task 3.1.2:** Implementar diseño responsivo (Mobile First) con puntos de quiebre en `sm`, `md`, `lg` y `xl`.
- [ ] **Task 3.1.3:** Agregar animaciones/transiciones ligeras y optimizar carga de assets (Formatos WebP/AVIF, lazy loading).

### 3.2 Formulario, Conversión & Analytics (Integrations)
- [ ] **Task 3.2.1:** Implementar formulario de captura / CTA con validación en cliente utilizando `Zod` y `React Hook Form`.
- [ ] **Task 3.2.2:** Integrar endpoint de backend o Webhook (ej. HubSpot, Mailchimp, Supabase) para registrar el lead.
- [ ] **Task 3.2.3:** Configurar eventos de analítica y conversión (`Google Tag Manager`, `FB Pixel` o `Plausible`).

### 3.3 SEO Técnico & Core Web Vitals (Quality Tasks)
- [ ] **Task 3.3.1:** Inyectar datos estructurados OpenGraph, Twitter Cards y etiquetas JSON-LD (`Schema.org`).
- [ ] **Task 3.3.2:** Auditar rendimiento asegurando métricas LCP < 2.5s, CLS < 0.1 y 100/100 en Lighthouse Performance.

{% else %}
### 3.1 Capa de Datos y Backend (Backend / API Tasks)
- [ ] **Task 3.1.1:** Crear / actualizar el esquema de base de datos en `{{ feature.db_migration_file | default:"prisma/schema.prisma" }}`.
- [ ] **Task 3.1.2:** Crear DTOs de entrada/salida y esquemas de validación con `Zod` en `src/schemas/{{ feature.id | lower }}.schema.ts`.
- [ ] **Task 3.1.3:** Implementar la capa de servicio y lógica de negocio en `src/services/{{ feature.id | lower }}.service.ts`.
- [ ] **Task 3.1.4:** Exponer Controller / Endpoints HTTP (`{{ feature.http_method | default:"POST" }}` `{{ feature.endpoint_path | default:"/api/v1/resource" }}`).

### 3.2 Capa de Interfaz y Cliente (Frontend App Tasks)
- [ ] **Task 3.2.1:** Diseñar componentes en `src/components/{{ feature.id | lower }}/`.
- [ ] **Task 3.2.2:** Crear Custom Hook / Integración de API (`use{{ feature.name | title }}`) con manejo de cacheo/re-fetch.
- [ ] **Task 3.2.3:** Manejar estados de UI: *Loading Skeleton*, *Empty State*, *Error Boundary* y *Feedback Toast*.

### 3.3 Calidad, BDD y Automatización (QA Tasks)
- [ ] **Task 3.3.1:** Implementar pruebas unitarias para el servicio backend y controladores.
- [ ] **Task 3.3.2:** Implementar pruebas de integración/E2E para los escenarios Gherkin definidos en la especificación.
{% endif %}

---

## 4. 🤖 Reglas de Contexto para el Modelo LLM (AI Agent System Instructions)

> [!IMPORTANT]
> **Instrucciones de generación de código para Asistentes AI / Agentic Copilots:**
> Al implementar el código de esta sección/funcionalidad, debes seguir estrictamente los siguientes principios:

1. **Rendimiento y Optimización First:**
   - Para **Landing Pages**: Prohibido importar librerías pesadas para animaciones simples (preferir CSS nativo o Framer Motion atomizado). Usar siempre las etiquetas e imágenes optimizadas del framework (`<Image />` de Next.js/Astro) con dimensiones explícitas para evitar *Cumulative Layout Shift (CLS)*.
   - Para **Web Apps**: Tipado estricto en TypeScript sin uso de `any`. Separación total entre la lógica de red (hooks) y componentes presentacionales.
2. **Accesibilidad (A11y):**
   - Todos los elementos interactivos (botones, enlaces, modales) deben ser navegables por teclado e incluir atributos `aria-label`, `role` e imágenes con `alt` descriptivo.
3. **Manejo de Errores y Retroalimentación:**
   - En envíos de formularios o llamadas a API, mostrar retroalimentación visual inmediata (estados *Disabled*, *Loading Spinner*, *Success Message* o *Toast de Error*).
4. **Clean Code & SEO Semántico:**
   - Mantener una jerarquía correcta de encabezados (`<h1>` único por página, seguido por `<h2>`, `<h3>` ordenados).

---

## 5. 🔬 Criterios de Aceptación y Definición de Hecho (Definition of Done)

- [ ] {% if project.type == "Landing Page" %}Puntuación de Lighthouse > 90 en Performance, Accessibility, Best Practices y SEO.{% else %}Todos los escenarios Gherkin automatizados en verde.{% endif %}
- [ ] Diseño validado y responsivo en pantallas móviles (360px), tablets (768px) y escritorio (1440px+).
- [ ] Cero advertencias o errores de compilación TypeScript (`tsc --noEmit`).
- [ ] Code Review aprobado e integrado a la rama principal.