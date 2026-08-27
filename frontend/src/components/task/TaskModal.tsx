import React, { useState, useEffect } from 'react';
import type { Task, TaskRequest, TaskStatus, Priority } from '../../types';


interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskRequest) => Promise<void>;
  initialTask?: Task | null;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialTask,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('PENDING');
  const [priority, setPriority] = useState<Priority>('MEDIUM');
  const [dueDate, setDueDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || '');
      setStatus(initialTask.status);
      setPriority(initialTask.priority);
      setDueDate(initialTask.dueDate || '');
    } else {
      setTitle('');
      setDescription('');
      setStatus('PENDING');
      setPriority('MEDIUM');
      setDueDate('');
    }
  }, [initialTask, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
        status,
        priority,
        dueDate: dueDate || undefined,
      });
      onClose();
    } catch {
      // Handled by parent hook
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1931]/80 backdrop-blur-sm">
      <div className="bg-[#1A3D63] border border-[#4A7FA7]/40 rounded-2xl w-full max-w-lg shadow-2xl p-6 relative">
        <h2 className="text-xl font-bold text-[#F6FAFD] mb-4">
          {initialTask ? 'Edit Task' : 'Create Multi-Region Task'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#B3CFE5] mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Deploy Redis Multi-Region Sentinel"
              className="w-full bg-[#0A1931] border border-[#4A7FA7]/40 rounded-xl px-4 py-2 text-[#F6FAFD] placeholder-[#B3CFE5]/40 focus:outline-none focus:border-[#4A7FA7] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#B3CFE5] mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task context, instructions, or region specifications..."
              className="w-full bg-[#0A1931] border border-[#4A7FA7]/40 rounded-xl px-4 py-2 text-[#F6FAFD] placeholder-[#B3CFE5]/40 focus:outline-none focus:border-[#4A7FA7] text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#B3CFE5] mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full bg-[#0A1931] border border-[#4A7FA7]/40 rounded-xl px-3 py-2 text-[#F6FAFD] focus:outline-none focus:border-[#4A7FA7] text-sm"
              >
                <option value="PENDING">PENDING</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#B3CFE5] mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full bg-[#0A1931] border border-[#4A7FA7]/40 rounded-xl px-3 py-2 text-[#F6FAFD] focus:outline-none focus:border-[#4A7FA7] text-sm"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="URGENT">URGENT</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#B3CFE5] mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-[#0A1931] border border-[#4A7FA7]/40 rounded-xl px-4 py-2 text-[#F6FAFD] focus:outline-none focus:border-[#4A7FA7] text-sm"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#0A1931]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-[#B3CFE5] hover:text-[#F6FAFD] hover:bg-[#0A1931] text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-[#4A7FA7] hover:bg-[#3b6a8e] text-[#F6FAFD] font-medium text-sm shadow-lg shadow-[#4A7FA7]/30 transition-all disabled:opacity-50"
            >
              {submitting ? 'Saving...' : initialTask ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
