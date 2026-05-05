# Nouvel Espace Sérigraphik — Go-Live Checklist

Soft-launch readiness gate. Run through this in order before flipping public traffic on.

## 1. Required env vars (production)

Set on Vercel → Project → Settings → Environment Variables (Production scope):

| Var | Required | Notes |
| --- | --- | --- |
| `DATABASE_URL` | YES | Neon Postgres connection string. Without it, `/api/leads` returns 503 in prod. |
| `ADMIN_PASSWORD` | YES | Strong random string. Used to log into `/admin/login`. |
| `ADMIN_COOKIE_SECRET` | YES | ≥ 32 random chars. Prod refuses to issue or accept admin sessions if missing/short. |
| `REVALIDATE_SECRET` | YES if ISR webhook used | Must match the WooCommerce webhook secret. Without a valid signature header, `/api/revalidate` returns 401. |
| `WC_BASE_URL`, `WC_CONSUMER_KEY`, `WC_CONSUMER_SECRET` | YES | WooCommerce REST API credentials. |
| `NEXT_PUBLIC_SITE_URL` | YES | Used by sitemap and absolute links. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_ADDRESS` | YES | Surfaced in footer, hero, contact strip. |

Generate secrets with:

```sh
openssl rand -base64 32
```

## 2. Neon database migrations

Run these against the production `DATABASE_URL`:

```sh
psql "$DATABASE_URL" < supabase/migrations/20260502_neon_full_schema.sql
psql "$DATABASE_URL" < supabase/migrations/20260502_nes_lead_activity.sql
```

Verify:

```sh
psql "$DATABASE_URL" -c "SELECT count(*) FROM nes_leads;"
psql "$DATABASE_URL" -c "SELECT count(*) FROM nes_lead_activity;"
```

## 3. Forms to test (smoke E2E)

In a real browser (not curl), submit each form and verify a row appears in `nes_leads`:

- [ ] `/fr/contact` — full form, all 5 intents, both phone and email variants
- [ ] `/fr` (home) → Devis Express modal — all 4 request types
- [ ] Honeypot rejection: fill the hidden `website` field via devtools, submit — server should respond `ok` but **no row** in DB
- [ ] Spam regex rejection: submit a message containing a URL — `ok` returned, no row
- [ ] Validation: submit empty name → 400; bad phone → 400; missing both phone and email → 400

Watch the server logs during these:

```sh
vercel logs --follow
```

## 4. Admin login

- [ ] `/admin/login` loads (no 401)
- [ ] Wrong password → 401, ~400ms delay
- [ ] Correct password → redirected to `/admin`, dashboard renders, all stats load
- [ ] Manually delete the cookie → next admin nav redirects to `/admin/login`
- [ ] Wait > 8h or set system clock forward → admin requests 401 / redirect (TTL expires server-side, not just the cookie)
- [ ] `/api/admin/homepage` POST without cookie → 401
- [ ] `/api/leads/status` POST without cookie → 401

## 5. WooCommerce connection

- [ ] `WC_BASE_URL/products` returns JSON when called with the configured keys
- [ ] Home page shows real products (not the static fallback)
- [ ] Category pages render real categories
- [ ] Product detail pages load with images

## 6. Revalidation webhook

- [ ] Configure WooCommerce webhook → Topic `product.updated`, URL `https://<site>/api/revalidate`, Secret = `REVALIDATE_SECRET`
- [ ] Update a product in WP admin → confirm cache busts within ~30 s
- [ ] `curl -X POST https://<site>/api/revalidate` (no signature) → 401
- [ ] `curl -X POST https://<site>/api/revalidate -H 'x-wc-webhook-signature: bogus'` → 401

## 7. WhatsApp link

- [ ] Footer pill click → opens WhatsApp web/app with the configured number
- [ ] Floating WhatsApp button (mobile + desktop) → same
- [ ] Devis Express success page → CTA still works

## 8. SEO surfaces

- [ ] `https://<site>/sitemap.xml` returns 200, contains only `/fr/...` URLs (no `/ar/...` while AR is hidden)
- [ ] `https://<site>/robots.txt` returns 200
- [ ] Open Graph meta on `/fr` looks correct in https://opengraph.dev or similar
- [ ] `/fr/livraison` resolves (was previously a dead footer link)
- [ ] No locale switcher visible until AR translation is complete

## 9. Mobile / desktop QA

Open the site on:

- [ ] iPhone width (375 px) — home, contact, devis modal, admin dashboard
- [ ] Tablet (768 px)
- [ ] Laptop (1280 px)
- [ ] Wide (1920 px)

Check specifically:

- [ ] Contact action cards stack cleanly on phone (no horizontal scroll)
- [ ] Admin stats grid wraps to 2/3 columns on smaller widths
- [ ] Reporting cards do not overflow
- [ ] Footer columns collapse to single column on mobile
- [ ] Devis Express modal scrolls inside its bounds on phone

## 10. Final pre-launch

- [ ] `npm run type-check` — green
- [ ] `npm run build` — green
- [ ] `.env.local.backup-*` removed from working tree
- [ ] `.gitignore` blocks `.env*` (except `.env.local.example`)
- [ ] No real secrets in git history (`git log -p -- '.env*'` clean)
- [ ] Vercel deployment URL points to the correct Git branch
- [ ] DNS TTL lowered ahead of cutover (if changing apex / CNAME)
