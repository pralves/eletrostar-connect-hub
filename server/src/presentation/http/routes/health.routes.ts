import { Router } from "express";

/** Health-check simples para monitoramento / readiness. */
export function healthRoutes(): Router {
  const router = Router();
  router.get("/health", (_req, res) => {
    res.json({ success: true, data: { status: "ok" } });
  });
  return router;
}
