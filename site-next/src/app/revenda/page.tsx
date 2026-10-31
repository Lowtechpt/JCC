import type { Metadata } from 'next';
import Link from '@/components/ui/link';
import { PageHero } from '@/components/PageHero';
import { ArrowCircle } from '@/components/ArrowCircle';
import { CtaBand } from '@/components/CtaBand';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumb } from '@/data/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Revenda técnica para profissionais | JCC Computadores',
  description:
    'Serviços técnicos e de reparação eletrónica para profissionais, a preço de revenda. JCC Computadores, Leça da Palmeira, Matosinhos.',
  path: '/revenda/',
});

const who = ['Tem uma loja', 'Tem uma oficina', 'Presta serviços'];

export default function Page() {
  return (
    <>
      <PageHero
        whatsappText="Olá! Sou profissional e queria saber das condições de revenda."
        requestHref="/contactos/?assunto=revenda#pedido"
        crumbs={[{ name: 'Início', href: '/' }, { name: 'Revenda' }]}
        eyebrow="Para profissionais"
        title={
          <>
            Revenda <span className="text-primary">técnica.</span>
          </>
        }
        lead="Fazemos serviços técnicos e de reparação eletrónica para profissionais, a preço de revenda."
      />

      <section aria-labelledby="trabalha-title" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <h2 id="trabalha-title" className="h2-section lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            Se trabalha na área.
          </h2>
          <div>
            <ul className="border-t-[1.5px] border-foreground">
              {who.map((w, i) => (
                <li key={w} className="grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b border-border py-6 md:grid-cols-[90px_1fr] md:py-7">
                  <span className="text-[0.95rem] font-medium tabular-nums text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                  <span className="h3-card">{w}</span>
                </li>
              ))}
            </ul>
            <div className="lead mt-10 max-w-[56ch] space-y-5">
              <p>
                Se tem uma loja, uma oficina ou presta serviços e precisa de uma reparação eletrónica que não faz internamente, podemos tratar dela por si.
              </p>
              <p>
                As condições de revenda combinam-se diretamente connosco. Ligue-nos, escreva por WhatsApp ou passe pela loja, e conte-nos o que precisa.
              </p>
            </div>

            <div className="mt-12 rounded-card bg-muted p-7 sm:p-9">
              <p className="lead max-w-[52ch]">
                Se o seu caso é o de uma empresa que precisa de suporte regular aos seus próprios equipamentos, veja a nossa assistência informática a empresas.
              </p>
              <Link
                href="/assistencia-informatica-empresas/"
                className="group mt-6 flex min-h-[72px] items-center justify-between gap-6 border-t-[1.5px] border-foreground pt-5"
              >
                <span className="h3-small">Assistência informática a empresas</span>
                <ArrowCircle size={44} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Fale connosco sobre revenda."
        text="Contacte-nos para mais informações."
        whatsappText="Olá! Sou profissional e queria saber das condições de revenda."
        requestHref="/contactos/?assunto=revenda#pedido"
      />
      <JsonLd
        data={breadcrumb([
          { name: 'Início', path: '/' },
          { name: 'Revenda', path: '/revenda/' },
        ])}
      />
    </>
  );
}
