import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Smartphone, 
  Activity, 
  TrendingUp, 
  ShieldCheck, 
  Code2, 
  LayoutGrid, 
  Type, 
  Palette, 
  Component, 
  Sliders
} from 'lucide-react';

interface DesignSystemViewProps {
  onShowToast?: (msg: string) => void;
}

interface ColorToken {
  name: string;
  token: string;
  hex: string;
  role: string;
  textDark?: boolean;
  category: 'brand' | 'text' | 'surface' | 'border';
}

const COLOR_TOKENS: ColorToken[] = [
  // Brand & Action
  { name: 'Indigo Ink', token: '--color-indigo-ink', hex: '#533afd', role: 'Acción principal, botones rellenos, links activos y navegación seleccionada', category: 'brand' },
  { name: 'Indigo Hover', token: '--color-indigo-hover', hex: '#7389ff', role: 'Hover de acento violeta para enlaces y botones secundarios', category: 'brand' },
  { name: 'Deep Violet', token: '--color-deep-violet', hex: '#182659', role: 'Trazos pesados de acento y marcos gráficos estructurados', category: 'brand' },
  { name: 'Amethyst Edge', token: '--color-amethyst-edge', hex: '#7f71e6', role: 'Borde violeta intermedio para acciones técnicas y tags', category: 'brand' },

  // Text & Headings
  { name: 'Midnight Ink', token: '--color-midnight-ink', hex: '#061b31', role: 'Texto principal y títulos — negro profundo con subtono frío que ancla el sistema', category: 'text' },
  { name: 'Slate', token: '--color-slate', hex: '#64748d', role: 'Texto secundario, sub-etiquetas, metadatos y enlaces de apoyo', category: 'text' },
  { name: 'Steel', token: '--color-steel', hex: '#50617a', role: 'Párrafos de apoyo, descripciones y textos explicativos', category: 'text' },
  { name: 'Smoke', token: '--color-smoke', hex: '#839bc8', role: 'Subtítulos decorativos y etiquetas superiores de sección (nunca párrafos)', category: 'text' },

  // Surfaces & Backgrounds
  { name: 'Pure White', token: '--color-pure-white', hex: '#ffffff', role: 'Lienzo principal de página y superficie base de tarjetas', category: 'surface', textDark: true },
  { name: 'Mist', token: '--color-mist', hex: '#f8fafd', role: 'Fondo de bandas de sección, footer y separadores sutiles', category: 'surface', textDark: true },
  { name: 'Frost', token: '--color-frost', hex: '#e5edf5', role: 'Borde principal de 1px, divisores estructurales y hover neutro', category: 'surface', textDark: true },
  { name: 'Periwinkle Wash', token: '--color-periwinkle-wash', hex: '#e8e9ff', role: 'Superficie violeta suave para tags activos y bloques destacados', category: 'surface', textDark: true },

  // Borders
  { name: 'Lavender Border', token: '--color-lavender-border', hex: '#b9b9f9', role: 'Borde de 1px para botones Ghost Outline violetas', category: 'border', textDark: true },
  { name: 'Lilac Border', token: '--color-lilac-border', hex: '#d6d9fc', role: 'Borde suave para botones terciarios y divisores atenuados', category: 'border', textDark: true },
];

const TYPOGRAPHY_SCALE = [
  { role: 'display', size: '56px', sizeSm: '40px', lineHeight: '1.03', tracking: '-1.4px', weight: '300', sample: 'Diseño de Productos Digitales', token: '--text-display' },
  { role: 'heading-lg', size: '48px', sizeSm: '36px', lineHeight: '1.03', tracking: '-0.96px', weight: '300', sample: 'Experiencias Claras y Funcionales', token: '--text-heading-lg' },
  { role: 'heading', size: '32px', sizeSm: '26px', lineHeight: '1.10', tracking: '-0.64px', weight: '300', sample: 'Proyectos Destacados e Impacto', token: '--text-heading' },
  { role: 'heading-sm', size: '26px', sizeSm: '22px', lineHeight: '1.12', tracking: '-0.26px', weight: '300', sample: 'Arquitectura de Información & UI', token: '--text-heading-sm' },
  { role: 'subheading', size: '22px', sizeSm: '18px', lineHeight: '1.10', tracking: '-0.22px', weight: '300', sample: 'Sistemas escalables en fintech y salud', token: '--text-subheading' },
  { role: 'body-lg', size: '20px', sizeSm: '17px', lineHeight: '1.40', tracking: '-0.20px', weight: '300', sample: 'Diseñador de Productos Digitales con más de 10 años creando interfaces limpias.', token: '--text-body-lg' },
  { role: 'body', size: '16px', sizeSm: '15px', lineHeight: '1.20', tracking: '-0.16px', weight: '300', sample: 'Investigación con usuarios, definición de flujos, wireframes y sistemas de diseño.', token: '--text-body' },
  { role: 'body-sm', size: '14px', sizeSm: '13px', lineHeight: '1.40', tracking: '-0.14px', weight: '400', sample: 'Acciones de navegación, textos de botones y etiquetas de campos interactivos.', token: '--text-body-sm' },
  { role: 'caption', size: '12px', sizeSm: '11px', lineHeight: '1.45', tracking: '-0.12px', weight: '400', sample: 'METADATOS · CATEGORÍAS · FIGMA PROTOTYPE · 2026', token: '--text-caption' },
];

