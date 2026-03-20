import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  }

  const { name, company, phone, email, message, source } = body

  if (!name || (!phone && !email)) {
    return NextResponse.json({ error: 'name and phone or email required' }, { status: 400 })
  }

  const { error } = await supabase.from('nes_leads').insert({
    name,
    company: company || null,
    phone:   phone   || null,
    email:   email   || null,
    message: message || null,
    source:  source  || 'contact',
    status:  'new',
  })

  if (error) {
    console.error('leads insert error:', error)
    return NextResponse.json({ error: 'database error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
