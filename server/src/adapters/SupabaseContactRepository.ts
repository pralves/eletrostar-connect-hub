import type { SupabaseClient } from "@supabase/supabase-js";
import type { ContactMessage } from "../domain/ContactMessage.js";
import type {
  ContactRepository,
  StoredContactMessage,
} from "../usecases/ports/ContactRepository.js";
import { ExternalServiceError } from "../shared/errors.js";

/** Nome da tabela criada pela migração SQL (supabase/migrations). */
const TABLE = "contact_messages";

/**
 * Implementação da porta `ContactRepository` usando Supabase (Postgres).
 *
 * Traduz a entidade de domínio para a linha do banco e o erro do Supabase para
 * um erro de aplicação — o usecase nunca vê tipos do Supabase.
 */
export class SupabaseContactRepository implements ContactRepository {
  constructor(private readonly client: SupabaseClient) {}

  async save(message: ContactMessage): Promise<StoredContactMessage> {
    const { data, error } = await this.client
      .from(TABLE)
      .insert({
        name: message.name,
        email: message.email,
        message: message.message,
      })
      .select("id, name, email, message, created_at")
      .single();

    if (error || !data) {
      console.error("[SupabaseContactRepository] falha ao inserir:", error);
      throw new ExternalServiceError("Não foi possível salvar a mensagem.");
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      message: data.message,
      createdAt: data.created_at,
    };
  }
}
