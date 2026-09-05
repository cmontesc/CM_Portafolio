import * as XLSX from 'xlsx';
import { 
  Project, 
  ExperienceItem, 
  PreviousExperienceItem, 
  EducationItem, 
  CourseItem, 
  LanguageItem, 
  MetricItem 
} from '../types';
import { 
  PORTFOLIO_OWNER, 
  RECRUITER_METRICS, 
  FEATURED_PROJECTS, 
  WORK_EXPERIENCE, 
  PREVIOUS_EXPERIENCE, 
  EDUCATION_ITEMS, 
  COURSE_ITEMS, 
  LANGUAGE_ITEMS
} from '../data/portfolioData';

// Helper to extract year number from string (e.g. "2025 — 2026" -> 2026, "2019" -> 2019)
export const extractYearFromText = (text: string | number | undefined): number => {
  if (!text) return 2020;
  if (typeof text === 'number') return text;
  const matches = text.match(/\b(19\d\d|20\d\d)\b/g);
  if (matches && matches.length > 0) {
    // Return the latest year mentioned
    const numbers = matches.map((m) => parseInt(m, 10));
    return Math.max(...numbers);
  }
  return 2020;
};

// Helper to check truthy values for "Principal en Home"
export const parseBooleanValue = (val: any): boolean => {
  if (typeof val === 'boolean') return val;
  if (!val) return false;
  const str = String(val).trim().toLowerCase();
  return ['si', 'sí', 'yes', 'true', '1', 'principal', 'destacado', 'x'].includes(str);
};

/* =========================================================================
   1. EXPORT / GENERATE EXCEL WORKBOOKS
   ========================================================================= */

/**
 * Generates the curriculum.xlsx workbook containing:
 * - Sheet 1: Información Personal (Personal Info, header, cargo, contacto)
 * - Sheets 2..N: Company Experience Tabs (each company has the exact same structure)
 * - Dedicated sheets for Educación, Cursos, Idiomas, Métricas, Habilidades, Experiencias Anteriores
 */
