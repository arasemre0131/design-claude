import { notFound } from "next/navigation";
import { getTenantBySubdomain } from "@preset/db/queries";

/**
 * Tenant storefront — middleware.ts tarafindan rewrite edilen yol.
 *
 * "tenant1.yourapp.com/"          → "/tenant/tenant1"
 * "tenant1.yourapp.com/urunler"   → "/tenant/tenant1/urunler"
 *
 * Tenant yoksa 404; tenant var ama plan "suspended" ise farkli sayfa.
 */
export default async function TenantHome({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const tenant = await getTenantBySubdomain(subdomain);
  if (!tenant) notFound();

  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col gap-6 px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
        {tenant.subdomain}.{process.env.ROOT_DOMAIN || "yourapp.com"} · plan: {tenant.plan}
      </p>
      <h1 className="font-display text-5xl sm:text-7xl">
        {tenant.name}
      </h1>
      <p className="text-lg text-[var(--color-muted)]">
        Hos geldiniz. Bu tenant ozel storefront sayfanizdir.
      </p>
      <nav className="mt-6 flex gap-6 text-sm">
        <a href={`/tenant/${tenant.subdomain}/urunler`} className="hover:underline">Urunler</a>
        <a href={`/tenant/${tenant.subdomain}/hakkimizda`} className="hover:underline">Hakkimizda</a>
        <a href={`/tenant/${tenant.subdomain}/iletisim`} className="hover:underline">Iletisim</a>
      </nav>
    </main>
  );
}

export const revalidate = 60; // ISR 1 dakika
