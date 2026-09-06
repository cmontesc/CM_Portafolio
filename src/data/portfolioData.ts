import { Project, ExperienceItem, MetricItem, PortfolioOwner, SkillCategory, PreviousExperienceItem, EducationItem, CourseItem, LanguageItem } from '../types';
import echomusicCoverImage from '../assets/images/echomusic_mockup_1787164821112.jpg';

export const PORTFOLIO_OWNER: PortfolioOwner = {
  name: 'Carlos Montes',
  shortGreeting: 'Hola, soy Carlos.',
  title: 'Senior Product Designer',
  tagline: 'Estrategia UX · Product Discovery · Fintech y salud',
  bio: 'Senior Product Designer especializado en diseñar productos digitales para resolver procesos complejos. Mi enfoque consiste en comprender el problema antes de definir la solución, alineando negocio, usuarios, operación y tecnología para tomar decisiones respaldadas por evidencia.',
  secondaryBio: 'He trabajado en industrias como salud, servicios financieros e industria, liderando procesos de discovery, investigación, arquitectura de información, diseño de experiencia y validación con usuarios. Cuento con experiencia en WordPress, PHP, JavaScript, HTML y CSS, lo que me permite colaborar con equipos de desarrollo y entender las restricciones técnicas de cada proyecto.',
  status: 'Disponible para nuevos proyectos y posiciones senior',
  location: 'Santiago, Chile',
  experienceYears: '15+ años de experiencia',
  email: 'carlos.montes.c@gmail.com',
  phone: '+56 9 9295 2563',
  social: {
    linkedin: 'https://linkedin.com/in/carlosmontesc',
    portfolio: 'https://carlosmontes.design'
  }
};

export const RECRUITER_METRICS: MetricItem[] = [
  {
    value: '+30%',
    label: 'Adopción en aplicación de salud',
    sublabel: 'Tras rediseño UX y nueva arquitectura (AccuHealth)'
  },
  {
    value: '-10%',
    label: 'Consultas de usuarios',
    sublabel: 'Redefiniendo estados en licencias médicas (Isapre Esencial)'
  },
  {
    value: '+23%',
    label: 'Simulaciones de crédito',
    sublabel: '+12% en leads calificados en flujo financiero (Coomeva)'
  },
  {
    value: 'MVP',
    label: 'Discovery en fintech',
    sublabel: 'Definición de productos financieros y crédito en México'
  }
];

