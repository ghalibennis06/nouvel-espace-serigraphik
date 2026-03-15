// Root layout — minimal wrapper that delegates to [locale] layout
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nouvelespaceserigraphik.ma'),
  title: {
    default: 'Nouvel Espace Serigraphik — Fournitures Professionnelles d\'Impression',
    template: '%s | Nouvel Espace Serigraphik',
  },
  description: 'Importateur et distributeur officiel de fournitures de sérigraphie, sublimation et impression textile au Maroc. Antex, Inknovator, Freesub.',
  keywords: ['sérigraphie', 'sublimation', 'impression textile', 'transfert', 'Maroc', 'Casablanca'],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'Nouvel Espace Serigraphik',
    locale: 'fr_MA',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
