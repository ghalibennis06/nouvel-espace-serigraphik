import Link from 'next/link'
import Image from 'next/image'
import { GLOSS_COLORS } from '@/lib/data/carlas-gloss'

const COVERING_PREVIEW = GLOSS_COLORS.filter((c) => c.img).slice(0, 4)

export default function DualActivitySection({ locale }: { locale: string }) {
  return (
    <section style={{ background: '#0b1016', padding: 'clamp(44px,7vw,72px) 5%', borderBottom: '1px solid rgba(255,181,154,0.1)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 10, color: '#ff9f6a', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>Nos deux métiers</div>
          <h2 style={{ fontSize: 'clamp(24px,3.2vw,40px)', fontWeight: 700, color: '#f6efe8', letterSpacing: '-0.03em', lineHeight: 1.08, maxWidth: 720 }}>
            Un atelier, deux savoir-faire : l&apos;impression et le covering auto.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* MÉTIER 01 — Impression & Sérigraphie */}
          <Link href={`/${locale}/categorie-produit`} style={{ textDecoration: 'none', border: '1px solid rgba(171,137,125,0.18)', background: 'rgba(255,255,255,0.03)', padding: 'clamp(20px,3vw,28px)', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 10, color: '#ff9f6a', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Métier 01 // Depuis 2018</span>
              <span style={{ fontSize: 22 }}>🖨️</span>
            </div>
            <div>
              <div style={{ fontSize: 'clamp(20px,2.4vw,28px)', fontWeight: 800, color: '#f6efe8', letterSpacing: '-0.02em', marginBottom: 8 }}>Impression &amp; Sérigraphie</div>
              <p style={{ fontSize: 14, color: 'rgba(221,227,235,0.72)', lineHeight: 1.7, maxWidth: 480 }}>
                Machines, kits complets et consommables : sérigraphie, sublimation, DTF, presses à chaud.
                Plus de 2 000 ateliers équipés partout au Maroc.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto' }}>
              {['Machines', 'Kits', 'Consommables', 'Formation'].map((tag) => (
                <span key={tag} style={{ fontSize: 11, fontWeight: 700, color: 'rgba(221,227,235,0.72)', border: '1px solid rgba(171,137,125,0.2)', padding: '5px 10px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{tag}</span>
              ))}
            </div>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#ffb59a', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Voir le catalogue →</span>
          </Link>

          {/* MÉTIER 02 — Covering Auto */}
          <Link href={`/${locale}/covering`} style={{ textDecoration: 'none', border: '1px solid rgba(255,92,0,0.34)', background: 'linear-gradient(180deg, rgba(255,92,0,0.10) 0%, rgba(255,255,255,0.03) 100%)', padding: 'clamp(20px,3vw,28px)', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 10, color: '#ff9f6a', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Métier 02 // Nouveau</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', background: '#ff5c00', color: '#521800', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Nouveau</span>
            </div>
            <div>
              <div style={{ fontSize: 'clamp(20px,2.4vw,28px)', fontWeight: 800, color: '#f6efe8', letterSpacing: '-0.02em', marginBottom: 8 }}>Covering Automobile</div>
              <p style={{ fontSize: 14, color: 'rgba(221,227,235,0.72)', lineHeight: 1.7, maxWidth: 480 }}>
                Films Carlas Essential Series Gloss — {GLOSS_COLORS.length}+ coloris brillants posés en atelier.
                Satin, chrome et PPF arrivent ensuite.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
              {COVERING_PREVIEW.map((color) => (
                <div key={color.name} style={{ position: 'relative', width: 52, height: 52, border: '1px solid rgba(255,181,154,0.2)', overflow: 'hidden', flexShrink: 0 }}>
                  <Image src={color.img as string} alt={color.name} fill sizes="52px" style={{ objectFit: 'cover' }} />
                </div>
              ))}
              <span style={{ alignSelf: 'center', fontSize: 12, color: 'rgba(221,227,235,0.6)', fontWeight: 700, marginLeft: 4 }}>+{GLOSS_COLORS.length - COVERING_PREVIEW.length} coloris</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#ffb59a', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Découvrir le covering →</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
