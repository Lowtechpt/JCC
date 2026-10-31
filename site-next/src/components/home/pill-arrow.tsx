import { ArrowDot } from '../ui/arrow-dot';
import { cn } from '@/lib/utils';

/**
 * Seta em círculo para o fim de um botão em pílula (48px de altura): 28px, encostada à
 * margem direita com a mesma folga que tem por cima e por baixo. O botão tem de ter `group`.
 */
export function PillArrow({ className }: { className?: string }) {
  return (
    <ArrowDot
      size={28}
      className={cn('-mr-3.5 transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5', className)}
    />
  );
}
