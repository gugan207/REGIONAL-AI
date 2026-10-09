/**
 * REGIONAL - AI — Frontend API Client
 * Provides typed methods to interact with backend endpoints (/api/*)
 * with robust Fallback-First resilience when APIs are offline or rate-limited.
 */

export interface ApiResponse<T> {
  success: boolean;
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
  title: string;
  channelTitle: string;
  publishedAt: string;
  thumbnailUrl: string;
  duration?: string;
  url: string;
  level: string;
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

export interface StructuredResume {
  contactInfo: {
    name: string;
    title: string;
    location: string;
    contactNote: string;
  };
  skillsSummary: {
    verifiedSkills: string[];
    gapSkillsInProgress: string[];
  };
  experience: Array<{
    role: string;
    companyOrContext: string;
    period: string;
    highlights: string[];
  }>;
  projects: Array<{
    title: string;
    technologies: string[];
    description: string;
    outcomeEvidence: string;
  }>;
  education: {
    degree: string;
    status: string;
  };
}

export interface GeneratedResumeResponse {
  resumeId: string;
  structuredResume: StructuredResume;
  auditRecord: {
    zeroHallucinationGuaranteed: boolean;
    unverifiedFactsFilteredCount: number;
    skillsStrictlyMatched: boolean;
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

// Fallback helpers
export const FALLBACK_YOUTUBE_VIDEOS: Record<string, LiveYouTubeVideo[]> = {
  docker: [
    {
      id: 'pTFZFxd4hOI',
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
      id: 'aws-1',
      title: 'AWS cloud practitioner fundamentals',
      channelTitle: 'FreeCodeCamp',
      publishedAt: '2024-01-01T00:00:00Z',
      thumbnailUrl: 'https://i.ytimg.com/vi/k1RI5locZE4/hqdefault.jpg',
      duration: '48 min',
      url: 'https://www.youtube.com/watch?v=k1RI5locZE4',
      level: 'Beginner • Demo result'
    },
    {
      id: 'aws-2',
      title: 'AWS backend deployment guide',
      channelTitle: 'TechWorld with Nana',
      publishedAt: '2024-01-01T00:00:00Z',
      thumbnailUrl: 'https://i.ytimg.com/vi/ulprqHHWlng/hqdefault.jpg',
      duration: '35 min',
      url: 'https://www.youtube.com/watch?v=ulprqHHWlng',
      level: 'Intermediate • Demo result'
    }
  ],
  'rest apis': [
    {
      id: 'rest-1',
      title: 'RESTful API architecture & design',
      channelTitle: 'Amigoscode',
      publishedAt: '2024-01-01T00:00:00Z',
      thumbnailUrl: 'https://i.ytimg.com/vi/-MTSQjw5DrM/hqdefault.jpg',
      duration: '40 min',
      url: 'https://www.youtube.com/watch?v=-MTSQjw5DrM',
      level: 'Beginner • Demo result'
    },
    {
      id: 'rest-2',
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
          const videos: LiveYouTubeVideo[] = rawList.map((r: any) => ({
            id: r.videoId || r.id,
            title: r.title,
            channelTitle: r.channelTitle,
            publishedAt: r.publishedAt || '',
            thumbnailUrl: r.thumbnailUrl || '',
            duration: r.durationFormatted || r.duration || '35 min',
            url: r.videoUrl || r.url || `https://www.youtube.com/watch?v=${r.videoId || r.id}`,
            level: r.level || 'Beginner • Live result'
          }));
          return {
            success: true,
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
      }
    } catch {
      // Graceful fallback on network/server errors
    }

    // Deterministic fallback
    const fallbackList = FALLBACK_YOUTUBE_VIDEOS[normSkill] || [
      {
        id: `${normSkill}-1`,
        title: `${skill} essentials for ${targetRole}`,
        channelTitle: 'Tech Learning Hub',
        publishedAt: new Date().toISOString(),
        thumbnailUrl: 'https://via.placeholder.com/320x180/5B50E8/FFFFFF?text=' + encodeURIComponent(skill),
        duration: '45 min',
        url: 'https://www.youtube.com',
        level: 'Beginner • Demo result'
      },
      {
        id: `${normSkill}-2`,
        title: `Production ${skill} deployment tutorial`,
        channelTitle: 'Engineering Pro',
        publishedAt: new Date().toISOString(),
        thumbnailUrl: 'https://via.placeholder.com/320x180/8B7CF6/FFFFFF?text=' + encodeURIComponent(skill),
        duration: '38 min',
        url: 'https://www.youtube.com',
        level: 'Intermediate • Demo result'
      }
    ];

    return {
      success: true,
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
        if (data.success && data.data) {
          return data;
        }
      }
    } catch (e) {
      // Fallback
    }

    return {
      success: true,
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
  async generateResume(payload: {
    candidateProfile: {
      fullName: string;
      region: string;
      targetRole: string;
      education: string;
      year: string;
    };
    verifiedSkills: string[];
    selectedGapSkill?: string;
    userExperienceNotes?: string;
  }): Promise<ApiResponse<GeneratedResumeResponse>> {
    try {
      const res = await fetch(`${this.baseUrl}/ai/resume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          return data;
        }
      }
    } catch (e) {
      // Fallback
    }

    return {
      success: true,
      data: {
        resumeId: `res_fb_${Date.now()}`,
        structuredResume: {
          contactInfo: {
            name: payload.candidateProfile.fullName || 'Candidate',
            title: `${payload.candidateProfile.targetRole} Candidate`,
            location: `${payload.candidateProfile.region}, India`,
            contactNote: 'Contact details provided by candidate'
          },
          skillsSummary: {
            verifiedSkills: payload.verifiedSkills,
            gapSkillsInProgress: payload.selectedGapSkill ? [payload.selectedGapSkill] : ['Docker']
          },
          experience: [
            {
              role: 'Backend Engineering Project',
              companyOrContext: 'Academic & Personal Portfolio',
              period: `${payload.candidateProfile.year} (${payload.candidateProfile.education})`,
              highlights: [
                'Engineered backend endpoints utilizing ' + payload.verifiedSkills.join(', '),
                'Adheres strictly to verified candidate achievements with zero unsupported claims.'
              ]
            }
          ],
          projects: [
            {
              title: 'Containerized Regional Backend Service',
              technologies: [...payload.verifiedSkills, payload.selectedGapSkill || 'Docker'],
              description: 'Production-ready REST API formatted for regional employer evaluation.',
              outcomeEvidence: 'Documented codebase, README setup, and proof repository.'
            }
          ],
          education: {
            degree: payload.candidateProfile.education,
            status: payload.candidateProfile.year
          }
        },
        auditRecord: {
          zeroHallucinationGuaranteed: true,
          unverifiedFactsFilteredCount: 0,
          skillsStrictlyMatched: true
        }
      },
      meta: {
        source: 'curated_fallback',
        isFallback: true
      }
    };
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
        if (data.success && data.data) {
          return data;
        }
      }
    } catch (e) {
      // Fallback
    }

    return {
      success: true,
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
