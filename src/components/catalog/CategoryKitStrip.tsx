// Surfaces real starter kits (single source: lib/data/kits.ts) on category pages.
// Drives cross-sell to /kits and quote via WhatsApp — no fake cart.
import Link from 'next/link'
import { KITS } from '@/lib/data/kits'
import { whatsappGeneralLink } from '@/lib/utils'

export default function CategoryKitStrip({ locale }: { locale: string }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.01em' }}>
            🧰 Kits Démarrage
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text2)', marginTop: 2 }}>
            Packs complets prêts à produire — économisez vs achat à l&apos;unité.
          </p>
        </div>
        <Link href={`/${locale}/kits`} className="link-blue" style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Voir tous les kits →
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
        {KITS.map(kit => (
          <div
            key={kit.id}
            style={{
              background: 'var(--card)', border: `1px solid ${kit.popular ? 'var(--teal)' : 'var(--border)'}`,
              borderRadius: 12, padding: 18, display: 'flex', flexDirection: 'column', gap: 10, position: 'relative',
            }}
          >
            {kit.badge && (
              <span style={{ position: 'absolute', top: 12, right: 12, fontSize: 9.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: kit.popular ? 'var(--teal)' : 'var(--orange)', background: kit.accentSoft, padding: '3px 8px', borderRadius: 20 }}>
                {kit.badge}
              </span>
            )}
            <div style={{ fontSize: 28, lineHeight: 1 }}>{kit.icon}</div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text2)' }}>{kit.packNum}</div>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', lineHeight: 1.25 }}>{kit.name}</h3>
              <p style={{ fontSize: 12, color: 'var(--text2)', marginTop: 3, lineHeight: 1.45 }}>{kit.subtitle}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 'auto' }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)' }}>{kit.priceDisplay} MAD</span>
              {kit.oldPrice && (
                <span style={{ fontSize: 13, color: 'var(--text3)', textDecoration: 'line-through' }}>{kit.oldPrice}</span>
              )}
            </div>
            <a
              href={whatsappGeneralLink(kit.ctaMsg)}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px', background: 'var(--green)', color: '#fff', borderRadius: 8, fontSize: 12.5, fontWeight: 700, textDecoration: 'none' }}
            >
              💬 Commander ce kit
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
