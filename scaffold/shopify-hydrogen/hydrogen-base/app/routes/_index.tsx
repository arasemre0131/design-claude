import { defer, type LoaderFunctionArgs, type MetaFunction } from "@shopify/remix-oxygen";
import { Await, useLoaderData, Link } from "@remix-run/react";
import { Suspense } from "react";
import { HOMEPAGE_QUERY } from "~/lib/queries";
import { Hero } from "~/components/Hero";
import { ProductCard } from "~/components/ProductCard";
import { ProductGrid } from "~/components/ProductGrid";
import { PRESET_NAME } from "~/lib/constants";

export const meta: MetaFunction = () => [
  { title: `${PRESET_NAME} — Anasayfa` },
  { name: "description", content: "Premium mucevher + mobilya koleksiyonu. El emegi sayisal." },
];

export async function loader({ context }: LoaderFunctionArgs) {
  const { storefront } = context;

  /* Critical data (synchronous — hero) */
  const criticalData = await storefront.query(HOMEPAGE_QUERY, {
    variables: { country: "TR", language: "TR" },
    cache: storefront.CacheLong(),
  });

  /* Defer non-critical (streaming) */
  const recommendedProducts = storefront
    .query(HOMEPAGE_QUERY, {
      variables: { country: "TR", language: "TR" },
      cache: storefront.CacheShort(),
    })
    .catch(() => null);

  return defer({
    critical: criticalData,
    recommended: recommendedProducts,
  });
}

export default function HomePage() {
  const data = useLoaderData<typeof loader>();
  const featured = data.critical.featured;
  const collections = data.critical.collections?.nodes || [];

  return (
    <div>
      <Hero
        title={PRESET_NAME}
        subtitle="El emegi sayisal. Premium koleksiyon."
        ctaPrimary={{ label: "Koleksiyonu Kesfet", href: "/collections/all" }}
        ctaSecondary={{ label: "Atolyeyi Tani", href: "/pages/atolye" }}
      />

      {/* Featured collection */}
      {featured && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <header className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] opacity-60">Oneri</p>
              <h2 className="mt-2 text-4xl font-display md:text-5xl">{featured.title}</h2>
            </div>
            <Link
              to={`/collections/${featured.handle}`}
              className="text-sm uppercase tracking-wider underline underline-offset-4 hover:opacity-60"
            >
              Tumunu Gor
            </Link>
          </header>

          <ProductGrid>
            {(featured.products?.nodes || []).slice(0, 8).map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>
        </section>
      )}

      {/* Collections grid */}
      {collections.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-[var(--color-border)]">
          <header className="mb-12">
            <p className="text-xs uppercase tracking-[0.3em] opacity-60">Kategoriler</p>
            <h2 className="mt-2 text-4xl font-display md:text-5xl">Koleksiyonlar</h2>
          </header>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {collections.slice(0, 6).map((collection: any) => (
              <Link
                key={collection.id}
                to={`/collections/${collection.handle}`}
                className="group block"
              >
                {collection.image && (
                  <div className="aspect-square overflow-hidden bg-[var(--color-surface)]">
                    <img
                      src={collection.image.url}
                      alt={collection.image.altText || collection.title}
                      width={collection.image.width}
                      height={collection.image.height}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
                <h3 className="mt-3 text-sm font-medium uppercase tracking-wide">
                  {collection.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recommended (deferred) */}
      <Suspense fallback={<div className="py-16 text-center opacity-60">Yukleniyor...</div>}>
        <Await resolve={data.recommended} errorElement={null}>
          {(recommendedData: any) => {
            const products = recommendedData?.newArrivals?.nodes || [];
            if (products.length === 0) return null;
            return (
              <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-[var(--color-border)]">
                <header className="mb-12">
                  <p className="text-xs uppercase tracking-[0.3em] opacity-60">Yeni</p>
                  <h2 className="mt-2 text-4xl font-display md:text-5xl">Son Eklenenler</h2>
                </header>
                <ProductGrid>
                  {products.slice(0, 8).map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </ProductGrid>
              </section>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
