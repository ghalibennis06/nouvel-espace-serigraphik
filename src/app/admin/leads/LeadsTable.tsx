'use client'
import { useMemo, useState } from 'react'

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
  source?: string | null
  segment?: string | null
  request_type?: string | null
  priority?: string | null
  assignee?: string | null
  next_follow_up_at?: string | null
  city?: string | null
  category_interest?: string | null
  product_interest?: string | null
  budget_range?: string | null
  quote_status?: string | null
  quote_amount?: string | null
  last_contact_at?: string | null
  result_reason?: string | null
}

const STATUS_OPTIONS = ['new', 'qualified', 'contacted', 'quoted', 'won', 'lost', 'closed', 'spam']
const PRIORITY_OPTIONS = ['low', 'normal', 'high', 'urgent']
const QUOTE_OPTIONS = ['none', 'needed', 'drafting', 'sent', 'won', 'lost']

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  new: { bg: 'rgba(79,110,247,0.15)', color: 'var(--blue)' },
  qualified: { bg: 'rgba(124,58,237,0.15)', color: '#7c3aed' },
  contacted: { bg: 'rgba(45,212,191,0.15)', color: 'var(--teal)' },
  quoted: { bg: 'rgba(251,146,60,0.15)', color: 'var(--orange)' },
  won: { bg: 'rgba(34,197,94,0.15)', color: '#16a34a' },
  lost: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444' },
  closed: { bg: 'rgba(255,255,255,0.07)', color: 'var(--text2)' },
  spam: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444' },
}

const PRIORITY_COLORS: Record<string, { bg: string; color: string }> = {
  low: { bg: 'rgba(255,255,255,0.08)', color: 'var(--text2)' },
  normal: { bg: 'rgba(79,110,247,0.12)', color: 'var(--blue)' },
  high: { bg: 'rgba(251,146,60,0.15)', color: 'var(--orange)' },
  urgent: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444' },
}

const QUOTE_COLORS: Record<string, { bg: string; color: string }> = {
  none: { bg: 'rgba(255,255,255,0.08)', color: 'var(--text2)' },
  needed: { bg: 'rgba(79,110,247,0.12)', color: 'var(--blue)' },
  drafting: { bg: 'rgba(124,58,237,0.15)', color: '#7c3aed' },
  sent: { bg: 'rgba(251,146,60,0.15)', color: 'var(--orange)' },
  won: { bg: 'rgba(34,197,94,0.15)', color: '#16a34a' },
  lost: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444' },
}

async function updateLead(id: string, payload: Record<string, string | null>) {
  await fetch('/api/leads/status', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...payload }),
  })
}

function isOverdue(date?: string | null) {
  if (!date) return false
  return new Date(date).getTime() < Date.now()
}

