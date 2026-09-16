# Plan: Priorización y Corrección de `.ai/architect/`

## Contexto
El diagnóstico de `.ai/architect/` (3 instrucciones + 3 plantillas) reveló gaps en generalidad, cero suposiciones, completitud y consistencia inter-archivos. Este plan prioriza y ordena las 7 ajustes identificados más 2 elementos nuevos recomendados, en orden de criticidad para que los agentes funcionen correctamente.

## Priorización

### Fase 1 — Bloqueantes (sin esto los agentes fallan)

#### P1. Crear archivo de sintaxis de referencia (`syntax.template.md`)
- **Ubicación:** `.ai/syntax.template.md` (o `.ai/architect/syntax.template.md` según convención del repo)
- **Contenido:** Definir la sintaxis/formato esperada del "Documento de Especificación Técnica/Funcional" que alimenta a los 3 agentes. Incluir: estructura de secciones, formato de funcionalidades, formato de entidades/dominio, campos obligatorios vs opcionales.
- **Razón:** Todos los archivos referencian `../syntax.template.md` y no existe. Es el bloqueante más crítico.
- **Validación:** Que todos los `[...]` referenciados en `.ai/architect/*.md` tengan archivo existente.

#### P2. Crear contrato de variables (`domain.schema.md`)
- **Ubicación:** `.ai/architect/domain.schema.md`
- **Contenido:** Esquema de todas las variables `{{ ... }}` usadas en las 3 plantillas. Para cada variable: nombre, tipo, obligatoriedad (required/optional), formato esperado, valores válidos (si aplica), ejemplo.
  - `producto`: nombre (string, req), tipo (enum: Web/Móvil/API/CLI/Escritorio/Other, req), version, pm_lead, tech_lead, personas[], modulos[], fecha_mvp, fecha_beta, fecha_ga
  - `model`: name, table_name, domain_module, db_engine, storage_strategy, description, fields[], soft_delete, pk_field, unique_keys[], indexes[], relationships[]
  - `feature`: id, name, description_from_prd, user_role, action_goal, business_value, preconditions[], happy_path{}, additional_happy_paths[], alternative_paths[], error_paths[], data_driven{}, ui[], flow{}, api{}, analytics{}, prd_section, prd_anchor, priority, slug, issue_url
- **Razón:** Sin contrato, los agentes no saben qué deben preguntar ni en qué orden.
- **Validación:** Que cada variable en `{{ ... }}` dentro de las plantillas tenga entrada en el schema.

#### P3. Crear `arch-diagram.template.md`
- **Ubicación:** `.ai/architect/templates/arch-diagram.template.md`
- **Contenido:** Plantilla Mermaid para diagrama de contexto (caja exterior = sistema, actores externos, servicios principales) y diagrama de componentes (internos). Placeholders para `{{ producto.nombre }}`, `{{ producto.tipo }}`.
- **Razón:** Ningún documento cubre diagramas de arquitectura a nivel de sistema. Es un entregable estándar en cualquier PRD técnico.

### Fase 2 — Correcciones de principio (cero suposiciones y generalidad)

#### P4. Corregir sesgo tecnológico en `prd.instructions.md`
- **Archivo:** `.ai/architect/prd.instructions.md`
- **Cambios:**
  - Línea 27: `OAuth2/OIDC, JWT con Cookies HttpOnly, RBAC, API Keys, mTLS o Device Code Flow` → `Protocolo de identidad apropiado para la plataforma (OAuth2/OIDC, JWT, Session, Device Code Flow) y esquema de autorización correspondiente`
  - Línea 28: `Redis, Zustand, IndexedDB` → `Capa de caché/distribuida o estado cliente según la plataforma`
  - Línea 30: `OpenTelemetry, Sentry, Datadog` → `Herramientas de trazabilidad, métricas y rastreo de errores`
- **Razón:** Estas tecnologías específicas violan el principio de neutralidad y asumen stack particular.

#### P5. Corregir verbos de interrogación en instrucciones
- **Archivos:** `prd.instructions.md` línea 20, `features.instructions.md` línea 18
- **Cambios:**
  - `prd.instructions.md:20`: `Identifica el tipo de producto` → `Determina el tipo de producto preguntando al usuario. Si la especificación no lo indica, DETENTE y pregunta con opciones cerradas: ¿Web / Móvil / API / CLI / Escritorio / Otro?`
  - `features.instructions.md:18`: `extrae la lista completa de funcionalidades` → `identifica o solicita la lista completa de funcionalidades. Si la especificación no las contiene, DETENTE y pregunta al usuario: ¿Cuáles son las funcionalidades principales? Ofrece 2-3 sugerencias basadas en el tipo de producto.`
- **Razón:** "Identifica" y "extrae" asumen que la info existe; deben obligar a preguntar.

### Fase 3 — Mejoras de calidad

#### P6. Estandarizar Gherkin a inglés en `features.template.md`
- **Archivo:** `.ai/architect/templates/features.template.md`
- **Cambios:** `Escenario` → `Scenario`, `Dado` → `Given`, `Cuando` → `When`, `Entonces` → `Then`
- **Razón:** Compatible con estándares BDD (Cucumber, Gherkin spec) y parsers automáticos.

#### P7. Crear `api-contract.template.md`
- **Ubicación:** `.ai/architect/templates/api-contract.template.md`
- **Contenido:** Plantilla para especificación de endpoints: método, ruta, descripción, parámetros (query/body/header), códigos de respuesta (2xx/4xx/5xx), formato de error (RFC 7807), autenticación requerida, rate limit.
- **Razón:** El PRD template menciona API specs (línea 111) pero no existe plantilla dedicada.

### Fase 4 — Nice to have

#### P8. Crear `decision-log.md`
- **Ubicación:** `.ai/architect/decision-log.md` o dentro de la estructura de docs
- **Contenido:** Formato ADR (Architecture Decision Record): título, contexto, decisión, alternativas evaluadas, consecuencias, fecha, dueño.

#### P9. Crear `review-checklist.md`
- **Ubicación:** `.ai/architect/review-checklist.md`
- **Contenido:** Checklist de validación del PRD generado: coherencia interna, cobertura de NFRs, ausencia de tecnologías hardcodeadas, completitud de requisitos funcionales, etc.

## Archivos a modificar
| Archivo | Tipo | Fase |
|---------|------|------|
| `.ai/syntax.template.md` | **Crear nuevo** | 1 |
| `.ai/architect/domain.schema.md` | **Crear nuevo** | 2 |
| `.ai/architect/templates/arch-diagram.template.md` | **Crear nuevo** | 1 |
| `.ai/architect/prd.instructions.md` | Modificar | 2 |
| `.ai/architect/features.instructions.md` | Modificar | 2 |
| `.ai/architect/templates/features.template.md` | Modificar | 3 |
| `.ai/architect/templates/api-contract.template.md` | **Crear nuevo** | 3 |
| `.ai/architect/decision-log.md` | **Crear nuevo** | 4 |
| `.ai/architect/review-checklist.md` | **Crear nuevo** | 4 |

## Validación
- [ ] Todos los `[...]` en instrucciones apuntan a archivos existentes
- [ ] Todas las variables `{{ ... }}` en plantillas tienen entrada en `domain.schema.md`
- [ ] Ningún archivo de instrucción contiene tecnología hardcodeada como "recomendación estándar"
- [ ] Los agentes pueden funcionar sin conocer el proyecto específico (test de neutralidad)
- [ ] Gherkin generado es parsable por herramientas estándar (Cucumber)
