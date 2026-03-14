import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const SlideOver: React.FC<SlideOverProps> = ({ isOpen, onClose, title, children, footer }) => {
  const [isRendered, setIsRendered] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setIsRendered(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setIsRendered(false);
  };

  if (!isRendered) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div 
          className={`w-screen max-w-md transform transition duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onTransitionEnd={handleAnimationEnd}
        >
          <div className="flex h-full flex-col bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-800">{title}</h2>
              <button 
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="relative flex-1 px-6 py-6 overflow-y-auto">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="flex flex-shrink-0 justify-end px-6 py-4 border-t border-slate-100 bg-slate-50">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
