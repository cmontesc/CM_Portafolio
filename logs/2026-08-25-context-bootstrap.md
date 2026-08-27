# Inicio de memoria persistente — 2026-08-25

## Resultado

- Se inventarió la estructura y se identificaron las fuentes canónicas de arquitectura, diseño, datos y build.
- Se creó la memoria persistente mínima solicitada.
- Se registraron arquitectura vigente, estado, reglas verificables y gotchas reproducibles.
- Se confirmó que el proyecto no tiene repositorio Git en esta carpeta.

## Evidencia

- `npm run lint`: pasa.
- `npm run build`: pasa; Vite genera únicamente la entrada pública configurada.
- Persistencia local verificada en `src/context/PortfolioDataContext.tsx` mediante claves `cm_portfolio_*`.
- Separación del admin verificada en `vite.config.ts`, `src/admin/main.tsx` y `.gitignore`.

## Pendiente heredado

Consultar `state/current.md`; no duplicar aquí su lista vigente.

