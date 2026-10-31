import { buttonVariants } from './ui/button';
import { business } from '@/data/business';
import { cn } from '@/lib/utils';

// min-h-11 = 46,75px com a base de 17px: barra total ~72px, igual a --bar-h
const pill = 'min-h-11 flex-1 basis-0 px-2 text-[0.9rem]';

/** Barra fixa no telemóvel: Ligar / WhatsApp / Como chegar. Só texto, em pílulas. */
export function MobileBar() {
  return (
    <nav
      aria-label="Contacto rápido"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white md:hidden"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto flex max-w-lg gap-2 px-3 pt-3">
        <a href={business.phone.href} className={cn(buttonVariants({ variant: 'primary' }), pill)}>
          Ligar
        </a>
        <a
          href={business.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'whatsapp' }), pill)}
        >
          WhatsApp
        </a>
        <a
          href={business.mapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'line' }), pill)}
        >
          Como chegar
        </a>
      </div>
    </nav>
  );
}
