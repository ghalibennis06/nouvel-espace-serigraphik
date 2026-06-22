// Gestion des utilisateurs admin (rôles). Backend Neon.
import { sql } from '@/lib/db'
import { hashPassword } from '@/lib/password'
import type { AdminRole } from '@/lib/admin-auth'

type Row = Record<string, unknown>

export interface AdminUser {
  id: string
  email: string
  name: string
  role: AdminRole
  is_active: boolean
  last_login_at: string | null
  created_at: string
}

export async function countUsers(): Promise<number> {
  try {
    const r = (await sql`SELECT COUNT(*)::int AS n FROM nes_admin_users`) as Row[]
    return Number(r[0]?.n ?? 0)
  } catch { return 0 }
}

export async function listUsers(): Promise<AdminUser[]> {
  return (await sql`
    SELECT id, email, name, role, is_active, last_login_at, created_at
    FROM nes_admin_users ORDER BY created_at ASC
  `) as unknown as AdminUser[]
}

export async function findActiveByEmail(email: string): Promise<(AdminUser & { password_hash: string }) | null> {
  const rows = (await sql`
    SELECT id, email, name, role, is_active, last_login_at, created_at, password_hash
    FROM nes_admin_users WHERE lower(email) = lower(${email}) AND is_active = true LIMIT 1
  `) as unknown as (AdminUser & { password_hash: string })[]
  return rows[0] ?? null
}

export async function createUser(u: { email: string; password: string; name?: string; role?: AdminRole }): Promise<string> {
  const rows = (await sql`
    INSERT INTO nes_admin_users (email, password_hash, name, role)
    VALUES (lower(${u.email}), ${hashPassword(u.password)}, ${u.name ?? ''}, ${u.role ?? 'seller'})
    RETURNING id
  `) as Row[]
  return rows[0].id as string
}

export async function updateUser(id: string, fields: { name?: string; role?: AdminRole; is_active?: boolean; password?: string }): Promise<void> {
  if (fields.name !== undefined) await sql`UPDATE nes_admin_users SET name = ${fields.name} WHERE id = ${id}::uuid`
  if (fields.role !== undefined) await sql`UPDATE nes_admin_users SET role = ${fields.role} WHERE id = ${id}::uuid`
  if (fields.is_active !== undefined) await sql`UPDATE nes_admin_users SET is_active = ${fields.is_active} WHERE id = ${id}::uuid`
  if (fields.password) await sql`UPDATE nes_admin_users SET password_hash = ${hashPassword(fields.password)} WHERE id = ${id}::uuid`
}

export async function recordLogin(id: string): Promise<void> {
  await sql`UPDATE nes_admin_users SET last_login_at = now() WHERE id = ${id}::uuid`
}

export async function deleteUser(id: string): Promise<void> {
  await sql`DELETE FROM nes_admin_users WHERE id = ${id}::uuid`
}
