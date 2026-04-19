import { json, type LoaderFunctionArgs, type MetaFunction } from "@shopify/remix-oxygen";
import { useLoaderData, Form, useSearchParams } from "@remix-run/react";
import { SEARCH_QUERY } from "~/lib/queries";
import { ProductCard } from "~/components/ProductCard";
import { ProductGrid } from "~/components/ProductGrid";

export const meta: MetaFunction = () => [{ title: "Arama" }];

export async function loader({ request, context }: LoaderFunctionArgs) {
  const { storefront } = context;
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";

  if (!query) return json({ query: "", results: { products: { nodes: [] } } });

  const results = await storefront.query(SEARCH_QUERY, {
    variables: {
      query,
      first: 24,
      country: "TR",
      language: "TR",
    },
  });

  return json({ query, results });
}

export default function SearchPage() {
  const { query, results } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const products = results.products?.nodes || [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12">
        <p className="text-xs uppercase tracking-[0.3em] opacity-60">Arama</p>
        <Form method="get" className="mt-4 flex max-w-2xl gap-2 border-b border-[var(--color-border)] pb-2">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Urun, kategori veya marka..."
            className="flex-1 bg-transparent py-3 text-xl outline-none placeholder:opacity-40 focus:placeholder:opacity-20"
            autoFocus
          />
          <button
            type="submit"
            className="text-sm uppercase tracking-wider px-4 hover:opacity-60 transition-opacity"
          >
            Ara
          </button>
        </Form>

        {query && (
          <p className="mt-4 text-sm opacity-70">
            <span className="font-medium">"{query}"</span> icin {products.length} sonuc
          </p>
        )}
      </header>

      {products.length > 0 ? (
        <ProductGrid>
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      ) : query ? (
        <p className="py-16 text-center opacity-60">
          Sonuc bulunamadi. Farkli bir arama deneyin.
        </p>
      ) : null}
    </section>
  );
}
