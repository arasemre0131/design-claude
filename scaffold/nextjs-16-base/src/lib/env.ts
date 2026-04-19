import { z } from "zod";

/**
 * Server-side env schema — service_role ve secret'lar
 * Client-side kullanilmaz (import edilmemeli).
 */
const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  DATABASE_URL: z.string().url().optional(),
  IYZICO_API_KEY: z.string().optional(),
  IYZICO_SECRET_KEY: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
});

/**
 * Client-side env schema — NEXT_PUBLIC_* prefix zorunlu
 * Next.js sadece bu prefix'li degiskenleri client bundle'a embed eder.
 */
const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
});

/**
 * Runtime dogrulama — process.env'i parse eder.
 * Hatali config varsa app startup'ta fail eder.
 */
function parseEnv<T extends z.ZodSchema>(schema: T, source: Record<string, unknown>): z.infer<T> {
  const parsed = schema.safeParse(source);
  if (!parsed.success) {
    console.error("Env validation failed:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }
  return parsed.data;
}

export const serverEnv =
  typeof window === "undefined"
    ? parseEnv(serverSchema, process.env)
    : (null as unknown as z.infer<typeof serverSchema>);

export const clientEnv = parseEnv(clientSchema, {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
