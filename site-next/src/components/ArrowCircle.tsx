import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Círculo de 1,5px com seta, para linhas de lista (padrão da proposta B).
 * Precisa de um ascendente com a classe `group`: no hover da linha enche a azul.
 * `filled` deixa-o sempre azul; `onDark` usa traço branco.
 */
export function ArrowCircle({
  className,
  size = 52,
  filled = false,
  onDark = false,
}: {
  className?: string;
  size?: number;
  filled?: boolean;
  onDark?: boolean;
}) {
  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className={cn(
        'inline-grid shrink-0 place-items-center rounded-full border-[1.5px] transition-[background-color,border-color,color] duration-300 ease-out-soft',
        filled
          ? 'border-primary bg-primary text-white'
          : onDark
            ? 'border-white text-white group-hover:bg-white group-hover:text-foreground'
            : 'border-foreground text-foreground group-hover:border-primary group-hover:bg-primary group-hover:text-white',
        className,
      )}
    >
      <ArrowRight
        size={Math.round(size * 0.4)}
        strokeWidth={1.75}
        className="transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5"
      />
    </span>
  );
}
