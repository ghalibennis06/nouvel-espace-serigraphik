import { notFound } from 'next/navigation'
import { getDocument, getDocumentItemRows } from '@/lib/erp'
import { isDatabaseConfigured } from '@/lib/db'
import { COMPANY } from '@/lib/company'
import { amountInWordsMAD } from '@/lib/num2words-fr'
import PrintBar from './PrintBar'

export const dynamic = 'force-dynamic'

const money = (n: number) => `${n.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD`
const TITLES: Record<string, string> = { facture: 'FACTURE', devis: 'DEVIS', avoir: 'AVOIR' }

export default async function DocumentPrintPage({ params }: { params: { id: string } }) {
  if (!isDatabaseConfigured()) return <div style={{ color: 'var(--text2)' }}>Base de données non configurée.</div>
  const doc = await getDocument(params.id)
  if (!doc) notFound()
  const items = await getDocumentItemRows(params.id)

  const subtotal = Number(doc.subtotal_ht)
  const tva = Number(doc.tva_amount)
  const total = Number(doc.total_ttc)
  const paid = Number(doc.paid_amount)
  const remaining = total - paid

  // Group TVA by rate for the legal tax breakdown table.
  const tvaByRate = new Map<string, { base: number; amount: number }>()
  for (const it of items) {
    const lineHt = Number(it.line_total_ht)
    const rate = String(Number(it.tva_rate))
    const e = tvaByRate.get(rate) ?? { base: 0, amount: 0 }
    e.base += lineHt; e.amount += lineHt * (Number(it.tva_rate) / 100)
    tvaByRate.set(rate, e)
  }

  const ink = '#1a1a2e', muted = '#6b7280', line = '#e5e7eb', accent = '#2563eb'
  const th: React.CSSProperties = { padding: '9px 12px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#fff', background: ink, textAlign: 'left' }
  const td: React.CSSProperties = { padding: '9px 12px', fontSize: 12.5, color: ink, borderBottom: `1px solid ${line}` }

  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>
      <PrintBar number={doc.number} />

      <style>{`@media print {
        .no-print { display: none !important; }
        .admin-panel nav, .admin-panel > div:first-child { display: none !important; }
        body { background: #fff !important; }
        @page { size: A4; margin: 14mm; }
      }`}</style>

      {/* Sheet */}
      <div style={{ background: '#fff', color: ink, borderRadius: 8, padding: '40px 44px', boxShadow: '0 2px 18px rgba(0,0,0,.08)', fontFamily: 'Inter,system-ui,sans-serif' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: `2px solid ${ink}`, paddingBottom: 22, marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-.02em' }}>{COMPANY.name}</div>
            <div style={{ fontSize: 11.5, color: muted, marginTop: 6, lineHeight: 1.7 }}>
              {COMPANY.address}<br />
              Tél : {COMPANY.phone} · {COMPANY.email}<br />
              ICE : {COMPANY.ice} · RC : {COMPANY.rc} · IF : {COMPANY.if}{COMPANY.patente !== '' ? ` · Patente : ${COMPANY.patente}` : ''}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: accent, letterSpacing: '.02em' }}>{TITLES[doc.doc_type] ?? 'DOCUMENT'}</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>N° {doc.number}</div>
            <div style={{ fontSize: 11.5, color: muted, marginTop: 6 }}>
              Date : {new Date(doc.issue_date).toLocaleDateString('fr-MA')}<br />
              {doc.due_date && <>Échéance : {new Date(doc.due_date).toLocaleDateString('fr-MA')}</>}
            </div>
          </div>
        </div>

        {/* Client */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
          <div style={{ minWidth: 280, border: `1px solid ${line}`, borderRadius: 8, padding: '14px 18px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: muted, marginBottom: 6 }}>Client</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{doc.client_name}</div>
            {doc.client_ice && <div style={{ fontSize: 11.5, color: muted, marginTop: 3 }}>ICE : {doc.client_ice}</div>}
          </div>
        </div>

        {/* Lines */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
          <thead>
            <tr>
              <th style={{ ...th, borderRadius: '6px 0 0 0' }}>Désignation</th>
              <th style={{ ...th, textAlign: 'center' }}>Qté</th>
              <th style={{ ...th, textAlign: 'right' }}>P.U. HT</th>
              <th style={{ ...th, textAlign: 'center' }}>TVA</th>
              <th style={{ ...th, textAlign: 'right', borderRadius: '0 6px 0 0' }}>Total HT</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i}>
                <td style={td}>{it.label}</td>
                <td style={{ ...td, textAlign: 'center' }}>{Number(it.qty)}</td>
                <td style={{ ...td, textAlign: 'right' }}>{money(Number(it.unit_price_ht))}</td>
                <td style={{ ...td, textAlign: 'center' }}>{Number(it.tva_rate)}%</td>
                <td style={{ ...td, textAlign: 'right', fontWeight: 600 }}>{money(Number(it.line_total_ht))}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals + TVA breakdown */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, marginBottom: 22 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: muted, marginBottom: 8 }}>Récapitulatif TVA</div>
            <table style={{ borderCollapse: 'collapse', fontSize: 11.5 }}>
              <thead><tr>
                <td style={{ padding: '4px 10px', color: muted, borderBottom: `1px solid ${line}` }}>Taux</td>
                <td style={{ padding: '4px 10px', color: muted, borderBottom: `1px solid ${line}`, textAlign: 'right' }}>Base HT</td>
                <td style={{ padding: '4px 10px', color: muted, borderBottom: `1px solid ${line}`, textAlign: 'right' }}>Montant</td>
              </tr></thead>
              <tbody>
                {Array.from(tvaByRate.entries()).map(([rate, v]) => (
                  <tr key={rate}>
                    <td style={{ padding: '4px 10px' }}>{rate}%</td>
                    <td style={{ padding: '4px 10px', textAlign: 'right' }}>{money(Math.round(v.base * 100) / 100)}</td>
                    <td style={{ padding: '4px 10px', textAlign: 'right' }}>{money(Math.round(v.amount * 100) / 100)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ minWidth: 280 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13, color: muted }}><span>Total HT</span><b style={{ color: ink }}>{money(subtotal)}</b></div>
            {Number(doc.discount) > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13, color: muted }}><span>Remise</span><b style={{ color: ink }}>− {money(Number(doc.discount))}</b></div>}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13, color: muted }}><span>TVA</span><b style={{ color: ink }}>{money(tva)}</b></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', marginTop: 6, background: ink, color: '#fff', borderRadius: 6, fontSize: 15 }}><span style={{ fontWeight: 700 }}>Total TTC</span><b>{money(total)}</b></div>
            {paid > 0 && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 12.5, color: muted }}><span>Encaissé</span><b style={{ color: '#16a34a' }}>{money(paid)}</b></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 12.5, color: muted }}><span>Reste à payer</span><b style={{ color: remaining > 0 ? '#d97706' : '#16a34a' }}>{money(remaining)}</b></div>
              </>
            )}
          </div>
        </div>

        {/* Amount in words */}
        <div style={{ fontSize: 12, color: ink, padding: '10px 14px', background: '#f6f7f9', borderRadius: 6, marginBottom: 18 }}>
          Arrêtée{doc.doc_type === 'devis' ? ' le présent devis' : ' la présente facture'} à la somme de :{' '}
          <b style={{ textTransform: 'capitalize' }}>{amountInWordsMAD(total)}</b> TTC.
        </div>

        {doc.notes && <div style={{ fontSize: 11.5, color: muted, marginBottom: 18, whiteSpace: 'pre-wrap' }}>{doc.notes}</div>}

        {/* Footer */}
        <div style={{ borderTop: `1px solid ${line}`, paddingTop: 14, fontSize: 10.5, color: muted, textAlign: 'center', lineHeight: 1.6 }}>
          {COMPANY.rib && <>RIB : {COMPANY.rib}{COMPANY.bank ? ` (${COMPANY.bank})` : ''}<br /></>}
          {COMPANY.name} — {COMPANY.legalForm} · ICE {COMPANY.ice} · RC {COMPANY.rc} · IF {COMPANY.if} · {COMPANY.website}
        </div>
      </div>
    </div>
  )
}
