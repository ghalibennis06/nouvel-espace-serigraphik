import Link from 'next/link'

type MoroccoTrustSectionProps = {
  locale: string
}

const TRUST_POINTS = [
  {
    title: 'Stock disponible, livraison rapide',
    text: 'Toutes nos machines et consommables sont disponibles au Maroc. Vous recevez votre commande en 24 à 48h — sans attendre une importation ou un délai inconnu.',
  },
  {
    title: 'On vous aide à choisir la bonne technique',
    text: 'Sérigraphie, sublimation, DTF, UV — le choix peut paraître complexe. NES clarifie selon votre budget, votre capacité et ce que vous voulez vendre.',
  },
  {
    title: 'Un partenaire du démarrage au réassort',
    text: "Que vous lanciez votre premier atelier ou que vous réapprovisionnez un stock qui tourne, NES s'adapte à votre étape — et reste joignable sur WhatsApp.",
  },
] as const

const TRUST_SIGNALS = [
  "Kits prêts à l'emploi pour démarrer sans prise de tête",
  'Machines pro pour les ateliers qui produisent sérieusement',
  'Réassort rapide pour ne jamais bloquer votre production',
]

export default function MoroccoTrustSection({ locale }: MoroccoTrustSectionProps) {
  return (
    <section style={{ background: 'var(--surface)', padding: 'clamp(44px,7vw,80px) 5%', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', alignItems: 'start' }} className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
        <div className="order-2 lg:order-1">
          <span className="stag">Pourquoi NES au Maroc</span>
          <h2 style={{ fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Plus qu'un catalogue, un partenaire pour démarrer, produire et tenir votre atelier.
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
              Voir le guide d'achat
            </Link>
          </div>
        </div>

        <div className="order-1 lg:order-2" style={{ display: 'grid', gap: 14 }}>
          {TRUST_POINTS.map((point, idx) => (
            <div
              key={point.title}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderLeft: '3px solid var(--orange)',
                borderRadius: 18,
                padding: 22,
                boxShadow: 'var(--shadow)',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
              className="card-hover"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: '50%', background: 'var(--orangesoft)', fontSize: 10, fontWeight: 900, color: 'var(--orange)', flexShrink: 0 }}>
                  {idx + 1}
                </span>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)' }}>
                  NES · Maroc
                </div>
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 800, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.02em' }}>
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
