import { KITS } from '@/lib/data/kits'
import { listOverrides } from '@/lib/kits'
import { isDatabaseConfigured } from '@/lib/db'
import KitsManager from './KitsManager'

export const dynamic = 'force-dynamic'

export default async function KitsAdminPage() {
  if (!isDatabaseConfigured()) {
    return <div style={{ color: 'var(--text2)' }}>Base de données non configurée (DATABASE_URL).</div>
  }
  const overrides = await listOverrides()
  const base = KITS.map(k => ({
    id: k.id, name: k.name, subtitle: k.subtitle, priceDisplay: k.priceDisplay, oldPrice: k.oldPrice, badge: k.badge, items: k.items,
  }))
  return <KitsManager base={base} overrides={overrides} />
}
