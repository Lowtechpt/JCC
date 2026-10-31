'use client';
import { useMinute } from '@/lib/useMinute';
import { storeStatus } from '@/lib/hours';
import { cn } from '@/lib/utils';

/**
 * Estado em tempo real (Europe/Lisbon). No servidor e na hidratação mostra um texto neutro
 * com a mesma altura; o estado real aparece só no cliente.
 * tone: 'dark' (pílula sobre foto), 'light' (pílula cinzenta) ou 'plain' (ponto + texto, como na proposta B).
 */
export function OpenStatus({ tone = 'dark' }: { tone?: 'dark' | 'light' | 'plain' }) {
  const ts = useMinute();
  const status = ts ? storeStatus(ts) : null;
  const base = {
    dark: 'min-h-9 rounded-full bg-black/40 px-4 py-1.5 text-sm text-white backdrop-blur-md ring-1 ring-white/25',
    light: 'min-h-9 rounded-full bg-muted px-4 py-1.5 text-sm text-foreground ring-1 ring-border',
    plain: 'min-h-6 text-[0.95rem] text-foreground',
  }[tone];
  return (
    <p className={cn('inline-flex w-fit items-center gap-2.5 font-medium', base)}>
      <span
        aria-hidden
        className={cn(
          'size-[9px] shrink-0 rounded-full',
          status?.open ? 'bg-whatsapp' : 'bg-status-off',
          tone === 'plain' && (status?.open ? 'ring-4 ring-whatsapp/25' : 'ring-4 ring-status-off/25'),
        )}
      />
      <span aria-live="polite">{status ? status.label : 'Loja em Leça da Palmeira desde 1994'}</span>
    </p>
  );
}
