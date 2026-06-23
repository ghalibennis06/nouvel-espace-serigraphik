import { listUsers } from '@/lib/users'
import { listAudit } from '@/lib/audit'
import { isDatabaseConfigured } from '@/lib/db'
import UsersManager from './UsersManager'

export const dynamic = 'force-dynamic'

export default async function UtilisateursPage() {
  if (!isDatabaseConfigured()) {
    return <div style={{ color: 'var(--text2)' }}>Base de données non configurée (DATABASE_URL).</div>
  }
  const [users, audit] = await Promise.all([listUsers(), listAudit(60)])
  return <UsersManager users={users} audit={audit as { actor: string | null; action: string; entity: string | null; detail: string | null; created_at: string }[]} />
}
