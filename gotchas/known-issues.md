# Gotchas conocidos

## Datos editados solo en el navegador

- Señal: otro navegador/equipo muestra el contenido base o se pierden cambios al limpiar datos.
- Causa: currículum, proyectos, versiones e imágenes usan `localStorage`.
- Mitigación: exportar Excel antes de limpiar/migrar; no prometer sincronización ni respaldo remoto.

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

## `dashboard.html` puede estar desactualizado

- Señal: afirma, por ejemplo, que no existe historial aunque el código ya mantiene hasta 30 versiones.
- Causa: es un diagnóstico estático de 1.782 líneas, no una fuente de ejecución.
- Mitigación: confirmar contra código y `state/current.md`; consultar solo secciones puntuales.

## La carpeta no tiene historial Git

- Señal: `git status` responde que no es un repositorio.
- Causa: no existe `.git` en la carpeta actual.
- Mitigación: verificar cambios por contenido, fechas y pruebas; inicializar Git solo por petición explícita.

