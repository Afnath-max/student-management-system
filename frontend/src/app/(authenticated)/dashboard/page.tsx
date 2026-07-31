'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, UserPlus, ArrowRight, BookOpen } from 'lucide-react';
import api from '@/lib/api';
import { DashboardStats } from '@/lib/types';
import StatCard from '@/components/StatCard';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await api.get('/dashboard/stats');
        setStats(response.data);
      } catch (err: any) {
        setError('Failed to load dashboard statistics.');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 p-6 text-sm text-red-700 dark:bg-red-950/20 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <StatCard
          title="Total Students"
          value={stats?.totalStudents || 0}
          description="Total number of students enrolled in the system"
          icon={Users}
          color="indigo"
        />
        
        {/* Quick connection card */}
        <div className="glass-panel transition-all duration-300 hover:-translate-y-1 relative overflow-hidden rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Database Connection</p>
              <p className="mt-2 text-2xl font-bold tracking-tight text-green-600 dark:text-green-400">Connected</p>
            </div>
            <div className="rounded-xl p-3 bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400">
              <BookOpen className="h-6 w-6" />
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">Connected to MongoDB Atlas Cluster</p>
        </div>
      </div>

      {/* Grid: Recently Added & Quick Links */}
      <div className="grid gap-8 lg:grid-cols-3 w-full min-w-0">
        {/* Recently Added Students */}
        <div className="lg:col-span-2 space-y-4 min-w-0">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recently Added Students</h2>
            <Link href="/students" className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="h-[196px] flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
            <div className="overflow-x-auto flex-1 overflow-y-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
                    <th className="px-4 py-2.5 md:px-6 md:py-3 font-semibold">ID</th>
                    <th className="px-4 py-2.5 md:px-6 md:py-3 font-semibold">Name</th>
                    <th className="px-4 py-2.5 md:px-6 md:py-3 font-semibold">Email</th>
                    <th className="px-4 py-2.5 md:px-6 md:py-3 font-semibold">Course</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {stats?.recentlyAddedStudents && stats.recentlyAddedStudents.length > 0 ? (
                    stats.recentlyAddedStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-colors">
                        <td className="whitespace-nowrap px-4 py-3 md:px-6 md:py-3.5 font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                          {student.studentId}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 md:px-6 md:py-3.5 font-medium text-slate-900 dark:text-white">
                          {student.fullName}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 md:px-6 md:py-3.5 text-slate-500 dark:text-slate-400">
                          {student.email}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 md:px-6 md:py-3.5 text-slate-600 dark:text-slate-300">
                          {student.course}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="h-32 text-center text-sm text-slate-500 dark:text-slate-400">
                        No students added yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Quick Navigation</h2>
          <div className="grid gap-4 grid-cols-1">
            <Link
              href="/students/add"
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80"
            >
              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400">
                <UserPlus className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-slate-950 dark:text-white text-sm">Add New Student</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Insert new student record</p>
              </div>
            </Link>

            <Link
              href="/students"
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80"
            >
              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-slate-950 dark:text-white text-sm">Manage Students</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Search, edit, or delete records</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
