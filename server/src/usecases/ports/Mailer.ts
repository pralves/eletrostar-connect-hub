import type { ContactMessage } from "../../domain/ContactMessage.js";

/**
 * Porta de saída: envio dos e-mails do fluxo de contato.
 *
 * A implementação (Nodemailer/SMTP) fica em `adapters`. O usecase só sabe que
 * existe "um jeito de mandar os e-mails de contato".
 */
export interface Mailer {
  /** Envia a mensagem interna + a confirmação para o visitante. */
  sendContactEmails(message: ContactMessage): Promise<void>;
}
