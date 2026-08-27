import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A1931] border-t border-[#1A3D63] text-[#B3CFE5] py-6 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#4A7FA7]"></span>
          <span className="text-[#F6FAFD] font-medium">Multi-Region Synchronization Active</span>
        </div>
        <div className="text-xs text-[#B3CFE5]/70">
          Built with Spring Boot 3 & React 19 • Geographic Task Orchestration Engine
        </div>
      </div>
    </footer>
  );
};
