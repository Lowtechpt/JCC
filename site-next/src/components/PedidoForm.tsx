'use client';
import { useId, useRef, useState, useSyncExternalStore } from 'react';
import { ChevronDown, Check, Loader2 } from 'lucide-react';
import Link from '@/components/ui/link';
import { business, waLink } from '@/data/business';
import { buttonVariants } from '@/components/ui/button';
import { ArrowDot } from '@/components/ui/arrow-dot';
import { cn } from '@/lib/utils';

/** `short` aparece nos botões; `label` vai no email que chega à loja. */
export const subjects = [
  { key: 'reparacao', short: 'Reparação', label: 'Orçamento de reparação' },
  { key: 'recondicionados', short: 'Recondicionados', label: 'Recondicionados' },
  { key: 'empresas', short: 'Empresas', label: 'Assistência a empresas' },
  { key: 'revenda', short: 'Revenda', label: 'Revenda para profissionais' },
  { key: 'outro', short: 'Outro', label: 'Outro assunto' },
] as const;

export const equipment = [
  { key: 'telemovel', label: 'Telemóvel' },
  { key: 'computador', label: 'Computador ou portátil' },
  { key: 'televisao', label: 'Televisão' },
  { key: 'consola', label: 'Consola' },
  { key: 'dados', label: 'Disco ou dados perdidos' },
  { key: 'outro', label: 'Outro equipamento' },
] as const;

type SubjectKey = (typeof subjects)[number]['key'];
type EquipKey = (typeof equipment)[number]['key'];
type Status = 'idle' | 'sending' | 'sent' | 'error';

const noop = () => () => {};
/** Lê ?assunto= e ?equipamento= (vindos das páginas de serviço). Vazio no servidor e na hidratação. */
function useSearch() {
  return useSyncExternalStore(noop, () => window.location.search, () => '');
}

const isSubject = (v: string | null): v is SubjectKey => subjects.some((s) => s.key === v);
const isEquip = (v: string | null): v is EquipKey => equipment.some((e) => e.key === v);

/**
 * Pedido de orçamento/contacto que chega por email (FormSubmit, sem servidor).
 * Alternativa no mesmo sítio: enviar a mesma mensagem pelo WhatsApp.
 */
