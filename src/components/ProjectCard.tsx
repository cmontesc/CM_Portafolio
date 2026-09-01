import React from 'react';
import { 
  ArrowUpRight, 
  Smartphone, 
  Activity, 
  Layers, 
  Compass, 
  CheckCircle2, 
  TrendingUp 
} from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  layoutVariant?: string;
  featuredIndex?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect
}) => {
  // Extract primary metric or key outcome if available
  const topMetric = project.caseStudy?.metrics?.[0];
  const projectLinks = [
    project.links?.figma || project.prototypeUrl ? 'Figma' : '',
    project.links?.vercel ? 'Vercel' : '',
    project.links?.git ? 'Git' : ''
  ].filter(Boolean);

  // Category Icon helper
  const getCategoryIcon = () => {
    switch (project.category) {
      case 'mobile':
        return <Smartphone className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden="true" />;
      case 'health':
        return <Activity className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden="true" />;
      case 'design-system':
      case 'saas':
        return <Layers className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden="true" />;
      default:
        return <Compass className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden="true" />;
    }
  };

  return (
    <article
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Ver caso de estudio UX: ${project.title} (${project.company})`}
      className="group relative w-full h-[420px] sm:h-[490px] flex flex-col cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#533afd] focus-visible:ring-offset-2 rounded-[4px] overflow-hidden bg-[#f8fafd] border border-[#e5edf5] transition-all duration-300 ease-out"
    >
      {/* 1. Main Showcase Artifact Image */}
      <img
        src={project.coverImage}
        alt={`Mockup y artefactos de ${project.title}`}
        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
        loading="lazy"
        referrerPolicy="no-referrer"
      />

      {/* 2. Top-Left Permanent Badges (Discreet on Idle, Polished - 9999px pills) */}
      <div className="absolute top-3 sm:top-3.5 left-3 sm:left-3.5 z-10 flex flex-col gap-1.5 items-start pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-white/95 group-hover:bg-white backdrop-blur-md text-[#061b31] border border-[#e5edf5] rounded-full text-[11px] font-normal tracking-[-0.12px] transition-colors shadow-xs">
          <span className="text-[#533afd]">{getCategoryIcon()}</span>
          <span>{project.categoryLabel}</span>
        </span>

        {projectLinks.map((label) => (
          <span key={label} className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#533afd] text-white rounded-full text-[10px] font-normal tracking-[-0.12px] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span>{label}</span>
          </span>
        ))}
      </div>

      {/* 3. Top-Right Floating CTA Indicator on Hover (4px radius) */}
      <div className="absolute top-3.5 right-3.5 z-20 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 transform -translate-y-1 group-hover:translate-y-0 group-focus-visible:translate-y-0">
        <div className="px-3.5 py-1.5 bg-[#533afd] hover:bg-[#7389ff] text-white text-[12px] font-normal rounded-[4px] flex items-center gap-1.5 transition-colors">
          <span>Ver Caso</span>
          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden="true" />
        </div>
      </div>

      {/* 4. Mobile Base Card Info (Visible on mobile screens before hover/touch) */}
      <div className="sm:hidden absolute inset-x-0 bottom-0 z-5 bg-gradient-to-t from-[#061b31]/90 via-[#061b31]/60 to-transparent p-4 pt-10 text-white flex flex-col gap-1">
        <div className="flex items-center justify-between text-[11px] text-white/80">
          <span>{project.company}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="text-[17px] font-light text-white leading-tight">
          {project.title}
        </h3>
      </div>

      {/* 5. Full Rich Overlay with Details Revealing Smoothly on Hover/Focus */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#061b31]/95 via-[#061b31]/85 to-[#061b31]/30 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 p-5 sm:p-6 flex flex-col justify-end gap-2.5 sm:gap-3 pointer-events-none text-white">
        
        {/* Company & Role */}
        <div className="flex items-center justify-between text-[12px] text-white/80 font-normal tracking-[-0.12px]">
          <div className="flex items-center gap-2">
            <span className="font-normal text-white">{project.company}</span>
          </div>
          <span className="text-[11px] text-[#e8e9ff] px-2 py-0.5 rounded-full bg-white/10 border border-white/15">
            {project.role}
          </span>
        </div>

        {/* Project Title - Whisper Weight 300 */}
        <h3 className="text-[19px] sm:text-[20px] font-light text-white tracking-[-0.2px] leading-snug">
          {project.title}
        </h3>

        {/* Subtitle / UX Problem & Outcome */}
        <p className="text-[12px] sm:text-[13px] text-white/85 font-light leading-relaxed line-clamp-3 tracking-[-0.14px]">
          {project.subtitle}
        </p>

        {/* Bottom Bar: Key Metric / Outcome Chip & Action Button */}
        <div className="pt-2.5 sm:pt-3 border-t border-white/15 flex items-center justify-between gap-2">
          {topMetric ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full text-[11px] font-normal tracking-[-0.12px]">
              <TrendingUp className="w-3 h-3 text-emerald-400" strokeWidth={1.5} />
              <span>{topMetric.metric} {topMetric.label}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 text-white/80 text-[11px] truncate max-w-[200px] tracking-[-0.12px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#b9b9f9] shrink-0" strokeWidth={1.5} />
              <span className="truncate">{project.outcome}</span>
            </div>
          )}

          <div className="inline-flex items-center gap-1 text-[12px] font-normal text-white group-hover:translate-x-0.5 transition-transform shrink-0">
            <span>Explorar Proceso</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#b9b9f9]" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </article>
  );
};
