// Supabase Edge Function: send-contact-email
//
// Recebe { name, email, message } do formulário "Fale Conosco" e dispara dois
// e-mails via SMTP (Hostinger):
//   1. A mensagem para pralves@eletrostarsoft.com.br (destinatário interno).
//   2. Uma confirmação de recebimento para o e-mail informado no formulário.
//
// As credenciais SMTP NUNCA ficam no frontend. Configure-as como secrets:
//   supabase secrets set SMTP_HOST=smtp.hostinger.com
//   supabase secrets set SMTP_PORT=465
//   supabase secrets set SMTP_USER=seu-email@eletrostarsoft.com.br
//   supabase secrets set SMTP_PASS='sua-senha-do-email'
//   supabase secrets set CONTACT_TO=pralves@eletrostarsoft.com.br

import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Método não permitido" }, 405);
  }

  let payload: { name?: string; email?: string; message?: string };
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Corpo da requisição inválido" }, 400);
  }

  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();
  const message = (payload.message ?? "").trim();

  if (!name || !email || !message) {
    return json({ error: "Preencha nome, e-mail e mensagem." }, 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return json({ error: "E-mail inválido." }, 400);
  }

  const host = Deno.env.get("SMTP_HOST") ?? "smtp.hostinger.com";
  const port = Number(Deno.env.get("SMTP_PORT") ?? "465");
  const user = Deno.env.get("SMTP_USER");
  const pass = Deno.env.get("SMTP_PASS");
  const contactTo = Deno.env.get("CONTACT_TO") ?? "pralves@eletrostarsoft.com.br";

  if (!user || !pass) {
    console.error("SMTP_USER/SMTP_PASS não configurados.");
    return json({ error: "Serviço de e-mail não configurado." }, 500);
  }

  const client = new SMTPClient({
    connection: {
      hostname: host,
      port,
      tls: true, // porta 465 = SSL/TLS implícito
      auth: { username: user, password: pass },
    },
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  try {
    // 1. Mensagem interna para a EletroStar
    await client.send({
      from: user,
      to: contactTo,
      replyTo: email,
      subject: `Nova mensagem do site — ${name}`,
      content: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
      html: `
        <h2>Nova mensagem pelo formulário "Fale Conosco"</h2>
        <p><strong>Nome:</strong> ${safeName}</p>
        <p><strong>E-mail:</strong> ${safeEmail}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    // 2. Confirmação de recebimento para o remetente
    await client.send({
      from: user,
      to: email,
      subject: "Recebemos sua mensagem — EletroStar",
      content:
        `Olá ${name},\n\n` +
        `Recebemos sua mensagem e entraremos em contato em breve.\n\n` +
        `Resumo da sua mensagem:\n${message}\n\n` +
        `Atenciosamente,\nEquipe EletroStar`,
      html: `
        <p>Olá <strong>${safeName}</strong>,</p>
        <p>Recebemos sua mensagem e entraremos em contato em breve.</p>
        <p><strong>Resumo da sua mensagem:</strong></p>
        <blockquote style="border-left:3px solid #ccc;padding-left:12px;color:#555">
          ${safeMessage}
        </blockquote>
        <p>Atenciosamente,<br>Equipe EletroStar</p>
      `,
    });

    await client.close();
    return json({ success: true });
  } catch (err) {
    console.error("Falha ao enviar e-mail:", err);
    try {
      await client.close();
    } catch {
      // ignora erro de fechamento
    }
    return json({ error: "Não foi possível enviar a mensagem." }, 500);
  }
});
