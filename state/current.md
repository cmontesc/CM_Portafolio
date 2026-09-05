# Estado actual

Actualizado: 2026-09-05.

## Hecho

- SPA pública con Home, currículum, catálogo, detalle de proyecto, contacto y documentación visual.
- Administrador disponible solo en desarrollo local mediante `admin-local.html`.
- Edición de perfil, currículum y proyectos; estados de publicación, duplicado, archivo y restauración.
- Importación/exportación Excel de currículum y proyectos.
- Repositorio local de imágenes e historial local de hasta 30 versiones.
- Build público configurado con una sola entrada: `index.html`.
- Home configurado para mostrar hasta seis proyectos publicados y principales, con fallback a publicados.
- Header público con navegación desktop y menú hamburguesa en mobile, sin scroll horizontal.
- Catálogo: vista Mosaico mantiene 3 columnas desktop; vista Editorial mantiene 2 columnas; vista Filas reemplaza Cuadrícula con una card full-width por proyecto y altura uniforme.
- Los casos de estudio admiten un carrusel opcional de imágenes de interfaz, persistido desde el admin y compatible con Excel.
- Repositorio Git inicializado en `main` y enlazado al remoto público `https://github.com/cmontesc/CM_Portafolio`.
- Google Analytics configurado en el sitio público con la propiedad `G-RG7VERNXSH`.
- El administrador sincroniza contenido automáticamente con `src/data/portfolioContent.json`; las portadas locales persistentes se guardan en `public/uploads/`.
- La edición de portadas ya no muestra el catálogo completo del repositorio; las imágenes archivadas y sin uso se pueden borrar definitivamente desde la sección Imágenes.
- `npm run lint` y `npm run build` pasan al 2026-09-05.
- Memoria persistente inicial instalada en `AGENTS.md`, `state/`, `decisions/`, `gotchas/`, `logs/` y `skills/`.

## Pendiente priorizado

1. Definir dónde y cómo se publicará el sitio público.
2. Respaldar/optimizar imágenes externas críticas para evitar roturas y reducir peso.
3. Probar los flujos públicos y del admin en móvil y navegador real.
4. Decidir si el contenido seguirá siendo local o migrará a un backend/CMS compartido.
5. Revisar consistencia de idioma en textos públicos.

## Bloqueos

- No hay bloqueo técnico actual.

## Verificación rápida

- Desarrollo: `npm run dev` → `http://127.0.0.1:3000/`.
- Admin: `http://127.0.0.1:3000/admin-local.html`.
- Tipos: `npm run lint`.
- Producción: `npm run build` y comprobar que `dist/` no contiene el admin.
