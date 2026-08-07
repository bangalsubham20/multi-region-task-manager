import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 py-6 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="text-slate-300 font-medium">Multi-Region Synchronization Active</span>
        </div>
        <div className="text-xs text-slate-500">
          Built with Spring Boot 3 & React 19 • Geographic Task Orchestration Engine
        </div>
      </div>
    </footer>
  );
};
