import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileBar } from '@/components/MobileBar';
import { JsonLd } from '@/components/JsonLd';
import { organization, website } from '@/data/schema';
import { SITE_URL, business } from '@/data/business';
import { withBase, isPreview } from '@/lib/base-path';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: business.name,
  manifest: withBase('/site.webmanifest'),
  icons: {
    icon: [
      { url: withBase('/favicon.svg'), type: 'image/svg+xml' },
      { url: withBase('/favicon-32.png'), sizes: '32x32', type: 'image/png' },
      { url: withBase('/icon-192.png'), sizes: '192x192', type: 'image/png' },
    ],
    apple: withBase('/apple-touch-icon.png'),
  },
  alternates: { types: { 'text/plain': '/llms.txt' } },
  // Pré-visualização (GitHub Pages): fora do Google, para não competir com o site verdadeiro.
  ...(isPreview ? { robots: { index: false, follow: false } } : {}),
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Cabeçalho de 72px (proposta B): o --header-h de globals.css (60px) é substituído aqui,
    // para scroll-padding e restantes cálculos acompanharem a altura real do cabeçalho.
    <html lang="pt-PT" className={GeistSans.variable} style={{ '--header-h': '72px' } as React.CSSProperties}>
      <body>
        <Providers>
          <Header />
          <main id="conteudo">
            {children}
          </main>
          <Footer />
          <MobileBar />
        </Providers>
        <JsonLd data={[organization(), website()]} />
      </body>
    </html>
  );
}
