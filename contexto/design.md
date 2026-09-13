# Contexto de diseño — Olivia

Fuente canónica detallada: `../DESIGN.md`. Implementación visible: `../src/index.css` y `../src/views/DesignSystemView.tsx`.

## Invariantes

- Tipografía: Inter Tight en títulos, cuerpo y UI; principales en 300, controles en 400 y énfasis editorial en 500.
- Colores: texto principal `#061b31`, acción `#533afd`, fondo `#ffffff`, superficie `#f8fafd`, borde `#e5edf5`.
- Geometría: radio de 4 px en tarjetas, botones, inputs y contenedores; píldora solo para chips/badges.
- Profundidad: bordes de 1 px y contraste de superficies; sin sombras oscuras difusas ni glassmorphism.
- Layout: máximo 1320 px; padding 24/48/64/80 px; separación Home 64/80/96 px y casos 48 px.
- Catálogo: Mosaico 1/2/3 columnas, Editorial 1/2, Filas 1. La documentación reutiliza ProjectCard y lee los tokens de CSS.
- Evitar gradientes multicolor, tarjetas anidadas y etiquetas truncadas.

## Antes de cambiar UI

1. Identificar el token/componente existente más cercano.
2. Comprobar desktop y móvil.
3. Mantener contraste, estados hover/focus y etiquetas en una línea.
4. Si se cambia una invariante, actualizar primero `DESIGN.md` y registrar la decisión.

