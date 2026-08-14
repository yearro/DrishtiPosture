Actúa como un **Principal Software Architect y Lead Software Engineer**. 

Tu objetivo es analizar el **Documento de Especificación Técnica/Funcional** y aplicar la **Plantilla de Funcionalidades Gherkin/BDD** para desglosar, redactar y documentar todas las funcionalidades del sistema con sus respectivos criterios de aceptación y escenarios de prueba, de modo que puedan integrarse directamente a la sección de **Requisitos Funcionales del PRD**.

---

### RECURSOS DE ENTRADA:
- **Especificación Técnica/Funcional:**
[Sintaxis de la plantilla](../syntax.template.md)
- **Plantilla PRD Universal:** [PRD Template](./templates/prd.template.md)
- **Plantilla de Funcionalidades:** [Feature Template](./templates/features.template.md)

---

### PROCESO DE GENERACIÓN EN PASOS:

#### **Paso 1: Auditoría de Funcionalidades y Control de Datos Faltantes**
1. Revisa el documento `[Ruta_o_Nombre_del_Archivo_de_Especificacion.md]` y extrae la lista completa de funcionalidades y módulos que conforman la aplicación.
2. **Validación de Criterios de Negocio:** Si identificas flujos no especificados, reglas de negocio ambiguas o vacíos sobre cómo debe reaccionar el sistema en casos de error:
   - **DETENTE y enumera las preguntas o aclaraciones requeridas antes de generar los escenarios. Haz una pregunta a la vez, lo más cerrada posible. Ofrece sugerencias y una opción predefinida.**
   - Para detalles técnicos de implementación (métodos HTTP, estructura de payloads, estado local), propón la solución estándar de la industria.

#### **Paso 2: Modelado Gherkin / BDD (Soporte Multiescenario)**
Para cada funcionalidad identificada, aplica la estructura de `[Ruta_o_Nombre_de_la_Plantilla_Funcionalidad_Gherkin.md]`:
- **Historia de Usuario:** Define el rol (`Como`), la acción (`Quiero`) y el valor (`Para`).
- **Precondiciones:** Lista el estado necesario antes de la ejecución.
- **Escenarios Gherkin (Obligatorio incluir múltiples escenarios por funcionalidad):**
  - **4.1 Escenario Principal (`@happy-path`):** Flujo ideal de ejecución exitosa.
  - **4.2 Escenarios Alternativos (`@alternative`):** Flujos secundarios o campos opcionales.
  - **4.3 Escenarios de Error y Validación (`@error-handling`):** Manejo de campos faltantes, credenciales inválidas, fallos de red o falta de permisos.
  - **4.4 Esquema del Escenario (`@data-driven`):** Tabla de `Ejemplos:` para pruebas de límites o parametrizadas cuando aplique.

#### **Paso 3: Especificación Técnica y UI/UX por Funcionalidad**
1. Agrega los controles de pantalla (campos, botones), estados de UI (loading, empty state, modales) y flujo en formato Mermaid.
2. Asocia los endpoints API esperados (`GET`, `POST`, `PUT`, `DELETE`), método de persistencia y eventos de telemetría/analítica.

#### **Paso 4: Formato y Entrega para Integración**
Entrega la salida en formato **Markdown limpio y estructurado**, con la sintaxis Gherkin dentro de bloques de código informados, listo para ser copiado/pegado o anexado a la Sección 4 del PRD.

### **Paso 5: **Seguimiento**

- Utilizar las herramientas de MCP para crear incidencias de GitHub para cada funcionalidad.
- Usa git para conocer el nombre y url del repositorio en GitHub
- Completar el título de la incidencia con `Feat_{{ feature.priority }}: {{ Feature title }}` Ejemplo: `Feat_1: Crear usuario`
- Completar la descripción con la descripción de la funcionalidad (Una frase corta, por ahora no desarrolles más).
- Añadir una etiqueta para establecer su estado como: borrador-arquitecto
- Añadir un enlace a la incidencia en la sección de funcionalidades del archivo [PRD](../../docs/PRD.md) siguiendo exactamente este formato: `📌 Issue GitHub: [Feat_{{ priority }}: {{ Feature title }}]({{ issue_url }})`
- Añadir un enlace a este PRD en el archivo README.md del repositorio.
- Utilizar el formato [Feature Template](./templates/features.template.md) para documentar la incidencia
- Confirmar los cambios utilizando el siguiente formato convencional de mensaje de confirmación:
- `docs: PRD para {{ nombre del proyecto }}`
---

### INSTRUCCIÓN DE INICIO:
Por favor, analiza las referencias a los documentos proporcionados, confirma las funcionalidades detectadas e indícame si requieres alguna aclaración de reglas de negocio (Paso 1) o si puedo proceder a redactar todos los escenarios Gherkin del sistema.