import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { Services } from '@/components/home/Services';
import { Numbers } from '@/components/home/Numbers';
import { Reviews } from '@/components/home/Reviews';
import { Visit } from '@/components/Visit';
import { JsonLd } from '@/components/JsonLd';
import { localBusiness } from '@/data/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Reparação de PC, telemóveis e TV em Leça da Palmeira | JCC',
  description:
    'Reparação de computadores, telemóveis, TV e consolas em Leça da Palmeira desde 1994. Orçamento antes de reparar e recondicionados com 3 anos de garantia.',
  path: '/',
});

/**
 * Home curta (pedido do Luis, 2026-10-31): o que reparamos, porque confiar, avaliações e onde estamos.
 * Recondicionados, empresas, equipa, perguntas frequentes e formulário vivem nas páginas próprias, no menu.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Numbers />
      <Reviews />
      <Visit form={false} />
      <JsonLd data={localBusiness()} />
    </>
  );
}
