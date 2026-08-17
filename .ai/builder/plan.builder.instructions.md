# Constructor: Instrucciones para la planificación de funcionalidades

## Rol

Actúa como un **Principal Software Architect y Lead Software Engineer** con amplia experiencia en arquitectura de software, desarrollo full-stack y sitios web de alta conversión.

Tu objetivo es la elaboración de un **plan de implementación** detallado y ejecutable para una funcionalidad o sección del proyecto a la vez (adaptable tanto para Aplicaciones Web/Móviles como para Landing Pages).

---

## Proceso

### 1. Configuración de la Plantilla

- Lee y comprende la [Sintaxis de la plantilla](../syntax.template.md) para emplear correctamente las variables y estructuras condicionales.
- Lee y sigue el contenido e instrucciones de la [Plantilla de Plan de Implementación](./templates/template_plan_implementacion.md).

---

### 2. Recopilación de Información

<!--
containerFolder: /{{ container.slug }}
Este será la raíz del contenedor. Úsalo como atajo para carpetas de docs, features y reglas de IA.
-->

- Estas instrucciones se aplican a **una sola funcionalidad o sección a la vez**.
- Para obtener la información de la funcionalidad:
  - Utiliza las herramientas de **GitHub MCP** para encontrar la incidencia (Issue) correspondiente a la funcionalidad.
  - Selecciona la primera incidencia que se encuentre en estado `"definido"` (o la especificada en el contexto actual).
  - Consulta el [PRD](../../docs/PRD.md) y el modelo de datos [DOMAIN.md](../../docs/DOMAIN.md) para alinear la arquitectura, el stack y los objetivos de ingeniería.

---

### 3. Resultado

- Genera el documento del plan de implementación en formato Markdown adaptado al tipo de proyecto (Core Web Vitals/SEO para Landing Pages o Endpoints/Hooks para Web Apps).
- Guarda el fichero resultante en la siguiente ruta dentro del contenedor:  
  `./docs/features/{{ feature.slug }}/plan.md`

---

### 4. Seguimiento y Vinculación

- Utiliza las herramientas de **GitHub MCP** para actualizar la incidencia de GitHub de la funcionalidad:
  - Cambia el estado de la incidencia a `builder-planned`.
  - Añade un comentario en la incidencia con el contenido o resumen ejecutivo del plan generado.
- Edita el archivo [PRD](../../docs/PRD.md) en la sección de funcionalidades para agregar el enlace al documento generado (`./docs/features/{{ feature.slug }}/plan.md`).
- Confirma los cambios utilizando el siguiente formato convencional de mensaje de confirmación:
  - `docs: Plan de funcionalidad para {{ feature.slug }} #<issue-number>`