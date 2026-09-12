export const galleryCategories = ['Research', 'Arquitectura', 'Wireframes', 'Diseño final', 'Responsive', 'Sistema de diseño', 'Administrador', 'Analítica', 'Desarrollo'] as const;
export interface ProjectEditorial {
  audiences?: { name: string; objective: string; need: string; icon?: string }[];
  decisionCases?: { finding: string; decision: string; solution: string; image?: string; alt?: string }[];
  informationArchitecture?: { intro: string; beforeImage?: string; beforeAlt?: string; afterImage?: string; afterAlt?: string; caption?: string; principles?: string[] };
  processSteps?: { title: string; description: string; deliverable?: string; image?: string; alt?: string }[];
  beforeAfter?: { title: string; beforeImage: string; beforeAlt: string; afterImage: string; afterAlt: string; problem: string; change: string; benefit: string }[];
  gallery?: { src: string; alt: string; title: string; description?: string; category: typeof galleryCategories[number]; order: number; featured: boolean; isPublic: boolean }[];
  results?: { value?: string; label: string; description: string; type: 'quantitative' | 'operational' | 'organizational'; source?: string; comparisonPeriod?: string; verified: boolean; visible: boolean }[];
  learnings?: string;
  testimonial?: { quote: string; author: string; role: string; authorized: boolean };
  constraints?: string;
  liveUrl?: string;
  liveLabel?: string;
  openInNewTab?: boolean;
  coverAlt?: string;
}

export function safeUrl(value?: string, image = false): string | undefined {
  if (!value?.trim()) return undefined;
  if (image && /^\/(?!\/)/.test(value)) return value;
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? value : undefined; } catch { return undefined; }
}

// Validate optional editorial data at the Excel boundary and before admin saves.
export function validateEditorial(value: unknown): string | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return 'El contenido editorial debe ser un objeto.';
  const e = value as ProjectEditorial;
  const lists = ['audiences', 'decisionCases', 'processSteps', 'beforeAfter', 'gallery', 'results'] as const;
  for (const key of lists) {
    if (e[key] !== undefined && (!Array.isArray(e[key]) || e[key].some(item => !item || typeof item !== 'object' || Array.isArray(item)))) return `Lista inválida: ${key}.`;
  }
  const schemas: Record<string, string[]> = {
    audiences: ['name', 'objective', 'need', 'icon'], decisionCases: ['finding', 'decision', 'solution', 'image', 'alt'],
    processSteps: ['title', 'description', 'deliverable', 'image', 'alt'], beforeAfter: ['title', 'beforeImage', 'beforeAlt', 'afterImage', 'afterAlt', 'problem', 'change', 'benefit'],
    gallery: ['src', 'alt', 'title', 'description', 'category'], results: ['value', 'label', 'description', 'type', 'source', 'comparisonPeriod']
  };
  for (const key of lists) for (const item of e[key] || []) for (const field of schemas[key]) {
    if (field in item && typeof item[field] !== 'string') return `Texto inválido: ${key}.${field}.`;
  }
  for (const field of ['learnings', 'constraints', 'liveUrl', 'liveLabel', 'coverAlt'] as const) if (e[field] !== undefined && typeof e[field] !== 'string') return `Texto inválido: ${field}.`;
  if (e.openInNewTab !== undefined && typeof e.openInNewTab !== 'boolean') return 'Apertura de enlace inválida.';
  if (e.liveUrl && !safeUrl(e.liveUrl)) return 'El sitio publicado debe usar https:// o http://.';
  for (const item of [...(e.decisionCases || []), ...(e.processSteps || [])]) if (item.image && (!safeUrl(item.image, true) || !item.alt?.trim())) return 'Cada imagen necesita una URL válida y texto alternativo.';
  for (const item of e.beforeAfter || []) {
    if ((item.beforeImage && (!safeUrl(item.beforeImage, true) || !item.beforeAlt?.trim())) || (item.afterImage && (!safeUrl(item.afterImage, true) || !item.afterAlt?.trim()))) return 'Antes y después necesita URLs válidas y textos alternativos.';
  }
  for (const item of e.gallery || []) {
    if ((item.src && (!safeUrl(item.src, true) || !item.alt?.trim())) || !galleryCategories.includes(item.category) || !Number.isFinite(item.order) || typeof item.featured !== 'boolean' || typeof item.isPublic !== 'boolean') return 'Revisa los metadatos de la galería.';
  }
  for (const item of e.results || []) {
    if (!['quantitative', 'operational', 'organizational'].includes(item.type) || typeof item.verified !== 'boolean' || typeof item.visible !== 'boolean') return 'Revisa el tipo y la verificación de resultados.';
  }
  if (e.informationArchitecture !== undefined) {
    const a = e.informationArchitecture;
    if (!a || typeof a !== 'object' || Array.isArray(a)) return 'Arquitectura inválida.';
    for (const field of ['intro','beforeImage','beforeAlt','afterImage','afterAlt','caption']) if (a[field] !== undefined && typeof a[field] !== 'string') return 'Texto de arquitectura inválido.';
    if (a.principles !== undefined && (!Array.isArray(a.principles) || a.principles.some(p => typeof p !== 'string'))) return 'Principios inválidos.';
    if ((a.beforeImage && (!safeUrl(a.beforeImage, true) || !a.beforeAlt?.trim())) || (a.afterImage && (!safeUrl(a.afterImage, true) || !a.afterAlt?.trim()))) return 'La arquitectura necesita URLs válidas y textos alternativos.';
  }
  if (e.testimonial !== undefined) {
    const t = e.testimonial;
    if (!t || typeof t !== 'object' || typeof t.quote !== 'string' || typeof t.author !== 'string' || typeof t.role !== 'string' || typeof t.authorized !== 'boolean') return 'Testimonio inválido.';
  }
}

export const visibleResults = (e: ProjectEditorial) => (e.results || []).filter(r => r.visible && r.label?.trim() && r.description?.trim() && (r.type !== 'quantitative' || r.verified));
