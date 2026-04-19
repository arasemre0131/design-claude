/**
 * @preset/db — Postgres client (singleton)
 *
 * Production: Supabase pooler connection string (port 6543)
 * Dev: Docker Compose localhost:5432
 */
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Connection pool — Supabase Supavisor pooler uyumlu
const client = postgres(connectionString, {
  prepare: false, // pooler modunda zorunlu
  max: 10,
  idle_timeout: 20,
  connect_timeout: 30,
});

export const db = drizzle(client, { schema, logger: process.env.NODE_ENV === "development" });
export type Database = typeof db;
