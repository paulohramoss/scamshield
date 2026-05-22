-- ScamShield — Schema SQL para Supabase
-- Execute este arquivo no SQL Editor do seu projeto Supabase

create table if not exists scam_analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  message text,
  url text,
  context text,
  source text,
  risk_score integer not null,
  risk_level text not null,
  verdict text not null,
  explanation text not null,
  red_flags jsonb not null default '[]'::jsonb,
  recommended_actions jsonb not null default '[]'::jsonb,
  do_not_do jsonb not null default '[]'::jsonb,
  safe_reply text,
  confidence integer,
  category text,
  created_at timestamptz default now()
);

-- Índices para performance
create index if not exists idx_scam_analyses_user_id on scam_analyses(user_id);
create index if not exists idx_scam_analyses_created_at on scam_analyses(created_at desc);
create index if not exists idx_scam_analyses_risk_level on scam_analyses(risk_level);

-- Habilitar Row Level Security
alter table scam_analyses enable row level security;

-- Políticas RLS
create policy "Users can insert their own analyses"
on scam_analyses for insert
with check (auth.uid() = user_id);

create policy "Users can view their own analyses"
on scam_analyses for select
using (auth.uid() = user_id);

create policy "Users can delete their own analyses"
on scam_analyses for delete
using (auth.uid() = user_id);
