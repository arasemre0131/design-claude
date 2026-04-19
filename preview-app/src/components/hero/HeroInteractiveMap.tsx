/**
 * HeroInteractiveMap.tsx — HR9 Interactive Map
 *
 * COMBO: HR9 + TY11/TY26 (mono + grotesk) + PL5/PL11 (blueprint/industrial)
 * Kaynak: templates/09-gayrimenkul/index.html:70-180 · templates/01-insaat/index.html:180-260
 * Uyumlu sektörler: gayrimenkul, inşaat, otel, travel, lojistik, restoran-bulucu
 * Forbidden with: tek-lokasyon işletmeler, HR2
 *
 * SVG grid background + pin array with hover scale tooltip.
 * Mapbox/Leaflet dependency yok — SVG-only. 'use client' gerek (hover state).
 */

'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface MapPin {
  id: string;
  x: number; // 0-100 percent
  y: number; // 0-100 percent
  label: string;
  meta?: string;
}

export interface HeroInteractiveMapProps {
  eyebrow?: string;
  title: ReactNode;
  titleEm?: string;
  description?: string;
  pins?: MapPin[];
  gridSize?: number;
  className?: string;
}

const DEFAULT_PINS: MapPin[] = [
  { id: '1', x: 22, y: 34, label: 'Beşiktaş', meta: '12 proje' },
  { id: '2', x: 48, y: 28, label: 'Kadıköy', meta: '8 proje' },
  { id: '3', x: 68, y: 55, label: 'Ataşehir', meta: '6 proje' },
  { id: '4', x: 35, y: 62, label: 'Şişli', meta: '9 proje' },
  { id: '5', x: 75, y: 38, label: 'Üsküdar', meta: '4 proje' },
];

export function HeroInteractiveMap({
  eyebrow = 'Istanbul · 39 lokasyon',
  title,
  titleEm,
  description,
  pins = DEFAULT_PINS,
  gridSize = 40,
  className,
}: HeroInteractiveMapProps): ReactNode {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section
      className={cn(
        'relative grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16',
        'px-6 py-20 lg:px-16 lg:py-28 bg-surface text-ink',
        className,
      )}
    >
      <div className="flex flex-col justify-center">
        {eyebrow ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-6">
            {eyebrow}
          </p>
        ) : null}

        <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-tight">
          {title}
          {titleEm ? (
            <>
              {' '}
              <em className="italic text-accent">{titleEm}</em>
            </>
          ) : null}
        </h1>

        {description ? (
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{description}</p>
        ) : null}

        <div className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-muted">
          Hover · {pins.length} nokta
        </div>
      </div>

      {/* Map canvas */}
      <div className="relative aspect-[4/3] w-full border border-line bg-surface">
        <svg
          viewBox="0 0 100 75"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          aria-label="İnteraktif harita"
        >
          {/* Grid */}
          <defs>
            <pattern
              id="map-grid"
              width={100 / gridSize}
              height={100 / gridSize}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${100 / gridSize} 0 L 0 0 0 ${100 / gridSize}`}
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.15"
                strokeWidth="0.08"
              />
            </pattern>
          </defs>
          <rect width="100" height="75" fill="url(#map-grid)" className="text-muted" />

          {/* Subtle coastline */}
          <path
            d="M 0 40 Q 20 35 35 42 T 70 38 T 100 45"
            stroke="currentColor"
            strokeOpacity="0.25"
            strokeWidth="0.4"
            fill="none"
            className="text-ink"
          />
        </svg>

        {pins.map((pin) => {
          const isActive = active === pin.id;
          return (
            <button
              key={pin.id}
              type="button"
              onMouseEnter={() => setActive(pin.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(pin.id)}
              onBlur={() => setActive(null)}
              className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              aria-label={`${pin.label} — ${pin.meta ?? ''}`}
            >
              <span
                className={cn(
                  'block rounded-full ring-2 ring-surface transition-transform duration-300',
                  'bg-accent',
                  isActive ? 'w-4 h-4 scale-125' : 'w-2.5 h-2.5',
                )}
              />
              <span
                aria-hidden
                className={cn(
                  'pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-3',
                  'whitespace-nowrap rounded-sm bg-ink px-2.5 py-1.5',
                  'font-mono text-[10px] uppercase tracking-[0.14em] text-surface',
                  'transition-all duration-200',
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1',
                )}
              >
                {pin.label}
                {pin.meta ? <span className="ml-2 opacity-60">{pin.meta}</span> : null}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
