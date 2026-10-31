import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/business';

export const dynamic = 'force-static';

const bots = ['*', 'GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Applebot'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: bots.map((userAgent) => ({ userAgent, allow: '/' })),
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
