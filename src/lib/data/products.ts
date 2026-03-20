import type { WCProduct } from '@/lib/types'

// ─── BASE URL for all product images ─────────────────────────────────────────
const IMG = 'https://nouvelespaceserigraphik.ma/wp-content/uploads'

// ─── Helper ──────────────────────────────────────────────────────────────────
// Images are proxied through /api/img to add the required Referer header
// (WordPress hotlink protection blocks direct access without it).
function img(src: string, alt: string) {
  const fullUrl = `${IMG}${src}`
  const proxied = `/api/img?u=${encodeURIComponent(fullUrl)}`
  return [{ id: Math.floor(Math.random() * 9000) + 1000, src: proxied, name: alt, alt }]
}

function product(
  id: number,
  name: string,
  slug: string,
  price: string,
  regular_price: string,
  sale_price: string,
  images: ReturnType<typeof img>,
  categories: Array<{ id: number; name: string; slug: string }>,
  short_description: string,
  description: string,
  stock_status: 'instock' | 'outofstock' | 'onbackorder' = 'instock',
  stock_quantity: number | null = null,
  featured = false,
  total_sales = 0,
  attributes: WCProduct['attributes'] = [],
  variations: number[] = [],
): WCProduct {
  return {
    id, name, slug,
    permalink: `https://nouvelespaceserigraphik.ma/produit/${slug}/`,
    type: variations.length > 0 ? 'variable' : 'simple',
    status: 'publish',
    description, short_description,
    sku: `NES-${id}`,
    price, regular_price, sale_price,
    on_sale: sale_price !== '' && parseFloat(sale_price) < parseFloat(regular_price),
    purchasable: true,
    total_sales, featured,
    stock_status, stock_quantity, manage_stock: stock_quantity !== null,
    categories,
    tags: [],
    images,
    attributes,
    variations,
    related_ids: [],
    average_rating: (3.8 + Math.random() * 1.2).toFixed(1),
    rating_count: Math.floor(total_sales * 0.15 + 5),
    date_created: '2024-10-01T00:00:00',
    date_modified: '2025-01-15T00:00:00',
  }
}