const SPACING_TOKENS = [
  { name: 'spacing-8', value: '8px', rem: '0.5rem', use: 'Gap entre elementos compactos, padding de tags' },
  { name: 'spacing-16', value: '16px', rem: '1.0rem', use: 'Padding estándar de tarjetas móviles, gap de columnas' },
  { name: 'spacing-24', value: '24px', rem: '1.5rem', use: 'Padding horizontal de botones, gap de grillas' },
  { name: 'spacing-32', value: '32px', rem: '2.0rem', use: 'Padding interno de Product Feature Cards' },
  { name: 'spacing-40', value: '40px', rem: '2.5rem', use: 'Separación entre bloques de contenido relacionados' },
  { name: 'spacing-48', value: '48px', rem: '3.0rem', use: 'Gap entre títulos y párrafos explicativos' },
  { name: 'spacing-64', value: '64px', rem: '4.0rem', use: 'Margen superior de secciones intermedias' },
  { name: 'spacing-80', value: '80px', rem: '5.0rem', use: 'Padding horizontal en desktop (1320px layout)' },
  { name: 'spacing-96', value: '96px', rem: '6.0rem', use: 'Separación vertical estándar entre secciones' },
];

const RADIUS_TOKENS = [
  { name: 'radius-cards', value: '4px', class: 'rounded-[4px]', appliesTo: 'Tarjetas de proyectos, feature cards, contenedores modulares' },
  { name: 'radius-buttons', value: '4px', class: 'rounded-[4px]', appliesTo: 'Botones primarios, ghost outline, inputs y selects' },
  { name: 'radius-inputs', value: '4px', class: 'rounded-[4px]', appliesTo: 'Campos de texto, textareas, controles de formulario' },
  { name: 'radius-tags', value: '9999px', class: 'rounded-full', appliesTo: 'Chips de categoría, badges de estado, contadores píldora' },
];

