'use client'

import Image from 'next/image'
import Link from 'next/link'
import DevisExpressButton from '@/components/ui/devis-express-button'

const TECH_DISCIPLINES = ['Sérigraphie', 'Sublimation', 'DTF', 'UV', 'Broderie']
const DEFAULT_WORDS = [
  { text: 'Machines,' },
  { text: 'kits' },
  { text: 'et' },
  { text: 'réassort' },
  { text: 'pour', className: 'text-[var(--orange)]' },
  { text: 'votre' },
  { text: 'atelier.' },
]

export default function HeroIndustrialPanel({
  locale,
  photos,
  title,
  subtitle,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  trustBullets,
}: {
  locale: string
  photos: { src: string; alt: string }[]
  title?: string
  subtitle?: string
  primaryCtaLabel?: string
  primaryCtaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  trustBullets?: string[]
}) {
  const proofItems = trustBullets?.length
    ? trustBullets.slice(0, 4)
    : [
        'Choix guidé selon votre budget et votre technique',
        'Stock réel au Maroc avec livraison 24–48h',
        'Devis et orientation rapide sur WhatsApp',
        'Logique atelier, pas simple catalogue produit',
      ]

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background:
          'linear-gradient(180deg, #0b1016 0%, #111820 55%, #151d24 100%)',
        borderBottom: '1px solid rgba(255,181,154,0.12)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 78% 22%, rgba(242,99,22,0.18) 0%, rgba(242,99,22,0.05) 26%, rgba(0,0,0,0) 56%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '4%',
          top: 0,
          bottom: 0,
          width: 1,
          background:
            'linear-gradient(180deg, rgba(255,181,154,0.24) 0%, rgba(255,181,154,0.04) 100%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '4%',
          top: 0,
          bottom: 0,
          width: 1,
          background:
            'linear-gradient(180deg, rgba(255,181,154,0.18) 0%, rgba(255,181,154,0.02) 100%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(46px,8vw,88px) 5% clamp(52px,8vw,96px)',
          position: 'relative',
          zIndex: 1,
        }}
        className="grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-10 lg:gap-14"
      >
        <div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 12px',
                border: '1px solid rgba(255,92,0,0.35)',
                background: 'rgba(255,92,0,0.1)',
                color: '#ffb59a',
                fontSize: 11,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: 999, background: '#ff5c00', display: 'inline-block' }} />
              NES // Maroc
            </span>
            <span style={{ color: 'rgba(228,190,177,0.68)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              [ Casablanca · Atelier & réassort ]
            </span>
          </div>

          <div className="lg:hidden mb-5" style={{ position: 'relative', minHeight: 240, border: '1px solid rgba(255,181,154,0.16)', overflow: 'hidden' }}>
            <Image src={photos[0].src} alt={photos[0].alt} fill sizes="100vw" style={{ objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.82) 100%)' }} />
            <div style={{ position: 'absolute', left: 16, right: 16, bottom: 16, display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-end' }}>
              <div>
                <div style={{ fontSize: 11, color: 'rgba(255,181,154,0.72)', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>Surface critique</div>
                <div style={{ fontSize: 20, lineHeight: 1.08, fontWeight: 900, color: '#f6efe8' }}>Démarrer, produire, réassortir.</div>
              </div>
              <div style={{ fontSize: 10, color: 'rgba(246,239,232,0.72)', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '8px 10px', border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.06)' }}>
                PRNT-01
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 16, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {TECH_DISCIPLINES.map((item, index) => (
              <span
                key={item}
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: index === 0 ? '#ffb59a' : 'rgba(221,227,235,0.74)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                {item}
              </span>
            ))}
          </div>

          <h1
            style={{
              fontSize: 'clamp(38px,5vw,76px)',
              lineHeight: 1.02,
              letterSpacing: '-0.045em',
              color: '#f6efe8',
              fontWeight: 900,
              marginBottom: 18,
              maxWidth: 780,
            }}
          >
            {title || 'Machines, kits et réassort pour faire tourner un vrai atelier au Maroc.'}
          </h1>

          <p
            style={{
              fontSize: 16,
              lineHeight: 1.78,
              color: 'rgba(221,227,235,0.76)',
              maxWidth: 640,
              marginBottom: 28,
            }}
          >
            {subtitle ||
              "NES vous aide à choisir la bonne technique, la bonne machine et les bons consommables pour démarrer, produire sérieusement ou tenir une cadence sans rupture."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" style={{ marginBottom: 24 }}>
            {[
              {
                code: 'INT-01',
                title: 'Lancer',
                text: 'Kits, budget de départ, premier niveau de production.',
              },
              {
                code: 'INT-02',
                title: 'Équiper',
                text: 'Presse, machine, capacité, matière et rythme atelier.',
              },
              {
                code: 'INT-03',
                title: 'Réassortir',
                text: 'Encres, papiers, films, flex et stock qui tourne.',
              },
            ].map((item) => (
              <div
                key={item.code}
                style={{
                  border: '1px solid rgba(171,137,125,0.18)',
                  background: 'rgba(255,255,255,0.03)',
                  padding: '16px 14px 15px',
                  minHeight: 138,
                }}
              >
                <div style={{ fontSize: 10, color: '#ff9f6a', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>
                  {item.code}
                </div>
                <div style={{ fontSize: 20, color: '#f6efe8', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 8 }}>{item.title}</div>
                <p style={{ fontSize: 12, color: 'rgba(221,227,235,0.68)', lineHeight: 1.65 }}>{item.text}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
            <Link
              href={primaryCtaHref || `/${locale}/kits`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '14px 22px',
                background: '#ff5c00',
                color: '#521800',
                fontSize: 13,
                fontWeight: 900,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              {primaryCtaLabel || 'Explorer les kits'}
            </Link>
            {secondaryCtaHref ? (
              <Link
                href={secondaryCtaHref}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '14px 20px',
                  border: '1px solid rgba(255,181,154,0.2)',
                  background: 'rgba(255,255,255,0.03)',
                  color: '#dde3eb',
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                {secondaryCtaLabel || 'Voir plus'}
              </Link>
            ) : (
              <div style={{ display: 'inline-flex' }}>
                <DevisExpressButton />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {proofItems.map((item, index) => (
              <div
                key={`${item}-${index}`}
                style={{
                  borderTop: '1px solid rgba(255,92,0,0.42)',
                  borderBottom: '1px solid rgba(171,137,125,0.18)',
                  padding: '12px 0',
                }}
              >
                <div style={{ fontSize: 10, color: 'rgba(255,181,154,0.72)', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
                  {`SIG-0${index + 1}`}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(221,227,235,0.8)', lineHeight: 1.55 }}>{item}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.08fr 0.92fr', gap: 14 }}>
            <div style={{ display: 'grid', gap: 14 }}>
              <div style={{ position: 'relative', minHeight: 340, overflow: 'hidden', border: '1px solid rgba(255,181,154,0.16)' }}>
                <Image src={photos[0].src} alt={photos[0].alt} fill sizes="(max-width: 1024px) 100vw, 42vw" style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.78) 100%)' }} />
                <div style={{ position: 'absolute', left: 18, top: 18, padding: '8px 10px', border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(0,0,0,0.28)', color: '#ffb59a', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  PRNT // MAIN FRAME
                </div>
                <div style={{ position: 'absolute', left: 18, right: 18, bottom: 18, display: 'flex', justifyContent: 'space-between', gap: 18, alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(255,181,154,0.74)', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>Montée en gamme</div>
                    <div style={{ fontSize: 26, color: '#f6efe8', fontWeight: 900, lineHeight: 1.04, letterSpacing: '-0.03em', maxWidth: 340 }}>
                      Passez du besoin flou à une vraie logique atelier.
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(246,239,232,0.72)', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    CASA // 24-48H
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-14">
                <div style={{ position: 'relative', minHeight: 170, overflow: 'hidden', border: '1px solid rgba(171,137,125,0.18)' }}>
                  <Image src={photos[1].src} alt={photos[1].alt} fill sizes="220px" style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.74) 100%)' }} />
                  <div style={{ position: 'absolute', left: 14, right: 14, bottom: 14 }}>
                    <div style={{ fontSize: 10, color: 'rgba(255,181,154,0.7)', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 5 }}>Produit final</div>
                    <div style={{ fontSize: 15, color: '#f6efe8', fontWeight: 900, lineHeight: 1.1 }}>Ce que votre client voit et achète</div>
                  </div>
                </div>
                <div style={{ border: '1px solid rgba(171,137,125,0.18)', background: 'rgba(255,255,255,0.03)', padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 10, color: '#ff9f6a', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>OPS // NES</div>
                    <div style={{ fontSize: 22, color: '#f6efe8', fontWeight: 900, lineHeight: 1.04, letterSpacing: '-0.025em', marginBottom: 10 }}>Choisir, produire, tenir.</div>
                    <p style={{ fontSize: 12, color: 'rgba(221,227,235,0.68)', lineHeight: 1.65 }}>
                      Le site doit parler au client marocain qui veut lancer, équiper ou réassortir sans perdre du temps.
                    </p>
                  </div>
                  <div style={{ display: 'grid', gap: 8, marginTop: 14 }}>
                    {['Choix technique', 'Stock réel', 'Devis rapide'].map((item) => (
                      <div key={item} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 11, color: 'rgba(221,227,235,0.74)', borderTop: '1px solid rgba(171,137,125,0.14)', paddingTop: 8 }}>
                        <span>{item}</span>
                        <span style={{ color: '#ffb59a', fontWeight: 800 }}>OK</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gap: 14 }}>
              <div style={{ position: 'relative', minHeight: 192, overflow: 'hidden', border: '1px solid rgba(171,137,125,0.18)' }}>
                <Image src={photos[2].src} alt={photos[2].alt} fill sizes="220px" style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.82) 100%)' }} />
                <div style={{ position: 'absolute', left: 14, right: 14, bottom: 14 }}>
                  <div style={{ fontSize: 10, color: 'rgba(255,181,154,0.72)', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 5 }}>Réassort critique</div>
                  <div style={{ fontSize: 18, color: '#f6efe8', fontWeight: 900, lineHeight: 1.06 }}>Encres, papiers et consommables qui tournent sans bloquer la prod.</div>
                </div>
              </div>

              <div style={{ position: 'relative', minHeight: 316, overflow: 'hidden', border: '1px solid rgba(171,137,125,0.18)' }}>
                <Image src={photos[3].src} alt={photos[3].alt} fill sizes="220px" style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.82) 100%)' }} />
                <div style={{ position: 'absolute', left: 16, right: 16, top: 16, display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                  <div style={{ padding: '7px 9px', border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(0,0,0,0.28)', color: '#ffb59a', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    TECH // SCREEN
                  </div>
                  <div style={{ padding: '7px 9px', border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.06)', color: 'rgba(246,239,232,0.76)', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    2000+ ateliers
                  </div>
                </div>
                <div style={{ position: 'absolute', left: 16, right: 16, bottom: 16 }}>
                  <div style={{ fontSize: 10, color: 'rgba(255,181,154,0.72)', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>Exécution locale</div>
                  <div style={{ fontSize: 20, color: '#f6efe8', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 8 }}>
                    Une présence NES plus industrielle, plus crédible, plus machine commerciale.
                  </div>
                  <p style={{ fontSize: 12, color: 'rgba(221,227,235,0.72)', lineHeight: 1.62, maxWidth: 320 }}>
                    On ne vend pas seulement des fiches produit, on aide à installer une vraie capacité de production.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
