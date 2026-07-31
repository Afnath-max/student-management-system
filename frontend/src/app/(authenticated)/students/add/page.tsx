'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import StudentForm from '@/components/StudentForm';

export default function AddStudentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    try {
      await api.post('/students', data);
      router.push('/students');
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to create student record. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Add New Student</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Complete the form below to register a new student in the system database.
        </p>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/20 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="glass-panel rounded-2xl p-6 shadow-sm">
        <StudentForm onSubmit={handleSubmit} isLoading={loading} />
      </div>
    </div>
  );
}
