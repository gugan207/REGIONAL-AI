# REGIONAL - AI — API Integration Plan (NVIDIA + YouTube)

**Document Version:** 1.0.0  
**Status:** Architecture & Preparation Specification (Parallel Worktree)  
**Target Services:** NVIDIA NIM / Foundation LLM APIs, YouTube Data API v3  
**Audience:** Backend Engineers, AI/ML Engineers, Frontend Integration Developers  

---

## 1. Executive Summary & Objective

`REGIONAL - AI` provides regionalized career intelligence, skill gap analysis, personalized roadmaps, and resume structuring for candidates transitioning into tech roles. 

To power dynamic, AI-assisted career pathways without compromising application stability, security, or factual integrity, this integration plan specifies the architectural contracts, data flows, security boundaries, and fallback strategies for two external service ecosystems:

1. **NVIDIA NIM / LLM APIs:**
   * **Milestone Roadmap Generation:** Multi-stage learning and project schedules customized to the candidate's regional tech hub (e.g., Chennai, Bengaluru, Hyderabad).
   * **Resume Structuring & Reformatting:** Structuring user-supplied experience into ATS-friendly formats without fabricating details.
   * **Skill-Gap Explanations:** Concrete, context-specific explanations of why target regional employers prioritize specific missing skills.
   * **Career Intelligence:** Contextual market observations aligned to candidate background and regional tier.

2. **YouTube Data API v3:**
   * **Learning Resources:** High-yield tutorials, crash courses, and project walkthroughs matching identified skill gaps.
   * **Roadmap Milestone Learning Assets:** Top-ranked instructional videos tied to each roadmap phase.
   * **Ranked & Deduplicated Content:** Algorithmic curation prioritizing pedagogical clarity, optimal duration, and community reputation.

---

## 2. System Architecture & Topology

Neither the NVIDIA API key nor the YouTube API key must ever reach client-side React bundles. All external communication is mediated by a dedicated backend service.

```
+-----------------------------------------------------------------------------------------+
|                                    CLIENT TIER (React SPA)                              |
|                                                                                         |
|  - RegionalSignalScreen   - SkillProfileScreen   - Dashboard / Roadmap   - ResumeView   |
+-----------------------------------------------------------------------------------------+
                                           │
                        HTTPS / JSON (REST)│ Cookie / Bearer Token Auth
                                           ▼
+-----------------------------------------------------------------------------------------+
|                                  BACKEND API GATEWAY                                    |
|                                                                                         |
|  - Request Validation (Zod/JSON Schema)          - Rate Limiting & Tiered Throttling     |
|  - Cache Layer (Redis / Memory)                  - Circuit Breakers & Timeout Handlers   |
|  - Hallucination Auditing & Prompt Guards        - Deterministic Fallback Dispatcher     |
+-----------------------------------+---------------------------------+-------------------+
                                    │                                 │
                   NVIDIA NIM / LLM │ HTTPS                           │ HTTPS (v3)
                   Payload Contract │                                 │ Quota-Managed
                                    ▼                                 ▼
         +------------------------------------+    +------------------------------------+
         |       NVIDIA NIM / LLM API         |    |        YouTube Data API v3         |
         |  (integrate.api.nvidia.com)        |    |      (googleapis.com/youtube/v3)   |
         |                                    |    |                                    |
         | - llama-3.1-70b-instruct           |    | - Search Endpoint (q, type=video)  |
         | - Structured Guided JSON Decoding  |    | - Video Details (statistics, time) |
         | - Zero-Hallucination Prompting     |    | - Normalized Ranking Pipeline      |
         +------------------------------------+    +------------------------------------+
```

---

## 3. NVIDIA Integration Specification

### 3.1 Architectural Pipeline

```text
Frontend (React Client)
   │  POST /api/v1/ai/roadmap
   ▼
Backend API Gateway
   │  1. Validate Candidate Profile Schema (Zod)
   │  2. Build Injection-Safe System & User Prompts
   │  3. Attach Strict JSON Schema (Guided Decoding)
   ▼
NVIDIA NIM / LLM Endpoint (e.g. meta/llama-3.1-70b-instruct)
   │  Raw Model Generation via HTTPS POST /v1/chat/completions
   ▼
Backend Response Handler
   │  1. Parse & Validate Output Against Schema
   │  2. Verify Hallucination-Free Fact Invariants
   │  3. Fallback Trigger on Timeout (15s) or 5xx/429
   ▼
Frontend (React Client)
   Receives RoadmapGenerationResponse (Live or Fallback)
```

