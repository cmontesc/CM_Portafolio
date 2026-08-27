import React, { useState } from 'react';
import { ArrowUpRight, Menu, MessageSquare, X } from 'lucide-react';
import { AppView } from '../types';
import { usePortfolioData } from '../context/PortfolioDataContext';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const navItems: Array<{ label: string; view: AppView; isActive: (currentView: AppView) => boolean }> = [
  { label: 'Inicio', view: 'home', isActive: (currentView) => currentView === 'home' },
  { label: 'Currículum', view: 'curriculum', isActive: (currentView) => currentView === 'curriculum' },
  {
    label: 'Proyectos',
    view: 'projects',
    isActive: (currentView) => currentView === 'projects' || currentView === 'project-detail'
  },
  { label: 'Design System', view: 'design-system', isActive: (currentView) => currentView === 'design-system' },
  { label: 'Contacto', view: 'contact', isActive: (currentView) => currentView === 'contact' }
];

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const { portfolioOwner } = usePortfolioData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cleanPhone = portfolioOwner.phone.replace(/\s+/g, '').replace('+', '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hola%20Carlos,%20he%20visto%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar.`;

  const handleNavigate = (view: AppView) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 border-b border-[#e5edf5] transition-all">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 md:px-16 lg:px-20 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand / Logo */}
        <button
          type="button"
          onClick={() => handleNavigate('home')}
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
        <nav className="hidden md:flex items-center gap-1 sm:gap-1.5 py-1 text-center">
          {navItems.map((item) => {
            const isActive = item.isActive(currentView);

            return (
              <button
                key={item.view}
                type="button"
                onClick={() => handleNavigate(item.view)}
                className={`min-h-[36px] px-2.5 sm:px-3 py-1.5 rounded-[4px] text-[13px] sm:text-[14px] font-normal tracking-[-0.14px] transition-colors cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#f8fafd] text-[#533afd] border border-[#e5edf5]'
                    : 'text-[#50617a] hover:text-[#061b31] hover:bg-[#f8fafd]'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
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

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="md:hidden min-h-[36px] w-9 bg-white hover:bg-[#f8fafd] text-[#061b31] border border-[#e5edf5] rounded-[4px] transition-colors flex items-center justify-center cursor-pointer"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMenuOpen ? (
              <X className="w-4 h-4" strokeWidth={1.5} />
            ) : (
              <Menu className="w-4 h-4" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          className="md:hidden border-t border-[#e5edf5] bg-white"
          aria-label="Navegación móvil"
        >
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => {
              const isActive = item.isActive(currentView);

              return (
                <button
                  key={item.view}
                  type="button"
                  onClick={() => handleNavigate(item.view)}
                  className={`w-full min-h-[42px] px-3 py-2 rounded-[4px] text-[14px] font-normal tracking-[-0.14px] transition-colors cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-[#f8fafd] text-[#533afd] border border-[#e5edf5]'
                      : 'text-[#50617a] hover:text-[#061b31] hover:bg-[#f8fafd] border border-transparent'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#533afd]" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};
