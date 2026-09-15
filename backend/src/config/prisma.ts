import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * PrismaClient Singleton (Prisma 7 — Driver Adapter Pattern)
 *
 * Prisma 7 yêu cầu sử dụng Driver Adapter thay vì truyền URL trực tiếp.
 * Ở đây ta dùng @prisma/adapter-pg để kết nối PostgreSQL.
 *
 * Đảm bảo chỉ có DUY NHẤT 1 instance PrismaClient trong toàn bộ ứng dụng.
 * Nếu tạo nhiều instance, sẽ gây tràn kết nối Database (connection pool exhaustion).
 *
 * Trong môi trường development, module hot-reload (nodemon) có thể tạo lại
 * PrismaClient mỗi lần file thay đổi. Biến `globalForPrisma` giúp tránh điều này.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString = process.env["DATABASE_URL"] as string;
  const adapter = new PrismaPg({ connectionString });

  return new PrismaClient({
    adapter,
    log: process.env["NODE_ENV"] === "development" ? ["query", "warn", "error"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env["NODE_ENV"] !== "production") {
  globalForPrisma.prisma = prisma;
}
