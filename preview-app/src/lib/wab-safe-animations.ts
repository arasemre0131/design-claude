// wab-safe-animations.ts
// ---------------------------------------------------------------------------
// MIT-safe rewrite of 6 animation patterns observed on wearebrand.io
// Original: commercial-licensed minified bundle (wearebrand-animations.js).
// This file is an ORIGINAL implementation — no code copied from the source,
// only the underlying animation pattern is reproduced. Pattern references:
//
//   1. Lenis + GSAP ticker bridge       (animations.js:707-726)
//   2. Blur-36px text reveal            (animations.js:148-194)
//   3. Magnetic elastic.out(1,0.3) hover (animations.js:738-784)
//   4. CSS mask --mask-y reveal          (wearebrand_brand.html:66-80)
//   5. Theme switch on scroll zone       (animations.js:276-297)
//   6. wabSplit DIY SplitText alternative (animations.js:1-66)
//
// License: MIT — this code is free to reuse, copy, modify without attribution.
// Patterns reproduced are industry-standard (Awwwards community baseline).
// ---------------------------------------------------------------------------

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// --- Plugin registration (SSR-safe) ---------------------------------------
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Shared types ---------------------------------------------------------
export interface LenisGsapBridge {
  readonly lenis: Lenis;
  destroy(): void;
}

export interface BlurRevealOptions {
  /** 'chars' | 'words' | 'lines' — target granularity. Default 'chars'. */
  type?: 'chars' | 'words' | 'lines';
  /** px blur amount at start. Default 36. */
  blurAmount?: number;
  /** seconds. Default 1. */
  duration?: number;
  /** stagger per target (seconds). Default 0.08. */
  stagger?: number;
  /** 'immediate' | 'scroll'. Default 'scroll'. */
  trigger?: 'immediate' | 'scroll';
  /** GSAP ease. Default 'power2.out'. */
  ease?: string;
}

export interface MagneticHoverOptions {
  /** Px per mouse-offset unit. Default 0.3. */
  strength?: number;
  /** Return duration (seconds). Default 1.6. */
  returnDuration?: number;
  /** Attract duration (seconds). Default 0.4. */
  attractDuration?: number;
}

export interface MaskYRevealOptions {
  /** Starting --mask-y (CSS custom property). Default '0%'. */
  from?: string;
  /** Ending --mask-y. Default '200%'. */
  to?: string;
  /** Duration in seconds. Default 1.2. */
  duration?: number;
  /** GSAP ease. Default 'power2.out'. */
  ease?: string;
}

export interface WabSplitResult {
  chars: HTMLElement[];
  words: HTMLElement[];
  lines: HTMLElement[];
}

// --- 1. Lenis + GSAP ticker bridge ---------------------------------------
/**
 * Pattern 1 (animations.js:707-726).
 * Lenis smooth-scroll wrapper synced with GSAP ticker so ScrollTrigger
 * remains in step with the smoothed scroll position.
 *
 * The original source used the exponential curve
 *   e => Math.min(1, 1.001 - Math.pow(2, -10 * e))
 * We use a different, simpler ease curve by default (cubic-out) — still
 * industry-standard, no curve copied verbatim.
 */
export function createLenisGsapBridge(
  opts: {
    duration?: number;
    smoothWheel?: boolean;
    touchMultiplier?: number;
    easing?: (t: number) => number;
  } = {}
): LenisGsapBridge {
  const lenis = new Lenis({
    duration: opts.duration ?? 1.2,
    smoothWheel: opts.smoothWheel ?? true,
    touchMultiplier: opts.touchMultiplier ?? 2,
    // Cubic-out as safe default (not the wearebrand exponential curve)
    easing: opts.easing ?? ((t: number) => 1 - Math.pow(1 - t, 3)),
  });

  const rafHandler = (time: number): void => {
    // GSAP ticker emits time in seconds; Lenis.raf expects milliseconds.
    lenis.raf(time * 1000);
  };

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(rafHandler);
  gsap.ticker.lagSmoothing(0);

  return {
    lenis,
    destroy(): void {
      gsap.ticker.remove(rafHandler);
      lenis.destroy();
    },
  };
}

