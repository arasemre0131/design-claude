'use client';

// SpecSheet.tsx — T3 Engineering BOM / spec sheet (client — inline expand)
//
// COMBO: Data UI — engineering / industrial / manufacturing / architecture / insaat
// Kaynak: catalog/atoms/table/T3.yaml, insaat-crm/c-hybrid/index.html:291-327
// forbidden_sectors: editorial, luxury, spa

import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface SpecRow {
  id: string;
  /** Parca ID — 001, 002 gibi. */
  code: string;
  /** Parca adi — "Kiriş 20×30". */
  part: string;
  /** Adet. */
  qty: number;
  /** Birim — m, ad, kg. */
  unit: string;
  /** Not / malzeme / sinif. */
  note?: string;
  /** Expand'da gosterilen detay — teknik resim, ek params vs. */
  detail?: ReactNode;
}

export interface SpecSheetProps {
  rows: SpecRow[];
  /** Baslik, ornek "Kesim Listesi / Bill of Materials". */
  title?: string;
  /** Alt-baslik, proje / versiyon kodu. */
  subtitle?: string;
  className?: string;
}

export function SpecSheet({ rows, title, subtitle, className }: SpecSheetProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section
      className={cn('border border-current/20 bg-current/[0.015]', className)}
      style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
    >
      {(title || subtitle) && (
        <header className="flex items-baseline gap-4 border-b border-current/20 px-4 py-3 text-[11px] uppercase tracking-[0.2em]">
          {title && <h3 className="font-semibold">{title}</h3>}
          {subtitle && <span className="opacity-60">{subtitle}</span>}
          <span className="ml-auto opacity-50">{rows.length} KAYIT</span>
        </header>
      )}

      <div
        role="grid"
        className="grid border-b border-current/20 bg-current/[0.03] px-4 py-2 text-[10px] uppercase tracking-[0.2em] opacity-60"
        style={{ gridTemplateColumns: '60px 1fr 80px 60px 1.5fr' }}
      >
        <span role="columnheader">ID</span>
        <span role="columnheader">PARCA / PART</span>
        <span role="columnheader" className="text-right">ADET</span>
        <span role="columnheader" className="text-right">BIRIM</span>
        <span role="columnheader">NOT</span>
      </div>

      <div role="rowgroup">
        {rows.map((row) => {
          const open = expandedId === row.id;
          return (
            <div key={row.id} className="border-b border-current/10 last:border-b-0">
              <button
                type="button"
                role="row"
                aria-expanded={row.detail ? open : undefined}
                onClick={() => row.detail && setExpandedId(open ? null : row.id)}
                className={cn(
                  'grid w-full items-center px-4 py-2.5 text-left text-[12px] transition',
                  row.detail && 'cursor-pointer hover:bg-current/[0.04]',
                  !row.detail && 'cursor-default'
                )}
                style={{ gridTemplateColumns: '60px 1fr 80px 60px 1.5fr' }}
              >
                <span role="cell" className="opacity-70">{row.code}</span>
                <span role="cell" className="font-medium">
                  {row.part}
                  {row.detail && (
                    <span className="ml-2 text-[10px] opacity-50" aria-hidden="true">
                      {open ? '−' : '+'}
                    </span>
                  )}
                </span>
                <span role="cell" className="text-right tabular-nums">{row.qty}</span>
                <span role="cell" className="text-right opacity-70">{row.unit}</span>
                <span role="cell" className="truncate opacity-80">{row.note ?? '—'}</span>
              </button>
              {row.detail && open && (
                <div
                  role="region"
                  className="border-t border-dashed border-current/20 bg-current/[0.02] px-4 py-4 text-[12px]"
                  style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}
                >
                  {row.detail}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
