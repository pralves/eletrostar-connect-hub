import type { Request, Response, NextFunction } from "express";
import type { SubmitContactMessage } from "../../../usecases/SubmitContactMessage.js";
import type { ApiResponse } from "../../../shared/types.js";

/**
 * Adapta a requisição HTTP para o caso de uso e formata a resposta.
 *
 * Não contém regra de negócio — extrai o corpo, delega para o usecase e
 * padroniza o JSON de saída. Erros são repassados ao `next` (errorHandler).
 */
export class ContactController {
  constructor(private readonly submitContactMessage: SubmitContactMessage) {}

  submit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, email, message } = req.body ?? {};
      const result = await this.submitContactMessage.execute({ name, email, message });

      const body: ApiResponse<{ id: string }> = { success: true, data: result };
      res.status(201).json(body);
    } catch (err) {
      next(err);
    }
  };
}
