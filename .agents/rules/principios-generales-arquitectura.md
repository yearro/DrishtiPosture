---
trigger: model_decision
description: Principios generales y de arquitectura
---

- **Principio de Responsabilidad Única (SRP):** Cada componente debe realizar una sola función visual o lógica. Si un componente supera las ~150 líneas de código, subdivídelo en subcomponentes o abstrae la lógica a Custom Hooks.
- **Componentes Funcionales Exclusivos:** Usa exclusivamente componentes funcionales. Queda estrictamente prohibido el uso de componentes de clase (`React.Component`).
- **Estructura Modular de Archivos:** Co-localiza el código relevante por módulo o característica. Estructura preferida por componente:
  ```text
  src/components/UserProfileCard/
  ├── UserProfileCard.tsx
  ├── UserProfileCard.types.ts
  ├── UserProfileCard.styles.ts (o UserProfileCard.module.css / Tailwind)
  ├── UserProfileCard.test.tsx
  └── index.ts
  ```
- **Convenciones de Nomenclatura:**
  - Componentes React: `PascalCase` (`UserProfileCard.tsx`).
  - Custom Hooks: `camelCase` comenzando con `use` (`useUserProfile.ts`).
  - Archivos de Utilidades/Helpers: `camelCase` (`formatDate.ts`).
  - Tipos e Interfaces: `PascalCase` (`UserProfileCard.types.ts`).
  - Constantes globales: `UPPER_SNAKE_CASE` (`MAX_RETRY_COUNT`).
