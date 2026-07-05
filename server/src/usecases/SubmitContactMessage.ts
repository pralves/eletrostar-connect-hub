import { ContactMessage, type ContactMessageInput } from "../domain/ContactMessage.js";
import type { ContactRepository } from "./ports/ContactRepository.js";
import type { Mailer } from "./ports/Mailer.js";

export interface SubmitContactMessageResult {
  id: string;
}

/**
 * Caso de uso "Fale Conosco": valida a entrada, persiste a mensagem e dispara
 * os e-mails.
 *
 * Depende apenas das portas (ContactRepository, Mailer) — nenhuma referência a
 * Supabase, SMTP ou Express. A ordem é intencional: persiste PRIMEIRO, para que
 * uma falha no envio de e-mail não faça perder a mensagem do cliente.
 */
export class SubmitContactMessage {
  constructor(
    private readonly repository: ContactRepository,
    private readonly mailer: Mailer,
  ) {}

  async execute(input: ContactMessageInput): Promise<SubmitContactMessageResult> {
    const message = ContactMessage.create(input); // lança ValidationError se inválido

    const stored = await this.repository.save(message);
    await this.mailer.sendContactEmails(message);

    return { id: stored.id };
  }
}
