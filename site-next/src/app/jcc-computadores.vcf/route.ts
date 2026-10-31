import { business, SITE_URL } from '@/data/business';

export const dynamic = 'force-static';

/** vCard 3.0: escapar vírgulas, pontos e vírgulas e barras nos valores. */
const esc = (v: string) => v.replace(/([,;\\])/g, '\\$1');

/** "Guardar contacto": gera /jcc-computadores.vcf a partir dos mesmos dados do resto do site. */
export const GET = () => {
  const vcf = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${esc(business.name)};;;;`,
    `FN:${esc(business.name)}`,
    `ORG:${esc(business.name)}`,
    'X-ABShowAs:COMPANY',
    `TEL;TYPE=WORK,VOICE:${business.phone.e164}`,
    `item1.TEL:+${business.whatsapp.number}`,
    'item1.X-ABLabel:WhatsApp',
    `EMAIL;TYPE=INTERNET,WORK:${business.email}`,
    `ADR;TYPE=WORK:;;${esc(business.street)};${esc(business.city)};${esc(business.region)};${business.postalCode};Portugal`,
    `URL:${SITE_URL}/`,
    `NOTE:${esc(`Reparação de computadores, telemóveis, televisões e consolas. Desde ${business.foundingYear}.`)}`,
    'END:VCARD',
    '',
  ].join('\r\n');
  return new Response(vcf, { headers: { 'Content-Type': 'text/vcard; charset=utf-8' } });
};
