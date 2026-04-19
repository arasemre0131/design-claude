// MastheadCentered.tsx — H2 Editorial masthead (RSC)
//
// COMBO: Chrome — editorial / newspaper / magazine
// Kaynak: catalog/atoms/header/H2.yaml, templates/04-restoran/index.html:42-76
// Uyumlu sektorler: editorial, news, magazine, kitap, kultur, muze, restoran, otel

import { cn } from '@/lib/utils';

export interface MastheadCenteredNavLink {
  label: string;
  href: string;
}

export interface MastheadCenteredProps {
  /** Wordmark — display font. */
  wordmark: string;
  /** Italik/serif subtitle. */
  subtitle?: string;
  /** Alt satirda orta nav. */
  nav?: MastheadCenteredNavLink[];
  /** Variant: serif-display (default), all-caps-spaced, rule-above-below. */
  variant?: 'serif-display' | 'all-caps-spaced' | 'rule-above-below';
  /** Wordmark font-family. Default Fraunces. */
  wordmarkFont?: string;
  className?: string;
}

const WORDMARK_CLASS: Record<NonNullable<MastheadCenteredProps['variant']>, string> = {
  'serif-display':
    'text-[clamp(40px,6vw,56px)] tracking-[0.01em]',
  'all-caps-spaced':
    'text-[clamp(28px,4vw,40px)] uppercase tracking-[0.3em]',
  'rule-above-below':
    'text-[clamp(40px,6vw,52px)] tracking-[0.01em]',
};

export function MastheadCentered({
  wordmark,
  subtitle,
  nav = [],
  variant = 'serif-display',
  wordmarkFont = "'Fraunces', 'Tiempos', Georgia, serif",
  className,
}: MastheadCenteredProps) {
  const showRuleTop = variant === 'rule-above-below';
  const showRuleBottom = true;

  return (
    <header
      className={cn(
        'w-full border-b border-current/20 bg-inherit py-7 text-center',
        className
      )}
      aria-label="Site basligi"
    >
      {showRuleTop && (
        <hr className="mx-auto mb-3 w-3/5 border-t border-current/40" />
      )}

      <a
        href="/"
        className={cn('block', WORDMARK_CLASS[variant])}
        style={{ fontFamily: wordmarkFont, fontVariationSettings: "'opsz' 144" }}
      >
        {wordmark}
      </a>

      {subtitle && (
        <p
          className="mt-2 text-[13px] italic opacity-70"
          style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}
        >
          {subtitle}
        </p>
      )}

      {showRuleBottom && (
        <hr className="mx-auto mt-3 w-3/5 border-t border-current/40" />
      )}

      {nav.length > 0 && (
        <nav
          className="mt-4 flex justify-center gap-8 text-[12px] uppercase tracking-[0.2em]"
          aria-label="Ana menu"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="opacity-70 transition hover:opacity-100"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
