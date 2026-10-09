/**
 * REGIONAL - AI — Provider Adapter Interfaces
 * Defines provider contracts for future NVIDIA and YouTube integrations.
 */

import {
  RoadmapGenerationRequest,
  RoadmapGenerationResponse,
  ResumeGenerationRequest,
  ResumeGenerationResponse,
  SkillGapExplanationRequest,
  SkillGapExplanationResponse,
  LearningResourceQuery,
  LearningResourceResponse,
} from "../types/api";

export interface IGeminiProvider {
  /**
   * Returns true if provider is configured and available for live calls.
   */
  isAvailable(): boolean;

  /**
   * Generates a multi-stage career roadmap using Google Gemini.
   */
  generateRoadmap(
    req: RoadmapGenerationRequest
  ): Promise<RoadmapGenerationResponse>;

  /**
   * Structures candidate experience into an ATS-ready format using Google Gemini.
   */
  generateResume(
    req: ResumeGenerationRequest
  ): Promise<ResumeGenerationResponse>;

  /**
   * Explains market rationale behind a specific skill gap using Google Gemini.
   */
  generateSkillGapExplanation(
    req: SkillGapExplanationRequest
  ): Promise<SkillGapExplanationResponse>;
}

export type IAIProvider = IGeminiProvider;

export interface IYoutubeProvider {
  /**
   * Returns true if YouTube Data API provider is configured and available.
   */
  isAvailable(): boolean;

  /**
   * Queries, filters, and ranks educational videos using YouTube Data API v3.
   */
  searchLearningResources(
    query: LearningResourceQuery
  ): Promise<LearningResourceResponse>;
}
