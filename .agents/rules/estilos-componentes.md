---
trigger: model_decision
description: Estilos y componentes de ui
---

- **Manejo Dinámico de Clases:** Utiliza utilidades como `clsx` o `cn()` (`tailwind-merge`) para combinar clases condicionales:
  ```tsx
  import { cn } from '@/lib/utils';

  <button className={cn('px-4 py-2 rounded-md', isActive && 'bg-blue-600 text-white')} />
  ```
- **Evitar CSS en Línea:** Queda prohibido el uso de `style={{ ... }}`, excepto para propiedades dinámicas calculadas en tiempo de ejecución (ej. posiciones de animaciones o gráficos dinámicos).
- **Diseño Responsive Mobile-First:** Aplica estilos pensando primero en dispositivos móviles y extendiendo mediante breakpoints (`md:`, `lg:`).