// --- 2. Blur-36px text reveal --------------------------------------------
/**
 * Pattern 2 (animations.js:148-194).
 * Splits the element into chars/words/lines and animates blur(36px) → 0
 * with opacity 0 → 1 on scroll enter (or immediately).
 *
 * Uses the wabSplit() DIY helper below — no GSAP SplitText dependency.
 */
export function blurReveal(
  element: HTMLElement,
  opts: BlurRevealOptions = {}
): gsap.core.Tween {
  const {
    type = 'chars',
    blurAmount = 36,
    duration = 1,
    stagger = 0.08,
    trigger = 'scroll',
    ease = 'power2.out',
  } = opts;

  const split = wabSplit(element, type);
  const targets: HTMLElement[] =
    type === 'chars' ? split.chars : type === 'words' ? split.words : split.lines;

  if (targets.length === 0) {
    return gsap.from(element, { duration: 0 });
  }

  const tweenVars: gsap.TweenVars = {
    filter: `blur(${blurAmount}px)`,
    opacity: 0,
    duration,
    stagger,
    ease,
  };

  if (trigger === 'scroll') {
    return gsap.from(targets, {
      ...tweenVars,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'bottom 60%',
        toggleActions: 'play none none none',
      },
    });
  }

  return gsap.from(targets, tweenVars);
}

// --- 3. Magnetic elastic.out(1, 0.3) hover -------------------------------
/**
 * Pattern 3 (animations.js:738-784).
 * Attach magnetic hover behaviour — pointer attracts element, mouseleave
 * eases back with elastic.out(1, 0.3). Desktop only (no-op under 992px).
 *
 * Returns a cleanup function that removes the listeners.
 */
export function magneticHover(
  element: HTMLElement,
  opts: MagneticHoverOptions = {}
): () => void {
  const {
    strength = 0.3,
    returnDuration = 1.6,
    attractDuration = 0.4,
  } = opts;

  // Respect prefers-reduced-motion — skip the effect entirely.
  if (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return () => {};
  }

  // Mobile / touch-only — skip (no hover target).
  if (typeof window !== 'undefined' && window.innerWidth <= 991) {
    return () => {};
  }

  const onMove = (event: PointerEvent): void => {
    const rect = element.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
    const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(element, {
      x: offsetX * rect.width * strength,
      y: offsetY * rect.height * strength,
      duration: attractDuration,
      ease: 'power4.out',
      overwrite: 'auto',
    });
  };

  const onLeave = (): void => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: returnDuration,
      ease: 'elastic.out(1, 0.3)',
      overwrite: 'auto',
      clearProps: 'transform',
    });
  };

  element.addEventListener('pointermove', onMove);
  element.addEventListener('pointerleave', onLeave);

  return (): void => {
    element.removeEventListener('pointermove', onMove);
    element.removeEventListener('pointerleave', onLeave);
    gsap.killTweensOf(element);
  };
}

// --- 4. CSS mask --mask-y reveal -----------------------------------------
/**
 * Pattern 4 (wearebrand_brand.html:66-80 + animations.js mask usage).
 * Animates the --mask-y CSS custom property from `from` to `to`.
 * Element must have a mask-image rule that reads --mask-y, e.g.:
 *   mask-image: radial-gradient(circle at 50% var(--mask-y), #000 0%, transparent 60%);
 */
export function maskYReveal(
  element: HTMLElement,
  opts: MaskYRevealOptions = {}
): gsap.core.Tween {
  const { from = '0%', to = '200%', duration = 1.2, ease = 'power2.out' } = opts;

  element.style.setProperty('--mask-y', from);

  // GSAP 3+ supports CSS var animation via the CSSPlugin (built-in).
  return gsap.to(element, {
    '--mask-y': to,
    duration,
    ease,
  } as gsap.TweenVars);
}

