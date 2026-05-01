import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { whatsappGeneralLink } from '@/lib/utils'
import { KITS, COMPARISON } from '@/lib/data/kits'

export const metadata: Metadata = {
  title: 'Kits Démarrage Impression Textile — Nouvel Espace Serigraphik',
  description: 'Kits clé-en-main pour lancer votre atelier d\'impression textile au Maroc. Sublimation, sérigraphie, DTF. Livraison 48h, support inclus.',
}

const WA = whatsappGeneralLink
const WA_SVG = (
  <svg style={{ width: 20, height: 20, flexShrink: 0 }} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
  </svg>
)

// KITS and COMPARISON imported from shared data source

const STARTER_STEPS = [
  {
    title: '1. Choisissez votre technique',
    text: 'Sublimation pour démarrer vite, sérigraphie pour le textile régulier, DTF pour plus de polyvalence.',
  },
  {
    title: '2. Validez votre budget réel',
    text: 'Le bon kit est celui que vous pouvez vraiment lancer, utiliser correctement et rentabiliser vite selon votre projet.',
  },
  {
    title: '3. Faites confirmer votre choix',
    text: 'NES doit pouvoir vous orienter avant achat selon vos produits, vos clients visés et votre cadence.',
  },
]

const STARTER_CHECKLIST = [
  'ce que vous voulez vendre en premier',
  'votre budget de départ',
  'si vous visez mugs, textile, ou plusieurs supports',
  'si vous travaillez depuis la maison ou un atelier',
  'si vous avez déjà des clients ou si vous démarrez de zéro',
  'la ville où vous voulez être livré',
]

