import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './src/App';
import { OnboardingScreen } from './src/components/OnboardingScreen';
import { TargetRoleScreen } from './src/components/TargetRoleScreen';
import { SkillProfileScreen } from './src/components/SkillProfileScreen';
import { AuthCard } from './src/components/AuthCard';

console.log('=== FULL JOURNEY INTEGRATION TEST ===\n');

// 1. Step 1: Login
const loginHtml = renderToString(React.createElement(AuthCard, { onSuccess: () => {} }));
if (!loginHtml.includes('Sign in') || !loginHtml.includes('WELCOME BACK')) {
  throw new Error('Step 1 Login AuthCard failed to render');
}
console.log('[PASS] Step 1 Login AuthCard renders cleanly');

// 2. Step 2: Onboarding
const onboardingHtml = renderToString(React.createElement(OnboardingScreen, { onContinue: () => {} }));
if (!onboardingHtml.includes('Tell us about yourself') || !onboardingHtml.includes('STEP 1 OF 3')) {
  throw new Error('Step 2 OnboardingScreen failed to render');
}
console.log('[PASS] Step 2 OnboardingScreen renders cleanly');

// 3. Step 3: Target Role
const targetRoleHtml = renderToString(React.createElement(TargetRoleScreen, { onContinue: () => {} }));
if (!targetRoleHtml.includes('What do you want to become?') || !targetRoleHtml.includes('Backend Developer')) {
  throw new Error('Step 3 TargetRoleScreen failed to render');
}
console.log('[PASS] Step 3 TargetRoleScreen renders cleanly');

// 4. Step 4: Skill Profile
const skillProfileHtml = renderToString(React.createElement(SkillProfileScreen, { onBuildProfile: () => {} }));
if (!skillProfileHtml.includes('What can you already do?') || !skillProfileHtml.includes('Build my profile')) {
  throw new Error('Step 4 SkillProfileScreen renders cleanly');
}
console.log('[PASS] Step 4 SkillProfileScreen renders cleanly');

console.log('\n[ALL SCREENS PASSED CLEANLY]');
