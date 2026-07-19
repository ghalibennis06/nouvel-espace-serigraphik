'use client'
import { useState, FormEvent } from 'react'
import Image from 'next/image'
import { whatsappGeneralLink } from '@/lib/utils'

const CONTACT_INTENTS = [
  { value: 'starter', label: 'Je veux démarrer une activité' },
  { value: 'workshop', label: 'Je veux équiper un atelier' },
  { value: 'restock', label: 'Je veux me réapprovisionner' },
  { value: 'b2b', label: 'Je représente une entreprise / école / association' },
  { value: 'support', label: 'J’ai une question technique / support' },
] as const

const ENTRY_CARDS = [
  {
    code: 'ENT-01',
    value: 'starter',
    title: 'Lancer une activité',
    text: 'Vous cherchez un kit, un budget de départ ou une première orientation technique.',
  },
  {
    code: 'ENT-02',
    value: 'workshop',
    title: 'Équiper un atelier',
    text: 'Vous avez besoin d’une machine, d’une presse ou d’une configuration plus sérieuse.',
  },
  {
    code: 'ENT-03',
    value: 'restock',
    title: 'Réassort rapide',
    text: 'Vous cherchez des consommables, encres, papiers, films, flex ou besoins atelier récurrents.',
  },
  {
    code: 'ENT-04',
    value: 'b2b',
    title: 'Demande professionnelle',
    text: 'Entreprise, école, association, commande en volume ou besoin plus structuré.',
  },
] as const

