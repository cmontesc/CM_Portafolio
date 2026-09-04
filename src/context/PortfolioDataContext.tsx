import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import {
  CourseItem,
  EducationItem,
  ExperienceItem,
  ImageAsset,
  LanguageItem,
  MetricItem,
  PortfolioContentSnapshot,
  PortfolioOwner,
  PortfolioVersion,
  PreviousExperienceItem,
  Project,
  SkillCategory
} from '../types';
import {
  COURSE_ITEMS,
  EDUCATION_ITEMS,
  FEATURED_PROJECTS,
  LANGUAGE_ITEMS,
  PORTFOLIO_OWNER,
  PREVIOUS_EXPERIENCE,
  RECRUITER_METRICS,
  SKILL_CATEGORIES,
  WORK_EXPERIENCE
} from '../data/portfolioData';
import versionedPortfolioContent from '../data/portfolioContent.json';

type RepositorySyncStatus = 'idle' | 'syncing' | 'synced' | 'error';
type VersionedPortfolioContent = Partial<PortfolioContentSnapshot>;

const VERSIONED_CONTENT = versionedPortfolioContent as VersionedPortfolioContent;
const CONTENT_ASSET_MODULES = import.meta.glob('../assets/**/*.{avif,gif,jpeg,jpg,png,svg,webp}', {
  eager: true,
  import: 'default',
  query: '?url'
}) as Record<string, string>;
const LOCAL_ADMIN_SYNC_PATH = '/__portfolio-admin/sync';
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);

const resolveVersionedImage = (image: string) => {
  if (!image.startsWith('asset:')) return image;
  const assetPath = `../assets/${image.slice('asset:'.length)}`;
  return CONTENT_ASSET_MODULES[assetPath] || image;
};

const getInitialProjects = () => {
  const source = Array.isArray(VERSIONED_CONTENT.projects) && VERSIONED_CONTENT.projects.length > 0
    ? VERSIONED_CONTENT.projects
    : FEATURED_PROJECTS;

  return source.map((project) => ({
    ...clone(project),
    coverImage: resolveVersionedImage(project.coverImage)
  }));
};

export interface CurriculumEditableData {
  owner?: PortfolioOwner;
  experiences: ExperienceItem[];
  previousExperiences: PreviousExperienceItem[];
  education: EducationItem[];
  courses: CourseItem[];
  languages: LanguageItem[];
  metrics: MetricItem[];
}

interface PortfolioDataContextType {
  portfolioOwner: PortfolioOwner;
  projects: Project[];
  homeProjects: Project[];
  experiences: ExperienceItem[];
  previousExperiences: PreviousExperienceItem[];
  education: EducationItem[];
  courses: CourseItem[];
  languages: LanguageItem[];
  skillCategories: SkillCategory[];
  recruiterMetrics: MetricItem[];
  isCustomData: boolean;
  activeExcelSource: {
    curriculum: 'default' | 'custom';
    projects: 'default' | 'custom';
  };
  versions: PortfolioVersion[];
  imageAssets: ImageAsset[];
  repositorySyncStatus: RepositorySyncStatus;
  repositorySyncMessage: string;
  saveProfile: (owner: PortfolioOwner) => { success: boolean; message: string };
  saveCurriculum: (data: CurriculumEditableData) => { success: boolean; message: string };
  applyCurriculumImport: (data: CurriculumEditableData) => { success: boolean; message: string };
  applyProjectsImport: (projects: Project[]) => { success: boolean; message: string; count?: number };
  saveProject: (project: Project, originalProjectId?: string) => { success: boolean; message: string };
  duplicateProject: (projectId: string) => { success: boolean; message: string; project?: Project };
  archiveProject: (projectId: string) => { success: boolean; message: string };
  restoreProject: (projectId: string) => { success: boolean; message: string };
  resetToDefaults: () => void;
  restoreVersion: (versionId: string) => { success: boolean; message: string };
  deleteVersion: (versionId: string) => { success: boolean; message: string };
  addImageAsset: (asset: { name: string; url: string; source?: ImageAsset['source'] }) => { success: boolean; message: string; asset?: ImageAsset };
  archiveImageAsset: (assetId: string) => { success: boolean; message: string };
  restoreImageAsset: (assetId: string) => { success: boolean; message: string };
}

