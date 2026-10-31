/**
 * Factos do negócio num só sítio (NAP, horário, ligações).
 * Usado no cabeçalho, rodapé, contactos, JSON-LD e no script "aberto agora".
 * Fonte: JCC_INFO_SITE.md (confirmado pelo dono).
 */
export const SITE_URL = 'https://www.jccpt.com';

export type Slot = [open: string, close: string];

export const business = {
  name: 'JCC Computadores',
  foundingYear: 1994,
  slogan: 'Reparar é sempre a melhor escolha',
  street: 'R. Gen. Humberto Delgado, 264',
  postalCode: '4450-699',
  city: 'Leça da Palmeira',
  municipality: 'Matosinhos',
  region: 'Porto',
  countryCode: 'PT',
  phone: { display: '965 882 675', e164: '+351965882675', href: 'tel:+351965882675' },
  whatsapp: {
    display: '932 153 798',
    number: '351932153798',
    href: 'https://wa.me/351932153798',
  },
  email: 'geral@jccpt.com',
  facebook: 'https://www.facebook.com/jcccomputadores',
  instagram: 'https://www.instagram.com/jcccomputadores',
  mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJ9ZAiHRhvJA0R9-7cBpLJ_cU',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=R.+Gen.+Humberto+Delgado+264,+4450-699+Le%C3%A7a+da+Palmeira&output=embed',
  mapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=R.+Gen.+Humberto+Delgado+264,+4450-699+Le%C3%A7a+da+Palmeira',
  complaintsBook: 'https://www.livroreclamacoes.pt',
  /** Ficha do Google. Nota e n.º de avaliações tal como aparecem no Google a 2026-10-31 (print do Luis). */
  googlePlaceId: 'ChIJ9ZAiHRhvJA0R9-7cBpLJ_cU',
  googleRating: { value: '4,8', count: 71, checkedOn: '2026-10-31' },
  googleWriteReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJ9ZAiHRhvJA0R9-7cBpLJ_cU',
  warrantyYears: 3,
  /**
   * Formulário de pedido: FormSubmit (formsubmit.co) entrega cada pedido no email da loja, sem servidor.
   * ATIVAÇÃO: o 1.º envio manda um email para geral@jccpt.com com o botão "Activate Form"; até alguém
   * carregar nele, os pedidos não chegam. Depois, a FormSubmit envia um código aleatório: trocar o email
   * neste URL por esse código (https://formsubmit.co/ajax/<codigo>) para o esconder dos robôs de spam.
   */
  formEndpoint: 'https://formsubmit.co/ajax/geral@jccpt.com',
} as const;

/** 0 = domingo ... 6 = sábado. Horas em formato 24h, hora de Lisboa. */
export const schedule: Record<number, Slot[]> = {
  0: [],
  1: [['09:30', '12:30'], ['14:30', '19:00']],
  2: [['09:30', '12:30'], ['14:30', '19:00']],
  3: [['09:30', '12:30'], ['14:30', '19:00']],
  4: [['09:30', '12:30'], ['14:30', '19:00']],
  5: [['09:30', '12:30'], ['14:30', '19:00']],
  6: [['09:30', '12:30']],
};

export const dayNames = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'] as const;
export const dayLabels = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
] as const;

const schemaDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** "09:30" -> "9:30" */
export const fmtTime = (t: string) => t.replace(/^0/, '');

export const slotsText = (day: number): string => {
  const s = schedule[day] ?? [];
  return s.length ? s.map(([a, b]) => `${fmtTime(a)}–${fmtTime(b)}`).join(' · ') : 'Encerrado';
};

export const openingHoursSpecification = Object.entries(schedule).flatMap(([d, slots]) =>
  slots.map(([opens, closes]) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: schemaDays[Number(d)],
    opens,
    closes,
  })),
);

export const addressText = `${business.street}, ${business.postalCode} ${business.city}`;

export const waLink = (text?: string) =>
  text ? `${business.whatsapp.href}?text=${encodeURIComponent(text)}` : business.whatsapp.href;