export const IMPACT_ACHIEVEMENTS: string[] = [
  '+30% adopción en app de salud tras rediseño UX y nueva arquitectura.',
  '-10% consultas de usuarios redefiniendo estados en licencias médicas.',
  '+23% simulaciones y +12% leads en flujo de crédito (Coomeva).',
  'Definición de MVPs y discovery en productos financieros en México.'
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'echomusic-app-marketplace',
    title: 'Echomusic — Plataforma & Marketplace de Música Nacional',
    subtitle: 'El escenario eres tú: investigación, arquetipos, arquitectura de información y diseño UI/UX para conectar y contratar artistas musicales emergentes.',
    category: 'mobile',
    categoryLabel: 'Aplicación móvil y marketplace',
    tags: ['UX Research', 'Marketplace', 'Aplicación móvil', 'Arquetipos y personas', 'User Flow', 'UI Kit y prototipo', 'Figma'],
    company: 'Echomusic',
    period: '2019',
    role: 'UX / UI Designer',
    team: 'UX / UI Designer (Carlos Montes), Mentores Coderhouse',
    platform: 'Aplicación móvil (iOS y Android)',
    duration: '2019 (Proyecto de Diseño & MVP)',
    outcome: 'Primer marketplace de contratación y difusión de artistas regionales en Chile',
    summary: 'Diseño end-to-end de Echomusic para fomentar la música chilena independiente: investigación del sector musical (15.000 artistas), arquetipos (Mauricio y Verónica), mapa de contenidos, user flow de contratación, wireframes, UI Kit en Figma y prototipo interactivo validado.',
    coverImage: echomusicCoverImage,
    aspectRatioClass: 'aspect-[9/13]',
    accentTint: '#db2777',
    isFeaturedMarquee: true,
    prototypeUrl: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FoOhxEaO6A9mhHFRSkgx1EG%2FPrototipo%3Fnode-id%3D344%253A0%26scaling%3Dscale-down',
    links: {
      figma: 'https://www.figma.com/proto/oOhxEaO6A9mhHFRSkgx1EG/Prototipo?node-id=344%3A0&scaling=scale-down'
    },
    caseStudy: {
      overview: 'Echomusic nació con el propósito de fomentar la música chilena y potenciar a los artistas emergentes de regiones, resolviendo la desconexión entre músicos que buscan impulsar su carrera y personas o productoras que necesitan contratar shows en vivo de manera confiable.',
      problem: 'La búsqueda de artistas para eventos se limitaba a recomendaciones informales o a los pocos músicos con visibilidad digital. A su vez, más de 15.000 músicos en Chile no disponían de vitrinas ni canales directos de contratación, con un 77% del consumo radial y digital copado por música internacional.',
      myRole: 'Lideré la investigación de mercado, definición de propuesta de valor, modelado de 2 arquetipos, arquitectura de información, flujos de usuario (User Flow de reserva y checkout), diseño de wireframes, UI Kit y prototipo interactivo de alta fidelidad en Figma.',
      team: 'Carlos Montes (UX/UI Designer) en el marco del programa de formación avanzada de diseño UX/UI en Coderhouse.',
      duration: '2019 (Lorem ipsum: 3 meses de Discovery, Diseño Heurístico y Prototipado)',
      platform: 'Aplicación móvil (iOS y Android) y prototipo interactivo en Figma',
      researchMethodology: [
        'Investigación de Industria: Mapeo del ecosistema musical chileno: 1.139 empresas del sector (82% microempresas), ~1.800 músicos tocando en transporte público y más de 15.000 artistas en el país. El 83% de los agentes del sector son artistas, 11% técnicos y solo 7% intermediarios.',
        'Diagnóstico de Difusión: Constatación de la brecha de difusión nacional (23% música chilena vs. 77% internacional) y la falta de plataformas centralizadas para bandas fuera de la Región Metropolitana.',
        'Descubrimiento del MVP Evolutivo: La hipótesis inicial contemplaba solo conectar seguidores y perfiles de artistas. Tras el primer test de usabilidad, se descubrió la necesidad crítica de incorporar un marketplace con tarifas, planes y contratación directa con checkout.',
        'Benchmark & Análisis de Referentes: Análisis de plataformas de streaming y marketplaces de servicios para estructurar filtros por género musical, geolocalización por radio de distancia y fechas de eventos.'
      ],
      keyInsights: [
        'Arquetipo 1 — Mauricio (53 años, Emprendedor, Los Ángeles): Busca apoyar bandas locales y asistir a música en vivo en sus viajes, pero sufre por información desactualizada y venta de entradas inaccesible fuera de su comuna.',
        'Arquetipo 2 — Verónica (40 años, Productora de Eventos, Vitacura): Wedding planner que pierde horas buscando músicos adecuados para temáticas específicas; necesita cotizaciones transparentes y proveedores confiables para regiones.',
        'Pivote del Producto: Pasar de un directorio social a un marketplace integral con reserva de fechas, planes de presentación (Plan A / Plan B), tarifas públicas y confirmación de pago seguro.',
        'Geolocalización como Eje Central: Filtro por radio de distancia para descubrir eventos locales y reducir costos logísticos de traslado de bandas.'
      ],
      designHighlights: [
        'Onboarding y Personalización: Selección inicial de géneros musicales favoritos y radio de ubicación geográfica.',
        'Explorador de Artistas y Eventos: Home con novedades, artistas recomendados en la región y agenda de próximos festivales/conciertos.',
        'Ficha de Artista & Reproductor: Perfil multimedia con biografía, reproductor de audio integrado (Single/EP), redes sociales y selector de planes de contratación.',
        'User Flow de Contratación: Flujo guiado de reserva: Selección de fecha en calendario → Tipo de evento y plan de presentación → Formulario de requerimientos → Confirmación de reserva → Checkout seguro.',
        'UI Kit & Tipografía: Sistema de diseño móvil con SF Pro Display / Text, paleta púrpura/magenta vibrante y componentes reutilizables.'
      ],
      metrics: [
        {
          metric: '15.000+',
          label: 'Artistas Potenciales',
          description: 'Universo estimado de músicos independientes a nivel nacional que requieren canales de difusión.'
        },
        {
          metric: '2',
          label: 'Arquetipos Validados',
          description: 'Perfiles profundos: Melómano seguidor (Mauricio) y Productora de eventos (Verónica).'
        },
        {
          metric: '100%',
          label: 'Flujo de Reserva Diseñado',
          description: 'De directorio pasivo a marketplace interactivo con booking y contratación.'
        },
        {
          metric: 'Live',
          label: 'Prototipo Figma Interactivo',
          description: 'Flujo interactivo completo de onboarding, catálogo, ficha y reserva validado con usuarios.'
        }
      ],
      testimonial: {
        quote: 'El primer MVP no contemplaba la opción de contratación, solo conectar artistas con potenciales clientes. Tras realizar el primer test de uso, se concluyó la necesidad de incluir la opción de valoración y contratación, para convertirnos en el primer marketplace de músicos.',
        author: 'Carlos Montes',
        position: 'UX / UI Designer · Coderhouse 2019'
      }
    }
  },
  {
    id: 'isapre-esencial-licencias',
    title: 'Mejora del flujo de Licencias Médicas',
    subtitle: 'Rediseño del proceso digital de licencias médicas de Isapre Esencial: menos incertidumbre, menos reclamos, más claridad en cada estado del trámite.',
    category: 'health',
    categoryLabel: 'Salud y diseño de producto',
    tags: ['Discovery', 'UX/UI', 'Product Design', 'UX Writing', 'Workshop'],
    company: 'Isapre Esencial',
    period: '2025 — 2026',
    role: 'Product Designer',
    team: 'Product Management, UX (Carlos), Ingeniería, Negocio y Experiencia de cliente (CX)',
    platform: 'Sucursal Virtual (Escritorio, Móvil) & Email Transaccional',
    duration: 'Discovery → Test de usabilidad',
    outcome: 'Foco: Comunicación, pagos y estados (Menos reclamos e incertidumbre)',
    summary: 'Rediseño del proceso digital de licencias médicas de Isapre Esencial. Diagnóstico y rediseño integral para reducir reclamos, aportar transparencia y brindar certeza a los afiliados en cada etapa del trámite.',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop',
    aspectRatioClass: 'aspect-[16/11]',
    accentTint: '#0284c7',
    isFeaturedMarquee: true,
    caseStudy: {
      overview: 'Las licencias médicas son uno de los trámites más sensibles para un afiliado de Isapre: implica salud, ingresos y plazos legales. El flujo actual generaba altos niveles de incertidumbre por falta de claridad en la comunicación.',
      problem: 'El problema: Los afiliados no sabían en qué estado estaba su licencia, ni cuánto ni cuándo se les pagaría. Objetivo del proyecto: Reducir los reclamos asociados a pagos, estados del proceso y comunicación, identificando puntos de fricción y evaluando el impacto real de las mejoras propuestas.',
      myRole: 'Product Designer: Lideré el proceso completo desde Discovery hasta Test de Usabilidad, facilitando sesiones colaborativas con stakeholders, definiendo los cuatro focos de mejora, arquitectura de información y validación con usuarios.',
      team: 'Product Management, UX, Ingeniería, Negocio y Experiencia de cliente (CX).',
      duration: 'Discovery → Test de usabilidad',
      platform: 'Sucursal Virtual (Escritorio y Móvil) + Matriz de Emails Transaccionales',
      researchMethodology: [
        '01. Discovery con stakeholders: Sesiones colaborativas con Product Management, UX, ingeniería, negocio y Experiencia de cliente para identificar dolores del proceso y limitaciones técnicas, cruzadas con NPS y reclamos reales.',
        '02. Cuatro focos de mejora: Comunicación del proceso (estados, subestados y próxima acción), Claridad de pago (comprobante, cálculo del subsidio y fechas), Documentación requerida (qué falta, por qué y cómo enviarla) y Licencias en papel (información específica).',
        '03. Rediseño de la landing: Nueva arquitectura de navegación con acceso directo a licencias médicas, búsqueda por periodo, aviso de actualización de datos bancarios y empty states que explican qué hacer a continuación.',
        '04. Test de usabilidad: Validación de la comprensión del flujo y de los estados de resolución, lo que ajustó contenido, jerarquía visual y comunicación antes del cierre del proyecto.'
      ],
      keyInsights: [
        'Los afiliados no sabían en qué estado estaba su licencia, ni cuánto ni cuándo se les pagaría.',
        'Comunicación del proceso: Los usuarios necesitan visibilidad de estados, subestados y claridad en la próxima acción requerida.',
        'Claridad de pago: Requerimiento de comprobantes accesibles, cálculo transparente del subsidio y fechas estimadas de pago.',
        'Documentación y papel: La plataforma debe indicar qué falta, el motivo y cómo enviarlo sin obligar a trámites presenciales.'
      ],
      designHighlights: [
        'Landing final (Escritorio y Móvil): Nueva arquitectura con acceso directo, búsqueda por período, aviso para actualizar datos bancarios y de empleador, y empty states explicativos.',
        'Flujo móvil responsive: Mismo criterio de claridad en móviles con estados visibles, periodo de consulta accesible y empty state explicativo para solicitudes en evaluación.',
        'Estandarización de comunicación por Email: Matriz completa de correos para Recibida/Evaluación, Documentos pendientes, Error de empleador, Resoluciones con/sin pago, Resoluciones COMPIN y Notificaciones de pago.',
        'Línea de tiempo y estados de resolución: Stepper visual claro (Recibida → En evaluación → Resolución → Evaluación de pago → Pagada).'
      ],
      metrics: [
        {
          metric: '-10%',
          label: 'Consultas de usuarios',
          description: 'Reducción de consultas asociadas a los estados del proceso de licencias médicas.'
        },
        {
          metric: '90%',
          label: 'Comprensión de estados',
          description: 'Nivel de comprensión alcanzado durante la validación con usuarios.'
        },
        {
          metric: 'Transparencia',
          label: 'Mayor transparencia',
          description: 'Visibilidad clara de cada estado del proceso, de principio a fin, reduciendo la incertidumbre.'
        },
        {
          metric: 'Claridad',
          label: 'Menos incertidumbre',
          description: 'Claridad sobre montos y plazos de pago del subsidio.'
        }
      ],
      testimonial: {
        quote: 'En procesos críticos como una licencia médica, la comunicación clara, la visibilidad del proceso y la autonomía del usuario pesan más que cualquier mejora visual: son la base de la confianza.',
        author: 'Aprendizaje Clave del Proyecto',
        position: 'Mejora del flujo de Licencias Médicas · Isapre Esencial'
      }
    }
  },
  {
    id: 'santaisabel-app-mvp',
    title: 'Definición del MVP — Santa Isabel App (SisaApp)',
    subtitle: 'Metodología integral de Product Discovery, investigación con 36 usuarios, definición de arquetipos y diseño de flujos clave para la app de supermercado.',
    category: 'mobile',
    categoryLabel: 'E-commerce & Product Discovery',
    tags: ['Product Discovery', 'User Research (36 entrevistas)', 'Arquetipos y personas', 'Benchmark', 'Épicas y HU', 'Aplicación móvil'],
    company: 'Santa Isabel',
    period: '2021',
    role: 'Product Designer',
    team: 'Célula UX/UI (Carlos), PO, Marketing, TI, Fulfilment, Servicio al Cliente',
    platform: 'Aplicación móvil (iOS y Android) y web responsive',
    duration: 'Discovery → Definición del MVP',
    outcome: 'Metodología integral de descubrimiento, 36 entrevistas, 5 arquetipos y backlog de épicas/HU',
    summary: 'Desarrollo de una metodología integral de Product Discovery para SisaApp: alineación de stakeholders internos y conectados, investigación con 36 usuarios, perfilamiento demográfico, 5 arquetipos, benchmark competitivo y wireframes de flujos esenciales.',
    coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop',
    aspectRatioClass: 'aspect-[3/4]',
    accentTint: '#e11d48',
    isFeaturedMarquee: true,
    caseStudy: {
      overview: 'Para SisaApp se desarrolló una metodología integral cuyo enfoque se centró en identificar a los usuarios y las necesidades clave, priorizar las características esenciales e iterar rápidamente para crear una experiencia de usuario óptima.',
      problem: 'El problema: Los clientes de supermercado demandan rapidez, variedad de productos y maximización de presupuesto, pero enfrentan quiebres de experiencia críticos como falta de stock post-compra, desconfianza en el criterio del shopper para frescos (FFW) y sustitutos no adecuados.',
      myRole: 'Lideré el proceso de Discovery: mapeo de stakeholders internos y conectados, 36 entrevistas en profundidad, perfilamiento de clientes Santaisabel.cl, definición de 5 arquetipos (con fichas detalladas de Claudia y Loreto), benchmarking de 5 competidores y diseño de wireframes de flujos críticos (PDP, Direcciones, Login).',
      team: 'Célula UX/UI, Product Owner, Marketing, TI, Fulfilment, Servicio al Cliente, Shoppers y Repartidores.',
      duration: 'Discovery → Definición del MVP',
      platform: 'App Móvil iOS / Android & Web Responsive',
      researchMethodology: [
        'Mapeo de Stakeholders: 1ra etapa con internos (PO, TI, Marketing, Servicio al cliente, Célula UX/UI, Fulfilment) y 2da etapa con externos y conectados (Shoppers, Repartidores, Clientes Santa Isabel) para identificar oportunidades del MVP evolutivo.',
        'Entrevistas en profundidad (Muestra 36 usuarios): Sesiones online de 30-45 min con hombres y mujeres en Chile (22 a 54 años): 12 clientes Santaisabel.cl, 12 clientes Sala y 12 clientes de otras marcas (Lider, Tottus, Cornershop, Rappi).',
        'Perfilamiento Cuantitativo: Predominio de segmentos socioeconómicos C2, C3 y D (~80-83%), mujeres (76.9%), Generación X (50.2%) y Millennials (31.9%), con concentración geográfica >40.4% en Santiago, Maipú, Valparaíso y Viña del Mar.',
        'Análisis de Competidores: Benchmarking exhaustivo de Jumbo, Lider, Cornershop, Rappi y Walmart analizando tiempos de entrega, catálogo, PDP, carro, checkout y gestión de direcciones.',
        'Épicas e Historias de Usuario (HU): Estructuración del backlog para Onboarding, Catálogo/Búsqueda, Carro de compra, Medios de pago, Seguimiento y Perfil.'
      ],
      keyInsights: [
        'Medios de pago y control: 62% de clientes Santa Isabel usa débito por control presupuestario y 38% crédito Cencosud Scotiabank por acumulación de puntos y promociones. En otras marcas, 50% débito y 25% crédito.',
        'Quiebres de experiencia: Fricciones por falta de stock post-compra, información incompleta en fichas de producto (ingredientes, sellos), desconfianza en selección de frescos y descontento con sustitutos.',
        '5 Arquetipos de usuario: 1) Busquilla (descubre nuevos productos a buen precio), 2) Ahorrador (ofertas y despacho gratis), 3) Comparador (revisa y contrasta precios entre cadenas), 4) Autoindulgente (compras para regalonear a la familia), 5) Planificador (compra estructurada por listas).',
        'Personas clave: Claudia (Busquilla, 45 años, busca promociones y optimizar tiempo) y Loreto (Planificadora, 38 años, compra semanal organizada con foco en alimentación infantil).'
      ],
      designHighlights: [
        'PDP (Página de Detalle de Producto): Wireframe con detalle de compra, botón agregar al carro, visualización de ingredientes, sellos y tablas nutricionales.',
        'Direcciones & Cobertura: Geolocalización precisa, detalle de dirección y selector de cobertura con estimación de despacho.',
        'Flujos de Login & Onboarding: Flujos responsive para iOS y Android con inicio de sesión seguro, registro simplificado y recuperación de acceso.',
        'Carro de Compra & Checkout: Flujo con desglose claro de promociones, selección de medios de pago y opción de sustitutos guiada.'
      ],
      metrics: [
        {
          metric: '36',
          label: 'Entrevistas de Usuario',
          description: 'Muestra representativa de clientes Santaisabel.cl, Sala y usuarios de marcas competidoras.'
        },
        {
          metric: '5',
          label: 'Arquetipos Identificados',
          description: 'Segmentación conductual y motivacional (Busquilla, Ahorrador, Comparador, Autoindulgente, Planificador).'
        },
        {
          metric: '~83%',
          label: 'Segmento Core (C2/C3/D)',
          description: 'Diseño enfocado en la base principal de clientes sensibles a precio y promociones.'
        },
        {
          metric: 'MVP',
          label: 'Backlog Estructurado',
          description: 'Definición completa de épicas e historias de usuario listas para desarrollo.'
        }
      ],
      testimonial: {
        quote: 'Para SisaApp desarrolló una metodología integral cuyo enfoque se centró en identificar a los usuarios y las necesidades clave, priorizar las características esenciales e iterar rápidamente para crear una experiencia de usuario óptima.',
        author: 'Definición del MVP · SisaApp',
        position: 'Santa Isabel'
      }
    }
  },
  {
    id: 'accuhealth-telemedicina',
    title: 'Rediseño de App de Salud & Telemonitoreo Clínico',
    subtitle: 'Evolución de la experiencia de la aplicación de salud con foco prioritario en la adopción de usuarios y simplificación de arquitectura.',
    category: 'mobile',
    categoryLabel: 'Healthtech y aplicación móvil',
    tags: ['Card Sorting', 'Information Architecture', 'User Flows', 'Dev Handoff'],
    company: 'AccuHealth',
    period: '2024 — 2025',
    role: 'Senior UX Designer',
    team: '1 UX Designer (Carlos), 1 Medical Lead, 1 PM, 4 Mobile Engineers',
    platform: 'Aplicación móvil para iOS y Android',
    duration: '2024 — 2025',
    outcome: '+30% de incremento en la tasa de adopción de pacientes',
    summary: 'Reestructuración completa de la arquitectura de información mediante card sorting, redefinición de flujos de monitoreo de signos vitales y handoff detallado para desarrollo.',
    coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1600&auto=format&fit=crop',
    aspectRatioClass: 'aspect-[4/5]',
    accentTint: '#059669',
    isFeaturedMarquee: true,
    caseStudy: {
      overview: 'AccuHealth es una plataforma de salud y telemonitoreo donde pacientes crónicos registran sus métricas diarias y reciben seguimiento por parte de equipos clínicos.',
      problem: 'La versión anterior presentaba baja recurrencia de uso y abandono en la carga de signos vitales debido a una navegación sobrecargada y menús poco intuitivos.',
      myRole: 'Lideré el diagnóstico heurístico, sesiones de Card Sorting con pacientes, diseño de flujos de usuario (user flows), prototipado y acompañamiento constante en el handoff a desarrollo.',
      team: '1 Senior UX Designer (Carlos), 1 Asesor Clínico, 1 PM, 4 Desarrolladores Móviles.',
      duration: '2024 — 2025',
      platform: 'App Móvil iOS / Android',
      researchMethodology: [
        'Sesiones de Card Sorting abierto y cerrado con pacientes de diversos rangos etarios.',
        'Mapeo de User Flows para el registro diario de signos vitales (presión, glucosa, peso).',
        'Pruebas de accesibilidad visual y contraste conforme a normativas de salud digital.'
      ],
      keyInsights: [
        'Los pacientes crónicos valoran registrar sus métricas en menos de 30 segundos sin distracciones.',
        'La retroalimentación visual inmediata tras ingresar un dato clínico genera sensación de acompañamiento médico.'
      ],
      designHighlights: [
        'Arquitectura de navegación reestructurada en 3 secciones principales de fácil acceso.',
        'Flujo de carga rápida de signos vitales con validación de rangos seguros.',
        'Sistema de handoff exhaustivo con especificación de estados vacíos, errores y animaciones.'
      ],
      metrics: [
        {
          metric: '+30%',
          label: 'Tasa de Adopción',
          description: 'Incremento sostenido en la adopción activa de la app de salud tras el lanzamiento.'
        },
        {
          metric: '100%',
          label: 'Handoff Completo',
          description: 'Seguimiento riguroso de implementación garantizando fidelidad entre diseño y código.'
        },
        {
          metric: '4.8★',
          label: 'Satisfacción de Uso',
          description: 'Mejora en la valoración y cumplimiento del plan de telemonitoreo por parte de pacientes.'
        }
      ]
    }
  },
  {
    id: 'schwager-rediseño-web',
    title: 'Schwager: Estrategia UX, Arquitectura Multinegocio y Plataforma Digital B2B',
    subtitle: 'Rediseño end-to-end del ecosistema digital de Schwager, desde la investigación con gerencias y la arquitectura de información hasta el diseño, desarrollo WordPress, SEO y medición de resultados.',
    category: 'saas',
    categoryLabel: 'Web & Enterprise',
    tags: ['UX Research', 'Stakeholder Interviews', 'UX Strategy', 'Information Architecture', 'Content Strategy', 'UX/UI Design', 'Design System', 'WordPress', 'Elementor', 'ACF', 'PHP', 'JavaScript', 'SEO', 'GA4', 'Google Tag Manager', 'Search Console', 'Looker Studio', 'Responsive Design', 'WCAG'],
    company: 'Schwager S.A.',
    period: '2025–2026',
    role: 'Senior Product Designer · UX Strategist · UX Engineer',
    team: 'Carlos Montes — estrategia, UX research, arquitectura de información, UX/UI y desarrollo. Trabajo colaborativo con gerencia general, líderes de las unidades de negocio, comunicaciones, contenidos y equipos técnicos de Schwager.',
    platform: 'WordPress · Web responsive · CMS personalizado',
    duration: '24 semanas · Proyecto independiente',
    outcome: 'Unificación del ecosistema corporativo, nueva arquitectura multinegocio, administración autónoma de contenidos y base de medición con GA4, Search Console y tableros de KPIs.',
    summary: 'Lideré la transformación del sitio corporativo de Schwager en una plataforma digital escalable, capaz de representar al holding, sus unidades de negocio y su relación con inversionistas. El proyecto integró entrevistas con stakeholders, research B2B, benchmark, arquitectura de información, estrategia de contenidos, UX/UI, desarrollo personalizado en WordPress y analítica digital.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop',
    aspectRatioClass: 'aspect-[16/11]',
    accentTint: '#2563eb',
    isFeaturedMarquee: true,
    caseStudy: {
      overview: 'Schwager es un holding industrial con presencia en minería, energía, biogás, logística y otros servicios especializados. Su sitio web debía cumplir simultáneamente dos funciones: comunicar la solidez y transparencia de una sociedad anónima abierta y presentar con claridad las capacidades de sus diferentes unidades de negocio. El desafío no era solamente modernizar la interfaz. Era necesario construir un ecosistema digital coherente que permitiera a clientes, potenciales inversionistas y otros públicos encontrar rápidamente información relevante, comprender la propuesta de valor de cada negocio y acceder a antecedentes técnicos, corporativos y financieros.',
      problem: 'La estructura anterior no representaba adecuadamente el modelo de holding ni permitía diferenciar con claridad sus unidades de negocio. Los contenidos técnicos se encontraban dispersos, la información para inversionistas era difícil de localizar y los equipos internos dependían de soporte técnico para publicar documentos, proyectos y noticias. A esto se sumaban una baja jerarquización de los servicios, escasa visibilidad de las credenciales industriales, poca conexión entre páginas y falta de información integrada sobre tráfico, búsquedas y conversiones. El reto consistió en simplificar un ecosistema corporativo complejo sin perder profundidad técnica ni identidad de negocio.',
      myRole: 'Lideré el proyecto de extremo a extremo, conectando necesidades de negocio, experiencia de usuario, contenido, tecnología y medición. Mis responsabilidades incluyeron planificación y definición del alcance; entrevistas con gerentes y líderes de las unidades; investigación del mercado industrial B2B; auditoría de contenidos y posicionamiento SEO; benchmark de competidores directos y referentes internacionales; definición de audiencias, necesidades y recorridos; arquitectura de información del holding y sus unidades; estrategia y jerarquización de contenidos; diseño de wireframes, interfaz y componentes reutilizables; implementación responsive en WordPress; desarrollo y configuración de funcionalidades personalizadas; optimización SEO técnica y semántica; integración de GA4, Google Tag Manager y Search Console; definición de tableros de seguimiento y KPIs; y validación continua con stakeholders.',
      team: 'Carlos Montes — estrategia, UX research, arquitectura de información, UX/UI y desarrollo. Trabajo colaborativo con gerencia general, líderes de las unidades de negocio, comunicaciones, contenidos y equipos técnicos de Schwager.',
      duration: '24 semanas · Proyecto independiente',
      platform: 'WordPress · Web responsive · CMS personalizado',
      researchMethodology: [
        'Diagnóstico del sitio, su estructura, contenidos y posicionamiento, seguido de entrevistas individuales con representantes de gerencia general, minería, biogás, logística y otras unidades para comprender sus objetivos, servicios, públicos, diferenciadores y necesidades de comunicación.',
        'Auditoría heurística y revisión de la experiencia existente.',
        'Inventario y evaluación de contenidos.',
        'Análisis de búsquedas y oportunidades SEO.',
        'Benchmark UX, contenido, conversión y posicionamiento.',
        'Definición de públicos y necesidades de información.',
        'Identificación de factores de confianza en decisiones B2B.',
        'Revisión conjunta de propuestas con stakeholders.',
        'Síntesis de la evidencia en principios de arquitectura, mensajes estratégicos y requerimientos funcionales para el nuevo sitio.'
      ],
      keyInsights: [
        'El sitio debía cumplir dos funciones principales: informar a accionistas e inversionistas y conectar a los usuarios con las unidades de negocio del holding.',
        'La confianza era más determinante que el precio. Los clientes buscaban experiencia comprobable, solidez empresarial, seguridad operacional, capacidades técnicas, certificaciones y casos reales.',
        'Cada unidad resolvía problemas distintos y necesitaba una propuesta de valor propia dentro de una experiencia corporativa común.',
        'Los clientes industriales investigaban proveedores antes de iniciar un contacto comercial, por lo que la claridad de los servicios, las credenciales y el posicionamiento orgánico eran fundamentales.',
        'Los contenidos estaban organizados desde la estructura interna de la empresa, no desde las preguntas y necesidades de los usuarios.',
        'La publicación de documentos, noticias y proyectos debía quedar en manos de los equipos responsables, sin depender permanentemente de desarrollo.',
        'La medición no podía incorporarse al final: eventos, conversiones y páginas estratégicas debían definirse junto con la experiencia.'
      ],
      designHighlights: [
        'Arquitectura multinegocio: se diseñó una estructura corporativa que presenta a Schwager como holding y permite acceder a cada unidad de negocio mediante recorridos diferenciados, manteniendo coherencia visual y navegación transversal.',
        'Experiencia para inversionistas: se reorganizaron estados financieros, memorias, juntas de accionistas, información bursátil y documentos corporativos para reducir pasos y mejorar su acceso.',
        'Contenidos orientados a necesidades: los servicios se estructuraron desde los problemas que resuelven, sus capacidades, industrias, proyectos y factores de confianza, evitando depender exclusivamente del lenguaje interno de la organización.',
        'Sistema visual escalable: se definieron componentes, jerarquías, patrones responsive y reglas de contenido reutilizables para extender la plataforma a nuevas páginas y unidades sin perder consistencia.',
        'Administración personalizada: se desarrollaron campos y funcionalidades en WordPress para que los equipos pudieran administrar documentos, noticias, proyectos, mapas y contenidos especializados con mayor autonomía.',
        'Operaciones y cobertura: se implementó un mapa interactivo que permite visualizar proyectos y operaciones por ubicación y unidad de negocio, incluyendo presencia nacional e internacional.',
        'SEO y analítica: se mejoró la estructura semántica, se organizaron páginas según intención de búsqueda y se integraron GA4, Google Tag Manager y Search Console para monitorear tráfico, comportamiento y conversiones.'
      ],
      metrics: [
        {
          metric: '24 semanas',
          label: 'Planificación y ejecución del proyecto end-to-end.',
          description: ''
        },
        {
          metric: '5 frentes estratégicos',
          label: 'Gerencia general y unidades de negocio consideradas durante el levantamiento.',
          description: ''
        },
        {
          metric: '1 ecosistema corporativo',
          label: 'Integración del sitio institucional, negocios e información para inversionistas.',
          description: ''
        },
        {
          metric: 'Administración autónoma',
          label: 'Publicación estructurada de documentos, noticias, proyectos y contenidos sin modificar código.',
          description: ''
        },
        {
          metric: 'Analítica integrada',
          label: 'Implementación de GA4, Google Tag Manager, Search Console y tableros de seguimiento.',
          description: ''
        },
        {
          metric: 'Alineación de gerencias en torno a una arquitectura y narrativa común',
          label: '',
          description: ''
        }
      ],
      testimonial: {
        quote: 'Este proyecto confirmó que rediseñar un ecosistema B2B no consiste solamente en reorganizar pantallas. Fue necesario comprender cómo funciona el negocio, traducir servicios técnicos a un lenguaje accesible y equilibrar las necesidades de clientes, inversionistas y equipos internos. El principal aprendizaje fue integrar UX, contenido, SEO, desarrollo y analítica desde el comienzo. Esa mirada permitió construir una plataforma que no solo comunica mejor, sino que también puede administrarse, medirse y evolucionar en el tiempo.',
        author: '',
        position: ''
      }
    }
  },
  {
    id: 'twobrains-mexico-credito',
    title: 'Monte de Piedad: Product Discovery para crédito digital',
    subtitle: 'Investigación, definición de MVP y alineación de negocio, legal, tecnología y diseño para nuevas experiencias de crédito.',
    category: 'fintech',
    categoryLabel: 'Fintech & Strategy',
    tags: ['Product Discovery', 'UX Research', 'MVP Definition', 'User Flows', 'Design System', 'Fintech'],
    company: 'Financiera Montepiedad 🇲🇽',
    period: '2021 — 2024',
    role: 'Product Designer',
    team: 'Triada de diseño: Product Designer, UI Designer y Writer. Colaboración con Negocio, Legal, Tecnología y Operaciones.',
    platform: 'Experiencias financieras Web y Mobile',
    duration: 'Proyecto transversal · 2021 — 2024',
    outcome: 'MVP definido y decisiones críticas alineadas entre usuarios, negocio, legal, tecnología y diseño',
    summary: 'Lideré la investigación y definición de productos financieros digitales para Monte de Piedad. El trabajo conectó entrevistas, workshops, benchmark y analytics con decisiones de MVP, userflows, contenido, componentes y validación de implementación.',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1600&auto=format&fit=crop',
    aspectRatioClass: 'aspect-[1/1]',
    accentTint: '#d97706',
    caseStudy: {
      overview: 'Monte de Piedad exploraba nuevas experiencias digitales para ampliar su oferta financiera en México. El trabajo involucró productos con distintas condiciones de crédito, requisitos legales y dependencias operativas, por lo que cada decisión debía ser comprensible para el usuario y viable para la organización.',
      problem: 'El reto consistía en convertir una intención de negocio en flujos digitales claros, sin perder velocidad de conversión ni trazabilidad de las restricciones legales, técnicas y operativas. En Crédito Revolvente, la investigación mostró que el público definido inicialmente no correspondía con las necesidades y comportamientos de las personas entrevistadas.',
      myRole: 'Como Product Designer, lideré benchmark, entrevistas, analytics y workshops. Definí el MVP de Crédito Revolvente, estructuré userflows en los demás proyectos, orienté el copy, definí componentes y guié la toma de decisiones con las áreas involucradas. También coordiné revisiones de la triada, revisé handoffs, accesibilidad y la correcta aplicación del Design System antes del desarrollo.',
      team: 'Triada de diseño: Product Designer, UI Designer y Writer. Trabajo diario con Negocio, Legal, Tecnología, Operaciones y otras áreas involucradas.',
      duration: 'Proyecto transversal · 2021 — 2024',
      platform: 'Experiencias financieras Web y Mobile',
      researchMethodology: [
        'Benchmark de productos financieros, simuladores y experiencias de solicitud para entender patrones de confianza, conversión y claridad.',
        'Entrevistas y workshops con usuarios, Negocio, Legal, Tecnología, Operaciones y las áreas responsables del servicio.',
        'Revisión de analytics y señales de abandono para identificar momentos críticos de los simuladores y flujos de solicitud.',
        'Síntesis de hallazgos en arquetipos, journeys, userflows y mapas de MVP, manteniendo fuera del portafolio la información comercial sensible.'
      ],
      keyInsights: [
        'En Crédito Revolvente, el público objetivo planteado por el negocio era distinto al que apareció en entrevistas y workshops. Esa diferencia cambió la definición del MVP y las prioridades del producto.',
        'La transparencia sobre montos, cuotas, tasas, comisiones y plazos era necesaria para que las personas pudieran evaluar el crédito con confianza.',
        'Las decisiones legales y técnicas debían entrar al flujo desde el inicio para evitar diseñar experiencias inviables o difíciles de implementar.',
        'WhatsApp aparecía como el canal de contacto más solicitado y debía integrarse a los recorridos de solicitud y acompañamiento.'
      ],
      designHighlights: [
        'Crédito Revolvente: redefinición del MVP a partir de la diferencia entre la audiencia esperada y la audiencia descubierta.',
        'Userflows y journeys: definición de recorridos, dependencias, puntos de decisión y necesidades de cada etapa.',
        'Simuladores y solicitudes: priorización de información para que el usuario pudiera entender opciones antes de comprometerse.',
        'Triada de diseño: coordinación de dailys, revisión de tareas, resolución de bloqueantes y comentarios sobre Figma para mantener una dirección común.',
        'Design System: definición o extensión de componentes, documentación, accesibilidad y revisión del handoff antes de pasar a desarrollo.',
        'Canales de contacto: incorporación de WhatsApp en los flujos donde el acompañamiento era una necesidad explícita.'
      ],
      metrics: [
        {
          metric: 'MVP',
          label: 'Alcance redefinido',
          description: 'La investigación permitió ajustar el producto a una audiencia distinta de la hipótesis inicial.'
        },
        {
          metric: 'Conversión',
          label: 'Fricciones identificadas',
          description: 'Analytics y research ayudaron a localizar puntos de abandono en simuladores y solicitudes.'
        },
        {
          metric: 'WhatsApp',
          label: 'Canal integrado',
          description: 'El canal de contacto más solicitado se incorporó a los recorridos donde el usuario necesitaba acompañamiento.'
        },
        {
          metric: 'DS',
          label: 'Calidad de entrega',
          description: 'Revisión de componentes, accesibilidad, documentación e implementación antes del desarrollo.'
        }
      ]
    }
  },
  {
    id: 'montepiedad-minmueble',
    title: 'Minmueble: diseño del flujo de solicitud de préstamo',
    subtitle: 'Definición de userflows, contenido y componentes para una experiencia digital de crédito con garantía inmobiliaria.',
    category: 'fintech',
    categoryLabel: 'Fintech & Product Design',
    tags: ['Product Design', 'User Flow', 'UX Writing', 'Design System', 'Fintech'],
    company: 'Nacional Monte de Piedad 🇲🇽',
    period: '2022',
    role: 'Product Designer',
    team: 'Triada de diseño: Product Designer, UI Designer y Writer. Colaboración con Negocio, Legal, Tecnología y Operaciones.',
    platform: 'Flujo financiero Web responsive',
    duration: 'Definición y diseño de flujo · 2022',
    outcome: 'Flujo de solicitud estructurado por etapas, con contenido y componentes alineados al proceso de evaluación',
    summary: 'Diseñé y guié la definición de un flujo digital para solicitar un préstamo con garantía inmobiliaria, haciendo comprensibles los pasos de datos personales, inmueble, historial crediticio, autorización y contacto con un consejero.',
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1600&auto=format&fit=crop',
    aspectRatioClass: 'aspect-[16/11]',
    accentTint: '#9f1239',
    caseStudy: {
      overview: 'Minmueble requería llevar una solicitud de préstamo con garantía inmobiliaria a un flujo digital. La experiencia debía ordenar información personal, datos del inmueble, historial crediticio, autorización de consulta y acompañamiento posterior sin perder claridad en un proceso sensible.',
      problem: 'La solicitud concentraba requisitos financieros, legales y del inmueble que podían sentirse extensos o difíciles de comprender. El reto era dar al usuario una visión clara de su avance, explicar por qué se solicitaba cada dato y mantener una ruta de salida o acompañamiento cuando surgieran dudas.',
      myRole: 'Definí el userflow y la estructura de las etapas, orienté el copy junto al Writer, revisé la definición de componentes con el UI Designer y coordiné las revisiones con las áreas involucradas. Durante el trabajo diario resolví dudas, comenté los archivos Figma, revisé accesibilidad, documentación y handoff antes de desarrollo.',
      team: 'Triada de diseño: Product Designer, UI Designer y Writer. Trabajo colaborativo con las áreas responsables del producto y su operación.',
      duration: 'Definición y diseño de flujo · 2022',
      platform: 'Flujo financiero Web responsive',
      researchMethodology: [
        'Revisión del proceso de solicitud y de los requisitos necesarios para evaluar a la persona, el inmueble y la garantía.',
        'Exploración de alternativas de userflow para ordenar la solicitud en etapas comprensibles.',
        'Trabajo colaborativo con las áreas involucradas para resolver dependencias de negocio, legal, operación y tecnología.',
        'Revisión de contenido, componentes, accesibilidad y handoff para asegurar continuidad entre definición, diseño y desarrollo.'
      ],
      keyInsights: [
        'La solicitud necesitaba mostrar el avance del usuario y separar claramente información personal, datos del inmueble e historial crediticio.',
        'La consulta al buró requería una explicación directa sobre su propósito y una autorización que el usuario pudiera entender antes de continuar.',
        'El contenido debía acompañar decisiones sensibles sin sobrecargar el flujo con lenguaje legal difícil de interpretar.',
        'La experiencia necesitaba conservar un canal de ayuda para las personas que no pudieran resolver el proceso de forma autónoma.'
      ],
      designHighlights: [
        'Flujo por etapas: organización progresiva de la solicitud en información personal, inmueble, historial crediticio y contacto.',
        'Revisión de buró: preguntas y autorización presentadas dentro del contexto de la evaluación, con explicación del motivo.',
        'Contenido orientado a la decisión: copy claro para requisitos, permisos y próximos pasos, trabajado en conjunto con el Writer.',
        'Componentes y estados: definición de controles, formularios, validaciones y estados consistentes con el Design System.',
        'Calidad de entrega: revisión de accesibilidad, documentación y handoff antes de que el flujo pasara a desarrollo.'
      ],
      metrics: [
        { metric: 'Etapas', label: 'Progreso visible', description: 'La solicitud se estructuró como un recorrido comprensible y progresivo.' },
        { metric: 'Copy', label: 'Decisiones explicadas', description: 'El contenido acompañó autorizaciones y requisitos sin ocultar el propósito de cada paso.' },
        { metric: 'DS', label: 'Componentes consistentes', description: 'La definición contempló reutilización, estados, accesibilidad y documentación.' }
      ]
    }
  },
  {
    id: 'ecosistemas-coomeva-credito',
    title: 'Optimización del embudo de crédito Coomeva',
    subtitle: 'Optimización del embudo digital de conversión para créditos con implementación en WordPress, HTML y CSS.',
    category: 'fintech',
    categoryLabel: 'Conversión y fintech',
    tags: ['Optimización de embudos', 'UX de conversión', 'WordPress', 'HTML/CSS/Bootstrap'],
    company: 'Ecosistemas Digitales',
    period: '2020 — 2021',
    role: 'UX Designer',
    team: 'UX Designer (Carlos), Marketing Lead, Frontend Developer',
    platform: 'Web responsive y simulador',
    duration: '2020 — 2021',
    outcome: '+23% en simulaciones completadas y +12% en leads calificados',
    summary: 'Rediseño del simulador y flujo de solicitud de crédito para Coomeva, implementando componentes ágiles en WordPress, HTML, CSS y Bootstrap.',
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1600&auto=format&fit=crop',
    aspectRatioClass: 'aspect-[16/11]',
    accentTint: '#7c3aed',
    caseStudy: {
      overview: 'Optimización de los canales digitales de captación de créditos para la cooperativa financiera Coomeva.',
      problem: 'El simulador de crédito registraba altas tasas de abandono en el primer paso debido a la complejidad de los cálculos y campos obligatorios prematuros.',
      myRole: 'Análisis de embudo, diseño de la nueva interacción de simulación interactiva e implementación técnica directa en WordPress con HTML, CSS y Bootstrap.',
      team: 'UX Designer (Carlos), Especialista en Performance y Marketing Digital.',
      duration: '2020 — 2021',
      platform: 'Web responsive (WordPress / Bootstrap)',
      researchMethodology: [
        'Análisis de abandono paso a paso en Google Analytics y mapas de calor.',
        'Pruebas de usabilidad rápida en versiones de simuladores con sliders interactivos.'
      ],
      keyInsights: [
        'Permitir que el usuario juegue con el monto y las cuotas antes de solicitar sus datos personales triplica la intención de contacto.'
      ],
      designHighlights: [
        'Simulador dinámico con respuesta inmediata en cuota mensual estimada.',
        'Formulario de captura de leads en dos etapas con validación en tiempo real.'
      ],
      metrics: [
        {
          metric: '+23%',
          label: 'Simulaciones completadas',
          description: 'Aumento significativo en usuarios que completaron la simulación financiera.'
        },
        {
          metric: '+12%',
          label: 'Leads calificados',
          description: 'Incremento directo en solicitudes de crédito enviadas a ejecutivos comerciales.'
        }
      ]
    }
  }
];

