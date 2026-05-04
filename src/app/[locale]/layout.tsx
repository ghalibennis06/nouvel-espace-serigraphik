import type { Metadata } from 'next'
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

interface LocaleLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'site' })
  return {
    title: {
      default: t('name'),
      template: `%s | ${t('name')}`,
    },
    description: t('description'),
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

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* FOUC prevention: apply saved theme before first paint */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('nes-theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();` }} />
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
            <main className="flex-1">
              {children}
            </main>
            <Footer locale={locale} />
            <WhatsAppFloat />
            <LiquidCursor />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
