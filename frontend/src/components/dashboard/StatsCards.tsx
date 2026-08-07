import React from 'react';
import type { Task } from '../../types';


interface StatsCardsProps {
  tasks: Task[];
  totalElements?: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ tasks, totalElements = 0 }) => {
  const total = totalElements || tasks.length;
  const pending = tasks.filter((t) => t.status === 'PENDING').length;
  const inProgress = tasks.filter((t) => t.status === 'IN_PROGRESS').length;
  const completed = tasks.filter((t) => t.status === 'COMPLETED').length;

  const stats = [
    { label: 'Total Tasks', value: total, color: 'from-blue-500/20 to-indigo-500/10 border-indigo-500/30 text-indigo-400' },
    { label: 'Pending', value: pending, color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400' },
    { label: 'In Progress', value: inProgress, color: 'from-sky-500/20 to-cyan-500/10 border-sky-500/30 text-sky-400' },
    { label: 'Completed', value: completed, color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
