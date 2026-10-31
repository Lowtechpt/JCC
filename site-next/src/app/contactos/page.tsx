import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Visit } from '@/components/Visit';
import { ArrowCircle } from '@/components/ArrowCircle';
import { ButtonLink, buttonVariants } from '@/components/ui/button';
import { SocialLinks } from '@/components/Social';
import { JsonLd } from '@/components/JsonLd';
import { business } from '@/data/business';
import { withBase } from '@/lib/base-path';
import { localBusiness, breadcrumb } from '@/data/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Contactos e horário | JCC Computadores, Leça da Palmeira',
  description:
    'Rua General Humberto Delgado, 264, Leça da Palmeira. Telefone 965 882 675, WhatsApp 932 153 798. Horário de segunda a sábado.',
  path: '/contactos/',
});

const ways = [
  { label: 'Telefone', value: business.phone.display, href: business.phone.href, external: false },
  { label: 'WhatsApp', value: business.whatsapp.display, href: business.whatsapp.href, external: true },
  { label: 'Email', value: business.email, href: `mailto:${business.email}`, external: false },
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Início', href: '/' }, { name: 'Contactos' }]}
        title={
          <>
            Fale connosco, ou <span className="text-primary">passe pela loja.</span>
          </>
        }
        lead="Ligue, escreva por WhatsApp, peça orçamento pelo formulário mais abaixo ou passe pela loja, na esquina da Rua General Humberto Delgado."
        actions={false}
      >
        <ul className="border-t-[1.5px] border-foreground">
          {ways.map((w) => (
            <li key={w.label} className="border-b border-border">
              <a
                href={w.href}
                {...(w.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex min-h-[92px] items-center justify-between gap-4 py-5 transition-[padding,background-color] duration-300 ease-out-soft hover:bg-muted md:grid md:grid-cols-[200px_1fr_auto] md:gap-10 md:py-7 md:hover:pl-4"
              >
                <span className="flex flex-col gap-1 md:contents">
                  <span className="text-[0.95rem] font-medium text-muted-foreground">{w.label}</span>
                  <span className="h3-card [overflow-wrap:anywhere]">{w.value}</span>
                </span>
                <ArrowCircle />
              </a>
            </li>
          ))}
          <li className="flex flex-col gap-4 border-b border-border py-6 md:grid md:grid-cols-[200px_1fr] md:items-center md:gap-10 md:py-7">
            <span className="text-[0.95rem] font-medium text-muted-foreground">Redes sociais</span>
            <SocialLinks variant="labels" />
          </li>
          <li className="flex flex-col gap-4 border-b border-border py-6 md:grid md:grid-cols-[200px_1fr] md:items-center md:gap-10 md:py-7">
            <span className="text-[0.95rem] font-medium text-muted-foreground">No telemóvel</span>
            <span className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
              <a href={withBase('/jcc-computadores.vcf')} download className={buttonVariants({ variant: 'line', size: 'sm' })}>
                Guardar contacto
              </a>
              <span className="text-sm text-muted-foreground">Telefone, WhatsApp, email e morada num só toque.</span>
            </span>
          </li>
          <li className="flex flex-col gap-4 border-b border-border py-6 md:grid md:grid-cols-[200px_1fr] md:items-center md:gap-10 md:py-7">
            <span className="text-[0.95rem] font-medium text-muted-foreground">Por escrito</span>
            <span>
              <ButtonLink href="#pedido" variant="line" size="sm">
                Pedir orçamento pelo formulário
              </ButtonLink>
            </span>
          </li>
        </ul>
      </PageHero>
      <Visit headingId="visita-contactos" />
      <JsonLd
        data={[
          localBusiness(),
          breadcrumb([
            { name: 'Início', path: '/' },
            { name: 'Contactos', path: '/contactos/' },
          ]),
        ]}
      />
    </>
  );
}
