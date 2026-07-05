# send-contact-email

Edge Function que envia os e-mails do formulário **Fale Conosco** via SMTP (Hostinger).

Envia dois e-mails a cada submissão:

1. A mensagem para `pralves@eletrostarsoft.com.br` (destinatário interno, com `reply-to` = e-mail do visitante).
2. Uma confirmação de recebimento para o e-mail informado no formulário.

## Por que uma Edge Function?

O site é estático (Vite/React) e não pode enviar e-mail por SMTP direto do navegador —
isso exporia a senha do e-mail no JavaScript público. As credenciais ficam apenas aqui,
como *secrets* no Supabase.

## Configurar os secrets (uma vez)

```bash
supabase login
supabase link --project-ref ukzytqwdsmkzzpusnani

supabase secrets set SMTP_HOST=smtp.hostinger.com
supabase secrets set SMTP_PORT=465
supabase secrets set SMTP_USER=pralves@eletrostarsoft.com.br
supabase secrets set SMTP_PASS='<sua-senha-do-email>'
supabase secrets set CONTACT_TO=pralves@eletrostarsoft.com.br
```

> `SMTP_USER` deve ser o e-mail completo autenticado no Hostinger. Ele também é usado
> como remetente (`from`) das mensagens.

## Publicar

```bash
supabase functions deploy send-contact-email
```

## Testar

```bash
curl -X POST \
  https://ukzytqwdsmkzzpusnani.supabase.co/functions/v1/send-contact-email \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"seu@email.com","message":"Olá!"}'
```

## Servidor de e-mail (referência)

- SMTP (saída): `smtp.hostinger.com`, porta `465`, SSL/TLS, autenticação obrigatória.
- POP3 (entrada): `pop.hostinger.com`, porta `995`, SSL.
