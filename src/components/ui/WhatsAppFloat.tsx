'use client'
import { whatsappGeneralLink } from '@/lib/utils'

export default function WhatsAppFloat() {
  return (
    <div
      style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 300, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
      className="group"
    >
      <div style={{ background: '#1A1612', color: '#F5EDD8', padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 500, border: '1px solid rgba(245,237,216,0.12)', opacity: 0, transform: 'translateX(10px)', transition: 'opacity .2s, transform .2s', pointerEvents: 'none', whiteSpace: 'nowrap' }}
           className="group-hover:opacity-100 group-hover:translate-x-0">
        Commander via WhatsApp
      </div>
      <a
        href={whatsappGeneralLink('Bonjour NES, je souhaite passer une commande.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        style={{ width: 56, height: 56, borderRadius: '50%', background: '#25D366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 22px rgba(37,211,102,0.35)', transition: 'transform .2s, box-shadow .2s', flexShrink: 0 }}
        onMouseEnter={e => {
          ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.08)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = '0 6px 32px rgba(37,211,102,0.5)'
        }}
        onMouseLeave={e => {
          ;(e.currentTarget as HTMLElement).style.transform = 'none'
          ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 22px rgba(37,211,102,0.35)'
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
        </svg>
      </a>
    </div>
  )
}
