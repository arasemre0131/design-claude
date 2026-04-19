import { Link } from "@remix-run/react";
import { Money } from "@shopify/hydrogen";

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    handle: string;
    vendor?: string;
    availableForSale: boolean;
    featuredImage?: { url: string; altText?: string; width?: number; height?: number } | null;
    priceRange: {
      minVariantPrice: { amount: string; currencyCode: string };
    };
    compareAtPriceRange?: {
      minVariantPrice?: { amount: string; currencyCode: string };
    };
    metafield3d?: { value: string } | null;
  };
}

/**
 * ProductCard — koleksiyon listesinde kullanilan kart.
 * 3D metafield varsa kose rozeti goster (ayrica detail sayfada 3D viewer acilir).
 */
export function ProductCard({ product }: ProductCardProps) {
  const has3D = !!product.metafield3d?.value;
  const isOnSale =
    product.compareAtPriceRange?.minVariantPrice &&
    parseFloat(product.compareAtPriceRange.minVariantPrice.amount) >
      parseFloat(product.priceRange.minVariantPrice.amount);

  return (
    <Link to={`/products/${product.handle}`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-[var(--color-surface)]">
        {product.featuredImage ? (
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            width={product.featuredImage.width}
            height={product.featuredImage.height}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center opacity-30 text-xs uppercase">
            Gorsel yok
          </div>
        )}

        {/* Rozetler */}
        {has3D && (
          <div className="absolute left-3 top-3 bg-[var(--color-ink)] text-[var(--color-bg)] px-2 py-1 text-[10px] uppercase tracking-[0.2em] font-mono">
            3D
          </div>
        )}
        {isOnSale && (
          <div className="absolute right-3 top-3 bg-[var(--color-accent)] text-[var(--color-bg)] px-2 py-1 text-[10px] uppercase tracking-[0.2em]">
            Kampanya
          </div>
        )}
        {!product.availableForSale && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg)]/80">
            <span className="text-xs uppercase tracking-[0.3em]">Stokta Yok</span>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-1">
        {product.vendor && (
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">
            {product.vendor}
          </p>
        )}
        <h3 className="text-sm font-medium leading-snug">{product.title}</h3>
        <div className="flex items-baseline gap-2">
          <Money
            data={product.priceRange.minVariantPrice}
            className="text-sm price-display"
          />
          {isOnSale && product.compareAtPriceRange?.minVariantPrice && (
            <Money
              data={product.compareAtPriceRange.minVariantPrice}
              className="text-xs opacity-50 line-through"
            />
          )}
        </div>
      </div>
    </Link>
  );
}
