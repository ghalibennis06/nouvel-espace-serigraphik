import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { whatsappGeneralLink } from '@/lib/utils'

interface PageProps {
  params: { locale: string; slug: string }
}

const WA_SVG = (
  <svg style={{ width: 18, height: 18, flexShrink: 0 }} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
  </svg>
)

// ─── Guide content database ────────────────────────────────────────────────────

const GUIDES: Record<string, {
  title: string
  desc: string
  level: string
  category: string
  read: string
  relatedKit?: string
  relatedKitSlug?: string
  relatedProducts: { name: string; slug: string }[]
  waMsg: string
  sections: { heading: string; body: string }[]
}> = {
  'guide-sublimation-debutant': {
    title: 'Guide Complet Sublimation Débutant',
    desc: 'Températures, temps de pression, supports compatibles, erreurs à éviter. Tout pour réussir dès la première impression.',
    level: 'Débutant',
    category: 'Sublimation',
    read: '8 min',
    relatedKit: 'Kit Sublimation Starter',
    relatedKitSlug: 'kits',
    relatedProducts: [
      { name: 'Presse à chaud 38×38cm Antex', slug: 'presse-a-chaud-38x38-antex' },
      { name: 'Encres sublimation 100ml × 4', slug: 'encres-sublimation-100ml' },
      { name: 'Papier sublimation A4', slug: 'papier-sublimation-a4' },
    ],
    waMsg: "Bonjour NES, j'ai lu votre guide sublimation débutant et j'ai des questions. Pouvez-vous m'aider à choisir mon équipement ?",
    sections: [
      {
        heading: "Qu'est-ce que la sublimation ?",
        body: `La sublimation est un procédé d'impression qui transfère l'encre directement dans les fibres du tissu ou le revêtement d'un objet grâce à la chaleur et la pression. L'encre passe de l'état solide à l'état gazeux sans passer par l'état liquide — c'est ce qui donne des impressions lavables, durables et au toucher naturel.

**Avantages clés :**
- Résistance au lavage supérieure (ne s'écaille pas, ne se fissure pas)
- Couleurs vives et saturées
- Pas de surimpression — l'encre fait partie du matériau
- Idéal pour la personnalisation à la demande

**Limite importante :** La sublimation nécessite obligatoirement un support contenant au minimum 80% de polyester (ou un revêtement spécial pour les objets rigides comme les mugs). Sur le coton pur, la sublimation ne tient pas.`,
      },
      {
        heading: 'Le matériel minimum pour démarrer',
        body: `Pour sublimer correctement, vous avez besoin de :

1. **Une presse à chaud** — La pièce centrale. Choisissez au minimum un modèle 38×38cm pour commencer (presse à chaud Antex Pro 380). Elle doit atteindre 200°C avec une pression homogène sur toute la surface.

2. **Une imprimante compatible sublimation** — Les imprimantes Epson (EcoTank ou WorkForce) sont les plus compatibles. Attention : une imprimante sublimation ne peut PAS être utilisée pour de l'encre standard une fois convertie.

3. **Des encres sublimation** — Utiliser des encres spécifiques sublimation (CMYK). Les encres de marque Sawgrass ou les encres compatibles NES donnent d'excellents résultats.

4. **Du papier sublimation** — Un papier traité avec un grammage de 90 à 110g/m² pour une bonne rétention d'encre et un transfert propre.

5. **Du scotch thermique** — Pour maintenir le papier sur le support pendant le pressage. Évite les décalages.

6. **Du téflon** — Une feuille de protection posée sur le dessus pour protéger la presse et éviter les marques.`,
      },
      {
        heading: 'Températures et temps de pression : le guide complet',
        body: `Les paramètres varient selon le support. Voici les valeurs recommandées par nos techniciens :

**Mugs :**
- Température : 185–200°C
- Temps : 180–210 secondes (3–3,5 min)
- Pression : Moyenne
- Remarque : Utiliser une presse mug dédiée (cylindrique) pour un contact parfait

**T-shirts polyester :**
- Température : 190–200°C
- Temps : 45–60 secondes
- Pression : Légère à moyenne
- Remarque : Ne pas appuyer trop fort — le polyester peut se marquer

**T-shirts mix (polycoton 80/20) :**
- Température : 195–205°C
- Temps : 50–60 secondes
- Pression : Moyenne
- Remarque : Résultat légèrement moins vif qu'un 100% polyester

**Coussins polyester :**
- Température : 195–200°C
- Temps : 55–65 secondes
- Pression : Moyenne

**Cadres marbre / aluminium (revêtement sublimable) :**
- Température : 190–200°C
- Temps : 90–120 secondes
- Pression : Forte
- Remarque : Bien maintenir avec du scotch thermique sur tous les bords

**Règle générale :** En cas de doute, commencez par le bas de la fourchette de température et augmentez progressivement. Un pressage insuffisant donne des couleurs pâles. Un pressage excessif donne des couleurs trop intenses ou une teinte jaunâtre sur fond blanc.`,
      },
      {
        heading: 'Les 8 erreurs les plus fréquentes et comment les éviter',
        body: `**1. Mauvais sens du papier sublimation**
Le côté imprimé doit être face au support. Si vous retournez le papier, rien ne se transfère. Repère simple : le côté brillant est le côté imprimé.

**2. Encre insuffisamment sèche**
Imprimer et transférer immédiatement peut donner des couleurs baveuses. Laissez sécher 30–60 secondes après impression.

**3. Température trop basse**
Le symptôme : couleurs pâles et peu saturées. Solution : augmenter de 5°C et retester.

**4. Déplacement du papier pendant le pressage**
Solution : utiliser du scotch thermique sur tous les bords du motif AVANT de fermer la presse.

**5. Condensation sous le papier**
Préchauffez votre support 5–10 secondes avant d'appliquer le papier pour éliminer l'humidité résiduelle.

**6. Utiliser du coton pur**
La sublimation ne tient pas sur le coton pur. Minimum 80% polyester ou support avec revêtement spécial.

**7. Oublier le téflon**
Sans téflon, l'excès d'encre peut tacher le plateau de la presse et contaminer les prochains travaux.

**8. Pression inégale**
Une presse mal étalonnée donne des impressions plus claires sur certains côtés. Vérifiez l'étalonnage mensuel et ajustez les vis de réglage si nécessaire.`,
      },
      {
        heading: 'Combien peut-on gagner avec la sublimation ?',
        body: `La sublimation est l'une des activités d'impression les plus rentables pour démarrer, car les coûts de revient sont très bas.

**Exemple : mugs personnalisés**
- Coût d'un mug sublimable : 8–10 MAD
- Encre + papier par mug : 2–3 MAD
- **Coût total : ≈ 12 MAD**
- Prix de vente standard : 60–120 MAD
- **Marge brute : 500–1 000%**

**Exemple : t-shirt polyester personnalisé**
- Coût d'un t-shirt blanc polyester : 25–35 MAD
- Encre + papier : 3–5 MAD
- **Coût total : ≈ 35 MAD**
- Prix de vente : 80–150 MAD
- **Marge brute : 130–330%**

Avec une production de 20 pièces/jour × 22 jours = 440 pièces/mois, à un prix moyen de 70 MAD, vous générez **30 800 MAD de CA brut** pour un coût matière de ≈ 5 280 MAD. Net estimé : **25 520 MAD/mois.**

Le Kit Sublimation NES (4 400 MAD) se rembourse en moins de 3 semaines à ce rythme.`,
      },
    ],
  },

  'choisir-sa-presse-a-chaud': {
    title: 'Choisir sa presse à chaud : comparatif complet 2026',
    desc: '38×38 vs 40×50 vs 40×60 — quelle taille choisir selon votre activité et vos marges.',
    level: 'Intermédiaire',
    category: 'Sublimation',
    read: '5 min',
    relatedKit: 'Kit Sublimation Starter',
    relatedKitSlug: 'kits',
    relatedProducts: [
      { name: 'Presse 38×38cm Antex Pro', slug: 'presse-a-chaud-38x38-antex' },
      { name: 'Presse 40×50cm auto-open', slug: 'presse-40x50-auto-ouverture' },
      { name: 'Presse 5en1 Freesub', slug: 'presse-5en1-freesub' },
    ],
    waMsg: "Bonjour NES, j'hésite entre plusieurs presses à chaud. Pouvez-vous m'aider à choisir selon mon activité ?",
    sections: [
      {
        heading: 'Les 4 critères essentiels pour choisir',
        body: `Avant de regarder les prix, définissez votre usage :

**1. Quels supports allez-vous imprimer ?**
- Mugs uniquement → presse mug dédiée (cylindrique)
- T-shirts, coussins, plaques → format plat 38×38 minimum
- Casquettes → presse casquette dédiée
- Multi-supports → presse 5en1 (la plus polyvalente)

**2. Quel volume de production ?**
- Side-business / débutant : 20–50 pièces/jour → 38×38 manuelle
- Atelier en croissance : 50–100 pièces/jour → 40×50 auto-open
- Production intensive : 100+ pièces/jour → 40×60 ou double station

**3. Quelle surface d'impression ?**
- Petits motifs (< 35×35cm) : 38×38 suffisant
- Motifs pleine largeur (dos de t-shirt) : 40×50 recommandé
- Grand format (vêtements XL, bannières) : 40×60 indispensable

**4. Quel budget ?**
- Entrée de gamme : 1 800–2 500 MAD (38×38 manuelle)
- Milieu de gamme : 2 800–4 000 MAD (40×50 auto-open, 5en1)
- Pro : 4 500–8 000 MAD (40×60, double station)`,
      },
      {
        heading: 'Tableau comparatif par modèle',
        body: `**Presse 38×38cm manuelle (Antex Pro 380)**
- Prix : ≈ 1 800–2 200 MAD
- Usage : sublimation débutant, transfert flex
- Avantages : compacte, légère, prix d'entrée bas
- Limites : format limité, manuelle = fatigue sur gros volumes
- Pour qui : premier atelier, side-business, budget serré

**Presse 5en1 Freesub 38×38cm**
- Prix : ≈ 2 800–3 400 MAD
- Usage : sublimation multi-supports (plat + mug + casquette + assiette + brassard)
- Avantages : très polyvalente, 5 pièces interchangeables incluses
- Limites : qualité moindre sur chaque accessoire vs une presse dédiée
- Pour qui : débutant voulant tout essayer avant de spécialiser

**Presse 40×50cm auto-ouverture**
- Prix : ≈ 3 200–4 200 MAD
- Usage : sérigraphie, sublimation pro, transfert industriel
- Avantages : ouverture automatique = sécurité + productivité, grand format
- Limites : plus volumineuse, prix supérieur
- Pour qui : atelier en production, objectif volume 50+ pièces/jour

**Presse double station 40×50cm**
- Prix : ≈ 6 000–9 000 MAD
- Usage : production intensive, atelier commercial
- Avantages : productivité x2 (on prépare pendant que l'autre presse)
- Pour qui : atelier avec commandes régulières importantes`,
      },
      {
        heading: 'Notre recommandation selon votre profil',
        body: `**Je démarre de zéro, budget < 5 000 MAD**
→ Kit Sublimation Starter NES (presse 38×38 incluse) — le plus logique pour démarrer vite sans sur-investir.

**Je veux faire de la sublimation ET d'autres techniques**
→ Presse 5en1 Freesub — idéale pour tester tous les supports avant de choisir votre spécialité.

**J'ai déjà des clients et je veux produire plus vite**
→ Presse 40×50 auto-ouverture — l'investissement se rembourse en 2–3 semaines de production supplémentaire.

**Je veux ouvrir un vrai atelier de production**
→ Presse double station ou Kit DTF Complet — discutez avec nos experts pour un devis adapté à votre volume.`,
      },
    ],
  },

  'lancer-atelier-30-jours': {
    title: "Lancer votre atelier d'impression en 30 jours",
    desc: "Business plan, liste d'équipement, premiers clients, pricing. Le plan d'action complet pour créer votre activité.",
    level: 'Business',
    category: 'Business & Entrepreneuriat',
    read: '15 min',
    relatedKit: 'Kit Sérigraphie Pro',
    relatedKitSlug: 'kits',
    relatedProducts: [
      { name: 'Kit Sublimation Starter', slug: 'kits' },
      { name: 'Kit Sérigraphie Pro', slug: 'kits' },
      { name: 'Kit DTF Complet', slug: 'kits' },
    ],
    waMsg: "Bonjour NES, j'ai lu votre guide pour lancer un atelier en 30 jours. Pouvez-vous m'aider à choisir le bon kit selon mon budget ?",
    sections: [
      {
        heading: 'Semaine 1 — Choisir votre technique et votre équipement',
        body: `La première décision est la plus importante : sur quoi voulez-vous vous spécialiser ?

**Option A : Sublimation (budget ≈ 4 400–6 000 MAD)**
Idéale si vous voulez démarrer vite avec des mugs, cadres, coussins et t-shirts polyester. Marges très élevées sur les petits objets (mugs). Clients cibles : mariages, entreprises (cadeaux), écoles, particuliers.

**Option B : Sérigraphie (budget ≈ 5 400–8 000 MAD)**
Idéale pour imprimer sur coton (t-shirts, sweats, tote bags). Meilleure qualité et durabilité. Clients cibles : associations, clubs sportifs, groupes de musique, entreprises.

**Option C : DTF (budget ≈ 8 400–12 000 MAD)**
La technique la plus flexible — tous textiles, toutes couleurs. Idéale si vous avez déjà des clients ou si vous visez la sous-traitance pour d'autres ateliers.

**Règle d'or du démarrage :** Ne commencez pas avec les 3 techniques à la fois. Choisissez une, maîtrisez-la, rentabilisez l'investissement, puis diversifiez.

**Checklist Semaine 1 :**
- [ ] Choisir votre technique principale
- [ ] Commander votre kit NES
- [ ] Préparer votre espace de travail (table sturdy, prises électriques, ventilation)
- [ ] Créer un compte Instagram et WhatsApp Business dédié à l'atelier`,
      },
      {
        heading: 'Semaine 2 — Maîtriser votre équipement',
        body: `Votre kit est arrivé. Ne le sortez pas de la boîte pour prendre une commande le lendemain.

**Plan de pratique 5 jours :**

**Jour 1 :** Lire intégralement le guide inclus. Installer et étalonner la presse. Tester la température à vide.

**Jour 2 :** Premier transfert de test sur chute de tissu. Ajuster les paramètres selon le résultat.

**Jour 3 :** Produire 20 pièces de pratique (mugs, t-shirts ou transfers). Photo de chaque résultat.

**Jour 4 :** Tester les limites : température max, durée max, pression max. Comprendre comment chaque paramètre affecte le résultat.

**Jour 5 :** Produire votre premier lot "propre" destiné à vos photos de portfolio. Ces photos seront vos premiers outils de vente.

**Important :** Posez vos questions techniques par WhatsApp à nos experts NES. Nous répondons en moins de 5 minutes.`,
      },
      {
        heading: 'Semaine 3 — Trouver vos premiers clients',
        body: `Au Maroc, les 4 canaux qui fonctionnent le mieux pour un atelier d'impression :

**1. WhatsApp Business (le plus efficace)**
Créez un catalogue de produits dans l'application. Partagez vos photos à votre réseau personnel. Les commandes viennent très vite via le réseau de confiance.

**2. Instagram**
Publiez vos créations avec des hashtags ciblés : #impression_maroc #sublimation_casablanca #personnalisation_maroc. Utilisez les Reels pour montrer le processus — les vidéos de presse ont énormément de portée organique.

**3. Marketplaces locales**
Avito.ma, Jumia.ma, Facebook Marketplace — excellents pour les premières commandes de mugs personnalisés.

**4. Approche directe B2B**
Contactez directement des associations, clubs sportifs, écoles, cafés, restaurants. Une seule commande de 50 t-shirts pour un club = 2 500–5 000 MAD.

**Prix recommandés pour démarrer :**
- Mug sublimé (11oz) : 80–120 MAD (coût ≈ 12 MAD)
- T-shirt polyester sublimé : 120–180 MAD
- T-shirt coton sérigraphié (1 couleur) : 80–150 MAD
- Tote bag sérigraphié : 60–100 MAD`,
      },
      {
        heading: 'Semaine 4 — Structurer et scaler',
        body: `Si vous avez suivi le plan, vous avez déjà vos premières commandes. Voici comment structurer pour la suite :

**Gestion des commandes**
Utilisez un simple fichier Excel ou Google Sheets : date de commande, client, produit, quantité, prix, statut livraison. Un suivi propre = moins d'erreurs, meilleure réputation.

**Facturation**
NES vous fournit une facture professionnelle à chaque achat. Pour vos clients, utilisez une application simple comme Invoice Simple (gratuit) pour émettre des devis et factures.

**Quand investir dans un second équipement ?**
Dès que vous atteignez 80% de votre capacité de production régulièrement, il est temps de réfléchir à une presse supplémentaire ou à passer à une technique complémentaire.

**Objectif 30 jours :**
- Première commande : Semaine 2
- 5 clients réguliers : Fin du mois
- CA mensuel : 5 000–15 000 MAD selon volume
- Rentabilisation de l'investissement : 3–5 semaines`,
      },
    ],
  },

  'grille-tarifs-impression-maroc': {
    title: "Fixer ses tarifs : grille de prix recommandée Maroc 2026",
    desc: "Mugs, t-shirts, sweats, cadres — les prix du marché et comment vous positionner pour être rentable.",
    level: 'Business',
    category: 'Business & Entrepreneuriat',
    read: '8 min',
    relatedKit: 'Kit Sublimation Starter',
    relatedKitSlug: 'kits',
    relatedProducts: [
      { name: 'Mugs sublimables blancs', slug: 'mugs-sublimables-blancs' },
      { name: 'Encres sublimation', slug: 'encres-sublimation-100ml' },
    ],
    waMsg: "Bonjour NES, j'ai des questions sur les prix du marché marocain pour mon atelier d'impression.",
    sections: [
      {
        heading: 'Grille de prix marché Maroc 2026',
        body: `**Sublimation — Prix de vente recommandés :**

| Produit | Coût matière | Prix marché bas | Prix recommandé | Prix premium |
|---------|-------------|----------------|-----------------|--------------|
| Mug 11oz | 12 MAD | 50 MAD | 80 MAD | 120 MAD |
| Mug magique (changeant de couleur) | 18 MAD | 70 MAD | 100 MAD | 150 MAD |
| T-shirt polyester sublimé | 35 MAD | 80 MAD | 130 MAD | 200 MAD |
| Coussin 40×40cm | 25 MAD | 90 MAD | 130 MAD | 180 MAD |
| Cadre aluminium A4 | 30 MAD | 100 MAD | 150 MAD | 200 MAD |
| Porte-clé sublimé | 5 MAD | 20 MAD | 35 MAD | 60 MAD |

**Sérigraphie — Prix de vente recommandés :**

| Produit | Coût matière | Prix recommandé | En série (>20) |
|---------|-------------|-----------------|----------------|
| T-shirt coton 1 couleur | 30 MAD | 100–150 MAD | 80 MAD |
| T-shirt coton 2 couleurs | 35 MAD | 130–180 MAD | 100 MAD |
| Sweat-shirt 1 couleur | 70 MAD | 200–280 MAD | 170 MAD |
| Tote bag 1 couleur | 15 MAD | 60–100 MAD | 50 MAD |`,
      },
      {
        heading: 'Comment vous positionner dans le marché',
        body: `Le marché marocain de la personnalisation fonctionne sur 3 niveaux :

**Niveau 1 — Entrée de gamme (prix bas, volume)**
Compétition forte sur les marketplaces (Avito, Facebook Marketplace). Marges faibles. À éviter sauf pour l'acquisition de vos premiers clients.

**Niveau 2 — Artisanat de qualité (prix médians)**
Le positionnement idéal pour démarrer. Vous proposez une qualité supérieure avec un service personnalisé (conseils, finitions soignées, délais respectés).

**Niveau 3 — Premium / B2B (prix élevés)**
Clients : entreprises, hôtels, restaurants, organisateurs d'événements. Commandes de 50+ pièces. Facturation professionnelle. Marge nette maximale.

**Notre recommandation :** Commencez au Niveau 2 avec quelques clients B2B. Un seul client qui commande 100 t-shirts/mois vaut mieux que 100 clients particuliers de 1 mug.`,
      },
    ],
  },

  'trouver-clients-impression': {
    title: 'Trouver ses premiers clients : réseaux sociaux Maroc',
    desc: "Instagram, TikTok, WhatsApp Business, Facebook Marketplace — les canaux qui fonctionnent au Maroc.",
    level: 'Business',
    category: 'Business & Entrepreneuriat',
    read: '10 min',
    relatedKit: 'Kit Sublimation Starter',
    relatedKitSlug: 'kits',
    relatedProducts: [],
    waMsg: "Bonjour NES, j'ai lu votre guide pour trouver des clients. Pouvez-vous m'aider à choisir mon kit pour démarrer ?",
    sections: [
      {
        heading: 'WhatsApp Business : votre premier canal de vente',
        body: `Au Maroc, WhatsApp est le canal numéro 1 pour les ateliers d'impression. Voici comment l'utiliser professionnellement :

**Configurez WhatsApp Business correctement :**
- Nom de l'entreprise (ex: "Atelier Tawrik — Impression Casablanca")
- Photo de profil : votre logo ou une belle photo de production
- Catalogue de produits : ajoutez vos produits avec photos et prix
- Message d'accueil automatique
- Heures d'ouverture visibles

**Stratégie de lancement :**
1. Exportez tous vos contacts et identifiez ceux qui pourraient être clients (associations, entreprises, amis organisateurs d'événements)
2. Envoyez un message personnel (pas un broadcast) avec vos 3 meilleures photos
3. Offrez une réduction de lancement de 15–20% sur la première commande
4. Demandez un avis et une recommandation après livraison`,
      },
      {
        heading: 'Instagram & TikTok : la vitrine gratuite',
        body: `**Instagram — Ce qui marche dans l'impression textile au Maroc :**

- **Reels avant/après** : tissu blanc → t-shirt imprimé. Forte portée organique.
- **Process videos** : montrez la presse, le transfert, l'emballage. Les gens adorent voir comment c'est fabriqué.
- **Témoignages clients** : une photo du client avec son t-shirt vaut mieux que tout le contenu publicitaire.
- **Hashtags efficaces** : #impression_maroc #sublimation_maroc #personnalisation #tshirt_maroc + votre ville (#casablanca #rabat etc.)

**TikTok au Maroc :**
TikTok connaît une croissance explosive dans le segment 18–35 ans. Un seul Reel d'une presse en action peut générer 10 000+ vues sans budget. Postez 1 vidéo par jour pendant 30 jours — vous aurez des commandes avant la fin du mois.

**Cadence recommandée :**
- 1 Reel par jour (le processus d'impression)
- 3 stories par semaine (commandes en cours, testimonials)
- 2 posts statiques par semaine (produits finis avec prix)`,
      },
      {
        heading: 'B2B : les clients qui changent tout',
        body: `Un seul client B2B régulier peut représenter 30–50% de votre CA mensuel.

**Les meilleurs segments B2B au Maroc :**

**Clubs sportifs** : chaque club a besoin de maillots, t-shirts de fans, articles de supporters. Budget typique : 100–500 pièces/saison.

**Associations et ONG** : t-shirts pour événements, campagnes. Budget : 50–300 pièces/événement.

**Établissements scolaires** : t-shirts de fin d'année, uniformes personnalisés. Budget : 100–500 pièces/an.

**Hôtels et restaurants** : uniformes du personnel, cadeaux clients. Budget : 50–200 pièces/an avec renouvellement.

**Entreprises (RH)** : t-shirts team-building, goodies corporate. Budget : 50–500 pièces/événement.

**Comment les approcher :**
1. Identifiez 20 cibles dans votre ville
2. Préparez un devis type avec vos tarifs pour 50, 100, 200 pièces
3. Présentez-vous en personne avec un échantillon
4. Proposez une première commande à prix préférentiel`,
      },
    ],
  },

  'bases-serigraphie': {
    title: 'Bases de la Sérigraphie : de zéro à première impression',
    desc: "Insolation, émulsion, exposition, raclage — les étapes clés pour votre premier cadre réussi.",
    level: 'Débutant',
    category: 'Sérigraphie',
    read: '12 min',
    relatedKit: 'Kit Sérigraphie Pro',
    relatedKitSlug: 'kits',
    relatedProducts: [
      { name: 'Base aqueuse Antex XP10', slug: 'base-aqueuse-antex-xp10' },
      { name: 'Cadre aluminium 40×50cm', slug: 'cadre-aluminium-40x50' },
      { name: 'Raclette sérigraphie 50cm', slug: 'raclette-serigraphie' },
    ],
    waMsg: "Bonjour NES, j'ai lu votre guide de sérigraphie débutant. J'aimerais en savoir plus sur le Kit Sérigraphie Pro.",
    sections: [
      {
        heading: 'Les 5 étapes de la sérigraphie',
        body: `La sérigraphie repose sur un principe simple : faire passer de l'encre à travers un écran (cadre tendu de soie) aux endroits non bloqués par un pochoir chimique (émulsion).

**Étape 1 — Préparer le cadre**
Nettoyez soigneusement le cadre aluminium. La soie doit être tendue uniformément (vérifiez avec un doigt : résistance ferme sans cédure). Appliquez une couche fine d'émulsion photosensible sur les deux faces avec une racle d'enduction. Séchez à l'abri de la lumière (chambre noire ou sac noir).

**Étape 2 — Insoler**
Placez votre film de transfert (motif imprimé en noir sur film transparent) sur le cadre enduit. Exposez sous une lampe UV pendant 60–120 secondes selon votre unité d'insolation. Le temps varie selon la puissance de la lampe et le type d'émulsion.

**Étape 3 — Révéler**
Rincez immédiatement le cadre sous l'eau. Les zones exposées (sous l'émulsion durcie) restent. Les zones protégées par le film noir se dissolvent et laissent passer l'encre. Séchez avant impression.

**Étape 4 — Imprimer**
Positionnez votre vêtement sous le cadre. Déposez de l'encre en haut du cadre. Raclez avec une pression ferme et régulière de haut en bas. Une à deux passes selon l'opacité souhaitée.

**Étape 5 — Fixer**
Passez le t-shirt imprimé dans un four tunnel ou sous la presse à chaud (160°C, 30 secondes) pour thermofixer l'encre. Sans fixation, l'encre partira au premier lavage.`,
      },
      {
        heading: 'Choisir ses encres : aqueuses vs plastisol',
        body: `**Encres aqueuses (recommandées pour démarrer)**
- Exemple : Antex XP10, XP50 (gamme NES)
- Avantages : pas de solvants, faciles à nettoyer à l'eau, séchage à l'air
- Inconvénients : moins résistantes aux lavages répétés que le plastisol
- Idéales pour : coton, tissu naturel, impression sur mesure

**Encres plastisol**
- Avantages : couleurs très vives, excellente résistance lavage
- Inconvénients : nécessitent un four tunnel pour polymérisation (160–180°C minimum)
- Idéales pour : production professionnelle intensive

**Notre recommandation pour démarrer :** Commencez avec les bases aqueuses Antex (incluses dans le Kit Sérigraphie Pro NES). Elles sont plus simples à utiliser et ne nécessitent pas d'équipement de fixation spécialisé.`,
      },
    ],
  },

  'introduction-dtf': {
    title: "Introduction au DTF : révolution de l'impression textile",
    desc: "Comprendre le procédé DTF, ses avantages vs sublimation et sérigraphie, et son potentiel business.",
    level: 'Débutant',
    category: 'DTF',
    read: '8 min',
    relatedKit: 'Kit Impression DTF Complet',
    relatedKitSlug: 'kits',
    relatedProducts: [
      { name: 'Encres DTF CMYK+Blanc', slug: 'encres-dtf-cmyk-blanc' },
      { name: 'Papier DTF Film PET', slug: 'papier-dtf-film-pet' },
      { name: 'Poudre thermofusible', slug: 'poudre-thermofusible' },
    ],
    waMsg: "Bonjour NES, j'ai lu votre introduction au DTF. Pouvez-vous m'en dire plus sur le Kit DTF Complet ?",
    sections: [
      {
        heading: "Qu'est-ce que le DTF ?",
        body: `DTF signifie "Direct To Film" — impression directe sur film. C'est la technique d'impression textile la plus récente et aujourd'hui la plus flexible disponible pour les ateliers de taille moyenne.

**Le procédé en 4 étapes :**
1. Impression du motif en CMYK + blanc sur un film PET spécial
2. Application de poudre thermofusible sur le film encore humide
3. Passage au four tunnel pour fondre la poudre (fusion)
4. Transfert sur le textile par presse à chaud (150–165°C, 15–20 secondes)

**Ce qui rend le DTF révolutionnaire :**
- Fonctionne sur **tous les textiles** : coton, polyester, nylon, cuir, denim, feutrine
- Pas de prétraitement du tissu requis (contrairement à certains procédés DTG)
- Impression en pleine couleur avec blanc sous-jacent (photos, dégradés)
- Lavable jusqu'à 40°C sans dégradation visible
- Cadence élevée : 100–150 transferts A4/heure`,
      },
      {
        heading: 'DTF vs Sublimation vs Sérigraphie : le comparatif honnête',
        body: `**Compatibilité textile :**
- DTF : ✅ Tous textiles (coton, polyester, cuir, nylon...)
- Sublimation : ⚠️ Polyester uniquement (ou revêtement spécial)
- Sérigraphie : ✅ Tous textiles mais une couleur = un cadre

**Qualité d'impression :**
- DTF : ✅ Pleine couleur, dégradés, photos — excellente
- Sublimation : ✅ Couleurs vives, toucher naturel — excellente sur poly
- Sérigraphie : ✅ Couleurs opaques et vives — excellente mais limites couleurs

**Coût de revient par pièce :**
- DTF : ≈ 2–4 MAD/transfert A4 (encre + papier + poudre)
- Sublimation : ≈ 3–5 MAD/pièce (encre + papier)
- Sérigraphie : ≈ 2–6 MAD/pièce (encre + émulsion + amortissement cadres)

**Investissement initial :**
- DTF : ≈ 8 400–15 000 MAD (imprimante + station poudrage + presse + consommables)
- Sublimation : ≈ 4 400–6 000 MAD (presse + imprimante + consommables)
- Sérigraphie : ≈ 5 400–10 000 MAD (presse + unité insolation + consommables)

**Verdict :** Si votre budget le permet, le DTF est la technique la plus versatile et commercialement la plus puissante. Mais la sublimation reste le meilleur rapport investissement/rentabilité pour démarrer.`,
      },
    ],
  },

  'rentabilite-dtf': {
    title: 'Calcul de rentabilité DTF : coûts et marges par transfert',
    desc: "Calculez votre coût de revient réel et fixez vos tarifs pour maximiser vos marges.",
    level: 'Business',
    category: 'DTF',
    read: '6 min',
    relatedKit: 'Kit Impression DTF Complet',
    relatedKitSlug: 'kits',
    relatedProducts: [
      { name: 'Encres DTF CMYK+Blanc', slug: 'encres-dtf-cmyk-blanc' },
      { name: 'Papier DTF Film PET', slug: 'papier-dtf-film-pet' },
    ],
    waMsg: "Bonjour NES, je veux lancer un atelier DTF. Pouvez-vous m'aider à valider ma rentabilité et choisir mon équipement ?",
    sections: [
      {
        heading: 'Coût de revient réel par transfert DTF',
        body: `Voici le détail des coûts consommables pour un transfert A4 standard :

**Encres DTF :**
- Couverture moyenne par ml : 5–8 A4 selon densité du motif
- Coût 250ml CMYK+Blanc × 5 = ≈ 1 200–1 500 MAD
- Coût par A4 : ≈ 0,8–1,2 MAD (encres)

**Papier DTF film PET :**
- Prix feuille A4 : 0,6–1 MAD selon format d'achat
- En rouleau A3 : encore moins cher

**Poudre thermofusible :**
- Consommation : ≈ 30–50g par A4
- Prix 1kg poudre : 150–200 MAD
- Coût par A4 : ≈ 0,5–1 MAD

**Total coût matière par transfert A4 : 2 à 3 MAD**

**Prix de vente recommandés :**
- Transfert A4 seul (sous-traitance) : 15–25 MAD
- Transfert A4 + pressage sur t-shirt client : 40–80 MAD
- T-shirt coton + impression + finition : 100–180 MAD

**Marge brute : 85–95% sur les transferts seuls**`,
      },
      {
        heading: 'Simulation de rentabilité atelier DTF',
        body: `**Scénario : atelier 100 transferts A4/jour × 22 jours/mois**

Production mensuelle : 2 200 transferts
Prix moyen de vente : 20 MAD/transfert
CA mensuel brut : 44 000 MAD
Coût matière (3 MAD × 2 200) : 6 600 MAD
Marge brute : **37 400 MAD**

Amortissement kit (8 400 MAD sur 12 mois) : 700 MAD/mois
Loyer + électricité + divers : 1 500–2 500 MAD/mois

**Bénéfice net estimé : ≈ 34 000–36 000 MAD/mois**

Le Kit DTF NES (8 400 MAD) se rembourse en **moins de 7 jours de production**.

Ce calcul est basé sur une production de 100 transferts/jour. Même à 30 transferts/jour (production partielle), le kit se rembourse en 3 semaines.`,
      },
    ],
  },

  'sublimation-vs-transfert': {
    title: 'Sublimation vs Sérigraphie vs DTF : quelle technique choisir ?',
    desc: 'Analyse coût/qualité entre sublimation, sérigraphie et DTF pour optimiser vos marges.',
    level: 'Avancé',
    category: 'Sublimation',
    read: '10 min',
    relatedKit: 'Kit Sérigraphie Pro',
    relatedKitSlug: 'kits',
    relatedProducts: [
      { name: 'Kit Sublimation Starter', slug: 'kits' },
      { name: 'Kit Sérigraphie Pro', slug: 'kits' },
      { name: 'Kit DTF Complet', slug: 'kits' },
    ],
    waMsg: "Bonjour NES, j'hésite entre les techniques d'impression. Pouvez-vous m'aider à choisir selon mon projet ?",
    sections: [
      {
        heading: 'La matrice de décision',
        body: `Choisissez votre technique selon 3 facteurs : votre tissu cible, votre budget et votre volume de production.

**Si vous ciblez les textiles polyester et objets rigides (mugs, cadres) :**
→ Sublimation. Le plus simple à maîtriser, le meilleur ROI au démarrage.

**Si vous ciblez les t-shirts coton, associations, clubs sportifs :**
→ Sérigraphie. Qualité supérieure sur coton, couleurs opaques impossibles en sublimation.

**Si vous voulez tout imprimer sans contrainte de tissu :**
→ DTF. Budget plus élevé mais versatilité maximale et marges excellentes sur la sous-traitance.

**Si vous avez 5 000 MAD et aucune expérience :**
→ Sublimation (Kit NES 4 400 MAD). Démarrez simple, maîtrisez une technique, puis diversifiez.`,
      },
    ],
  },

  'base-aqueuse-vs-plastisol': {
    title: "Choisir sa base d'impression : aqueuse vs plastisol",
    desc: 'Comparatif Antex XP10 vs bases plastisol : résistance, prix, usage pro.',
    level: 'Intermédiaire',
    category: 'Sérigraphie',
    read: '6 min',
    relatedKit: 'Kit Sérigraphie Pro',
    relatedKitSlug: 'kits',
    relatedProducts: [
      { name: 'Base aqueuse Antex XP10', slug: 'base-aqueuse-antex-xp10' },
      { name: 'Base aqueuse Antex XP50', slug: 'base-aqueuse-antex-xp50' },
    ],
    waMsg: "Bonjour NES, j'ai une question sur les bases d'impression sérigraphie. Pouvez-vous m'aider à choisir ?",
    sections: [
      {
        heading: 'Encres aqueuses vs plastisol : le bon choix selon votre usage',
        body: `**Bases aqueuses (Antex XP10, XP50) — Recommandées pour débuter**

Avantages :
- Nettoyage à l'eau simple (pas de solvants)
- Pas de risques sanitaires (pas de PVC ni phtalates)
- Séchage à l'air ou sous presse à chaud
- Compatibles avec toutes les soies standard
- Prix accessible : ≈ 80–150 MAD/litre

Inconvénients :
- Résistance lavage légèrement inférieure au plastisol
- Moins opaque sur fonds très foncés (besoin d'une sous-couche blanche)

**Encres plastisol — Pour la production intensive**

Avantages :
- Résistance au lavage maximale (40°C, 200 cycles)
- Opacité maximale, même sur noir
- Couleurs ultra-vives

Inconvénients :
- Nécessitent un four tunnel (160–180°C minimum) pour polymérisation
- Nettoyage au solvant uniquement
- Coût d'équipement supplémentaire

**Notre recommandation :**
Commencez avec la base aqueuse Antex XP10 incluse dans le Kit Sérigraphie Pro. Elle couvre 95% des besoins d'un atelier débutant. Passez au plastisol uniquement si vous avez des clients exigeant une résistance lavage industrielle.`,
      },
    ],
  },

  'guide-soies-serigraphie': {
    title: 'Soies et mailles : quel numéro pour quel motif ?',
    desc: "N°43 halftone, N°77 texte fin, N°120 quadri — le guide complet des soies sérigraphiques.",
    level: 'Avancé',
    category: 'Sérigraphie',
    read: '7 min',
    relatedKit: 'Kit Sérigraphie Pro',
    relatedKitSlug: 'kits',
    relatedProducts: [
      { name: 'Cadre aluminium 40×50cm', slug: 'cadre-aluminium-40x50' },
    ],
    waMsg: "Bonjour NES, j'ai une question technique sur le choix des soies sérigraphiques.",
    sections: [
      {
        heading: 'Comprendre les numéros de soie (maillage)',
        body: `Le numéro d'une soie correspond au nombre de fils par centimètre linéaire. Plus le numéro est élevé, plus la maille est fine.

**Guide de sélection :**

**N°43 — Maille grosse (43 fils/cm)**
- Usage : sous-couches blanches épaisses, encres pailletées, puff print
- Quantité d'encre déposée : très élevée
- Résolution : faible (idéal pour des aplats larges)

**N°77 — Maille standard (77 fils/cm)**
- Usage : textes moyens, logos simples, aplats de couleur
- Quantité d'encre déposée : moyenne
- Résolution : bonne — le plus polyvalent pour débuter

**N°90–120 — Maille fine**
- Usage : textes fins, détails, trames simili (halftone)
- Quantité d'encre déposée : faible
- Résolution : excellente — idéal pour logos complexes

**Règle générale :**
- Motif en aplat + encre classique → N°77
- Texte très fin ou logo détaillé → N°90–120
- Sous-couche blanche sur fond sombre → N°43–61`,
      },
    ],
  },

  'parametrer-imprimante-dtf': {
    title: 'Paramétrer son imprimante DTF : guide technique',
    desc: "ICC profiles, densité d'encre blanche, vitesses. Les réglages pour des transferts parfaits.",
    level: 'Avancé',
    category: 'DTF',
    read: '15 min',
    relatedKit: 'Kit Impression DTF Complet',
    relatedKitSlug: 'kits',
    relatedProducts: [
      { name: 'Encres DTF CMYK+Blanc', slug: 'encres-dtf-cmyk-blanc' },
    ],
    waMsg: "Bonjour NES, j'ai besoin d'aide pour paramétrer mon imprimante DTF.",
    sections: [
      {
        heading: 'Les paramètres critiques pour une imprimante DTF',
        body: `**1. Profil ICC (gestion des couleurs)**
Le profil ICC dit à votre RIP (logiciel d'impression) comment convertir les couleurs de votre fichier en instructions pour les têtes d'impression. Un mauvais profil ICC = couleurs décalées.

Utilisez toujours le profil ICC fourni avec vos encres NES. Si votre profil est incorrect, les couleurs seront soit trop saturées soit trop ternes.

**2. Densité d'encre blanche**
C'est le paramètre le plus critique en DTF. L'encre blanche est la sous-couche opaque qui permet à vos couleurs d'être vives sur n'importe quelle couleur de textile.

- Trop peu de blanc → couleurs pâles sur tissu sombre
- Trop de blanc → transfert épais, sensation plastique, risque de craquellement

Réglage recommandé pour démarrer : 80–90% de densité blanche. Ajustez à 100% pour les tissus très foncés (noir, marine).

**3. Vitesse d'impression**
Vitesse lente (quality mode) = meilleure résolution mais plus long
Vitesse rapide (draft mode) = production accélérée, qualité légèrement réduite

Pour les commandes clients : utilisez toujours le mode Quality.
Pour les tests et prototypes : le mode Draft est suffisant.

**4. Entretien des têtes**
Les têtes d'impression Epson XP600 sont sensibles. Maintenez une humidité de 40–60% dans votre atelier. Faites une impression test chaque matin. Si vous ne produisez pas 3 jours de suite, lancez un cycle de nettoyage.`,
      },
    ],
  },

  'sublimation-mugs-guide': {
    title: 'Sublimation sur mugs : le guide zéro défaut',
    desc: "Technique, température, pression, positionnement. Imprimez des mugs parfaits à chaque fois.",
    level: 'Débutant',
    category: 'Sublimation',
    read: '6 min',
    relatedKit: 'Kit Sublimation Starter',
    relatedKitSlug: 'kits',
    relatedProducts: [
      { name: 'Mugs sublimables blancs', slug: 'mugs-sublimables-blancs' },
      { name: 'Presse mug dédiée', slug: 'presse-mug' },
    ],
    waMsg: "Bonjour NES, je veux démarrer la sublimation sur mugs. Quel matériel me recommandez-vous ?",
    sections: [
      {
        heading: 'Sublimation sur mug : les paramètres exacts',
        body: `**Matériel nécessaire :**
- Presse mug cylindrique (ou presse 5en1 avec accessoire mug)
- Mugs blancs sublimables 11oz (avec revêtement polyester intérieur)
- Papier sublimation A4 ou adapté au format du mug
- Scotch thermique résistant à la chaleur

**Paramètres de pression :**
- Température : 185–200°C
- Durée : 180–210 secondes (3–3,5 min)
- Pression : Moyenne (ne pas serre trop fort — le mug peut casser)

**Étapes pour un mug parfait :**

1. Imprimez votre motif en miroir (retourné) — important !
2. Découpez le papier à la taille exacte du mug
3. Enroulez le papier côté imprimé contre la surface du mug
4. Fixez solidement avec du scotch thermique sur les deux bords
5. Placez dans la presse mug et réglez les paramètres
6. Laissez refroidir 2 minutes avant de retirer le papier
7. Inspectez : les couleurs doivent être vives et nettes

**Erreurs fréquentes sur les mugs :**
- Papier non centré → motif décalé
- Scotch insuffisant → papier bouge pendant le pressage → flou
- Mug avec condensation → taches blanches → pré-chauffez 10 secondes à vide avant`,
      },
    ],
  },
}

