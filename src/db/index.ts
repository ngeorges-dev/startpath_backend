import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export async function initDB(
  url: string | undefined = process.env.DATABASE_URL,
) {
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }

  const db = drizzle(url);

  return { db };
}

export async function ping(db: DB) {
  return db.execute(sql`SELECT 1`);
}

export type DB = Awaited<ReturnType<typeof initDB>>["db"];
