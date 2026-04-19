/**
 * Tenant yonetim API
 *   GET  /api/tenants        → auth'lu kullanicinin erisebilecegi tenant listesi
 *   POST /api/tenants        → yeni tenant (admin only)
 */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@preset/db";
import { tenants } from "@preset/db/schema";
import { requireUser } from "@preset/auth/server";
import { captureException, track } from "@preset/observability";

export const runtime = "nodejs";

const CreateTenantSchema = z.object({
  subdomain: z.string().min(3).max(63).regex(/^[a-z0-9-]+$/),
  name: z.string().min(2).max(120),
  plan: z.enum(["free", "pro", "enterprise"]).default("free"),
  presetId: z.string(),
});

export async function GET() {
  try {
    const user = await requireUser();
    const rows = await db.select().from(tenants).limit(100);
    track("tenant.list", { userId: user.id, count: rows.length });
    return NextResponse.json({ data: rows });
  } catch (err) {
    captureException(err as Error, { route: "/api/tenants GET" });
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser({ role: "admin" });
    const body = await req.json();
    const parsed = CreateTenantSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "validation_error", issues: parsed.error.issues },
        { status: 400 },
      );
    }

    const [created] = await db.insert(tenants).values(parsed.data).returning();
    track("tenant.created", { userId: user.id, tenantId: created?.id, plan: parsed.data.plan });
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (err) {
    captureException(err as Error, { route: "/api/tenants POST" });
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
