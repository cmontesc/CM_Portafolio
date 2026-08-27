# Portafolio Carlos Montes

Sitio personal de Carlos Montes, Senior Product Designer. La app está construida con Vite, React, Tailwind CSS y un administrador privado para gestionar contenido como CMS local, manteniendo Excel como formato de importación/exportación.

## Desarrollo Local

1. Instalar dependencias:
   `npm install`
2. Levantar el sitio:
   `npm run dev`
3. Generar build de producción:
   `npm run build`

## Administrador

La administración es local y está separada del sitio público. Para usarla, levanta el servidor local y entra a:

`http://127.0.0.1:3000/admin-local.html`

Desde el administrador puedes crear, editar, duplicar, publicar/despublicar, destacar en Home y eliminar proyectos. Los cambios se guardan en el navegador mediante almacenamiento local.

Excel sigue disponible como respaldo y migración:

- `proyectos.xlsx`: importa o exporta casos de estudio.
- `curriculum.xlsx`: importa o exporta información profesional.

El build de producción solo incluye `index.html`; el administrador local no se publica en `dist`.
