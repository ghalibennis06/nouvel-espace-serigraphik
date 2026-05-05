'use client'
import { usePathname, useRouter } from 'next/navigation'
import { locales, publicLocales, type Locale } from '@/i18n'

const LABELS: Record<Locale, { short: string; long: string; flag: string }> = {
  fr: { short: 'FR', long: 'Français',       flag: '🇫🇷' },
  ar: { short: 'AR', long: 'الدارجة',         flag: '🇲🇦' },
}

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname()
  const router   = useRouter()

  // Soft-launch: hide the switcher entirely while only one locale is publicly ready.
  if (publicLocales.length < 2) return null

  function switchTo(newLocale: Locale) {
    if (newLocale === locale) return
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  // Routing-level locales array kept intact; UI iterates only the public list.
  void locales

  return (
    <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5 bg-gray-50">
      {publicLocales.map(loc => {
        const info  = LABELS[loc]
        const active = loc === locale
        return (
          <button
            key={loc}
            onClick={() => switchTo(loc)}
            title={info.long}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold transition-colors ${
              active
                ? 'bg-navy-900 text-white shadow-sm'
                : 'text-gray-500 hover:text-navy-900 hover:bg-gray-100'
            }`}
          >
            <span>{info.flag}</span>
            <span>{info.short}</span>
          </button>
        )
      })}
    </div>
  )
}
