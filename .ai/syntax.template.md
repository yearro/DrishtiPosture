# Especificación de Sintaxis de Plantillas para Markdown (LLM-Driven)

**Versión:** 1.1.0  
**Propósito:** Estándar de generación de documentos Markdown mediante plantillas y LLMs (Large Language Models).

---

## 1. Introducción y Propósito

El objetivo de esta sintaxis de plantilla es permitir la **generación dinámica de documentos Markdown (`.md`)** combinando una estructura base, datos de entrada estructurados (JSON/YAML) e **instrucciones prompt/directivas interpretadas por un LLM**.

A diferencia de los motores de plantillas tradicionales, esta sintaxis integra a los modelos de lenguaje (LLM) como el motor principal de renderizado, donde las secciones del documento pueden ser redactadas, resumidas o transformadas dinámicamente mediante comentarios directos.

---

## 2. Delimitadores Principales

La sintaxis utiliza tres tipos de delimitadores para separar la estructura, los datos y las directivas de generación:

| Tipo de Elemento | Sintaxis | Descripción |
| :--- | :--- | :--- |
| **Interpolación de Variable** | `{{ variable }}` | Inserción directa de datos estructurados conocidos. |
| **Etiqueta de Control** | `{% instruccion %}` | Ejecuta lógica de control (condicionales, bucles, inclusión de parciales). |
| **Comentario / Directiva LLM** | `{# directiva #}` | **Instrucción directa para el LLM.** Define el contenido, tono, estilo o reglas de generación de la sección correspondiente. |

> **Nota de Control de Espacios (Whitespace Trimming):**  
> Para evitar que las etiquetas agreguen saltos de línea no deseados en Markdown, se usan guiones:  
> `{%-` o `{#-` eliminan espacios a la izquierda | `-%}` o `-#}` eliminan espacios a la derecha.

---

## 3. Directivas de Comentario para LLM (`{# ... #}`)

En esta especificación, los contenidos dentro de las etiquetas de comentario **`{# ... #}` NO son ignorados ni desechados**. Funcionan como **instrucciones y directivas operativas para el LLM** al momento de generar o completar el contenido de la plantilla.

### 3.1 Reglas de Interpretación para LLMs

1. **Prompt de Sección:** El LLM debe leer la instrucción dentro de `{# ... #}` y generar el texto Markdown correspondiente inmediatamente debajo del bloque de comentario.
2. **Generación Contextual:** Las directivas dentro del comentario pueden referenciar variables globales (`{{ datos }}`) o el contexto circundante del documento.
3. **No Inclusión en la Salida Final:** La directiva `{# ... #}` sirve de guía para el LLM durante el procesamiento, pero **debe ser removida del archivo Markdown final (`.md`)**.

### 3.2 Ejemplos de Uso de Directivas LLM

```markdown
# Reporte de Auditoría: {{ empresa.nombre }}

{# Genera un resumen ejecutivo de máximo 3 párrafos con tono formal. 
   Enfatiza los hallazgos críticos de la variable {{ empresa.auditoria }}. #}

## Diagnóstico del Sistema

{# Redacta una tabla comparativa con los pros y contras de la arquitectura actual. 
   Usa viñetas para la columna de observaciones. #}
```

---

## 4. Interpolación y Filtros de Formato

Las variables se insertan usando llaves dobles. Para adaptar el contenido al formato de Markdown, se pueden encadenar **filtros**:

```markdown
# Reporte de {{ proyecto.nombre | upper }}

**Autor:** {{ autor.nombre | title }}
**Fecha:** {{ fecha_creacion | date:"YYYY-MM-DD" }}
**Estado:** {{ estado | default:"Pendiente" }}
```

### Filtros Especiales para Markdown

| Filtro | Sintaxis de Ejemplo | Salida Renderizada |
| :--- | :--- | :--- |
| `bold` / `italic` | `{{ texto \| bold }}` | Encierra el texto entre negritas Markdown (`**texto**`). |
| `code` | `{{ valor \| code }}` | Encierra en código inline (``` valor ```). |
| `escape_md` | `{{ titulo \| escape_md }}` | Escapa caracteres reservados (`*`, `_`, `#`, `[`, `]`). |
| `slugify` | `{{ seccion \| slugify }}` | Convierte a formato URL/Anchor (`"Mi Sección"` &rarr; `"mi-seccion"`). |