export default function KitsPage({ params }: { params: { locale: string } }) {
  const { locale } = params
  setRequestLocale(locale)

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '72px 6% 56px' }}>
        <div style={{ maxWidth: 980, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--bluesoft)', border: '1px solid var(--bluesoft2)', borderRadius: 20, padding: '6px 16px', marginBottom: 24 }}>
            <svg style={{ width: 14, height: 14, color: 'var(--blue)' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
            </svg>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--blue)', letterSpacing: '0.08em' }}>KITS CLÉ-EN-MAIN — LIVRAISON 48H</span>
          </div>
          <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.1, marginBottom: 20 }}>
            Choisissez le bon kit pour lancer votre activité,
            <span style={{ color: 'var(--blue)' }}> sans acheter au hasard.</span>
          </h1>
          <p style={{ fontSize: 17, color: 'var(--text2)', lineHeight: 1.7, maxWidth: 720, margin: '0 auto 32px' }}>
            Comprenez avec quel budget démarrer, quelle technique choisir, et quel kit commander selon votre vrai projet au Maroc.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px 28px', marginBottom: 28 }}>
            {['✅ Livraison 48h au Maroc', '✅ Support WhatsApp inclus', '✅ Formation en ligne offerte', '✅ Facture pro + devis'].map(t => (
              <span key={t} style={{ fontSize: 13, color: 'var(--text2)', fontWeight: 500 }}>{t}</span>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14, textAlign: 'left', marginBottom: 18 }} className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: 'Je veux commencer petit',
                text: 'Commencez par la sublimation si vous voulez tester vite avec mugs, cadeaux et textile polyester.',
              },
              {
                title: 'Je veux produire du textile',
                text: 'La sérigraphie est plus adaptée si votre cible est le t-shirt, le sweat et la production plus régulière.',
              },
              {
                title: 'Je veux plus de polyvalence',
                text: 'Le DTF devient le bon choix si vous voulez toucher plus de textiles et monter plus vite en production.',
              },
            ].map((item) => (
              <div key={item.title} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 18, boxShadow: 'var(--shadow)' }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 8 }}>Guide de choix</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{item.text}</p>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 20px', textAlign: 'left', maxWidth: 860, margin: '0 auto' }}>
            <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--orange)', marginBottom: 8 }}>Avant de choisir</div>
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65, marginBottom: 12 }}>
              Si vous hésitez encore, envoyez ces informations à NES et nous pourrons vous orienter plus vite vers le bon kit.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 8 }} className="grid md:grid-cols-2 gap-2">
              {STARTER_CHECKLIST.map((item) => (
                <div key={item} style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--teal)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 6% 12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }} className="grid md:grid-cols-3 gap-4">
          {STARTER_STEPS.map((step) => (
            <div key={step.title} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{step.title}</div>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65 }}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── KITS GRID ─────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 6%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, alignItems: 'stretch' }}>
          {KITS.map(kit => (
            <div
              key={kit.id}
              style={{
                background: 'var(--card)',
                border: `1px solid ${kit.popular ? 'var(--blue)' : 'var(--border)'}`,
                borderRadius: 14,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: kit.popular ? '0 0 40px var(--bluesoft)' : 'none',
              }}
            >
              {/* Popular banner */}
              {kit.popular && (
                <div style={{ background: 'var(--blue)', color: '#fff', fontSize: 12, fontWeight: 800, textAlign: 'center', padding: '10px 16px', letterSpacing: '0.05em' }}>
                  ⭐ LE PLUS POPULAIRE
                </div>
              )}

              <div style={{ padding: '28px 28px 0' }}>
                {/* Header */}
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontSize: 36, display: 'block', marginBottom: 12 }}>{kit.icon}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--blue)', display: 'block', marginBottom: 6 }}>{kit.tag}</span>
                  <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 5, lineHeight: 1.2 }}>{kit.name}</h2>
                  <p style={{ fontSize: 13, color: 'var(--text2)' }}>{kit.subtitle}</p>
                </div>

                {/* Price */}
                <div style={{ paddingBottom: 22, marginBottom: 22, borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
                    <span style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 44, fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>{kit.priceDisplay}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text2)' }}>MAD HT</span>
                    {kit.oldPrice && (
                      <span style={{ fontSize: 14, color: 'var(--text2)', textDecoration: 'line-through' }}>{kit.oldPrice} MAD</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 20 }}>
                    <span style={{ fontSize: 12, color: 'var(--text2)' }}>⏱ <strong style={{ color: 'var(--text)' }}>Setup :</strong> {kit.setupTime}</span>
                    <span style={{ fontSize: 12, color: 'var(--text2)' }}>💰 <strong style={{ color: 'var(--text)' }}>ROI :</strong> {kit.roi}</span>
                  </div>
                  <div style={{ marginTop: 6, fontSize: 12, color: 'var(--text2)' }}>👤 Pour : {kit.target}</div>
                </div>

                {/* Includes */}
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text2)', display: 'block', marginBottom: 14 }}>Ce qui est inclus</span>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                    {kit.includes.map(inc => (
                      <li key={inc.item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <svg style={{ width: 16, height: 16, color: 'var(--teal)', flexShrink: 0, marginTop: 2 }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>{inc.item}</div>
                          <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 1 }}>{inc.detail}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Who it's for */}
              <div style={{ padding: '0 28px 16px' }}>
                <div style={{ padding: '14px', background: 'var(--bluesoft)', border: '1px solid var(--bluesoft2)', borderRadius: 8, marginBottom: 8 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--blue)', marginBottom: 8 }}>Pour qui ?</div>
                  {kit.whoFor.map(w => (
                    <div key={w} style={{ fontSize: 11, color: 'var(--text2)', display: 'flex', gap: 6, marginBottom: 4 }}>
                      <span style={{ color: 'var(--teal)', fontWeight: 700 }}>✓</span>{w}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text2)', fontStyle: 'italic', padding: '8px 0' }}>
                  ⚠ {kit.notFor}
                </div>
              </div>

              {/* CTAs */}
              <div style={{ padding: '0 28px 28px', marginTop: 'auto' }}>
                <a
                  href={WA(kit.ctaMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', padding: '15px', background: 'var(--green)', color: '#fff', borderRadius: 8, fontSize: 15, fontWeight: 700, textDecoration: 'none', marginBottom: 10, boxSizing: 'border-box' }}
                >
                  {WA_SVG}
                  Commander ce kit
                </a>
                <Link
                  href={`/${locale}/contact`}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '11px', border: '1px solid var(--bluesoft2)', color: 'var(--blue)', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
                  className="link-blue"
                >
                  Faire confirmer ce choix par NES
                </Link>

                {/* FAQs */}
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text2)', display: 'block', marginBottom: 14 }}>Questions fréquentes</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {kit.faqs.map(faq => (
                      <div key={faq.q}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>❓ {faq.q}</div>
                        <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>{faq.a}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DECISION HELP ─────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 6% 56px' }}>
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap', alignItems: 'center', marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 6 }}>Besoin d’un raccourci ?</div>
              <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 30, fontWeight: 700, color: 'var(--text)' }}>
                Quel kit choisir selon votre objectif ?
              </h2>
            </div>
            <a
              href={WA('Bonjour NES, je veux lancer mon activité mais je ne sais pas encore quel kit choisir. Pouvez-vous me guider selon mon budget ?')}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 20px', background: 'var(--green)', color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}
            >
              {WA_SVG}
              Être guidé sur WhatsApp
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14 }} className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Petit budget · démarrage rapide', pick: 'Kit Sublimation Starter', why: 'Le plus accessible pour tester un marché, commencer depuis chez soi et vendre des objets personnalisés.' },
              { title: 'Textile et production régulière', pick: 'Kit Sérigraphie Pro', why: 'Le meilleur point d’entrée si vous visez t-shirts, sweats, tote bags et commandes locales récurrentes.' },
              { title: 'Polyvalence et montée en gamme', pick: 'Kit Impression DTF Complet', why: 'Le bon choix si vous voulez imprimer sur plus de supports et monter plus vite en cadence.' },
            ].map((item) => (
              <div key={item.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 18 }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{item.pick}</div>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{item.why}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── COMPARISON TABLE ─────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '64px 6%' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--blue)', display: 'block', marginBottom: 10 }}>Tableau Comparatif</span>
            <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 34, fontWeight: 700, color: 'var(--text)' }}>Comparez les kits en détail</h2>
          </div>

          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid var(--border)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text2)' }}>Caractéristique</th>
                  <th style={{ textAlign: 'center', padding: '16px 20px', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>🖨️ Sublimation<br /><span style={{ color: 'var(--blue)', fontSize: 13 }}>4 400 MAD</span></th>
                  <th style={{ textAlign: 'center', padding: '16px 20px', fontSize: 13, fontWeight: 700, color: 'var(--text)', background: 'var(--bluesoft)', borderLeft: '1px solid var(--bluesoft2)', borderRight: '1px solid var(--bluesoft2)' }}>🎨 Sérigraphie<br /><span style={{ color: 'var(--blue)', fontSize: 13 }}>5 400 MAD</span></th>
                  <th style={{ textAlign: 'center', padding: '16px 20px', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>🚀 DTF<br /><span style={{ color: 'var(--blue)', fontSize: 13 }}>8 400 MAD</span></th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.feature} style={{ borderBottom: '1px solid var(--border)', background: i % 2 !== 0 ? 'var(--border)' : 'transparent' }}>
                    <td style={{ padding: '13px 20px', fontSize: 13, fontWeight: 600, color: 'var(--text2)' }}>{row.feature}</td>
                    <td style={{ padding: '13px 20px', fontSize: 13, textAlign: 'center', color: 'var(--text)' }}>{row.sublimation}</td>
                    <td style={{ padding: '13px 20px', fontSize: 13, textAlign: 'center', color: 'var(--text)', background: 'var(--bluesoft)', borderLeft: '1px solid var(--bluesoft2)', borderRight: '1px solid var(--bluesoft2)', fontWeight: 600 }}>{row.serigraphie}</td>
                    <td style={{ padding: '13px 20px', fontSize: 13, textAlign: 'center', color: 'var(--text)' }}>{row.dtf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <div style={{ padding: '80px 6%', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--greensoft)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--green)' }}>
            {WA_SVG}
          </div>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 36, fontWeight: 700, color: 'var(--text)', marginBottom: 14, lineHeight: 1.2 }}>
            Vous ne savez pas lequel choisir ?
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 32 }}>
            Décrivez votre projet en 2 lignes sur WhatsApp. Nos experts vous répondent
            en moins de 5 minutes et vous recommandent le kit le plus adapté.
          </p>
          <a
            href={WA('Bonjour, j\'hésite entre plusieurs kits et j\'ai besoin de conseils pour choisir celui qui correspond à mon projet.')}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '16px 36px', background: 'var(--green)', color: '#fff', borderRadius: 8, fontSize: 16, fontWeight: 700, textDecoration: 'none', marginBottom: 14 }}
          >
            {WA_SVG}
            Conseils gratuits — réponse en 5 min
          </a>
          <p style={{ fontSize: 13, color: 'var(--text2)' }}>Aucun engagement · 100% gratuit · Lun–Sam 9h–18h</p>
        </div>
      </div>

    </div>
  )
}
