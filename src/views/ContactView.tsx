import React, { useState } from 'react';
import { MessageSquare, Copy, Check, ArrowUpRight, Send, Globe } from 'lucide-react';
import { AppView } from '../types';
import { usePortfolioData } from '../context/PortfolioDataContext';

interface ContactViewProps {
  onNavigate?: (view: AppView) => void;
  onShowToast: (msg: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onShowToast }) => {
  const { portfolioOwner } = usePortfolioData();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [senderName, setSenderName] = useState('');

  const cleanPhone = portfolioOwner.phone.replace(/\s+/g, '').replace('+', '');
  const baseWhatsappUrl = `https://wa.me/${cleanPhone}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioOwner.email);
    setCopiedEmail(true);
    onShowToast('Email copiado al portapapeles: ' + portfolioOwner.email);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(portfolioOwner.phone);
    setCopiedPhone(true);
    onShowToast('Teléfono copiado al portapapeles: ' + portfolioOwner.phone);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSendCustomWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();
    const textToSend = customMessage.trim()
      ? `Hola Carlos, soy ${senderName || 'un reclutador / lead UX'}. ${customMessage}`
      : `Hola Carlos, he visto tu portafolio y me gustaría conversar sobre una oportunidad.`;
    
    const finalUrl = `${baseWhatsappUrl}?text=${encodeURIComponent(textToSend)}`;
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
    onShowToast('Abriendo conversación en WhatsApp...');
  };

  return (
    <div className="flex flex-col gap-12 py-8 md:py-16 max-w-4xl mx-auto w-full animate-in fade-in duration-200">
      {/* Header & Section Title */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#e8e9ff] text-[#533afd] text-[12px] font-normal rounded-full border border-[#b9b9f9]/40">
          <span className="w-1.5 h-1.5 rounded-full bg-[#533afd] animate-pulse" />
          <span>{portfolioOwner.status}</span>
        </div>
        <h1 className="text-[38px] sm:text-[48px] font-light text-[#061b31] tracking-tight leading-[1.1]">
          Iniciemos una conversación
        </h1>
        <p className="text-[17px] sm:text-[19px] text-[#50617a] font-light leading-relaxed max-w-2xl">
          Estoy disponible para evaluar posiciones senior, liderar iniciativas de producto o colaborar como consultor en sistemas de diseño y optimización UX.
        </p>
      </div>

      {/* Main Conversion Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Direct Fast Channels */}
        <div className="space-y-6">
          {/* Primary WhatsApp Card */}
          <div className="p-6 bg-[#f8fafd] border-2 border-[#533afd] rounded-[4px] space-y-4 relative overflow-hidden">
            <div>
              <h2 className="text-[20px] font-normal text-[#061b31] mb-1">
                ¿Conversamos?
              </h2>
              <p className="text-[13px] text-[#50617a] font-light">
                Si buscas un Senior UX/UI Designer para tu equipo o necesitas apoyo en un proyecto digital, escríbeme directamente por WhatsApp.
              </p>
            </div>

            <a
              href={`${baseWhatsappUrl}?text=Hola%20Carlos,%20he%20visto%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#533afd] hover:bg-[#7389ff] text-white rounded-[4px] text-[14px] font-normal transition-colors flex items-center justify-center gap-2 shadow-none cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contactar ahora por WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Direct Phone Box */}
          <div className="p-5 bg-white border border-[#e5edf5] rounded-[4px] flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-[11px] text-[#64748d] uppercase tracking-wider font-medium">
                Teléfono Directo
              </div>
              <a
                href={`tel:${cleanPhone}`}
                className="text-[15px] font-normal text-[#061b31] hover:text-[#533afd] transition-colors"
              >
                {portfolioOwner.phone}
              </a>
            </div>

            <button
              onClick={handleCopyPhone}
              className="px-3 py-1.5 bg-[#f8fafd] hover:bg-[#e5edf5] text-[#061b31] border border-[#e5edf5] rounded-[4px] text-[12px] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copiar teléfono"
            >
              {copiedPhone ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#533afd]" />
                  <span className="text-[#533afd]">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#64748d]" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>

          {/* Direct Email Box */}
          <div className="p-5 bg-white border border-[#e5edf5] rounded-[4px] flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-[11px] text-[#64748d] uppercase tracking-wider font-medium">
                Correo Electrónico
              </div>
              <a
                href={`mailto:${portfolioOwner.email}`}
                className="text-[15px] font-normal text-[#061b31] hover:text-[#533afd] transition-colors"
              >
                {portfolioOwner.email}
              </a>
            </div>

            <button
              onClick={handleCopyEmail}
              className="px-3 py-1.5 bg-[#f8fafd] hover:bg-[#e5edf5] text-[#061b31] border border-[#e5edf5] rounded-[4px] text-[12px] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copiar email"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#533afd]" />
                  <span className="text-[#533afd]">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#64748d]" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>

          {/* Social Links */}
          <div className="p-5 bg-white border border-[#e5edf5] rounded-[4px] space-y-2">
            <div className="text-[11px] text-[#64748d] uppercase tracking-wider font-medium">
              Redes Profesionales
            </div>
            <div className="flex flex-wrap gap-4 text-[13px]">
              <a
                href={portfolioOwner.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#50617a] hover:text-[#533afd] flex items-center gap-1 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Custom Message Form -> Directly triggers WhatsApp */}
        <div className="p-6 sm:p-8 bg-white border border-[#e5edf5] rounded-[4px] space-y-6">
          <div className="space-y-1">
            <h2 className="text-[18px] font-normal text-[#061b31]">
              Enviar mensaje personalizado
            </h2>
            <p className="text-[13px] text-[#50617a] font-light">
              Escribe un resumen y se generará tu mensaje listo para enviar por WhatsApp.
            </p>
          </div>

          <form onSubmit={handleSendCustomWhatsapp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[12px] font-medium text-[#061b31]">
                Tu Nombre o Cargo
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Ej. Martín / Head of Design en ..."
                className="w-full px-3.5 py-2.5 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] text-[13px] text-[#061b31] focus:outline-none focus:border-[#533afd] placeholder-[#64748d]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[12px] font-medium text-[#061b31]">
                Mensaje o Breve Descripción
              </label>
              <textarea
                rows={4}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Hola Carlos, queremos conversar sobre un rol para liderar nuestro equipo de producto..."
                className="w-full px-3.5 py-2.5 bg-[#f8fafd] border border-[#e5edf5] rounded-[4px] text-[13px] text-[#061b31] focus:outline-none focus:border-[#533afd] placeholder-[#64748d] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#061b31] hover:bg-[#061b31]/90 text-white rounded-[4px] text-[13px] font-normal transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-[#e8e9ff]" />
              <span>Enviar mensaje por WhatsApp</span>
            </button>
          </form>

          <div className="pt-4 border-t border-[#e5edf5] text-[12px] text-[#64748d] text-center font-light">
            Ubicación: <span className="text-[#061b31]">{portfolioOwner.location}</span> · Horario flexible
          </div>
        </div>
      </div>
    </div>
  );
};
