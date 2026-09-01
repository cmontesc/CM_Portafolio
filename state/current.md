# Estado actual

Actualizado: 2026-09-01.

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
- Repositorio Git local inicializado en rama `main`; remoto planificado: `cmontesc/CM_Portafolio`.
- `npm run lint` y `npm run build` pasan al 2026-09-01.
- Memoria persistente inicial instalada en `AGENTS.md`, `state/`, `decisions/`, `gotchas/`, `logs/` y `skills/`.

## Pendiente priorizado

1. Definir dónde y cómo se publicará el sitio público.
2. Respaldar/optimizar imágenes externas críticas para evitar roturas y reducir peso.
3. Probar los flujos públicos y del admin en móvil y navegador real.
4. Decidir si el contenido seguirá siendo local o migrará a un backend/CMS compartido.
5. Revisar consistencia de idioma en textos públicos.

## Bloqueos

- Creación del remoto GitHub pendiente: el navegador no tiene sesión iniciada y `gh` no está instalado en la máquina.

## Verificación rápida

- Desarrollo: `npm run dev` → `http://127.0.0.1:3000/`.
- Admin: `http://127.0.0.1:3000/admin-local.html`.
- Tipos: `npm run lint`.
- Producción: `npm run build` y comprobar que `dist/` no contiene el admin.