---

## 5. Estructuras de Control

### 5.1 Condicionales (`if / elif / else`)

```markdown
{% if usuario.es_premium %}
> **Nota Premium:** Gracias por ser un suscriptor activo.
{% elif usuario.en_prueba %}
> **Aviso:** Tu periodo de prueba vence en {{ usuario.dias_restantes }} días.
{% else %}
> Registro estándar sin suscripción activa.
{% endif %}
```

### 5.2 Bucles e Iteración (`for`)

```markdown
## Lista de Tareas Pendientes

{% for tarea in tareas -%}
- [{% if tarea.completada %}x{% else %} {% endif %}] {{ tarea.descripcion }} ({{ tarea.prioridad | upper }})
{# Si la tarea está vencida, agrega una nota en cursiva explicando la urgencia en una frase corta. #}
{% empty %}
*No hay tareas pendientes en este proyecto.*
{% endfor %}
```

---

## 6. Etiquetas Especiales

### 6.1 Generador Automático de Tablas (`{% table %}`)

```markdown
{% table data=matriz_servidores, cols=["Host", "IP", "Estado"], align=["left", "center", "right"] %}
```

### 6.2 Inclusión de Parciales (`{% include %}`)

```markdown
{% include "headers/licencia.md.tmpl" %}
```

---

## 7. Ejemplo Práctico Completo

### Plantilla de Entrada (`documento.md.tmpl`)

```markdown
# Informe Técnico: {{ proyecto.nombre }}

{# Escribe una introducción técnica explicando la importancia de este proyecto 
   basándote en el objetivo: {{ proyecto.objetivo }}. Mantén un tono profesional. #}

## Análisis de Arquitectura

{% for modulo in proyecto.modulos -%}
### Módulo: {{ modulo.nombre }}

{# Genera una descripción detallada del funcionamiento de este módulo. 
   Incluye sus dependencias principales si aplica. #}

**Rendimiento:** {{ modulo.score_rendimiento | default:"N/A" }}
{% endfor %}

## Conclusiones y Recomendaciones

{# Elabora 3 conclusiones clave a partir de todo el análisis anterior 
   y preséntalas en una lista numerada con viñetas en negrita. #}
```

### Salida Renderizada por el LLM (`documento.md`)

```markdown
# Informe Técnico: Sistema de Pagos Cloud

El proyecto Sistema de Pagos Cloud tiene como objetivo principal modernizar la infraestructura de procesamiento de transacciones financieras. La implementación de esta arquitectura busca garantizar alta disponibilidad, baja latencia y el cumplimiento de los estándares internacionales de seguridad bancaria.

## Análisis de Arquitectura

### Módulo: Pasarela de Pagos

Este módulo administra la integración con los proveedores de tarjetas de crédito y débito. Encarga el cifrado punto a punto (P2PE) de los datos sensibles y orquesta las reintentos automáticos en caso de fallos en la red.

**Rendimiento:** 99.98%

### Módulo: Detección de Fraude

Encargado de analizar el comportamiento transaccional en tiempo real mediante modelos de aprendizaje automático. Evalúa la geolocalización, montos atípicos y frecuencia de uso para mitigar riesgos operacionales.

**Rendimiento:** 95.50%

## Conclusiones y Recomendaciones

1. **Optimización de Latencia:** La separación del módulo de detección de fraude redujo el tiempo medio de respuesta a menos de 120ms.
2. **Escalabilidad Horizontal:** Se recomienda habilitar auto-scaling automático durante eventos de alta demanda transaccional.
3. **Monitoreo Continuo:** Mantener la auditoría de registros de seguridad para asegurar el cumplimiento PCI-DSS.
```

---

## 8. Resumen de Buenas Prácticas para LLMs

1. **Claridad en los Comentarios:** Redactar los comentarios `{# ... #}` como prompts precisos, indicando el formato exacto de salida (listas, tablas, párrafos, tono).
2. **Limpieza de Sintaxis:** Asegurarse de remover los delimitadores `{# ... #}` y `{% ... %}` en el archivo Markdown compilado para entregar un documento limpio.
3. **Respeto a la Estructura Markdown:** Mantener las jerarquías de encabezados (`#`, `##`, `###`) intactas y dejar los saltos de línea requeridos alrededor de listas y bloques de código.