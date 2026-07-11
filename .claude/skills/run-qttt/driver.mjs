#!/usr/bin/env node
// Driver for the QTTT web app (Quantum Tic-Tac-Toe).
// Usage:
//   node driver.mjs smoke   # full launch->play-one-turn flow, screenshots, exit code
//   node driver.mjs repl    # interactive: nav/click/text/ss/eval/quit on stdin
// Assumes the dev server is already running on http://localhost:3000
// (see SKILL.md for how to start it).

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import os from 'os';
import readline from 'readline';

// Chromium's missing system libs live in user space (no root on this box);
// see setup-chromium-libs.sh. Playwright's browser child process inherits env.
const LIBS = path.join(os.homedir(), '.local/opt/chromium-libs/extracted/usr/lib/x86_64-linux-gnu');
if (fs.existsSync(LIBS)) {
  process.env.LD_LIBRARY_PATH = [LIBS, path.join(LIBS, 'nss'), process.env.LD_LIBRARY_PATH]
    .filter(Boolean).join(':');
}

const URL = process.env.QTTT_URL || 'http://localhost:3000';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const SHOTS = path.join(HERE, 'screenshots');
fs.mkdirSync(SHOTS, { recursive: true });

let shotCount = 0;
async function shot(page, name) {
  const file = path.join(SHOTS, `${String(++shotCount).padStart(2, '0')}-${name}.png`);
  await page.screenshot({ path: file });
  console.log(`screenshot: ${file}`);
  return file;
}

async function launch() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  // Viewport must be >=1024px wide: below that, App.css puts the Place
  // button at `position: fixed; top: 120vmin` — permanently off-screen in
  // a headless viewport and unreachable by scrolling.
  const page = await browser.newPage({ viewport: { width: 1280, height: 960 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  // React dev build logs warnings via console.error; the app ships one
  // pre-existing benign one (validateDOMNesting: CircularProgress in <p>).
  page.on('console', (m) => {
    if (m.type() === 'error' && !m.text().startsWith('Warning:')) errors.push(m.text());
  });
  return { browser, page, errors };
}

async function smoke() {
  const { browser, page, errors } = await launch();
  try {
    console.log(`nav ${URL}`);
    await page.goto(URL);

    // "Loading..." shows until the tfjs model (fetched from the deployed
    // GitHub Pages URL) finishes loading — can take ~10s on cold cache.
    await page.getByText('Select Mark and Start').waitFor({ timeout: 60000 });
    console.log('model loaded, start screen visible');
    await shot(page, 'start-screen');

    // Play as 〇 (first player).
    await page.getByRole('button', { name: '〇' }).click();
    await page.locator('table.App').waitFor();
    console.log('board visible');

    // One user turn: select two cells, then Place. Cells are td.Block.
    await page.locator('td.Block').nth(0).click();
    await page.locator('td.Block').nth(4).click();
    await page.getByRole('button', { name: 'Place' }).click();

    // The AI (DQN inference in-browser) replies synchronously; after our
    // 〇1 pair the board must contain a ✖2 pair.
    await page.getByText('✖2').first().waitFor({ timeout: 15000 });
    const boardText = await page.locator('table.App').innerText();
    console.log('board after turn 1 + AI reply:', boardText.replace(/\s+/g, ' ').trim());
    await shot(page, 'after-first-turn');

    if (!boardText.includes('〇1') || !boardText.includes('✖2')) {
      throw new Error('expected both 〇1 (user) and ✖2 (AI) stones on the board');
    }
    if (errors.length) {
      throw new Error('console errors:\n' + errors.join('\n'));
    }
    console.log('SMOKE OK');
  } finally {
    await browser.close();
  }
}

async function repl() {
  const { browser, page, errors } = await launch();
  await page.goto(URL);
  console.log(`ready at ${URL} — commands: nav <url> | click <selector> | text <selector> | ss [name] | eval <js> | errors | quit`);
  const rl = readline.createInterface({ input: process.stdin });
  for await (const line of rl) {
    const [cmd, ...rest] = line.trim().split(/\s+/);
    const arg = rest.join(' ');
    try {
      if (cmd === 'quit' || cmd === 'exit') break;
      else if (cmd === 'nav') { await page.goto(arg || URL); console.log('ok'); }
      else if (cmd === 'click') { await page.locator(arg).first().click(); console.log('ok'); }
      else if (cmd === 'text') console.log(await page.locator(arg).first().innerText());
      else if (cmd === 'ss') await shot(page, arg || 'repl');
      else if (cmd === 'eval') console.log(await page.evaluate(arg));
      else if (cmd === 'errors') console.log(errors.length ? errors.join('\n') : '(none)');
      else if (cmd) console.log(`unknown command: ${cmd}`);
    } catch (e) {
      console.log('ERROR:', e.message.split('\n')[0]);
    }
  }
  await browser.close();
}

const mode = process.argv[2] || 'smoke';
if (mode === 'smoke') smoke().catch((e) => { console.error('SMOKE FAILED:', e); process.exit(1); });
else if (mode === 'repl') repl().catch((e) => { console.error(e); process.exit(1); });
else { console.error(`unknown mode: ${mode} (use smoke|repl)`); process.exit(2); }
