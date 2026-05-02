import Link from 'next/link'
import type { ReactNode } from 'react'
import { BeamsCanvas } from '@/components/ui/beams-background'

const NAV = [
  { href: '/admin', label: '📊 Dashboard' },
  { href: '/admin/leads', label: '📩 Pipeline leads' },
  { href: '/admin/reporting', label: '📈 Reporting' },
  { href: '/admin/produits', label: '📦 Produits' },
  { href: '/admin/merchandising', label: '🧭 Merchandising' },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Outfit, sans-serif', position: 'relative' }}>
      {/* Animated beams fixed behind everything */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <BeamsCanvas intensity="subtle" />
      </div>

      {/* Sidebar */}
      <nav style={{
        width: 220,
        background: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        padding: '28px 0',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
        zIndex: 10,
      }}>
        <div style={{ padding: '0 22px 24px', fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 18, fontWeight: 700, color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>
          NES <span style={{ color: 'var(--blue)' }}>Admin</span>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 500, color: 'var(--text2)', marginTop: 6 }}>
            Contrôle commercial · leads · merchandising
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{ display: 'block', padding: '10px 22px', fontSize: 13, fontWeight: 500, color: 'var(--text2)', textDecoration: 'none' }}
              className="admin-nav-link"
            >
              {label}
            </Link>
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 20, left: 22, right: 22 }}>
          <Link href="/fr" style={{ fontSize: 12, color: 'var(--text2)', textDecoration: 'none' }}>
            ← Retour au site
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <main style={{ flex: 1, background: 'var(--bg)', padding: '36px 40px', overflowY: 'auto', position: 'relative', zIndex: 10 }}>
        {children}
      </main>
    </div>
  )
}
