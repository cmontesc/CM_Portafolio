import React, { useState } from 'react';
import { 
  Filter, 
  Sparkles, 
  Columns, 
  Grid, 
  List, 
  RotateCcw
} from 'lucide-react';
import { Project, AppView } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import { usePortfolioData } from '../context/PortfolioDataContext';

interface ProjectsViewProps {
  onSelectProject: (project: Project) => void;
  onNavigate: (view: AppView) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ 
  onSelectProject
}) => {
  const { projects } = usePortfolioData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [layoutMode, setLayoutMode] = useState<'masonry' | 'editorial' | 'rows'>('masonry');

  const categories = [
    { id: 'all', label: 'Todos los proyectos' },
    { id: 'mobile', label: 'E-commerce y aplicaciones' },
    { id: 'health', label: 'Salud y healthtech' },
    { id: 'fintech', label: 'Fintech y crédito' },
    { id: 'saas', label: 'Web empresarial' }
  ];

  const publishedProjects = projects.filter((p) => p.status === 'published');
  const filteredProjects = publishedProjects.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesCategory;
  });

  const handleResetFilters = () => {
    setSelectedCategory('all');
  };

  return (
    <div className="flex flex-col gap-10 py-10 md:py-16 animate-in fade-in duration-200">
      {/* Header & Section Title — Section Heading Block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-wider text-[#839bc8] font-normal">
            <Sparkles className="w-3.5 h-3.5 text-[#533afd]" strokeWidth={1.5} />
            <span>Proyectos ordenados del más reciente al más antiguo</span>
          </div>
          <h1 className="text-[36px] sm:text-[48px] font-light text-[#061b31] tracking-[-0.96px] leading-[1.03]">
            Casos de estudio y proyectos
          </h1>
          <p className="text-[16px] text-[#50617a] font-light leading-relaxed tracking-[-0.16px]">
            Explora los procesos de investigación, arquitectura de información, sistemas de diseño e impacto medible en cada producto digital.
          </p>
        </div>

        {/* Catalog Summary */}
        <div className="shrink-0 px-3.5 py-2 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] text-[13px] sm:text-[14px] text-[#64748d] font-light tracking-[-0.14px] whitespace-nowrap">
          <span className="text-[#061b31] font-normal tabular-nums">{filteredProjects.length}</span>
          <span>{filteredProjects.length === 1 ? ' proyecto' : ' proyectos'}</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 bg-white border border-[#e5edf5] rounded-[4px]">
        {/* Category Pills (9999px) */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-[13px] font-normal tracking-[-0.14px] transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#533afd] text-white shadow-none'
                  : 'bg-[#f8fafd] text-[#50617a] hover:text-[#061b31] hover:bg-[#e8e9ff] border border-[#e5edf5]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center border border-[#e5edf5] rounded-[4px] bg-[#f8fafd] p-0.5 shrink-0">
          <button
            onClick={() => setLayoutMode('masonry')}
            className={`px-2.5 py-1 rounded-[3px] text-[12px] font-normal transition-colors flex items-center gap-1.5 cursor-pointer ${
              layoutMode === 'masonry' 
                ? 'bg-white text-[#533afd] border border-[#e5edf5]' 
                : 'text-[#64748d] hover:text-[#061b31]'
            }`}
            title="Vista Mosaico"
          >
            <Grid className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="hidden sm:inline">Mosaico</span>
          </button>

          <button
            onClick={() => setLayoutMode('editorial')}
            className={`px-2.5 py-1 rounded-[3px] text-[12px] font-normal transition-colors flex items-center gap-1.5 cursor-pointer ${
              layoutMode === 'editorial' 
                ? 'bg-white text-[#533afd] border border-[#e5edf5]' 
                : 'text-[#64748d] hover:text-[#061b31]'
            }`}
            title="Vista editorial (2 columnas)"
          >
            <Columns className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="hidden sm:inline">Editorial</span>
          </button>

          <button
            onClick={() => setLayoutMode('rows')}
            className={`px-2.5 py-1 rounded-[3px] text-[12px] font-normal transition-colors flex items-center gap-1.5 cursor-pointer ${
              layoutMode === 'rows' 
                ? 'bg-white text-[#533afd] border border-[#e5edf5]' 
                : 'text-[#64748d] hover:text-[#061b31]'
            }`}
            title="Vista en filas"
          >
            <List className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="hidden sm:inline">Filas</span>
          </button>
        </div>
      </div>

      {/* Render: Empty State OR Projects List */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 md:p-16 border border-[#e5edf5] rounded-[4px] bg-[#f8fafd] text-center flex flex-col items-center justify-center gap-4 max-w-xl mx-auto my-6">
          <div className="w-12 h-12 rounded-[4px] bg-[#e8e9ff] text-[#533afd] flex items-center justify-center">
            <Filter className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <div className="space-y-1">
            <h3 className="text-[20px] font-light text-[#061b31] tracking-tight">
              No se encontraron proyectos con este criterio
            </h3>
            <p className="text-[13px] text-[#64748d] font-light max-w-sm">
              No hay casos de estudio en esta categoría. Restablece los filtros para ver el catálogo completo.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-[#533afd] hover:bg-[#7389ff] text-white rounded-[4px] text-[13px] font-normal transition-colors flex items-center gap-2 cursor-pointer shadow-none mt-2"
          >
            <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Restablecer filtros</span>
          </button>
        </div>
      ) : layoutMode === 'masonry' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
            />
          ))}
        </div>
      ) : layoutMode === 'editorial' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
              layoutVariant="editorial"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4 pt-2">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
              layoutVariant="row"
            />
          ))}
        </div>
      )}
    </div>
  );
};
