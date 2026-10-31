import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/button';
import { ArrowDot } from '@/components/ui/arrow-dot';

export const metadata: Metadata = {
  title: { absolute: 'Página não encontrada | JCC Computadores' },
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="pb-[clamp(5rem,10vw,8rem)] pt-[clamp(3rem,8vw,7rem)]">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-end lg:gap-16">
        <div>
          <p className="mb-5 text-[clamp(1.4rem,2.4vw,2rem)] font-bold tracking-[-0.03em] text-primary">Erro 404</p>
          <h1 className="h1-page">Esta página não existe.</h1>
        </div>
        <div className="lg:pb-2">
          <p className="lead">Pode ter sido movida ou o endereço estar errado. Volte ao início ou fale connosco.</p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <ButtonLink href="/">
              Ir para o início <ArrowDot />
            </ButtonLink>
            <ButtonLink href="/contactos/" variant="line">
              Contactos
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
