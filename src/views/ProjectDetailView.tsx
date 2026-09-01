import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, MessageSquare, CheckCircle2, Quote, Users, Calendar, Laptop, Target, Award, Figma, Github, Globe2 } from 'lucide-react';
import { Project, AppView } from '../types';
import { usePortfolioData } from '../context/PortfolioDataContext';

interface ProjectDetailViewProps {
  project: Project;
  onNavigate: (view: AppView) => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  onNavigate,
  onSelectProject
}) => {
  const { projects, portfolioOwner } = usePortfolioData();
  const publishedProjects = projects.filter((p) => p.status === 'published');
  const currentIndex = publishedProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? publishedProjects[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < publishedProjects.length - 1 ? publishedProjects[currentIndex + 1] : null;

  const cleanPhone = portfolioOwner.phone.replace(/\s+/g, '').replace('+', '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hola%20Carlos,%20he%20visto%20la%20ficha%20del%20proyecto%20"${encodeURIComponent(
    project.title
  )}"%20y%20me%20gustar%C3%ADa%20conversar.`;

  const figmaUrl = project.links?.figma || (() => {
    if (!project.prototypeUrl) return undefined;
    try {
      const parsed = new URL(project.prototypeUrl);
      const embeddedUrl = parsed.searchParams.get('url');
      return embeddedUrl ? decodeURIComponent(embeddedUrl) : project.prototypeUrl;
    } catch {
      return project.prototypeUrl;
    }
  })();

  const externalLinks = [
    figmaUrl ? { label: 'Figma', href: figmaUrl, icon: Figma } : null,
    project.links?.vercel ? { label: 'Vercel', href: project.links.vercel, icon: Globe2 } : null,
    project.links?.git ? { label: 'Git', href: project.links.git, icon: Github } : null
  ].filter(Boolean) as Array<{ label: string; href: string; icon: typeof Figma }>;

  return (
    <div className="flex flex-col gap-12 py-8 md:py-12 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5edf5] pb-6">
        <button
          onClick={() => onNavigate('projects')}
          className="inline-flex items-center gap-2 text-[13px] text-[#64748d] hover:text-[#533afd] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo de Proyectos</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-[#e8e9ff] text-[#533afd] text-[12px] font-medium rounded-full border border-[#b9b9f9]/40">
            {project.categoryLabel}
          </span>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 bg-[#533afd] hover:bg-[#7389ff] text-white rounded-[4px] text-[13px] font-normal transition-colors flex items-center gap-1.5 shadow-none"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Consultar por WhatsApp</span>
            <ArrowUpRight className="w-3 h-3 -ml-0.5" />
          </a>
        </div>
      </div>

      {/* Case Study Header & Title */}
      <div className="space-y-4 max-w-4xl">
        <div className="text-[13px] text-[#64748d]">
          {project.company} · {project.period}
        </div>
        <h1 className="text-[32px] sm:text-[44px] md:text-[50px] font-light text-[#061b31] tracking-tight leading-[1.12]">
          {project.title}
        </h1>
        <p className="text-[18px] sm:text-[20px] text-[#50617a] font-light leading-relaxed">
          {project.subtitle}
        </p>
      </div>

      {/* Metadata Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] text-[13px]">
        <div>
          <div className="text-[#64748d] mb-1 flex items-center gap-1.5 text-[12px]">
            <Users className="w-3.5 h-3.5 text-[#533afd]" />
            <span>Rol & Equipo</span>
          </div>
          <div className="font-medium text-[#061b31]">{project.role}</div>
          <div className="text-[11px] text-[#64748d] mt-0.5">{project.team}</div>
        </div>

        <div>
          <div className="text-[#64748d] mb-1 flex items-center gap-1.5 text-[12px]">
            <Calendar className="w-3.5 h-3.5 text-[#533afd]" />
            <span>Duración</span>
          </div>
          <div className="font-medium text-[#061b31]">{project.duration}</div>
          <div className="text-[11px] text-[#64748d] mt-0.5">{project.period}</div>
        </div>

        <div>
          <div className="text-[#64748d] mb-1 flex items-center gap-1.5 text-[12px]">
            <Laptop className="w-3.5 h-3.5 text-[#533afd]" />
            <span>Plataforma</span>
          </div>
          <div className="font-medium text-[#061b31]">{project.platform}</div>
        </div>

        <div>
          <div className="text-[#64748d] mb-1 flex items-center gap-1.5 text-[12px]">
            <Target className="w-3.5 h-3.5 text-[#533afd]" />
            <span>Impacto Principal</span>
          </div>
          <div className="font-medium text-[#533afd] text-[12px] leading-snug">
            {project.outcome}
          </div>
        </div>
      </div>

      {externalLinks.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 p-4 bg-white border border-[#e5edf5] rounded-[4px]">
          <div className="text-[13px] text-[#64748d] font-light mr-1">
            Enlaces del proyecto
          </div>
          {externalLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[38px] px-3.5 py-1.5 bg-[#f8fafd] hover:bg-[#e8e9ff] text-[#061b31] hover:text-[#533afd] border border-[#e5edf5] rounded-[4px] text-[13px] font-normal transition-colors flex items-center gap-2"
              >
                <Icon className="w-3.5 h-3.5 text-[#533afd]" strokeWidth={1.5} />
                <span>{link.label}</span>
                <ArrowUpRight className="w-3 h-3" strokeWidth={1.5} />
              </a>
            );
          })}
        </div>
      )}

      {/* High-res Showcase Cover */}
      <div className="w-full aspect-[16/9] bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Context & Problem Definition */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-white border border-[#e5edf5] rounded-[4px] space-y-3">
          <h2 className="text-[18px] font-normal text-[#061b31] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#533afd]" />
            Contexto del Producto
          </h2>
          <p className="text-[14px] text-[#50617a] font-light leading-relaxed">
            {project.caseStudy.overview}
          </p>
        </div>

        <div className="p-6 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] space-y-3">
          <h2 className="text-[18px] font-normal text-[#061b31] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]" />
            Problema & Fricciones Detectadas
          </h2>
          <p className="text-[14px] text-[#50617a] font-light leading-relaxed">
            {project.caseStudy.problem}
          </p>
        </div>
      </div>

      {/* Research Methodology & Insights */}
      <div className="space-y-4">
        <h2 className="text-[22px] font-light text-[#061b31] tracking-tight">
          Investigación de Usuarios & Hallazgos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-[#e5edf5] rounded-[4px] space-y-3 bg-white">
            <div className="text-[12px] font-medium text-[#061b31] uppercase tracking-wider">
              Metodología de UX Research
            </div>
            {project.caseStudy.researchMethodology.map((method, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-[13px] text-[#50617a] font-light">
                <CheckCircle2 className="w-4 h-4 text-[#533afd] shrink-0 mt-0.5" />
                <span>{method}</span>
              </div>
            ))}
          </div>

          <div className="p-6 border border-[#e5edf5] bg-[#f8fafd] rounded-[4px] space-y-3">
            <div className="text-[12px] font-medium text-[#061b31] uppercase tracking-wider">
              Insights Clave de Usuario
            </div>
            {project.caseStudy.keyInsights.map((insight, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-[13px] text-[#50617a] font-light">
                <span className="w-1.5 h-1.5 rounded-full bg-[#533afd] shrink-0 mt-2" />
                <span>{insight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Design Decisions & Solutions */}
      <div className="space-y-4">
        <h2 className="text-[22px] font-light text-[#061b31] tracking-tight">
          Decisiones de Interfaz & Sistema
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.caseStudy.designHighlights.map((highlight, idx) => (
            <div
              key={idx}
              className="p-5 bg-white border border-[#e5edf5] rounded-[4px] text-[13px] text-[#061b31] flex items-start gap-3.5"
            >
              <div className="w-6 h-6 rounded-[2px] bg-[#e8e9ff] text-[#533afd] flex items-center justify-center shrink-0 text-xs font-medium">
                0{idx + 1}
              </div>
              <span className="leading-relaxed font-light">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Figma Prototype (when provided) */}
      {project.prototypeUrl && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-[22px] font-light text-[#061b31] tracking-tight flex items-center gap-2">
              <Laptop className="w-5 h-5 text-[#533afd]" />
              <span>Prototipo Interactivo en Figma</span>
            </h2>
            <a
              href={figmaUrl || project.prototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] text-[#533afd] hover:text-[#7389ff] font-medium"
            >
              <span>Abrir prototipo en Figma</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="w-full bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] overflow-hidden">
            <div className="p-3 bg-[#f1f5f9] border-b border-[#e5edf5] flex items-center justify-between text-[12px] text-[#64748d]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 font-mono text-[11px] text-[#475569]">Figma Mirror Player</span>
              </div>
              <span className="hidden sm:inline text-[11px]">Interactúa directamente con la navegación del MVP</span>
            </div>
            <div className="w-full h-[650px] sm:h-[800px] bg-[#1e1e1e]">
              <iframe
                title={`Prototipo interactivo ${project.title}`}
                className="w-full h-full border-0"
                src={project.prototypeUrl}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Measurable Quantitative Metrics */}
      <div className="space-y-4">
        <h2 className="text-[22px] font-light text-[#061b31] tracking-tight flex items-center gap-2">
          <Award className="w-5 h-5 text-[#533afd]" />
          <span>Impacto Cuantitativo & Métricas</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {project.caseStudy.metrics.map((m, idx) => (
            <div key={idx} className="p-6 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] space-y-1">
              <div className="text-[36px] font-light text-[#533afd] tracking-tight tabular-nums">
                {m.metric}
              </div>
              <div className="text-[14px] font-medium text-[#061b31]">
                {m.label}
              </div>
              <div className="text-[12px] text-[#64748d] font-light leading-relaxed">
                {m.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stakeholder Testimonial */}
      {project.caseStudy.testimonial && (
        <div className="p-6 md:p-8 bg-[#f8fafd] border-l-2 border-[#533afd] rounded-r-[4px] flex items-start gap-4">
          <Quote className="w-7 h-7 text-[#533afd] shrink-0 opacity-70" />
          <div className="space-y-2">
            <p className="text-[16px] italic text-[#061b31] leading-relaxed font-light">
              "{project.caseStudy.testimonial.quote}"
            </p>
            <div>
              <div className="text-[13px] font-medium text-[#061b31]">
                {project.caseStudy.testimonial.author}
              </div>
              <div className="text-[12px] text-[#64748d]">
                {project.caseStudy.testimonial.position}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Switcher & Fast Conversion Step: WhatsApp in 1-Click */}
      <div className="border-t border-[#e5edf5] pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {prevProject && (
            <button
              onClick={() => onSelectProject(prevProject)}
              className="flex items-center gap-1.5 text-[13px] text-[#64748d] hover:text-[#533afd] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{prevProject.title}</span>
            </button>
          )}
        </div>

        {/* Center WhatsApp Direct Callout */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-[#533afd] hover:bg-[#7389ff] text-white rounded-[4px] text-[13px] font-normal transition-colors flex items-center gap-2 shadow-none"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Conversar sobre este caso en WhatsApp</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>

        <div className="flex items-center gap-4">
          {nextProject && (
            <button
              onClick={() => onSelectProject(nextProject)}
              className="flex items-center gap-1.5 text-[13px] text-[#64748d] hover:text-[#533afd] transition-colors cursor-pointer"
            >
              <span>{nextProject.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
