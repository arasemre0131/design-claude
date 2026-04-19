/**
 * Hydrogen server.ts — Oxygen (Cloudflare Worker benzeri) giris noktasi.
 * Request'leri createRequestHandler ile Remix'e teslim eder, global
 * storefront/customerAccount/cart/session context'ini dolduruur.
 *
 * Deploy: `shopify hydrogen deploy` -> Oxygen edge network
 */

import { createRequestHandler, getStorefrontHeaders } from "@shopify/remix-oxygen";
import {
  cartGetIdDefault,
  cartSetIdDefault,
  createCartHandler,
  createStorefrontClient,
  storefrontRedirect,
  createCustomerAccountClient,
} from "@shopify/hydrogen";
import { createAppLoadContext, AppSession } from "~/lib/session.server";

export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    try {
      const waitUntil = executionContext.waitUntil.bind(executionContext);
      const [cache, session] = await Promise.all([
        caches.open("hydrogen"),
        AppSession.init(request, [env.SESSION_SECRET]),
      ]);

      /* ---- Storefront API client ---- */
      const { storefront } = createStorefrontClient({
        cache,
        waitUntil,
        i18n: { language: "TR", country: "TR" },
        publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
        privateStorefrontToken: env.PRIVATE_STOREFRONT_API_TOKEN,
        storeDomain: env.PUBLIC_STORE_DOMAIN,
        storefrontId: env.PUBLIC_STOREFRONT_ID,
        storefrontHeaders: getStorefrontHeaders(request),
        storefrontApiVersion: env.PUBLIC_STOREFRONT_API_VERSION || "2024-10",
      });

      /* ---- Customer Account API client ---- */
      const customerAccount = createCustomerAccountClient({
        waitUntil,
        request,
        session,
        customerAccountId: env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID,
        customerAccountUrl: env.PUBLIC_CUSTOMER_ACCOUNT_API_URL,
      });

      /* ---- Cart handler ---- */
      const cart = createCartHandler({
        storefront,
        customerAccount,
        getCartId: cartGetIdDefault(request.headers),
        setCartId: cartSetIdDefault({ maxage: 60 * 60 * 24 * 365 }),
      });

      /* ---- Request handler ---- */
      const handleRequest = createRequestHandler({
        build: await import("virtual:remix/server-build"),
        mode: process.env.NODE_ENV,
        getLoadContext: () => ({
          env,
          session,
          storefront,
          customerAccount,
          cart,
          waitUntil,
        }),
      });

      const response = await handleRequest(request);

      if (response.status === 404) {
        return storefrontRedirect({
          request,
          response,
          storefront,
        });
      }

      return response;
    } catch (error) {
      console.error("Hydrogen worker error:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};
