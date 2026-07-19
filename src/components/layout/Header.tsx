'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { WCCategory } from '@/lib/types'
import { whatsappGeneralLink } from '@/lib/utils'
import { useTheme } from '@/components/ThemeProvider'

interface HeaderProps {
  locale: string
  rootCategories: WCCategory[]
  subCategories: Map<number, WCCategory[]>
}

const WA_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
  </svg>
)

export default function Header({ locale }: HeaderProps) {
  const [menuOpen, setMenuOpen]     = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const pathname  = usePathname()
  const router    = useRouter()
  const { theme, toggle } = useTheme()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (!q) return
    router.push(`/${locale}/categorie-produit?search=${encodeURIComponent(q)}`)
    setSearchOpen(false)
    setSearchQuery('')
  }

  const inCovering = pathname.startsWith(`/${locale}/covering`)

  const navLinks = inCovering
    ? [
        { label: 'Coloris',      href: `/${locale}/covering#coloris` },
        { label: 'Réalisations', href: `/${locale}/covering#realisations` },
        { label: 'FAQ',          href: `/${locale}/covering#faq` },
        { label: 'Contact',      href: `/${locale}/contact` },
        { label: 'Impression',   href: `/${locale}` },
      ]
    : [
        { label: 'Kits',       href: `/${locale}/kits` },
        { label: 'Catalogue',  href: `/${locale}/categorie-produit` },
        { label: 'Covering',   href: `/${locale}/covering` },
        { label: 'Académie',   href: `/${locale}/academie` },
        { label: 'Devis Pro',  href: `/${locale}/devis-pro` },
        { label: 'Contact',    href: `/${locale}/contact` },
      ]

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      {searchOpen && (
        <>
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.40)', zIndex: 300, backdropFilter: 'blur(4px)' }} onClick={() => setSearchOpen(false)} />
          <div style={{ position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 580, padding: '0 16px', zIndex: 301 }}>
            <form onSubmit={handleSearch}>
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--card)', border: '2px solid var(--orange)', borderRadius: 12, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
                <span style={{ padding: '0 14px', color: 'var(--orange)' }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/></svg>
                </span>
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Rechercher une presse, encre, kit…"
                  onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', padding: '15px 0', fontSize: 15, color: 'var(--text)', fontFamily: 'Inter,sans-serif' }}
                  autoFocus
                />
                <button type="submit" style={{ padding: '12px 20px', background: 'var(--orange)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
                  Chercher
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      <header style={{
        position: 'sticky', top: 0, zIndex: 200,
        background: 'var(--overlay)',
        backdropFilter: 'saturate(180%) blur(14px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          height: 68,
        }}>
          <Link href={`/${locale}`} aria-label="NES — accueil" style={{ display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none', flexShrink: 0 }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 22, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.05em' }}>NES</span>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--orange)', display: 'inline-block', marginTop: 8 }} />
            {inCovering && (
              <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', border: '1px solid var(--orange)', padding: '3px 7px', borderRadius: 4 }}>
                Covering
              </span>
            )}
          </Link>

          <nav className="hidden lg:flex" aria-label="Navigation principale" style={{ alignItems: 'center', gap: 4 }}>
            {navLinks.map(link => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: active ? 700 : 500,
                    color: active ? 'var(--text)' : 'var(--text2)',
                    background: active ? 'var(--surface)' : 'transparent',
                    textDecoration: 'none',
                    transition: 'color .15s, background .15s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text)' }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--text2)' }}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <button
              onClick={() => { setSearchOpen(v => !v); setTimeout(() => searchRef.current?.focus(), 80) }}
              aria-label="Rechercher"
              className="hidden md:flex"
              style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/></svg>
            </button>

            <button
              onClick={toggle}
              aria-label="Changer de thème"
              className="hidden md:flex"
              style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              {theme === 'dark'
                ? <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="5"/><path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                : <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              }
            </button>

            <a
              href={whatsappGeneralLink(inCovering ? '[Covering] Bonjour NES, je souhaite un devis covering pour mon véhicule.' : 'Bonjour NES, je souhaite des informations.')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '9px 16px',
                borderRadius: 10,
                background: '#16A34A',
                color: '#fff',
                fontSize: 13, fontWeight: 700,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {WA_ICON}
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
              style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer', width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {menuOpen
                ? <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                : <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
              }
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <>
          <div className="fixed inset-0 lg:hidden" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 40 }} onClick={() => setMenuOpen(false)} />
          <aside
            className="fixed top-0 right-0 bottom-0 lg:hidden animate-slide-in-right"
            style={{ width: 320, maxWidth: '88vw', background: 'var(--card)', zIndex: 50, overflowY: 'auto', borderLeft: '1px solid var(--border)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 22px', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 20, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.05em' }}>
                NES<span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: 'var(--orange)', marginLeft: 3, verticalAlign: 'middle', marginBottom: 2 }} />
              </span>
              <button onClick={() => setMenuOpen(false)} aria-label="Fermer" style={{ background: 'none', border: 'none', color: 'var(--text2)', cursor: 'pointer', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <nav style={{ padding: '8px 0' }} aria-label="Navigation mobile">
              {navLinks.map(link => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'block',
                      padding: '15px 22px',
                      fontSize: 16,
                      fontWeight: active ? 700 : 500,
                      color: active ? 'var(--orange)' : 'var(--text)',
                      textDecoration: 'none',
                      borderBottom: '1px solid var(--border)',
                      background: active ? 'var(--orangesoft)' : 'transparent',
                    }}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>
            <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a
                href={whatsappGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '13px 0', borderRadius: 10, background: '#16A34A', color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}
              >
                {WA_ICON} Commander via WhatsApp
              </a>
              <button
                onClick={toggle}
                aria-label="Changer de thème"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '11px 0', borderRadius: 10, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
              >
                {theme === 'dark' ? '☀️ Mode clair' : '🌙 Mode sombre'}
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  )
}
