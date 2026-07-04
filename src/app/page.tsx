'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '@/store/taskSlice';
import { RootState, AppDispatch } from '@/store/store';
import TaskForm from '@/components/taskForm';
import TaskCard from '@/components/taskCard';
import ThemeToggle from '@/components/ThemeToggle';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { KanbanSquare, Loader2, RefreshCw, FolderClosed } from 'lucide-react';

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
  const [filter, setFilter] = useState<'ALL' | 'TODO' | 'IN_PROGRESS' | 'DONE'>('ALL');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = tasks.filter(task => filter === 'ALL' || task.status === filter);

  const todoCount = tasks.filter(t => t.status === 'TODO').length;
  const inProgressCount = tasks.filter(t => t.status === 'IN_PROGRESS').length;
  const doneCount = tasks.filter(t => t.status === 'DONE').length;

  const chartData = [
    { name: 'To Do', count: todoCount, fill: '#f59e0b' },
    { name: 'In Progress', count: inProgressCount, fill: '#3b82f6' },
    { name: 'Done', count: doneCount, fill: '#10b981' }
  ];

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#0f172a] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Branding Panel */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-md">
              <KanbanSquare className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">TaskStream Workspace</h1>
              <p className="text-xs text-slate-500">Live PostgreSQL Sync Engine Active</p>
            </div>
          </div>
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <ThemeToggle />
          </div>
        </div>

        {/* Dynamic Numerical Analytics Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Sprint Tasks</span>
            <div className="text-2xl font-extrabold text-slate-800 mt-1">{tasks.length}</div>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">To Do</span>
            <div className="text-2xl font-extrabold text-amber-500 mt-1">{todoCount}</div>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">In Progress</span>
            <div className="text-2xl font-extrabold text-blue-500 mt-1">{inProgressCount}</div>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Completed</span>
            <div className="text-2xl font-extrabold text-emerald-500 mt-1">{doneCount}</div>
          </div>
        </div>

        {/* Master Column Split Layout System */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column Area: Control Forms + Analytics Recharts */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <TaskForm />
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Sprint Metric Allocation</h3>
              <div className="w-full h-48">
                {tasks.length === 0 ? (
                  <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 italic">Telemetry empty</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="name" fontSize={10} stroke="#94a3b8" tickLine={false} />
                      <YAxis allowDecimals={false} fontSize={10} stroke="#94a3b8" tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff', borderRadius: '8px', fontSize: '11px' }} />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>

          {/* Right Column Area: Navigation Filters & Dynamic Output Lists */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 p-2 rounded-xl shadow-sm flex flex-wrap gap-1">
              {(['ALL', 'TODO', 'IN_PROGRESS', 'DONE'] as const).map((type) => {
                const count = type === 'ALL' ? tasks.length : tasks.filter((t) => t.status === type).length;
                const isActive = filter === type;
                return (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                      isActive ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{type === 'ALL' ? 'All Deliverables' : type.replace('_', ' ')}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] ${isActive ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Response Rendering Stream */}
            <div className="space-y-4">
              {loading && (
                <div className="flex flex-col items-center justify-center py-16 bg-white border border-slate-200 rounded-xl">
                  <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
                  <p className="text-xs text-slate-400 mt-2">Loading parameters...</p>
                </div>
              )}

              {error && !loading && (
                <div className="p-6 border border-red-200 bg-red-50 text-red-800 rounded-xl text-center space-y-3">
                  <p className="text-xs font-bold">{error}</p>
                  <button onClick={() => dispatch(fetchTasks())} className="inline-flex items-center gap-2 bg-white border border-slate-300 font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-slate-50">
                    <RefreshCw className="w-3 h-3" /> Retry Connection
                  </button>
                </div>
              )}

              {!loading && !error && filteredTasks.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center bg-white border border-slate-200 rounded-xl border-dashed">
                  <div className="p-3 bg-slate-50 rounded-full text-slate-400"><FolderClosed className="w-5 h-5" /></div>
                  <h3 className="text-slate-700 font-bold text-xs mt-2">Workspace stream clean</h3>
                </div>
              )}

              {!loading && !error && filteredTasks.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}