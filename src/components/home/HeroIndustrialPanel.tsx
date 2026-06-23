'use client'

import Image from 'next/image'
import Link from 'next/link'
import DevisExpressButton from '@/components/ui/devis-express-button'

const DISCIPLINES = ['Sérigraphie', 'Sublimation', 'DTF', 'UV', 'Broderie']

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
  const bullets = trustBullets?.length
    ? trustBullets.slice(0, 4)
    : [
        'Choix guidé selon votre budget et votre activité',
        'Stock local avec livraison 24–48h partout au Maroc',
        'Devis et orientation rapide sur WhatsApp',
        'Réassort simple pour éviter les ruptures atelier',
      ]

  return (
    <section
      style={{
        background: '#f5efe8',
        borderBottom: '1px solid rgba(20,20,20,0.08)',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(34px,6vw,72px) 5% clamp(40px,7vw,80px)',
        }}
        className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-start"
      >
        <div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              alignItems: 'center',
              marginBottom: 18,
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '7px 12px',
                border: '1px solid rgba(242,99,22,0.25)',
                background: 'rgba(242,99,22,0.08)',
                color: '#f26316',
                fontSize: 11,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: 999, background: '#f26316', display: 'inline-block' }} />
              NES // Maroc
            </span>
            <span style={{ fontSize: 11, color: 'rgba(20,20,20,0.58)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Démarrage · Équipement · Réassort
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            {DISCIPLINES.map((item) => (
              <span
                key={item}
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'rgba(20,20,20,0.64)',
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
              fontSize: 'clamp(30px,4.2vw,56px)',
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
              color: '#151515',
              fontWeight: 800,
              marginBottom: 20,
              maxWidth: 720,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            {title || 'Machines, kits et consommables pour lancer, équiper et faire tourner un vrai atelier.'}
          </h1>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.75,
              color: 'rgba(20,20,20,0.68)',
              maxWidth: 640,
              marginBottom: 26,
            }}
          >
            {subtitle ||
              "NES vous aide à choisir la bonne technique, la bonne machine et les bons consommables selon votre budget, votre rythme de production et ce que vous voulez vendre au Maroc."}
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
            <Link href={primaryCtaHref || `/${locale}/kits`} className="btn-orange" style={{ padding: '14px 22px', fontSize: 14, fontWeight: 800 }}>
              {primaryCtaLabel || 'Voir les kits'} →
            </Link>
            {secondaryCtaHref ? (
              <Link href={secondaryCtaHref} className="btn-outline" style={{ padding: '14px 20px', fontSize: 14, fontWeight: 800 }}>
                {secondaryCtaLabel || 'Voir plus'}
              </Link>
            ) : (
              <DevisExpressButton />
            )}
          </div>

          {/* Entrée rapide par technique — pour l'acheteur qui sait ce qu'il veut */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(20,20,20,0.5)', alignSelf: 'center' }}>Par technique :</span>
            {[
              { l: 'Sérigraphie', s: 'les-consommables-de-serigraphie' },
              { l: 'Sublimation', s: 'les-consommables-de-sublimation' },
              { l: 'DTF', s: 'les-machines-dimpression' },
              { l: 'Presses à chaud', s: 'les-presses-a-chaud' },
            ].map((t) => (
              <Link key={t.s} href={`/${locale}/categorie-produit/${t.s}`} style={{ fontSize: 13, fontWeight: 700, color: '#151515', background: '#fff', border: '1px solid rgba(20,20,20,0.14)', borderRadius: 999, padding: '7px 14px', textDecoration: 'none' }}>
                {t.l}
              </Link>
            ))}
          </div>

          {/* Parcours acheteur — sélection cliquable */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" style={{ marginBottom: 24 }}>
            {[
              { title: 'Je débute', text: 'Kit de départ, budget initial, premières ventes.', href: `/${locale}/kits` },
              { title: "J'équipe mon atelier", text: 'Presse, machine, capacité et choix technique.', href: `/${locale}/categorie-produit` },
              { title: 'Je réassortis', text: 'Encres, papiers, films, flex et stock atelier.', href: `/${locale}/categorie-produit/les-consommables-de-serigraphie` },
            ].map((item) => (
              <Link key={item.title} href={item.href} className="hero-lane" style={{ background: '#fff', border: '1px solid rgba(20,20,20,0.08)', padding: '16px 14px', minHeight: 128, textDecoration: 'none', display: 'block', transition: 'border-color .15s, transform .15s' }}>
                <div style={{ fontSize: 17, color: '#151515', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>{item.title}<span style={{ color: '#f26316' }}>→</span></div>
                <p style={{ fontSize: 13, color: 'rgba(20,20,20,0.66)', lineHeight: 1.6 }}>{item.text}</p>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bullets.map((item, index) => (
              <div key={`${item}-${index}`} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '12px 0', borderTop: '1px solid rgba(20,20,20,0.08)' }}>
                <span style={{ color: '#f26316', fontWeight: 700, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 13, color: 'rgba(20,20,20,0.72)', lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 gap-4">
            <div style={{ position: 'relative', minHeight: 340, background: '#111', overflow: 'hidden' }}>
              <Image src={photos[0].src} alt={photos[0].alt} fill sizes="(max-width: 1024px) 100vw, 42vw" style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.6) 100%)' }} />
              <div style={{ position: 'absolute', left: 18, right: 18, bottom: 18, display: 'flex', justifyContent: 'space-between', gap: 18, alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.78)', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>Atelier NES</div>
                  <div style={{ fontSize: 28, color: '#fff', fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.03em', maxWidth: 340 }}>
                    Plus clair qu&apos;un simple catalogue.
                  </div>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.78)', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Maroc 24–48h
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div style={{ background: '#fff', border: '1px solid rgba(20,20,20,0.08)', padding: 18 }}>
                <div style={{ fontSize: 10, color: '#f26316', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>Preuve NES</div>
                <div style={{ fontSize: 28, color: '#151515', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 6 }}>2 000+</div>
                <div style={{ fontSize: 13, color: 'rgba(20,20,20,0.66)', lineHeight: 1.55 }}>ateliers lancés ou accompagnés au Maroc</div>
              </div>
              <div style={{ background: '#fff', border: '1px solid rgba(20,20,20,0.08)', padding: 18 }}>
                <div style={{ fontSize: 10, color: '#f26316', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>Réponse rapide</div>
                <div style={{ fontSize: 28, color: '#151515', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 6 }}>WhatsApp</div>
                <div style={{ fontSize: 13, color: 'rgba(20,20,20,0.66)', lineHeight: 1.55 }}>orientation, devis et suivi plus simples</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
