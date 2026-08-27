import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../hooks';
import { StatsCards, TaskCard, TaskModal, SystemStatusBar } from '../components';
import type { Task, TaskRequest } from '../types';



export const DashboardPage: React.FC = () => {
  const { tasks, pageInfo, loading, error, createTask, updateTask, deleteTask } = useTasks({ page: 0, size: 6 });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

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
    <div className="space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0A1931] via-[#1A3D63] to-[#0A1931] p-5 sm:p-8 border border-[#4A7FA7]/30 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#4A7FA7]/20 border border-[#4A7FA7]/40 text-[#B3CFE5] text-[11px] sm:text-xs font-semibold mb-3 sm:mb-4">
            <span>✨ Global Distribution Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F6FAFD] tracking-tight">
            Multi-Region Workload Dashboard
          </h1>
          <p className="mt-2 sm:mt-3 text-[#B3CFE5] text-xs sm:text-sm md:text-base leading-relaxed">
            Monitor active tasks across all deployment zones. Task states are replicated asynchronously to ensure low latency and automated failover resiliency.
          </p>
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <button
              onClick={handleOpenCreate}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#4A7FA7] hover:bg-[#3b6a8e] text-[#F6FAFD] text-sm font-semibold shadow-lg shadow-[#4A7FA7]/30 transition-all hover:scale-[1.02] text-center"
            >
              + Create Task
            </button>
            <Link
              to="/tasks"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#1A3D63] hover:bg-[#0A1931] text-[#F6FAFD] text-sm font-semibold border border-[#4A7FA7]/40 transition-all text-center"
            >
              View Console
            </Link>
          </div>
        </div>
      </div>

      {/* System Live Metrics Bar */}
      <SystemStatusBar />

      {/* Metrics Cards */}
      <StatsCards tasks={tasks} totalElements={pageInfo.totalElements} />

      {/* Recent Tasks Grid */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#F6FAFD]">Recent Workloads</h2>
            <p className="text-xs text-[#B3CFE5]">Tasks active in the current synchronization queue</p>
          </div>
          <Link to="/tasks" className="text-xs font-semibold text-[#4A7FA7] hover:text-[#B3CFE5]">
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-[#4A7FA7] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-300 text-sm text-center">
            {error}
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12 bg-[#1A3D63]/40 rounded-2xl border border-[#4A7FA7]/20 px-4">
            <p className="text-[#B3CFE5] text-sm">No tasks found in current region.</p>
            <button
              onClick={handleOpenCreate}
              className="mt-4 px-4 py-2 bg-[#4A7FA7] text-[#F6FAFD] text-xs font-semibold rounded-xl hover:bg-[#3b6a8e] transition-colors"
            >
              Add First Task
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleOpenEdit}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </div>

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
