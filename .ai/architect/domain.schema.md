# Esquema de Variables del Sistema AIDD

**Versión:** 1.0.0  
**Propósito:** Contrato completo de todas las variables `{{ ... }}` utilizadas en las plantillas del agente Architect. Cada variable documentada aquí debe ser proporcionada o solicitada al usuario antes de la generación de cualquier documento.

---

## 1. Variable Raíz: `producto`

Representa el producto o sistema a documentar.

| Variable | Tipo | Obligatoria | Formato / Valores válidos | Ejemplo |
|---|---|:---:|---|---|
| `producto.nombre` | string | ✅ Requerida | Nombre del producto (1-100 caracteres) | `"Gestión de Postura"` |
| `producto.tipo` | enum | ✅ Requerida | `Web` / `Móvil` / `API` / `CLI` / `Escritorio` / `Other` | `"Web"` |
| `producto.version` | string | Opcional | Semver | `"v1.0.0"` |
| `producto.pm_lead` | string | Opcional | Nombre del responsable de producto | `"María López"` |
| `producto.tech_lead` | string | Opcional | Nombre del responsable técnico | `"Carlos Ruiz"` |
| `producto.personas[]` | array | Opcional | Lista de arquetipos de usuario | — |
| `producto.personas[].nombre` | string | Opcional | Nombre de la persona | `"Admin"` |
| `producto.personas[].rol` | string | Opcional | Rol funcional | `"Administrador"` |
| `producto.personas[].descripcion` | string | Opcional | Perfil contextual | — |
| `producto.personas[].necesidades` | string | Opcional | Necesidades clave | — |
| `producto.modulos[]` | array | Opcional | Lista de módulos funcionales | — |
| `producto.modulos[].nombre` | string | Opcional | Nombre del módulo | `"Autenticación"` |
| `producto.fecha_mvp` | string | Opcional | Fecha estimada MVP | `"2026-12-01"` |
| `producto.fecha_beta` | string | Opcional | Fecha estimada Beta | `"2027-01-15"` |
| `producto.fecha_ga` | string | Opcional | Fecha estimada GA | `"2027-03-01"` |

---

## 2. Variable Raíz: `model`

Representa una entidad del modelo de datos / dominio.

| Variable | Tipo | Obligatoria | Formato / Valores válidos | Ejemplo |
|---|---|:---:|---|---|
| `model.name` | string | ✅ Requerida | Nombre de la entidad | `"User"` |
| `model.table_name` | string | ✅ Requerida | Nombre de tabla SQL (snake_case) | `"users"` |
| `model.domain_module` | string | ✅ Requerida | Módulo/dominio al que pertenece | `"auth"` |
| `model.db_engine` | string | Opcional | Motor de BD (default: `PostgreSQL`) | `"PostgreSQL"` |
| `model.storage_strategy` | string | Opcional | Estrategia de almacenamiento (default: `Relacional / ACID`) | `"Relacional / ACID"` |
| `model.description` | string | ✅ Requerida | Descripción de la entidad | `"Usuario del sistema"` |
| `model.fields[]` | array | ✅ Requerida | Lista de campos/columnas | — |
| `model.fields[].name` | string | ✅ Requerida | Nombre del campo (snake_case) | `"email"` |
| `model.fields[].type` | string | ✅ Requerida | Tipo de dato SQL | `"VARCHAR"`, `"UUID"`, `"TIMESTAMPTZ"`, `"INTEGER"`, `"BOOLEAN"`, `"JSONB"` |
| `model.fields[].nullable` | boolean | Opcional | Si el campo es nullable (default: `false`) | `false` |
| `model.fields[].default` | string | Opcional | Valor por defecto | `"NULL"` |
| `model.fields[].constraints` | string | Opcional | Restricciones SQL | `"NOT NULL"`, `"UNIQUE"`, `"CHECK(...)"` |
| `model.fields[].description` | string | Opcional | Descripción del campo | `"Correo electrónico"` |
| `model.fields[].ts_type` | string | Opcional | Tipo TypeScript (default: `"string"`) | `"string"`, `"number"`, `"boolean"`, `"Date"`, `"null"` |
| `model.soft_delete` | boolean | Opcional | Si usa borrado lógico (default: `false`) | `false` |
| `model.pk_field` | string | Opcional | Nombre de la clave primaria (default: `"id"`) | `"id"` |
| `model.unique_keys[]` | array | Opcional | Lista de restricciones únicas | — |
| `model.unique_keys[].fields` | string | ✅ Requerida | Campos que componen la UK (comma-separated) | `"email"` |
| `model.indexes[]` | array | Opcional | Lista de índices adicionales | — |
| `model.indexes[].name` | string | ✅ Requerida | Nombre del índice | `"idx_users_email"` |
| `model.indexes[].type` | string | Opcional | Tipo de índice (default: `"B-Tree"`) | `"B-Tree"`, `"Hash"`, `"GIN"`, `"GiST"` |
| `model.indexes[].fields` | string | ✅ Requerida | Campos incluidos en el índice | `"email"` |
| `model.indexes[].purpose` | string | Opcional | Propósito del índice | `"Búsqueda rápida por email"` |
| `model.relationships[]` | array | Opcional | Lista de relaciones con otras entidades | — |
| `model.relationships[].target_table` | string | ✅ Requerida | Tabla relacionada | `"roles"` |
| `model.relationships[].cardinality` | string | ✅ Requerida | Cardinalidad: `1:1`, `1:N`, `N:M` | `"N:1"` |
| `model.relationships[].fk_field` | string | ✅ Requerida | Campo de clave foránea | `"role_id"` |
| `model.relationships[].on_delete` | string | Opcional | Acción ON DELETE (default: `"CASCADE"`) | `"CASCADE"`, `"RESTRICT"`, `"SET NULL"` |
| `model.relationships[].on_update` | string | Opcional | Acción ON UPDATE (default: `"CASCADE"`) | `"CASCADE"`, `"RESTRICT"`, `"SET NULL"` |

