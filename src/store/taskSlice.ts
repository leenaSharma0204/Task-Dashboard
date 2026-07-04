import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@/types/tasks';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
}

// 1. Fetch Tasks Thunk
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetch('/api/tasks');
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return (await response.json()) as Task[];
});

// 2. Add Task Thunk
export const addTask = createAsyncThunk('tasks/addTask', async (taskData: { title: string; description: string }) => {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) throw new Error('Failed to add task');
  return (await response.json()) as Task;
});

// 3. Update Status Thunk
export const updateTaskStatus = createAsyncThunk(
  'tasks/updateTaskStatus',
  async ({ id, status }: { id: string; status: Task['status'] }) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return (await response.json()) as Task;
  }
);

// 4. Delete Task Thunk
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: string) => {
  const response = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete task');
  return id;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => { state.loading = false; state.tasks = action.payload; })
      .addCase(fetchTasks.rejected, (state, action) => { state.loading = false; state.error = action.error.message || 'Error fetching tasks'; })
      // Add Task
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => { state.tasks.unshift(action.payload); })
      // Update Status
      .addCase(updateTaskStatus.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.tasks[index] = action.payload;
      })
      // Delete Task
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;