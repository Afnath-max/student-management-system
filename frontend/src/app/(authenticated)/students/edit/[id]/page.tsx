'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Student } from '@/lib/types';
import StudentForm from '@/components/StudentForm';

interface EditStudentPageProps {
  params: Promise<{ id: string }>;
}

export default function EditStudentPage({ params }: EditStudentPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchStudent() {
      try {
        const response = await api.get(`/students/${id}`);
        setStudent(response.data);
      } catch (err: any) {
        setError('Failed to fetch student record details.');
      } finally {
        setLoading(false);
      }
    }
    fetchStudent();
  }, [id]);

  const handleSubmit = async (data: any) => {
    setSaving(true);
    setError('');
    try {
      await api.put(`/students/${id}`, data);
      router.push('/students');
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to update student record. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Edit Student Record</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Modify the student information below and save to commit changes.
        </p>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/20 dark:text-red-400">
          {error}
        </div>
      )}

      {student && (
        <div className="glass-panel rounded-2xl p-6 shadow-sm">
          <StudentForm initialData={student} onSubmit={handleSubmit} isLoading={saving} />
        </div>
      )}
    </div>
  );
}