---

## 3. Variable Raíz: `feature`

Representa una funcionalidad del sistema.

| Variable | Tipo | Obligatoria | Formato / Valores válidos | Ejemplo |
|---|---|:---:|---|---|
| `feature.id` | string | ✅ Requerida | Identificador único (upper) | `"F-001"` |
| `feature.name` | string | ✅ Requerida | Nombre descriptivo | `"Crear usuario"` |
| `feature.description_from_prd` | string | ✅ Requerida | Descripción de la funcionalidad | `"Permite crear nuevos usuarios"` |
| `feature.user_role` | string | ✅ Requerida | Rol del usuario que ejecuta la acción | `"Administrador"` |
| `feature.action_goal` | string | ✅ Requerida | Acción que se desea realizar | `"Crear un nuevo usuario"` |
| `feature.business_value` | string | ✅ Requerida | Valor de negocio que aporta | `"Gestión completa de acceso"` |
| `feature.preconditions[]` | array | Opcional | Lista de precondiciones | — |
| `feature.preconditions[]` (item) | string | ✅ Requerida | Precondición | `"El usuario tiene rol Admin"` |
| `feature.happy_path` | object | ✅ Requerida | Escenario principal (camino feliz) | — |
| `feature.happy_path.title` | string | ✅ Requerida | Título del escenario | "Usuario creado exitosamente" |
| `feature.happy_path.given` | string | ✅ Requerida | Condición inicial (Given) | "El usuario está en la página de registro" |
| `feature.happy_path.and_given` | string | Opcional | Condición adicional (And Given) | "El formulario está visible" |
| `feature.happy_path.when` | string | ✅ Requerida | Acción (When) | "El usuario completa el formulario y envía" |
| `feature.happy_path.then` | string | ✅ Requerida | Resultado esperado (Then) | "Se muestra la pantalla de confirmación" |
| `feature.additional_happy_paths[]` | array | Opcional | Escenarios adicionales de camino feliz | — |
| `feature.additional_happy_paths[].title` | string | ✅ Requerida | Título del escenario | — |
| `feature.additional_happy_paths[].given` | string | ✅ Requerida | Given | — |
| `feature.additional_happy_paths[].when` | string | ✅ Requerida | When | — |
| `feature.additional_happy_paths[].then` | string | ✅ Requerida | Then | — |
| `feature.alternative_paths[]` | array | Opcional | Escenarios alternativos | — |
| `feature.alternative_paths[].title` | string | ✅ Requerida | Título del escenario | — |
| `feature.alternative_paths[].given` | string | ✅ Requerida | Given | — |
| `feature.alternative_paths[].when` | string | ✅ Requerida | When | — |
| `feature.alternative_paths[].then` | string | ✅ Requerida | Then | — |
| `feature.error_paths[]` | array | Opcional | Escenarios de error y validación | — |
| `feature.error_paths[].title` | string | ✅ Requerida | Título del escenario | — |
| `feature.error_paths[].given` | string | ✅ Requerida | Given | — |
| `feature.error_paths[].when` | string | ✅ Requerida | When | — |
| `feature.error_paths[].then` | string | ✅ Requerida | Then | — |
| `feature.error_paths[].and_then` | string | Opcional | Resultado adicional (And Then) | — |
| `feature.data_driven` | object | Opcional | Esquema para casos parametrizados | — |
| `feature.data_driven.title` | string | ✅ Requerida (si aplica) | Título del esquema | — |
| `feature.data_driven.given` | string | ✅ Requerida (si aplica) | Given del esquema | — |
| `feature.data_driven.when` | string | ✅ Requerida (si aplica) | When del esquema | — |
| `feature.data_driven.param_1` | string | ✅ Requerida (si aplica) | Nombre del primer parámetro | `"email"` |
| `feature.data_driven.then` | string | ✅ Requerida (si aplica) | Then del esquema | — |
| `feature.data_driven.expected` | string | ✅ Requerida (si aplica) | Nombre del campo esperado | `"mensaje"` |
| `feature.data_driven.example_1_input` | string | ✅ Requerida (si aplica) | Primer ejemplo de entrada | `"usuario@test.com"` |
| `feature.data_driven.example_1_output` | string | ✅ Requerida (si aplica) | Primer ejemplo de salida | `"Usuario creado"` |
| `feature.data_driven.example_2_input` | string | Opcional | Segundo ejemplo de entrada | `"invalid-email"` |
| `feature.data_driven.example_2_output` | string | Opcional | Segundo ejemplo de salida | `"Error: email inválido"` |
| `feature.ui.control_1` | string | Opcional | Primer control de UI | `"Botón Guardar"` |
| `feature.ui.type_1` | string | Opcional | Tipo de control | `"button"`, `"input"`, `"select"`, `"modal"` |
| `feature.ui.behavior_1` | string | Opcional | Comportamiento del control | "Habilitado tras validación" |
| `feature.ui.control_2` | string | Opcional | Segundo control de UI | — |
| `feature.ui.type_2` | string | Opcional | Tipo de control | — |
| `feature.ui.behavior_2` | string | Opcional | Comportamiento del control | — |
| `feature.flow.start` | string | Opcional | Nodo inicial del flujo | "Pantalla principal" |
| `feature.flow.decision` | string | Opcional | Punto de decisión | "¿Formulario válido?" |
| `feature.flow.success_step` | string | Opcional | Paso de éxito | "Guardar en BD" |
| `feature.flow.error_step` | string | Opcional | Paso de error | "Mostrar mensaje de error" |
| `feature.api.method` | string | Opcional | Método HTTP | `GET`, `POST`, `PUT`, `DELETE` |
| `feature.api.path` | string | Opcional | Ruta del endpoint | `"/api/users"` |
| `feature.api.description` | string | Opcional | Descripción del endpoint | "Lista todos los usuarios" |
| `feature.analytics.event` | string | Opcional | Nombre del evento de telemetría | `"user_created"` |
| `feature.analytics.trigger` | string | Opcional | Disparador del evento | "Tras crear usuario exitosamente" |
| `feature.analytics.params` | string | Opcional | Parámetros del evento | `"user_id, email, role"` |
| `feature.prd_section` | string | Opcional | Sección del PRD de referencia | `"4.1"` |
| `feature.prd_anchor` | string | Opcional | Ancla MD del PRD | `"req-funcionalidad-principal"` |
| `feature.priority` | string | Opcional | Prioridad: `P0`, `P1`, `P2` | `"P0"` |
| `feature.slug` | string | ✅ Requerida | Slug para URLs y nombres de archivo | `"crear-usuario"` |
| `feature.issue_url` | string | Opcional | URL de la issue de GitHub | `"https://github.com/org/repo/issues/1"` |

---

## 4. Reglas de Validación

1. **Completez:** Toda variable marcada como ✅ Requerida debe tener un valor antes de la generación del documento. Si falta, el agente DEBE detenerse y preguntar al usuario.
2. **Coherencia:** Las variables `feature.priority` deben usar solo `P0`, `P1` o `P2`. Las variables `producto.tipo` deben usar solo los valores del enum.
3. **Formato:** Las variables con filtres (`|`) definidos en las plantillas deben respetar el formato de entrada esperado por el filtro (ver `.ai/syntax.template.md`).
4. **Referencias cruzadas:** `feature.prd_section` y `feature.prd_anchor` deben apuntar a una sección existente en `docs/PRD.md`.