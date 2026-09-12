# Medición de contenidos en GA4

La SPA envía los siguientes eventos mediante el Google tag existente `G-RG7VERNXSH`:

| Evento | Cuándo se envía | Uso |
| --- | --- | --- |
| `page_view` | Al abrir una vista o proyecto | Alimenta Páginas y pantallas con rutas virtuales. |
| `portfolio_content_view` | Al abrir una vista o proyecto | Compara tipos de contenido y casos de estudio. |
| `portfolio_section_view` | Cuando una sección permanece al menos 1 segundo con 50% visible | Permite ordenar las secciones más consultadas. |

Rutas virtuales principales: `/`, `/curriculum`, `/projects`, `/proyectos/{id}`, `/contact` y `/design-system`.

## Dimensiones personalizadas

Estas dimensiones con alcance **Evento** fueron creadas en la propiedad **CM_Portafolio** el 2026-09-11:

| Nombre sugerido | Parámetro del evento |
| --- | --- |
| Tipo de contenido | `content_type` |
| ID de contenido | `content_id` |
| Nombre del contenido | `content_name` |
| Vista del portafolio | `view_name` |
| ID de sección | `section_id` |
| Nombre de sección | `section_name` |
| Posición de sección | `section_position` |
| Categoría del proyecto | `project_category` |
| Empresa del proyecto | `project_company` |

GA4 recopila los parámetros desde el despliegue, pero las dimensiones personalizadas solo informan datos recibidos después de su creación.

## Informes recomendados

- **Contenido más visto:** Informes → Interacción → Páginas y pantallas; usar `Ruta de página` y `Título de página`.
- **Proyectos más vistos:** Explorar → Formato libre; filas `Nombre del contenido`, valores `Número de eventos`, filtro `Nombre del evento = portfolio_content_view` y `Tipo de contenido = project`.
- **Secciones más vistas:** Explorar → Formato libre; filas `Nombre de sección`, columnas `Nombre del contenido`, valores `Número de eventos`, filtro `Nombre del evento = portfolio_section_view`.

En `localhost` y `127.0.0.1` no se envían eventos a GA4. Para verificar la instrumentación local, revisar `window.portfolioAnalyticsDebug` en la consola del navegador.
