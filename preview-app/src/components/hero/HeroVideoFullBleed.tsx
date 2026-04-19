/**
 * HeroVideoFullBleed.tsx — HR3 Full-Bleed Video Background
 *
 * COMBO: HR3 + TY9/TY10/TY27 (variable-serif editorial) + PL22/PL38 (warm-dark)
 * Kaynak: templates/10-otel/index.html:70-130 · templates/07-spa/index.html:60-110
 *          2026-ADVANCED-TECHNIQUES.md:60-88 (Vimeo pre-rendered pattern)
 * Uyumlu sektörler: otel, spa, restoran, fotoğraf, kuaför, e-ticaret-premium, luxury
 * Forbidden with: dashboard, b2b-corporate
 *
 * Native <video> autoplay muted loop playsinline. Poster frame hemen görünür.
 * Gradient scrim (top+bottom) okunabilirlik için. prefers-reduced-motion: video
 * duraksır, poster kalır. Vimeo iframe alternatifi için vimeoId prop'u.
 */

'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn, prefersReducedMotion } from '@/lib/utils';

export interface HeroVideoFullBleedProps {
  src?: string; // mp4/webm source (CDN URL)
  poster: string; // zorunlu — video yüklenmeden görünür
  vimeoId?: string; // varsa <iframe> kullanılır
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  cta?: { label: string; href: string };
  align?: 'left' | 'center' | 'right';
  scrim?: 'soft' | 'hard' | 'none';
  className?: string;
}

export function HeroVideoFullBleed({
  src,
  poster,
  vimeoId,
  eyebrow = 'Rumeli Hisarı · Boğaz manzaralı',
  title,
  subtitle,
  cta,
  align = 'left',
  scrim = 'soft',
  className,
}: HeroVideoFullBleedProps): ReactNode {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playReady, setPlayReady] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;
    if (prefersReducedMotion()) {
      videoRef.current.pause();
      return;
    }
    const v = videoRef.current;
    v.play()
      .then(() => setPlayReady(true))
      .catch(() => {
        /* autoplay blocked — poster will persist */
      });
  }, []);

  const alignClass =
    align === 'center' ? 'items-center text-center' : align === 'right' ? 'items-end text-right' : 'items-start';

  return (
    <section
      className={cn(
        'relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink text-surface',
        className,
      )}
    >
      {/* Media layer */}
      {vimeoId ? (
        <iframe
          title="Hero video"
          src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1`}
          allow="autoplay; encrypted-media"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            // vimeo background fill
            objectFit: 'cover',
          }}
        />
      ) : (
        <video
          ref={videoRef}
          poster={poster}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className={cn(
            'absolute inset-0 w-full h-full object-cover',
            'transition-opacity duration-1000',
            playReady ? 'opacity-100' : 'opacity-0',
          )}
          aria-hidden
        />
      )}

      {/* Poster fallback layer (visible until video plays) */}
      {!vimeoId && (
        <img
          src={poster}
          alt=""
          aria-hidden
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-1000',
            playReady ? 'opacity-0' : 'opacity-100',
          )}
        />
      )}

      {/* Gradient scrim */}
      {scrim !== 'none' ? (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              scrim === 'hard'
                ? 'linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.25) 40%, rgba(0,0,0,.7) 100%)'
                : 'linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,.05) 45%, rgba(0,0,0,.55) 100%)',
          }}
        />
      ) : null}

      {/* Copy */}
      <div
        className={cn(
          'relative z-10 flex h-full flex-col justify-end',
          'px-6 pb-16 lg:px-16 lg:pb-24',
          alignClass,
        )}
      >
        <div className="max-w-2xl">
          {eyebrow ? (
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-surface/70 mb-6">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] tracking-tight">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-5 max-w-md text-lg text-surface/80 leading-relaxed">{subtitle}</p>
          ) : null}
          {cta ? (
            <a
              href={cta.href}
              className={cn(
                'mt-8 inline-flex items-center gap-3',
                'text-sm uppercase tracking-[0.18em]',
                'underline decoration-accent underline-offset-8',
                'hover:decoration-surface transition-colors duration-500',
              )}
            >
              {cta.label}
              <span aria-hidden>→</span>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
