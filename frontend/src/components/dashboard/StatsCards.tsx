import React, { useEffect, useState } from 'react';
import type { Task, TaskMetrics } from '../../types';
import { systemService } from '../../services/systemService';

interface StatsCardsProps {
  tasks: Task[];
  totalElements?: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ tasks, totalElements = 0 }) => {
  const [metrics, setMetrics] = useState<TaskMetrics | null>(null);

  useEffect(() => {
    systemService.getTaskMetrics().then((m) => setMetrics(m));
  }, [tasks]);

  const total = metrics ? metrics.totalTasks : (totalElements || tasks.length);
  const pending = metrics ? metrics.todo : tasks.filter((t) => t.status === 'PENDING').length;
  const inProgress = metrics ? metrics.inProgress : tasks.filter((t) => t.status === 'IN_PROGRESS').length;
  const completed = metrics ? metrics.completed : tasks.filter((t) => t.status === 'COMPLETED').length;
  const highPriority = metrics ? metrics.highPriority : tasks.filter((t) => t.priority === 'HIGH' || t.priority === 'URGENT').length;

  const stats = [
    { label: 'Total Tasks', value: total, color: 'from-[#1A3D63] to-[#0A1931] border-[#4A7FA7]/40 text-[#B3CFE5]' },
    { label: 'Pending (Todo)', value: pending, color: 'from-[#1A3D63] to-[#0A1931] border-amber-500/30 text-amber-300' },
    { label: 'In Progress', value: inProgress, color: 'from-[#1A3D63] to-[#0A1931] border-[#4A7FA7]/60 text-[#B3CFE5]' },
    { label: 'Completed', value: completed, color: 'from-[#1A3D63] to-[#0A1931] border-emerald-500/30 text-emerald-300' },
    { label: 'High Priority', value: highPriority, color: 'from-[#1A3D63] to-[#0A1931] border-rose-500/30 text-rose-300' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-br border ${stat.color} backdrop-blur-md shadow-lg transition-all duration-200 hover:-translate-y-0.5`}
        >
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#B3CFE5]/80 truncate">{stat.label}</p>
          <p className="text-2xl sm:text-3xl font-extrabold mt-1.5 sm:mt-2 text-[#F6FAFD] font-mono">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};
