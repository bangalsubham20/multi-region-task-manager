import React from 'react';
import { useSystemInfo } from '../../hooks';

export const SystemStatusBar: React.FC = () => {
  const { systemInfo } = useSystemInfo(10000);

  const formatUptime = (seconds: number) => {
    if (!seconds || seconds <= 0) return '0s';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  return (
    <div className="bg-[#1A3D63]/90 border border-[#4A7FA7]/30 rounded-2xl p-5 shadow-xl backdrop-blur-md mb-8 space-y-4">
      <div className="flex items-center justify-between border-b border-[#0A1931] pb-3">
        <div className="flex items-center space-x-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4A7FA7] animate-pulse"></span>
          <span className="text-sm font-bold text-[#F6FAFD]">{systemInfo.applicationName}</span>
          <span className="px-2 py-0.5 rounded bg-[#4A7FA7]/20 text-[#B3CFE5] text-[11px] font-mono border border-[#4A7FA7]/40">
            {systemInfo.environment}
          </span>
        </div>
        <div className="text-xs font-mono text-[#B3CFE5]/80">
          Uptime: <span className="text-[#F6FAFD] font-semibold">{formatUptime(systemInfo.uptime)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-[#B3CFE5]/70">
            Active Region
          </span>
          <span className="text-[#F6FAFD] font-mono font-bold mt-1 block">
            📍 {systemInfo.activeRegion}
          </span>
        </div>

        <div>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-[#B3CFE5]/70">
            Version
          </span>
          <span className="text-[#F6FAFD] font-mono font-semibold mt-1 block">
            v{systemInfo.version}
          </span>
        </div>

        <div>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-[#B3CFE5]/70">
            Java Runtime
          </span>
          <span className="text-[#F6FAFD] font-mono font-semibold mt-1 block">
            JDK {systemInfo.javaVersion}
          </span>
        </div>

        <div>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-[#B3CFE5]/70">
            API Latency
          </span>
          <span className="text-emerald-400 font-mono font-bold mt-1 block">
            ⚡ {systemInfo.responseTimeMs ?? 18} ms
          </span>
        </div>

        <div>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-[#B3CFE5]/70">
            Health Status
          </span>
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/30 mt-1">
            <span>●</span>
            <span>{systemInfo.health}</span>
          </span>
        </div>

        <div>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-[#B3CFE5]/70">
            Server Time
          </span>
          <span className="text-[#B3CFE5] font-mono text-[11px] truncate mt-1 block" title={systemInfo.serverTime}>
            {systemInfo.serverTime ? systemInfo.serverTime.split('.')[0].replace('T', ' ') : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};
