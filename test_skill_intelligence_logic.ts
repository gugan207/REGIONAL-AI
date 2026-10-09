import React from 'react';
import ReactDOMServer from 'react-dom/server';
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

console.log('=== STEP 7: SKILL INTELLIGENCE LOGIC & SSR TESTS ===\n');

// 1. SSR Render Default Screen
const html = ReactDOMServer.renderToString(
  React.createElement(SkillIntelligenceScreen, {
    region: 'Chennai',
    targetRole: 'Backend Developer',
    education: 'B.Tech / BE',
    year: 'Final year',
    selectedSkills: ['Python', 'SQL']
  })
);

assert(html.length > 500, 'SkillIntelligenceScreen renders HTML via SSR');

// 2. Exact Figma Text Tokens (Node 44:301)
const expectedFigmaTokens = [
  'REGIONAL - AI',
  'SKILL INTELLIGENCE',
  'REGIONAL SKILL INTELLIGENCE',
  'What are employers asking for?',
  'Explore demand by region, target role and experience level.',
  'REGION',
  'Chennai',
  'ROLE',
  'Backend Developer',
  'EXPERIENCE',
  'Fresher',
  'WINDOW',
  'Recent signals',
  'Skill demand by target role',
  'Java',
  '91%',
  'SQL',
  '84%',
  'REST APIs',
  '78%',
  'Docker',
  '62%',
  'AWS',
  '57%',
  'Kubernetes',
  '34%',
  'WHY THIS MATTERS',
  'A strong match for your target role — and a current gap in your profile.',
  'HIGH PRIORITY',
  'Recommended because of regional demand + role relevance + your current evidence.',
  'View your skill gap'
];

expectedFigmaTokens.forEach(token => {
  assert(html.includes(token), `Contains exact Figma token: "${token}"`);
});

// 3. Anchor IDs & Structural Elements
const expectedAnchors = [
  'filters-panel',
  'filter-region-value',
  'filter-role-value',
  'filter-experience-value',
  'filter-window-value',
  'demand-chart-panel',
  'demand-row-0',
  'demand-row-1',
  'demand-row-2',
  'demand-row-3',
  'demand-row-4',
  'demand-row-5',
  'why-this-matters-panel',
  'btn-view-skill-gap'
];

expectedAnchors.forEach(anchor => {
  assert(html.includes(`id="${anchor}"`), `Contains DOM anchor element: id="${anchor}"`);
});

// 4. Dynamic Adaptation for Alternate Profile (Data Analyst in Bangalore)
const analystHtml = ReactDOMServer.renderToString(
  React.createElement(SkillIntelligenceScreen, {
    region: 'Bangalore',
    targetRole: 'Data Analyst',
    education: 'MCA',
    year: '3rd year',
    selectedSkills: ['Python', 'SQL']
  })
);

assert(analystHtml.includes('Bangalore'), 'Dynamic update: Region adapts to Bangalore');
assert(analystHtml.includes('Data Analyst'), 'Dynamic update: Role adapts to Data Analyst');
assert(analystHtml.includes('Power BI'), 'Dynamic update: Top demand gap adapts to Power BI');
assert(analystHtml.includes('Tableau'), 'Dynamic update: Demand includes Tableau');

// 5. Full Cross-Screen Regression (Steps 1–7)
console.log('\n--- CROSS-SCREEN REGRESSION TESTS (STEPS 1-7) ---');

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

console.log(`\n========================================`);
console.log(`ALL TESTS PASSED: ${passed}/${total}`);
console.log(`========================================\n`);

