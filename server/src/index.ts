/**
 * REGIONAL - AI — Hardened Backend API Server Entrypoint
 * Standalone Express server providing NVIDIA and YouTube API endpoints with provider adapter architecture.
 */

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { config, getSanitizedConfigSummary } from "./config";
import { healthRouter } from "./routes/health";
import { aiRouter } from "./routes/ai";
import { youtubeRouter } from "./routes/youtube";
import { formatErrorResponse } from "./utils/response";

export const app = express();

// Security Hardening: Configurable CORS
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g., curl, mobile, server-to-server)
    if (!origin) return callback(null, true);
    if (config.corsOrigins.includes("*") || config.corsOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`Origin '${origin}' not permitted by CORS policy`), false);
  },
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};
app.use(cors(corsOptions));

// Security Hardening: Enforce strict JSON body size limit
app.use(express.json({ limit: `${config.maxRequestBodySizeKb}kb` }));

// Route registrations
app.use("/api/health", healthRouter);
app.use("/api/ai", aiRouter);
app.use("/api/nvidia", aiRouter); // Legacy compatibility alias (routed solely to Google Gemini)
app.use("/api/youtube", youtubeRouter);

// 404 handler for undefined API routes
app.use((_req: Request, res: Response) => {
  res.status(404).json(formatErrorResponse("API route not found"));
});

// Centralized error handler (guarantees zero stack traces or secret leakage to client)
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const errorMessage = err instanceof Error ? err.message : "Internal server error";
  
  // Safe internal logging without exposing tokens
  console.error("[REGIONAL-AI SERVER ERROR]", errorMessage);

  const statusCode = errorMessage.includes("CORS") ? 403 : 500;
  res.status(statusCode).json(formatErrorResponse(statusCode === 403 ? errorMessage : "Internal server error"));
});

// Bind to port when executed directly as main script
if (require.main === module) {
  const server = app.listen(config.port, () => {
    console.log(`[REGIONAL-AI SERVER] Started on port ${config.port} in ${config.nodeEnv} mode.`);
    console.log("[REGIONAL-AI CONFIG]", JSON.stringify(getSanitizedConfigSummary()));
  });

  process.on("SIGTERM", () => {
    server.close(() => {
      console.log("[REGIONAL-AI SERVER] Terminated gracefully.");
    });
  });
}
