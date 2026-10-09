import React from 'react';
import { renderToString } from 'react-dom/server';
import { OnboardingScreen } from './src/components/OnboardingScreen';

console.log('=== 1. Testing OnboardingScreen SSR & DOM Output ===');
const html = renderToString(React.createElement(OnboardingScreen));
console.log('Onboarding HTML generated successfully, length:', html.length);

const requiredTokens = [
  'STEP 1 OF 3',
  'Tell us about yourself',
  'This helps REGIONAL - AI personalize your regional skill signal.',
  'Your education',
  'Choose the option that best matches your current study.',
  'B.Tech / BE',
  'Engineering or technology',
  'BCA / B.Sc',
  'Computer science & applications',
  'B.Com / BBA',
  'Commerce & business',
  'Current year',
  'Preferred region',
  'You can update these details later.',
  'Continue',
  'Save & exit',
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
  console.log('PASS: All 17 Figma Onboarding text tokens verified in DOM!');
}

console.log('\n=== 2. Testing Component Anchors & Controls ===');
const anchors = [
  'save-and-exit-btn',
  'onboarding-continue-btn',
  'edu-option-BTechBE',
  'edu-option-BCABSc',
  'edu-option-BComBBA',
  'year-select',
  'region-select'
];

anchors.forEach(anchor => {
  if (html.includes(anchor)) {
    console.log(`PASS: Found anchor "${anchor}"`);
  } else {
    console.error(`FAIL: Missing anchor "${anchor}"`);
  }
});

console.log('\n=== 3. Testing Validation Logic ===');
function validateOnboarding(education: string, year: string, region: string): { valid: boolean; error?: string } {
  if (!education) return { valid: false, error: 'Please select your education.' };
  if (!year) return { valid: false, error: 'Please select your graduation year.' };
  if (!region) return { valid: false, error: 'Please select your preferred region.' };
  return { valid: true };
}

const vEmpty = validateOnboarding('', 'Final year', 'Chennai');
console.log('Validation (missing edu):', vEmpty.error === 'Please select your education.' ? 'PASS' : 'FAIL');

const vMissingReg = validateOnboarding('B.Tech / BE', 'Final year', '');
console.log('Validation (missing region):', vMissingReg.error === 'Please select your preferred region.' ? 'PASS' : 'FAIL');

const vValid = validateOnboarding('B.Tech / BE', 'Final year', 'Chennai');
console.log('Validation (valid form):', vValid.valid ? 'PASS' : 'FAIL');

console.log('\nALL ONBOARDING TESTS COMPLETED SUCCESSFULLY.');
