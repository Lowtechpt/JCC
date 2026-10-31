import { SITE_URL, business, openingHoursSpecification } from './business';
import { services, type Faq, type Service } from './services';

export const ids = {
  org: `${SITE_URL}/#organizacao`,
  site: `${SITE_URL}/#website`,
  biz: `${SITE_URL}/#negocio`,
};

export const abs = (path: string) => `${SITE_URL}${path}`;

const contactPoint = [
  {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: business.phone.e164,
    email: business.email,
    areaServed: 'PT',
    availableLanguage: ['pt-PT'],
  },
];

export const organization = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ids.org,
  name: business.name,
  url: `${SITE_URL}/`,
  logo: abs('/logo-jcc.png'),
  foundingDate: String(business.foundingYear),
  sameAs: [business.facebook, business.instagram, business.mapsUrl],
  contactPoint,
});

export const website = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': ids.site,
  url: `${SITE_URL}/`,
  name: business.name,
  inLanguage: 'pt-PT',
  publisher: { '@id': ids.org },
});

/** Sem aggregateRating auto-declarado e sem geo (por verificar). */
export const localBusiness = () => ({
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ElectronicsStore'],
  '@id': ids.biz,
  name: business.name,
  url: `${SITE_URL}/`,
  logo: abs('/logo-jcc.png'),
  image: abs('/og-image.jpg'),
  telephone: business.phone.e164,
  email: business.email,
  foundingDate: String(business.foundingYear),
  slogan: business.slogan,
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.street,
    postalCode: business.postalCode,
    addressLocality: business.city,
    addressRegion: business.region,
    addressCountry: business.countryCode,
  },
  openingHoursSpecification,
  areaServed: [
    { '@type': 'City', name: 'Leça da Palmeira' },
    { '@type': 'AdministrativeArea', name: 'Matosinhos' },
    { '@type': 'City', name: 'Porto' },
  ],
  sameAs: [business.facebook, business.instagram, business.mapsUrl],
  hasMap: business.mapsUrl,
  contactPoint,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Serviços',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.name, url: abs(`/${s.slug}/`) },
    })),
  },
});

export const serviceSchema = (s: Service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: s.name,
  serviceType: s.serviceType,
  description: s.metaDescription,
  url: abs(`/${s.slug}/`),
  provider: { '@id': ids.biz },
  areaServed: [
    { '@type': 'City', name: 'Leça da Palmeira' },
    { '@type': 'AdministrativeArea', name: 'Matosinhos' },
  ],
});

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

export const faqPage = (faqs: Faq[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});
