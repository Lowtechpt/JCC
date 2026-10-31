'use client';
import { useState } from 'react';
import { business } from '@/data/business';
import { buttonVariants } from '@/components/ui/button';
import { ArrowDot } from '@/components/ui/arrow-dot';
import { Photo } from '@/components/Photo';

/**
 * Cartão do mapa: a fachada de dia como capa (proporção 4:3 da foto, para nunca a ampliar), com a pílula "Ver no mapa".
 * O Google Maps só carrega ao clicar (peso e privacidade).
 */
export function MapEmbed() {
  const [on, setOn] = useState(false);
  return (
    <div className="relative isolate aspect-[4/3] w-full overflow-hidden rounded-card bg-dark lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
      {on ? (
        <iframe
          title="Mapa: JCC Computadores, Rua General Humberto Delgado 264, Leça da Palmeira"
          src={business.mapsEmbedUrl}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <>
          <Photo
            name="fachada"
            alt="Fachada da loja JCC Computadores, à esquina, com o letreiro azul"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="absolute inset-0 -z-10 size-full object-[50%_40%]"
          />
          <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-center gap-2.5 sm:inset-x-6 sm:bottom-6">
            <button type="button" onClick={() => setOn(true)} className={buttonVariants({ variant: 'white' })}>
              Ver no mapa <ArrowDot className="bg-foreground/10" />
            </button>
            <span className="rounded-pill bg-white/90 px-3.5 py-2 text-[0.8rem] font-medium text-foreground">
              Ao clicar, carrega o Google Maps.
            </span>
          </div>
        </>
      )}
    </div>
  );
}
