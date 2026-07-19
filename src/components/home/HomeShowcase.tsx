'use client'
import Link from 'next/link'
import Image from 'next/image'
import { CardsSlider } from '@/components/ui/cards-slider'
import { GLOSS_COLORS } from '@/lib/data/carlas-gloss'
import { MagicCard } from '@/components/ui/magic-card'
import { TiltCard } from '@/components/ui/tilt-card'
import { PerspectiveMarquee } from '@/components/ui/perspective-marquee'
import { MarkerHighlight } from '@/components/ui/marker-highlight'

interface Category { name: string; info: string; count: number; slug: string }
interface KitLite { id: string; packNum: string; tag: string; name: string; subtitle: string; priceDisplay: string; roi: string }

export function HomeMarquee() {
  return (
    <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: '#0B1523', overflow: 'hidden' }}>
      <PerspectiveMarquee
        items={['Sérigraphie', 'Sublimation', 'DTF', 'Presses à chaud', 'Films Carlas', 'Covering', 'Réassort 24–48h', 'Stock Casablanca']}
        fontSize={44}
        color="rgba(240,240,248,0.9)"
        pixelsPerSecond={70}
      />
    </div>
  )
}

export function CategoryShowcase({ locale, categories }: { locale: string; categories: Category[] }) {
  return (
    <section style={{ padding: 'clamp(48px,7vw,88px) 5%' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap', marginBottom: 32 }}>
          <div>
            <p className="section-kicker">Pour les ateliers d&apos;impression</p>
            <h2 className="section-title">
              <MarkerHighlight
                before="Tout ce que votre atelier "
                highlight="consomme"
                after=", en stock."
                markerColor="rgba(234,88,12,0.28)"
                baseColor="var(--text)"
                highlightedTextColor="var(--text)"
              />
            </h2>
          </div>
          <Link href={`/${locale}/categorie-produit`} style={{ fontSize: 13, fontWeight: 800, color: 'var(--orange)', textDecoration: 'none', paddingBottom: 6 }}>
            Tout le catalogue →
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: 14 }}>
          {categories.map((cat, i) => (
            <Link key={cat.slug} href={`/${locale}/categorie-produit/${cat.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
              <MagicCard className="cat-card" gradientColor="rgba(234,88,12,0.10)" style={{ height: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
                  <span className="cat-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="cat-name">{cat.name}</span>
                  <span className="cat-info">{cat.info}</span>
                  <span className="cat-count">{cat.count} références · prix pro sur volume</span>
                </div>
              </MagicCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function KitShowcase({ locale, kits }: { locale: string; kits: KitLite[] }) {
  return (
    <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: 'clamp(48px,7vw,88px) 5%' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <p className="section-kicker">Kits clés en main</p>
          <h2 className="section-title">Vos clients veulent se lancer ?<br />Équipez-les en une commande.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 14 }}>
          {kits.map((kit) => (
            <Link key={kit.id} href={`/${locale}/kits`} style={{ textDecoration: 'none', display: 'block' }}>
              <TiltCard spotlight className="cat-card" style={{ height: '100%', gap: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="cat-num">{kit.packNum}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)' }}>{kit.tag}</span>
                </div>
                <span className="cat-name">{kit.name.replace('Kit ', '')}</span>
                <span className="cat-info">{kit.subtitle}</span>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span className="stat-big" style={{ fontSize: 'clamp(26px,2.6vw,36px)' }}>{kit.priceDisplay}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text2)' }}>MAD · ROI {kit.roi}</span>
                </div>
                </div>
              </TiltCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}


const SHOWCASE_NAMES = [
  'Ferrari Red', 'Liquid Gold', 'Signal Green', 'Azure', 'Sunflower Burst',
  'McLaren Flame', 'Pure White', 'Caribbean Pearl', 'Signal Yellow', 'Cobalt',
  'Glowing Rose', 'Nardo Storm', 'Champion Silver', "Dragon's Breath", 'Ocean Sky', 'Malachite Green',
]

export function WrapColorShowcase({ locale }: { locale: string }) {
  const colors = SHOWCASE_NAMES
    .map((n) => GLOSS_COLORS.find((c) => c.name === n))
    .filter((c): c is NonNullable<typeof c> => Boolean(c?.img))
  return (
    <CardsSlider padding={4}>
      {colors.map((c) => (
        <Link
          key={c.name}
          href={`/${locale}/covering`}
          style={{ textDecoration: 'none', display: 'block', width: 190, flexShrink: 0, borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,181,154,0.18)', background: '#111820' }}
        >
          <div style={{ position: 'relative', width: '100%', aspectRatio: '1' }}>
            <Image src={c.img as string} alt={`Film Carlas ${c.name}`} fill sizes="190px" style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ padding: '12px 14px' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#f6efe8', lineHeight: 1.2 }}>{c.name}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#ff9f6a', marginTop: 3 }}>{c.code ?? c.family}</div>
          </div>
        </Link>
      ))}
    </CardsSlider>
  )
}
