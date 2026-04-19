/**
 * MagneticButton.tsx — Magnetic Hover with Elastic Return
 *
 * COMBO: wearebrand-magnetic-elastic (MIT-safe) + ultra + Awwwards generic
 * License: MIT-safe rewrite — pattern referenced from
 *   research-assets/wab/wearebrand-animations.js:738-784 +
 *   templates/14-ultra/index.html:536-546.
 *   Implementation is original; pointermove → gsap.to with elastic.out(1, 0.3)
 *   ease is an industry-standard pattern (Awwwards community).
 *
 * Pointer magnetism: mousemove pushes element toward cursor; mouseleave
 * snaps back with elastic ease. Disabled on touch / reduced-motion / coarse pointer.
 */

'use client';

import { useEffect, useRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn, prefersReducedMotion } from '@/lib/utils';

export interface MagneticButtonProps extends ComponentPropsWithoutRef<'button'> {
  strength?: number; // 0-1 — uzaklık carpanı
  radius?: number; // px — magnetism aktif alan
  returnDuration?: number; // s — geri dönüş süresi
  as?: 'button' | 'a';
  href?: string; // as="a" için
  children: ReactNode;
}

export function MagneticButton({
  strength = 0.35,
  radius = 120,
  returnDuration = 1.1,
  as = 'button',
  href,
  children,
  className,
  ...rest
}: MagneticButtonProps): ReactNode {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    // Touch / coarse pointer: skip magnetism
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return;

    let gsap: typeof import('gsap').default | null = null;
    let cancelled = false;

    (async () => {
      try {
        const mod = await import('gsap');
        if (cancelled) return;
        gsap = mod.default ?? mod;
      } catch {
        /* fallback to CSS transition */
      }
    })();

    const onMove = (e: PointerEvent): void => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > radius) return;
      const x = dx * strength;
      const y = dy * strength;
      if (gsap) {
        gsap.to(el, { x, y, duration: 0.5, ease: 'power3.out' });
      } else {
        el.style.transform = `translate(${x}px, ${y}px)`;
        el.style.transition = 'transform 0.5s cubic-bezier(.2,.7,.2,1)';
      }
    };

    const onLeave = (): void => {
      if (gsap) {
        gsap.to(el, { x: 0, y: 0, duration: returnDuration, ease: 'elastic.out(1, 0.3)' });
      } else {
        el.style.transform = 'translate(0, 0)';
        el.style.transition = `transform ${returnDuration}s cubic-bezier(.2,1.4,.4,1)`;
      }
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelled = true;
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [strength, radius, returnDuration]);

  const cls = cn('inline-block will-change-transform', className);

  if (as === 'a') {
    return (
      <a ref={ref as never} href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button ref={ref as never} className={cls} {...rest}>
      {children}
    </button>
  );
}