export const generateCurriculumWorkbook = (
  owner = PORTFOLIO_OWNER,
  experiences = WORK_EXPERIENCE,
  prevExp = PREVIOUS_EXPERIENCE,
  education = EDUCATION_ITEMS,
  courses = COURSE_ITEMS,
  languages = LANGUAGE_ITEMS,
  metrics = RECRUITER_METRICS
): XLSX.WorkBook => {
  const wb = XLSX.utils.book_new();

  // Tab 1: Información Personal
  const personalInfoData = [
    ['Campo / Parámetro', 'Valor', 'Descripción'],
    ['Nombre', owner.name, 'Nombre completo del profesional'],
    ['Saludo Corto', owner.shortGreeting, 'Texto de bienvenida en el Hero del Home'],
    ['Cargo / Título', owner.title, 'Título principal profesional'],
    ['Bajada / Tagline', owner.tagline, 'Especialidades y enfoque de diseño'],
    ['Biografía Principal', owner.bio, 'Párrafo principal de presentación'],
    ['Biografía Secundaria', owner.secondaryBio || '', 'Párrafo secundario con detalle técnico'],
    ['Estado de Disponibilidad', owner.status, 'Ej: Disponible para nuevos proyectos'],
    ['Ubicación', owner.location, 'Ciudad, País'],
    ['Años de Experiencia', owner.experienceYears, 'Ej: 15+ años de experiencia'],
    ['Email', owner.email, 'Correo electrónico de contacto'],
    ['Teléfono / WhatsApp', owner.phone, 'Número internacional para WhatsApp'],
    ['LinkedIn', owner.social.linkedin, 'URL del perfil de LinkedIn'],
    ['Portafolio Web', owner.social.portfolio, 'URL del portafolio']
  ];
  const wsPersonalInfo = XLSX.utils.aoa_to_sheet(personalInfoData);
  XLSX.utils.book_append_sheet(wb, wsPersonalInfo, 'Información Personal');

  // Tabs for each Company (Uniform structure)
  experiences.forEach((exp) => {
    // Sanitize sheet name (Excel limits sheet names to 31 chars and bans \ / ? * [ ])
    const safeSheetName = (exp.company || 'Empresa')
      .replace(/[\\/?*[\]]/g, '')
      .substring(0, 30);

    const companyData = [
      ['Campo', 'Valor', 'Instrucciones'],
      ['Empresa', exp.company, 'Nombre de la empresa'],
      ['Cargo / Rol', exp.role, 'Tu rol o cargo desempeñado'],
      ['Período', exp.period, 'Ej: 2025 — 2026'],
      ['Estado', exp.status || 'published', 'published = visible, draft = borrador, archived = archivado'],
      ['Ubicación', exp.location || 'Santiago, Chile', 'Ciudad o Remoto'],
      ['Tipo / Modalidad', exp.type || 'Tiempo completo', 'Ej: Healthtech, Fintech, Proyecto'],
      ['Descripción General', exp.description, 'Resumen de responsabilidades y alcance'],
      ['Logros / Puntos Clave', exp.achievements.join('\n'), 'Puntos clave (uno por línea o separados por salto)'],
      ['Habilidades / Tecnologías', exp.skills.join(', '), 'Habilidades separadas por coma']
    ];

    const wsCompany = XLSX.utils.aoa_to_sheet(companyData);
    XLSX.utils.book_append_sheet(wb, wsCompany, safeSheetName);
  });

  // Tab: Educación
  const eduData = [
    ['Título / Grado', 'Institución', 'Período'],
    ...education.map((e) => [e.degree, e.institution, e.period])
  ];
  const wsEdu = XLSX.utils.aoa_to_sheet(eduData);
  XLSX.utils.book_append_sheet(wb, wsEdu, 'Educación');

  // Tab: Cursos y Certificaciones
  const coursesData = [
    ['Curso o Certificación', 'Institución', 'Año'],
    ...courses.map((c) => [c.title, c.institution, c.year])
  ];
  const wsCourses = XLSX.utils.aoa_to_sheet(coursesData);
  XLSX.utils.book_append_sheet(wb, wsCourses, 'Cursos y Certificaciones');

  // Tab: Idiomas
  const langData = [
    ['Idioma', 'Nivel'],
    ...languages.map((l) => [l.language, l.level])
  ];
  const wsLang = XLSX.utils.aoa_to_sheet(langData);
  XLSX.utils.book_append_sheet(wb, wsLang, 'Idiomas');

  // Tab: Métricas Recruiter
  const metricsData = [
    ['Valor', 'Métrica / Etiqueta', 'Subtítulo / Contexto'],
    ...metrics.map((m) => [m.value, m.label, m.sublabel])
  ];
  const wsMetrics = XLSX.utils.aoa_to_sheet(metricsData);
  XLSX.utils.book_append_sheet(wb, wsMetrics, 'Métricas Recruiter');

  // Tab: Experiencias Anteriores
  const prevExpData = [
    ['Empresa', 'Cargo / Rol', 'Período', 'Descripción'],
    ...prevExp.map((p) => [p.company, p.role, p.period, p.description])
  ];
  const wsPrevExp = XLSX.utils.aoa_to_sheet(prevExpData);
  XLSX.utils.book_append_sheet(wb, wsPrevExp, 'Experiencias Anteriores');

  return wb;
};

/**
 * Generates the proyectos.xlsx workbook.
 * Each project is in its own sheet.
 * Includes "Principal en Home: Sí / No" and "Año Realizado" for chronological sorting.
 */
