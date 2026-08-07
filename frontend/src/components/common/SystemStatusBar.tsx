import React, { useState } from 'react';
import { useSystemStatus } from '../../hooks';
import { REGIONS } from '../../utils/constants';
import type { Region } from '../../types';

export const SystemStatusBar: React.FC = () => {
  const { systemStatus, refreshStatus } = useSystemStatus(10000);
  const [selectedRegion, setSelectedRegion] = useState<Region>(REGIONS[0]); // Mumbai default

  const handleRegionSwitch = (region: Region) => {
    setSelectedRegion(region);
    refreshStatus();
  };

  const responseTime = systemStatus.responseTimeMs ?? parseInt(selectedRegion.ping, 10) ?? 24;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-md mb-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
        
        {/* 1. Region Indicator (Mumbai / Frankfurt selector) */}
        <div className="col-span-2 md:col-span-1 border-r-0 md:border-r border-slate-800 pr-0 md:pr-4">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Target Region
          </label>
          <div className="relative">
            <select
              value={selectedRegion.id}
              onChange={(e) => {
                const target = REGIONS.find((r) => r.id === e.target.value);
                if (target) handleRegionSwitch(target);
              }}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="ap-south-1">🇮🇳 Mumbai (ap-south-1)</option>
              <option value="eu-central-1">🇩🇪 Frankfurt (eu-central-1)</option>
              <option value="us-east-1">🇺🇸 N. Virginia (us-east-1)</option>
              <option value="ap-northeast-1">🇯🇵 Tokyo (ap-northeast-1)</option>
            </select>
          </div>
        </div>

        {/* 2. Active Deployment Region */}
        <div className="border-r-0 md:border-r border-slate-800 pr-0 md:pr-4">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Deployment Region
          </span>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-sm font-semibold text-slate-100">{systemStatus.region}</span>
          </div>
        </div>

        {/* 3. API Response Time */}
        <div className="border-r-0 md:border-r border-slate-800 pr-0 md:pr-4">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
            API Response Time
          </span>
          <div className="flex items-center space-x-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-sm font-mono font-bold text-emerald-400">{responseTime} ms</span>
          </div>
        </div>

        {/* 4. Backend Version */}
        <div className="border-r-0 md:border-r border-slate-800 pr-0 md:pr-4">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Backend Version
          </span>
          <div className="mt-1">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-mono font-medium border border-indigo-500/30">
              {systemStatus.version}
            </span>
          </div>
        </div>

        {/* 5. Health Status */}
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Health Status
          </span>
          <div className="flex items-center space-x-2 mt-1">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{systemStatus.status}</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
