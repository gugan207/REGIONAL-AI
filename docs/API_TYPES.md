# REGIONAL - AI — API Type Contracts & Data Specifications

**Document Version:** 1.0.0  
**Specification Type:** Framework-Independent TypeScript Definitions & JSON Examples  
**Services Covered:** NVIDIA NIM / LLM Endpoints & YouTube Data API v3  

---

## 1. Overview

This document specifies the exact request and response schemas for future backend integrations. All contracts are designed to be:
* **Framework-Independent:** Usable in Node.js (TypeScript/Express/FastAPI), Python (Pydantic), or browser client libraries.
* **Strictly Typed:** Eliminating ambiguous types or untyped dictionary payloads.
* **Audit-Aware:** Every response includes metadata describing execution source (`live` vs `fallback`), model version, and timestamps.
* **Hallucination-Guarded:** Resume and roadmap payloads contain audit invariants ensuring facts are derived exclusively from user input.

---

## 2. NVIDIA NIM / LLM API Contracts

### 2.1 AI Roadmap Generation

#### TypeScript Definitions
```typescript
/**
 * Request payload sent by frontend to generate a customized career roadmap.
 */
export interface RoadmapGenerationRequest {
  /** Optional identifier for logged-in or guest candidate */
  candidateId?: string;
  /** Target tech role (e.g., "Backend Developer", "Data Analyst") */
  targetRole: string;
  /** Regional job market context (e.g., "Chennai", "Bengaluru", "Hyderabad") */
  preferredRegion: string;
  /** Candidate career tier */
  experienceLevel: "student" | "fresher" | "junior" | "transitioning";
  /** Currently verified or self-reported skills */
  currentSkills: string[];
  /** Candidate educational background */
  education: {
    degree: string;
    fieldOfStudy: string;
    graduationYear: number;
  };
  /** Estimated hours per week available for study */
  timeCommitmentHoursPerWeek?: number;
  /** Desired completion horizon in weeks (default: 12) */
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

/**
 * Structured response payload returned by the backend after LLM processing or fallback.
 */
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
```

#### JSON Request Example (`POST /api/v1/ai/roadmap`)
```json
{
  "targetRole": "Backend Developer",
  "preferredRegion": "Chennai",
  "experienceLevel": "fresher",
  "currentSkills": ["Python", "SQL", "Git"],
  "education": {
    "degree": "B.Tech",
    "fieldOfStudy": "Computer Science",
    "graduationYear": 2026
  },
  "timeCommitmentHoursPerWeek": 15,
  "targetTimelineWeeks": 12
}
```

#### JSON Response Example
```json
{
  "roadmapId": "rdmp_chn_be_2026_0982",
  "targetRole": "Backend Developer",
  "region": "Chennai",
  "readinessScore": 68,
  "estimatedWeeks": 12,
  "stages": [
    {
      "stageNumber": 1,
      "title": "Containerization & Environment Standardization",
      "durationWeeks": 3,
      "focusArea": "Docker Fundamentals",
      "learningObjectives": [
        "Master Dockerfile instructions, layer caching, and multi-stage builds",
        "Compose multi-service environments with PostgreSQL and backend workers",
        "Manage Docker volumes, bridge networks, and environment configs"
      ],
      "recommendedProject": {
        "title": "Containerized FastAPI + PostgreSQL Service",
        "description": "Construct a REST service with healthchecks, database migrations, and isolated compose networks.",
        "deliverables": [
          "Dockerfile with non-root user and minimal alpine base",
          "docker-compose.yml orchestrating API and PostgreSQL with volume persistence",
          "Automated health check verification script"
        ],
        "skillsApplied": ["Docker", "Docker Compose", "Python", "SQL"]
      },
      "milestoneProof": "Working GitHub repository with verified docker compose up passing tests."
    },
    {
      "stageNumber": 2,
      "title": "Production API Architecture & ORM Optimization",
      "durationWeeks": 4,
      "focusArea": "RESTful Microservices & SQL Indexing",
      "learningObjectives": [
        "Design schema migrations with Alembic",
        "Implement connection pooling and SQL query profiling",
        "Enforce token-based authentication and role authorization"
      ],
      "recommendedProject": {
        "title": "High-Throughput Order Management Engine",
        "description": "A backend service demonstrating ACID transactions and index-backed query execution.",
        "deliverables": [
          "Documented Swagger OpenAPI 3.0 specification",
          "SQL explain analyze query performance report"
        ],
        "skillsApplied": ["Python", "SQL", "FastAPI", "Database Indexing"]
      },
      "milestoneProof": "Benchmarked endpoint responding under 45ms for 500 concurrent requests."
    },
    {
      "stageNumber": 3,
      "title": "Cloud Deployment & CI/CD Pipeline",
      "durationWeeks": 5,
      "focusArea": "AWS Cloud Foundations & Automated Testing",
      "learningObjectives": [
        "Deploy container images to AWS ECS or Render",
        "Configure automated linting, type-checking, and pytest in GitHub Actions",
        "Establish structured JSON logging and health monitoring"
      ],
      "recommendedProject": {
        "title": "Live Deployed Cloud Web API with CI/CD",
        "description": "Complete production pipeline deploying code automatically upon git push.",
        "deliverables": [
          "GitHub Actions workflow YAML running linters and unit tests",
          "Public live API URL with uptime status monitor"
        ],
        "skillsApplied": ["AWS", "GitHub Actions", "Docker", "CI/CD"]
      },
      "milestoneProof": "Public healthcheck endpoint and passing GitHub Actions green checkmark."
    }
  ],
  "meta": {
    "model": "meta/llama-3.1-70b-instruct",
    "generatedAt": "2026-10-08T18:30:00.000Z",
    "isFallback": false,
    "processingTimeMs": 1420
  }
}
```

