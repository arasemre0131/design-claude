/// <reference types="@remix-run/dev" />
/// <reference types="@shopify/remix-oxygen" />
/// <reference types="@shopify/oxygen-workers-types" />

import type {
  Storefront,
  HydrogenCart,
  HydrogenSessionData,
} from "@shopify/hydrogen";
import type {
  CustomerAccount,
  HydrogenSession,
} from "~/lib/session.server";

declare global {
  /**
   * Oxygen runtime — Cloudflare Worker benzeri, Web Worker API'leri erisir.
   */
  interface Env {
    SESSION_SECRET: string;
    PUBLIC_STOREFRONT_API_TOKEN: string;
    PRIVATE_STOREFRONT_API_TOKEN: string;
    PUBLIC_STORE_DOMAIN: string;
    PUBLIC_STOREFRONT_ID: string;
    PUBLIC_STOREFRONT_API_VERSION: string;
    PUBLIC_CUSTOMER_ACCOUNT_API_URL: string;
    PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID: string;
    PUBLIC_CHECKOUT_DOMAIN: string;
    PUBLIC_3D_ASSET_CDN?: string;
    IYZIPAY_API_KEY?: string;
    IYZIPAY_SECRET_KEY?: string;
    IYZIPAY_BASE_URL?: string;
  }
}

declare module "@shopify/remix-oxygen" {
  interface AppLoadContext {
    env: Env;
    storefront: Storefront;
    customerAccount: CustomerAccount;
    cart: HydrogenCart;
    session: HydrogenSession;
    waitUntil: ExecutionContext["waitUntil"];
  }
}

export {};
