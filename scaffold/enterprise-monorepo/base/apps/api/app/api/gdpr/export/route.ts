/**
 * KVKK / GDPR — Data Export
 * GET /api/gdpr/export
 *   Auth'lu kullanicinin tum kisisel verisini JSON olarak dondurur.
 *   Audit log'a "data_export" event'i yazilir.
 */
import { NextRequest, NextResponse } from "next/server";
import { db } from "@preset/db";
import { users, auditLog } from "@preset/db/schema";
import { eq } from "drizzle-orm";
import { requireUser } from "@preset/auth/server";
import { captureException } from "@preset/observability";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const user = await requireUser();

    const [userData] = await db.select().from(users).where(eq(users.id, user.id));
    if (!userData) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    // Audit
    await db.insert(auditLog).values({
      userId: user.id,
      tenantId: userData.tenantId,
      action: "data_export",
      resource: "user",
      resourceId: user.id,
      ip: req.headers.get("x-forwarded-for") || null,
      userAgent: req.headers.get("user-agent") || null,
    });

    return new NextResponse(JSON.stringify({ exportedAt: new Date().toISOString(), user: userData }, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="kvkk-export-${user.id}.json"`,
      },
    });
  } catch (err) {
    captureException(err as Error, { route: "/api/gdpr/export" });
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
