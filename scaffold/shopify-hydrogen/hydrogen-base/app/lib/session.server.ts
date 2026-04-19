/**
 * Hydrogen session handling — Cloudflare Worker compatible (crypto.subtle).
 * Shopify oturum datasi (cart ID, customer session) HttpOnly + Secure cookie'de.
 */

import {
  createCookieSessionStorage,
  type Session,
  type SessionStorage,
} from "@shopify/remix-oxygen";
import type { HydrogenSession } from "@shopify/hydrogen";

export type SessionData = {
  customerAccessToken?: string;
  cartId?: string;
  nonce?: string;
  state?: string;
  codeVerifier?: string;
};

export class AppSession implements HydrogenSession {
  #sessionStorage: SessionStorage<SessionData>;
  #session: Session<SessionData>;

  constructor(sessionStorage: SessionStorage<SessionData>, session: Session<SessionData>) {
    this.#sessionStorage = sessionStorage;
    this.#session = session;
  }

  static async init(request: Request, secrets: string[]): Promise<AppSession> {
    const storage = createCookieSessionStorage<SessionData>({
      cookie: {
        name: "__session",
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secrets,
        secure: process.env.NODE_ENV === "production",
      },
    });

    const session = await storage
      .getSession(request.headers.get("Cookie"))
      .catch(() => storage.getSession());

    return new AppSession(storage, session);
  }

  get has(): Session<SessionData>["has"] {
    return this.#session.has.bind(this.#session);
  }

  get get(): Session<SessionData>["get"] {
    return this.#session.get.bind(this.#session);
  }

  get flash(): Session<SessionData>["flash"] {
    return this.#session.flash.bind(this.#session);
  }

  get unset(): Session<SessionData>["unset"] {
    return this.#session.unset.bind(this.#session);
  }

  get set(): Session<SessionData>["set"] {
    return this.#session.set.bind(this.#session);
  }

  destroy() {
    return this.#sessionStorage.destroySession(this.#session);
  }

  commit() {
    return this.#sessionStorage.commitSession(this.#session);
  }
}

export type { HydrogenSession };

/* ------------------------------------------------------------------ */
/*  Context factory — server.ts'de kullanilabilir helper               */
/* ------------------------------------------------------------------ */

export async function createAppLoadContext(
  request: Request,
  env: Env,
): Promise<{ session: AppSession }> {
  const session = await AppSession.init(request, [env.SESSION_SECRET]);
  return { session };
}

/* ------------------------------------------------------------------ */
/*  Customer Account placeholder (Hydrogen native type re-export)     */
/* ------------------------------------------------------------------ */

export type CustomerAccount = ReturnType<
  typeof import("@shopify/hydrogen").createCustomerAccountClient
>;
