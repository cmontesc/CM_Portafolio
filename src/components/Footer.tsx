import React from 'react';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { AppView } from '../types';
import { usePortfolioData } from '../context/PortfolioDataContext';

interface FooterProps {
  onNavigate: (view: AppView) => void;
  onShowToast?: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { portfolioOwner } = usePortfolioData();
  const cleanPhone = portfolioOwner.phone.replace(/\s+/g, '').replace('+', '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hola%20Carlos,%20he%20visto%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar.`;

  return (
    <footer className="w-full border-t border-[#e5edf5] bg-[#f8fafd] py-12 mt-24">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#533afd] text-white flex items-center justify-center rounded-[4px] text-xs font-normal">
                CM
              </div>
              <span className="text-[16px] font-normal text-[#061b31] tracking-[-0.16px]">
                {portfolioOwner.name}
              </span>
            </div>
            <p className="text-[13px] text-[#64748d] font-light max-w-sm tracking-[-0.14px]">
              {portfolioOwner.title} · {portfolioOwner.experienceYears} de experiencia en diseño UX/UI y sistemas digitales.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[13px] tracking-[-0.14px]">
            <button
              onClick={() => onNavigate('home')}
              className="py-1.5 text-[#50617a] hover:text-[#533afd] transition-colors cursor-pointer"
            >
              Inicio
            </button>
            <button
              onClick={() => onNavigate('curriculum')}
              className="py-1.5 text-[#50617a] hover:text-[#533afd] transition-colors cursor-pointer"
            >
              Currículum
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="py-1.5 text-[#50617a] hover:text-[#533afd] transition-colors cursor-pointer"
            >
              Proyectos
            </button>
            <button
              onClick={() => onNavigate('design-system')}
              className="py-1.5 text-[#50617a] hover:text-[#533afd] transition-colors cursor-pointer font-medium"
            >
              Design System
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="py-1.5 text-[#50617a] hover:text-[#533afd] transition-colors cursor-pointer"
            >
              Contacto
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[#e8e9ff] text-[#533afd] border border-[#b9b9f9] rounded-[4px] font-normal transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>WhatsApp</span>
              <ArrowUpRight className="w-3 h-3" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center text-[12px] text-[#64748d] pt-6 border-t border-[#e5edf5] gap-4">
          <div>
            © {new Date().getFullYear()} {portfolioOwner.name}. Todos los derechos reservados.
          </div>
          <div className="font-light tracking-[-0.12px]">
            Sistema de diseño <span className="text-[#061b31] font-normal">Olivia</span> · sohne-var / Inter Tight 300
          </div>
        </div>
      </div>
    </footer>
  );
};
