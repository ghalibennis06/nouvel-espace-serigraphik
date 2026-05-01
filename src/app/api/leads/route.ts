import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  }

  const { name, company, phone, email, message, source, requestType, city, categoryInterest, productInterest, budgetRange } = body

  if (!name || (!phone && !email)) {
    return NextResponse.json({ error: 'name and phone or email required' }, { status: 400 })
  }

  const sourceLabel = source || 'contact'
  const inferredSegment = typeof requestType === 'string' && requestType
    ? requestType
    : typeof sourceLabel === 'string' && sourceLabel.includes(':')
      ? sourceLabel.split(':')[1]
      : 'general'

  const { error } = await supabase.from('nes_leads').insert({
    name,
    company: company || null,
    phone: phone || null,
    email: email || null,
    message: message || null,
    source: sourceLabel,
    segment: inferredSegment,
    request_type: requestType || inferredSegment,
    city: city || null,
    category_interest: categoryInterest || null,
    product_interest: productInterest || null,
    budget_range: budgetRange || null,
    priority: 'normal',
    status: 'new',
  })

  if (error) {
    console.error('leads insert error:', error)
    return NextResponse.json({ error: 'database error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
