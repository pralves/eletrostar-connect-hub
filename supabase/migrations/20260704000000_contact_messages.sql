-- Tabela que armazena as mensagens do formulário "Fale Conosco".
-- Gravada pelo backend (server/) usando a SERVICE ROLE KEY.

create extension if not exists "pgcrypto";

create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text        not null,
  email      text        not null,
  message    text        not null,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

-- RLS ligado e SEM políticas: o acesso anônimo/autenticado fica bloqueado.
-- O backend usa a service_role key, que ignora RLS — então só o servidor
-- consegue ler/gravar, nunca o navegador.
alter table public.contact_messages enable row level security;
