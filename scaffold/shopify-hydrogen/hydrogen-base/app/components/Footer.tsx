import { Link } from "@remix-run/react";
import { PRESET_NAME, PRESET_SECTOR } from "~/lib/constants";

/**
 * Footer — FT6 Signature block (atolye kunyesi) stili.
 * Mucevher sektorunde Kuyumcukent/SAN-TEZ trust badges dahil.
 */
export function Footer({ shop }: { shop: any }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Kunye */}
          <div className="md:col-span-2 space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] opacity-60 font-mono">
              [ {PRESET_NAME} ]
            </p>
            <p className="max-w-sm text-sm opacity-70">
              El emegi sayisal. Her parca ozenle uretilir, sertifikalanir ve teslim edilir.
            </p>
            {PRESET_SECTOR === "mucevher" && (
              <div className="flex flex-wrap gap-3 pt-4 text-[10px] uppercase tracking-[0.2em] opacity-70">
                <span className="border border-current px-3 py-1">Kuyumcukent</span>
                <span className="border border-current px-3 py-1">SAN-TEZ</span>
                <span className="border border-current px-3 py-1">iyzico SSL</span>
                <span className="border border-current px-3 py-1">KVKK</span>
              </div>
            )}
          </div>

          {/* Navigasyon */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.3em] opacity-60">Magaza</h3>
            <nav className="space-y-2 text-sm">
              <Link to="/collections/all" className="block hover:opacity-60">
                Tum Urunler
              </Link>
              <Link to="/collections/yeni" className="block hover:opacity-60">
                Yeni Eklenenler
              </Link>
              <Link to="/pages/atolye" className="block hover:opacity-60">
                Atolye
              </Link>
              <Link to="/pages/hikayemiz" className="block hover:opacity-60">
                Hikayemiz
              </Link>
            </nav>
          </div>

          {/* Destek */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.3em] opacity-60">Destek</h3>
            <nav className="space-y-2 text-sm">
              <Link to="/policies/shipping-policy" className="block hover:opacity-60">
                Kargo
              </Link>
              <Link to="/policies/refund-policy" className="block hover:opacity-60">
                Iade
              </Link>
              <Link to="/policies/privacy-policy" className="block hover:opacity-60">
                KVKK / Gizlilik
              </Link>
              <Link to="/policies/terms-of-service" className="block hover:opacity-60">
                Uyelik Sozlesmesi
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[var(--color-border)] pt-8 text-xs opacity-60 md:flex-row md:items-center md:justify-between">
          <p>© {year} {PRESET_NAME}. Tum haklari saklidir.</p>
          <p className="font-mono">design-claude · Shopify Hydrogen</p>
        </div>
      </div>
    </footer>
  );
}
