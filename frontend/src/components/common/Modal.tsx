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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1931]/80 backdrop-blur-sm">
      <div className="bg-[#1A3D63] border border-[#4A7FA7]/40 rounded-2xl w-full max-w-lg shadow-2xl p-6 relative">
        <div className="flex items-center justify-between pb-4 border-b border-[#0A1931] mb-4">
          <h2 className="text-xl font-bold text-[#F6FAFD]">{title}</h2>
          <button
            onClick={onClose}
            className="text-[#B3CFE5] hover:text-[#F6FAFD] transition-colors"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
