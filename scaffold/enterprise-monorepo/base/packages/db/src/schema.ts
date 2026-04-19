/**
 * @preset/db — Drizzle schema (multi-tenant)
 *
 * Tum tablolar tenant_id ile scoped. RLS policy'leri migrations/ icinde.
 * Core tablolar:
 *   tenants     — tenant kaydi (subdomain, plan, preset config)
 *   users       — her kullanici bir tenant'a bagli
 *   products    — tenant urunleri (3D model, metadata, fiyat)
 *   orders      — tenant siparisleri
 *   audit_log   — KVKK/GDPR + guvenlik auditing
 */
import {
  pgTable,
  text,
  uuid,
  timestamp,
  jsonb,
  boolean,
  integer,
  bigint,
  index,
  uniqueIndex,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

/* ================================================================ */
/*  Enums                                                            */
/* ================================================================ */

export const planEnum = pgEnum("plan", ["free", "pro", "enterprise"]);
export const userRoleEnum = pgEnum("user_role", ["owner", "admin", "member", "viewer"]);
export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "paid",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
]);

/* ================================================================ */
/*  Tenants                                                          */
/* ================================================================ */

export const tenants = pgTable(
  "tenants",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    subdomain: text("subdomain").notNull(),
    name: text("name").notNull(),
    plan: planEnum("plan").notNull().default("free"),
    presetId: text("preset_id").notNull(), // design-claude preset (e.g., mucevher-editorial-luxury)
    customDomain: text("custom_domain"),
    config: jsonb("config").$type<{
      palette?: string;
      typography?: string;
      primaryColor?: string;
      logoUrl?: string;
      features?: string[];
    }>().default({}),
    stripeCustomerId: text("stripe_customer_id"),
    stripeSubscriptionId: text("stripe_subscription_id"),
    trialEndsAt: timestamp("trial_ends_at", { withTimezone: true }),
    suspendedAt: timestamp("suspended_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (t) => ({
    subdomainIdx: uniqueIndex("tenants_subdomain_idx").on(t.subdomain),
    customDomainIdx: uniqueIndex("tenants_custom_domain_idx").on(t.customDomain),
    planIdx: index("tenants_plan_idx").on(t.plan),
  }),
);

/* ================================================================ */
/*  Users                                                            */
/* ================================================================ */

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .references(() => tenants.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    fullName: text("full_name"),
    role: userRoleEnum("role").notNull().default("member"),
    avatarUrl: text("avatar_url"),
    locale: text("locale").default("tr"),
    emailVerifiedAt: timestamp("email_verified_at", { withTimezone: true }),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (t) => ({
    tenantEmailIdx: uniqueIndex("users_tenant_email_idx").on(t.tenantId, t.email),
    tenantIdx: index("users_tenant_idx").on(t.tenantId),
  }),
);

/* ================================================================ */
/*  Products                                                         */
/* ================================================================ */

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    description: text("description"),
    price: bigint("price", { mode: "number" }).notNull().default(0), // kurus
    currency: text("currency").notNull().default("TRY"),
    stock: integer("stock").notNull().default(0),
    isPublished: boolean("is_published").notNull().default(false),
    threeDModelUrl: text("three_d_model_url"), // R3F GLB/GLTF URL
    gallery: jsonb("gallery").$type<string[]>().default([]),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (t) => ({
    tenantSlugIdx: uniqueIndex("products_tenant_slug_idx").on(t.tenantId, t.slug),
    tenantIdx: index("products_tenant_idx").on(t.tenantId),
    publishedIdx: index("products_published_idx").on(t.tenantId, t.isPublished),
  }),
);

/* ================================================================ */
/*  Orders                                                           */
/* ================================================================ */

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    userId: uuid("user_id").references(() => users.id),
    status: orderStatusEnum("status").notNull().default("pending"),
    total: bigint("total", { mode: "number" }).notNull(), // kurus
    currency: text("currency").notNull().default("TRY"),
    items: jsonb("items").$type<Array<{
      productId: string;
      title: string;
      quantity: number;
      unitPrice: number;
    }>>().default([]),
    customer: jsonb("customer").$type<{
      email: string;
      fullName: string;
      phone?: string;
      address?: Record<string, string>;
    }>(),
    paymentProvider: text("payment_provider"), // iyzico/stripe
    paymentId: text("payment_id"),
    paidAt: timestamp("paid_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    tenantIdx: index("orders_tenant_idx").on(t.tenantId),
    statusIdx: index("orders_status_idx").on(t.tenantId, t.status),
    createdAtIdx: index("orders_created_at_idx").on(t.createdAt),
  }),
);

/* ================================================================ */
/*  Audit log (KVKK + security + compliance)                        */
/* ================================================================ */

export const auditLog = pgTable(
  "audit_log",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id").references(() => tenants.id),
    userId: uuid("user_id").references(() => users.id),
    action: text("action").notNull(), // "login" | "tenant.created" | "gdpr_delete" | "data_export" | ...
    resource: text("resource"), // tablo/entity adi
    resourceId: text("resource_id"),
    changes: jsonb("changes"), // before/after diff
    ip: text("ip"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    tenantIdx: index("audit_log_tenant_idx").on(t.tenantId),
    userIdx: index("audit_log_user_idx").on(t.userId),
    actionIdx: index("audit_log_action_idx").on(t.action),
    createdAtIdx: index("audit_log_created_at_idx").on(t.createdAt),
  }),
);

/* ================================================================ */
/*  Analytics events (opt — Mixpanel/PostHog pattern)               */
/* ================================================================ */

export const analyticsEvents = pgTable(
  "analytics_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id").references(() => tenants.id),
    userId: uuid("user_id").references(() => users.id),
    event: text("event").notNull(),
    properties: jsonb("properties").$type<Record<string, unknown>>().default({}),
    sessionId: text("session_id"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    tenantEventIdx: index("analytics_tenant_event_idx").on(t.tenantId, t.event),
    createdAtIdx: index("analytics_created_at_idx").on(t.createdAt),
  }),
);

/* ================================================================ */
/*  Relations                                                        */
/* ================================================================ */

export const tenantsRelations = relations(tenants, ({ many }) => ({
  users: many(users),
  products: many(products),
  orders: many(orders),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  tenant: one(tenants, { fields: [users.tenantId], references: [tenants.id] }),
  orders: many(orders),
}));

export const productsRelations = relations(products, ({ one }) => ({
  tenant: one(tenants, { fields: [products.tenantId], references: [tenants.id] }),
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  tenant: one(tenants, { fields: [orders.tenantId], references: [tenants.id] }),
  user: one(users, { fields: [orders.userId], references: [users.id] }),
}));

/* ================================================================ */
/*  Type exports                                                     */
/* ================================================================ */

export type Tenant = typeof tenants.$inferSelect;
export type NewTenant = typeof tenants.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type AuditLogEntry = typeof auditLog.$inferSelect;
export type NewAuditLogEntry = typeof auditLog.$inferInsert;
