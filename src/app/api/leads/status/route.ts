import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

const VALID_STATUSES = ['new', 'qualified', 'contacted', 'quoted', 'won', 'lost', 'closed', 'spam']
const VALID_PRIORITIES = ['low', 'normal', 'high', 'urgent']

async function logActivity(lead_id: string, type: string, label: string, opts?: {
  detail?: string | null
  old_value?: string | null
  new_value?: string | null
  actor?: string | null
}) {
  await sql`
    INSERT INTO nes_lead_activity (lead_id, type, label, detail, old_value, new_value, actor)
    VALUES (${lead_id}::uuid, ${type}, ${label}, ${opts?.detail ?? null}, ${opts?.old_value ?? null}, ${opts?.new_value ?? null}, ${opts?.actor ?? null})
  `
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

  // Fetch current for activity diff
  const currentRows = (await sql`SELECT status, priority, assignee, quote_status, next_follow_up_at FROM nes_leads WHERE id = ${id}::uuid`) as Record<string, string | null>[]
  const current = currentRows[0]

  // Build dynamic SET clause
  const updates: string[] = []
  const values: (string | null)[] = []
  const push = (col: string, val: string | null | undefined) => {
    if (typeof val !== 'undefined') { updates.push(`${col} = $${updates.length + 2}`); values.push(val ?? null) }
  }

  if (status) { updates.push(`status = $${updates.length + 2}`); values.push(status) }
  if (priority) { updates.push(`priority = $${updates.length + 2}`); values.push(priority) }
  push('assignee', assignee)
  push('next_follow_up_at', next_follow_up_at)
  push('notes', notes)
  push('quote_status', quote_status)
  push('quote_amount', quote_amount)
  push('last_contact_at', last_contact_at)
  push('result_reason', result_reason)

  if (updates.length === 0) return NextResponse.json({ error: 'nothing to update' }, { status: 400 })

  try {
    await sql.query(`UPDATE nes_leads SET ${updates.join(', ')} WHERE id = $1`, [id, ...values])
  } catch (err) {
    console.error('lead update error:', err)
    return NextResponse.json({ error: 'database error' }, { status: 500 })
  }

  // Auto-log changes
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
      await logActivity(id, 'contact', 'Contact logué', { new_value: last_contact_at, actor })
    }
    if (typeof notes !== 'undefined' && notes) {
      await logActivity(id, 'note', 'Note ajoutée', { detail: typeof notes === 'string' ? notes.slice(0, 120) : null, actor })
    }
  }

  return NextResponse.json({ ok: true })
}
