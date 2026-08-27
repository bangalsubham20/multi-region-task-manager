import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-20 space-y-4">
      <h1 className="text-6xl font-extrabold text-[#4A7FA7] font-mono">404</h1>
      <h2 className="text-2xl font-bold text-[#F6FAFD]">Page Not Found</h2>
      <p className="text-[#B3CFE5] text-sm max-w-md mx-auto">
        The requested routing zone or task resource does not exist in this regional node.
      </p>
      <div className="pt-4">
        <Link
          to="/"
          className="px-5 py-2.5 bg-[#4A7FA7] hover:bg-[#3b6a8e] text-[#F6FAFD] text-xs font-semibold rounded-xl transition-all shadow-lg shadow-[#4A7FA7]/30"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};
