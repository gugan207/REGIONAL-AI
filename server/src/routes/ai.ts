/**
 * REGIONAL - AI — AI Route Handlers (Google Gemini)
 * Endpoints for Roadmap Generation, Resume Structuring, and Skill-Gap Explanations.
 * Powered solely by Google Gemini and deterministic fallback engine.
 */

import { Router, Request, Response } from "express";
import { aiService } from "../services/aiService";
import {
  validateRoadmapRequest,
  validateResumeRequest,
  validateSkillGapRequest,
} from "../utils/validation";
import { formatSuccessResponse, formatErrorResponse } from "../utils/response";

export const aiRouter = Router();

/**
 * POST /api/ai/roadmap (and legacy /api/nvidia/roadmap)
 * Generates structured milestone career roadmap
 */
aiRouter.post("/roadmap", async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = validateRoadmapRequest(req.body);
    if (!validation.valid || !validation.data) {
      res.status(400).json(formatErrorResponse(validation.error || "Malformed roadmap generation request"));
      return;
    }

    const response = await aiService.generateRoadmap(validation.data);
    res.status(200).json(formatSuccessResponse(response as unknown as Record<string, unknown>));
  } catch (error) {
    res.status(500).json(formatErrorResponse("Internal error processing roadmap generation"));
  }
});

/**
 * POST /api/ai/resume (and legacy /api/nvidia/resume)
 * Structures user experience into ATS-ready format without hallucinations
 */
aiRouter.post("/resume", async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = validateResumeRequest(req.body);
    if (!validation.valid || !validation.data) {
      res.status(400).json(formatErrorResponse(validation.error || "Malformed resume structuring request"));
      return;
    }

    const response = await aiService.generateResume(validation.data);
    res.status(200).json(formatSuccessResponse(response as unknown as Record<string, unknown>));
  } catch (error) {
    res.status(500).json(formatErrorResponse("Internal error processing resume structuring"));
  }
});

/**
 * POST /api/ai/skill-gap (and legacy /api/nvidia/skill-gap)
 * Explains regional market rationale for target skill gaps
 */
aiRouter.post("/skill-gap", async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = validateSkillGapRequest(req.body);
    if (!validation.valid || !validation.data) {
      res.status(400).json(formatErrorResponse(validation.error || "Malformed skill gap explanation request"));
      return;
    }

    const response = await aiService.generateSkillGapExplanation(validation.data);
    res.status(200).json(formatSuccessResponse(response as unknown as Record<string, unknown>));
  } catch (error) {
    res.status(500).json(formatErrorResponse("Internal error processing skill gap explanation"));
  }
});

// Also export as nvidiaRouter alias strictly for legacy compatibility
export const nvidiaRouter = aiRouter;
