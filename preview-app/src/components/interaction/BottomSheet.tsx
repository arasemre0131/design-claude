// BottomSheet.tsx — M3 Bottom Sheet (mobile drawer, Vaul)
//
// COMBO: M3 + MO4/MO9 (spring drawer easing)
// Kaynak: catalog/atoms/modal/M3.yaml · Vaul npm (https://vaul.emilkowal.ski/)
// Uyumlu sektörler: mobile-first, pwa, mobile-app, detail-mobile, e-ticaret (filter), sepet-mobile
// Forbidden with: desktop-only-enterprise (kullanma — Dialog tercih et)
//
// Mobile-first alttan kayan sheet. Drag handle, swipe-to-close, snap points.
// Vaul headless drawer — accessibility (ARIA dialog) + focus trap + ESC close built-in.

'use client';

import { Drawer } from 'vaul';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface BottomSheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  title?: string;
  description?: string;
  children: ReactNode;
  /** Snap points yüzde (0-1) veya px. default: tek açılış */
  snapPoints?: (string | number)[];
  /** Handle barı göster (default true) */
  showHandle?: boolean;
  className?: string;
}

export function BottomSheet({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  snapPoints,
  showHandle = true,
  className,
}: BottomSheetProps) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} snapPoints={snapPoints}>
      {trigger ? <Drawer.Trigger asChild>{trigger}</Drawer.Trigger> : null}
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Drawer.Content
          className={cn(
            'fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-[24px] bg-neutral-950 text-neutral-100',
            'max-h-[96vh] outline-none',
            'border-t border-neutral-800',
            className,
          )}
        >
          {showHandle ? (
            <div className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-neutral-700" aria-hidden />
          ) : null}

          <div className="flex flex-col px-5 pb-6 pt-4 overflow-auto">
            {title ? (
              <Drawer.Title className="text-lg font-semibold tracking-tight text-neutral-50">
                {title}
              </Drawer.Title>
            ) : null}
            {description ? (
              <Drawer.Description className="mt-1 text-sm text-neutral-400">
                {description}
              </Drawer.Description>
            ) : null}

            <div className="mt-4">{children}</div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
