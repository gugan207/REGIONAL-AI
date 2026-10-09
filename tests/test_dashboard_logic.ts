import React from 'react';
import { renderToString } from 'react-dom/server';
import { DashboardScreen } from './src/components/DashboardScreen';
import { App } from './src/App';
import { AuthCard } from './src/components/AuthCard';
import { OnboardingScreen } from './src/components/OnboardingScreen';
import { TargetRoleScreen } from './src/components/TargetRoleScreen';
import { SkillProfileScreen } from './src/components/SkillProfileScreen';
import { RegionalSignalScreen } from './src/components/RegionalSignalScreen';

console.log('=== TEST SUITE: STEP 6 DASHBOARD VERIFICATION ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string, details?: string) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${testName} ${details ? '- ' + details : ''}`);
    failCount++;
  }
}

// 1. SSR Render DashboardScreen with default candidate profile
const html = renderToString(
  React.createElement(DashboardScreen, {
    education: 'B.Tech / BE',
    year: 'Final year',
    region: 'Chennai',
    targetRole: 'Backend Developer',
    selectedSkills: ['Python', 'SQL'],
    resumeFile: null,
    signalData: {
      readinessPercentage: 68,
      topGapSkill: 'Docker',
      gapReason: 'High relevance for your target backend role.',
      priority: 'HIGH',
      actionSequence: 'Learn → Build → Prove',
      sources: ['Regional demand', 'Role requirements', 'Your current skills']
    }
  })
);

assert(typeof html === 'string' && html.length > 500, 'DashboardScreen renders cleanly via SSR');

// 2. Verify all exact Figma text tokens from Node 44:252
const figmaTextTokens = [
  'OVERVIEW',
  'Your career intelligence',
  'A focused view of your market demand, skill gaps and next action.',
  'READINESS',
  '68%',
  'Demo signal',
  'Backend Developer',
  'REGION',
  'Chennai',
  'Current target market',
  'PRIORITY GAPS',
  '3 skills',
  'Docker • AWS • APIs',
  'Your top skill gaps',
  'Docker',
  'AWS',
  'REST APIs',
  'NEXT BEST ACTION',
  'Build your Docker foundation.',
  'Start with containers, then prove the skill with one backend project.',
  'View roadmap',
  'Profile',
  'REGIONAL - AI'
];

for (const token of figmaTextTokens) {
  assert(html.includes(token), `Figma text token verified: "${token}"`);
}

// 3. Verify DOM Anchors
const requiredIds = [
  'metric-readiness',
  'dashboard-readiness-value',
  'metric-region',
  'dashboard-region-value',
  'metric-gaps',
  'dashboard-gaps-value',
  'skill-gaps-panel',
  'next-action-panel',
  'btn-view-roadmap'
];

for (const id of requiredIds) {
  assert(html.includes(`id="${id}"`), `DOM anchor present: id="${id}"`);
}

// 4. Test Cross-Screen Regression (Steps 1 through 6)
const loginHtml = renderToString(React.createElement(AuthCard, { onSuccess: () => {} }));
assert(loginHtml.includes('Sign in') && loginHtml.includes('WELCOME BACK'), 'Step 1 Login AuthCard renders cleanly');

const onboardingHtml = renderToString(React.createElement(OnboardingScreen, { onContinue: () => {} }));
assert(onboardingHtml.includes('Tell us about yourself') && onboardingHtml.includes('STEP 1 OF 3'), 'Step 2 OnboardingScreen renders cleanly');

const targetRoleHtml = renderToString(React.createElement(TargetRoleScreen, { onContinue: () => {} }));
assert(targetRoleHtml.includes('What do you want to become?') && targetRoleHtml.includes('STEP 2 OF 3'), 'Step 3 TargetRoleScreen renders cleanly');

const skillProfileHtml = renderToString(React.createElement(SkillProfileScreen, { onBuildProfile: () => {} }));
assert(skillProfileHtml.includes('What can you already do?') && skillProfileHtml.includes('Build my profile'), 'Step 4 SkillProfileScreen renders cleanly');

const signalHtml = renderToString(React.createElement(RegionalSignalScreen, { onContinue: () => {} }));
assert(signalHtml.includes('Your market signal is ready.') && signalHtml.includes('CURRENT READINESS'), 'Step 5 RegionalSignalScreen renders cleanly');

const appHtml = renderToString(React.createElement(App));
assert(typeof appHtml === 'string' && appHtml.length > 500, 'App root component renders cleanly');

console.log(`\n========================================`);
console.log(`SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`========================================\n`);

if (failCount > 0) {
  process.exit(1);
}
