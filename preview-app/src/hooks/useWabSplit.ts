// useWabSplit.ts — DIY SplitText (wabSplit) React hook.
// MIT-safe rewrite — pattern wearebrand kaynaklidir, implementasyon ozgun.
//
// GSAP SplitText plugin'e alternatif — lightweight, GSAP 3.13 ucretsiz
// SplitText'e benzer interface (chars / words / lines).

'use client';

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { wabSplit, type WabSplitResult } from '@/lib/wab-safe-animations';

// SSR/Next.js: useLayoutEffect uyarisini onle — client'ta layout, server'da
// empty-noop.
const useIsoLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

export type SplitType = 'chars' | 'words' | 'lines';

export interface UseWabSplitOptions {
  /** 'chars' | 'words' | 'lines'. Default 'chars'. */
  type?: SplitType;
  /** false ise split yapma (conditional). Default true. */
  enabled?: boolean;
  /** Dependencies — text degisince tekrar split et. */
  dependencies?: ReadonlyArray<unknown>;
}

/**
 * Element icindeki metni chars/words/lines'a boler (<span> wrap).
 * Tekrar dependencies degisince innerHTML reset + yeniden split.
 *
 * Return: { chars, words, lines } — GSAP tween'de target olarak kullan.
 */
export function useWabSplit<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  opts: UseWabSplitOptions = {}
): WabSplitResult {
  const { type = 'chars', enabled = true, dependencies = [] } = opts;
  const [result, setResult] = useState<WabSplitResult>({ chars: [], words: [], lines: [] });
  const originalHtmlRef = useRef<string | null>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    // Snapshot original HTML so we can restore on dep change / unmount.
    if (originalHtmlRef.current === null) {
      originalHtmlRef.current = el.innerHTML;
    } else {
      el.innerHTML = originalHtmlRef.current;
    }

    const split = wabSplit(el, type);
    setResult(split);

    return () => {
      // Restore original content so next effect run starts fresh.
      if (originalHtmlRef.current !== null && ref.current) {
        ref.current.innerHTML = originalHtmlRef.current;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, type, ...dependencies]);

  return result;
}
