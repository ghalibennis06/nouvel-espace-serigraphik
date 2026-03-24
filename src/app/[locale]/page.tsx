import type { Metadata } from 'next'
import dynamicImport from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { getFeaturedProducts, getCategoryTree } from '@/lib/woocommerce'
import { categoryHref, whatsappGeneralLink } from '@/lib/utils'
import ProductsSection from '@/components/home/ProductsSection'
import { KITS as KITS_DATA } from '@/lib/data/kits'

const ShaderAnimation   = dynamicImport(() => import('@/components/ui/shader-animation'),     { ssr: false })
const DevisExpressButton = dynamicImport(() => import('@/components/ui/devis-express-button'), { ssr: false })

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Nouvel Espace Sérigraphik — Machines & Kits d'impression au Maroc",
    description: 'Machines professionnelles, kits complets, consommables de qualité. Plus de 2 000 ateliers lancés partout au Maroc — livraison 24–48h, support WhatsApp 7j/7.',
  }
}

// ─── Static data ──────────────────────────────────────────────────────────────

const KITS = KITS_DATA

const CATEGORIES = [
  { img: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2Fpresse-40x50autoopen.jpg',         name: 'Presses à Chaud',          info: 'Manuelles, auto-ouverture, 5en1, casquette, mug',    count: 23, slug: 'les-presses-a-chaud',             recur: false },
  { img: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2F61gC992Xr5L.jpg',                  name: 'Consommables Sérigraphie', info: 'Antex, Inknovator, cadres alu, soies, raclettes',    count: 40, slug: 'les-consommables-de-serigraphie', recur: true  },
  { img: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2025%2F01%2FINK-C.png',                        name: 'Consommables Sublimation', info: 'Encres, papiers, flex 14 couleurs, scotch thermique', count: 31, slug: 'les-consommables-de-sublimation', recur: true  },
  { img: null,                                                                                                                          name: "Machines d'Impression",   info: 'DTF, UV, traceurs grand format professionnels',      count: 8,  slug: 'les-machines-dimpression',        recur: false },
  { img: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2F4-couleurs-4-stations-pro.jpg',    name: 'Machines de Sérigraphie', info: 'Carrousels 1C à 4C, insolation, séchoirs tunnel',    count: 14, slug: 'les-machines-de-serigraphie',     recur: false },
  { img: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2FSH02.png',                         name: 'Produits Sublimables',    info: 'Mugs, cadres marbre, coussins, porte-clés',           count: 52, slug: 'les-produits-sublimables',        recur: false },
]

// Hero product collage — 4 real product photos
const HERO_PHOTOS = [
  { src: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2Fpresse-40x50autoopen.jpg', alt: 'Presse à chaud 40×50' },
  { src: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2FSH02.png',                alt: 'Mug sublimable' },
  { src: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2025%2F01%2FINK-C.png',               alt: 'Encres sublimation' },
  { src: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2F4-couleurs-4-stations-pro.jpg', alt: 'Carrousel sérigraphie' },
]

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params
  setRequestLocale(locale)

  const [, products] = await Promise.all([
    getCategoryTree(),
    getFeaturedProducts(12),
  ])

  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <ShaderAnimation
        overlayOpacity={0.91}
        overlayColor="rgba(255,255,255,1)"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
      <section style={{ padding: '72px 5% 80px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}
             className="grid-cols-1 lg:grid-cols-2">

          {/* Left */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--orangesoft)', border: '1px solid rgba(242,99,22,0.20)', borderRadius: 20, padding: '5px 14px', marginBottom: 24 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--orange)', display: 'inline-block' }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)' }}>
                N°1 de l&apos;impression au Maroc · depuis 2018
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(40px,5.5vw,72px)', fontWeight: 900, color: 'var(--text)', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: 20 }}>
              Lancez votre<br />
              <span style={{ color: 'var(--orange)' }}>atelier d&apos;impression</span><br />
              en 24 heures.
            </h1>

            <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.65, marginBottom: 32, maxWidth: 460 }}>
              Machines professionnelles, kits clé-en-main et consommables de qualité.
              Livrés partout au Maroc sous 24–48h.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 44, alignItems: 'center' }}>
              <Link href={`/${locale}/kits`} className="btn-orange" style={{ padding: '14px 28px', fontSize: 15, fontWeight: 700 }}>
                Voir les Kits & Packs →
              </Link>
              <DevisExpressButton />
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap' }}>
              {[
                { val: '2 000+', lbl: 'ateliers lancés' },
                { val: '24h',    lbl: 'livraison Maroc' },
                { val: '80+',    lbl: 'produits' },
              ].map((s, i) => (
                <div key={s.lbl} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                  {i > 0 && <div style={{ width: 1, height: 36, background: 'var(--border2)', margin: '0 24px' }} />}
                  <div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.val}</div>
                    <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>{s.lbl}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — product photo collage */}
          <div className="hidden lg:grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {HERO_PHOTOS.map((p, i) => (
              <div
                key={i}
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  aspectRatio: '1',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  position: 'relative',
                  transform: i === 1 ? 'translateY(20px)' : i === 3 ? 'translateY(-20px)' : 'none',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <Image src={p.src} alt={p.alt} fill style={{ objectFit: 'cover' }} sizes="200px" />
              </div>
            ))}
          </div>
        </div>
      </section>
      </ShaderAnimation>

      {/* ══════════════════════════════════════════════════════
          TRUST STRIP
      ══════════════════════════════════════════════════════ */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '18px 5%' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 0 }}>
          {[
            { icon: '🚚', label: 'Livraison 24–48h', sub: 'partout au Maroc' },
            { icon: '🛡️', label: 'Garantie 1 an',    sub: 'toutes machines' },
            { icon: '💬', label: 'Support WhatsApp', sub: '7 jours / 7' },
            { icon: '💳', label: 'Paiement livraison', sub: 'disponible' },
            { icon: '⭐', label: '2 000+ clients',   sub: 'satisfaits' },
          ].map((item, i) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 28px', borderLeft: i > 0 ? '1px solid var(--border)' : 'none' }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{item.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text2)' }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          CATEGORIES
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg)', padding: '80px 5%' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ marginBottom: 36 }}>
            <span className="stag">6 univers produits</span>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              Tout ce qu&apos;il faut pour imprimer
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {CATEGORIES.map(cat => (
              <Link
                key={cat.slug}
                href={categoryHref(cat.slug, locale)}
                className="cat-item"
                style={{ display: 'block', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', textDecoration: 'none', transition: 'all .2s', boxShadow: 'var(--shadow)' }}
              >
                {/* Photo */}
                <div style={{ aspectRatio: '16/9', background: 'var(--surface)', position: 'relative' }}>
                  {cat.img
                    ? <Image src={cat.img} alt={cat.name} fill sizes="(max-width:640px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                    : <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42 }}>🖨️</div>
                  }
                  {cat.recur && (
                    <div style={{ position: 'absolute', top: 10, right: 10, background: 'var(--orange)', color: '#fff', fontSize: 9, fontWeight: 800, padding: '3px 8px', borderRadius: 4, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      ♻ Mensuel
                    </div>
                  )}
                </div>
                {/* Info */}
                <div style={{ padding: '16px 18px 18px' }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>{cat.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 8 }}>{cat.info}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--orange)' }}>{cat.count} produits →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BEST SELLERS (avec filtres)
      ══════════════════════════════════════════════════════ */}
      <ProductsSection products={products} locale={locale} />

      {/* ══════════════════════════════════════════════════════
          KITS
      ══════════════════════════════════════════════════════ */}
      <section id="kits" style={{ background: 'var(--surface)', padding: '80px 5%', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span className="stag">Kits & Packs</span>
              <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                Démarrez avec le bon kit
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text2)', marginTop: 8 }}>
                Rentabilisé en moins de 30 jours. Économisez jusqu&apos;à 2 100 MAD vs achat séparé.
              </p>
            </div>
            <Link href={`/${locale}/kits`} style={{ fontSize: 14, fontWeight: 600, color: 'var(--orange)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Voir tous les kits →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5" style={{ display: 'grid', gap: 20 }}>
            {KITS.map(kit => (
              <div
                key={kit.id}
                className="kit-item"
                style={{
                  background: 'var(--card)',
                  border: kit.featured ? '2px solid var(--orange)' : '1px solid var(--border)',
                  borderRadius: 16,
                  padding: 28,
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: kit.featured ? '0 4px 32px rgba(242,99,22,0.12)' : 'var(--shadow)',
                  transition: 'all .2s',
                }}
              >
                {kit.badge && (
                  <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--orange)', color: '#fff', fontSize: 9, fontWeight: 800, padding: '5px 14px', borderRadius: '0 14px 0 8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {kit.badge}
                  </div>
                )}

                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 8 }}>
                  {kit.packNum}
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 6, letterSpacing: '-0.02em' }}>
                  {kit.name}
                </div>
                <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 20, lineHeight: 1.55 }}>
                  {kit.desc}
                </p>

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 20 }}>
                  <span style={{ fontSize: 36, fontWeight: 900, color: 'var(--orange)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                    {kit.priceDisplay}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--text2)' }}>MAD</span>
                  {kit.oldPrice && <span style={{ fontSize: 14, color: 'var(--text3)', textDecoration: 'line-through' }}>{kit.oldPrice}</span>}
                </div>

                {/* Items */}
                <ul style={{ listStyle: 'none', marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {kit.items.slice(0, 5).map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--text2)' }}>
                      <span style={{ color: 'var(--green)', fontWeight: 700, flexShrink: 0, lineHeight: 1.4 }}>✓</span>
                      {item}
                    </li>
                  ))}
                  {kit.items.length > 5 && (
                    <li style={{ fontSize: 12, color: 'var(--text3)', paddingLeft: 16 }}>
                      +{kit.items.length - 5} autres inclus
                    </li>
                  )}
                </ul>

                <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                  <a
                    href={whatsappGeneralLink(kit.ctaMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-wa-dark"
                    style={{ flex: 1, justifyContent: 'center', padding: '11px 0', fontSize: 13, borderRadius: 8 }}
                  >
                    💬 Commander
                  </a>
                  <Link
                    href={`/${locale}/kits`}
                    style={{ padding: '11px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, color: 'var(--text2)', border: '1px solid var(--border2)', textDecoration: 'none', whiteSpace: 'nowrap' }}
                  >
                    Détails
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA BAND
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--orange)', padding: '72px 5%', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 16 }}>
            2 000+ ateliers lancés au Maroc
          </div>
          <h2 style={{ fontSize: 'clamp(32px,4.5vw,56px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 16 }}>
            Votre atelier commence aujourd&apos;hui.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', marginBottom: 32 }}>
            Rejoignez les entrepreneurs marocains qui impriment et vendent chaque jour avec NES.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href={`/${locale}/kits`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: 'var(--orange)', padding: '14px 30px', borderRadius: 8, fontSize: 15, fontWeight: 800, textDecoration: 'none', transition: 'transform .15s' }}
            >
              Choisir mon kit →
            </Link>
            <a
              href={whatsappGeneralLink("Bonjour NES, je veux lancer mon atelier. Pouvez-vous m'aider ?")}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.18)', color: '#fff', padding: '14px 30px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.35)', transition: 'background .15s' }}
            >
              💬 Parler à un expert
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
