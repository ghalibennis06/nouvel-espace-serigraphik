'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GLOSS_COLORS } from '@/lib/data/carlas-gloss'

const SWATCHES = GLOSS_COLORS.filter((c) => c.img).slice(0, 8)

const TECHNIQUES = ['Sérigraphie', 'Sublimation', 'DTF', 'Presses à chaud', 'Consommables']

interface DualDoorHeroProps {
  locale: string
  title: string
  subtitle: string
}

export default function DualDoorHero({ locale, title, subtitle }: DualDoorHeroProps) {
  const [hovered, setHovered] = useState<'print' | 'wrap' | null>(null)

  const grow = (door: 'print' | 'wrap') =>
    hovered === null ? 1 : hovered === door ? 1.35 : 0.75

  return (
    <section aria-label="Nos deux métiers" style={{ borderBottom: '1px solid var(--border)' }}>
      {/* Bandeau titre */}
      <div style={{ padding: 'clamp(40px,6vw,72px) 5% clamp(28px,4vw,44px)', maxWidth: 1400, margin: '0 auto' }}>
        <p className="hero-kicker">NES · Grossiste pour les pros · Casablanca depuis 2018</p>
        <h1 className="hero-display">{title}</h1>
        <p style={{ fontSize: 'clamp(14px,1.4vw,17px)', color: 'var(--text2)', lineHeight: 1.7, maxWidth: 640, marginTop: 18 }}>
          {subtitle}
        </p>
      </div>

      {/* Deux portes */}
      <div className="doors" onMouseLeave={() => setHovered(null)}>
        {/* PORTE 01 — IMPRESSION */}
        <Link
          href={`/${locale}/categorie-produit`}
          className="door door-print"
          style={{ flexGrow: grow('print') }}
          onMouseEnter={() => setHovered('print')}
          onFocus={() => setHovered('print')}
        >
          <div className="door-head">
            <span className="door-code">Vous imprimez ?</span>
            <span className="door-code">2 000+ ateliers fournis</span>
          </div>
          <div>
            <div className="door-name">Ateliers d'impression</div>
            <p className="door-desc">
              Machines, consommables et réassort pour ceux qui impriment tous les jours. Prix pro, stock local.
            </p>
            <div className="door-tags">
              {TECHNIQUES.map((t) => (
                <span key={t} className="door-tag">{t}</span>
              ))}
            </div>
          </div>
          <span className="door-cta">Voir le catalogue pro →</span>
        </Link>

        {/* PORTE 02 — COVERING */}
        <Link
          href={`/${locale}/covering`}
          className="door door-wrap"
          style={{ flexGrow: grow('wrap') }}
          onMouseEnter={() => setHovered('wrap')}
          onFocus={() => setHovered('wrap')}
        >
          <div className="door-head">
            <span className="door-code" style={{ color: '#ff9f6a' }}>Vous posez ?</span>
            <span className="door-new">Nouveau</span>
          </div>
          <div>
            <div className="door-name">Garages &amp; poseurs</div>
            <p className="door-desc" style={{ color: 'rgba(221,227,235,0.75)' }}>
              Films Carlas au rouleau — 123 coloris Essential Series Gloss en stock à Casablanca, réassort 24–48h.
            </p>
            <div className="door-swatches" aria-hidden>
              {SWATCHES.map((c) => (
                <span key={c.name} className="door-swatch">
                  <Image src={c.img as string} alt="" fill sizes="72px" style={{ objectFit: 'cover' }} />
                </span>
              ))}
            </div>
          </div>
          <span className="door-cta" style={{ color: '#ffb59a' }}>Prix rouleau &amp; coloris →</span>
        </Link>
      </div>
    </section>
  )
}
