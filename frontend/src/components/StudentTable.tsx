'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { Student } from '@/lib/types';

interface StudentTableProps {
  students: Student[];
  onDelete: (id: string) => void;
}

export default function StudentTable({ students, onDelete }: StudentTableProps) {
  if (students.length === 0) {
    return (
      <div className="flex h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-900/40">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">No students found.</p>
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">Try adjusting your search query or add a new student.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
              <th className="px-6 py-4 font-semibold">Student ID</th>
              <th className="px-6 py-4 font-semibold">Full Name</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold text-center">Course</th>
              <th className="px-6 py-4 font-semibold text-center">Age</th>
              <th className="px-6 py-4 font-semibold text-center">Registration Date</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="whitespace-nowrap px-6 py-4 font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {student.studentId}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900 dark:text-white">
                  {student.fullName}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-slate-500 dark:text-slate-400">
                  {student.email}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-center text-slate-600 dark:text-slate-300">
                  {student.course}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-center text-slate-600 dark:text-slate-300">
                  {student.age}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-center text-slate-500 dark:text-slate-400">
                  {new Date(student.registrationDate).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/students/${student.id}`}
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-4.5 w-4.5" />
                    </Link>
                    <Link
                      href={`/students/edit/${student.id}`}
                      className="rounded-lg p-2 text-indigo-500 hover:bg-indigo-50 hover:text-indigo-700 dark:text-indigo-400 dark:hover:bg-indigo-950/30 transition-colors"
                      title="Edit Student"
                    >
                      <Edit2 className="h-4.5 w-4.5" />
                    </Link>
                    <button
                      onClick={() => onDelete(student.id)}
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                      title="Delete Student"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
