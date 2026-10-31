import { Breadcrumbs } from './Breadcrumbs';
import { ButtonLink } from './ui/button';
import { ArrowDot } from './ui/arrow-dot';
import Link from '@/components/ui/link';
import { business, waLink } from '@/data/business';

/**
 * Cabeçalho das páginas interiores (proposta B): migalhas pequenas; título gigante à esquerda;
 * à direita o texto de apoio e os botões (Ligar agora + WhatsApp). `children` fica por baixo,
 * em largura total (fotos, lista de contactos...).
 * `compact` usa um degrau abaixo para títulos longos (ex.: "Manutenção e otimização de software...").
 */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  actions = true,
  compact = false,
  whatsappText,
  requestHref = '/contactos/#pedido',
  children,
}: {
  crumbs: { name: string; href?: string }[];
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  actions?: boolean;
  compact?: boolean;
  /** Mensagem já escrita no WhatsApp (ex.: o serviço da página). */
  whatsappText?: string;
  /** Ligação para o formulário de pedido, com o equipamento/assunto já escolhido. */
  requestHref?: string;
  children?: React.ReactNode;
}) {
  const hasSide = Boolean(lead) || actions;
  return (
    <div className="pt-3 md:pt-5">
      <div className="wrap">
        <Breadcrumbs items={crumbs} />
        <div
          className={`mt-8 grid grid-cols-[minmax(0,1fr)] gap-8 md:mt-12 ${hasSide ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start lg:gap-16' : ''}`}
        >
          <div>
            {eyebrow && <p className="mb-5 text-[0.95rem] font-semibold text-primary">{eyebrow}</p>}
            {/* O tamanho mínimo acompanha a largura (11vw/10vw) para palavras longas, como "Recondicionados",
                caberem aos 320px; a partir do telemóvel normal fica no valor de .h1-page / .h2-section. */}
            <h1
              className={compact ? 'h2-section' : 'h1-page'}
              style={{ fontSize: compact ? 'clamp(min(1.5rem, 8vw), 2.2vw, 2.125rem)' : 'clamp(min(1.875rem, 9vw), 3vw, 2.75rem)' }}
            >
              {title}
            </h1>
          </div>
          {hasSide && (
            <div className="lg:pt-1">
              {lead && <p className="lead">{lead}</p>}
              {actions && (
                <div className={`flex flex-wrap gap-2.5 ${lead ? 'mt-7' : ''}`}>
                  <ButtonLink href={business.phone.href}>
                    Ligar agora <ArrowDot />
                  </ButtonLink>
                  <ButtonLink href={waLink(whatsappText)} variant="line">
                    WhatsApp
                  </ButtonLink>
                </div>
              )}
              {actions && (
                <Link
                  href={requestHref}
                  className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-semibold text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
                >
                  Ou peça orçamento por email
                </Link>
              )}
            </div>
          )}
        </div>
        {children && <div className="mt-12 md:mt-16">{children}</div>}
      </div>
    </div>
  );
}
