/**
 * One-time script to create the first admin user.
 * Usage: npx tsx scripts/seed-admin.ts
 * Requires: POSTGRES_URL (or Vercel Postgres env), ADMIN_SEED_USERNAME, ADMIN_SEED_PASSWORD in env.
 */
import { config } from "dotenv";
config({ path: ".env.local" });
config(); // fallback .env
import bcrypt from "bcryptjs";
import { db } from "../lib/db";
import { adminUsers } from "../lib/db/schema";

async function main() {
  const username = process.env.ADMIN_SEED_USERNAME;
  const password = process.env.ADMIN_SEED_PASSWORD;

  if (!username?.trim() || !password) {
    console.error(
      "Set ADMIN_SEED_USERNAME and ADMIN_SEED_PASSWORD in the environment (e.g. .env.local)."
    );
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 12);

  try {
    await db.insert(adminUsers).values({
      username: username.trim(),
      passwordHash: hash,
    });
    console.log("Admin user created successfully.");
  } catch (err) {
    const msg = String(err ?? "");
    if (msg.includes("unique") || msg.includes("username")) {
      console.error("A user with this username already exists.");
    } else {
      console.error(err);
    }
    process.exit(1);
  }
}

main();
