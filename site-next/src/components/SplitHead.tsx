import { cn } from '@/lib/utils';

/**
 * Cabeçalho de secção da proposta B: título grande à esquerda, texto de apoio cinzento à direita.
 * Em ecrãs estreitos empilha (título, depois texto).
 */
export function SplitHead({
  id,
  title,
  text,
  className,
}: {
  id?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mb-12 grid gap-6 md:mb-16 md:grid-cols-2 md:items-end md:gap-10', className)}>
      <h2 id={id} className="h2-section">
        {title}
      </h2>
      {text && <p className="lead max-w-[42ch] md:justify-self-end">{text}</p>}
    </div>
  );
}
