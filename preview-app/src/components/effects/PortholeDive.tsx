// PortholeDive.tsx — Scroll-zoom hero scale 1→6.5 + text sides flew out
//
// COMBO: ultra-porthole-dive (14-ultra signature hero)
// Kaynak: catalog/atoms/motion-ajans/ultra-porthole-dive.yaml
//         templates/14-ultra/index.html:572-584
// Uyumlu sektörler: editorial-luxury, maximalist, brand-campaign, portfolio-premium, ajans-hero
// Forbidden with: prefers-reduced-motion (otomatik guard — statik fallback)
//                 simple-static landing (over-the-top efekt)
//
// Hero section pinned ScrollTrigger. Scroll ilerledikçe bg scale 1→6.5,
// sculpture scale 1→8 + rotation, sol/sağ text slide-out, orta text scale+fade out.
// GSAP timeline + ScrollTrigger scrub:1 + pin:true.
//
// Children slot naming:
// - data-ph-bg         → background layer (scale)
// - data-ph-sculpture  → focal element (scale + rotate)
// - data-ph-left       → sol text (x: -60vw)
// - data-ph-right      → sağ text (x: 60vw)
// - data-ph-middle     → merkez text (scale + fade)
// - data-ph-sub        → altyazı (opacity 0)

'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface PortholeDiveProps {
  children: ReactNode;
  /** Scroll mesafesi (px). default 1200 */
  scrollDistance?: number;
  /** Bg max scale. default 6.5 */
  bgScale?: number;
  /** Sculpture max scale. default 8 */
  sculptureScale?: number;
  /** Sculpture max rotation deg. default 15 */
  sculptureRotation?: number;
  /** Side text slide vw. default 60 */
  textSlideVw?: number;
  /** prefers-reduced-motion'da animasyonu tamamen kapat (default true) */
  respectReducedMotion?: boolean;
  className?: string;
}

export function PortholeDive({
  children,
  scrollDistance = 1200,
  bgScale = 6.5,
  sculptureScale = 8,
  sculptureRotation = 15,
  textSlideVw = 60,
  respectReducedMotion = true,
  className,
}: PortholeDiveProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion =
      respectReducedMotion &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) return; // static fallback — children görünür kalır

    let cleanup = () => {};

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const q = (sel: string) => root.querySelector(sel);
      const bg = q('[data-ph-bg]');
      const sculpture = q('[data-ph-sculpture]');
      const left = q('[data-ph-left]');
      const right = q('[data-ph-right]');
      const middle = q('[data-ph-middle]');
      const sub = q('[data-ph-sub]');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      if (bg) tl.fromTo(bg, { scale: 1 }, { scale: bgScale, duration: 1 }, 0);
      if (sculpture)
        tl.fromTo(
          sculpture,
          { scale: 1, rotation: 0 },
          { scale: sculptureScale, rotation: sculptureRotation, duration: 1 },
          0,
        );
      if (left) tl.fromTo(left, { x: '0vw' }, { x: `-${textSlideVw}vw`, duration: 1 }, 0);
      if (right) tl.fromTo(right, { x: '0vw' }, { x: `${textSlideVw}vw`, duration: 1 }, 0);
      if (middle)
        tl.fromTo(
          middle,
          { scale: 1, opacity: 1 },
          { scale: 1.8, opacity: 0, duration: 1 },
          0,
        );
      if (sub) tl.to(sub, { opacity: 0, duration: 0.3 }, 0);

      cleanup = () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    })();

    return () => cleanup();
  }, [bgScale, respectReducedMotion, scrollDistance, sculptureRotation, sculptureScale, textSlideVw]);

  return (
    <section
      ref={rootRef as React.RefObject<HTMLElement>}
      className={cn('relative h-screen w-full overflow-hidden', className)}
    >
      {children}
    </section>
  );
}
