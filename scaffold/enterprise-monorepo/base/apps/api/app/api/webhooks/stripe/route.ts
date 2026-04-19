/**
 * Stripe webhook endpoint — subscription events.
 * Signature dogrulamasi zorunlu.
 */
import { NextRequest, NextResponse } from "next/server";
import { captureException, track } from "@preset/observability";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return NextResponse.json({ error: "missing_signature" }, { status: 400 });
    }

    const body = await req.text();

    // Gercek dogrulama: stripe.webhooks.constructEvent(body, signature, secret)
    // Placeholder - preset scaffold'da sabit
    const event = JSON.parse(body) as { type: string; data?: unknown };

    track(`stripe.${event.type}`, { raw: event.data });

    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        // Tenant plan guncelle
        break;
      case "invoice.payment_succeeded":
      case "invoice.payment_failed":
        // Billing audit
        break;
      default:
        // Ignore
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    captureException(err as Error, { route: "/api/webhooks/stripe" });
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
