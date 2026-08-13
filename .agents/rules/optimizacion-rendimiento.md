---
trigger: model_decision
description: Optimización y rendimiento
---

- **Uso Justificado de `useCallback` y `useMemo`:**
  - No apliques `useCallback` o `useMemo` de forma indiscriminada.
  - Úsalos ÚNICAMENTE cuando:
    1. Se pasen callbacks como props a componentes hijos optimizados envueltos en `React.memo`.
    2. Se calculen operaciones computacionalmente costosas (ej. filtrado/transformación de grandes arrays).
    3. Sean dependencias de un hook `useEffect`.
- **Claves Estables en Listas (`key`):**
  - Toda renderización de listas (`.map()`) DEBE incluir una propiedad `key` única y estable vinculada al ID del objeto (`item.id`).
  - **PROHIBIDO** usar el índice del array (`index`) como `key` si la lista puede cambiar de orden, filtrarse o eliminar elementos.
- **Carga Diferida (Lazy Loading):**
  - Implementa `React.lazy` y `React.Suspense` para componentes pesados o vistas de rutas secundarias.