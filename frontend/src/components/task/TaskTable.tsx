import React from 'react';
import type { Task } from '../../types';

import { STATUS_COLORS, PRIORITY_COLORS } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export const TaskTable: React.FC<TaskTableProps> = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="bg-slate-900 border-b border-slate-800 text-xs uppercase font-semibold text-slate-400">
          <tr>
            <th className="px-6 py-4">Task Title</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Priority</th>
            <th className="px-6 py-4">Due Date</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {tasks.map((task) => {
            const statusStyle = STATUS_COLORS[task.status] || STATUS_COLORS.PENDING;
            const priorityStyle = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.MEDIUM;

            return (
              <tr key={task.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-100">{task.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium ${priorityStyle.bg} ${priorityStyle.text}`}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs font-mono text-slate-400">{formatDate(task.dueDate)}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => onEdit(task)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