---

### 2.2 Resume Structuring & Generation

#### TypeScript Definitions
```typescript
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

/**
 * Input request containing ONLY raw user-verified details.
 */
export interface ResumeGenerationRequest {
  contact: ContactInfo;
  targetRole: string;
  education: Array<{
    institution: string;
    degree: string;
    year: number;
    gpaOrGrade?: string;
  }>;
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

/**
 * Output payload containing formatted, ATS-compliant resume sections.
 */
export interface ResumeGenerationResponse {
  resumeId: string;
  structuredResume: {
    contact: ContactInfo;
    professionalSummary: string;
    technicalSkills: Record<string, string[]>;
    experience: StructuredResumeExperience[];
    projects: StructuredResumeProject[];
    education: Array<{
      institution: string;
      degree: string;
      year: number;
      gpaOrGrade?: string;
    }>;
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
```

#### JSON Request Example (`POST /api/v1/ai/resume/structure`)
```json
{
  "contact": {
    "fullName": "Gugan Murugan",
    "email": "candidate@example.com",
    "cityState": "Chennai, Tamil Nadu",
    "githubUrl": "https://github.com/example",
    "linkedinUrl": "https://linkedin.com/in/example"
  },
  "targetRole": "Backend Developer",
  "education": [
    {
      "institution": "Anna University Affiliated College",
      "degree": "B.Tech in Computer Science and Engineering",
      "year": 2026,
      "gpaOrGrade": "8.4 CGPA"
    }
  ],
  "verifiedSkills": ["Python", "SQL", "Docker", "Git", "FastAPI"],
  "unstructuredExperience": [
    {
      "rawJobOrRoleTitle": "Backend Engineering Intern",
      "organization": "Regional Tech Studio",
      "datesOrPeriod": "May 2025 - July 2025",
      "rawNotes": "Helped write python scripts to parse customer CSV records. Connected them to postgres db. Reduced database query wait time by adding indexes. Wrote unit tests using pytest."
    }
  ],
  "unstructuredProjects": [
    {
      "projectName": "Local Logistics Tracker",
      "toolsUsedRaw": ["Python", "SQL", "Docker"],
      "rawNotes": "Built a system to track transit parcels across Tamil Nadu distribution hubs. Wrapped everything in docker compose."
    }
  ]
}
```

