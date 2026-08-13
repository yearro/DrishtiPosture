---
trigger: model_decision
description: Gestión de estado y flujo de datos
---

- **Estado Mínimo y Derivado:**
  - NUNCA almacenes en `useState` valores que se puedan calcular durante el renderizado a partir de las props existentes o de otros estados.
- **Estado de Servidor vs Estado de UI Local:**
  - Para datos asíncronos y caché de red, utiliza librerías dedicadas como **TanStack Query (React Query)** o **SWR**.
  - Reserva `useState` / `useReducer` únicamente para estado efímero de UI (modales abiertos, valores de inputs locales, toggles).
- **Actualizaciones Funcionales de Estado:**
  - Si el nuevo valor de un estado depende del valor anterior, utiliza siempre la función colback de actualización:
    ```tsx
    setCount(prevCount => prevCount + 1);
    ```
