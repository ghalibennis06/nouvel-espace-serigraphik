import { NextRequest, NextResponse } from 'next/server'
import { sql, isDatabaseConfigured } from '@/lib/db'

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

const PHONE_RE   = /^[+0-9 ().-]{6,30}$/
const EMAIL_RE   = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// Basic spam markers we never want to ingest in plain leads.
const SPAM_RE    = /(https?:\/\/|<a\s|\[url=|viagra|casino|bitcoin|crypto wallet)/i
const URL_COUNT  = /https?:\/\//gi

function tooSpammy(message: string): boolean {
  if (SPAM_RE.test(message)) return true
  const matches = message.match(URL_COUNT)
  if (matches && matches.length >= 2) return true
  return false
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

  // Honeypot — bots fill all fields, humans never see this one.
  // Accept silently to avoid teaching bots that we filter, but never persist.
  const honeypot = body['website'] ?? body['hp_field'] ?? ''
  if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true })
  }

  const { name, company, phone, email, message, source, requestType, city, categoryInterest, productInterest, budgetRange } = body

  // Basic shape validation
  const cleanName = (name ?? '').trim()
  if (cleanName.length < 2 || cleanName.length > 120) {
    return NextResponse.json({ error: 'name required (2-120 chars)' }, { status: 400 })
  }
  if (!phone && !email) {
    return NextResponse.json({ error: 'phone or email required' }, { status: 400 })
  }
  if (phone && !PHONE_RE.test(String(phone).trim())) {
    return NextResponse.json({ error: 'invalid phone' }, { status: 400 })
  }
  if (email && !EMAIL_RE.test(String(email).trim())) {
    return NextResponse.json({ error: 'invalid email' }, { status: 400 })
  }
  const cleanMessage = (message ?? '').trim()
  if (cleanMessage.length > 2000) {
    return NextResponse.json({ error: 'message too long' }, { status: 400 })
  }
  if (cleanMessage && tooSpammy(cleanMessage)) {
    // Same silent OK as honeypot — don't broadcast our filter to spammers.
    return NextResponse.json({ ok: true })
  }

  // Hard fail in production if DB isn't wired up — never tell the user "ok"
  // for a lead we cannot persist.
  if (!isDatabaseConfigured()) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[NES] /api/leads called but DATABASE_URL not set; refusing to fake success.')
      return NextResponse.json({ error: 'lead capture temporarily unavailable' }, { status: 503 })
    }
    console.warn('[NES] /api/leads in dev without DATABASE_URL — accepting without persistence.')
    return NextResponse.json({ ok: true, dev: true })
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
        (${cleanName}, ${company || null}, ${phone || null}, ${email || null}, ${cleanMessage || null},
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
