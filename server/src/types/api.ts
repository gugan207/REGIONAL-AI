/**
 * REGIONAL - AI — Backend API Type Contracts & Response Envelopes
 * Framework-independent TypeScript definitions matching docs/API_TYPES.md
 */

// -----------------------------------------------------------------------------
// Standardized API Response Envelope Contracts
// -----------------------------------------------------------------------------
export interface ApiResponseMeta {
  isFallback: boolean;
  provider?: string;
  source?: "live_provider" | "fallback_engine" | "cache" | "deterministic-demo-engine";
  processingTimeMs?: number;
  timestamp: string;
  [key: string]: unknown;
}

export interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
  meta?: ApiResponseMeta;
}

// -----------------------------------------------------------------------------
// Health Check Contract
// -----------------------------------------------------------------------------
export interface HealthResponse {
  ok: boolean;
  service: string;
  timestamp: string;
  environment: string;
  corsOrigins: string[];
}

// -----------------------------------------------------------------------------
// NVIDIA — Career Roadmap Contracts
// -----------------------------------------------------------------------------
export interface RoadmapCandidateEducation {
  degree: string;
  fieldOfStudy: string;
  graduationYear: number;
}

export interface RoadmapGenerationRequest {
  candidateId?: string;
  targetRole: string;
  preferredRegion: string;
  experienceLevel: "student" | "fresher" | "junior" | "transitioning";
  currentSkills: string[];
  education: RoadmapCandidateEducation;
  timeCommitmentHoursPerWeek?: number;
  targetTimelineWeeks?: number;
}

export interface RoadmapMilestoneProject {
  title: string;
  description: string;
  deliverables: string[];
  skillsApplied: string[];
}

export interface RoadmapStage {
  stageNumber: number;
  title: string;
  durationWeeks: number;
  focusArea: string;
  learningObjectives: string[];
  recommendedProject: RoadmapMilestoneProject;
  milestoneProof: string;
}

export interface RoadmapGenerationResponse {
  roadmapId: string;
  targetRole: string;
  region: string;
  readinessScore: number;
  estimatedWeeks: number;
  stages: RoadmapStage[];
  meta: {
    model: string;
    generatedAt: string;
    isFallback: boolean;
    processingTimeMs: number;
  };
}

// -----------------------------------------------------------------------------
// NVIDIA — Resume Structuring Contracts
// -----------------------------------------------------------------------------
export interface ContactInfo {
  fullName: string;
  email: string;
  phone?: string;
  cityState: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export interface UnstructuredExperienceItem {
  rawJobOrRoleTitle: string;
  organization: string;
  datesOrPeriod?: string;
  rawAccomplishmentsNotes: string;
}

export interface UnstructuredProjectItem {
  projectName: string;
  toolsUsedRaw?: string[];
  rawNotes: string;
}

export interface ResumeEducationItem {
  institution: string;
  degree: string;
  year: number;
  gpaOrGrade?: string;
}

export interface ResumeGenerationRequest {
  contact: ContactInfo;
  targetRole: string;
  education: ResumeEducationItem[];
  verifiedSkills: string[];
  unstructuredExperience: UnstructuredExperienceItem[];
  unstructuredProjects: UnstructuredProjectItem[];
  formattingOptions?: {
    style: "ats_clean" | "modern_compact";
    maxBulletPointsPerItem?: number;
  };
}

export interface StructuredResumeExperience {
  roleTitle: string;
  organization: string;
  periodFormatted?: string;
  bulletPoints: string[];
  verifiedFactsOnly: boolean;
}

export interface StructuredResumeProject {
  title: string;
  technologies: string[];
  bulletPoints: string[];
  githubOrLiveUrl?: string;
}

export interface ResumeGenerationResponse {
  resumeId: string;
  structuredResume: {
    contact: ContactInfo;
    professionalSummary: string;
    technicalSkills: Record<string, string[]>;
    experience: StructuredResumeExperience[];
    projects: StructuredResumeProject[];
    education: ResumeEducationItem[];
  };
  auditRecord: {
    zeroHallucinationGuaranteed: boolean;
    unverifiedFactsFilteredCount: number;
    skillsStrictlyMatched: boolean;
  };
  meta: {
    model: string;
    generatedAt: string;
    isFallback: boolean;
  };
}

// -----------------------------------------------------------------------------
// NVIDIA — Skill-Gap Explanation Contracts
// -----------------------------------------------------------------------------
export interface SkillGapExplanationRequest {
  targetRole: string;
  targetRegion: string;
  currentSkills: string[];
  identifiedGapSkill: string;
  experienceLevel?: "fresher" | "student" | "experienced";
}

export interface SkillGapActionPlan {
  learnTopic: string;
  buildProjectSnippet: string;
  proveArtifact: string;
}

export interface SkillGapExplanationResponse {
  skill: string;
  targetRole: string;
  region: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  marketRelevanceSummary: string;
  whyRegionalEmployersDemandThis: string[];
  actionPlan: SkillGapActionPlan;
  meta: {
    model: string;
    generatedAt: string;
    isFallback: boolean;
  };
}

// -----------------------------------------------------------------------------
// YouTube — Learning Resource Contracts
// -----------------------------------------------------------------------------
export interface LearningResourceQuery {
  skill: string;
  targetRole?: string;
  level?: "beginner" | "intermediate" | "advanced";
  maxResults?: number;
  language?: string;
}

export interface LearningResource {
  id: string;
  videoId: string;
  title: string;
  channelTitle: string;
  description: string;
  durationSeconds: number;
  durationFormatted: string;
  videoUrl: string;
  thumbnailUrl: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  relevanceScore: number;
  skillTag: string;
  level: "beginner" | "intermediate" | "advanced";
}

export interface LearningResourceResponse {
  query: LearningResourceQuery;
  totalResults: number;
  resources: LearningResource[];
  source: "youtube_live" | "curated_fallback" | "cache";
  cachedAt?: string;
  meta: {
    isFallback?: boolean;
    quotaUnitsUsed: number;
    processingTimeMs: number;
  };
}
