import { supabase } from '@/lib/supabase'
import LeadsTable from './LeadsTable'

export const dynamic = 'force-dynamic'

export default async function LeadsPage() {
  const { data: leads } = await supabase
    .from('nes_leads')
    .select('id, name, company, phone, email, message, status, notes, created_at, source, segment, request_type, priority, assignee, next_follow_up_at, city, category_interest, product_interest, budget_range, quote_status, quote_amount, last_contact_at, result_reason')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 32, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
        Demandes de contact
      </h1>
      <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 14 }}>
        {leads?.length ?? 0} demande{(leads?.length ?? 0) !== 1 ? 's' : ''} au total
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 12, marginBottom: 24 }} className="grid md:grid-cols-5 gap-3">
        {[
          ['Nouvelles', (leads ?? []).filter((lead) => lead.status === 'new').length, 'var(--blue)'],
          ['À qualifier / relancer', (leads ?? []).filter((lead) => ['new', 'qualified', 'contacted', 'quoted'].includes(lead.status)).length, 'var(--orange)'],
          ['Priorité haute / urgente', (leads ?? []).filter((lead) => ['high', 'urgent'].includes(lead.priority ?? '')).length, '#ef4444'],
          ['Suivis planifiés', (leads ?? []).filter((lead) => !!lead.next_follow_up_at).length, 'var(--teal)'],
          ['Devis en cours', (leads ?? []).filter((lead) => lead.quote_status && lead.quote_status !== 'none').length, '#7c3aed'],
        ].map(([label, value, color]) => (
          <div key={String(label)} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: String(color), lineHeight: 1 }}>{String(value)}</div>
            <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 6 }}>{String(label)}</div>
          </div>
        ))}
      </div>
      <LeadsTable leads={leads ?? []} />
    </div>
  )
}
