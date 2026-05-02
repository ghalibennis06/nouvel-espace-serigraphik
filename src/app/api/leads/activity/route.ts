import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET(req: NextRequest) {
  const leadId = req.nextUrl.searchParams.get('lead_id')
  if (!leadId) return NextResponse.json({ error: 'lead_id required' }, { status: 400 })

  try {
    const items = await sql`
      SELECT id, type, label, detail, old_value, new_value, actor, created_at
      FROM nes_lead_activity
      WHERE lead_id = ${leadId}::uuid
      ORDER BY created_at DESC
      LIMIT 50
    `
    return NextResponse.json({ items })
  } catch {
    return NextResponse.json({ error: 'database error' }, { status: 500 })
  }
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

  try {
    await sql`
      INSERT INTO nes_lead_activity (lead_id, type, label, detail, old_value, new_value, actor)
      VALUES (${lead_id}::uuid, ${type}, ${label}, ${detail ?? null}, ${old_value ?? null}, ${new_value ?? null}, ${actor ?? null})
    `
  } catch {
    return NextResponse.json({ error: 'database error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
