// ReceiptStrip.tsx — T7 Compact receipt / transaction strip (RSC)
//
// COMBO: Data UI — retail-pos / finans / kargo / siparis-takip
// Kaynak: catalog/atoms/table/T7.yaml, insaat-crm/b-edge/index.html:254-291
// forbidden_sectors: luxury, editorial-static

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ReceiptRow {
  id: string;
  /** HH:MM saat veya kisa zaman. */
  time: string;
  /** ORDER #047, INV-2026-0089 gibi ref. */
  ref: string;
  /** Gosterim tutari — "₺1.240" veya sayi. */
  amount: string | number;
  /** Durum rozet: PAID / DUE / VOID. */
  status?: {
    label: string;
    tone?: 'ok' | 'warn' | 'error' | 'info' | 'neutral';
  };
  /** Ekstra etiket/etiketler. */
  meta?: string;
}

export interface ReceiptStripProps {
  rows: ReceiptRow[];
  /** Variant: dashed (her row ust dashed) veya perforated (tear-mark). */
  variant?: 'dashed' | 'perforated';
  /** Ust baslik. */
  title?: string;
  /** Para birimi prefix ornek ₺ — sayilar icin. */
  currencyPrefix?: string;
  className?: string;
}

const STATUS_TONE: Record<NonNullable<ReceiptRow['status']>['tone'] & string, string> = {
  ok: 'text-[#2D7D46] bg-[#2D7D46]/10',
  warn: 'text-[#9B6A1F] bg-[#9B6A1F]/10',
  error: 'text-[#B7513F] bg-[#B7513F]/10',
  info: 'text-[#4A6B8A] bg-[#4A6B8A]/10',
  neutral: 'text-current/70 bg-current/5',
};

export function ReceiptStrip({
  rows,
  variant = 'dashed',
  title,
  currencyPrefix,
  className,
}: ReceiptStripProps) {
  return (
    <section
      className={cn(
        'border border-current/20 bg-current/[0.01]',
        variant === 'perforated' && 'relative',
        className
      )}
      style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
      aria-label="Islem makbuzu"
    >
      {title && (
        <header className="flex items-baseline justify-between border-b border-current/20 px-4 py-2.5 text-[10px] uppercase tracking-[0.2em]">
          <span className="font-semibold">{title}</span>
          <span className="opacity-50">{rows.length} ISLEM</span>
        </header>
      )}

      {variant === 'perforated' && (
        <>
          <span
            className="pointer-events-none absolute -left-1.5 top-10 h-3 w-3 rounded-full bg-[inherit]"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute -right-1.5 top-10 h-3 w-3 rounded-full bg-[inherit]"
            aria-hidden="true"
          />
        </>
      )}

      <ul className="divide-y divide-dashed divide-current/20">
        {rows.map((row) => {
          const displayAmount =
            typeof row.amount === 'number' && currencyPrefix
              ? `${currencyPrefix}${row.amount.toLocaleString('tr-TR')}`
              : row.amount;
          return (
            <li
              key={row.id}
              className="grid items-center gap-3 px-4 py-2.5 text-[12px]"
              style={{ gridTemplateColumns: '60px 1fr auto auto' }}
            >
              <span className="opacity-60">{row.time}</span>
              <span className="truncate">
                <span className="opacity-90">{row.ref}</span>
                {row.meta && <span className="ml-2 opacity-50">{row.meta}</span>}
              </span>
              <span className="tabular-nums">{displayAmount}</span>
              {row.status && (
                <span
                  className={cn(
                    'inline-block px-2 py-0.5 text-[10px] uppercase tracking-[0.15em]',
                    STATUS_TONE[row.status.tone ?? 'neutral']
                  )}
                >
                  {row.status.label}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
