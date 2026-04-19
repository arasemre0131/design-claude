// ThemeScrollSwitch.tsx — ScrollTrigger zone theme toggle (light ↔ dark)
//
// COMBO: ultra-theme-switch-scroll + wearebrand pattern
// Kaynak: catalog/atoms/motion-ajans/ultra-theme-switch-scroll.yaml
//         templates/14-ultra/index.html:637-645
// Uyumlu sektörler: editorial, narrative, multi-section-story, ajans-portfolio, interactive-case-study
// Forbidden with: single-theme-only
//
// <ThemeScrollZone theme="light"> ile sarmalanan bölüm viewport'un ortasına
// geldiğinde `document.body`'ye class toggle'lar (default "light"). GSAP
// ScrollTrigger kullanır — idempotent cleanup. Multiple zone destekli.
//
// Kullanım: <ThemeScrollZone theme="light">...</ThemeScrollZone>
// body.light selector'ünde global CSS var'ları flip et.

'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ThemeScrollZoneProps {
  /** Body'ye eklenecek class adı. default: "light" */
  theme?: string;
  children: ReactNode;
  /** Trigger zonu. default: 'top 50%' — 'bottom 50%' (section ortası viewport ortasında) */
  start?: string;
  end?: string;
  className?: string;
  /** data-theme attr da yazılsın mı (CSS [data-theme=light] seçicisi için) */
  writeDataAttr?: boolean;
}

export function ThemeScrollZone({
  theme = 'light',
  children,
  start = 'top 50%',
  end = 'bottom 50%',
  className,
  writeDataAttr = true,
}: ThemeScrollZoneProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cleanup = () => {};

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const add = () => {
        document.body.classList.add(theme);
        if (writeDataAttr) document.body.dataset.theme = theme;
      };
      const remove = () => {
        document.body.classList.remove(theme);
        if (writeDataAttr && document.body.dataset.theme === theme) {
          delete document.body.dataset.theme;
        }
      };

      const st = ScrollTrigger.create({
        trigger: el,
        start,
        end,
        onEnter: add,
        onLeave: remove,
        onEnterBack: add,
        onLeaveBack: remove,
      });

      cleanup = () => {
        remove();
        st.kill();
      };
    })();

    return () => cleanup();
  }, [end, start, theme, writeDataAttr]);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className={cn(className)} data-theme-zone={theme}>
      {children}
    </section>
  );
}
