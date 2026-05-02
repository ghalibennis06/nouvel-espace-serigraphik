-- Activity log for NES leads
create table if not exists nes_lead_activity (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references nes_leads(id) on delete cascade,
  type text not null,
  -- types: status_change | priority_change | assignment | quote_change | follow_up | contact | note | whatsapp | manual
  label text not null,
  detail text,
  old_value text,
  new_value text,
  actor text,
  created_at timestamptz not null default now()
);

create index if not exists nes_lead_activity_lead_id_idx on nes_lead_activity(lead_id, created_at desc);