export const generateProjectsWorkbook = (projects = FEATURED_PROJECTS): XLSX.WorkBook => {
  const wb = XLSX.utils.book_new();

  projects.forEach((p, idx) => {
    // Determine short clean sheet name
    const rawName = p.company ? `${p.company} - ${p.category}` : p.title;
    const safeSheetName = (rawName.length > 28 ? rawName.substring(0, 28) : rawName)
      .replace(/[\\/?*[\]]/g, '') || `Proyecto ${idx + 1}`;

    const projectYear = p.year || extractYearFromText(p.period);

    const projectData = [
      ['Campo', 'Valor', 'Descripción / Ayuda'],
      ['ID / Slug', p.id, 'Identificador único sin espacios (ej: echomusic-app)'],
      ['Título', p.title, 'Título principal del caso de estudio'],
      ['Subtítulo', p.subtitle, 'Bajada descriptiva del proyecto'],
      ['Año Realizado', projectYear, 'Año numérico para ordenamiento cronológico (ej: 2026)'],
      ['Estado Publicación', p.status || 'published', 'published = visible en sitio, draft = guardado como borrador'],
      ['Principal en Home', p.isPrincipal ?? true ? 'Sí' : 'No', 'Indica si se muestra en Home (Máx 6 en Home, ordenados por año)'],
      ['Empresa / Cliente', p.company, 'Nombre de la empresa o cliente'],
      ['Categoría', p.category, 'mobile | health | fintech | saas | ecommerce | design-system'],
      ['Etiqueta Categoría', p.categoryLabel, 'Texto visible (ej: Healthtech y aplicación móvil)'],
      ['Rol Desempeñado', p.role, 'Tu rol en el proyecto'],
      ['Equipo', p.team, 'Miembros y roles del equipo'],
      ['Plataforma', p.platform, 'Aplicación móvil, web responsive, etc.'],
      ['Duración', p.duration, 'Tiempo del proyecto'],
      ['Tags / Tecnologías', p.tags.join(', '), 'Separados por comas'],
      ['Resultado / Impacto', p.outcome, 'Métrica o logro clave'],
      ['Resumen General', p.summary, 'Párrafo resumen del caso'],
      ['URL Imagen Portada', typeof p.coverImage === 'string' ? p.coverImage : '', 'URL web de imagen o placeholder'],
      ['URL Prototipo Figma', p.prototypeUrl || '', 'Enlace embed de Figma (opcional)'],
      ['Link Figma Visible', p.links?.figma || '', 'URL pública del archivo o prototipo Figma'],
      ['Link Vercel Visible', p.links?.vercel || '', 'URL pública de Vercel o demo live'],
      ['Link Git Visible', p.links?.git || '', 'URL pública del repositorio Git/GitHub'],
      ['Color Acento', p.accentTint || '#533afd', 'Color HEX para acentos (ej: #533afd)'],
      ['Overview del Caso', p.caseStudy.overview, 'Contexto y antecedentes del producto'],
      ['Problema / Desafío', p.caseStudy.problem, 'Problema de negocio o usuario'],
      ['Mi Rol en Detalle', p.caseStudy.myRole, 'Tus aportes específicos y metodología'],
      ['Metodología de Investigación', p.caseStudy.researchMethodology.join('\n'), 'Puntos clave de research (uno por línea)'],
      ['Hallazgos & Insights Clave', p.caseStudy.keyInsights.join('\n'), 'Hallazgos de investigación (uno por línea)'],
      ['Puntos Destacados de Diseño', p.caseStudy.designHighlights.join('\n'), 'Decisiones de diseño y UX (uno por línea)'],
      ['Imágenes Interfaz / Carrusel', (p.caseStudy.interfaceImages || []).join('\n'), 'Opcional: URLs una por línea, sin título visible en el sitio'],
      ['Métrica 1', formatMetric(p.caseStudy.metrics[0]), 'Formato: Valor | Etiqueta | Descripción'],
      ['Métrica 2', formatMetric(p.caseStudy.metrics[1]), 'Formato: Valor | Etiqueta | Descripción'],
      ['Métrica 3', formatMetric(p.caseStudy.metrics[2]), 'Formato: Valor | Etiqueta | Descripción'],
      ['Métrica 4', formatMetric(p.caseStudy.metrics[3]), 'Formato: Valor | Etiqueta | Descripción'],
      ['Testimonio Cita', p.caseStudy.testimonial?.quote || '', 'Frase destacada o aprendizaje'],
      ['Testimonio Autor', p.caseStudy.testimonial?.author || '', 'Autor del testimonio o aprendizaje'],
      ['Testimonio Cargo', p.caseStudy.testimonial?.position || '', 'Cargo o contexto']
    ];

    const wsProject = XLSX.utils.aoa_to_sheet(projectData);
    XLSX.utils.book_append_sheet(wb, wsProject, safeSheetName);
  });

  return wb;
};

