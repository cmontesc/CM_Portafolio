# Olivia — Design System & Architecture Guidelines

> **Portafolio Profesional de Carlos Montes · Senior Product Designer**  
> Especificación técnica, tokens de diseño, principios visuales y estándares de ingeniería de interfaz del sistema de diseño Olivia.

---

## 1. Filosofía & Principios de Diseño

El sistema visual **Olivia** (nombrado en honor a mi hija) se fundamenta en la claridad, la sobriedad tipográfica y la precisión matemática de diseño de producto de alto impacto:

1. **Jerarquía Whisper-Weight (300 Light)**: Los títulos y encabezados de gran escala se ejecutan en peso liviano (`font-light` / 300) con tracking negativo matemáticamente calibrado, generando alto contraste y elegancia sin saturación visual.
2. **Geometría Rigurosa (4px Radius)**: Todas las tarjetas, botones, inputs y contenedores modulares utilizan un radio de esquina uniforme de **4px** (`rounded-[4px]`), reservando `rounded-full` exclusivamente para badges y chips de categoría píldora.
3. **Lienzo Limpio y Bordes de 1px**: Ausencia de sombras pesadas (*drop shadows*) o efectos de cristal difuminado (*glassmorphism*). La profundidad se logra mediante contrastes de superficie sutiles (blanco puro `#ffffff` y niebla `#f8fafd`) enmarcados por bordes precisos de 1px (`#e5edf5`).
4. **Espaciado Rítmico de Contenedor**: Contenedor principal de contenido con ancho máximo estricto de **1320px**, con padding horizontal en escritorio de **80px** (`px-6 sm:px-12 md:px-16 lg:px-20`) y separación de secciones Home de **64 / 80 / 96px**; casos de estudio de **48px**.

---

## 2. Paleta de Colores & Design Tokens

### Colores de Marca & Acento (Brand & Action)
| Token | Variable CSS | HEX | Uso / Rol |
| :--- | :--- | :--- | :--- |
| **Indigo Ink** | `--color-indigo-ink` | `#533afd` | Acción principal, botones rellenos, links activos y navegación seleccionada |
| **Indigo Hover** | `--color-indigo-hover` | `#7389ff` | Hover de acento violeta para enlaces y botones secundarios |
| **Deep Violet** | `--color-deep-violet` | `#182659` | Trazos pesados de acento y marcos gráficos estructurados |
| **Amethyst Edge**| `--color-amethyst-edge` | `#7f71e6` | Borde violeta intermedio para acciones técnicas y tags |

### Tipografía & Textos (Text Tokens)
| Token | Variable CSS | HEX | Uso / Rol |
| :--- | :--- | :--- | :--- |
| **Midnight Ink** | `--color-midnight-ink` | `#061b31` | Texto principal y títulos — negro profundo con subtono frío que ancla el sistema |
| **Slate** | `--color-slate` | `#64748d` | Texto secundario, sub-etiquetas, metadatos y enlaces de apoyo |
| **Steel** | `--color-steel` | `#50617a` | Párrafos de lectura, descripciones y textos explicativos |
| **Smoke** | `--color-smoke` | `#839bc8` | Subtítulos decorativos y etiquetas superiores de sección |

### Superficies & Fondos (Surfaces)
| Token | Variable CSS | HEX | Uso / Rol |
| :--- | :--- | :--- | :--- |
| **Pure White** | `--color-pure-white` | `#ffffff` | Lienzo principal de página y superficie base de tarjetas |
| **Mist** | `--color-mist` | `#f8fafd` | Fondo de bandas de sección, footer y separadores sutiles |
| **Frost** | `--color-frost` | `#e5edf5` | Borde principal de 1px, divisores estructurales y hover neutro |
| **Periwinkle Wash** | `--color-periwinkle-wash` | `#e8e9ff` | Superficie violeta suave para tags activos y bloques destacados |

### Bordes (Border Tokens)
| Token | Variable CSS | HEX | Uso / Rol |
| :--- | :--- | :--- | :--- |
| **Frost Border** | `--color-frost` | `#e5edf5` | Borde estándar de 1px en tarjetas, inputs y contenedores |
| **Lavender Border** | `--color-lavender-border` | `#b9b9f9` | Borde de 1px para botones Ghost Outline violetas |
| **Lilac Border** | `--color-lilac-border` | `#d6d9fc` | Borde suave para botones terciarios y divisores atenuados |

---

## 3. Sistema Tipográfico & Escala

**Fuente aplicada:** `Inter Tight` en títulos, cuerpo y UI (`--font-sans` y `--font-display` en `src/index.css`). Inter y Sohne no se aplican como familias separadas. Peso 300 en títulos principales y lectura, 400 en controles, 500 en énfasis editorial puntual.

| Uso actual | Móvil → sm (640px) → md (768px) | Interlineado / tracking |
| :--- | :--- | :--- |
| H1 Home | 36 → 46 → 56px | 1.05 → 1.03 / -1.4px |
| H1 catálogo | 36 → 48 → 48px | 1.03 / -0.96px |
| H1 caso de estudio | 32 → 44 → 50px | 1.12 / tight |
| H2 Home | 26 → 32 → 32px | normal / -0.64px |
| H2 editorial | 22px | normal / tight |
| Introducción Home | 16 → 18 → 19px | 1.625 / -0.16px |
| Lectura editorial | 14 → 16 → 16px | 1.625 |
| UI | 13–14px | según control / peso 400 |
| Metadatos | 11–12px | según contexto |

La escala visible documenta clases aplicadas; no implica variables CSS `--text-*`. Números tabulares mediante `font-feature-settings: 'ss01' on, 'tnum' on`.

