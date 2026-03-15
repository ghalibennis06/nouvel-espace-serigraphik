'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type { WCCategory } from '@/lib/types'
import { categoryHref, whatsappGeneralLink } from '@/lib/utils'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

interface HeaderProps {
  locale: string
  rootCategories: WCCategory[]
  subCategories: Map<number, WCCategory[]>
}

export default function Header({ locale, rootCategories, subCategories }: HeaderProps) {
  const t   = useTranslations('nav')
  const tc  = useTranslations('cta')
  const [menuOpen, setMenuOpen]       = useState(false)
  const [searchOpen, setSearchOpen]   = useState(false)
  const [megaOpen, setMegaOpen]       = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const router    = useRouter()

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!searchQuery.trim()) return
    router.push(`/${locale}/recherche?q=${encodeURIComponent(searchQuery.trim())}`)
    setSearchOpen(false)
    setSearchQuery('')
  }

  return (
    <>
      {/* ── Main Header ─────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-16 gap-4">

            {/* Logo */}
            <Link href={`/${locale}`} className="flex-shrink-0 flex flex-col leading-none group">
              <span className="text-lg font-black text-navy-900 tracking-tight group-hover:text-brand-red transition-colors">
                Nouvel<span className="text-brand-red">Espace</span>
              </span>
              <span className="text-2xs font-semibold tracking-[3px] text-gray-400 uppercase">
                SERIGRAPHIK
              </span>
            </Link>

            {/* Search bar — desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-4">
              <form onSubmit={handleSearch} className="w-full flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t('search')}
                  className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-l-lg focus:outline-none focus:border-brand-red transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 bg-brand-red hover:bg-red-700 text-white rounded-r-lg transition-colors"
                  aria-label="Rechercher"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Search toggle — mobile */}
              <button
                className="md:hidden btn-ghost p-2"
                onClick={() => setSearchOpen(v => !v)}
                aria-label="Recherche"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </button>

              {/* WhatsApp — desktop */}
              <a
                href={whatsappGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex btn-whatsapp text-xs px-3 py-2 gap-1.5"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
                </svg>
                WhatsApp
              </a>

              {/* Language switcher */}
              <LanguageSwitcher locale={locale} />

              {/* Cart */}
              <Link href={`/${locale}/panier`} className="btn-ghost p-2 relative" aria-label={t('cart')}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                </svg>
              </Link>

              {/* Burger — mobile */}
              <button
                className="md:hidden btn-ghost p-2"
                onClick={() => setMenuOpen(v => !v)}
                aria-label="Menu"
              >
                {menuOpen ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile search bar */}
          {searchOpen && (
            <div className="md:hidden pb-3">
              <form onSubmit={handleSearch} className="flex">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t('search')}
                  className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-l-lg focus:outline-none focus:border-brand-red"
                />
                <button
                  type="submit"
                  className="px-4 bg-brand-red text-white rounded-r-lg"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* ── Mega Nav — desktop ──────────────────────────────────────────── */}
        <nav className="hidden md:block bg-navy-900 border-t border-navy-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <ul className="flex items-center gap-0">
              {rootCategories.map(cat => {
                const subs = subCategories.get(cat.id) ?? []
                return (
                  <li
                    key={cat.id}
                    className="relative"
                    onMouseEnter={() => setMegaOpen(cat.id)}
                    onMouseLeave={() => setMegaOpen(null)}
                  >
                    <Link
                      href={categoryHref(cat.slug, locale)}
                      className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-navy-800 transition-colors border-b-2 border-transparent hover:border-brand-red"
                    >
                      {cat.name}
                      {subs.length > 0 && (
                        <svg className="w-3 h-3 mt-px opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </Link>

                    {/* Mega dropdown */}
                    {subs.length > 0 && megaOpen === cat.id && (
                      <div className="absolute top-full left-0 bg-white border border-gray-100 rounded-b-xl shadow-card-hover min-w-[220px] z-50 py-2 animate-fade-in">
                        <div className="px-3 py-1.5 mb-1 border-b border-gray-100">
                          <span className="text-2xs font-bold text-gray-400 uppercase tracking-widest">
                            {cat.name}
                          </span>
                        </div>
                        {subs.map(sub => (
                          <Link
                            key={sub.id}
                            href={categoryHref(sub.slug, locale)}
                            className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:text-navy-900 hover:bg-gray-50 transition-colors"
                          >
                            <span>{sub.name}</span>
                            {sub.count > 0 && (
                              <span className="text-2xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
                                {sub.count}
                              </span>
                            )}
                          </Link>
                        ))}
                        <div className="mt-1 pt-1 border-t border-gray-100 px-4 pb-1">
                          <Link
                            href={categoryHref(cat.slug, locale)}
                            className="text-xs font-semibold text-brand-red hover:underline"
                          >
                            Voir tous →
                          </Link>
                        </div>
                      </div>
                    )}
                  </li>
                )
              })}

              {/* Quote CTA in nav */}
              <li className="ml-auto">
                <Link
                  href={`/${locale}/contact`}
                  className="flex items-center gap-1.5 px-4 py-2 mx-2 my-1.5 text-xs font-bold text-navy-900 bg-brand-amber hover:bg-yellow-400 rounded-lg transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t('quoteRequest')}
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* ── Mobile menu drawer ───────────────────────────────────────────── */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 md:hidden overflow-y-auto animate-slide-in-right shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span className="font-black text-navy-900 text-lg">
                Nouvel<span className="text-brand-red">Espace</span>
              </span>
              <button onClick={() => setMenuOpen(false)} className="btn-ghost p-1.5">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="py-4">
              {rootCategories.map(cat => {
                const subs = subCategories.get(cat.id) ?? []
                return (
                  <div key={cat.id}>
                    <Link
                      href={categoryHref(cat.slug, locale)}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between px-5 py-3 text-sm font-semibold text-navy-900 hover:bg-gray-50 border-b border-gray-50"
                    >
                      {cat.name}
                      <span className="text-2xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">{cat.count}</span>
                    </Link>
                    {subs.map(sub => (
                      <Link
                        key={sub.id}
                        href={categoryHref(sub.slug, locale)}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center px-8 py-2 text-sm text-gray-600 hover:text-navy-900 hover:bg-gray-50"
                      >
                        <span className="mr-2 text-gray-300">›</span>
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )
              })}
            </nav>

            {/* Mobile bottom actions */}
            <div className="p-5 border-t border-gray-100 space-y-3">
              <a
                href={whatsappGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full text-sm"
              >
                💬 WhatsApp Support
              </a>
              <Link
                href={`/${locale}/contact`}
                onClick={() => setMenuOpen(false)}
                className="btn-outline w-full text-sm"
              >
                Demander un devis
              </Link>
              <div className="pt-2">
                <LanguageSwitcher locale={locale} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
