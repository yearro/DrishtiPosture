---
trigger: model_decision
description: Reglas estrictas de typescript
---

- **Prohibición Total de `any`:** El tipo `any` está **estrictamente prohibido**. Utiliza tipos específicos, genéricos, o `unknown` junto con guardas de tipo (*type guards*) si el tipo no se conoce con antelación.
- **Tipado Explícito de Props (Sin `React.FC`):**
  - NO utilices `React.FC` ni `React.FunctionComponent`. Define siempre una `interface` o `type` dedicada para las props del componente y decláralas directamente en la firma de la función:
    ```tsx
    // CORRECTO
    export interface UserProfileCardProps {
      userId: string;
      name: string;
      email: string;
      avatarUrl?: string;
      onSelect?: (userId: string) => void;
    }

    export function UserProfileCard({
      userId,
      name,
      email,
      avatarUrl,
      onSelect,
    }: UserProfileCardProps) {
      // ...
    }
    ```
- **Interfaces vs Types:**
  - Usa `interface` para definir las props de los componentes y estructuras de objetos extensibles.
  - Usa `type` para uniones (`type Status = 'idle' | 'loading' | 'success' | 'error'`), tuplas, tipos utilitarios o combinaciones complejas.
- **Tipado Explícito de Eventos:** Utiliza los tipos genéricos de eventos del DOM proporcionados por React:
  - Clics: `React.MouseEvent<HTMLButtonElement>`
  - Inputs / Cambios: `React.ChangeEvent<HTMLInputElement>`
  - Formularios: `React.FormEvent<HTMLFormElement>`
  - Teclado: `React.KeyboardEvent<HTMLInputElement>`
- **Inmutabilidad y Readonly:** Utiliza `readonly` en arrays o propiedades de estado que no deban mutar directamente.