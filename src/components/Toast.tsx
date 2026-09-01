import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="bg-[#061b31] text-white px-4 py-3 rounded-[4px] shadow-lg flex items-center gap-3 text-[13px] border border-[#182659]">
        <CheckCircle2 className="w-4 h-4 text-[#7389ff] shrink-0" />
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
