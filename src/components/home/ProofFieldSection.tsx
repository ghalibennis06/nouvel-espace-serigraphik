'use client'

import Link from 'next/link'
import { TestimonialsNES } from '@/components/home/TestimonialsNES'

const FIELD_SIGNALS = [
  {
    code: 'P-01',
    title: 'Ateliers lancés partout au Maroc',
    text: 'NES accompagne des profils très différents, du premier kit jusqu’au vrai atelier qui produit et réassortit régulièrement.',
  },
  {
    code: 'P-02',
    title: 'Réassort qui suit le rythme terrain',
    text: 'Encres, films, papiers, flex et références atelier restent disponibles pour éviter que la production s’arrête.',
  },
  {
    code: 'P-03',
    title: 'Un contact local qui répond',
    text: 'Avant achat, après achat, pour une orientation, un devis ou un blocage technique, NES reste joignable rapidement.',
  },
] as const

const METRICS = [
  { value: '2 000+', label: 'ateliers accompagnés' },
  { value: '24–48h', label: 'livraison Maroc' },
  { value: 'WhatsApp', label: 'canal rapide' },
] as const

export default function ProofFieldSection({ locale }: { locale: string }) {
  return (
    <section style={{ background: '#fbf7f2', padding: 'clamp(46px,7vw,84px) 5%', borderTop: '1px solid rgba(20,20,20,0.08)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[0.98fr_1.02fr] gap-8 lg:gap-10 items-start" style={{ marginBottom: 26 }}>
          <div>
            <div style={{ fontSize: 11, color: '#f26316', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>
              Preuve terrain NES
            </div>
            <h2 style={{ fontSize: 'clamp(24px,2.8vw,36px)', fontWeight: 700, color: '#151515', letterSpacing: '-0.022em', lineHeight: 1.04, marginBottom: 14, maxWidth: 680 }}>
              NES ne vend pas seulement des produits, NES aide les ateliers à tourner.
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(20,20,20,0.68)', lineHeight: 1.8, maxWidth: 620, marginBottom: 22 }}>
              C&apos;est là que la différence se joue. Un bon fournisseur ne s&apos;arrête pas à la première vente. Il aide à choisir, à lancer, à réassortir et à garder un rythme de production viable.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" style={{ marginBottom: 18 }}>
              {METRICS.map((item) => (
                <div key={item.label} style={{ background: '#fff', border: '1px solid rgba(20,20,20,0.08)', padding: '18px 16px' }}>
                  <div style={{ fontSize: 28, color: '#151515', fontWeight: 700, letterSpacing: '-0.022em', lineHeight: 1, marginBottom: 6 }}>{item.value}</div>
                  <div style={{ fontSize: 12, color: 'rgba(20,20,20,0.62)', lineHeight: 1.45 }}>{item.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href={`/${locale}/devis-pro`} className="btn-orange" style={{ padding: '14px 22px', fontSize: 14, fontWeight: 800 }}>
                Demander un devis pro →
              </Link>
              <Link href={`/${locale}/contact`} className="btn-outline" style={{ padding: '14px 20px', fontSize: 14, fontWeight: 800 }}>
                Parler à NES
              </Link>
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid rgba(20,20,20,0.08)', padding: '22px 22px 18px' }}>
            <div style={{ fontSize: 11, color: '#f26316', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
              Ce que cela veut dire concrètement
            </div>
            <div className="grid grid-cols-1 gap-3">
              {FIELD_SIGNALS.map((item) => (
                <div key={item.code} style={{ borderTop: '1px solid rgba(20,20,20,0.08)', paddingTop: 14 }}>
                  <div style={{ fontSize: 10, color: 'rgba(20,20,20,0.48)', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>{item.code}</div>
                  <div style={{ fontSize: 18, color: '#151515', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 7 }}>{item.title}</div>
                  <p style={{ fontSize: 13, color: 'rgba(20,20,20,0.66)', lineHeight: 1.65 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid rgba(20,20,20,0.08)', padding: '10px 22px 22px' }}>
          <div style={{ fontSize: 11, color: '#f26316', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', paddingTop: 14, marginBottom: 4 }}>
            Retours clients
          </div>
          <TestimonialsNES />
        </div>
      </div>
    </section>
  )
}
