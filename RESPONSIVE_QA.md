# Responsive QA — Nouvel Espace Sérigraphik

What was fixed in this responsive pass, what to test before go-live, and the
known risks that still require human eyes in a real browser.

## What was fixed

### Layout
- All `gridTemplateColumns: 'repeat(N, ...)'` and `gridTemplateColumns: '1fr 1fr'` inline
  styles that were silently overriding Tailwind responsive classes have been removed
  from the customer-facing pages and admin surfaces. Where appropriate, replaced with
  Tailwind utility classes:
  - `grid grid-cols-1 sm:grid-cols-2`
  - `grid grid-cols-1 md:grid-cols-3`
  - `grid grid-cols-1 lg:grid-cols-2`
  - `grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr]`
- Files touched: `kits`, `devis-pro`, `categorie-produit`, `produit/[slug]`,
  `academie`, `contact`, `admin/{leads,reporting,merchandising,guide,page}`.

### Header
- Mobile header simplified: only **Logo + WhatsApp + burger** are visible on `< md`.
  Search and theme toggle are now `hidden md:flex`.
- Theme toggle was added inside the mobile drawer footer so it remains reachable.
- Drawer width still capped at `290px / max 85vw` — works at 320 px width.

### Devis Express modal
- Left testimonial panel now `hidden md:flex`. On phones the user only sees the form.
- Right form panel uses `px-5 py-6` on mobile, full padding on `md+`.
- Close button repositioned (top-14, right-14) and now has a darker background so it
  stays visible against the gradient on small screens.
- `maxHeight` raised to `94vh` to leave less dead space on tall phones.

### Tables
- `LeadsTable` and reporting "stale leads" table now wrapped in
  `overflow-x: auto; -webkit-overflow-scrolling: touch` with `min-width: 720–760` on the
  inner `<table>`, so the page itself never scrolls horizontally.

### Fonts
- Added `Cormorant Garamond` (italic + roman) and `Outfit` to the `globals.css` Google
  Fonts import so existing inline `fontFamily` references render their intended fonts on
  every browser/device.
- A future cleanup pass can standardize on Syne (titles) + Inter (body), but doing it now
  would change the site's existing typographic feel; this PR only fixes the broken
  references, not the brand.

## Breakpoints to test in a real browser

Open Chrome DevTools → Device Toolbar (Cmd+Shift+M) and test each of:

| Width | Persona |
| --- | --- |
| 320 px | Smallest Android / iPhone SE |
| 375 px | iPhone 12/13/14 |
| 390 px | iPhone 14 Pro |
| 430 px | iPhone 15 Pro Max |
| 768 px | iPad portrait |
| 1024 px | iPad landscape / small laptop |
| 1280 px | Standard laptop |
| 1440 px | Large laptop |
| 1728 px | iMac / external monitor |

For each width, walk this checklist:

- [ ] Home (`/fr`) — hero readable, stats wrap, no horizontal scroll
- [ ] `/fr/kits` — kit cards stack on phone, comparison table doesn't overflow page
- [ ] `/fr/categorie-produit` — hero stacks at `< lg`, category sub-grids reflow
- [ ] `/fr/categorie-produit/[slug]` — product grid auto-fits
- [ ] `/fr/produit/[slug]` — gallery + info stack on phone, specs box wraps
- [ ] `/fr/devis-pro` — pricing/segment cards stack, CTAs wrap
- [ ] `/fr/contact` — action cards auto-fit, form fields stack on phone, info strip wraps
- [ ] `/fr/academie` — guide cards stack
- [ ] `/fr/livraison` — zone cards reflow, FAQ stays readable
- [ ] **Header drawer** — opens at 320 px without clipping, theme toggle visible inside
- [ ] **Devis Express modal** — only form visible on phone, close stays reachable
- [ ] **Admin** at `≥ 1024 px` — leads table scrolls inside its container, stat strip wraps
- [ ] No horizontal page scroll anywhere (DevTools → look for `<html>` width > viewport)
- [ ] Sticky bottom CTA (if any) does not cover the form submit button on phone

## Remaining visual risks

These were intentionally left out of scope to keep the diff small and the brand intact:

1. **Brand/typography unification.** Inline `Cormorant Garamond` and `Outfit` references
   still exist; they now render correctly because the fonts are imported. A future PR can
   standardize on Syne + Inter, but that is a brand decision, not a regression fix.
2. **Inline `style` everywhere.** The codebase relies heavily on inline styles. They make
   per-page fixes verbose and slightly slower than utility-class fixes. A migration to
   Tailwind classes is a separate, larger refactor.
3. **Hero on the homepage.** The right-side image collage in `HeroIndustrialPanel` is
   already `hidden lg:block`, so mobile is unaffected, but its inner `1.1fr 0.9fr` /
   `1fr 1fr` grids only kick in `≥ lg` and could feel cramped on small laptops
   (1024–1180 px) — verify visually.
4. **Admin on phones.** Admin surfaces are designed for laptop+. They no longer break at
   1024 px, but `< 1024 px` is best-effort and not part of the soft-launch QA.
5. **Hover-only reveals.** A few cards rely on hover styling; verify on touch devices that
   the primary content is visible without hover (CTA labels are always shown).
6. **`/api/img` proxy speed.** Not a layout concern, but slow image responses make
   responsive tests look broken; if cards appear empty during QA, check the network tab
   before assuming a CSS regression.

## Next steps before go-live

1. Run the `GO_LIVE_CHECKLIST.md` end-to-end against the deployed Vercel preview.
2. Walk this `RESPONSIVE_QA.md` matrix in DevTools.
3. Spot-check on at least one real iPhone and one real Android.
