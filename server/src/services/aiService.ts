/**
 * REGIONAL - AI — AI Orchestration Service (Google Gemini)
 * Manages the decision flow between the live Google Gemini provider adapter and the deterministic fallback engine.
 */

import { geminiProvider, GeminiProvider } from "../providers/geminiProvider";
import {
  RoadmapGenerationRequest,
  RoadmapGenerationResponse,
  ResumeGenerationRequest,
  ResumeGenerationResponse,
  SkillGapExplanationRequest,
  SkillGapExplanationResponse,
} from "../types/api";
import {
  getFallbackRoadmap,
  getFallbackResume,
  getFallbackSkillGap,
} from "../utils/fallback";

export class AiService {
  constructor(private provider: GeminiProvider = geminiProvider) {}

  /**
   * Generates a structured multi-stage career roadmap.
   * Decides between live Google Gemini provider and deterministic fallback.
   */
  async generateRoadmap(
    req: RoadmapGenerationRequest
  ): Promise<RoadmapGenerationResponse> {
    if (this.provider.isAvailable()) {
      try {
        return await this.provider.generateRoadmap(req);
      } catch (err) {
        console.warn("[AI SERVICE] Gemini provider call failed or unavailable, engaging deterministic fallback.");
        return getFallbackRoadmap(req);
      }
    }

    // Provider unavailable or unconfigured: use deterministic fallback
    return getFallbackRoadmap(req);
  }

  /**
   * Structures candidate experience into an ATS-friendly format.
   * Strictly enforces zero-hallucination fact invariants.
   */
  async generateResume(
    req: ResumeGenerationRequest
  ): Promise<ResumeGenerationResponse> {
    if (this.provider.isAvailable()) {
      try {
        return await this.provider.generateResume(req);
      } catch (err) {
        console.warn("[AI SERVICE] Gemini provider call failed or unavailable, engaging deterministic fallback.");
        return getFallbackResume(req);
      }
    }

    return getFallbackResume(req);
  }

  /**
   * Generates localized skill-gap explanations and action recommendations.
   */
  async generateSkillGapExplanation(
    req: SkillGapExplanationRequest
  ): Promise<SkillGapExplanationResponse> {
    if (this.provider.isAvailable()) {
      try {
        return await this.provider.generateSkillGapExplanation(req);
      } catch (err) {
        console.warn("[AI SERVICE] Gemini provider call failed or unavailable, engaging deterministic fallback.");
        return getFallbackSkillGap(req);
      }
    }

    return getFallbackSkillGap(req);
  }
}

export const aiService = new AiService();
export const geminiService = aiService;
