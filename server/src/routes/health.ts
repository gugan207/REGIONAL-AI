/**
 * REGIONAL - AI — Health Check Route
 * GET /api/health
 */

import { Router, Request, Response } from "express";
import { config } from "../config";

export const healthRouter = Router();

healthRouter.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    service: "REGIONAL - AI API",
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    corsOrigins: config.corsOrigins,
    providers: {
      gemini: {
        isConfigured: config.gemini.isConfigured,
        model: config.gemini.model,
      },
      youtube: {
        isConfigured: config.youtube.isConfigured,
      },
    },
  });
});
