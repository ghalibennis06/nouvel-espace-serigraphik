import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const [
    { count: totalLeads },
    { count: newLeads },
    { count: totalProducts },
  ] = await Promise.all([
    supabase.from('nes_leads').select('*', { count: 'exact', head: true }),
    supabase.from('nes_leads').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('nes_products').select('*', { count: 'exact', head: true }),
  ])

  const { data: recentLeads } = await supabase
    .from('nes_leads')
    .select('id, name, phone, message, status, created_at, priority, next_follow_up_at, segment, assignee, last_contact_at, quote_status')
    .order('created_at', { ascending: false })
    .limit(8)

  const overdueLeads = (recentLeads ?? []).filter((lead) => lead.next_follow_up_at && new Date(lead.next_follow_up_at).getTime() < Date.now() && !['won', 'closed', 'lost', 'spam'].includes(lead.status)).length
  const unassignedLeads = (recentLeads ?? []).filter((lead) => !lead.assignee).length
  const quoteQueue = (recentLeads ?? []).filter((lead) => ['needed', 'drafting', 'sent'].includes(lead.quote_status ?? 'none')).length

  const stats = [
    { label: 'Demandes totales', value: totalLeads ?? 0, color: 'var(--blue)', href: '/admin/leads' },
    { label: 'Nouvelles demandes', value: newLeads ?? 0, color: 'var(--orange)', href: '/admin/leads' },
    { label: 'Suivis en retard', value: overdueLeads, color: '#ef4444', href: '/admin/leads' },
    { label: 'Sans owner', value: unassignedLeads, color: '#7c3aed', href: '/admin/leads' },
    { label: 'Queue devis', value: quoteQueue, color: 'var(--teal)', href: '/admin/leads' },
    { label: 'Produits en base', value: totalProducts ?? 0, color: 'var(--teal)', href: '/admin/produits' },
  ]

  return (
    <div>
      <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 32, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
        Dashboard
      </h1>
      <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 32 }}>
        Vue d&apos;ensemble — Nouvel Espace Sérigraphik
      </p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 18, marginBottom: 36 }}>
        {stats.map(s => (
          <Link key={s.label} href={s.href} style={{ textDecoration: 'none' }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 24px', transition: 'border-color .2s' }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: s.color, fontFamily: '"Cormorant Garamond",Georgia,serif' }}>
                {s.value}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 4 }}>{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent leads */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Demandes récentes</span>
          <Link href="/admin/leads" style={{ fontSize: 12, color: 'var(--blue)', textDecoration: 'none' }}>Voir tout →</Link>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface)' }}>
              {['Nom', 'Segment', 'Priorité', 'Statut', 'Suivi', 'Owner', 'Date'].map(h => (
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
                    background: lead.status === 'new' ? 'rgba(79,110,247,0.15)' : lead.status === 'quoted' ? 'rgba(251,146,60,0.15)' : 'rgba(255,255,255,0.07)',
                    color: lead.status === 'new' ? 'var(--blue)' : lead.status === 'quoted' ? 'var(--orange)' : 'var(--text2)',
                  }}>
                    {lead.status}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: lead.next_follow_up_at && new Date(lead.next_follow_up_at).getTime() < Date.now() ? '#ef4444' : 'var(--text2)' }}>
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