#### JSON Response Example
```json
{
  "resumeId": "res_struct_77192",
  "structuredResume": {
    "contact": {
      "fullName": "Gugan Murugan",
      "email": "candidate@example.com",
      "cityState": "Chennai, Tamil Nadu",
      "githubUrl": "https://github.com/example",
      "linkedinUrl": "https://linkedin.com/in/example"
    },
    "professionalSummary": "Results-driven aspiring Backend Developer specializing in Python, SQL, and Docker containerization. Experienced in designing relational databases, building automated ETL scripts, and deploying reproducible container environments for regional tech applications.",
    "technicalSkills": {
      "Languages": ["Python", "SQL"],
      "Frameworks & Libraries": ["FastAPI", "pytest"],
      "DevOps & Tooling": ["Docker", "Git"],
      "Databases": ["PostgreSQL"]
    },
    "experience": [
      {
        "roleTitle": "Backend Engineering Intern",
        "organization": "Regional Tech Studio",
        "periodFormatted": "May 2025 – July 2025",
        "bulletPoints": [
          "Authored Python ingestion pipelines to parse and validate client CSV data into PostgreSQL databases.",
          "Profiled relational database queries and implemented indexing strategies to reduce query execution latency.",
          "Constructed comprehensive automated test suites using pytest to guarantee data parsing reliability."
        ],
        "verifiedFactsOnly": true
      }
    ],
    "projects": [
      {
        "title": "Local Logistics Tracker",
        "technologies": ["Python", "PostgreSQL", "Docker", "Docker Compose"],
        "bulletPoints": [
          "Developed parcel tracking architecture modeling transit events across regional Tamil Nadu distribution centers.",
          "Architected multi-container development environment utilizing Docker Compose for seamless database and service orchestration."
        ]
      }
    ],
    "education": [
      {
        "institution": "Anna University Affiliated College",
        "degree": "B.Tech in Computer Science and Engineering",
        "year": 2026,
        "gpaOrGrade": "8.4 CGPA"
      }
    ]
  },
  "auditRecord": {
    "zeroHallucinationGuaranteed": true,
    "unverifiedFactsFilteredCount": 0,
    "skillsStrictlyMatched": true
  },
  "meta": {
    "model": "meta/llama-3.1-70b-instruct",
    "generatedAt": "2026-10-08T18:31:00.000Z",
    "isFallback": false
  }
}
```

---

### 2.3 Skill-Gap Explanations

#### TypeScript Definitions
```typescript
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
```

#### JSON Request Example (`POST /api/v1/ai/skill-gap/explain`)
```json
{
  "targetRole": "Backend Developer",
  "targetRegion": "Chennai",
  "currentSkills": ["Python", "SQL"],
  "identifiedGapSkill": "Docker",
  "experienceLevel": "fresher"
}
```

#### JSON Response Example
```json
{
  "skill": "Docker",
  "targetRole": "Backend Developer",
  "region": "Chennai",
  "priority": "HIGH",
  "marketRelevanceSummary": "In the Chennai enterprise SaaS and product-engineering corridor (OMR, Guindy, DLF Cybercity), teams mandate containerized microservice architectures from day one. Candidates who can ship code inside reproducible Docker containers stand out immediately from freshers who only run code locally.",
  "whyRegionalEmployersDemandThis": [
    "Eliminates the 'works on my machine' defect across distributed engineering teams.",
    "Required for deploying and testing cloud microservices in AWS, Azure, and private Kubernetes clusters.",
    "Demonstrates practical engineering hygiene and familiarity with modern production deployment workflows."
  ],
  "actionPlan": {
    "learnTopic": "Dockerfile structure, multi-stage builds, and docker-compose networking.",
    "buildProjectSnippet": "Package your Python + PostgreSQL API into a 2-service compose stack with healthchecks.",
    "proveArtifact": "Provide a public GitHub repo with a verified Dockerfile and recorded terminal execution log."
  },
  "meta": {
    "model": "meta/llama-3.1-70b-instruct",
    "generatedAt": "2026-10-08T18:31:30.000Z",
    "isFallback": false
  }
}
```

---

## 3. YouTube Data API Contracts

### 3.1 Learning Resources Query & Response

