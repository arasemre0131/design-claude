'use client';

// DenseTable.tsx — T2 Linear-style dense virtualized table (client)
//
// COMBO: Data UI — saas / developer-tool / issue-tracker / admin-dense
// Kaynak: catalog/atoms/table/T2.yaml, insaat-crm/a-safe/index.html:126-200
// Deps: @tanstack/react-virtual (200+ row performans icin ZORUNLU)
// forbidden_with: T6 (card grid), T1 (editorial)
// forbidden_sectors: eticaret, mucevher, spa
//
// Features:
// - Virtual scroll (react-virtual)
// - keyboard nav: j/k vim + ArrowUp/Down + Tab focus
// - aria-sort per column (click header to toggle)
// - role="table"/row/cell, scope="col"
// - Row hover + selected state + 1px dashed border
// - External onRowSelect callback

import { useVirtualizer } from '@tanstack/react-virtual';
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type SortDirection = 'asc' | 'desc' | 'none';

export interface DenseTableColumn<Row> {
  /** Kolon anahtari (obje key). */
  key: keyof Row & string;
  /** Gosterilen baslik. */
  header: string;
  /** Siralama etkin mi? Default false. */
  sortable?: boolean;
  /** grid-template-columns parcasi — ornek '28px', '2fr', '90px'. Default '1fr'. */
  width?: string;
  /** Hucre render override. */
  cell?: (value: Row[keyof Row], row: Row) => ReactNode;
  /** Comparator override (asc). */
  sort?: (a: Row, b: Row) => number;
  /** text-align ornek 'right' numeric kolon icin. */
  align?: 'left' | 'right' | 'center';
}

export interface DenseTableProps<Row extends { id: string | number }> {
  columns: DenseTableColumn<Row>[];
  rows: Row[];
  /** Satir yuksekligi (px). Default 40 (dense). 44–48 rahat. */
  rowHeight?: number;
  /** Goruntu alani yuksekligi (px). Default 480. */
  height?: number;
  /** Secilen satir callback'i. */
  onRowSelect?: (row: Row) => void;
  /** Satir rengi override — status gibi. */
  rowClassName?: (row: Row) => string | undefined;
  /** Bos durum mesaji. */
  emptyMessage?: string;
  className?: string;
}

