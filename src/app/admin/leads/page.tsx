import { sql } from '@/lib/db'
import LeadsTable from './LeadsTable'

export const dynamic = 'force-dynamic'

export default async function LeadsPage() {
  const leads = (await sql`
    SELECT
      id, name, company, phone, email, message, status, notes, created_at,
      source, segment, request_type, priority, assignee, next_follow_up_at,
      city, category_interest, product_interest, budget_range,
      quote_status, quote_amount, last_contact_at, result_reason
    FROM nes_leads
    ORDER BY created_at DESC
  `) as Record<string, unknown>[]

  return (
    <div>
      <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 32, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
        Demandes de contact
      </h1>
      <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 14 }}>
        {leads.length} demande{leads.length !== 1 ? 's' : ''} au total
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3" style={{ marginBottom: 24 }}>
        {[
          ['Nouvelles', leads.filter((l) => l.status === 'new').length, 'var(--blue)'],
          ['À qualifier / relancer', leads.filter((l) => ['new', 'qualified', 'contacted', 'quoted'].includes(l.status as string)).length, 'var(--orange)'],
          ['Priorité haute / urgente', leads.filter((l) => ['high', 'urgent'].includes((l.priority as string) ?? '')).length, '#ef4444'],
          ['Suivis planifiés', leads.filter((l) => !!l.next_follow_up_at).length, 'var(--teal)'],
          ['Devis en cours', leads.filter((l) => l.quote_status && l.quote_status !== 'none').length, '#7c3aed'],
          ['Sans owner', leads.filter((l) => !l.assignee).length, '#7c3aed'],
          ['Sans suivi planifié', leads.filter((l) => !l.next_follow_up_at && !['won', 'closed', 'lost', 'spam'].includes(l.status as string)).length, '#f26316'],
        ].map(([label, value, color]) => (
          <div key={String(label)} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: String(color), lineHeight: 1 }}>{String(value)}</div>
            <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 6 }}>{String(label)}</div>
          </div>
        ))}
      </div>
      <LeadsTable leads={leads as Parameters<typeof LeadsTable>[0]['leads']} />
    </div>
  )
}
