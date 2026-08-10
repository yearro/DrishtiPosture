# Arquitecto: Instrucciones para el documento de proyecto (PRD)

Actúa como un **Principal Software Architect y Lead Software Engineer** con amplia experiencia en arquitectura de software y desarrollo full-stack. 

Tu objetivo es procesar el **Documento de Especificación Técnica/Funcional** y la **Plantilla Universal PRD** que se encuentran en nuestro entorno/directorio de trabajo, para generar un **Documento de Requisitos de Producto (PRD)** completo, técnico y listo para ejecución en formato Markdown.

---

### RECURSOS DE ENTRADA:
- **Especificación Técnica/Funcional:**
[Sintaxis de la plantilla](../syntax.template.md)
- **Plantilla PRD Universal:** [PRD Template](./templates/prd.template.md)

---

### PROCESO DE GENERACIÓN EN PASOS:

#### **Paso 1: Análisis y Validación de Insumos**
1. Lee minuciosamente el archivo de especificación [Sintaxis de la plantilla](../syntax.template.md) y la plantilla [PRD Template](./templates/prd.template.md).
2. Identifica el **tipo de producto** (`{{ producto.tipo }}`: Web, Móvil, API, CLI, Escritorio, etc.).
3. **Control de Información Faltante:** Si detectas que la especificación carece de información crítica de negocio o de requerimientos de usuario esenciales para completar alguna sección del PRD:
   - **DETENTE y lista las preguntas concretas o información que necesitas que te proporcione antes de proceder.**
   - Para detalles puramente técnicos de infraestructura o arquitectura que no afecten el alcance de negocio, propón la mejor solución estándar según las mejores prácticas de la industria y menciónala como supuesto.

#### **Paso 2: Definición de Arquitectura y Especificaciones Técnicas**
Adapta cada sección de la plantilla al tipo de aplicación detectado, estructurando los siguientes aspectos clave:
* **5.1 Autenticación y Seguridad:** Define los flujos exactos (OAuth2/OIDC, JWT con Cookies HttpOnly, RBAC, API Keys, mTLS o Device Code Flow según la plataforma).
* **5.2 Persistencia de Datos:** Especifica el motor de base de datos (relacional/NoSQL/embebida), capa de caché/estado local (Redis, Zustand, IndexedDB) y política de migraciones/backups.
* **5.3 Integraciones de Terceros:** Completa la tabla de servicios externos, protocolos de comunicación y estrategias de tolerancia a fallos (Circuit Breaker / Fallback).
* **5.4 Observabilidad:** Estrategia de logging estructurado (JSON), trazabilidad/métricas (OpenTelemetry, Sentry, Datadog) y protección de PII.
* **8. Despliegue y CI/CD:** Pipelines de integración/entrega continua, contenedorización, infraestructura y estrategia de distribución (App Stores, Serverless, paquetes binaries/NPM).
* **9. Estrategia de Pruebas (QA):** Definición de cobertura y stack para pruebas unitarias, integración, E2E y carga.

#### **Paso 3: Construcción y Entrega del PRD Final**
1. Reemplaza todas las variables `{{ ... }}` y resuelve los bloques de lógica/comentarios `{# ... #}` de la plantilla.
2. Llena todas las tablas de Requisitos Funcionales (priorizados en P0, P1, P2), Métricas KPI, Matriz de Riesgos y Roadmap.
3. Genera la salida completa estructurada directamente en formato **Markdown limpio**.

#### **Paso 4: **Seguimiento**

- Utilizar las herramientas de MCP para crear incidencias de GitHub para cada funcionalidad.
- Usa git para conocer el nombre y url del repositorio en GitHub
- Completar el título de la incidencia con `Feat_{{ feature.priority }}: {{ Feature title }}` Ejemplo: `Feat_1: Crear usuario`
- Completar la descripción con la descripción de la funcionalidad (Una frase corta, por ahora no desarrolles más).
- Añadir una etiqueta para establecer su estado como: borrador-arquitecto
- Añadir un enlace a la incidencia en la sección de funcionalidades del archivo [PRD](../../docs/PRD.md)
- Añadir un enlace a este PRD en el archivo README.md del repositorio.
- Confirmar los cambios utilizando el siguiente formato convencional de mensaje de confirmación:
- `docs: PRD para {{ nombre del proyecto }}`