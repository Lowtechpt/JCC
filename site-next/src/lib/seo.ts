import type { Metadata } from 'next';
import { SITE_URL, business } from '@/data/business';

export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'pt_PT',
      siteName: business.name,
      title,
      description,
      url,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Loja JCC Computadores, em Leça da Palmeira, desde 1994' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
