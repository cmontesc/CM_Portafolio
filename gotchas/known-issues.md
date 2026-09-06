# Gotchas conocidos

## La sincronización del admin requiere Vite local

- Señal: el administrador muestra un error de sincronización o Git no detecta una edición reciente.
- Causa: el snapshot versionado se escribe mediante el middleware local de Vite; `localStorage` por sí solo no puede modificar archivos.
- Mitigación: mantener `npm run dev` activo, comprobar el indicador «Listo para el próximo commit» y revisar `src/data/portfolioContent.json`. El historial de versiones permanece solo en el navegador y Excel sigue siendo el respaldo portable.

## El login local no protege un despliegue público

- Señal: credenciales y comprobación existen en el bundle cliente del admin.
- Causa: `VITE_*` se inyecta en frontend y la sesión usa `sessionStorage`.
- Mitigación: mantener el admin fuera de producción; usar backend/autenticación real si cambia el alcance.

## Importación Excel completa campos faltantes

- Señal: un archivo incompleto produce textos, métricas o imágenes por defecto en vez de fallar en todos los casos.
- Causa: `src/services/excelService.ts` aplica fallbacks permisivos.
- Mitigación: previsualizar y validar ID, título, empresa y campos críticos antes de reemplazar contenido.

## Imágenes externas pueden fallar

- Señal: portadas rotas, lentas o distintas tras cambios de terceros.
- Causa: varios proyectos dependen de URLs externas, incluidas imágenes de Unsplash.
- Mitigación: guardar y optimizar localmente las imágenes críticas; comprobar peso y rutas con el build.

## Datos Base64 heredados pueden llenar `localStorage`

- Señal: al guardar o subir una imagen, el administrador deja de renderizar o el navegador informa `QuotaExceededError`.
- Causa: versiones anteriores duplicaban la imagen Base64 en proyectos, repositorio e historial local.
- Mitigación: las cargas nuevas se guardan directamente en `public/uploads/` y solo persisten su ruta. Al iniciar, el contexto reemplaza o retira imágenes Base64 heredadas y controla cualquier error de escritura sin dejar la página en blanco.

## `dashboard.html` puede estar desactualizado

- Señal: afirma, por ejemplo, que no existe historial aunque el código ya mantiene hasta 30 versiones.
- Causa: es un diagnóstico estático de 1.782 líneas, no una fuente de ejecución.
- Mitigación: confirmar contra código y `state/current.md`; consultar solo secciones puntuales.