#### TypeScript Definitions
```typescript
/**
 * Query parameters for fetching learning resources
 */
export interface LearningResourceQuery {
  /** Skill name or technical keyword (e.g., "Docker", "FastAPI") */
  skill: string;
  /** Role context to sharpen ranking (e.g., "Backend Developer") */
  targetRole?: string;
  /** Experience tier to filter introductory vs deep-dive material */
  level?: "beginner" | "intermediate" | "advanced";
  /** Maximum number of normalized items to return (default: 6, max: 20) */
  maxResults?: number;
  /** Regional or language preference (e.g., "en", "ta", "hi") */
  language?: string;
}

/**
 * Normalized learning resource item
 */
export interface LearningResource {
  /** Internal unique identifier */
  id: string;
  /** Standard YouTube 11-character video ID */
  videoId: string;
  /** Video title */
  title: string;
  /** Channel or publisher name */
  channelTitle: string;
  /** Summary description */
  description: string;
  /** Duration in seconds */
  durationSeconds: number;
  /** Human-readable duration (e.g., "42m 15s") */
  durationFormatted: string;
  /** Canonical YouTube watch URL */
  videoUrl: string;
  /** High-resolution thumbnail URL */
  thumbnailUrl: string;
  /** ISO 8601 publication date */
  publishedAt: string;
  /** View count metric */
  viewCount: number;
  /** Like count metric */
  likeCount: number;
  /** Computed relevance score (0.00 to 1.00) */
  relevanceScore: number;
  /** Associated skill tag */
  skillTag: string;
  /** Difficulty categorization */
  level: "beginner" | "intermediate" | "advanced";
}

/**
 * Response payload returned to the frontend
 */
export interface LearningResourceResponse {
  query: LearningResourceQuery;
  totalResults: number;
  resources: LearningResource[];
  source: "youtube_live" | "curated_fallback" | "cache";
  cachedAt?: string;
  meta: {
    quotaUnitsUsed: number;
    processingTimeMs: number;
  };
}
```

#### JSON Request Example (`GET /api/v1/resources/learn?skill=Docker&targetRole=Backend+Developer&level=beginner&maxResults=2`)
```json
{
  "skill": "Docker",
  "targetRole": "Backend Developer",
  "level": "beginner",
  "maxResults": 2,
  "language": "en"
}
```

#### JSON Response Example
```json
{
  "query": {
    "skill": "Docker",
    "targetRole": "Backend Developer",
    "level": "beginner",
    "maxResults": 2,
    "language": "en"
  },
  "totalResults": 2,
  "resources": [
    {
      "id": "res_yt_dckr_01",
      "videoId": "fqMOX6JJhGo",
      "title": "Docker Tutorial for Beginners [Full Course in 3 Hours]",
      "channelTitle": "TechWorld with Nana",
      "description": "Comprehensive Docker tutorial for beginners covering containers, images, Dockerfile, Docker Compose, volumes, and networks.",
      "durationSeconds": 10834,
      "durationFormatted": "3h 0m 34s",
      "videoUrl": "https://www.youtube.com/watch?v=fqMOX6JJhGo",
      "thumbnailUrl": "https://i.ytimg.com/vi/fqMOX6JJhGo/hqdefault.jpg",
      "publishedAt": "2024-03-15T12:00:00Z",
      "viewCount": 2480000,
      "likeCount": 68000,
      "relevanceScore": 0.98,
      "skillTag": "Docker",
      "level": "beginner"
    },
    {
      "id": "res_yt_dckr_02",
      "videoId": "pTFZFxd4hOI",
      "title": "Docker in 100 Seconds",
      "channelTitle": "Fireship",
      "description": "Quick, high-level architecture overview of Docker containers, images, and registries.",
      "durationSeconds": 145,
      "durationFormatted": "2m 25s",
      "videoUrl": "https://www.youtube.com/watch?v=pTFZFxd4hOI",
      "thumbnailUrl": "https://i.ytimg.com/vi/pTFZFxd4hOI/hqdefault.jpg",
      "publishedAt": "2023-08-10T14:30:00Z",
      "viewCount": 1820000,
      "likeCount": 82000,
      "relevanceScore": 0.91,
      "skillTag": "Docker",
      "level": "beginner"
    }
  ],
  "source": "youtube_live",
  "cachedAt": "2026-10-08T18:32:00.000Z",
  "meta": {
    "quotaUnitsUsed": 101,
    "processingTimeMs": 310
  }
}
```

---

## 4. Contract Conformance Guidelines for Future Backend

When implementing backend handlers:
1. **Schema Validation:** Use `zod` to validate all incoming HTTP bodies and outgoing LLM JSON objects.
2. **Strict Nullability:** Omit fields rather than returning undefined; represent missing optional values with null or empty arrays.
3. **Immutability of Audit Metadata:** Always populate `meta.isFallback` accurately so frontend screens can display appropriate indicators to the user.