// ─── Page ────────────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return Object.keys(GUIDES).flatMap(slug => [
    { locale: 'fr', slug },
    { locale: 'ar', slug },
  ])
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const guide = GUIDES[params.slug]
  if (!guide) return {}
  return {
    title: `${guide.title} — Académie NES`,
    description: guide.desc,
  }
}

const LEVEL_STYLES: Record<string, { bg: string; color: string }> = {
  'Débutant':      { bg: 'var(--tealsoft)',           color: 'var(--teal)' },
  'Intermédiaire': { bg: 'var(--bluesoft)',            color: 'var(--blue)' },
  'Avancé':        { bg: 'rgba(139,92,246,0.12)',      color: '#A78BFA' },
  'Business':      { bg: 'var(--greensoft)',           color: 'var(--green)' },
}

export default function GuideePage({ params }: PageProps) {
  const { locale, slug } = params
  setRequestLocale(locale)

  const guide = GUIDES[slug]
  if (!guide) notFound()

  const ls = LEVEL_STYLES[guide.level] ?? { bg: 'var(--border)', color: 'var(--text2)' }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── Header ───────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '52px 6% 40px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          {/* Breadcrumb */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text2)', marginBottom: 24 }}>
            <Link href={`/${locale}`} className="link-blue" style={{ color: 'var(--text2)', textDecoration: 'none' }}>Accueil</Link>
            <span>/</span>
            <Link href={`/${locale}/academie`} className="link-blue" style={{ color: 'var(--text2)', textDecoration: 'none' }}>Académie</Link>
            <span>/</span>
            <span style={{ color: 'var(--text)' }}>{guide.category}</span>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 4, background: ls.bg, color: ls.color }}>{guide.level}</span>
            <span style={{ fontSize: 12, color: 'var(--text2)' }}>⏱ {guide.read}</span>
            <span style={{ fontSize: 12, color: 'var(--text2)' }}>· {guide.category}</span>
          </div>

          <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(28px,4vw,46px)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.15, marginBottom: 16 }}>
            {guide.title}
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.7 }}>
            {guide.desc}
          </p>

          {/* Related kit banner */}
          {guide.relatedKit && (
            <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: 'var(--bluesoft)', border: '1px solid var(--bluesoft2)', borderRadius: 10 }}>
              <span style={{ fontSize: 20 }}>📦</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)', marginBottom: 2 }}>Kit recommandé pour ce guide</div>
                <div style={{ fontSize: 13, color: 'var(--text)' }}>{guide.relatedKit}</div>
              </div>
              <Link href={`/${locale}/${guide.relatedKitSlug ?? 'kits'}`}
                style={{ padding: '8px 16px', background: 'var(--blue)', color: '#fff', borderRadius: 6, fontSize: 12, fontWeight: 700, textDecoration: 'none', flexShrink: 0 }}>
                Voir le kit →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '52px 6%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
          {guide.sections.map((section, i) => (
            <div key={i}>
              <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
                {section.heading}
              </h2>
              <div style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.85 }}>
                {section.body.split('\n').map((line, j) => {
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <strong key={j} style={{ display: 'block', color: 'var(--text)', fontWeight: 700, marginTop: j > 0 ? 16 : 0, marginBottom: 4 }}>{line.replace(/\*\*/g, '')}</strong>
                  }
                  if (line.startsWith('- ')) {
                    const content = line.slice(2)
                    const parts = content.split(/\*\*(.*?)\*\*/)
                    return (
                      <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                        <span style={{ color: 'var(--blue)', fontWeight: 700, flexShrink: 0 }}>·</span>
                        <span>
                          {parts.map((p, k) => k % 2 === 1 ? <strong key={k} style={{ color: 'var(--text)', fontWeight: 600 }}>{p}</strong> : p)}
                        </span>
                      </div>
                    )
                  }
                  if (line.startsWith('→ ')) {
                    return <div key={j} style={{ padding: '8px 14px', background: 'var(--bluesoft)', borderLeft: '3px solid var(--blue)', borderRadius: '0 6px 6px 0', marginBottom: 8, fontSize: 14, color: 'var(--text)' }}>{line.slice(2)}</div>
                  }
                  if (line === '') return <div key={j} style={{ height: 8 }} />
                  // Inline bold
                  const parts = line.split(/\*\*(.*?)\*\*/)
                  return (
                    <p key={j} style={{ marginBottom: 4 }}>
                      {parts.map((p, k) => k % 2 === 1 ? <strong key={k} style={{ color: 'var(--text)', fontWeight: 600 }}>{p}</strong> : p)}
                    </p>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Related products */}
        {guide.relatedProducts.length > 0 && (
          <div style={{ marginTop: 52, padding: 28, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14 }}>
            <h3 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 18 }}>
              Produits liés à ce guide
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {guide.relatedProducts.map(p => (
                <Link key={p.slug} href={`/${locale}/produit/${p.slug}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, textDecoration: 'none', transition: 'border-color .2s' }}
                  className="art-item"
                >
                  <span style={{ fontSize: 18 }}>📦</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)', flex: 1 }}>{p.name}</span>
                  <span style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 600 }}>Voir →</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ marginTop: 44, padding: '32px 28px', background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: 14, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>💬</div>
          <h3 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 24, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>
            Une question sur ce guide ?
          </h3>
          <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.65, marginBottom: 22, maxWidth: 420, margin: '0 auto 22px' }}>
            Nos techniciens répondent sur WhatsApp en moins de 5 minutes.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={whatsappGeneralLink(guide.waMsg)} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'var(--green)', color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
              {WA_SVG} Poser ma question
            </a>
            {guide.relatedKitSlug && (
              <Link href={`/${locale}/${guide.relatedKitSlug}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'var(--blue)', color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                Voir les kits →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
