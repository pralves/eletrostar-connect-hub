import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "../config/env.js";

/**
 * Cliente Supabase do backend, autenticado com a SERVICE ROLE KEY.
 *
 * Essa chave ignora RLS e NUNCA pode ir para o frontend — por isso vive só aqui,
 * no servidor. Como não há sessão de usuário, desligamos a persistência de auth.
 */
export const supabase: SupabaseClient = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  },
);
