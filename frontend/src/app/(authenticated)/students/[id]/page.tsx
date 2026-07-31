'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Edit2, Calendar, Phone, Mail, User, BookOpen, GraduationCap, MapPin } from 'lucide-react';
import api from '@/lib/api';
import { Student } from '@/lib/types';

interface StudentDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function StudentDetailPage({ params }: StudentDetailPageProps) {
  const { id } = use(params);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchStudent() {
      try {
        const response = await api.get(`/students/${id}`);
        setStudent(response.data);
      } catch (err: any) {
        setError('Failed to fetch student details.');
      } finally {
        setLoading(false);
      }
    }
    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-sm text-red-700 dark:bg-red-950/20 dark:text-red-405">
        {error || 'Student not found.'}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/students"
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
          Back to List
        </Link>

        <Link
          href={`/students/edit/${student.id}`}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-all cursor-pointer"
        >
          <Edit2 className="h-4 w-4" />
          Edit Profile
        </Link>
      </div>

      {/* Main card */}
      <div className="glass-panel overflow-hidden rounded-3xl shadow-sm">
        {/* Banner area */}
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600" />
        
        {/* Details section */}
        <div className="relative px-6 pb-8 pt-16 md:px-8">
          {/* Circular avatar badge */}
          <div className="absolute -top-12 left-6 md:left-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 ring-4 ring-white dark:ring-slate-950">
            <GraduationCap className="h-12 w-12" />
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{student.fullName}</h2>
              <p className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-1">{student.studentId}</p>
            </div>

            <hr className="border-slate-100 dark:border-slate-800" />

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-100 p-2.5 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Email Address</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{student.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-100 p-2.5 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Phone Number</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{student.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-100 p-2.5 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Age & Gender</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{student.age} years old ({student.gender})</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-100 p-2.5 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Enrolled Course</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{student.course}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-100 p-2.5 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Registration Date</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {new Date(student.registrationDate).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-100 p-2.5 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Residential Address</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{student.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
