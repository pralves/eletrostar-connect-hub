import express, { type Express } from "express";
import cors from "cors";
import { corsOrigins } from "../config/env.js";
import type { ContactController } from "../../presentation/http/controllers/ContactController.js";
import { contactRoutes } from "../../presentation/http/routes/contact.routes.js";
import { healthRoutes } from "../../presentation/http/routes/health.routes.js";
import { errorHandler, notFoundHandler } from "../../presentation/http/middlewares/errorHandler.js";

export interface HttpDeps {
  contactController: ContactController;
}

/**
 * Cria e configura a aplicação Express.
 *
 * Recebe os controllers já construídos (injeção de dependência) — não instancia
 * nada de negócio aqui. Ordem dos middlewares importa: CORS e JSON antes das
 * rotas; 404 e errorHandler por último.
 */
export function createApp(deps: HttpDeps): Express {
  const app = express();

  app.use(cors({ origin: corsOrigins }));
  app.use(express.json({ limit: "100kb" }));

  // Rotas sob /api
  app.use("/api", healthRoutes());
  app.use("/api", contactRoutes(deps.contactController));

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
