import type { Transporter } from "nodemailer";
import type { ContactMessage } from "../domain/ContactMessage.js";
import type { Mailer } from "../usecases/ports/Mailer.js";
import { ExternalServiceError } from "../shared/errors.js";

interface MailerOptions {
  /** Remetente e usuário autenticado no SMTP (e-mail completo). */
  from: string;
  /** Destinatário interno das mensagens do formulário. */
  contactTo: string;
}

/** Escapa HTML para evitar injeção no corpo dos e-mails. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Implementação da porta `Mailer` usando Nodemailer/SMTP.
 *
 * Reproduz o comportamento da Edge Function original: envia a mensagem interna
 * (com reply-to do visitante) e uma confirmação de recebimento para o visitante.
 */
export class NodemailerMailer implements Mailer {
  constructor(
    private readonly transporter: Transporter,
    private readonly options: MailerOptions,
  ) {}

  async sendContactEmails(message: ContactMessage): Promise<void> {
    const { from, contactTo } = this.options;
    const safeName = escapeHtml(message.name);
    const safeEmail = escapeHtml(message.email);
    const safeMessage = escapeHtml(message.message).replace(/\n/g, "<br>");

    try {
      // 1. Mensagem interna para a EletroStar
      await this.transporter.sendMail({
        from,
        to: contactTo,
        replyTo: message.email,
        subject: `Nova mensagem do site — ${message.name}`,
        text: `Nome: ${message.name}\nE-mail: ${message.email}\n\nMensagem:\n${message.message}`,
        html: `
          <h2>Nova mensagem pelo formulário "Fale Conosco"</h2>
          <p><strong>Nome:</strong> ${safeName}</p>
          <p><strong>E-mail:</strong> ${safeEmail}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${safeMessage}</p>
        `,
      });

      // 2. Confirmação de recebimento para o remetente
      await this.transporter.sendMail({
        from,
        to: message.email,
        subject: "Recebemos sua mensagem — EletroStar",
        text:
          `Olá ${message.name},\n\n` +
          `Recebemos sua mensagem e entraremos em contato em breve.\n\n` +
          `Resumo da sua mensagem:\n${message.message}\n\n` +
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
    } catch (err) {
      console.error("[NodemailerMailer] falha ao enviar e-mail:", err);
      throw new ExternalServiceError("Não foi possível enviar a mensagem por e-mail.");
    }
  }
}
