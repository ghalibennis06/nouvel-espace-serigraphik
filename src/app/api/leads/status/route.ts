import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const VALID_STATUSES = ['new', 'qualified', 'contacted', 'quoted', 'won', 'lost', 'closed', 'spam']
const VALID_PRIORITIES = ['low', 'normal', 'high', 'urgent']

async function logActivity(lead_id: string, type: string, label: string, opts?: {
  detail?: string | null
  old_value?: string | null
  new_value?: string | null
  actor?: string | null
}) {
  await supabase.from('nes_lead_activity').insert({
    lead_id,
    type,
    label,
    detail: opts?.detail ?? null,
    old_value: opts?.old_value ?? null,
    new_value: opts?.new_value ?? null,
    actor: opts?.actor ?? null,
  })
}

export async function PATCH(req: NextRequest) {
  let body: {
    id?: string
    status?: string
    priority?: string
    assignee?: string | null
    next_follow_up_at?: string | null
    notes?: string | null
    quote_status?: string | null
    quote_amount?: string | null
    last_contact_at?: string | null
    result_reason?: string | null
    _actor?: string | null
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  }

  const { id, status, priority, assignee, next_follow_up_at, notes, quote_status, quote_amount, last_contact_at, result_reason, _actor } = body
  if (!id) return NextResponse.json({ error: 'invalid id' }, { status: 400 })
  if (status && !VALID_STATUSES.includes(status)) return NextResponse.json({ error: 'invalid status' }, { status: 400 })
  if (priority && !VALID_PRIORITIES.includes(priority)) return NextResponse.json({ error: 'invalid priority' }, { status: 400 })

  // Fetch current lead for activity diff
  const { data: current } = await supabase.from('nes_leads').select('status,priority,assignee,quote_status,next_follow_up_at').eq('id', id).single()

  const payload: Record<string, string | null> = {}
  if (status) payload.status = status
  if (priority) payload.priority = priority
  if (typeof assignee !== 'undefined') payload.assignee = assignee || null
  if (typeof next_follow_up_at !== 'undefined') payload.next_follow_up_at = next_follow_up_at || null
  if (typeof notes !== 'undefined') payload.notes = notes || null
  if (typeof quote_status !== 'undefined') payload.quote_status = quote_status || null
  if (typeof quote_amount !== 'undefined') payload.quote_amount = quote_amount || null
  if (typeof last_contact_at !== 'undefined') payload.last_contact_at = last_contact_at || null
  if (typeof result_reason !== 'undefined') payload.result_reason = result_reason || null

  if (Object.keys(payload).length === 0) return NextResponse.json({ error: 'nothing to update' }, { status: 400 })

  const { error } = await supabase.from('nes_leads').update(payload).eq('id', id)
  if (error) return NextResponse.json({ error: 'database error' }, { status: 500 })

  // Auto-log meaningful changes
  const actor = _actor ?? null
  if (current) {
    if (status && status !== current.status) {
      await logActivity(id, 'status_change', `Statut : ${current.status} → ${status}`, { old_value: current.status, new_value: status, actor })
    }
    if (priority && priority !== current.priority) {
      await logActivity(id, 'priority_change', `Priorité : ${current.priority} → ${priority}`, { old_value: current.priority, new_value: priority, actor })
    }
    if (typeof assignee !== 'undefined' && assignee !== current.assignee) {
      await logActivity(id, 'assignment', assignee ? `Assigné à ${assignee}` : 'Responsable retiré', { old_value: current.assignee, new_value: assignee, actor })
    }
    if (typeof quote_status !== 'undefined' && quote_status !== current.quote_status) {
      await logActivity(id, 'quote_change', `Devis : ${current.quote_status ?? 'none'} → ${quote_status ?? 'none'}`, { old_value: current.quote_status, new_value: quote_status, actor })
    }
    if (typeof next_follow_up_at !== 'undefined' && next_follow_up_at !== current.next_follow_up_at) {
      const dateLabel = next_follow_up_at ? new Date(next_follow_up_at).toLocaleDateString('fr-MA') : 'retiré'
      await logActivity(id, 'follow_up', `Suivi planifié : ${dateLabel}`, { new_value: next_follow_up_at, actor })
    }
    if (typeof last_contact_at !== 'undefined' && last_contact_at) {
      await logActivity(id, 'contact', `Contact logué`, { new_value: last_contact_at, actor })
    }
    if (typeof notes !== 'undefined' && notes) {
      await logActivity(id, 'note', 'Note ajoutée', { detail: typeof notes === 'string' ? notes.slice(0, 120) : null, actor })
    }
  }

  return NextResponse.json({ ok: true })
}
