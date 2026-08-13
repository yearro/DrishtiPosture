---
trigger: model_decision
description: Reglas de generación de código para IA
---

Al responder a cualquier solicitud de creación o modificación de componentes:

1. **CÓDIGO 100% COMPLETO Y EJECUTABLE:**
   - **NUNCA** utilices comentarios que omitan código, tales como `// ... resto del código`, `// implementar aquí`, `/* ... */` o `// TODO`.
   - Genera siempre el archivo íntegro, listo para copiar, pegar y ejecutar.
2. **IMPORTACIONES EXPLICITAS:**
   - Incluye absolutamente todas las declaraciones de `import` requeridas por el archivo (React, hooks, tipos, iconos, componentes de librerías, etc.).
3. **NO SUPRIMIR REGLAS DE TYPESCRIPT:**
   - Queda prohibido el uso de `@ts-ignore`, `@ts-nocheck` o `@ts-expect-error` a menos que sea una limitación documentada de una librería externa.
4. **INCLUIR EJEMPLO DE USO:**
   - Después de definir el componente y sus archivos asociados, incluye un ejemplo breve pero completo mostrando cómo consumir el componente dentro de una página o componente contenedor.