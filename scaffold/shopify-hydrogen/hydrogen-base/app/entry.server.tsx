import type { AppLoadContext, EntryContext } from "@shopify/remix-oxygen";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { createContentSecurityPolicy } from "@shopify/hydrogen";

/**
 * Server entry — Oxygen worker HTML stream'i Remix'ten uretir.
 * CSP header Hydrogen native helper ile + Turkiye/KVKK gereksinimleri icin
 * ek allowlist ile (iyzico, paytr, Shopify CDN).
 */
export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  context: AppLoadContext,
) {
  const { nonce, header, NonceProvider } = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
    // R3F + Three.js blob worker + 3D model CDN
    workerSrc: ["'self'", "blob:"],
    scriptSrc: [
      "'self'",
      "'unsafe-eval'", // R3F shader compilation
      "https://cdn.shopify.com",
      "https://www.googletagmanager.com",
    ],
    imgSrc: ["'self'", "data:", "https://cdn.shopify.com", "blob:"],
    connectSrc: [
      "'self'",
      "https://monorail-edge.shopifysvc.com",
      "https://*.myshopify.com",
      "https://api.iyzipay.com",
      "wss:",
    ],
    frameSrc: [
      "'self'",
      "https://*.myshopify.com",
      "https://iyzico.com",
      "https://www.paytr.com",
    ],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get("user-agent"))) {
    await body.allReady;
  }

  responseHeaders.set("Content-Type", "text/html");
  responseHeaders.set("Content-Security-Policy", header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
