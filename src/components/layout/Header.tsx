'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import type { WCCategory } from '@/lib/types'
import { categoryHref, whatsappGeneralLink } from '@/lib/utils'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

interface HeaderProps {
  locale: string
  rootCategories: WCCategory[]
  subCategories: Map<number, WCCategory[]>
}

const WA_ICON = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
  </svg>
)

export default function Header({ locale, rootCategories, subCategories }: HeaderProps) {
  const [menuOpen, setMenuOpen]       = useState(false)
  const [searchOpen, setSearchOpen]   = useState(false)
  const [megaOpen, setMegaOpen]       = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const router    = useRouter()
  const pathname  = usePathname()

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
    setMegaOpen(null)
  }, [pathname])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!searchQuery.trim()) return
    router.push(`/${locale}/recherche?q=${encodeURIComponent(searchQuery.trim())}`)
    setSearchOpen(false)
    setSearchQuery('')
  }

  const phone = process.env.NEXT_PUBLIC_PHONE ?? '+212-522-44-80-90'

  return (
    <>
      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <div className="hidden lg:block bg-navy-950 border-b border-navy-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-between">
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <a href={`tel:${phone}`} className="hover:text-white transition-colors flex items-center gap-1.5">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              {phone}
            </a>
            <span className="text-navy-700">|</span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 text-brand-amber" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              Lun–Ven 9h–18h · Sam 9h–14h
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1 text-brand-green font-semibold">
              <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
              Support en ligne
            </span>
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </div>

      {/* ── Main Header ─────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-16 gap-4">

            {/* Logo */}
            <Link href={`/${locale}`} className="flex-shrink-0 flex flex-col leading-none group mr-2">
              <span className="text-lg font-black text-navy-900 tracking-tight group-hover:text-brand-red transition-colors">
                Nouvel<span className="text-brand-red">Espace</span>
              </span>
              <span className="text-2xs font-bold tracking-[3px] text-gray-400 uppercase">
                SERIGRAPHIK
              </span>
            </Link>

            {/* Search — desktop */}
            <div className="hidden md:flex flex-1 max-w-sm mx-2">
              <form onSubmit={handleSearch} className="w-full flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un produit..."
                  className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-l-xl focus:outline-none focus:border-brand-red transition-colors bg-gray-50"
                />
                <button
                  type="submit"
                  className="px-4 bg-brand-red hover:bg-red-700 text-white rounded-r-xl transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 ml-auto">

              {/* Kits CTA — desktop highlight */}
              <Link
                href={`/${locale}/kits`}
                className="hidden md:flex items-center gap-1.5 bg-brand-amber hover:bg-yellow-400 text-navy-900 font-bold text-xs px-4 py-2 rounded-xl transition-all active:scale-95"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                </svg>
                Nos Kits
              </Link>

              {/* WhatsApp */}
              <a
                href={whatsappGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex btn-whatsapp text-xs px-3 py-2 gap-1.5"
              >
                {WA_ICON}
                <span className="hidden lg:inline">WhatsApp</span>
              </a>

              {/* Search toggle — mobile */}
              <button
                className="md:hidden btn-ghost p-2"
                onClick={() => setSearchOpen(v => !v)}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </button>

              {/* Burger — mobile */}
              <button
                className="md:hidden btn-ghost p-2"
                onClick={() => setMenuOpen(v => !v)}
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

          {/* Mobile search */}
          {searchOpen && (
            <div className="md:hidden pb-3">
              <form onSubmit={handleSearch} className="flex">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un produit..."
                  className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-l-xl focus:outline-none focus:border-brand-red bg-gray-50"
                />
                <button type="submit" className="px-4 bg-brand-red text-white rounded-r-xl">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* ── Mega Nav — desktop ──────────────────────────────────────────── */}
        <nav className="hidden md:block bg-navy-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <ul className="flex items-center">

              {/* Kits — highlight item */}
              <li>
                <Link
                  href={`/${locale}/kits`}
                  className="flex items-center gap-1.5 px-4 py-3 text-xs font-black text-brand-amber hover:text-white border-b-2 border-brand-amber transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                  </svg>
                  Kits Démarrage
                </Link>
              </li>

              {/* All Categories */}
              {rootCategories.map(cat => {
                const subs = subCategories.get(cat.id) ?? []
                const isOpen = megaOpen === cat.slug
                return (
                  <li
                    key={cat.id}
                    className="relative"
                    onMouseEnter={() => setMegaOpen(cat.slug)}
                    onMouseLeave={() => setMegaOpen(null)}
                  >
                    <Link
                      href={categoryHref(cat.slug, locale)}
                      className={`flex items-center gap-1 px-4 py-3 text-xs font-medium transition-colors border-b-2 ${
                        isOpen ? 'text-white border-brand-red bg-navy-800' : 'text-gray-300 hover:text-white border-transparent hover:border-white/20'
                      }`}
                    >
                      {cat.name}
                      {subs.length > 0 && (
                        <svg className={`w-3 h-3 opacity-60 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </Link>

                    {/* Dropdown */}
                    {subs.length > 0 && isOpen && (
                      <div className="absolute top-full left-0 bg-white border border-gray-100 rounded-b-2xl shadow-card-hover min-w-[240px] z-50 py-2 animate-fade-in">
                        <div className="px-4 py-2 mb-1 border-b border-gray-50">
                          <span className="text-2xs font-black text-gray-400 uppercase tracking-widest">{cat.name}</span>
                        </div>
                        {subs.map(sub => (
                          <Link
                            key={sub.id}
                            href={categoryHref(sub.slug, locale)}
                            className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:text-navy-900 hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-medium">{sub.name}</span>
                            <span className="text-2xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{sub.count}</span>
                          </Link>
                        ))}
                        <div className="mt-1 pt-1 border-t border-gray-100 px-4 pb-2">
                          <Link href={categoryHref(cat.slug, locale)} className="text-xs font-bold text-brand-red hover:underline">
                            Tout voir →
                          </Link>
                        </div>
                      </div>
                    )}
                  </li>
                )
              })}

              {/* Académie */}
              <li>
                <Link
                  href={`/${locale}/academie`}
                  className="flex items-center gap-1 px-4 py-3 text-xs font-medium text-gray-300 hover:text-white border-b-2 border-transparent hover:border-white/20 transition-colors"
                >
                  📖 Académie
                </Link>
              </li>

              {/* Devis CTA */}
              <li className="ml-auto">
                <Link
                  href={`/${locale}/contact`}
                  className="flex items-center gap-1.5 px-4 py-2 mx-2 my-1.5 text-xs font-bold text-white bg-brand-red hover:bg-red-700 rounded-xl transition-all active:scale-95"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Demander un Devis
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* ── Mobile drawer ───────────────────────────────────────────── */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="fixed top-0 left-0 bottom-0 w-80 max-w-[90vw] bg-white z-50 md:hidden overflow-y-auto shadow-2xl animate-slide-in-right">

            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <Link href={`/${locale}`} onClick={() => setMenuOpen(false)} className="font-black text-navy-900 text-lg">
                Nouvel<span className="text-brand-red">Espace</span>
                <span className="block text-2xs font-bold tracking-[3px] text-gray-400 uppercase">SERIGRAPHIK</span>
              </Link>
              <button onClick={() => setMenuOpen(false)} className="btn-ghost p-1.5">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Kits highlight */}
            <div className="px-5 py-3 bg-brand-amber/10 border-b border-brand-amber/20">
              <Link
                href={`/${locale}/kits`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 font-black text-navy-900 text-sm"
              >
                <svg className="w-4 h-4 text-brand-amber" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                </svg>
                Kits Démarrage →
              </Link>
            </div>

            {/* Categories */}
            <nav className="py-2">
              {rootCategories.map(cat => {
                const subs = subCategories.get(cat.id) ?? []
                return (
                  <div key={cat.id}>
                    <Link
                      href={categoryHref(cat.slug, locale)}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between px-5 py-3 text-sm font-bold text-navy-900 hover:bg-gray-50 border-b border-gray-50"
                    >
                      {cat.name}
                      <span className="text-2xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{cat.count}</span>
                    </Link>
                    {subs.map(sub => (
                      <Link
                        key={sub.id}
                        href={categoryHref(sub.slug, locale)}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center px-8 py-2.5 text-sm text-gray-600 hover:text-navy-900 hover:bg-gray-50"
                      >
                        <span className="mr-2 text-gray-300">›</span>
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )
              })}
              <Link
                href={`/${locale}/academie`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center px-5 py-3 text-sm font-bold text-navy-900 hover:bg-gray-50 border-b border-gray-50"
              >
                📖 Académie
              </Link>
            </nav>

            {/* Bottom actions */}
            <div className="p-5 space-y-3 border-t border-gray-100">
              <a href={`tel:${phone}`} className="flex items-center gap-2 text-sm text-gray-700 font-medium py-2">
                📞 {phone}
              </a>
              <a
                href={whatsappGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full py-3 text-sm"
              >
                {WA_ICON}
                WhatsApp Support
              </a>
              <Link
                href={`/${locale}/contact`}
                onClick={() => setMenuOpen(false)}
                className="btn-outline w-full text-sm py-3"
              >
                Demander un devis pro
              </Link>
              <div className="pt-1 flex justify-center">
                <LanguageSwitcher locale={locale} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
