// Journal d'audit — best-effort (n'échoue jamais l'action métier).
import { sql } from '@/lib/db'

type Row = Record<string, unknown>

export async function logAudit(opts: {
  actor?: string | null; action: string; entity?: string | null; entity_id?: string | null; detail?: string | null
}): Promise<void> {
  try {
    await sql`
      INSERT INTO nes_audit_logs (actor, action, entity, entity_id, detail)
      VALUES (${opts.actor ?? null}, ${opts.action}, ${opts.entity ?? null}, ${opts.entity_id ?? null}, ${opts.detail ?? null})
    `
  } catch (e) {
    console.error('[audit] log failed:', e)
  }
}

export async function listAudit(limit = 100): Promise<Row[]> {
  return (await sql`
    SELECT actor, action, entity, entity_id, detail, created_at
    FROM nes_audit_logs ORDER BY created_at DESC LIMIT ${limit}
  `) as Row[]
}
