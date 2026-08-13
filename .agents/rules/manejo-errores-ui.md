---
trigger: model_decision
description: Manejo de estados de ui y errores
---

- **Soporte Completo de Estados en UI:**
  Todo componente que consuma datos asíncronos DEBE renderizar explícitamente los 4 estados de la interfaz:
  1. **Loading:** Componentes esqueleto (*Skeletons*) o indicadores de carga.
  2. **Error:** Mensaje amigable de error con opción de reintento (*Retry*).
  3. **Empty:** Estado vacío claro cuando no existen registros que mostrar.
  4. **Success:** Renderizado de la información.
- **Aislamiento de Errores (Error Boundaries):** Envuelve componentes críticos o secciones completas en `ErrorBoundary` para evitar el colapso general de la aplicación.
- **Encadenamiento Opcional y Coalescencia Nula:** Usa `?.` y `??` para acceso seguro a propiedades anidadas o provisión de valores por defecto. Evita operadores OR `||` cuando el valor válido pueda ser `0` o `""`.