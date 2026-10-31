import { SplitHead } from './SplitHead';
import { ButtonLink } from './ui/button';
import { ArrowDot } from './ui/arrow-dot';
import { MapEmbed } from './MapEmbed';
import { HoursTable } from './HoursTable';
import { OpenStatus } from './OpenStatus';
import { PedidoForm } from './PedidoForm';
import { business } from '@/data/business';

/** `form={false}` (home): só a morada, o horário e o mapa; o formulário fica em /contactos/. */
export function Visit({ headingId = 'visita-title', form = true }: { headingId?: string; form?: boolean }) {
  return (
    <section aria-labelledby={headingId} id="visite-nos" className="section">
      <div className="wrap">
        <SplitHead
          id={headingId}
          title="Visite-nos."
          text="Estamos na esquina da Rua General Humberto Delgado, com o letreiro azul."
        />

        <div className="grid grid-cols-[minmax(0,1fr)] gap-3.5 lg:grid-cols-2">
          <div className="rounded-card bg-muted p-6 sm:p-10">
            <OpenStatus tone="plain" />
            <address className="mt-6 text-[clamp(1.25rem,1.6vw,1.5rem)] font-[650] not-italic leading-[1.08] tracking-[-0.035em]">
              {business.street}
              <br />
              {business.postalCode} {business.city}
            </address>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <ButtonLink href={business.mapsDirectionsUrl}>
                Como chegar <ArrowDot />
              </ButtonLink>
              <ButtonLink href={business.phone.href} variant="line">
                {business.phone.display}
              </ButtonLink>
            </div>
            <div className="mt-8">
              <HoursTable />
            </div>
          </div>
          <MapEmbed />
        </div>

        {/* Pedido por email: título à esquerda, formulário à direita, separados por uma régua forte */}
        {form && (
          <div
            id="pedido"
            className="mt-[clamp(3.5rem,6vw,5rem)] grid scroll-mt-[calc(var(--header-h)+1.5rem)] gap-10 border-t-[1.5px] border-foreground pt-10 lg:grid-cols-[1fr_1.35fr] lg:gap-16"
          >
            <div>
              <h3 className="h3-card">Peça um orçamento.</h3>
              <p className="lead mt-4 max-w-[38ch]">
                Diga-nos o que precisa e deixe um contacto. O pedido chega-nos por email e respondemos. A avaliação é sem compromisso.
              </p>
              <ul className="mt-6 space-y-2 text-[0.9375rem] text-muted-foreground">
                <li>
                  Prefere falar já?{' '}
                  <a href={business.phone.href} className="font-semibold text-foreground underline underline-offset-4">
                    Ligue {business.phone.display}
                  </a>
                </li>
                <li>Ou passe pela loja, de segunda a sábado.</li>
              </ul>
            </div>
            <PedidoForm />
          </div>
        )}
      </div>
    </section>
  );
}