const formatMetric = (m?: { metric: string; label: string; description: string }) => {
  if (!m) return '';
  return `${m.metric} | ${m.label} | ${m.description}`;
};

const parseMetricString = (val?: string) => {
  if (!val) return null;
  const parts = val.split('|').map((s) => s.trim());
  if (parts.length >= 2) {
    return {
      metric: parts[0] || '100%',
      label: parts[1] || 'Impacto',
      description: parts[2] || ''
    };
  }
  return null;
};

/* =========================================================================
   2. PARSE UPLOADED EXCEL WORKBOOKS
   ========================================================================= */

/**
 * Parses curriculum.xlsx:
 * - Sheet 1 -> Personal Info
 * - Any Sheet named after a company -> parses as ExperienceItem
 * - Dedicated sheets for Educación, Cursos, Idiomas, Métricas
 */
export const parseCurriculumExcel = async (
  file: File | ArrayBuffer
): Promise<{
  owner: typeof PORTFOLIO_OWNER;
  experiences: ExperienceItem[];
  previousExperiences: PreviousExperienceItem[];
  education: EducationItem[];
  courses: CourseItem[];
  languages: LanguageItem[];
  metrics: MetricItem[];
}> => {
  const buffer = file instanceof File ? await file.arrayBuffer() : file;
  const wb = XLSX.read(buffer, { type: 'array' });

  // Default state cloned from initial
  let owner = { ...PORTFOLIO_OWNER };
  let experiences: ExperienceItem[] = [];
  let previousExperiences: PreviousExperienceItem[] = [...PREVIOUS_EXPERIENCE];
  let education: EducationItem[] = [...EDUCATION_ITEMS];
  let courses: CourseItem[] = [...COURSE_ITEMS];
  let languages: LanguageItem[] = [...LANGUAGE_ITEMS];
  let metrics: MetricItem[] = [...RECRUITER_METRICS];

  const sheetNames = wb.SheetNames;
  if (sheetNames.length === 0) {
    throw new Error('El archivo Excel está vacío.');
  }

  // 1. Process Sheet 1 (Personal Info)
  const firstSheetName = sheetNames[0];
  const firstSheet = wb.Sheets[firstSheetName];
  const personalRows = XLSX.utils.sheet_to_json<any[]>(firstSheet, { header: 1 });

  const kvMap: Record<string, string> = {};
  personalRows.forEach((row) => {
    if (row && row.length >= 2 && row[0]) {
      const key = String(row[0]).trim().toLowerCase();
      const val = row[1] !== undefined ? String(row[1]).trim() : '';
      kvMap[key] = val;
    }
  });

  if (kvMap['nombre']) owner.name = kvMap['nombre'];
  if (kvMap['saludo corto']) owner.shortGreeting = kvMap['saludo corto'];
  if (kvMap['cargo / título'] || kvMap['cargo'] || kvMap['título']) {
    owner.title = kvMap['cargo / título'] || kvMap['cargo'] || kvMap['título'];
  }
  if (kvMap['bajada / tagline'] || kvMap['tagline'] || kvMap['bajada']) {
    owner.tagline = kvMap['bajada / tagline'] || kvMap['tagline'] || kvMap['bajada'];
  }
  if (kvMap['biografía principal'] || kvMap['biografia principal'] || kvMap['bio']) {
    owner.bio = kvMap['biografía principal'] || kvMap['biografia principal'] || kvMap['bio'];
  }
  if (kvMap['biografía secundaria'] || kvMap['biografia secundaria']) {
    owner.secondaryBio = kvMap['biografía secundaria'] || kvMap['biografia secundaria'];
  }
  if (kvMap['estado de disponibilidad'] || kvMap['status'] || kvMap['estado']) {
    owner.status = kvMap['estado de disponibilidad'] || kvMap['status'] || kvMap['estado'];
  }
  if (kvMap['ubicación'] || kvMap['ubicacion']) {
    owner.location = kvMap['ubicación'] || kvMap['ubicacion'];
  }
  if (kvMap['años de experiencia'] || kvMap['experiencia']) {
    owner.experienceYears = kvMap['años de experiencia'] || kvMap['experiencia'];
  }
  if (kvMap['email'] || kvMap['correo']) owner.email = kvMap['email'] || kvMap['correo'];
  if (kvMap['teléfono / whatsapp'] || kvMap['telefono'] || kvMap['whatsapp']) {
    owner.phone = kvMap['teléfono / whatsapp'] || kvMap['telefono'] || kvMap['whatsapp'];
  }
  if (kvMap['linkedin']) owner.social.linkedin = kvMap['linkedin'];
  if (kvMap['portafolio web'] || kvMap['portafolio']) {
    owner.social.portfolio = kvMap['portafolio web'] || kvMap['portafolio'];
  }

  // 2. Process other sheets
  sheetNames.slice(1).forEach((sheetName) => {
    const ws = wb.Sheets[sheetName];
    const lowerName = sheetName.trim().toLowerCase();

    // Check for special sections
    if (lowerName.includes('educación') || lowerName.includes('educacion')) {
      const rows = XLSX.utils.sheet_to_json<any[]>(ws, { header: 1 });
      const newEdu: EducationItem[] = [];
      rows.slice(1).forEach((r) => {
        if (r && r[0]) {
          newEdu.push({
            degree: String(r[0] || '').trim(),
            institution: String(r[1] || '').trim(),
            period: String(r[2] || '').trim()
          });
        }
      });
      if (newEdu.length > 0) education = newEdu;
    } else if (lowerName.includes('curso') || lowerName.includes('certificacion')) {
      const rows = XLSX.utils.sheet_to_json<any[]>(ws, { header: 1 });
      const newCourses: CourseItem[] = [];
      rows.slice(1).forEach((r) => {
        if (r && r[0]) {
          newCourses.push({
            title: String(r[0] || '').trim(),
            institution: String(r[1] || '').trim(),
            year: String(r[2] || '').trim()
          });
        }
      });
      if (newCourses.length > 0) courses = newCourses;
    } else if (lowerName.includes('idioma')) {
      const rows = XLSX.utils.sheet_to_json<any[]>(ws, { header: 1 });
      const newLang: LanguageItem[] = [];
      rows.slice(1).forEach((r) => {
        if (r && r[0]) {
          newLang.push({
            language: String(r[0] || '').trim(),
            level: String(r[1] || '').trim()
          });
        }
      });
      if (newLang.length > 0) languages = newLang;
    } else if (lowerName.includes('métrica') || lowerName.includes('metrica')) {
      const rows = XLSX.utils.sheet_to_json<any[]>(ws, { header: 1 });
      const newMetrics: MetricItem[] = [];
      rows.slice(1).forEach((r) => {
        if (r && r[0] && r[1]) {
          newMetrics.push({
            value: String(r[0] || '').trim(),
            label: String(r[1] || '').trim(),
            sublabel: String(r[2] || '').trim()
          });
        }
      });
      if (newMetrics.length > 0) metrics = newMetrics;
    } else if (lowerName.includes('experiencias anteriores') || lowerName.includes('anterior')) {
      const rows = XLSX.utils.sheet_to_json<any[]>(ws, { header: 1 });
      const newPrev: PreviousExperienceItem[] = [];
      rows.slice(1).forEach((r) => {
        if (r && r[0]) {
          newPrev.push({
            company: String(r[0] || '').trim(),
            role: String(r[1] || '').trim(),
            period: String(r[2] || '').trim(),
            description: String(r[3] || '').trim()
          });
        }
      });
      if (newPrev.length > 0) previousExperiences = newPrev;
    } else {
      // Company Tab (Standard uniform structure)
      const rows = XLSX.utils.sheet_to_json<any[]>(ws, { header: 1 });
      const compMap: Record<string, string> = {};
      const rawAchievements: string[] = [];

      rows.forEach((r) => {
        if (r && r.length >= 2 && r[0]) {
          const key = String(r[0]).trim().toLowerCase();
          const val = r[1] !== undefined ? String(r[1]).trim() : '';
          compMap[key] = val;

          // If row starts with logro / achievement
          if (key.startsWith('logro') && val) {
            rawAchievements.push(val);
          }
        }
      });

      const company = compMap['empresa'] || sheetName;
      const role = compMap['cargo / rol'] || compMap['cargo'] || compMap['rol'] || 'Product Designer';
      const period = compMap['período'] || compMap['periodo'] || compMap['año'] || '2024';
      const rawStatus = (compMap['estado'] || '').toLowerCase();
      const status: ExperienceItem['status'] = rawStatus.includes('archiv')
        ? 'archived'
        : rawStatus.includes('draft') || rawStatus.includes('borrador')
          ? 'draft'
          : 'published';
      const location = compMap['ubicación'] || compMap['ubicacion'] || 'Santiago, Chile';
      const type = compMap['tipo / modalidad'] || compMap['tipo'] || 'Product Design';
      const description = compMap['descripción general'] || compMap['descripcion'] || '';

      // Achievements: either from 'logros / puntos clave' multi-line string or individual 'logro X' rows
      let achievements: string[] = [];
      if (compMap['logros / puntos clave'] || compMap['logros']) {
        const text = compMap['logros / puntos clave'] || compMap['logros'];
        achievements = text
          .split(/\r?\n/)
          .map((s) => s.replace(/^[•\-\*]\s*/, '').trim())
          .filter(Boolean);
      } else if (rawAchievements.length > 0) {
        achievements = rawAchievements;
      }

      // Skills: comma-separated
      let skills: string[] = [];
      if (compMap['habilidades / tecnologías'] || compMap['habilidades'] || compMap['skills']) {
        const text = compMap['habilidades / tecnologías'] || compMap['habilidades'] || compMap['skills'];
        skills = text
          .split(/[,;\n]/)
          .map((s) => s.trim())
          .filter(Boolean);
      }

      const id = `exp-${company.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${period.replace(/[^0-9]/g, '')}`;

      experiences.push({
        id,
        company,
        role,
        period,
        location,
        type,
        status,
        description,
        achievements: achievements.length > 0 ? achievements : ['Liderazgo de diseño y discovery de producto.'],
        skills: skills.length > 0 ? skills : ['Product Design', 'UX/UI', 'User Research']
      });
    }
  });

  return {
    owner,
    experiences: experiences.length > 0 ? experiences : WORK_EXPERIENCE,
    previousExperiences,
    education,
    courses,
    languages,
    metrics
  };
};

