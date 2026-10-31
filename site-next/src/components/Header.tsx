'use client';
import Link from '@/components/ui/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { Mark } from './Mark';
import { ArrowCircle } from './ArrowCircle';
import { ButtonLink } from './ui/button';
import { ArrowDot } from './ui/arrow-dot';
import { SocialLinks } from './Social';
import { business } from '@/data/business';
import { cn } from '@/lib/utils';

/** `short`: rótulo curto para a barra do desktop, onde o espaço é contado. */
const links: { href: string; label: string; short?: string }[] = [
  { href: '/#reparacoes', label: 'Reparações' },
  { href: '/recondicionados/', label: 'Recondicionados' },
  { href: '/assistencia-informatica-empresas/', label: 'Empresas' },
  { href: '/sobre/', label: 'Sobre' },
  { href: '/perguntas-frequentes/', label: 'Perguntas frequentes', short: 'FAQ' },
  { href: '/contactos/', label: 'Contactos' },
];

const trim = (p: string) => p.replace(/\/+$/, '');

export function Header() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() ?? '/';

  const isCurrent = (href: string) => {
    const base = trim(href.split('#')[0]);
    return base !== '' && trim(pathname) === base;
  };

  const close = useCallback(() => {
    setOpen(false);
    btnRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    // Ordem do DOM: botão do menu, depois os itens do painel.
    const focusables = () =>
      [btnRef.current, ...Array.from(panelRef.current?.querySelectorAll<HTMLElement>('a[href], button') ?? [])].filter(
        (el): el is HTMLElement => !!el,
      );
    panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab') return;
      const f = focusables();
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    // Se o ecrã passar a desktop com o menu aberto, fecha-o.
    const mq = window.matchMedia('(min-width: 1024px)');
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open, close]);

  const line =
    'absolute left-0 top-0 block h-[2px] w-full rounded-full bg-current transition-[translate,rotate] duration-300 ease-out-soft';

  return (
    <header className="sticky top-0 z-50">
      <a
        href="#conteudo"
        className="sr-only-focusable fixed left-4 top-3 z-[60] rounded-pill bg-primary px-4 py-2 font-semibold text-white"
      >
        Saltar para o conteúdo
      </a>

      <div
        className={cn(
          'relative z-10 border-b transition-colors duration-300',
          open ? 'border-transparent bg-white' : 'border-foreground/[0.07] bg-white/85 backdrop-blur-xl backdrop-saturate-150',
        )}
      >
        {/* lg: o menu centra-se entre o logótipo e o botão (pouco espaço); xl: centrado na página */}
        <div className="wrap grid h-[var(--header-h)] grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[auto_minmax(0,1fr)_auto] xl:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/"
            className="flex min-h-11 w-fit items-center gap-2.5 justify-self-start"
            aria-label="JCC Computadores, página inicial"
          >
            <Mark className="h-7 w-auto text-primary" />
            <span className="whitespace-nowrap text-[1.05rem] font-bold tracking-[-0.01em]">JCC Computadores</span>
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-6 justify-self-center lg:flex xl:gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isCurrent(l.href) ? 'page' : undefined}
                className={cn(
                  'flex min-h-11 items-center text-[15px] transition-colors duration-200 hover:text-foreground',
                  isCurrent(l.href) ? 'font-medium text-foreground' : 'text-muted-foreground',
                )}
              >
                {l.short ?? l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2">
            <SocialLinks variant="compact" className="ml-2 mr-1 hidden xl:flex" />
            <ButtonLink href="/contactos/#pedido" variant="dark" size="sm" className="hidden min-h-[46px] sm:inline-flex">
              Pedir orçamento
            </ButtonLink>
            <button
              ref={btnRef}
              type="button"
              aria-expanded={open}
              aria-controls="menu-movel"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => (open ? close() : setOpen(true))}
              className="grid size-11 place-items-center rounded-full lg:hidden"
            >
              <span aria-hidden className="relative block h-[12px] w-[24px]">
                <span className={cn(line, open ? 'translate-y-[5px] rotate-45' : 'translate-y-0')} />
                <span className={cn(line, open ? 'translate-y-[5px] -rotate-45' : 'translate-y-[10px]')} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="menu-movel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-0 flex flex-col overflow-y-auto bg-white pt-[var(--header-h)] lg:hidden"
          >
            <nav aria-label="Menu" className="wrap flex-1 pt-3">
              <ul className="border-t-[1.5px] border-foreground">
                {links.map((l, i) => (
                  <m.li
                    key={l.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.05 + i * 0.045 }}
                    className="border-b border-border"
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={isCurrent(l.href) ? 'page' : undefined}
                      className="group flex min-h-[78px] items-center justify-between gap-4"
                    >
                      <span className={cn('h3-card', isCurrent(l.href) && 'text-primary')}>{l.label}</span>
                      <ArrowCircle size={44} />
                    </Link>
                  </m.li>
                ))}
              </ul>
            </nav>
            <div className="wrap grid gap-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8 sm:grid-cols-2">
              <ButtonLink href={business.phone.href} onClick={() => setOpen(false)}>
                Ligar {business.phone.display} <ArrowDot />
              </ButtonLink>
              <ButtonLink href={business.whatsapp.href} variant="whatsapp" onClick={() => setOpen(false)}>
                WhatsApp
              </ButtonLink>
              <ButtonLink href="/contactos/#pedido" variant="line" onClick={() => setOpen(false)} className="sm:col-span-2">
                Pedir orçamento por email
              </ButtonLink>
              <div className="flex items-center justify-between gap-4 pt-3 sm:col-span-2">
                <p className="text-[0.95rem] font-medium text-muted-foreground">Siga-nos</p>
                <SocialLinks />
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
