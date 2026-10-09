import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { SkillProofScreen } from './src/components/SkillProofScreen';
import { ResumeBuilderScreen } from './src/components/ResumeBuilderScreen';
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

console.log('=== STEP 11: SKILL PROOF LOGIC & SSR TESTS ===\n');

// 1. SSR Render Default Screen
const html = ReactDOMServer.renderToString(
  React.createElement(SkillProofScreen, {
    region: 'Chennai',
    targetRole: 'Backend Developer',
    education: 'B.Tech / BE',
    year: 'Final year',
    selectedSkills: ['Python', 'SQL'],
    selectedGapSkill: 'Docker',
    readinessScore: 68
  })
);

assert(html.length > 500, 'SkillProofScreen renders HTML via SSR');

// 2. Exact Figma Text Tokens (Node 44:540)
const expectedFigmaTokens = [
  'REGIONAL - AI',
  'SKILL PROOF',
  'PROVE THE SKILL',
  'Turn learning into evidence.',
  'Build one project that demonstrates the skill employers care about.',
  'DOCKER',
  'Containerized REST API',
  'A production-style backend project packaged with Docker and documented for deployment.',
  'WHAT TO PROVE',
  'Dockerfile',
  'Docker Compose',
  'REST API',
  'PostgreSQL',
  'README + setup',
  'Demo endpoint',
  'Start project',
  'Proof checklist',
  'Evidence becomes part of your skill profile.',
  'Project completed',
  'Demo available',
  'README added',
  'Portfolio linked',
  'Skill demonstrated',
  '2 / 5 verified'
];

for (const token of expectedFigmaTokens) {
  assert(html.includes(token), `Figma text token present: "${token}"`);
}

// 3. Exact Layout Anchors & Node IDs
const requiredAnchors = [
  'skill-proof-screen',
  'top-nav',
  'nav-brand',
  'nav-status-pill',
  'kicker',
  'page-title',
  'page-subtitle',
  'project-card',
  'skill-badge',
  'project-title',
  'project-desc',
  'req-title',
  'requirements-list',
  'btn-start-project',
  'proof-checklist-card',
  'checklist-title',
  'checklist-sub',
  'checklist-items-container',
  'verified-status-banner',
  'verified-status-text'
];

for (const anchor of requiredAnchors) {
  assert(html.includes(`id="${anchor}"`), `Contains DOM anchor element: id="${anchor}"`);
}

// 4. Candidate State Preservation via Data Attributes
assert(html.includes('data-candidate-role="Backend Developer"'), 'Preserves targetRole');
assert(html.includes('data-candidate-region="Chennai"'), 'Preserves region');
assert(html.includes('data-candidate-education="B.Tech / BE • Final year"'), 'Preserves education & year');
assert(html.includes('data-candidate-skills="Python, SQL"'), 'Preserves selected skills');
assert(html.includes('data-candidate-readiness="68"'), 'Preserves readiness score');

// 5. Dynamic Adaptation for Alternate Skill (AWS)
const awsHtml = ReactDOMServer.renderToString(
  React.createElement(SkillProofScreen, {
    region: 'Bengaluru',
    targetRole: 'Cloud Engineer',
    selectedGapSkill: 'AWS',
    readinessScore: 74
  })
);

assert(awsHtml.includes('AWS'), 'Dynamic adaptation: skill badge displays AWS');
assert(awsHtml.includes('Cloud Deployed Backend API'), 'Dynamic adaptation: AWS project title rendered');
assert(awsHtml.includes('AWS ECS / Lambda'), 'Dynamic adaptation: AWS specific requirement rendered');

// 6. Cross-Screen Regression (Steps 1–11)
console.log('\n--- REGRESSION TESTING STEPS 1-11 ---');

const s1Html = ReactDOMServer.renderToString(
  React.createElement(AuthCard, { onSuccess: () => {} })
);
assert(s1Html.includes('Sign in') && s1Html.includes('WELCOME BACK'), 'Step 1 Login AuthCard renders');

const s2Html = ReactDOMServer.renderToString(
  React.createElement(OnboardingScreen, { onContinue: () => {} })
);
assert(s2Html.includes('Tell us about yourself') && s2Html.includes('STEP 1 OF 3'), 'Step 2 Onboarding renders');

const s3Html = ReactDOMServer.renderToString(
  React.createElement(TargetRoleScreen, { onContinue: () => {} })
);
assert(s3Html.includes('What do you want to become?') && s3Html.includes('STEP 2 OF 3'), 'Step 3 TargetRole renders');

const s4Html = ReactDOMServer.renderToString(
  React.createElement(SkillProfileScreen, { onBuildProfile: () => {} })
);
assert(s4Html.includes('What can you already do?') && s4Html.includes('Build my profile'), 'Step 4 SkillProfileScreen renders');

const s5Html = ReactDOMServer.renderToString(
  React.createElement(RegionalSignalScreen, { onContinue: () => {} })
);
assert(s5Html.includes('Your market signal is ready.') && s5Html.includes('CURRENT READINESS'), 'Step 5 RegionalSignal renders');

const s6Html = ReactDOMServer.renderToString(
  React.createElement(DashboardScreen, { onViewRoadmap: () => {} })
);
assert(s6Html.includes('OVERVIEW') && s6Html.includes('Your career intelligence'), 'Step 6 Dashboard renders');

const s7Html = ReactDOMServer.renderToString(
  React.createElement(SkillIntelligenceScreen, { onViewSkillGap: () => {} })
);
assert(s7Html.includes('REGIONAL SKILL INTELLIGENCE') && s7Html.includes('What are employers asking for?'), 'Step 7 SkillIntelligence renders');

const s8Html = ReactDOMServer.renderToString(
  React.createElement(SkillGapScreen, { onBuildSkill: () => {} })
);
assert(s8Html.includes('YOUR SKILL GAP') && s8Html.includes('What are you missing?'), 'Step 8 SkillGap renders');

const s9Html = ReactDOMServer.renderToString(
  React.createElement(RoadmapScreen, { region: 'Chennai', targetRole: 'Backend Developer', selectedGapSkill: 'Docker' })
);
assert(s9Html.includes('YOUR ACTION ROADMAP'), 'Step 9 Roadmap renders');

const s10Html = ReactDOMServer.renderToString(
  React.createElement(ResumeBuilderScreen, { region: 'Chennai', targetRole: 'Backend Developer', selectedGapSkill: 'Docker' })
);
assert(s10Html.includes('ATS-FRIENDLY RESUME BUILDER'), 'Step 10 ResumeBuilder renders');

const s11Html = ReactDOMServer.renderToString(
  React.createElement(SkillProofScreen, { region: 'Chennai', targetRole: 'Backend Developer', selectedGapSkill: 'Docker' })
);
assert(s11Html.includes('PROVE THE SKILL'), 'Step 11 SkillProof renders');

console.log(`\nAll ${total} Logic and Regression Tests Passed! (${passed}/${total})`);
