import { ButtonLink } from './ui/button';
import { ArrowDot } from './ui/arrow-dot';
import { business, waLink } from '@/data/business';

/** Banda escura final, com cantos de 40px e afastada das margens (proposta B). */
export function CtaBand({
  title = 'Fale connosco.',
  text = 'Ligue, escreva por WhatsApp ou passe pela loja. Vemos o seu equipamento e dizemos-lhe o que fazer, antes de gastar dinheiro.',
  whatsappText,
  requestHref = '/contactos/#pedido',
}: {
  title?: React.ReactNode;
  text?: string;
  whatsappText?: string;
  requestHref?: string;
}) {
  return (
    <section className="on-dark mx-auto w-[calc(100%-1.5rem)] max-w-[1160px] mb-[clamp(3.5rem,7vw,6rem)] rounded-[22px] bg-dark py-[clamp(2.75rem,5vw,4rem)] text-dark-foreground md:rounded-[28px]">
      <div className="wrap grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
        <div>
          <h2 className="h2-section">{title}</h2>
          <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-white/70">{text}</p>
        </div>
        <div className="flex flex-wrap gap-2.5 lg:justify-end">
          <ButtonLink href={business.phone.href} variant="white">
            Ligar {business.phone.display} <ArrowDot className="bg-foreground/10" />
          </ButtonLink>
          <ButtonLink href={waLink(whatsappText)} variant="outline">
            WhatsApp
          </ButtonLink>
          <ButtonLink href={requestHref} variant="outline">
            Pedir orçamento
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
