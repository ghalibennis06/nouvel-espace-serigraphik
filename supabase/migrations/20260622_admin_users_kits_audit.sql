-- NES — Utilisateurs admin + rôles, journal d'audit, overrides kits
-- Run: psql "$DATABASE_URL" < supabase/migrations/20260622_admin_users_kits_audit.sql
create extension if not exists pgcrypto;

-- ─── Utilisateurs admin (rôles) ──────────────────────────────────────────────
create table if not exists nes_admin_users (
  id            uuid primary key default gen_random_uuid(),
  email         text unique not null,
  password_hash text not null,
  name          text not null default '',
  role          text not null default 'seller' check (role in ('super_admin','admin','seller')),
  is_active     boolean not null default true,
  last_login_at timestamptz,
  created_at    timestamptz not null default now()
);

-- ─── Journal d'audit ─────────────────────────────────────────────────────────
create table if not exists nes_audit_logs (
  id         uuid primary key default gen_random_uuid(),
  actor      text,
  action     text not null,
  entity     text,
  entity_id  text,
  detail     text,
  created_at timestamptz not null default now()
);
create index if not exists nes_audit_logs_created_idx on nes_audit_logs(created_at desc);

-- ─── Overrides kits (édition admin sans toucher au code) ─────────────────────
-- La structure riche reste dans lib/data/kits.ts ; ces colonnes la surchargent.
create table if not exists nes_kit_overrides (
  kit_id      text primary key,
  name        text,
  subtitle    text,
  price       numeric(12,2),
  old_price   text,
  badge       text,
  items       jsonb,
  active      boolean not null default true,
  sort_order  integer,
  updated_at  timestamptz not null default now()
);
