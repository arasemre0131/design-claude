// PlateHeader.tsx — H1 Plate + Hazard header (RSC)
//
// COMBO: Chrome — industrial-workwear + insaat
// Kaynak: catalog/atoms/header/H1.yaml, insaat-crm/b-edge/index.html:60-102
// Uyumlu sektorler: insaat, factory, endustriyel, lojistik, brutalist
// forbidden_sectors: mucevher, spa, klinik

import { cn } from '@/lib/utils';
import { HazardStripe } from './HazardStripe';

export interface PlateHeaderNavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface PlateHeaderProps {
  /** Sol plakadaki marka kelimesi, Archivo Black. */
  wordmark: string;
  /** Meta etiket — STENCIL kucuk tipografi. */
  meta?: string;
  /** Saga hizali mega nav linkler. */
  nav?: PlateHeaderNavLink[];
  /** Sag bilgi — LIVE dot + saat vs. */
  rightInfo?: {
    status?: string;
    timestamp?: string;
  };
  /** Hazard konumu — top/bottom/both/none. Default both. */
  hazard?: 'top' | 'bottom' | 'both' | 'none';
  /** Scroll sirasinda sticky mi? Default true. */
  sticky?: boolean;
  /** Ek sinif. */
  className?: string;
}

export function PlateHeader({
  wordmark,
  meta,
  nav = [],
  rightInfo,
  hazard = 'both',
  sticky = true,
  className,
}: PlateHeaderProps) {
  return (
    <header
      className={cn(
        'z-50 w-full text-[#F5C400]',
        sticky && 'sticky top-0',
        className
      )}
    >
      {(hazard === 'top' || hazard === 'both') && (
        <HazardStripe height={20} variant="classic" />
      )}

      <div className="flex items-center gap-5 border-y-[3px] border-[#111111] bg-[#111111] px-8 py-3.5">
        <span
          className="inline-block border-2 border-[#F5C400] bg-[#111111] px-3 py-1 text-[22px] tracking-[-0.025em] text-[#F5C400]"
          style={{ fontFamily: "'Archivo Black', system-ui, sans-serif" }}
        >
          {wordmark}
        </span>

        {meta && (
          <span
            className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#D4CFC4]"
            style={{ fontFamily: "'Stardos Stencil', system-ui, sans-serif" }}
          >
            {meta}
          </span>
        )}

        {nav.length > 0 && (
          <nav className="ml-5 flex items-center gap-7" aria-label="Ana menu">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={item.active ? 'page' : undefined}
                className={cn(
                  'border-b-2 border-transparent py-1 text-[13px] uppercase tracking-[0.02em] text-[#D4CFC4] transition hover:text-[#F5C400]',
                  item.active && 'border-[#E85D04] text-[#F5C400]'
                )}
                style={{ fontFamily: "'Archivo Black', system-ui, sans-serif" }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {rightInfo && (
          <div
            className="ml-auto flex items-center gap-3.5 text-[11px] uppercase tracking-[0.15em] text-[#8F8A80]"
            style={{ fontFamily: "'Geist Mono', ui-monospace, monospace" }}
          >
            {rightInfo.status && (
              <span className="text-[#F5C400]">{rightInfo.status}</span>
            )}
            {rightInfo.timestamp && <span>{rightInfo.timestamp}</span>}
          </div>
        )}
      </div>

      {(hazard === 'bottom' || hazard === 'both') && (
        <HazardStripe height={20} variant="classic" />
      )}
    </header>
  );
}