export const TOP_6_PROJECTS: Project[] = FEATURED_PROJECTS.slice(0, 6);
export const TOP_5_PROJECTS: Project[] = FEATURED_PROJECTS.slice(0, 5);

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    id: 'exp-schwager',
    period: '2026',
    role: 'UX Engineer',
    company: 'Schwager SA',
    location: 'Santiago, Chile',
    type: 'Proyecto independiente',
    description: 'Lideré el rediseño integral end-to-end del sitio web corporativo de Schwager, alineando necesidades estratégicas de negocio con la arquitectura de información y tecnología.',
    achievements: [
      'Lideré rediseño end-to-end del sitio web Schwager.',
      'Entrevisté a los principales stakeholders para comprender áreas de negocio y necesidades.',
      'Desarrollo personalizado de plugins para mejorar la publicación de contenidos.',
      'Definí la arquitectura de contenidos y las mejoras en el SEO del sitio.',
      'Definí los principales KPI y cree los tableros para su seguimiento.'
    ],
    skills: ['Stakeholder Interviews', 'Content Architecture', 'SEO Optimization', 'KPI Dashboards', 'WordPress Plugins']
  },
  {
    id: 'exp-isapre-licencias',
    period: '2025 — 2026',
    role: 'Senior UX Designer',
    company: 'Isapre Esencial',
    location: 'Santiago, Chile',
    type: 'Salud y sucursal digital',
    description: 'Lideré el rediseño end-to-end del flujo crítico de licencias médicas y la definición del MVP para la sucursal digital y flujos de autenticación.',
    achievements: [
      'Lideré rediseño end-to-end del flujo de licencias médicas.',
      'Investigación con usuarios + análisis de datos (Hotjar, CX).',
      'Validación con testing logrando 90% de comprensión de estados.',
      'Definición de MVP para sucursal digital y flujos de autenticación.'
    ],
    skills: ['UX Research', 'Hotjar / CX Analytics', 'Usability Testing', 'MVP Definition', 'Autenticación']
  },
  {
    id: 'exp-accuhealth',
    period: '2024 — 2025',
    role: 'Senior UX Designer',
    company: 'AccuHealth',
    location: 'Santiago, Chile / Remoto',
    type: 'Healthtech y aplicación móvil',
    description: 'Rediseño de la aplicación móvil de salud y telemonitoreo con foco prioritario en la adopción de pacientes y la claridad de la arquitectura.',
    achievements: [
      'Rediseño de app de salud con foco en adopción.',
      'Card sorting, definición de IA y user flows.',
      'Handoff a desarrollo y seguimiento de implementación.'
    ],
    skills: ['Salud móvil', 'Card Sorting', 'Information Architecture', 'User Flows', 'Dev Handoff']
  },
  {
    id: 'exp-twobrains',
    period: '2021 — 2024',
    role: 'UX Designer',
    company: '2Brains (México)',
    location: 'México / Remoto',
    type: 'Fintech y consultoría',
    description: 'Procesos de Product Discovery y diseño estratégico para soluciones financieras de crédito revolvente y expansión en el mercado de México.',
    achievements: [
      'Product Discovery para crédito revolvente.',
      'Identificación de riesgos legales y técnicos.',
      'Definición de oportunidades de negocio y expansión.'
    ],
    skills: ['Product Discovery', 'Crédito Revolvente', 'Legal/Tech Risk Analysis', 'Business Opportunities']
  },
  {
    id: 'exp-ecosistemas',
    period: '2020 — 2021',
    role: 'UX Designer',
    company: 'Ecosistemas Digitales',
    location: 'Remoto',
    type: 'Fintech y conversión',
    description: 'Optimización de embudos de conversión digital para productos financieros y desarrollo de interfaces con tecnologías web.',
    achievements: [
      'Optimización del embudo de crédito (+23% simulaciones completadas).',
      'Implementación en WordPress (HTML, CSS, Bootstrap).'
    ],
    skills: ['Optimización de embudos', 'UX de conversión', 'WordPress', 'HTML', 'CSS', 'Bootstrap']
  },
  {
    id: 'exp-provida',
    period: '2020 — 2021',
    role: 'UX/UI Designer',
    company: 'Provida',
    location: 'Santiago, Chile',
    type: 'Servicios Financieros',
    description: 'Implementación del Design System corporativo y desarrollo de componentes modulares para autores en Adobe Experience Manager.',
    achievements: [
      'Implementación de Design System.',
      'Desarrollo de componentes HTML y gestión en AEM.'
    ],
    skills: ['Design System', 'AEM', 'HTML Component Development', 'UI Consistency']
  }
];

