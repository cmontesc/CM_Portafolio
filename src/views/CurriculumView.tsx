import React from 'react';
import { 
  ArrowLeft, 
  Printer, 
  MessageSquare, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  CheckCircle2, 
  ArrowUpRight, 
  FolderKanban, 
  Sparkles, 
  Award, 
  BookOpen, 
  Languages, 
  Briefcase
} from 'lucide-react';
import { IMPACT_ACHIEVEMENTS } from '../data/portfolioData';
import { AppView } from '../types';
import { usePortfolioData } from '../context/PortfolioDataContext';

interface CurriculumViewProps {
  onNavigate: (view: AppView) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({ 
  onNavigate
}) => {
  const { 
    portfolioOwner, 
    experiences, 
    previousExperiences, 
    education, 
    courses, 
    languages, 
    skillCategories
  } = usePortfolioData();

  const cleanPhone = portfolioOwner.phone.replace(/\s+/g, '').replace('+', '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hola%20Carlos,%20he%20revisado%20tu%20curr%C3%ADculum%20y%20me%20gustar%C3%ADa%20conversar.`;
  const visibleExperiences = experiences.filter((experience) => (experience.status || 'published') === 'published');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-10 py-8 md:py-12 animate-in fade-in duration-200">
      {/* Top Bar Navigation & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5edf5] pb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-[13px] text-[#64748d] hover:text-[#533afd] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <button
            onClick={handlePrint}
            className="min-h-[38px] px-3.5 py-1.5 bg-[#f8fafd] hover:bg-[#e5edf5] text-[#061b31] border border-[#e5edf5] rounded-[4px] text-[13px] font-normal transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Imprimir CV"
          >
            <Printer className="w-3.5 h-3.5 text-[#533afd]" />
            <span className="hidden sm:inline">Imprimir</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[38px] px-4 py-1.5 bg-[#533afd] hover:bg-[#7389ff] text-white rounded-[4px] text-[13px] font-normal transition-colors flex items-center gap-1.5 shadow-none"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contactar por WhatsApp</span>
            <ArrowUpRight className="w-3 h-3 -ml-0.5" />
          </a>
        </div>
      </div>

      {/* Main CV Document Container */}
      <div className="bg-white border border-[#e5edf5] rounded-[4px] p-6 sm:p-10 md:p-14 space-y-12 shadow-none max-w-4xl mx-auto w-full">
        {/* Header Information */}
        <div className="border-b border-[#e5edf5] pb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="text-[32px] sm:text-[40px] font-light text-[#061b31] tracking-tight">
              {portfolioOwner.name}
            </h1>
            <span className="text-[13px] text-[#533afd] font-medium px-2.5 py-1 bg-[#e8e9ff] rounded-[3px] border border-[#b9b9f9]/40">
              {portfolioOwner.title}
            </span>
          </div>

          <div className="text-[17px] text-[#50617a] font-light">
            {portfolioOwner.tagline}
          </div>

          <div className="flex flex-wrap gap-y-2 gap-x-6 text-[13px] text-[#64748d] pt-2">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#533afd]" />
              <span>{portfolioOwner.location}</span>
            </span>

            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center gap-1.5 hover:text-[#533afd] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#533afd]" />
              <span>{portfolioOwner.phone}</span>
            </a>

            <a
              href={`mailto:${portfolioOwner.email}`}
              className="flex items-center gap-1.5 hover:text-[#533afd] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#533afd]" />
              <span>{portfolioOwner.email}</span>
            </a>

            <a
              href={portfolioOwner.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#533afd] transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#533afd]" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Section: Professional Summary */}
        <div className="space-y-3">
          <h2 className="text-[13px] font-medium uppercase tracking-wider text-[#533afd]">
            Resumen profesional
          </h2>
          <div className="space-y-3 text-[15px] text-[#50617a] font-light leading-relaxed">
            <p>{portfolioOwner.bio}</p>
            {portfolioOwner.secondaryBio && <p>{portfolioOwner.secondaryBio}</p>}
          </div>
        </div>

        {/* Section: Impact & Achievements */}
        <div className="space-y-4 bg-[#f8fafd] border border-[#e5edf5] p-6 rounded-[4px]">
          <h2 className="text-[13px] font-medium uppercase tracking-wider text-[#533afd] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#533afd]" />
            <span>Impacto y logros</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {IMPACT_ACHIEVEMENTS.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-[14px] text-[#061b31]">
                <CheckCircle2 className="w-4 h-4 text-[#533afd] shrink-0 mt-0.5" />
                <span className="font-light leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Experience (Primary - One block per Company Tab in Excel) */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-[13px] font-medium uppercase tracking-wider text-[#533afd]">
              Experiencia ({visibleExperiences.length} empresas)
            </h2>
          </div>

          <div className="space-y-8">
            {visibleExperiences.map((exp) => (
              <div key={exp.id} className="space-y-3 border-l-2 border-[#e5edf5] pl-5 -ml-5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="text-[16px] font-normal text-[#061b31]">
                    {exp.role} <span className="text-[#533afd]">| {exp.company}</span>
                  </div>
                  <div className="text-[12px] text-[#64748d] tabular-nums">
                    {exp.period} {exp.type === 'Proyecto independiente' ? '(Proyecto independiente)' : ''}
                  </div>
                </div>

                {exp.description && (
                  <p className="text-[13px] text-[#50617a] font-light leading-relaxed">
                    {exp.description}
                  </p>
                )}

                {/* Bullet Points from CV / Excel Achievements */}
                <div className="space-y-1.5 pt-1">
                  {exp.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[13px] text-[#50617a] font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#533afd] shrink-0 mt-1.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Skills tags */}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 bg-[#f8fafd] text-[#061b31] border border-[#e5edf5] text-[11px] rounded-[2px]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section: Previous Experience */}
        {previousExperiences && previousExperiences.length > 0 && (
          <div className="space-y-6 border-t border-[#e5edf5] pt-8">
            <h2 className="text-[13px] font-medium uppercase tracking-wider text-[#533afd] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#533afd]" />
              <span>Experiencia anterior</span>
            </h2>

            <div className="space-y-5">
              {previousExperiences.map((prev, idx) => (
                <div key={idx} className="space-y-1 text-[13px]">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="font-normal text-[#061b31]">
                      {prev.company} <span className="text-[#64748d]">— {prev.role}</span>
                    </span>
                    <span className="text-[12px] text-[#64748d] tabular-nums">{prev.period}</span>
                  </div>
                  <p className="text-[#50617a] font-light leading-relaxed">
                    {prev.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section: Skills & Competencies */}
        <div className="space-y-4 border-t border-[#e5edf5] pt-8">
          <h2 className="text-[13px] font-medium uppercase tracking-wider text-[#533afd]">
            Habilidades y conocimientos
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="p-4 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] space-y-2">
                <div className="text-[13px] font-medium text-[#061b31]">{cat.title}</div>
                <div className="text-[13px] text-[#50617a] font-light leading-relaxed">
                  {cat.items.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Formación Académica */}
        <div className="space-y-4 border-t border-[#e5edf5] pt-8">
          <h2 className="text-[13px] font-medium uppercase tracking-wider text-[#533afd] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#533afd]" />
            <span>Formación académica</span>
          </h2>

          <div className="space-y-3 text-[14px]">
            {education.map((edu, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[#e5edf5]/60 pb-2 last:border-0 last:pb-0">
                <div>
                  <span className="font-normal text-[#061b31]">{edu.degree}</span>
                  <span className="text-[#64748d] text-[13px]"> | {edu.institution}</span>
                </div>
                <span className="text-[12px] text-[#64748d] tabular-nums">{edu.period}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Cursos y Especialización */}
        <div className="space-y-4 border-t border-[#e5edf5] pt-8">
          <h2 className="text-[13px] font-medium uppercase tracking-wider text-[#533afd] flex items-center gap-2">
            <Award className="w-4 h-4 text-[#533afd]" />
            <span>Cursos y especialización</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px]">
            {courses.map((course, idx) => (
              <div key={idx} className="p-2.5 bg-[#f8fafd] border border-[#e5edf5] rounded-[3px] flex items-baseline justify-between gap-2">
                <div>
                  <span className="text-[#061b31] font-light">{course.title}</span>
                  <span className="text-[#64748d] text-[11px] block">{course.institution}</span>
                </div>
                <span className="text-[11px] text-[#533afd] font-medium tabular-nums shrink-0">
                  {course.year}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Idiomas */}
        <div className="space-y-3 border-t border-[#e5edf5] pt-8">
          <h2 className="text-[13px] font-medium uppercase tracking-wider text-[#533afd] flex items-center gap-2">
            <Languages className="w-4 h-4 text-[#533afd]" />
            <span>Idiomas</span>
          </h2>

          <div className="flex flex-wrap gap-4 text-[13px]">
            {languages.map((lang, idx) => (
              <div key={idx} className="px-3.5 py-1.5 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] flex items-center gap-2">
                <span className="font-normal text-[#061b31]">{lang.language}:</span>
                <span className="text-[#533afd] font-light">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Conversion Step: Flow step 2 -> step 3 / step 4 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] max-w-4xl mx-auto w-full">
        <div className="text-[14px] text-[#061b31]">
          ¿Quieres conocer mi trabajo en detalle?
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('projects')}
            className="px-4 py-2 bg-white hover:bg-[#e5edf5] text-[#061b31] border border-[#e5edf5] rounded-[4px] text-[13px] font-normal transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FolderKanban className="w-3.5 h-3.5 text-[#533afd]" />
            <span>Ver casos de estudio</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#533afd] hover:bg-[#7389ff] text-white rounded-[4px] text-[13px] font-normal transition-colors flex items-center gap-1.5 shadow-none"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contactar por WhatsApp</span>
            <ArrowUpRight className="w-3 h-3 -ml-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
