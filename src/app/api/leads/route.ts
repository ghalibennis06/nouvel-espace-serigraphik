import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

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

  try {
    await sql`
      INSERT INTO nes_leads
        (name, company, phone, email, message, source, segment, request_type, city, category_interest, product_interest, budget_range, priority, status)
      VALUES
        (${name}, ${company || null}, ${phone || null}, ${email || null}, ${message || null},
         ${sourceLabel}, ${inferredSegment}, ${requestType || inferredSegment},
         ${city || null}, ${categoryInterest || null}, ${productInterest || null}, ${budgetRange || null},
         'normal', 'new')
    `
  } catch (err) {
    console.error('leads insert error:', err)
    return NextResponse.json({ error: 'database error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