export const PREVIOUS_EXPERIENCE: PreviousExperienceItem[] = [
  {
    company: 'B2B Media Group SPA',
    role: 'Supervisor de Medios Digitales / UX Lead',
    period: 'Feb 2017 — Abr 2020',
    description: 'Definición de KPIs, coordinación de sprints y liderazgo de proyectos digitales corporativos.'
  },
  {
    company: 'Trabajando.com',
    role: 'Senior Digital Designer / Product Designer',
    period: 'Nov 2012 — Feb 2017',
    description: 'Diseño de productos digitales, benchmarking e investigación de usuarios para filiales de Iberoamérica.'
  },
  {
    company: 'Agencia Espinaca',
    role: 'Director de Arte Digital',
    period: 'Mar 2011 — Sep 2012',
    description: 'Investigación de tendencias de diseño y dirección de comunicación digital.'
  },
  {
    company: 'iCreativa S.A.',
    role: 'Director de Arte',
    period: 'Jul 2008 — Feb 2011',
    description: 'Diseño de productos digitales y coordinación directa con clientes y proveedores técnicos.'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Product',
    items: [
      'Product Discovery',
      'Product Strategy',
      'MVP Definition',
      'User Flows',
      'Conversion Optimization',
      'Data-Driven Design',
      'Stakeholder Management'
    ]
  },
  {
    title: 'Design',
    items: [
      'UX/UI Design',
      'Product Design',
      'Interaction Design',
      'Information Architecture',
      'Design Systems',
      'Visual Design',
      'Responsive Design',
      'Accessibility (WCAG)'
    ]
  },
  {
    title: 'Methodologies',
    items: [
      'Design Thinking',
      'Lean UX',
      'Agile (Scrum/Kanban)',
      'Hypothesis-Driven Design',
      'A/B Testing'
    ]
  },
  {
    title: 'Research',
    items: [
      'User Research',
      'Usability Testing',
      'Customer Journey Mapping',
      'User Interviews',
      'Heuristic Evaluation',
      'Data Analysis',
      'Insight Generation'
    ]
  },
  {
    title: 'Tools',
    items: [
      'Figma',
      'Sketch',
      'Adobe XD',
      'Miro',
      'Maze',
      'Useberry',
      'Notion',
      'Jira',
      'Google Analytics',
      'Hotjar',
      'Tag Manager'
    ]
  },
  {
    title: 'Development',
    items: [
      'HTML',
      'CSS',
      'JavaScript (basic)',
      'PHP (basic)',
      'WordPress'
    ]
  },
  {
    title: 'Inteligencia Artificial (IA)',
    items: [
      'Figma Make',
      'ChatGPT',
      'Claude',
      'Stitch',
      'Magicpath'
    ]
  }
];

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    degree: 'Licenciatura en Diseño Integral',
    institution: 'Universidad de las Américas',
    period: '2002 — 2008'
  },
  {
    degree: 'Diplomado en Marketing Digital & eBusiness',
    institution: 'Universidad de Chile',
    period: '2019'
  }
];

