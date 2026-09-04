# Ciclo de Vida de Issues (GitHub Labels)

Este documento define el orden y significado de todas las etiquetas de estado que se asignan a los issues de GitHub durante el ciclo de vida de una funcionalidad en el sistema AIDD.

---

## Flujo de Estados

```
draft-architect → architect-done → builder-planned → builder-implementing → builder-done → craftsman-testing → craftsman-tested → craftsman-documented → closed
```

---

## Descripción de Etiquetas

| Etiqueta | Fase | Responsable | Descripción |
|---|---|---|---|
| `draft-architect` | Architect | Architect | Issue creado con descripción inicial. El Architect está trabajando en la especificación Gherkin y el plan de dominio. |
| `architect-done` | Architect | Architect | La especificación BDD está completa y documentada en el issue. Listo para planificación por el Builder. |
| `builder-planned` | Builder | Builder | El plan de implementación `docs/features/{{ slug }}/plan.md` ha sido generado y vinculado al issue. |
| `builder-implementing` | Builder | Builder | El Builder está codificando activamente la funcionalidad. El plan está en ejecución. |
| `builder-done` | Builder | Builder | La implementación está completa, la compilación pasa sin errores y las pruebas unitarias iniciales están en verde. |
| `craftsman-testing` | Craftsman | Craftsman | El Craftsman está escribiendo los tests unitarios de cobertura completa. |
| `craftsman-tested` | Craftsman | Craftsman | Todos los tests unitarios están escritos, pasan y la cobertura cumple el umbral mínimo definido (≥ 80%). |
| `craftsman-documented` | Craftsman | Craftsman | La documentación técnica (`STRUCTURE.md`, docstrings, contratos de API) está completa y sincronizada. |
| `closed` | — | Cualquiera | La funcionalidad está completamente entregada, documentada y en producción. |

---

## Transiciones Válidas

Cada agente es responsable de actualizar la etiqueta al inicio y al cierre de su trabajo:

### Architect
```
Inicio del trabajo  → Añade: draft-architect
Al completar specs  → Reemplaza con: architect-done
```

### Builder (Planificador)
```
Toma el issue       → Busca: architect-done
Al generar el plan  → Reemplaza con: builder-planned
```

### Builder (Ejecutor / Implementador)
```
Inicio de código    → Reemplaza con: builder-implementing
Al completar código → Reemplaza con: builder-done
```

### Craftsman (Tester)
```
Inicio de tests     → Reemplaza con: craftsman-testing
Al completar tests  → Reemplaza con: craftsman-tested
```

### Craftsman (Documentador)
```
Inicio de docs      → (mantiene craftsman-tested, añade comentario)
Al completar docs   → Reemplaza con: craftsman-documented → cierra issue
```

---

## Notas

- Solo debe existir **una etiqueta de estado** activa por issue en cada momento. Al asignar una nueva, siempre remover la anterior.
- La etiqueta `draft-architect` es la única que el Architect crea directamente desde GitHub MCP al crear el issue.
- Las demás etiquetas deben existir previamente en el repositorio. Crearlas con `gh label create` si no existen.
