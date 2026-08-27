import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { REGIONS } from '../../utils/constants';
import type { Region } from '../../types';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [selectedRegion, setSelectedRegion] = useState<Region>(REGIONS[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Task Console', path: '/tasks' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#1A3D63]/95 backdrop-blur-md border-b border-[#4A7FA7]/30 text-[#F6FAFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center space-x-4 sm:space-x-8">
          <Link to="/" className="flex items-center space-x-2.5 sm:space-x-3 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#0A1931] via-[#1A3D63] to-[#4A7FA7] border border-[#4A7FA7]/40 flex items-center justify-center shadow-lg shadow-[#4A7FA7]/20 group-hover:scale-105 transition-transform shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#F6FAFD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-base sm:text-lg tracking-tight bg-gradient-to-r from-[#F6FAFD] via-[#B3CFE5] to-[#4A7FA7] bg-clip-text text-transparent">
                TaskRegion
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-mono px-2 py-0.5 rounded bg-[#4A7FA7]/20 text-[#B3CFE5] border border-[#4A7FA7]/40">
                Active-Active
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#4A7FA7] text-[#F6FAFD] shadow-md shadow-[#4A7FA7]/25'
                      : 'text-[#B3CFE5] hover:text-[#F6FAFD] hover:bg-[#0A1931]/60'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Region Switcher & Mobile Menu Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="relative group">
            <button className="flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#0A1931] border border-[#4A7FA7]/40 text-xs font-medium text-[#F6FAFD] hover:border-[#4A7FA7] transition-colors">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              <span className="truncate max-w-[100px] sm:max-w-none">{selectedRegion.flag} {selectedRegion.name}</span>
              <span className="hidden sm:inline text-[#B3CFE5]/70 font-mono text-[11px]">({selectedRegion.ping})</span>
            </button>

            {/* Region Select Dropdown */}
            <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-[#1A3D63] border border-[#4A7FA7]/40 rounded-xl shadow-2xl py-2 hidden group-hover:block z-50">
              <div className="px-3 py-1 text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#B3CFE5]/80 uppercase border-b border-[#0A1931] mb-1">
                Target Execution Zone
              </div>
              {REGIONS.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region)}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#0A1931]/50 transition-colors ${
                    selectedRegion.id === region.id ? 'bg-[#4A7FA7]/30 text-[#F6FAFD] font-semibold' : 'text-[#B3CFE5]'
                  }`}
                >
                  <span className="flex items-center space-x-2 truncate">
                    <span>{region.flag}</span>
                    <span className="truncate">{region.name}</span>
                  </span>
                  <span className="font-mono text-emerald-400 text-[10px] ml-2 shrink-0">{region.ping}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#B3CFE5] hover:text-[#F6FAFD] hover:bg-[#0A1931]/60 focus:outline-none transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#4A7FA7]/20 bg-[#0A1931]/95 px-4 pt-3 pb-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#4A7FA7] text-[#F6FAFD] shadow-md'
                    : 'text-[#B3CFE5] hover:text-[#F6FAFD] hover:bg-[#1A3D63]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};

