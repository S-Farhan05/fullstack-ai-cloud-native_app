'use client';

import { useState } from 'react';

/**
 * TaskForm Component
 *
 * Form for creating new tasks with title and optional description.
 * Handles form validation, submission, and loading states.
 *
 * @component
 * @example
 * ```tsx
 * <TaskForm onSubmit={handleCreateTask} />
 * ```
 */

export interface TaskFormProps {
  /** Handler for form submission */
  onSubmit: (title: string, description: string) => Promise<void>;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate title
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await onSubmit(title.trim(), description.trim());
      // Clear form on success
      setTitle('');
      setDescription('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] rounded-lg shadow-lg shadow-black/50 p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Create New Task</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-900/30 text-red-400 border border-red-800 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="task-title" className="block text-sm font-medium text-[#e5e5e5] mb-2">
            Task Title
          </label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333333] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-[#6b7280]"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="task-description" className="block text-sm font-medium text-[#e5e5e5] mb-2">
            Description (Optional)
          </label>
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details about your task"
            className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333333] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none placeholder:text-[#6b7280]"
            rows={3}
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-6 py-3 bg-[#222222] text-white font-semibold rounded-md border border-[#333333] hover:bg-[#2a2a2a] hover:border-[#4a4a4a] hover:shadow-lg hover:shadow-black/30 focus:outline-none focus:ring-2 focus:ring-[#e5e5e5] focus:ring-offset-2 focus:ring-offset-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center justify-center gap-2"
        >
          <span className="text-lg leading-none">+</span>
          {isSubmitting ? 'Creating...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
}