---

## 4. Estándares de Componentes UI

### Botones
- **Radio de Esquina**: Estrictamente `rounded-[4px]`.
- **Botón Primario**: `bg-[#533afd] hover:bg-[#7389ff] text-white px-5 py-2.5 text-[14px] font-normal`.
- **Botón Ghost Outline (Indigo)**: `bg-white hover:bg-[#e8e9ff] text-[#533afd] border border-[#b9b9f9] px-5 py-2.5 text-[14px] font-normal`.
- **Botón Ghost Neutral**: `bg-[#f8fafd] hover:bg-[#e5edf5] text-[#061b31] border border-[#e5edf5] px-4 py-2 text-[13px] font-normal`.

### Tarjetas y catálogo
- Fuente: `src/components/ProjectCard.tsx`. La documentación reutiliza este componente con proyectos publicados, sin réplicas estáticas.
- Mosaico: 1 / 2 / 3 columnas (base / sm / lg). Editorial: 1 / 2 columnas (base / sm). Ambas usan altura 420 / 490px (base / sm), imagen `object-cover`, título y CTA visibles en móvil y overlay al hover/foco de teclado.
- Filas: una columna, altura uniforme 430 / 340 / 300px (base / sm / lg), overlay oscuro permanente; impacto lateral desde lg.
- Categorías derivadas del contenido publicado; etiquetas Figma, Vercel y Git según enlaces disponibles. Selección mediante clic, Enter o Espacio; foco índigo de 2px.
- Bordes Frost de 1px, radio de 4px. El overlay tonal oscuro sirve a la legibilidad de imágenes; no es un gradiente multicolor decorativo.
- Esmeralda se usa para señales de impacto y rosa para errores; no son nuevos acentos de marca.

### Home y navegación
- Home muestra hasta seis principales publicados; fallback a publicados si no hay principales.
- Banda de métricas Mist: `py-8 sm:py-12`, dos columnas y cuatro desde md, cifras 30 / 40 / 48px, gap 24 / 32 / 40px.
- Header de 64px, navegación desktop desde md y menú hamburguesa en móvil. Seleccionar una vista cierra el menú; no se usa scroll horizontal.
- Contenedor público: máximo 1320px, padding 24 / 48 / 64 / 80px (base / sm / md / lg).

### Casos de estudio y evidencia
- Ficha con metadatos en 2 / 4 columnas, introducción de 18 / 20px y separación de secciones de 48px.
- Carrusel opcional 16:9 con `object-contain`, anterior/siguiente e indicadores cuando hay más de una imagen.
- `EditorialCaseStudy` incorpora audiencias, proceso, hallazgo → decisión → solución, arquitectura, antes/después, restricciones y aprendizajes. Paneles Mist con padding 20 / 24px y títulos de sección de 22px.
- Galería editorial: solo evidencias públicas con URL y texto alternativo válidos, ordenadas por su orden editorial; imágenes sin recorte, con título/categoría/descripción cuando existen.
- Resultados cuantitativos, operativos y organizacionales: cifras solo si están verificadas; omitir secciones vacías. Testimonios solo con autorización registrada.

### Documentación viva
- `DesignSystemView.tsx` lee el bloque `@theme` desde `src/index.css` para mostrar y copiar la misma definición.
- La escala, radios y espaciados descriptivos no se presentan como tokens exportados si no existen en CSS.
- Las invariantes de 4px, bordes y ausencia de sombras oscuras siguen vigentes. Algunas implementaciones heredadas del sitio conservan detalles fuera de esas normas; documentar el estado no los convierte en nuevas reglas.

---

## 5. Reglas Anti-Slop (Calidad y Rigor de Interfaz)

1. ❌ **Prohibido el uso de degradados multicolores artificiales**: No usar gradientes violeta-azul en fondos o títulos.
2. ❌ **Prohibidas las tarjetas anidadas**: No colocar tarjetas dentro de otras tarjetas (*cards inside cards*). Usar espaciado y divisores de 1px.
3. ❌ **Prohibidos los radios mixtos o exagerados en tarjetas**: No usar `rounded-2xl` o `rounded-3xl` en cards de contenido; el radio de tarjeta siempre es **4px**.
4. ❌ **Prohibido el truncamiento de etiquetas en chips**: Todo chip o botón debe mantener su etiqueta en una sola línea (`whitespace-nowrap`).
5. ❌ **Prohibido el uso de sombras difusas oscuras**: No usar `shadow-2xl` o resplandores de neón. La estructura visual se define por la retícula y los bordes `#e5edf5`.

---

## 6. Sincronización de Datos vía Excel (`.xlsx`) y Panel Admin

El gestor de contenidos es local, en `admin-local.html`, excluido del build público:
- **Puerta de Entrada (Login Gate)**: Validación de usuario y contraseña en el cliente, sin seguridad de producción, visibilidad configurable y sesión guardada en `sessionStorage`.
- **`curriculum.xlsx`**:
  - Pestaña 1: `Perfil_Contacto` (Datos personales, links, resumen bio).
  - Pestañas 2+: Una pestaña por empresa con estructura estándar (`Rol`, `Periodo`, `Tipo`, `Descripcion`, `Logros`, `Skills`).
- **`proyectos.xlsx`**:
  - Una pestaña por cada caso de estudio con metadatos completos y la columna `Principal (Home)` (`Sí` / `No`) para limitar la portada a un máximo de 6 proyectos destacados.
- **Herramientas de Administrador**: Descarga de plantillas vivas, carga interactiva con feedback en tiempo real y botón de restauración de fábrica.
