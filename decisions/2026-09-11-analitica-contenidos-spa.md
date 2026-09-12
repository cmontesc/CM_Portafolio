# ADR-008: analítica de contenidos y secciones en la SPA

Fecha: 2026-09-11  
Estado: aceptada

## Contexto

La navegación del portafolio usa estado React y no modifica la URL. La etiqueta de GA4 registraba la carga inicial, pero no permitía comparar las vistas internas, los proyectos ni las secciones consultadas.

## Decisión

Desactivar el `page_view` automático y emitir pageviews virtuales en cada cambio de contenido. Añadir los eventos `portfolio_content_view` y `portfolio_section_view`. Una sección cuenta como vista cuando su encabezado permanece al menos un segundo con 50% de visibilidad. Los eventos incorporan IDs y nombres estables de contenido, sección, categoría y empresa.

La etiqueta externa no se carga en `localhost`, `127.0.0.1` ni `::1`; en esos orígenes los eventos se registran en `window.portfolioAnalyticsDebug` y en la consola para validación.

## Consecuencias

- Páginas y pantallas puede ordenar las rutas virtuales del portafolio.
- Exploraciones puede comparar proyectos y secciones mediante las nueve dimensiones personalizadas creadas en la propiedad CM_Portafolio.
- Las vistas rápidas durante el desplazamiento no cuentan como interés en una sección.
- Las dimensiones empiezan a recopilar datos desde su creación; no reconstruyen datos históricos.
