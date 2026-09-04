# Sincronización del contenido local con Git

Fecha de registro: 2026-09-04. Estado: aceptada. Complementa y reemplaza parcialmente ADR-002.

## ADR-005 — Snapshot versionado desde el administrador local

Contexto: las ediciones del administrador solo vivían en `localStorage`, por lo que Git no podía detectarlas ni publicarlas en el siguiente commit.

Decisión: durante desarrollo local, `PortfolioDataContext` envía un snapshot del contenido a un middleware exclusivo de Vite. El middleware valida proyectos y estados, normaliza portadas y escribe atómicamente `src/data/portfolioContent.json`. Las imágenes cargadas como datos locales se guardan con nombre basado en hash dentro de `public/uploads/`. El sitio usa el snapshot versionado como contenido inicial y conserva `portfolioData.ts` como fallback. Un hook `pre-commit` agrega únicamente el snapshot y las imágenes sincronizadas al siguiente commit.

Razonamiento: convierte cada edición de contenido en un cambio de archivo visible para Git sin publicar el administrador ni introducir un backend remoto.

Consecuencias: el servidor de Vite debe estar activo para sincronizar; Git incluye automáticamente el snapshot y sus imágenes al crear un commit, pero no crea commits ni ejecuta `push`. El historial de versiones continúa solo en `localStorage`. El endpoint acepta únicamente solicitudes del administrador en localhost, valida tamaño, IDs únicos y estados permitidos, y no forma parte del build de producción.
