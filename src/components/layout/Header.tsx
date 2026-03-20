'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { WCCategory } from '@/lib/types'
import { categoryHref, whatsappGeneralLink } from '@/lib/utils'
import { useTheme } from '@/components/ThemeProvider'

interface HeaderProps {
  locale: string
  rootCategories: WCCategory[]
  subCategories: Map<number, WCCategory[]>
}

const WA_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
  </svg>
)

function SunIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="5" />
      <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" />
      <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
    </svg>
  )
}

export default function Header({ locale, rootCategories, subCategories }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const { theme, toggle } = useTheme()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (!q) return
    router.push(`/${locale}/categorie-produit?search=${encodeURIComponent(q)}`)
    setSearchOpen(false)
    setSearchQuery('')
  }

  const navLinks = [
    { label: 'Kits & Packs',  href: `/${locale}/kits`,             highlight: true },
    { label: 'Catalogue',     href: `/${locale}/categorie-produit`, highlight: false },
    { label: 'Académie',      href: `/${locale}/academie`,          highlight: false },
    { label: 'Devis Pro',     href: `/${locale}/devis-pro`,         highlight: false },
    { label: 'Avis',          href: `#testimonials`,                highlight: false },
  ]

  return (
    <>
      {/* ── Search overlay ───────────────────────────────────────── */}
      {searchOpen && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 300, backdropFilter: 'blur(6px)' }}
            onClick={() => setSearchOpen(false)}
          />
          <div style={{ position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 600, padding: '0 16px', zIndex: 301 }}>
            <form onSubmit={handleSearch}>
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--surface)', border: '1px solid var(--blue)', borderRadius: 12, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                <span style={{ padding: '0 14px', color: 'var(--blue)' }}><SearchIcon /></span>
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un produit, une technique..."
                  onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', padding: '16px 0', fontSize: 15, color: 'var(--text)', fontFamily: 'Outfit,sans-serif' }}
                />
                <button type="submit" style={{ padding: '12px 20px', background: 'var(--blue)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'Outfit,sans-serif' }}>
                  Rechercher
                </button>
              </div>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 10, textAlign: 'center' }}>
                Appuyez sur Entrée ou cliquez pour rechercher · Échap pour fermer
              </p>
            </form>
          </div>
        </>
      )}

      {/* ── Main nav ─────────────────────────────────────────────── */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 200,
          background: 'var(--overlay)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          padding: '0 6%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 66,
        }}
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          style={{
            fontFamily: '"Cormorant Garamond",Georgia,serif',
            fontSize: 24,
            fontWeight: 700,
            color: 'var(--text)',
            textDecoration: 'none',
            letterSpacing: '0.02em',
            flexShrink: 0,
          }}
        >
          NES<span style={{ color: 'var(--blue)' }}>.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ gap: 2 }}>
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                padding: '8px 15px',
                fontSize: 13,
                color: link.highlight ? 'var(--orange)' : 'var(--text2)',
                textDecoration: 'none',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: link.highlight ? 600 : 400,
                transition: 'color .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = link.highlight ? 'var(--orange)' : 'var(--text2)')}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: search + theme toggle + WhatsApp CTA + burger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

          {/* Search button */}
          <button
            onClick={() => { setSearchOpen(v => !v); setTimeout(() => searchRef.current?.focus(), 80) }}
            aria-label="Rechercher"
            style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--border2)', background: 'var(--card)', color: 'var(--text2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'border-color .2s, color .2s', flexShrink: 0 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--blue)'; (e.currentTarget as HTMLElement).style.color = 'var(--blue)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border2)'; (e.currentTarget as HTMLElement).style.color = 'var(--text2)' }}
          >
            <SearchIcon />
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Changer de thème"
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '1px solid var(--border2)',
              background: 'var(--card)',
              color: 'var(--text2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'border-color .2s, color .2s',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--blue)'
              ;(e.currentTarget as HTMLElement).style.color = 'var(--blue)'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border2)'
              ;(e.currentTarget as HTMLElement).style.color = 'var(--text2)'
            }}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <a
            href={whatsappGeneralLink('Bonjour NES, je souhaite des informations sur vos produits.')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex"
            style={{
              alignItems: 'center',
              gap: 8,
              background: 'var(--green)',
              color: '#fff',
              padding: '9px 20px',
              borderRadius: 24,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'none',
              fontFamily: 'Outfit, sans-serif',
              transition: 'transform .15s, box-shadow .15s',
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(34,197,94,.3)'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.transform = 'none'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff', animation: 'pulseDot 1.5s ease-in-out infinite', flexShrink: 0 }} />
            WhatsApp
          </a>

          {/* Burger mobile */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(v => !v)}
            style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', padding: 4 }}
          >
            {menuOpen ? (
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ─────────────────────────────────────────── */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 md:hidden"
            style={{ background: 'rgba(0,0,0,0.6)', zIndex: 40, backdropFilter: 'blur(4px)' }}
            onClick={() => setMenuOpen(false)}
          />
          <div
            className="fixed top-0 left-0 bottom-0 md:hidden animate-slide-in-right"
            style={{
              width: 300,
              maxWidth: '90vw',
              background: 'var(--surface)',
              zIndex: 50,
              overflowY: 'auto',
              borderRight: '1px solid var(--border)',
            }}
          >
            {/* Drawer header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>
                NES<span style={{ color: 'var(--blue)' }}>.</span>
              </span>
              <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text2)', cursor: 'pointer' }}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav style={{ padding: '8px 0' }}>
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '14px 20px',
                    fontSize: 14,
                    fontWeight: link.highlight ? 600 : 400,
                    color: link.highlight ? 'var(--orange)' : 'var(--text)',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  {link.label}
                </Link>
              ))}

              {rootCategories.map(cat => (
                <Link
                  key={cat.id}
                  href={categoryHref(cat.slug, locale)}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 20px',
                    fontSize: 13,
                    color: 'var(--text2)',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <span>{cat.name}</span>
                  <span style={{ fontSize: 10, color: 'var(--blue)', background: 'var(--bluesoft)', padding: '2px 6px', borderRadius: 3 }}>
                    {cat.count}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div style={{ padding: 20, borderTop: '1px solid var(--border)' }}>
              <a
                href={whatsappGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa-dark"
                style={{ width: '100%', padding: '13px 0', fontSize: 14 }}
              >
                {WA_ICON}
                WhatsApp Support
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}
