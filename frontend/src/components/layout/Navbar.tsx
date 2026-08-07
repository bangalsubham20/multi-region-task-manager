import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { REGIONS } from '../../utils/constants';
import type { Region } from '../../types';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [selectedRegion, setSelectedRegion] = useState<Region>(REGIONS[0]);


  const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Task Console', path: '/tasks' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                TaskRegion
              </span>
              <span className="ml-2 text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Active-Active
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Region Switcher & System Status */}
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <button className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-medium hover:border-slate-600 transition-colors">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{selectedRegion.flag} {selectedRegion.name}</span>
              <span className="text-slate-500 font-mono">({selectedRegion.ping})</span>
            </button>

            {/* Region Select Dropdown */}
            <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-2 hidden group-hover:block z-50">
              <div className="px-3 py-1 text-[11px] font-semibold tracking-wider text-slate-400 uppercase border-b border-slate-700/50 mb-1">
                Target Execution Zone
              </div>
              {REGIONS.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region)}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-700/50 transition-colors ${
                    selectedRegion.id === region.id ? 'bg-indigo-600/20 text-indigo-300 font-semibold' : 'text-slate-300'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{region.flag}</span>
                    <span>{region.name}</span>
                  </span>
                  <span className="font-mono text-emerald-400 text-[10px]">{region.ping}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
