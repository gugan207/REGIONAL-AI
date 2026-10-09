/**
 * REGIONAL - AI — Hardened Server Configuration Loader
 * Safely loads environment variables, manages defaults, and guards against secret leakage.
 */

import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Load local .env from standard server or workspace paths (strictly on the server side)
const envCandidates = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(process.cwd(), "server/.env"),
  path.resolve(__dirname, "../.env"),
  path.resolve(__dirname, "../../.env"),
];
for (const envPath of envCandidates) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
}

export interface ServerConfig {
  port: number;
  nodeEnv: string;
  corsOrigins: string[];
  maxRequestBodySizeKb: number;
  forceDemoFallback: boolean;

  gemini: {
    apiKey?: string;
    model: string;
    timeoutMs: number;
    isConfigured: boolean;
  };

  youtube: {
    apiKey?: string;
    baseUrl: string;
    cacheTtlSeconds: number;
    maxResults: number;
    isConfigured: boolean;
  };
}

const parseNumber = (val: string | undefined, fallback: number): number => {
  if (!val) return fallback;
  const num = parseInt(val, 10);
  return isNaN(num) ? fallback : num;
};

const parseBoolean = (val: string | undefined, fallback: boolean): boolean => {
  if (!val) return fallback;
  const normalized = val.trim().toLowerCase();
  return normalized === "true" || normalized === "1";
};

const parseCorsOrigins = (val: string | undefined): string[] => {
  const defaultOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];
  if (!val || !val.trim()) return defaultOrigins;
  if (val.trim() === "*") return ["*"];
  return val
    .split(",")
    .map((o) => o.trim())
    .filter((o) => o.length > 0);
};

const geminiApiKey = process.env.GEMINI_API_KEY?.trim() || undefined;
const youtubeApiKey = process.env.YOUTUBE_API_KEY?.trim() || undefined;

export const config: ServerConfig = {
  port: parseNumber(process.env.PORT, 5000),
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigins: parseCorsOrigins(process.env.CORS_ORIGIN),
  maxRequestBodySizeKb: parseNumber(process.env.MAX_REQUEST_BODY_SIZE_KB, 500),
  forceDemoFallback: parseBoolean(process.env.FORCE_DEMO_FALLBACK, false),

  gemini: {
    apiKey: geminiApiKey,
    model: process.env.GEMINI_MODEL?.trim() || "gemini-3.8-flash",
    timeoutMs: parseNumber(process.env.GEMINI_REQUEST_TIMEOUT_MS, 30000),
    isConfigured: Boolean(geminiApiKey && geminiApiKey.length > 5),
  },

  youtube: {
    apiKey: youtubeApiKey,
    baseUrl: process.env.YOUTUBE_API_BASE_URL?.trim() || "https://www.googleapis.com/youtube/v3",
    cacheTtlSeconds: parseNumber(process.env.YOUTUBE_CACHE_TTL_SECONDS, 86400),
    maxResults: parseNumber(process.env.YOUTUBE_MAX_RESULTS_PER_QUERY, 10),
    isConfigured: Boolean(youtubeApiKey && youtubeApiKey.length > 5),
  },
};

/**
 * Returns a sanitized configuration summary safe for logging.
 * NEVER outputs raw API keys, tokens, or private secrets.
 */
export function getSanitizedConfigSummary() {
  return {
    port: config.port,
    nodeEnv: config.nodeEnv,
    corsOrigins: config.corsOrigins,
    maxRequestBodySizeKb: config.maxRequestBodySizeKb,
    forceDemoFallback: config.forceDemoFallback,
    gemini: {
      isConfigured: config.gemini.isConfigured,
      model: config.gemini.model,
      timeoutMs: config.gemini.timeoutMs,
    },
    youtube: {
      isConfigured: config.youtube.isConfigured,
      baseUrl: config.youtube.baseUrl,
      cacheTtlSeconds: config.youtube.cacheTtlSeconds,
      maxResults: config.youtube.maxResults,
    },
  };
}
