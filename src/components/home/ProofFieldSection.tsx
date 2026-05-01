import Link from 'next/link'

const FIELD_SIGNALS = [
  {
    label: 'Réalité terrain',
    title: 'Le client marocain veut savoir si ça tient dans la vraie vie.',
    text: 'Pas juste une liste de produits. Il veut comprendre ce qu’il faut acheter, ce qui tourne bien, et comment éviter un mauvais départ.',
  },
  {
    label: 'Décision rapide',
    title: 'NES réduit le flou entre idée, budget et première commande.',
    text: 'Le parcours sert à cadrer un lancement, équiper un atelier ou accélérer un réassort sans repartir de zéro à chaque fois.',
  },
  {
    label: 'Canal local',
    title: 'WhatsApp et devis restent au cœur de la vente, mais dans une structure plus propre.',
    text: 'Le site ne remplace pas la relation commerciale. Il la prépare mieux, plus tôt, avec plus de contexte utile.',
  },
] as const

export default function ProofFieldSection({ locale }: { locale: string }) {
  return (
    <section style={{ background: '#22120b', padding: '84px 5%', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 26, alignItems: 'stretch' }} className="grid lg:grid-cols-2 gap-6">
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 28, border: '1px solid rgba(255,255,255,0.10)', background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)', padding: 28, boxShadow: '0 28px 90px rgba(0,0,0,0.20)' }}>
          <div style={{ position: 'absolute', top: -90, right: -40, width: 240, height: 240, borderRadius: 999, background: 'radial-gradient(circle, rgba(242,99,22,0.24) 0%, rgba(242,99,22,0.08) 42%, rgba(242,99,22,0) 74%)', filter: 'blur(16px)', pointerEvents: 'none' }} />

          <span style={{ display: 'inline-flex', padding: '7px 12px', borderRadius: 999, background: 'rgba(242,99,22,0.12)', border: '1px solid rgba(242,99,22,0.24)', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffb58c', marginBottom: 18 }}>
            Pourquoi ça tient mieux
          </span>

          <h2 style={{ fontSize: 'clamp(30px,3.8vw,48px)', fontWeight: 900, color: '#fff4ed', letterSpacing: '-0.035em', lineHeight: 1.04, marginBottom: 14 }}>
            NES commence à ressembler à une vraie machine commerciale, pas à un simple habillage web.
          </h2>

          <p style={{ fontSize: 15, color: 'rgba(255,244,237,0.76)', lineHeight: 1.75, maxWidth: 620, marginBottom: 24 }}>
            On renforce une logique plus crédible pour le marché marocain, avec plus de structure métier, plus de hiérarchie, et moins de blocs modernes génériques sans poids commercial.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }} className="grid md:grid-cols-3 gap-3">
            {[
              'parcours par intention',
              'showcases plus mémorables',
              'CTA plus utiles et moins décoratifs',
            ].map((item) => (
              <div key={item} style={{ borderRadius: 18, border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.05)', padding: '14px 14px 13px', fontSize: 12, fontWeight: 700, color: '#fff4ed', lineHeight: 1.55 }}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 14 }}>
          {FIELD_SIGNALS.map((item) => (
            <div key={item.title} style={{ borderRadius: 24, border: '1px solid rgba(255,255,255,0.08)', background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)', padding: 24, boxShadow: '0 18px 48px rgba(0,0,0,0.16)' }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ff9f6a', marginBottom: 8 }}>
                {item.label}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 900, color: '#fffaf6', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: 8 }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(255,244,237,0.72)', lineHeight: 1.7 }}>
                {item.text}
              </p>
            </div>
          ))}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 2 }}>
            <Link href={`/${locale}/devis-pro`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '14px 20px', borderRadius: 14, background: '#f26316', color: '#fff', fontSize: 14, fontWeight: 800, textDecoration: 'none' }}>
              Demander un devis pro →
            </Link>
            <Link href={`/${locale}/contact`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '14px 20px', borderRadius: 14, background: 'rgba(255,255,255,0.06)', color: '#fff4ed', fontSize: 14, fontWeight: 800, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)' }}>
              Parler à NES
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
