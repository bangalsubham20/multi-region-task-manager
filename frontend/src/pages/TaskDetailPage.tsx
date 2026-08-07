import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { taskService } from '../services/taskService';
import type { Task } from '../types';

import { formatDate, formatDateTime } from '../utils/formatters';
import { STATUS_COLORS, PRIORITY_COLORS } from '../utils/constants';

export const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    taskService
      .getTaskById(Number(id))
      .then((res) => {
        if (res.data) setTask(res.data);
      })
      .catch((err) => setError(err.message || 'Failed to load task details'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
        <p className="text-rose-400 text-sm mb-4">{error || 'Task not found'}</p>
        <Link to="/tasks" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">
          ← Back to Task Console
        </Link>
      </div>
    );
  }

  const statusStyle = STATUS_COLORS[task.status];
  const priorityStyle = PRIORITY_COLORS[task.priority];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link to="/tasks" className="inline-flex items-center text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
        ← Back to Task Console
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs font-mono text-slate-500">TASK-#{task.id}</span>
            <h1 className="text-2xl font-extrabold text-white mt-1">{task.title}</h1>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
              {task.status}
            </span>
            <span className={`px-3 py-1 rounded-md text-xs font-mono font-semibold ${priorityStyle.bg} ${priorityStyle.text}`}>
              {task.priority}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Description</h3>
          <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
            {task.description || 'No description provided for this task.'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div>
            <span className="block text-slate-500 font-medium">Due Date</span>
            <span className="text-slate-200 font-semibold mt-1 block">{formatDate(task.dueDate)}</span>
          </div>
          <div>
            <span className="block text-slate-500 font-medium">Created At</span>
            <span className="text-slate-200 font-semibold mt-1 block">{formatDateTime(task.createdAt)}</span>
          </div>
          <div>
            <span className="block text-slate-500 font-medium">Last Updated</span>
            <span className="text-slate-200 font-semibold mt-1 block">{formatDateTime(task.updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
