import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { getFeaturedProducts, getCategoryTree } from '@/lib/woocommerce'
import { categoryHref, whatsappGeneralLink } from '@/lib/utils'
import ProductsSection from '@/components/home/ProductsSection'
import BuyerPathSection from '@/components/home/BuyerPathSection'
import MoroccoTrustSection from '@/components/home/MoroccoTrustSection'
import { KITS as KITS_DATA } from '@/lib/data/kits'
import ShaderAnimation from '@/components/ui/shader-animation'
import DevisExpressButton from '@/components/ui/devis-express-button'
import RoiCalculator from '@/components/home/RoiCalculator'
import VoidCategoryShowcase from '@/components/home/VoidCategoryShowcase'
import FluidKitShowcase from '@/components/home/FluidKitShowcase'
import HeroIndustrialPanel from '@/components/home/HeroIndustrialPanel'

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
        <HeroIndustrialPanel locale={locale} photos={HERO_PHOTOS} />
      </ShaderAnimation>

      {/* ══════════════════════════════════════════════════════
          TRUST STRIP
      ══════════════════════════════════════════════════════ */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '18px 5%' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 0 }}>
          {[
            { icon: '🚚', label: 'Livraison 24–48h', sub: 'partout au Maroc' },
            { icon: '🛡️', label: 'Support local', sub: 'avant et après achat' },
            { icon: '💬', label: 'Support WhatsApp', sub: 'rapide et direct' },
            { icon: '🎯', label: 'Packs de démarrage', sub: 'pour lancer votre activité' },
            { icon: '🏭', label: 'Pour débutants et ateliers', sub: 'du premier achat au réassort' },
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

      <BuyerPathSection locale={locale} />

      <section style={{ background: 'var(--surface)', padding: '72px 5%', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', alignItems: 'start' }} className="grid lg:grid-cols-2 gap-8">
          <div>
            <span className="stag">Simulez avant d’acheter</span>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
              Estimez ce que votre atelier peut réellement générer.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.75, marginTop: 14, maxWidth: 620 }}>
              Avant de choisir une technique ou un kit, projetez votre volume, votre prix moyen et votre rythme de travail. C’est une bonne manière de sortir du flou et de parler concret avec NES.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
              {[
                'comparez sublimation, sérigraphie et DTF',
                'visualisez une estimation simple de chiffre d’affaires',
                'transformez la simulation en message WhatsApp prêt à envoyer',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--green)', fontWeight: 800, flexShrink: 0 }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <RoiCalculator variant="hero" />
        </div>
      </section>

      <VoidCategoryShowcase locale={locale} categories={CATEGORIES} />

      <MoroccoTrustSection locale={locale} />

      {/* ══════════════════════════════════════════════════════
          BEST SELLERS (avec filtres)
      ══════════════════════════════════════════════════════ */}
      <ProductsSection products={products} locale={locale} />

      <FluidKitShowcase locale={locale} kits={KITS} />

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
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 18 }}>
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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, maxWidth: 760, width: '100%' }} className="grid md:grid-cols-3 gap-3">
              {[
                'Choisissez une technique adaptée à votre projet',
                'Validez votre budget de départ avec NES',
                'Démarrez avec un kit ou un devis vraiment cohérent',
              ].map((item) => (
                <div key={item} style={{ background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.24)', borderRadius: 12, padding: '12px 14px', fontSize: 12, color: 'rgba(255,255,255,0.92)', lineHeight: 1.5 }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
