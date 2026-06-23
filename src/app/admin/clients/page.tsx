import { listClients } from '@/lib/erp'
import { isDatabaseConfigured } from '@/lib/db'
import ClientsManager from './ClientsManager'

export const dynamic = 'force-dynamic'

export default async function ClientsPage() {
  if (!isDatabaseConfigured()) {
    return <div style={{ color: 'var(--text2)' }}>Base de données non configurée (DATABASE_URL).</div>
  }
  const clients = await listClients()
  return <ClientsManager initial={clients} />
}
