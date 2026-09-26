import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { site, capabilities } from '@/lib/site';
import './globals.css';

const sans = localFont({
  src: './fonts/geist-sans-latin.woff2',
  variable: '--font-geist-sans',
  weight: '100 900',
  display: 'swap',
});
const mono = localFont({
  src: './fonts/geist-mono-latin-500.woff2',
  variable: '--font-geist-mono',
  weight: '500',
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
});

const shareImage = {
  url: '/social-preview.png',
  width: 1200,
  height: 630,
  alt: 'ZeroShot — Beyond the obvious. Applied technology and engineering across AI, data, software and infrastructure.',
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: 'website',
    images: [shareImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: [shareImage],
  },
  robots: { index: true, follow: true },
};

// Only verified, visible company information. No invented address, reviews or ratings.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      description: site.description,
      email: site.email,
      logo: `${site.url}/logo.svg`,
      sameAs: [site.linkedIn],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Applied technology and engineering services',
        itemListElement: capabilities.map(capability => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: capability.title,
            description: capability.description,
            provider: { '@id': `${site.url}/#organization` },
          },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: 'en',
      publisher: { '@id': `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="light"><body className={`${sans.variable} ${mono.variable}`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    {children}
  </body></html>;
}
