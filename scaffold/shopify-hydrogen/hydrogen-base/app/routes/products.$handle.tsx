import { defer, type LoaderFunctionArgs, type MetaFunction } from "@shopify/remix-oxygen";
import { useLoaderData, Await } from "@remix-run/react";
import { Suspense } from "react";
import { getSeoMeta, Money, VariantSelector, getSelectedProductOptions } from "@shopify/hydrogen";
import { PRODUCT_QUERY } from "~/lib/queries";
import { parseMetafield, formatTurkishPrice } from "~/lib/shopify.server";
import { ProductCard3D } from "~/components/ProductCard3D";
import { ProductSpec } from "~/components/ProductSpec";
import { AddToCartButton } from "~/components/AddToCartButton";
import { JsonLd } from "~/components/JsonLd";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.product) return [{ title: "Urun bulunamadi" }];
  const seo = data.product.seo;
  return getSeoMeta({
    title: seo?.title || data.product.title,
    description: seo?.description || data.product.description,
  });
};

export async function loader({ params, context, request }: LoaderFunctionArgs) {
  const { handle } = params;
  if (!handle) throw new Response("Handle yok", { status: 400 });

  const { storefront } = context;
  const selectedOptions = getSelectedProductOptions(request);

  const { product } = await storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
      country: "TR",
      language: "TR",
    },
    cache: storefront.CacheShort(),
  });

  if (!product) throw new Response("Urun bulunamadi", { status: 404 });

  /* Metafield parse — 3D model URL + AR USDZ + sertifika */
  const modelUrl = parseMetafield(product.metafield3d);
  const arUsdzUrl = parseMetafield(product.metafieldArUsdz);
  const certificateUrl = parseMetafield(product.metafieldCertificate);

  return defer({
    product,
    modelUrl,
    arUsdzUrl,
    certificateUrl,
    selectedOptions,
  });
}

export default function ProductPage() {
  const { product, modelUrl, arUsdzUrl, certificateUrl, selectedOptions } = useLoaderData<typeof loader>();

  const firstVariant = product.variants.nodes[0];
  const selectedVariant = product.variants.nodes.find((v: any) =>
    v.selectedOptions.every((opt: any) =>
      selectedOptions.some(
        (sel: any) => sel.name === opt.name && sel.value === opt.value,
      ),
    ),
  ) || firstVariant;

  return (
    <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* LEFT — 3D viewer / image */}
        <div className="space-y-4">
          {modelUrl ? (
            <ProductCard3D
              product={{
                id: product.id,
                title: product.title,
                modelUrl,
                fallbackImage: product.featuredImage,
              }}
              fullSize
            />
          ) : product.featuredImage ? (
            <div className="aspect-square overflow-hidden bg-[var(--color-surface)]">
              <img
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || product.title}
                width={product.featuredImage.width}
                height={product.featuredImage.height}
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}

          {/* Gallery thumbnails */}
          {product.images?.nodes && product.images.nodes.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.nodes.slice(0, 8).map((img: any) => (
                <div key={img.id} className="aspect-square overflow-hidden bg-[var(--color-surface)]">
                  <img
                    src={img.url}
                    alt={img.altText || ""}
                    width={img.width}
                    height={img.height}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}

          {/* AR button (iOS Quick Look + Scene Viewer) */}
          {arUsdzUrl && (
            <a
              rel="ar"
              href={arUsdzUrl}
              className="block w-full border border-current py-3 text-center text-sm uppercase tracking-wider hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-colors"
            >
              AR ile Incele
            </a>
          )}
        </div>

        {/* RIGHT — product info + variant selector + add to cart */}
        <div className="space-y-8">
          <header>
            <p className="text-xs uppercase tracking-[0.3em] opacity-60">{product.vendor}</p>
            <h1 className="mt-2 text-4xl font-display md:text-5xl text-balance">
              {product.title}
            </h1>
          </header>

          <div className="flex items-baseline gap-3">
            <Money data={selectedVariant.price} className="text-2xl font-medium price-display" />
            {selectedVariant.compareAtPrice && (
              <Money
                data={selectedVariant.compareAtPrice}
                className="text-lg line-through opacity-50"
              />
            )}
          </div>

          {product.descriptionHtml && (
            <div
              className="prose prose-sm max-w-none opacity-80"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          )}

          {/* Variant selector (Hydrogen native) */}
          <VariantSelector handle={product.handle} options={product.options}>
            {({ option }) => (
              <div key={option.name} className="space-y-2">
                <div className="text-xs uppercase tracking-wider opacity-60">
                  {option.name}
                </div>
                <div className="flex flex-wrap gap-2">
                  {option.values.map(({ value, isAvailable, isActive, to }) => (
                    <a
                      key={value}
                      href={to}
                      className={`border px-4 py-2 text-sm transition-colors ${
                        isActive
                          ? "bg-[var(--color-ink)] text-[var(--color-bg)] border-[var(--color-ink)]"
                          : "border-[var(--color-border)] hover:border-[var(--color-ink)]"
                      } ${!isAvailable ? "opacity-30 line-through" : ""}`}
                    >
                      {value}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </VariantSelector>

          <AddToCartButton
            variantId={selectedVariant.id}
            quantity={1}
            disabled={!selectedVariant.availableForSale}
          >
            {selectedVariant.availableForSale ? "Sepete Ekle" : "Stokta Yok"}
          </AddToCartButton>

          {/* Spec sheet */}
          {product.metafieldSpec && <ProductSpec metafield={product.metafieldSpec} />}

          {/* Certificate link */}
          {certificateUrl && (
            <a
              href={certificateUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm underline underline-offset-4 opacity-70 hover:opacity-100"
            >
              Sertifika PDF Indir
            </a>
          )}
        </div>
      </div>

      {/* Structured data — Product + Offer JSON-LD */}
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          description: product.description,
          image: product.featuredImage?.url,
          brand: { "@type": "Brand", name: product.vendor },
          offers: {
            "@type": "Offer",
            price: selectedVariant.price.amount,
            priceCurrency: selectedVariant.price.currencyCode,
            availability: selectedVariant.availableForSale
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          },
          ...(modelUrl && {
            mainEntity: {
              "@type": "3DModel",
              name: product.title,
              encodingFormat: "model/gltf-binary",
              contentUrl: modelUrl,
            },
          }),
        }}
      />
    </article>
  );
}
