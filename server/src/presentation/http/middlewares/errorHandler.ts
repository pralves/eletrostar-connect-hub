import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../../shared/errors.js";
import type { ApiResponse } from "../../../shared/types.js";

/**
 * Middleware final de tratamento de erros.
 *
 * `AppError` (e subclasses) vira resposta com o statusCode e a mensagem
 * apropriados; qualquer outro erro é logado e devolvido como 500 genérico,
 * sem vazar detalhes internos para o cliente.
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    const body: ApiResponse = { success: false, error: err.message };
    res.status(err.statusCode).json(body);
    return;
  }

  console.error("[errorHandler] erro não tratado:", err);
  const body: ApiResponse = { success: false, error: "Erro interno do servidor." };
  res.status(500).json(body);
}

/** Handler de rota não encontrada (404). */
export function notFoundHandler(_req: Request, res: Response): void {
  const body: ApiResponse = { success: false, error: "Recurso não encontrado." };
  res.status(404).json(body);
}
