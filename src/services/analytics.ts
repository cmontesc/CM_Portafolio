import type { AppView, Project } from '../types';

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);
const SECTION_VISIBILITY_MS = 1000;

type AnalyticsValue = string | number | boolean;
export type AnalyticsParameters = Record<string, AnalyticsValue | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: 'event' | 'config' | 'set', target: string, parameters?: AnalyticsParameters) => void;
    portfolioAnalyticsDebug?: Array<{
      event: string;
      parameters: AnalyticsParameters;
    }>;
  }
}

const cleanParameters = (parameters: AnalyticsParameters): Record<string, AnalyticsValue> => {
  return Object.fromEntries(
    Object.entries(parameters).filter((entry): entry is [string, AnalyticsValue] => entry[1] !== undefined)
  );
};

const emitEvent = (event: string, parameters: AnalyticsParameters) => {
  if (typeof window === 'undefined') return;

  const cleaned = cleanParameters(parameters);
  if (LOCAL_HOSTS.has(window.location.hostname)) {
    window.portfolioAnalyticsDebug = window.portfolioAnalyticsDebug || [];
    window.portfolioAnalyticsDebug.push({ event, parameters: cleaned });
    console.debug(`[analytics] ${event} ${JSON.stringify(cleaned)}`);
    return;
  }

  window.gtag?.('event', event, cleaned);
};

export interface ContentAnalyticsContext {
  viewName: AppView;
  contentType: 'page' | 'project';
  contentId: string;
  contentName: string;
  virtualPath: string;
  projectCategory?: string;
  projectCompany?: string;
}

const viewNames: Record<Exclude<AppView, 'project-detail'>, string> = {
  home: 'Inicio',
  curriculum: 'Currículum',
  projects: 'Proyectos',
  contact: 'Contacto',
  'design-system': 'Design System Olivia'
};

export const getContentAnalyticsContext = (
  view: AppView,
  project?: Project
): ContentAnalyticsContext => {
  if (view === 'project-detail' && project?.id) {
    return {
      viewName: view,
      contentType: 'project',
      contentId: project.id,
      contentName: project.title,
      virtualPath: `/proyectos/${encodeURIComponent(project.id)}`,
      projectCategory: project.categoryLabel,
      projectCompany: project.company
    };
  }

  const pageView = view === 'project-detail' ? 'projects' : view;
  return {
    viewName: pageView,
    contentType: 'page',
    contentId: pageView,
    contentName: viewNames[pageView],
    virtualPath: pageView === 'home' ? '/' : `/${pageView}`
  };
};

export const trackContentView = (context: ContentAnalyticsContext) => {
  if (typeof window === 'undefined') return;

  const pageLocation = new URL(context.virtualPath, window.location.origin).href;
  const shared = {
    view_name: context.viewName,
    content_type: context.contentType,
    content_id: context.contentId,
    content_name: context.contentName,
    project_category: context.projectCategory,
    project_company: context.projectCompany
  };

  emitEvent('page_view', {
    page_title: document.title,
    page_location: pageLocation,
    page_path: context.virtualPath,
    ...shared
  });
  emitEvent('portfolio_content_view', shared);
};

export const trackSectionView = (
  context: ContentAnalyticsContext,
  sectionId: string,
  sectionName: string,
  position: number
) => {
  emitEvent('portfolio_section_view', {
    view_name: context.viewName,
    content_type: context.contentType,
    content_id: context.contentId,
    content_name: context.contentName,
    section_id: sectionId,
    section_name: sectionName,
    section_position: position,
    project_category: context.projectCategory,
    project_company: context.projectCompany
  });
};

export const analyticsSectionVisibilityMs = SECTION_VISIBILITY_MS;

export const toAnalyticsId = (value: string) => {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80) || 'seccion';
};
