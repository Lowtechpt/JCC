import Link from '@/components/ui/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/** Botões em pílula (brief V2). Base -> variante -> tamanho. Mínimo 44px de altura. */
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill font-semibold leading-none transition-[background-color,color,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        white: 'bg-white text-foreground hover:bg-white/85',
        whatsapp: 'bg-whatsapp text-black hover:brightness-95',
        outline: 'text-current shadow-[inset_0_0_0_1.5px_currentColor] hover:bg-current/10',
        muted: 'bg-muted text-foreground hover:bg-border',
        dark: 'bg-dark text-dark-foreground hover:bg-dark/85',
        line: 'text-foreground shadow-[inset_0_0_0_1.5px_var(--text)] hover:bg-foreground hover:text-white',
      },
      size: {
        default: 'min-h-11 px-5 text-[0.9375rem]',
        sm: 'min-h-11 px-5 text-[0.95rem]',
      },
    },
    defaultVariants: { variant: 'primary', size: 'default' },
  },
);

type Props = VariantProps<typeof buttonVariants> & {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>;

/** Ligação com aspeto de botão. Interna usa next/link; externa (tel:, https:, mailto:) usa <a>. */
export function ButtonLink({ href, variant, size, className, external, children, ...rest }: Props) {
  const cls = cn(buttonVariants({ variant, size }), className);
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  const ext = external ?? href.startsWith('http');
  return (
    <a href={href} className={cls} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
      {children}
    </a>
  );
}
