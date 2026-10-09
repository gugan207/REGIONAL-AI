# REGIONAL - AI

**Regional Career Intelligence & ATS Resume Engine for Tier-2/Tier-3 Engineering Candidates**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-3.8_Flash-8E75B2?logo=google&logoColor=white)](https://ai.google.dev/)
[![YouTube API](https://img.shields.io/badge/YouTube_API-v3-FF0000?logo=youtube&logoColor=white)](https://developers.google.com/youtube/v3)
[![Supabase](https://img.shields.io/badge/Supabase-Ready-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)

---

## Overview

**REGIONAL - AI** bridges the divide between academic curriculum and regional tech industry hiring demands across emerging tech corridors (e.g., Chennai, Coimbatore, Bengaluru, Hyderabad). 

The platform offers an end-to-end guided workflow: candidates analyze real-world hiring trends, identify high-priority skill gaps, follow personalized learning roadmaps, and generate executive-tier, zero-hallucination, ATS-optimized technical resumes verified with hands-on project proof.

## Key Features

- **Candidate Profile & Target Role:** Tailored onboarding capturing student tier, graduation year, target region, and existing technical stack.
- **Regional Market Signals:** Real-time hiring demand indicators, top compensation skills, and demand-velocity scoring across tech hubs.
- **Skill Gap Diagnosis:** Automated differential analysis comparing student proficiencies against live regional employer expectations.
- **Interactive Learning Roadmap:** Stage-by-stage engineering milestones backed by live **YouTube Data API v3** curated video tutorials.
- **Elite ATS Resume Engine:** Powered by **Google Gemini** with strict zero-hallucination constraints, action-oriented bullet points (Google X-Y-Z formula), 3-tier skill categorization, and instant vector-crisp PDF export.
- **Skill Proof & Verification:** Project deliverables, README requirements, and repository checklist verification ensuring candidate authenticity.
- **100% Responsive Design:** Preserves exact pixel fidelity to the reference desktop design (1440×900) while smoothly adapting across all mobile, tablet, and laptop viewports (tested from 320px to 1920px with zero layout overflow).
- **Graceful Deterministic Fallbacks:** Integrated offline engine guarantees full workflow continuity even if external APIs or network connections are unavailable.

## Technology Stack

| Technology | Purpose |
|---|---|
| React 18 | Frontend UI |
| TypeScript | Type-safe frontend and backend code |
| Vite 5 | Frontend development and production build |
| Node.js + Express 4 | Backend API |
| Google Gemini via @google/genai | AI-assisted career workflows |
| YouTube Data API v3 | Learning-resource search |
| Figma | UI/UX design workflow |
| GitHub | Source control and collaboration |

**Supabase note:** Confirm that the Supabase client, migrations, authentication, and RLS policies are present in the branch you deploy before describing Supabase-backed authentication or persistence as live. They are not listed in the current committed frontend package manifest.

## Architecture

The frontend uses React and TypeScript. It sends API requests to the Express backend. The backend connects to Google Gemini for AI-assisted career workflows and the YouTube Data API for learning-resource search. During local development, Vite proxies /api requests to http://localhost:5000.

## Application screens

1. Login
2. Onboarding
3. Target Role
4. Skill Profile
5. Regional Signal
6. Dashboard
7. Skill Intelligence
8. Skill Gap
9. Roadmap
10. Resume Builder
11. Skill Proof
12. System & QA

The implementation should remain aligned with the existing Figma design.

## Repository structure

- public/ — public assets and logo
- src/components/ — UI screens and components
- src/services/apiClient.ts — frontend API client and fallback data
- src/App.tsx — application navigation and state
- server/src/providers/ — Gemini and YouTube provider adapters
- server/src/routes/ — health, AI, and YouTube routes
- server/src/services/ — backend services
- server/src/utils/ — validation and response helpers
- server/src/config.ts — backend environment configuration
- docs/ — integration documentation and project reports
- .env.example — backend environment template
- package.json — frontend scripts and dependencies
- vite.config.ts — Vite configuration and API proxy

## Requirements

- Node.js LTS and npm
- Google Gemini API key for live AI responses
- Google Cloud API key with YouTube Data API v3 enabled for live video search

Without valid provider credentials, some features may use fallback/demo responses instead of live provider data.

## Local setup

### 1. Clone and install frontend dependencies

    git clone https://github.com/gugan207/REGIONAL-AI.git
    cd REGIONAL-AI
    npm install

### 2. Configure backend environment

In PowerShell, create a private backend environment file:

    Copy-Item server/.env.example server/.env

Edit server/.env and set your real provider credentials. Do not commit this file.

### 3. Install and start the backend

From the repository root:

    cd server
    npm install
    npm run build
    npm start

The backend defaults to port 5000. Keep this terminal running.

### 4. Start the frontend

In a second terminal, from the repository root:

    npm install
    npm run dev

Open http://localhost:3000.

### 5. Check backend health

Visit http://localhost:5000/api/health. This reports backend and provider configuration status; it does not guarantee every provider request will succeed.

## Environment variables

The root and server environment templates document the current backend configuration.

| Variable | Purpose | Default/template |
|---|---|---|
| GEMINI_API_KEY | Gemini API key; server-side only | Empty |
| GEMINI_MODEL | Gemini model identifier | gemini-3.8-flash |
| GEMINI_REQUEST_TIMEOUT_MS | AI request timeout | 30000 |
| YOUTUBE_API_KEY | YouTube Data API key; server-side only | Empty |
| YOUTUBE_API_BASE_URL | YouTube API endpoint | https://www.googleapis.com/youtube/v3 |
| YOUTUBE_CACHE_TTL_SECONDS | Search cache duration | 86400 |
| YOUTUBE_MAX_RESULTS_PER_QUERY | Maximum search results | 10 |
| PORT | Backend port | 5000 |
| NODE_ENV | Runtime environment | development |
| CORS_ORIGIN | Allowed frontend origin(s) | http://localhost:3000 |
| FORCE_DEMO_FALLBACK | Force fallback responses | false |

Keep real credentials in ignored local environment files or your deployment provider's secret manager. Never place backend provider keys in frontend code or commit them.

## API reference

| Method | Endpoint | Purpose |
|---|---|---|
| GET | /api/health | Backend health and sanitized provider status |
| POST | /api/ai/roadmap | Generate a structured career roadmap |
| POST | /api/ai/resume | Structure supplied resume information |
| POST | /api/ai/skill-gap | Explain a target skill gap |
| GET | /api/youtube/search?skill=... | Search learning resources |
| POST | /api/nvidia/roadmap | Legacy route alias to the Gemini-backed AI router |
| POST | /api/nvidia/resume | Legacy route alias to the Gemini-backed AI router |
| POST | /api/nvidia/skill-gap | Legacy route alias to the Gemini-backed AI router |

The legacy /api/nvidia/* URLs do not indicate that NVIDIA is an active AI provider. See server/src/routes/ and server/src/utils/validation.ts for request details.

## Build and testing

Frontend production build, from the repository root:

    npm run build

Backend build, from the repository root:

    cd server
    npm run build

The current package manifests do not define a root test script. Refer to the project reports for additional test commands, and only report checks as passed if they have actually been run.

## Security

- Keep Gemini and YouTube credentials on the backend.
- Do not commit .env, .env.local, server/.env, tokens, or private keys.
- Validate API input and configure CORS for the correct deployment origin.
- If Supabase is enabled, use Row Level Security on exposed private tables and test cross-user access isolation.
- Store private resume files in private storage with user-scoped policies.
- Rotate credentials if they are exposed accidentally.

## Limitations and next steps

- Live provider responses require valid credentials, supported provider configuration, and available quotas.
- Fallback content is not verified live market data.
- Confirm deployed Gemini and YouTube calls, video playback, resume export/download, and responsive behavior in a browser.
- Verify Supabase integration on the deployed branch before advertising real authentication or persistent user records.

## Contributing

1. Create a feature branch.
2. Keep changes focused and preserve the established Figma UI.
3. Never commit credentials.
4. Run applicable frontend and backend build checks.
5. Include actual validation results with pull requests.

## License

Distributed under the MIT License. See LICENSE.
