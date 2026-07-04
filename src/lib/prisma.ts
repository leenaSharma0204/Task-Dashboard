import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create adapter only when DATABASE_URL is available
const pgAdapter = process.env.DATABASE_URL ? new PrismaPg(process.env.DATABASE_URL) : undefined;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
    ...(pgAdapter ? { adapter: pgAdapter } : {}),
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;