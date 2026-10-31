import { Star } from 'lucide-react';
import { Reveal } from '../Reveal';
import { business, schedule } from '@/data/business';

/** Dias da semana em que a loja abre (segunda a sábado = 6), calculado do horário. */
const openDays = Object.values(schedule).filter((slots) => slots.length > 0).length;

/**
 * Faixa escura da proposta B ("Desde 1994, na esquina."): título à esquerda e grelha 2x2
 * de números separada por linhas de 1px. Substitui a antiga fila "Trust".
 */
export function Numbers() {
  const stats: { big: React.ReactNode; label: string }[] = [
    { big: String(business.foundingYear), label: 'a reparar em Leça' },
    { big: `${business.warrantyYears} anos`, label: 'garantia nos recondicionados' },
    { big: `${openDays} dias`, label: 'abertos por semana' },
    {
      big: (
        <span className="inline-flex items-center gap-[0.08em]">
          {business.googleRating.value}
          <Star aria-hidden className="size-[0.6em] fill-current" strokeWidth={0} />
          <span className="sr-only"> de 5 estrelas</span>
        </span>
      ),
      label: 'no Google',
    },
  ];

  return (
    <section
      aria-labelledby="numeros-title"
      className="on-dark mx-auto w-[calc(100%-1.5rem)] max-w-[1160px] rounded-[22px] bg-dark py-[clamp(2.75rem,5vw,4rem)] text-white md:rounded-[28px]"
    >
      <div className="wrap grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <h2 id="numeros-title" className="h2-section">
            Desde {business.foundingYear},
            <br />
            na esquina. <em className="not-italic text-primary-soft">Sem conversa técnica.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] bg-dark-line">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end gap-2.5 bg-dark p-5 sm:p-6">
                <dt className="text-sm leading-snug text-white/60">{s.label}</dt>
                <dd className="stat-num whitespace-nowrap">
                  {s.big}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
