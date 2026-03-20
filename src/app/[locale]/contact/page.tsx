'use client'
import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { whatsappGeneralLink } from '@/lib/utils'

export default function ContactPage({ params }: { params: { locale: string } }) {
  const phone   = process.env.NEXT_PUBLIC_PHONE   ?? '+212-522-44-80-90'
  const email   = process.env.NEXT_PUBLIC_EMAIL    ?? 'contact@nouvelespaceserigraphik.ma'
  const address = process.env.NEXT_PUBLIC_ADDRESS  ?? 'Bd Mohammed V, Casablanca 20250'

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    fd.get('name'),
          company: fd.get('company'),
          phone:   fd.get('phone'),
          email:   fd.get('email'),
          message: fd.get('message'),
          source:  'contact',
        }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--card2)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    padding: '10px 14px',
    fontSize: 14,
    color: 'var(--text)',
    fontFamily: 'Outfit, sans-serif',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--text2)',
    display: 'block',
    marginBottom: 6,
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 6%' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <span className="stag">Réponse en &lt; 2h</span>
        <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(32px,3.5vw,48px)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.1, marginTop: 12, marginBottom: 12 }}>
          Contact & Devis <em style={{ color: 'var(--blue)', fontStyle: 'italic' }}>Professionnel</em>
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text2)', maxWidth: 480, margin: '0 auto' }}>
          Notre équipe est disponible du lundi au samedi, 9h–18h.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2.5rem', alignItems: 'start' }}>

        {/* ── Left: contact info ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: 28 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 22 }}>
              Contactez-nous directement
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { icon: '📞', label: 'Téléphone', value: phone, href: `tel:${phone}` },
                { icon: '✉️', label: 'E-mail',    value: email, href: `mailto:${email}` },
                { icon: '📍', label: 'Adresse',   value: address, href: undefined },
              ].map(({ icon, label, value, href }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ fontSize: 20, lineHeight: 1 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: 2 }}>{label}</div>
                    {href
                      ? <a href={href} style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', textDecoration: 'none' }}>{value}</a>
                      : <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{value}</span>
                    }
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 22, paddingTop: 22, borderTop: '1px solid var(--border)' }}>
              <a
                href={whatsappGeneralLink('Bonjour, je souhaite un devis professionnel.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa-dark"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '11px 0', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none', background: 'var(--green)', color: '#fff' }}
              >
                💬 Démarrer sur WhatsApp
              </a>
            </div>
          </div>

          {/* Horaires */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>Horaires</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['Lundi – Vendredi', '9h – 18h'],
                ['Samedi',           '9h – 14h'],
                ['Dimanche',         'Fermé'],
              ].map(([day, hours]) => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--text2)' }}>{day}</span>
                  <span style={{ fontWeight: 600, color: hours === 'Fermé' ? 'var(--text2)' : 'var(--text)' }}>{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: form ── */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: 32 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 24 }}>Demande de devis</div>

          {status === 'sent' ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>Demande envoyée !</div>
              <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 24 }}>
                Notre équipe vous contactera dans les 2 heures. Vous pouvez aussi nous joindre directement sur WhatsApp.
              </p>
              <a
                href={whatsappGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--green)', color: '#fff', padding: '10px 22px', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}
              >
                💬 Ouvrir WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={labelStyle}>Nom complet *</label>
                  <input name="name" required style={inputStyle} placeholder="Votre nom" />
                </div>
                <div>
                  <label style={labelStyle}>Société</label>
                  <input name="company" style={inputStyle} placeholder="Nom de votre société" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={labelStyle}>Téléphone *</label>
                  <input name="phone" required type="tel" style={inputStyle} placeholder="+212 6XX XXX XXX" />
                </div>
                <div>
                  <label style={labelStyle}>E-mail</label>
                  <input name="email" type="email" style={inputStyle} placeholder="email@example.com" />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Produits & Quantités *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  style={{ ...inputStyle, resize: 'none' }}
                  placeholder="Ex: Cadre aluminium 40×50 × 10 unités, Base aqueuse Antex XP10 × 5…"
                />
              </div>

              {status === 'error' && (
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#ef4444' }}>
                  Une erreur est survenue. Veuillez réessayer ou nous contacter sur WhatsApp.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary"
                style={{ padding: '13px 0', fontSize: 14, opacity: status === 'sending' ? 0.7 : 1 }}
              >
                {status === 'sending' ? 'Envoi en cours…' : 'Envoyer la demande →'}
              </button>
              <p style={{ fontSize: 12, color: 'var(--text2)', textAlign: 'center', margin: 0 }}>
                Ou contactez-nous directement sur WhatsApp pour une réponse plus rapide.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
