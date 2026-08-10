# Feature: {{ feature.id | upper }} - {{ feature.name | title }}

## 1. Descripción General
<!-- Extracto o resumen del PRD que contextualiza la funcionalidad -->
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

<!-- Puedes definir N escenarios para esta funcionalidad -->

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