// Professional volume pricing strip. NES sells "sur devis" — tiers are
// indicative and the CTA routes to a real quote (WhatsApp), not a fake cart.
import { whatsappGeneralLink } from '@/lib/utils'

const TIERS = [
  { disc: '-5%', qty: 'dès 5 unités' },
  { disc: '-10%', qty: 'dès 10 unités' },
  { disc: '-15%', qty: 'dès 20 unités' },
  { disc: '-20%', qty: 'dès 50 unités' },
]

export default function BulkPricingBar({ categoryName }: { categoryName: string }) {
  const wa = whatsappGeneralLink(
    `Bonjour NES, je souhaite un devis tarifs dégressifs (volume) sur la catégorie « ${categoryName} ». Pouvez-vous me communiquer vos paliers ?`,
  )
  return (
    <div
      style={{
        background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12,
        padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 18, flexWrap: 'wrap', marginBottom: 24,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        <span style={{ fontSize: 26, flexShrink: 0 }}>💰</span>
        <div style={{ minWidth: 0 }}>
          <h4 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 2 }}>
            Tarifs dégressifs professionnels
          </h4>
          <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>
            Plus vous commandez, plus vous économisez — devis volume sous 24h.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {TIERS.map(t => (
          <div
            key={t.disc}
            style={{
              textAlign: 'center', padding: '8px 14px', background: 'var(--orangesoft)',
              border: '1px solid var(--orange)', borderRadius: 8, minWidth: 88,
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--orange)', lineHeight: 1 }}>{t.disc}</div>
            <div style={{ fontSize: 10, color: 'var(--text2)', marginTop: 3 }}>{t.qty}</div>
          </div>
        ))}
      </div>

      <a
        href={wa}
        target="_blank" rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 18px',
          background: 'var(--green)', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 700,
          textDecoration: 'none', whiteSpace: 'nowrap',
        }}
      >
        💬 Devis volume
      </a>
    </div>
  )
}
