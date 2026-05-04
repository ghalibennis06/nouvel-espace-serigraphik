'use client'

import Link from 'next/link'
import { whatsappGeneralLink } from '@/lib/utils'

type BuyerPathSectionProps = {
  locale: string
}

const PATHS = [
  {
    title: 'Je veux démarrer',
    eyebrow: 'Débutant · premier budget',
    description:
      'Vous voulez lancer une activité de personnalisation, choisir le bon pack et éviter un mauvais premier achat.',
    bullets: ['Packs prêts à démarrer', 'Budget clair', 'Conseil rapide WhatsApp'],
    ctaLabel: 'Voir les kits',
    href: (locale: string) => `/${locale}/kits`,
    proof: "Idéal si vous partez de zéro et avez besoin d'un cadre simple pour choisir.",
  },
  {
    title: 'Je veux équiper mon atelier',
    eyebrow: 'Atelier · production · upgrade',
    description:
      'Vous cherchez une presse, une machine ou une configuration plus sérieuse pour produire mieux et plus vite.',
    bullets: ['Machines pro', 'Formats atelier', 'Demande de devis'],
    ctaLabel: 'Voir les machines',
    href: (locale: string) => `/${locale}/categorie-produit`,
    proof: 'Pensé pour les ateliers qui doivent comparer capacité, budget et rendement réel.',
  },
  {
    title: 'Je veux me réapprovisionner',
    eyebrow: 'Consommables · réassort rapide',
    description:
      'Vous connaissez déjà votre métier et vous avez besoin de retrouver rapidement les bonnes bases, encres, films et accessoires.',
    bullets: ['Consommables classés', 'Marques repérables', 'Commande rapide'],
    ctaLabel: 'Voir les consommables',
    href: (locale: string) => `/${locale}/categorie-produit/les-consommables-de-serigraphie`,
    proof: 'Fait pour aller vite quand votre atelier tourne déjà et que le temps compte.',
  },
] as const

export default function BuyerPathSection({ locale }: BuyerPathSectionProps) {
  return (
    <section style={{ background: 'var(--surface)', padding: '80px 5%', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ maxWidth: 760, marginBottom: 28 }}>
          <span className="stag">Choisissez votre point de départ</span>
          <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            NES vous aide à acheter selon votre vrai besoin, pas au hasard.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.7, marginTop: 12, maxWidth: 680 }}>
            Que vous soyez au début, en train d'équiper un atelier, ou simplement en réassort, vous arrivez plus vite vers le bon choix.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 18 }} className="grid md:grid-cols-3 gap-5">
          {PATHS.map((path) => (
            <div
              key={path.title}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 18,
                padding: 24,
                boxShadow: 'var(--shadow)',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              <div>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 10 }}>
                  {path.eyebrow}
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  {path.title}
                </h3>
              </div>

              <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.65 }}>
                {path.description}
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, margin: 0, padding: 0 }}>
                {path.bullets.map((bullet) => (
                  <li key={bullet} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text)' }}>
                    <span style={{ color: 'var(--green)', fontWeight: 800 }}>✓</span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 14px' }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 6 }}>Ce parcours vous aide si…</div>
                <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>{path.proof}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto' }}>
                <Link href={path.href(locale)} className="btn-orange" style={{ justifyContent: 'center', padding: '14px 20px', fontSize: 14, fontWeight: 700 }}>
                  {path.ctaLabel} →
                </Link>
                <a
                  href={whatsappGeneralLink(`Bonjour NES, ${path.title.toLowerCase()} et j'ai besoin d'aide pour choisir.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ justifyContent: 'center', padding: '14px 20px', fontSize: 13, fontWeight: 700 }}
                >
                  Demander conseil sur WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
