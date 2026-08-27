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
    <div className="bg-[#1A3D63]/70 border border-[#4A7FA7]/30 rounded-2xl p-5 hover:border-[#4A7FA7] transition-all shadow-md hover:shadow-xl flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
            {task.status.replace('_', ' ')}
          </span>
          <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium ${priorityStyle.bg} ${priorityStyle.text}`}>
            {task.priority}
          </span>
        </div>

        <h3 className="text-lg font-bold text-[#F6FAFD] line-clamp-1">{task.title}</h3>
        {task.description && (
          <p className="text-sm text-[#B3CFE5] mt-1 line-clamp-2">{task.description}</p>
        )}
      </div>

      <div className="pt-4 border-t border-[#0A1931] flex items-center justify-between text-xs text-[#B3CFE5]/70">
        <div>
          <span>Due: </span>
          <span className="text-[#F6FAFD] font-medium">{formatDate(task.dueDate)}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="px-2.5 py-1 rounded-lg bg-[#0A1931] text-[#B3CFE5] hover:text-[#F6FAFD] hover:bg-[#4A7FA7] transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
