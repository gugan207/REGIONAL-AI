/**
 * REGIONAL - AI — YouTube Orchestration Service
 * Manages the decision flow between the live YouTube Data API provider and the curated fallback catalog.
 */

import { youtubeProvider, YoutubeProvider } from "../providers/youtubeProvider";
import { LearningResourceQuery, LearningResourceResponse } from "../types/api";
import { getFallbackLearningResources } from "../utils/fallback";

export class YoutubeService {
  constructor(private provider: YoutubeProvider = youtubeProvider) {}

  /**
   * Searches and ranks high-yield learning resources for technical skills.
   * Decides between live YouTube Data API v3 and curated fallback catalog.
   */
  async searchLearningResources(
    query: LearningResourceQuery
  ): Promise<LearningResourceResponse> {
    if (this.provider.isAvailable()) {
      try {
        return await this.provider.searchLearningResources(query);
      } catch (err) {
        console.warn("[YOUTUBE SERVICE] Provider call failed or unavailable, engaging curated fallback.");
        return getFallbackLearningResources(query);
      }
    }

    // Provider unavailable: use curated fallback catalog
    return getFallbackLearningResources(query);
  }
}

export const youtubeService = new YoutubeService();