// --- 5. Theme switch on scroll zone --------------------------------------
/**
 * Pattern 5 (animations.js:276-297).
 * When the scroll zone enters the viewport, set document.body[data-theme]
 * to `themeName`. On leave-back, restore the previous theme (or remove).
 */
export function themeScrollSwitch(
  zone: HTMLElement,
  themeName: string,
  opts: {
    start?: string;
    end?: string;
    previousTheme?: string | null;
  } = {}
): ScrollTrigger {
  const { start = 'top 50%', end = 'bottom 50%', previousTheme = null } = opts;

  return ScrollTrigger.create({
    trigger: zone,
    start,
    end,
    onEnter: () => document.body.setAttribute('data-theme', themeName),
    onEnterBack: () => document.body.setAttribute('data-theme', themeName),
    onLeave: () => {
      if (previousTheme) document.body.setAttribute('data-theme', previousTheme);
      else document.body.removeAttribute('data-theme');
    },
    onLeaveBack: () => {
      if (previousTheme) document.body.setAttribute('data-theme', previousTheme);
      else document.body.removeAttribute('data-theme');
    },
  });
}

// --- 6. DIY wabSplit (SplitText alternative) -----------------------------
/**
 * Pattern 6 (animations.js:1-66).
 * Original idea by wearebrand — we re-implement it with a different
 * traversal strategy:
 *   - 'lines': treats direct children (or a single wrapper) as line nodes.
 *   - 'words': wraps each whitespace-delimited token in a span.word.
 *   - 'chars': wraps each char inside span.word as span.char.
 * Element `innerHTML` is replaced with the wrapped version.
 */
export function wabSplit(
  element: HTMLElement,
  type: 'chars' | 'words' | 'lines' = 'chars'
): WabSplitResult {
  const chars: HTMLElement[] = [];
  const words: HTMLElement[] = [];
  const lines: HTMLElement[] = [];

  if (type === 'lines') {
    // Treat element children as lines, else wrap entire content.
    const children = Array.from(element.children) as HTMLElement[];
    if (children.length > 0) {
      for (const child of children) {
        child.classList.add('line');
        child.style.display = 'block';
        lines.push(child);
      }
    } else {
      const line = document.createElement('span');
      line.className = 'line';
      line.style.display = 'block';
      while (element.firstChild) line.appendChild(element.firstChild);
      element.appendChild(line);
      lines.push(line);
    }
    return { chars, words, lines };
  }

  // chars / words — walk text nodes, preserve non-text elements.
  const walk = (node: Node, parent: HTMLElement): void => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? '';
      if (!text) return;
      const tokens = text.split(/(\s+)/);
      for (const token of tokens) {
        if (!token) continue;
        if (/^\s+$/.test(token)) {
          parent.appendChild(document.createTextNode(token));
          continue;
        }
        const wordEl = document.createElement('span');
        wordEl.className = 'word';
        wordEl.style.display = 'inline-block';
        wordEl.style.whiteSpace = 'nowrap';
        words.push(wordEl);

        if (type === 'chars') {
          for (const ch of Array.from(token)) {
            const charEl = document.createElement('span');
            charEl.className = 'char';
            charEl.style.display = 'inline-block';
            charEl.textContent = ch;
            wordEl.appendChild(charEl);
            chars.push(charEl);
          }
        } else {
          wordEl.textContent = token;
        }
        parent.appendChild(wordEl);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const src = node as HTMLElement;
      const clone = src.cloneNode(false) as HTMLElement;
      parent.appendChild(clone);
      for (const childNode of Array.from(src.childNodes)) {
        walk(childNode, clone);
      }
    }
  };

  const snapshot = Array.from(element.childNodes);
  element.innerHTML = '';
  for (const child of snapshot) {
    walk(child, element);
  }
  return { chars, words, lines };
}

// --- Aggregate export for consumer ergonomics ----------------------------
export const wab = {
  createLenisGsapBridge,
  blurReveal,
  magneticHover,
  maskYReveal,
  themeScrollSwitch,
  wabSplit,
};
