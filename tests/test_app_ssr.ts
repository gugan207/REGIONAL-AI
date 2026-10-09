import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/App.tsx';

console.log('Testing server-side render of React App...');
try {
  const html = ReactDOMServer.renderToString(React.createElement(App));
  console.log('App rendered successfully! HTML length:', html.length);

  // Assertions for Figma text matching
  const expectedStrings = [
    'REGIONAL - AI',
    'How it works',
    'Insights',
    'For colleges',
    'Log in',
    'Sign up',
    'REGIONAL CAREER INTELLIGENCE',
    'Know what the market needs. Build the skills that matter.',
    'REGIONAL - AI helps you see what employers near you need — then turns the gap into a practical learning path.',
    'Regional demand',
    'Skill gap analysis',
    'Action roadmap',
    'Your regional skill signal',
    'Chennai &nbsp;•&nbsp; Backend Developer',
    '68% READY',
    'Java',
    'SQL',
    'Docker',
    'AWS',
    'DEMO DATA',
    'Docker is a priority gap for your target role.',
    'WELCOME BACK',
    'Sign in',
    'Continue your regional skill journey.',
    'Email address',
    'you@example.com',
    'Password',
    'Forgot password?',
    'Sign in  →',
    'Continue with Google',
    'New to REGIONAL - AI?',
    'Create an account',
    'By continuing, you agree to our Terms of Service and Privacy Policy.'
  ];

  let missing = [];
  expectedStrings.forEach(str => {
    // decode html entities for check if needed
    const normalizedStr = str.replace(/&nbsp;/g, ' ');
    const normalizedHtml = html.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
    if (!normalizedHtml.includes(normalizedStr)) {
      missing.push(str);
    }
  });

  if (missing.length === 0) {
    console.log('ALL 33 FIGMA STRINGS VERIFIED IN RENDERED DOM!');
  } else {
    console.error('Missing strings:', missing);
  }

} catch (err) {
  console.error('SSR Render error:', err);
  process.exit(1);
}
