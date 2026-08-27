# Arquitectura vigente y memoria persistente

Fecha de registro: 2026-08-25. Estado: aceptada mientras no exista una decisión posterior.

## ADR-001 — Sitio público y administrador local separados

Contexto: el portafolio necesita una superficie pública y una herramienta privada simple para edición personal.

Decisión: el build público usa solo `index.html`. `admin-local.html` y `src/admin/` permanecen fuera del paquete y el admin se bloquea fuera de `DEV`/localhost.

Razonamiento: reduce superficie publicada y evita presentar una validación de credenciales cliente como seguridad real.

Consecuencias: el admin requiere entorno local; si se necesita acceso remoto habrá que diseñar autenticación y backend reales.

## ADR-002 — Contenido base en código y personalización en navegador

Contexto: el sitio debe funcionar sin backend y permitir edición/importación local.

Decisión: `src/data/portfolioData.ts` es el contenido base; cambios, versiones e imágenes del admin se guardan en claves `cm_portfolio_*` de `localStorage`. Excel es respaldo/intercambio manual.

Razonamiento: operación simple, barata y sin infraestructura.

Consecuencias: los cambios no se sincronizan entre navegadores y pueden perderse al borrar datos locales. No es un CMS multiusuario.

## ADR-003 — Navegación SPA sin router

Contexto: el sitio tiene pocas vistas y no requiere rutas de servidor actualmente.

Decisión: `src/App.tsx` controla vistas con `AppView` y estado React.

Razonamiento: mantiene la implementación pequeña.

Consecuencias: no hay URLs profundas por proyecto; agregar SEO o enlaces directos por caso exigirá revisar esta decisión.

## ADR-004 — Memoria operativa en archivos pequeños

Contexto: decisiones, estado y riesgos se perdían entre sesiones o estaban mezclados en archivos extensos como `dashboard.html`.

Decisión: `AGENTS.md` controla la lectura; `state/`, `decisions/`, `gotchas/` y `logs/` separan memoria por función. `skills/actualizar-contexto.md` se ejecuta solo al cerrar sesiones importantes.

Razonamiento: permite recuperar contexto útil con pocas lecturas y evita cargar historial o código completo.

Consecuencias: la memoria debe mantenerse al cerrar hitos; archivos obsoletos deben comprimirse o eliminarse.

