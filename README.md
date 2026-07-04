# 🚀 TaskStream Engine: Full-Stack Sprint Analytics Dashboard

TaskStream Engine is a modern, high-performance, full-stack task management workspace. Built with a responsive glassmorphic design, it features persistent global state synchronization, live PostgreSQL datastore tracking, and real-time visual telemetry analytics.

## ✨ Core Features

- **Live PostgreSQL Synchronization:** Seamless data persistence utilizing Prisma ORM layer abstractions.
- **Dynamic Recharts Telemetry:** Instant data analytics mapping workload distributions across `To Do`, `In Progress`, and `Done` sprint nodes.
- **Asynchronous Global State:** Managed natively with Redux Toolkit pipelines (`createAsyncThunk`).
- **Tailwind CSS v4 Theme Engine:** Fluid, instant Light/Dark mode transitions that persist across browser refreshes.
- **Granular Pipeline Filters:** One-click filter rows to isolate deliverables by their current workspace status.

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS v4, Lucide Icons
- **State Management:** Redux Toolkit (Slice Architecture)
- **Database & ORM:** PostgreSQL (pgAdmin 4), Prisma ORM v7
- **Data Visualization:** Recharts API

## 🚀 Local Setup Instructions

### 1. Prerequisites
Ensure you have **Node.js (v18+)** and a local **PostgreSQL** instance running via pgAdmin.

### 2. Database Configuration
Create a database named `task_dashboard_db` inside your pgAdmin server interface. Create a `.env` file in the root folder and add your connection string:
```env
DATABASE_URL="postgresql://postgres:leena2004@localhost:5432/task_dashboard_db?schema=public"