/**
 * REGIONAL - AI — Frontend API Client
 * Provides typed methods to interact with backend endpoints (/api/*)
 * with robust Fallback-First resilience when APIs are offline or rate-limited.
 */

/**
 * Standardized server envelope: { ok, data, meta, error? }.
 * Mirrors server/src/types/api.ts ApiResponse — never rely on a `success` field.
 */
export interface ApiResponse<T> {
  ok: boolean;
  data: T;
  meta: {
    source: string;
    isFallback: boolean;
    processingTimeMs?: number;
    model?: string;
    quotaUnitsUsed?: number;
  };
  error?: string;
}

/** A YouTube video ID is exactly 11 chars of [A-Za-z0-9_-]. */
const YOUTUBE_VIDEO_ID_RE = /^[A-Za-z0-9_-]{11}$/;

export function isEmbeddableYouTubeId(id: string | null | undefined): boolean {
  return typeof id === 'string' && YOUTUBE_VIDEO_ID_RE.test(id);
}

/**
 * Builds a safe, genuine youtube.com URL for a video.
 * Never constructs embeds from arbitrary untrusted input.
 */
export function safeYouTubeWatchUrl(videoId: string | null | undefined, videoUrl: string | null | undefined): string {
  if (isEmbeddableYouTubeId(videoId)) {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }
  if (
    videoUrl &&
    videoUrl.length <= 300 &&
    /^https:\/\/(www\.)?youtube\.com\/(watch|results)\//.test(videoUrl) &&
    videoUrl.startsWith('https://')
  ) {
    return videoUrl;
  }
  return 'https://www.youtube.com/results?search_query=tutorial';
}

export interface BackendHealth {
  status: string;
  version: string;
  service: string;
  environment: string;
  providers: {
    gemini: { isConfigured: boolean; model: string };
    youtube: { isConfigured: boolean };
  };
}

export interface LiveYouTubeVideo {
  id: string;
  /** 11-char YouTube video id when a real video is known; never fabricated. */
  videoId: string;
  title: string;
  channelTitle: string;
  publishedAt: string;
  thumbnailUrl: string;
  duration?: string;
  url: string;
  level: string;
}

/** Returns the thumbnail URL only when it is a genuine i.ytimg.com image for the same video ID. */
function safeYouTubeThumbnailUrl(videoId: string | null | undefined, raw: string | null | undefined): string {
  if (isEmbeddableYouTubeId(videoId)) {
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  }
  if (
    raw &&
    /^https:\/\/i\.ytimg\.com\/vi\/[A-Za-z0-9_-]{11}\//.test(raw)
  ) {
    return raw;
  }
  return '';
}

export interface YouTubeSearchResult {
  query: string;
  targetRole: string;
  skill: string;
  level: string;
  resultsCount: number;
  videos: LiveYouTubeVideo[];
}

export interface RoadmapMilestoneStage {
  stageNumber: number;
  stageName: string;
  focus: string;
  durationWeeks: number;
  status: 'DONE' | 'NEXT' | 'UP NEXT';
  milestones: string[];
  deliverable: string;
  verificationArtifact: string;
}

export interface GeneratedRoadmap {
  roadmapId: string;
  targetRole: string;
  region: string;
  readinessScore: number;
  estimatedWeeks: number;
  stages: RoadmapMilestoneStage[];
}

/** Mirrors server/src/types/api.ts ResumeGenerationResponse.structuredResume exactly. */
export interface StructuredResume {
  contact: {
    fullName: string;
    email: string;
    phone?: string;
    cityState: string;
    githubUrl?: string;
    linkedinUrl?: string;
  };
  professionalSummary: string;
  technicalSkills: Record<string, string[]>;
  experience: Array<{
    roleTitle: string;
    organization: string;
    periodFormatted?: string;
    bulletPoints: string[];
    verifiedFactsOnly: boolean;
  }>;
  projects: Array<{
    title: string;
    technologies: string[];
    bulletPoints: string[];
    githubOrLiveUrl?: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: number;
    gpaOrGrade?: string;
  }>;
}

export interface GeneratedResumeResponse {
  resumeId: string;
  structuredResume: StructuredResume;
  auditRecord: {
    zeroHallucinationGuaranteed: boolean;
    unverifiedFactsFilteredCount: number;
    skillsStrictlyMatched: boolean;
  };
  meta?: {
    model?: string;
    generatedAt?: string;
    isFallback?: boolean;
  };
}

