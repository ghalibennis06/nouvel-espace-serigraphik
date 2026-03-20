import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const VALID_STATUSES = ['new', 'contacted', 'quoted', 'closed', 'spam']

export async function PATCH(req: NextRequest) {
  let body: { id?: string; status?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  }

  const { id, status } = body
  if (!id || !status || !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'invalid id or status' }, { status: 400 })
  }

  const { error } = await supabase
    .from('nes_leads')
    .update({ status })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: 'database error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
