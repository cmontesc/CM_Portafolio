# Archivos deprecados

Archivados entre el 2026-09-12 y el 2026-09-13. No forman parte de la versión activa ni del build público.

| Ruta conservada | Motivo |
| --- | --- |
| `vite.config.backup.ts` | Respaldo antiguo; la configuración vigente es `../vite.config.ts`. |
| `vite.config.backup2.ts` | Segundo respaldo de configuración. |
| `dashboard.html` | Diagnóstico estático histórico; el estado vigente está en `../state/current.md`. |
| `images/carlos-montes-og.jpg` | Vista previa antigua sin referencias; index.html usa `/uploads/1d14e9387ad08c57.jpg`. |
| `public/uploads/799c19c4b71458c3.png` | Imagen sin referencias en el snapshot, fallback, HTML o configuración vigentes. |
| `docs/backups/schwager-2026-09-11.json` | Respaldo puntual del caso Schwager reemplazado por el snapshot actual. |
| `scripts/verify-schwager.mjs` | Verificación puntual ligada al respaldo anterior; no forma parte de los comandos vigentes. |
| `Icon\r` | Metadato vacío creado por Finder, sin referencias. |
| `.DS_Store` y copias en subcarpetas | Metadatos de Finder retirados de las carpetas activas. |

Se mantiene la estructura original para poder restaurar archivos manualmente. No reemplazar archivos vigentes sin comparar antes. TypeScript y Tailwind excluyen esta carpeta; Vite compila únicamente index.html.

Se conservaron activos el snapshot, el fallback, el administrador local, las herramientas de mantenimiento y todas las imágenes referenciadas por la versión vigente.
