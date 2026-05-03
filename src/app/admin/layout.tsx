'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { BeamsCanvas } from '@/components/ui/beams-background'

const NAV = [
  { href: '/admin', label: '📊 Dashboard' },
  { href: '/admin/leads', label: '📩 Pipeline leads' },
  { href: '/admin/reporting', label: '📈 Reporting' },
  { href: '/admin/produits', label: '📦 Produits' },
  { href: '/admin/merchandising', label: '🧭 Merchandising' },
  { href: '/admin/guide', label: '📖 Guide du site' },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="admin-panel" style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Outfit, sans-serif', position: 'relative' }}>
      {/* Animated beams fixed behind everything */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <BeamsCanvas intensity="subtle" />
      </div>

      {/* Sidebar */}
      <nav style={{
        width: 228,
        background: 'rgba(17,17,24,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRight: '1px solid var(--border)',
        padding: '28px 0',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
        zIndex: 10,
      }}>
        {/* Logo */}
        <div style={{ padding: '0 22px 24px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 20, fontWeight: 700, color: 'var(--text)', lineHeight: 1.1 }}>
            NES <span style={{ color: 'var(--blue)' }}>Admin</span>
          </div>
          <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--text2)', marginTop: 5, letterSpacing: '0.04em' }}>
            Contrôle commercial
          </div>
        </div>

        {/* Nav */}
        <div style={{ marginTop: 12, padding: '0 8px' }}>
          {NAV.map(({ href, label }) => {
            const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                style={{ display: 'block', padding: '10px 14px', fontSize: 13, fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--blue)' : 'var(--text2)', textDecoration: 'none' }}
                className={isActive ? 'admin-nav-link admin-nav-link-active' : 'admin-nav-link'}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Footer */}
        <div style={{ position: 'absolute', bottom: 20, left: 18, right: 18, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
          <Link href="/fr" style={{ fontSize: 12, color: 'var(--text2)', textDecoration: 'none', display: 'block', marginBottom: 8 }}>
            ← Retour au site
          </Link>
          <button
            onClick={async () => {
              await fetch('/api/admin/auth', { method: 'DELETE' })
              window.location.href = '/admin/login'
            }}
            style={{ background: 'none', border: 'none', fontSize: 12, color: 'var(--text3)', cursor: 'pointer', padding: 0, display: 'block' }}
          >
            Déconnexion
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main style={{ flex: 1, background: 'transparent', padding: '36px 40px', overflowY: 'auto', position: 'relative', zIndex: 10 }}>
        {children}
      </main>
    </div>
  )
}
