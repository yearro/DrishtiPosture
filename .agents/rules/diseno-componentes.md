---
trigger: model_decision
description: Diseño de componentes y clean code
---

- **Funciones Nombradas:** Declara siempre los componentes con funciones nombradas (`export function MyComponent() ...`) en lugar de expresiones de función anónimas o flecha exportadas por defecto (`export default () => ...`). Esto mejora las trazas de error y la experiencia de depuración en React DevTools.
- **Destructuración de Props:** Desestructura siempre las props en los parámetros de la función y define valores predeterminados directamente en la destructuración nativa de ES6:
  ```tsx
  export function Button({ variant = 'primary', size = 'md', children }: ButtonProps) { ... }
  ```
- **Composición sobre Prop Drilling:**
  - Utiliza la prop `children` (`React.ReactNode`) para composición limpia de UI.
  - Si una prop debe pasar a través de más de 2 niveles de profundidad, refactoriza utilizando composición, React Context o un estado global ligero (ej. Zustand).
- **Separación Lógica/Presentación (Custom Hooks):**
  - La capa visual del componente debe mantenerse declarativa y limpia.
  - Cualquier llamada a API, cálculo pesado, o lógica de estado con efectos secundarios debe extraerse a un Custom Hook:
    ```tsx
    // Separación recomendada
    const { user, isLoading, error, handleUpdate } = useUserProfile(userId);
    ```