import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

type Lead = {
  id: string
  status: string
  priority: string | null
  source: string | null
  segment: string | null
  request_type: string | null
  category_interest: string | null
  product_interest: string | null
  quote_status: string | null
  quote_amount: string | null
  assignee: string | null
  next_follow_up_at: string | null
  last_contact_at: string | null
  created_at: string
}

function groupBy<T>(arr: T[], key: (item: T) => string): Record<string, T[]> {
  const result: Record<string, T[]> = {}
  for (const item of arr) {
    const k = key(item) || 'unknown'
    if (!result[k]) result[k] = []
    result[k].push(item)
  }
  return result
}

function sortedEntries(obj: Record<string, unknown[]>): [string, number][] {
  return Object.entries(obj)
    .map(([k, v]) => [k, v.length] as [string, number])
    .sort((a, b) => b[1] - a[1])
}

const STALE_DAYS = 7

export default async function ReportingPage() {
  const { data: leads } = await supabase
    .from('nes_leads')
    .select('id, status, priority, source, segment, request_type, category_interest, product_interest, quote_status, quote_amount, assignee, next_follow_up_at, last_contact_at, created_at')
    .order('created_at', { ascending: false })

  const all: Lead[] = leads ?? []
  const active = all.filter((l) => !['won', 'closed', 'lost', 'spam'].includes(l.status))
  const now = Date.now()
  const staleCutoff = now - STALE_DAYS * 86400000

  const stale = active.filter((l) => {
    const last = l.last_contact_at ? new Date(l.last_contact_at).getTime() : new Date(l.created_at).getTime()
    return last < staleCutoff
  })

  const overdueFollowUp = active.filter((l) => l.next_follow_up_at && new Date(l.next_follow_up_at).getTime() < now)
  const unassigned = active.filter((l) => !l.assignee)
  const quoteWon = all.filter((l) => l.quote_status === 'won')
  const quoteLost = all.filter((l) => l.quote_status === 'lost')

  // Funnel
  const funnel = [
    { label: 'Nouveau', key: 'new', color: 'var(--blue)' },
    { label: 'Qualifié', key: 'qualified', color: '#7c3aed' },
    { label: 'Contacté', key: 'contacted', color: 'var(--teal)' },
    { label: 'Devis envoyé', key: 'quoted', color: 'var(--orange)' },
    { label: 'Gagné', key: 'won', color: '#16a34a' },
    { label: 'Perdu', key: 'lost', color: '#ef4444' },
  ].map((f) => ({ ...f, count: all.filter((l) => l.status === f.key).length }))

  const maxFunnel = Math.max(...funnel.map((f) => f.count), 1)

  // Breakdown groups
  const bySource = sortedEntries(groupBy(all, (l) => l.source || 'direct'))
  const bySegment = sortedEntries(groupBy(all, (l) => l.segment || 'general'))
  const byCategory = sortedEntries(groupBy(all.filter((l) => l.category_interest), (l) => l.category_interest!))
  const byRequestType = sortedEntries(groupBy(all, (l) => l.request_type || 'inconnu'))

  // Monthly trend (last 6 months)
  const monthlyMap: Record<string, number> = {}
  for (const l of all) {
    const d = new Date(l.created_at)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    monthlyMap[key] = (monthlyMap[key] ?? 0) + 1
  }
  const monthlyTrend = Object.entries(monthlyMap).sort((a, b) => a[0].localeCompare(b[0])).slice(-6)
  const maxMonth = Math.max(...monthlyTrend.map(([, v]) => v), 1)

  return (
    <div>
      <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 32, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
        Reporting
      </h1>
      <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 32 }}>
        Intelligence commerciale — NES
      </p>

      {/* Alert section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 36 }}>
        {[
          { label: 'Leads actifs', value: active.length, color: 'var(--blue)', sub: 'hors won/lost/closed/spam' },
          { label: 'Suivis en retard', value: overdueFollowUp.length, color: '#ef4444', sub: 'suivi planifié dépassé' },
          { label: 'Leads stagnants', value: stale.length, color: 'var(--orange)', sub: `sans contact depuis +${STALE_DAYS}j` },
          { label: 'Sans responsable', value: unassigned.length, color: '#7c3aed', sub: 'leads actifs non assignés' },
        ].map((s) => (
          <Link key={s.label} href="/admin/leads" style={{ textDecoration: 'none' }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 22px' }}>
              <div style={{ fontSize: 34, fontWeight: 800, color: s.color, fontFamily: '"Cormorant Garamond",Georgia,serif', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginTop: 6 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 3 }}>{s.sub}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Funnel */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 18 }}>Entonnoir de conversion</div>
        <div style={{ display: 'grid', gap: 8 }}>
          {funnel.map((f) => (
            <div key={f.key} style={{ display: 'grid', gridTemplateColumns: '110px 1fr 44px', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 12, color: 'var(--text2)', textAlign: 'right' }}>{f.label}</div>
              <div style={{ background: 'var(--surface)', borderRadius: 6, height: 22, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(f.count / maxFunnel) * 100}%`, background: f.color, borderRadius: 6, transition: 'width .3s', minWidth: f.count > 0 ? 6 : 0 }} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: f.color, textAlign: 'right' }}>{f.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly trend */}
      {monthlyTrend.length > 0 && (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 18 }}>Volume mensuel (6 derniers mois)</div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', height: 100 }}>
            {monthlyTrend.map(([month, count]) => (
              <div key={month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--blue)' }}>{count}</div>
                <div style={{ width: '100%', background: 'var(--blue)', borderRadius: '4px 4px 0 0', height: `${(count / maxMonth) * 70}px`, minHeight: count > 0 ? 4 : 0 }} />
                <div style={{ fontSize: 10, color: 'var(--text2)' }}>{month.slice(5)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Breakdown grids */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 24 }}>
        <BreakdownTable title="Par source" rows={bySource} />
        <BreakdownTable title="Par segment" rows={bySegment} />
        <BreakdownTable title="Par type de demande" rows={byRequestType} />
        <BreakdownTable title="Par catégorie d'intérêt" rows={byCategory} />
      </div>

      {/* Stale leads */}
      {stale.length > 0 && (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--orange)' }}>⚠️ Leads stagnants ({stale.length})</span>
            <span style={{ fontSize: 11, color: 'var(--text2)' }}>Actifs, sans contact depuis +{STALE_DAYS} jours</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface)' }}>
                {['ID', 'Statut', 'Source', 'Segment', 'Dernier contact', 'Owner', 'Suivi planifié'].map((h) => (
                  <th key={h} style={{ padding: '8px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text2)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stale.slice(0, 20).map((l, i) => {
                const last = l.last_contact_at || l.created_at
                const daysAgo = Math.floor((now - new Date(last).getTime()) / 86400000)
                return (
                  <tr key={l.id} style={{ borderTop: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                    <td style={{ padding: '10px 16px', fontSize: 11, color: 'var(--text2)', fontFamily: 'monospace' }}>{l.id.slice(0, 8)}…</td>
                    <td style={{ padding: '10px 16px', fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{l.status}</td>
                    <td style={{ padding: '10px 16px', fontSize: 12, color: 'var(--text2)' }}>{l.source || '—'}</td>
                    <td style={{ padding: '10px 16px', fontSize: 12, color: 'var(--text2)' }}>{l.segment || '—'}</td>
                    <td style={{ padding: '10px 16px', fontSize: 12, color: '#ef4444', fontWeight: 700 }}>Il y a {daysAgo}j</td>
                    <td style={{ padding: '10px 16px', fontSize: 12, color: l.assignee ? 'var(--text)' : '#7c3aed' }}>{l.assignee || 'non assigné'}</td>
                    <td style={{ padding: '10px 16px', fontSize: 12, color: l.next_follow_up_at ? 'var(--text)' : 'var(--text2)' }}>
                      {l.next_follow_up_at ? new Date(l.next_follow_up_at).toLocaleDateString('fr-MA') : '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Quote pipeline */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Pipeline devis</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
          {['none', 'needed', 'drafting', 'sent', 'won', 'lost'].map((qs) => {
            const count = all.filter((l) => (l.quote_status || 'none') === qs).length
            const colorMap: Record<string, string> = { none: 'var(--text2)', needed: 'var(--blue)', drafting: '#7c3aed', sent: 'var(--orange)', won: '#16a34a', lost: '#ef4444' }
            return (
              <div key={qs} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: colorMap[qs], fontFamily: '"Cormorant Garamond",Georgia,serif' }}>{count}</div>
                <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 4, textTransform: 'capitalize' }}>{qs}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function BreakdownTable({ title, rows }: { title: string; rows: [string, number][] }) {
  const max = Math.max(...rows.map(([, v]) => v), 1)
  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 20px' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>{title}</div>
      {rows.length === 0 ? (
        <div style={{ fontSize: 12, color: 'var(--text2)' }}>Aucune donnée</div>
      ) : (
        <div style={{ display: 'grid', gap: 8 }}>
          {rows.slice(0, 10).map(([label, count]) => (
            <div key={label} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 32px', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 11, color: 'var(--text2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={label}>{label}</div>
              <div style={{ background: 'var(--surface)', borderRadius: 4, height: 14, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(count / max) * 100}%`, background: 'var(--blue)', borderRadius: 4, minWidth: 4 }} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)', textAlign: 'right' }}>{count}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
