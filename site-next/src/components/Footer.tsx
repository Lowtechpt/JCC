import Link from '@/components/ui/link';
import { Mark } from './Mark';
import { ButtonLink } from './ui/button';
import { ArrowDot } from './ui/arrow-dot';
import { SocialLinks } from './Social';
import { business, slotsText } from '@/data/business';
import { withBase } from '@/lib/base-path';
import { services } from '@/data/services';

const a =
  'inline-flex min-h-11 items-center text-[0.95rem] text-muted-foreground transition-colors duration-200 hover:text-foreground hover:underline underline-offset-4 lg:min-h-9';
const label = 'mb-3 text-[0.9rem] font-semibold text-foreground';

const storeLinks: [string, string][] = [
  ['/recondicionados/', 'Recondicionados'],
  ['/revenda/', 'Revenda para profissionais'],
  ['/sobre/', 'Sobre nós'],
  ['/perguntas-frequentes/', 'Perguntas frequentes'],
  ['/contactos/', 'Contactos e horário'],
  ['/contactos/#pedido', 'Pedir orçamento'],
];

export function Footer() {
  return (
    <footer className="bg-muted text-foreground">
      <div className="wrap pb-8 pt-[clamp(4.5rem,9vw,8rem)]">
        {/* Frase de fecho */}
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <h2 className="h2-section max-w-[16ch]">
            Reparar é sempre a <span className="text-primary">melhor</span> escolha.
          </h2>
          <div className="flex flex-wrap gap-2.5">
            <ButtonLink href={business.phone.href}>
              Ligar agora <ArrowDot />
            </ButtonLink>
            <ButtonLink href={business.whatsapp.href} variant="line">
              WhatsApp
            </ButtonLink>
          </div>
        </div>

        {/* Colunas */}
        <div className="mt-[clamp(3.5rem,7vw,6rem)] grid gap-x-10 gap-y-12 border-t-[1.5px] border-foreground pt-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Mark className="h-7 w-auto text-primary" />
              <span className="text-lg font-bold tracking-[-0.01em]">JCC Computadores</span>
            </div>
            <address className="mt-5 text-[0.95rem] not-italic leading-relaxed text-muted-foreground">
              {business.street}
              <br />
              {business.postalCode} {business.city}
            </address>
            <p className="mt-2">
              <a className={a} href={business.phone.href}>
                Tel. {business.phone.display}
              </a>
              <br />
              <a className={a} href={business.whatsapp.href} target="_blank" rel="noopener noreferrer">
                WhatsApp {business.whatsapp.display}
              </a>
              <br />
              <a className={a} href={`mailto:${business.email}`}>
                {business.email}
              </a>
              <br />
              <a className={`${a} font-semibold text-foreground`} href={withBase('/jcc-computadores.vcf')} download>
                Guardar contacto no telemóvel
              </a>
            </p>
            <SocialLinks variant="labels" className="mt-6" />
          </div>

          <nav aria-label="Reparações">
            <h3 className={label}>Reparações</h3>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link className={a} href={`/${s.slug}/`}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="A loja">
            <h3 className={label}>A loja</h3>
            <ul>
              {storeLinks.map(([h, l]) => (
                <li key={h}>
                  <Link className={a} href={h}>
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className={label}>Horário</h3>
            <dl className="text-[0.95rem] leading-relaxed">
              {(
                [
                  ['Segunda a sexta', slotsText(1)],
                  ['Sábado', slotsText(6)],
                  ['Domingo', slotsText(0)],
                ] as const
              ).map(([d, h]) => (
                <div key={d} className="mb-3">
                  <dt className="text-muted-foreground">{d}</dt>
                  <dd className="font-medium tabular-nums">{h}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Linha final */}
        <div className="mt-14 flex flex-col gap-x-8 gap-y-2 border-t border-foreground/10 pt-4 text-[0.9rem] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} JCC Computadores. Loja de informática em Leça da Palmeira desde {business.foundingYear}.
          </p>
          <ul className="flex flex-wrap gap-x-6 md:shrink-0">
            <li>
              <a className={a} href={business.complaintsBook} target="_blank" rel="noopener noreferrer">
                Livro de Reclamações
              </a>
            </li>
            <li>
              <Link className={a} href="/politica-privacidade/">
                Política de privacidade
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
