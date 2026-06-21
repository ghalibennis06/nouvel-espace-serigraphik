-- NES ERP — Catalogue, Stock, Clients, Facturation (remplace Manageo)
-- Backend propre Neon Postgres. Numérotation séquentielle conforme Maroc, TVA, ICE.
-- Run: psql "$DATABASE_URL" < supabase/migrations/20260621_nes_erp.sql

create extension if not exists pgcrypto;

-- ─── Produits (la table existe déjà — on l'enrichit) ─────────────────────────
alter table nes_products add column if not exists sku                  text;
alter table nes_products add column if not exists reference            text;
alter table nes_products add column if not exists description          text;
alter table nes_products add column if not exists cost_price           numeric(12,2);
alter table nes_products add column if not exists public_price         numeric(12,2);
alter table nes_products add column if not exists tva_rate             numeric(5,2) not null default 20;
alter table nes_products add column if not exists stock_qty            integer not null default 0;
alter table nes_products add column if not exists low_stock_threshold  integer not null default 5;
alter table nes_products add column if not exists unit                 text not null default 'unité';
alter table nes_products add column if not exists barcode              text;
alter table nes_products add column if not exists image_url            text;
alter table nes_products add column if not exists updated_at           timestamptz not null default now();

create unique index if not exists nes_products_sku_idx on nes_products(sku) where sku is not null;

-- ─── Mouvements de stock ─────────────────────────────────────────────────────
create table if not exists nes_stock_movements (
  id            uuid primary key default gen_random_uuid(),
  product_id    uuid not null references nes_products(id) on delete cascade,
  type          text not null check (type in ('in','out','adjust')),
  qty           integer not null,
  balance_after integer not null,
  reason        text,
  reference     text,
  actor         text,
  created_at    timestamptz not null default now()
);
create index if not exists nes_stock_movements_product_idx on nes_stock_movements(product_id, created_at desc);

-- ─── Clients (B2B Maroc : ICE) ───────────────────────────────────────────────
create table if not exists nes_clients (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  company        text,
  ice            text,
  email          text,
  phone          text,
  address        text,
  city           text,
  payment_terms  text,
  notes          text,
  created_at     timestamptz not null default now()
);
create index if not exists nes_clients_name_idx on nes_clients(name);

-- ─── Compteurs de documents (séquence par type / année) ──────────────────────
create table if not exists nes_doc_counters (
  doc_type text not null,
  year     integer not null,
  last_seq integer not null default 0,
  primary key (doc_type, year)
);

create or replace function nes_next_doc_number(p_type text, p_year integer)
returns text language plpgsql as $$
declare seq integer; prefix text;
begin
  insert into nes_doc_counters(doc_type, year, last_seq) values (p_type, p_year, 1)
    on conflict (doc_type, year) do update set last_seq = nes_doc_counters.last_seq + 1
    returning last_seq into seq;
  prefix := case p_type
    when 'facture' then 'FAC'
    when 'devis'   then 'DEV'
    when 'avoir'   then 'AVO'
    else 'DOC' end;
  return prefix || '-' || p_year::text || '-' || lpad(seq::text, 4, '0');
end $$;

-- ─── Documents (devis / facture / avoir) ─────────────────────────────────────
create table if not exists nes_documents (
  id           uuid primary key default gen_random_uuid(),
  doc_type     text not null check (doc_type in ('devis','facture','avoir')),
  number       text not null unique,
  client_id    uuid references nes_clients(id),
  client_name  text not null,
  client_ice   text,
  status       text not null default 'draft'
               check (status in ('draft','sent','accepted','paid','partial','cancelled','converted')),
  issue_date   date not null default current_date,
  due_date     date,
  currency     text not null default 'MAD',
  subtotal_ht  numeric(12,2) not null default 0,
  discount     numeric(12,2) not null default 0,
  tva_amount   numeric(12,2) not null default 0,
  total_ttc    numeric(12,2) not null default 0,
  paid_amount  numeric(12,2) not null default 0,
  notes        text,
  converted_to uuid references nes_documents(id),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists nes_documents_type_idx on nes_documents(doc_type, created_at desc);
create index if not exists nes_documents_client_idx on nes_documents(client_id);

-- ─── Lignes de document ──────────────────────────────────────────────────────
create table if not exists nes_document_items (
  id             uuid primary key default gen_random_uuid(),
  document_id    uuid not null references nes_documents(id) on delete cascade,
  product_id     uuid references nes_products(id),
  label          text not null,
  qty            numeric(12,2) not null default 1,
  unit_price_ht  numeric(12,2) not null default 0,
  tva_rate       numeric(5,2) not null default 20,
  discount       numeric(12,2) not null default 0,
  line_total_ht  numeric(12,2) not null default 0,
  sort_order     integer not null default 0
);
create index if not exists nes_document_items_doc_idx on nes_document_items(document_id);

-- ─── Paiements ───────────────────────────────────────────────────────────────
create table if not exists nes_payments (
  id          uuid primary key default gen_random_uuid(),
  document_id uuid not null references nes_documents(id) on delete cascade,
  amount      numeric(12,2) not null,
  method      text not null default 'especes' check (method in ('especes','virement','cheque','carte','autre')),
  reference   text,
  paid_at     date not null default current_date,
  actor       text,
  created_at  timestamptz not null default now()
);
create index if not exists nes_payments_doc_idx on nes_payments(document_id);
