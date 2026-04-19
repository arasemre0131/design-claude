// SidebarRail.tsx — H3 Fixed 240px left rail (RSC — no interactivity)
//
// COMBO: Chrome — Linear-style dashboard / SaaS / admin
// Kaynak: catalog/atoms/header/H3.yaml, insaat-crm/a-safe/index.html:50-65
// Uyumlu sektorler: dashboard, admin, saas, crm, analytics, b2b
// forbidden_sectors: mucevher, restoran, spa, otel

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface SidebarRailNavItem {
  /** Icon — lucide-react component VEYA emoji/symbol string. */
  icon: ReactNode;
  label: string;
  href: string;
  /** Keyboard kisayolu — rail'de saga hizali gosterilir (ornek: 'G H'). */
  shortcut?: string;
  active?: boolean;
}

export interface SidebarRailSection {
  /** Kucuk CAPS label. */
  label?: string;
  items: SidebarRailNavItem[];
}

export interface SidebarRailProps {
  /** Brand isareti — sol ustte. */
  brand: {
    mark: ReactNode;
    name: string;
  };
  /** Nav bolumleri (gruplu). */
  sections: SidebarRailSection[];
  /** Alt footer zone (user profil vs). */
  footer?: ReactNode;
  /** Rail genisligi (px). Default 240. */
  width?: number;
  className?: string;
}

export function SidebarRail({
  brand,
  sections,
  footer,
  width = 240,
  className,
}: SidebarRailProps) {
  return (
    <aside
      className={cn(
        'sticky top-0 flex h-screen flex-col overflow-y-auto border-r border-current/10 px-4 py-5',
        className
      )}
      style={{ width: `${width}px` }}
      aria-label="Yan menu"
    >
      <div className="mb-4 flex items-center gap-2.5 border-b border-current/10 px-1.5 pb-5 pt-1.5">
        <span className="flex h-7 w-7 items-center justify-center">{brand.mark}</span>
        <span
          className="text-[20px] italic tracking-[-0.015em]"
          style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}
        >
          {brand.name}
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-4" aria-label="Ana navigasyon">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="flex flex-col gap-0.5">
            {section.label && (
              <div
                className="px-1.5 pb-2 text-[10px] uppercase tracking-[0.18em] opacity-50"
                style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
              >
                {section.label}
              </div>
            )}
            {section.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={item.active ? 'page' : undefined}
                className={cn(
                  'flex cursor-pointer items-center gap-2.5 rounded-[1px] px-2 py-1.5 text-[13px] opacity-80 transition',
                  'hover:bg-current/5 hover:opacity-100',
                  item.active && 'bg-[#B7633C] text-white opacity-100'
                )}
              >
                <span className="h-3.5 w-3.5 opacity-70" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
                {item.shortcut && (
                  <kbd
                    className={cn(
                      'rounded-[1px] border border-current/10 bg-current/5 px-1.5 py-0.5 text-[10px] tracking-[0.05em] opacity-50',
                      item.active && 'border-white/20 bg-white/20 text-white opacity-100'
                    )}
                    style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
                  >
                    {item.shortcut}
                  </kbd>
                )}
              </a>
            ))}
          </div>
        ))}
      </nav>

      {footer && (
        <div className="mt-4 border-t border-current/10 pt-4">{footer}</div>
      )}
    </aside>
  );
}
