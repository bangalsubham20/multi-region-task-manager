import React from 'react';
import type { TaskStatus, Priority } from '../../types';


interface TaskFiltersProps {
  title?: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedStatus?: TaskStatus;
  onStatusSelect: (status?: TaskStatus) => void;
  selectedPriority?: Priority;
  onPrioritySelect: (priority?: Priority) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  title,
  onSearchChange,
  selectedStatus,
  onStatusSelect,
}) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search tasks by title..."
          value={title || ''}
          onChange={onSearchChange}
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onStatusSelect(undefined)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              !selectedStatus ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            All Status
          </button>
          {(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] as TaskStatus[]).map((st) => (
            <button
              key={st}
              onClick={() => onStatusSelect(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedStatus === st ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
