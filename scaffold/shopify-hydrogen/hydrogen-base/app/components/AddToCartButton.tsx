import { CartForm } from "@shopify/hydrogen";

interface AddToCartButtonProps {
  variantId: string;
  quantity?: number;
  disabled?: boolean;
  children: React.ReactNode;
  analytics?: Record<string, any>;
}

/**
 * AddToCartButton — Hydrogen CartForm ile LinesAdd action tetikler.
 * Form action "/cart" route'una post eder, cart context guncellenir.
 */
export function AddToCartButton({
  variantId,
  quantity = 1,
  disabled,
  children,
  analytics,
}: AddToCartButtonProps) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesAdd}
      inputs={{
        lines: [
          {
            merchandiseId: variantId,
            quantity,
          },
        ],
      }}
    >
      {(fetcher) => (
        <>
          {analytics && (
            <input type="hidden" name="analytics" value={JSON.stringify(analytics)} />
          )}
          <button
            type="submit"
            disabled={disabled || fetcher.state !== "idle"}
            className="w-full bg-[var(--color-ink)] text-[var(--color-bg)] px-6 py-4 text-sm uppercase tracking-wider hover:bg-[var(--color-accent)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {fetcher.state !== "idle" ? "Ekleniyor..." : children}
          </button>
        </>
      )}
    </CartForm>
  );
}
