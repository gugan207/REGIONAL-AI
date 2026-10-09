/**
 * REGIONAL - AI — YouTube Route Handlers
 * Endpoints for searching and ranking learning videos.
 */

import { Router, Request, Response } from "express";
import { youtubeService } from "../services/youtubeService";
import { validateYouTubeQuery } from "../utils/validation";
import { formatSuccessResponse, formatErrorResponse } from "../utils/response";

export const youtubeRouter = Router();

/**
 * GET /api/youtube/search
 * Query params: skill (required), targetRole, level, maxResults, language
 */
youtubeRouter.get("/search", async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = validateYouTubeQuery(req.query as Record<string, unknown>);
    if (!validation.valid || !validation.data) {
      res.status(400).json(formatErrorResponse(validation.error || "Malformed learning resource query"));
      return;
    }

    const response = await youtubeService.searchLearningResources(validation.data);
    res.status(200).json(formatSuccessResponse(response as unknown as Record<string, unknown>));
  } catch (error) {
    res.status(500).json(formatErrorResponse("Internal error processing learning resource search"));
  }
});
