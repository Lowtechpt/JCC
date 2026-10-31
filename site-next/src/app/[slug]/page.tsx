import type { Metadata } from 'next';
import Link from '@/components/ui/link';
import { notFound } from 'next/navigation';
import { services, getService } from '@/data/services';
import { images } from '@/data/images';
import { serviceSchema, breadcrumb, faqPage } from '@/data/schema';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/PageHero';
import { SplitHead } from '@/components/SplitHead';
import { ArrowCircle } from '@/components/ArrowCircle';
import { Photo } from '@/components/Photo';
import { Reveal } from '@/components/Reveal';
import { FaqSection } from '@/components/FaqSection';
import { CtaBand } from '@/components/CtaBand';
import { JsonLd } from '@/components/JsonLd';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/${s.slug}/` });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  if (!services.some((x) => x.slug === slug)) notFound();
  const s = getService(slug);

  // Foto do equipamento (ilustrativa, CC0: sem legenda, para não passar por foto da loja). Nunca ampliada além da largura nativa.
  const photoKey = `dev-${s.device.key}` as const;
  const img = images[photoKey];

  // Outros serviços: primeiro os relacionados, depois os restantes.
  const others = [
    ...s.related.map(getService),
    ...services.filter((x) => x.slug !== s.slug && !s.related.includes(x.slug)),
  ];

  const longTitle = `${s.h1[0]} ${s.h1[1]}`.length > 38;

  // Pedido com o equipamento (ou o assunto) já escolhido no formulário, e WhatsApp com mensagem escrita.
  const equipFor: Record<string, string> = {
    'reparacao-telemoveis': 'telemovel',
    'reparacao-computadores': 'computador',
    'reparacao-televisoes': 'televisao',
    'reparacao-consolas': 'consola',
    'recuperacao-dados': 'dados',
    'manutencao-software': 'computador',
  };
  const requestHref = equipFor[s.slug]
    ? `/contactos/?equipamento=${equipFor[s.slug]}#pedido`
    : '/contactos/?assunto=empresas#pedido';
  const whatsappText = `Olá! Queria pedir um orçamento: ${s.name.toLowerCase()}.`;

  return (
    <>
      <PageHero
        crumbs={[{ name: 'Início', href: '/' }, { name: s.name }]}
        compact={longTitle}
        title={
          <>
            {s.h1[0]} <span className="text-primary">{s.h1[1]}</span>
          </>
        }
        lead={s.answer}
        whatsappText={whatsappText}
        requestHref={requestHref}
      />

      {/* Introdução + foto */}
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start lg:gap-20">
          <Reveal>
            <p className="max-w-[40ch] text-[clamp(1.0625rem,1.2vw,1.25rem)] font-semibold leading-[1.4] tracking-[-0.015em]">{s.intro[0]}</p>
            {s.intro.length > 1 && (
              <div className="lead mt-8 max-w-[52ch] space-y-5">
                {s.intro.slice(1).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            )}
          </Reveal>
          <div className="w-full lg:justify-self-end" style={{ maxWidth: Math.min(img.width / 2, 460) }}>
            <Photo name={photoKey} alt={s.device.alt} sizes="(min-width: 1024px) 460px, 100vw" className="aspect-[4/3] w-full rounded-card" />
          </div>
        </div>
      </section>

      {/* Avarias que reparamos */}
      <section aria-labelledby="avarias-title" className="pb-[clamp(5.5rem,10vw,8.75rem)]">
        <div className="wrap">
          <SplitHead id="avarias-title" title={s.issuesTitle} text={s.issuesNote} />
          <ol className="border-t-[1.5px] border-foreground">
            {s.issues.map((issue, i) => (
              <li
                key={issue}
                className="grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b border-border py-6 md:grid-cols-[90px_1fr] md:py-8"
              >
                <span className="text-[0.95rem] font-medium tabular-nums text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                <span className="h3-small">{issue}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Como trabalhamos */}
      <section aria-labelledby="passos-title" className="section bg-muted">
        <div className="wrap">
          <SplitHead
            id="passos-title"
            title="Como trabalhamos."
            text="Vemos o equipamento, explicamos o problema sem termos técnicos e só avançamos com o seu sim."
          />
          <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {s.steps.map((st, i) => (
              <Reveal as="li" key={st.t} delay={i * 0.06} className="border-t-[1.5px] border-foreground pt-6">
                <p className="text-[0.95rem] font-semibold text-primary">0{i + 1}</p>
                <h3 className="h3-small mt-10">{st.t}</h3>
                <p className="mt-3 text-muted-foreground">{st.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <FaqSection faqs={s.faqs} title={`Perguntas sobre ${s.short.toLowerCase()}`} />

      <CtaBand title="Traga-nos o equipamento." whatsappText={whatsappText} requestHref={requestHref} />

      {/* Outros serviços */}
      <section aria-labelledby="rel-title" className="pb-[clamp(5.5rem,10vw,8.75rem)]">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_2.2fr] lg:gap-16">
          <h2 id="rel-title" className="h3-card">
            Outros serviços
          </h2>
          <ul className="border-t-[1.5px] border-foreground">
            {others.map((r) => (
              <li key={r.slug} className="border-b border-border">
                <Link
                  href={`/${r.slug}/`}
                  className="group grid min-h-[76px] grid-cols-[1fr_auto] items-center gap-6 py-4 transition-[padding,background-color] duration-300 ease-out-soft hover:bg-muted md:hover:pl-4 lg:grid-cols-[1.1fr_1fr_auto]"
                >
                  <span className="h3-small">{r.name}</span>
                  <span className="hidden text-[0.95rem] leading-snug text-muted-foreground lg:block">{r.cardLine}</span>
                  <ArrowCircle size={44} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JsonLd
        data={[
          serviceSchema(s),
          breadcrumb([
            { name: 'Início', path: '/' },
            { name: s.name, path: `/${s.slug}/` },
          ]),
          faqPage(s.faqs),
        ]}
      />
    </>
  );
}
