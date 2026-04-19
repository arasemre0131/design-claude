import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import { useNonce, Analytics, getShopAnalytics } from "@shopify/hydrogen";
import type { LinksFunction, LoaderFunctionArgs, MetaFunction } from "@shopify/remix-oxygen";
import { defer } from "@shopify/remix-oxygen";
import styles from "./styles/app.css?url";
import favicon from "./assets/favicon.svg";
import { CART_QUERY_FRAGMENT } from "~/lib/fragments";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { CartAside } from "~/components/Cart";
import { KvkkBanner } from "~/components/KvkkBanner";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "preconnect", href: "https://cdn.shopify.com" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  /* __FONT_LINK__ */
  { rel: "icon", type: "image/svg+xml", href: favicon },
];

export const meta: MetaFunction = () => [
  { charset: "utf-8" },
  { name: "viewport", content: "width=device-width,initial-scale=1,maximum-scale=5" },
  { name: "theme-color", content: "__COLOR_BG__" },
  { name: "color-scheme", content: "light dark" },
];

export async function loader({ context }: LoaderFunctionArgs) {
  const { storefront, customerAccount, cart, env } = context;

  const publicStoreDomain = env.PUBLIC_STORE_DOMAIN;
  const isLoggedInPromise = customerAccount.isLoggedIn();
  const cartPromise = cart.get();

  /* ---- Shop info + analytics ---- */
  const layoutPromise = storefront.query(LAYOUT_QUERY, {
    cache: storefront.CacheLong(),
  });

  return defer({
    cart: cartPromise,
    layout: layoutPromise,
    isLoggedIn: isLoggedInPromise,
    publicStoreDomain,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    }),
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      country: "TR",
      language: "TR",
    },
  });
}

export default function App() {
  const nonce = useNonce();
  const data = useLoaderData<typeof loader>();

  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen antialiased bg-[var(--color-bg)] text-[var(--color-ink)]">
        <Analytics.Provider cart={data.cart} shop={data.shop} consent={data.consent}>
          <Header shop={data.layout} isLoggedIn={data.isLoggedIn} cart={data.cart} />
          <main>
            <Outlet />
          </main>
          <Footer shop={data.layout} />
          <CartAside cart={data.cart} />
          <KvkkBanner />
        </Analytics.Provider>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? error.data?.message || error.statusText
    : error instanceof Error
      ? error.message
      : "Bilinmeyen hata";

  return (
    <html lang="tr">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-ink)] p-8">
        <div className="max-w-md text-center space-y-4">
          <div className="text-xs uppercase tracking-[0.3em] opacity-60">Hata</div>
          <h1 className="text-4xl font-display">Bir seyler ters gitti</h1>
          <p className="opacity-70 text-sm">{message}</p>
          <a href="/" className="inline-block mt-4 border border-current px-6 py-3 text-sm uppercase tracking-wider hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-colors">
            Anasayfa
          </a>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Global layout query — shop meta (isim, adres, policy) + menu.
 */
const LAYOUT_QUERY = `#graphql
  query Layout {
    shop {
      id
      name
      description
      primaryDomain { url }
      brand {
        logo { image { url altText } }
      }
    }
    menu(handle: "main-menu") {
      id
      items {
        id
        title
        url
        items { id title url }
      }
    }
  }
` as const;
