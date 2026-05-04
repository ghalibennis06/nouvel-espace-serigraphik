'use client'

import Link from 'next/link'
import { TestimonialsNES } from '@/components/home/TestimonialsNES'
import { Pointer } from '@/components/ui/pointer'

const FIELD_SIGNALS = [
  {
    label: 'Atelier lancé',
    title: '« On a rentabilisé notre kit sublimation en moins de 3 semaines. »',
    text: 'Atelier textile, Casablanca — kit démarrage sublimation, première commande client livrée en J+5.',
  },
  {
    label: 'Réassort régulier',
    title: 'Les ateliers qui tournent reviennent. En moyenne toutes les 3 à 6 semaines.',
    text: 'Encres, films, papiers de transfert, flex — NES livre toujours ce dont l’atelier a besoin pour produire sans interruption.',
  },
  {
    label: 'Support local',
    title: 'Un vrai interlocuteur au Maroc, pas un chatbot ou un ticket support.',
    text: 'Avant l’achat pour choisir, après l’achat si ça coince. WhatsApp, rappel, ou passage en boutique — NES reste joignable.',
  },
] as const

export default function ProofFieldSection({ locale }: { locale: string }) {
  return (
    <section style={{ background: '#22120b', padding: 'clamp(44px,7vw,84px) 5%', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', alignItems: 'stretch' }} className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6">

        {/* Left — headline proof block (order-2 on mobile, order-1 on desktop) */}
        <div className="order-2 lg:order-1" style={{ position: 'relative', overflow: 'hidden', borderRadius: 28, border: '1px solid rgba(255,255,255,0.10)', background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)', padding: 28, boxShadow: '0 28px 90px rgba(0,0,0,0.20)' }}>
          <div style={{ position: 'absolute', top: -90, right: -40, width: 240, height: 240, borderRadius: 999, background: 'radial-gradient(circle, rgba(242,99,22,0.24) 0%, rgba(242,99,22,0.08) 42%, rgba(242,99,22,0) 74%)', filter: 'blur(16px)', pointerEvents: 'none' }} />

          <span style={{ display: 'inline-flex', padding: '7px 12px', borderRadius: 999, background: 'rgba(242,99,22,0.12)', border: '1px solid rgba(242,99,22,0.24)', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffb58c', marginBottom: 18 }}>
            Ce que les ateliers disent
          </span>

          <h2 style={{ fontSize: 'clamp(30px,3.8vw,48px)', fontWeight: 900, color: '#fff4ed', letterSpacing: '-0.035em', lineHeight: 1.04, marginBottom: 14 }}>
            2 000 ateliers lancés. Des clients qui reviennent chaque mois.
          </h2>

          <p style={{ fontSize: 15, color: 'rgba(255,244,237,0.76)', lineHeight: 1.75, maxWidth: 620, marginBottom: 24 }}>
            Depuis Casablanca, NES livre partout au Maroc sous 24–48h, avec un stock réel et un accompagnement commercial qui ne s&apos;arrête pas à la première commande.
          </p>

          <div className="grid grid-cols-3 gap-3" style={{ position: 'relative' }}>
            <Pointer>
              <div style={{ background: 'rgba(242,99,22,0.18)', borderRadius: 8, padding: '4px 10px', fontSize: 11, fontWeight: 800, color: '#ffb58c', whiteSpace: 'nowrap' }}>
                NES ↗
              </div>
            </Pointer>
            {[
              { val: '2 000+', lbl: 'ateliers livrés' },
              { val: '24–48h', lbl: 'délai moyen' },
              { val: '170+', lbl: 'références stock' },
            ].map((item) => (
              <div key={item.lbl} style={{ borderRadius: 18, border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.05)', padding: '14px 14px 13px', textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#fff4ed', lineHeight: 1 }}>{item.val}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,244,237,0.6)', marginTop: 4 }}>{item.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — testimonials (order-1 on mobile = shows first) */}
        <div className="order-1 lg:order-2" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ borderRadius: 24, border: '1px solid rgba(255,255,255,0.08)', background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)', padding: '8px 24px 24px' }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ff9f6a', marginBottom: 0, paddingTop: 16 }}>
              Ce que les ateliers disent
            </div>
            <TestimonialsNES />
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 2 }}>
            <Link href={`/${locale}/devis-pro`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '14px 20px', borderRadius: 14, background: '#f26316', color: '#fff', fontSize: 14, fontWeight: 800, textDecoration: 'none' }}>
              Demander un devis pro →
            </Link>
            <Link href={`/${locale}/contact`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '14px 20px', borderRadius: 14, background: 'rgba(255,255,255,0.06)', color: '#fff4ed', fontSize: 14, fontWeight: 800, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)' }}>
              Parler à NES
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
