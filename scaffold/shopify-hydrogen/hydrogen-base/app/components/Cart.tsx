import { CartForm, Money, Image } from "@shopify/hydrogen";
import { Link, useFetcher } from "@remix-run/react";
import { useState, useEffect } from "react";
import type { Cart as CartType, CartLine } from "@shopify/hydrogen/storefront-api-types";

interface CartMainProps {
  cart: CartType | null;
  layout: "aside" | "page";
}

/**
 * CartMain — hem aside drawer hem de /cart sayfasi icin ayni component.
 */
export function CartMain({ cart, layout }: CartMainProps) {
  if (!cart || cart.lines?.nodes?.length === 0) {
    return <CartEmpty layout={layout} />;
  }

  return (
    <div className={layout === "aside" ? "flex h-full flex-col" : "grid gap-12 lg:grid-cols-[1fr_380px]"}>
      <div className={layout === "aside" ? "flex-1 overflow-y-auto p-4" : ""}>
        <ul className="divide-y divide-[var(--color-border)]">
          {cart.lines.nodes.map((line: any) => (
            <CartLineItem key={line.id} line={line} layout={layout} />
          ))}
        </ul>
      </div>
      <CartSummary cart={cart} layout={layout} />
    </div>
  );
}

function CartLineItem({ line, layout }: { line: any; layout: "aside" | "page" }) {
  const { id, merchandise, quantity, cost } = line;
  const productHandle = merchandise?.product?.handle;

  return (
    <li className="flex gap-4 py-6">
      {merchandise?.image && (
        <Link to={`/products/${productHandle}`} className="flex-shrink-0">
          <Image
            data={merchandise.image}
            width={layout === "aside" ? 80 : 120}
            height={layout === "aside" ? 80 : 120}
            className="aspect-square object-cover bg-[var(--color-surface)]"
            loading="lazy"
          />
        </Link>
      )}

      <div className="flex-1 space-y-2 min-w-0">
        <Link to={`/products/${productHandle}`} className="block">
          <p className="text-sm font-medium line-clamp-2">{merchandise?.product?.title}</p>
          {merchandise?.title !== "Default Title" && (
            <p className="text-xs opacity-60">{merchandise?.title}</p>
          )}
        </Link>

        <CartLineQuantity line={line} />
      </div>

      <div className="text-right space-y-2 flex-shrink-0">
        <Money data={cost.totalAmount} className="text-sm price-display" />
        <CartLineRemove lineId={id} />
      </div>
    </li>
  );
}

function CartLineQuantity({ line }: { line: any }) {
  const { id, quantity } = line;
  return (
    <div className="flex items-center gap-2 text-sm">
      <CartUpdateButton lineId={id} quantity={Math.max(0, quantity - 1)}>
        <span aria-label="Azalt" className="w-6 h-6 border border-current flex items-center justify-center hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] transition-colors">
          -
        </span>
      </CartUpdateButton>
      <span className="w-8 text-center tabular-nums">{quantity}</span>
      <CartUpdateButton lineId={id} quantity={quantity + 1}>
        <span aria-label="Arttir" className="w-6 h-6 border border-current flex items-center justify-center hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] transition-colors">
          +
        </span>
      </CartUpdateButton>
    </div>
  );
}

function CartUpdateButton({
  lineId,
  quantity,
  children,
}: {
  lineId: string;
  quantity: number;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{ lines: [{ id: lineId, quantity }] }}
    >
      <button type="submit" className="cursor-pointer">
        {children}
      </button>
    </CartForm>
  );
}

function CartLineRemove({ lineId }: { lineId: string }) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{ lineIds: [lineId] }}
    >
      <button type="submit" className="text-xs uppercase tracking-wider underline underline-offset-4 opacity-60 hover:opacity-100">
        Kaldir
      </button>
    </CartForm>
  );
}

function CartSummary({ cart, layout }: { cart: any; layout: "aside" | "page" }) {
  return (
    <aside className={layout === "aside" ? "border-t border-[var(--color-border)] p-4 space-y-4" : "space-y-6 sticky top-24 self-start border border-[var(--color-border)] p-6"}>
      <h2 className={layout === "aside" ? "text-sm uppercase tracking-wider font-medium" : "text-2xl font-display"}>
        Ozet
      </h2>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="opacity-70">Ara toplam</dt>
          <dd className="price-display">
            <Money data={cart.cost.subtotalAmount} />
          </dd>
        </div>
        {cart.cost?.totalTaxAmount && (
          <div className="flex justify-between">
            <dt className="opacity-70">KDV</dt>
            <dd className="price-display">
              <Money data={cart.cost.totalTaxAmount} />
            </dd>
          </div>
        )}
        <div className="flex justify-between border-t border-[var(--color-border)] pt-2 font-medium">
          <dt>Toplam</dt>
          <dd className="price-display text-base">
            <Money data={cart.cost.totalAmount} />
          </dd>
        </div>
      </dl>

      <a
        href={cart.checkoutUrl}
        className="block w-full text-center bg-[var(--color-ink)] text-[var(--color-bg)] px-6 py-4 text-sm uppercase tracking-wider hover:bg-[var(--color-accent)] transition-colors"
      >
        Odemeye Gec
      </a>

      <p className="text-[10px] uppercase tracking-[0.2em] opacity-50 text-center">
        iyzico SSL · KVKK uyumlu · Hizli kargo
      </p>
    </aside>
  );
}

function CartEmpty({ layout }: { layout: "aside" | "page" }) {
  return (
    <div className={layout === "aside" ? "p-8 text-center space-y-4" : "py-12 text-center space-y-4"}>
      <p className="opacity-60 text-sm">Sepetinizde urun bulunmuyor.</p>
      <Link
        to="/collections/all"
        className="inline-block border border-current px-6 py-3 text-sm uppercase tracking-wider hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-colors"
      >
        Kesfet
      </Link>
    </div>
  );
}

/**
 * CartAside — site genelinde kullanilabilecek slide-over drawer.
 * Zustand veya URL state ile acilip kapanabilir (placeholder).
 */
export function CartAside({ cart }: { cart: any }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("cart:open", handler);
    return () => window.removeEventListener("cart:open", handler);
  }, []);

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Sepeti kapat"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        />
      )}
      <aside
        className="cart-aside"
        data-open={open}
        aria-hidden={!open}
      >
        <header className="flex items-center justify-between border-b border-[var(--color-border)] p-4">
          <h2 className="text-sm uppercase tracking-wider font-medium">Sepet</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-xs uppercase tracking-wider hover:opacity-60"
          >
            Kapat
          </button>
        </header>
        {cart ? <CartMain cart={cart} layout="aside" /> : <CartEmpty layout="aside" />}
      </aside>
    </>
  );
}
