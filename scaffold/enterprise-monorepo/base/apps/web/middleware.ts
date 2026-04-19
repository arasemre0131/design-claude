/**
 * apps/web — Multi-tenant subdomain routing middleware
 *
 * Strateji:
 *   1. hostname = req.headers["host"]              → "tenant1.yourapp.com" | "admin.yourapp.com"
 *   2. subdomain = ilk parca                       → "tenant1" | "admin"
 *   3. RESERVED set icindekileri pass-through yap  → www, app, admin, api vb.
 *   4. Kalanlar tenant subdomain'i → "/tenant/{sub}{path}" shape'ine rewrite
 *   5. Rewrite olmazsa Next.js default routing calisir
 *
 * Not: admin subdomain'i apps/admin'in kendi deploy'unda yakalanir;
 * bu middleware apps/web icin, yani musteri-facing storefront.
 */
import { NextRequest, NextResponse } from "next/server";

const ROOT_DOMAIN = process.env.ROOT_DOMAIN || "yourapp.com";

// Subdomain sahibi tenant olmayan ayrilmis subdomain'ler
const RESERVED = new Set<string>([
  "www",
  "app",
  "admin",
  "api",
  "cdn",
  "static",
  "mail",
  "blog",
  "docs",
  "dashboard",
  "status",
  "preset", // yerel dev icin
]);

function extractSubdomain(hostname: string): string | null {
  // localhost:3000 or 127.0.0.1 — dev ortami
  if (hostname.includes("localhost") || hostname.startsWith("127.")) {
    // dev'de subdomain test etmek icin: "tenant1.localhost:3000"
    const firstDot = hostname.indexOf(".");
    if (firstDot === -1) return null;
    const sub = hostname.slice(0, firstDot);
    return sub === "localhost" ? null : sub;
  }

  // "tenant.yourapp.com" formatinda domain parcalari
  const hostWithoutPort = hostname.split(":")[0] ?? hostname;
  const parts = hostWithoutPort.split(".");

  // "yourapp.com" → tenant yok (root domain)
  // "tenant.yourapp.com" → tenant = "tenant"
  // "a.b.yourapp.com" → tenant = "a.b" (nadir; full path donduruyoruz)
  if (parts.length <= 2) return null;

  // Root domain'i kontrol et
  const rootParts = ROOT_DOMAIN.split(".");
  const looksLikeRoot = parts.slice(-rootParts.length).join(".") === ROOT_DOMAIN;
  if (!looksLikeRoot) return null;

  return parts.slice(0, parts.length - rootParts.length).join(".");
}

export function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") || "";
  const subdomain = extractSubdomain(hostname);

  // Root domain, www veya reserved subdomain → default Next.js routing
  if (!subdomain || RESERVED.has(subdomain)) {
    return NextResponse.next();
  }

  // Zaten /tenant/ ile basliyorsa tekrar rewrite etme
  if (req.nextUrl.pathname.startsWith("/tenant/")) {
    return NextResponse.next();
  }

  // Tenant rewrite
  const url = req.nextUrl.clone();
  url.pathname = `/tenant/${subdomain}${url.pathname === "/" ? "" : url.pathname}`;

  const response = NextResponse.rewrite(url);
  response.headers.set("x-tenant-subdomain", subdomain);
  return response;
}

export const config = {
  matcher: [
    // _next, static, api, favicon disinda her yol
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