export interface SkillGapExplanation {
  skill: string;
  targetRole: string;
  region: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  marketRelevanceSummary: string;
  whyRegionalEmployersDemandThis: string[];
  actionPlan: {
    learnTopic: string;
    buildProjectSnippet: string;
    proveArtifact: string;
  };
}

// Fallback helpers — every entry is a real, publicly known YouTube video.
export const FALLBACK_YOUTUBE_VIDEOS: Record<string, LiveYouTubeVideo[]> = {
  docker: [
    {
      id: 'pTFZFxd4hOI',
      videoId: 'pTFZFxd4hOI',
      title: 'Docker Tutorial for Beginners',
      channelTitle: 'Programming with Mosh',
      publishedAt: '2024-01-01T00:00:00Z',
      thumbnailUrl: 'https://i.ytimg.com/vi/pTFZFxd4hOI/hqdefault.jpg',
      duration: '48 min',
      url: 'https://www.youtube.com/watch?v=pTFZFxd4hOI',
      level: 'Beginner • Demo result'
    },
    {
      id: '3c-iBn73dDE',
      videoId: '3c-iBn73dDE',
      title: 'Docker Tutorial for Beginners [FULL COURSE in 3 Hours]',
      channelTitle: 'TechWorld with Nana',
      publishedAt: '2024-01-01T00:00:00Z',
      thumbnailUrl: 'https://i.ytimg.com/vi/3c-iBn73dDE/hqdefault.jpg',
      duration: '35 min',
      url: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
      level: 'Intermediate • Demo result'
    }
  ],
  aws: [
    {
      id: 'ulprqHHWlng',
      videoId: 'ulprqHHWlng',
      title: 'AWS cloud practitioner fundamentals',
      channelTitle: 'FreeCodeCamp',
      publishedAt: '2024-01-01T00:00:00Z',
      thumbnailUrl: 'https://i.ytimg.com/vi/ulprqHHWlng/hqdefault.jpg',
      duration: '48 min',
      url: 'https://www.youtube.com/watch?v=ulprqHHWlng',
      level: 'Beginner • Demo result'
    },
    {
      id: 'k1RI5locZE4',
      videoId: 'k1RI5locZE4',
      title: 'AWS backend deployment guide',
      channelTitle: 'TechWorld with Nana',
      publishedAt: '2024-01-01T00:00:00Z',
      thumbnailUrl: 'https://i.ytimg.com/vi/k1RI5locZE4/hqdefault.jpg',
      duration: '35 min',
      url: 'https://www.youtube.com/watch?v=k1RI5locZE4',
      level: 'Intermediate • Demo result'
    }
  ],
  'rest apis': [
    {
      id: '-MTSQjw5DrM',
      videoId: '-MTSQjw5DrM',
      title: 'RESTful API architecture & design',
      channelTitle: 'Amigoscode',
      publishedAt: '2024-01-01T00:00:00Z',
      thumbnailUrl: 'https://i.ytimg.com/vi/-MTSQjw5DrM/hqdefault.jpg',
      duration: '40 min',
      url: 'https://www.youtube.com/watch?v=-MTSQjw5DrM',
      level: 'Beginner • Demo result'
    },
    {
      id: '7Q17ubqLfaM',
      videoId: '7Q17ubqLfaM',
      title: 'API authentication with JWT & OAuth',
      channelTitle: 'Hussein Nasser',
      publishedAt: '2024-01-01T00:00:00Z',
      thumbnailUrl: 'https://i.ytimg.com/vi/7Q17ubqLfaM/hqdefault.jpg',
      duration: '32 min',
      url: 'https://www.youtube.com/watch?v=7Q17ubqLfaM',
      level: 'Intermediate • Demo result'
    }
  ]
};

class ApiClient {
  private baseUrl = '/api';

