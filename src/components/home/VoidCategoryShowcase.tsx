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
    <section style={{ background: '#f8f3ed', padding: 'clamp(44px,7vw,84px) 5%', borderTop: '1px solid rgba(20,20,20,0.08)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ marginBottom: 32, maxWidth: 780 }}>
          <div style={{ fontSize: 11, color: '#f26316', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>
            Catalogue NES
          </div>
          <h2 style={{ fontSize: 'clamp(24px,2.8vw,36px)', fontWeight: 700, color: '#151515', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 12 }}>
            Un catalogue organisé pour acheter par vrai besoin, pas au hasard.
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(20,20,20,0.68)', lineHeight: 1.78, maxWidth: 680 }}>
            Que vous cherchiez une machine, un consommable ou un produit sublimable, l&apos;objectif est simple, trouver plus vite la bonne famille, comprendre ce qu&apos;elle sert, puis entrer dans l&apos;offre utile.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${locale}/categorie-produit/${cat.slug}`}
              style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}
            >
              <article style={{ background: '#fff', border: '1px solid rgba(20,20,20,0.08)', overflow: 'hidden', height: '100%', transition: 'transform .2s ease, box-shadow .2s ease, border-color .2s ease' }}>
                <div style={{ position: 'relative', aspectRatio: '16 / 11', background: '#ece6df' }}>
                  {cat.img ? (
                    <Image src={cat.img} alt={cat.name} fill sizes="(max-width: 1024px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 46 }}>🖨️</div>
                  )}
                </div>

                <div style={{ padding: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 10, color: cat.recur ? '#0f766e' : '#f26316', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                      {cat.recur ? 'Réassort atelier' : 'Équipement atelier'}
                    </span>
                    <span style={{ fontSize: 11, color: 'rgba(20,20,20,0.52)', fontWeight: 700 }}>{cat.count} produits</span>
                  </div>

                  <h3 style={{ fontSize: 22, color: '#151515', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.08, marginBottom: 10 }}>
                    {cat.name}
                  </h3>

                  <p style={{ fontSize: 13, color: 'rgba(20,20,20,0.66)', lineHeight: 1.65, marginBottom: 18, minHeight: 64 }}>
                    {cat.info}
                  </p>

                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#151515', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Explorer la catégorie <span style={{ color: '#f26316' }}>→</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
