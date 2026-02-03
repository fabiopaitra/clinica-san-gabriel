import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

function getConnectionString(): string {
  const url = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "POSTGRES_URL or DATABASE_URL must be set for database access"
    );
  }
  return url;
}

let _db: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (!_db) {
    _db = drizzle(getConnectionString(), { schema });
  }
  return _db;
}

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_, prop) {
    return (getDb() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
