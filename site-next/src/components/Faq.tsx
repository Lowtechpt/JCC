'use client';
import { useId, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import type { Faq as FaqType } from '@/data/services';
import { cn } from '@/lib/utils';

/**
 * Acordeão acessível (button + aria-expanded + region). As respostas estão sempre no HTML
 * (AEO): fechadas ficam com altura 0 e `visibility: hidden`, nunca fora do DOM.
 */
export function Faq({ faqs }: { faqs: FaqType[] }) {
  const base = useId();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="border-t-[1.5px] border-foreground">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        const btnId = `${base}-b${i}`;
        const panelId = `${base}-p${i}`;
        return (
          <div key={f.q} className="border-b border-foreground/10">
            <h3 className="h3-small">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex min-h-[84px] w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-200 hover:text-primary md:py-7"
              >
                <span className="max-w-[60ch]">{f.q}</span>
                <span
                  aria-hidden
                  className={cn(
                    'grid size-11 shrink-0 place-items-center rounded-full border-[1.5px] transition-colors duration-300',
                    isOpen
                      ? 'border-primary bg-primary text-white'
                      : 'border-foreground text-foreground group-hover:border-primary group-hover:text-primary',
                  )}
                >
                  {isOpen ? <Minus size={20} strokeWidth={1.75} /> : <Plus size={20} strokeWidth={1.75} />}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn(
                'grid transition-[grid-template-rows,visibility] duration-300 ease-out-soft',
                isOpen ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-[62ch] pb-8 pr-16 text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.5] text-muted-foreground">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
