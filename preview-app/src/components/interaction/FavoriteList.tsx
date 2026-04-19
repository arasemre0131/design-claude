// FavoriteList.tsx — localStorage persist favorites + toast on add/remove
//
// COMBO: heart-icon toggle + sonner toast + localStorage
// Kaynak: research/favori_sistem_tasarim.md pattern
// Uyumlu sektörler: e-ticaret, mucevher, gayrimenkul, restoran (menü), portfolio
// Forbidden with: admin-crud (wishlist anlamı yok)
//
// SSR-safe localStorage read (hydration uyumlu). useFavorites hook expose.
// Heart icon fill/stroke toggle + optimistic update + sonner toast.

'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'design-claude-favorites';

/* ---------- Hook ---------- */

export function useFavorites() {
  const [ids, setIds] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as string[];
        setIds(new Set(parsed));
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const persist = useCallback((next: Set<string>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
    } catch {
      /* quota / private mode */
    }
  }, []);

  const toggle = useCallback(
    (id: string, label?: string) => {
      setIds((prev) => {
        const next = new Set(prev);
        if (prev.has(id)) {
          next.delete(id);
          toast(`${label ?? 'Ürün'} favorilerden çıkarıldı`, { icon: '💔' });
        } else {
          next.add(id);
          toast(`${label ?? 'Ürün'} favorilere eklendi`, { icon: '❤️' });
        }
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const isFav = useCallback((id: string) => ids.has(id), [ids]);

  return { ids, isFav, toggle, hydrated };
}

/* ---------- Button ---------- */

export interface FavoriteButtonProps {
  id: string;
  label?: string;
  size?: number;
  className?: string;
}

export function FavoriteButton({ id, label, size = 18, className }: FavoriteButtonProps) {
  const { isFav, toggle, hydrated } = useFavorites();
  const active = hydrated && isFav(id);

  return (
    <button
      type="button"
      aria-label={active ? 'Favorilerden çıkar' : 'Favorilere ekle'}
      aria-pressed={active}
      onClick={() => toggle(id, label)}
      className={cn(
        'inline-flex items-center justify-center rounded-full p-2 transition-all duration-200',
        'hover:bg-neutral-900/50 active:scale-90',
        active && 'text-rose-500',
        !active && 'text-neutral-400 hover:text-rose-400',
        className,
      )}
    >
      <Heart
        size={size}
        className={cn('transition-all duration-200', active && 'fill-current')}
      />
    </button>
  );
}

/* ---------- List (render all favorited) ---------- */

export interface FavoriteListItem {
  id: string;
  label: string;
  subtitle?: string;
  image?: string;
  price?: string;
}

export interface FavoriteListProps {
  allItems: FavoriteListItem[];
  emptyState?: ReactNode;
  className?: string;
}

export function FavoriteList({ allItems, emptyState, className }: FavoriteListProps) {
  const { ids, hydrated, toggle } = useFavorites();

  const favorited = useMemo(
    () => allItems.filter((item) => ids.has(item.id)),
    [allItems, ids],
  );

  if (!hydrated) {
    return <div className={cn('h-32 animate-pulse rounded-xl bg-neutral-900', className)} />;
  }

  if (favorited.length === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-800 p-10 text-center', className)}>
        {emptyState ?? (
          <>
            <Heart size={32} className="mb-3 text-neutral-600" />
            <p className="text-sm text-neutral-400">Henüz favori eklemediniz.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <ul className={cn('grid gap-3', className)}>
      {favorited.map((item) => (
        <li
          key={item.id}
          className="flex items-center gap-4 rounded-xl border border-neutral-800 bg-neutral-950 p-3"
        >
          {item.image ? (
            <img
              src={item.image}
              alt=""
              className="h-14 w-14 shrink-0 rounded-lg object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-14 w-14 shrink-0 rounded-lg bg-neutral-900" aria-hidden />
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-neutral-100">{item.label}</p>
            {item.subtitle ? <p className="truncate text-xs text-neutral-500">{item.subtitle}</p> : null}
          </div>
          {item.price ? <span className="text-sm font-semibold text-neutral-100">{item.price}</span> : null}
          <button
            type="button"
            onClick={() => toggle(item.id, item.label)}
            className="text-rose-500 hover:text-rose-400"
            aria-label="Favorilerden çıkar"
          >
            <Heart size={18} className="fill-current" />
          </button>
        </li>
      ))}
    </ul>
  );
}
