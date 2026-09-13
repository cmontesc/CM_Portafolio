import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  ArrowUpRight, 
  TrendingUp, 
  ShieldCheck, 
  Code2, 
  LayoutGrid, 
  Type, 
  Palette, 
  Component, 
  Sliders
} from 'lucide-react';

import { ProjectCard } from '../components/ProjectCard';
import { EditorialCaseStudy } from '../components/EditorialCaseStudy';
import { usePortfolioData } from '../context/PortfolioDataContext';
import type { Project } from '../types';
import stylesheet from '../index.css?raw';

const themeDefinition = stylesheet.match(/@theme\s*\{[^}]*\}/)?.[0] ?? '';

interface DesignSystemViewProps {
  onSelectProject: (project: Project) => void;
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
  { role: 'H1 · Home', size: '56px', sizeSm: '36px', sizeMd: '46px', lineHeight: '1.03', tracking: '-1.4px', weight: '300', sample: 'Hola, soy Carlos.' },
  { role: 'H1 · Catálogo', size: '48px', sizeSm: '36px', sizeMd: '48px', lineHeight: '1.03', tracking: '-0.96px', weight: '300', sample: 'Casos de estudio y proyectos' },
  { role: 'H1 · Caso de estudio', size: '50px', sizeSm: '32px', sizeMd: '44px', lineHeight: '1.12', tracking: '-0.025em', weight: '300', sample: 'Diseño de productos digitales' },
  { role: 'H2 · Home', size: '32px', sizeSm: '26px', sizeMd: '32px', lineHeight: '1.5', tracking: '-0.64px', weight: '300', sample: 'Proyectos destacados' },
  { role: 'H2 · Editorial', size: '22px', sizeSm: '22px', sizeMd: '22px', lineHeight: '1.5', tracking: '-0.025em', weight: '300', sample: 'Hallazgo → decisión → solución' },
  { role: 'Introducción · Home', size: '19px', sizeSm: '16px', sizeMd: '18px', lineHeight: '1.625', tracking: '-0.16px', weight: '300', sample: 'Comprender el problema antes de definir la solución.' },
  { role: 'Lectura · Editorial', size: '16px', sizeSm: '14px', sizeMd: '16px', lineHeight: '1.625', tracking: 'normal', weight: '300', sample: 'Investigación con usuarios, definición de flujos y sistemas de diseño.' },
  { role: 'UI · Acciones', size: '14px', sizeSm: '14px', sizeMd: '14px', lineHeight: '1.5', tracking: '-0.14px', weight: '400', sample: 'Ver experiencia · Ver todos los proyectos' },
  { role: 'Metadatos', size: '12px', sizeSm: '11px', sizeMd: '12px', lineHeight: '1.5', tracking: '-0.12px', weight: '400', sample: 'Categoría · Plataforma · Periodo' },
];

const SPACING_TOKENS = [
  { name: 'spacing-8', value: '8px', rem: '0.5rem', use: 'Gap entre elementos compactos, padding de tags' },
  { name: 'spacing-16', value: '16px', rem: '1.0rem', use: 'Padding estándar de tarjetas móviles, gap de columnas' },
  { name: 'spacing-24', value: '24px', rem: '1.5rem', use: 'Padding horizontal móvil y gap de grillas' },
  { name: 'spacing-32', value: '32px', rem: '2.0rem', use: 'Padding de bloques amplios y gap intermedio' },
  { name: 'spacing-40', value: '40px', rem: '2.5rem', use: 'Separación entre bloques de contenido relacionados' },
  { name: 'spacing-48', value: '48px', rem: '3.0rem', use: 'Padding horizontal sm y separación en casos de estudio' },
  { name: 'spacing-64', value: '64px', rem: '4.0rem', use: 'Padding horizontal md y separación móvil de Home' },
  { name: 'spacing-80', value: '80px', rem: '5.0rem', use: 'Padding horizontal en desktop (1320px layout)' },
  { name: 'spacing-96', value: '96px', rem: '6.0rem', use: 'Separación de secciones Home desde md' },
];

const RADIUS_TOKENS = [
  { name: 'radius-cards', value: '4px', class: 'rounded-[4px]', appliesTo: 'Tarjetas de proyectos, feature cards, contenedores modulares' },
  { name: 'radius-buttons', value: '4px', class: 'rounded-[4px]', appliesTo: 'Botones primarios, ghost outline, inputs y selects' },
  { name: 'radius-inputs', value: '4px', class: 'rounded-[4px]', appliesTo: 'Campos de texto, textareas, controles de formulario' },
  { name: 'radius-tags', value: '9999px', class: 'rounded-full', appliesTo: 'Chips de categoría, badges de estado, contadores píldora' },
];

