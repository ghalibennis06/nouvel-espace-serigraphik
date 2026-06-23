'use client'
import Link from 'next/link'

export default function PrintBar({ number }: { number: string }) {
  return (
    <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 12 }}>
      <Link href="/admin/facturation" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>← Retour</Link>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => window.print()} style={{ background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
          🖨️ Imprimer / Enregistrer en PDF
        </button>
      </div>
    </div>
  )
}
