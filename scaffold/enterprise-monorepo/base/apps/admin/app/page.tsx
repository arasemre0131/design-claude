/**
 * Admin dashboard home — tenant yoneticilerinin giris kapisi.
 * Auth middleware geciyorsa burasi acik.
 */
export default function AdminDashboard() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-8 flex items-baseline justify-between border-b border-[var(--color-border)] pb-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
            Admin · __PRESET_ID__
          </p>
          <h1 className="mt-2 text-3xl font-display">Panel Ozeti</h1>
        </div>
        <div className="text-right text-sm text-[var(--color-muted)]">
          <p className="tabular-nums">Son guncelleme: {new Date().toLocaleString("tr-TR")}</p>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Aktif Tenant", value: "—" },
          { label: "Bugunku Siparis", value: "—" },
          { label: "Aylik Gelir", value: "—" },
          { label: "99.9% SLA", value: "OK" },
        ].map((kpi) => (
          <article
            key={kpi.label}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
              {kpi.label}
            </p>
            <p className="mt-2 text-3xl font-display tabular-nums">{kpi.value}</p>
          </article>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-display">Hizli Erisim</h2>
        <nav className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/tenants", label: "Tenant Yonetimi" },
            { href: "/users", label: "Kullanicilar" },
            { href: "/products", label: "Urunler" },
            { href: "/orders", label: "Siparisler" },
            { href: "/audit", label: "Audit Log" },
            { href: "/billing", label: "Faturalama" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md border border-[var(--color-border)] px-4 py-3 text-sm transition-colors hover:bg-[var(--color-surface)]"
            >
              {item.label} <span aria-hidden>→</span>
            </a>
          ))}
        </nav>
      </section>
    </main>
  );
}
