/**
 * Health check endpoint — Vercel / Fly.io / Cloudflare uptime monitor icin.
 * GET /api/health -> { status, timestamp, services: {...} }
 */
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const startedAt = Date.now();

  // Temel health-check (DB/Redis/Sentry ping eklenebilir)
  const services = {
    api: "ok",
    db: "unknown", // drizzle ping burada cagrilir
    sentry: process.env.NEXT_PUBLIC_SENTRY_DSN ? "configured" : "missing",
    redis: process.env.REDIS_URL ? "configured" : "missing",
  };

  const allOk = Object.values(services).every((v) => v === "ok" || v === "configured");

  return NextResponse.json(
    {
      status: allOk ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      uptime_ms: process.uptime() * 1000,
      response_ms: Date.now() - startedAt,
      services,
    },
    { status: allOk ? 200 : 503 },
  );
}
