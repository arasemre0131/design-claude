import { Link, Await } from "@remix-run/react";
import { Suspense } from "react";
import { PRESET_NAME } from "~/lib/constants";

interface HeaderProps {
  shop: any;
  isLoggedIn: Promise<boolean>;
  cart: Promise<any>;
}

/**
 * Header — H9 Corner Brackets stili (technical, mucevher-immersive-3d default).
 * Preset'e gore scaffold.js patch'liyor.
 */
export function Header({ shop, isLoggedIn, cart }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo — Corner Brackets */}
          <Link to="/" className="group flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.3em] font-mono opacity-60 group-hover:opacity-100 transition-opacity">
              [ {PRESET_NAME} ]
            </span>
          </Link>

          {/* Primary nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-wider">
            <Link to="/collections" className="hover:opacity-60 transition-opacity">
              Koleksiyon
            </Link>
            <Link to="/pages/atolye" className="hover:opacity-60 transition-opacity">
              Atolye
            </Link>
            <Link to="/pages/hikayemiz" className="hover:opacity-60 transition-opacity">
              Hikayemiz
            </Link>
            <Link to="/pages/iletisim" className="hover:opacity-60 transition-opacity">
              Iletisim
            </Link>
          </nav>

          {/* Utility */}
          <div className="flex items-center gap-4 text-sm">
            <Link to="/search" aria-label="Ara" className="hover:opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </Link>

            <Suspense fallback={<span className="w-5" />}>
              <Await resolve={isLoggedIn} errorElement={null}>
                {(loggedIn: boolean) => (
                  <Link to="/account" aria-label="Hesabim" className="hover:opacity-60">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </Link>
                )}
              </Await>
            </Suspense>

            <Suspense fallback={<span className="text-xs">0</span>}>
              <Await resolve={cart} errorElement={null}>
                {(cartData: any) => (
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new Event("cart:open"))}
                    aria-label="Sepet"
                    className="flex items-center gap-1 hover:opacity-60"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    <span className="text-xs font-mono tabular-nums">
                      {cartData?.totalQuantity || 0}
                    </span>
                  </button>
                )}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
}
