import Link from 'next/link'
import { whatsappGeneralLink } from '@/lib/utils'

export const metadata = {
  title: 'Livraison & Retours — Nouvel Espace Sérigraphik',
  description:
    "Délais de livraison, transporteurs, frais de port et politique de retour pour les commandes Nouvel Espace Sérigraphik partout au Maroc.",
}

const ZONES = [
  { zone: 'Casablanca', delay: '24h ouvrées', cost: 'Gratuit dès 1 500 MAD' },
  { zone: 'Grandes villes (Rabat, Marrakech, Tanger, Fès, Agadir, Oujda)', delay: '24–48h ouvrées', cost: 'Gratuit dès 2 500 MAD' },
  { zone: 'Reste du Maroc', delay: '48–72h ouvrées', cost: 'Sur devis selon volume' },
]

const FAQ = [
  {
    q: 'Comment ma commande est-elle expédiée ?',
    a: 'Nous expédions via nos transporteurs partenaires (CTM, Amana, Express Carrier) avec numéro de suivi envoyé par WhatsApp et email dès le départ atelier.',
  },
  {
    q: 'Puis-je récupérer ma commande au showroom ?',
    a: "Oui, le retrait au showroom de Casablanca est gratuit. Nous vous prévenons dès que la commande est prête (créneau Lun–Ven 9h–18h, Sam 9h–14h).",
  },
  {
    q: 'Quelle est votre politique de retour ?',
    a: "Les machines, presses et équipements sont garantis 12 mois. Tout produit défectueux à la livraison est échangé sous 7 jours ouvrés. Les consommables non ouverts sont repris sous 14 jours.",
  },
  {
    q: 'Livrez-vous à l’étranger ?',
    a: 'Pas en standard — pour toute demande hors Maroc, contactez-nous pour un devis logistique personnalisé.',
  },
]

export default function LivraisonPage({ params }: { params: { locale: string } }) {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '64px 6% 80px' }}>
        <span className="stag" style={{ marginBottom: 12 }}>Logistique NES · Maroc</span>
        <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(34px,5vw,56px)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.05, margin: '8px 0 16px' }}>
          Livraison & retours
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 40, maxWidth: 720 }}>
          Vos commandes partent depuis notre atelier à Casablanca et sont livrées partout au Maroc en 24 à 72h ouvrées. Voici nos délais, frais et politique de retour.
        </p>

        <section style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: '28px 28px', marginBottom: 28 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 18, letterSpacing: '-0.02em' }}>
            Délais & frais par zone
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 16 }}>
            {ZONES.map(z => (
              <div key={z.zone} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 18px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 8 }}>{z.zone}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Délai : {z.delay}</div>
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>Frais : {z.cost}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: 'var(--text2)', marginTop: 18, lineHeight: 1.6 }}>
            Les délais courent à compter de la confirmation de paiement. Les machines volumineuses peuvent nécessiter un délai logistique additionnel — confirmé sur le devis.
          </p>
        </section>

        <section style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: '28px 28px', marginBottom: 28 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 18, letterSpacing: '-0.02em' }}>
            Bon à savoir
          </h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingLeft: 18, color: 'var(--text2)', fontSize: 14, lineHeight: 1.7 }}>
            <li>Suivi de commande envoyé par WhatsApp + email avec numéro de tracking transporteur.</li>
            <li>Retrait gratuit au showroom de Casablanca sur rendez-vous.</li>
            <li>Garantie constructeur 12 mois sur les machines et presses.</li>
            <li>Conseil installation à distance par WhatsApp inclus pour tout kit complet.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 16, letterSpacing: '-0.02em' }}>
            Questions fréquentes
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map(item => (
              <details key={item.q} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 18px' }}>
                <summary style={{ cursor: 'pointer', fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{item.q}</summary>
                <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, marginTop: 10 }}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div style={{ background: 'var(--bluesoft)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 26px', display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Une question sur votre livraison ?</div>
            <div style={{ fontSize: 13, color: 'var(--text2)' }}>Notre équipe vous répond en moins de 5 minutes sur WhatsApp.</div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href={whatsappGeneralLink('Bonjour NES, j’ai une question sur la livraison ou le retour d’une commande.')} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '10px 18px', fontSize: 13 }}>
              Discuter sur WhatsApp →
            </a>
            <Link href={`/${params.locale}/contact`} className="btn-secondary" style={{ padding: '10px 18px', fontSize: 13 }}>
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
