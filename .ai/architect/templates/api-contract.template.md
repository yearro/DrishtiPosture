# API Contract: {{ feature.name | title }}

**Feature ID:** {{ feature.id }}  
**Priority:** {{ feature.priority }}

---

## 1. Endpoints

### {{ feature.api.method }} `{{ feature.api.path }}`

**Descripción:** {{ feature.api.description }}

#### Autenticación Requerida

- [ ] No requiere autenticación (público)
- [ ] Requiere token Bearer (JWT / OAuth2)
- [ ] Requiere API Key
- [ ] Requiere session cookie

#### Parámetros

| Nombre | Ubicación | Tipo | Obligatorio | Descripción |
|---|---|---|:---:|---|
{% if feature.api.path_param_1 %}
| `{{ feature.api.path_param_1 }}` | `{{ feature.api.path_param_1_location | default:"path" }}` | `{{ feature.api.path_param_1_type | default:"string" }}` | Sí | {{ feature.api.path_param_1_desc | default:"Identificador del recurso" }} |
{% endif %}
{% if feature.api.query_param_1 %}
| `{{ feature.api.query_param_1 }}` | query | `{{ feature.api.query_param_1_type | default:"string" }}` | {{ feature.api.query_param_1_required | default:"No" }} | {{ feature.api.query_param_1_desc | default:"Parámetro de consulta" }} |
{% endif %}
{% if feature.api.body_field_1 %}
| `{{ feature.api.body_field_1 }}` | body | `{{ feature.api.body_field_1_type | default:"string" }}` | {{ feature.api.body_field_1_required | default:"Sí" }} | {{ feature.api.body_field_1_desc | default:"Campo del cuerpo de la petición" }} |
{% endif %}

#### Request Headers (opcionales)

| Header | Valor |
|---|---|
| `Content-Type` | `application/json` |
| `Accept` | `application/json` |

#### Request Body (ejemplo)

```json
{
{% if feature.api.body_field_1 %}
  "{{ feature.api.body_field_1 }}": "{{ feature.api.body_field_1_example | default:"valor" }}"{% endif %}
{% if feature.api.body_field_2 %}
  , "{{ feature.api.body_field_2 }}": "{{ feature.api.body_field_2_example | default:"valor" }}"{% endif %}
}
```

#### Response Codes

| Código HTTP | Descripción | Body |
|---|---|---|
| `200` | Éxito | `{ "data": { ... } }` |
| `201` | Creado | `{ "data": { ... }, "id": "..." }` |
| `400` | Petición inválida | `{ "type": "about:blank", "title": "Bad Request", "detail": "...", "instance": "..." }` |
| `401` | No autenticado | RFC 7807 |
| `403` | Sin permisos | RFC 7807 |
| `404` | No encontrado | RFC 7807 |
| `422` | Error de validación | RFC 7807 |
| `429` | Rate limit excedido | RFC 7807 |
| `500` | Error interno | RFC 7807 |

#### Formato de Error (RFC 7807)

```json
{
  "type": "https://api.ejemplo.com/errors/not-found",
  "title": "Recurso no encontrado",
  "detail": "El recurso con id 'xyz' no existe.",
  "instance": "/api/v1/resource/xyz",
  "trace_id": "abc123"
}
```

#### Rate Limiting

- **Límite:** {{ feature.api.rate_limit | default:"100 solicitudes por minuto" }}
- **Encabezado de respuesta:** `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- **Estrategia de backoff:** {{ feature.api.backoff_strategy | default:"Exponential backoff con jitter" }}

#### Ejemplo de Request Completo (cURL)

```bash
curl -X {{ feature.api.method }} "{{ feature.api.path }}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{}'
```

#### Ejemplo de Response Exitosa (200)

```json
{
{% if feature.api.response_field_1 %}
  "{{ feature.api.response_field_1 }}": "{{ feature.api.response_field_1_example | default:"valor" }}"{% endif %}
{% if feature.api.response_field_2 %}
  , "{{ feature.api.response_field_2 }}": "{{ feature.api.response_field_2_example | default:"valor" }}"{% endif %}
}
```
