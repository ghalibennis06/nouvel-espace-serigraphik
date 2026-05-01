'use client'

import Link from 'next/link'
import { whatsappGeneralLink } from '@/lib/utils'
import type { Kit } from '@/lib/data/kits'

export default function FluidKitShowcase({
  locale,
  kits,
}: {
  locale: string
  kits: Kit[]
}) {
  return (
    <section id="kits" style={{ background: 'var(--surface)', padding: '84px 5%', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ maxWidth: 720 }}>
            <span className="stag">Kits & Packs</span>
            <h2 style={{ fontSize: 'clamp(30px,3.8vw,48px)', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 10 }}>
              Des packs plus lisibles, plus désirables, plus prêts à vendre.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.75 }}>
              Cette version remplace la simple carte catalogue par un bloc plus vivant, plus premium, et plus clair sur le vrai gain commercial de chaque kit.
            </p>
          </div>
          <Link href={`/${locale}/kits`} style={{ fontSize: 14, fontWeight: 700, color: 'var(--orange)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Voir tous les kits →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 18 }} className="grid md:grid-cols-3 gap-5">
          {kits.map((kit) => (
            <div
              key={kit.id}
              className="fluid-kit"
              style={{
                position: 'relative',
                minHeight: 460,
                borderRadius: 26,
                overflow: 'hidden',
                border: kit.featured ? '1px solid rgba(242,99,22,0.34)' : '1px solid var(--border)',
                background: kit.featured
                  ? 'linear-gradient(180deg, rgba(242,99,22,0.08) 0%, rgba(255,255,255,0.96) 42%, rgba(255,255,255,1) 100%)'
                  : 'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(255,255,255,1) 36%)',
                boxShadow: kit.featured ? '0 26px 70px rgba(242,99,22,0.10)' : 'var(--shadow)',
                transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <div
                className="fluid-aura"
                style={{
                  position: 'absolute',
                  top: -80,
                  right: -40,
                  width: 220,
                  height: 220,
                  borderRadius: 999,
                  background: 'radial-gradient(circle, rgba(242,99,22,0.22) 0%, rgba(242,99,22,0.08) 40%, rgba(242,99,22,0) 72%)',
                  filter: 'blur(12px)',
                  transform: 'scale(0.82)',
                  transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
                  opacity: 0.74,
                  pointerEvents: 'none',
                }}
              />

              <div style={{ position: 'relative', zIndex: 2, padding: 26, display: 'flex', flexDirection: 'column', minHeight: 460 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 18 }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 8 }}>
                      {kit.packNum}
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 6 }}>
                      {kit.name}
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65, maxWidth: 280 }}>{kit.desc}</p>
                  </div>
                  <div style={{ fontSize: 28 }}>{kit.icon}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
                  <span style={{ fontSize: 40, fontWeight: 900, color: 'var(--orange)', letterSpacing: '-0.04em', lineHeight: 1 }}>{kit.priceDisplay}</span>
                  <span style={{ fontSize: 13, color: 'var(--text2)' }}>MAD</span>
                  {kit.oldPrice ? <span style={{ fontSize: 14, color: 'var(--text3)', textDecoration: 'line-through' }}>{kit.oldPrice}</span> : null}
                </div>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                  {[
                    `ROI ${kit.roi}`,
                    `Setup ${kit.setupTime}`,
                    kit.target,
                  ].map((item) => (
                    <div key={item} style={{ padding: '7px 10px', borderRadius: 999, background: 'rgba(242,99,22,0.08)', border: '1px solid rgba(242,99,22,0.14)', fontSize: 11, fontWeight: 700, color: 'var(--text2)' }}>
                      {item}
                    </div>
                  ))}
                </div>

                <div style={{ background: 'rgba(255,255,255,0.72)', border: '1px solid var(--border)', borderRadius: 16, padding: '16px 16px 14px', marginBottom: 16, backdropFilter: 'blur(10px)' }}>
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 8 }}>Ce que vous obtenez</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {kit.items.slice(0, 4).map((item) => (
                      <div key={item} style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--text2)', lineHeight: 1.55 }}>
                        <span style={{ color: 'var(--green)', fontWeight: 800, flexShrink: 0 }}>✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 'auto' }}>
                  <div className="fluid-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, opacity: 0.84, transform: 'translateY(12px)', transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)' }}>
                    <a
                      href={whatsappGeneralLink(kit.ctaMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '13px 14px', borderRadius: 14, background: 'var(--green)', color: '#fff', fontSize: 13, fontWeight: 800, textDecoration: 'none' }}
                    >
                      💬 Commander
                    </a>
                    <Link
                      href={`/${locale}/kits`}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '13px 14px', borderRadius: 14, background: 'var(--card)', color: 'var(--text)', fontSize: 13, fontWeight: 800, textDecoration: 'none', border: '1px solid var(--border2)' }}
                    >
                      Voir le détail
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .fluid-kit:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 80px rgba(0,0,0,0.12);
          border-color: rgba(242,99,22,0.34);
        }
        .fluid-kit:hover .fluid-aura {
          transform: scale(1.08);
          opacity: 1;
        }
        .fluid-kit:hover .fluid-reveal {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  )
}
