'use client';

// MegaNav.tsx — N4 Full-width hover mega dropdown (client — hover state)
//
// COMBO: Nav — eticaret / enterprise / marketplace / retail
// Kaynak: catalog/atoms/nav/N4.yaml, templates/06-eticaret/index.html:60-160
// forbidden_sectors: portfolio, blog, minimalist

import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface MegaNavColumn {
  heading: string;
  links: { label: string; href: string; badge?: string }[];
}

export interface MegaNavTrigger {
  id: string;
  label: string;
  /** Hover'da acilan panel icerigi. 3-col categorical panel default'tur. */
  columns: MegaNavColumn[];
  /** Son kolon featured — gorsel + short copy. */
  featured?: ReactNode;
}

export interface MegaNavProps {
  /** Trigger'lar (her biri hover'da mega panel acar). */
  triggers: MegaNavTrigger[];
  /** Sabit / sticky yapistirma. */
  sticky?: boolean;
  className?: string;
}

export function MegaNav({ triggers, sticky = false, className }: MegaNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = triggers.find((t) => t.id === activeId);

  return (
    <div
      className={cn(
        'relative z-40 w-full border-b border-current/10',
        sticky && 'sticky top-0',
        className
      )}
      onMouseLeave={() => setActiveId(null)}
    >
      <nav
        className="mx-auto flex max-w-[1320px] items-center gap-8 px-6 py-3.5"
        aria-label="Ana kategori"
      >
        {triggers.map((t) => (
          <button
            key={t.id}
            type="button"
            onMouseEnter={() => setActiveId(t.id)}
            onFocus={() => setActiveId(t.id)}
            aria-expanded={activeId === t.id}
            aria-haspopup="true"
            className={cn(
              'border-b-2 border-transparent py-1 text-[13px] uppercase tracking-[0.08em] transition',
              activeId === t.id ? 'border-current opacity-100' : 'opacity-70 hover:opacity-100'
            )}
          >
            {t.label}
            <span aria-hidden="true" className="ml-1">▾</span>
          </button>
        ))}
      </nav>

      {active && (
        <div
          className="absolute inset-x-0 top-full z-40 border-t border-current/10 bg-[inherit] shadow-xl"
          onMouseEnter={() => setActiveId(active.id)}
          role="region"
          aria-label={`${active.label} alt kategoriler`}
        >
          <div className="mx-auto grid max-w-[1320px] grid-cols-4 gap-8 px-6 py-7">
            {active.columns.map((col, i) => (
              <div key={i} className="flex flex-col gap-2">
                <h4
                  className="mb-1.5 text-[11px] uppercase tracking-[0.18em] opacity-50"
                  style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
                >
                  {col.heading}
                </h4>
                {col.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 py-0.5 text-[13px] opacity-80 transition hover:opacity-100"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="rounded-sm bg-current/10 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.1em] opacity-70">
                        {link.badge}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            ))}
            {active.featured && (
              <div className="col-start-4 row-start-1">{active.featured}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