const PortfolioDataContext = createContext<PortfolioDataContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_CURRICULUM = 'cm_portfolio_custom_curriculum_v2';
const LOCAL_STORAGE_KEY_PROJECTS = 'cm_portfolio_custom_projects_v2';
const LOCAL_STORAGE_KEY_VERSIONS = 'cm_portfolio_versions_v1';
const LOCAL_STORAGE_KEY_IMAGES = 'cm_portfolio_image_repository_v1';
const MAX_VERSIONS = 30;

const nowIso = () => new Date().toISOString();

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

const loadStoredValue = <T,>(key: string, fallback: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) as T : fallback;
  } catch (error) {
    console.warn(`No se pudo leer ${key} desde el navegador:`, error);
    return fallback;
  }
};

const saveStoredValue = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const extractYearFromText = (text: string | number | undefined): number => {
  if (!text) return 2020;
  if (typeof text === 'number') return text;
  const matches = text.match(/\b(19\d\d|20\d\d)\b/g);
  if (!matches?.length) return 2020;
  return Math.max(...matches.map((match) => Number(match)));
};

const normalizeExperience = (experience: ExperienceItem): ExperienceItem => ({
  ...experience,
  id: experience.id.trim(),
  company: experience.company.trim(),
  role: experience.role.trim(),
  period: experience.period.trim(),
  description: experience.description || '',
  achievements: (experience.achievements || []).filter(Boolean),
  skills: (experience.skills || []).filter(Boolean),
  status: experience.status || 'published'
});

const defaultCurriculumPayload = (): CurriculumEditableData => ({
  owner: clone(VERSIONED_CONTENT.portfolioOwner || PORTFOLIO_OWNER),
  experiences: clone(VERSIONED_CONTENT.experiences || WORK_EXPERIENCE).map(normalizeExperience),
  previousExperiences: clone(VERSIONED_CONTENT.previousExperiences || PREVIOUS_EXPERIENCE),
  education: clone(VERSIONED_CONTENT.education || EDUCATION_ITEMS),
  courses: clone(VERSIONED_CONTENT.courses || COURSE_ITEMS),
  languages: clone(VERSIONED_CONTENT.languages || LANGUAGE_ITEMS),
  metrics: clone(VERSIONED_CONTENT.recruiterMetrics || RECRUITER_METRICS)
});

const getImageUrl = (image: Project['coverImage']) => {
  return typeof image === 'string' ? image.trim() : '';
};

const buildImageId = (url: string) => {
  let hash = 0;
  for (let index = 0; index < url.length; index += 1) {
    hash = ((hash << 5) - hash) + url.charCodeAt(index);
    hash |= 0;
  }
  return `img-${Math.abs(hash)}`;
};

const imageNameFromUrl = (url: string) => {
  try {
    const parsed = new URL(url, window.location.origin);
    const pathName = parsed.pathname.split('/').filter(Boolean).pop();
    return pathName ? decodeURIComponent(pathName).replace(/\.[a-z0-9]+$/i, '') : parsed.hostname;
  } catch {
    return url.length > 42 ? `${url.slice(0, 42)}...` : url;
  }
};

