import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { JsonLd } from '@/components/JsonLd';
import { business } from '@/data/business';
import { breadcrumb } from '@/data/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Política de privacidade | JCC Computadores',
  description:
    'Como o site da JCC Computadores trata os seus dados: sem cookies de rastreio, mapa só ao clicar e pedidos de orçamento entregues por email.',
  path: '/politica-privacidade/',
});

const link = 'font-semibold text-primary underline underline-offset-4';

function Clause({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-4 border-b border-border py-10 md:grid-cols-[1fr_2fr] md:gap-10 md:py-12">
      <h2 className="h3-small">{title}</h2>
      <div className="max-w-[62ch] space-y-4 text-[1.05rem] leading-relaxed">{children}</div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Início', href: '/' }, { name: 'Política de privacidade' }]}
        title={
          <>
            Política de <span className="text-primary">privacidade.</span>
          </>
        }
        lead="Este site recolhe o mínimo possível. Aqui explicamos o que acontece aos seus dados."
        actions={false}
      />
      <section className="section">
        <div className="wrap">
         <div className="border-t-[1.5px] border-foreground">
          <Clause title="Quem somos">
            <p>
              JCC Computadores, {business.street}, {business.postalCode} {business.city}. Contacto:{' '}
              <a className={link} href={`mailto:${business.email}`}>
                {business.email}
              </a>
              .
            </p>
          </Clause>

          <Clause title="O que este site faz">
            <ul className="space-y-3">
              <li>
                <strong>Não usa cookies de análise nem de publicidade.</strong> Não há ferramentas de estatísticas nem pixéis de rastreio.
              </li>
              <li>
                <strong>Letras e imagens</strong> são servidas pelo próprio site, não por terceiros.
              </li>
              <li>
                <strong>O mapa</strong> só carrega quando clica em &quot;Ver no mapa&quot;. Nessa altura o Google Maps é carregado e passa a aplicar a sua própria política de privacidade.
              </li>
              <li>
                <strong>O formulário &quot;Peça um orçamento&quot;</strong> envia o seu pedido (assunto, nome, telefone ou email e mensagem) através do serviço{' '}
                <a className={link} href="https://formsubmit.co" target="_blank" rel="noopener noreferrer">
                  FormSubmit
                </a>
                , que o entrega no email da loja ({business.email}). O site não guarda cópia do pedido. A FormSubmit aplica a sua própria política de privacidade.
              </li>
              <li>
                <strong>Se escolher enviar pelo WhatsApp</strong>, abre-se o WhatsApp no seu dispositivo com a mensagem escrita, e é o WhatsApp que a transmite.
              </li>
            </ul>
          </Clause>

          <Clause title="Quando nos contacta">
            <p>
              Se nos ligar, enviar um pedido pelo formulário, escrever por WhatsApp ou email, ou entregar um equipamento na loja, usamos os dados que nos der (nome, contacto, descrição da avaria) apenas para tratar do seu pedido.
            </p>
          </Clause>

          <Clause title="Os seus direitos">
            <p>
              Pode pedir-nos o acesso, a correção ou o apagamento dos seus dados escrevendo para{' '}
              <a className={link} href={`mailto:${business.email}`}>
                {business.email}
              </a>
              . Pode também apresentar reclamação à Comissão Nacional de Proteção de Dados (cnpd.pt).
            </p>
          </Clause>

          <Clause title="Livro de Reclamações">
            <p>
              Pode apresentar uma reclamação no{' '}
              <a className={link} href={business.complaintsBook} target="_blank" rel="noopener noreferrer">
                Livro de Reclamações Eletrónico
              </a>
              .
            </p>
          </Clause>
         </div>
        </div>
      </section>
      <JsonLd
        data={breadcrumb([
          { name: 'Início', path: '/' },
          { name: 'Política de privacidade', path: '/politica-privacidade/' },
        ])}
      />
    </>
  );
}
