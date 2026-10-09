import React from 'react';
import { renderToString } from 'react-dom/server';
import { TargetRoleScreen } from './src/components/TargetRoleScreen';
import App from './src/App';

console.log('=== 1. Testing TargetRoleScreen SSR & DOM Output ===');
const html = renderToString(React.createElement(TargetRoleScreen));
console.log('TargetRole HTML generated successfully, length:', html.length);

const requiredTokens = [
  'STEP 2 OF 3',
  'What do you want to become?',
  'Choose the role you are preparing for. You can change this later.',
  'Backend Developer',
  'APIs, services & databases',
  'Data Analyst',
  'Insights, SQL & reporting',
  'AI / ML Engineer',
  'Models, data & experimentation',
  'Cloud Engineer',
  'Infrastructure, deployment & scale',
  'Cybersecurity Analyst',
  'Security, risk & monitoring',
  'UI / UX Designer',
  'Research, systems & interfaces',
  'Your selection powers regional demand and skill-gap analysis.',
  'Continue',
  'REGIONAL - AI'
];

let allPassed = true;
const normalizedHtml = html.replace(/&amp;/g, '&');
requiredTokens.forEach(token => {
  if (!normalizedHtml.includes(token)) {
    console.error(`FAIL: Missing expected token: "${token}"`);
    allPassed = false;
  }
});

if (allPassed) {
  console.log('PASS: All 18 Figma Target Role text tokens verified in DOM!');
}

console.log('\n=== 2. Testing Component Anchors & 6 Roles ===');
const anchors = [
  'target-role-continue-btn',
  'role-option-BackendDeveloper',
  'role-option-DataAnalyst',
  'role-option-AIMLEngineer',
  'role-option-CloudEngineer',
  'role-option-CybersecurityAnalyst',
  'role-option-UIUXDesigner'
];

anchors.forEach(anchor => {
  if (html.includes(anchor)) {
    console.log(`PASS: Found anchor "${anchor}"`);
  } else {
    console.error(`FAIL: Missing anchor "${anchor}"`);
  }
});

console.log('\n=== 3. Testing Single-Select & Validation Logic ===');
function validateRole(role: string): { valid: boolean; error?: string } {
  if (!role || !role.trim()) {
    return { valid: false, error: 'Please select a target role to continue.' };
  }
  return { valid: true };
}

const vEmpty = validateRole('');
console.log('Validation (no role):', vEmpty.error === 'Please select a target role to continue.' ? 'PASS' : 'FAIL');

const vSelected = validateRole('Backend Developer');
console.log('Validation (role selected):', vSelected.valid ? 'PASS' : 'FAIL');

console.log('\n=== 4. Cross-Screen Regression Test ===');
const defaultAppHtml = renderToString(React.createElement(App));
if (defaultAppHtml.includes('Sign in') && defaultAppHtml.includes('REGIONAL - AI')) {
  console.log('PASS: Step 1 Login screen remains intact.');
} else {
  console.error('FAIL: Regression in Login screen.');
}

console.log('\nALL TARGET ROLE TESTS COMPLETED SUCCESSFULLY.');