/**
 * Parses proyectos.xlsx:
 * - Every single sheet is treated as ONE project.
 * - Automatically adds new tabs to the portfolio.
 * - Parses "Año Realizado" for chronological sorting.
 * - Parses "Principal en Home" (máx 6 in Home).
 */
export const parseProjectsExcel = async (
  file: File | ArrayBuffer
): Promise<{
  allProjects: Project[];
  homeProjects: Project[];
}> => {
  const buffer = file instanceof File ? await file.arrayBuffer() : file;
  const wb = XLSX.read(buffer, { type: 'array' });

  const allProjects: Project[] = [];

  wb.SheetNames.forEach((sheetName) => {
    const ws = wb.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json<any[]>(ws, { header: 1 });

    const pMap: Record<string, string> = {};
    rows.forEach((r) => {
      if (r && r.length >= 2 && r[0]) {
        const key = String(r[0]).trim().toLowerCase();
        const val = r[1] !== undefined ? String(r[1]).trim() : '';
        pMap[key] = val;
      }
    });

    const title = pMap['título'] || pMap['titulo'] || sheetName;
    const company = pMap['empresa / cliente'] || pMap['empresa'] || pMap['cliente'] || sheetName;
    const id = pMap['id / slug'] || pMap['id'] || `proj-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    const subtitle = pMap['subtítulo'] || pMap['subtitulo'] || pMap['resumen general'] || 'Caso de estudio UX/UI.';
    
    // Parse Year
    const rawYear = pMap['año realizado'] || pMap['año'] || pMap['ano'] || pMap['período'] || pMap['periodo'];
    const year = extractYearFromText(rawYear);
    const period = pMap['período'] || pMap['periodo'] || String(year);
    const rawStatus = (pMap['estado publicación'] || pMap['estado publicacion'] || pMap['estado'] || '').toLowerCase();
    const status: Project['status'] = rawStatus.includes('archiv')
      ? 'archived'
      : rawStatus.includes('draft') || rawStatus.includes('borrador')
        ? 'draft'
        : 'published';

    // Parse Principal / Home Flag
    const rawPrincipal = pMap['principal en home'] || pMap['principal'] || pMap['destacado'] || pMap['home'];
    const isPrincipal = rawPrincipal !== undefined ? parseBooleanValue(rawPrincipal) : true;

    // Category
    const categoryRaw = (pMap['categoría'] || pMap['categoria'] || 'saas').toLowerCase();
    let category: Project['category'] = 'saas';
    if (categoryRaw.includes('mobile') || categoryRaw.includes('app')) category = 'mobile';
    else if (categoryRaw.includes('health') || categoryRaw.includes('salud')) category = 'health';
    else if (categoryRaw.includes('fintech') || categoryRaw.includes('crédito') || categoryRaw.includes('financ')) category = 'fintech';
    else if (categoryRaw.includes('ecom') || categoryRaw.includes('comercio')) category = 'ecommerce';
    else if (categoryRaw.includes('design') || categoryRaw.includes('sistema')) category = 'design-system';

    const categoryLabel = pMap['etiqueta categoría'] || pMap['etiqueta categoria'] || pMap['categoría'] || 'Product Design';
    const role = pMap['rol desempeñado'] || pMap['rol'] || 'Product Designer';
    const team = pMap['equipo'] || 'Célula multidisciplinaria (Carlos Montes, PM, Devs)';
    const platform = pMap['plataforma'] || 'Web & Mobile';
    const duration = pMap['duración'] || pMap['duracion'] || period;
    const outcome = pMap['resultado / impacto'] || pMap['resultado'] || pMap['impacto'] || 'Diseño y validación integral';
    const summary = pMap['resumen general'] || pMap['resumen'] || subtitle;
    const coverImage = pMap['url imagen portada'] || pMap['imagen portada'] || pMap['imagen'] || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600&auto=format&fit=crop';
    const prototypeUrl = pMap['url prototipo figma'] || pMap['prototipo'] || undefined;
    const links = {
      figma: pMap['link figma visible'] || pMap['url figma visible'] || pMap['figma'] || undefined,
      vercel: pMap['link vercel visible'] || pMap['url vercel visible'] || pMap['vercel'] || undefined,
      git: pMap['link git visible'] || pMap['url git visible'] || pMap['github'] || pMap['git'] || undefined
    };
    const accentTint = pMap['color acento'] || '#533afd';

    // Tags
    const tagsRaw = pMap['tags / tecnologías'] || pMap['tags'] || pMap['tecnologías'] || '';
    const tags = tagsRaw
      ? tagsRaw.split(/[,;\n]/).map((t) => t.trim()).filter(Boolean)
      : ['UX Research', 'Product Design', 'Figma'];

    // Case study details
    const overview = pMap['overview del caso'] || pMap['overview'] || summary;
    const problem = pMap['problema / desafío'] || pMap['problema'] || 'Optimizar la experiencia y métricas del producto.';
    const myRole = pMap['mi rol en detalle'] || pMap['mi rol'] || role;

    const researchMethodology = parseListOrLines(pMap['metodología de investigación'] || pMap['metodologia'], [
      'Investigación con stakeholders e identificación de puntos de dolor.',
      'Auditoría heurística y benchmarking competitivo de mercado.',
      'Validación y pruebas de usabilidad con usuarios finales.'
    ]);

    const keyInsights = parseListOrLines(pMap['hallazgos & insights clave'] || pMap['insights'], [
      'Los usuarios necesitan procesos claros con retroalimentación en tiempo real.',
      'La reducción de pasos innecesarios incrementa la tasa de conversión y satisfacción.'
    ]);

    const designHighlights = parseListOrLines(pMap['puntos destacados de diseño'] || pMap['diseño'], [
      'Arquitectura de información modular adaptada a móvil y escritorio.',
      'Componentes reutilizables bajo estándares de accesibilidad.',
      'Flujos optimizados con validación instantánea de estados.'
    ]);
    const interfaceImages = parseListOrLines(
      pMap['imágenes interfaz / carrusel']
        || pMap['imagenes interfaz / carrusel']
        || pMap['imágenes interfaz']
        || pMap['imagenes interfaz']
        || pMap['carrusel']
        || '',
      []
    );

    // Metrics
    const metrics: Project['caseStudy']['metrics'] = [];
    ['métrica 1', 'métrica 2', 'métrica 3', 'métrica 4', 'metrica 1', 'metrica 2', 'metrica 3', 'metrica 4'].forEach((k) => {
      if (pMap[k]) {
        const m = parseMetricString(pMap[k]);
        if (m) metrics.push(m);
      }
    });

    if (metrics.length === 0) {
      metrics.push(
        { metric: '+30%', label: 'Impacto Estimado', description: 'Mejora en adopción y experiencia de usuario.' },
        { metric: '100%', label: 'Flujo Validado', description: 'Arquitectura y componentes probados con usuarios.' }
      );
    }

    // Testimonial
    const quote = pMap['testimonio cita'] || pMap['testimonio'] || '';
    const author = pMap['testimonio autor'] || '';
    const position = pMap['testimonio cargo'] || '';

    const project: Project = {
      id,
      title,
      subtitle,
      year,
      isPrincipal,
      status,
      category,
      categoryLabel,
      tags,
      company,
      period,
      role,
      team,
      platform,
      duration,
      outcome,
      summary,
      coverImage,
      accentTint,
      prototypeUrl,
      links: Object.values(links).some(Boolean) ? links : undefined,
      caseStudy: {
        overview,
        problem,
        myRole,
        team,
        duration,
        platform,
        researchMethodology,
        keyInsights,
        designHighlights,
        interfaceImages: interfaceImages.length > 0 ? interfaceImages : undefined,
        metrics,
        testimonial: quote ? { quote, author: author || 'Cliente', position: position || 'Líder del Proyecto' } : undefined
      }
    };

    allProjects.push(project);
  });

  // Sort ALL projects chronologically by year (descending: newest first)
  allProjects.sort((a, b) => (b.year || 2020) - (a.year || 2020));

  // Determine Home projects:
  // 1. Filter projects where isPrincipal === true
  // 2. Take top 6 projects
  let homeProjects = allProjects.filter((p) => p.status === 'published' && p.isPrincipal !== false);
  if (homeProjects.length === 0) {
    homeProjects = allProjects.filter((p) => p.status === 'published').slice(0, 6);
  } else {
    homeProjects = homeProjects.slice(0, 6);
  }

  return {
    allProjects,
    homeProjects
  };
};

const parseListOrLines = (text: string | undefined, defaultList: string[]): string[] => {
  if (!text) return defaultList;
  const list = text
    .split(/\r?\n/)
    .map((s) => s.replace(/^[•\-\*]\s*/, '').trim())
    .filter(Boolean);
  return list.length > 0 ? list : defaultList;
};

/* =========================================================================
   3. BROWSER DOWNLOAD HELPERS
   ========================================================================= */

export const downloadWorkbook = (wb: XLSX.WorkBook, fileName: string) => {
  XLSX.writeFile(wb, fileName);
};
