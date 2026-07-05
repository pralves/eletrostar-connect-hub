import "dotenv/config";
import { z } from "zod";

/**
 * Carrega e valida as variáveis de ambiente uma única vez, no boot.
 *
 * Se algo obrigatório estiver faltando, o processo falha imediatamente com uma
 * mensagem clara — em vez de quebrar no meio de uma requisição.
 */
const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3001),
  CORS_ORIGIN: z.string().default("http://localhost:8080"),

  SUPABASE_URL: z.string().url("SUPABASE_URL inválida."),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "SUPABASE_SERVICE_ROLE_KEY ausente."),
  SUPABASE_ANON_KEY: z.string().min(1).optional(),

  SMTP_HOST: z.string().default("smtp.hostinger.com"),
  SMTP_PORT: z.coerce.number().int().positive().default(465),
  SMTP_USER: z.string().min(1, "SMTP_USER ausente."),
  SMTP_PASS: z.string().min(1, "SMTP_PASS ausente."),
  CONTACT_TO: z.string().email("CONTACT_TO inválido."),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
    .join("\n");
  console.error(`\n[env] Configuração inválida:\n${issues}\n`);
  throw new Error("Variáveis de ambiente inválidas. Verifique o arquivo .env.");
}

export const env = parsed.data;

/** Lista de origens permitidas para CORS (separadas por vírgula no .env). */
export const corsOrigins = env.CORS_ORIGIN.split(",").map((o) => o.trim());
