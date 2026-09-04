# Ciclo de Vida de Estados de GitHub Issues (AIDD)

Este documento define el ciclo de vida oficial y las etiquetas de estado de **GitHub Issues** dentro del desarrollo guiado por IA (AIDD - AI-Driven Development).

---

## Diagrama de Transición de Estados

```
[Inicio]
   │
   ▼
draft-architect
   │ (Escenarios Gherkin redactados)
   ▼
architect-done
   │ (Plan de implementación generado)
   ▼
builder-planned
   │ (Inicio de codificación)
   ▼
builder-implementing
   │ (Código fuente e implementación listos)
   ▼
builder-done
   │ (Inicio de desarrollo de tests)
   ▼
craftsman-testing
   │ (Pruebas unitarias ejecutadas con éxito)
   ▼
craftsman-tested
   │ (Documentación técnica y STRUCTURE.md)
   ▼
craftsman-documented
   │ (Cierre definitivo de la incidencia)
   ▼
closed
```

---

## Definición de Estados y Agentes Responsables

| Estado | Agente Responsable | Descripción de la Fase | Salida Requerida para Transición |
|---|---|---|---|
| `draft-architect` | **Architect → Features** | Redacción inicial del issue de funcionalidad. | Borrador con user story y escenarios preliminares. |
| `architect-done` | **Architect → Features** | Especificación Gherkin/BDD y criterios de aceptación listos. | Issue actualizado con plantilla Gherkin completa y enlace en `PRD.md`. |
| `builder-planned` | **Builder → Plan** | Plan de implementación diseñado y revisado. | Archivo `docs/features/{{ feature.slug }}/plan.md` creado y enlazado. |
| `builder-implementing` | **Builder → Implement** | Ejecución activa del código fuente y componentes. | Código fuente en `src/` en proceso de desarrollo. |
| `builder-done` | **Builder → Implement** | Código fuente e implementación de UI/lógica completada. | Código en `src/` listo, sin errores de compilación (`tsc --noEmit`). |
| `craftsman-testing` | **Craftsman → Test** | Desarrollo y ejecución de pruebas unitarias nativas. | Tests creados en la estructura del proyecto. |
| `craftsman-tested` | **Craftsman → Test** | Tests finalizados con cobertura suficiente (≥80% branch coverage). | Comentario en GitHub Issue con resumen de ejecución de pruebas. |
| `craftsman-documented` | **Craftsman → Document** | Actualización de documentación técnica y arquitectura. | Actualización de `docs/STRUCTURE.md` o JSDoc. |
| `closed` | **Lead / Automation** | Cierre formal de la incidencia. | Issue cerrado (`closes #<issue-number>`). |

---

## Reglas de Transición de Etiquetas

1. **Unicidad de Estado:** Un issue debe tener **exactamente una etiqueta de estado** activa a la vez. Al aplicar una nueva etiqueta de la máquina de estados, debe eliminarse la etiqueta anterior.
2. **Sin Saltos de Fase:** Ningún agente debe mover un issue a un estado sin haber completado los requisitos de la fase previa.
3. **Cierre de Incidencias:** Únicamente el Craftsman o el responsable de QA debe cerrar el issue tras completar la prueba y documentación (`craftsman-documented` ➔ `closed`).
