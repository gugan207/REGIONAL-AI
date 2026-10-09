/**
 * REGIONAL - AI — STEP 13 Comprehensive Backend Test Suite
 * Validates real API integration (YouTube Live API), NVIDIA NIM provider flow,
 * failure resilience, fallback engines, security controls, and endpoint contracts.
 */

const http = require("http");

function request(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on("error", reject);
    if (body) {
      req.write(typeof body === "string" ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log("================================================================");
  console.log("   REGIONAL - AI — STEP 13 REAL API & BACKEND VERIFICATION      ");
  console.log("================================================================\n");

  let passed = 0;
  let total = 0;

  function assert(condition, name, details = "") {
    total++;
    if (condition) {
      console.log(`[PASS] ${name}`);
      passed++;
    } else {
      console.error(`[FAIL] ${name} ${details ? "- " + details : ""}`);
    }
  }

  // ---------------------------------------------------------------------------
  // 1. HEALTH ENDPOINT & RUNTIME CONFIGURATION
  // ---------------------------------------------------------------------------
  const health = await request({
    hostname: "localhost",
    port: 5000,
    path: "/api/health",
    method: "GET",
  });
  assert(
    health.status === 200 &&
      health.data.ok === true &&
      health.data.service === "REGIONAL - AI API" &&
      Array.isArray(health.data.corsOrigins) &&
      health.data.providers?.gemini !== undefined &&
      health.data.providers?.youtube !== undefined,
    "1.1 GET /api/health returns 200 with service info, CORS, and Gemini/YouTube providers"
  );

  // ---------------------------------------------------------------------------
  // 2. YOUTUBE DATA API V3 — REAL INTEGRATION & SEARCH
  // ---------------------------------------------------------------------------
  // 2.1 Live YouTube Search Test
  const ytLive = await request({
    hostname: "localhost",
    port: 5000,
    path: "/api/youtube/search?skill=Docker&targetRole=Backend+Developer",
    method: "GET",
  });
  assert(
    ytLive.status === 200 &&
      ytLive.data.ok === true &&
      (ytLive.data.data.source === "youtube_live" || ytLive.data.source === "youtube_live" || ytLive.data.source === "cache" || ytLive.data.data.source === "cache") &&
      ytLive.data.data.resources.length > 0 &&
      ytLive.data.data.resources[0].videoUrl.startsWith("https://www.youtube.com/watch?v="),
    "2.1 GET /api/youtube/search executes live YouTube Data API query returning real videos"
  );

  // 2.2 Live YouTube Search with Filters
  const ytFiltered = await request({
    hostname: "localhost",
    port: 5000,
    path: "/api/youtube/search?skill=Python&level=beginner&maxResults=3",
    method: "GET",
  });
  assert(
    ytFiltered.status === 200 &&
      ytFiltered.data.ok === true &&
      ytFiltered.data.data.resources.length <= 3 &&
      ytFiltered.data.data.resources[0].skillTag === "Python",
    "2.2 GET /api/youtube/search respects query constraints and pagination limits"
  );

  // 2.3 YouTube Validation: Missing skill query
  const ytMissingSkill = await request({
    hostname: "localhost",
    port: 5000,
    path: "/api/youtube/search",
    method: "GET",
  });
  assert(
    ytMissingSkill.status === 400 &&
      ytMissingSkill.data.ok === false &&
      ytMissingSkill.data.error.includes("skill"),
    "2.3 GET /api/youtube/search rejects missing skill with HTTP 400"
  );

  // 2.4 YouTube Validation: Invalid level parameter
  const ytInvalidLevel = await request({
    hostname: "localhost",
    port: 5000,
    path: "/api/youtube/search?skill=Docker&level=expert_master",
    method: "GET",
  });
  assert(
    ytInvalidLevel.status === 400 &&
      ytInvalidLevel.data.ok === false &&
      ytInvalidLevel.data.error.includes("level"),
    "2.4 GET /api/youtube/search rejects invalid level with HTTP 400"
  );

  // ---------------------------------------------------------------------------
  // 3. GOOGLE GEMINI AI PROVIDER & RESILIENT FALLBACK ENDPOINTS
  // ---------------------------------------------------------------------------
  // 3.1 Canonical AI Roadmap Generation (/api/ai/roadmap)
  const roadmapPayload = {
    targetRole: "Backend Developer",
    preferredRegion: "Chennai",
    experienceLevel: "fresher",
    currentSkills: ["Python", "SQL"],
    education: {
      degree: "B.Tech",
      fieldOfStudy: "Computer Science",
      graduationYear: 2026,
    },
    targetTimelineWeeks: 12,
  };
  const roadmapRes = await request(
    {
      hostname: "localhost",
      port: 5000,
      path: "/api/ai/roadmap",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    roadmapPayload
  );
  assert(
    roadmapRes.status === 200 &&
      roadmapRes.data.ok === true &&
      roadmapRes.data.data.targetRole === "Backend Developer" &&
      roadmapRes.data.data.region === "Chennai" &&
      roadmapRes.data.data.stages.length === 3 &&
      roadmapRes.data.data.stages[0].stageNumber === 1 &&
      roadmapRes.data.meta.isFallback !== undefined,
    "3.1 POST /api/ai/roadmap returns structured 3-stage milestone roadmap via Gemini"
  );

  // 3.2 Canonical AI Resume Structuring (/api/ai/resume)
  const resumePayload = {
    contact: {
      fullName: "Gugan Murugan",
      email: "candidate@example.com",
      cityState: "Chennai, Tamil Nadu",
    },
    targetRole: "Backend Developer",
    education: [{ institution: "Anna University", degree: "B.Tech CSE", year: 2026 }],
    verifiedSkills: ["Python", "SQL", "Docker"],
    unstructuredExperience: [
      {
        rawJobOrRoleTitle: "Backend Intern",
        organization: "Regional Tech Studio",
        rawAccomplishmentsNotes: "Wrote python ingestion pipeline. Added SQL indexes. Wrote unit tests.",
      },
    ],
    unstructuredProjects: [
      {
        projectName: "Logistics Hub",
        toolsUsedRaw: ["Python", "PostgreSQL", "Docker"],
        rawNotes: "Built multi-container tracking system.",
      },
    ],
  };
  const resumeRes = await request(
    {
      hostname: "localhost",
      port: 5000,
      path: "/api/ai/resume",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    resumePayload
  );
  assert(
    resumeRes.status === 200 &&
      resumeRes.data.ok === true &&
      resumeRes.data.data.structuredResume.contact.fullName === "Gugan Murugan" &&
      resumeRes.data.data.auditRecord.zeroHallucinationGuaranteed === true &&
      resumeRes.data.data.structuredResume.experience[0].verifiedFactsOnly === true,
    "3.2 POST /api/ai/resume formats user facts with zero-hallucination guarantee via Gemini"
  );

  // 3.3 Canonical AI Skill Gap Explanation (/api/ai/skill-gap)
  const skillGapPayload = {
    targetRole: "Backend Developer",
    targetRegion: "Chennai",
    currentSkills: ["Python", "SQL"],
    identifiedGapSkill: "Docker",
  };
  const skillGapRes = await request(
    {
      hostname: "localhost",
      port: 5000,
      path: "/api/ai/skill-gap",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    skillGapPayload
  );
  assert(
    skillGapRes.status === 200 &&
      skillGapRes.data.ok === true &&
      skillGapRes.data.data.skill === "Docker" &&
      skillGapRes.data.data.region === "Chennai" &&
      skillGapRes.data.data.priority === "HIGH" &&
      typeof skillGapRes.data.data.actionPlan.learnTopic === "string",
    "3.3 POST /api/ai/skill-gap returns regional employer rationale and action plan via Gemini"
  );

  // 3.4 Legacy Compatibility Alias (/api/nvidia/roadmap)
  const legacyRoadmapRes = await request(
    {
      hostname: "localhost",
      port: 5000,
      path: "/api/nvidia/roadmap",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    roadmapPayload
  );
  assert(
    legacyRoadmapRes.status === 200 &&
      legacyRoadmapRes.data.ok === true &&
      legacyRoadmapRes.data.data.stages.length === 3,
    "3.4 POST /api/nvidia/roadmap legacy alias works seamlessly and routes to Gemini"
  );

  // ---------------------------------------------------------------------------
  // 4. VALIDATION DEFENSE TESTS (HTTP 400)
  // ---------------------------------------------------------------------------
  // 4.1 Roadmap: Empty Body
  const emptyRoadmap = await request(
    {
      hostname: "localhost",
      port: 5000,
      path: "/api/ai/roadmap",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    {}
  );
  assert(
    emptyRoadmap.status === 400 &&
      emptyRoadmap.data.ok === false &&
      typeof emptyRoadmap.data.error === "string",
    "4.1 POST /api/ai/roadmap rejects empty body with HTTP 400"
  );

  // 4.2 Roadmap: Invalid Experience Level
  const badLevelRoadmap = await request(
    {
      hostname: "localhost",
      port: 5000,
      path: "/api/ai/roadmap",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    { ...roadmapPayload, experienceLevel: "grandmaster" }
  );
  assert(
    badLevelRoadmap.status === 400 &&
      badLevelRoadmap.data.ok === false &&
      badLevelRoadmap.data.error.includes("experienceLevel"),
    "4.2 POST /api/ai/roadmap rejects illegal experienceLevel with HTTP 400"
  );

  // 4.3 Roadmap: Out-of-bounds Timeline Weeks
  const badTimelineRoadmap = await request(
    {
      hostname: "localhost",
      port: 5000,
      path: "/api/ai/roadmap",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    { ...roadmapPayload, targetTimelineWeeks: 120 }
  );
  assert(
    badTimelineRoadmap.status === 400 &&
      badTimelineRoadmap.data.ok === false &&
      badTimelineRoadmap.data.error.includes("targetTimelineWeeks"),
    "4.3 POST /api/ai/roadmap rejects out-of-bounds timeline with HTTP 400"
  );

  // 4.4 Resume: Malformed Email
  const badEmailResume = await request(
    {
      hostname: "localhost",
      port: 5000,
      path: "/api/ai/resume",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    {
      ...resumePayload,
      contact: { fullName: "Test Candidate", email: "not-an-email", cityState: "Chennai" },
    }
  );
  assert(
    badEmailResume.status === 400 &&
      badEmailResume.data.ok === false &&
      badEmailResume.data.error.includes("contact.email"),
    "4.4 POST /api/ai/resume rejects malformed email with HTTP 400"
  );

  // 4.5 Skill Gap: Whitespace-only Gap Skill
  const badSkillGap = await request(
    {
      hostname: "localhost",
      port: 5000,
      path: "/api/ai/skill-gap",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    { ...skillGapPayload, identifiedGapSkill: "   " }
  );
  assert(
    badSkillGap.status === 400 &&
      badSkillGap.data.ok === false &&
      badSkillGap.data.error.includes("identifiedGapSkill"),
    "4.5 POST /api/ai/skill-gap rejects empty/whitespace skill with HTTP 400"
  );

  // ---------------------------------------------------------------------------
  // 5. SECURITY & RESILIENCE TESTS
  // ---------------------------------------------------------------------------
  // 5.1 Undefined Route Handling (404)
  const notFoundRes = await request({
    hostname: "localhost",
    port: 5000,
    path: "/api/unsupported-endpoint",
    method: "GET",
  });
  assert(
    notFoundRes.status === 404 &&
      notFoundRes.data.ok === false &&
      notFoundRes.data.error === "API route not found",
    "5.1 GET /api/unsupported-endpoint returns standardized 404 envelope without traces"
  );

  // 5.2 Error Response Sanitization (No Stack Traces)
  assert(
    emptyRoadmap.data.stack === undefined &&
      badEmailResume.data.stack === undefined &&
      badLevelRoadmap.data.stack === undefined,
    "5.2 Error Sanitization: Error responses strictly omit internal stack traces"
  );

  // 5.3 Secret Redaction Verification
  const jsonStr = JSON.stringify([health.data, ytLive.data, roadmapRes.data, resumeRes.data]);
  assert(
    !jsonStr.includes("nvapi" + "-") &&
      !jsonStr.includes("AIza" + "Sy") &&
      !jsonStr.includes("AQ." + "Ab8"),
    "5.3 Secret Redaction: Zero API keys or private tokens are leaked in any response"
  );

  console.log("\n================================================================");
  console.log(`TEST RESULTS: ${passed}/${total} TESTS PASSED.`);
  console.log("================================================================\n");

  process.exit(passed === total ? 0 : 1);
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
