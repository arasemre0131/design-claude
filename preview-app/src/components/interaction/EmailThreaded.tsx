// EmailThreaded.tsx — C3 Gmail-style Threaded Messages
//
// COMBO: C3 + tabs (WA/IG/email kanallar)
// Kaynak: catalog/atoms/chat/C3.yaml
// Uyumlu sektörler: email-client, crm, helpdesk, musteri-iletisim-merkezi
// Forbidden with: fast-chat, gaming (WhatsApp/Discord stili C1 tercih et)
//
// Gmail thread UX: üst collapsed (sadece sender + tarih), son 1-2 mesaj expanded.
// Channel tabs: WhatsApp / Instagram / Email — CRM için unified inbox vibe.

'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, Mail, MessageCircle, Instagram } from 'lucide-react';

export type EmailChannel = 'email' | 'whatsapp' | 'instagram';

export interface EmailMessage {
  id: string;
  sender: string;
  senderInitials?: string;
  timestamp: string;
  body: string;
  channel?: EmailChannel;
}

export interface EmailThread {
  id: string;
  subject: string;
  messages: EmailMessage[];
}

export interface EmailThreadedProps {
  thread: EmailThread;
  /** Channel tabs göster (WA/IG/Email) */
  showChannelTabs?: boolean;
  /** Default active channel */
  defaultChannel?: EmailChannel;
  className?: string;
}

const CHANNELS: { id: EmailChannel; label: string; icon: typeof Mail }[] = [
  { id: 'email', label: 'E-posta', icon: Mail },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { id: 'instagram', label: 'Instagram', icon: Instagram },
];

export function EmailThreaded({
  thread,
  showChannelTabs = true,
  defaultChannel = 'email',
  className,
}: EmailThreadedProps) {
  const [activeChannel, setActiveChannel] = useState<EmailChannel>(defaultChannel);

  const visibleMessages = useMemo(() => {
    if (!showChannelTabs) return thread.messages;
    return thread.messages.filter((m) => (m.channel ?? 'email') === activeChannel);
  }, [activeChannel, showChannelTabs, thread.messages]);

  // Son 2 mesaj default open; öncekiler collapsed
  const totalCount = visibleMessages.length;

  return (
    <article
      className={cn(
        'flex flex-col rounded-2xl border border-neutral-800 bg-neutral-950 text-neutral-100',
        className,
      )}
    >
      {/* Header */}
      <header className="flex items-center justify-between gap-4 border-b border-neutral-800 px-5 py-4">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold tracking-tight">{thread.subject}</h3>
          <p className="text-xs text-neutral-500">
            {totalCount} mesaj · {thread.id}
          </p>
        </div>
      </header>

      {/* Channel Tabs */}
      {showChannelTabs ? (
        <nav className="flex items-center gap-1 border-b border-neutral-800 px-3 py-2">
          {CHANNELS.map((ch) => {
            const Icon = ch.icon;
            const isActive = activeChannel === ch.id;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => setActiveChannel(ch.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs transition-colors',
                  isActive
                    ? 'bg-neutral-100 text-black'
                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100',
                )}
              >
                <Icon size={14} />
                {ch.label}
              </button>
            );
          })}
        </nav>
      ) : null}

      {/* Messages */}
      <div className="flex flex-col">
        {visibleMessages.length === 0 ? (
          <p className="p-8 text-center text-sm text-neutral-500">Bu kanalda mesaj yok.</p>
        ) : (
          visibleMessages.map((msg, i) => {
            const isLastTwo = i >= visibleMessages.length - 2;
            return <ThreadedItem key={msg.id} message={msg} defaultOpen={isLastTwo} />;
          })
        )}
      </div>
    </article>
  );
}

function ThreadedItem({ message, defaultOpen }: { message: EmailMessage; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const initials =
    message.senderInitials ??
    message.sender
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="border-b border-neutral-900 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-neutral-900/50"
      >
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-xs font-medium">
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{message.sender}</p>
          <p className="truncate text-xs text-neutral-500">
            {open ? message.timestamp : message.body}
          </p>
        </div>
        <ChevronDown
          size={16}
          className={cn('text-neutral-500 transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open ? (
        <div className="px-5 pb-5 pl-[68px]">
          <p className="text-xs text-neutral-500 mb-2">{message.timestamp}</p>
          <p className="whitespace-pre-wrap text-sm text-neutral-200 leading-relaxed">{message.body}</p>
        </div>
      ) : null}
    </div>
  );
}
