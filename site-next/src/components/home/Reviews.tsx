import { Star } from 'lucide-react';
import { Reveal } from '../Reveal';
import { ButtonLink } from '../ui/button';
import { PillArrow } from './pill-arrow';
import { business } from '@/data/business';

/** Temas que se repetem nas avaliações (resumo, não citações). */
const themes = [
  'A competência e o profissionalismo da equipa, em cada visita.',
  'A simpatia e a atenção ao detalhe, com orçamentos e prazos cumpridos.',
  'Bons preços e disponibilidade, das reparações de telemóveis e PC aos computadores gaming feitos por medida.',
  'Um serviço rápido e honesto, que muita gente recomenda a familiares e amigos.',
];

export function Reviews() {
  const rating = Number(business.googleRating.value.replace(',', '.'));
  return (
    <section aria-labelledby="rev-title" className="section bg-muted">
      <div className="wrap grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <p className="text-[clamp(2.75rem,6vw,3.5rem)] font-bold leading-none tracking-[-0.04em]">
            <span className="sr-only">Nota </span>
            {business.googleRating.value}
            <span className="ml-2 text-[0.3em] font-semibold tracking-normal text-muted-foreground">de 5</span>
          </p>
          {/* Estrelas proporcionais à nota real (ex.: 4,8 -> a 5.ª estrela fica 80% cheia) */}
          <p aria-hidden className="relative mt-4 inline-flex">
            <span className="flex gap-1 text-foreground/15">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={22} className="fill-current" strokeWidth={0} />
              ))}
            </span>
            <span
              className="absolute inset-y-0 left-0 flex gap-1 overflow-hidden text-foreground"
              style={{ width: `${(rating / 5) * 100}%` }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={22} className="shrink-0 fill-current" strokeWidth={0} />
              ))}
            </span>
          </p>
          <p className="mt-2 text-base">
            <strong className="font-semibold">{business.googleRating.count} avaliações</strong> no Google
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 id="rev-title" className="h2-section max-w-[20ch]">
            O que mais se repete nas avaliações
          </h2>
          <ul className="mt-6 border-t-[1.5px] border-foreground md:mt-8">
            {themes.map((t) => (
              <li
                key={t}
                className="grid grid-cols-[auto_1fr] gap-x-4 border-b border-foreground/15 py-5 text-base leading-snug md:text-base"
              >
                <span aria-hidden className="mt-[0.45em] size-2 rotate-45 bg-primary" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 md:mt-8">
            <ButtonLink href={business.mapsUrl} variant="dark" className="group max-w-full gap-3 whitespace-normal py-2.5 text-left">
              Ler as avaliações no Google
              <PillArrow />
            </ButtonLink>
            <a
              href={business.googleWriteReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-[0.9375rem] font-semibold underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
            >
              Já é cliente? Deixe a sua avaliação
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