### 3.2 Environment Variables & Service Configuration

The backend consumes these variables exclusively from the local server environment:

| Variable Name | Required | Default / Recommended Value | Description |
| :--- | :--- | :--- | :--- |
| `NVIDIA_API_KEY` | Yes (in prod) | *None (Secret)* | Secret API token issued via NVIDIA API Catalog / NGC. |
| `NVIDIA_API_BASE_URL` | No | `https://integrate.api.nvidia.com/v1` | Base URL for NVIDIA OpenAI-compatible chat completions. |
| `NVIDIA_MODEL` | No | `meta/llama-3.1-70b-instruct` | Foundation model optimized for instruction adherence and JSON output. |
| `NVIDIA_REQUEST_TIMEOUT_MS`| No | `25000` | Strict HTTP timeout (milliseconds) before activating fallback. |
| `NVIDIA_MAX_RETRIES` | No | `2` | Max automatic retry attempts for transient 503/504 errors. |

### 3.3 Backend Responsibilities
1. **Secret Custody:** Keep `NVIDIA_API_KEY` strictly inside the Node.js/Express/FastAPI process.
2. **Prompt Engineering & Templating:** Inject verified candidate skills, regional demand signals, and career stage parameters into structured prompts.
3. **Structured Outputs:** Leverage model-level JSON mode (`response_format: { type: "json_object" }`) or Guided Decoding to guarantee schema compliance.
4. **Fact Invariant Checking:** Automatically verify that no unlisted companies, degrees, or certifications were injected into resume outputs.
5. **Circuit Breaking:** Track error rates. If 3 consecutive requests fail or time out, open the circuit and immediately return deterministic fallback data for 60 seconds.

### 3.4 Prompt Safety & Absolute Hallucination Prevention

> [!CAUTION]
> **CRITICAL HALLUCINATION POLICY**  
> Under NO circumstances may the AI engine fabricate candidate history. The LLM must NEVER invent:
> * Achievements, metrics, or quantitative results not stated by the user
> * Degrees, universities, or academic qualifications
> * Certifications or licenses
> * Employers, job titles, or dates of employment
> * Projects, repos, or portfolios
> * Unverified technical skills or proficiencies
>
> It may **ONLY** reorganize, rewrite for clarity/conciseness, grammatically polish, or identify missing skills relative to standard market baselines.

#### Anti-Hallucination System Prompt Architecture
```text
SYSTEM PROMPT:
You are the Career Intelligence Engine for REGIONAL - AI. 
Your role is to analyze candidate data and generate structured career roadmaps, skill gap breakdowns, and resume reformatting.

STRICT CONSTRAINTS:
1. TRUTHFULNESS INVARIANT: You are strictly forbidden from inventing, hallucinating, or extrapolating candidate history.
   - Do NOT add jobs, internships, freelance gigs, or employers not explicitly provided.
   - Do NOT add certifications, degrees, academic institutions, or test scores.
   - Do NOT invent metrics, percentage improvements, revenue figures, or team sizes.
   - Do NOT claim proficiency in any skill unless listed in the candidate's profile.
2. SCOPE OF REWRITE: When structuring resumes, you may ONLY rephrase existing bullet points to improve clarity, grammar, and ATS readability. If information is missing, leave the field null or ask a clarifying question.
3. REGIONAL RELEVANCE: Tailor roadmap milestones to the selected region (e.g., Chennai, Bengaluru) by prioritizing skills commonly required by software companies in that market tier, but do not invent company partnerships.
4. FORMAT: Return ONLY valid JSON matching the provided schema. Do not include markdown codeblocks or conversational filler.
```

### 3.5 Rate-Limit & Error Handling
* **HTTP 429 (Rate Limit):** Inspect `Retry-After` header. If the wait time is > 2 seconds, do not stall the client request; immediately dispatch deterministic fallback data with header `X-Regional-AI-Source: fallback-rate-limited`.
* **HTTP 5xx (NVIDIA Service Interruption):** Execute exponential backoff with full jitter for at most 2 retries (wait 500ms, then 1500ms). If failures persist, cleanly return fallback data.
* **HTTP 400 (Bad Request / Token Overflow):** Log schema validation mismatch without logging candidate PII, then serve fallback.

---

## 4. YouTube Integration Specification

### 4.1 Architectural Pipeline

