import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const connectionString = process.env["DATABASE_URL"] as string;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function seedUsers() {
  const hash = await bcrypt.hash("admin123", 10);

  // Admin user
  await prisma.user.upsert({
    where: { email: "admin@rent.ish" },
    update: {
      password_hash: hash,
      role: "ADMIN",
      first_name: "Admin",
      last_name: "Rentish",
    },
    create: {
      email: "admin@rent.ish",
      password_hash: hash,
      role: "ADMIN",
      first_name: "Admin",
      last_name: "Rentish",
    },
  });

  // Customer user
  await prisma.user.upsert({
    where: { email: "customer@rent.ish" },
    update: {
      password_hash: hash,
      role: "CUSTOMER",
      first_name: "Customer",
      last_name: "Test",
    },
    create: {
      email: "customer@rent.ish",
      password_hash: hash,
      role: "CUSTOMER",
      first_name: "Customer",
      last_name: "Test",
    },
  });

  console.log("✅ Seeded admin@rent.ish & customer@rent.ish with password: admin123");
}

seedUsers()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
