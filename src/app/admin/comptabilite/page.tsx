import Link from 'next/link'
import { accountingKpis, monthlyRevenue, unpaidInvoices, topClients } from '@/lib/erp'
import { isDatabaseConfigured } from '@/lib/db'

export const dynamic = 'force-dynamic'

const money = (n: number) => `${n.toLocaleString('fr-MA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} MAD`
const MONTHS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']

export default async function ComptabilitePage({ searchParams }: { searchParams: { year?: string } }) {
  if (!isDatabaseConfigured()) return <div style={{ color: 'var(--text2)' }}>Base de données non configurée.</div>
  const year = Number(searchParams.year) || new Date().getFullYear()
  const [kpis, monthly, unpaid, top] = await Promise.all([
    accountingKpis(year), monthlyRevenue(year), unpaidInvoices(), topClients(year),
  ])
  const maxCa = Math.max(1, ...monthly.map(m => m.ca_ttc))
  const convRate = kpis.devis_count ? Math.round((kpis.devis_acceptes / kpis.devis_count) * 100) : 0

  const card: React.CSSProperties = { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 20px' }
  const kpi = (n: string, l: string, c: string, sub?: string) => (
    <div style={{ ...card, flex: 1, minWidth: 170 }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: c, lineHeight: 1.1 }}>{n}</div>
      <div style={{ fontSize: 11, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 6 }}>{l}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 3 }}>{sub}</div>}
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
        <div>
          <h1 style={{ fontFamily: 'Inter,system-ui,sans-serif', fontSize: 30, fontWeight: 700, color: 'var(--text)' }}>Comptabilité</h1>
          <p style={{ fontSize: 13, color: 'var(--text2)' }}>Chiffre d&apos;affaires, TVA collectée, encours clients — exercice {year}</p>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[year - 1, year, year + 1].map(y => (
            <Link key={y} href={`/admin/comptabilite?year=${y}`} style={{ padding: '8px 14px', fontSize: 13, fontWeight: 700, borderRadius: 8, textDecoration: 'none', border: '1px solid ' + (y === year ? 'var(--blue)' : 'var(--border2)'), background: y === year ? 'var(--bluesoft)' : 'transparent', color: y === year ? 'var(--blue)' : 'var(--text2)' }}>{y}</Link>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 16 }}>
        {kpi(money(kpis.ca_ttc), 'CA facturé TTC', 'var(--blue)', `${kpis.factures_count} factures`)}
        {kpi(money(kpis.encaisse), 'Encaissé', 'var(--green)')}
        {kpi(money(kpis.encours), 'Encours clients', kpis.encours > 0 ? 'var(--orange)' : 'var(--text2)', `${kpis.impayees_count} impayées`)}
        {kpi(money(kpis.tva_collectee), 'TVA collectée', 'var(--teal)')}
      </div>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 24 }}>
        {kpi(money(kpis.ca_ht), 'CA HT', 'var(--text)')}
        {kpi(String(kpis.devis_count), 'Devis émis', 'var(--text)', money(kpis.devis_montant))}
        {kpi(`${convRate}%`, 'Taux conversion devis', convRate >= 30 ? 'var(--green)' : 'var(--orange)', `${kpis.devis_acceptes} acceptés`)}
      </div>

      {/* Monthly chart */}
      <div style={{ ...card, marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 18 }}>CA facturé par mois — {year}</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 160 }}>
          {monthly.map(m => (
            <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ fontSize: 9, color: 'var(--text2)', whiteSpace: 'nowrap' }}>{m.ca_ttc > 0 ? Math.round(m.ca_ttc / 1000) + 'k' : ''}</div>
              <div style={{ width: '100%', height: `${Math.max(2, (m.ca_ttc / maxCa) * 130)}px`, background: m.ca_ttc > 0 ? 'var(--blue)' : 'var(--border)', borderRadius: '4px 4px 0 0', transition: 'height .3s' }} />
              <div style={{ fontSize: 10, color: 'var(--text2)' }}>{MONTHS[m.month - 1]}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 16 }}>
        {/* Unpaid */}
        <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>Factures impayées</div>
          {unpaid.length === 0 ? (
            <div style={{ padding: 28, textAlign: 'center', fontSize: 13, color: 'var(--text2)' }}>Aucun impayé 🎉</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {unpaid.map((u) => {
                  const remaining = Number(u.total_ttc) - Number(u.paid_amount)
                  const age = Number(u.age_days)
                  return (
                    <tr key={u.id as string} style={{ borderTop: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 16px' }}>
                        <Link href={`/admin/facturation/${u.id}`} style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--blue)', textDecoration: 'none' }}>{u.number as string}</Link>
                        <div style={{ fontSize: 11, color: 'var(--text2)' }}>{u.client_name as string}</div>
                      </td>
                      <td style={{ padding: '10px 16px', textAlign: 'right' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--orange)' }}>{money(remaining)}</div>
                        <div style={{ fontSize: 10.5, color: age > 30 ? 'var(--orange)' : 'var(--text3)' }}>{age} j</div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Top clients */}
        <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>Top clients {year}</div>
          {top.length === 0 ? (
            <div style={{ padding: 28, textAlign: 'center', fontSize: 13, color: 'var(--text2)' }}>Aucune facture cette année</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {top.map((c, i) => (
                  <tr key={i} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 16px', fontSize: 12.5, color: 'var(--text)' }}>{c.client_name as string}<span style={{ fontSize: 11, color: 'var(--text2)' }}> · {Number(c.nb)} fact.</span></td>
                    <td style={{ padding: '10px 16px', textAlign: 'right', fontSize: 13, fontWeight: 700, color: 'var(--blue)' }}>{money(Number(c.ca))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
