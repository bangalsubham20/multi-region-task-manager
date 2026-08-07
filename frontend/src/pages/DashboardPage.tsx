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
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-purple-900/60 p-8 border border-indigo-500/20 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-4">
            <span>✨ Global Distribution Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Multi-Region Workload Dashboard
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Monitor active tasks across all deployment zones. Task states are replicated asynchronously to ensure low latency and automated failover resiliency.
          </p>
          <div className="mt-6 flex items-center space-x-4">
            <button
              onClick={handleOpenCreate}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
            >
              + Create Task
            </button>
            <Link
              to="/tasks"
              className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-all"
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-100">Recent Workloads</h2>
            <p className="text-xs text-slate-400">Tasks active in the current synchronization queue</p>
          </div>
          <Link to="/tasks" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-sm text-center">
            {error}
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">No tasks found in current region.</p>
            <button
              onClick={handleOpenCreate}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl"
            >
              Add First Task
            </button>
          </div>
        ) : (
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
