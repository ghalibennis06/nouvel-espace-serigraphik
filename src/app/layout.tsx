import type { Metadata, Viewport } from 'next'
import './globals.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nouvelespaceserigraphik.ma'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Nouvel Espace Sérigraphik — Impression & Covering Auto au Maroc',
    template: '%s | Nouvel Espace Sérigraphik',
  },
  description: 'Un atelier, deux métiers : machines, kits et consommables d\'impression (sérigraphie, sublimation, DTF) et covering automobile films Carlas posé en atelier. 2 000+ ateliers équipés, livraison 24–48h, WhatsApp 7j/7.',
  applicationName: 'Nouvel Espace Sérigraphik',
  keywords: [
    'sérigraphie Maroc', 'sublimation Maroc', 'DTF Maroc', 'impression textile',
    'machine sérigraphie', 'presse à chaud', 'kit sublimation', 'kit DTF',
    'covering auto Maroc', 'wrapping voiture Casablanca', 'film covering Carlas',
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
    title: 'Nouvel Espace Sérigraphik — Impression & Covering Auto au Maroc',
    description: 'Un atelier, deux métiers : équipement d\'impression pour ateliers et covering automobile films Carlas. Livraison 24–48h.',
    url: SITE_URL,
    locale: 'fr_MA',
    alternateLocale: ['ar_MA'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nouvel Espace Sérigraphik — Impression & Covering Auto au Maroc',
    description: 'Un atelier, deux métiers : équipement d\'impression et covering automobile films Carlas au Maroc.',
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
