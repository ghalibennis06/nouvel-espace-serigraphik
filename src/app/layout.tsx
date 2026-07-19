import type { Metadata, Viewport } from 'next'
import './globals.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nouvelespaceserigraphik.ma'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'NES — Grossiste impression & films covering Carlas au Maroc',
    template: '%s | Nouvel Espace Sérigraphik',
  },
  description: 'NES fournit les pros au Maroc depuis 2018 : machines et consommables d\'impression pour les ateliers (sérigraphie, sublimation, DTF), films covering Carlas au rouleau pour les garages et poseurs. Stock Casablanca, livraison 24–48h.',
  applicationName: 'Nouvel Espace Sérigraphik',
  keywords: [
    'sérigraphie Maroc', 'sublimation Maroc', 'DTF Maroc', 'impression textile',
    'machine sérigraphie', 'presse à chaud', 'kit sublimation', 'kit DTF',
    'grossiste sérigraphie Maroc', 'fournisseur film covering Maroc', 'distributeur Carlas Maroc', 'grossiste DTF Casablanca',
    'broderie machine', 'consommables impression', 'Casablanca', 'NES',
  ],
  authors: [{ name: 'Nouvel Espace Sérigraphik' }],
  creator: 'Nouvel Espace Sérigraphik',
  publisher: 'Nouvel Espace Sérigraphik',
  category: 'business',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    siteName: 'Nouvel Espace Sérigraphik',
    title: 'NES — Grossiste impression & films covering Carlas au Maroc',
    description: 'Le fournisseur des ateliers d\'impression et des poseurs de covering au Maroc. Stock Casablanca, livraison 24–48h.',
    url: SITE_URL,
    locale: 'fr_MA',
    alternateLocale: ['ar_MA'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NES — Grossiste impression & films covering Carlas au Maroc',
    description: 'Le fournisseur des ateliers d\'impression et des poseurs de covering au Maroc.',
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'fr-MA': `${SITE_URL}/fr`,
      'ar-MA': `${SITE_URL}/ar`,
      'x-default': `${SITE_URL}/fr`,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  formatDetection: { telephone: true, email: true, address: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF7' },
    { media: '(prefers-color-scheme: dark)',  color: '#0B1019' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
