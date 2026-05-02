import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const leadId = req.nextUrl.searchParams.get('lead_id')
  if (!leadId) return NextResponse.json({ error: 'lead_id required' }, { status: 400 })

  const { data, error } = await supabase
    .from('nes_lead_activity')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) return NextResponse.json({ error: 'database error' }, { status: 500 })
  return NextResponse.json({ items: data ?? [] })
}

export async function POST(req: NextRequest) {
  let body: {
    lead_id?: string
    type?: string
    label?: string
    detail?: string | null
    old_value?: string | null
    new_value?: string | null
    actor?: string | null
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  }

  const { lead_id, type, label, detail, old_value, new_value, actor } = body
  if (!lead_id || !type || !label) {
    return NextResponse.json({ error: 'lead_id, type, label required' }, { status: 400 })
  }

  const { error } = await supabase.from('nes_lead_activity').insert({
    lead_id,
    type,
    label,
    detail: detail ?? null,
    old_value: old_value ?? null,
    new_value: new_value ?? null,
    actor: actor ?? null,
  })

  if (error) return NextResponse.json({ error: 'database error' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
