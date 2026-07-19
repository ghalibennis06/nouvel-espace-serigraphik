import type { Metadata } from 'next'
import Link from 'next/link'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/i18n'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import { LiquidCursor } from '@/components/ui/liquid-cursor'
import ThemeProvider from '@/components/ThemeProvider'
import { getCategoryTree } from '@/lib/woocommerce'
import { whatsappGeneralLink } from '@/lib/utils'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'site' })
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nouvelespaceserigraphik.ma'
  return {
    title: {
      default: t('name'),
      template: `%s | ${t('name')}`,
    },
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}/${params.locale}`,
      languages: {
        'fr-MA': `${SITE_URL}/fr`,
        'ar-MA': `${SITE_URL}/ar`,
        'x-default': `${SITE_URL}/fr`,
      },
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${params.locale}`,
      siteName: t('name'),
      locale: params.locale === 'ar' ? 'ar_MA' : 'fr_MA',
    },
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params

  if (!locales.includes(locale as Locale)) notFound()

  setRequestLocale(locale)

  const [messages, { root: rootCategories, children: subCategories }] = await Promise.all([
    getMessages(),
    getCategoryTree(),
  ])

  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nouvelespaceserigraphik.ma'
  const PHONE    = process.env.NEXT_PUBLIC_PHONE   ?? '+212-522-44-80-90'
  const EMAIL    = process.env.NEXT_PUBLIC_EMAIL   ?? 'contact@nouvelespaceserigraphik.ma'
  const ADDRESS  = process.env.NEXT_PUBLIC_ADDRESS ?? 'Bd Mohammed V, Casablanca 20250'
  const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '212522448090'

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    name: 'Nouvel Espace Sérigraphik',
    alternateName: 'NES',
    url: SITE_URL,
    inLanguage: locale === 'ar' ? 'ar-MA' : 'fr-MA',
    publisher: { '@id': `${SITE_URL}#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/${locale}/categorie-produit?search={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}#organization`,
    name: 'Nouvel Espace Sérigraphik',
    alternateName: 'NES',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-default.jpg`,
    description: 'Un atelier, deux métiers : machines, kits et consommables d\'impression (sérigraphie, sublimation, DTF) et covering automobile films Carlas posé en atelier.',
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Équipement d\'impression pour ateliers', description: 'Machines, kits complets et consommables : sérigraphie, sublimation, DTF, presses à chaud.', url: `${SITE_URL}/${locale}/categorie-produit` },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Covering automobile', description: 'Pose de films covering Carlas Essential Series Gloss en atelier — 120+ coloris.', url: `${SITE_URL}/${locale}/covering` },
      },
    ],
    telephone: PHONE,
    email: EMAIL,
    address: { '@type': 'PostalAddress', streetAddress: ADDRESS, addressLocality: 'Casablanca', postalCode: '20250', addressCountry: 'MA' },
    areaServed: { '@type': 'Country', name: 'Morocco' },
    priceRange: 'MAD',
    sameAs: [`https://wa.me/${WHATSAPP}`],
  }

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('nes-theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AnnouncementBar />
            <Header
              locale={locale}
              rootCategories={rootCategories}
              subCategories={subCategories}
            />
            <main className="flex-1 pb-20 sm:pb-0">
              {children}
            </main>
            <Footer locale={locale} />
            <WhatsAppFloat />
            <LiquidCursor />
            {/* Mobile sticky CTA bar — visible below 640px only */}
            <div className="mob-sticky">
              <a
                href={whatsappGeneralLink('Bonjour NES, je veux commander.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa-dark"
                style={{ flex: 1, justifyContent: 'center', borderRadius: 12, padding: '13px 0', fontSize: 14, fontWeight: 800 }}
              >
                💬 WhatsApp
              </a>
              <Link
                href={`/${locale}/kits`}
                className="btn-orange"
                style={{ flex: 1, justifyContent: 'center', borderRadius: 12, padding: '13px 0', fontSize: 14, fontWeight: 800 }}
              >
                Voir les kits →
              </Link>
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
