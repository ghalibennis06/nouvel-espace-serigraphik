import Link from 'next/link'
import { listPayments, paymentsTotalThisMonth, unpaidInvoices } from '@/lib/erp'
import { isDatabaseConfigured } from '@/lib/db'
import { whatsappGeneralLink } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const money = (n: number) => `${n.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD`
const METHOD: Record<string, string> = { especes: 'Espèces', virement: 'Virement', cheque: 'Chèque', carte: 'Carte', autre: 'Autre' }

export default async function PaiementsPage() {
  if (!isDatabaseConfigured()) return <div style={{ color: 'var(--text2)' }}>Base de données non configurée.</div>
  const [payments, monthTotal, unpaid] = await Promise.all([listPayments(80), paymentsTotalThisMonth(), unpaidInvoices()])
  const totalUnpaid = unpaid.reduce((s, u) => s + (Number(u.total_ttc) - Number(u.paid_amount)), 0)

  return (
    <div>
      <h1 style={{ fontFamily: 'Inter,system-ui,sans-serif', fontSize: 30, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Paiements</h1>
      <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 22 }}>Encaissements, impayés et relances</p>

      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 26 }}>
        {[
          { n: money(monthTotal), l: 'Encaissé ce mois', c: 'var(--green)' },
          { n: money(totalUnpaid), l: 'Total impayé', c: totalUnpaid > 0 ? 'var(--orange)' : 'var(--text2)' },
          { n: String(unpaid.length), l: 'Factures à relancer', c: unpaid.length ? 'var(--red)' : 'var(--text2)' },
        ].map(s => (
          <div key={s.l} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px', flex: 1, minWidth: 160 }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: s.c, lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontSize: 11, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 6 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: 16 }}>
        {/* Impayés + relance */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>À relancer</div>
          {unpaid.length === 0 ? <div style={{ padding: 26, textAlign: 'center', fontSize: 13, color: 'var(--text2)' }}>Aucun impayé 🎉</div> : unpaid.map((u) => {
            const remaining = Number(u.total_ttc) - Number(u.paid_amount)
            const wa = whatsappGeneralLink(`Bonjour, concernant la facture ${u.number} d'un montant restant de ${money(remaining)}, pourriez-vous régulariser ? Merci. — NES`)
            return (
              <div key={u.id as string} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderTop: '1px solid var(--border)' }}>
                <div style={{ flex: 1 }}>
                  <Link href={`/admin/facturation/${u.id}`} style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--blue)', textDecoration: 'none' }}>{u.number as string}</Link>
                  <div style={{ fontSize: 11, color: 'var(--text2)' }}>{u.client_name as string} · {Number(u.age_days)} j</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--orange)' }}>{money(remaining)}</div>
                <a href={wa} target="_blank" rel="noopener noreferrer" style={{ background: 'var(--green)', color: '#fff', borderRadius: 7, padding: '6px 10px', fontSize: 11.5, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>💬 Relancer</a>
              </div>
            )
          })}
        </div>

        {/* Encaissements récents */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>Encaissements récents</div>
          {payments.length === 0 ? <div style={{ padding: 26, textAlign: 'center', fontSize: 13, color: 'var(--text2)' }}>Aucun encaissement.</div> : payments.map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderTop: i ? '1px solid var(--border)' : 'none' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text)' }}>{p.client_name as string}</div>
                <div style={{ fontSize: 11, color: 'var(--text2)' }}>{p.number as string} · {METHOD[p.method as string] ?? p.method} · {new Date(p.paid_at as string).toLocaleDateString('fr-MA')}</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)' }}>+{money(Number(p.amount))}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
