/**
 * REGIONAL - AI — Hardened Request Validation Utilities
 * Validates incoming JSON payloads and query parameters, rejecting invalid requests with 400.
 */

import {
  RoadmapGenerationRequest,
  ResumeGenerationRequest,
  SkillGapExplanationRequest,
  LearningResourceQuery,
} from "../types/api";

export interface ValidationResult<T> {
  valid: boolean;
  error?: string;
  data?: T;
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function validateString(
  value: unknown,
  minLength = 1,
  maxLength = 1000
): value is string {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  return trimmed.length >= minLength && trimmed.length <= maxLength;
}

export function validateArray(
  value: unknown,
  minItems = 0,
  maxItems = 100
): value is unknown[] {
  if (!Array.isArray(value)) return false;
  return value.length >= minItems && value.length <= maxItems;
}

export function validatePositiveNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value) && value > 0;
}

/**
 * Validates RoadmapGenerationRequest
 */
export function validateRoadmapRequest(
  body: unknown
): ValidationResult<RoadmapGenerationRequest> {
  if (!isObject(body)) {
    return { valid: false, error: "Request body must be a valid JSON object" };
  }

  if (!validateString(body.targetRole, 2, 100)) {
    return { valid: false, error: "Missing or invalid 'targetRole' (must be between 2 and 100 characters)" };
  }

  if (!validateString(body.preferredRegion, 2, 100)) {
    return { valid: false, error: "Missing or invalid 'preferredRegion' (must be between 2 and 100 characters)" };
  }

  const validLevels = ["student", "fresher", "junior", "transitioning"];
  if (
    typeof body.experienceLevel !== "string" ||
    !validLevels.includes(body.experienceLevel.trim())
  ) {
    return {
      valid: false,
      error: `'experienceLevel' must be one of: ${validLevels.join(", ")}`,
    };
  }

  if (!validateArray(body.currentSkills, 0, 50)) {
    return { valid: false, error: "'currentSkills' must be an array of strings (max 50 items)" };
  }

  for (const skill of body.currentSkills) {
    if (!validateString(skill, 1, 50)) {
      return { valid: false, error: "Each skill in 'currentSkills' must be a non-empty string under 50 characters" };
    }
  }

  if (!isObject(body.education)) {
    return { valid: false, error: "Missing or invalid 'education' object" };
  }

  if (!validateString(body.education.degree, 1, 100)) {
    return { valid: false, error: "Missing or invalid 'education.degree'" };
  }

  if (!validateString(body.education.fieldOfStudy, 1, 100)) {
    return { valid: false, error: "Missing or invalid 'education.fieldOfStudy'" };
  }

  if (
    typeof body.education.graduationYear !== "number" ||
    body.education.graduationYear < 1980 ||
    body.education.graduationYear > 2035
  ) {
    return { valid: false, error: "Invalid 'education.graduationYear' (must be an integer between 1980 and 2035)" };
  }

  if (body.targetTimelineWeeks !== undefined) {
    if (
      typeof body.targetTimelineWeeks !== "number" ||
      body.targetTimelineWeeks < 1 ||
      body.targetTimelineWeeks > 52
    ) {
      return { valid: false, error: "'targetTimelineWeeks' must be a positive integer between 1 and 52" };
    }
  }

  return {
    valid: true,
    data: {
      ...body,
      targetRole: (body.targetRole as string).trim(),
      preferredRegion: (body.preferredRegion as string).trim(),
      experienceLevel: (body.experienceLevel as string).trim() as any,
      currentSkills: (body.currentSkills as string[]).map((s) => s.trim()),
    } as RoadmapGenerationRequest,
  };
}

/**
 * Validates ResumeGenerationRequest
 */
