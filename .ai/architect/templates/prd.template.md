# PRD: {{ producto.nombre }}

{# Actúa como un Principal Product Manager y Software Architect. Utiliza un tono profesional, riguroso y orientado a la ejecución. 
   Analiza el tipo de producto especificado en {{ producto.tipo }} (Web, Móvil, Escritorio, API, CLI u otro) 
   y adapta las decisiones de arquitectura, experiencia de usuario y requisitos técnicos a las mejores prácticas de esa plataforma. #}

---

## 1. Visión General del Producto

**Nombre del Producto:** {{ producto.nombre }}  
**Tipo de Aplicación:** {{ producto.tipo }}  
**Versión Inicial Target:** {{ producto.version | default:"v1.0.0" }}  
**Líder de Producto (PM):** {{ producto.pm_lead | default:"Por asignar" }}  
**Lead Técnico:** {{ producto.tech_lead | default:"Por asignar" }}  

### 1.1 Resumen Ejecutivo
{# Escribe un resumen ejecutivo de máximo 2 párrafos que explique qué es el producto, qué problema resuelve y cuál es su propuesta de valor única. 
   Alinea la redacción según el tipo de aplicación (ej. en CLI/API enfócate en DX e integración; en Web/Móvil enfócate en UX y valor final). #}

### 1.2 Problema y Oportunidad
{# Describe la problemática actual del usuario o negocio. Justifica por qué es el momento adecuado para construir esta solución y el impacto esperado. #}

---

## 2. Objetivos y Métricas de Éxito (KPIs)

### 2.1 Objetivos del Negocio
{# Lista de 3 a 5 objetivos cuantitativos y cualitativos que se buscan alcanzar con este lanzamiento. #}

### 2.2 Métricas Clave de Rendimiento (KPIs)
| Métrica / KPI | Estado Actual (Baseline) | Meta Target | Método de Medición |
| :--- | :--- | :--- | :--- |
{# Completa esta tabla con métricas relevantes para {{ producto.tipo }}. 
   Incluye métricas de negocio (conversión, retención) y métricas técnicas (latencia, disponiblidad, error rate). #}

---

## 3. Personas y Casos de Uso

### 3.1 Usuarios Objetivo (Personas)
{% for persona in producto.personas -%}
#### Persona {{ loop.index }}: {{ persona.nombre }} ({{ persona.rol }})
- **Perfil y Contexto:** {{ persona.descripcion }}
- **Puntos de Dolor (Pain Points):**
  {# Genera una lista de 3 puntos de dolor específicos que esta persona experimenta en su día a día. #}
- **Necesidades Clave:** {{ persona.necesidades }}

{% empty %}
{# Si no se proporcionan personas específicas, genera 2 arquetipos de usuario ideales para una aplicación de tipo {{ producto.tipo }}. #}
{% endfor %}

---

## 4. Requisitos Funcionales y Historias de Usuario

{% for modulo in producto.modulos -%}
### 4.{{ loop.index }} Módulo: {{ modulo.nombre }}

{# Explica brevemente la responsabilidad principal de este módulo dentro del sistema. #}

| ID | Historia de Usuario / Requisito | Criterios de Aceptación | Prioridad |
| :--- | :--- | :--- | :--- |
{# Rellena la tabla con al menos 3 requisitos o historias de usuario específicas para este módulo (Prioridades P0, P1, P2). #}

{% empty %}
### 4.1 Core Features (Módulo Principal)
{# Genera los 4 requisitos funcionales esenciales que debe tener una aplicación de tipo {{ producto.tipo }} para alcanzar un MVP exitoso. #}
{% endfor %}

---

## 5. Arquitectura Técnica y Especificaciones del Sistema

### 5.1 Autenticación, Autorización y Seguridad
{# Define el esquema de identidad según {{ producto.tipo }}:
   - Web/Móvil: OAuth2/OIDC, Social Logins, MFA, JWT/Session Cookies, gestión de roles (RBAC).
   - API: API Keys, Bearer Tokens (JWT), Mutual TLS (mTLS), Scopes.
   - CLI/Escritorio: OAuth2 Device Authorization Grant (Device Code Flow), almacenamiento seguro de credenciales locales (Keyring, Keychain, SecretService). #}

### 5.2 Capa de Persistencia y Almacenamiento de Datos
{# Define la estrategia de datos adecuada para {{ producto.tipo }}:
   - Base de Datos Principal: Relacional (PostgreSQL, MySQL) / NoSQL (MongoDB, DynamoDB) / Embebida (SQLite, RocksDB) según corresponda.
   - Estado Local / Caché: Caching distribuido (Redis/Memcached) o estado cliente (Zustand, Redux, React Query, LocalStorage/IndexedDB).
   - Migraciones y Schemas: Herramientas de migración y estrategia de backup/point-in-time recovery. #}

### 5.3 Integraciones y Servicios de Terceros
| Servicio / API Externa | Propósito de la Integración | Método de Comunicación | Plan de Contingencia / Fallback |
| :--- | :--- | :--- | :--- |
{# Completa esta tabla con las integraciones típicas requeridas (ej. pasarelas de pago, proveedores de email/SMS, servicios de IA/LLM, analítica, almacenamiento S3). #}

### 5.4 Observabilidad, Telemetría y Logging
{# Especifica la estrategia para monitoreo del sistema:
   - Logging estructurado (JSON) y niveles (INFO, WARN, ERROR).
   - Métrica y Trazabilidad: OpenTelemetry, Prometheus, Datadog o Sentry para rastreo de errores y APM.
   - Privacidad en Logs: Enmascaramiento o exclusión de datos PII (Personally Identifiable Information). #}

---

## 6. Especificaciones Específicas por Tipo de Plataforma

{% if producto.tipo | lower == "web" or producto.tipo | lower == "movil" or producto.tipo | lower == "escritorio" %}
### 6.1 Requisitos de Experiencia de Usuario (UI/UX) y Accesibilidad
{# Lineamientos de diseño UI/UX: tema claro/oscuro, diseño responsive o adaptativo, tiempos de respuesta percibidos y accesibilidad WCAG 2.1 AA. #}

### 6.2 Estrategia Offline y Sincronización
{# Define el comportamiento cuando no hay conexión a red (Progressive Web App, almacenamiento local offline, cola de reintentos y resolución de conflictos al reconectar). #}

{% elif producto.tipo | lower == "api" %}
### 6.1 Especificaciones de API y Contrato de Interfaz
{# Especifica la arquitectura (REST, GraphQL, gRPC), formato de respuesta estandarizado (JSON:API o RFC 7807), Rate Limiting y CORS. #}

### 6.2 Versionado y Documentación
{# Define la estrategia de versionado (URL / Headers) y herramientas de especificación (OpenAPI/Swagger, Postman). #}

{% elif producto.tipo | lower == "cli" %}
### 6.1 Estructura de Comandos, Flags y Sintaxis
{# Define la convención de comandos/subcomandos, manejo de parámetros y proporciona 2 ejemplos de ejecución en terminal. #}

### 6.2 Experiencia de Desarrollador (DX) e Salida
{# Especifica la salida predeterminada (colorizada/humana), formatos alternativos (`--json`, `--quiet`, `--verbose`) y códigos de salida POSIX estándar. #}

{% else %}
### 6.1 Requisitos Específicos de la Plataforma ({{ producto.tipo }})
{# Describe los requisitos particulares de interacción, formatos de entrada/salida y modos de ejecución. #}
{% endif %}

---

## 7. Requisitos No Funcionales (NFRs)

### 7.1 Rendimiento y Escalabilidad
{# Límites y metas claras de rendimiento (tiempo de respuesta < 200ms, carga inicial < 1.5s, consumo eficiente de RAM/CPU). #}

### 7.2 Cumplimiento Normativo y Privacidad
{# Políticas de cumplimiento (GDPR, CCPA, PCI-DSS, HIPAA) y cifrado de datos en tránsito (TLS 1.3) y en reposo (AES-256). #}

### 7.3 Disponibilidad y SLA
{# Especifica el SLA objetivo (ej. 99.9% uptime), RTO (Recovery Time Objective) y RPO (Recovery Point Objective). #}

---

## 8. Estrategia de Despliegue, CI/CD y Distribución

{# Define cómo se entregará el software según {{ producto.tipo }}:
   - Web/API: Contenedores (Docker/Kubernetes), Serverless, pipelines CI/CD, despliegues Blue/Green o Canary.
   - Móvil: Distribución en App Store / Play Store, OTA updates (CodePush).
   - Escritorio/CLI: Binarios multiplataforma, instaladores (Installer/Package managers como Homebrew, npm, cargo, Chocolatey) y auto-actualizaciones. #}

---

## 9. Estrategia de Pruebas y Calidad (QA)

| Nivel de Prueba | Cobertura Target / Enfoque | Herramientas Recomendadas |
| :--- | :--- | :--- |
{# Define los criterios de calidad: Pruebas Unitarias, Pruebas de Integración, Pruebas End-to-End (E2E) y Pruebas de Carga/Estres. #}

---

## 10. Fuera de Alcance (Out of Scope)

{# Lista explícita de 3 a 5 funcionalidades o integraciones que deliberadamente NO se incluirán en la versión v1.0.0 para evitar el scope creep. #}

---

## 11. Plan de Lanzamiento y Fases (Roadmap)

| Fase | Hito / Entregable | Alcance Principal | Fecha Estimada |
| :--- | :--- | :--- | :--- |
| **Fase 1** | MVP / Alpha | {# Alcance mínimo funcional. #} | {{ producto.fecha_mvp | default:"TBD" }} |
| **Fase 2** | Beta Pública | {# Características adicionales de pulido y feedback. #} | {{ producto.fecha_beta | default:"TBD" }} |
| **Fase 3** | General Availability (GA) | {# Lanzamiento completo con soporte y monitoreo activo. #} | {{ producto.fecha_ga | default:"TBD" }} |

---

## 12. Riesgos, Dependencias y Supuestos

### 12.1 Matriz de Riesgos
| Riesgo Detectado | Impacto (Alto/Medio/Bajo) | Probabilidad | Plan de Mitigación |
| :--- | :--- | :--- | :--- |
{# Genera 3 riesgos técnicos, operacionales o de seguridad asociados a la construcción de un producto de tipo {{ producto.tipo }}. #}

### 12.2 Dependencias Clave
{# Lista sistemas externos, licencias o equipos internos de los que depende este proyecto. #}