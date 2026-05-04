'use client'

import Image from 'next/image'
import Link from 'next/link'
import DevisExpressButton from '@/components/ui/devis-express-button'
import { TubesBackground } from '@/components/ui/tubes-background'

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
  return (
    <section style={{ padding: '78px 5% 92px', position: 'relative', overflow: 'hidden' }}>
      <TubesBackground />
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.04fr 0.96fr', gap: '54px', alignItems: 'center', position: 'relative', zIndex: 1 }} className="grid lg:grid-cols-2 gap-12">
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(242,99,22,0.10)', border: '1px solid rgba(242,99,22,0.18)', borderRadius: 999, padding: '6px 14px', marginBottom: 22 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--orange)', display: 'inline-block', boxShadow: '0 0 14px rgba(242,99,22,0.5)' }} />
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)' }}>
              Atelier · machines · réassort · Maroc
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(44px,5.8vw,82px)', fontWeight: 950, color: 'var(--text)', lineHeight: 1.04, letterSpacing: '-0.04em', marginBottom: 18 }}>
            {title || 'Construisez un vrai business d’impression.'}
          </h1>

          <p style={{ fontSize: 17, color: 'var(--text2)', lineHeight: 1.75, marginBottom: 28, maxWidth: 560 }}>
            {subtitle || 'NES vous aide à démarrer, équiper ou réapprovisionner votre atelier avec les bonnes machines, les bons kits et un accompagnement commercial clair.'}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, marginBottom: 26 }} className="grid md:grid-cols-3 gap-3">
            {[
              { title: 'Démarrer', text: 'kits, budget, première activité' },
              { title: 'Produire', text: 'machines, capacité, cadence' },
              { title: 'Tenir', text: 'consommables, réassort, support' },
            ].map((item) => (
              <div key={item.title} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: '14px 14px 13px', boxShadow: 'var(--shadow)' }}>
                <div style={{ fontSize: 11, fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.01em', marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>{item.text}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 34, alignItems: 'center' }}>
            <Link href={primaryCtaHref || `/${locale}/kits`} className="btn-orange" style={{ padding: '14px 28px', fontSize: 15, fontWeight: 800 }}>
              {primaryCtaLabel || 'Voir les Kits & Packs'} →
            </Link>
            {secondaryCtaHref ? (
              <Link href={secondaryCtaHref} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '14px 22px', borderRadius: 14, background: 'var(--card)', color: 'var(--text)', fontSize: 14, fontWeight: 800, textDecoration: 'none', border: '1px solid var(--border2)' }}>
                {secondaryCtaLabel || 'Voir plus'}
              </Link>
            ) : (
              <DevisExpressButton />
            )}
          </div>

          <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap' }}>
            {[
              { val: '2 000+', lbl: 'ateliers lancés' },
              { val: '24–48h', lbl: 'livraison Maroc' },
              { val: '170+', lbl: 'références métier' },
            ].map((s, i) => (
              <div key={s.lbl} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                {i > 0 && <div style={{ width: 1, height: 38, background: 'var(--border2)', margin: '0 24px' }} />}
                <div>
                  <div style={{ fontSize: 38, fontWeight: 900, color: 'var(--text)', lineHeight: 1, letterSpacing: '-0.03em' }}>{s.val}</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 3 }}>{s.lbl}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', inset: '-28px -12px auto auto', width: 180, height: 180, borderRadius: 999, background: 'radial-gradient(circle, rgba(242,99,22,0.16) 0%, rgba(242,99,22,0.06) 42%, rgba(242,99,22,0) 74%)', filter: 'blur(10px)', pointerEvents: 'none' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 14 }}>
            <div style={{ display: 'grid', gap: 14 }}>
              <div style={{ position: 'relative', minHeight: 320, borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(242,99,22,0.20)', boxShadow: '0 30px 90px rgba(0,0,0,0.10)' }}>
                <Image src={photos[0].src} alt={photos[0].alt} fill sizes="(max-width: 1024px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.58) 100%)' }} />
                <div style={{ position: 'absolute', left: 16, right: 16, bottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.78)', marginBottom: 6 }}>Machine atelier</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.05 }}>Production plus sérieuse</div>
                  </div>
                  <div style={{ padding: '8px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff', fontSize: 11, fontWeight: 800, backdropFilter: 'blur(10px)' }}>
                    Atelier
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div style={{ position: 'relative', minHeight: 154, borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
                  <Image src={photos[1].src} alt={photos[1].alt} fill sizes="200px" style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.65) 100%)' }} />
                  <div style={{ position: 'absolute', left: 14, right: 14, bottom: 14, fontSize: 12, fontWeight: 800, color: '#fff' }}>Produits à vendre</div>
                </div>
                <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 20, padding: 16, boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 8 }}>Logique NES</div>
                    <div style={{ fontSize: 19, fontWeight: 900, color: 'var(--text)', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: 8 }}>Choisir, lancer, réassortir.</div>
                    <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>Une structure plus crédible que le simple catalogue produit.</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                    {(trustBullets?.length ? trustBullets.slice(0, 3) : ['Kits de départ', 'Devis atelier', 'Consommables réguliers']).map((item) => (
                      <div key={item} style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>
                        <span style={{ color: 'var(--green)', fontWeight: 900, flexShrink: 0 }}>✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gap: 14 }}>
              <div style={{ position: 'relative', minHeight: 180, borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
                <Image src={photos[2].src} alt={photos[2].alt} fill sizes="220px" style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.68) 100%)' }} />
                <div style={{ position: 'absolute', left: 14, right: 14, bottom: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)', marginBottom: 5 }}>Réassort</div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#fff', lineHeight: 1.05 }}>Encres et consommables qui tournent</div>
                </div>
              </div>
              <div style={{ position: 'relative', minHeight: 294, borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
                <Image src={photos[3].src} alt={photos[3].alt} fill sizes="220px" style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.74) 100%)' }} />
                <div style={{ position: 'absolute', left: 16, right: 16, bottom: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)', marginBottom: 6 }}>Montée en gamme</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', lineHeight: 1.06, letterSpacing: '-0.02em', marginBottom: 8 }}>Passez d’un achat isolé à une vraie logique atelier.</div>
                  <div style={{ display: 'inline-flex', padding: '8px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff', fontSize: 11, fontWeight: 800, backdropFilter: 'blur(8px)' }}>
                    Maroc · NES
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
