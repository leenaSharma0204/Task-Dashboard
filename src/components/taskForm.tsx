'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '@/store/taskSlice';
import { AppDispatch } from '@/store/store';
import { PlusCircle } from 'lucide-react';

export default function TaskForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await dispatch(addTask({ title: title.trim(), description: description.trim() })).unwrap();
      setTitle('');
      setDescription('');
    } catch (err) {
      alert('Failed to create task. Try again!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 uppercase tracking-wider">
        <PlusCircle className="w-4 h-4 text-indigo-600" /> Create New Task
      </h2>
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Task Title *</label>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
          className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"
          required
        />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Description</label>
        <textarea
          placeholder="Add optional operational notes..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
          rows={3}
          className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100 resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting || !title.trim()}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
      >
        {isSubmitting ? 'Creating...' : 'Add Task'}
      </button>
    </form>
  );
}