/**
 * @preset/db/queries — tenant-scoped query helper'lari
 *
 * Her multi-tenant query tenantId zorunlu. IDOR onlemek icin
 * sadece bu helper'lari kullanin, raw .select() yerine.
 */
import { and, eq, isNull, desc, sql } from "drizzle-orm";
import { db } from "./client";
import { tenants, users, products, orders, auditLog } from "./schema";
import type { NewAuditLogEntry, Tenant, Product, Order } from "./schema";

/* ================================================================ */
/*  Tenant queries                                                   */
/* ================================================================ */

export async function getTenantBySubdomain(subdomain: string): Promise<Tenant | null> {
  const rows = await db
    .select()
    .from(tenants)
    .where(and(eq(tenants.subdomain, subdomain), isNull(tenants.deletedAt)))
    .limit(1);
  return rows[0] ?? null;
}

export async function getTenantByCustomDomain(domain: string): Promise<Tenant | null> {
  const rows = await db
    .select()
    .from(tenants)
    .where(and(eq(tenants.customDomain, domain), isNull(tenants.deletedAt)))
    .limit(1);
  return rows[0] ?? null;
}

export async function getTenantById(id: string): Promise<Tenant | null> {
  const rows = await db.select().from(tenants).where(eq(tenants.id, id)).limit(1);
  return rows[0] ?? null;
}

/* ================================================================ */
/*  Product queries (tenant-scoped)                                  */
/* ================================================================ */

export async function listProductsByTenant(
  tenantId: string,
  options: { publishedOnly?: boolean; limit?: number; offset?: number } = {},
): Promise<Product[]> {
  const conditions = [
    eq(products.tenantId, tenantId),
    isNull(products.deletedAt),
  ];
  if (options.publishedOnly) conditions.push(eq(products.isPublished, true));

  return db
    .select()
    .from(products)
    .where(and(...conditions))
    .orderBy(desc(products.createdAt))
    .limit(options.limit ?? 50)
    .offset(options.offset ?? 0);
}

export async function getProductBySlug(
  tenantId: string,
  slug: string,
): Promise<Product | null> {
  const rows = await db
    .select()
    .from(products)
    .where(
      and(
        eq(products.tenantId, tenantId),
        eq(products.slug, slug),
        isNull(products.deletedAt),
      ),
    )
    .limit(1);
  return rows[0] ?? null;
}

/* ================================================================ */
/*  Order queries                                                    */
/* ================================================================ */

export async function listOrdersByTenant(
  tenantId: string,
  limit = 100,
): Promise<Order[]> {
  return db
    .select()
    .from(orders)
    .where(eq(orders.tenantId, tenantId))
    .orderBy(desc(orders.createdAt))
    .limit(limit);
}

export async function getOrderById(
  tenantId: string,
  orderId: string,
): Promise<Order | null> {
  const rows = await db
    .select()
    .from(orders)
    .where(and(eq(orders.tenantId, tenantId), eq(orders.id, orderId)))
    .limit(1);
  return rows[0] ?? null;
}

/* ================================================================ */
/*  Audit log helper                                                 */
/* ================================================================ */

export async function writeAudit(entry: NewAuditLogEntry): Promise<void> {
  await db.insert(auditLog).values(entry);
}

/* ================================================================ */
/*  Analytics roll-up                                                */
/* ================================================================ */

export async function tenantDailyRevenue(tenantId: string, days = 30) {
  return db.execute(sql`
    SELECT date_trunc('day', created_at) as day,
           SUM(total)::bigint as revenue,
           COUNT(*)::int as order_count
    FROM orders
    WHERE tenant_id = ${tenantId}
      AND status IN ('paid', 'shipped', 'delivered')
      AND created_at >= NOW() - INTERVAL '${sql.raw(String(days))} days'
    GROUP BY day
    ORDER BY day DESC
  `);
}
