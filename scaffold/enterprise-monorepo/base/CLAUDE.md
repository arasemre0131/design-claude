# __PRESET_ID__ — Claude Code Proje Kurallari (Tier 5)

## Preset Bilgisi

| Alan | Deger |
|------|-------|
| Preset ID | `__PRESET_ID__` |
| Sektor | `__PRESET_SECTOR__` |
| Stil | `__PRESET_STYLE__` |
| Recipe | `__PRESET_RECIPE__` |
| Tier | `5 — Enterprise` |
| Butce | __BUDGET_MIN__ – __BUDGET_MAX__ TL |
| Teslim | __DELIVERY_MIN__ – __DELIVERY_MAX__ hafta |

## Atoms (Design Council Onayli)

| Atom | ID |
|------|-----|
| Palette | `__ATOM_PALETTE__` |
| Typography | `__ATOM_TYPOGRAPHY__` |
| Header | `__ATOM_HEADER__` |
| Nav | `__ATOM_NAV__` |
| Hero | `__ATOM_HERO__` |
| KPI | `__ATOM_KPI__` |
| Footer | `__ATOM_FOOTER__` |

## Yasakli ID'ler (BU PROJEDE KULLANILAMAZ)

__ANTI_CLICHE_LIST__

## Monorepo Topolojisi

```
apps/web     → customer storefront (multi-tenant subdomain)
apps/admin   → tenant admin panel (auth middleware)
apps/api     → standalone API (Fly.io deploy)

packages/ui             → shared React components
packages/db             → Drizzle ORM schema + queries
packages/auth           → Supabase auth wrapper
packages/observability  → Sentry + Mixpanel + PostHog
packages/config         → eslint + tsconfig presets
```

## Calisma Kurallari (Tier 5 Ozel)

1. **Paket referansi:** `"@preset/db": "workspace:*"` — dogrudan path import YOK.
2. **tsconfig path alias:** `@preset/*` calisir, `@/*` sadece app icinde.
3. **Multi-tenant her zaman:** DB query'lerde `tenantId` zorunlu, `@preset/db/queries` helper kullan.
4. **IDOR onleme:** `requireUser({ tenantId: ... })` her protected route'ta.
5. **Secret koruma:**
   - `NEXT_PUBLIC_*` → client'a gidebilir
   - `SUPABASE_SERVICE_ROLE_KEY` + `STRIPE_WEBHOOK_SECRET` → SADECE server
   - `.env.local` ASLA commit — .gitignore'da zaten var
6. **Observability zorunlu:**
   - Kullanici eylemi → `track("event.name", props)`
   - Hata → `captureException(err, context)` (throw'dan once)
   - Feature flag → `isFeatureEnabled("flag_name")`
7. **Audit log:** Kritik eylemler (tenant.created, user.delete, gdpr_delete) `writeAudit()` cagir.
8. **Turborepo cache:** CI'da `TURBO_TOKEN` + `TURBO_TEAM` ayarli, hit orani %60+ olmali.
9. **99.9% SLA:** Her deploy oncesi `pnpm typecheck && pnpm lint && pnpm test` pass sart.
10. **Turkce UI:** `html lang="tr"`, tum label/placeholder/error mesaji Turkce.
11. **Mobile-first:** 375/768/1280 breakpoint test zorunlu.

## Onemli Dosyalar

- `apps/web/middleware.ts` — multi-tenant subdomain router
- `apps/admin/middleware.ts` — auth guard
- `packages/db/src/schema.ts` — 6 tablo: tenants, users, products, orders, auditLog, analyticsEvents
- `packages/db/migrations/0001_init_rls.sql` — Row Level Security policy'leri
- `packages/observability/src/index.ts` — `initObservability`, `track`, `captureException`
- `.github/workflows/deploy.yml` — Vercel + Fly.io + DB migrate CI/CD

## Teslim Oncesi Checklist (Tier 5)

- [ ] `pnpm typecheck` pass (0 error, her paket)
- [ ] `pnpm lint` pass
- [ ] `pnpm test` pass (unit + integration)
- [ ] Lighthouse mobile >= __LIGHTHOUSE_TARGET__ (web + admin)
- [ ] WCAG __WCAG_TARGET__
- [ ] Turborepo cache hit orani %60+ (2. build test)
- [ ] Sentry source maps upload OK
- [ ] `/api/health` 200 dondurur (uptime monitor)
- [ ] KVKK export/delete endpoint'leri calisir
- [ ] Audit log INSERT testi gecti
- [ ] 3 breakpoint gorsel test (375/768/1280) — her app
- [ ] Docker Compose tek komutla calisir
- [ ] `vercel --prod` (web + admin) + `flyctl deploy` (api) basarili

## Referans

- ULTRAPLAN Bolum 6.5 Tier 5 Enterprise detay
- Recipe: `C:/Users/EAS/Desktop/armut/research/design-claude/catalog/recipes/__PRESET_RECIPE__.yaml`
- Research: `monorepo-turborepo-pnpm-2026.md`, `multi-tenant-whitelabel-saas-2026.md`, `error-handling-logging-monitoring-2026.md`