```text
Frontend (React Client)
   │  GET /api/v1/resources/learn?skill=Docker&role=Backend+Developer
   ▼
Backend API Gateway
   │  1. Check Redis / In-Memory Cache (TTL: 24h - 7d)
   │     [Hit] -> Return Cached Normalized Resources immediately
   │     [Miss] -> Continue to YouTube Service
   │  2. Check Daily YouTube Quota Budget Counter
   ▼
YouTube Data API v3 (REST)
   │  1. GET /search (part=snippet, type=video, q="Docker tutorial for backend developers", maxResults=15)
   │  2. GET /videos (part=contentDetails,statistics, id=csv_ids) [Batch Enrichment]
   ▼
Backend Normalization & Ranking Engine
   │  1. Deduplicate by Video ID & Channel
   │  2. Filter Short/Long Outliers (< 5 mins or > 4 hours)
   │  3. Score Relevance: (relevanceScore * 0.4) + (viewCountRatio * 0.3) + (qualityBadge * 0.3)
   │  4. Normalize into LearningResource schema
   │  5. Store in Cache
   ▼
Frontend (React Client)
   Receives LearningResourceResponse (Ranked Videos)
```

### 4.2 Environment Variables & Service Configuration

| Variable Name | Required | Default / Recommended Value | Description |
| :--- | :--- | :--- | :--- |
| `YOUTUBE_API_KEY` | Yes (in prod) | *None (Secret)* | Google Cloud API key with YouTube Data API v3 enabled. |
| `YOUTUBE_API_BASE_URL` | No | `https://www.googleapis.com/youtube/v3` | Base URL for Google YouTube API. |
| `YOUTUBE_CACHE_TTL_SECONDS`| No | `86400` (24 hours) | Cache expiration time for query results to preserve quota. |
| `YOUTUBE_MAX_RESULTS_PER_QUERY`| No | `10` | Number of ranked results returned to the client. |
| `YOUTUBE_DAILY_QUOTA_BUDGET`| No | `9500` | Safety threshold under the 10,000 units/day standard quota. |

### 4.3 YouTube Quota Conservation Architecture
The YouTube Data API v3 operates on a credit quota system:
* Standard free tier: **10,000 quota units / day**.
* `search.list` call cost: **100 units** per call.
* `videos.list` (detail lookup) cost: **1 unit** per call.
* A single uncached search consumes 100 units, meaning a naive system will exhaust daily quota after just **100 user queries**.

**Mandatory Mitigations:**
1. **Aggressive Query Normalization & Caching:**
   * Keys are normalized (e.g. `youtube:skill:docker:backend-developer`).
   * Results are stored in an in-memory/Redis cache with a 72-hour TTL.
2. **Pre-warming Common Skills:**
   * Core skills identified in the `SkillProfileScreen` (e.g., Docker, Python, SQL, React, Node.js, AWS, Git) are pre-fetched during scheduled low-traffic hours (e.g., 03:00 UTC).
3. **Curated Fallback Catalog:**
   * When quota exceeds `YOUTUBE_DAILY_QUOTA_BUDGET` or YouTube returns HTTP 403 `quotaExceeded`, the backend immediately switches to an embedded offline catalog of hand-verified educational resources.

### 4.4 Resource Normalization, Deduplication & Ranking Algorithm

#### Filtering Pipeline:
1. **Duration Filter:** Reject YouTube Shorts (`duration < 60s`) and multi-day live streams (`duration > 14400s`). Ideal range: 10 to 90 minutes.
2. **Channel Diversity:** No single channel may occupy more than 2 slots in a 6-resource recommendations set.
3. **Relevance Heuristic Score ($S$):**
   $$S = 0.40 \cdot \text{QueryMatch} + 0.25 \cdot \log_{10}(\text{Views}) + 0.20 \cdot \text{LikeRatio} + 0.15 \cdot \text{RecencyDecay}$$
   Where:
   * $\text{QueryMatch}$: Exact match of target skill and beginner/roadmap terminology in video title and description.
   * $\text{RecencyDecay}$: Penalizes technical tutorials older than 36 months for rapidly evolving frameworks.

---

## 5. Prototype Demo & Fallback Strategy

To ensure zero downtime during testing, evaluation, portfolio reviews, or offline development, the prototype features a **Two-Tier Deterministic Fallback Mechanism**.