const syncImageRepository = (projectsList: Project[], currentAssets: ImageAsset[]): ImageAsset[] => {
  const date = nowIso();
  const usage = new Map<string, string[]>();

  projectsList.forEach((project) => {
    const url = getImageUrl(project.coverImage);
    if (!url) return;
    const usedBy = usage.get(url) || [];
    usedBy.push(project.id);
    usage.set(url, usedBy);
  });

  const byUrl = new Map(currentAssets.map((asset) => [asset.url, asset]));
  const nextAssets: ImageAsset[] = currentAssets.map((asset) => {
    const usedBy = usage.get(asset.url) || [];
    const isUsed = usedBy.length > 0;
    return {
      ...asset,
      status: isUsed ? 'active' as const : 'archived' as const,
      usedBy,
      updatedAt: date,
      archivedAt: isUsed ? undefined : asset.archivedAt || date
    };
  });

  usage.forEach((usedBy, url) => {
    if (byUrl.has(url)) return;
    nextAssets.push({
      id: buildImageId(url),
      name: imageNameFromUrl(url),
      url,
      source: 'project',
      status: 'active',
      usedBy,
      createdAt: date,
      updatedAt: date
    });
  });

  return nextAssets.sort((a, b) => {
    if (a.status !== b.status) return a.status === 'active' ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
};

const normalizeLinks = (links: Project['links']) => {
  if (!links) return undefined;
  const nextLinks = {
    figma: links.figma?.trim() || undefined,
    vercel: links.vercel?.trim() || undefined,
    git: links.git?.trim() || undefined
  };
  return Object.values(nextLinks).some(Boolean) ? nextLinks : undefined;
};

const normalizeProject = (project: Project): Project => {
  const year = project.year || extractYearFromText(project.period);
  const caseStudy = project.caseStudy || {
    overview: project.summary,
    problem: '',
    myRole: project.role,
    team: project.team,
    duration: project.duration,
    platform: project.platform,
    researchMethodology: [],
    keyInsights: [],
    designHighlights: [],
    metrics: []
  };

  return {
    ...project,
    id: project.id.trim(),
    title: project.title.trim(),
    subtitle: project.subtitle.trim(),
    company: project.company.trim(),
    year,
    isPrincipal: project.isPrincipal ?? true,
    status: project.status || 'published',
    tags: (project.tags || []).filter(Boolean),
    links: normalizeLinks(project.links),
    caseStudy: {
      overview: caseStudy.overview || project.summary,
      problem: caseStudy.problem,
      myRole: caseStudy.myRole || project.role,
      team: caseStudy.team || project.team,
      duration: caseStudy.duration || project.duration,
      platform: caseStudy.platform || project.platform,
      researchMethodology: (caseStudy.researchMethodology || []).filter(Boolean),
      keyInsights: (caseStudy.keyInsights || []).filter(Boolean),
      designHighlights: (caseStudy.designHighlights || []).filter(Boolean),
      systemComponents: caseStudy.systemComponents?.filter(Boolean),
      metrics: (caseStudy.metrics || []).filter((metric) => metric.metric || metric.label || metric.description),
      testimonial: caseStudy.testimonial?.quote
        ? {
            quote: caseStudy.testimonial.quote,
            author: caseStudy.testimonial.author,
            position: caseStudy.testimonial.position
          }
        : undefined
    }
  };
};

const formatDefaultProjects = (projectsList: Project[]): Project[] => {
  const formatted = projectsList.map((project) => {
    const year = project.year || extractYearFromText(project.period);
    return normalizeProject({
      ...project,
      year,
      isPrincipal: project.isPrincipal ?? true,
      status: project.status || 'published'
    });
  });

  return formatted.sort((a, b) => (b.year || 2020) - (a.year || 2020));
};

const buildDuplicatedProjectId = (projectId: string, projectsList: Project[]) => {
  const baseId = `${projectId}-copia`;
  let nextId = baseId;
  let counter = 2;

  while (projectsList.some((project) => project.id === nextId)) {
    nextId = `${baseId}-${counter}`;
    counter += 1;
  }

  return nextId;
};

export const PortfolioDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const defaultCurriculum = defaultCurriculumPayload();
  const initialSortedProjects = formatDefaultProjects(getInitialProjects());

  const [portfolioOwner, setPortfolioOwner] = useState<PortfolioOwner>(defaultCurriculum.owner || PORTFOLIO_OWNER);
  const [experiences, setExperiences] = useState<ExperienceItem[]>(defaultCurriculum.experiences);
  const [previousExperiences, setPreviousExperiences] = useState<PreviousExperienceItem[]>(defaultCurriculum.previousExperiences);
  const [education, setEducation] = useState<EducationItem[]>(defaultCurriculum.education);
  const [courses, setCourses] = useState<CourseItem[]>(defaultCurriculum.courses);
  const [languages, setLanguages] = useState<LanguageItem[]>(defaultCurriculum.languages);
  const [recruiterMetrics, setRecruiterMetrics] = useState<MetricItem[]>(defaultCurriculum.metrics);
  const [skillCategories] = useState<SkillCategory[]>(SKILL_CATEGORIES);
  const [projects, setProjects] = useState<Project[]>(initialSortedProjects);
  const [versions, setVersions] = useState<PortfolioVersion[]>(() => loadStoredValue<PortfolioVersion[]>(LOCAL_STORAGE_KEY_VERSIONS, []));
  const [imageAssets, setImageAssets] = useState<ImageAsset[]>(() => {
    const storedAssets = loadStoredValue<ImageAsset[]>(LOCAL_STORAGE_KEY_IMAGES, []);
    return syncImageRepository(initialSortedProjects, storedAssets);
  });
  const [hasHydratedStoredData, setHasHydratedStoredData] = useState(false);
  const [repositorySyncStatus, setRepositorySyncStatus] = useState<RepositorySyncStatus>('idle');
  const [repositorySyncMessage, setRepositorySyncMessage] = useState('Esperando cambios del administrador.');

  const [activeExcelSource, setActiveExcelSource] = useState<{
    curriculum: 'default' | 'custom';
    projects: 'default' | 'custom';
  }>({
    curriculum: 'default',
    projects: 'default'
  });

  const buildSnapshot = (overrides?: Partial<PortfolioContentSnapshot>): PortfolioContentSnapshot => ({
    portfolioOwner: clone(overrides?.portfolioOwner || portfolioOwner),
    projects: clone(overrides?.projects || projects),
    experiences: clone(overrides?.experiences || experiences),
    previousExperiences: clone(overrides?.previousExperiences || previousExperiences),
    education: clone(overrides?.education || education),
    courses: clone(overrides?.courses || courses),
    languages: clone(overrides?.languages || languages),
    recruiterMetrics: clone(overrides?.recruiterMetrics || recruiterMetrics)
  });

  const buildVersion = (label: string, summary: string, data: PortfolioContentSnapshot): PortfolioVersion => ({
    id: `version-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: nowIso(),
    label,
    summary,
    data
  });

  const recordVersion = (label: string, summary: string, data: PortfolioContentSnapshot) => {
    setVersions((currentVersions) => {
      const nextVersions = [buildVersion(label, summary, data), ...currentVersions].slice(0, MAX_VERSIONS);
      saveStoredValue(LOCAL_STORAGE_KEY_VERSIONS, nextVersions);
      return nextVersions;
    });
  };

  useEffect(() => {
    try {
      const savedCurriculum = localStorage.getItem(LOCAL_STORAGE_KEY_CURRICULUM);
      if (savedCurriculum) {
        const parsed = JSON.parse(savedCurriculum) as CurriculumEditableData;
        if (parsed.owner) setPortfolioOwner(parsed.owner);
        if (parsed.experiences) setExperiences(parsed.experiences.map(normalizeExperience));
        if (parsed.previousExperiences) setPreviousExperiences(parsed.previousExperiences);
        if (parsed.education) setEducation(parsed.education);
        if (parsed.courses) setCourses(parsed.courses);
        if (parsed.languages) setLanguages(parsed.languages);
        if (parsed.metrics) setRecruiterMetrics(parsed.metrics);
        setActiveExcelSource((prev) => ({ ...prev, curriculum: 'custom' }));
      }

      const savedProjects = localStorage.getItem(LOCAL_STORAGE_KEY_PROJECTS);
      if (savedProjects) {
        const parsedProjects = JSON.parse(savedProjects) as Project[];
        if (Array.isArray(parsedProjects) && parsedProjects.length > 0) {
          const sorted = formatDefaultProjects(parsedProjects);
          setProjects(sorted);
          setImageAssets((current) => {
            const synced = syncImageRepository(sorted, current);
            saveStoredValue(LOCAL_STORAGE_KEY_IMAGES, synced);
            return synced;
          });
          setActiveExcelSource((prev) => ({ ...prev, projects: 'custom' }));
        }
      }
    } catch (err) {
      console.warn('Error reading custom portfolio state from localStorage:', err);
    } finally {
      setHasHydratedStoredData(true);
    }
  }, []);

  useEffect(() => {
    const isLocalAdmin = import.meta.env.DEV
      && LOCAL_HOSTS.has(window.location.hostname)
      && window.location.pathname.endsWith('/admin-local.html');

    if (!hasHydratedStoredData || !isLocalAdmin) return;

    const timeoutId = window.setTimeout(() => {
      const snapshot: PortfolioContentSnapshot = {
        portfolioOwner: clone(portfolioOwner),
        projects: clone(projects),
        experiences: clone(experiences),
        previousExperiences: clone(previousExperiences),
        education: clone(education),
        courses: clone(courses),
        languages: clone(languages),
        recruiterMetrics: clone(recruiterMetrics)
      };

      setRepositorySyncStatus('syncing');
      setRepositorySyncMessage('Guardando contenido para el próximo commit...');

      void fetch(LOCAL_ADMIN_SYNC_PATH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Portfolio-Admin-Sync': '1'
        },
        body: JSON.stringify(snapshot)
      })
        .then(async (response) => {
          const result = await response.json() as { success?: boolean; changed?: boolean; message?: string };
          if (!response.ok || !result.success) {
            throw new Error(result.message || 'No se pudo guardar el contenido en el repositorio.');
          }
          setRepositorySyncStatus('synced');
          setRepositorySyncMessage(result.changed
            ? 'Contenido guardado en src/data/portfolioContent.json.'
            : 'Contenido del repositorio al día.');
        })
        .catch((error: unknown) => {
          const message = error instanceof Error ? error.message : 'No se pudo sincronizar el contenido.';
          console.warn('Error syncing portfolio content with the local repository:', error);
          setRepositorySyncStatus('error');
          setRepositorySyncMessage(message);
        });
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [
    hasHydratedStoredData,
    portfolioOwner,
    projects,
    experiences,
    previousExperiences,
    education,
    courses,
    languages,
    recruiterMetrics
  ]);

  useEffect(() => {
    if (versions.length > 0) return;
    const initialVersion = buildVersion('Versión inicial', 'Estado base del portafolio local.', buildSnapshot());
    setVersions([initialVersion]);
    saveStoredValue(LOCAL_STORAGE_KEY_VERSIONS, [initialVersion]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const homeProjects = useMemo(() => {
    const publishedProjects = projects.filter((project) => project.status === 'published');
    const principalProjects = publishedProjects.filter((project) => project.isPrincipal !== false);
    if (principalProjects.length === 0) {
      return publishedProjects.slice(0, 6);
    }
    return principalProjects.slice(0, 6);
  }, [projects]);

  const persistCurriculum = (data: CurriculumEditableData, label: string, summary: string) => {
    const owner = data.owner || portfolioOwner;
    const normalizedExperiences = data.experiences.map(normalizeExperience);
    const nextCurriculum = {
      owner,
      experiences: normalizedExperiences,
      previousExperiences: data.previousExperiences,
      education: data.education,
      courses: data.courses,
      languages: data.languages,
      metrics: data.metrics
    };

    setPortfolioOwner(owner);
    setExperiences(normalizedExperiences);
    setPreviousExperiences(data.previousExperiences);
    setEducation(data.education);
    setCourses(data.courses);
    setLanguages(data.languages);
    setRecruiterMetrics(data.metrics);
    setActiveExcelSource((prev) => ({ ...prev, curriculum: 'custom' }));
    saveStoredValue(LOCAL_STORAGE_KEY_CURRICULUM, nextCurriculum);
    recordVersion(label, summary, buildSnapshot({
      portfolioOwner: owner,
      experiences: normalizedExperiences,
      previousExperiences: data.previousExperiences,
      education: data.education,
      courses: data.courses,
      languages: data.languages,
      recruiterMetrics: data.metrics
    }));
  };

  const persistProjects = (nextProjects: Project[], label: string, summary: string) => {
    const sortedProjects = formatDefaultProjects(nextProjects);
    setProjects(sortedProjects);
    setActiveExcelSource((prev) => ({ ...prev, projects: 'custom' }));
    saveStoredValue(LOCAL_STORAGE_KEY_PROJECTS, sortedProjects);

    setImageAssets((current) => {
      const synced = syncImageRepository(sortedProjects, current);
      saveStoredValue(LOCAL_STORAGE_KEY_IMAGES, synced);
      return synced;
    });

    recordVersion(label, summary, buildSnapshot({ projects: sortedProjects }));
    return sortedProjects;
  };

  const saveProfile = (owner: PortfolioOwner): { success: boolean; message: string } => {
    persistCurriculum(
      {
        owner,
        experiences,
        previousExperiences,
        education,
        courses,
        languages,
        metrics: recruiterMetrics
      },
      'Datos personales actualizados',
      `Se actualizó el perfil de ${owner.name}.`
    );

    return {
      success: true,
      message: 'Datos personales guardados en el administrador local.'
    };
  };

  const saveCurriculum = (data: CurriculumEditableData): { success: boolean; message: string } => {
    persistCurriculum(data, 'Currículum actualizado', `${data.experiences.length} experiencias principales guardadas.`);
    return {
      success: true,
      message: 'Currículum guardado en el administrador local.'
    };
  };

  const applyCurriculumImport = (data: CurriculumEditableData): { success: boolean; message: string } => {
    persistCurriculum(data, 'Importación de currículum Excel', `${data.experiences.length} empresas procesadas desde Excel.`);
    return {
      success: true,
      message: `Currículum actualizado con éxito: ${data.experiences.length} empresas procesadas desde las pestañas de Excel.`
    };
  };

  const applyProjectsImport = (importedProjects: Project[]): { success: boolean; message: string; count?: number } => {
    if (importedProjects.length === 0) {
      return {
        success: false,
        message: 'No se encontraron proyectos válidos en el archivo.'
      };
    }

    const sortedProjects = persistProjects(
      importedProjects,
      'Importación de proyectos Excel',
      `${importedProjects.length} proyectos importados desde Excel.`
    );
    const homeCount = sortedProjects.filter((project) => project.status === 'published' && project.isPrincipal !== false).slice(0, 6).length;

    return {
      success: true,
      message: `Se importaron ${sortedProjects.length} proyectos exitosamente. ${homeCount} proyectos destacados en el Home ordenados por año.`,
      count: sortedProjects.length
    };
  };

  const saveProject = (
    project: Project,
    originalProjectId?: string
  ): { success: boolean; message: string } => {
    const normalizedProject = normalizeProject(project);

    if (!normalizedProject.id || !normalizedProject.title || !normalizedProject.company) {
      return {
        success: false,
        message: 'Completa al menos ID, título y empresa antes de guardar.'
      };
    }

    const isDuplicatedId = projects.some((existingProject) => {
      return existingProject.id === normalizedProject.id && existingProject.id !== originalProjectId;
    });

    if (isDuplicatedId) {
      return {
        success: false,
        message: 'Ya existe un proyecto con ese ID. Usa un slug único.'
      };
    }

    const previousId = originalProjectId || normalizedProject.id;
    const nextProjects = projects.filter((existingProject) => existingProject.id !== previousId);
    persistProjects(
      [...nextProjects, normalizedProject],
      'Proyecto guardado',
      `Se guardó "${normalizedProject.title}" como ${normalizedProject.status === 'published' ? 'publicado' : normalizedProject.status === 'archived' ? 'archivado' : 'borrador'}.`
    );

    return {
      success: true,
      message: `Proyecto "${normalizedProject.title}" guardado en el CMS local.`
    };
  };

  const duplicateProject = (
    projectId: string
  ): { success: boolean; message: string; project?: Project } => {
    const sourceProject = projects.find((project) => project.id === projectId);

    if (!sourceProject) {
      return {
        success: false,
        message: 'No se encontró el proyecto para duplicar.'
      };
    }

    const duplicatedProject: Project = {
      ...clone(sourceProject),
      id: buildDuplicatedProjectId(sourceProject.id, projects),
      title: `${sourceProject.title} (copia)`,
      status: 'draft',
      isPrincipal: false
    };

    persistProjects([...projects, duplicatedProject], 'Proyecto duplicado', `Se duplicó "${sourceProject.title}" como borrador.`);

    return {
      success: true,
      message: `Proyecto "${sourceProject.title}" duplicado como borrador.`,
      project: duplicatedProject
    };
  };

  const archiveProject = (projectId: string): { success: boolean; message: string } => {
    const projectToArchive = projects.find((project) => project.id === projectId);

    if (!projectToArchive) {
      return {
        success: false,
        message: 'No se encontró el proyecto para archivar.'
      };
    }

    persistProjects(
      projects.map((project) => project.id === projectId ? { ...project, status: 'archived', isPrincipal: false } : project),
      'Proyecto archivado',
      `Se archivó "${projectToArchive.title}".`
    );

    return {
      success: true,
      message: `Proyecto "${projectToArchive.title}" archivado.`
    };
  };

  const restoreProject = (projectId: string): { success: boolean; message: string } => {
    const projectToRestore = projects.find((project) => project.id === projectId);

    if (!projectToRestore) {
      return {
        success: false,
        message: 'No se encontró el proyecto para restaurar.'
      };
    }

    persistProjects(
      projects.map((project) => project.id === projectId ? { ...project, status: 'draft' } : project),
      'Proyecto restaurado',
      `Se restauró "${projectToRestore.title}" como borrador.`
    );

    return {
      success: true,
      message: `Proyecto "${projectToRestore.title}" restaurado como borrador.`
    };
  };

  const resetToDefaults = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_CURRICULUM);
    localStorage.removeItem(LOCAL_STORAGE_KEY_PROJECTS);

    const nextCurriculum = defaultCurriculumPayload();
    const defaultSorted = formatDefaultProjects(getInitialProjects());

    setPortfolioOwner(nextCurriculum.owner || PORTFOLIO_OWNER);
    setExperiences(nextCurriculum.experiences);
    setPreviousExperiences(nextCurriculum.previousExperiences);
    setEducation(nextCurriculum.education);
    setCourses(nextCurriculum.courses);
    setLanguages(nextCurriculum.languages);
    setRecruiterMetrics(nextCurriculum.metrics);
    setProjects(defaultSorted);
    setActiveExcelSource({
      curriculum: 'default',
      projects: 'default'
    });

    setImageAssets((current) => {
      const synced = syncImageRepository(defaultSorted, current);
      saveStoredValue(LOCAL_STORAGE_KEY_IMAGES, synced);
      return synced;
    });

    recordVersion('Restauración de predeterminados', 'Se volvió al contenido base del proyecto.', buildSnapshot({
      portfolioOwner: nextCurriculum.owner || PORTFOLIO_OWNER,
      projects: defaultSorted,
      experiences: nextCurriculum.experiences,
      previousExperiences: nextCurriculum.previousExperiences,
      education: nextCurriculum.education,
      courses: nextCurriculum.courses,
      languages: nextCurriculum.languages,
      recruiterMetrics: nextCurriculum.metrics
    }));
  };

  const restoreVersion = (versionId: string): { success: boolean; message: string } => {
    const version = versions.find((item) => item.id === versionId);
    if (!version) {
      return {
        success: false,
        message: 'No se encontró esa versión.'
      };
    }

    const data = version.data;
    const sortedProjects = formatDefaultProjects(data.projects);
    const normalizedExperiences = data.experiences.map(normalizeExperience);

    setPortfolioOwner(data.portfolioOwner);
    setProjects(sortedProjects);
    setExperiences(normalizedExperiences);
    setPreviousExperiences(data.previousExperiences);
    setEducation(data.education);
    setCourses(data.courses);
    setLanguages(data.languages);
    setRecruiterMetrics(data.recruiterMetrics);
    setActiveExcelSource({ curriculum: 'custom', projects: 'custom' });
    saveStoredValue(LOCAL_STORAGE_KEY_CURRICULUM, {
      owner: data.portfolioOwner,
      experiences: normalizedExperiences,
      previousExperiences: data.previousExperiences,
      education: data.education,
      courses: data.courses,
      languages: data.languages,
      metrics: data.recruiterMetrics
    });
    saveStoredValue(LOCAL_STORAGE_KEY_PROJECTS, sortedProjects);

    setImageAssets((current) => {
      const synced = syncImageRepository(sortedProjects, current);
      saveStoredValue(LOCAL_STORAGE_KEY_IMAGES, synced);
      return synced;
    });

    recordVersion('Versión restaurada', `Se volvió a "${version.label}".`, buildSnapshot({
      portfolioOwner: data.portfolioOwner,
      projects: sortedProjects,
      experiences: normalizedExperiences,
      previousExperiences: data.previousExperiences,
      education: data.education,
      courses: data.courses,
      languages: data.languages,
      recruiterMetrics: data.recruiterMetrics
    }));

    return {
      success: true,
      message: `Se restauró la versión "${version.label}".`
    };
  };

  const deleteVersion = (versionId: string): { success: boolean; message: string } => {
    const nextVersions = versions.filter((version) => version.id !== versionId);
    if (nextVersions.length === versions.length) {
      return {
        success: false,
        message: 'No se encontró esa versión.'
      };
    }
    setVersions(nextVersions);
    saveStoredValue(LOCAL_STORAGE_KEY_VERSIONS, nextVersions);
    return {
      success: true,
      message: 'Versión eliminada del historial.'
    };
  };

  const addImageAsset = (asset: { name: string; url: string; source?: ImageAsset['source'] }) => {
    const url = asset.url.trim();
    if (!url) {
      return {
        success: false,
        message: 'Agrega una URL o archivo de imagen válido.'
      };
    }

    const date = nowIso();
    const nextAsset: ImageAsset = {
      id: buildImageId(url),
      name: asset.name.trim() || imageNameFromUrl(url),
      url,
      source: asset.source || 'manual',
      status: 'archived',
      usedBy: [],
      createdAt: date,
      updatedAt: date,
      archivedAt: date
    };

    setImageAssets((currentAssets) => {
      const existingIndex = currentAssets.findIndex((currentAsset) => currentAsset.url === url);
      const nextAssets = existingIndex >= 0
        ? currentAssets.map((currentAsset, index) => index === existingIndex ? { ...currentAsset, ...nextAsset, id: currentAsset.id } : currentAsset)
        : [...currentAssets, nextAsset];
      const synced = syncImageRepository(projects, nextAssets);
      saveStoredValue(LOCAL_STORAGE_KEY_IMAGES, synced);
      return synced;
    });

    return {
      success: true,
      message: 'Imagen agregada al repositorio local.',
      asset: nextAsset
    };
  };

  const archiveImageAsset = (assetId: string): { success: boolean; message: string } => {
    const date = nowIso();
    setImageAssets((currentAssets) => {
      const nextAssets = currentAssets.map((asset) => asset.id === assetId
        ? { ...asset, status: 'archived' as const, archivedAt: date, updatedAt: date }
        : asset
      );
      saveStoredValue(LOCAL_STORAGE_KEY_IMAGES, nextAssets);
      return nextAssets;
    });
    return {
      success: true,
      message: 'Imagen archivada.'
    };
  };

  const restoreImageAsset = (assetId: string): { success: boolean; message: string } => {
    const date = nowIso();
    setImageAssets((currentAssets) => {
      const nextAssets = currentAssets.map((asset) => asset.id === assetId
        ? { ...asset, status: 'active' as const, archivedAt: undefined, updatedAt: date }
        : asset
      );
      saveStoredValue(LOCAL_STORAGE_KEY_IMAGES, nextAssets);
      return nextAssets;
    });
    return {
      success: true,
      message: 'Imagen restaurada al repositorio activo.'
    };
  };

  const isCustomData = activeExcelSource.curriculum === 'custom' || activeExcelSource.projects === 'custom';

  return (
    <PortfolioDataContext.Provider
      value={{
        portfolioOwner,
        projects,
        homeProjects,
        experiences,
        previousExperiences,
        education,
        courses,
        languages,
        skillCategories,
        recruiterMetrics,
        isCustomData,
        activeExcelSource,
        versions,
        imageAssets,
        repositorySyncStatus,
        repositorySyncMessage,
        saveProfile,
        saveCurriculum,
        applyCurriculumImport,
        applyProjectsImport,
        saveProject,
        duplicateProject,
        archiveProject,
        restoreProject,
        resetToDefaults,
        restoreVersion,
        deleteVersion,
        addImageAsset,
        archiveImageAsset,
        restoreImageAsset
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolioData = () => {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a PortfolioDataProvider');
  }
  return context;
};
