// Kits : structure riche statique (lib/data/kits.ts) + overrides éditables en base.
// getKits() fusionne les deux → le front reste intact, l'admin peut éditer prix/nom/etc.
import { sql, isDatabaseConfigured } from '@/lib/db'
import { KITS, type Kit } from '@/lib/data/kits'

type Row = Record<string, unknown>

export interface KitOverride {
  kit_id: string
  name: string | null
  subtitle: string | null
  price: string | null
  old_price: string | null
  badge: string | null
  items: string[] | null
  active: boolean
  sort_order: number | null
}

export async function listOverrides(): Promise<Record<string, KitOverride>> {
  if (!isDatabaseConfigured()) return {}
  try {
    const rows = (await sql`SELECT kit_id, name, subtitle, price, old_price, badge, items, active, sort_order FROM nes_kit_overrides`) as unknown as KitOverride[]
    return Object.fromEntries(rows.map(r => [r.kit_id, r]))
  } catch { return {} }
}

// Kits prêts pour le front (overrides appliqués, inactifs masqués, triés).
export async function getKits(): Promise<Kit[]> {
  const ov = await listOverrides()
  return KITS
    .map(k => {
      const o = ov[k.id]
      if (!o) return { kit: k, sort: 0, active: true }
      return {
        kit: {
          ...k,
          name: o.name ?? k.name,
          subtitle: o.subtitle ?? k.subtitle,
          priceDisplay: o.price != null ? Number(o.price).toLocaleString('fr-MA') : k.priceDisplay,
          price: o.price != null ? Number(o.price) : k.price,
          oldPrice: o.old_price ?? k.oldPrice,
          badge: o.badge ?? k.badge,
          items: o.items && o.items.length ? o.items : k.items,
        } as Kit,
        sort: o.sort_order ?? 0,
        active: o.active,
      }
    })
    .filter(x => x.active)
    .sort((a, b) => a.sort - b.sort)
    .map(x => x.kit)
}

export async function upsertOverride(o: {
  kit_id: string; name?: string | null; subtitle?: string | null; price?: number | null
  old_price?: string | null; badge?: string | null; items?: string[] | null; active?: boolean; sort_order?: number | null
}): Promise<void> {
  await sql`
    INSERT INTO nes_kit_overrides (kit_id, name, subtitle, price, old_price, badge, items, active, sort_order, updated_at)
    VALUES (${o.kit_id}, ${o.name ?? null}, ${o.subtitle ?? null}, ${o.price ?? null}, ${o.old_price ?? null},
            ${o.badge ?? null}, ${o.items ? JSON.stringify(o.items) : null}::jsonb, ${o.active ?? true}, ${o.sort_order ?? null}, now())
    ON CONFLICT (kit_id) DO UPDATE SET
      name = EXCLUDED.name, subtitle = EXCLUDED.subtitle, price = EXCLUDED.price, old_price = EXCLUDED.old_price,
      badge = EXCLUDED.badge, items = EXCLUDED.items, active = EXCLUDED.active, sort_order = EXCLUDED.sort_order, updated_at = now()
  `
}
