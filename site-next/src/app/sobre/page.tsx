import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { SplitHead } from '@/components/SplitHead';
import { Photo } from '@/components/Photo';
import { Reveal } from '@/components/Reveal';
import { CtaBand } from '@/components/CtaBand';
import { JsonLd } from '@/components/JsonLd';
import { business } from '@/data/business';
import { breadcrumb } from '@/data/schema';
import { pageMetadata } from '@/lib/seo';
import type { ImageKey } from '@/data/images';

export const metadata: Metadata = pageMetadata({
  title: 'Sobre a JCC Computadores, em Leça da Palmeira desde 1994',
  description:
    'Conheça a JCC Computadores: loja de informática e reparação de TV e telemóveis em Leça da Palmeira, desde 1994, e a equipa que o atende.',
  path: '/sobre/',
});

const team: { name: string; img: ImageKey; alt: string; note: string }[] = [
  { name: 'Tiago Correia', img: 'tiago', alt: 'Tiago Correia ao balcão da loja, ao telefone', note: 'Ao balcão.' },
  { name: 'Nuno Correia', img: 'nuno', alt: 'Nuno Correia a trabalhar numa placa ao microscópio', note: 'Na bancada, ao microscópio.' },
  { name: 'José Correia', img: 'jose', alt: 'José Correia a testar uma placa de televisão', note: 'A testar a placa de uma televisão.' },
];

const facts = [
  { n: String(business.foundingYear), l: 'a reparar em Leça da Palmeira' },
  { n: `${business.warrantyYears} anos`, l: 'de garantia nos recondicionados' },
  { n: '6 dias', l: 'abertos por semana' },
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Início', href: '/' }, { name: 'Sobre' }]}
        title={
          <>
            Desde <span className="text-primary">{business.foundingYear}</span>, na esquina.
          </>
        }
        lead="Está escrito no letreiro: JCC Computadores, since 1994. Somos uma loja de informática e reparação de TV e telemóveis, em Leça da Palmeira."
      >
        {/* Colagem: loja, fachada à noite e cartão azul */}
        <div className="grid grid-cols-2 gap-3.5 lg:h-[440px] lg:grid-cols-[2.2fr_1fr_1fr]">
          <figure className="relative col-span-2 h-[260px] overflow-hidden rounded-card lg:col-span-1 lg:h-full">
            <Photo
              name="interior"
              alt="Interior da loja JCC: o balcão iluminado a azul, com o logótipo JCC e a parede de acessórios ao fundo"
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="size-full object-[50%_60%]"
            />
            <figcaption className="absolute bottom-4 left-4 rounded-pill bg-white px-4 py-2 text-[0.9rem] font-semibold">
              A loja, {business.street}
            </figcaption>
          </figure>
          <div className="h-[220px] overflow-hidden rounded-card lg:h-full">
            <Photo
              name="nuno"
              alt="Técnico da JCC a trabalhar numa placa ao microscópio, na bancada da oficina"
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="size-full"
            />
          </div>
          <div className="on-brand flex h-[220px] flex-col justify-between overflow-hidden rounded-card bg-primary p-6 text-primary-foreground lg:h-full lg:p-8">
            <p className="text-[clamp(1.75rem,2.4vw,2.25rem)] font-bold leading-[0.9] tracking-[-0.05em]">
              {business.googleRating.value}★
            </p>
            <p className="text-[0.95rem] leading-snug">
              {business.googleRating.count} avaliações no Google. Diagnóstico honesto e orçamento antes de reparar.
            </p>
          </div>
        </div>
      </PageHero>

      {/* Quem somos */}
      <section aria-labelledby="quem-title" className="section">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <h2 id="quem-title" className="h2-section">
              Sem discursos técnicos.
            </h2>
            <div>
              <p className="text-[clamp(1.0625rem,1.3vw,1.25rem)] font-[650] leading-[1.12] tracking-[-0.03em]">
                A JCC Computadores é uma loja de informática e reparação de TV e telemóveis em Leça da Palmeira, a trabalhar com a vizinhança desde {business.foundingYear}.
              </p>
              <p className="lead mt-8 max-w-[52ch]">
                Explicamos o que está avariado, o que é possível reparar e quanto custa, antes de avançar com qualquer trabalho.
              </p>
            </div>
          </div>

          <ul className="mt-[clamp(3.5rem,7vw,6rem)] grid gap-x-8 gap-y-10 sm:grid-cols-3">
            {facts.map((f) => (
              <li key={f.l} className="border-t-[1.5px] border-foreground pt-5">
                <p className="stat-num">{f.n}</p>
                <p className="mt-3 text-[0.95rem] text-muted-foreground">{f.l}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Equipa */}
      <section aria-labelledby="equipa-title" className="section bg-muted">
        <div className="wrap">
          <SplitHead id="equipa-title" title="Quem o atende." text="Ao balcão, na bancada e a testar placas de televisão." />
          <ul className="grid gap-8 sm:grid-cols-3 sm:gap-6">
            {team.map((t, i) => (
              <Reveal as="li" key={t.name} delay={i * 0.07} className="flex items-center gap-5 sm:block">
                <div className="w-[38%] max-w-[180px] shrink-0 sm:w-full sm:max-w-none">
                  <Photo
                    name={t.img}
                    alt={t.alt}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 33vw, 40vw"
                    className="aspect-[4/5] w-full rounded-card"
                  />
                </div>
                <div className="sm:mt-5">
                  <p className="h3-small">{t.name}</p>
                  <p className="mt-1 text-[0.95rem] leading-snug text-muted-foreground">{t.note}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <div className="h-[clamp(3.5rem,7vw,6rem)]" aria-hidden />
      <CtaBand title="Passe pela loja." text="Estamos na Rua General Humberto Delgado, 264, em Leça da Palmeira." />
      <JsonLd
        data={breadcrumb([
          { name: 'Início', path: '/' },
          { name: 'Sobre', path: '/sobre/' },
        ])}
      />
    </>
  );
}
