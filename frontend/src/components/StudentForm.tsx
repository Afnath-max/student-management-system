'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft } from 'lucide-react';

interface StudentFormProps {
  initialData?: {
    fullName: string;
    email: string;
    phone: string;
    course: string;
    age: number;
    gender: string;
    address: string;
  };
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
}

export default function StudentForm({ initialData, onSubmit, isLoading }: StudentFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    age: '',
    gender: 'Male',
    address: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.fullName || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        course: initialData.course || '',
        age: initialData.age ? String(initialData.age) : '',
        gender: initialData.gender || 'Male',
        address: initialData.address || '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(?:\+94|94|0)[1-9]\d{8}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Invalid Sri Lankan phone number format (e.g. +94761206470 or 0761206470)';
    }
    if (!formData.course.trim()) newErrors.course = 'Course is required';
    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    } else {
      const parsedAge = parseInt(formData.age);
      if (isNaN(parsedAge) || parsedAge <= 0) {
        newErrors.age = 'Age must be a valid positive number';
      }
    }
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    await onSubmit({
      ...formData,
      age: parseInt(formData.age),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`mt-1.5 block w-full rounded-xl border px-4 py-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${
              errors.fullName
                ? 'border-red-350 focus:border-red-500 focus:ring-red-500'
                : 'border-slate-200 dark:border-slate-800'
            }`}
            placeholder="John Doe"
          />
          {errors.fullName && <p className="mt-1.5 text-xs text-red-500">{errors.fullName}</p>}
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1.5 block w-full rounded-xl border px-4 py-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${
              errors.email
                ? 'border-red-350 focus:border-red-500 focus:ring-red-500'
                : 'border-slate-200 dark:border-slate-800'
            }`}
            placeholder="johndoe@example.com"
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`mt-1.5 block w-full rounded-xl border px-4 py-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${
              errors.phone
                ? 'border-red-350 focus:border-red-500 focus:ring-red-500'
                : 'border-slate-200 dark:border-slate-800'
            }`}
            placeholder="+94 76 120 6470"
          />
          {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
        </div>

        {/* Course */}
        <div>
          <label htmlFor="course" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Course
          </label>
          <input
            type="text"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className={`mt-1.5 block w-full rounded-xl border px-4 py-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${
              errors.course
                ? 'border-red-350 focus:border-red-500 focus:ring-red-500'
                : 'border-slate-200 dark:border-slate-800'
            }`}
            placeholder="Computer Science"
          />
          {errors.course && <p className="mt-1.5 text-xs text-red-500">{errors.course}</p>}
        </div>

        {/* Age */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Age
          </label>
          <input
            type="number"
            min="1"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`mt-1.5 block w-full rounded-xl border px-4 py-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${
              errors.age
                ? 'border-red-350 focus:border-red-500 focus:ring-red-500'
                : 'border-slate-200 dark:border-slate-800'
            }`}
            placeholder="20"
          />
          {errors.age && <p className="mt-1.5 text-xs text-red-500">{errors.age}</p>}
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900/50 backdrop-blur-sm transition-all"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="mt-1.5 text-xs text-red-500">{errors.gender}</p>}
        </div>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Address
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          className={`mt-1.5 block w-full rounded-xl border px-4 py-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${
            errors.address
              ? 'border-red-350 focus:border-red-500 focus:ring-red-500'
              : 'border-slate-200 dark:border-slate-800'
          }`}
          placeholder="123 Main St, City, Country"
        />
        {errors.address && <p className="mt-1.5 text-xs text-red-500">{errors.address}</p>}
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-all cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/10 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition-all cursor-pointer"
        >
          <Save className="h-4 w-4" />
          {isLoading ? 'Saving...' : 'Save Record'}
        </button>
      </div>
    </form>
  );
}
