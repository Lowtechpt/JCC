import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/business';
import { services } from '@/data/services';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    ...services.map((s) => `/${s.slug}/`),
    '/recondicionados/',
    '/revenda/',
    '/sobre/',
    '/perguntas-frequentes/',
    '/contactos/',
    '/politica-privacidade/',
  ];
  return paths.map((p) => ({
    url: `${SITE_URL}${p}`,
    changeFrequency: p === '/' ? 'weekly' : 'monthly',
    priority: p === '/' ? 1 : p.startsWith('/reparacao') || p === '/contactos/' ? 0.9 : 0.7,
  }));
}
