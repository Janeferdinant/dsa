const fs = require('fs');
const path = require('path');

const targetPath = path.resolve(__dirname, '..', 'PCCSL307_Data_Structures_Lab_Portal.html');

console.log('--- RUNNING PORTAL VALIDATION TESTS ---');

if (!fs.existsSync(targetPath)) {
  console.error(`FAIL: Target file not found at ${targetPath}`);
  process.exit(1);
}

const html = fs.readFileSync(targetPath, 'utf-8');
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

// 1. Core Document Structure & Mobile Meta
assert(/<!DOCTYPE\s+html>/i.test(html), 'Contains HTML5 Doctype');
assert(/<meta\s+name=["']viewport["']\s+content=["'][^"']*width=device-width[^"']*viewport-fit=cover/i.test(html) || /<meta\s+name=["']viewport["']\s+content=["'][^"']*width=device-width/i.test(html), 'Contains mobile viewport meta tag');
assert(/PCCSL307/i.test(html), 'Mentions course code PCCSL307');
assert(/Data Structures Lab/i.test(html), 'Mentions course title Data Structures Lab');

// 2. Liquid Glass Design System
assert(/backdrop-filter:\s*blur\(/i.test(html), 'Uses frosted liquid glass backdrop-filter blur');
assert(/rgba\(/i.test(html), 'Uses translucent glass RGBA color tokens');
assert(/border:\s*1px\s+solid/i.test(html), 'Uses refined glass borders');

// 3. Check for all 18 experiments
const expectedKeywords = [
  { num: 1, name: 'Sparse Polynomial Addition' },
  { num: 2, name: 'Sparse Matrix Transpose' },
  { num: 3, name: 'Infix to Postfix' },
  { num: 4, name: 'Circular Queue' },
  { num: 5, name: 'Browser Navigation' },
  { num: 6, name: 'Polynomial Addition & Multiplication' },
  { num: 7, name: 'Expression Tree' },
  { num: 8, name: 'Dictionary' },
  { num: 9, name: 'Landmine Maze' },
  { num: 10, name: 'Water Jug' },
  { num: 11, name: 'Find and Replace' },
  { num: 12, name: 'Binary Search' },
  { num: 13, name: 'Sorting' },
  { num: 14, name: 'Post Office Priority Queue' },
  { num: 15, name: 'Spell Checker' },
  { num: 16, name: 'Memory Allocator' },
  { num: 17, name: 'Activity Points' },
  { num: 18, name: 'Merge K Sorted Lists' }
];

expectedKeywords.forEach(ex => {
  const hasExpt = html.includes(`Expt ${ex.num}`) || html.includes(`Experiment ${ex.num}`);
  assert(hasExpt, `Includes Experiment ${ex.num} (${ex.name})`);
});

// 4. Verify 6 pillars exist across experiments
const algoCount = (html.match(/class=["'][^"']*algo-section[^"']*["']/g) || []).length;
assert(algoCount >= 18, `Contains at least 18 Algorithm sections (found ${algoCount})`);

const svgFlowchartCount = (html.match(/<svg[^>]*class=["'][^"']*flowchart-svg[^"']*["']/g) || []).length;
assert(svgFlowchartCount >= 18, `Contains at least 18 inline SVG Flowcharts (found ${svgFlowchartCount})`);

const codeCount = (html.match(/class=["'][^"']*code-block[^"']*["']/g) || []).length;
assert(codeCount >= 18, `Contains at least 18 C Code blocks (found ${codeCount})`);

const outputCount = (html.match(/class=["'][^"']*terminal-output[^"']*["']/g) || []).length;
assert(outputCount >= 18, `Contains at least 18 Terminal Output blocks (found ${outputCount})`);

const demoCount = (html.match(/class=["'][^"']*demo-visualizer[^"']*["']/g) || []).length;
assert(demoCount >= 18, `Contains at least 18 Interactive Demos (found ${demoCount})`);

const appCount = (html.match(/class=["'][^"']*app-section[^"']*["']/g) || []).length;
assert(appCount >= 18, `Contains at least 18 Real-World Application sections (found ${appCount})`);

// 5. Dedicated Revision Engines
const vivaCount = (html.match(/class=["'][^"']*viva-item[^"']*["']/g) || []).length;
assert(vivaCount >= 36, `Contains Viva Voce Bank with >= 36 questions (found ${vivaCount})`);

const quizCount = (html.match(/class=["'][^"']*quiz-card[^"']*["']/g) || []).length;
assert(quizCount >= 15, `Contains Interactive Quiz with >= 15 questions (found ${quizCount})`);

assert(html.includes('id="kg-canvas"') || html.includes('id="knowledge-graph"'), 'Contains interactive Knowledge Graph container');

// 6. Mentor Attribution Footer
assert(html.includes('Asst. Prof. Jane Rose'), 'Contains Mentor Attribution: Asst. Prof. Jane Rose');
assert(html.includes('Department of Computer Science & Engineering (CSE)'), 'Contains Department Attribution');

// 7. Standalone Zero External Links
const externalScripts = (html.match(/<script[^>]+src=["']http/gi) || []).length;
const externalStylesheets = (html.match(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']http/gi) || []).length;
assert(externalScripts === 0, `Zero external scripts for 100% offline standalone usage (found ${externalScripts})`);
assert(externalStylesheets === 0, `Zero external stylesheets for 100% offline standalone usage (found ${externalStylesheets})`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL VERIFICATION CHECKS PASSED PERFECTLY!');
  process.exit(0);
}
