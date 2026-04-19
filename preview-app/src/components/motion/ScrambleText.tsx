/**
 * ScrambleText.tsx — GSAP 3.13 ScrambleTextPlugin (free since Webflow 2024)
 *
 * COMBO: ultra-scramble-text (atom #26)
 * Kaynak: templates/14-ultra/index.html:597-610
 * License: GSAP 3.13 free tier (ScrambleTextPlugin dahil)
 *
 * Scroll veya mount trigger: text scramble→settle animation.
 * chars='upperAndLowerCase', speed=0.6, revealDelay=0.3 default.
 * Türkçe karakter destekli (chars prop ile özelleştirilebilir).
 */

'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { cn, prefersReducedMotion } from '@/lib/utils';

export type ScrambleTrigger = 'mount' | 'scroll' | 'hover';

export interface ScrambleTextProps {
  text: string;
  duration?: number;
  chars?: string; // 'upperAndLowerCase' | 'lowerCase' | 'upperCase' | custom
  speed?: number;
  revealDelay?: number;
  trigger?: ScrambleTrigger;
  scrollStart?: string;
  tweenChars?: boolean;
  as?: keyof Pick<JSX.IntrinsicElements, 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'>;
  className?: string;
}

export function ScrambleText({
  text,
  duration = 2.5,
  chars = 'upperAndLowerCase',
  speed = 0.6,
  revealDelay = 0.3,
  trigger = 'scroll',
  scrollStart = 'top 90%',
  tweenChars = true,
  as = 'p',
  className,
}: ScrambleTextProps): ReactNode {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = text;
      return;
    }

    let stTrigger: { kill: () => void } | null = null;
    let tw: { kill: () => void } | null = null;
    let cancelled = false;

    const run = async (): Promise<void> => {
      try {
        const gsapMod = await import('gsap');
        const scrMod = await import('gsap/ScrambleTextPlugin');
        const stMod = trigger === 'scroll' ? await import('gsap/ScrollTrigger') : null;
        if (cancelled) return;
        const gsap = gsapMod.default ?? gsapMod;
        const ScrambleTextPlugin = scrMod.ScrambleTextPlugin ?? scrMod.default;
        gsap.registerPlugin(ScrambleTextPlugin);
        if (stMod) {
          const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
          gsap.registerPlugin(ScrollTrigger);
        }

        const scramble = (): void => {
          tw = gsap.to(el, {
            duration,
            scrambleText: { text, chars, speed, revealDelay, tweenLength: tweenChars },
            ease: 'none',
          });
        };

        if (trigger === 'mount') {
          scramble();
        } else if (trigger === 'hover') {
          const onEnter = (): void => scramble();
          el.addEventListener('pointerenter', onEnter);
          return () => el.removeEventListener('pointerenter', onEnter);
        } else {
          const stModReady = await import('gsap/ScrollTrigger');
          const ScrollTrigger = stModReady.ScrollTrigger ?? stModReady.default;
          stTrigger = ScrollTrigger.create({
            trigger: el,
            start: scrollStart,
            once: true,
            onEnter: scramble,
          });
        }
      } catch {
        el.textContent = text;
      }
    };

    void run();

    return () => {
      cancelled = true;
      tw?.kill();
      stTrigger?.kill();
    };
  }, [text, duration, chars, speed, revealDelay, trigger, scrollStart, tweenChars]);

  const Tag = as as keyof JSX.IntrinsicElements;
  return (
    <Tag ref={ref as never} className={cn(className)}>
      {text}
    </Tag>
  );
}
