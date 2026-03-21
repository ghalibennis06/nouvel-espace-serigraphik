'use client'
import { useState, FormEvent } from 'react'
import Image from 'next/image'
import { whatsappGeneralLink } from '@/lib/utils'

export default function ContactPage({ params }: { params: { locale: string } }) {
  const phone = process.env.NEXT_PUBLIC_PHONE ?? '+212-522-44-80-90'
  const email = process.env.NEXT_PUBLIC_EMAIL ?? 'contact@nouvelespaceserigraphik.ma'

  const [showForm, setShowForm] = useState(false)
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
      if (res.ok) { setStatus('sent'); setShowForm(false) }
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--card2)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    padding: '11px 14px',
    fontSize: 14,
    color: 'var(--text)',
    fontFamily: 'Outfit, sans-serif',
    outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh' }}>

      {/* ── Hero ── */}
      <div style={{ position: 'relative', height: 320, overflow: 'hidden', background: 'var(--surface)' }}>
        <Image
          src="/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2Fpresse-40x50autoopen.jpg"
          alt="Atelier NES"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 30%', opacity: 0.35 }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, var(--bg) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 6% 40px', maxWidth: 1280, margin: '0 auto' }}>
          <span className="stag" style={{ marginBottom: 10 }}>Showroom Casablanca · Réponse en moins de 2h</span>
          <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(36px,5vw,62px)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.05, margin: 0 }}>
            Parlons de votre <em style={{ color: 'var(--blue)', fontStyle: 'italic' }}>projet</em>
          </h1>
        </div>
      </div>

      {/* ── Action cards ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 6% 64px' }}>

        {/* Success banner */}
        {status === 'sent' && (
          <div style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 12, padding: '18px 24px', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 24 }}>✅</span>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 15 }}>Demande reçue !</div>
              <div style={{ fontSize: 13, color: 'var(--text2)' }}>Notre équipe vous contacte dans les 2 heures.</div>
            </div>
          </div>
        )}

        {/* 3 action cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginBottom: 40 }}>

          {/* WhatsApp — primary */}
          <a
            href={whatsappGeneralLink('Bonjour NES, je souhaite obtenir des informations / un devis.')}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <div style={{ background: 'var(--green)', borderRadius: 18, padding: '36px 28px', textAlign: 'center', cursor: 'pointer', transition: 'transform .2s, box-shadow .2s' }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(34,197,94,.35)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.transform = 'none'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              <div style={{ fontSize: 52, marginBottom: 12 }}>💬</div>
              <div style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
                WhatsApp
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 18 }}>
                Réponse en &lt; 5 minutes
              </div>
              <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: '10px 22px', color: '#fff', fontWeight: 700, fontSize: 13 }}>
                Démarrer la conversation →
              </div>
            </div>
          </a>

          {/* Téléphone */}
          <a href={`tel:${phone}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 18, padding: '36px 28px', textAlign: 'center', height: '100%', boxSizing: 'border-box', cursor: 'pointer', transition: 'transform .2s, border-color .2s' }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--blue)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.transform = 'none'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
              }}
            >
              <div style={{ fontSize: 52, marginBottom: 12 }}>📞</div>
              <div style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
                Téléphone
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--blue)', marginBottom: 6 }}>{phone}</div>
              <div style={{ fontSize: 12, color: 'var(--text2)' }}>Lun–Ven 9h–18h · Sam 9h–14h</div>
            </div>
          </a>

          {/* Formulaire */}
          <div
            onClick={() => setShowForm(v => !v)}
            style={{ background: 'var(--card)', border: `1px solid ${showForm ? 'var(--blue)' : 'var(--border)'}`, borderRadius: 18, padding: '36px 28px', textAlign: 'center', height: '100%', boxSizing: 'border-box', cursor: 'pointer', transition: 'transform .2s, border-color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
          >
            <div style={{ fontSize: 52, marginBottom: 12 }}>📝</div>
            <div style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
              Devis par email
            </div>
            <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 18 }}>
              On vous rappelle dans les 2h
            </div>
            <div style={{ display: 'inline-block', background: 'var(--bluesoft)', borderRadius: 8, padding: '10px 22px', color: 'var(--blue)', fontWeight: 700, fontSize: 13 }}>
              {showForm ? 'Masquer le formulaire ↑' : 'Remplir le formulaire ↓'}
            </div>
          </div>
        </div>

        {/* ── Collapsible form ── */}
        {showForm && (
          <div style={{ background: 'var(--card)', border: '1px solid var(--blue)', borderRadius: 18, padding: '36px 40px', marginBottom: 40 }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 24 }}>
              Demande de devis — nous vous répondons sous 2h
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: 6 }}>Nom *</div>
                  <input name="name" required style={inputStyle} placeholder="Votre nom" />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: 6 }}>Société</div>
                  <input name="company" style={inputStyle} placeholder="Votre société (optionnel)" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: 6 }}>Téléphone *</div>
                  <input name="phone" required type="tel" style={inputStyle} placeholder="+212 6XX XXX XXX" />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: 6 }}>E-mail</div>
                  <input name="email" type="email" style={inputStyle} placeholder="email@example.com" />
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: 6 }}>Votre demande *</div>
                <textarea name="message" required rows={3} style={{ ...inputStyle, resize: 'none' }} placeholder="Ex: Presse 40×50 × 2, encres sublimation, livraison Marrakech…" />
              </div>
              {status === 'error' && (
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#ef4444' }}>
                  Erreur — réessayez ou contactez-nous sur WhatsApp.
                </div>
              )}
              <button type="submit" disabled={status === 'sending'} className="btn-primary" style={{ padding: '13px 0', fontSize: 14, opacity: status === 'sending' ? 0.7 : 1 }}>
                {status === 'sending' ? 'Envoi…' : 'Envoyer la demande →'}
              </button>
            </form>
          </div>
        )}

        {/* ── Info strip ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
          {[
            { icon: '📍', label: 'Showroom', value: 'Casablanca, Maroc' },
            { icon: '🕐', label: 'Horaires',  value: 'Lun–Ven 9h–18h / Sam 9h–14h' },
            { icon: '🚚', label: 'Livraison', value: '24–48h partout au Maroc' },
            { icon: '✉️', label: 'Email',     value: email },
          ].map(item => (
            <div key={item.label} style={{ background: 'var(--card)', padding: '20px 18px' }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