  /**
   * Health Check
   */
  async getHealth(): Promise<ApiResponse<BackendHealth> | null> {
    try {
      const res = await fetch(`${this.baseUrl}/health`, { method: 'GET' });
      if (res.ok) {
        return await res.json();
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  /**
   * YouTube Learning Resources Search
   */
  async searchYouTube(
    skill: string,
    targetRole: string = 'Backend Developer',
    level: string = 'beginner',
    maxResults: number = 2
  ): Promise<ApiResponse<YouTubeSearchResult>> {
    const normSkill = skill.toLowerCase();
    try {
      const q = new URLSearchParams({
        skill,
        targetRole,
        level,
        maxResults: maxResults.toString()
      });

      const res = await fetch(`${this.baseUrl}/youtube/search?${q.toString()}`, {
        method: 'GET',
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        const json = await res.json();
        const rawList = json.data?.resources || json.data?.videos || json.resources || [];
        if (Array.isArray(rawList) && rawList.length > 0) {
          const videos: LiveYouTubeVideo[] = rawList
            .filter((r: any) => r && (r.videoId || r.id))
            .map((r: any) => {
              const rawId: string = r.videoId || r.id;
              // For curated fallback ids like "cur_gen_xxx_01" the URL may be a search URL;
              // derive the real 11-char video id from a watch link when present.
              const watchMatch = typeof r.videoUrl === 'string'
                ? r.videoUrl.match(/[?&]v=([A-Za-z0-9_-]{11})/)
                : null;
              const videoId: string = isEmbeddableYouTubeId(rawId)
                ? rawId
                : watchMatch
                ? watchMatch[1]
                : rawId;
              return {
                id: rawId,
                videoId,
                title: r.title,
                channelTitle: r.channelTitle,
                publishedAt: r.publishedAt || '',
                thumbnailUrl: safeYouTubeThumbnailUrl(videoId, r.thumbnailUrl),
                duration: r.durationFormatted || r.duration || '35 min',
                url: safeYouTubeWatchUrl(videoId, r.videoUrl || r.url),
                level: r.level || 'Beginner • Live result'
              };
            });
          return {
            ok: true,
            data: {
              query: json.data?.query || json.query || `${skill} tutorial`,
              targetRole,
              skill,
              level,
              resultsCount: videos.length,
              videos
            },
            meta: {
              source: json.meta?.source || 'youtube_live',
              isFallback: Boolean(json.meta?.isFallback)
            }
          };
        }
      } else {
        console.warn('[apiClient] YouTube search HTTP error:', res.status);
      }
    } catch (e) {
      console.warn('[apiClient] YouTube search request failed:', e instanceof Error ? e.message : e);
    }

    // Deterministic fallback
    const genericFallback: LiveYouTubeVideo[] = [
      {
        id: 'search',
        videoId: '',
        title: `${skill} tutorial for ${targetRole}`,
        channelTitle: 'YouTube Search',
        publishedAt: '',
        thumbnailUrl: '',
        duration: '',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${skill} tutorial ${targetRole}`)}`,
        level: 'Beginner • Demo result'
      },
      {
        id: 'search-intermediate',
        videoId: '',
        title: `Production ${skill} deployment tutorial`,
        channelTitle: 'YouTube Search',
        publishedAt: '',
        thumbnailUrl: '',
        duration: '',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(`production ${skill} deployment tutorial`)}`,
        level: 'Intermediate • Demo result'
      }
    ];
    const fallbackList = FALLBACK_YOUTUBE_VIDEOS[normSkill] || genericFallback;

    return {
      ok: true,
      data: {
        query: `${skill} tutorial for ${targetRole}`,
        targetRole,
        skill,
        level,
        resultsCount: fallbackList.length,
        videos: fallbackList
      },
      meta: {
        source: 'curated_fallback',
        isFallback: true
      }
    };
  }

  /**
   * Google Gemini Roadmap Generation
   */
  async generateRoadmap(payload: {
    targetRole: string;
    preferredRegion: string;
    currentSkills: string[];
    experienceLevel: string;
    education: { degree: string; fieldOfStudy: string; graduationYear: string };
    targetTimelineWeeks?: number;
  }): Promise<ApiResponse<GeneratedRoadmap>> {
    try {
      const res = await fetch(`${this.baseUrl}/ai/roadmap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.ok && data.data) {
          return data;
        }
        console.warn('[apiClient] Roadmap request rejected:', data.error || 'unknown error');
      }
    } catch (e) {
      console.warn('[apiClient] Roadmap request failed:', e instanceof Error ? e.message : e);
    }

    return {
      ok: true,
      data: {
        roadmapId: `rdmp_fb_${Date.now()}`,
        targetRole: payload.targetRole,
        region: payload.preferredRegion,
        readinessScore: 68,
        estimatedWeeks: payload.targetTimelineWeeks || 12,
        stages: [
          {
            stageNumber: 1,
            stageName: 'Foundation & Core Alignment',
            focus: 'REST APIs & Core request / response patterns',
            durationWeeks: 4,
            status: 'DONE',
            milestones: ['Build scalable REST service', 'Data modeling and serialization'],
            deliverable: 'Production REST API',
            verificationArtifact: 'Documented Postman collection and Swagger'
          },
          {
            stageNumber: 2,
            stageName: 'Containerization & Tooling',
            focus: 'Docker containerization and environment isolation',
            durationWeeks: 4,
            status: 'NEXT',
            milestones: ['Multi-stage Dockerfile build', 'Compose multi-container runtime'],
            deliverable: 'Containerized Backend API',
            verificationArtifact: 'Working Docker container with healthcheck'
          },
          {
            stageNumber: 3,
            stageName: 'Cloud & System Integration',
            focus: 'Deploy backend service to regional cloud targets',
            durationWeeks: 4,
            status: 'UP NEXT',
            milestones: ['Cloud compute deployment', 'CI/CD automated pipeline'],
            deliverable: 'Live Deployed Service',
            verificationArtifact: 'Public cloud endpoint and repo badge'
          }
        ]
      },
      meta: {
        source: 'curated_fallback',
        isFallback: true
      }
    };
  }

  /**
   * Google Gemini Resume Generation (Zero-Hallucination)
   */
  /**
   * Google Gemini Resume Generation (Zero-Hallucination)
   * Sends the exact backend contract from server/src/types/api.ts:
   * contact + targetRole + education[] + verifiedSkills + unstructuredExperience[] + unstructuredProjects[].
   * If the live request fails, NO fallback resume is fabricated client-side — the caller
   * decides how to present the error so no false success is ever shown.
   */
  async generateResume(payload: {
    contact: {
      fullName: string;
      email: string;
      phone?: string;
      cityState: string;
      githubUrl?: string;
      linkedinUrl?: string;
    };
    targetRole: string;
    education: Array<{ institution: string; degree: string; year: number; gpaOrGrade?: string }>;
    verifiedSkills: string[];
    unstructuredExperience: Array<{
      rawJobOrRoleTitle: string;
      organization: string;
      datesOrPeriod?: string;
      rawAccomplishmentsNotes: string;
    }>;
    unstructuredProjects: Array<{
      projectName: string;
      toolsUsedRaw?: string[];
      rawNotes: string;
    }>;
  }): Promise<ApiResponse<GeneratedResumeResponse>> {
    try {
      const res = await fetch(`${this.baseUrl}/ai/resume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data && data.ok && data.data && data.data.structuredResume) {
        return data as ApiResponse<GeneratedResumeResponse>;
      }
      console.warn('[apiClient] Resume request rejected:', (data && data.error) || `HTTP ${res.status}`);
      return {
        ok: false,
        data: null as unknown as GeneratedResumeResponse,
        error: (data && data.error) || `Resume generation failed (HTTP ${res.status})`,
        meta: { source: 'error', isFallback: false }
      };
    } catch (e) {
      console.warn('[apiClient] Resume request failed:', e instanceof Error ? e.message : e);
      return {
        ok: false,
        data: null as unknown as GeneratedResumeResponse,
        error: e instanceof Error ? e.message : 'Resume generation failed: backend unreachable',
        meta: { source: 'error', isFallback: false }
      };
    }
  }

  /**
   * Google Gemini Skill-Gap Explanation
   */
  async explainSkillGap(payload: {
    targetRole: string;
    targetRegion: string;
    identifiedGapSkill: string;
    currentSkills: string[];
  }): Promise<ApiResponse<SkillGapExplanation>> {
    try {
      const res = await fetch(`${this.baseUrl}/ai/skill-gap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.ok && data.data) {
          return data;
        }
        console.warn('[apiClient] Skill-gap request rejected:', data.error || 'unknown error');
      }
    } catch (e) {
      console.warn('[apiClient] Skill-gap request failed:', e instanceof Error ? e.message : e);
    }

    return {
      ok: true,
      data: {
        skill: payload.identifiedGapSkill,
        targetRole: payload.targetRole,
        region: payload.targetRegion,
        priority: 'HIGH',
        marketRelevanceSummary: `Employers in ${payload.targetRegion} heavily prioritize ${payload.identifiedGapSkill} for ${payload.targetRole} roles to ensure standardized local deployment and microservice orchestration.`,
        whyRegionalEmployersDemandThis: [
          `Rapid deployment across distributed development environments in ${payload.targetRegion}.`,
          `High integration with regional cloud infrastructure and hiring test suites.`,
          `Guarantees reproducibility and minimizes onboarding friction.`
        ],
        actionPlan: {
          learnTopic: `Core concepts of ${payload.identifiedGapSkill} and container lifecycle`,
          buildProjectSnippet: `Build a containerized REST API with multi-stage builds`,
          proveArtifact: `GitHub repository with Dockerfile, README, and passing tests`
        }
      },
      meta: {
        source: 'curated_fallback',
        isFallback: true
      }
    };
  }
}

export const apiClient = new ApiClient();
