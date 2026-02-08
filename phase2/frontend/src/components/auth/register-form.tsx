'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await apiClient.register(email, password, name);
      // Registration successful, redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-[#1a1a1a] rounded-lg shadow-xl shadow-black/50">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Create Account</h2>
      {error && (
        <div className="mb-4 p-4 bg-red-900/30 text-red-400 border border-red-800 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-[#e5e5e5] mb-2">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333333] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-[#6b7280]"
            placeholder="Enter your full name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-[#e5e5e5] mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333333] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-[#6b7280]"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-[#e5e5e5] mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333333] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-[#6b7280]"
            placeholder="Minimum 8 characters"
            required
            minLength={8}
          />
          <p className="mt-2 text-sm text-[#6b7280]">Must be at least 8 characters long</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#222222] text-white py-3 px-4 rounded-md font-semibold border border-[#333333] hover:bg-[#2a2a2a] hover:border-[#4a4a4a] hover:shadow-lg hover:shadow-black/30 focus:outline-none focus:ring-2 focus:ring-[#e5e5e5] focus:ring-offset-2 focus:ring-offset-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
}