export function DenseTable<Row extends { id: string | number }>({
  columns,
  rows,
  rowHeight = 40,
  height = 480,
  onRowSelect,
  rowClassName,
  emptyMessage = 'Kayit yok.',
  className,
}: DenseTableProps<Row>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>('none');
  const [focusedIdx, setFocusedIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tbodyRef = useRef<HTMLDivElement>(null);

  const sortedRows = useMemo(() => {
    if (!sortKey || sortDir === 'none') return rows;
    const col = columns.find((c) => c.key === sortKey);
    if (!col) return rows;
    const arr = [...rows];
    arr.sort((a, b) => {
      if (col.sort) return sortDir === 'asc' ? col.sort(a, b) : col.sort(b, a);
      const va = a[col.key as keyof Row];
      const vb = b[col.key as keyof Row];
      if (va == null && vb == null) return 0;
      if (va == null) return 1;
      if (vb == null) return -1;
      if (typeof va === 'number' && typeof vb === 'number') {
        return sortDir === 'asc' ? va - vb : vb - va;
      }
      return sortDir === 'asc'
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });
    return arr;
  }, [rows, columns, sortKey, sortDir]);

  const virtualizer = useVirtualizer({
    count: sortedRows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => rowHeight,
    overscan: 10,
  });

  const toggleSort = useCallback((key: string) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir('asc');
      return;
    }
    // Ayni sutun — cycle: asc -> desc -> none
    if (sortDir === 'asc') {
      setSortDir('desc');
    } else if (sortDir === 'desc') {
      setSortDir('none');
      setSortKey(null);
    } else {
      setSortDir('asc');
    }
  }, [sortKey, sortDir]);

  const moveFocus = useCallback(
    (delta: number) => {
      setFocusedIdx((i) => {
        const next = Math.max(0, Math.min(sortedRows.length - 1, i + delta));
        virtualizer.scrollToIndex(next, { align: 'auto' });
        return next;
      });
    },
    [sortedRows.length, virtualizer]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault();
        moveFocus(1);
      } else if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault();
        moveFocus(-1);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const row = sortedRows[focusedIdx];
        if (row) onRowSelect?.(row);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setFocusedIdx(0);
        virtualizer.scrollToIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setFocusedIdx(sortedRows.length - 1);
        virtualizer.scrollToIndex(sortedRows.length - 1);
      }
    },
    [focusedIdx, sortedRows, moveFocus, onRowSelect, virtualizer]
  );

  useEffect(() => {
    setFocusedIdx((i) => Math.min(i, Math.max(0, sortedRows.length - 1)));
  }, [sortedRows.length]);

  const gridTemplate = columns.map((c) => c.width ?? '1fr').join(' ');

  if (sortedRows.length === 0) {
    return (
      <div
        role="table"
        className={cn(
          'border border-dashed border-current/20 px-4 py-10 text-center text-[13px] opacity-50',
          className
        )}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      role="table"
      aria-rowcount={sortedRows.length}
      aria-colcount={columns.length}
      className={cn('border border-current/10 text-[13px]', className)}
    >
      <div
        role="row"
        className="grid border-b border-current/20 bg-current/[0.02] px-0"
        style={{ gridTemplateColumns: gridTemplate }}
      >
        {columns.map((col) => {
          const isSorted = sortKey === col.key;
          const ariaSort: 'ascending' | 'descending' | 'none' = isSorted
            ? sortDir === 'asc'
              ? 'ascending'
              : sortDir === 'desc'
              ? 'descending'
              : 'none'
            : 'none';
          return (
            <div
              key={col.key}
              role="columnheader"
              aria-sort={ariaSort}
              scope="col"
              onClick={col.sortable ? () => toggleSort(col.key) : undefined}
              className={cn(
                'flex items-center px-3 py-2.5 text-[10px] uppercase tracking-[0.18em] opacity-70',
                col.sortable && 'cursor-pointer hover:opacity-100',
                col.align === 'right' && 'justify-end',
                col.align === 'center' && 'justify-center'
              )}
              style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
            >
              {col.header}
              {col.sortable && (
                <span className="ml-1.5 inline-block w-2 text-[9px]" aria-hidden="true">
                  {isSorted && sortDir === 'asc' && '▲'}
                  {isSorted && sortDir === 'desc' && '▼'}
                  {(!isSorted || sortDir === 'none') && '↕'}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div
        ref={scrollRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        role="rowgroup"
        aria-label="Tablo icerigi — j/k, ok tuslari ile gezinin. Enter ile secin."
        className="relative overflow-auto outline-none focus-visible:ring-2 focus-visible:ring-current/30"
        style={{ height: `${height}px` }}
      >
        <div
          ref={tbodyRef}
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((vr) => {
            const row = sortedRows[vr.index];
            if (!row) return null;
            const isFocused = vr.index === focusedIdx;
            return (
              <div
                key={row.id}
                role="row"
                aria-rowindex={vr.index + 1}
                aria-selected={isFocused}
                onClick={() => {
                  setFocusedIdx(vr.index);
                  onRowSelect?.(row);
                }}
                className={cn(
                  'absolute inset-x-0 grid cursor-pointer items-center border-b border-dashed border-current/10 px-0 transition',
                  'hover:bg-current/[0.03]',
                  isFocused && 'bg-current/[0.06] ring-1 ring-inset ring-current/20',
                  rowClassName?.(row)
                )}
                style={{
                  top: `${vr.start}px`,
                  height: `${vr.size}px`,
                  gridTemplateColumns: gridTemplate,
                }}
              >
                {columns.map((col) => {
                  const value = row[col.key as keyof Row];
                  return (
                    <div
                      key={col.key}
                      role="cell"
                      className={cn(
                        'truncate px-3',
                        col.align === 'right' && 'text-right',
                        col.align === 'center' && 'text-center'
                      )}
                    >
                      {col.cell ? col.cell(value, row) : (value as ReactNode)}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
