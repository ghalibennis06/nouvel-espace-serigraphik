import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nouvelespaceserigraphik.ma'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const url = `${SITE_URL}/${params.locale}/contact`
  const title = 'Contact NES — WhatsApp, téléphone, showroom Casablanca'
  const description = 'Parlez à NES en direct : WhatsApp 7j/7, téléphone, formulaire ou visite showroom à Casablanca. Réponse rapide pour devis, choix machine, kit ou consommables impression au Maroc.'
  return {
    title, description,
    keywords: ['contact NES Maroc', 'showroom impression Casablanca', 'WhatsApp sérigraphie Maroc', 'téléphone fournisseur sublimation Maroc'],
    alternates: { canonical: url, languages: { 'fr-MA': `${SITE_URL}/fr/contact`, 'ar-MA': `${SITE_URL}/ar/contact` } },
    openGraph: { title, description, url, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
