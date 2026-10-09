/**
 * REGIONAL - AI — Standardized API Response Envelope Utilities
 * Ensures consistent response structure across all endpoints without breaking existing contracts.
 */

import { ApiResponse, ApiResponseMeta } from "../types/api";

/**
 * Formats a successful response payload.
 * Provides the standardized { ok, data, meta } envelope while preserving top-level
 * fields for seamless backward compatibility.
 */
export function formatSuccessResponse<T extends Record<string, unknown>>(
  data: T,
  metaOptions?: Partial<ApiResponseMeta>
): ApiResponse<T> & T {
  let isFallback = true;

  if (
    (data as any)?.source === "youtube_live" ||
    (data as any)?.source === "live_provider" ||
    (data as any)?.meta?.isFallback === false
  ) {
    isFallback = false;
  } else if ((data as any)?.meta?.isFallback !== undefined) {
    isFallback = Boolean((data as any).meta.isFallback);
  }

  const source =
    (data as any)?.source ||
    (isFallback ? "fallback_engine" : "live_provider");

  const provider =
    (data as any)?.meta?.model ||
    (isFallback ? "deterministic-demo-engine" : "external-provider");

  const existingMeta =
    typeof (data as any)?.meta === "object" && (data as any)?.meta !== null
      ? (data as any).meta
      : {};

  const mergedMeta: ApiResponseMeta = {
    source,
    provider,
    timestamp: new Date().toISOString(),
    ...existingMeta,
    ...metaOptions,
    isFallback,
  };

  return {
    ...data,
    ok: true,
    data,
    meta: mergedMeta,
  };
}

/**
 * Formats a standardized error response payload.
 */
export function formatErrorResponse(
  error: string,
  metaOptions?: Partial<ApiResponseMeta>
): ApiResponse<null> {
  return {
    ok: false,
    error,
    meta: {
      isFallback: false,
      timestamp: new Date().toISOString(),
      ...metaOptions,
    },
  };
}
