'use client'
import { usePathname } from 'next/navigation'

const ITEMS = [
  { icon: '🚚', text: 'Livraison 24–48h' },
  { icon: '✓',  text: 'Garantie 1 an' },
  { icon: '💬', text: 'WhatsApp 7j/7' },
]

const COVERING_ITEMS = [
  { icon: '🚗', text: 'Covering films Carlas' },
  { icon: '✓',  text: 'Pose en atelier' },
  { icon: '💬', text: 'Devis WhatsApp rapide' },
]

export default function AnnouncementBar() {
  const pathname = usePathname()
  const inCovering = pathname.includes('/covering')
  const items = inCovering ? COVERING_ITEMS : ITEMS

  return (
    <div
      role="region"
      aria-label="Annonces"
      style={{
        background: '#0F1622',
        color: '#fff',
        padding: '7px 5%',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.02em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 28,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {items.map((it, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, opacity: 0.92 }}>
          <span aria-hidden style={{ color: 'var(--orange)' }}>{it.icon}</span>
          <span>{it.text}</span>
        </span>
      ))}
    </div>
  )
}
