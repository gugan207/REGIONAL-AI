import React from 'react';
import { renderToString } from 'react-dom/server';
import { SkillProfileScreen, FIGMA_SKILLS } from './src/components/SkillProfileScreen';
import { App } from './src/App';

console.log('=== TEST SUITE: STEP 4 SKILL PROFILE VERIFICATION ===\n');

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

// 1. Verify exact 10 Figma skills
const EXPECTED_SKILLS = [
  'Python',
  'Java',
  'SQL',
  'Git',
  'React',
  'Docker',
  'AWS',
  'Figma',
  'Excel',
  'Power BI'
];

assert(
  FIGMA_SKILLS.length === 10,
  'All 10 Figma skills present in FIGMA_SKILLS constant',
  `Found ${FIGMA_SKILLS.length}`
);

const allSkillsMatch = EXPECTED_SKILLS.every((s, i) => FIGMA_SKILLS[i] === s);
assert(allSkillsMatch, 'Exact match on all 10 skill names and casing');

// 2. SSR Render SkillProfileScreen
const initialSkills = ['Python', 'SQL'];
const initialResume = { name: 'my_resume.pdf', size: 104200 };
const html = renderToString(
  React.createElement(SkillProfileScreen, {
    initialSkills,
    initialResume
  })
);

assert(typeof html === 'string' && html.length > 500, 'SkillProfileScreen renders cleanly via SSR');

// 3. Verify all exact Figma text tokens from Node 44:163 in rendered HTML
const figmaTextTokens = [
  'STEP 3 OF 3',
  'REGIONAL - AI',
  'What can you already do?',
  'Add a resume or select the skills you already have. We’ll use this to find your gaps.',
  'Upload your resume',
  'Or choose your current skills',
  'Python',
  'Java',
  'SQL',
  'Git',
  'React',
  'Docker',
  'AWS',
  'Figma',
  'Excel',
  'Power BI',
  'You can update these details later.',
  'Build my profile'
];

for (const token of figmaTextTokens) {
  assert(html.includes(token), `Figma text token verified: "${token}"`);
}

// 4. Verify file input accepts PDF and DOCX
assert(html.includes('accept=".pdf,.docx'), 'File picker accepts PDF and DOCX extensions');
assert(html.includes('my_resume.pdf'), 'Uploaded filename appears in UI');
assert(html.includes('101.8 KB'), 'Uploaded file size formatted and displayed');
assert(html.includes('Replace file'), 'Button displays Replace file when resume is present');

// 5. Test Default State without resume
const emptyResumeHtml = renderToString(
  React.createElement(SkillProfileScreen, {
    initialSkills: [],
    initialResume: null
  })
);
assert(emptyResumeHtml.includes('PDF or DOCX • optional'), 'Default empty upload subtitle displayed');
assert(emptyResumeHtml.includes('Choose file'), 'Default button text is Choose file');

// 6. Verify multi-select skill state markup
for (const skill of EXPECTED_SKILLS) {
  const isPreselected = initialSkills.includes(skill);
  const skillId = `skill-item-${skill.toLowerCase().replace(/\s+/g, '-')}`;
  assert(
    html.includes(`id="${skillId}"`),
    `Skill item ID present in DOM: ${skillId}`
  );
  if (isPreselected) {
    assert(
      html.includes(`data-skill="${skill}" data-selected="true"`),
      `Skill ${skill} reflects selected state (data-selected="true")`
    );
  } else {
    assert(
      html.includes(`data-skill="${skill}" data-selected="false"`),
      `Skill ${skill} reflects unselected state (data-selected="false")`
    );
  }
}

// 7. Verify App component loads cleanly
const appHtml = renderToString(React.createElement(App));
assert(typeof appHtml === 'string' && appHtml.length > 500, 'App component renders default screen cleanly');

console.log(`\n========================================`);
console.log(`SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`========================================\n`);

if (failCount > 0) {
  process.exit(1);
}