export function PedidoForm() {
  const uid = useId();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const fromEquip = params.get('equipamento');
  const fromSubject = params.get('assunto');

  // Escolha do utilizador por cima do que vem no URL (null = ainda não mexeu)
  const [subjectPick, setSubjectPick] = useState<SubjectKey | null>(null);
  const [equipPick, setEquipPick] = useState<EquipKey | null>(null);
  const subject: SubjectKey = subjectPick ?? (isEquip(fromEquip) ? 'reparacao' : isSubject(fromSubject) ? fromSubject : 'reparacao');
  const equip: EquipKey = equipPick ?? (isEquip(fromEquip) ? fromEquip : 'telemovel');

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [consent, setConsent] = useState(false);
  const [honey, setHoney] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [contactError, setContactError] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const subjectLabel = subjects.find((s) => s.key === subject)!.label;
  const equipLabel = equipment.find((e) => e.key === equip)!.label;
  const isRepair = subject === 'reparacao';

  const lines = () =>
    [
      `Assunto: ${subjectLabel}`,
      isRepair && `Equipamento: ${equipLabel}`,
      nome.trim() && `Nome: ${nome.trim()}`,
      telefone.trim() && `Telefone: ${telefone.trim()}`,
      email.trim() && `Email: ${email.trim()}`,
      mensagem.trim() && `Mensagem: ${mensagem.trim()}`,
    ].filter(Boolean) as string[];

  const sendWhatsApp = () => {
    window.open(waLink(['Olá! Pedido feito a partir do site.', ...lines()].join('\n')), '_blank', 'noopener');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current!;
    const noContact = !telefone.trim() && !email.trim();
    setContactError(noContact);
    if (!form.checkValidity()) {
      form.reportValidity();
      (form.querySelector(':invalid') as HTMLElement | null)?.focus();
      return;
    }
    if (noContact) {
      phoneRef.current?.focus();
      return;
    }
    // Campo-isco preenchido: é um robô. Fingimos sucesso e não enviamos nada.
    if (honey) {
      setStatus('sent');
      return;
    }

    setStatus('sending');
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15_000);
    try {
      const res = await fetch(business.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: ctrl.signal,
        body: JSON.stringify({
          _subject: `Pedido pelo site: ${subjectLabel}${isRepair ? ` · ${equipLabel}` : ''}`,
          _template: 'table',
          _captcha: 'false',
          ...(email.trim() ? { _replyto: email.trim() } : {}),
          Assunto: subjectLabel,
          ...(isRepair ? { Equipamento: equipLabel } : {}),
          Nome: nome.trim(),
          Telefone: telefone.trim() || '(não indicado)',
          Email: email.trim() || '(não indicado)',
          Mensagem: mensagem.trim(),
          'Enviado a partir de': window.location.href,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
      if (!res.ok || String(data.success) !== 'true') throw new Error('envio falhou');
      setStatus('sent');
      requestAnimationFrame(() => doneRef.current?.focus());
    } catch {
      setStatus('error');
    } finally {
      clearTimeout(timer);
    }
  };

  const reset = () => {
    setMensagem('');
    setStatus('idle');
  };

  const field =
    'block min-h-12 w-full rounded-xl border-[1.5px] border-foreground/30 bg-white px-4 py-3 text-base text-foreground transition-colors duration-200 placeholder:text-muted-foreground hover:border-foreground/60 focus:border-primary focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-[invalid=true]:border-[#b42318]';
  const label = 'text-sm font-semibold';
  const req = <span aria-hidden className="text-primary"> *</span>;

  if (status === 'sent') {
    return (
      <div
        ref={doneRef}
        tabIndex={-1}
        role="status"
        className="rounded-card bg-muted p-6 outline-none sm:p-8"
      >
        <span aria-hidden className="grid size-11 place-items-center rounded-full bg-primary text-white">
          <Check size={22} strokeWidth={2.25} />
        </span>
        <h4 className="h3-card mt-5">Pedido enviado.</h4>
        <p className="lead mt-2 max-w-[44ch]">
          Obrigado{nome.trim() ? `, ${nome.trim().split(' ')[0]}` : ''}. Recebemos o seu pedido por email e respondemos por{' '}
          {email.trim() && telefone.trim() ? 'telefone ou email' : email.trim() ? 'email' : 'telefone'}.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Se for urgente, ligue para{' '}
          <a href={business.phone.href} className="font-semibold text-foreground underline underline-offset-4">
            {business.phone.display}
          </a>
          .
        </p>
        <button type="button" onClick={reset} className={buttonVariants({ variant: 'line', size: 'sm', className: 'mt-6' })}>
          Enviar outro pedido
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="relative grid gap-6" aria-describedby={`${uid}-nota`}>
      <fieldset>
        <legend className={label}>Sobre o que é o pedido?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {subjects.map((s) => (
            <label key={s.key} className="relative">
              <input
                type="radio"
                name="assunto"
                value={s.key}
                checked={subject === s.key}
                onChange={() => setSubjectPick(s.key)}
                className="peer sr-only"
              />
              <span className="inline-flex min-h-11 cursor-pointer items-center rounded-full border-[1.5px] border-foreground/25 px-4 text-[0.9375rem] font-medium select-none transition-colors duration-200 hover:border-foreground peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary">
                {s.short}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {isRepair && (
        <div>
          <label htmlFor={`${uid}-equip`} className={label}>
            Equipamento
          </label>
          <div className="relative mt-2">
            <select
              id={`${uid}-equip`}
              name="equipamento"
              value={equip}
              onChange={(e) => setEquipPick(e.target.value as EquipKey)}
              className={cn(field, 'appearance-none pr-12')}
            >
              {equipment.map((x) => (
                <option key={x.key} value={x.key}>
                  {x.label}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      )}

      <div>
        <label htmlFor={`${uid}-nome`} className={label}>
          Nome{req}
        </label>
        <input
          id={`${uid}-nome`}
          name="nome"
          autoComplete="name"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={cn(field, 'mt-2')}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 sm:gap-4">
        <div>
          <label htmlFor={`${uid}-tel`} className={label}>
            Telefone
          </label>
          <input
            ref={phoneRef}
            id={`${uid}-tel`}
            name="telefone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            pattern="[+0-9 ]{9,}"
            value={telefone}
            onChange={(e) => {
              setTelefone(e.target.value);
              setContactError(false);
            }}
            aria-invalid={contactError || undefined}
            aria-describedby={contactError ? `${uid}-contacto` : undefined}
            placeholder="9xx xxx xxx"
            className={cn(field, 'mt-2')}
          />
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className={label}>
            Email
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setContactError(false);
            }}
            aria-invalid={contactError || undefined}
            aria-describedby={contactError ? `${uid}-contacto` : undefined}
            placeholder="nome@exemplo.pt"
            className={cn(field, 'mt-2')}
          />
        </div>
        <p
          id={`${uid}-contacto`}
          role={contactError ? 'alert' : undefined}
          className={cn('-mt-3 text-sm sm:col-span-2', contactError ? 'font-medium text-[#b42318]' : 'text-muted-foreground')}
        >
          {contactError ? 'Indique um telefone ou um email para lhe respondermos.' : 'Basta um dos dois: telefone ou email.'}
        </p>
      </div>

      <div>
        <label htmlFor={`${uid}-msg`} className={label}>
          {isRepair ? 'O que se passa com o equipamento?' : 'A sua mensagem'}
          {req}
        </label>
        <textarea
          id={`${uid}-msg`}
          name="mensagem"
          rows={5}
          required
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder={isRepair ? 'Ex.: o ecrã partiu-se e deixou de dar imagem…' : 'Escreva aqui o seu pedido…'}
          className={cn(field, 'mt-2 resize-y')}
        />
      </div>

      {/* Campo-isco contra robôs: invisível para pessoas e leitores de ecrã */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-hp`}>Não preencher</label>
        <input id={`${uid}-hp`} name="_honey" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-[0.9375rem] leading-snug">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[var(--brand)]"
        />
        <span>
          Aceito que a JCC Computadores use estes dados só para responder a este pedido (
          <Link href="/politica-privacidade/" className="font-semibold underline underline-offset-4">
            privacidade
          </Link>
          ).{req}
        </span>
      </label>

      {status === 'error' && (
        <div role="alert" className="rounded-xl border-[1.5px] border-[#b42318]/40 bg-[#fef3f2] p-4 text-[0.9375rem]">
          <p className="font-semibold text-[#912018]">Não foi possível enviar o pedido agora.</p>
          <p className="mt-1 text-foreground">
            Tente outra vez, envie pelo WhatsApp ou ligue para{' '}
            <a href={business.phone.href} className="font-semibold underline underline-offset-4">
              {business.phone.display}
            </a>
            .
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={status === 'sending'}
          className={buttonVariants({ className: 'group gap-3 disabled:opacity-80' })}
        >
          {status === 'sending' ? (
            <>
              A enviar… <Loader2 aria-hidden size={18} className="animate-spin motion-reduce:animate-none" />
            </>
          ) : (
            <>
              Enviar pedido <ArrowDot />
            </>
          )}
        </button>
        <button
          type="button"
          onClick={sendWhatsApp}
          className="min-h-11 text-[0.9375rem] font-semibold text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
        >
          Prefiro enviar pelo WhatsApp
        </button>
      </div>

      <p id={`${uid}-nota`} className="text-sm text-muted-foreground">
        O pedido chega ao email da loja ({business.email}). Os campos com <span className="text-primary">*</span> são obrigatórios.
      </p>
    </form>
  );
}
