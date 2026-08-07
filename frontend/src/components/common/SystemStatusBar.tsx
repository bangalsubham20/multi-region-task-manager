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
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md mb-8 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center space-x-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-sm font-bold text-slate-100">{systemInfo.applicationName}</span>
          <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[11px] font-mono border border-indigo-500/30">
            {systemInfo.environment}
          </span>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Uptime: <span className="text-slate-200 font-semibold">{formatUptime(systemInfo.uptime)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Active Region
          </span>
          <span className="text-slate-200 font-mono font-bold mt-1 block">
            📍 {systemInfo.activeRegion}
          </span>
        </div>

        <div>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Version
          </span>
          <span className="text-slate-200 font-mono font-semibold mt-1 block">
            v{systemInfo.version}
          </span>
        </div>

        <div>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Java Runtime
          </span>
          <span className="text-slate-200 font-mono font-semibold mt-1 block">
            JDK {systemInfo.javaVersion}
          </span>
        </div>

        <div>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
            API Latency
          </span>
          <span className="text-emerald-400 font-mono font-bold mt-1 block">
            ⚡ {systemInfo.responseTimeMs ?? 18} ms
          </span>
        </div>

        <div>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Health Status
          </span>
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/30 mt-1">
            <span>●</span>
            <span>{systemInfo.health}</span>
          </span>
        </div>

        <div>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Server Time
          </span>
          <span className="text-slate-400 font-mono text-[11px] truncate mt-1 block" title={systemInfo.serverTime}>
            {systemInfo.serverTime ? systemInfo.serverTime.split('.')[0].replace('T', ' ') : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};
