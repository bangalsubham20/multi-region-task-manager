import React from 'react';
import type { Task } from '../../types';

import { STATUS_COLORS, PRIORITY_COLORS } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const statusStyle = STATUS_COLORS[task.status] || STATUS_COLORS.PENDING;
  const priorityStyle = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.MEDIUM;

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all shadow-md hover:shadow-lg flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
            {task.status.replace('_', ' ')}
          </span>
          <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium ${priorityStyle.bg} ${priorityStyle.text}`}>
            {task.priority}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-100 line-clamp-1">{task.title}</h3>
        {task.description && (
          <p className="text-sm text-slate-400 mt-1 line-clamp-2">{task.description}</p>
        )}
      </div>

      <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
        <div>
          <span>Due: </span>
          <span className="text-slate-300 font-medium">{formatDate(task.dueDate)}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
