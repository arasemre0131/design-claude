import { json, type LoaderFunctionArgs, type MetaFunction } from "@shopify/remix-oxygen";
import { useLoaderData, Link, useNavigate, useSearchParams } from "@remix-run/react";
import { getSeoMeta, Pagination, getPaginationVariables } from "@shopify/hydrogen";
import { COLLECTION_QUERY } from "~/lib/queries";
import { ProductCard } from "~/components/ProductCard";
import { ProductGrid } from "~/components/ProductGrid";
import { CollectionFilters } from "~/components/CollectionFilters";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.collection) return [{ title: "Koleksiyon bulunamadi" }];
  const seo = data.collection.seo;
  return getSeoMeta({
    title: seo?.title || data.collection.title,
    description: seo?.description || data.collection.description,
  });
};

export async function loader({ params, request, context }: LoaderFunctionArgs) {
  const { handle } = params;
  if (!handle) throw new Response("Handle yok", { status: 400 });

  const { storefront } = context;
  const paginationVariables = getPaginationVariables(request, { pageBy: 24 });
  const url = new URL(request.url);

  const sortKey = (url.searchParams.get("sort") as any) || "MANUAL";
  const reverse = url.searchParams.get("reverse") === "true";

  const { collection } = await storefront.query(COLLECTION_QUERY, {
    variables: {
      handle,
      country: "TR",
      language: "TR",
      sortKey,
      reverse,
      ...paginationVariables,
    },
  });

  if (!collection) throw new Response("Koleksiyon bulunamadi", { status: 404 });

  return json({ collection });
}

export default function CollectionPage() {
  const { collection } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12 border-b border-[var(--color-border)] pb-8">
        <Link to="/collections" className="text-xs uppercase tracking-[0.3em] opacity-60 hover:opacity-100">
          Tum Koleksiyonlar
        </Link>
        <h1 className="mt-3 text-5xl font-display md:text-6xl text-balance">
          {collection.title}
        </h1>
        {collection.description && (
          <p className="mt-4 max-w-2xl text-base opacity-70 text-pretty">
            {collection.description}
          </p>
        )}
      </header>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="lg:block">
          <CollectionFilters
            filters={collection.products.filters || []}
            searchParams={searchParams}
          />
        </aside>

        <div>
          <Pagination connection={collection.products}>
            {({ nodes, isLoading, PreviousLink, NextLink }) => (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <PreviousLink className="text-sm uppercase tracking-wider underline underline-offset-4 disabled:opacity-30">
                    {isLoading ? "Yukleniyor..." : "Onceki"}
                  </PreviousLink>
                  <p className="text-xs uppercase tracking-[0.3em] opacity-60">
                    {nodes.length} urun
                  </p>
                  <NextLink className="text-sm uppercase tracking-wider underline underline-offset-4 disabled:opacity-30">
                    {isLoading ? "Yukleniyor..." : "Sonraki"}
                  </NextLink>
                </div>

                <ProductGrid>
                  {nodes.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </ProductGrid>
              </>
            )}
          </Pagination>
        </div>
      </div>
    </div>
  );
}
