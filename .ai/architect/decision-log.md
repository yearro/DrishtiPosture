# Registro de Decisiones de Arquitectura (ADR)

**Propósito:** Documentar las decisiones de arquitectura significativas tomadas durante el diseño y desarrollo del producto.

---

## Formato ADR

Cada entrada sigue el formato de [Architecture Decision Record](https://adr.github.io/):

```markdown
## ADR {{ num }}: {{ Título de la Decisión }}

### Status
[Proposed | Accepted | Rejected | Superseded]

### Context
¿Qué problema o situación motivó esta decisión? ¿Cuáles son las restricciones relevantes?

### Decision
¿Cuál es la decisión que se tomó? Describe la opción elegida de forma concreta.

### Consequences
¿Cuáles son las consecuencias (positivas y negativas) de esta decisión?

### Alternatives Consadas
### Alternative 1: [Nombre de la alternativa]
- **Descripción:** ...
- **Pros:** ...
- **Contras:** ...
- **Razón del rechazo:** ...

### Date
AAAA-MM-DD

### Owner
[Nombre / Rol del responsable]
```

---

## Registro de Decisiones

---

### ADR 1: {{ título de la primera decisión }}

### Status
[Accepted]

### Context
[Descripción del contexto]

### Decision
[Descripción de la decisión]

### Consequences
- **Positivas:** [Lista de consecuencias positivas]
- **Negativas:** [Lista de consecuencias negativas]

### Alternatives Considered
### Alternative 1: [Nombre]
- **Description:** [Descripción]
- **Pros:** [Ventajas]
- **Cons:** [Desventajas]
- **Rejection Reason:** [Razón por la que no se eligió]

### Date
YYYY-MM-DD

### Owner
[Nombre]

---

## Cómo Usar Este Documento

1. Antes de tomar una decisión de arquitectura importante, crea una nueva entrada ADR con Status `Proposed`.
2. Tras la aprobación, cambia el Status a `Accepted`.
3. Si la decisión es revertida, cámbialo a `Rejected` y documenta la nueva decisión en un ADR posterior.
4. Si una decisión queda obsoleta por otra nueva, marca el ADR como `Superseded` y referencia el ADR que la reemplaza.

---

## Índice de Decisiones

| ADR | Título | Status | Fecha | Owner |
|---|---|---|---|---|
| ADR 1 | [Título] | Accepted | YYYY-MM-DD | [Nombre] |