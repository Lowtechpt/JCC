/** "Sombra Markdown" do site para motores de resposta (AEO). Gerada a partir dos mesmos dados das páginas. */
import { SITE_URL, business, addressText, dayLabels, slotsText } from './business';
import { services } from './services';
import { generalFaqs } from './faq';

export const negocioMd = () => `# ${business.name}

${business.name} é uma loja de informática e reparação de computadores, telemóveis, televisões e consolas em Leça da Palmeira, Matosinhos. Está aberta desde ${business.foundingYear}.

## Morada e contactos
- Morada: ${addressText} (Matosinhos, Porto)
- Telefone: ${business.phone.display} (${business.phone.e164})
- WhatsApp: ${business.whatsapp.display} (${business.whatsapp.href})
- Email: ${business.email}
- Facebook: ${business.facebook}
- Instagram: ${business.instagram}
- Google Maps: ${business.mapsUrl}
- Pedido de orçamento por escrito: ${SITE_URL}/contactos/#pedido (chega ao email da loja)
- Guardar contacto (vCard): ${SITE_URL}/jcc-computadores.vcf

## Horário
${[1, 2, 3, 4, 5, 6, 0].map((d) => `- ${dayLabels[d]}: ${slotsText(d)}`).join('\n')}

## Factos
- Aberta desde ${business.foundingYear}.
- Recondicionados (desktops, portáteis e telemóveis): testados, com garantia JCC de ${business.warrantyYears} anos.
- Orçamento antes de qualquer reparação. A avaliação é sem compromisso.
- Avaliação no Google: ${business.googleRating.value} em 5, com ${business.googleRating.count} avaliações (consultado a ${business.googleRating.checkedOn}).
- Assistência informática a empresas e revenda técnica para profissionais.
`;

export const servicosMd = () => `# Serviços da ${business.name}

${services
  .map(
    (s) => `## ${s.name}
URL: ${SITE_URL}/${s.slug}/

${s.answer}

${s.issuesTitle}:
${s.issues.map((i) => `- ${i}`).join('\n')}
`,
  )
  .join('\n')}
## Recondicionados
URL: ${SITE_URL}/recondicionados/

Desktops, portáteis e telemóveis recondicionados, testados e com garantia JCC de ${business.warrantyYears} anos. Não há catálogo online: o stock vê-se em loja.

## Revenda
URL: ${SITE_URL}/revenda/

Serviços técnicos e de reparação eletrónica para profissionais, a preço de revenda.
`;

export const faqMd = () => `# Perguntas frequentes: ${business.name}

${generalFaqs.map((f) => `## ${f.q}\n${f.a}\n`).join('\n')}`;

export const fullMd = () =>
  [negocioMd(), servicosMd(), faqMd()].join('\n\n---\n\n');

export const md = (body: string) =>
  new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