export const DesignSystemView: React.FC<DesignSystemViewProps> = ({ onShowToast }) => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'colors' | 'typography' | 'spacing' | 'components' | 'guidelines'>('all');
  const [demoChipCategory, setDemoChipCategory] = useState<string>('all');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    if (onShowToast) {
      onShowToast(`Copiado: ${label}`);
    }
    setTimeout(() => {
      setCopiedToken(null);
    }, 2500);
  };

  return (
    <div className="py-12 md:py-20 space-y-24 animate-in fade-in duration-200">
      
      {/* 1. Header & System Intro */}
      <section className="space-y-6 max-w-4xl">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e8e9ff] text-[#533afd] text-[12px] font-normal rounded-full border border-[#b9b9f9]/40">
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Sistema de Diseño v2.0 · Olivia</span>
          </span>
          <span className="text-[13px] text-[#64748d] font-light">
            · Documentación Oficial de Tokens y Componentes
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-[44px] sm:text-[56px] font-light text-[#061b31] tracking-[-1.4px] leading-[1.03]">
            Olivia — Design System
          </h1>
          <p className="text-[20px] sm:text-[22px] text-[#533afd] font-light tracking-[-0.22px]">
            indigo-ink ledger on frosted glass · nombrado en honor a mi hija
          </p>
        </div>

        <p className="text-[17px] text-[#50617a] font-light leading-relaxed max-w-3xl tracking-[-0.16px]">
          Lenguaje visual sobrio de precisión financiera: un lienzo blanco frío (<code className="px-1.5 py-0.5 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] text-[13px] text-[#061b31]">#ffffff</code>) con tipografía en negro profundo (<code className="px-1.5 py-0.5 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] text-[13px] text-[#061b31]">#061b31</code>) a peso 300 (<em className="italic">whisper weight</em>), ausencia total de sombras y un único acento índigo (<code className="px-1.5 py-0.5 bg-[#533afd] text-white rounded-[4px] text-[13px]">#533afd</code>) que se reserva exclusivamente para acciones y momentos de conversión.
        </p>

        {/* Quick Filter Navigation */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#e5edf5]">
          {[
            { id: 'all', label: 'Todo el Sistema', icon: LayoutGrid },
            { id: 'colors', label: 'Colores & Superficies', icon: Palette },
            { id: 'typography', label: 'Tipografía & Escala', icon: Type },
            { id: 'spacing', label: 'Espaciado & Formas', icon: Sliders },
            { id: 'components', label: 'Componentes & Mosaico', icon: Component },
            { id: 'guidelines', label: 'Reglas Do / Don’t', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-[4px] text-[13px] font-normal tracking-[-0.14px] transition-colors flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#533afd] text-white'
                    : 'bg-[#f8fafd] hover:bg-[#e8e9ff] text-[#50617a] hover:text-[#061b31] border border-[#e5edf5]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Color Palette & Surfaces Section */}
      {(activeTab === 'all' || activeTab === 'colors') && (
        <section className="space-y-10 pt-6 border-t border-[#e5edf5]">
          <div className="space-y-2">
            <div className="text-[12px] uppercase tracking-wider text-[#839bc8] font-normal">
              Tokens · Color & Surfaces
            </div>
            <h2 className="text-[32px] font-light text-[#061b31] tracking-[-0.64px]">
              Paleta Cromática y Jerarquía de Superficies
            </h2>
            <p className="text-[16px] text-[#64748d] font-light tracking-[-0.16px] max-w-3xl">
              La elevación no usa sombras (<code className="text-[13px] text-[#061b31]">box-shadow: none</code>). La profundidad se logra mediante una progresión gradual de tintes de fondo (<span className="text-[#061b31] font-normal">White → Mist → Frost → Periwinkle → Indigo</span>) y líneas de 1px en <code className="text-[13px] text-[#061b31]">#e5edf5</code>.
            </p>
          </div>

          {/* Color Tokens Swatches Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COLOR_TOKENS.map((token) => {
              const isCopied = copiedToken === token.hex || copiedToken === token.token;
              return (
                <div
                  key={token.name}
                  className="p-4 bg-white border border-[#e5edf5] rounded-[4px] flex flex-col justify-between gap-4 group hover:border-[#b9b9f9] transition-colors"
                >
                  {/* Swatch */}
                  <div
                    className="w-full h-16 rounded-[4px] border border-[#e5edf5]/60 flex items-end p-2 relative overflow-hidden"
                    style={{ backgroundColor: token.hex }}
                  >
                    <button
                      onClick={() => copyToClipboard(token.hex, token.name)}
                      className={`absolute top-2 right-2 p-1.5 rounded-[4px] text-[11px] flex items-center gap-1 transition-all cursor-pointer ${
                        token.textDark
                          ? 'bg-[#061b31]/10 hover:bg-[#061b31]/20 text-[#061b31]'
                          : 'bg-white/20 hover:bg-white/30 text-white'
                      }`}
                      title="Copiar código HEX"
                    >
                      {isCopied ? <Check className="w-3 h-3" strokeWidth={1.5} /> : <Copy className="w-3 h-3" strokeWidth={1.5} />}
                      <span>{token.hex}</span>
                    </button>
                  </div>

                  {/* Token Metadata */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-normal text-[#061b31] tracking-[-0.14px]">
                        {token.name}
                      </span>
                      <button
                        onClick={() => copyToClipboard(token.token, token.token)}
                        className="text-[11px] text-[#533afd] hover:text-[#7389ff] font-mono cursor-pointer"
                        title="Copiar token CSS"
                      >
                        {token.token}
                      </button>
                    </div>
                    <p className="text-[12px] text-[#64748d] font-light leading-relaxed tracking-[-0.12px]">
                      {token.role}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Surface Progression Visualizer */}
          <div className="p-6 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] space-y-4">
            <div className="text-[13px] font-normal text-[#061b31] tracking-[-0.14px]">
              Niveles de Superficie (Surface Tint Progression)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {[
                { level: '0 · Canvas', name: 'Pure White', bg: 'bg-[#ffffff]', text: 'text-[#061b31]', hex: '#ffffff', desc: 'Fondo de página' },
                { level: '1 · Band', name: 'Mist', bg: 'bg-[#f8fafd]', text: 'text-[#061b31]', hex: '#f8fafd', desc: 'Bandas y footer' },
                { level: '2 · Card', name: 'Frost', bg: 'bg-[#e5edf5]', text: 'text-[#061b31]', hex: '#e5edf5', desc: 'Bordes y divisores' },
                { level: '3 · Highlight', name: 'Periwinkle', bg: 'bg-[#e8e9ff]', text: 'text-[#533afd]', hex: '#e8e9ff', desc: 'Pills y bloques' },
                { level: '4 · Accent', name: 'Indigo Ink', bg: 'bg-[#533afd]', text: 'text-white', hex: '#533afd', desc: 'Acciones clave' },
              ].map((s) => (
                <div key={s.level} className={`p-4 rounded-[4px] border border-[#e5edf5] ${s.bg} ${s.text} space-y-1`}>
                  <div className="text-[11px] opacity-75 font-mono">{s.level}</div>
                  <div className="text-[14px] font-normal">{s.name}</div>
                  <div className="text-[12px] opacity-90 font-light">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Typography System Section */}
      {(activeTab === 'all' || activeTab === 'typography') && (
        <section className="space-y-10 pt-6 border-t border-[#e5edf5]">
          <div className="space-y-2">
            <div className="text-[12px] uppercase tracking-wider text-[#839bc8] font-normal">
              Tokens · Typography Scale
            </div>
            <h2 className="text-[32px] font-light text-[#061b31] tracking-[-0.64px]">
              Tipografía Sohne-Var / Inter Tight a Peso 300
            </h2>
            <p className="text-[16px] text-[#64748d] font-light tracking-[-0.16px] max-w-3xl">
              Firma tipográfica: los títulos no gritan (<em className="italic">whisper weight 300</em>) incluso a 56px de tamaño display. El espaciado entre letras (<code className="text-[13px] text-[#061b31]">letter-spacing</code>) se contrae progresivamente a medida que el tamaño crece para lograr la sensación pulida característica.
            </p>
          </div>

          {/* Type Scale Specimen Table */}
          <div className="border border-[#e5edf5] rounded-[4px] overflow-hidden bg-white">
            <div className="divide-y divide-[#e5edf5]">
              {TYPOGRAPHY_SCALE.map((item) => (
                <div key={item.role} className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-[#f8fafd]/60 transition-colors">
                  <div className="w-64 shrink-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-normal text-[#061b31] font-mono">{item.role}</span>
                      <span className="px-2 py-0.5 bg-[#f8fafd] border border-[#e5edf5] rounded-full text-[11px] text-[#64748d]">
                        {item.size} / {item.weight}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#64748d] font-mono">
                      tracking: {item.tracking} · leading: {item.lineHeight}
                    </div>
                  </div>

                  <div className="flex-1 overflow-hidden">
                    <p
                      className="text-[#061b31] truncate"
                      style={{
                        fontSize: item.size,
                        lineHeight: item.lineHeight,
                        letterSpacing: item.tracking,
                        fontWeight: item.weight,
                      }}
                    >
                      {item.sample}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* OpenType Features Demo (Tabular Numerals) */}
          <div className="p-6 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-1 min-w-0 flex-1">
              <div className="text-[14px] font-normal text-[#061b31] tracking-[-0.14px] leading-relaxed">
                Números Tabulares Activos (<code className="text-[#533afd] font-mono text-[12px] break-words">font-feature-settings: 'ss01' on, 'tnum' on</code>)
              </div>
              <p className="text-[13px] text-[#64748d] font-light max-w-xl leading-relaxed">
                Asegura que los dígitos numéricos compartan el mismo ancho óptico en métricas, tablas de impacto y estadísticas de reclutadores.
              </p>
            </div>
            <div className="flex flex-nowrap items-center gap-3 sm:gap-5 lg:gap-6 tabular-nums text-[20px] sm:text-[28px] lg:text-[32px] font-light text-[#533afd] whitespace-nowrap shrink-0">
              <div>+35%</div>
              <div>10+ Años</div>
              <div>$1.2M</div>
              <div>100% NPS</div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Spacing & Shapes Section */}
      {(activeTab === 'all' || activeTab === 'spacing') && (
        <section className="space-y-10 pt-6 border-t border-[#e5edf5]">
          <div className="space-y-2">
            <div className="text-[12px] uppercase tracking-wider text-[#839bc8] font-normal">
              Tokens · Spacing & Radius
            </div>
            <h2 className="text-[32px] font-light text-[#061b31] tracking-[-0.64px]">
              Retícula Base de 8px y Radios de Borde
            </h2>
            <p className="text-[16px] text-[#64748d] font-light tracking-[-0.16px] max-w-3xl">
              Toda la composición espacial se deriva de la unidad base de 8px. Las tarjetas y botones usan rigurosamente un radio de 4px (<code className="text-[13px] text-[#061b31]">rounded-[4px]</code>) para transmitir rigor profesional. Los tags y chips usan píldoras (<code className="text-[13px] text-[#061b31]">9999px</code>).
            </p>
          </div>

          {/* Spacing Scale Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {SPACING_TOKENS.map((sp) => (
              <div key={sp.name} className="p-4 bg-white border border-[#e5edf5] rounded-[4px] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-mono text-[#061b31]">{sp.name}</span>
                  <span className="text-[12px] font-medium text-[#533afd]">{sp.value} ({sp.rem})</span>
                </div>
                <div className="w-full bg-[#f8fafd] h-8 rounded-[4px] flex items-center px-2 border border-[#e5edf5]/60">
                  <div
                    className="h-4 bg-[#533afd] rounded-[2px]"
                    style={{ width: sp.value }}
                  />
                </div>
                <p className="text-[12px] text-[#64748d] font-light tracking-[-0.12px]">
                  {sp.use}
                </p>
              </div>
            ))}
          </div>

          {/* Radius Tokens Table */}
          <div className="border border-[#e5edf5] rounded-[4px] overflow-hidden bg-white">
            <div className="p-4 bg-[#f8fafd] border-b border-[#e5edf5] text-[13px] font-normal text-[#061b31]">
              Tokens de Radio de Borde (Corner Radii)
            </div>
            <div className="divide-y divide-[#e5edf5]">
              {RADIUS_TOKENS.map((r) => (
                <div key={r.name} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="text-[14px] font-normal text-[#061b31]">{r.name} · <span className="text-[#533afd] font-mono">{r.value}</span></div>
                    <div className="text-[12px] text-[#64748d] font-light">{r.appliesTo}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-[#e8e9ff] border border-[#b9b9f9] flex items-center justify-center text-[10px] text-[#533afd] font-mono ${r.class}`}>
                      {r.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Components & Mosaic Showcase Section */}
      {(activeTab === 'all' || activeTab === 'components') && (
        <section className="space-y-12 pt-6 border-t border-[#e5edf5]">
          <div className="space-y-2">
            <div className="text-[12px] uppercase tracking-wider text-[#839bc8] font-normal">
              Library · UI Components
            </div>
            <h2 className="text-[32px] font-light text-[#061b31] tracking-[-0.64px]">
              Biblioteca de Componentes Oficiales
            </h2>
            <p className="text-[16px] text-[#64748d] font-light tracking-[-0.16px] max-w-3xl">
              Componentes interactivos creados estrictamente con los tokens del sistema Olivia: botones de 4px, chips en píldora, tarjetas de mosaico con hover reveal sin sombras.
            </p>
          </div>

          {/* Component Category: Buttons */}
          <div className="p-6 bg-white border border-[#e5edf5] rounded-[4px] space-y-6">
            <div className="flex items-center justify-between border-b border-[#e5edf5] pb-3">
              <div>
                <h3 className="text-[18px] font-normal text-[#061b31] tracking-[-0.18px]">1. Botones y Enlaces de Acción</h3>
                <p className="text-[13px] text-[#64748d] font-light">4px de radio, sin sombras, textos a 14px peso 400.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Primary Filled Button */}
              <div className="p-5 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] space-y-4">
                <div className="text-[12px] font-mono text-[#64748d]">Primary Filled Button</div>
                <button className="px-5 py-2.5 bg-[#533afd] hover:bg-[#7389ff] text-white rounded-[4px] text-[14px] font-normal tracking-[-0.14px] transition-colors flex items-center gap-2 cursor-pointer shadow-none">
                  <span>Empieza ahora</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <div className="text-[11px] text-[#64748d] font-mono">
                  bg: #533afd · hover: #7389ff · radius: 4px
                </div>
              </div>

              {/* Ghost Outline Button */}
              <div className="p-5 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] space-y-4">
                <div className="text-[12px] font-mono text-[#64748d]">Ghost Outline Button</div>
                <button className="px-5 py-2.5 bg-transparent hover:bg-[#e8e9ff]/50 text-[#533afd] border border-[#b9b9f9] rounded-[4px] text-[14px] font-normal tracking-[-0.14px] transition-colors flex items-center gap-2 cursor-pointer">
                  <span>Accede con Google</span>
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <div className="text-[11px] text-[#64748d] font-mono">
                  border: 1px #b9b9f9 · text: #533afd · radius: 4px
                </div>
              </div>

              {/* Tertiary & Text Links */}
              <div className="p-5 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] space-y-4">
                <div className="text-[12px] font-mono text-[#64748d]">Tertiary & Inline Links</div>
                <div className="flex flex-col gap-2.5 items-start">
                  <button className="px-3.5 py-1.5 bg-white text-[#533afd] border border-[#d6d9fc] rounded-[4px] text-[13px] font-normal cursor-pointer hover:bg-[#f8fafd]">
                    Conoce su historia ›
                  </button>
                  <a href="#demo" className="text-[14px] text-[#533afd] hover:text-[#7389ff] underline underline-offset-4 decoration-1">
                    Ver especificaciones completas
                  </a>
                </div>
                <div className="text-[11px] text-[#64748d] font-mono">
                  border: 1px #d6d9fc · chevron › inline
                </div>
              </div>
            </div>
          </div>

          {/* Component Category: Chips & Tags */}
          <div className="p-6 bg-white border border-[#e5edf5] rounded-[4px] space-y-6">
            <div className="flex items-center justify-between border-b border-[#e5edf5] pb-3">
              <div>
                <h3 className="text-[18px] font-normal text-[#061b31] tracking-[-0.18px]">2. Chips de Categoría y Badges</h3>
                <p className="text-[13px] text-[#64748d] font-light">Píldora completa (9999px), iconos de 1.5px de trazo y contadores integrados.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {[
                { id: 'all', label: 'Todos los Proyectos', count: 6 },
                { id: 'mobile', label: 'E-commerce & Mobile', count: 2 },
                { id: 'health', label: 'Salud & Healthtech', count: 2 },
                { id: 'fintech', label: 'Fintech & Crédito', count: 2 },
                { id: 'saas', label: 'Web & Enterprise', count: 1 },
              ].map((chip) => {
                const isSelected = demoChipCategory === chip.id;
                return (
                  <button
                    key={chip.id}
                    onClick={() => setDemoChipCategory(chip.id)}
                    className={`px-3.5 py-1.5 rounded-full text-[13px] font-normal tracking-[-0.14px] transition-colors flex items-center gap-2 cursor-pointer select-none ${
                      isSelected
                        ? 'bg-[#533afd] text-white shadow-none'
                        : 'bg-white hover:bg-[#f8fafd] text-[#50617a] hover:text-[#061b31] border border-[#e5edf5]'
                    }`}
                  >
                    <span>{chip.label}</span>
                    <span
                      className={`text-[11px] px-1.5 py-0.2 rounded-full font-medium ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-[#f8fafd] text-[#64748d]'
                      }`}
                    >
                      {chip.count}
                    </span>
                  </button>
                );
              })}

              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e8e9ff] text-[#533afd] border border-[#b9b9f9]/40 rounded-full text-[11px] font-normal">
                <span className="w-2 h-2 rounded-full bg-[#533afd] animate-pulse" />
                <span>Disponible para nuevos desafíos</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 rounded-full text-[11px]">
                <TrendingUp className="w-3 h-3 text-emerald-600" strokeWidth={1.5} />
                <span>+35% Conversión</span>
              </span>
            </div>
          </div>

          {/* Component Category: Case Study Mosaic Card Demo (Hover Overlay) */}
          <div className="p-6 bg-white border border-[#e5edf5] rounded-[4px] space-y-6">
            <div className="flex items-center justify-between border-b border-[#e5edf5] pb-3">
              <div>
                <h3 className="text-[18px] font-normal text-[#061b31] tracking-[-0.18px]">3. Tarjeta de Caso de Estudio (Mosaico & Hover Reveal)</h3>
                <p className="text-[13px] text-[#64748d] font-light">490px de alto, 4px de radio, 1px borde en #e5edf5, sin sombras. Pasa el cursor por encima para ver la revelación en capas.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Mini Interactive Demo Card 1 */}
              <div className="group relative w-full h-[490px] flex flex-col cursor-pointer rounded-[4px] overflow-hidden bg-[#f8fafd] border border-[#e5edf5] select-none">
                <img
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop"
                  alt="Echomusic Demo"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Permanent badges */}
                <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5 items-start pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 text-[#061b31] border border-[#e5edf5] rounded-full text-[11px] font-normal">
                    <Smartphone className="w-3.5 h-3.5 text-[#533afd]" strokeWidth={1.5} />
                    <span>Mobile App & Marketplace</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#533afd] text-white rounded-full text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    <span>Figma Prototype</span>
                  </span>
                </div>

                {/* Top-Right CTA on Hover */}
                <div className="absolute top-3.5 right-3.5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="px-3.5 py-1.5 bg-[#533afd] text-white text-[12px] rounded-[4px] flex items-center gap-1.5">
                    <span>Ver Caso</span>
                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Full Overlay on Hover */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#061b31]/95 via-[#061b31]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end gap-3 text-white pointer-events-none">
                  <div className="flex items-center justify-between text-[12px] text-white/80">
                    <span className="font-normal text-white">Echomusic</span>
                    <span className="text-[11px] text-[#e8e9ff] px-2 py-0.5 rounded-full bg-white/10 border border-white/15">
                      UX / UI Designer
                    </span>
                  </div>
                  <h4 className="text-[20px] font-light text-white tracking-[-0.2px]">
                    Marketplace & App Móvil para Música Nacional
                  </h4>
                  <p className="text-[13px] text-white/85 font-light leading-relaxed line-clamp-3">
                    Diseño integral de una plataforma digital para visibilizar y comercializar música en vivo.
                  </p>
                  <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full text-[11px]">
                      <TrendingUp className="w-3 h-3 text-emerald-400" strokeWidth={1.5} />
                      <span>3 Arquetipos Validados</span>
                    </div>
                    <div className="inline-flex items-center gap-1 text-[12px] text-white">
                      <span>Explorar Proceso</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#b9b9f9]" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini Interactive Demo Card 2 */}
              <div className="group relative w-full h-[490px] flex flex-col cursor-pointer rounded-[4px] overflow-hidden bg-[#f8fafd] border border-[#e5edf5] select-none">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop"
                  alt="Isapre Esencial Demo"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5 items-start pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 text-[#061b31] border border-[#e5edf5] rounded-full text-[11px] font-normal">
                    <Activity className="w-3.5 h-3.5 text-[#533afd]" strokeWidth={1.5} />
                    <span>Health & Product Design</span>
                  </span>
                </div>

                <div className="absolute top-3.5 right-3.5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="px-3.5 py-1.5 bg-[#533afd] text-white text-[12px] rounded-[4px] flex items-center gap-1.5">
                    <span>Ver Caso</span>
                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#061b31]/95 via-[#061b31]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end gap-3 text-white pointer-events-none">
                  <div className="flex items-center justify-between text-[12px] text-white/80">
                    <span className="font-normal text-white">Isapre Esencial</span>
                    <span className="text-[11px] text-[#e8e9ff] px-2 py-0.5 rounded-full bg-white/10 border border-white/15">
                      Product Designer
                    </span>
                  </div>
                  <h4 className="text-[20px] font-light text-white tracking-[-0.2px]">
                    Rediseño del Trámite de Licencias Médicas
                  </h4>
                  <p className="text-[13px] text-white/85 font-light leading-relaxed line-clamp-3">
                    Diagnóstico y rediseño integral para reducir reclamos e incertidumbre en cada etapa del trámite.
                  </p>
                  <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full text-[11px]">
                      <TrendingUp className="w-3 h-3 text-emerald-400" strokeWidth={1.5} />
                      <span>-40% Reclamos</span>
                    </div>
                    <div className="inline-flex items-center gap-1 text-[12px] text-white">
                      <span>Explorar Proceso</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#b9b9f9]" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Feature Card (Olivia pure white spec) */}
              <div className="p-8 bg-white border border-[#e5edf5] rounded-[4px] flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-[12px] uppercase tracking-wider text-[#839bc8] font-normal">
                    Product Feature Spec
                  </span>
                  <h4 className="text-[26px] font-light text-[#061b31] tracking-[-0.26px] leading-tight">
                    Auditorías UX & Sistemas de Diseño
                  </h4>
                  <p className="text-[14px] text-[#50617a] font-light leading-relaxed">
                    Estandarización de componentes en Figma y código React con tokens semánticos, contratos de accesibilidad WCAG AA y documentación viva.
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-[#e5edf5]">
                  <div className="flex items-center gap-2 text-[13px] text-[#061b31]">
                    <CheckCircle2 className="w-4 h-4 text-[#533afd]" strokeWidth={1.5} />
                    <span>0% Deuda técnica en tokens</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#061b31]">
                    <CheckCircle2 className="w-4 h-4 text-[#533afd]" strokeWidth={1.5} />
                    <span>100% Compatibilidad Tailwind v4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. Strict Do's and Don'ts Section */}
      {(activeTab === 'all' || activeTab === 'guidelines') && (
        <section className="space-y-8 pt-6 border-t border-[#e5edf5]">
          <div className="space-y-2">
            <div className="text-[12px] uppercase tracking-wider text-[#839bc8] font-normal">
              Governance · System Rules
            </div>
            <h2 className="text-[32px] font-light text-[#061b31] tracking-[-0.64px]">
              Directrices de Implementación (Do's & Don'ts)
            </h2>
            <p className="text-[16px] text-[#64748d] font-light tracking-[-0.16px] max-w-3xl">
              Reglas inquebrantables para preservar la elegancia técnica y la coherencia del ledger en cualquier vista o componente nuevo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DO's */}
            <div className="p-6 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] space-y-4">
              <div className="flex items-center gap-2 text-[16px] font-normal text-[#061b31]">
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xs">✓</div>
                <span>Lo que SÍ debes hacer (Do)</span>
              </div>
              <ul className="space-y-3 text-[14px] text-[#50617a] font-light leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#533afd] font-bold">·</span>
                  <span>Usar <code className="text-[#533afd] font-mono text-[12px]">#533afd</code> exclusivamente para acciones primarias, links y trazos de iconos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#533afd] font-bold">·</span>
                  <span>Mantener todos los títulos a <strong className="text-[#061b31] font-normal">peso 300 (whisper weight)</strong> sin negritas pesadas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#533afd] font-bold">·</span>
                  <span>Aplicar <code className="text-[#533afd] font-mono text-[12px]">rounded-[4px]</code> a todos los botones, tarjetas e inputs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#533afd] font-bold">·</span>
                  <span>Separar secciones con líneas de 1px en <code className="text-[#533afd] font-mono text-[12px]">#e5edf5</code> y 96px de espaciado vertical.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#533afd] font-bold">·</span>
                  <span>Activar <code className="text-[#533afd] font-mono text-[12px]">font-feature-settings: 'ss01' on, 'tnum' on</code> en datos tabulares y números.</span>
                </li>
              </ul>
            </div>

            {/* DON'Ts */}
            <div className="p-6 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] space-y-4">
              <div className="flex items-center gap-2 text-[16px] font-normal text-[#061b31]">
                <div className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center text-xs">✕</div>
                <span>Lo que NUNCA debes hacer (Don't)</span>
              </div>
              <ul className="space-y-3 text-[14px] text-[#50617a] font-light leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">·</span>
                  <span><strong className="text-[#061b31] font-normal">No usar sombras (box-shadow) ni efectos glassmorphic</strong>. La elevación viene de los tintes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">·</span>
                  <span>No introducir colores adicionales de acento (amarillos, púrpuras, naranjas); el sistema es monocrómico + índigo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">·</span>
                  <span>No usar esquinas redondeadas grandes (8px+, 16px+) en botones o tarjetas estándar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">·</span>
                  <span>No rellenar áreas gigantes con <code className="text-[#533afd] font-mono text-[12px]">#533afd</code>; el índigo se gana en dosis precisas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">·</span>
                  <span>No centrar párrafos extensos de texto; todo el ritmo de lectura es left-aligned.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 7. Code Export / CSS Root Cheat Sheet */}
      <section className="p-8 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[16px] font-normal text-[#061b31]">
              <Code2 className="w-4 h-4 text-[#533afd]" strokeWidth={1.5} />
              <span>Variables CSS & Tokens `@theme` Tailwind v4</span>
            </div>
            <p className="text-[13px] text-[#64748d] font-light">
              Exportación lista para producción integrada en <code className="text-[12px] text-[#061b31]">/src/index.css</code>.
            </p>
          </div>

          <button
            onClick={() => copyToClipboard(`@theme {
  --font-sans: 'Inter Tight', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --color-indigo-ink: #533afd;
  --color-indigo-hover: #7389ff;
  --color-midnight-ink: #061b31;
  --color-slate: #64748d;
  --color-steel: #50617a;
  --color-smoke: #839bc8;
  --color-pure-white: #ffffff;
  --color-mist: #f8fafd;
  --color-frost: #e5edf5;
  --color-lavender-border: #b9b9f9;
  --color-lilac-border: #d6d9fc;
  --color-periwinkle-wash: #e8e9ff;
  --color-deep-violet: #182659;
  --color-amethyst-edge: #7f71e6;
  --radius-sm: 4px;
  --radius-md: 4px;
  --radius-full: 9999px;
}`, 'Tokens CSS')}
            className="px-4 py-2 bg-white hover:bg-[#e8e9ff] text-[#533afd] border border-[#b9b9f9] rounded-[4px] text-[13px] font-normal transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
          >
            <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Copiar Definición de Tokens</span>
          </button>
        </div>

        <pre className="p-4 bg-white border border-[#e5edf5] rounded-[4px] text-[12px] font-mono text-[#061b31] overflow-x-auto leading-relaxed">
{`:root {
  /* Colors */
  --color-indigo-ink: #533afd;
  --color-indigo-hover: #7389ff;
  --color-midnight-ink: #061b31;
  --color-slate: #64748d;
  --color-steel: #50617a;
  --color-smoke: #839bc8;
  --color-pure-white: #ffffff;
  --color-mist: #f8fafd;
  --color-frost: #e5edf5;
  --color-lavender-border: #b9b9f9;
  --color-lilac-border: #d6d9fc;
  --color-periwinkle-wash: #e8e9ff;

  /* Typography */
  --font-sans: 'Inter Tight', -apple-system, sans-serif;
  font-feature-settings: 'ss01' on, 'tnum' on;

  /* Shapes & Radii */
  --radius-cards: 4px;
  --radius-buttons: 4px;
  --radius-tags: 9999px;
  --section-gap: 96px;
}`}
        </pre>
      </section>

    </div>
  );
};