export function validateResumeRequest(
  body: unknown
): ValidationResult<ResumeGenerationRequest> {
  if (!isObject(body)) {
    return { valid: false, error: "Request body must be a valid JSON object" };
  }

  if (!isObject(body.contact)) {
    return { valid: false, error: "Missing or invalid 'contact' object" };
  }

  if (!validateString(body.contact.fullName, 2, 100)) {
    return { valid: false, error: "Missing or invalid 'contact.fullName' (must be between 2 and 100 characters)" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    !validateString(body.contact.email, 5, 150) ||
    !emailRegex.test(body.contact.email.trim())
  ) {
    return { valid: false, error: "Missing or invalid 'contact.email' (must be a valid email format)" };
  }

  if (!validateString(body.targetRole, 2, 100)) {
    return { valid: false, error: "Missing or invalid 'targetRole'" };
  }

  if (!validateArray(body.verifiedSkills, 0, 50)) {
    return { valid: false, error: "'verifiedSkills' must be an array" };
  }

  for (const s of body.verifiedSkills) {
    if (!validateString(s, 1, 50)) {
      return { valid: false, error: "Each skill in 'verifiedSkills' must be a non-empty string" };
    }
  }

  if (!validateArray(body.unstructuredExperience, 0, 20)) {
    return { valid: false, error: "'unstructuredExperience' must be an array" };
  }

  if (!validateArray(body.unstructuredProjects, 0, 20)) {
    return { valid: false, error: "'unstructuredProjects' must be an array" };
  }

  return {
    valid: true,
    data: body as unknown as ResumeGenerationRequest,
  };
}

/**
 * Validates SkillGapExplanationRequest
 */
export function validateSkillGapRequest(
  body: unknown
): ValidationResult<SkillGapExplanationRequest> {
  if (!isObject(body)) {
    return { valid: false, error: "Request body must be a valid JSON object" };
  }

  if (!validateString(body.targetRole, 2, 100)) {
    return { valid: false, error: "Missing or invalid 'targetRole'" };
  }

  if (!validateString(body.targetRegion, 2, 100)) {
    return { valid: false, error: "Missing or invalid 'targetRegion'" };
  }

  if (!validateString(body.identifiedGapSkill, 1, 50)) {
    return { valid: false, error: "Missing or invalid 'identifiedGapSkill' (must be between 1 and 50 characters)" };
  }

  if (!validateArray(body.currentSkills, 0, 50)) {
    return { valid: false, error: "'currentSkills' must be an array" };
  }

  return {
    valid: true,
    data: {
      ...body,
      targetRole: (body.targetRole as string).trim(),
      targetRegion: (body.targetRegion as string).trim(),
      identifiedGapSkill: (body.identifiedGapSkill as string).trim(),
    } as SkillGapExplanationRequest,
  };
}

/**
 * Validates LearningResourceQuery
 */
export function validateYouTubeQuery(
  query: Record<string, unknown>
): ValidationResult<LearningResourceQuery> {
  const rawSkill = typeof query.skill === "string" ? query.skill.trim() : "";
  if (!rawSkill || rawSkill.length < 1 || rawSkill.length > 50) {
    return {
      valid: false,
      error: "Query parameter 'skill' is required (must be a non-empty string under 50 characters)",
    };
  }

  const targetRole = typeof query.targetRole === "string" ? query.targetRole.trim() : undefined;
  if (targetRole && targetRole.length > 100) {
    return { valid: false, error: "'targetRole' exceeds maximum allowed length of 100 characters" };
  }

  let level: "beginner" | "intermediate" | "advanced" | undefined = undefined;
  if (query.level !== undefined) {
    if (typeof query.level !== "string") {
      return { valid: false, error: "Query parameter 'level' must be one of: beginner, intermediate, advanced" };
    }
    const l = query.level.trim().toLowerCase();
    if (l === "beginner" || l === "intermediate" || l === "advanced") {
      level = l;
    } else {
      return { valid: false, error: "Query parameter 'level' must be one of: beginner, intermediate, advanced" };
    }
  }

  let maxResults: number | undefined = undefined;
  if (query.maxResults !== undefined) {
    const parsed = parseInt(String(query.maxResults), 10);
    if (isNaN(parsed) || parsed < 1 || parsed > 25) {
      return { valid: false, error: "'maxResults' must be an integer between 1 and 25" };
    }
    maxResults = parsed;
  }

  const language = typeof query.language === "string" ? query.language.trim() : undefined;

  return {
    valid: true,
    data: {
      skill: rawSkill,
      targetRole,
      level,
      maxResults,
      language,
    },
  };
}
