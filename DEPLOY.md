# Deploy (Docker) — EletroStar

Sobe **backend (api)** + **frontend (web/Nginx)** com um único `docker compose`.
O Nginx do `web` serve o site e faz proxy de `/api` para o `api` pela rede interna
— por isso o backend não expõe porta pública e não há CORS.

```
Navegador ──▶ web (Nginx :80) ──/api──▶ api (Node :3001) ──▶ Supabase + SMTP
                    └── arquivos estáticos do site
```

## Pré-requisitos no VPS

- Docker + Docker Compose plugin (`docker compose version`).
- Acesso ao repositório (git).

## Passo a passo

```bash
# 1. Clonar o projeto
git clone <URL_DO_REPO> eletrostar
cd eletrostar

# 2. Criar o .env do backend (NÃO vai no git) e preencher os segredos
cp server/.env.example server/.env
nano server/.env        # SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SMTP_*, CONTACT_TO

# 3. Subir tudo (builda as duas imagens)
docker compose up -d --build

# 4. Conferir
docker compose ps
curl http://localhost:8080/api/health     # {"success":true,"data":{"status":"ok"}}
```

O site fica em `http://SEU_HOST:8080`. Para trocar a porta pública:

```bash
WEB_PORT=3000 docker compose up -d --build
```

## Variáveis de ambiente

O backend lê **`server/.env`** (via `env_file` no compose). Use o
`server/.env.example` como base. Nunca versione o `server/.env` — ele contém a
`service_role_key` e a senha SMTP.

O frontend embute a URL da API **no build**. Deixamos `VITE_API_URL=""` (vazio)
no `docker-compose.yml`, o que faz o site chamar `/api` na **mesma origem** — o
Nginx encaminha para o backend. Não é preciso mexer nisso.

## Banco de dados

Rode a migração uma vez no seu Supabase (SQL Editor):
[`supabase/migrations/20260704000000_contact_messages.sql`](supabase/migrations/20260704000000_contact_messages.sql)
— cria a tabela `contact_messages`.

## Operação

```bash
docker compose logs -f api        # logs do backend
docker compose logs -f web        # logs do Nginx
docker compose restart api        # reiniciar após editar server/.env
docker compose pull && docker compose up -d --build   # atualizar
docker compose down               # derrubar
```

## Colocar atrás do seu proxy / HTTPS

Se você já usa um reverse proxy no VPS (o mesmo que atende o Supabase), aponte-o
para a porta publicada pelo `web` (`8080` por padrão) e finalize o TLS lá.
Como o site e a API compartilham origem, basta um `server_name` (ex.:
`eletrostar.seudominio.com.br`) encaminhando tudo para o `web`.
