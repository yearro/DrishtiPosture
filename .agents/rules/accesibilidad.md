---
trigger: model_decision
description: Accesibilidad (a11) y samántica HTML
---

- **Elementos Semánticos Nativo:** Usa la etiqueta HTML adecuada (`<button>`, `<nav>`, `<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
- **PROHIBIDO:** Usar `<div onClick={...}>` o `<span onClick={...}>` para elementos interactivos. Si es interactivo y ejecuta una acción, usa un `<button>`. Si navega, usa un `<a>` o el componente Link de tu enrutador.
- **Manejo de Teclado:** Todos los elementos interactivos deben ser enfocables (`tabIndex={0}`) y responder a la tecla `Enter` y `Space`.
- **Atributos ARIA:** Utiliza `aria-expanded`, `aria-hidden`, `aria-label`, `aria-describedby` y roles cuando la estructura HTML semántica no sea suficiente.
- **Imágenes:** Todo elemento `<img>` debe contar con la propiedad `alt` descriptiva (o `alt=""` para elementos meramente decorativos).