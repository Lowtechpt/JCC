import Link from '@/components/ui/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../Reveal';
import { Photo } from '../Photo';
import { ButtonLink } from '../ui/button';
import { SplitHead } from './split-head';
import { business } from '@/data/business';
import { getService } from '@/data/services';
import { cn } from '@/lib/utils';

const more: [string, string][] = [
  ['/recondicionados/', `Recondicionados com ${business.warrantyYears} anos de garantia`],
  ['/assistencia-informatica-empresas/', 'Assistência a empresas'],
  ['/revenda/', 'Revenda para profissionais'],
];

/** Títulos da lista: respondem a "O que precisa de reparar?". A frase de cada linha vem dos dados do serviço. */
const rows = [
  { slug: 'reparacao-telemoveis', label: 'Telemóveis' },
  { slug: 'reparacao-computadores', label: 'Computadores e portáteis' },
  { slug: 'reparacao-televisoes', label: 'Televisões' },
  { slug: 'reparacao-consolas', label: 'Consolas' },
  { slug: 'recuperacao-dados', label: 'Recuperação de dados' },
  { slug: 'manutencao-software', label: 'Manutenção e software' },
];

/**
 * "O que precisa de reparar?": lista editorial (número, serviço, frase, seta).
 * Substitui a fila de ícones e o bento. Cada linha é uma ligação para a página do serviço.
 */
export function Services() {
  return (
    <section id="reparacoes" aria-labelledby="servicos-title" className="section">
      <div className="wrap">
        <Reveal>
          <SplitHead
            id="servicos-title"
            title="O que precisa de reparar?"
            lead="Vemos o equipamento, explicamos o problema sem termos técnicos e só avançamos com o seu sim."
          />
        </Reveal>
        <ul className="border-t-[1.5px] border-foreground">
          {rows.map((r, i) => {
            const s = getService(r.slug);
            return (
              <Reveal as="li" key={r.slug} delay={Math.min(i * 0.05, 0.2)} className="border-b border-border">
                <Link
                  href={`/${s.slug}/`}
                  className="group grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-center gap-x-4 py-4 transition-colors duration-300 ease-out-soft hover:bg-muted lg:grid-cols-[3.5rem_6.5rem_minmax(0,1.2fr)_minmax(0,1fr)_2.75rem] lg:gap-x-6 lg:py-4"
                >
                  <span
                    aria-hidden
                    className="hidden text-sm font-medium text-muted-foreground transition-transform duration-300 ease-out-soft motion-safe:group-hover:translate-x-2 lg:block"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {/* Miniatura do equipamento (decorativa: o título já diz o que é) */}
                  <span aria-hidden className="block overflow-hidden rounded-xl">
                    <Photo
                      name={`dev-${s.device.key}-320`}
                      alt=""
                      sizes="(min-width: 1024px) 104px, 72px"
                      className="aspect-[4/3] w-full transition-transform duration-500 ease-out-soft motion-safe:group-hover:scale-[1.04]"
                    />
                  </span>
                  <div className="lg:contents">
                    <h3 className="h3-card transition-transform duration-300 ease-out-soft motion-safe:group-hover:translate-x-2">
                      {r.label}
                    </h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-[1.5] text-muted-foreground transition-transform duration-300 ease-out-soft motion-safe:group-hover:translate-x-2 lg:mt-0">
                      {s.cardLine}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className={cn(
                      'grid size-11 place-items-center rounded-full border-[1.5px] border-foreground transition-colors duration-300 ease-out-soft group-hover:border-primary group-hover:bg-primary group-hover:text-white',
                      i === 0 && 'border-primary bg-primary text-white',
                    )}
                  >
                    <ArrowRight size={18} strokeWidth={2} />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
        {/* O resto da loja tem página própria: aqui fica só o caminho até lá */}
        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <p className="mr-1.5 text-[0.95rem] font-medium text-muted-foreground">Também na JCC:</p>
          {more.map(([href, label]) => (
            <ButtonLink key={href} href={href} variant="line" size="sm">
              {label}
            </ButtonLink>
          ))}
        </div>
      </div>
    </section>
  );
}
