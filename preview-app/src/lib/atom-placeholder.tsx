// atom-placeholder.tsx — dev-time fallback for atoms without a concrete component.
//
// Placeholder render eder, ama UI flow devam eder (preview-app crash etmez).
// Kutunun icinde atom ID ve aciklama gorunur — eksik binding gorsel sinyal.

import type { ComponentType } from 'react';

export interface AtomPlaceholderProps {
  /** Ek sinif. */
  className?: string;
  /** Spread edilen diger prop'lar — render'a dahil edilmez. */
  [key: string]: unknown;
}

/**
 * createPlaceholder — bir atom id icin stub React component uretir.
 * Component named function olarak donulur (React DevTools uyumlu).
 */
export function createPlaceholder(
  atomId: string,
  label?: string
): ComponentType<AtomPlaceholderProps> {
  const displayName = `Atom__${atomId.replace(/[^a-zA-Z0-9_]/g, '_')}`;

  const Placeholder: ComponentType<AtomPlaceholderProps> = function Placeholder({
    className,
  }: AtomPlaceholderProps) {
    const cls = [
      'relative my-4 p-6 border-2 border-dashed border-[color:var(--color-line,#999)] rounded-md',
      'bg-[color:var(--color-surface,#fafafa)] text-[color:var(--color-ink,#333)]',
      'font-mono text-sm leading-relaxed',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <section data-atom={atomId} className={cls} aria-label={`Atom placeholder: ${atomId}`}>
        <header className="flex items-baseline justify-between gap-4 mb-2">
          <span className="uppercase tracking-widest text-xs opacity-70">atom · {atomId}</span>
          <span className="text-xs opacity-50">placeholder</span>
        </header>
        {label ? (
          <p className="text-base font-semibold">{label}</p>
        ) : null}
        <p className="text-xs opacity-60 mt-1">
          Concrete component eklenmedi. src/lib/atom-resolver.ts &rarr; ATOM_COMPONENTS.
        </p>
      </section>
    );
  };

  Placeholder.displayName = displayName;
  return Placeholder;
}
