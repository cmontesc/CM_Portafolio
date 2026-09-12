import type { ProjectEditorial } from './projectEditorial';
export type AppView = 'home' | 'curriculum' | 'projects' | 'project-detail' | 'contact' | 'design-system';

export type ContentStatus = 'published' | 'draft' | 'archived';

export interface PortfolioOwner {
  name: string;
  shortGreeting: string;
  title: string;
  tagline: string;
  bio: string;
  secondaryBio?: string;
  status: string;
  location: string;
  experienceYears: string;
  email: string;
  phone: string;
  social: {
    linkedin: string;
    portfolio: string;
  };
}

export interface ProjectCaseStudy {
  editorial?: ProjectEditorial;
  overview: string;
  problem: string;
  myRole: string;
  team: string;
  duration: string;
  platform: string;
  researchMethodology: string[];
  keyInsights: string[];
  designHighlights: string[];
  interfaceImages?: string[];
  systemComponents?: string[];
  metrics: {
    metric: string;
    label: string;
    description: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

export interface ProjectExternalLinks {
  figma?: string;
  vercel?: string;
  git?: string;
}

export interface Project {
  contentRevision?: number;
  id: string;
  title: string;
  subtitle: string;
  year?: number;
  isPrincipal?: boolean;
  status?: ContentStatus;
  category: string;
  categoryLabel: string;
  tags: string[];
  company: string;
  period: string;
  role: string;
  team: string;
  platform: string;
  duration: string;
  outcome: string;
  summary: string;
  coverImage: string;
  aspectRatioClass?: string;
  isFeaturedMarquee?: boolean;
  accentTint?: string;
  prototypeUrl?: string;
  links?: ProjectExternalLinks;
  caseStudy: ProjectCaseStudy;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location?: string;
  type?: string;
  status?: ContentStatus;
  description: string;
  achievements: string[];
  skills: string[];
}

export interface PortfolioContentSnapshot {
  portfolioOwner: PortfolioOwner;
  projects: Project[];
  experiences: ExperienceItem[];
  previousExperiences: PreviousExperienceItem[];
  education: EducationItem[];
  courses: CourseItem[];
  languages: LanguageItem[];
  recruiterMetrics: MetricItem[];
}

export interface PortfolioVersion {
  id: string;
  createdAt: string;
  label: string;
  summary: string;
  data: PortfolioContentSnapshot;
}

export interface ImageAsset {
  id: string;
  name: string;
  url: string;
  source: 'project' | 'manual' | 'upload';
  status: 'active' | 'archived';
  usedBy: string[];
  createdAt: string;
  updatedAt: string;
  archivedAt?: string;
}

export interface PreviousExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

export interface CourseItem {
  title: string;
  institution: string;
  year: string;
}

export interface LanguageItem {
  language: string;
  level: string;
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export interface MetricItem {
  value: string;
  label: string;
  sublabel: string;
}
