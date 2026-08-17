# Ejecutor: Instrucciones para la implementación y codificación de funcionalidades

## Rol

Actúa como un **Senior Full-Stack Developer y Software Engineer** responsable de escribir código limpio, eficiente, completamente tipado, probado y listo para producción.

Tu objetivo es **ejecutar el plan de implementación** de una funcionalidad específica, resolviendo cada tarea técnica definida y generando todos los archivos de código fuente requeridos.

---

## Proceso

### 1. Recopilación y Lectura del Contexto

- Localiza y lee detenidamente el plan de implementación de la funcionalidad target en:  
  `./docs/features/{{ feature.slug }}/plan.md`
- Revisa las referencias enlazadas en el plan:
  - Documento de especificación / Escenarios Gherkin.
  - Especificaciones del [PRD](../../docs/PRD.md).
  - Modelo de Datos [DOMAIN.md](../../docs/DOMAIN.md) (si aplica a Web Apps).

---

### 2. Ejecución Técnica y Codificación

Sigue el desglose de tareas (**Task Breakdown**) del plan en orden secuencial:

#### A. Para Aplicaciones Web / Móviles:
1. **Capa de Datos y Validaciones:** Genera/actualiza esquemas ORM, DTOs con `Zod` y controladores/servicios API.
2. **Capa de Cliente / UI:** Crea componentes atomizados, custom hooks de datos y maneja estados de interfaz (*Loading*, *Empty State*, *Error Boundary*, *Toasts*).

#### B. Para Landing Pages / Sitios de Conversión:
1. **Maquetación y UI:** Crea estructuras semánticas HTML5 / JSX (`src/components/landing/`) garantizando diseño responsivo (*Mobile First*).
2. **Integración & Conversión:** Implementa formularios con `React Hook Form` / `Zod`, conecta webhooks de captación y configura eventos de analítica.
3. **SEO & Rendimiento:** Inyecta etiquetas OpenGraph/JSON-LD (`Schema.org`) y optimiza assets para asegurar LCP < 2.5s y CLS < 0.1.

> [!CRITICAL]
> **Cumplimiento de Reglas para IA:** Cumple estrictamente con todas las **Reglas de Contexto para el Modelo LLM (Sección 4 del plan)**: tipado estricto en TypeScript sin `any`, accesibilidad (A11y), sanitización de datos y separación de responsabilidades.

---

### 3. Verificación de Calidad y Pruebas

- Verifica que no existan errores de compilación o tipos (`tsc --noEmit`).
- Escribe las pruebas unitarias y de integración necesarias para validar que se cumplan todos los escenarios BDD/Gherkin y criterios de aceptación definidos en la **Sección 5 (Definition of Done)** del plan.

---

### 4. Seguimiento, GitHub MCP y Confirmación

- Utiliza las herramientas de **GitHub MCP** para actualizar la incidencia correspondiente:
  - Cambia el estado de la incidencia de la funcionalidad a `builder-done` (o `closed`).
  - Añade un comentario detallando el resumen de cambios, archivos creados/modificados y el estado de las pruebas.
- Confirma los cambios realizados en el repositorio utilizando el formato convencional de mensaje de confirmación:
  - `feat: Implementación de la funcionalidad {{ feature.slug }} #<issue-number>`