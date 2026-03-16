'use client'
import { useState } from 'react'

interface Props {
  variant?: 'hero' | 'academie'
  waLink: string
}

export default function RoiCalculator({ variant = 'hero', waLink }: Props) {
  const [pieces, setPieces] = useState(20)
  const [price,  setPrice]  = useState(50)
  const [days,   setDays]   = useState(22)

  const revenue    = pieces * price * days
  const netRevenue = revenue - pieces * 8 * days
  const margin     = revenue > 0 ? Math.round(netRevenue / revenue * 100) : 0
  const payback    = Math.max(1, Math.ceil(5400 / (pieces * Math.max(1, price - 8))))

  const fmt = (n: number) => n.toLocaleString('fr-MA')

  const sliders = variant === 'hero'
    ? [
        { label: 'Pièces produites / jour',    value: pieces, min: 5,  max: 100, set: setPieces },
        { label: 'Prix de vente moyen (MAD)',   value: price,  min: 20, max: 200, set: setPrice  },
        { label: 'Jours travaillés / mois',     value: days,   min: 10, max: 30,  set: setDays   },
      ]
    : [
        { label: 'Pièces / jour',               value: pieces, min: 5,  max: 150, set: setPieces },
        { label: 'Prix unitaire moyen (MAD)',    value: price,  min: 15, max: 300, set: setPrice  },
        { label: 'Jours / mois',                 value: days,   min: 10, max: 30,  set: setDays   },
      ]

  if (variant === 'academie') {
    return (
      <div style={{ background: '#0C0A08', border: '1px solid rgba(200,137,31,0.2)', borderRadius: 18, padding: 28 }}>
        <h3 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 26, fontWeight: 700, color: '#F5EDD8', marginBottom: 5 }}>
          Simulateur de rentabilité
        </h3>
        <p style={{ fontSize: 13, color: '#B8AA94', marginBottom: 24 }}>
          Combien votre atelier peut-il générer chaque mois&nbsp;?
        </p>

        {sliders.map(({ label, value, min, max, set }) => (
          <div key={label} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#B8AA94', marginBottom: 7 }}>
              <span>{label}</span>
              <span style={{ fontWeight: 600, color: '#F5EDD8' }}>{value}</span>
            </div>
            <input
              type="range" min={min} max={max} value={value}
              onChange={e => set(+e.target.value)}
              style={{ width: '100%', height: 3, accentColor: '#C8891F', cursor: 'pointer' }}
            />
          </div>
        ))}

        <div style={{ background: 'rgba(200,137,31,0.07)', border: '1px solid rgba(200,137,31,0.17)', borderRadius: 11, padding: 18, textAlign: 'center', marginTop: 22 }}>
          <div style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 44, fontWeight: 700, color: '#C8891F', lineHeight: 1 }}>
            {fmt(revenue)}
          </div>
          <div style={{ fontSize: 12, color: '#B8AA94', marginTop: 3 }}>MAD de chiffre d&apos;affaires mensuel</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 13 }}>
            {[
              { v: fmt(netRevenue), l: 'CA net estimé' },
              { v: `${payback}j`,  l: 'ROI Pack N°2' },
              { v: `${margin}%`,   l: 'Marge brute' },
            ].map(({ v, l }) => (
              <div key={l} style={{ flex: 1, background: 'rgba(12,10,8,0.5)', borderRadius: 7, padding: '9px 0', textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#F5EDD8' }}>{v}</div>
                <div style={{ fontSize: 10, color: '#B8AA94', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <a
          href={waLink} target="_blank" rel="noopener noreferrer"
          className="btn-wa-dark"
          style={{ width: '100%', marginTop: 16, justifyContent: 'center' }}
        >
          💬 Lancer mon atelier maintenant
        </a>
      </div>
    )
  }

  // Hero variant
  return (
    <div style={{ background: '#1A1612', border: '1px solid rgba(200,137,31,0.22)', borderRadius: 18, padding: 28, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -80, right: -80, width: 240, height: 240, background: 'radial-gradient(circle, rgba(200,137,31,0.1), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C8891F', marginBottom: 18 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C8891F', display: 'inline-block', animation: 'pulseDot 1.8s ease-in-out infinite' }} />
          Calculateur de rentabilité
        </div>

        <div style={{ textAlign: 'center', margin: '20px 0 24px' }}>
          <div style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 52, fontWeight: 700, color: '#C8891F', lineHeight: 1 }}>
            {fmt(revenue)}
          </div>
          <div style={{ fontSize: 12, color: '#B8AA94', marginTop: 4 }}>MAD de revenu mensuel estimé</div>
        </div>

        {sliders.map(({ label, value, min, max, set }) => (
          <div key={label} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#B8AA94', marginBottom: 7 }}>
              <span>{label}</span>
              <span style={{ fontWeight: 600, color: '#F5EDD8' }}>{value}</span>
            </div>
            <input
              type="range" min={min} max={max} value={value}
              onChange={e => set(+e.target.value)}
              style={{ width: '100%', height: 3, accentColor: '#C8891F', cursor: 'pointer' }}
            />
          </div>
        ))}

        <div style={{ textAlign: 'center', fontSize: 11, color: '#B8AA94', paddingTop: 14, borderTop: '1px solid rgba(245,237,216,0.07)', marginTop: 16 }}>
          Remboursement Pack N°2 en{' '}
          <strong style={{ color: '#C8891F' }}>{payback} jours</strong>
          {' '}· Marge brute :{' '}
          <strong style={{ color: '#C8891F' }}>{margin}%</strong>
        </div>

        <a
          href={waLink} target="_blank" rel="noopener noreferrer"
          className="btn-wa-dark"
          style={{ width: '100%', marginTop: 14, justifyContent: 'center' }}
        >
          💬 Je veux lancer mon atelier
        </a>
      </div>
    </div>
  )
}
