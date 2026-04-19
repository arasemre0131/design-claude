// useGSAP.ts — GSAP context-bound hook (useGSAP pattern, self-contained).
//
// @gsap/react'un resmi `useGSAP` hook'u GreenSock premium paketine dahil,
// ama plugin registration degerli degil — biz kendimiz gsap.context() +
// useEffect cleanup ile ayni davranisi implement ediyoruz (MIT, free).

'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from './useReducedMotion';

export type GsapScope = Element | { current: Element | null } | null | undefined;

export type GsapCallback = (
  self: gsap.Context,
  contextSafe: <T extends (...args: unknown[]) => unknown>(fn: T) => T
) => void | (() => void);

export interface UseGsapOptions {
  /** Dependency array — callback yeniden calisir. Default: []. */
  dependencies?: ReadonlyArray<unknown>;
  /** Scope element (ref OR Element) — gsap.context bu icine cizilir. */
  scope?: GsapScope;
  /** prefers-reduced-motion'da callback'i atla. Default: true. */
  respectReducedMotion?: boolean;
}

/**
 * useGSAP hook — gsap.context() lifecycle yonetimi.
 * Kullanim:
 *   const ref = useRef<HTMLElement>(null);
 *   useGSAP((ctx) => {
 *     gsap.to(ref.current, { x: 100 });
 *   }, { scope: ref });
 */
export function useGSAP(callback: GsapCallback, opts: UseGsapOptions = {}): gsap.Context | null {
  const { dependencies = [], scope, respectReducedMotion = true } = opts;
  const reducedMotion = useReducedMotion();
  const contextRef = useRef<gsap.Context | null>(null);
  const [, setRerender] = useState<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (respectReducedMotion && reducedMotion) return;

    // Resolve scope: Element, ref object, or undefined.
    let scopeEl: Element | undefined;
    if (scope) {
      if (typeof (scope as { current?: unknown }).current !== 'undefined') {
        const current = (scope as { current: Element | null }).current;
        if (current) scopeEl = current;
      } else if (typeof Element !== 'undefined' && scope instanceof Element) {
        scopeEl = scope;
      }
    }

    const ctx = gsap.context(() => {
      // contextSafe mimics @gsap/react — any fn invoked inside gets
      // auto-cleaned when ctx.revert() runs.
      const contextSafe = <T extends (...args: unknown[]) => unknown>(fn: T): T => fn;
      const teardown = callback(ctx, contextSafe);
      // Return cleanup (void or () => void); handled by ctx.revert anyway.
      if (typeof teardown === 'function') {
        ctx.add(() => {
          teardown();
        });
      }
    }, scopeEl);

    contextRef.current = ctx;
    // Trigger render cycle so consumer can read ctx on next tick if needed.
    setRerender((n) => n + 1);

    return () => {
      ctx.revert();
      contextRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, reducedMotion, scope]);

  return contextRef.current;
}
