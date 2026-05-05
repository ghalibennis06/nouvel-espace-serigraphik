'use client'

import { useState, useEffect } from 'react'
import { X, Check, ArrowRight, Truck, HeadphonesIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type FormStep = 'idle' | 'submitting' | 'success' | 'error'

const REQUEST_TYPES = [
  { value: 'starter', label: 'Je veux démarrer' },
  { value: 'workshop', label: 'Je veux équiper mon atelier' },
  { value: 'restock', label: 'Je veux me réapprovisionner' },
  { value: 'b2b', label: 'Je veux un devis entreprise' },
] as const

export default function DevisExpressButton() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [formStep, setFormStep] = useState<FormStep>('idle')
  const [requestType, setRequestType] = useState<(typeof REQUEST_TYPES)[number]['value']>('starter')

  const handleExpand = () => setIsExpanded(true)

  const handleClose = () => {
    setIsExpanded(false)
    setTimeout(() => setFormStep('idle'), 500)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStep('submitting')
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    fd.get('name'),
          phone:   fd.get('phone'),
          email:   fd.get('email') || undefined,
          message: fd.get('message') || undefined,
          source:  `devis-express:${fd.get('requestType') || 'general'}`,
          website: fd.get('website') ?? '',
        }),
      })
      if (res.ok) setFormStep('success')
      else setFormStep('error')
    } catch {
      setFormStep('error')
    }
  }

  useEffect(() => {
    document.body.style.overflow = isExpanded ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isExpanded])

  return (
    <>
      <AnimatePresence initial={false}>
        {!isExpanded && (
          <motion.div className="inline-block relative">
            {/* expanding background pill */}
            <motion.div
              layout
              layoutId="nes-cta-card"
              style={{ position: 'absolute', inset: 0, background: 'var(--orange)', borderRadius: 100 } as React.CSSProperties}
            />
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ delay: 0.1 }}
              layout={false}
              onClick={handleExpand}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                height: 52,
                padding: '0 28px',
                fontSize: 15,
                fontWeight: 700,
                color: '#fff',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '-0.01em',
              }}
            >
              Devis Express
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Expanded modal ───────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px' }}>

            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
            />

            <motion.div
              layoutId="nes-cta-card"
              transition={{ type: 'spring', bounce: 0, duration: 0.42 }}
              style={{
                position: 'relative',
                borderRadius: 24,
                overflow: 'hidden',
                width: '100%',
                maxWidth: 960,
                maxHeight: '94vh',
                display: 'flex',
                background: '#D94F0A',
              }}
            >
              {/* CSS animated gradient BG */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: 'linear-gradient(135deg, #F26316 0%, #D94F0A 40%, #C2410C 70%, #F59E0B 100%)',
                  backgroundSize: '300% 300%',
                  animation: 'gradientShift 6s ease infinite',
                }}
              />

              {/* Close — sticky-feeling, always reachable on mobile */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleClose}
                style={{
                  position: 'absolute', top: 14, right: 14, zIndex: 20,
                  width: 38, height: 38, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.18)',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', backdropFilter: 'blur(8px)',
                }}
                aria-label="Fermer"
              >
                <X size={18} />
              </motion.button>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.18, duration: 0.35 }}
                style={{ position: 'relative', zIndex: 1, display: 'flex', width: '100%', overflowY: 'auto', flexWrap: 'wrap' }}
              >
                {/* ── Left panel — hidden on mobile to keep the form above the fold ── */}
                <div className="hidden md:flex" style={{ flex: '1 1 280px', padding: '52px 44px', color: '#fff', flexDirection: 'column', gap: 28 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7, marginBottom: 12 }}>
                      Nouvel Espace Sérigraphik
                    </div>
                    <h2 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 12 }}>
                      Lancez votre<br />atelier en 24h.
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.65, opacity: 0.85 }}>
                      Rejoignez 2 000+ entrepreneurs qui ont démarré leur activité d'impression avec NES depuis 2018.
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    {[
                      { Icon: Truck,           title: 'Livraison 24–48h',   desc: 'Partout au Maroc — depuis Casablanca' },
                      { Icon: HeadphonesIcon,  title: 'Conseiller dédié',   desc: 'Nous vous rappelons sous 2h ouvrées' },
                    ].map(({ Icon, title, desc }) => (
                      <div key={title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                        <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 10, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon size={20} color="rgba(255,255,255,0.85)" />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14 }}>{title}</div>
                          <div style={{ fontSize: 13, opacity: 0.75, marginTop: 3, lineHeight: 1.5 }}>{desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Testimonial */}
                  <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                    <p style={{ fontSize: 14, lineHeight: 1.7, fontStyle: 'italic', opacity: 0.9, marginBottom: 16 }}>
                      &ldquo;J&rsquo;ai commandé mon kit sublimation un vendredi soir — livré le samedi matin à Marrakech. Service impeccable.&rdquo;
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#FCD34D,#F59E0B)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: '#7C2D12' }}>
                        KA
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>Karim Alaoui</div>
                        <div style={{ fontSize: 12, opacity: 0.7 }}>Atelier SubliPrint, Marrakech</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Right panel — form (slim padding on mobile) ── */}
                <div className="px-5 py-6 md:p-[52px_44px]" style={{ flex: '1 1 280px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', background: 'rgba(0,0,0,0.15)', backdropFilter: 'blur(8px)' }}>
                  <div style={{ width: '100%', maxWidth: 380, background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.20)', borderRadius: 18, padding: 32, backdropFilter: 'blur(12px)' }}>

                    {formStep === 'success' ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 20, padding: '32px 0' }}
                      >
                        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 32px rgba(22,163,74,0.4)' }}>
                          <Check size={36} color="#fff" />
                        </div>
                        <div>
                          <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Demande reçue !</h3>
                          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                            Un conseiller NES vous contacte sous 2h pour préparer votre devis personnalisé.
                          </p>
                        </div>
                        <button
                          onClick={handleClose}
                          style={{ padding: '10px 22px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
                        >
                          Retour au site
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {/* Honeypot — bots fill it, humans never see it */}
                        <input
                          type="text"
                          name="website"
                          tabIndex={-1}
                          autoComplete="off"
                          aria-hidden="true"
                          style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, opacity: 0 }}
                        />
                        <div>
                          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 4 }}>Devis Express</h3>
                          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Réponse garantie en moins de 2h ouvrées</p>
                        </div>

                        <div>
                          <div style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 8 }}>
                            Votre besoin principal
                          </div>
                          <input type="hidden" name="requestType" value={requestType} />
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {REQUEST_TYPES.map((item) => (
                              <button
                                key={item.value}
                                type="button"
                                onClick={() => setRequestType(item.value)}
                                style={{
                                  padding: '8px 12px',
                                  borderRadius: 999,
                                  border: `1px solid ${requestType === item.value ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.18)'}`,
                                  background: requestType === item.value ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)',
                                  color: '#fff',
                                  fontSize: 12,
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                }}
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {[
                          { id: 'name',    label: 'Nom complet',    type: 'text',  placeholder: 'Mohammed El Amrani',   required: true  },
                          { id: 'phone',   label: 'Téléphone',      type: 'tel',   placeholder: '06 00 00 00 00',        required: true  },
                          { id: 'email',   label: 'Email (optionnel)', type: 'email', placeholder: 'vous@email.ma',     required: false },
                        ].map(f => (
                          <div key={f.id}>
                            <label htmlFor={f.id} style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}>
                              {f.label}
                            </label>
                            <input
                              id={f.id}
                              name={f.id}
                              type={f.type}
                              placeholder={f.placeholder}
                              required={f.required}
                              style={{
                                width: '100%', boxSizing: 'border-box',
                                padding: '11px 14px', borderRadius: 8,
                                background: 'rgba(0,0,0,0.25)',
                                border: '1px solid rgba(255,255,255,0.20)',
                                color: '#fff', fontSize: 14,
                                outline: 'none', fontFamily: 'Inter, sans-serif',
                              }}
                            />
                          </div>
                        ))}

                        <div>
                          <label htmlFor="message" style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}>
                            Votre besoin
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={3}
                            placeholder={requestType === 'starter' ? 'Ex: je veux démarrer avec quel kit et quel budget ?' : requestType === 'workshop' ? 'Ex: je veux équiper mon atelier avec une presse ou une machine plus adaptée...' : requestType === 'restock' ? 'Ex: je cherche un réassort rapide en encres, films, bases ou supports...' : 'Ex: nous voulons un devis sur volume avec livraison et facturation pro...'}
                            style={{
                              width: '100%', boxSizing: 'border-box',
                              padding: '11px 14px', borderRadius: 8,
                              background: 'rgba(0,0,0,0.25)',
                              border: '1px solid rgba(255,255,255,0.20)',
                              color: '#fff', fontSize: 14, resize: 'vertical',
                              outline: 'none', fontFamily: 'Inter, sans-serif',
                            }}
                          />
                        </div>

                        {formStep === 'error' && (
                          <p style={{ fontSize: 13, color: '#FCA5A5', textAlign: 'center' }}>Une erreur est survenue — réessayez.</p>
                        )}

                        <button
                          type="submit"
                          disabled={formStep === 'submitting'}
                          style={{
                            width: '100%', padding: '13px', borderRadius: 9,
                            background: '#fff', border: 'none',
                            color: 'var(--orange)', fontSize: 14, fontWeight: 800,
                            fontFamily: 'Inter, sans-serif', cursor: formStep === 'submitting' ? 'not-allowed' : 'pointer',
                            opacity: formStep === 'submitting' ? 0.7 : 1,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                          }}
                        >
                          {formStep === 'submitting' ? (
                            <>
                              <span style={{ width: 16, height: 16, border: '2px solid var(--orange)', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                              Envoi en cours…
                            </>
                          ) : 'Envoyer ma demande →'}
                        </button>

                        <p style={{ fontSize: 11, textAlign: 'center', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
                          Vos données restent confidentielles et ne sont jamais partagées.
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
