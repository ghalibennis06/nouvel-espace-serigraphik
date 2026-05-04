'use client'

import Link from 'next/link'
import Image from 'next/image'

export type VoidCategoryItem = {
  name: string
  slug: string
  info: string
  count: number
  img: string | null
  recur?: boolean
}

export default function VoidCategoryShowcase({
  locale,
  categories,
}: {
  locale: string
  categories: VoidCategoryItem[]
}) {
  return (
    <section style={{ background: 'var(--surface)', padding: 'clamp(44px,7vw,84px) 5%' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ marginBottom: 34, maxWidth: 760 }}>
          <span className="stag">Catalogue NES</span>
          <h2 style={{ fontSize: 'clamp(30px,3.8vw,48px)', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 12 }}>
            Machines, consommables et produits pour chaque technique.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.75, maxWidth: 660 }}>
            Sérigraphie, sublimation, DTF, UV flatbed — NES stock et livre tout ce qu'il faut pour lancer ou tenir une production au Maroc.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${locale}/categorie-produit/${cat.slug}`}
              style={{ textDecoration: 'none', display: 'block' }}
              className="void-wrapper"
            >
              <div
                className="void-shell"
                style={{
                  position: 'relative',
                  minHeight: 'clamp(300px,45vw,380px)',
                  borderRadius: 24,
                  overflow: 'hidden',
                  background: 'linear-gradient(180deg, rgba(10,10,10,0.02) 0%, rgba(10,10,10,0.08) 100%)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <div
                  className="void-media"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: cat.img ? 'transparent' : 'linear-gradient(135deg, rgba(242,99,22,0.16), rgba(0,0,0,0.06))',
                  }}
                >
                  {cat.img ? (
                    <Image src={cat.img} alt={cat.name} fill sizes="(max-width: 1024px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52 }}>🖨️</div>
                  )}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.72) 68%, rgba(0,0,0,0.92) 100%)',
                    }}
                  />
                </div>

                <div
                  className="void-glow"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: 92,
                    width: 82,
                    height: 82,
                    transform: 'translateX(-50%) scale(0.4)',
                    borderRadius: 999,
                    background: 'radial-gradient(circle, rgba(242,99,22,0.88) 0%, rgba(242,99,22,0.28) 42%, rgba(242,99,22,0) 72%)',
                    filter: 'blur(10px)',
                    opacity: 0,
                    transition: 'all 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
                    pointerEvents: 'none',
                  }}
                />

                <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 'clamp(300px,45vw,380px)', padding: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.14)', color: '#fff', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', backdropFilter: 'blur(12px)' }}>
                      {cat.recur ? 'Réassort' : 'Équipement'}
                    </div>
                    <div style={{ padding: '7px 10px', borderRadius: 999, background: 'rgba(0,0,0,0.28)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.84)', fontSize: 11, fontWeight: 700, backdropFilter: 'blur(10px)' }}>
                      {cat.count} produits
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 'clamp(20px,3.8vw,30px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 8 }}>
                      {cat.name}
                    </div>
                    <p style={{ fontSize: 'clamp(12px,1.4vw,13px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, maxWidth: 320, marginBottom: 16 }}>
                      {cat.info}
                    </p>

                    <div className="void-reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '11px 16px', borderRadius: 14, background: 'rgba(242,99,22,0.22)', border: '1px solid rgba(242,99,22,0.40)', color: '#fff', fontSize: 12, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', backdropFilter: 'blur(12px)', transform: 'translateY(18px) scale(0.96)', opacity: 0, transition: 'all 0.55s cubic-bezier(0.22, 1, 0.36, 1)' }}>
                      <span style={{ display: 'inline-flex', width: 7, height: 7, borderRadius: 999, background: 'var(--orange)', boxShadow: '0 0 14px rgba(242,99,22,0.9)' }} />
                      Explorer →
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .void-wrapper:hover .void-glow {
          opacity: 1;
          transform: translateX(-50%) scale(1.9);
        }
        .void-wrapper:hover .void-reveal {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .void-wrapper:hover .void-shell {
          transform: translateY(-6px);
          border-color: rgba(242,99,22,0.34);
          box-shadow: 0 26px 70px rgba(0,0,0,0.12);
        }
        .void-shell {
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
    </section>
  )
}
