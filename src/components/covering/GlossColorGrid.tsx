'use client'
import { useState } from 'react'
import Image from 'next/image'
import { GLOSS_COLORS, GLOSS_FAMILIES } from '@/lib/data/carlas-gloss'
import { whatsappGeneralLink } from '@/lib/utils'

export default function GlossColorGrid() {
  const [family, setFamily] = useState<string>('Tous')
  const [visible, setVisible] = useState(24)

  const filtered = family === 'Tous' ? GLOSS_COLORS : GLOSS_COLORS.filter((c) => c.family === family)
  const shown = filtered.slice(0, visible)

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {['Tous', ...GLOSS_FAMILIES].map((f) => (
          <button
            key={f}
            onClick={() => { setFamily(f); setVisible(24) }}
            style={{
              padding: '8px 14px',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              border: family === f ? '1px solid #ff5c00' : '1px solid rgba(255,181,154,0.2)',
              background: family === f ? 'rgba(255,92,0,0.14)' : 'rgba(255,255,255,0.03)',
              color: family === f ? '#ffb59a' : 'rgba(221,227,235,0.72)',
            }}
          >
            {f}
          </button>
        ))}
        <span style={{ alignSelf: 'center', fontSize: 12, color: 'rgba(221,227,235,0.5)', marginLeft: 4 }}>
          {filtered.length} coloris
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
        {shown.map((color) => (
          <a
            key={color.name}
            href={whatsappGeneralLink(`[Covering] Bonjour NES, prix rouleau pour "${color.name}"${color.code ? ` (réf. ${color.code})` : ''} — Essential Series Gloss. Quantité : ...`)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', border: '1px solid rgba(171,137,125,0.18)', background: 'rgba(255,255,255,0.03)', display: 'block', borderRadius: 16, overflow: 'hidden' }}
          >
            <div style={{ position: 'relative', aspectRatio: '1', background: '#111820' }}>
              {color.img && (
                <Image
                  src={color.img}
                  alt={`Film covering ${color.name} — Essential Series Gloss`}
                  fill
                  sizes="(max-width: 640px) 45vw, 160px"
                  style={{ objectFit: 'cover' }}
                />
              )}
            </div>
            <div style={{ padding: '10px 12px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f6efe8', lineHeight: 1.2 }}>{color.name}</div>
              <div style={{ fontSize: 10, color: '#ff9f6a', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>
                {color.code ?? color.family}
              </div>
            </div>
          </a>
        ))}
      </div>

      {visible < filtered.length && (
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <button
            onClick={() => setVisible((v) => v + 48)}
            style={{ padding: '13px 26px', border: '1px solid rgba(255,181,154,0.2)', background: 'rgba(255,255,255,0.03)', color: '#dde3eb', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Voir plus de coloris ({filtered.length - visible} restants)
          </button>
        </div>
      )}
    </div>
  )
}
