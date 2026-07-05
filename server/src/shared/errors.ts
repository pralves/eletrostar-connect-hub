/**
 * Erros de aplicação com um `statusCode` HTTP associado.
 *
 * Ficam em `shared` porque são usados por várias camadas (usecases lançam,
 * a camada de apresentação traduz para resposta HTTP). Nenhum deles conhece
 * Express — apenas carregam a intenção semântica.
 */

export class AppError extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = new.target.name;
    this.statusCode = statusCode;
  }
}

/** Dados inválidos enviados pelo cliente (HTTP 400). */
export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

/** Falha em um serviço externo — SMTP, banco, etc. (HTTP 502). */
export class ExternalServiceError extends AppError {
  constructor(message: string) {
    super(message, 502);
  }
}
