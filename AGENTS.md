# Guía de agentes — CM Portafolio

## Identidad y propósito

Este repositorio contiene el portafolio profesional de Carlos Montes, Senior Product Designer. Es una SPA de React 19 + TypeScript + Vite 6 + Tailwind CSS 4 con dos superficies:

- Sitio público: presenta perfil, currículum, proyectos, casos de estudio, contacto y el sistema de diseño Olivia.
- Administrador local: permite editar contenido, importar/exportar Excel, gestionar imágenes y restaurar versiones guardadas en el navegador.

El objetivo es mantener un portafolio público rápido, coherente y publicable sin convertir el administrador local en un CMS remoto.

## Reglas duras e invariantes

- El context window es caro y volátil. La memoria real debe vivir en archivos.
- Nunca cargar todo el historial ni todos los archivos del proyecto.
- Cargar solo lo estrictamente necesario para la tarea actual.
- Preferir referenciar archivos antes que copiar contenido largo al prompt.
- Mantener este archivo conciso, de alta densidad y por debajo de 300 líneas.
- Convertir procedimientos repetitivos en skills reutilizables.
- Al final de cada sesión importante: actualizar `state/`, registrar decisiones y comprimir lo valioso en `logs/`.
- Al cerrar una sesión importante, correr `skills/actualizar-contexto.md`.
- Cumplir las reglas detectables de `reglas.md`.
- No leer ni mostrar `.env.local`; usar `.env.local.example` para conocer nombres de variables.
- No editar `dist/` directamente: es salida generada por `npm run build`.
- El build público debe seguir tomando solo `index.html`; `admin-local.html` y `src/admin/` son locales.
- No presentar la autenticación del admin como seguridad de producción: las credenciales se validan en el cliente.
- No asumir que todo el admin está respaldado: el contenido se sincroniza a `src/data/portfolioContent.json` solo con Vite local activo; versiones e historial siguen en `localStorage` y Excel continúa como respaldo portable.
- En Home mostrar como máximo seis proyectos publicados y principales; si no hay principales, usar hasta seis publicados.
- Conservar IDs de proyecto únicos y los estados `published`, `draft` o `archived`.
- Respetar las invariantes visuales de Olivia descritas en `DESIGN.md` y resumidas en `contexto/design.md`.

## Orden de lectura preferido

Leer solo hasta obtener el contexto suficiente para la tarea:

1. `AGENTS.md`.
2. `state/current.md` para estado, pendientes y bloqueos.
3. `reglas.md` para líneas rojas verificables.
4. Archivo(s) directamente relacionados con la tarea.
5. `contexto/design.md` o `DESIGN.md` solo para trabajo visual.
6. `contexto/decisiones.md` y el registro indicado en `decisions/` si la tarea afecta arquitectura o producto.
7. `gotchas/known-issues.md` cuando haya cambios en persistencia, admin, Excel, imágenes o build.
8. El log más reciente de `logs/` solo si falta contexto histórico.

No cargar por defecto:

- `dashboard.html`: artefacto diagnóstico histórico, no código de ejecución; buscar secciones puntuales si hiciera falta.
- `src/data/portfolioData.ts`: abrir solo la sección del contenido que se va a modificar.
- `src/context/PortfolioDataContext.tsx` y `src/services/excelService.ts`: son extensos; buscar primero símbolos o claves concretas.
- `dist/`, `node_modules/`, `package-lock.json` o todo `src/` de una vez.

## Mapa técnico mínimo

- Entrada pública: `index.html` → `src/main.tsx` → `src/App.tsx`.
- Navegación pública: estado React mediante `AppView`; no hay router ni rutas de servidor.
- Datos: snapshot versionado en `src/data/portfolioContent.json`, fallback en `src/data/portfolioData.ts` y tipos en `src/types.ts`.
- Estado editable: `src/context/PortfolioDataContext.tsx`.
- Excel: `src/services/excelService.ts`, cargado dinámicamente desde el admin.
- Entrada local: `admin-local.html` → `src/admin/main.tsx` → `src/admin/AdminView.tsx`.
- Diseño: `DESIGN.md`, `src/index.css` y `src/views/DesignSystemView.tsx`.
- Build: `vite.config.ts` incluye únicamente `index.html`.

## Qué procedimiento usar según la tarea

- Cierre de una sesión importante o cambio de fase: seguir `skills/actualizar-contexto.md`.
- UI, estilos, componentes o responsive: leer `contexto/design.md`; abrir `DESIGN.md` si se necesita detalle.
- Arquitectura, persistencia, publicación o cambio de alcance: revisar `contexto/decisiones.md` y registrar una decisión si cambia un compromiso vigente.
- CMS, Excel, imágenes o versiones: revisar `gotchas/known-issues.md` antes de editar.
- Contenido del portafolio: preferir el administrador para actualizar `src/data/portfolioContent.json`; editar `src/data/portfolioData.ts` solo como fallback y comprobar estados/IDs.
- Diagnóstico: ejecutar búsquedas focalizadas; no modificar hasta que la petición incluya el arreglo.

## Comportamiento con el contexto

- Tratar `state/current.md` como estado operativo, no como historial.
- Registrar en `decisions/` solo elecciones con alternativas y consecuencias duraderas.
- Registrar en `gotchas/` únicamente fallos o riesgos reproducibles con una mitigación concreta.
- Guardar en `logs/` resúmenes de sesiones importantes, no transcripciones.
- Actualizar en vez de acumular: eliminar datos obsoletos y consolidar entradas repetidas.
- Distinguir evidencia del código, decisiones confirmadas e hipótesis pendientes.
- No copiar documentación extensa entre archivos; mantener una fuente canónica y enlazarla.
- Si un cambio contradice memoria y código, verificar el comportamiento actual y actualizar la memoria en la misma sesión.

## Definition of Done

Una tarea de cambio está terminada cuando:

- El resultado solicitado está implementado sin cambios ajenos al alcance.
- `npm run lint` pasa para cambios TypeScript/React/configuración.
- `npm run build` pasa para cambios que afectan ejecución o publicación.
- Se verifican manualmente las invariantes afectadas: visibilidad por estado, límite Home, persistencia, admin local o reglas Olivia.
- No se incluyeron secretos ni se editó salida generada como fuente.
- `state/current.md` refleja cualquier cambio relevante de estado.
- Las decisiones duraderas, gotchas nuevos y aprendizajes importantes están registrados solo si cambiaron.
- Al cerrar una sesión importante se ejecutó `skills/actualizar-contexto.md` y el contexto final quedó más corto o igual de compacto que al inicio.

## Punteros de memoria

- Reglas canónicas: `reglas.md`.
- Estado vigente: `state/current.md`.
- Índice de decisiones: `contexto/decisiones.md`; registros: `decisions/`.
- Resumen visual: `contexto/design.md`; especificación completa: `DESIGN.md`.
- Gotchas: `gotchas/known-issues.md`.
- Procedimiento de mantenimiento: `skills/actualizar-contexto.md`.
- Resúmenes de sesiones: `logs/`.
