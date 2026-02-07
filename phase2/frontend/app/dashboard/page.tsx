'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient, Task } from '@/src/lib/api-client';
import TaskCard from '@/src/components/dashboard/task-card';
import TaskForm from '@/src/components/dashboard/task-form';

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const fetchedTasks = await apiClient.getTasks();
      setTasks(fetchedTasks);
      setError('');
    } catch (err) {
      setError('Failed to load tasks. Please login again.');
      // If unauthorized, redirect to login
      if (err instanceof Error && err.message.includes('401')) {
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (title: string, description: string) => {
    try {
      const newTask = await apiClient.createTask(title, description);
      setTasks([...tasks, newTask]);
      setError('');
    } catch (err) {
      setError('Failed to create task');
      throw err; // Re-throw to let TaskForm handle the error
    }
  };

  const handleToggleTask = async (taskId: string) => {
    try {
      const updatedTask = await apiClient.toggleTask(taskId);
      setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await apiClient.deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const handleLogout = () => {
    apiClient.logout();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-xl text-[#d4d4d4]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-[#1a1a1a] shadow-lg shadow-black/50 border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-white">My Tasks</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-[#e5e5e5] hover:text-white hover:bg-[#222222] rounded-md transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-900/30 text-red-400 border border-red-800 rounded-md">
            {error}
          </div>
        )}

        {/* Create Task Form */}
        <div className="mb-8">
          <TaskForm onSubmit={handleCreateTask} />
        </div>

        {/* Task List */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Your Tasks</h2>
          {tasks.length === 0 ? (
            <div className="bg-[#1a1a1a] rounded-lg shadow-xl shadow-black/50 p-12 text-center border border-[#2a2a2a]">
              <p className="text-[#6b7280] text-lg">
                No tasks yet. Create your first task above!
              </p>
            </div>
          ) : (
            <div className="bg-[#1a1a1a] rounded-lg shadow-xl shadow-black/50 border border-[#2a2a2a] overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-[auto_2fr_3fr_auto] gap-3 px-4 py-3 bg-[#0a0a0a] border-b border-[#333333]">
                <div className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
                  ✓
                </div>
                <div className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
                  Task
                </div>
                <div className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
                  Description
                </div>
                <div className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider text-right">
                  Action
                </div>
              </div>

              {/* Table Body */}
              <div>
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={handleToggleTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}