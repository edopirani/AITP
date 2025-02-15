import { PrismaClient } from "@prisma/client";

/*
📌 What This File Does:
- Creates a single Prisma instance to manage database connections.
- Prevents multiple instances from being created in development.
*/

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;