// ─── CATEGORY refs ───────────────────────────────────────────────────────────
const CAT = {
  presses:    { id: 1,  name: 'Les Presses à Chaud',              slug: 'les-presses-a-chaud' },
  conso_seri: { id: 2,  name: 'Les Consommables de Sérigraphie',  slug: 'les-consommables-de-serigraphie' },
  conso_sub:  { id: 3,  name: 'Les Consommables de Sublimation',  slug: 'les-consommables-de-sublimation' },
  machines:   { id: 5,  name: 'Les Machines de Sérigraphie',      slug: 'les-machines-de-serigraphie' },
  sublimables:{ id: 6,  name: 'Les Produits Sublimables',         slug: 'les-produits-sublimables' },
  antex:      { id: 21, name: 'Antex',                            slug: 'antex' },
  inknovator: { id: 22, name: 'Inknovator',                       slug: 'inknovator' },
  cadres_alu: { id: 23, name: 'Les Cadres Aluminium',             slug: 'les-cadres-aluminium' },
  soie:       { id: 24, name: 'La Soie',                          slug: 'la-soie' },
  poudre:     { id: 25, name: 'Poudre de Transfert',              slug: 'poudre-de-transfert' },
  films:      { id: 26, name: 'Papier et Film de Transfert',      slug: 'papier-film-transfert' },
  raclettes:  { id: 27, name: 'Raclettes',                        slug: 'raclettes' },
  flockage:   { id: 28, name: 'Flockage',                         slug: 'flockage' },
  mylar:      { id: 29, name: 'Mylar',                            slug: 'mylar' },
  paillette:  { id: 30, name: 'Paillette',                        slug: 'paillette' },
  strass:     { id: 31, name: 'Strass',                           slug: 'strass' },
  encre:      { id: 41, name: 'Encre de Sublimation',             slug: 'encre-de-sublimation' },
  papier_sub: { id: 42, name: 'Papier de Sublimation',            slug: 'papier-de-sublimation' },
  flex:       { id: 43, name: 'Flex',                             slug: 'flex' },
  scotch:     { id: 44, name: 'Scotch Thermique & Téflon',        slug: 'scotch-thermique' },
  carrousel:  { id: 51, name: 'Les Carrousels',                   slug: 'les-carrousels' },
  insolation: { id: 52, name: "Machine d'Insolation",             slug: 'machine-dinsolation' },
  sechoirs:   { id: 53, name: 'Séchoirs',                         slug: 'sechoirs' },
  marbre:     { id: 61, name: 'Cadres en Marbre',                 slug: 'cadres-en-marbre' },
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRODUCTS — 80+ SKUs, aggressive B2B Moroccan pricing (MAD)
// Pricing strategy: import cost × 2.5–4× for consumables, ×2–2.5× for machines
// ═══════════════════════════════════════════════════════════════════════════════

export const PRODUCTS: WCProduct[] = [

  // ─── PACKS (anchor offers — high perceived value) ──────────────────────────
  product(1, 'PACK N°1 — Kit Démarrage Complet', 'pack-n1', '4400', '5200', '4400',
    img('/2024/11/press-a-chaud-removebg-preview.png', 'Pack N°1'),
    [CAT.presses],
    'Kit idéal pour démarrer votre activité de personnalisation textile. Presse, consommables et accessoires inclus.',
    '<p>Le <strong>Pack N°1</strong> est conçu pour les ateliers qui démarrent dans la personnalisation textile. Il inclut une presse à chaud de qualité professionnelle, les consommables essentiels et tous les accessoires pour commencer à imprimer dès le premier jour.</p><ul><li>Presse à chaud 38×38cm</li><li>Papiers transfert A4 (lot)</li><li>Scotch thermique + téflon</li><li>Guide de démarrage inclus</li></ul>',
    'instock', 15, true, 87
  ),
  product(2, 'PACK N°2 — Kit Professionnel', 'pack-n2', '5400', '6800', '5400',
    img('/2024/11/press-a-chaud-2-removebg-preview.png', 'Pack N°2'),
    [CAT.presses],
    'Pack professionnel avec presse 5 en 1, encres sublimation et papiers. Idéal pour diversifier vos activités.',
    '<p>Le <strong>Pack N°2</strong> est taillé pour les professionnels qui veulent produire des impressions variées. Avec la presse 5 en 1 FREESUB, vous pouvez personnaliser T-shirts, mugs, assiettes et plus.</p><ul><li>Presse 5 en 1 FREESUB (38×38cm)</li><li>Encres sublimation 4 couleurs 100ml</li><li>Papier sublimation A4 (100 feuilles)</li><li>Mug blanc sublimable ×12</li></ul>',
    'instock', 10, true, 64
  ),
  product(3, 'PACK N°3 — Kit Atelier Avancé', 'pack-n3', '8400', '10500', '8400',
    img('/2024/11/four-3D-removebg-preview.png', 'Pack N°3'),
    [CAT.presses],
    'Le pack le plus complet : presse grande taille, encres 1L, carrousel 1 couleur et tout le nécessaire.',
    '<p>Le <strong>Pack N°3</strong> représente l\'équipement ultime pour un atelier de sérigraphie et sublimation complet. Économisez plus de 2 100 MAD par rapport à l\'achat séparé.</p><ul><li>Presse à chaud 40×50cm auto-ouverture</li><li>Carrousel 1 couleur 1 station</li><li>Encres sublimation 1L ×4 couleurs</li><li>Base aqueuse Antex XP50</li><li>Cadre aluminium 40×50cm ×2</li></ul>',
    'instock', 5, true, 41
  ),

  // ─── PRESSES À CHAUD ──────────────────────────────────────────────────────
  product(10, 'PRESSE À CHAUD JAUNE MANUELLE 40×40CM', 'presse-a-chaud-jaune-40-x-40cm-manuelle-de-moyen-taille', '2800', '2800', '',
    img('/2024/12/jaune-presse-40x40-1.png', 'Presse à chaud jaune 40x40'),
    [CAT.presses],
    'Presse à chaud manuelle 40×40cm. Idéale pour les petits ateliers et la personnalisation T-shirts, sweats.',
    '<p>La <strong>Presse à chaud jaune 40×40cm</strong> est une machine robuste et fiable pour les ateliers de personnalisation textile. Contrôle numérique de la température (0–300°C) et du temps.</p><ul><li>Plateau : 40×40cm</li><li>Température : 0–300°C</li><li>Minuterie : 0–999s</li><li>Pression réglable</li></ul>',
    'instock', 12, false, 53
  ),
  product(11, 'PRESSE À CHAUD JAUNE MANUELLE 60×40CM', 'presse-a-chaud-jaune-manuelle-60-x-40cm', '3500', '3500', '',
    img('/2024/12/40x60j.png', 'Presse à chaud jaune 60x40'),
    [CAT.presses],
    'Grande presse manuelle 60×40cm pour T-shirts, sweats XXL et bannières. Format professionnel.',
    '<p>Le format <strong>60×40cm</strong> permet d\'imprimer les plus grandes impressions en une seule passe. Idéale pour les équipements sportifs et les grandes commandes.</p><ul><li>Plateau : 60×40cm</li><li>Température numérique 0–300°C</li><li>Minuterie digitale</li><li>Structure acier renforcé</li></ul>',
    'instock', 8, false, 36
  ),
  product(12, 'PRESSE À CHAUD 40×50CM AUTO-OUVERTURE', 'presse-a-chaud-40-x-50cm-avec-ouverture-automatique', '4200', '4900', '4200',
    img('/2024/12/presse-40x50autoopen2.png', 'Presse auto-ouverture 40x50'),
    [CAT.presses],
    'Presse professionnelle 40×50cm avec ouverture automatique. Sécurité maximale, productivité accrue.',
    '<p>L\'<strong>ouverture automatique</strong> protège vos impressions et votre matériel. Dès que le temps est écoulé, le plateau s\'ouvre automatiquement — parfait pour les productions en série.</p><ul><li>Plateau : 40×50cm</li><li>Ouverture pneumatique automatique</li><li>Température 0–300°C</li><li>Précision ±1°C</li></ul>',
    'instock', 6, true, 29
  ),
  product(13, 'PRESSE À CHAUD 5 EN 1 — 29×38CM (FREESUB)', 'presse-a-chaud-5-en-1-29-x-38cm', '3800', '3800', '',
    img('/2024/12/free-sub-8en1-2-removebg-preview.png', 'Presse 5 en 1 Freesub 29x38'),
    [CAT.presses],
    'Presse multifonction FREESUB 5 en 1 : T-shirts, mugs, assiettes, casquettes et puzzles en un seul appareil.',
    '<p>La <strong>FREESUB 5 en 1</strong> est la machine polyvalente par excellence. Changez d\'accessoire en quelques secondes pour personnaliser des dizaines de supports différents.</p><ul><li>Plateau plat 29×38cm</li><li>Accessoire mug standard</li><li>Accessoire assiette</li><li>Accessoire casquette</li></ul>',
    'instock', 9, true, 72
  ),
  product(14, 'PRESSE À CHAUD 5 EN 1 — 38×38CM (FREESUB)', 'presse-a-chaud-5-en-1-38-x-38cm', '4500', '5200', '4500',
    img('/2024/12/presse-a-chaud-5en1-fresub-5-removebg-preview.png', 'Presse 5 en 1 Freesub 38x38'),
    [CAT.presses],
    'Version grand plateau FREESUB 5 en 1. Puissance et polyvalence pour les ateliers à fort volume.',
    '<p>Avec son plateau <strong>38×38cm</strong>, la FREESUB grande taille permet d\'imprimer des formats plus importants et d\'accélérer la production. Idéale pour les professionnels.</p>',
    'instock', 7, true, 58
  ),

  // ─── PRESSES CASQUETTE ────────────────────────────────────────────────────
  product(20, 'PRESSE À CASQUETTE MANUELLE', 'presse-a-casquette', '1800', '1800', '',
    img('/2024/10/presse-a-casquette.png', 'Presse casquette manuelle'),
    [CAT.presses, CAT.conso_seri],
    'Presse à casquette manuelle pour personnalisation par transfert thermique sur toutes casquettes standard.',
    '<p>La <strong>presse à casquette manuelle</strong> est la solution économique et efficace pour personnaliser vos casquettes avec précision. Plateau courbé adaptable.</p>',
    'instock', 14, false, 45
  ),
  product(21, 'PRESSE À CASQUETTE 4 SABOTS MANUELLE', 'presse-a-casquette-4-sabot-manuelle', '2400', '2800', '2400',
    img('/2024/12/WhatsApp-Image-2024-12-10-at-15.25.28-1.jpeg', 'Presse casquette 4 sabots'),
    [CAT.presses],
    'Presse à casquette 4 sabots interchangeables — couvre tous types de casquettes du marché.',
    '<p>Avec <strong>4 sabots interchangeables</strong>, cette presse s\'adapte à toutes les formes de casquettes : standard, trucker, béret et casquette enfant.</p>',
    'instock', 8, false, 32
  ),
  product(22, 'PRESSE À CASQUETTE AUTOMATIQUE', 'presse-a-casquette-automatique', '3200', '3800', '3200',
    img('/2024/12/WhatsApp-Image-2024-12-10-at-15.25.28-4.jpeg', 'Presse casquette automatique'),
    [CAT.presses],
    'Presse à casquette automatique pour productions rapides et répétitives. Qualité constante garantie.',
    '<p>L\'<strong>automatisation</strong> de l\'ouverture élimine les erreurs humaines et garantit une qualité constante sur toute la journée de production.</p>',
    'instock', 5, true, 21
  ),

  // ─── PRESSES GRAND FORMAT & SPÉCIALES ────────────────────────────────────
  product(23, 'PRESSE À CHAUD GRAND FORMAT 60×80CM', 'presse-a-chaud-manuelle-grand-format-60-x-80cm', '5500', '5500', '',
    img('/2024/12/presse-60x80-2.png', 'Presse à chaud grand format 60x80'),
    [CAT.presses],
    'Presse à chaud manuelle grand format 60×80cm. Pour impressions XXL sur grandes pièces textiles.',
    '<p>La <strong>Presse 60×80cm</strong> est la solution pour les impressions grand format : drapeaux, tabliers, grandes affiches textiles. Structure acier renforcé, précision numérique.</p><ul><li>Plateau : 60×80cm</li><li>Température 0–300°C</li><li>Minuterie digitale</li></ul>',
    'instock', 4, false, 18
  ),
  product(24, 'PRESSE À CHAUD PNEUMATIQUE DOUBLE STATION 50×60CM', 'presse-a-chaud-pneumatique-double-station-50x60cm', '9500', '11000', '9500',
    img('/2024/12/60x50pneumatique1.png', 'Presse pneumatique double station 50x60'),
    [CAT.presses],
    'Presse pneumatique double station 50×60cm. Production intensive sans fatigue, qualité industrielle.',
    '<p>La <strong>presse pneumatique double station</strong> permet de charger une face pendant que l\'autre chauffe — productivité doublée. Pression parfaitement uniforme par air comprimé.</p><ul><li>Double plateau 50×60cm</li><li>Pression pneumatique</li><li>Production continue</li></ul>',
    'instock', 3, true, 24
  ),
  product(25, 'PRESSE À CHAUD PNEUMATIQUE DOUBLE STATION 60×80CM', 'presse-a-chaud-pneumatique-double-station-60x80cm', '12500', '14500', '12500',
    img('/2024/12/60X80PNEUMATIC.png', 'Presse pneumatique double station 60x80'),
    [CAT.presses],
    'Presse pneumatique double station 60×80cm. Format professionnel pour ateliers à haute cadence.',
    '<p>La version <strong>60×80cm pneumatique</strong> est conçue pour les productions industrielles. Idéale pour les uniformes, vêtements de travail et grandes commandes régulières.</p>',
    'instock', 2, true, 15
  ),
  product(26, 'PRESSE À CHAUD PNEUMATIQUE DOUBLE STATION 120×160CM', 'presse-a-chaud-pneumatique-double-station-120x160cm', '22000', '25000', '22000',
    img('/2024/12/AUTO120X160.png', 'Presse pneumatique industrielle 120x160'),
    [CAT.presses],
    'Presse pneumatique industrielle 120×160cm. Le summum de la production textile professionnelle au Maroc.',
    '<p>La <strong>presse industrielle 120×160cm</strong> est la référence pour les ateliers de production massive. Imprimez des draps, des bannières et des pièces XXL en une seule passe avec une précision parfaite.</p>',
    'instock', 1, true, 9
  ),
  product(27, 'PRESSE À CHAUD POUR MINI ÉTIQUETTE 15×15CM', 'presse-a-chaud-pour-mini-etiquette-logo15-x-15cm', '1200', '1200', '',
    img('/2024/12/presse-15x15-1.png', 'Presse mini étiquette 15x15'),
    [CAT.presses],
    'Petite presse 15×15cm pour logos, étiquettes et petites impressions de précision.',
    '<p>La <strong>presse 15×15cm</strong> est idéale pour les logos de poitrine, les étiquettes de marque et toutes les petites impressions de précision. Compacte et économique.</p>',
    'instock', 10, false, 38
  ),
  product(28, 'PRESSE À CHAUD ROTATIVE 40×50CM', 'presse-a-chaud-rotative-40x50cm', '6500', '7500', '6500',
    img('/2024/12/presse40x50.png', 'Presse rotative 40x50'),
    [CAT.presses],
    'Presse rotative 40×50cm pour textiles tubulaires : manches, jambes de pantalon, chaussettes.',
    '<p>La <strong>presse rotative</strong> permet d\'imprimer sur les textiles tubulaires sans couture de séparation. Idéale pour les chaussettes, manches et jambes de pantalon.</p>',
    'instock', 3, true, 12
  ),
  product(29, 'PRESSE À CHAUD ROUGE MANUELLE 40×40CM', 'presse-a-chaud-rouge-40-x-40-cm-manuelle-de-moyen-taille', '2600', '2600', '',
    img('/2024/12/presse-a-chaud-40x40-1.webp', 'Presse rouge 40x40'),
    [CAT.presses],
    'Presse à chaud rouge manuelle 40×40cm. Robuste et précise pour la personnalisation textile quotidienne.',
    '<p>La <strong>presse rouge 40×40cm</strong> est une alternative colorée et robuste pour les ateliers de personnalisation. Contrôle numérique de température et de temps.</p>',
    'instock', 8, false, 42
  ),
  product(30, 'PRESSE À CHAUD ROUGE MANUELLE 60×40CM', 'presse-a-chaud-rouge-manuelle-60-x-40cm', '3200', '3200', '',
    img('/2024/12/presse-60x40-1.png', 'Presse rouge 60x40'),
    [CAT.presses],
    'Presse rouge 60×40cm pour grands formats. Idéale pour T-shirts XXL et pièces sportswear.',
    '<p>La <strong>presse rouge 60×40cm</strong> combine un grand plateau avec une structure compacte. Parfaite pour les ateliers qui impriment régulièrement des formats L-XXL.</p>',
    'instock', 6, false, 27
  ),
  product(31, 'PRESSE À MUG SIMPLE BLANC', 'presse-a-mug-simple-blanc', '1500', '1500', '',
    img('/2024/12/Presse-a-mug-manuelle-economique.webp', 'Presse à mug simple blanc'),
    [CAT.presses],
    'Presse à mug simple blanc. L\'outil indispensable pour sublimer vos mugs 11oz et 15oz.',
    '<p>La <strong>presse à mug blanche</strong> est l\'entrée de gamme idéale pour démarrer la personnalisation de mugs. Compatible mugs 11oz et 15oz standard. Chauffage rapide 2–3 min.</p>',
    'instock', 12, false, 67
  ),
  product(32, 'PRESSE À MUG SIMPLE NOIR', 'presse-a-mug-simple-noir', '1500', '1500', '',
    img('/2024/10/Mug-Press-Machine-Simple-Heat-Press-Mug-Machine-for-Sublimation-Mugs-110V-and-220V-Available-1.jpg', 'Presse à mug simple noir'),
    [CAT.presses],
    'Presse à mug simple noir. Design professionnel, même performance que le modèle blanc.',
    '<p>La <strong>presse à mug noire</strong> offre les mêmes performances que le modèle blanc dans un design plus professionnel. Compatible 220V, idéale pour le Maroc.</p>',
    'instock', 10, false, 54
  ),
  product(33, 'PRESSE DOUBLE MUG', 'presse-double-mug', '2800', '3200', '2800',
    img('/2024/12/presse-double-mug.webp', 'Presse double mug'),
    [CAT.presses],
    'Presse double mug — sublimez 2 mugs simultanément. Double votre productivité instantanément.',
    '<p>La <strong>presse double mug</strong> permet de sublimer 2 mugs en même temps, doublant votre cadence de production. Idéale pour les ateliers qui produisent plus de 20 mugs/jour.</p>',
    'instock', 5, true, 31
  ),

  // ─── BASES AQUEUSES ANTEX ─────────────────────────────────────────────────
  product(100, 'BASE AQUEUSE ANTEX XP10 — Transparent', 'base-aqueuse-antex-xp10', '180', '180', '',
    img('/2024/10/su-bazli-sedef-pati-22458581c5f88ab0.png', 'Base Aqueuse Antex XP10'),
    [CAT.conso_seri, CAT.antex],
    'Base aqueuse transparente Antex XP10. Formulation professionnelle pour sérigraphie sur tissu clair.',
    '<p>La <strong>Base Aqueuse Antex XP10</strong> est une encre transparente de haute qualité, idéale pour les impressions sur tissus clairs. Excellente solidité au lavage (60°C).</p><ul><li>Transparent / non couvrant</li><li>Pour textiles clairs</li><li>Lavable à 60°C</li><li>Conditionnement : 1kg</li></ul>',
    'instock', null, false, 112,
    [{ id: 1, name: 'Référence', position: 0, visible: true, variation: false, options: ['XP 10 Transparent'] }]
  ),
  product(101, 'BASE AQUEUSE ANTEX XP50 — Blanc Élastique', 'base-aqueuse-antex-xp50', '220', '220', '',
    img('/2024/10/su-bazli-sedef-pati-22458581c5f88ab0.png', 'Base Aqueuse Antex XP50'),
    [CAT.conso_seri, CAT.antex],
    'Base aqueuse blanc élastique Antex XP50. Haute opacité, extensible — idéale pour tissus stretch.',
    '<p>La <strong>Base Aqueuse Antex XP50</strong> offre une <strong>opacité maximale</strong> avec une élasticité professionnelle. Parfaite pour les vêtements de sport et les tissus stretch.</p><ul><li>Blanc élastique haute opacité</li><li>Pour textiles stretch</li><li>Sans craquelage à l\'usage</li><li>Conditionnement : 1kg</li></ul>',
    'instock', null, false, 98,
    [{ id: 1, name: 'Référence', position: 0, visible: true, variation: false, options: ['XP 50 Blanc Élastique'] }]
  ),
  product(102, 'BASE AQUEUSE ANTEX GS600', 'base-aqueuse-antex-gs600', '195', '195', '',
    img('/2024/10/su-bazli-sedef-pati-22458581c5f88ab0.png', 'Base Aqueuse Antex GS600'),
    [CAT.conso_seri, CAT.antex],
    'Base aqueuse Antex GS600 — formulation universelle pour tous supports textiles.',
    '<p>La <strong>Base GS600</strong> est la formule universelle Antex, compatible avec tous les types de textiles. Brillance et tenue exceptionnelles après lavage.</p>',
    'instock', null, false, 76
  ),
  product(103, 'PLASTISOL ANTEX NF60', 'plastisol-antex', '290', '290', '',
    img('/2024/11/plastik-yuksek-kalip-seffaf-22558582148ddadd.jpg', 'Plastisol Antex'),
    [CAT.conso_seri, CAT.antex],
    'Encre plastisol Antex NF60 — opacité maximale, rendu professionnel. Disponible en plusieurs variantes.',
    '<p>Le <strong>Plastisol Antex</strong> est l\'encre de référence pour la sérigraphie professionnelle. Tenue au lavage exceptionnelle (plus de 50 lavages à 60°C). Disponible en NF 60, NF 63, NF 95.</p>',
    'instock', null, true, 134,
    [{ id: 2, name: 'Référence', position: 0, visible: true, variation: true, options: ['NF 60', 'NF 63', 'NF 95'] }],
    [1031, 1032, 1033]
  ),

  // ─── BASES AQUEUSES INKNOVATOR ────────────────────────────────────────────
  product(110, 'BASE AQUEUSE INKNOVATOR — Transparent', 'base-aqueuse-inknovator-transparent', '165', '165', '',
    img('/2024/12/product-02.jpg', 'Base Aqueuse Inknovator Transparent'),
    [CAT.conso_seri, CAT.inknovator],
    'Base aqueuse Inknovator transparente. Formulation premium pour impressions nettes sur tissus clairs.',
    '<p>La gamme <strong>Inknovator</strong> est reconnue pour sa fluidité d\'impression et sa brillance incomparable. La base transparente s\'utilise seule ou en mélange.</p>',
    'instock', null, false, 89
  ),
  product(111, 'BASE AQUEUSE INKNOVATOR — Blanc Élastique', 'base-aqueuse-inknovator-blanc-elastique', '195', '195', '',
    img('/2024/12/product-02.jpg', 'Base Aqueuse Inknovator Blanc'),
    [CAT.conso_seri, CAT.inknovator],
    'Base aqueuse blanc élastique Inknovator. Haute opacité et souplesse pour textiles techniques.',
    '<p>La <strong>base blanc élastique Inknovator</strong> est la référence pour les impressions sur textiles sombres et les tissus stretch sportifs.</p>',
    'instock', null, false, 67
  ),
  product(112, 'PLASTISOL INKNOVATOR — Gamme Pro', 'plastisol', '260', '320', '260',
    img('/2024/12/portfolio-v-1.jpg', 'Plastisol Inknovator'),
    [CAT.conso_seri, CAT.inknovator],
    'Plastisol Inknovator gamme professionnelle. Poly White, Snow White, Clear Base, Gold et plus.',
    '<p>Le <strong>Plastisol Inknovator</strong> est disponible dans une large gamme de couleurs et de finitions pour répondre à tous les besoins de votre atelier.</p><ul><li>Poly White — blanc standard</li><li>Snow White — blanc pur haute opacité</li><li>Clear Base — transparent</li><li>Gold — doré métallique</li></ul>',
    'instock', null, true, 121,
    [{ id: 3, name: 'Couleur', position: 0, visible: true, variation: true, options: ['Poly White', 'Snow White', 'Clear Base', 'Gold', 'Flash White'] }],
    [1121, 1122, 1123, 1124, 1125]
  ),

  // ─── CADRES ALUMINIUM ─────────────────────────────────────────────────────
  product(120, 'CADRE ALUMINIUM 40×50CM', 'cadre-aluminium-40-x-50-cm', '130', '130', '',
    img('/2024/12/61gC992Xr5L.jpg', 'Cadre Aluminium 40x50'),
    [CAT.conso_seri, CAT.cadres_alu],
    'Cadre aluminium anodisé 40×50cm. Le standard professionnel pour la sérigraphie textile.',
    '<p>Le <strong>Cadre Aluminium 40×50cm</strong> est le format le plus utilisé dans les ateliers professionnels. Profil en aluminium anodisé, résistant à la déformation et aux solvants.</p><ul><li>Dimensions : 40×50cm</li><li>Profil aluminium anodisé</li><li>Compatible soies N°15 à N°120</li><li>Résistant aux solvants</li></ul>',
    'instock', null, true, 203
  ),
  product(121, 'CADRE ALUMINIUM 50×60CM', 'cadre-aluminium-50-x-60-cm', '175', '175', '',
    img('/2024/12/telaio_serigrafico_t_shirt.jpeg', 'Cadre Aluminium 50x60'),
    [CAT.conso_seri, CAT.cadres_alu],
    'Cadre aluminium anodisé 50×60cm. Format intermédiaire pour impressions moyens formats.',
    '<p>Le format <strong>50×60cm</strong> est idéal pour les impressions de taille moyenne à grande. Rigidité optimale pour des impressions précises sur tous textiles.</p>',
    'instock', null, false, 145
  ),
  product(122, 'CADRE ALUMINIUM 80×90CM', 'cadre-aluminium-80-x-90-cm', '280', '340', '280',
    img('/2024/12/ecran-de-serigraphie.jpg', 'Cadre Aluminium 80x90'),
    [CAT.conso_seri, CAT.cadres_alu],
    'Cadre aluminium grand format 80×90cm. Pour impressions industrielles et commandes volumiques.',
    '<p>Le <strong>Cadre 80×90cm</strong> est conçu pour les impressions industrielles et les grandes commandes. Profil renforcé pour résister aux tensions élevées.</p>',
    'instock', 20, true, 78
  ),

  // ─── RACLETTES ────────────────────────────────────────────────────────────
  product(130, 'BARRE DE RACLETTE EN ALUMINIUM 1M', 'barre-de-raclette-en-aluminium', '95', '95', '',
    img('/2024/12/Raclette-en-alliage-d-aluminium-1M-50cm-x-2-pi-ces-poign-e-impression-sur-soie.jpg_Q90.jpg_.webp', 'Raclette Aluminium 1m'),
    [CAT.conso_seri, CAT.raclettes],
    'Barre de raclette aluminium 1 mètre. Taille sur mesure possible. Outil indispensable pour des impressions nettes.',
    '<p>La <strong>barre de raclette en aluminium 1m</strong> est découpée à la longueur de votre cadre. Manche aluminium résistant, lame en polyuréthane interchangeable.</p>',
    'instock', null, true, 187
  ),
  product(131, 'RACLETTE ROUGE SOUPLE', 'raclette-rouge-souple', '45', '45', '',
    img('/2024/12/WhatsApp_Image_2022-08-11_at_12.43.41-removebg-preview.png', 'Raclette rouge souple'),
    [CAT.conso_seri, CAT.raclettes],
    'Raclette rouge souple — durabilité Shore 60. Idéale pour impressions détaillées et encres fluides.',
    '<p>La <strong>raclette rouge Shore 60</strong> est souple et adaptée aux encres à faible viscosité et aux détails fins. Longueurs disponibles : 30, 40, 50, 60cm.</p>',
    'instock', null, false, 94
  ),
  product(132, 'RACLETTE VERTE ROBUSTE', 'raclette-verte-robuste', '45', '45', '',
    img('/2024/12/WhatsApp_Image_2022-08-11_at_12.44.32-removebg-preview.png', 'Raclette verte robuste'),
    [CAT.conso_seri, CAT.raclettes],
    'Raclette verte robuste — Shore 70. Pour impressions nécessitant une forte pression et encres épaisses.',
    '<p>La <strong>raclette verte Shore 70</strong> est ferme, idéale pour les encres épaisses (plastisol, paillette) et les impressions qui nécessitent une pression maximale.</p>',
    'instock', null, false, 78
  ),

  // ─── POUDRES DE TRANSFERT ─────────────────────────────────────────────────
  product(140, 'COLLE TRANSFERT POLYESTER 80µ', 'colle-de-transfert-polyester-80-microns', '320', '320', '',
    img('/2024/12/Hot-Melt-Print-Powder-for-Dtf-Heat-Transfer.jpg', 'Colle Transfert Polyester 80µ'),
    [CAT.conso_seri, CAT.poudre],
    'Poudre hot-melt polyester 80 microns pour transferts fins et précis. Haute adhérence.',
    '<p>La <strong>poudre hot-melt 80µ</strong> est idéale pour les transferts délicats nécessitant une couche fine et une adhérence maximale sur textiles synthétiques.</p><ul><li>Épaisseur : 80 microns</li><li>Matière : Polyester</li><li>Application : 150–160°C</li><li>Conditionnement : 1kg</li></ul>',
    'instock', null, false, 134
  ),
  product(141, 'COLLE TRANSFERT POLYESTER 170µ', 'colle-de-transfert-polyester-170-microns', '340', '340', '',
    img('/2024/12/Hot-Melt-Print-Powder-for-Dtf-Heat-Transfer.jpg', 'Colle Transfert Polyester 170µ'),
    [CAT.conso_seri, CAT.poudre],
    'Poudre hot-melt polyester 170 microns. Le standard professionnel pour transferts DTF durables.',
    '<p>La <strong>poudre 170µ</strong> est le standard de l\'industrie pour les transferts DTF. Excellent compromis entre souplesse et résistance au lavage.</p>',
    'instock', null, true, 198
  ),
  product(142, 'COLLE TRANSFERT POLYESTER 250µ', 'colle-de-transfert-polyester-250-microns', '380', '450', '380',
    img('/2024/12/Hot-Melt-Print-Powder-for-Dtf-Heat-Transfer.jpg', 'Colle Transfert Polyester 250µ'),
    [CAT.conso_seri, CAT.poudre],
    'Poudre hot-melt polyester 250 microns. Usage intensif, résistance maximale au lavage.',
    '<p>La <strong>poudre 250µ</strong> est conçue pour les applications exigeant une très forte résistance mécanique et aux lavages répétés (vêtements de travail, sportswear).</p>',
    'instock', null, false, 89
  ),
  product(143, 'COLLE TRANSFERT POLYURÉTHANE 80µ', 'colle-de-transfert-polyurethane-80-microns', '360', '360', '',
    img('/2024/12/poudre-p.webp', 'Colle PU 80µ'),
    [CAT.conso_seri, CAT.poudre],
    'Poudre hot-melt polyuréthane 80µ pour transferts précis sur textiles techniques et stretch.',
    '<p>La <strong>poudre PU 80µ</strong> offre une souplesse supérieure après transfert. Idéale pour les textiles stretch, sportswear et vêtements techniques.</p>',
    'instock', 30, false, 76
  ),
  product(144, 'COLLE TRANSFERT POLYURÉTHANE 170µ', 'colle-de-transfert-polyurethane-170-microns', '390', '390', '',
    img('/2024/12/poudre-p.webp', 'Colle PU 170µ'),
    [CAT.conso_seri, CAT.poudre],
    'Poudre hot-melt polyuréthane 170µ. Robustesse et durabilité pour toutes applications professionnelles.',
    '<p>La <strong>poudre PU 170µ</strong> associe souplesse et robustesse. Résistance aux lavages à 60°C, aux frottements et aux conditions d\'utilisation exigeantes.</p>',
    'instock', null, true, 112
  ),

  // ─── FILMS DE TRANSFERT ───────────────────────────────────────────────────
  product(150, 'FILM DE TRANSFERT TRANSPARENT À CHAUD', 'film-de-transfert-transparent-a-chaud', '85', '85', '',
    img('/2025/01/film.png', 'Film transfert transparent chaud'),
    [CAT.conso_seri, CAT.films],
    'Film de transfert transparent à chaud. Transfert précis de motifs sur textiles. Vendu au mètre linéaire.',
    '<p>Le <strong>film transfert transparent à chaud</strong> est indispensable pour transférer vos motifs sur tout type de textile. Compatible avec toutes les presses à chaud.</p><ul><li>Largeur : 50cm / 60cm</li><li>Application : 150–165°C / 10–15s</li><li>Vendu au mètre</li></ul>',
    'instock', null, true, 167
  ),
  product(151, 'FILM DE TRANSFERT TRANSPARENT À FROID', 'film-de-transfert-transparent-a-froid', '75', '75', '',
    img('/2025/01/transfert.png', 'Film transfert transparent froid'),
    [CAT.conso_seri, CAT.films],
    'Film de transfert à froid pour découpe et application sans presse. Idéal pour vinyle thermocollant.',
    '<p>Le <strong>film de transfert à froid</strong> permet d\'appliquer vos créations sans presse à chaud. Idéal pour les applications ponctuelles et les petites séries.</p>',
    'instock', null, false, 89
  ),
  product(152, 'FILM DTF 30CM', 'film-dtf-30cm', '180', '220', '180',
    img('/2025/01/60cm-dtf.png', 'Film DTF 30cm'),
    [CAT.conso_seri, CAT.films],
    'Film DTF 30cm de large. Impression directe sur film pour transfert sur tout textile. Rouleau 100m.',
    '<p>Le <strong>Film DTF 30cm</strong> est compatible avec toutes les imprimantes DTF du marché. Surface à revêtement spécial pour une absorption optimale des encres.</p><ul><li>Largeur : 30cm</li><li>Longueur : 100m / rouleau</li><li>Épaisseur : 75µm</li></ul>',
    'instock', 25, false, 143
  ),
  product(153, 'FILM DTF 60CM', 'film-dtf-60cm', '320', '400', '320',
    img('/2025/01/60cm-dtf.png', 'Film DTF 60cm'),
    [CAT.conso_seri, CAT.films],
    'Film DTF 60cm grand format. Productivité maximale pour les ateliers à fort volume. Rouleau 100m.',
    '<p>Le <strong>Film DTF 60cm</strong> double la productivité par rapport au 30cm. Compatible toutes imprimantes DTF grand format. Revêtement anti-blocage.</p>',
    'instock', 15, true, 98
  ),
  product(154, 'PAPIER TRANSFERT CLAIR A3', 'papier-de-transfert-clair-a3', '55', '55', '',
    img('/2025/01/A3-CLAIR.png', 'Papier transfert clair A3'),
    [CAT.conso_seri, CAT.films],
    'Papier de transfert clair A3 pour imprimantes jet d\'encre. Personnalisez vos T-shirts de couleur claire.',
    '<p>Le <strong>papier transfert clair A3</strong> permet de personnaliser vos textiles clairs avec n\'importe quelle imprimante jet d\'encre standard. Rendu brillant, résistant au lavage.</p><ul><li>Format : A3</li><li>Quantité : 10 feuilles / paquet</li><li>Pour tissus clairs uniquement</li></ul>',
    'instock', null, false, 234
  ),
  product(155, 'PAPIER TRANSFERT CLAIR A4', 'papier-de-transfert-clair-a4', '40', '40', '',
    img('/2025/01/A4-CLAIR-TRANS.png', 'Papier transfert clair A4'),
    [CAT.conso_seri, CAT.films],
    'Papier de transfert clair A4 jet d\'encre. Le plus économique pour les petites commandes.',
    '<p>Le <strong>papier transfert clair A4</strong> est le point de départ idéal pour la personnalisation textile à la maison ou en petit atelier.</p>',
    'instock', null, false, 312
  ),
  product(156, 'PAPIER TRANSFERT FONCÉ A3', 'papier-de-transfert-fonce-a3', '65', '65', '',
    img('/2025/01/papier-transfert-dark-a3.jpg', 'Papier transfert foncé A3'),
    [CAT.conso_seri, CAT.films],
    'Papier de transfert foncé A3 jet d\'encre. Personnalisez vos T-shirts noirs et foncés sans limite.',
    '<p>Le <strong>papier transfert foncé A3</strong> est la solution pour les textiles noirs et de couleurs sombres. Blanc de couverture intégré, rendu opaque.</p>',
    'instock', null, false, 178
  ),
  product(157, 'PAPIER TRANSFERT FONCÉ A4', 'papier-de-transfert-fonce-a4', '48', '48', '',
    img('/2025/01/DARK-A4.jpg', 'Papier transfert foncé A4'),
    [CAT.conso_seri, CAT.films],
    'Papier de transfert foncé A4 jet d\'encre. Format économique pour textiles foncés.',
    '<p>Le <strong>papier transfert foncé A4</strong> au format économique. Parfait pour les ateliers qui démarrent sur textiles noirs et foncés.</p>',
    'instock', null, false, 256
  ),

  // ─── FLOCKAGE ─────────────────────────────────────────────────────────────
  product(160, 'FLOCAGE PAPIER', 'flocage-papier', '95', '95', '',
    img('/2025/01/Capture.png', 'Flocage Papier'),
    [CAT.conso_seri, CAT.flockage],
    'Papier de flocage pour sérigraphie. Texture veloutée premium pour vos créations textile.',
    '<p>Le <strong>papier de flocage</strong> permet de créer des effets veloutés uniques sur vos impressions. Compatible presse à chaud.</p>',
    'instock', null, false, 67
  ),
  product(161, 'FLOCAGE POLYAMIDE POUDRE', 'flocage-polyamide-poudre', '145', '145', '',
    img('/2025/01/flock.png', 'Flocage Polyamide Poudre'),
    [CAT.conso_seri, CAT.flockage],
    'Poudre de flocage polyamide. Texture douce et résistante pour effets veloutés professionnels.',
    '<p>La <strong>poudre de flocage polyamide</strong> produit un effet velouté de haute qualité. Excellente résistance aux lavages répétés.</p>',
    'instock', 40, false, 54
  ),
  product(162, 'FLOCAGE POLYESTER POUDRE', 'flocage-polyester-poudre', '135', '135', '',
    img('/2025/01/start_01.jpg', 'Flocage Polyester Poudre'),
    [CAT.conso_seri, CAT.flockage],
    'Poudre de flocage polyester. Solution économique pour texture veloutée sur tous textiles.',
    '<p>La <strong>poudre de flocage polyester</strong> est la solution économique pour ajouter une texture douce et professionnelle à vos créations.</p>',
    'instock', null, false, 43
  ),

  // ─── SOIES ────────────────────────────────────────────────────────────────
  product(170, 'SOIE SÉRIGRAPHIE N°15', 'soie-pour-serigraphie-n15', '120', '120', '',
    img('/2024/12/soie-15.jpg', 'Soie Sérigraphie N°15'),
    [CAT.conso_seri, CAT.soie],
    'Soie de sérigraphie N°15 — maille très ouverte pour encres épaisses, paillettes et poudres.',
    '<p>La <strong>Soie N°15</strong> est la maille la plus ouverte, idéale pour les encres très épaisses, les paillettes et les poudres de flocage. Vendue au mètre linéaire (largeur 1m25).</p>',
    'instock', null, false, 78
  ),
  product(171, 'SOIE SÉRIGRAPHIE N°34', 'soie-pour-serigraphie-n34', '130', '130', '',
    img('/2024/12/soie-43-1.jpg', 'Soie Sérigraphie N°34'),
    [CAT.conso_seri, CAT.soie],
    'Soie N°34 — pour plastisol et encres épaisses. Usage courant en sérigraphie textile.',
    '<p>La <strong>Soie N°34</strong> est la maille standard pour le plastisol et les encres épaisses. Robuste et durable, elle convient aux impressions répétées en atelier.</p>',
    'instock', null, false, 92
  ),
  product(172, 'SOIE SÉRIGRAPHIE N°43', 'soie-pour-serigraphie-n43', '130', '130', '',
    img('/2024/12/soie-43-1.jpg', 'Soie Sérigraphie N°43'),
    [CAT.conso_seri, CAT.soie],
    'Soie N°43 — polyvalente pour bases aqueuses et plastisol. La maille la plus utilisée.',
    '<p>La <strong>Soie N°43</strong> est la maille polyvalente par excellence. Compatible avec les bases aqueuses et le plastisol, elle couvre 80% des besoins d\'un atelier standard.</p>',
    'instock', null, true, 167
  ),
  product(173, 'SOIE SÉRIGRAPHIE N°55', 'soie-pour-serigraphie-n55', '140', '140', '',
    img('/2024/12/soie-55.webp', 'Soie Sérigraphie N°55'),
    [CAT.conso_seri, CAT.soie],
    'Soie N°55 — pour encres moyennes et quadrichromie. Précision et définition optimales.',
    '<p>La <strong>Soie N°55</strong> est recommandée pour les impressions quadrichromiques et les encres de viscosité moyenne. Définition nette et reproductibilité parfaite.</p>',
    'instock', null, false, 123
  ),
  product(174, 'SOIE SÉRIGRAPHIE N°62', 'soie-pour-serigraphie-n62', '145', '145', '',
    img('/2024/12/soie-43-1.jpg', 'Soie Sérigraphie N°62'),
    [CAT.conso_seri, CAT.soie],
    'Soie N°62 — maille fine pour encres fluides et impressions détaillées sur papier et tissu.',
    '<p>La <strong>Soie N°62</strong> convient aux encres fluides et aux impressions fines sur papier et tissu. Idéale pour les impressions type publicité et étiquettes.</p>',
    'instock', null, false, 89
  ),
  product(175, 'SOIE SÉRIGRAPHIE N°77', 'soie-pour-serigraphie-n77', '155', '155', '',
    img('/2024/12/soie-43-1.jpg', 'Soie Sérigraphie N°77'),
    [CAT.conso_seri, CAT.soie],
    'Soie N°77 — haute définition pour UV et encres très fluides. Impression photo et demi-teintes.',
    '<p>La <strong>Soie N°77</strong> est la maille pour les impressions haute définition : reproduction photo, demi-teintes fines et typographie de précision.</p>',
    'instock', 60, false, 54
  ),
  product(176, 'SOIE SÉRIGRAPHIE N°90', 'soie-pour-serigraphie-n90', '160', '160', '',
    img('/2024/12/soie-43.jpg', 'Soie Sérigraphie N°90'),
    [CAT.conso_seri, CAT.soie],
    'Soie N°90 — maille ultra-fine pour encres UV et impressions haute résolution.',
    '<p>La <strong>Soie N°90</strong> est réservée aux applications UV et aux impressions de précision maximale sur supports rigides.</p>',
    'instock', 40, false, 32
  ),
  product(177, 'SOIE SÉRIGRAPHIE N°120', 'soie-pour-serigraphie-n120', '170', '170', '',
    img('/2024/12/Hb268b864d3114ebe98a5c8e1bd106b34F.jpg', 'Soie Sérigraphie N°120'),
    [CAT.conso_seri, CAT.soie],
    'Soie N°120 — la maille la plus fine pour encres UV et circuits imprimés.',
    '<p>La <strong>Soie N°120</strong> est la référence pour l\'électronique et les applications industrielles nécessitant une précision maximale.</p>',
    'instock', 30, false, 21
  ),

  // ─── MYLAR ────────────────────────────────────────────────────────────────
  product(180, 'MYLAR — Film Pochoir Réutilisable', 'mylar', '110', '110', '',
    img('/2025/01/su-bazli-varak-almaz-22458581cd3b6ec9.jpg', 'Mylar film pochoir'),
    [CAT.conso_seri, CAT.mylar],
    'Film mylar pour création de pochoirs précis et réutilisables. Résistant aux solvants.',
    '<p>Le <strong>Film Mylar</strong> est le support de référence pour la création de pochoirs durables. Résistant aux encres solvant et à l\'eau, il peut être utilisé des centaines de fois.</p>',
    'instock', null, false, 87
  ),

  // ─── PAILLETTE ────────────────────────────────────────────────────────────
  product(181, 'PAILLETTE POUR SÉRIGRAPHIE', 'paillette', '75', '75', '',
    img('/2025/01/su-bazli-sim-tutkali-22458581c066d656.jpg', 'Paillette sérigraphie'),
    [CAT.conso_seri, CAT.paillette],
    'Paillettes pour sérigraphie. Effets brillants et créatifs sur tous vos projets textile.',
    '<p>Les <strong>paillettes pour sérigraphie</strong> s\'utilisent mélangées à une base transparente pour créer des effets scintillants uniques. Disponibles en plusieurs coloris et tailles.</p>',
    'instock', null, false, 65
  ),

  // ─── STRASS ───────────────────────────────────────────────────────────────
  product(182, 'STRASS POUR SUBLIMATION', 'strass-pour-sublimation', '95', '95', '',
    img('/2025/01/81KQJYtGzpL._AC_UL320_.jpg', 'Strass sublimation'),
    [CAT.conso_seri, CAT.strass],
    'Strass thermocollants pour sublimation et sérigraphie. Ajoutez brillance et élégance à vos créations.',
    '<p>Les <strong>strass thermocollants</strong> se posent facilement à la presse à chaud ou au fer. Résistants aux lavages et aux frottements. Disponibles en plusieurs tailles et coloris.</p>',
    'instock', null, false, 54
  ),

  // ─── ENCRES SUBLIMATION ───────────────────────────────────────────────────
  product(200, 'ENCRE SUBLIMATION 100ML', 'encre-de-sublimation-100ml', '85', '85', '',
    img('/2025/01/ink.jpg', 'Encre sublimation 100ml'),
    [CAT.conso_sub, CAT.encre],
    'Encres sublimation 100ml Cyan, Magenta, Jaune ou Noir. Couleurs vives, résistance optimale.',
    '<p>Les <strong>encres sublimation 100ml</strong> sont compatibles avec toutes les imprimantes Epson L-series modifiées. Couleurs éclatantes et résistance UV supérieure.</p>',
    'instock', null, false, 234,
    [{ id: 10, name: 'Couleur', position: 0, visible: true, variation: true, options: ['Cyan', 'Magenta', 'Jaune', 'Noir'] }],
    [2001, 2002, 2003, 2004]
  ),
  product(201, 'ENCRE SUBLIMATION 1L', 'encre-de-sublimation-1l', '320', '390', '320',
    img('/2025/01/INK-C.png', 'Encre sublimation 1L'),
    [CAT.conso_sub, CAT.encre],
    'Encres sublimation 1L pour professionnels. Le prix de gros pour les ateliers à fort volume.',
    '<p>Les <strong>encres sublimation 1L</strong> sont le choix des professionnels. Économisez jusqu\'à 35% par rapport aux flacons 100ml. Compatible Epson, Ricoh et équivalents.</p>',
    'instock', null, true, 156,
    [{ id: 10, name: 'Couleur', position: 0, visible: true, variation: true, options: ['Cyan', 'Magenta', 'Jaune', 'Noir'] }],
    [2011, 2012, 2013, 2014]
  ),
  product(202, 'ENCRE DTF 0.5L', 'encre-dtf-0-5l', '250', '250', '',
    img('/2025/01/ink.jpg', 'Encre DTF 0.5L'),
    [CAT.conso_sub, CAT.encre],
    'Encres DTF 0.5L pour imprimantes Direct-to-Film. Toutes couleurs disponibles.',
    '<p>Les <strong>encres DTF 0.5L</strong> sont formulées spécialement pour les imprimantes DTF. Pigments ultra-fins pour une reproduction fidèle des couleurs.</p>',
    'instock', null, false, 98
  ),
  product(203, 'ENCRE DTF 1L', 'encre-dtf-1l', '450', '540', '450',
    img('/2025/01/ink.jpg', 'Encre DTF 1L'),
    [CAT.conso_sub, CAT.encre],
    'Encres DTF 1L grand format pour ateliers à haute cadence de production.',
    '<p>Les <strong>encres DTF 1L</strong> garantissent une production ininterrompue avec des couleurs stables et reproductibles sur toute la durée du rouleau.</p>',
    'instock', null, true, 67
  ),

  // ─── FLEX ─────────────────────────────────────────────────────────────────
  product(210, 'FLEX BLANC', 'flex-blanc', '45', '45', '',
    img('/2025/01/WHITE.png', 'Flex Blanc'),
    [CAT.conso_sub, CAT.flex],
    'Flex thermocollant blanc. Le classique pour personnalisation T-shirts et textiles noirs.',
    '<p>Le <strong>flex blanc</strong> est le must des créateurs. Rendu mat ou satiné selon la finition, résistance au lavage à 60°C garantie.</p><ul><li>Largeur : 50cm</li><li>Vendu au mètre</li><li>Application : 150–160°C / 15s</li></ul>',
    'instock', null, true, 287
  ),
  product(211, 'FLEX BLACK', 'flex-black', '45', '45', '',
    img('/2025/01/BLACK-removebg-preview.png', 'Flex Noir'),
    [CAT.conso_sub, CAT.flex],
    'Flex thermocollant noir. Pour personnalisation sur textiles clairs avec rendu mat premium.',
    '<p>Le <strong>flex noir</strong> produit un rendu mat élégant sur tous textiles clairs. Résistance au lavage et aux frottements supérieure.</p>',
    'instock', null, false, 198
  ),
  product(212, 'FLEX BLEU ROYAL', 'flex-bleu-royal', '45', '45', '',
    img('/2025/01/BLUE-removebg-preview.png', 'Flex Bleu Royal'),
    [CAT.conso_sub, CAT.flex],
    'Flex thermocollant bleu royal. Couleur vive et saturée pour créations sportives et clubs.',
    '<p>Le <strong>flex bleu royal</strong> est la référence pour les équipements sportifs, tenues de club et personnalisations événementielles.</p>',
    'instock', null, false, 134
  ),
  product(213, 'FLEX BLEU MARINE', 'flex-bleu-marine', '45', '45', '',
    img('/2025/01/NAVY_BLUE-removebg-preview.png', 'Flex Bleu Marine'),
    [CAT.conso_sub, CAT.flex],
    'Flex thermocollant bleu marine. Élégance sobre pour uniformes et workwear.',
    '<p>Le <strong>flex bleu marine</strong> est idéal pour les uniformes d\'entreprise, vêtements de travail et tenues professionnelles.</p>',
    'instock', null, false, 112
  ),
  product(214, 'FLEX ELECTRIC RED', 'flex-electric-red', '45', '45', '',
    img('/2025/01/ELECTRIC_RED-removebg-preview.png', 'Flex Rouge Électrique'),
    [CAT.conso_sub, CAT.flex],
    'Flex thermocollant rouge électrique. Impact visuel maximal pour vos créations.',
    '<p>Le <strong>flex rouge électrique</strong> offre un impact visuel exceptionnel. Parfait pour les créations sportives et les équipements de sécurité.</p>',
    'instock', null, false, 98
  ),
  product(215, 'FLEX BABY PINK', 'flex-baby-pink', '45', '45', '',
    img('/2025/01/BABY_PINK-removebg-preview.png', 'Flex Baby Pink'),
    [CAT.conso_sub, CAT.flex],
    'Flex thermocollant rose pastel. Tendance et polyvalent pour mode et personnalisation féminine.',
    '<p>Le <strong>flex baby pink</strong> est la couleur tendance pour la personnalisation mode et les créations féminines.</p>',
    'instock', null, false, 87
  ),
  product(216, 'FLEX ATOLL BLUE', 'flex-atoll-bleu', '45', '45', '',
    img('/2025/01/ATOLL_BLUE-removebg-preview.png', 'Flex Atoll Blue'),
    [CAT.conso_sub, CAT.flex],
    'Flex thermocollant bleu atoll. Turquoise vibrant pour créations estivales et sportswear.',
    '<p>Le <strong>flex bleu atoll</strong> apporte une touche estivale et fraîche à toutes vos créations textiles.</p>',
    'instock', null, false, 65
  ),
  product(217, 'FLEX DARK GREY', 'flex-dark-grey', '45', '45', '',
    img('/2025/01/DARK_GREY-removebg-preview.png', 'Flex Dark Grey'),
    [CAT.conso_sub, CAT.flex],
    'Flex thermocollant gris foncé. Sobre et élégant pour workwear et collections premium.',
    '<p>Le <strong>flex gris foncé</strong> est parfait pour les collections premium et le workwear haut de gamme.</p>',
    'instock', null, false, 76
  ),

  // ─── MACHINES DE SÉRIGRAPHIE ──────────────────────────────────────────────
  product(300, 'CARROUSEL 1 COULEUR 1 STATION', 'carrousel-1-couleur-1-station', '3500', '3500', '',
    img('/2024/12/VEVOR-imprimante-cran-1-couleur-Kit-d-impression-sur-soie-55x45cm-Machine-d-impression-sur-T.jpg_Q90.jpg_.webp', 'Carrousel 1 couleur 1 station'),
    [CAT.machines, CAT.carrousel],
    'Carrousel de sérigraphie 1 couleur 1 station. Idéal pour démarrer la sérigraphie professionnelle.',
    '<p>Le <strong>Carrousel 1C/1S</strong> est le point d\'entrée idéal dans la sérigraphie professionnelle. Structure robuste, réglages précis, compatible tous cadres standards.</p>',
    'instock', 8, false, 42
  ),
  product(301, 'CARROUSEL 3 COULEURS 1 STATION + SÉCHOIR', 'carrousel-3-couleurs-1-station-avec-sechoir', '5800', '7200', '5800',
    img('/2024/12/HTB1Xkq7JVXXXXXWXVXXq6xXFXXXH.jpg', 'Carrousel 3 couleurs avec séchoir'),
    [CAT.machines, CAT.carrousel],
    'Carrousel 3 couleurs avec séchoir intégré. Commencez les impressions multicolores directement.',
    '<p>Le <strong>Pack Carrousel 3C + séchoir</strong> vous permet de démarrer les impressions multicolores immédiatement. Le séchoir intégré accélère considérablement la production.</p>',
    'instock', 5, true, 28
  ),
  product(302, 'CARROUSEL 4 COULEURS 1 STATION', 'carrousel-4-couleurs-1-station', '6500', '6500', '',
    img('/2024/12/Machine-d-impression-d-cran-en-soie-4-couleurs-1-Station-T-Shirt-quipement-carrousel-nouveau.jpg', 'Carrousel 4 couleurs 1 station'),
    [CAT.machines, CAT.carrousel],
    'Carrousel 4 couleurs 1 station. Impressions quadrichromiques professionnelles pour ateliers actifs.',
    '<p>Le <strong>Carrousel 4C/1S</strong> est la référence pour les impressions quadrichromiques professionnelles. Platine précise et réglages fins pour un calage parfait.</p>',
    'instock', 4, false, 19
  ),
  product(303, 'CARROUSEL 4 COULEURS 2 STATIONS', 'carrousel-4-couleurs-2-stations', '9500', '11500', '9500',
    img('/2024/12/HTB1.Z4kXntYBeNjy1Xdq6xXyVXab.jpg', 'Carrousel 4 couleurs 2 stations'),
    [CAT.machines, CAT.carrousel],
    'Carrousel professionnel 4 couleurs 2 stations. Productivité doublée pour ateliers à fort volume.',
    '<p>Avec <strong>2 stations d\'impression</strong>, le 4C/2S permet à 2 opérateurs de travailler simultanément, doublant ainsi votre capacité de production.</p>',
    'instock', 3, true, 14
  ),
  product(304, 'CARROUSEL 4 COULEURS 4 STATIONS', 'carrousel-4-couleurs-4-stations', '14500', '14500', '',
    img('/2024/12/Hf7346dea786b4d9797e41fda5fe34aee2.png_960x960.webp', 'Carrousel 4 couleurs 4 stations'),
    [CAT.machines, CAT.carrousel],
    'Carrousel 4 couleurs 4 stations. La machine des ateliers professionnels à haute production.',
    '<p>Le <strong>Carrousel 4C/4S</strong> est l\'équipement des ateliers professionnels sérieux. 4 postes d\'impression indépendants pour une productivité maximale.</p>',
    'instock', 2, false, 9
  ),
  product(305, 'CARROUSEL 4 COULEURS 4 STATIONS PRO ALUMINIUM', 'carrousel-4-couleurs-4-stations-pro-en-aluminium', '18500', '22000', '18500',
    img('/2024/12/4-couleurs-4-stations-pro.jpg', 'Carrousel Pro Aluminium 4x4'),
    [CAT.machines, CAT.carrousel],
    'Carrousel PRO aluminium 4×4. Le summum de la précision et de la durabilité pour les grands ateliers.',
    '<p>Le <strong>Carrousel PRO Aluminium 4C/4S</strong> est la référence absolue de l\'industrie. Structure entièrement en aluminium anodisé, réglages micrométiques, rotation fluide et silencieuse.</p>',
    'instock', 2, true, 7
  ),
  product(306, 'CARROUSEL 6 COULEURS 6 STATIONS', 'carrousel-6-couleurs-6-stations', '24000', '28000', '24000',
    img('/2024/12/HTB1WuPgXyfrK1RjSspbq6A4pFXaw.jpg', 'Carrousel 6 couleurs 6 stations'),
    [CAT.machines, CAT.carrousel],
    'Carrousel industriel 6 couleurs 6 stations. Haute productivité pour imprimeries et grands ateliers.',
    '<p>Le <strong>Carrousel 6C/6S</strong> est conçu pour les imprimeries et les grands ateliers de personnalisation. 6 couleurs en une seule rotation.</p>',
    'instock', 1, true, 4
  ),
  product(307, 'CARROUSEL 8 COULEURS 8 STATIONS', 'carrousel-8-couleurs-8-stations', '35000', '42000', '35000',
    img('/2024/12/H8513c757fe764cd79d0c6a85d38d53f57.jpg_960x960.webp', 'Carrousel 8 couleurs 8 stations'),
    [CAT.machines, CAT.carrousel],
    'Carrousel industriel 8 couleurs 8 stations. La machine des leaders de la sérigraphie au Maroc.',
    '<p>Le <strong>Carrousel 8C/8S</strong> est la machine des leaders. Production industrielle, qualité d\'impression irréprochable sur tous supports textiles.</p>',
    'onbackorder', null, true, 3
  ),

  // ─── MACHINE D'INSOLATION ─────────────────────────────────────────────────
  product(310, "MACHINE D'INSOLATION 12 AMPOULES", 'machine-dinsolation-de-12-ampoules', '4500', '5500', '4500',
    img('/2024/12/ok.png', "Machine d'insolation"),
    [CAT.machines, CAT.insolation],
    "Table d'insolation UV 12 ampoules pour création de pochoirs sérigraphiques. Qualité professionnelle.",
    '<p>La <strong>table d\'insolation 12 ampoules</strong> permet d\'insoler vos cadres avec précision et homogénéité. Chronomètre intégré, plateau en verre sécurit, vide d\'aspiration.</p>',
    'instock', 4, true, 23
  ),

  // ─── SÉCHOIRS ─────────────────────────────────────────────────────────────
  product(320, 'PISTOLET THERMIQUE 2000W', 'sechoir-manuel', '450', '450', '',
    img('/2024/12/WhatsApp_Image_2024-12-20_at_12.20.02-removebg-preview.png', 'Pistolet thermique 2000W'),
    [CAT.machines, CAT.sechoirs],
    'Pistolet thermique 2000W pour séchage rapide des encres sérigraphiques et sublimation.',
    '<p>Le <strong>pistolet thermique 2000W</strong> est l\'outil indispensable pour le séchage rapide des encres. 2 vitesses, température réglable, buse concentrée.</p>',
    'instock', null, false, 87
  ),
  product(321, 'PISTOLET THERMIQUE DIGITAL 2000W', 'pistolet-thermique-digital', '650', '780', '650',
    img('/2024/12/WhatsApp_Image_2024-12-20_at_12.20.04-removebg-preview.png', 'Pistolet thermique digital'),
    [CAT.machines, CAT.sechoirs],
    'Pistolet thermique digital 2000W avec affichage LCD. Précision de température pour professionnels.',
    '<p>Le <strong>pistolet thermique digital 2000W</strong> est la version professionnelle avec contrôle précis de la température via écran LCD. Idéal pour les ateliers exigeants.</p>',
    'instock', null, false, 54
  ),

  // ─── MACHINE DE SÉRIGRAPHIE CYLINDRIQUE ───────────────────────────────────
  product(330, 'MACHINE SÉRIGRAPHIE CYLINDRIQUE', 'machine-de-serigraphie-cylindrique', '5500', '6800', '5500',
    img('/2024/12/serigr1.jpg', 'Machine sérigraphie cylindrique'),
    [CAT.machines],
    'Machine de sérigraphie cylindrique pour impression sur gobelets, bouteilles et objets ronds.',
    '<p>La <strong>machine de sérigraphie cylindrique</strong> permet d\'imprimer sur tous les objets ronds ou coniques : gobelets, mugs, bouteilles, stylos. Production semi-automatique.</p>',
    'instock', 3, true, 12
  ),

  // ─── PRODUITS SUBLIMABLES ─────────────────────────────────────────────────
  product(400, 'CADRE EN MARBRE SH02', 'cadre-en-marbre-sh02', '85', '85', '',
    img('/2024/12/SH02.png', 'Cadre en marbre SH02'),
    [CAT.sublimables, CAT.marbre],
    'Cadre photo en marbre sublimable SH02. Personnalisez vos plus beaux souvenirs avec élégance.',
    '<p>Le <strong>cadre en marbre SH02</strong> est en résine imitation marbre, sublimable sur la face avant. Rendu photographique exceptionnel après sublimation.</p>',
    'instock', null, false, 87
  ),
  product(401, 'CADRE EN MARBRE SH03', 'cadre-en-marbre-sh03', '85', '85', '',
    img('/2024/12/SH03.png', 'Cadre en marbre SH03'),
    [CAT.sublimables, CAT.marbre],
    'Cadre photo en marbre sublimable SH03. Format portrait, veinures marbre naturel.',
    '<p>Le <strong>cadre SH03</strong> offre un format portrait élégant avec des veinures marbre naturelles. Idéal pour les photos de famille et portraits professionnels.</p>',
    'instock', null, false, 65
  ),
  product(402, 'CADRE EN MARBRE SH04', 'cadre-en-marbre-sh04', '85', '85', '',
    img('/2024/12/SH04.png', 'Cadre en marbre SH04'),
    [CAT.sublimables, CAT.marbre],
    'Cadre photo en marbre sublimable SH04. Design contemporain pour décoration intérieure premium.',
    '<p>Le <strong>cadre SH04</strong> au design contemporain s\'intègre parfaitement dans tous les styles décoratifs modernes.</p>',
    'instock', null, false, 54
  ),
  product(403, 'CADRE EN MARBRE SH15', 'cadre-en-marbre-sh15', '95', '95', '',
    img('/2024/12/SH15.png', 'Cadre en marbre SH15'),
    [CAT.sublimables, CAT.marbre],
    'Cadre en marbre SH15 grand format. Pour vos plus belles photos panoramiques.',
    '<p>Le <strong>cadre SH15</strong> en grand format permet de sublimer vos photos panoramiques et vos créations artistiques avec un rendu luxueux.</p>',
    'instock', null, false, 43
  ),
  product(404, 'CADRE EN MARBRE SH25', 'cadre-ne-marbre-sh25', '95', '95', '',
    img('/2024/12/SH25.png', 'Cadre en marbre SH25'),
    [CAT.sublimables, CAT.marbre],
    'Cadre en marbre SH25. Format carré pour vos créations artistiques et photos Instagram.',
    '<p>Le format carré du <strong>cadre SH25</strong> est parfait pour les photos carrées et les créations artistiques modernes.</p>',
    'instock', null, false, 38
  ),
  product(405, 'CADRE EN MARBRE SH31', 'cadre-en-marbre-sh31', '95', '95', '',
    img('/2024/12/SH31.png', 'Cadre en marbre SH31'),
    [CAT.sublimables, CAT.marbre],
    'Cadre en marbre SH31. Veinures dorées pour un rendu luxueux unique.',
    '<p>Le <strong>cadre SH31</strong> se distingue par ses veinures dorées sur fond marbre noir. Produit haut de gamme idéal pour les cadeaux d\'entreprise et les événements prestige.</p>',
    'instock', null, false, 31
  ),
  product(406, 'CADRE EN MARBRE SH39', 'cadre-en-marbre-sh39', '110', '110', '',
    img('/2024/12/SH39.png', 'Cadre en marbre SH39'),
    [CAT.sublimables, CAT.marbre],
    'Cadre en marbre SH39 grand format. Effet marbre blanc authentique, sublimation haute définition.',
    '<p>Le <strong>cadre SH39</strong> grand format offre une surface de sublimation généreuse pour vos créations XL. Marbre blanc avec veinures gris perle, finition brossée.</p>',
    'instock', null, false, 27
  ),
  product(407, 'CADRE EN MARBRE SH57', 'cadre-en-marbre-sh57', '110', '130', '110',
    img('/2024/12/SH57.png', 'Cadre en marbre SH57'),
    [CAT.sublimables, CAT.marbre],
    'Cadre en marbre SH57 panoramique. Format allongé pour vos frises et créations originales.',
    '<p>Le format panoramique du <strong>cadre SH57</strong> est idéal pour les frises décoratives, les citations et les créations artistiques horizontales. Rendu marbre noir mat exceptionnel.</p>',
    'instock', null, false, 22
  ),
  product(408, 'CADRE EN MARBRE SH59', 'cadre-en-marbre-sh59', '95', '95', '',
    img('/2024/12/SH59.png', 'Cadre en marbre SH59'),
    [CAT.sublimables, CAT.marbre],
    'Cadre en marbre SH59. Design ovale raffiné pour portraits et créations artistiques.',
    '<p>Le <strong>cadre SH59</strong> au design ovale apporte une touche classique et raffinée. Parfait pour les portraits de famille et les événements comme mariages et baptêmes.</p>',
    'instock', null, false, 19
  ),
  product(409, 'CADRE EN MARBRE SH60', 'cadre-en-marbre-sh60', '95', '95', '',
    img('/2024/12/SH60.png', 'Cadre en marbre SH60'),
    [CAT.sublimables, CAT.marbre],
    'Cadre en marbre SH60. Finition marbre rose — édition limitée.',
    '<p>Le <strong>cadre SH60</strong> en marbre rose est une édition limitée très appréciée pour les cadeaux féminins et les événements romantiques (mariage, Saint-Valentin, fête des mères).</p>',
    'instock', null, false, 16
  ),

  // ─── MUGS & TASSES SUBLIMABLES ────────────────────────────────────────────
  product(410, 'MUG BLANC CLASSIQUE 11oz', 'mug-blanc-classique-11oz', '25', '25', '',
    img('/2024/12/WhatsApp_Image_2024-12-20_at_12.12.26-removebg-preview.png', 'Mug blanc 11oz'),
    [CAT.sublimables, { id: 62, name: 'Mugs & Tasses', slug: 'mugs-tasses' }],
    'Mug blanc 11oz (325ml) en céramique, idéal pour la sublimation. Revêtement sublimable haute qualité.',
    '<p>Le <strong>mug blanc 11oz</strong> est le classique indétrônable de la personnalisation. En céramique qualité A, revêtement sublimable garantissant des couleurs vives et durables. Compatible avec toutes les presses à mug.</p>',
    'instock', null, false, 320
  ),
  product(411, 'MUG BLANC 15oz GRANDE CONTENANCE', 'mug-blanc-15oz', '32', '32', '',
    img('/2024/12/WhatsApp_Image_2024-12-20_at_12.12.27-removebg-preview.png', 'Mug blanc 15oz'),
    [CAT.sublimables, { id: 62, name: 'Mugs & Tasses', slug: 'mugs-tasses' }],
    'Mug blanc 15oz (440ml) grande contenance pour sublimation. Format XXL très apprécié.',
    '<p>Le <strong>mug 15oz</strong> est la version XL du mug classique. Idéal pour les grands buveurs et les cadeaux corporate. Même qualité de sublimation, surface imprimable étendue.</p>',
    'instock', null, false, 187
  ),
  product(412, 'MUG MAGIQUE NOIR (COLOR CHANGING)', 'mug-magique-noir', '45', '55', '45',
    img('/2024/12/WhatsApp_Image_2024-12-20_at_12.12.28-removebg-preview.png', 'Mug magique noir'),
    [CAT.sublimables, { id: 62, name: 'Mugs & Tasses', slug: 'mugs-tasses' }],
    'Mug magique noir qui révèle votre sublimation au contact d\'une boisson chaude. Effet wow garanti.',
    '<p>Le <strong>mug magique</strong> est noir à froid et révèle votre impression dès qu\'une boisson chaude est versée. Effet surprise spectaculaire, idéal pour les cadeaux personnalisés et les événements marquants.</p>',
    'instock', null, true, 243
  ),
  product(413, 'TASSE CONIQUE 6oz EXPRESSO', 'tasse-conique-6oz', '28', '28', '',
    img('/2024/12/WhatsApp_Image_2024-12-20_at_12.12.29-removebg-preview.png', 'Tasse conique 6oz'),
    [CAT.sublimables, { id: 62, name: 'Mugs & Tasses', slug: 'mugs-tasses' }],
    'Tasse conique 6oz pour café expresso, sublimable. Format compact et élégant.',
    '<p>La <strong>tasse conique 6oz</strong> est parfaite pour les cafés expresso et les thés. Son design conique élégant en fait un excellent support cadeaux pour entreprises et particuliers.</p>',
    'instock', null, false, 145
  ),
  product(414, 'MUG PAILLETÉ (GLITTER) DORÉ', 'mug-pailletes-dore', '55', '65', '55',
    img('/2024/12/WhatsApp_Image_2024-12-20_at_12.12.30-removebg-preview.png', 'Mug pailleté doré'),
    [CAT.sublimables, { id: 62, name: 'Mugs & Tasses', slug: 'mugs-tasses' }],
    'Mug pailleté doré 11oz pour sublimation. Effet luxe parfait pour cadeaux premium.',
    '<p>Le <strong>mug pailleté doré</strong> combine la brillance du pailletage doré avec la qualité de la sublimation. Rendu photo impeccable sur fond doré scintillant. Idéal pour mariages, anniversaires et cadeaux VIP.</p>',
    'instock', null, true, 98
  ),
  product(415, 'MUG PAILLETÉ (GLITTER) ARGENTÉ', 'mug-pailletes-argente', '55', '65', '55',
    img('/2024/12/WhatsApp_Image_2024-12-20_at_12.12.31-removebg-preview.png', 'Mug pailleté argenté'),
    [CAT.sublimables, { id: 62, name: 'Mugs & Tasses', slug: 'mugs-tasses' }],
    'Mug pailleté argenté 11oz pour sublimation. Rendu premium et élégant.',
    '<p>Le <strong>mug pailleté argenté</strong> apporte une touche de modernité avec ses reflets argentés scintillants. Parfait pour les cadeaux d\'entreprise et les collections premium.</p>',
    'instock', null, false, 76
  ),
  product(416, 'MUG PANORAMIQUE 11oz (WRAP-AROUND)', 'mug-panoramique-11oz', '35', '35', '',
    img('/2024/12/WhatsApp_Image_2024-12-20_at_12.12.32-removebg-preview.png', 'Mug panoramique 11oz'),
    [CAT.sublimables, { id: 62, name: 'Mugs & Tasses', slug: 'mugs-tasses' }],
    'Mug panoramique 11oz — impression sur toute la surface 360°. Maxi visibilité pour vos créations.',
    '<p>Le <strong>mug panoramique</strong> permet une impression sur toute la circonférence du mug sans interruption. Idéal pour les panoramas, cartes et créations à 360°. Compatible presses à mug standard.</p>',
    'instock', null, false, 112
  ),
  product(417, 'THERMOS SUBLIMABLE INOX 500ML', 'thermos-sublimable-inox', '85', '95', '85',
    img('/2024/12/WhatsApp_Image_2024-12-20_at_12.12.33-removebg-preview.png', 'Thermos sublimable inox'),
    [CAT.sublimables, { id: 62, name: 'Mugs & Tasses', slug: 'mugs-tasses' }],
    'Thermos en inox sublimable 500ml. Double paroi, isolation thermique, personnalisable.',
    '<p>Le <strong>thermos sublimable inox 500ml</strong> est le cadeau corporate par excellence. Double paroi isotherme, couvercle hermétique, maintien chaud 8h / froid 12h. Surface sublimable sur l\'extérieur.</p>',
    'instock', null, true, 134
  ),
  product(418, 'BOL À SOUPE SUBLIMABLE 300ML', 'bol-soupe-sublimable', '38', '38', '',
    img('/2024/12/WhatsApp_Image_2024-12-20_at_12.12.34-removebg-preview.png', 'Bol à soupe sublimable'),
    [CAT.sublimables, { id: 62, name: 'Mugs & Tasses', slug: 'mugs-tasses' }],
    'Bol à soupe en céramique sublimable 300ml avec anse. Personnalisation complète.',
    '<p>Le <strong>bol à soupe sublimable</strong> en céramique est idéal pour les photos et illustrations sur une grande surface. Passe au micro-ondes et au lave-vaisselle après sublimation.</p>',
    'instock', null, false, 67
  ),
  product(419, 'MUG EN VERRE TRANSPARENT SUBLIMABLE 11oz', 'mug-verre-transparent-11oz', '42', '50', '42',
    img('/2024/12/WhatsApp_Image_2024-12-20_at_12.12.35-removebg-preview.png', 'Mug en verre sublimable'),
    [CAT.sublimables, { id: 62, name: 'Mugs & Tasses', slug: 'mugs-tasses' }],
    'Mug en verre transparent sublimable 11oz. Design moderne, effet translucide unique.',
    '<p>Le <strong>mug en verre transparent</strong> offre un rendu visuel unique où l\'impression semble flotter dans le verre. Effet très apprécié pour les cadeaux originaux et les boutiques tendance.</p>',
    'instock', null, true, 89
  ),
  product(420, 'MUG AVEC COUVERCLE ET CUILLÈRE', 'mug-couvercle-cuillere', '55', '65', '55',
    img('/2024/12/WhatsApp_Image_2024-12-20_at_12.12.36-removebg-preview.png', 'Mug avec couvercle et cuillère'),
    [CAT.sublimables, { id: 62, name: 'Mugs & Tasses', slug: 'mugs-tasses' }],
    'Set mug sublimable + couvercle + cuillère. Coffret cadeau complet prêt à offrir.',
    '<p>Le <strong>set mug complet</strong> inclut le mug sublimable 11oz, son couvercle en plastique et une cuillère assortie. Le coffret cadeau idéal déjà prêt à être offert sans emballage supplémentaire.</p>',
    'instock', null, false, 54
  ),
  product(421, 'MUG CŒUR ROUGE SUBLIMABLE', 'mug-coeur-rouge', '48', '48', '',
    img('/2024/12/WhatsApp_Image_2024-12-20_at_12.12.37-removebg-preview.png', 'Mug cœur rouge'),
    [CAT.sublimables, { id: 62, name: 'Mugs & Tasses', slug: 'mugs-tasses' }],
    'Mug sublimable avec intérieur et anse rouge en forme de cœur. Spécial Saint-Valentin.',
    '<p>Le <strong>mug cœur rouge</strong> avec son intérieur coloré et son anse en cœur est le cadeau Saint-Valentin et fête des mères incontournable. Combinez avec une belle impression pour un résultat irrésistible.</p>',
    'instock', null, false, 178
  ),

  // ─── PAPIER DE SUBLIMATION ────────────────────────────────────────────────
  product(430, 'PAPIER SUBLIMATION A4 — 100 FEUILLES', 'papier-sublimation-a4-100f', '85', '85', '',
    img('/2025/01/INK-C.png', 'Papier sublimation A4'),
    [CAT.conso_sub, CAT.papier_sub],
    'Papier sublimation A4 haute qualité, 100 feuilles. Transfert net, couleurs éclatantes.',
    '<p>Le <strong>papier sublimation A4</strong> (100 feuilles) est compatible avec toutes les imprimantes à encres de sublimation. Grammage 100g/m², séchage rapide, transfert sans bavure, couleurs fidèles et éclatantes.</p>',
    'instock', null, false, 267
  ),
  product(431, 'PAPIER SUBLIMATION A3 — 100 FEUILLES', 'papier-sublimation-a3-100f', '145', '145', '',
    img('/2025/01/INK-C.png', 'Papier sublimation A3'),
    [CAT.conso_sub, CAT.papier_sub],
    'Papier sublimation A3 haute qualité, 100 feuilles. Pour grands formats et production intensive.',
    '<p>Le <strong>papier sublimation A3</strong> (100 feuilles) est indispensable pour les transferts grand format sur t-shirts, housses de coussin et surfaces XL. Qualité constante, lot de 100 feuilles.</p>',
    'instock', null, false, 189
  ),
  product(432, 'PAPIER SUBLIMATION ROULEAU 44CM × 100M', 'papier-sublimation-rouleau-44cm', '580', '680', '580',
    img('/2025/01/INK-C.png', 'Papier sublimation rouleau 44cm'),
    [CAT.conso_sub, CAT.papier_sub],
    'Rouleau papier sublimation 44cm × 100m pour traceurs et production en série. Économique.',
    '<p>Le <strong>rouleau papier sublimation 44cm × 100m</strong> est la solution économique pour les ateliers en production continue. Grammage 100g/m², compatible traceurs Epson, Roland et équivalents.</p>',
    'instock', null, true, 78
  ),
  product(433, 'PAPIER SUBLIMATION ROULEAU 64CM × 100M', 'papier-sublimation-rouleau-64cm', '780', '920', '780',
    img('/2025/01/INK-C.png', 'Papier sublimation rouleau 64cm'),
    [CAT.conso_sub, CAT.papier_sub],
    'Rouleau papier sublimation 64cm × 100m. Grand format pour production massive.',
    '<p>Le <strong>rouleau papier sublimation 64cm × 100m</strong> est destiné aux grandes productions avec traceur grand format. Idéal pour les t-shirts XL, bandeaux et grandes surfaces textiles.</p>',
    'instock', null, false, 45
  ),

  // ─── SCOTCH THERMIQUE & TÉFLON ────────────────────────────────────────────
  product(440, 'SCOTCH THERMIQUE RÉSISTANT HAUTE TEMP.', 'scotch-thermique-haute-temperature', '35', '35', '',
    img('/2024/12/61gC992Xr5L.jpg', 'Scotch thermique'),
    [CAT.conso_sub, CAT.scotch],
    'Scotch thermique résistant jusqu\'à 200°C. Maintien parfait du papier transfert lors de la sublimation.',
    '<p>Le <strong>scotch thermique haute température</strong> (résistant jusqu\'à 200°C) est indispensable pour maintenir le papier de sublimation en place lors du transfert. Sans résidu, repositionnable, rouleau 50m.</p>',
    'instock', null, false, 312
  ),
  product(441, 'FEUILLE TÉFLON ANTI-ADHÉSIVE 40×50CM', 'feuille-teflon-40x50', '55', '55', '',
    img('/2024/12/61gC992Xr5L.jpg', 'Feuille téflon 40×50cm'),
    [CAT.conso_sub, CAT.scotch],
    'Feuille téflon anti-adhésive 40×50cm. Protège votre presse et votre tissu lors des transferts.',
    '<p>La <strong>feuille téflon 40×50cm</strong> protège la platine de votre presse et évite la colle et les brûlures sur le textile. Réutilisable, résistante jusqu\'à 260°C, compatible toutes presses standard.</p>',
    'instock', null, false, 198
  ),
  product(442, 'FEUILLE TÉFLON ANTI-ADHÉSIVE 38×38CM', 'feuille-teflon-38x38', '45', '45', '',
    img('/2024/12/61gC992Xr5L.jpg', 'Feuille téflon 38×38cm'),
    [CAT.conso_sub, CAT.scotch],
    'Feuille téflon anti-adhésive 38×38cm. Pour presses compactes et casquettes.',
    '<p>La <strong>feuille téflon 38×38cm</strong> est la version compacte idéale pour les presses 38×38cm et les presses à casquette. Protection optimale, longue durée de vie.</p>',
    'instock', null, false, 145
  ),

  // ─── MACHINES D'IMPRESSION ────────────────────────────────────────────────
  product(450, 'IMPRIMANTE DTF A3 — DOUBLE TÊTE', 'imprimante-dtf-a3-double-tete', '18500', '22000', '18500',
    img('/2024/12/WhatsApp_Image_2024-12-20_at_12.20.05-removebg-preview.png', 'Imprimante DTF A3'),
    [{ id: 4, name: "Les Machines d'Impression", slug: 'les-machines-dimpression' }],
    'Imprimante DTF A3 double tête Epson i3200. Production intensive, qualité photo. Clé en main.',
    '<p>L\'<strong>imprimante DTF A3 double tête</strong> équipée des têtes Epson i3200 est la solution professionnelle pour l\'impression directe sur film thermocollant (DTF). 2 têtes d\'impression pour vitesse doublée, résolution 1440dpi, compatible toutes matières.</p><ul><li>Format A3 (30cm de large)</li><li>Double tête Epson i3200</li><li>Vitesse : 15 m²/h</li><li>Fournie avec RIP + encres 250ml × 6</li></ul>',
    'instock', 3, true, 18
  ),
  product(451, 'IMPRIMANTE DTF A4 — ENTRÉE DE GAMME', 'imprimante-dtf-a4', '9800', '12000', '9800',
    img('/2024/12/WhatsApp_Image_2024-12-20_at_12.20.05-removebg-preview.png', 'Imprimante DTF A4'),
    [{ id: 4, name: "Les Machines d'Impression", slug: 'les-machines-dimpression' }],
    'Imprimante DTF A4 — entrée de gamme pour ateliers qui démarrent. Simple et efficace.',
    '<p>L\'<strong>imprimante DTF A4</strong> est la porte d\'entrée idéale dans l\'impression DTF. Format A4 (21cm), tête Epson XP600, impression photo sur film thermocollant. Parfaite pour les petites séries et les personnalisations à la demande.</p>',
    'instock', 5, false, 32
  ),
  product(452, 'TRACEUR SUBLIMATION EPSON 44 POUCES', 'traceur-sublimation-44-pouces', '32000', '38000', '32000',
    img('/2024/12/WhatsApp_Image_2024-12-20_at_12.20.06-removebg-preview.png', 'Traceur sublimation 44 pouces'),
    [{ id: 4, name: "Les Machines d'Impression", slug: 'les-machines-dimpression' }],
    'Traceur grand format 44 pouces pour sublimation textile. Production continue haute vitesse.',
    '<p>Le <strong>traceur sublimation 44 pouces</strong> est la machine phare pour les ateliers en production continue de textile sublimé. Vitesse 25m²/h, encres sublimation haute densité, support rouleaux et feuilles. Idéal pour t-shirts, maillots, textiles techniques.</p>',
    'instock', 2, true, 9
  ),
  product(453, 'IMPRIMANTE UV LED A3 FLATBED', 'imprimante-uv-led-a3', '25000', '29000', '25000',
    img('/2024/12/WhatsApp_Image_2024-12-20_at_12.20.07-removebg-preview.png', 'Imprimante UV LED A3'),
    [{ id: 4, name: "Les Machines d'Impression", slug: 'les-machines-dimpression' }],
    'Imprimante UV LED A3 flatbed. Impression directe sur bois, verre, métal, plastique, cuir.',
    '<p>L\'<strong>imprimante UV LED A3 flatbed</strong> révolutionne la personnalisation en imprimant directement sur tous les supports rigides ou semi-rigides : bois, verre, métal, plastique, cuir, céramique... Encres UV résistantes, séchage instantané par LED UV.</p>',
    'instock', 2, true, 11
  ),
  product(454, 'IMPRIMANTE UV LED CYLINDRIQUE (MUGS/BOUTEILLES)', 'imprimante-uv-cylindrique', '8500', '10000', '8500',
    img('/2024/12/WhatsApp_Image_2024-12-20_at_12.20.08-removebg-preview.png', 'Imprimante UV cylindrique'),
    [{ id: 4, name: "Les Machines d'Impression", slug: 'les-machines-dimpression' }],
    'Imprimante UV LED cylindrique pour mugs, bouteilles et objets ronds. Impression directe 360°.',
    '<p>L\'<strong>imprimante UV cylindrique</strong> imprime directement en 360° sur mugs, bouteilles, stylos, canettes et tout objet cylindrique sans film ni transfert. Encres UV durables, résistantes au lave-vaisselle. Alternative rentable à la sublimation.</p>',
    'instock', 4, false, 21
  ),
  product(455, 'STATION POUDRAGE DTF AUTOMATIQUE', 'station-poudrage-dtf', '4500', '5500', '4500',
    img('/2024/12/WhatsApp_Image_2024-12-20_at_12.20.09-removebg-preview.png', 'Station poudrage DTF automatique'),
    [{ id: 4, name: "Les Machines d'Impression", slug: 'les-machines-dimpression' }],
    'Station de poudrage DTF automatique. Application uniforme de poudre thermofusible + tunnel de séchage.',
    '<p>La <strong>station de poudrage DTF automatique</strong> assure une application parfaitement uniforme de la poudre thermofusible sur le film DTF imprimé, puis le sèche par passage dans un tunnel thermique intégré. Indispensable pour une production DTF semi-automatique.</p>',
    'instock', 5, false, 14
  ),
  product(456, 'COPIEUR NUMÉRIQUE STENCIL (DUPLICATEUR)', 'copieur-numerique-stencil', '6800', '8200', '6800',
    img('/2024/12/WhatsApp_Image_2024-12-20_at_12.20.10-removebg-preview.png', 'Copieur numérique stencil'),
    [{ id: 4, name: "Les Machines d'Impression", slug: 'les-machines-dimpression' }],
    'Duplicateur numérique stencil pour impression sérigraphique rapide. 130 copies/min.',
    '<p>Le <strong>duplicateur numérique stencil</strong> est la solution économique pour les tirages moyens séries (flyers, formulaires, documents). 130 copies/min, encre sérigraphique incluse, résolution 600dpi. Coût à la copie ultra-faible.</p>',
    'instock', 3, false, 7
  ),
  product(457, 'KIT ENCRES DTF CMYK+W 1000ML × 5', 'kit-encres-dtf-1000ml', '1200', '1400', '1200',
    img('/2025/01/INK-C.png', 'Kit encres DTF 1000ml'),
    [{ id: 4, name: "Les Machines d'Impression", slug: 'les-machines-dimpression' }, CAT.conso_sub],
    'Kit encres DTF CMYK + Blanc 1000ml × 5. Couleurs vives, adhérence optimale sur tous textiles.',
    '<p>Le <strong>kit encres DTF CMYK+W 1000ml</strong> (5 bouteilles) garantit des impressions vibrantes et durables sur film DTF. Formule spécialement conçue pour les têtes Epson i3200 et XP600. Lavage résistant jusqu\'à 50 cycles.</p>',
    'instock', null, false, 56
  ),
  product(458, 'POUDRE THERMOFUSIBLE DTF BLANCHE — 5KG', 'poudre-thermofusible-dtf-5kg', '380', '450', '380',
    img('/2024/12/61gC992Xr5L.jpg', 'Poudre thermofusible DTF 5kg'),
    [{ id: 4, name: "Les Machines d'Impression", slug: 'les-machines-dimpression' }, CAT.conso_sub],
    'Poudre thermofusible DTF blanche 5kg. Adhérence maximale, élasticité optimale sur textile.',
    '<p>La <strong>poudre thermofusible DTF 5kg</strong> est le consommable clé du procédé DTF. Granulométrie fine et uniforme, fusion à 150°C, élasticité parfaite pour les t-shirts et sweats. Format 5kg pour les productions intensives.</p>',
    'instock', null, false, 87
  ),
]

// ─── Index helpers ────────────────────────────────────────────────────────────
export const PRODUCTS_BY_SLUG = new Map(PRODUCTS.map(p => [p.slug, p]))
export const PRODUCTS_BY_ID   = new Map(PRODUCTS.map(p => [p.id,   p]))
export const PRODUCTS_BY_CAT  = new Map<number, WCProduct[]>()

PRODUCTS.forEach(p => {
  p.categories.forEach(cat => {
    const arr = PRODUCTS_BY_CAT.get(cat.id) ?? []
    arr.push(p)
    PRODUCTS_BY_CAT.set(cat.id, arr)
  })
})
