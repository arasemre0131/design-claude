-- ================================================================
-- Tenant-scoped Row Level Security (RLS) — Supabase Postgres 16
-- ================================================================
-- Bu migration Drizzle generate'ten sonra manuel calistirilir.
-- Amac: her tenant sadece kendi satirina erisebilir.

-- 1. Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Helper function: session'dan tenant_id cikar
CREATE OR REPLACE FUNCTION auth.tenant_id() RETURNS uuid AS $$
  SELECT NULLIF(
    current_setting('request.jwt.claims', true)::json ->> 'tenant_id',
    ''
  )::uuid
$$ LANGUAGE sql STABLE;

-- 3. Tenants table: herkes kendi tenant'ini okuyabilir
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tenants_read_own" ON tenants
  FOR SELECT USING (id = auth.tenant_id());

CREATE POLICY "tenants_update_own" ON tenants
  FOR UPDATE USING (id = auth.tenant_id());

-- Insert + delete sadece service_role'dan
-- (supabase-js client service_role ile calisirsa bypass edilir)

-- 4. Products: tenant-scoped
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "products_read_own_tenant" ON products
  FOR SELECT USING (tenant_id = auth.tenant_id());

CREATE POLICY "products_cud_own_tenant" ON products
  FOR ALL USING (tenant_id = auth.tenant_id())
  WITH CHECK (tenant_id = auth.tenant_id());

-- 5. Orders: tenant-scoped
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "orders_tenant_isolation" ON orders
  FOR ALL USING (tenant_id = auth.tenant_id())
  WITH CHECK (tenant_id = auth.tenant_id());

-- 6. Users: tenant-scoped
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_tenant_isolation" ON users
  FOR ALL USING (tenant_id = auth.tenant_id())
  WITH CHECK (tenant_id = auth.tenant_id());

-- 7. Audit log: tenant-scoped read-only
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "audit_log_read_own_tenant" ON audit_log
  FOR SELECT USING (tenant_id = auth.tenant_id());

-- Insert audit_log SERVICE ROLE'dan (RLS bypass)
-- Client'tan yazilmamali.

-- 8. Analytics events
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "analytics_tenant_isolation" ON analytics_events
  FOR ALL USING (tenant_id = auth.tenant_id())
  WITH CHECK (tenant_id = auth.tenant_id());
