/** Tipos utilitários compartilhados por todas as camadas. */

/** Objeto plano serializável (payloads JSON, linhas de banco, etc.). */
export type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };

/** Resultado padronizado das respostas da API. */
export type ApiResponse<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string };
