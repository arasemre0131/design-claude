/**
 * @preset/auth/client — Supabase browser client
 */
"use client";
import { createBrowserClient } from "@supabase/ssr";

export function createBrowserSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export async function signInWithPassword(email: string, password: string) {
  const supabase = createBrowserSupabase();
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUp(email: string, password: string, metadata?: Record<string, unknown>) {
  const supabase = createBrowserSupabase();
  return supabase.auth.signUp({
    email,
    password,
    options: { data: metadata },
  });
}

export async function signInWithOAuth(provider: "google" | "github") {
  const supabase = createBrowserSupabase();
  return supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}
