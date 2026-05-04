'use client'

import Link from 'next/link'
import { whatsappGeneralLink } from '@/lib/utils'

const DECISION_LANES: Array<{
  title: string
  text: string
  cta: string
  href: (locale: string) => string
  tone: string
  external?: boolean
}> = [
  {
    title: 'Je veux démarrer vite',
    text: 'Choisissez un kit cohérent pour lancer vos premières ventes sans perdre du temps entre dix références dispersées.',
    cta: 'Voir les kits',
    href: (locale: string) => `/${locale}/kits`,
    tone: 'rgba(255,255,255,0.14)',
  },
  {
    title: "J'ai besoin d'un devis atelier",
    text: 'Si vous équipez un vrai atelier ou comparez plusieurs machines, NES peut cadrer une configuration plus sérieuse.',
    cta: 'Demander un devis pro',
    href: (locale: string) => `/${locale}/devis-pro`,
    tone: 'rgba(255,255,255,0.08)',
  },
  {
    title: 'Je préfère parler directement',
    text: 'WhatsApp reste le chemin le plus rapide si vous voulez valider une technique, un budget ou un réassort.',
    cta: 'Parler à NES sur WhatsApp',
    href: () => whatsappGeneralLink("Bonjour NES, je veux lancer ou développer mon atelier et j'ai besoin d'aide pour choisir."),
    external: true,
    tone: 'rgba(242,99,22,0.16)',
  },
] as const

const CLOSING_SIGNALS = [
  'Kits de départ pour premiers budgets',
  'Devis atelier pour besoins plus sérieux',
  'WhatsApp rapide pour arbitrer sans perdre de temps',
]

export default function ClosingDecisionStation({ locale }: { locale: string }) {
  return (
    <section style={{ background: '#0A0A0F', padding: '92px 5%', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -120, right: -100, width: 340, height: 340, borderRadius: 999, background: 'radial-gradient(circle, rgba(242,99,22,0.20) 0%, rgba(242,99,22,0.08) 42%, rgba(242,99,22,0) 74%)', filter: 'blur(18px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -160, left: -90, width: 320, height: 320, borderRadius: 999, background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 42%, rgba(255,255,255,0) 76%)', filter: 'blur(20px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.02fr 0.98fr', gap: 24, alignItems: 'start' }} className="grid lg:grid-cols-2 gap-6">
          <div style={{ paddingRight: 10 }}>
            <span style={{ display: 'inline-flex', padding: '7px 12px', borderRadius: 999, background: 'rgba(242,99,22,0.12)', border: '1px solid rgba(242,99,22,0.20)', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ffb58c', marginBottom: 18 }}>
              Dernière étape utile
            </span>
            <h2 style={{ fontSize: 'clamp(34px,4.4vw,58px)', fontWeight: 950, color: '#fff4ed', letterSpacing: '-0.04em', lineHeight: 1.04, marginBottom: 16 }}>
              Ne terminez pas la visite avec plus de flou.
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,244,237,0.74)', lineHeight: 1.8, maxWidth: 620, marginBottom: 22 }}>
              Si vous êtes arrivé jusqu'ici, le bon prochain pas n'est pas de rouvrir vingt onglets. C'est de choisir votre chemin de décision, selon votre vrai niveau de besoin.
            </p>

            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 24, padding: '18px 18px 16px', maxWidth: 650 }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ff9f6a', marginBottom: 10 }}>
                Ce que NES clarifie ici
              </div>
              <div style={{ display: 'grid', gap: 10 }}>
                {CLOSING_SIGNALS.map((item) => (
                  <div key={item} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'rgba(255,244,237,0.82)', lineHeight: 1.65 }}>
                    <span style={{ color: '#f26316', fontWeight: 900, flexShrink: 0 }}>•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 14 }}>
            {DECISION_LANES.map((lane) => {
              const content = (
                <div style={{ borderRadius: 24, border: '1px solid rgba(255,255,255,0.10)', background: lane.tone, padding: 22, boxShadow: '0 20px 60px rgba(0,0,0,0.14)', transition: 'transform 0.25s ease, border-color 0.25s ease' }}>
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ff9f6a', marginBottom: 8 }}>
                    Décision NES
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 900, color: '#fffaf6', lineHeight: 1.06, letterSpacing: '-0.02em', marginBottom: 8 }}>
                    {lane.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,244,237,0.72)', lineHeight: 1.72, marginBottom: 16 }}>
                    {lane.text}
                  </p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 20px', borderRadius: 14, background: lane.external ? 'rgba(37,211,102,0.16)' : 'rgba(255,255,255,0.08)', border: lane.external ? '1px solid rgba(37,211,102,0.30)' : '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: 13, fontWeight: 800 }}>
                    {lane.cta} →
                  </div>
                </div>
              )

              if (lane.external) {
                return (
                  <a key={lane.title} href={lane.href(locale)} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }} className="closing-lane">
                    {content}
                  </a>
                )
              }

              return (
                <Link key={lane.title} href={lane.href(locale)} style={{ textDecoration: 'none' }} className="closing-lane">
                  {content}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .closing-lane:hover > div {
          transform: translateY(-4px);
          border-color: rgba(242,99,22,0.28);
        }
      `}</style>
    </section>
  )
}
