# EletroStar — Backend (API)

API Node.js + TypeScript em **Clean Architecture** para o site EletroStar.
Recebe o formulário *Fale Conosco*, **persiste no Supabase** e dispara os
e-mails via SMTP (Hostinger).

## Arquitetura

```
src/
 ├─ domain/          Entidades e regras puras (ContactMessage)
 ├─ usecases/        Casos de uso + ports (interfaces)
 │   └─ ports/       ContactRepository, Mailer
 ├─ adapters/        Implementações das ports (Supabase, Nodemailer)
 ├─ infrastructure/  Env, cliente Supabase, SMTP, app Express
 ├─ presentation/    Controllers, rotas e middlewares HTTP
 ├─ shared/          Erros e tipos globais
 └─ index.ts         Composition root (injeta deps e sobe o servidor)
```

Regra de dependência: `presentation → usecases → domain`. Infra e adapters
implementam as *ports*; nada de dentro conhece Express/Supabase/SMTP.

## Setup

```bash
cd server
cp .env.example .env      # preencha SUPABASE_* e SMTP_*
npm install
npm run dev               # sobe em http://localhost:3001
```

### Banco

Rode a migração `supabase/migrations/20260704000000_contact_messages.sql` no seu
Supabase (SQL Editor ou `supabase db push`) para criar a tabela
`contact_messages`.

## Endpoints

| Método | Rota           | Descrição                                  |
| ------ | -------------- | ------------------------------------------ |
| GET    | `/api/health`  | Health-check                               |
| POST   | `/api/contact` | Salva a mensagem e envia os e-mails        |

`POST /api/contact` — corpo:

```json
{ "name": "Fulano", "email": "fulano@email.com", "message": "Olá!" }
```

Resposta `201`: `{ "success": true, "data": { "id": "<uuid>" } }`
Erro: `{ "success": false, "error": "<mensagem>" }`

## Testar

```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"seu@email.com","message":"Olá!"}'
```

## Scripts

- `npm run dev` — desenvolvimento com reload (tsx)
- `npm run build` — compila para `dist/`
- `npm start` — roda o build (`node dist/index.js`)
- `npm run typecheck` — checagem de tipos sem emitir
