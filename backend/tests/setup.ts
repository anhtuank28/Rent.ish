import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { execSync } from 'child_process';
import { prisma } from '../src/config/prisma.js';
import 'dotenv/config';

let container: any;

export async function setup() {
  console.log('🐳 Starting PostgreSQL TestContainer...');
  container = await new PostgreSqlContainer('postgres:15').start();

  const databaseUrl = container.getConnectionUri();
  
  // Ghi đè biến môi trường để Prisma kết nối vào DB ảo này
  process.env.DATABASE_URL = databaseUrl;

  console.log('🔄 Running Prisma Migrations on Test DB...');
  execSync('npx prisma db push', { env: process.env, stdio: 'inherit' });
}

export async function teardown() {
  console.log('🗑️ Teardown: Disconnecting Prisma and stopping container...');
  await prisma.$disconnect();
  if (container) {
    await container.stop();
  }
}
