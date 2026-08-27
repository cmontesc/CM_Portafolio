# Olivia — Design System & Architecture Guidelines

> **Portafolio Profesional de Carlos Montes · Senior Product Designer**  
> Especificación técnica, tokens de diseño, principios visuales y estándares de ingeniería de interfaz del sistema de diseño Olivia.

---

## 1. Filosofía & Principios de Diseño

El sistema visual **Olivia** (nombrado en honor a mi hija) se fundamenta en la claridad, la sobriedad tipográfica y la precisión matemática de diseño de producto de alto impacto:

1. **Jerarquía Whisper-Weight (300 Light)**: Los títulos y encabezados de gran escala se ejecutan en peso liviano (`font-light` / 300) con tracking negativo matemáticamente calibrado, generando alto contraste y elegancia sin saturación visual.
2. **Geometría Rigurosa (4px Radius)**: Todas las tarjetas, botones, inputs y contenedores modulares utilizan un radio de esquina uniforme de **4px** (`rounded-[4px]`), reservando `rounded-full` exclusivamente para badges y chips de categoría píldora.
3. **Lienzo Limpio y Bordes de 1px**: Ausencia de sombras pesadas (*drop shadows*) o efectos de cristal difuminado (*glassmorphism*). La profundidad se logra mediante contrastes de superficie sutiles (blanco puro `#ffffff` y niebla `#f8fafd`) enmarcados por bordes precisos de 1px (`#e5edf5`).
4. **Espaciado Rítmico de Contenedor**: Contenedor principal de contenido con ancho máximo estricto de **1320px**, con padding horizontal en escritorio de **80px** (`px-6 md:px-12 lg:px-20`) y separación vertical de secciones de **96px** (`py-12 md:py-24`).

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

**Fuentes:** `Inter Tight` (títulos y display) y `Inter` (cuerpo de texto y metadatos).

```
Display (H1 Hero)       → 56px (Desktop) / 40px (Mobile) | Line Height: 1.03 | Tracking: -1.40px | Weight: 300
Heading Large (H2)      → 48px (Desktop) / 36px (Mobile) | Line Height: 1.03 | Tracking: -0.96px | Weight: 300
Heading (H3)            → 32px (Desktop) / 26px (Mobile) | Line Height: 1.10 | Tracking: -0.64px | Weight: 300
Heading Small (H4)      → 26px (Desktop) / 22px (Mobile) | Line Height: 1.12 | Tracking: -0.26px | Weight: 300
Subheading (H5)         → 22px (Desktop) / 18px (Mobile) | Line Height: 1.10 | Tracking: -0.22px | Weight: 300
Body Large              → 20px (Desktop) / 17px (Mobile) | Line Height: 1.40 | Tracking: -0.20px | Weight: 300
Body Regular            → 16px (Desktop) / 15px (Mobile) | Line Height: 1.50 | Tracking: -0.16px | Weight: 300
Body Small / UI         → 14px (Desktop) / 13px (Mobile) | Line Height: 1.40 | Tracking: -0.14px | Weight: 400
Caption / Metadata      → 12px (Desktop) / 11px (Mobile) | Line Height: 1.45 | Tracking: -0.12px | Weight: 400 (Uppercase)
```

---

## 4. Estándares de Componentes UI

### Botones
- **Radio de Esquina**: Estrictamente `rounded-[4px]`.
- **Botón Primario**: `bg-[#533afd] hover:bg-[#7389ff] text-white px-5 py-2.5 text-[14px] font-normal`.
- **Botón Ghost Outline (Indigo)**: `bg-white hover:bg-[#e8e9ff] text-[#533afd] border border-[#b9b9f9] px-5 py-2.5 text-[14px] font-normal`.
- **Botón Ghost Neutral**: `bg-[#f8fafd] hover:bg-[#e5edf5] text-[#061b31] border border-[#e5edf5] px-4 py-2 text-[13px] font-normal`.

### Tarjetas de Proyecto (Product Cards)
- **Contenedor**: `bg-white border border-[#e5edf5] rounded-[4px] overflow-hidden hover:border-[#b9b9f9] transition-all duration-200`.
- **Imagen / Mockup**: Proporción 16:10 o altura uniforme con `bg-[#f8fafd]`.
- **Padding Interior**: `p-6 md:p-8 space-y-4`.
- **Chips de Categoría**: `px-3 py-1 bg-[#f8fafd] text-[#50617a] text-[12px] rounded-full border border-[#e5edf5] whitespace-nowrap`.

### Barra de Métricas de Reclutador
- **Banda de Ancho Completo**: `w-full bg-[#f8fafd] border-y border-[#e5edf5] py-12 md:py-16`.
- **Retícula Interior**: Contenedor centrado `max-w-[1320px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-2 lg:grid-cols-4 gap-8`.
- **Números de Impacto**: `text-[36px] sm:text-[44px] font-light text-[#061b31] tracking-tight tabular-nums`.

---

## 5. Reglas Anti-Slop (Calidad y Rigor de Interfaz)

1. ❌ **Prohibido el uso de degradados multicolores artificiales**: No usar gradientes violeta-azul en fondos o títulos.
2. ❌ **Prohibidas las tarjetas anidadas**: No colocar tarjetas dentro de otras tarjetas (*cards inside cards*). Usar espaciado y divisores de 1px.
3. ❌ **Prohibidos los radios mixtos o exagerados en tarjetas**: No usar `rounded-2xl` o `rounded-3xl` en cards de contenido; el radio de tarjeta siempre es **4px**.
4. ❌ **Prohibido el truncamiento de etiquetas en chips**: Todo chip o botón debe mantener su etiqueta en una sola línea (`whitespace-nowrap`).
5. ❌ **Prohibido el uso de sombras difusas oscuras**: No usar `shadow-2xl` o resplandores de neón. La estructura visual se define por la retícula y los bordes `#e5edf5`.

---

## 6. Sincronización de Datos vía Excel (`.xlsx`) y Panel Admin

El gestor de contenidos reside en una ruta protegida (`admin`) con control de acceso por credenciales:
- **Puerta de Entrada (Login Gate)**: Formulario seguro con usuario y contraseña, visibilidad configurable y sesión guardada en `sessionStorage`.
- **`curriculum.xlsx`**:
  - Pestaña 1: `Perfil_Contacto` (Datos personales, links, resumen bio).
  - Pestañas 2+: Una pestaña por empresa con estructura estándar (`Rol`, `Periodo`, `Tipo`, `Descripcion`, `Logros`, `Skills`).
- **`proyectos.xlsx`**:
  - Una pestaña por cada caso de estudio con metadatos completos y la columna `Principal (Home)` (`Sí` / `No`) para limitar la portada a un máximo de 6 proyectos destacados.
- **Herramientas de Administrador**: Descarga de plantillas vivas, carga interactiva con feedback en tiempo real y botón de restauración de fábrica.
