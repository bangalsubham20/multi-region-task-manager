import React, { useState } from 'react';
import { useTasks } from '../hooks';
import { TaskCard, TaskModal, TaskFilters } from '../components';
import type { Task, TaskRequest, TaskStatus, Priority } from '../types';


export const TaskListPage: React.FC = () => {
  const { tasks, pageInfo, loading, error, params, setParams, createTask, updateTask, deleteTask } = useTasks({
    page: 0,
    size: 9,
    sortBy: 'id',
    sortDir: 'desc',
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setParams((prev) => ({ ...prev, title: val, page: 0 }));
  };

  const handleStatusFilter = (status?: TaskStatus) => {
    setParams((prev) => ({ ...prev, status, page: 0 }));
  };

  const handlePriorityFilter = (priority?: Priority) => {
    setParams((prev) => ({ ...prev, priority, page: 0 }));
  };

  const handlePageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const handleOpenCreate = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleSubmitModal = async (data: TaskRequest) => {
    if (editingTask) {
      await updateTask(editingTask.id, data);
    } else {
      await createTask(data);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Task Console</h1>
          <p className="text-xs text-slate-400">Search, filter, and orchestrate regional tasks</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
        >
          + Add New Task
        </button>
      </div>

      {/* Filter Component */}
      <TaskFilters
        title={params.title}
        onSearchChange={handleSearchChange}
        selectedStatus={params.status}
        onStatusSelect={handleStatusFilter}
        selectedPriority={params.priority}
        onPrioritySelect={handlePriorityFilter}
      />

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-sm text-center">
          {error}
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-sm">No tasks match the filter criteria.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleOpenEdit}
                onDelete={deleteTask}
              />
            ))}
          </div>

          {/* Pagination */}
          {pageInfo.totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
              <div>
                Page <span className="font-semibold text-white">{pageInfo.number + 1}</span> of{' '}
                <span className="font-semibold text-white">{pageInfo.totalPages}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  disabled={pageInfo.first}
                  onClick={() => handlePageChange(pageInfo.number - 1)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  disabled={pageInfo.last}
                  onClick={() => handlePageChange(pageInfo.number + 1)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal */}
      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitModal}
        initialTask={editingTask}
      />
    </div>
  );
};
