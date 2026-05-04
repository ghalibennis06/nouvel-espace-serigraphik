'use client'

import { useState } from 'react'
import Link from 'next/link'
import { whatsappGeneralLink } from '@/lib/utils'
import { PlaceholdersAndVanishInput } from '@/components/ui/vanish-input'
import AnimatedGradient from '@/components/ui/animated-gradient'

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
  const [inputVal, setInputVal] = useState('')

  return (
    <section style={{ background: '#0A0A0F', padding: 'clamp(52px,8vw,92px) 5%', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
      <AnimatedGradient config={{ preset: 'Lava', speed: 18 }} style={{ opacity: 0.22, zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,10,15,0.76) 0%, rgba(10,10,15,0.90) 100%)', pointerEvents: 'none', zIndex: 1 }} />

      <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 3 }}>
        <div style={{ alignItems: 'start' }} className="grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-6">
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

            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ff9f6a', marginBottom: 10 }}>
                Décrivez votre besoin, NES vous répond sur WhatsApp
              </div>
              <PlaceholdersAndVanishInput
                placeholders={[
                  "Je veux lancer un atelier de sublimation...",
                  "J'ai besoin d'une presse à chaud pro...",
                  "Je cherche à me réapprovisionner en encres DTF...",
                  "Je veux comparer DTF vs sérigraphie pour mon budget...",
                  "Je veux équiper mon atelier de A à Z...",
                ]}
                onChange={(e) => setInputVal(e.target.value)}
                onSubmit={() => {
                  if (inputVal.trim()) {
                    window.open(whatsappGeneralLink(inputVal.trim()), '_blank')
                  }
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            {DECISION_LANES.map((lane, idx) => {
              const isWA = lane.external
              const content = (
                <div style={{
                  borderRadius: 20,
                  border: isWA ? '1px solid rgba(37,211,102,0.28)' : '1px solid rgba(255,255,255,0.10)',
                  background: lane.tone,
                  padding: '20px 22px',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.18)',
                  transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: '50%', background: isWA ? 'rgba(37,211,102,0.20)' : 'rgba(255,255,255,0.08)', fontSize: 11, fontWeight: 900, color: isWA ? '#4ade80' : '#ff9f6a', flexShrink: 0 }}>
                        {idx + 1}
                      </span>
                      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: isWA ? '#4ade80' : '#ff9f6a' }}>
                        {isWA ? 'Contact direct' : 'Décision NES'}
                      </div>
                    </div>
                    <h3 style={{ fontSize: 'clamp(17px,2vw,20px)', fontWeight: 800, color: '#fffaf6', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 5 }}>
                      {lane.title}
                    </h3>
                    <p style={{ fontSize: 13, color: 'rgba(255,244,237,0.68)', lineHeight: 1.65, maxWidth: 400 }}>
                      {lane.text}
                    </p>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 18px', borderRadius: 12, background: isWA ? 'rgba(37,211,102,0.18)' : 'rgba(255,255,255,0.08)', border: isWA ? '1px solid rgba(37,211,102,0.32)' : '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: 12, fontWeight: 800, whiteSpace: 'nowrap', flexShrink: 0 }}>
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
