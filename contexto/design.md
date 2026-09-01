# Contexto de diseño — Olivia

Fuente canónica detallada: `../DESIGN.md`. Implementación visible: `../src/index.css` y `../src/views/DesignSystemView.tsx`.

## Invariantes

- Tipografía: Inter Tight para títulos; Inter para cuerpo/UI; jerarquías principales en peso 300.
- Colores: texto principal `#061b31`, acción `#533afd`, fondo `#ffffff`, superficie `#f8fafd`, borde `#e5edf5`.
- Geometría: radio de 4 px en tarjetas, botones, inputs y contenedores; píldora solo para chips/badges.
- Profundidad: bordes de 1 px y contraste de superficies; sin sombras oscuras difusas ni glassmorphism.
- Layout: contenido máximo de 1320 px, padding horizontal progresivo y ritmo vertical amplio.
- Evitar gradientes multicolor, tarjetas anidadas y etiquetas truncadas.

## Antes de cambiar UI

1. Identificar el token/componente existente más cercano.
2. Comprobar desktop y móvil.
3. Mantener contraste, estados hover/focus y etiquetas en una línea.
4. Si se cambia una invariante, actualizar primero `DESIGN.md` y registrar la decisión.