export default function ContactPage({ params }: { params: { locale: string } }) {
  const phone = process.env.NEXT_PUBLIC_PHONE ?? '+212-522-44-80-90'
  const email = process.env.NEXT_PUBLIC_EMAIL ?? 'contact@nouvelespaceserigraphik.ma'

  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [intent, setIntent] = useState<(typeof CONTACT_INTENTS)[number]['value']>('starter')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          company: fd.get('company'),
          phone: fd.get('phone'),
          email: fd.get('email'),
          message: fd.get('message'),
          source: `contact:${fd.get('intent') || 'general'}`,
          website: fd.get('website') ?? '',
        }),
      })
      if (res.ok) {
        setStatus('sent')
        setShowForm(false)
      } else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(171,137,125,0.18)',
    borderRadius: 0,
    padding: '12px 14px',
    fontSize: 14,
    color: '#dde3eb',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const currentIntentLabel = CONTACT_INTENTS.find((x) => x.value === intent)?.label

  return (
    <div style={{ minHeight: '100vh', background: '#0b1016', color: '#dde3eb' }}>
      <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,181,154,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image
            src="/products/2024_12_presse-40x50autoopen2.png"
            alt="Atelier NES"
            fill
            style={{ objectFit: 'cover', opacity: 0.18 }}
            priority
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(11,16,22,0.46) 0%, rgba(11,16,22,0.92) 100%)' }} />
        </div>

        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '72px 6% 58px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: '1px solid rgba(255,92,0,0.34)', background: 'rgba(255,92,0,0.1)', color: '#ffb59a', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 18 }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: '#ff5c00', display: 'inline-block' }} />
            Contact // Orientation NES
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.04fr_0.96fr] gap-10 lg:gap-14 items-start">
            <div>
              <h1 style={{ fontSize: 'clamp(38px,5vw,72px)', lineHeight: 1.03, letterSpacing: '-0.045em', color: '#f6efe8', fontWeight: 700, marginBottom: 18, maxWidth: 760 }}>
                On vous répond en pro, pas en robot.
              </h1>
              <p style={{ fontSize: 16, color: 'rgba(221,227,235,0.76)', lineHeight: 1.78, maxWidth: 660, marginBottom: 24 }}>
                Dites-nous ce que vous préparez — un lancement, une machine, un réassort, une commande en volume — et vous recevez une vraie réponse : prix, dispo, délai. C'est tout.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ marginBottom: 26 }}>
                {ENTRY_CARDS.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      setIntent(item.value as (typeof CONTACT_INTENTS)[number]['value'])
                      setShowForm(true)
                    }}
                    style={{
                      textAlign: 'left',
                      border: intent === item.value ? '1px solid rgba(255,92,0,0.42)' : '1px solid rgba(171,137,125,0.18)',
                      background: intent === item.value ? 'rgba(255,92,0,0.1)' : 'rgba(255,255,255,0.03)',
                      padding: '16px 14px 15px',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: 10, color: intent === item.value ? '#ff9f6a' : 'rgba(228,190,177,0.62)', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>{item.code}</div>
                    <div style={{ fontSize: 18, color: '#f6efe8', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 7 }}>{item.title}</div>
                    <p style={{ fontSize: 12, color: 'rgba(221,227,235,0.72)', lineHeight: 1.6 }}>{item.text}</p>
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
                <a
                  href={whatsappGeneralLink(
                    intent === 'starter'
                      ? 'Bonjour NES, je veux démarrer une activité et j’ai besoin de votre orientation.'
                      : intent === 'workshop'
                        ? 'Bonjour NES, je veux équiper mon atelier et j’ai besoin d’un conseil ou d’un devis.'
                        : intent === 'restock'
                          ? 'Bonjour NES, je veux me réapprovisionner rapidement en consommables.'
                          : intent === 'b2b'
                            ? 'Bonjour NES, je représente une entreprise, une école ou une association et je souhaite un devis.'
                            : 'Bonjour NES, j’ai une question technique ou besoin de support sur un produit.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '14px 22px', background: '#ff5c00', color: '#521800', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none' }}
                >
                  WhatsApp immédiat
                </a>
                <button
                  type="button"
                  onClick={() => setShowForm((v) => !v)}
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '14px 20px', border: '1px solid rgba(255,181,154,0.2)', background: 'rgba(255,255,255,0.03)', color: '#dde3eb', fontSize: 13, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', cursor: 'pointer' }}
                >
                  {showForm ? 'Masquer le formulaire' : 'Ouvrir le formulaire'}
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 24px' }}>
                {['Réponse rapide', 'Orientation claire', 'Support local', 'Lead mieux qualifié'].map((item) => (
                  <span key={item} style={{ fontSize: 12, color: 'rgba(221,227,235,0.72)', fontWeight: 700 }}>{item}</span>
                ))}
              </div>
            </div>

            <div style={{ border: '1px solid rgba(171,137,125,0.18)', background: 'rgba(255,255,255,0.03)', padding: 20 }}>
              <div style={{ fontSize: 10, color: '#ff9f6a', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>Lignes d’entrée</div>
              <div style={{ display: 'grid', gap: 12 }}>
                {[
                  { label: 'Téléphone', value: phone },
                  { label: 'Email', value: email },
                  { label: 'Canal rapide', value: 'WhatsApp NES' },
                  { label: 'Usage du formulaire', value: 'si la demande est plus structurée' },
                ].map((item, index) => (
                  <div key={item.label} style={{ borderTop: index === 0 ? '1px solid rgba(171,137,125,0.14)' : '1px solid rgba(171,137,125,0.12)', paddingTop: 12 }}>
                    <div style={{ fontSize: 10, color: 'rgba(228,190,177,0.62)', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 5 }}>{item.label}</div>
                    <div style={{ fontSize: 15, color: '#f6efe8', fontWeight: 800 }}>{item.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 18, borderTop: '1px solid rgba(171,137,125,0.14)', paddingTop: 14 }}>
                <div style={{ fontSize: 10, color: '#ff9f6a', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>Conseil NES</div>
                <p style={{ fontSize: 13, color: 'rgba(221,227,235,0.72)', lineHeight: 1.65 }}>
                  Si votre besoin est urgent, commencez par WhatsApp. Si votre demande demande plus de contexte, laissez-la dans le formulaire avec l&apos;intent, la ville et le besoin précis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '34px 6% 64px' }}>
        {status === 'sent' && (
          <div style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.26)', padding: '16px 18px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 22 }}>✅</span>
            <div>
              <div style={{ fontWeight: 800, color: '#f6efe8', fontSize: 15 }}>Demande reçue</div>
              <div style={{ fontSize: 13, color: 'rgba(221,227,235,0.72)' }}>NES vous recontacte avec une réponse plus utile parce que le besoin est déjà mieux cadré.</div>
            </div>
          </div>
        )}

        {showForm && (
          <div style={{ border: '1px solid rgba(255,92,0,0.36)', background: 'rgba(255,255,255,0.03)', padding: '28px 28px 24px', marginBottom: 30 }}>
            <div style={{ fontSize: 10, color: '#ff9f6a', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>Formulaire NES</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#f6efe8', letterSpacing: '-0.02em', marginBottom: 8 }}>Demande orientée : {currentIntentLabel}</div>
            <div style={{ fontSize: 13, color: 'rgba(221,227,235,0.72)', lineHeight: 1.65, marginBottom: 20 }}>
              Décrivez le besoin de manière concrète, pour que NES réponde avec une vraie orientation exploitable.
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input type="hidden" name="intent" value={intent} />
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, opacity: 0 }}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 14 }}>
                <div>
                  <div style={{ fontSize: 10, color: 'rgba(228,190,177,0.62)', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>Nom *</div>
                  <input name="name" required style={inputStyle} placeholder="Votre nom" />
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'rgba(228,190,177,0.62)', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>Société</div>
                  <input name="company" style={inputStyle} placeholder="Votre société (optionnel)" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 14 }}>
                <div>
                  <div style={{ fontSize: 10, color: 'rgba(228,190,177,0.62)', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>Téléphone *</div>
                  <input name="phone" required type="tel" style={inputStyle} placeholder="+212 6XX XXX XXX" />
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'rgba(228,190,177,0.62)', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>Email</div>
                  <input name="email" type="email" style={inputStyle} placeholder="email@example.com" />
                </div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: 'rgba(228,190,177,0.62)', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>Demande *</div>
                <textarea
                  name="message"
                  required
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  placeholder={
                    intent === 'starter'
                      ? 'Ex: je veux démarrer une activité mugs ou textile, quel kit et quel budget me conseillez-vous ?'
                      : intent === 'workshop'
                        ? 'Ex: je veux équiper mon atelier avec une presse ou une machine adaptée à ma cadence.'
                        : intent === 'restock'
                          ? 'Ex: je cherche un réassort urgent en encres, papiers, films ou flex.'
                          : intent === 'b2b'
                            ? 'Ex: nous sommes une entreprise / école / association et nous avons besoin d’un devis sur quantité et délai.'
                            : 'Ex: j’ai une question technique sur une machine, un consommable ou un besoin de support.'
                  }
                />
              </div>
              {status === 'error' && (
                <div style={{ border: '1px solid rgba(255,92,0,0.28)', background: 'rgba(255,92,0,0.08)', padding: '10px 12px', fontSize: 13, color: '#ffb59a' }}>
                  La demande n&apos;a pas pu être envoyée correctement. Réessayez ou passez par WhatsApp.
                </div>
              )}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{ padding: '14px 22px', background: '#ff5c00', color: '#521800', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
                >
                  {status === 'sending' ? 'Envoi...' : 'Envoyer la demande'}
                </button>
                <span style={{ fontSize: 12, color: 'rgba(221,227,235,0.66)' }}>Ouverture plus rapide possible via WhatsApp si le besoin est urgent.</span>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              code: 'INFO-01',
              title: 'Mieux qualifier les leads',
              text: 'Le contact ne doit plus être une boîte générique. Il doit orienter le besoin avant qu’il arrive côté NES.',
            },
            {
              code: 'INFO-02',
              title: 'Réduire le bruit',
              text: 'Plus l’intent est clair, moins NES perd du temps à reformuler des demandes floues.',
            },
            {
              code: 'INFO-03',
              title: 'Créer une vraie suite admin',
              text: 'Cette logique d’intent prépare mieux le passage vers les files de leads et les workflows internes.',
            },
          ].map((item) => (
            <div key={item.code} style={{ border: '1px solid rgba(171,137,125,0.18)', background: 'rgba(255,255,255,0.03)', padding: 18 }}>
              <div style={{ fontSize: 10, color: '#ff9f6a', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>{item.code}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#f6efe8', marginBottom: 8 }}>{item.title}</div>
              <p style={{ fontSize: 12, color: 'rgba(221,227,235,0.72)', lineHeight: 1.65 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
