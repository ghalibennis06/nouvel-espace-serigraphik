import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Nouvel Espace Sérigraphik — Impression & Covering Auto au Maroc'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
          background: 'linear-gradient(135deg, #FAFAF7 0%, #F4E9D8 100%)',
          padding: '72px 80px', justifyContent: 'space-between',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 42, fontWeight: 900, color: '#0F1622', letterSpacing: '-0.05em' }}>NES</span>
          <span style={{ width: 12, height: 12, borderRadius: 999, background: '#EA580C' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 60, fontWeight: 800, color: '#0F1622', lineHeight: 1.05, letterSpacing: '-0.025em', maxWidth: 1000 }}>
            Un atelier, deux métiers.
          </div>
          <div style={{ fontSize: 28, color: '#4B5563', lineHeight: 1.4, maxWidth: 980 }}>
            Impression : sérigraphie · sublimation · DTF — Covering auto : films Carlas posés en atelier.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 16 }}>
            {['🚚 24–48h', '✓ Garantie 1 an', '💬 WhatsApp 7j/7'].map((t) => (
              <div key={t} style={{ background: '#0F1622', color: '#fff', padding: '10px 18px', borderRadius: 999, fontSize: 22, fontWeight: 600 }}>{t}</div>
            ))}
          </div>
          <div style={{ fontSize: 22, color: '#4B5563', fontWeight: 600 }}>nouvelespaceserigraphik.ma</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
