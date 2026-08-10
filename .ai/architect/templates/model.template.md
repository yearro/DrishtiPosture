# Data Model: {{ model.name | upper }} (`{{ model.table_name | lower }}`)

## 1. Visión General del Modelo

**Entidad / Tabla:** `{{ model.table_name | lower }}`  
**Módulo / Dominio:** {{ model.domain_module }}  
**Motor de Persistencia Target:** {{ model.db_engine | default:"PostgreSQL" }}  
**Estrategia de Almacenamiento:** {{ model.storage_strategy | default:"Relacional / ACID" }}  

### 1.1 Descripción
<!-- Breve descripción del propósito de este modelo de datos dentro del sistema -->
{{ model.description }}

---

## 2. Esquema de Campos y Atributos

| Campo / Columna | Tipo de Dato | Nulo (Nullable) | Valor por Defecto | Restricciones / Claves | Descripción |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `id` | `UUID` / `BIGINT` | ❌ No | `gen_random_uuid()` | `PK` | Identificador único primario. |
{% for field in model.fields %}
| `{{ field.name | lower }}` | `{{ field.type | upper }}` | {% if field.nullable %}✅ Sí{% else %}❌ No{% endif %} | `{{ field.default | default:"NULL" }}` | {{ field.constraints | default:"-" }} | {{ field.description }} |
{% empty %}
| `name` | `VARCHAR(255)` | ❌ No | `NULL` | `NOT NULL` | Nombre descriptivo de la entidad. |
| `status` | `VARCHAR(50)` | ❌ No | `'ACTIVE'` | `CHECK(status IN (...))` | Estado del registro. |
{% endfor %}
| `created_at` | `TIMESTAMPTZ` | ❌ No | `NOW()` | `NOT NULL` | Fecha y hora de creación. |
| `updated_at` | `TIMESTAMPTZ` | ❌ No | `NOW()` | `NOT NULL` | Fecha y hora de última actualización. |
{% if model.soft_delete %}
| `deleted_at` | `TIMESTAMPTZ` | ✅ Sí | `NULL` | `INDEX` | Marca para Borrado Lógico (Soft Delete). |
{% endif %}

---

## 3. Claves, Índices y Optimizaciones

### 3.1 Claves Primarias y Únicas
- **Primary Key (PK):** `{{ model.pk_field | default:"id" }}`
{% if model.unique_keys %}
- **Unique Constraints (UK):**
{% for uk in model.unique_keys %}
  - `UK_{{ model.table_name | upper }}_{{ loop.index }}`: (`{{ uk.fields | join:", " }}`)
{% endfor %}
{% endif %}

### 3.2 Índices (Indexes)
| Nombre del Índice | Tipo de Índice | Campos Incluidos | Propósito / Caso de Uso |
| :--- | :--- | :--- | :--- |
| `idx_{{ model.table_name }}_created_at` | B-Tree | `created_at DESC` | Ordenamiento predeterminado en consultas de listado. |
{% for idx in model.indexes %}
| `{{ idx.name }}` | {{ idx.type | default:"B-Tree" }} | `{{ idx.fields }}` | {{ idx.purpose }} |
{% empty %}
| `idx_{{ model.table_name }}_status` | B-Tree | `status` | Filtrado rápido por registros activos/inactivos. |
{% endfor %}

---

## 4. Relaciones y Mapas de Asociación

| Entidad Relacionada | Tipo de Relación | Clave Foránea (FK) | Regla ON DELETE | Regla ON UPDATE |
| :--- | :---: | :--- | :--- | :--- |
{% for rel in model.relationships %}
| `{{ rel.target_table }}` | `{{ rel.cardinality }}` | `{{ rel.fk_field }}` | `{{ rel.on_delete | default:"CASCADE" }}` | `{{ rel.on_update | default:"CASCADE" }}` |
{% empty %}
| `users` | Many-to-One (N:1) | `created_by_id` | `RESTRICT` | `CASCADE` |
{% endfor %}

---

## 5. Mapeo ORM e Implementación Técnica

### 5.1 Interfaz / Tipo TypeScript
```typescript
export interface I{{ model.name | title }} {
  id: string;
{% for field in model.fields %}
  {{ field.name }}: {{ field.ts_type | default:"string" }}{% if field.nullable %} | null{% endif %};
{% endfor %}
  createdAt: Date;
  updatedAt: Date;
{% if model.soft_delete %}
  deletedAt?: Date | null;
{% endif %}
}