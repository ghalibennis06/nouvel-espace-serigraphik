import Link from 'next/link'

type MoroccoTrustSectionProps = {
  locale: string
}

const TRUST_POINTS = [
  {
    title: 'Stock et livraison au Maroc',
    text: 'NES rassure sur la disponibilité, la livraison et la proximité commerciale, avec une promesse claire dès l’entrée.',
  },
  {
    title: 'Accompagnement pour choisir',
    text: 'Le marché est confus pour beaucoup de clients entre sublimation, sérigraphie, DTF, UV et consommables. NES simplifie la décision avec des parcours plus clairs.',
  },
  {
    title: 'Business launch + réassort',
    text: 'Le site sert à la fois les débutants qui veulent démarrer et les ateliers qui ont besoin de se réapprovisionner vite.',
  },
] as const

const TRUST_SIGNALS = [
  'parcours débutant → atelier → réassort déjà structuré',
  'devis pro, kits, catégories et produits maintenant alignés',
  'conversion WhatsApp pensée comme un vrai canal commercial',
]

export default function MoroccoTrustSection({ locale }: MoroccoTrustSectionProps) {
  return (
    <section style={{ background: 'var(--bg)', padding: '80px 5%', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '32px', alignItems: 'start' }} className="grid lg:grid-cols-2 gap-8">
        <div>
          <span className="stag">Pourquoi NES au Maroc</span>
          <h2 style={{ fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Plus qu’un catalogue, un partenaire pour démarrer, produire et tenir votre atelier.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.75, marginTop: 14, maxWidth: 640 }}>
            NES inspire confiance, clarifie les techniques, et fait gagner du temps au client marocain qui cherche soit à lancer une activité, soit à acheter le bon matériel sans perdre des semaines.
          </p>

          <div style={{ marginTop: 18, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: '16px 18px', maxWidth: 640 }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 8 }}>Points forts du parcours NES</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {TRUST_SIGNALS.map((item) => (
                <div key={item} style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--text2)', lineHeight: 1.55 }}>
                  <span style={{ color: 'var(--green)', fontWeight: 800, flexShrink: 0 }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 22 }}>
            <Link href={`/${locale}/devis-pro`} className="btn-orange" style={{ padding: '13px 22px', fontSize: 14, fontWeight: 700 }}>
              Demander un devis pro →
            </Link>
            <Link href={`/${locale}/academie`} className="btn-outline" style={{ padding: '13px 22px', fontSize: 14, fontWeight: 700 }}>
              Voir le guide d’achat
            </Link>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 14 }}>
          {TRUST_POINTS.map((point) => (
            <div
              key={point.title}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 18,
                padding: 22,
                boxShadow: 'var(--shadow)',
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 9 }}>
                NES · Maroc
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 800, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.015em' }}>
                {point.title}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.65 }}>
                {point.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
