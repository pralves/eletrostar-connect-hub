import { Router } from "express";
import type { ContactController } from "../controllers/ContactController.js";

/** Monta as rotas de contato sobre um controller já instanciado. */
export function contactRoutes(controller: ContactController): Router {
  const router = Router();
  router.post("/contact", controller.submit);
  return router;
}
