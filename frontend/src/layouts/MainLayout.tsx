import React from 'react';
import { Navbar, Footer } from '../components';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0A1931] text-[#F6FAFD] flex flex-col font-sans selection:bg-[#4A7FA7] selection:text-[#F6FAFD]">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};
