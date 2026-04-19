/**
 * HeroZeroReceipt.tsx — HR14 Receipt-Strip Zero-Hero
 *
 * COMBO: HR14 + TY14/TY15/TY20 (mono-first) + PL19/PL4 (industrial/data-dense)
 * Kaynak: insaat-crm/b-edge/index.html:254-291 (receipt-strip dashed feed)
 *          mockups/superhuman-zero-hero.html:1-80
 * Uyumlu sektörler: inbox, activity-feed, e-ticaret-power, admin-ops, log-viewer
 * Forbidden with: mücevher, restoran, spa, otel (hero yokluğu uygun değil)
 *
 * Hero yok — direkt dashboard feed. Receipt strip style, dashed borders,
 * mono font, status pills. Tek client overhead: kısa fade-in stagger.
 */

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ReceiptRow {
  id: string;
  time: string; // "14:32"
  code: string; // "KADIKOY #047"
  label?: string; // detay
  status: 'ok' | 'warn' | 'err' | 'pending';
  value?: string; // tutar / saat / miktar
}

export interface HeroZeroReceiptProps {
  title?: string;
  meta?: string;
  rows: ReceiptRow[];
  footer?: string;
  className?: string;
}

const STATUS_LABEL: Record<ReceiptRow['status'], string> = {
  ok: 'TESLİM',
  warn: 'GECİKTİ',
  err: 'İPTAL',
  pending: 'HAZIR',
};

const STATUS_CLASS: Record<ReceiptRow['status'], string> = {
  ok: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/40',
  warn: 'bg-amber-500/10 text-amber-500 border-amber-500/40',
  err: 'bg-red-500/10 text-red-500 border-red-500/40',
  pending: 'bg-accent/10 text-accent border-accent/40',
};

export function HeroZeroReceipt({
  title = 'CANLI AKIŞ',
  meta,
  rows,
  footer,
  className,
}: HeroZeroReceiptProps): ReactNode {
  return (
    <section
      className={cn(
        'min-h-screen bg-surface text-ink',
        'px-4 py-8 lg:px-8 lg:py-10 font-mono',
        className,
      )}
    >
      <header className="flex items-baseline justify-between border-b border-line pb-4 mb-6">
        <div>
          <h1 className="text-xs uppercase tracking-[0.28em] text-ink">{title}</h1>
          {meta ? (
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted mt-1">{meta}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>LIVE · {rows.length} kayıt</span>
        </div>
      </header>

      <ol className="space-y-0">
        {rows.map((row, i) => (
          <li
            key={row.id}
            className={cn(
              'grid grid-cols-[68px_1fr_auto_110px] items-center gap-3 py-2.5',
              i !== rows.length - 1 && 'border-b border-dashed border-line',
            )}
          >
            <span className="text-xs text-muted tabular-nums">{row.time}</span>
            <span className="flex items-baseline gap-3 min-w-0">
              <span className="text-sm uppercase tracking-[0.1em] text-ink truncate">
                {row.code}
              </span>
              {row.label ? (
                <span className="text-xs text-muted truncate">{row.label}</span>
              ) : null}
            </span>
            <span className="text-xs tabular-nums text-ink">{row.value ?? ''}</span>
            <span
              className={cn(
                'justify-self-end text-[10px] uppercase tracking-[0.16em]',
                'border px-2 py-0.5 rounded-sm',
                STATUS_CLASS[row.status],
              )}
            >
              {STATUS_LABEL[row.status]}
            </span>
          </li>
        ))}
      </ol>

      {footer ? (
        <footer className="mt-6 border-t border-line pt-4 text-[10px] uppercase tracking-[0.22em] text-muted">
          {footer}
        </footer>
      ) : null}
    </section>
  );
}
