// Usage: PLAYWRIGHT_PATH=<path to the playwright package> node tests/e2e_portal.js <unused> http://localhost:8000/ <screenshot folder>
// Serve the repo first, e.g. `python -m http.server 8000`. Run from the repo root.
// Playwright check of the regenerated dsa portal at 390 px and 1280 px.
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const base = process.argv[3]; // argv[2] is unused
const shots = process.argv[4];
(async () => {
  const browser = await chromium.launch();
  const failures = [];
  const check = (cond, msg) => { console.log((cond ? 'PASS ' : 'FAIL ') + msg); if (!cond) failures.push(msg); };
  for (const [w, h] of [[390, 844], [1280, 900]]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    const problems = [];
    const external = [];
    page.on('console', m => { if (m.type() === 'error') problems.push(m.text()); });
    page.on('pageerror', e => problems.push(e.message));
    page.on('request', r => { if (!r.url().startsWith(base) && !r.url().startsWith('data:')) external.push(r.url()); });
    await page.goto(base + 'index.html');
    const tag = `[${w}px]`;
    check(await page.locator('article.experiment-card').count() >= 18, `${tag} experiment cards render`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    check(overflow <= 0, `${tag} no horizontal overflow (${overflow}px)`);
    check(await page.locator('.viva-item').count() === 37, `${tag} 37 viva items in the DOM`);
    check(await page.locator('.quiz-card').count() === 16, `${tag} 16 quiz cards in the DOM`);
    check(await page.locator('pre.terminal-output').count() === 18, `${tag} 18 terminal output panels`);

    // Open experiment 10, show its code and actual output, and play the demo.
    await page.locator('#expt-10 .card-header').click();
    await page.locator('#expt-10 .tab-btn', { hasText: 'C Code' }).click();
    const outText = await page.locator('#pane-10-code pre.terminal-output').innerText();
    check(outText.includes('Step 1: Pour') && outText.includes('Shortest'), `${tag} exp10 panel shows the BFS path the program prints`);
    check((await page.locator('#code-10').innerText()).includes('BFS') || (await page.locator('#code-10').innerText()).length > 500, `${tag} exp10 code is displayed`);
    await page.screenshot({ path: `${shots}/dsa-exp10-code-${w}.png` });
    await page.locator('#expt-10 .tab-btn', { hasText: 'Live Visualizer' }).click();
    await page.locator('#demo-box-10 .btn-step').click();
    await page.locator('#demo-box-10 .btn-step').click();
    check((await page.locator('#ticker-10').innerText()).startsWith('Step 3'), `${tag} exp10 demo advances to step 3`);
    for (let i = 0; i < 4; i++) await page.locator('#demo-box-10 .btn-step').click();
    check((await page.locator('#ticker-10').innerText()).includes('GOAL'), `${tag} exp10 demo reaches the goal`);

    // Revision drawers: viva reveal and quiz answer.
    await page.evaluate(() => openDrawer('viva'));
    await page.locator('#viva-item-0 .btn-reveal').click();
    check(await page.locator('#viva-item-0.revealed').count() === 1, `${tag} viva answer reveals`);
    await page.evaluate(() => closeDrawer());
    await page.evaluate(() => openDrawer('quiz'));
    check(await page.locator('#drawer-body .quiz-card').count() === 16, `${tag} quiz drawer lists 16 questions`);
    await page.locator('#drawer-body .quiz-opt').first().click();
    await page.screenshot({ path: `${shots}/dsa-quiz-${w}.png` });
    check(problems.length === 0, `${tag} no console or page errors ${JSON.stringify(problems)}`);
    check(external.length === 0, `${tag} no external requests ${JSON.stringify(external)}`);
    await page.close();
  }
  await browser.close();
  console.log(failures.length ? `\n${failures.length} FAILED` : '\nALL PASSED');
  process.exit(failures.length ? 1 : 0);
})();
