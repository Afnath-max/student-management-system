import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  color?: string;
}

export default function StatCard({ title, value, description, icon: Icon, color = 'indigo' }: StatCardProps) {
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    indigo: {
      bg: 'bg-indigo-50 dark:bg-indigo-950/30',
      text: 'text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-100 dark:border-indigo-900/30'
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-950/30',
      text: 'text-green-600 dark:text-green-400',
      border: 'border-green-100 dark:border-green-900/30'
    },
  };

  const selectedColor = colorMap[color] || colorMap.indigo;

  return (
    <div className="glass-panel transition-all duration-300 hover:-translate-y-1 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</p>
        </div>
        <div className={`rounded-xl p-3 ${selectedColor.bg} ${selectedColor.text}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">{description}</p>
    </div>
  );
}
