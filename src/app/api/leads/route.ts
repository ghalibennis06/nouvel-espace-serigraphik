import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

const RATE_MAP = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW = 60_000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = RATE_MAP.get(ip)
  if (!entry || now > entry.resetAt) {
    RATE_MAP.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'too many requests' }, { status: 429 })
  }

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
