import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

// Supported locales — add more here as needed
export const locales = ['fr', 'ar'] as const
export type Locale   = (typeof locales)[number]

export const defaultLocale: Locale = 'fr'

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale
  if (!locale || !locales.includes(locale as Locale)) notFound()

  return {
    locale,
    messages: (await import(`./dictionaries/${locale}.json`)).default,
    timeZone: 'Africa/Casablanca',
    now: new Date(),
  }
})
