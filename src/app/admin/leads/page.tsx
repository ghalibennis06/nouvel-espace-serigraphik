import { supabase } from '@/lib/supabase'
import LeadsTable from './LeadsTable'

export const dynamic = 'force-dynamic'

export default async function LeadsPage() {
  const { data: leads } = await supabase
    .from('nes_leads')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 32, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
        Demandes de contact
      </h1>
      <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 28 }}>
        {leads?.length ?? 0} demande{(leads?.length ?? 0) !== 1 ? 's' : ''} au total
      </p>
      <LeadsTable leads={leads ?? []} />
    </div>
  )
}
