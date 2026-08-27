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
    <div className="bg-[#1A3D63]/80 border border-[#4A7FA7]/30 rounded-2xl p-4 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search tasks by title..."
          value={title || ''}
          onChange={onSearchChange}
          className="flex-1 bg-[#0A1931] border border-[#4A7FA7]/40 rounded-xl px-4 py-2 text-[#F6FAFD] placeholder-[#B3CFE5]/40 focus:outline-none focus:border-[#4A7FA7] text-sm"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onStatusSelect(undefined)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              !selectedStatus ? 'bg-[#4A7FA7] text-[#F6FAFD]' : 'bg-[#0A1931] text-[#B3CFE5] hover:bg-[#4A7FA7]/30 hover:text-[#F6FAFD]'
            }`}
          >
            All Status
          </button>
          {(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] as TaskStatus[]).map((st) => (
            <button
              key={st}
              onClick={() => onStatusSelect(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedStatus === st ? 'bg-[#4A7FA7] text-[#F6FAFD]' : 'bg-[#0A1931] text-[#B3CFE5] hover:bg-[#4A7FA7]/30 hover:text-[#F6FAFD]'
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
