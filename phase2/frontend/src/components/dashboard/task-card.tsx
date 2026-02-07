'use client';

import { Task } from '@/lib/api-client';

/**
 * TaskCard Component
 *
 * Displays a single task in a compact row format with completion checkbox,
 * title, description, and delete button. Provides visual feedback for
 * completed tasks with strikethrough styling.
 *
 * @component
 * @example
 * ```tsx
 * <TaskCard
 *   task={task}
 *   onToggle={handleToggleTask}
 *   onDelete={handleDeleteTask}
 * />
 * ```
 */

export interface TaskCardProps {
  /** Task object with all properties */
  task: Task;
  /** Handler for toggling completion status */
  onToggle: (taskId: string) => Promise<void>;
  /** Handler for deleting task */
  onDelete: (taskId: string) => Promise<void>;
}

export default function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  return (
    <div className="grid grid-cols-[auto_2fr_3fr_auto] gap-3 px-4 py-3 bg-[#1a1a1a] border-b border-[#2a2a2a] hover:bg-[#222222] transition-all duration-200 group items-center">
      {/* Checkbox Column */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="h-4 w-4 text-[#e5e5e5] bg-[#0a0a0a] border-2 border-[#333333] rounded cursor-pointer hover:border-[#4a4a4a] focus:ring-2 focus:ring-[#e5e5e5] focus:ring-offset-2 focus:ring-offset-[#1a1a1a] transition-all"
          aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />
      </div>

      {/* Task Title Column */}
      <div className="min-w-0">
        <h3
          className={`text-sm font-medium truncate ${
            task.completed
              ? 'line-through text-[#6b7280]'
              : 'text-white'
          }`}
        >
          {task.title}
        </h3>
      </div>

      {/* Description Column */}
      <div className="min-w-0">
        {task.description ? (
          <p
            className={`text-sm truncate ${
              task.completed ? 'text-[#6b7280]' : 'text-[#9ca3af]'
            }`}
          >
            {task.description}
          </p>
        ) : (
          <span className="text-sm text-[#4a4a4a] italic">No description</span>
        )}
      </div>

      {/* Actions Column - Delete Button */}
      <div className="flex items-center justify-end">
        <button
          onClick={() => onDelete(task.id)}
          className="p-1.5 text-[#6b7280] hover:text-red-400 hover:bg-red-900/20 rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 opacity-0 group-hover:opacity-100 cursor-pointer"
          aria-label={`Delete task "${task.title}"`}
          title="Delete task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
