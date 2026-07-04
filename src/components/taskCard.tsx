'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTaskStatus, deleteTask } from '@/store/taskSlice';
import { AppDispatch } from '@/store/store';
import { Task } from '@/types/tasks';
import { Trash2 } from 'lucide-react';

export default function TaskCard({ task }: { task: Task }) {
  const dispatch = useDispatch<AppDispatch>();

  const statusColors = {
    TODO: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50',
    IN_PROGRESS: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/50',
    DONE: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50',
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-center justify-between">
          <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${statusColors[task.status]}`}>
            {task.status}
          </span>
          <button 
            onClick={() => dispatch(deleteTask(task.id))}
            className="text-slate-400 hover:text-red-500 p-1.5 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-3 break-words">{task.title}</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 break-words line-clamp-3">
          {task.description || <span className="text-slate-400 italic">No description</span>}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-4">
        <span className="text-[10px] text-slate-400 font-medium">
          {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
        <select
          value={task.status}
          onChange={(e) => dispatch(updateTaskStatus({ id: task.id, status: e.target.value as Task['status'] }))}
          className="text-[11px] font-bold border border-slate-200 dark:border-slate-600 rounded-lg px-2 py-1 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
      </div>
    </div>
  );
}