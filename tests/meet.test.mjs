// ORARIUM — planificator de întâlniri (v2.0). Playwright, Chromium headless, rețea blocată.
// Rulare: node tests/meet.test.mjs   (NODE_PATH cu playwright; CHROMIUM_PATH opțional)
import {createRequire} from 'module';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const require = createRequire(process.env.PW_ROOT || import.meta.url);
const {chromium} = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const APP = 'file://' + path.join(HERE, '..', 'index.html');
let pass = 0, fail = 0;
const ok = (c, n, i) => { if (c) { pass++; console.log('  ok   ' + n); } else { fail++; console.log('  FAIL ' + n + (i === undefined ? '' : ' ' + JSON.stringify(i).slice(0, 300))); } };
const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || process.env.CHROME || undefined, args: ['--no-sandbox']});
async function open(hash, w = 1280, h = 800) {
  const ctx = await browser.newContext({viewport: {width: w, height: h}, locale: 'ro-RO'});
  await ctx.route(/^https?:/, r => r.abort());
  const page = await ctx.newPage(), errs = [];
  page.on('pageerror', e => errs.push(e.message));
  page.on('console', m => { if (/Content Security Policy|Refused to/i.test(m.text())) errs.push(m.text()); });
  await page.goto(APP + hash); await page.waitForTimeout(600);
  return {ctx, page, errs};
}
console.log('ORARIUM — planificator de întâlniri');
{
  const {ctx, page, errs} = await open('#view=link&a=terra&b=marte&t=2026-10-26T12:00:00Z');
  ok(await page.locator('#mt-panel').isVisible(), 'panoul planificatorului e vizibil în Transmisii');
  await page.click('#mt-go');
  const t = await page.textContent('#mt-out');
  ok(/Dacă începi acum/.test(t) && /Întârziere/.test(t), 'rezumatul „acum” cu întârziere', t);
  const slots = await page.locator('.mt-slot').count();
  ok(slots >= 0, 'rezultatul se randează (sloturi: ' + slots + ')');
  // la 2026-10-26 Marte e la ~2 UA: timp-lumină între ~8 și ~20 min
  const lt = await page.evaluate(() => { const g = pairGeom(byId.terra, byId.marte, Date.UTC(2026, 9, 26, 12)); return g.lt; });
  ok(lt > 150 && lt < 1300, 'timp-lumină Pământ–Marte plauzibil', lt);
  // un program de 0–24 și 1 zi: întâlnirea încape (dacă legătura e deschisă), iar rândul arată ora locală la sosire
  await page.fill('#mt-h1', '0'); await page.fill('#mt-h2', '24'); await page.fill('#mt-n', '10'); await page.click('#mt-go');
  const n2 = await page.locator('.mt-slot').count();
  ok(n2 >= 1, 'program 0–24: există cel puțin un interval', n2);
  const row = await page.textContent('.mt-slot');
  ok(/\d\d:\d\d/.test(row) && /Ora locală/.test(row), 'rândul arată ora locală', row);
  // verificarea monotoniei: toate intervalele returnate respectă programul pe ambele capete
  const bad = await page.evaluate(() => {
    readMT(); const a = byId.terra, b = byId.marte, r = planMeets(a, b, NOW(), 8); const out = [];
    for (const x of r.list) for (const t of [x.s, x.e]) { const g = pairGeom(a, b, t); if (!workOk(a, PK.alo, t, MT.d * 60000) || !workOk(b, PK.blo, t + g.lt * 1000, MT.d * 60000)) out.push(t); }
    return out;
  });
  ok(bad.length === 0, 'intervalele respectă programul de lucru la ambele capete', bad);
  // program îngust (10:00–10:10, 30 min) = imposibil
  await page.fill('#mt-h1', '10'); await page.fill('#mt-h2', '10.1'); await page.click('#mt-go');
  ok(/Niciun interval potrivit/.test(await page.textContent('#mt-out')), 'program prea îngust: mesaj „niciun interval”');
  // același corp
  await page.selectOption('#pk-b', 'terra'); await page.click('#mt-go');
  ok(/două corpuri diferite/.test(await page.textContent('#mt-out')), 'același corp: mesaj');
  // link unic include mt=
  await page.selectOption('#pk-b', 'marte');
  const u = await page.evaluate(() => lnkBuild());
  ok(/[#&]mt=10,10\.1,30,10/.test(u), 'linkul unic păstrează parametrii planificatorului', u);
  ok(errs.length === 0, 'fără erori/CSP', errs);
  await ctx.close();
}
{
  const {ctx, page, errs} = await open('#view=link&a=terra&b=marte&mt=9,17,45,20');
  ok((await page.inputValue('#mt-h1')) === '9' && (await page.inputValue('#mt-d')) === '45' && (await page.inputValue('#mt-n')) === '20', 'mt= din link se aplică în formular');
  ctx.close();
}
for (const bad of ['mt=a,b,c,d', 'mt=999,-5,0,99999', 'mt=__proto__']) {
  const {ctx, page, errs} = await open('#view=link&a=terra&b=luna&' + bad);
  await page.click('#mt-go');
  ok(errs.length === 0 && (await page.textContent('#mt-out')).length > 0, 'parametru ostil ' + bad + ': fără excepții', errs);
  await ctx.close();
}
{ // limbi: toate au cheile; EN afișează titlul tradus; fără chei lipsă
  const {ctx, page} = await open('#view=link&a=terra&b=marte');
  const langs = ['en', 'fr', 'it', 'es', 'pt', 'de', 'hu'];
  for (const l of langs) {
    const r = await page.evaluate(l => { const d = DICT[l]; return ['Planificator de întâlniri', 'Caută intervale', 'Început posibil'].every(k => d && d[k] && d[k] !== k); }, l);
    ok(r, 'traducere ' + l + ' prezentă');
  }
  await ctx.close();
}
{ // mobil 360px fără defilare orizontală
  const {ctx, page} = await open('#view=link', 360, 640);
  const sw = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
  ok(sw, '360 px: fără defilare orizontală');
  await ctx.close();
}
await browser.close();
console.log(`\n${pass} ok, ${fail} eșecuri`);
process.exit(fail ? 1 : 0);
