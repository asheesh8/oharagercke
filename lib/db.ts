import { PrismaClient } from "@prisma/client";

/** True when a Postgres connection is configured (Supabase in production). */
export const hasDatabase = Boolean(process.env.DATABASE_URL);

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/**
 * Prisma client — only instantiated when DATABASE_URL is present so the app
 * can run entirely from the static seed fallback with zero DB setup.
 */
export const prisma: PrismaClient | null = hasDatabase
  ? globalForPrisma.prisma ?? new PrismaClient()
  : null;

if (hasDatabase && prisma && process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
