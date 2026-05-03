'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    })
    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Mot de passe incorrect.')
      setLoading(false)
    }
  }

  return (
    <div className="admin-panel" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle radial gradient background */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(75,123,236,0.08) 0%, transparent 70%)' }} />

      <div style={{ position: 'relative', width: 360 }}>
        {/* Logo mark */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 28, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            NES <span style={{ color: 'var(--blue)' }}>Admin</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 6, letterSpacing: '0.04em' }}>Accès réservé à l&apos;équipe</div>
        </div>

        {/* Card */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: 20, padding: '32px 32px 28px', boxShadow: 'var(--shadow-lg)' }}>
          <form onSubmit={handleSubmit}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text2)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
              Mot de passe
            </label>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="••••••••••••"
              required
              autoFocus
              style={{ width: '100%', background: 'var(--card2)', border: '1px solid var(--border2)', borderRadius: 10, padding: '12px 14px', fontSize: 15, color: 'var(--text)', fontFamily: 'Outfit, sans-serif', outline: 'none', boxSizing: 'border-box', marginBottom: 6, letterSpacing: '0.06em' }}
            />
            {error && (
              <div style={{ fontSize: 12, color: '#f87171', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>⚠</span> {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: 8, letterSpacing: '0.02em', transition: 'opacity 0.2s' }}
            >
              {loading ? 'Vérification…' : 'Accéder au tableau de bord'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
