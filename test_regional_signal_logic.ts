import React from 'react';
import { renderToString } from 'react-dom/server';
import { RegionalSignalScreen } from './src/components/RegionalSignalScreen';
import { App } from './src/App';
import { AuthCard } from './src/components/AuthCard';
import { OnboardingScreen } from './src/components/OnboardingScreen';
import { TargetRoleScreen } from './src/components/TargetRoleScreen';
import { SkillProfileScreen } from './src/components/SkillProfileScreen';

console.log('=== TEST SUITE: STEP 5 REGIONAL SIGNAL VERIFICATION ===\n');

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

// 1. SSR Render RegionalSignalScreen with baseline Figma parameters
const html = renderToString(
  React.createElement(RegionalSignalScreen, {
    education: 'B.Tech / BE',
    year: 'Final year',
    region: 'Chennai',
    targetRole: 'Backend Developer',
    selectedSkills: ['Python', 'SQL'],
    resumeFile: null
  })
);

assert(typeof html === 'string' && html.length > 500, 'RegionalSignalScreen renders cleanly via SSR');

// 2. Verify all exact Figma text tokens from Node 44:217 in rendered HTML
const figmaTextTokens = [
  'YOUR REGIONAL SIGNAL',
  'Your market signal is ready.',
  'Chennai  •  Backend Developer  •  Fresher',
  'CURRENT READINESS',
  '68%',
  'Demo signal based on selected profile.',
  'Your next best action is clear.',
  'TOP PRIORITY GAP',
  'Docker',
  'High relevance for your target backend role.',
  'HIGH',
  'Learn → Build → Prove',
  'What the system is seeing',
  'Regional demand',
  'Role requirements',
  'Your current skills',
  'REGIONAL SIGNAL',
  'REGIONAL - AI'
];

for (const token of figmaTextTokens) {
  assert(html.includes(token), `Figma text token verified: "${token}"`);
}

// 3. Verify DOM Anchors
const requiredIds = [
  'readiness-card',
  'readiness-value',
  'signal-action-pill',
  'top-gap-card',
  'top-gap-skill',
  'action-strip-btn',
  'signal-sources-panel'
];

for (const id of requiredIds) {
  assert(html.includes(`id="${id}"`), `DOM anchor present: id="${id}"`);
}

// 4. Test Dynamic Adaptability to Alternative Candidate Role (e.g., Data Analyst in Bengaluru)
const analystHtml = renderToString(
  React.createElement(RegionalSignalScreen, {
    education: 'BCA / B.Sc',
    year: '3rd year',
    region: 'Bengaluru',
    targetRole: 'Data Analyst',
    selectedSkills: ['SQL', 'Excel'],
    resumeFile: null
  })
);

assert(analystHtml.includes('Bengaluru  •  Data Analyst  •  3rd year'), 'Subtitle dynamically updates to Bengaluru Data Analyst');
assert(analystHtml.includes('Power BI'), 'Data Analyst top gap skill dynamically resolved to Power BI');
assert(analystHtml.includes('Crucial for data visualization'), 'Data Analyst gap reason dynamically displayed');

// 5. Test Cross-Screen Regression (Steps 1 through 5)
const loginHtml = renderToString(React.createElement(AuthCard, { onSuccess: () => {} }));
assert(loginHtml.includes('Sign in') && loginHtml.includes('WELCOME BACK'), 'Step 1 Login AuthCard renders cleanly');

const onboardingHtml = renderToString(React.createElement(OnboardingScreen, { onContinue: () => {} }));
assert(onboardingHtml.includes('Tell us about yourself') && onboardingHtml.includes('STEP 1 OF 3'), 'Step 2 OnboardingScreen renders cleanly');

const targetRoleHtml = renderToString(React.createElement(TargetRoleScreen, { onContinue: () => {} }));
assert(targetRoleHtml.includes('What do you want to become?') && targetRoleHtml.includes('STEP 2 OF 3'), 'Step 3 TargetRoleScreen renders cleanly');

const skillProfileHtml = renderToString(React.createElement(SkillProfileScreen, { onBuildProfile: () => {} }));
assert(skillProfileHtml.includes('What can you already do?') && skillProfileHtml.includes('Build my profile'), 'Step 4 SkillProfileScreen renders cleanly');

const appHtml = renderToString(React.createElement(App));
assert(typeof appHtml === 'string' && appHtml.length > 500, 'App root component renders cleanly');

console.log(`\n========================================`);
console.log(`SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`========================================\n`);

if (failCount > 0) {
  process.exit(1);
}
