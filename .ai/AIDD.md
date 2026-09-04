# AI-Driven Development (AIDD)

Este documento describe el sistema de desarrollo guiado por IA del proyecto. Define los roles, documentos de entrada, instrucciones y artefactos de salida para cada fase del ciclo de vida de una funcionalidad.

> Para consultar el flujo formal y la máquina de estados de GitHub Issues, lee [LIFECYCLE.md](./LIFECYCLE.md).

---

## Architect

Responsable de definir el dominio del problema, el modelo de datos, los requisitos de producto y los escenarios de aceptación (BDD/Gherkin) antes de que comience cualquier implementación.

### Input:
- `.ai/architect/prd.instructions.md`: Instrucciones para generar el PRD del proyecto.
- `.ai/architect/templates/prd.template.md`: Plantilla con la estructura esperada del PRD.
- `.ai/architect/features.instructions.md`: Instrucciones para desglosar y documentar funcionalidades con escenarios Gherkin y crear issues en GitHub.
- `.ai/architect/templates/features.template.md`: Plantilla Gherkin/BDD para documentar una funcionalidad en GitHub.
- `.ai/architect/model.instructions.md`: Instrucciones para generar el Documento de Dominio de forma interactiva.
- `.ai/architect/templates/model.template.md`: Plantilla con la estructura esperada del Documento de Dominio.
- `.ai/syntax.template.md`: Estándar de sintaxis de plantillas (variables `{{ }}`, directivas `{# #}`) usado por todos los agentes.

### Output:
- `docs/PRD.md`: Documento de Requisitos del Producto (PRD).
- `docs/DOMAIN.md`: Documento de Dominio con entidades, relaciones y diagrama ERD en Mermaid.
- `github.com/issues`: Issues de GitHub por funcionalidad marcados con etiqueta `architect-done`.

---

## Builder

Responsable de planificar e implementar el código de cada funcionalidad tomando como base los issues del Architect y los documentos de especificación.

### Input:
- `.ai/builder/plan.builder.instructions.md`: Instrucciones para generar el plan de implementación de una funcionalidad.
- `.ai/builder/templates/plan.template.md`: Plantilla con la estructura de un plan de implementación.
- `.ai/builder/implement.instructions.md`: Instrucciones para ejecutar el plan e implementar el código fuente.
- `.agents/rules/`: Reglas técnicas de escritura y estilo de código (TypeScript, componentes, accesibilidad, etc.).

### Output:
- `docs/features/{{ feature.slug }}/plan.md`: Plan de implementación detallado por funcionalidad (estado `builder-planned`).
- `src/`: Código fuente del sistema (estado `builder-done`).

---

## Craftsman

Responsable de escribir pruebas unitarias nativas y documentación técnica una vez que el Builder ha completado la implementación.

### Input:
- `.ai/craftsman/test.template.md`: Instrucciones para diseñar e implementar tests unitarios de una funcionalidad.
- `.ai/craftsman/document.instructions.md`: Instrucciones para documentar el código fuente y actualizar la estructura del sistema.
- `.agents/rules/`: Reglas técnicas de escritura y estilo de pruebas.

### Output:
- `src/**/__tests__/`: Tests unitarios y de integración (estado `craftsman-tested`).
- `docs/STRUCTURE.md`: Documento de Estructura que describe la arquitectura del sistema, patrones de diseño y organización (estado `craftsman-documented`).

---

## Design *(Opcional — solo para proyectos visuales)*

Carpeta de artefactos visuales generados durante el proceso de diseño de UI/UX. Su contenido varía según el tipo de proyecto.

| Tipo de Proyecto | Contenido |
|---|---|
| **Web App / Landing Page / Mobile** | Mockups, referencias de UI por sección/screen, guías de color y tipografía generadas por agentes de diseño. |
| **API / CLI / Librería / Backend** | ⚠️ **Vacía** — No aplica ningún artefacto visual. |

### Output:
- `.ai/design/{{ section.slug }}/`: Imágenes de referencia y mockups por sección o pantalla del proyecto.