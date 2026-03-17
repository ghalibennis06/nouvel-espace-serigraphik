'use client'

const ITEMS = [
  '🚚 Livraison 24–48h partout au Maroc',
  '💬 Support WhatsApp 7j/7',
  '✓ Garantie 1 an sur toutes nos machines',
  '🎁 Packs dès 4 400 MAD — Économisez jusqu\'à 2 100 MAD',
]

export default function AnnouncementBar() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div
      className="overflow-hidden"
      style={{ background: 'var(--blue)', color: '#fff', padding: '9px 0' }}
      role="marquee"
      aria-label="Annonces"
    >
      <div className="animate-ticker" aria-hidden="true">
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              padding: '0 48px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
