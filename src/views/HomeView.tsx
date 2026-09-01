import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, MessageSquare, Sparkles } from 'lucide-react';
import { AppView, Project } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import { usePortfolioData } from '../context/PortfolioDataContext';

interface HomeViewProps {
  onNavigate: (view: AppView) => void;
  onSelectProject: (project: Project) => void;
}

const CATEGORY_CHIPS = [
  { id: 'all', label: 'Todos los Proyectos' },
  { id: 'mobile', label: 'E-commerce & Mobile' },
  { id: 'health', label: 'Salud & Healthtech' },
  { id: 'fintech', label: 'Fintech & Crédito' },
  { id: 'saas', label: 'Web & Enterprise' }
] as const;

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectProject }) => {
  const { portfolioOwner, recruiterMetrics, projects, homeProjects } = usePortfolioData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const cleanPhone = portfolioOwner.phone.replace(/\s+/g, '').replace('+', '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hola%20Carlos,%20he%20visto%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar.`;

  // Filter projects according to the selected chip:
  // 'all' shows top 6 principal projects (sorted by year)
  // Specific category filters from full projects list (sorted by year)
  const publishedProjects = projects.filter((p) => p.status === 'published');
  const displayedProjects = selectedCategory === 'all'
    ? homeProjects
    : publishedProjects.filter((p) => p.category === selectedCategory);

  return (
    <div className="flex flex-col gap-16 sm:gap-20 md:gap-24 py-8 sm:py-12 md:py-20 animate-in fade-in duration-200">
      {/* 1. Hero Section — Left-aligned Whisper Display Typography */}
      <section className="flex flex-col gap-5 sm:gap-6 max-w-4xl">
        {/* Availability Badge */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e8e9ff] text-[#533afd] text-[12px] font-normal rounded-full border border-[#b9b9f9]/40 tracking-[-0.12px]">
            <span className="w-2 h-2 rounded-full bg-[#533afd] animate-pulse" />
            <span>{portfolioOwner.status}</span>
          </span>
          <span className="text-[13px] text-[#64748d] font-light tracking-[-0.14px]">
            · {portfolioOwner.location}
          </span>
        </div>

        {/* Display Typography (Whisper Weight 300) */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-[36px] sm:text-[46px] md:text-[56px] font-light text-[#061b31] tracking-[-1.4px] leading-[1.05] sm:leading-[1.03]">
            {portfolioOwner.shortGreeting}
          </h1>
          <h2 className="text-[20px] sm:text-[24px] md:text-[26px] font-light text-[#533afd] tracking-[-0.26px] leading-snug">
            {portfolioOwner.tagline}
          </h2>
        </div>

        {/* Bio summary */}
        <p className="text-[16px] sm:text-[18px] md:text-[19px] text-[#50617a] font-light leading-relaxed max-w-3xl tracking-[-0.16px]">
          {portfolioOwner.bio}
        </p>

        {/* Hero CTA Pair */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('curriculum')}
            className="min-h-[44px] px-5 py-3 bg-[#533afd] hover:bg-[#7389ff] text-white rounded-[4px] text-[14px] font-normal tracking-[-0.14px] transition-colors flex items-center justify-center gap-2 shadow-none cursor-pointer"
          >
            <span>Ver experiencia</span>
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </button>

          <button
            onClick={() => onNavigate('projects')}
            className="min-h-[44px] px-5 py-3 bg-transparent hover:bg-[#e8e9ff]/50 text-[#533afd] border border-[#b9b9f9] rounded-[4px] text-[14px] font-normal tracking-[-0.14px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Ver Portafolio Completo</span>
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </section>

      {/* 2. Recruiter Metrics Ledger — Full-bleed 100% width container with inner 1320px constrained ledger */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-y border-[#e5edf5] py-8 sm:py-12 bg-[#f8fafd] overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {recruiterMetrics.map((metric, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-[30px] sm:text-[40px] md:text-[48px] font-light text-[#061b31] tracking-[-0.96px] leading-[1.05] tabular-nums">
                {metric.value}
              </div>
              <div className="text-[13px] sm:text-[14px] font-normal text-[#061b31] tracking-[-0.14px]">
                {metric.label}
              </div>
              <div className="text-[11px] sm:text-[12px] text-[#64748d] font-light tracking-[-0.12px]">
                {metric.sublabel}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Projects Showcase with Category Filter Chips */}
      <section className="space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#e5edf5] pb-4">
          <div>
            <div className="inline-flex items-center text-[#839bc8] mb-1" aria-hidden="true">
              <Sparkles className="w-3.5 h-3.5 text-[#533afd]" strokeWidth={1.5} />
            </div>
            <h2 className="text-[26px] sm:text-[32px] font-light text-[#061b31] tracking-[-0.64px]">
              Proyectos Destacados{selectedCategory !== 'all' ? ` (${displayedProjects.length})` : ''}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="text-[14px] text-[#533afd] hover:text-[#7389ff] flex items-center gap-1.5 font-normal tracking-[-0.14px] cursor-pointer transition-colors self-start sm:self-auto py-1"
          >
            <span>Ver catálogo completo ({publishedProjects.length})</span>
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Category Filter Chips (Pill 9999px) */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {CATEGORY_CHIPS.map((chip) => {
            const isSelected = selectedCategory === chip.id;
            const count = chip.id === 'all'
              ? homeProjects.length
              : publishedProjects.filter((p) => p.category === chip.id).length;

            return (
              <button
                key={chip.id}
                onClick={() => setSelectedCategory(chip.id)}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-[13px] font-normal tracking-[-0.14px] transition-colors flex items-center gap-2 cursor-pointer select-none ${
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
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid with uniform height and Hover details (Mosaic Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {displayedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
            />
          ))}
        </div>
      </section>

      {/* 4. Conversion CTA Strip (Streamlined: Pure WhatsApp direct connection) */}
      <section className="p-6 sm:p-10 md:p-12 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-light text-[#061b31] tracking-[-0.64px]">
            ¿Tienes un desafío de diseño en mente?
          </h3>
          <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#50617a] font-light leading-relaxed tracking-[-0.16px]">
            Conversemos sobre cómo transformarlo en una experiencia digital clara, funcional y de alto impacto. Escríbeme directamente por WhatsApp para coordinar.
          </p>
        </div>

        <div className="w-full md:w-auto shrink-0 pt-2 md:pt-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] w-full md:w-auto px-6 py-3.5 bg-[#533afd] hover:bg-[#7389ff] text-white rounded-[4px] text-[14px] sm:text-[15px] font-normal tracking-[-0.14px] transition-colors flex items-center justify-center gap-2.5 shadow-none"
          >
            <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
            <span>Chatear por WhatsApp</span>
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </div>
      </section>
    </div>
  );
};