export const DesignSystemView: React.FC<DesignSystemViewProps> = ({ onShowToast, onSelectProject }) => {
  const { projects } = usePortfolioData();
  const publishedProjects = projects.filter(project => project.status === 'published');
  const editorialProject = publishedProjects.find(project => project.caseStudy.editorial);
  const [layout, setLayout] = useState<'masonry' | 'editorial' | 'row'>('masonry');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'colors' | 'typography' | 'spacing' | 'components' | 'guidelines'>('all');
  const [demoChipCategory, setDemoChipCategory] = useState<string>('all');

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      onShowToast?.('No se pudo copiar. Selecciona el texto e inténtalo nuevamente.');
      return;
    }
    setCopiedToken(text);
    if (onShowToast) {
      onShowToast(`Copiado: ${label}`);
    }
    setTimeout(() => {
      setCopiedToken(null);
    }, 2500);
  };

  return (
    <div className="py-8 sm:py-12 md:py-20 space-y-16 sm:space-y-20 md:space-y-24 animate-in fade-in duration-200">
      
      {/* 1. Header & System Intro */}
      <section className="space-y-6 max-w-4xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e8e9ff] text-[#533afd] text-[12px] font-normal rounded-full border border-[#b9b9f9]/40">
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Olivia · Sistema de diseño</span>
          </span>
          <span className="text-[13px] text-[#64748d] font-light">
            Actualizado con el portafolio · Septiembre 2026
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-[36px] sm:text-[46px] md:text-[56px] font-light text-[#061b31] tracking-[-1.4px] leading-[1.03]">
            Olivia — Design System
          </h1>
          <p className="text-[20px] sm:text-[22px] text-[#533afd] font-light tracking-[-0.22px]">
            Claridad, tipografía y espacio · nombrado en honor a mi hija
          </p>
        </div>

        <p className="text-[17px] text-[#50617a] font-light leading-relaxed max-w-3xl tracking-[-0.16px]">
          El lenguaje visual del portafolio: un lienzo blanco frío (<code className="px-1.5 py-0.5 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] text-[13px] text-[#061b31]">#ffffff</code>) con tipografía en negro profundo (<code className="px-1.5 py-0.5 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] text-[13px] text-[#061b31]">#061b31</code>) a peso 300 (<em className="italic">whisper weight</em>), bordes sutiles y un único acento índigo (<code className="px-1.5 py-0.5 bg-[#533afd] text-white rounded-[4px] text-[13px]">#533afd</code>) que se reserva para acciones, navegación y énfasis.
        </p>

        {/* Quick Filter Navigation */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#e5edf5]">
          {[
            { id: 'all', label: 'Todo el Sistema', icon: LayoutGrid },
            { id: 'colors', label: 'Colores & Superficies', icon: Palette },
            { id: 'typography', label: 'Tipografía & Escala', icon: Type },
            { id: 'spacing', label: 'Espaciado & Formas', icon: Sliders },
            { id: 'components', label: 'Componentes y patrones', icon: Component },
            { id: 'guidelines', label: 'Directrices', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                aria-pressed={isSelected}
                className={`px-3.5 py-1.5 rounded-[4px] text-[13px] font-normal tracking-[-0.14px] transition-colors flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#533afd] ${
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
                      className={`absolute top-2 right-2 p-1.5 rounded-[4px] text-[11px] flex items-center gap-1 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#533afd] ${
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
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[14px] font-normal text-[#061b31] tracking-[-0.14px]">
                        {token.name}
                      </span>
                      <button
                        onClick={() => copyToClipboard(token.token, token.token)}
                        className="text-[11px] text-[#533afd] hover:text-[#7389ff] font-mono cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#533afd]"
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
          <div className="py-6 space-y-4">
            <div className="text-[13px] font-normal text-[#061b31] tracking-[-0.14px]">
              Niveles de Superficie (Surface Tint Progression)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
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
              Inter Tight · Tipografía del portafolio
            </h2>
            <p className="text-[16px] text-[#64748d] font-light tracking-[-0.16px] max-w-3xl">
              Inter Tight se aplica a títulos, cuerpo y controles. Peso 300 para lectura y títulos; 400 para UI y 500 para énfasis puntual. Los títulos no gritan (<em className="italic">whisper weight 300</em>) incluso a 56px de tamaño display. El espaciado entre letras (<code className="text-[13px] text-[#061b31]">letter-spacing</code>) se contrae progresivamente a medida que el tamaño crece para lograr la sensación pulida característica.
            </p>
          </div>

          {/* Type Scale Specimen Table */}
          <div className="border border-[#e5edf5] rounded-[4px] overflow-hidden bg-white">
            <div className="divide-y divide-[#e5edf5]">
              {TYPOGRAPHY_SCALE.map((item) => (
                <div key={item.role} className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-[#f8fafd]/60 transition-colors">
                  <div className="w-full lg:w-64 shrink-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-normal text-[#061b31] font-mono">{item.role}</span>
                      <span className="px-2 py-0.5 bg-[#f8fafd] border border-[#e5edf5] rounded-full text-[11px] text-[#64748d]">
                        {item.sizeSm} / {item.sizeMd} / {item.size}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#64748d] font-mono break-words">
                      Peso {item.weight} · tracking {item.tracking} · leading {item.lineHeight}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[#061b31] break-words text-[length:var(--sample-mobile)] sm:text-[length:var(--sample-tablet)] md:text-[length:var(--sample-desktop)]"
                      style={{
                        '--sample-mobile': item.sizeSm,
                        '--sample-tablet': item.sizeMd,
                        '--sample-desktop': item.size,
                        lineHeight: item.lineHeight,
                        letterSpacing: item.tracking,
                        fontWeight: item.weight,
                      } as React.CSSProperties}
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
                Números tabulares · valores ilustrativos (<code className="text-[#533afd] font-mono text-[12px] break-words">font-feature-settings: 'ss01' on, 'tnum' on</code>)
              </div>
              <p className="text-[13px] text-[#64748d] font-light max-w-xl leading-relaxed">
                Asegura que los dígitos numéricos compartan el mismo ancho óptico en métricas, tablas de impacto y estadísticas de reclutadores.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 lg:gap-6 tabular-nums text-[20px] sm:text-[28px] lg:text-[32px] font-light text-[#533afd] whitespace-nowrap">
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
              Espaciado, contenedor y radios
            </h2>
            <p className="text-[16px] text-[#64748d] font-light tracking-[-0.16px] max-w-3xl">
              Contenedor de 1320px con padding de 24 / 48 / 64 / 80px. Ritmo principal de 8px con ajustes de 4px y controles compactos. Home separa secciones 64 / 80 / 96px; los casos de estudio, 48px. Las tarjetas y botones usan rigurosamente un radio de 4px (<code className="text-[13px] text-[#061b31]">rounded-[4px]</code>) para transmitir rigor profesional. Los tags y chips usan píldoras (<code className="text-[13px] text-[#061b31]">9999px</code>).
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
                    className="h-4 bg-[#533afd] rounded-[4px]"
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
              Radios por uso · referencias de aplicación
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
              Botones de 4px, chips en píldora y tarjetas del catálogo actual. La muestra permite revisar estados, formatos y contenido real del portafolio.
            </p>
          </div>

          {/* Component Category: Buttons */}
          <div className="p-6 bg-white border border-[#e5edf5] rounded-[4px] space-y-6">
            <div className="flex items-center justify-between border-b border-[#e5edf5] pb-3">
              <div>
                <h3 className="text-[18px] font-normal text-[#061b31] tracking-[-0.18px]">1. Botones y Enlaces de Acción</h3>
                <p className="text-[13px] text-[#64748d] font-light">4px de radio, sin sombras, textos a 13–14px peso 400. Acciones de muestra.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Primary Filled Button */}
              <div className="py-5 space-y-4">
                <div className="text-[12px] font-mono text-[#64748d]">Primary Filled Button</div>
                <button onClick={() => onShowToast?.('Ejemplo de botón Olivia')} className="min-h-[44px] whitespace-nowrap px-5 py-3 bg-[#533afd] hover:bg-[#7389ff] text-white rounded-[4px] text-[14px] font-normal tracking-[-0.14px] transition-colors flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#533afd] shadow-none">
                  <span>Ver proyectos</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <div className="text-[11px] text-[#64748d] font-mono">
                  bg: #533afd · hover: #7389ff · radius: 4px
                </div>
              </div>

              {/* Ghost Outline Button */}
              <div className="py-5 space-y-4">
                <div className="text-[12px] font-mono text-[#64748d]">Ghost Outline Button</div>
                <button onClick={() => onShowToast?.('Ejemplo de botón Olivia')} className="min-h-[44px] whitespace-nowrap px-5 py-3 bg-transparent hover:bg-[#e8e9ff]/50 text-[#533afd] border border-[#b9b9f9] rounded-[4px] text-[14px] font-normal tracking-[-0.14px] transition-colors flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#533afd]">
                  <span>Ver currículum</span>
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <div className="text-[11px] text-[#64748d] font-mono">
                  border: 1px #b9b9f9 · text: #533afd · radius: 4px
                </div>
              </div>

              {/* Tertiary & Text Links */}
              <div className="py-5 space-y-4">
                <div className="text-[12px] font-mono text-[#64748d]">Tertiary & Inline Links</div>
                <div className="flex flex-col gap-2.5 items-start">
                  <button onClick={() => onShowToast?.('Ejemplo de acción secundaria')} className="whitespace-nowrap px-3.5 py-1.5 bg-white text-[#533afd] border border-[#d6d9fc] rounded-[4px] text-[13px] font-normal cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#533afd] hover:bg-[#f8fafd]">
                    Volver a proyectos
                  </button>
                  <a href="#olivia-patterns" className="text-[14px] text-[#533afd] hover:text-[#7389ff] underline underline-offset-4 decoration-1">
                    Ver patrones del portafolio
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
                <p className="text-[13px] text-[#64748d] font-light">Píldora completa (9999px), iconos de 1.5px de trazo y contadores del catálogo publicado. Los badges de disponibilidad e impacto son ilustrativos.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {[
                { id: 'all', label: 'Todos los proyectos', count: publishedProjects.length },
                ...Array.from(new Map(publishedProjects.map(project => [project.category, project.categoryLabel])), ([id, label]) => ({ id, label, count: publishedProjects.filter(project => project.category === id).length })),
              ].map((chip) => {
                const isSelected = demoChipCategory === chip.id;
                return (
                  <button
                    key={chip.id}
                    onClick={() => setDemoChipCategory(chip.id)}
                    aria-pressed={isSelected}
                    className={`px-3.5 py-1.5 rounded-full text-[13px] font-normal tracking-[-0.14px] transition-colors flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#533afd] select-none ${
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

          <div id="olivia-patterns" className="space-y-6 scroll-mt-24">
            <div className="space-y-2">
              <h3 className="text-[26px] font-light">3. Catálogo · Mosaico, Editorial y Filas</h3>
              <p className="text-[14px] text-[#50617a] leading-relaxed">Las tarjetas usan el mismo componente y contenido publicado que el sitio. Los filtros anteriores actualizan esta muestra de hasta tres proyectos. Selecciona una tarjeta para abrir su caso de estudio.</p>
            </div>
            <div className="flex flex-wrap gap-2" aria-label="Formato de la muestra">
              {([{ id: 'masonry', label: 'Mosaico' }, { id: 'editorial', label: 'Editorial' }, { id: 'row', label: 'Filas' }] as const).map(mode => <button key={mode.id} aria-pressed={layout === mode.id} onClick={() => setLayout(mode.id)} className={`px-3.5 py-2 rounded-[4px] border text-[13px] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#533afd] transition-colors ${layout === mode.id ? 'bg-white text-[#533afd] border-[#b9b9f9]' : 'bg-[#f8fafd] text-[#64748d] border-[#e5edf5] hover:bg-[#e8e9ff]'}`}>{mode.label}</button>)}
            </div>
            <p className="text-[13px] text-[#64748d]">{layout === 'row' ? 'Una columna. Altura: 430px móvil, 340px desde 640px y 300px desde 1024px. Información siempre visible.' : layout === 'editorial' ? 'Una columna en móvil y dos desde 640px. Altura: 420px móvil y 490px desde 640px.' : 'Una columna en móvil, dos desde 640px y tres desde 1024px. Altura: 420px móvil y 490px desde 640px.'} En Mosaico y Editorial, los detalles aparecen al pasar el cursor o enfocar con teclado; en móvil, título y acción permanecen visibles.</p>
            <div className={layout === 'row' ? 'flex flex-col gap-4' : layout === 'editorial' ? 'grid grid-cols-1 sm:grid-cols-2 gap-6' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}>
              {publishedProjects.filter(project => demoChipCategory === 'all' || project.category === demoChipCategory).slice(0, 3).map(project => <ProjectCard key={project.id} project={project} layoutVariant={layout} onSelect={onSelectProject} />)}
            </div>
            {publishedProjects.length === 0 && <p className="p-6 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px]">No hay proyectos publicados para mostrar.</p>}
          </div>
          <div className="space-y-6 border-t border-[#e5edf5] pt-8">
            <h3 className="text-[26px] font-light">4. Patrones de página y casos de estudio</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[14px] leading-relaxed">
              {[
                ['Navegación responsive', 'Header de 64px; enlaces desde 768px y menú hamburguesa en móvil. La sección activa usa índigo y superficie Mist. El menú se cierra al seleccionar una vista.'],
                ['Home y métricas', 'Hasta seis proyectos principales publicados, con fallback a publicados. Banda Mist con métricas en dos columnas, cuatro desde 768px; cifras de 30 / 40 / 48px.'],
                ['Ficha de proyecto', 'Título de 32 / 44 / 50px, introducción de 18 / 20px y metadatos en dos o cuatro columnas. Acciones Figma, Vercel, Git y sitio publicado según los enlaces disponibles.'],
                ['Carrusel de interfaces', 'Imágenes opcionales con navegación anterior/siguiente e indicador de posición. La galería editorial muestra evidencias públicas con texto alternativo, título, categoría y descripción.'],
                ['Narrativa editorial', 'Audiencias, proceso, hallazgo → decisión → solución, arquitectura, antes/después, restricciones y aprendizajes. Secciones separadas 48px; paneles Mist con padding de 20 / 24px.'],
                ['Resultados y evidencia', 'Distinguir resultados cuantitativos, operativos y organizacionales. Las cifras editoriales solo aparecen si están verificadas; las secciones sin contenido se omiten.'],
              ].map(([title, description]) => <div key={title} className="space-y-2"><dt className="font-normal text-[#061b31]">{title}</dt><dd className="text-[#50617a]">{description}</dd></div>)}
            </dl>
            {editorialProject && <details className="border-t border-[#e5edf5] pt-5"><summary className="text-[#533afd] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#533afd] text-[14px] py-2">Ver ejemplo editorial real · {editorialProject.company}</summary><div className="pt-6"><EditorialCaseStudy project={editorialProject} /></div></details>}
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
              Reglas inquebrantables para preservar la elegancia técnica y la coherencia del portafolio en cualquier vista o componente nuevo.
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
                  <span>Mantener los títulos principales a <strong className="text-[#061b31] font-normal">peso 300 (whisper weight)</strong> sin negritas pesadas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#533afd] font-bold">·</span>
                  <span>Aplicar <code className="text-[#533afd] font-mono text-[12px]">rounded-[4px]</code> a todos los botones, tarjetas e inputs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#533afd] font-bold">·</span>
                  <span>Separar secciones con líneas de 1px en <code className="text-[#533afd] font-mono text-[12px]">#e5edf5</code> y espaciado responsive según la página.</span>
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
                  <span><strong className="text-[#061b31] font-normal">Evitar sombras oscuras difusas y efectos de cristal en paneles</strong>. La elevación viene de los tintes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">·</span>
                  <span>Reservar índigo para la marca. Esmeralda comunica impacto y rosa errores; los colores propios de los proyectos permanecen en sus imágenes.</span>
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
      <section className="p-5 sm:p-8 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[16px] font-normal text-[#061b31]">
              <Code2 className="w-4 h-4 text-[#533afd]" strokeWidth={1.5} />
              <span>Variables CSS & Tokens `@theme` Tailwind v4</span>
            </div>
            <p className="text-[13px] text-[#64748d] font-light">
              Bloque @theme vigente; los radios heredados de 2 y 6px no sustituyen la regla de 4px para componentes. Fuente: <code className="text-[12px] text-[#061b31]">/src/index.css</code>.
            </p>
          </div>

          <button
            onClick={() => copyToClipboard(themeDefinition, 'Tokens CSS')}
            className="px-4 py-2 bg-white hover:bg-[#e8e9ff] text-[#533afd] border border-[#b9b9f9] rounded-[4px] text-[13px] font-normal whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#533afd] self-start sm:self-auto"
          >
            <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Copiar tokens CSS</span>
          </button>
        </div>

        <pre className="p-4 bg-white border border-[#e5edf5] rounded-[4px] text-[12px] font-mono text-[#061b31] overflow-x-auto leading-relaxed">
{themeDefinition}
        </pre>
      </section>

    </div>
  );
};
