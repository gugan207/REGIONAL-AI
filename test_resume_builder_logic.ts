import React from 'react';
import ReactDOMServer from 'react-dom/server';
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

console.log('=== STEP 10: RESUME BUILDER LOGIC & SSR TESTS ===\n');

// 1. SSR Render Default Screen
const html = ReactDOMServer.renderToString(
  React.createElement(ResumeBuilderScreen, {
    region: 'Chennai',
    targetRole: 'Backend Developer',
    education: 'B.Tech / BE',
    year: 'Final year',
    selectedSkills: ['Python', 'SQL'],
    selectedGapSkill: 'Docker'
  })
);

assert(html.length > 500, 'ResumeBuilderScreen renders HTML via SSR');

// 2. Exact Figma Text Tokens (Node 50:103)
const expectedFigmaTokens = [
  'REGIONAL - AI',
  'RESUME BUILDER',
  'ATS-FRIENDLY RESUME BUILDER',
  'Turn your profile into a stronger resume.',
  'Use your target role, verified skills and project evidence to generate an ATS-friendly draft.',
  '01',
  'Add your source',
  'Start with an existing resume or your REGIONAL - AI profile.',
  'Upload PDF / DOCX',
  'Choose file',
  'Target role',
  'Backend Developer',
  'Target region',
  'Chennai',
  'Generate ATS Resume',
  '02',
  'AI resume review',
  'CONTACT',
  'Structured',
  'Good',
  'SKILLS',
  'Target-role aligned',
  'Review',
  'PROJECTS',
  'Evidence found',
  'KEYWORDS',
  'Regional role match',
  'CLAIMS',
  'Unsupported claims',
  'None detected',
  'Review generated resume',
  'Resume Preview',
  'SUMMARY',
  'EDUCATION',
  'Export resume'
];

for (const token of expectedFigmaTokens) {
  assert(html.includes(token), `Figma text token present: "${token}"`);
}

// 3. Exact Layout Anchors & Node IDs
assert(html.includes('id="resume-builder-screen"'), 'Screen wrapper anchor #resume-builder-screen present');
assert(html.includes('id="top-nav"'), 'Top nav anchor #top-nav present');
assert(html.includes('id="resume-inputs-card"'), 'Left card anchor #resume-inputs-card present (Node 50:114)');
assert(html.includes('id="resume-review-card"'), 'Right card anchor #resume-review-card present (Node 50:131)');
assert(html.includes('id="upload-resume-box"'), 'Upload area #upload-resume-box present (Node 50:117)');
assert(html.includes('id="btn-choose-file"'), 'Choose file button #btn-choose-file present');
assert(html.includes('id="btn-generate-ats"'), 'Generate ATS button #btn-generate-ats present');
assert(html.includes('id="btn-review-resume"'), 'Review button #btn-review-resume present (Node 50:160)');
assert(html.includes('id="preview-panel"'), 'Preview panel #preview-panel present (Node 77:4)');
assert(html.includes('id="resume-paper"'), 'Resume paper #resume-paper present (Node 77:5)');
assert(html.includes('id="btn-export-resume"'), 'Export button #btn-export-resume present (Node 77:16)');

// 4. Dynamic Props Rendering
const customHtml = ReactDOMServer.renderToString(
  React.createElement(ResumeBuilderScreen, {
    region: 'Bengaluru',
    targetRole: 'Full Stack Engineer',
    education: 'M.Tech / ME',
    year: 'Graduate 2026',
    selectedSkills: ['TypeScript', 'React', 'Node.js'],
    resumeFile: {
      name: 'candidate_cv_2026.pdf',
      size: 245000
    },
    selectedGapSkill: 'Kubernetes'
  })
);

assert(customHtml.includes('Full Stack Engineer'), 'Custom targetRole rendered correctly');
assert(customHtml.includes('Bengaluru'), 'Custom region rendered correctly');
assert(customHtml.includes('candidate_cv_2026.pdf'), 'Uploaded resume filename rendered correctly');
assert(customHtml.includes('data-candidate-education="M.Tech / ME • Graduate 2026"'), 'Candidate education preserved on paper');
assert(customHtml.includes('data-candidate-skills="TypeScript, React, Node.js"'), 'Candidate skills preserved on paper');
assert(customHtml.includes('data-candidate-gap="Kubernetes"'), 'Candidate roadmap gap skill preserved on paper');

// 5. Steps 1-10 Full Regression Smoke Test
console.log('\n--- REGRESSION TESTING STEPS 1-10 ---');

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

console.log(`\nAll ${total} Logic and Regression Tests Passed! (${passed}/${total})`);
