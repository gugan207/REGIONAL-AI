# REGIONAL - AI — Hardened Backend API Foundation

Lightweight Node.js + TypeScript API foundation for **REGIONAL - AI**, providing a production-ready provider adapter architecture for future **NVIDIA NIM / LLM** and **YouTube Data API v3** integrations.

---

## Architectural Principles

1. **Strict Secret Isolation:** Private keys (`NVIDIA_API_KEY`, `YOUTUBE_API_KEY`) stay server-side and never enter client bundles or logs.
2. **Provider Adapter Layer:** The service layer abstracts provider calls (`NvidiaProvider`, `YoutubeProvider`). When providers are unconfigured or unavailable, the system automatically routes to high-fidelity deterministic fallback engines.
3. **Standardized Envelopes:** All responses return a consistent `{ ok, data, meta }` structure with audit metadata (`isFallback`, `source`, `provider`, `timestamp`).
4. **Zero Hallucination Guarantee:** Strict invariants prevent LLM fabrication of candidate work history, certifications, degrees, or unverified skills.
5. **Robust Security:** Enforces configurable CORS origins, 500kb JSON body size limits, strict input validation (400 on malformed input), and sanitization of internal server errors.

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Build TypeScript
```bash
npm run build
```

### 3. Run Backend Test Suite
```bash
node test_endpoints.js
```

### 4. Start Server
```bash
npm start
```
Default server address: `http://localhost:5000`.

---

## Available Endpoints

### Health
* **`GET /api/health`**
  * Status check returning service name, uptime timestamp, environment, and permitted CORS origins.

### NVIDIA Endpoints
* **`POST /api/nvidia/roadmap`**
  * Generates a 3-stage milestone career roadmap customized to candidate role, region, and existing skills.
* **`POST /api/nvidia/resume`**
  * Structures and polishes user-supplied experience into ATS-ready format without inventing unprovided facts.
* **`POST /api/nvidia/skill-gap`**
  * Explains market reasons why regional employers demand a specific target skill.

### YouTube Endpoints
* **`GET /api/youtube/search?skill=Docker&targetRole=Backend+Developer`**
  * Queries, deduplicates, and ranks high-yield learning tutorials with duration, channel, and metrics.

---

## Environment Configuration

Configuration is loaded from environment variables (see root `.env.example`).

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `5000` | Port for Express listener |
| `NODE_ENV` | `development` | Runtime environment mode |
| `CORS_ORIGIN` | `http://localhost:3000,http://127.0.0.1:3000` | Comma-separated list of permitted web origins |
| `MAX_REQUEST_BODY_SIZE_KB` | `500` | Max JSON request body size in kilobytes |
| `FORCE_DEMO_FALLBACK` | `false` | When true, forces fallback regardless of key presence |
| `NVIDIA_API_KEY` | *(undefined)* | Secret API key for NVIDIA NIM API Catalog |
| `NVIDIA_API_BASE_URL` | `https://integrate.api.nvidia.com/v1` | Base URL for NVIDIA OpenAI-compatible chat API |
| `NVIDIA_MODEL` | `meta/llama-3.1-70b-instruct` | NVIDIA foundation model identifier |
| `NVIDIA_REQUEST_TIMEOUT_MS` | `25000` | Timeout before fallback activates |
| `YOUTUBE_API_KEY` | *(undefined)* | Secret Google Cloud API key for YouTube Data API v3 |
| `YOUTUBE_API_BASE_URL` | `https://www.googleapis.com/youtube/v3` | Base URL for YouTube Data API |
| `YOUTUBE_CACHE_TTL_SECONDS` | `86400` | In-memory/Redis cache duration (24 hours) |
| `YOUTUBE_MAX_RESULTS_PER_QUERY`| `10` | Default result set size |

---

## How Real Providers Will Be Enabled Later

1. **Provide Secrets:** Copy `.env.example` to `.env` on the server and insert valid `NVIDIA_API_KEY` and `YOUTUBE_API_KEY`.
2. **Provider Activation:** The `isAvailable()` checks in `server/src/providers/nvidiaProvider.ts` and `youtubeProvider.ts` will automatically evaluate to `true`.
3. **Graceful Degradation:** If live API calls fail or exceed quotas, the service layer catches errors and transparently serves the deterministic fallback without impacting the user interface.
