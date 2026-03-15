'use client'
import { useTranslations } from 'next-intl'

export default function AnnouncementBar() {
  const t = useTranslations('announcement')
  const items: string[] = t.raw('items') as string[]

  // Duplicate items for seamless loop
  const doubled = [...items, ...items]

  return (
    <div className="bg-navy-900 text-white text-xs font-medium py-2 overflow-hidden">
      <div
        className="animate-ticker"
        style={{ animationDuration: '40s' }}
        aria-hidden="true"
      >
        {doubled.map((item, i) => (
          <span key={i} className="mx-10 inline-block">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
