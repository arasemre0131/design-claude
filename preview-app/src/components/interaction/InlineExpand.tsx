// InlineExpand.tsx — M5 Inline Expand (row grows, no overlay)
//
// COMBO: M5 + MO4 (smooth height easing)
// Kaynak: catalog/atoms/modal/M5.yaml
// Uyumlu sektörler: list-table, faq, accordion-ui, inline-detail, admin-panel, siparis-listesi
// Forbidden with: alert-action (dialog tercih et)
//
// Overlay YOK. Satır/card altına açılan detay. <details> semantic HTML +
// CSS grid-rows trick ile animated height (auto yerine 0fr → 1fr transition).

'use client';

import { useCallback, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface InlineExpandItem {
  id: string;
  summary: ReactNode;
  detail: ReactNode;
  /** Default açık olarak başlat */
  defaultOpen?: boolean;
}

export interface InlineExpandProps {
  items: InlineExpandItem[];
  /** Tek seferde sadece bir tane açık olsun (accordion davranışı) */
  single?: boolean;
  className?: string;
}

export function InlineExpand({ items, single = false, className }: InlineExpandProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(items.filter((i) => i.defaultOpen).map((i) => i.id)),
  );

  const toggle = useCallback(
    (id: string) => {
      setOpenIds((prev) => {
        const next = new Set(single ? [] : prev);
        if (prev.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    [single],
  );

  return (
    <ul className={cn('flex flex-col divide-y divide-neutral-800 border-y border-neutral-800', className)}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <li key={item.id} className="group">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`ie-panel-${item.id}`}
              onClick={() => toggle(item.id)}
              className={cn(
                'flex w-full items-center justify-between gap-4 px-4 py-4 text-left',
                'transition-colors hover:bg-neutral-900/60',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500',
              )}
            >
              <div className="min-w-0 flex-1">{item.summary}</div>
              <ChevronDown
                size={18}
                className={cn(
                  'shrink-0 text-neutral-400 transition-transform duration-300',
                  isOpen && 'rotate-180',
                )}
                aria-hidden
              />
            </button>

            {/* Grid-rows trick: 0fr → 1fr animasyon (height: auto çalışmaz) */}
            <div
              id={`ie-panel-${item.id}`}
              role="region"
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-400 ease-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-5 pt-1 text-sm text-neutral-300">{item.detail}</div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
