-- NES full schema for Neon Postgres
-- Run this in the Neon SQL editor to initialize the database

create extension if not exists "pgcrypto";

-- Leads
create table if not exists nes_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  phone text,
  email text,
  message text,
  source text,
  segment text,
  request_type text,
  city text,
  category_interest text,
  product_interest text,
  budget_range text,
  priority text not null default 'normal',
  status text not null default 'new',
  assignee text,
  next_follow_up_at timestamptz,
  last_contact_at timestamptz,
  quote_status text,
  quote_amount text,
  result_reason text,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists nes_leads_status_idx on nes_leads(status);
create index if not exists nes_leads_created_at_idx on nes_leads(created_at desc);

-- Lead activity log
create table if not exists nes_lead_activity (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references nes_leads(id) on delete cascade,
  type text not null,
  label text not null,
  detail text,
  old_value text,
  new_value text,
  actor text,
  created_at timestamptz not null default now()
);

create index if not exists nes_lead_activity_lead_id_idx on nes_lead_activity(lead_id, created_at desc);

-- Categories
create table if not exists nes_categories (
  id uuid primary key default gen_random_uuid(),
  name_fr text not null,
  slug text unique,
  created_at timestamptz not null default now()
);

-- Products
create table if not exists nes_products (
  id uuid primary key default gen_random_uuid(),
  product_slug text unique not null,
  name_fr text not null,
  price numeric,
  stock_status text default 'instock',
  active boolean default true,
  featured boolean default false,
  category_id uuid references nes_categories(id),
  sort_order integer,
  created_at timestamptz not null default now()
);

-- Admin settings (homepage controls etc.)
create table if not exists nes_admin_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
