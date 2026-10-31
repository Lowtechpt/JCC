import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Faq } from '@/components/Faq';
import { CtaBand } from '@/components/CtaBand';
import { JsonLd } from '@/components/JsonLd';
import { generalFaqs } from '@/data/faq';
import { faqPage, breadcrumb } from '@/data/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Perguntas frequentes | JCC Computadores, Leça da Palmeira',
  description:
    'Respostas diretas sobre orçamentos, prazos, garantia dos recondicionados, horário e morada da JCC Computadores, em Leça da Palmeira, Matosinhos.',
  path: '/perguntas-frequentes/',
});

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Início', href: '/' }, { name: 'Perguntas frequentes' }]}
        title={
          <>
            O que nos perguntam <span className="text-primary">ao balcão.</span>
          </>
        }
        lead="Respostas curtas e diretas. Se a sua pergunta não está aqui, ligue-nos ou escreva por WhatsApp."
      />
      <section aria-labelledby="perguntas-title" className="section">
        <div className="wrap">
          <h2 id="perguntas-title" className="sr-only">
            Perguntas e respostas
          </h2>
          <Faq faqs={generalFaqs} />
        </div>
      </section>
      <CtaBand />
      <JsonLd
        data={[
          faqPage(generalFaqs),
          breadcrumb([
            { name: 'Início', path: '/' },
            { name: 'Perguntas frequentes', path: '/perguntas-frequentes/' },
          ]),
        ]}
      />
    </>
  );
}
