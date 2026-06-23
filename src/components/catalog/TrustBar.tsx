// Static trust strip — reflects NES's real positioning (importateur officiel,
// stock local Casablanca, livraison 48h, support WhatsApp, retours, facture pro).
// No fabricated ratings/scarcity — business claims only.

const ITEMS: { icon: string; title: string; sub: string }[] = [
  { icon: '🏭', title: 'Importateur Officiel', sub: 'Antex · Inknovator · Freesub' },
  { icon: '🚚', title: 'Livraison 48h', sub: 'Casablanca & Maroc entier' },
  { icon: '📦', title: 'Stock disponible', sub: 'Entrepôt local Casablanca' },
  { icon: '💬', title: 'Support WhatsApp', sub: 'Conseil technique offert' },
  { icon: '🔄', title: 'Retours 14 jours', sub: 'Produits non ouverts' },
  { icon: '🧾', title: 'Facture professionnelle', sub: 'TVA incluse' },
]

export default function TrustBar() {
  return (
    <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
      <div
        style={{
          maxWidth: 1280, margin: '0 auto', padding: '14px 6%',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14,
        }}
      >
        {ITEMS.map(i => (
          <div key={i.title} style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{i.icon}</span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>{i.title}</div>
              <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.3 }}>{i.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
