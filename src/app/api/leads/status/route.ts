import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const VALID_STATUSES = ['new', 'qualified', 'contacted', 'quoted', 'won', 'lost', 'closed', 'spam']
const VALID_PRIORITIES = ['low', 'normal', 'high', 'urgent']

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
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  }

  const { id, status, priority, assignee, next_follow_up_at, notes, quote_status, quote_amount, last_contact_at, result_reason } = body
  if (!id) {
    return NextResponse.json({ error: 'invalid id' }, { status: 400 })
  }
  if (status && !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'invalid status' }, { status: 400 })
  }
  if (priority && !VALID_PRIORITIES.includes(priority)) {
    return NextResponse.json({ error: 'invalid priority' }, { status: 400 })
  }

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

  if (Object.keys(payload).length === 0) {
    return NextResponse.json({ error: 'nothing to update' }, { status: 400 })
  }

  const { error } = await supabase
    .from('nes_leads')
    .update(payload)
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: 'database error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
