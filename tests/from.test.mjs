// ORARIUM — teste pentru from= (buton „înapoi”) și parametri ostili. Playwright, Chromium headless, rețea blocată.
// Rulare: node tests/from.test.mjs   (cere playwright; implicit /home/claude/pw/node_modules și /opt/pw-browsers/chromium-1194)
import {createRequire} from 'module';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const require = createRequire(process.env.PW_ROOT || '/home/claude/pw/package.json');
const {chromium} = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const APP = 'file://' + path.join(HERE, '..', 'index.html');
let pass = 0, fail = 0;
const ok = (c, n, i) => { if (c) { pass++; console.log('  ok   ' + n); } else { fail++; console.log('  FAIL ' + n + (i === undefined ? '' : ' ' + JSON.stringify(i).slice(0, 300))); } };
const browser = await chromium.launch({executablePath: process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox']});
async function open(hash, w = 1280, h = 800) {
  const ctx = await browser.newContext({viewport: {width: w, height: h}, locale: 'ro-RO'});
  await ctx.route(/^https?:/, r => r.abort());
  const page = await ctx.newPage(), errs = [];
  page.on('pageerror', e => errs.push(e.message));
  page.on('console', m => { if (/Content Security Policy|Refused to/i.test(m.text())) errs.push(m.text()); });
  await page.goto(APP + hash); await page.waitForTimeout(700);
  return {ctx, page, errs};
}
console.log('ORARIUM — from=, #body=, chei prototip');
for (const [w, h] of [[1280, 800], [360, 640]]) {
  const {ctx, page, errs} = await open('#body=marte&from=terra', w, h);
  ok(await page.locator('#fff-back').count() === 1, `buton înapoi prezent (${w}x${h})`);
  ok((await page.getAttribute('#fff-back', 'href')) === 'https://chiuta.github.io/TerRa/', 'href constant spre TerRa');
  ok((await page.textContent('#fff-back')).includes('TerRa'), 'etichetă cu TerRa');
  const hit = await page.evaluate(() => { const a = document.getElementById('fff-back'), r = a.getBoundingClientRect(), e = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return !!e && (e === a || a.contains(e)); });
  ok(hit, `butonul e clicabil, neacoperit (${w}x${h})`);
  ok((await page.locator('#fff-back').boundingBox()).height >= 44, 'țintă ≥ 44px');
  ok(errs.length === 0, 'fără erori/CSP', errs);
  await ctx.close();
}
for (const bad of ['constructor', '__proto__', 'hasOwnProperty', 'toString']) {
  const {ctx, page, errs} = await open('#body=' + bad + '&a=' + bad + '&b=' + bad + '&from=terra');
  ok(errs.length === 0, `body/a/b=${bad}: fără excepții`, errs);
  ok(await page.locator('#fff-back').count() === 1, `body=${bad}: butonul „înapoi” apare totuși`);
  await ctx.close();
}
{
  const {ctx, page, errs} = await open('#body=marte&from=terra');
  await page.evaluate(() => { document.documentElement.lang = 'en'; });
  await page.waitForTimeout(300);
  ok((await page.textContent('#fff-back')).startsWith('← back to'), 'eticheta urmărește limba (en)');
  await page.click('#fff-back-box button');
  ok(await page.locator('#fff-back').count() === 0, 'butonul × îl închide');
  await ctx.close();
}
for (const f of ['bolta', '__proto__', 'constructor', 'javascript:alert(1)', 'orarium']) {
  const {ctx, page, errs} = await open('#from=' + encodeURIComponent(f));
  ok(await page.locator('#fff-back').count() === 0 && errs.length === 0, `from=${f}: ignorat`, errs);
  await ctx.close();
}
{
  const {ctx, page} = await open('#body=marte');
  const hrefs = await page.evaluate(() => [...document.querySelectorAll('a.tl')].map(a => a.href));
  ok(hrefs.length === 0 || hrefs.every(h => h.includes('&from=orarium')), 'linkurile spre TerRa poartă from=orarium', hrefs.slice(0, 2));
  await ctx.close();
}
await browser.close();
console.log(`\n${pass} reușite, ${fail} eșuate`);
process.exit(fail ? 1 : 0);
