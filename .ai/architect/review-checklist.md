# Checklist de Revisión de PRD

**Propósito:** Validar que el PRD generado cumple con los estándares de calidad y completitud antes de su aprobación final.

---

## Criterios de Revisión

### 1. Coherencia Interna

- [ ] El PRD no contiene contradicciones entre secciones (ej. una funcionalidad mencionada en Requisitos pero no en Arquitectura).
- [ ] Las referencias cruzadas entre secciones (tablas, enlaces) son correctas.
- [ ] Los nombres de módulos, entidades y funcionalidades son consistentes en todo el documento.
- [ ] Los tipos de producto y plataforma mencionados son coherentes con la sección de Visión General.

### 2. Completitud de Requisitos Funcionales

- [ ] Cada módulo tiene al menos 3 requisitos funcionales o historias de usuario.
- [ ] Los criterios de aceptación son verificables y medibles.
- [ ] Los escenarios Gherkin cubren: happy path, escenarios alternativos y escenarios de error.
- [ ] Las precondiciones de cada funcionalidad están explícitas.
- [ ] No hay funcionalidad sin un identificador único (ID/slug).

### 3. Ausencia de Tecnologías Hardcodeadas

- [ ] No se recomienda una tecnología específica como "estándar de la industria" sin justificación contextual.
- [ ] Las decisiones de infraestructura (BD, caché, mensajería) son presentadas como opciones con criterios de selección.
- [ ] Las herramientas de observabilidad, CI/CD y testing se presentan como alternativas según la plataforma.
- [ ] Las integraciones de terceros son presentadas como categorías, no como proveedores específicos obligatorios.

### 4. Cobertura de Requisitos No Funcionales (NFRs)

- [ ] Se definen metas de rendimiento (latencia, throughput, disponibilidad).
- [ ] Se especifica la estrategia de seguridad (autenticación, autorización, cifrado).
- [ ] Se define el SLA objetivo con RTO y RPO.
- [ ] Se abordan requisitos de cumplimiento normativo aplicables (GDPR, PCI-DSS, etc.).
- [ ] Se considera la accesibilidad (WCAG) para interfaces de usuario.

### 5. Arquitectura y Especificaciones Técnicas

- [ ] La arquitectura es apropiada para el tipo de producto definido.
- [ ] El modelo de datos tiene entidades, relaciones y cardinales definidos.
- [ ] Los diagramas de arquitectura son coherentes con la descripción textual.
- [ ] Los contratos de API incluyen métodos, rutas, códigos de respuesta y formato de error.
- [ ] La estrategia de despliegue es viable para la plataforma objetivo.

### 6. Estructura y Formato

- [ ] Todas las variables `{{ ... }}` han sido reemplazadas con valores concretos.
- [ ] Las directivas `{# ... #}` han sido eliminadas del documento final.
- [ ] Los bloques de código Gherkin usan keywords en inglés (Given/When/Then).
- [ ] El documento sigue la estructura de la plantilla PRD sin secciones vacías.
- [ ] Los enlaces internos (a PRD, DOMAIN, issues) son válidos.

### 7. Neutralidad y Generalidad

- [ ] El documento no asume un stack tecnológico particular.
- [ ] Las recomendaciones son aplicables a la plataforma declarada.
- [ ] Las decisiones de diseño se justifican con criterios, no con preferencias personales.
- [ ] Los "out of scope" son explícitos y limitados a 3-5 elementos.

### 8. Verificación Final

- [ ] El documento puede ser entendido por un agente sin contexto del proyecto (test de neutralidad).
- [ ] Los escenarios Gherkin pueden ser parseados por herramientas estándar (Cucumber).
- [ ] Todos los requisitos tienen una prioridad asignada (P0, P1 o P2).
- [ ] El roadmap tiene fechas estimadas y hitos claros.

---

## Resultado de la Revisión

| Categoría | Aprobado | Observaciones |
|---|:---:|---|
| Coherencia Interna | ☐ | |
| Requisitos Funcionales | ☐ | |
| Sin Tech Hardcode | ☐ | |
| NFRs | ☐ | |
| Arquitectura | ☐ | |
| Estructura y Formato | ☐ | |
| Neutralidad | ☐ | |
| Verificación Final | ☐ | |

**Decisión final:**
- [ ] ✅ Aprobado — Listo para la siguiente fase (Features/Modelo).
- [ ] ⚠️ Aprobado con cambios — Se deben resolver las observaciones antes de continuar.
- [ ] ❌ Rechazado — Requiere reescritura significativa.

**Revisado por:** _______________  
**Fecha:** YYYY-MM-DD
