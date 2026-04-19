// ClipPathReveal.tsx — 4-direction clip-path polygon reveal
//
// COMBO: ultra-clip-path-4-yon + IntersectionObserver (fraxbit pattern)
// Kaynak: catalog/atoms/motion-ajans/ultra-clip-path-4-yon.yaml
// Uyumlu sektörler: kinetic, minimal-swiss, editorial-motion, ajans-portfolio
// Forbidden with: yok
//
// clip-path polygon 4-yön reveal: up / down / left / right. IntersectionObserver
// ile viewport'a girince class toggle. Hem CSS transition hem prefers-reduced-motion guard.

'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type ClipRevealDirection = 'up' | 'down' | 'left' | 'right';

export interface ClipPathRevealProps {
  direction?: ClipRevealDirection;
  children: ReactNode;
  /** Trigger tek seferlik mi (default true) */
  once?: boolean;
  /** ms cinsinden delay */
  delay?: number;
  /** Transition süresi (ms) */
  duration?: number;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
}

/* Clip-path polygon kapalı (gizli) → açık (tam görünür) state'leri
 * up    : alttan yukarı açılır
 * down  : üstten aşağı açılır
 * left  : sağdan sola açılır
 * right : soldan sağa açılır
 */
const CLIP_STATES: Record<ClipRevealDirection, { hidden: string; visible: string }> = {
  up: {
    hidden: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
    visible: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
  },
  down: {
    hidden: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
    visible: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
  },
  left: {
    hidden: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
    visible: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
  },
  right: {
    hidden: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
    visible: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
  },
};

export function ClipPathReveal({
  direction = 'up',
  children,
  once = true,
  delay = 0,
  duration = 1400,
  className,
  as = 'div',
}: ClipPathRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // reduced-motion respect → anında görünür
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const { hidden, visible } = CLIP_STATES[direction];
  const Tag = as as 'div';

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn('will-change-[clip-path]', className)}
      style={{
        clipPath: inView ? visible : hidden,
        WebkitClipPath: inView ? visible : hidden,
        transition: `clip-path ${duration}ms cubic-bezier(.2,.8,.2,1) ${delay}ms, -webkit-clip-path ${duration}ms cubic-bezier(.2,.8,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
