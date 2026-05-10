const ITEMS = [
  { icon: '🚚', text: 'Livraison 24–48h' },
  { icon: '✓',  text: 'Garantie 1 an' },
  { icon: '💬', text: 'WhatsApp 7j/7' },
]

export default function AnnouncementBar() {
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
      {ITEMS.map((it, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, opacity: 0.92 }}>
          <span aria-hidden style={{ color: 'var(--orange)' }}>{it.icon}</span>
          <span>{it.text}</span>
        </span>
      ))}
    </div>
  )
}
