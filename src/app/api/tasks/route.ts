export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error('Database connection error during fetch:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks from database' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description: description || '',
        status: 'TODO',
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Database insertion error during post:', error);
    return NextResponse.json({ error: 'Failed to create task record' }, { status: 500 });
  }
}
