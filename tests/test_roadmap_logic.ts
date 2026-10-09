import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { RoadmapScreen } from './src/components/RoadmapScreen';
import { SkillGapScreen } from './src/components/SkillGapScreen';
import { SkillIntelligenceScreen } from './src/components/SkillIntelligenceScreen';
import { DashboardScreen } from './src/components/DashboardScreen';
import { RegionalSignalScreen } from './src/components/RegionalSignalScreen';
import { SkillProfileScreen } from './src/components/SkillProfileScreen';
import { TargetRoleScreen } from './src/components/TargetRoleScreen';
import { OnboardingScreen } from './src/components/OnboardingScreen';
import { AuthCard } from './src/components/AuthCard';

let passed = 0;
let total = 0;

function assert(cond: boolean, msg: string) {
  total++;
  if (cond) {
    passed++;
    console.log(`✓ ${msg}`);
  } else {
    console.error(`✗ FAIL: ${msg}`);
    process.exit(1);
  }
}

console.log('=== STEP 9: ROADMAP + YOUTUBE LEARNING LOGIC & SSR TESTS ===\n');

// 1. SSR Render Default Screen
const html = ReactDOMServer.renderToString(
  React.createElement(RoadmapScreen, {
    region: 'Chennai',
    targetRole: 'Backend Developer',
    selectedGapSkill: 'Docker'
  })
);

assert(html.length > 500, 'RoadmapScreen renders HTML via SSR');

// 2. Exact Figma Text Tokens (Node 44:488)
const expectedFigmaTokens = [
  'REGIONAL - AI',
  'ACTION ROADMAP',
  'YOUR ACTION ROADMAP',
  'From skill gap to job-ready proof.',
  'Every priority skill becomes a focused learning path with curated YouTube resources.',
  'Your 6-week learning path',
  'Target: Backend Developer • Chennai',
  '01',
  'LEARN',
  'REST APIs',
  'Core request / response patterns',
  'DONE',
  '02',
  'PRACTICE',
  'Docker',
  'Images, containers & Dockerfile',
  'NEXT',
  '03',
  'BUILD',
  'AWS',
  'Deploy a backend service',
  'UP NEXT',
  '04',
  'PROVE',
  'Backend Project',
  'Production-style API project',
  'Learn → Practice → Build → Prove',
  'Recommended to learn',
  'Skill: Docker • Curated via YouTube',
  'Docker fundamentals',
  'Beginner • Demo result',
  '42 min',
  'YouTube',
  'Docker for backend developers',
  'Intermediate • Demo result',
  '31 min',
  'Click a card to play its tutorial. Live YouTube results appear when the API is available.',
  'Play video Docker fundamentals by Programming with Mosh'
];

expectedFigmaTokens.forEach(token => {
  const htmlEncoded = token.replace(/&/g, '&amp;');
  assert(html.includes(token) || html.includes(htmlEncoded), `Contains exact Figma token: "${token}"`);
});

// 3. Anchor IDs & Structural Elements
const expectedAnchors = [
  'nav-brand',
  'nav-status-pill',
  'kicker',
  'page-title',
  'page-subtitle',
  'roadmap-timeline-panel',
  'timeline-title',
  'timeline-target-context',
  'timeline-step-01',
  'step-dot-01',
  'step-verb-01',
  'step-title-01',
  'step-desc-01',
  'step-status-01',
  'timeline-step-02',
  'step-dot-02',
  'step-verb-02',
  'step-title-02',
  'step-desc-02',
  'step-status-02',
  'timeline-step-03',
  'step-dot-03',
  'step-verb-03',
  'step-title-03',
  'step-desc-03',
  'step-status-03',
  'timeline-step-04',
  'step-dot-04',
  'step-verb-04',
  'step-title-04',
  'step-desc-04',
  'step-status-04',
  'roadmap-principle-banner',
  'roadmap-principle-text',
  'learning-resources-panel',
  'resources-title',
  'resources-skill-context',
  'youtube-resource-1',
  'thumbnail-1',
  'video-title-1',
  'video-meta-1',
  'video-duration-1',
  'video-platform-1',
  'youtube-resource-2',
  'thumbnail-2',
  'video-title-2',
  'video-meta-2',
  'video-duration-2',
  'video-platform-2',
  'resource-note-banner',
  'resource-note-text'
];

