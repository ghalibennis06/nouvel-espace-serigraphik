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
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
  </svg>
)

export default function Header({ locale, rootCategories, subCategories }: HeaderProps) {
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

  const navLinks = [
    { label: 'Kits pour démarrer', href: `/${locale}/kits`, hint: 'Premier achat' },
    { label: 'Machines & catalogue', href: `/${locale}/categorie-produit`, hint: 'Atelier et matériel' },
    { label: 'Guide d’achat', href: `/${locale}/academie`, hint: 'Apprendre avant achat' },
    { label: 'Devis Pro', href: `/${locale}/devis-pro`, hint: 'Commandes volume' },
    { label: 'Contact', href: `/${locale}/contact`, hint: 'Parler à NES' },
  ]

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      {/* ── Search overlay ─────────────────────────────────────────────── */}
      {searchOpen && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.40)', zIndex: 300, backdropFilter: 'blur(4px)' }}
            onClick={() => setSearchOpen(false)}
          />
          <div style={{ position: 'fixed', top: 72, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 580, padding: '0 16px', zIndex: 301 }}>
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
                  placeholder="Rechercher une presse, une encre, un kit..."
                  onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', padding: '15px 0', fontSize: 15, color: 'var(--text)', fontFamily: 'Inter,sans-serif' }}
                  autoFocus
                />
                <button type="submit" style={{ padding: '12px 20px', background: 'var(--orange)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'Inter,sans-serif' }}>
                  Chercher
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* ── Main nav ───────────────────────────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 200,
        background: 'var(--overlay)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 5%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
      }}>

        {/* Logo */}
        <Link href={`/${locale}`} style={{ display: 'flex', alignItems: 'center', gap: 3, textDecoration: 'none', flexShrink: 0 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 22, fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.04em' }}>NES</span>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--orange)', display: 'inline-block', marginBottom: 2 }} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex" style={{ gap: 0, alignItems: 'center' }}>
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                padding: '0 14px',
                height: 64,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                fontSize: 13,
                fontWeight: 500,
                color: isActive(link.href) ? 'var(--orange)' : 'var(--text2)',
                textDecoration: 'none',
                borderBottom: isActive(link.href) ? '2px solid var(--orange)' : '2px solid transparent',
                transition: 'color .15s',
                lineHeight: 1.15,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = isActive(link.href) ? 'var(--orange)' : 'var(--text2)')}
            >
              <span>{link.label}</span>
              <span style={{ fontSize: 10, color: isActive(link.href) ? 'var(--orange)' : 'var(--text3)', marginTop: 3 }}>{link.hint}</span>
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

          {/* Search */}
          <button
            onClick={() => { setSearchOpen(v => !v); setTimeout(() => searchRef.current?.focus(), 80) }}
            aria-label="Rechercher"
            style={{ width: 44, height: 44, borderRadius: 10, border: '1px solid var(--border2)', background: 'transparent', color: 'var(--text2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/></svg>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Changer de thème"
            style={{ width: 44, height: 44, borderRadius: 10, border: '1px solid var(--border2)', background: 'transparent', color: 'var(--text2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            {theme === 'dark'
              ? <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="5"/><path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              : <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            }
          </button>

          {/* Admin — desktop, discreet */}
          <Link
            href="/admin"
            className="hidden md:flex"
            style={{ alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text3)', border: '1px solid var(--border)', background: 'transparent', textDecoration: 'none' }}
          >
            ⚙ Admin
          </Link>

          {/* WhatsApp CTA */}
          <a
            href={whatsappGeneralLink('Bonjour NES, je souhaite des informations sur vos produits.')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex btn-wa-dark"
            style={{ padding: '8px 18px', fontSize: 13, gap: 7 }}
          >
            {WA_ICON}
            WhatsApp
          </a>

          {/* Burger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(v => !v)}
            style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', padding: 10, margin: -4 }}
          >
            {menuOpen
              ? <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              : <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            }
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ──────────────────────────────────────────────── */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 md:hidden"
            style={{ background: 'rgba(0,0,0,0.5)', zIndex: 40 }}
            onClick={() => setMenuOpen(false)}
          />
          <div
            className="fixed top-0 left-0 bottom-0 md:hidden animate-slide-in-right"
            style={{ width: 290, maxWidth: '85vw', background: 'var(--card)', zIndex: 50, overflowY: 'auto', borderRight: '1px solid var(--border)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 20, fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.04em' }}>
                NES<span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--orange)', marginLeft: 2, verticalAlign: 'middle', marginBottom: 2 }} />
              </span>
              <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text2)', cursor: 'pointer' }}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <nav style={{ padding: '6px 0' }}>
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ display: 'block', padding: '13px 20px', fontSize: 14, fontWeight: 500, color: isActive(link.href) ? 'var(--orange)' : 'var(--text)', textDecoration: 'none', borderBottom: '1px solid var(--border)' }}
                >
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{link.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>{link.hint}</div>
                </Link>
              ))}
            </nav>
            <div style={{ padding: 16, borderTop: '1px solid var(--border)' }}>
              <a
                href={whatsappGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa-dark"
                style={{ width: '100%', padding: '13px 0', fontSize: 14, justifyContent: 'center', borderRadius: 8 }}
              >
                {WA_ICON} Commander via WhatsApp
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}
