import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const now = Date.now()

  const [
    { count: totalLeads },
    { count: newLeads },
    { count: totalProducts },
    { data: allActive },
  ] = await Promise.all([
    supabase.from('nes_leads').select('*', { count: 'exact', head: true }),
    supabase.from('nes_leads').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('nes_products').select('*', { count: 'exact', head: true }),
    supabase
      .from('nes_leads')
      .select('id, name, phone, email, message, status, created_at, priority, next_follow_up_at, segment, assignee, last_contact_at, quote_status, source')
      .not('status', 'in', '("won","closed","lost","spam")')
      .order('created_at', { ascending: false }),
  ])

  const active = allActive ?? []

  const overdueLeads = active.filter((l) => l.next_follow_up_at && new Date(l.next_follow_up_at).getTime() < now)
  const todayLeads = active.filter((l) => l.next_follow_up_at && new Date(l.next_follow_up_at).toDateString() === new Date().toDateString())
  const unassignedLeads = active.filter((l) => !l.assignee)
  const quoteQueue = active.filter((l) => ['needed', 'drafting'].includes(l.quote_status ?? ''))
  const stale7 = active.filter((l) => {
    const last = l.last_contact_at ? new Date(l.last_contact_at).getTime() : new Date(l.created_at).getTime()
    return last < now - 7 * 86400000
  })

  const { data: recentLeads } = await supabase
    .from('nes_leads')
    .select('id, name, phone, message, status, created_at, priority, next_follow_up_at, segment, assignee, last_contact_at, quote_status')
    .order('created_at', { ascending: false })
    .limit(6)

  const agendaItems = [
    ...overdueLeads.map((l) => ({ ...l, _reason: '🔴 Suivi en retard', _urgency: 3 })),
    ...todayLeads.filter((l) => !overdueLeads.find((o) => o.id === l.id)).map((l) => ({ ...l, _reason: '📅 À faire aujourd\'hui', _urgency: 2 })),
    ...quoteQueue.filter((l) => !overdueLeads.find((o) => o.id === l.id) && !todayLeads.find((t) => t.id === l.id)).map((l) => ({ ...l, _reason: '📋 Devis à préparer', _urgency: 1 })),
  ].sort((a, b) => b._urgency - a._urgency).slice(0, 8)

  const stats = [
    { label: 'Demandes totales', value: totalLeads ?? 0, color: 'var(--blue)', href: '/admin/leads' },
    { label: 'Nouvelles', value: newLeads ?? 0, color: 'var(--orange)', href: '/admin/leads' },
    { label: 'Suivis en retard', value: overdueLeads.length, color: '#ef4444', href: '/admin/leads' },
    { label: 'Sans owner', value: unassignedLeads.length, color: '#7c3aed', href: '/admin/leads' },
    { label: 'Devis en attente', value: quoteQueue.length, color: 'var(--teal)', href: '/admin/leads' },
    { label: 'Stagnants +7j', value: stale7.length, color: 'var(--orange)', href: '/admin/reporting' },
  ]

  return (
    <div>
      <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 32, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
        Dashboard
      </h1>
      <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 28 }}>
        Vue d&apos;ensemble — Nouvel Espace Sérigraphik
      </p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16, marginBottom: 32 }}>
        {stats.map((s) => (
          <Link key={s.label} href={s.href} style={{ textDecoration: 'none' }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 22px', transition: 'border-color .2s' }}>
              <div style={{ fontSize: 34, fontWeight: 800, color: s.color, fontFamily: '"Cormorant Garamond",Georgia,serif', lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 5 }}>{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Agenda du jour */}
      {agendaItems.length > 0 && (
        <div style={{ background: 'var(--card)', border: '1px solid rgba(239,68,68,0.35)', borderRadius: 12, overflow: 'hidden', marginBottom: 28 }}>
          <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#ef4444' }}>
              ⚡ Agenda du jour — {agendaItems.length} action{agendaItems.length > 1 ? 's' : ''} requise{agendaItems.length > 1 ? 's' : ''}
            </span>
            <Link href="/admin/leads" style={{ fontSize: 12, color: 'var(--blue)', textDecoration: 'none' }}>Gérer →</Link>
          </div>
          <div style={{ display: 'grid', gap: 0 }}>
            {agendaItems.map((lead, i) => (
              <div key={lead.id} style={{ padding: '12px 22px', borderTop: i === 0 ? 'none' : '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', minWidth: 160 }}>{lead.name}</div>
                <div style={{ fontSize: 11, padding: '3px 9px', borderRadius: 999, background: 'rgba(239,68,68,0.12)', color: '#ef4444', fontWeight: 700, flexShrink: 0 }}>
                  {lead._reason}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text2)', flex: 1 }}>{lead.segment || lead.source || 'contact'}</div>
                <div style={{ fontSize: 11, color: lead.assignee ? 'var(--text)' : '#7c3aed', fontWeight: 600 }}>
                  {lead.assignee ?? 'non assigné'}
                </div>
                {lead.phone && (
                  <a
                    href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour ${lead.name}, suite à votre demande sur NES...`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 16, textDecoration: 'none' }}
                    title="WhatsApp"
                  >
                    💬
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent leads */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Demandes récentes</span>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Link href="/admin/reporting" style={{ fontSize: 12, color: 'var(--text2)', textDecoration: 'none' }}>Reporting →</Link>
            <Link href="/admin/leads" style={{ fontSize: 12, color: 'var(--blue)', textDecoration: 'none' }}>Voir tout →</Link>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface)' }}>
              {['Nom', 'Segment', 'Priorité', 'Statut', 'Suivi', 'Owner', 'Date'].map((h) => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text2)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(recentLeads ?? []).map((lead, i) => (
              <tr key={lead.id} style={{ borderTop: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{lead.name}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text2)' }}>{lead.segment ?? 'general'}</td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: lead.priority === 'urgent' ? '#ef4444' : lead.priority === 'high' ? 'var(--orange)' : 'var(--text2)', fontWeight: 700 }}>
                  {lead.priority ?? 'normal'}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '2px 9px',
                    borderRadius: 12,
                    fontSize: 11,
                    fontWeight: 700,
                    background: lead.status === 'new' ? 'rgba(79,110,247,0.15)' : lead.status === 'quoted' ? 'rgba(251,146,60,0.15)' : lead.status === 'won' ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.07)',
                    color: lead.status === 'new' ? 'var(--blue)' : lead.status === 'quoted' ? 'var(--orange)' : lead.status === 'won' ? '#16a34a' : 'var(--text2)',
                  }}>
                    {lead.status}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: lead.next_follow_up_at && new Date(lead.next_follow_up_at).getTime() < now ? '#ef4444' : 'var(--text2)' }}>
                  {lead.next_follow_up_at ? new Date(lead.next_follow_up_at).toLocaleDateString('fr-MA') : '—'}
                </td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: lead.assignee ? 'var(--text)' : '#7c3aed', fontWeight: 600 }}>
                  {lead.assignee ?? 'À assigner'}
                </td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text2)' }}>
                  {new Date(lead.created_at).toLocaleDateString('fr-MA')}
                </td>
              </tr>
            ))}
            {(!recentLeads || recentLeads.length === 0) && (
              <tr>
                <td colSpan={7} style={{ padding: '24px 16px', textAlign: 'center', fontSize: 13, color: 'var(--text2)' }}>
                  Aucune demande pour l&apos;instant.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
