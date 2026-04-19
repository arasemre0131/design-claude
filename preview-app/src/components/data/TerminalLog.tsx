// TerminalLog.tsx — C4 Dark terminal-style log panel (RSC)
//
// COMBO: Data UI — terminal / ops / DevOps / system-log / finance-feed
// Kaynak: insaat-crm a-safe msg-auto pattern, terminal inspired
// Uyumlu sektorler: ops-dashboard, terminal-ui, dev-tool, trading-feed

import { cn } from '@/lib/utils';

export type TerminalChannel =
  | 'info'
  | 'warn'
  | 'error'
  | 'ok'
  | 'net'
  | 'sys'
  | 'user'
  | string;

export interface TerminalLogEntry {
  id: string | number;
  /** HH:MM:SS tarzi timestamp. */
  timestamp: string;
  /** Renklenen kanal etiketi. */
  channel: TerminalChannel;
  /** Satir metni. */
  text: string;
  /** Ek ipucu / actor. */
  actor?: string;
}

export interface TerminalLogProps {
  entries: TerminalLogEntry[];
  /** Panel yuksekligi (px) — overflow scroll. Default 320. */
  height?: number;
  /** Baslik + PID gibi header. */
  header?: string;
  /** Kanal renkleri override. */
  channelColors?: Partial<Record<TerminalChannel, string>>;
  className?: string;
}

const DEFAULT_CHANNEL_COLOR: Record<string, string> = {
  info: '#60A5FA',
  warn: '#F5C400',
  error: '#E63946',
  ok: '#52B788',
  net: '#A78BFA',
  sys: '#94A3B8',
  user: '#E85D04',
};

export function TerminalLog({
  entries,
  height = 320,
  header,
  channelColors,
  className,
}: TerminalLogProps) {
  const resolveColor = (ch: TerminalChannel) =>
    channelColors?.[ch] ?? DEFAULT_CHANNEL_COLOR[ch] ?? '#94A3B8';

  return (
    <section
      className={cn(
        'overflow-hidden border border-black/20 bg-[#0B0D0F] text-[12px] text-[#D4D8DD]',
        className
      )}
      style={{ fontFamily: "'Geist Mono', 'IBM Plex Mono', ui-monospace, monospace" }}
      aria-label="Sistem logu"
    >
      {header && (
        <header className="flex items-center gap-2 border-b border-white/10 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/60">
          <span className="h-2 w-2 rounded-full bg-[#52B788]" aria-hidden="true" />
          <span>{header}</span>
          <span className="ml-auto opacity-50">{entries.length} satir</span>
        </header>
      )}

      <ol
        className="flex h-full flex-col overflow-y-auto px-0 py-0"
        style={{ maxHeight: `${height}px` }}
        role="log"
        aria-live="polite"
      >
        {entries.map((entry) => (
          <li
            key={entry.id}
            className="flex items-baseline gap-3 border-b border-white/5 px-3 py-1 hover:bg-white/[0.03]"
          >
            <span className="shrink-0 text-[10px] tabular-nums text-white/40">
              {entry.timestamp}
            </span>
            <span
              className="shrink-0 uppercase tracking-[0.12em] text-[10px]"
              style={{ color: resolveColor(entry.channel) }}
              aria-label={`kanal ${entry.channel}`}
            >
              [{entry.channel}]
            </span>
            {entry.actor && (
              <span className="shrink-0 text-[11px] text-white/60">{entry.actor}</span>
            )}
            <span className="flex-1 break-words text-[12px]">{entry.text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
