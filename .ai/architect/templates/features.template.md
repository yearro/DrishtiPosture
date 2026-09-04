# Feature: {{ feature.id | upper }} - {{ feature.name | title }}

## 1. Descripción General
{{ feature.description_from_prd }}

---

## 2. Historia de Usuario (User Story)
- **Como:** {{ feature.user_role }}
- **Quiero:** {{ feature.action_goal }}
- **Para:** {{ feature.business_value }}

---

## 3. Precondiciones y Supuestos
- [ ] {{ feature.precondition_1 }}
- [ ] {{ feature.precondition_2 }}

---

## 4. Criterios de Aceptación (Escenarios BDD / Gherkin)

### 4.1 Escenarios Exitosos (Camino Feliz / Happy Paths)
```gherkin
@feature-{{ feature.id | lower }} @happy-path @priority-p0
Escenario: {{ feature.happy_path.title }}
  Dado {{ feature.happy_path.given }}
  Y {{ feature.happy_path.and_given }}
  Cuando {{ feature.happy_path.when }}
  Entonces {{ feature.happy_path.then }}

{% for scenario in feature.additional_happy_paths %}
@feature-{{ feature.id | lower }} @happy-path @priority-p1
Escenario: {{ scenario.title }}
  Dado {{ scenario.given }}
  Cuando {{ scenario.when }}
  Entonces {{ scenario.then }}
{% endfor %}
```

### 4.2 Escenarios Alternativos
```gherkin
@feature-{{ feature.id | lower }} @alternative @priority-p1
{% for scenario in feature.alternative_paths %}
Escenario: {{ scenario.title }}
  Dado {{ scenario.given }}
  Cuando {{ scenario.when }}
  Entonces {{ scenario.then }}
{% endfor %}
```

### 4.3 Escenarios de Error y Validación
```gherkin
@feature-{{ feature.id | lower }} @error-handling @priority-p0
{% for scenario in feature.error_paths %}
Escenario: {{ scenario.title }}
  Dado {{ scenario.given }}
  Cuando {{ scenario.when }}
  Entonces {{ scenario.then }}
  Y {{ scenario.and_then }}
{% endfor %}
```

### 4.4 Esquema del Escenario — Casos Parametrizados *(si aplica)*
```gherkin
@feature-{{ feature.id | lower }} @data-driven
Esquema del escenario: {{ feature.data_driven.title }}
  Dado {{ feature.data_driven.given }}
  Cuando {{ feature.data_driven.when }} con "<{{ feature.data_driven.param_1 }}>"
  Entonces {{ feature.data_driven.then }} "<{{ feature.data_driven.expected }}>"

  Ejemplos:
    | {{ feature.data_driven.param_1 }} | {{ feature.data_driven.expected }} |
    | {{ feature.data_driven.example_1_input }} | {{ feature.data_driven.example_1_output }} |
    | {{ feature.data_driven.example_2_input }} | {{ feature.data_driven.example_2_output }} |
```

---

## 5. Especificación Técnica

### 5.1 Controles de UI y Estados de Interfaz

| Elemento | Tipo | Estado / Comportamiento |
|---|---|---|
| {{ feature.ui.control_1 }} | {{ feature.ui.type_1 }} | {{ feature.ui.behavior_1 }} |
| {{ feature.ui.control_2 }} | {{ feature.ui.type_2 }} | {{ feature.ui.behavior_2 }} |

**Estados de UI requeridos:** `loading` · `empty` · `error` · `success`

### 5.2 Flujo de Pantalla *(Mermaid — si aplica)*

```mermaid
flowchart TD
    A[{{ feature.flow.start }}] --> B{{"{{ feature.flow.decision }}"}}
    B -- Sí --> C[{{ feature.flow.success_step }}]
    B -- No --> D[{{ feature.flow.error_step }}]
```

### 5.3 Endpoints API asociados *(si aplica)*

| Método | Ruta | Descripción |
|---|---|---|
| `{{ feature.api.method }}` | `{{ feature.api.path }}` | {{ feature.api.description }} |

### 5.4 Eventos de Telemetría *(si aplica)*

| Evento | Trigger | Parámetros |
|---|---|---|
| `{{ feature.analytics.event }}` | {{ feature.analytics.trigger }} | {{ feature.analytics.params }} |

---

## 6. Referencias

- 📋 PRD: [Sección {{ feature.prd_section }}](../../docs/PRD.md#{{ feature.prd_anchor }})
- 📌 Issue GitHub: `[Feat_{{ feature.priority }}: {{ feature.name }}]({{ issue_url }})`
- 📄 Plan de Implementación: [`docs/features/{{ feature.slug }}/plan.md`](../../docs/features/{{ feature.slug }}/plan.md)