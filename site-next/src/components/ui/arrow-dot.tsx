import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Seta dentro de círculo, usada nos botões e na lista de serviços (proposta B). */
export function ArrowDot({ className, size = 30 }: { className?: string; size?: number }) {
  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className={cn('-mr-3 inline-grid shrink-0 place-items-center rounded-full bg-white/20', className)}
    >
      <ArrowRight size={Math.round(size * 0.5)} strokeWidth={2} />
    </span>
  );
}
