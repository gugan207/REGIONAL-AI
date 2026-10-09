import React from 'react';
import ReactDOMServer from 'react-dom/server';
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

console.log('=== STEP 8: SKILL GAP LOGIC & SSR TESTS ===\n');

// 1. SSR Render Default Screen
const html = ReactDOMServer.renderToString(
  React.createElement(SkillGapScreen, {
    region: 'Chennai',
    targetRole: 'Backend Developer',
    education: 'B.Tech / BE',
    year: 'Final year',
    selectedSkills: ['Python', 'SQL']
  })
);

assert(html.length > 500, 'SkillGapScreen renders HTML via SSR');

// 2. Exact Figma Text Tokens (Node 44:357)
const expectedFigmaTokens = [
  'REGIONAL - AI',
  'SKILL GAP',
  'YOUR SKILL GAP',
  'What are you missing?',
  'Compared with your target role and regional demand.',
  'Backend Developer',
  'Chennai',
  '3 priority gaps',
  'Docker',
  'High priority',
  '82% market demand',
  'Build containerized API',
  'Build this skill',
  'AWS',
  '57% market demand',
  'Deploy backend service',
  'REST APIs',
  'Improve',
  '78% market demand',
  'Build + document API',
  'Every priority is explained by evidence: regional demand + target-role relevance + your current skill profile.'
];

expectedFigmaTokens.forEach(token => {
  assert(html.includes(token), `Contains exact Figma token: "${token}"`);
});

// 3. Anchor IDs & Structural Elements
const expectedAnchors = [
  'nav-brand',
  'nav-status-pill',
  'kicker',
  'page-title',
  'page-subtitle',
  'gap-summary-panel',
  'gap-summary-role',
  'gap-summary-region',
  'gap-summary-signal-badge',
  'gap-summary-signal-label',
  'skill-gap-cards-grid',
  'gap-card-docker',
  'priority-badge-docker',
  'skill-name-docker',
  'market-demand-docker',
  'next-action-docker',
  'btn-build-skill-docker',
  'gap-card-aws',
  'priority-badge-aws',
  'skill-name-aws',
  'market-demand-aws',
  'next-action-aws',
  'btn-build-skill-aws',
  'gap-card-rest-apis',
  'priority-badge-rest-apis',
  'skill-name-rest-apis',
  'market-demand-rest-apis',
  'next-action-rest-apis',
  'btn-build-skill-rest-apis',
  'explainability-panel',
  'explainability-text'
];

expectedAnchors.forEach(anchor => {
  assert(html.includes(`id="${anchor}"`), `Contains DOM anchor element: id="${anchor}"`);
});

// 4. Dynamic Adaptation for Alternate Profile (Data Analyst in Bangalore)
const analystHtml = ReactDOMServer.renderToString(
  React.createElement(SkillGapScreen, {
    region: 'Bangalore',
    targetRole: 'Data Analyst',
    education: 'MCA',
    year: '3rd year',
    selectedSkills: ['Python', 'SQL']
  })
);

assert(analystHtml.includes('Bangalore'), 'Dynamic update: Region adapts to Bangalore');
assert(analystHtml.includes('Data Analyst'), 'Dynamic update: Role adapts to Data Analyst');
assert(analystHtml.includes('Power BI'), 'Dynamic update: Gap adapts to Power BI');
assert(analystHtml.includes('Tableau'), 'Dynamic update: Gap adapts to Tableau');
assert(analystHtml.includes('Advanced SQL'), 'Dynamic update: Gap adapts to Advanced SQL');

// 5. Full Cross-Screen Regression (Steps 1–8)
console.log('\n--- CROSS-SCREEN REGRESSION TESTS (STEPS 1-8) ---');

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

console.log(`\n========================================`);
console.log(`ALL TESTS PASSED: ${passed}/${total}`);
console.log(`========================================\n`);
