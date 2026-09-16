# Diagrama de Arquitectura: {{ producto.nombre }}

**Tipo de Producto:** {{ producto.tipo }}  
**Versión:** {{ producto.version | default:"v1.0.0" }}

---

## 1. Diagrama de Contexto (C4 - Level 0)

```mermaid
graph TB
    subgraph Sistema["{{ producto.nombre }}"]
        A[{{ producto.nombre }} - Core] --> B[Base de Datos]
        A --> C[API Gateway / Servidor]
    end

    Usuario((Usuario)) -->|Interactúa con| Sistema
    ServiciosExternos((Servicios Externos)) -->|Integra con| Sistema
```

---

## 2. Diagrama de Componentes (C4 - Level 1)

```mermaid
graph TB
    subgraph "{{ producto.nombre }} - Arquitectura Interna"
        Cliente[Cliente / Frontend] -->|HTTP/HTTPS| API[API / Backend]
        API -->|Consultas| BD[(Base de Datos)]
        API -->|Caché| Cache[(Capa de Caché)]

        subgraph "Autenticación"
            Auth[Servicio de Identidad]
        end
        API -->|Token Validation| Auth

        subgraph "Mensajería"
            MQ[(Cola de Mensajes)]
        end
        API -->|Eventos| MQ
        MQ -->|Asincrónico| Workers[Workers / Workers]

        subgraph "Almacenamiento"
            Storage[Almacenamiento de Archivos]
        end
        API -->|Upload/Download| Storage
    end

    externalsistema_1[Sistema Externo 1] -.->|API REST| API
    externalsistema_2[Sistema Externo 2] -.->|Webhook| API
```

---

## 3. Notas

- **Actores externos** (en el recuadro redondeado) representan entidades fuera del sistema que interactúan con él.
- **Servicios principales** (dentro del recuadro del sistema) representan los componentes internos.
- Adaptar los componentes según el tipo de producto:
  - **Web/Móvil:** Incluir Frontend, Backend, Base de Datos.
  - **API:** Incluir API Gateway, Servicios, Base de Datos, Auth.
  - **CLI/Escritorio:** Incluir Aplicación, Base de Datos local, Servicios remotos.