```
                           Incoming Request
                                   │
                                   ▼
                       API Key Configured & Healthy?
                                ╱       ╲
                          [Yes]╱         ╲[No / Error / Quota]
                              ▼           ▼
                      Execute Live API    Execute Deterministic Fallback
                              │           │
                              │           ▼
                              │   Load Curated Static Knowledge Matrix:
                              │   - Deterministic 3-Stage Roadmap
                              │   - Curated High-Yield Video Library
                              │   - Grounded Gap Explanations
                              ▼           ▼
                         Attach Header:   Attach Header:
                         source: "live"   source: "fallback"
                                ╲        ╱
                                 ▼      ▼
                           Unified JSON Response
```

### 5.1 Deterministic Fallback Matrices

#### 1. NVIDIA Fallback (Roadmap & Skill Gaps)
When NVIDIA NIM is unavailable, the backend matches the candidate's `targetRole` and `selectedSkills` against pre-compiled regional role profiles:
* **Backend Developer (Chennai/Bengaluru):**
  * Top Gap: `Docker`
  * Stage 1: Container Fundamentals & Dockerfile Architecture (Weeks 1-3)
  * Stage 2: Database Optimization & Microservices REST APIs (Weeks 4-7)
  * Stage 3: Cloud Deployment & CI/CD Pipeline (Weeks 8-12)
* **Frontend Developer:**
  * Top Gap: `TypeScript` & `State Management`
  * Deterministic milestones mapped to production React standards.
* **Data Analyst:**
  * Top Gap: `Power BI / Tableau` & `Advanced SQL Window Functions`

#### 2. YouTube Fallback (Curated Video Assets)
For each top skill gap, the system embeds 3-5 verified educational resources with permanent URLs, working thumbnail placeholders, and validated metadata:
* **Docker:** Official Docker 1-Hour Crash Course, freeCodeCamp Docker for Beginners.
* **SQL:** Khan Academy / freeCodeCamp Relational Database Design.
* **Python:** Core Backend Engineering with Python / FastAPI by industry instructors.

---

## 6. Security Requirements & Hardening

1. **Server-Side Key Isolation:**
   * Secret keys (`NVIDIA_API_KEY`, `YOUTUBE_API_KEY`) must exist solely in server-side runtime environments (`process.env`).
   * No `VITE_` or `REACT_APP_` prefixes may ever be used for secrets, preventing Vite from baking them into client JavaScript bundles.
2. **Git Hygiene & Zero-Leakage Guarantee:**
   * `.env` and `.env.local` are explicitly added to `.gitignore`.
   * Only `.env.example` containing empty placeholder keys is tracked in git.
3. **Telemetry & Log Redaction:**
   * Loggers (e.g., Pino, Winston) must filter authorization headers, API keys, and candidate personal identifiers (email, phone, address).
4. **Output Sanitization & XSS Defense:**
   * LLM responses must be parsed as raw JSON, validated through schema guards, and rendered in React using standard JSX text nodes to prevent DOM injection / HTML injection.
5. **Strict Input Validation:**
   * Input strings are checked for maximum length (e.g., target role $\le$ 100 characters, skill list $\le$ 50 items) to prevent token exhaustion and prompt injection denial-of-service.

---

## 7. Proposed Backend Directory Structure

When the backend implementation phase commences, the server workspace should follow this modular layout:

```text
server/
├── index.ts                     # Express/Node HTTP server entrypoint
├── config/
│   ├── env.ts                   # Validated environment loader (envalid/zod)
│   └── constants.ts             # Quota caps, timeouts, default models
├── routes/
│   ├── ai.routes.ts             # Endpoints for roadmap, resume, skill-gap
│   └── resources.routes.ts      # Endpoints for YouTube learning assets
├── services/
│   ├── nvidia.service.ts        # NVIDIA NIM API client, prompt assembler
│   ├── youtube.service.ts       # YouTube v3 API client, batch fetcher
│   ├── ranking.service.ts       # Video deduplication, duration & quality ranker
│   └── fallback.service.ts      # Deterministic demo matrices & static catalog
├── types/
│   └── api.types.ts             # TypeScript interfaces (matching API_TYPES.md)
└── utils/
    ├── validation.ts            # Zod input/output validation schemas
    ├── sanitization.ts          # Prompt injection defenses & text cleaner
    └── cache.ts                 # In-memory / Redis cache manager
```

---

## 8. Summary Checklist for Integration Phase

- [ ] Backend initialized using proposed structure without modifying `src/`
- [ ] `.env` loaded securely on the backend server only
- [ ] NVIDIA API client configured with Guided JSON decoding
- [ ] Anti-hallucination prompt constraints verified against test candidate inputs
- [ ] YouTube API cache and daily quota limiter verified
- [ ] Fallback data tested with disconnected network to ensure 100% prototype availability
