import React from 'react';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { AppView } from '../types';
import { usePortfolioData } from '../context/PortfolioDataContext';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const { portfolioOwner } = usePortfolioData();
  const cleanPhone = portfolioOwner.phone.replace(/\s+/g, '').replace('+', '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hola%20Carlos,%20he%20visto%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar.`;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 border-b border-[#e5edf5] transition-all">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 md:px-16 lg:px-20 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand / Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer text-left shrink-0"
          title="Ir al inicio"
        >
          <div className="w-7 h-7 bg-[#533afd] text-white flex items-center justify-center rounded-[4px] font-sans font-normal text-xs tracking-tight transition-transform group-hover:scale-105 shadow-xs">
            CM
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] sm:text-[16px] font-normal tracking-[-0.16px] text-[#061b31] font-sans leading-none">
              {portfolioOwner.name}
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#64748d] font-light hidden sm:inline leading-none mt-1">
              {portfolioOwner.title}
            </span>
          </div>
        </button>

        {/* Navigation items including Design System */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 no-scrollbar text-center">
          <button
            onClick={() => onNavigate('home')}
            className={`min-h-[36px] px-2.5 sm:px-3 py-1.5 rounded-[4px] text-[13px] sm:text-[14px] font-normal tracking-[-0.14px] transition-colors cursor-pointer shrink-0 ${
              currentView === 'home'
                ? 'bg-[#f8fafd] text-[#533afd] border border-[#e5edf5]'
                : 'text-[#50617a] hover:text-[#061b31] hover:bg-[#f8fafd]'
            }`}
          >
            <span>Inicio</span>
          </button>

          <button
            onClick={() => onNavigate('curriculum')}
            className={`min-h-[36px] px-2.5 sm:px-3 py-1.5 rounded-[4px] text-[13px] sm:text-[14px] font-normal tracking-[-0.14px] transition-colors cursor-pointer shrink-0 ${
              currentView === 'curriculum'
                ? 'bg-[#f8fafd] text-[#533afd] border border-[#e5edf5]'
                : 'text-[#50617a] hover:text-[#061b31] hover:bg-[#f8fafd]'
            }`}
          >
            <span>Currículum</span>
          </button>

          <button
            onClick={() => onNavigate('projects')}
            className={`min-h-[36px] px-2.5 sm:px-3 py-1.5 rounded-[4px] text-[13px] sm:text-[14px] font-normal tracking-[-0.14px] transition-colors cursor-pointer shrink-0 ${
              currentView === 'projects' || currentView === 'project-detail'
                ? 'bg-[#f8fafd] text-[#533afd] border border-[#e5edf5]'
                : 'text-[#50617a] hover:text-[#061b31] hover:bg-[#f8fafd]'
            }`}
          >
            <span>Proyectos</span>
          </button>

          <button
            onClick={() => onNavigate('design-system')}
            className={`min-h-[36px] px-2.5 sm:px-3 py-1.5 rounded-[4px] text-[13px] sm:text-[14px] font-normal tracking-[-0.14px] transition-colors cursor-pointer shrink-0 hidden md:inline-flex ${
              currentView === 'design-system'
                ? 'bg-[#f8fafd] text-[#533afd] border border-[#e5edf5]'
                : 'text-[#50617a] hover:text-[#061b31] hover:bg-[#f8fafd]'
            }`}
          >
            <span>Design System</span>
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className={`min-h-[36px] px-2.5 sm:px-3 py-1.5 rounded-[4px] text-[13px] sm:text-[14px] font-normal tracking-[-0.14px] transition-colors cursor-pointer shrink-0 ${
              currentView === 'contact'
                ? 'bg-[#f8fafd] text-[#533afd] border border-[#e5edf5]'
                : 'text-[#50617a] hover:text-[#061b31] hover:bg-[#f8fafd]'
            }`}
          >
            <span>Contacto</span>
          </button>
        </nav>

        {/* Right Actions: WhatsApp */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[36px] px-3 sm:px-3.5 py-1.5 bg-[#533afd] hover:bg-[#7389ff] text-white rounded-[4px] text-[12px] sm:text-[13px] font-normal tracking-[-0.12px] transition-colors flex items-center gap-1.5 shadow-none"
            title="Contactar directamente por WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="hidden sm:inline">WhatsApp</span>
            <ArrowUpRight className="w-3 h-3 -ml-0.5" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </header>
  );
};
