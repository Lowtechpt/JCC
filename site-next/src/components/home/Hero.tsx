import { Star } from 'lucide-react';
import { Photo } from '../Photo';
import { OpenStatus } from '../OpenStatus';
import { ButtonLink } from '../ui/button';
import { PillArrow } from './pill-arrow';
import { business } from '@/data/business';

/**
 * Hero da proposta B: título, coluna lateral alinhada à base (estado, texto, botões)
 * e uma colagem de três blocos (loja, técnico, cartão azul com a nota do Google).
 * Sem animação de entrada: o título é o candidato a LCP.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-8 md:pt-12">
      <div className="wrap">
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-[1fr_auto] lg:gap-16">
          <h1 id="hero-title" className="h1-hero min-w-0 max-w-[16ch]">
            Reparar é sempre a <em className="not-italic text-primary">melhor</em> escolha.
          </h1>
          <div className="max-w-[420px] lg:max-w-[340px]">
            {/* O OpenStatus (cliente) traz uma pílula; aqui fica só o ponto e o texto, como na proposta */}
            <div className="mb-3 [&>p]:min-h-0 [&>p]:bg-transparent [&>p]:p-0 [&>p]:ring-0">
              <OpenStatus tone="light" />
            </div>
            <p className="lead">
              Computadores, telemóveis, televisões e consolas. Em Leça da Palmeira desde {business.foundingYear}.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <ButtonLink
                href={business.phone.href}
                className="group gap-3"
                aria-label={`Ligar agora, ${business.phone.display}`}
              >
                Ligar agora
                <PillArrow />
              </ButtonLink>
              <ButtonLink href={business.whatsapp.href} variant="line">
                WhatsApp
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 md:mt-12 md:gap-[14px] lg:h-[300px] lg:grid-cols-[2.2fr_1fr_1fr]">
          <figure className="relative col-span-2 h-[220px] overflow-hidden rounded-card md:h-[260px] lg:col-span-1 lg:h-auto">
            <Photo
              name="interior"
              alt="Interior da loja JCC: o balcão iluminado a azul, com o logótipo JCC e a parede de acessórios ao fundo"
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="size-full"
            />
            <figcaption className="absolute bottom-3.5 left-3.5 max-w-[calc(100%-28px)] rounded-full bg-white px-3.5 py-2 text-[0.8rem] font-semibold leading-tight text-foreground md:bottom-[18px] md:left-[18px] md:text-[0.85rem]">
              <span className="hidden min-[400px]:inline">A loja · </span>
              {business.street}
            </figcaption>
          </figure>

          <div className="relative h-[190px] overflow-hidden rounded-card md:h-[230px] lg:h-auto">
            <Photo
              name="nuno"
              alt="Técnico da JCC a trabalhar numa placa ao microscópio, na bancada da oficina"
              sizes="(min-width: 1024px) 24vw, 50vw"
              className="size-full object-[40%_50%]"
            />
          </div>

          <div className="on-brand flex min-h-[190px] flex-col justify-between rounded-card bg-primary p-5 text-white md:min-h-[230px] md:p-6 lg:min-h-0">
            <p className="flex items-center gap-[0.08em] text-[2rem] font-bold leading-none tracking-[-0.04em] lg:text-[2.5rem]">
              {business.googleRating.value}
              <Star aria-hidden className="size-[0.6em] shrink-0 fill-current" strokeWidth={0} />
              <span className="sr-only"> de 5 estrelas</span>
            </p>
            <p className="text-[0.9375rem] leading-[1.4] text-white/90">
              {business.googleRating.count} avaliações no Google.
              <span className="hidden md:inline"> Diagnóstico honesto e orçamento antes de reparar.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
