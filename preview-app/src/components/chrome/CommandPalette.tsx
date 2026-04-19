'use client';

// CommandPalette.tsx — N5 ⌘K Command palette (client, cmdk)
//
// COMBO: Nav — power-tool / developer / internal-dashboard
// Kaynak: catalog/atoms/nav/N5.yaml, insaat-crm/a-safe/index.html:83-85
// Deps: cmdk (shadcn/ui pattern)
// forbidden_sectors: eticaret, restoran, mucevher, kuafor

import { Command } from 'cmdk';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  /** Keyboard shortcut gosterimi. */
  shortcut?: string;
  /** Seçildiginde calisir. */
  onSelect?: () => void;
  /** Grup bashtligi altinda gosterilsin. */
  group?: string;
}

export interface CommandPaletteProps {
  /** Palette'e beslenen komutlar. */
  items: CommandItem[];
  /** Placeholder input'ta. */
  placeholder?: string;
  /** Bos ekran yazisi. */
  emptyMessage?: string;
  /** Kontrol harici mode — dis dan open/close. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Global kisayol — default ⌘K / Ctrl+K. */
  shortcutKey?: string;
  className?: string;
}

export function CommandPalette({
  items,
  placeholder = 'Komut ara, sayfaya git...',
  emptyMessage = 'Sonuc bulunamadi.',
  open: openProp,
  onOpenChange,
  shortcutKey = 'k',
  className,
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = openProp ?? internalOpen;
  const setOpen = (v: boolean) => {
    onOpenChange?.(v);
    if (openProp === undefined) setInternalOpen(v);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === shortcutKey && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);

  }, [open, shortcutKey]);

  const groupedItems = items.reduce<Record<string, CommandItem[]>>((acc, item) => {
    const g = item.group ?? '__ungrouped__';
    (acc[g] ??= []).push(item);
    return acc;
  }, {});

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Komut paleti"
      className={cn(
        'fixed left-1/2 top-[20vh] z-[200] w-[min(640px,90vw)] -translate-x-1/2 overflow-hidden rounded-sm border border-black/10 bg-white shadow-2xl dark:border-white/10 dark:bg-neutral-950',
        className
      )}
    >
      <div className="fixed inset-0 -z-10 bg-black/40" onClick={() => setOpen(false)} aria-hidden="true" />

      <Command.Input
        placeholder={placeholder}
        className="w-full border-b border-black/10 bg-transparent px-4 py-3.5 text-[14px] outline-none placeholder:opacity-40 dark:border-white/10"
      />

      <Command.List className="max-h-[360px] overflow-y-auto p-1.5">
        <Command.Empty className="px-4 py-8 text-center text-[13px] opacity-50">
          {emptyMessage}
        </Command.Empty>

        {Object.entries(groupedItems).map(([group, groupItems]) => (
          <Command.Group
            key={group}
            heading={group === '__ungrouped__' ? undefined : group}
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:opacity-50"
          >
            {groupItems.map((item) => (
              <Command.Item
                key={item.id}
                value={`${item.label} ${item.hint ?? ''}`}
                onSelect={() => {
                  item.onSelect?.();
                  setOpen(false);
                }}
                className="flex cursor-pointer items-center gap-2.5 rounded-[2px] px-2 py-2 text-[13px] aria-selected:bg-black/5 dark:aria-selected:bg-white/10"
              >
                <span className="flex-1">{item.label}</span>
                {item.hint && <span className="text-[11px] opacity-50">{item.hint}</span>}
                {item.shortcut && (
                  <kbd
                    className="rounded-[2px] border border-black/10 bg-black/5 px-1.5 py-0.5 text-[10px] tracking-[0.05em] opacity-70 dark:border-white/10 dark:bg-white/10"
                    style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
                  >
                    {item.shortcut}
                  </kbd>
                )}
              </Command.Item>
            ))}
          </Command.Group>
        ))}
      </Command.List>
    </Command.Dialog>
  );
}
