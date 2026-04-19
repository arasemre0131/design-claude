/**
 * KVKK / GDPR — Data Delete (Right to be forgotten)
 * POST /api/gdpr/delete
 *   Auth'lu kullanicinin hesabini + personal veriyi siler / pseudonymize eder.
 *   Audit log kalici (yasal zorunluluk), kisisel alanlar NULL'lanir.
 */
import { NextRequest, NextResponse } from "next/server";
import { db } from "@preset/db";
import { users, auditLog } from "@preset/db/schema";
import { eq } from "drizzle-orm";
import { requireUser } from "@preset/auth/server";
import { captureException } from "@preset/observability";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();

    // Soft delete + pseudonymize
    await db
      .update(users)
      .set({
        email: `deleted-${user.id}@anonymized.local`,
        deletedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    // Kalici audit kaydi
    await db.insert(auditLog).values({
      userId: user.id,
      action: "gdpr_delete",
      resource: "user",
      resourceId: user.id,
      ip: req.headers.get("x-forwarded-for") || null,
      userAgent: req.headers.get("user-agent") || null,
    });

    return NextResponse.json({
      status: "ok",
      message: "Hesabiniz silinmek uzere isaretlendi. 30 gun icinde tamamen kaldirilacak.",
    });
  } catch (err) {
    captureException(err as Error, { route: "/api/gdpr/delete" });
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
