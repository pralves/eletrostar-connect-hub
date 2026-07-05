import { ValidationError } from "../shared/errors.js";

/** Dados brutos recebidos do formulário "Fale Conosco". */
export interface ContactMessageInput {
  name: string;
  email: string;
  message: string;
}

/**
 * Entidade de domínio: uma mensagem de contato válida.
 *
 * Regra de negócio pura — não conhece HTTP, Supabase nem SMTP. A construção
 * passa obrigatoriamente por `ContactMessage.create`, que garante o invariante
 * "toda ContactMessage é válida".
 */
export class ContactMessage {
  private constructor(
    readonly name: string,
    readonly email: string,
    readonly message: string,
  ) {}

  static create(input: ContactMessageInput): ContactMessage {
    const name = (input.name ?? "").trim();
    const email = (input.email ?? "").trim();
    const message = (input.message ?? "").trim();

    if (!name || !email || !message) {
      throw new ValidationError("Preencha nome, e-mail e mensagem.");
    }

    if (name.length > 120) {
      throw new ValidationError("Nome muito longo.");
    }

    if (!ContactMessage.isValidEmail(email)) {
      throw new ValidationError("E-mail inválido.");
    }

    if (message.length > 5000) {
      throw new ValidationError("Mensagem muito longa.");
    }

    return new ContactMessage(name, email, message);
  }

  private static isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
