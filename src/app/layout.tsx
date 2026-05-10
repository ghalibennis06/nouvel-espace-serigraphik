import type { Metadata, Viewport } from 'next'
import './globals.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nouvelespaceserigraphik.ma'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Nouvel Espace Sérigraphik — Machines & Kits d\'impression au Maroc',
    template: '%s | Nouvel Espace Sérigraphik',
  },
  description: 'Machines, kits et consommables pour sérigraphie, sublimation, DTF, UV et broderie au Maroc. Plus de 2 000 ateliers accompagnés. Livraison 24–48h, support WhatsApp 7j/7.',
  applicationName: 'Nouvel Espace Sérigraphik',
  keywords: [
    'sérigraphie Maroc', 'sublimation Maroc', 'DTF Maroc', 'impression textile',
    'machine sérigraphie', 'presse à chaud', 'kit sublimation', 'kit DTF',
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
    title: 'Nouvel Espace Sérigraphik — Machines & Kits d\'impression au Maroc',
    description: 'Machines, kits et consommables pour sérigraphie, sublimation, DTF, UV et broderie au Maroc. Livraison 24–48h.',
    url: SITE_URL,
    locale: 'fr_MA',
    alternateLocale: ['ar_MA'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nouvel Espace Sérigraphik — Machines & Kits d\'impression au Maroc',
    description: 'Machines, kits et consommables pour sérigraphie, sublimation, DTF, UV et broderie au Maroc.',
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
