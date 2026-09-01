# Portafolio de Carlos Montes

Portafolio profesional de **Carlos Montes, Senior Product Designer**. Presenta su perfil, trayectoria, casos de estudio, información de contacto y la documentación del sistema de diseño Olivia en una SPA rápida y responsive.

## Características

- Home con hasta seis proyectos publicados y destacados.
- Currículum y catálogo de casos de estudio.
- Fichas detalladas de proyectos.
- Sección de contacto.
- Documentación visual del sistema de diseño Olivia.
- Contenido tipado con TypeScript y estados `published`, `draft` y `archived`.
- Build público separado de las herramientas de administración local.

## Tecnologías

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite 6](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- [SheetJS](https://sheetjs.com/) para importación y exportación de Excel en el entorno local

## Requisitos

- Node.js 20 o superior recomendado.
- npm.

## Inicio rápido

```bash
git clone https://github.com/cmontesc/CM_Portafolio.git
cd CM_Portafolio
npm ci
npm run dev
```

El sitio queda disponible en [http://127.0.0.1:3000](http://127.0.0.1:3000).

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor local en `127.0.0.1:3000`. |
| `npm run lint` | Comprueba los tipos con TypeScript sin generar archivos. |
| `npm run build` | Genera el build público de producción en `dist/`. |
| `npm run preview` | Sirve localmente el último build de producción. |

Antes de publicar cambios:

```bash
npm run lint
npm run build
```

## Arquitectura

La aplicación no utiliza un router. La navegación pública se gestiona mediante estado de React y el tipo `AppView`.

```text
index.html
└── src/main.tsx
    └── src/App.tsx
        ├── src/views/
        ├── src/components/
        ├── src/context/PortfolioDataContext.tsx
        └── src/data/portfolioData.ts
```

Rutas y archivos principales:

- `src/App.tsx`: composición de vistas y navegación.
- `src/data/portfolioData.ts`: contenido base del portafolio.
- `src/context/PortfolioDataContext.tsx`: estado editable y persistencia local.
- `src/types.ts`: contratos de datos compartidos.
- `src/index.css`: estilos globales y tokens visuales.
- `DESIGN.md`: especificación del sistema de diseño Olivia.
- `vite.config.ts`: configuración del build público con `index.html` como única entrada.

## Contenido y persistencia

El contenido base vive en `src/data/portfolioData.ts`. Los proyectos conservan IDs únicos y solo pueden usar los estados `published`, `draft` o `archived`.

La vista pública:

- nunca muestra proyectos en borrador o archivados;
- muestra como máximo seis proyectos en Home;
- prioriza proyectos publicados y marcados como principales.

Las ediciones realizadas con las herramientas locales se guardan en `localStorage`. Ese almacenamiento pertenece al navegador y **no es un respaldo remoto**.

## Administrador local

El proyecto original dispone de un administrador para editar contenido, manejar imágenes, importar o exportar Excel y restaurar versiones locales.

Por diseño, `admin-local.html` y `src/admin/` están excluidos de este repositorio público. El build de producción tampoco los incluye. En la copia de trabajo del autor, el administrador se ejecuta en:

```text
http://127.0.0.1:3000/admin-local.html
```

Las variables locales se documentan en `.env.local.example`:

```bash
cp .env.local.example .env.local
```

`.env.local` está ignorado por Git y nunca debe versionarse. La validación de credenciales ocurre en el cliente y sirve únicamente como barrera de conveniencia local; no constituye autenticación segura para producción.

## Build de producción

```bash
npm run build
npm run preview
```

Vite genera `dist/` usando únicamente `index.html`. `dist/` es una salida generada: no se edita ni se versiona directamente.

## Estructura del repositorio

```text
.
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── services/
│   └── views/
├── contexto/
├── decisions/
├── gotchas/
├── logs/
├── skills/
├── state/
├── DESIGN.md
├── index.html
├── package.json
└── vite.config.ts
```

## Licencia

Este repositorio no incluye actualmente una licencia de código abierto. Consulta con el autor antes de reutilizar el código o el contenido.