expectedAnchors.forEach(anchor => {
  assert(html.includes(`id="${anchor}"`), `Contains DOM anchor element: id="${anchor}"`);
});

// 4. Dynamic Adaptation for Alternate Target Gap Skill (AWS)
const awsHtml = ReactDOMServer.renderToString(
  React.createElement(RoadmapScreen, {
    region: 'Chennai',
    targetRole: 'Backend Developer',
    selectedGapSkill: 'AWS'
  })
);

assert(awsHtml.includes('Skill: AWS • Curated via YouTube'), 'Dynamic update: Resources skill context updates to AWS');
assert(awsHtml.includes('AWS cloud practitioner fundamentals'), 'Dynamic update: Includes AWS beginner tutorial');
assert(awsHtml.includes('AWS backend deployment guide'), 'Dynamic update: Includes AWS intermediate tutorial');

// 5. Full Cross-Screen Regression (Steps 1–9)
console.log('\n--- CROSS-SCREEN REGRESSION TESTS (STEPS 1-9) ---');

const authHtml = ReactDOMServer.renderToString(React.createElement(AuthCard, { onSuccess: () => {} }));
assert(authHtml.includes('Sign in') && authHtml.includes('WELCOME BACK'), 'Step 1 AuthCard SSR ok');

const onbHtml = ReactDOMServer.renderToString(React.createElement(OnboardingScreen, { onContinue: () => {} }));
assert(onbHtml.includes('Tell us about yourself') && onbHtml.includes('STEP 1 OF 3'), 'Step 2 OnboardingScreen SSR ok');

const roleHtml = ReactDOMServer.renderToString(React.createElement(TargetRoleScreen, { onContinue: () => {} }));
assert(roleHtml.includes('What do you want to become?') && roleHtml.includes('STEP 2 OF 3'), 'Step 3 TargetRoleScreen SSR ok');

const skillHtml = ReactDOMServer.renderToString(React.createElement(SkillProfileScreen, { onBuildProfile: () => {} }));
assert(skillHtml.includes('What can you already do?') && skillHtml.includes('Build my profile'), 'Step 4 SkillProfileScreen SSR ok');

const signalHtml = ReactDOMServer.renderToString(React.createElement(RegionalSignalScreen, { onContinue: () => {} }));
assert(signalHtml.includes('Your market signal is ready.') && signalHtml.includes('CURRENT READINESS'), 'Step 5 RegionalSignalScreen SSR ok');

const dashHtml = ReactDOMServer.renderToString(React.createElement(DashboardScreen, { onViewRoadmap: () => {} }));
assert(dashHtml.includes('OVERVIEW') && dashHtml.includes('Your career intelligence'), 'Step 6 DashboardScreen SSR ok');

const intellHtml = ReactDOMServer.renderToString(React.createElement(SkillIntelligenceScreen, { onViewSkillGap: () => {} }));
assert(intellHtml.includes('REGIONAL SKILL INTELLIGENCE') && intellHtml.includes('What are employers asking for?'), 'Step 7 SkillIntelligenceScreen SSR ok');

const gapHtml = ReactDOMServer.renderToString(React.createElement(SkillGapScreen, { onBuildSkill: () => {} }));
assert(gapHtml.includes('YOUR SKILL GAP') && gapHtml.includes('What are you missing?'), 'Step 8 SkillGapScreen SSR ok');

console.log(`\n========================================`);
console.log(`ALL TESTS PASSED: ${passed}/${total}`);
console.log(`========================================\n`);