export const COURSE_ITEMS: CourseItem[] = [
  {
    title: 'Diseño de experiencias digitales accesibles',
    institution: 'Academia 2Brains',
    year: '2023'
  },
  {
    title: 'Storytelling',
    institution: 'Udemy',
    year: '2023'
  },
  {
    title: 'UX Research & Journey Map',
    institution: 'Udemy',
    year: '2022'
  },
  {
    title: 'Lean UX Persona Workshop',
    institution: 'Udemy',
    year: '2022'
  },
  {
    title: 'UX/UI + Figma',
    institution: 'Udemy',
    year: '2022'
  },
  {
    title: 'Product Designer',
    institution: 'Sol Mezz',
    year: '2021'
  },
  {
    title: 'UX Design',
    institution: 'Coderhouse',
    year: '2019'
  },
  {
    title: 'DoubleClick for Publishers',
    institution: 'Adity',
    year: '2017'
  },
  {
    title: 'Marketing Digital',
    institution: 'Adity',
    year: '2017'
  },
  {
    title: 'Diplomado CSS',
    institution: 'Academia MAC',
    year: '2009'
  }
];

export const LANGUAGE_ITEMS: LanguageItem[] = [
  {
    language: 'Español',
    level: 'Nativo'
  },
  {
    language: 'Inglés',
    level: 'A1'
  }
];
