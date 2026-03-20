'use client'
import { useState } from 'react'
import { whatsappProductLink } from '@/lib/utils'

type Lead = {
  id: string
  name: string
  company: string | null
  phone: string | null
  email: string | null
  message: string | null
  status: string
  notes: string | null
  created_at: string
}

const STATUS_OPTIONS = ['new', 'contacted', 'quoted', 'closed', 'spam']

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  new:       { bg: 'rgba(79,110,247,0.15)',  color: 'var(--blue)' },
  contacted: { bg: 'rgba(45,212,191,0.15)',  color: 'var(--teal)' },
  quoted:    { bg: 'rgba(251,146,60,0.15)',  color: 'var(--orange)' },
  closed:    { bg: 'rgba(255,255,255,0.07)', color: 'var(--text2)' },
  spam:      { bg: 'rgba(239,68,68,0.15)',   color: '#ef4444' },
}

async function updateStatus(id: string, status: string) {
  await fetch('/api/leads/status', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, status }),
  })
}

export default function LeadsTable({ leads: initial }: { leads: Lead[] }) {
  const [leads, setLeads] = useState(initial)
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const visible = filter === 'all' ? leads : leads.filter(l => l.status === filter)

  async function changeStatus(id: string, status: string) {
    await updateStatus(id, status)
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
  }

  return (
    <div>
      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {['all', ...STATUS_OPTIONS].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'Outfit, sans-serif',
              background: filter === s ? 'var(--blue)' : 'transparent',
              color:      filter === s ? '#fff' : 'var(--text2)',
              border:     filter === s ? '1px solid var(--blue)' : '1px solid var(--border2)',
            }}
          >
            {s === 'all' ? 'Toutes' : s} ({s === 'all' ? leads.length : leads.filter(l => l.status === s).length})
          </button>
        ))}
      </div>

      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface)' }}>
              {['Nom / Société', 'Contact', 'Message', 'Statut', 'Date', 'Actions'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text2)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((lead, i) => {
              const sc = STATUS_COLORS[lead.status] ?? STATUS_COLORS.new
              return (
                <>
                  <tr
                    key={lead.id}
                    style={{ borderTop: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--surface)', cursor: 'pointer' }}
                    onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                  >
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{lead.name}</div>
                      {lead.company && <div style={{ fontSize: 11, color: 'var(--text2)' }}>{lead.company}</div>}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text2)' }}>
                      {lead.phone && <div>{lead.phone}</div>}
                      {lead.email && <div style={{ fontSize: 12 }}>{lead.email}</div>}
                    </td>
                    <td style={{ padding: '12px 16px', maxWidth: 220 }}>
                      <span style={{ fontSize: 12, color: 'var(--text2)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {lead.message ?? '—'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <select
                        value={lead.status}
                        onClick={e => e.stopPropagation()}
                        onChange={e => changeStatus(lead.id, e.target.value)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: 8,
                          fontSize: 11,
                          fontWeight: 700,
                          background: sc.bg,
                          color: sc.color,
                          border: 'none',
                          cursor: 'pointer',
                          fontFamily: 'Outfit, sans-serif',
                        }}
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text2)', whiteSpace: 'nowrap' }}>
                      {new Date(lead.created_at).toLocaleDateString('fr-MA')}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      {lead.phone && (
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour ${lead.name}, suite à votre demande sur NES...`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          style={{ fontSize: 18, textDecoration: 'none' }}
                          title="Répondre via WhatsApp"
                        >
                          💬
                        </a>
                      )}
                    </td>
                  </tr>
                  {expanded === lead.id && (
                    <tr key={`${lead.id}-exp`} style={{ borderTop: 'none', background: 'var(--card2)' }}>
                      <td colSpan={6} style={{ padding: '16px 24px' }}>
                        <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>
                          <strong>Message complet :</strong><br />
                          {lead.message ?? '—'}
                        </div>
                        {lead.notes && (
                          <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 8 }}>
                            <strong>Notes :</strong> {lead.notes}
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              )
            })}
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '28px 16px', textAlign: 'center', fontSize: 13, color: 'var(--text2)' }}>
                  Aucune demande pour ce filtre.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