export default function LeadsTable({ leads: initial }: { leads: Lead[] }) {
  const [leads, setLeads] = useState(initial)
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [savingId, setSavingId] = useState<string | null>(null)

  const counts = useMemo(() => ({
    all: leads.length,
    overdue: leads.filter((lead) => isOverdue(lead.next_follow_up_at) && !['won', 'closed', 'lost', 'spam'].includes(lead.status)).length,
    today: leads.filter((lead) => !!lead.next_follow_up_at && new Date(lead.next_follow_up_at).toDateString() === new Date().toDateString()).length,
    quoted: leads.filter((lead) => lead.status === 'quoted' || lead.quote_status === 'sent').length,
    quoteQueue: leads.filter((lead) => ['needed', 'drafting', 'sent'].includes(lead.quote_status || 'none')).length,
  }), [leads])

  const visible = useMemo(() => {
    if (filter === 'all') return leads
    if (filter === 'overdue') return leads.filter((lead) => isOverdue(lead.next_follow_up_at) && !['won', 'closed', 'lost', 'spam'].includes(lead.status))
    if (filter === 'today') return leads.filter((lead) => !!lead.next_follow_up_at && new Date(lead.next_follow_up_at).toDateString() === new Date().toDateString())
    if (filter === 'quoteQueue') return leads.filter((lead) => ['needed', 'drafting', 'sent'].includes(lead.quote_status || 'none'))
    return leads.filter((lead) => lead.status === filter)
  }, [filter, leads])

  async function patchLead(id: string, payload: Record<string, string | null>) {
    setSavingId(id)
    await updateLead(id, payload)
    setLeads((prev) => prev.map((lead) => (lead.id === id ? { ...lead, ...payload } : lead)))
    setSavingId(null)
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
        {[
          { key: 'all', label: 'Toutes', count: counts.all },
          { key: 'overdue', label: 'En retard', count: counts.overdue },
          { key: 'today', label: 'À faire aujourd’hui', count: counts.today },
          { key: 'quoteQueue', label: 'Queue devis', count: counts.quoteQueue },
          { key: 'quoted', label: 'Devis envoyés', count: counts.quoted },
          ...STATUS_OPTIONS.map((s) => ({ key: s, label: s, count: leads.filter((l) => l.status === s).length })),
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setFilter(item.key)}
            style={{
              padding: '7px 14px',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'Outfit, sans-serif',
              background: filter === item.key ? 'var(--blue)' : 'transparent',
              color: filter === item.key ? '#fff' : 'var(--text2)',
              border: filter === item.key ? '1px solid var(--blue)' : '1px solid var(--border2)',
            }}
          >
            {item.label} ({item.count})
          </button>
        ))}
      </div>

      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface)' }}>
              {['Lead', 'Segment', 'Priorité', 'Devis', 'Suivi', 'Statut', 'Actions'].map((h) => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text2)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((lead, i) => {
              const sc = STATUS_COLORS[lead.status] ?? STATUS_COLORS.new
              const pc = PRIORITY_COLORS[lead.priority || 'normal'] ?? PRIORITY_COLORS.normal
              const qc = QUOTE_COLORS[lead.quote_status || 'none'] ?? QUOTE_COLORS.none
              const overdue = isOverdue(lead.next_follow_up_at)
              return (
                <>
                  <tr
                    key={lead.id}
                    style={{ borderTop: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--surface)', cursor: 'pointer' }}
                    onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                  >
                    <td style={{ padding: '12px 16px', minWidth: 220 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{lead.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 3 }}>{lead.company || '—'}</div>
                      <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 4 }}>{lead.phone || lead.email || '—'}</div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{lead.segment || lead.request_type || 'general'}</div>
                      <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 4 }}>{lead.source || 'contact'}</div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <select
                        value={lead.priority || 'normal'}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => patchLead(lead.id, { priority: e.target.value })}
                        style={{ padding: '4px 8px', borderRadius: 8, fontSize: 11, fontWeight: 700, background: pc.bg, color: pc.color, border: 'none', cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}
                      >
                        {PRIORITY_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <select
                        value={lead.quote_status || 'none'}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => patchLead(lead.id, { quote_status: e.target.value })}
                        style={{ padding: '4px 8px', borderRadius: 8, fontSize: 11, fontWeight: 700, background: qc.bg, color: qc.color, border: 'none', cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}
                      >
                        {QUOTE_OPTIONS.map((q) => <option key={q} value={q}>{q}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: overdue ? '#ef4444' : 'var(--text)' }}>
                        {lead.next_follow_up_at ? new Date(lead.next_follow_up_at).toLocaleDateString('fr-MA') : 'Non planifié'}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 4 }}>{lead.assignee || 'Non assigné'}</div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <select
                        value={lead.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => patchLead(lead.id, { status: e.target.value })}
                        style={{ padding: '4px 8px', borderRadius: 8, fontSize: 11, fontWeight: 700, background: sc.bg, color: sc.color, border: 'none', cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}
                      >
                        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {lead.phone && (
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour ${lead.name}, suite à votre demande sur NES...`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{ fontSize: 18, textDecoration: 'none' }}
                            title="Répondre via WhatsApp"
                          >
                            💬
                          </a>
                        )}
                        {savingId === lead.id && <span style={{ fontSize: 11, color: 'var(--text2)' }}>Enregistrement…</span>}
                      </div>
                    </td>
                  </tr>
                  {expanded === lead.id && (
                    <tr key={`${lead.id}-exp`} style={{ borderTop: 'none', background: 'var(--card2)' }}>
                      <td colSpan={7} style={{ padding: '18px 24px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 18 }} className="grid md:grid-cols-[1.05fr_0.95fr] gap-4">
                          <div>
                            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 14 }}>
                              <strong>Message complet :</strong><br />
                              {lead.message ?? '—'}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10, marginBottom: 12 }} className="grid md:grid-cols-2 gap-3">
                              {[
                                ['Ville', lead.city || '—'],
                                ['Budget', lead.budget_range || '—'],
                                ['Catégorie', lead.category_interest || '—'],
                                ['Produit', lead.product_interest || '—'],
                              ].map(([label, value]) => (
                                <div key={label} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: 4 }}>{label}</div>
                                  <div style={{ fontSize: 13, color: 'var(--text)' }}>{value}</div>
                                </div>
                              ))}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }} className="grid md:grid-cols-2 gap-3">
                              <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: 4 }}>Montant devis</div>
                                <input
                                  defaultValue={lead.quote_amount || ''}
                                  onClick={(e) => e.stopPropagation()}
                                  onBlur={(e) => patchLead(lead.id, { quote_amount: e.target.value || null })}
                                  placeholder="ex: 12500 MAD"
                                  style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '9px 10px', fontSize: 13, color: 'var(--text)' }}
                                />
                              </div>
                              <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: 4 }}>Dernier contact</div>
                                <input
                                  type="date"
                                  defaultValue={lead.last_contact_at ? new Date(lead.last_contact_at).toISOString().slice(0, 10) : ''}
                                  onClick={(e) => e.stopPropagation()}
                                  onBlur={(e) => patchLead(lead.id, { last_contact_at: e.target.value ? new Date(`${e.target.value}T09:00:00`).toISOString() : null })}
                                  style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '9px 10px', fontSize: 13, color: 'var(--text)' }}
                                />
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'grid', gap: 10 }}>
                            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: 6 }}>Assigné à</div>
                              <input
                                defaultValue={lead.assignee || ''}
                                onClick={(e) => e.stopPropagation()}
                                onBlur={(e) => patchLead(lead.id, { assignee: e.target.value || null })}
                                placeholder="Nom du responsable"
                                style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '9px 10px', fontSize: 13, color: 'var(--text)' }}
                              />
                            </div>
                            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: 6 }}>Prochain suivi</div>
                              <input
                                type="date"
                                defaultValue={lead.next_follow_up_at ? new Date(lead.next_follow_up_at).toISOString().slice(0, 10) : ''}
                                onClick={(e) => e.stopPropagation()}
                                onBlur={(e) => patchLead(lead.id, { next_follow_up_at: e.target.value ? new Date(`${e.target.value}T09:00:00`).toISOString() : null })}
                                style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '9px 10px', fontSize: 13, color: 'var(--text)' }}
                              />
                            </div>
                            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: 6 }}>Raison résultat / blocage</div>
                              <input
                                defaultValue={lead.result_reason || ''}
                                onClick={(e) => e.stopPropagation()}
                                onBlur={(e) => patchLead(lead.id, { result_reason: e.target.value || null })}
                                placeholder="budget, délai, no response…"
                                style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '9px 10px', fontSize: 13, color: 'var(--text)' }}
                              />
                            </div>
                            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: 6 }}>Notes internes</div>
                              <textarea
                                defaultValue={lead.notes || ''}
                                onClick={(e) => e.stopPropagation()}
                                onBlur={(e) => patchLead(lead.id, { notes: e.target.value || null })}
                                placeholder="Résumé, next step, devis, blocage…"
                                rows={5}
                                style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 12px', fontSize: 13, color: 'var(--text)', resize: 'vertical' }}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              )
            })}
            {visible.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: '28px 16px', textAlign: 'center', fontSize: 13, color: 'var(--text2)' }}>
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
