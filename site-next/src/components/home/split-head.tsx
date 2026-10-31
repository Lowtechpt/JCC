import { cn } from '@/lib/utils';

/**
 * Cabeçalho de secção da proposta B: título grande à esquerda, parágrafo curto e cinzento
 * à direita (alinhado à base). Em ecrã estreito empilha.
 */
export function SplitHead({
  id,
  title,
  lead,
  action,
  className,
}: {
  id?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mb-10 grid grid-cols-1 items-end gap-4 md:mb-12 lg:grid-cols-2 lg:gap-10', className)}>
      <h2 id={id} className="h2-section min-w-0">
        {title}
      </h2>
      {(lead || action) && (
        <div className="max-w-[44ch] lg:justify-self-end">
          {lead && <div className="lead">{lead}</div>}
          {action && <div className={lead ? 'mt-6' : undefined}>{action}</div>}
        </div>
      )}
    </div>
  );
}
