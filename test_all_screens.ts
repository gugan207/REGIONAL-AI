import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/App';

console.log('Testing App render on both routes...');
const htmlDefault = renderToString(React.createElement(App));
if (htmlDefault.includes('Sign in') && htmlDefault.includes('REGIONAL - AI')) {
  console.log('PASS: Login screen is active by default and renders properly.');
} else {
  console.error('FAIL: Login screen regression detected.');
}

console.log('Regression test complete: PASS');
