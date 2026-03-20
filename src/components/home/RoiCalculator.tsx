'use client'
import { useState, useMemo } from 'react'
import { KITS } from '@/lib/data/kits'
import { whatsappGeneralLink } from '@/lib/utils'

interface Props {
  variant?: 'hero' | 'academie'
  waLink?: string
}

const TECHNIQUES = [
  { id: 'sublimation', label: 'Sublimation', icon: '🖨️', costPerPiece: 12, hint: 'Mugs, t-shirts polyester, cadres' },
  { id: 'serigraphie', label: 'Sérigraphie', icon: '🎨', costPerPiece: 4,  hint: 'T-shirts coton, sweats, tote bags' },
  { id: 'dtf',         label: 'DTF',         icon: '🚀', costPerPiece: 2,  hint: 'Coton, cuir, tous textiles' },
] as const

export default function RoiCalculator({ variant = 'hero' }: Props) {
  const [technique, setTechnique] = useState<'sublimation' | 'serigraphie' | 'dtf'>('sublimation')
  const [pieces, setPieces] = useState(20)
  const [price,  setPrice]  = useState(50)
  const [days,   setDays]   = useState(22)

  const tech     = TECHNIQUES.find(t => t.id === technique)!
  const kit      = KITS.find(k => k.technique === technique)!

  const revenue    = pieces * price * days
  const cost       = pieces * tech.costPerPiece * days
  const netRevenue = revenue - cost
  const margin     = revenue > 0 ? Math.round(netRevenue / revenue * 100) : 0
  const payback    = Math.max(1, Math.ceil(kit.price / Math.max(1, pieces * (price - tech.costPerPiece))))

  const fmt = (n: number) => n.toLocaleString('fr-MA')

  const waMsg = useMemo(() => {
    return `Bonjour NES, j'ai simulé mon activité de ${tech.label.toLowerCase()} : ${pieces} pièces/jour × ${price} MAD × ${days} jours = ${fmt(revenue)} MAD/mois de CA (marge ${margin}%). ROI estimé ${payback} jours. Je veux lancer mon atelier — pouvez-vous me recommander le ${kit.name} ?`
  }, [technique, pieces, price, days, revenue, margin, payback, tech, kit])

  const waLink = whatsappGeneralLink(waMsg)

  if (variant === 'academie') {
    return (
      <div style={{ background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: 18, padding: 28 }}>
        <h3 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 5 }}>
          Simulateur de rentabilité
        </h3>
        <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 20 }}>
          Combien votre atelier peut-il générer chaque mois ?
        </p>

        {/* Technique selector */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
          {TECHNIQUES.map(t => (
            <button
              key={t.id}
              onClick={() => setTechnique(t.id)}
              style={{
                flex: 1,
                padding: '7px 4px',
                borderRadius: 8,
                border: `1px solid ${technique === t.id ? 'var(--blue)' : 'var(--border)'}`,
                background: technique === t.id ? 'var(--bluesoft)' : 'transparent',
                color: technique === t.id ? 'var(--blue)' : 'var(--text2)',
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all .15s',
                fontFamily: 'Outfit,sans-serif',
              }}
            >
              {t.icon}<br />{t.label}
            </button>
          ))}
        </div>

        {[
          { label: 'Pièces / jour',          value: pieces, min: 5,  max: 150, set: setPieces },
          { label: 'Prix unitaire moy. (MAD)', value: price,  min: 15, max: 300, set: setPrice  },
          { label: 'Jours / mois',             value: days,   min: 10, max: 30,  set: setDays   },
        ].map(({ label, value, min, max, set }) => (
          <div key={label} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text2)', marginBottom: 7 }}>
              <span>{label}</span>
              <span style={{ fontWeight: 600, color: 'var(--text)' }}>{value}</span>
            </div>
            <input type="range" min={min} max={max} value={value}
              onChange={e => set(+e.target.value)}
              style={{ width: '100%', height: 3, accentColor: 'var(--blue)', cursor: 'pointer' }}
            />
          </div>
        ))}

        <div style={{ background: 'var(--bluesoft)', border: '1px solid var(--bluesoft2)', borderRadius: 11, padding: 18, textAlign: 'center', marginTop: 22 }}>
          <div style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 44, fontWeight: 700, color: 'var(--blue)', lineHeight: 1 }}>
            {fmt(revenue)}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 3 }}>MAD de CA mensuel estimé</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 13 }}>
            {[
              { v: fmt(netRevenue), l: 'CA net' },
              { v: `${payback}j`,  l: `ROI ${kit.name.split(' ')[1]}` },
              { v: `${margin}%`,   l: 'Marge brute' },
            ].map(({ v, l }) => (
              <div key={l} style={{ flex: 1, background: 'var(--card)', borderRadius: 7, padding: '9px 0', textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>{v}</div>
                <div style={{ fontSize: 10, color: 'var(--text2)', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Kit recommendation */}
        <div style={{ marginTop: 14, padding: '11px 14px', background: 'var(--greensoft)', border: '1px solid var(--green)', borderRadius: 9, fontSize: 12 }}>
          <strong style={{ color: 'var(--green)' }}>Kit recommandé :</strong>{' '}
          <span style={{ color: 'var(--text)' }}>{kit.name} — {kit.priceDisplay} MAD</span>
          {' · '}
          <span style={{ color: 'var(--text2)' }}>rentabilisé en {payback} jours</span>
        </div>

        <a href={waLink} target="_blank" rel="noopener noreferrer"
          className="btn-wa-dark"
          style={{ width: '100%', marginTop: 14, justifyContent: 'center' }}
        >
          💬 Je veux lancer mon atelier
        </a>
      </div>
    )
  }

  // Hero variant
  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: 18, padding: 28, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -80, right: -80, width: 240, height: 240, background: 'radial-gradient(circle, var(--bluesoft) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 14 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)', display: 'inline-block', animation: 'pulseDot 1.8s ease-in-out infinite' }} />
          Calculateur de rentabilité
        </div>

        {/* Technique selector */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {TECHNIQUES.map(t => (
            <button
              key={t.id}
              onClick={() => setTechnique(t.id)}
              title={t.hint}
              style={{
                flex: 1,
                padding: '7px 4px',
                borderRadius: 8,
                border: `1px solid ${technique === t.id ? 'var(--blue)' : 'var(--border)'}`,
                background: technique === t.id ? 'var(--bluesoft)' : 'transparent',
                color: technique === t.id ? 'var(--blue)' : 'var(--text2)',
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all .15s',
                fontFamily: 'Outfit,sans-serif',
                textAlign: 'center',
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div style={{ textAlign: 'center', margin: '16px 0 20px' }}>
          <div style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 52, fontWeight: 700, color: 'var(--blue)', lineHeight: 1 }}>
            {fmt(revenue)}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 4 }}>MAD de revenu mensuel estimé</div>
        </div>

        {[
          { label: 'Pièces produites / jour',  value: pieces, min: 5,  max: 100, set: setPieces },
          { label: 'Prix de vente moyen (MAD)', value: price,  min: 20, max: 200, set: setPrice  },
          { label: 'Jours travaillés / mois',   value: days,   min: 10, max: 30,  set: setDays   },
        ].map(({ label, value, min, max, set }) => (
          <div key={label} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text2)', marginBottom: 7 }}>
              <span>{label}</span>
              <span style={{ fontWeight: 600, color: 'var(--text)' }}>{value}</span>
            </div>
            <input type="range" min={min} max={max} value={value}
              onChange={e => set(+e.target.value)}
              style={{ width: '100%', height: 3, accentColor: 'var(--blue)', cursor: 'pointer' }}
            />
          </div>
        ))}

        <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--text2)', paddingTop: 12, borderTop: '1px solid var(--border)', marginTop: 14 }}>
          <strong style={{ color: 'var(--green)' }}>{kit.name}</strong> recommandé ·
          ROI en <strong style={{ color: 'var(--blue)' }}>{payback} jours</strong> ·
          Marge <strong style={{ color: 'var(--blue)' }}>{margin}%</strong>
        </div>

        <a href={waLink} target="_blank" rel="noopener noreferrer"
          className="btn-wa-dark"
          style={{ width: '100%', marginTop: 14, justifyContent: 'center' }}
        >
          💬 Je veux lancer mon atelier
        </a>
      </div>
    </div>
  )
}
