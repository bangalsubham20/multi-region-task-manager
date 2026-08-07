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
    { label: 'Total Tasks', value: total, color: 'from-blue-500/20 to-indigo-500/10 border-indigo-500/30 text-indigo-400' },
    { label: 'Pending (Todo)', value: pending, color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400' },
    { label: 'In Progress', value: inProgress, color: 'from-sky-500/20 to-cyan-500/10 border-sky-500/30 text-sky-400' },
    { label: 'Completed', value: completed, color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400' },
    { label: 'High Priority', value: highPriority, color: 'from-rose-500/20 to-red-500/10 border-rose-500/30 text-rose-400' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`p-5 rounded-2xl bg-gradient-to-br border ${stat.color} backdrop-blur-md shadow-lg transition-all duration-200 hover:-translate-y-0.5`}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{stat.label}</p>
          <p className="text-3xl font-extrabold mt-2 text-white font-mono">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};
