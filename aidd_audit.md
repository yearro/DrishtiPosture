# Auditoría y Propuestas de Mejora: Sistema `.ai/` (AIDD)

## Visión General del Sistema

El sistema AIDD (AI-Driven Development) en `.ai/` define un flujo de trabajo en 3 fases para desarrollar software guiado por IA:

```
Architect → Builder → Craftsman
```

Cada fase tiene un rol, documentos de entrada, instrucciones de proceso, templates de salida y un paso de seguimiento en GitHub. Es un sistema bien concebido, pero con varios problemas de consistencia, rutas rotas y gaps funcionales que se detallan a continuación.

---

## ⚠️ Problemas Detectados

### 1. Desincronización crítica: `AIDD.md` vs archivos reales

El archivo [AIDD.md](file:///Users/yeriarmenta/work-space/VibeCoding/DrishtiPosture/.ai/AIDD.md) es el "mapa" del sistema, pero referencia archivos que **no existen** con nombres incorrectos:

| Referencia en AIDD.md | Archivo real en disco |
|---|---|
| `.ai/builder/feature-plan.instructions.md` | `.ai/builder/plan.builder.instructions.md` |
| `.ai/builder/feature-plan.template.md` | `.ai/builder/templates/plan.template.md` |
| `.ai/builder/implementation.instructions.md` | `.ai/builder/implement.instructions.md` |
| `.ai/builder/rules` | No existe — está en `.agents/rules/` |
| `src/test` (output Craftsman) | No existe convención definida |

---

### 2. Etiqueta de estado inconsistente entre Architect y Builder

- `features.instructions.md` (Paso 5) define el estado inicial como `'draft-architect'`
- `prd.instructions.md` (Paso 4) define el estado inicial como `'draft-architect'`
- `plan.builder.instructions.md` (Paso 2) busca issues en estado `"definido"` → **no coincide** con ninguna etiqueta definida arriba
- `implement.instructions.md` cierra el issue como `builder-done`

**El ciclo de estados completo nunca se definió explícitamente en ningún archivo.**

---

### 3. El Craftsman carece de seguimiento completo

- `test.template.md` no tiene un Paso de Seguimiento (GitHub MCP).
- El archivo termina abruptamente en la línea 62 (patrón AAA incompleto, sin conclusión del proceso).
- No existe un paso que cambie el estado del issue a `craftsman-tested` en `test.template.md`.
- `document.instructions.md` sí tiene seguimiento (estados `craftsman-documenting` y `craftsman-documented`), pero el template de tests no.

---

### 4. Ciclo de vida de issues incompleto y no documentado

Actualmente el flujo de estados inferido es:

```
(No definido) → draft-architect → (definido?) → builder-planned → builder-done → craftsman-tested → craftsman-documented
```

Pero:
- `"definido"` nunca se crea como etiqueta
- Falta el estado `builder-implementing` (cuando el Builder está codificando)
- El salto de `builder-done` a `craftsman-tested` asume que el craftsman toma el issue automáticamente

---

### 5. `features.template.md` está incompleto

El archivo [features.template.md](file:///Users/yeriarmenta/work-space/VibeCoding/DrishtiPosture/.ai/architect/templates/features.template.md) tiene solo 41 líneas y **corta abruptamente** — faltan los bloques de:
- `4.2 Escenarios Alternativos`
- `4.3 Escenarios de Error y Validación`
- `4.4 Esquema del Escenario (@data-driven)`
- La sección 5 de especificación técnica mencionada en `features.instructions.md`

---

### 6. `prd.instructions.md` duplica el paso de seguimiento de `features.instructions.md`

Ambos archivos tienen un **Paso de Seguimiento** con las mismas instrucciones de creación de issues. Esto significa que si se usan los dos prompts, se crearán issues duplicados.

---

### 7. Instrucción de inicio genérica en `model.instructions.md`

La instrucción final dice:
> `Por favor, analiza el archivo de especificación [Nombre_o_Ruta_Especificacion.md]`

El placeholder `[Nombre_o_Ruta_Especificacion.md]` nunca se define — el LLM no sabe qué archivo leer.

---

### 8. El paso de seguimiento en `features.instructions.md` tiene un error tipográfico de formato

```markdown
### **Paso 5: **Seguimiento**
```
Tiene un asterisco de cierre doble antes de "Seguimiento", lo que rompe el formato Markdown.

---

## ✅ Propuestas de Mejora

### P0 — Crítico (Rompen el flujo)

#### A. Definir el ciclo de vida de estados en un archivo central

Crear `.ai/LIFECYCLE.md` que documente todas las etiquetas de GitHub y su orden:

```
draft-architect → architect-done → builder-planned → builder-implementing → builder-done → craftsman-testing → craftsman-tested → craftsman-documented → closed
```

#### B. Corregir `AIDD.md` con los nombres reales de archivos

Actualizar todas las referencias a nombres correctos para que sirva como índice confiable.

#### C. Completar `features.template.md` con los escenarios faltantes

Añadir los bloques `4.2`, `4.3`, `4.4` y la sección 5 de especificación técnica que ya describe `features.instructions.md`.

#### D. Corregir la búsqueda de estado en `plan.builder.instructions.md`

Cambiar `"definido"` por `"architect-done"` (el estado real que dejará el Architect).

#### E. Añadir el Paso de Seguimiento en `test.template.md` (Craftsman)

El archivo de tests debe incluir el paso que:
- Cambia el estado a `craftsman-testing` al iniciar.
- Cambia el estado a `craftsman-tested` al finalizar.
- Publica un comentario con resultados de cobertura.

---

### P1 — Importante (Mejoran claridad y robustez)

#### F. Separar el paso de seguimiento del PRD y las Features

El `prd.instructions.md` NO debe crear los issues de features — eso es responsabilidad exclusiva de `features.instructions.md`. El PRD solo debe:
1. Generar el documento `docs/PRD.md`.
2. Hacer un commit y actualizar el `README.md`.

#### G. Resolver el placeholder en `model.instructions.md`

Reemplazar la instrucción de inicio por:

```markdown
Por favor, analiza el archivo [PRD](../../docs/PRD.md) ya generado, extrae las entidades del dominio e inicia el proceso interactivo.
```

#### H. Añadir instrucción de inicio en `plan.builder.instructions.md` e `implement.instructions.md`

Ambos carecen de una sección `### INSTRUCCIÓN DE INICIO` que indique cómo activar el agente. `features.instructions.md` sí la tiene y sirve de referencia.

#### I. Corregir tipografía en `features.instructions.md` Paso 5

```markdown
### **Paso 5: Seguimiento**
```

---

### P2 — Nice to Have (Mejoran la experiencia)

#### J. Añadir un `README.md` en la carpeta `.ai/`

Un archivo que explique el flujo completo con un diagrama de cómo se conectan todos los agentes, qué input necesita cada uno y qué output produce. Reemplazar el `AIDD.md` actual o expandirlo significativamente.

#### K. Añadir una instrucción de commit convencional al `implement.instructions.md`

Actualmente dice `builder-done` pero el formato del commit difiere del resto. Unificar en:
```
feat: Implementación de la funcionalidad {{ feature.slug }} closes #<issue-number>
```

#### L. Añadir la sección de criterios de calidad al test template

`document.instructions.md` tiene una sección `## Criterios de Calidad` al final. `test.template.md` debería tener su equivalente (cobertura mínima, convenciones de nombrado, prohibiciones).

---

## Resumen de Cambios Propuestos por Archivo

| Archivo | Tipo | Acción | Prioridad |
|---|---|---|---|
| [`AIDD.md`](file:///Users/yeriarmenta/work-space/VibeCoding/DrishtiPosture/.ai/AIDD.md) | Fix | Corregir rutas y nombres de archivos | P0 |
| [`architect/features.template.md`](file:///Users/yeriarmenta/work-space/VibeCoding/DrishtiPosture/.ai/architect/templates/features.template.md) | Fix | Completar secciones 4.2, 4.3, 4.4 y 5 | P0 |
| [`builder/plan.builder.instructions.md`](file:///Users/yeriarmenta/work-space/VibeCoding/DrishtiPosture/.ai/builder/plan.builder.instructions.md) | Fix | Cambiar `"definido"` a `"architect-done"` | P0 |
| [`craftsman/test.template.md`](file:///Users/yeriarmenta/work-space/VibeCoding/DrishtiPosture/.ai/craftsman/test.template.md) | Fix | Añadir Paso 4 de Seguimiento GitHub MCP | P0 |
| [`architect/features.instructions.md`](file:///Users/yeriarmenta/work-space/VibeCoding/DrishtiPosture/.ai/architect/features.instructions.md) | Fix | Corregir tipografía Paso 5 | P0 |
| [`.ai/LIFECYCLE.md`](file:///Users/yeriarmenta/work-space/VibeCoding/DrishtiPosture/.ai/) | New | Crear archivo de ciclo de vida de estados | P0 |
| [`architect/prd.instructions.md`](file:///Users/yeriarmenta/work-space/VibeCoding/DrishtiPosture/.ai/architect/prd.instructions.md) | Refactor | Eliminar la creación de issues (moverla a features) | P1 |
| [`architect/model.instructions.md`](file:///Users/yeriarmenta/work-space/VibeCoding/DrishtiPosture/.ai/architect/model.instructions.md) | Fix | Reemplazar placeholder genérico en instrucción de inicio | P1 |
| [`builder/implement.instructions.md`](file:///Users/yeriarmenta/work-space/VibeCoding/DrishtiPosture/.ai/builder/implement.instructions.md) | Improve | Añadir `### INSTRUCCIÓN DE INICIO` | P2 |
| [`craftsman/test.template.md`](file:///Users/yeriarmenta/work-space/VibeCoding/DrishtiPosture/.ai/craftsman/test.template.md) | Improve | Añadir sección de Criterios de Calidad | P2 |
