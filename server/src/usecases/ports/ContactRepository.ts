import type { ContactMessage } from "../../domain/ContactMessage.js";

/** Registro persistido de uma mensagem de contato. */
export interface StoredContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

/**
 * Porta de saída: persistência de mensagens de contato.
 *
 * O usecase depende desta interface, não da implementação (Supabase). Isso
 * mantém a regra de negócio isolada e permite trocar o banco ou testar com
 * um repositório fake.
 */
export interface ContactRepository {
  save(message: ContactMessage): Promise<StoredContactMessage>;
}
