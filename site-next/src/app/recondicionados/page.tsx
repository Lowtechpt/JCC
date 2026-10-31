import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { SplitHead } from '@/components/SplitHead';
import { Reveal } from '@/components/Reveal';
import { Photo } from '@/components/Photo';
import { FaqSection } from '@/components/FaqSection';
import { CtaBand } from '@/components/CtaBand';
import { JsonLd } from '@/components/JsonLd';
import { ButtonLink } from '@/components/ui/button';
import { ArrowDot } from '@/components/ui/arrow-dot';
import { business, waLink } from '@/data/business';
import { breadcrumb, faqPage } from '@/data/schema';
import { generalFaqs } from '@/data/faq';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Recondicionados com 3 anos de garantia | JCC Computadores',
  description:
    'Desktops, portáteis e telemóveis recondicionados, testados e com garantia JCC de 3 anos. Loja em Leça da Palmeira, Matosinhos.',
  path: '/recondicionados/',
});

const faqs = [generalFaqs[4], generalFaqs[2]];

const types = ['Desktops recondicionados', 'Portáteis recondicionados', 'Telemóveis recondicionados'];

const points = [
  { t: 'Testados por nós', d: 'Todos os equipamentos recondicionados são testados.' },
  { t: 'Garantia JCC', d: `Saem com garantia JCC de ${business.warrantyYears} anos. Os detalhes da garantia explicamos-lhe ao balcão.` },
  {
    t: 'Sem catálogo online',
    d: 'Não publicamos catálogo nem preços na internet. O que há em loja muda, por isso o melhor é perguntar-nos.',
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        whatsappText="Olá! Queria saber que recondicionados têm em loja neste momento."
        requestHref="/contactos/?assunto=recondicionados#pedido"
        crumbs={[{ name: 'Início', href: '/' }, { name: 'Recondicionados' }]}
        title={
          <>
            Recondicionados com{' '}
            <span className="text-primary">
              {business.warrantyYears} anos
            </span>{' '}
            de garantia.
          </>
        }
        lead="Desktops, portáteis e telemóveis recondicionados, testados por nós e com garantia JCC."
      />

      {/* Banda azul com o número gigante */}
      <section
        aria-labelledby="refurb-title"
        className="on-brand mx-auto w-[calc(100%-1.5rem)] max-w-[1160px] my-[clamp(3.5rem,7vw,6rem)] rounded-[22px] bg-primary py-[clamp(2.75rem,5vw,4rem)] text-primary-foreground md:rounded-[28px]"
      >
        <div className="wrap grid items-center gap-14 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-sm font-semibold text-white/80">Recondicionados</p>
            <p aria-hidden className="mt-3 whitespace-nowrap text-[clamp(2.5rem,4.5vw,3.25rem)] font-bold leading-[0.95] tracking-[-0.04em]">
              {business.warrantyYears} anos
            </p>
            <h2
              id="refurb-title"
              className="h3-card mt-4 max-w-[26ch]"
            >
              <span className="sr-only">{business.warrantyYears} anos de garantia. </span>
              de garantia JCC em todos os equipamentos recondicionados, testados por nós.
            </h2>
            {/* Foto ilustrativa (CC0, assets-stock/): até 460px para ficar nítida a 2x */}
            <Photo
              name="dev-equipamentos"
              alt="Portátil, tablet e telemóvel lado a lado numa mesa de madeira"
              sizes="(min-width: 1024px) 460px, 100vw"
              className="mt-8 aspect-[3/2] w-full max-w-[460px] rounded-[18px]"
            />
          </div>
          <div>
            <ul className="border-t-[1.5px] border-white">
              {types.map((t, i) => (
                <li
                  key={t}
                  className="grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b border-white/30 py-5 md:grid-cols-[72px_1fr] md:py-6"
                >
                  <span className="text-[0.95rem] font-medium tabular-nums text-white/75">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[clamp(1.0625rem,1.3vw,1.25rem)] font-[650] tracking-[-0.025em]">{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[40ch] text-white/80">Não temos catálogo online. Pergunte-nos o que há em loja neste momento.</p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <ButtonLink href={waLink('Olá! Queria saber que recondicionados têm em loja neste momento.')} variant="white">
                Perguntar por WhatsApp <ArrowDot className="bg-foreground/10" />
              </ButtonLink>
              <ButtonLink href={business.phone.href} variant="outline">
                Ligar {business.phone.display}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section aria-labelledby="como-title">
        <div className="wrap">
          <SplitHead
            id="como-title"
            title="Como funciona."
            text="Ligue, escreva por WhatsApp ou passe pela loja, e diga-nos o que procura. Temos desktops, portáteis e telemóveis."
          />
          <ol className="grid gap-x-8 gap-y-12 md:grid-cols-3">
            {points.map((p, i) => (
              <Reveal as="li" key={p.t} delay={i * 0.06} className="border-t-[1.5px] border-foreground pt-6">
                <p className="text-[0.95rem] font-semibold text-primary">0{i + 1}</p>
                <h3 className="h3-small mt-10">{p.t}</h3>
                <p className="mt-3 text-muted-foreground">{p.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <FaqSection faqs={faqs} />
      <CtaBand
        title="Procura um computador ou telemóvel?"
        text="Diga-nos o que precisa e vemos o que temos em loja."
        whatsappText="Olá! Queria saber que recondicionados têm em loja neste momento."
        requestHref="/contactos/?assunto=recondicionados#pedido"
      />
      <JsonLd
        data={[
          breadcrumb([
            { name: 'Início', path: '/' },
            { name: 'Recondicionados', path: '/recondicionados/' },
          ]),
          faqPage(faqs),
        ]}
      />
    </>
  );
}
