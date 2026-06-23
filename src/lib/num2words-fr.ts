// Montant en lettres (français) pour les factures — ex: "mille deux cent dirhams et 50 centimes".
const UNITS = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix',
  'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf']
const TENS = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante', 'quatre-vingt', 'quatre-vingt']

function below100(n: number): string {
  if (n < 20) return UNITS[n]
  const t = Math.floor(n / 10), u = n % 10
  if (t === 7 || t === 9) {
    const base = TENS[t] // soixante / quatre-vingt
    const rem = below100((t === 7 ? 60 : 80) === 60 ? 10 + u : 10 + u)
    return base + '-' + rem
  }
  let s = TENS[t]
  if (u === 0) return t === 8 ? s + 's' : s
  if (u === 1 && (t === 2 || t === 3 || t === 4 || t === 5 || t === 6)) return s + ' et un'
  return s + '-' + UNITS[u]
}

function below1000(n: number): string {
  if (n < 100) return below100(n)
  const h = Math.floor(n / 100), rem = n % 100
  const cent = h === 1 ? 'cent' : UNITS[h] + ' cent'
  if (rem === 0) return h > 1 ? cent + 's' : cent
  return cent + ' ' + below100(rem)
}

export function numberToFrench(n: number): string {
  if (n === 0) return 'zéro'
  let out = ''
  const millions = Math.floor(n / 1_000_000)
  const thousands = Math.floor((n % 1_000_000) / 1000)
  const rest = n % 1000
  if (millions) out += (millions === 1 ? 'un million' : below1000(millions) + ' millions') + ' '
  if (thousands) out += (thousands === 1 ? 'mille' : below1000(thousands) + ' mille') + ' '
  if (rest) out += below1000(rest)
  return out.trim()
}

export function amountInWordsMAD(amount: number): string {
  const whole = Math.floor(amount)
  const cents = Math.round((amount - whole) * 100)
  const dh = `${numberToFrench(whole)} dirham${whole > 1 ? 's' : ''}`
  return cents > 0 ? `${dh} et ${cents} centimes` : dh
}
