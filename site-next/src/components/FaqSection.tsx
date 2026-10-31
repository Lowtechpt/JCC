import { Faq } from './Faq';
import { SplitHead } from './SplitHead';
import { ButtonLink } from './ui/button';
import { ArrowDot } from './ui/arrow-dot';
import type { Faq as FaqType } from '@/data/services';
import { cn } from '@/lib/utils';

export function FaqSection({
  faqs,
  title = 'Perguntas frequentes',
  lead = 'Respostas diretas. Se a sua pergunta não está aqui, ligue-nos ou escreva por WhatsApp.',
  more = false,
  tone = 'default',
}: {
  faqs: FaqType[];
  title?: string;
  lead?: string;
  more?: boolean;
  tone?: 'default' | 'muted';
}) {
  return (
    <section aria-labelledby="faq-title" className={cn('section', tone === 'muted' ? 'bg-muted' : 'bg-background')}>
      <div className="wrap">
        <SplitHead id="faq-title" title={title} text={lead} />
        <Faq faqs={faqs} />
        {more && (
          <div className="mt-10">
            <ButtonLink href="/perguntas-frequentes/" variant="line">
              Ver todas as perguntas <ArrowDot className="bg-foreground/10" />
            </ButtonLink>
          </div>
        )}
      </div>
    </section>
  );
}
