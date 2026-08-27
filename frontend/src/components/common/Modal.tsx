import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0A1931]/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#1A3D63] border border-[#4A7FA7]/40 rounded-2xl w-full max-w-lg shadow-2xl p-4 sm:p-6 relative max-h-[90vh] flex flex-col my-auto">
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#0A1931] mb-4 shrink-0">
          <h2 className="text-lg sm:text-xl font-bold text-[#F6FAFD]">{title}</h2>
          <button
            onClick={onClose}
            className="text-[#B3CFE5] hover:text-[#F6FAFD] transition-colors p-1 rounded-lg hover:bg-[#0A1931]"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto flex-1 pr-1">
          {children}
        </div>
      </div>
    </div>
  );
};
