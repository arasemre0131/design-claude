/**
 * @preset/auth/server — Supabase server-side helpers
 *
 * Next.js 16 Server Component / Route Handler'lardan cagrilir.
 * requireUser() — auth gerekli sayfalar icin kullan, yoksa throw.
 */
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export type AuthUser = {
  id: string;
  email: string;
  role: "owner" | "admin" | "member" | "viewer";
  tenantId: string | null;
};

async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (toSet) => {
          try {
            toSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options as CookieOptions),
            );
          } catch {
            // Next.js edge / server component cookies read-only — sessiz gec
          }
        },
      },
    },
  );
}

export async function getUser(): Promise<AuthUser | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  return {
    id: data.user.id,
    email: data.user.email ?? "",
    role: (data.user.user_metadata?.role as AuthUser["role"]) ?? "member",
    tenantId: (data.user.user_metadata?.tenant_id as string | undefined) ?? null,
  };
}

export async function requireUser(opts?: {
  role?: AuthUser["role"];
  tenantId?: string;
}): Promise<AuthUser> {
  const user = await getUser();
  if (!user) {
    throw new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  if (opts?.role && user.role !== opts.role && user.role !== "owner") {
    throw new Response(JSON.stringify({ error: "forbidden" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    });
  }

  if (opts?.tenantId && user.tenantId !== opts.tenantId) {
    throw new Response(JSON.stringify({ error: "tenant_mismatch" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    });
  }

  return user;
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
