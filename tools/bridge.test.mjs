// ORARIUM 1.2.0 — ↗ Bolta, export .ics, linkuri „acum” spre TerRa fără îngheț. Se copiază în orarium/tools/bridge.test.mjs
// Rulare: node tools/bridge.test.mjs   (Playwright din /opt/node-tools, rețea blocată, CSP real)
import {createRequire} from 'module';
import path from 'node:path';
import fs from 'node:fs';
import {fileURLToPath, pathToFileURL} from 'node:url';
const require = createRequire('/opt/node-tools/package.json');
const {chromium} = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const APP = pathToFileURL(path.resolve(HERE, '..', 'index.html')).href;
let fails = 0, passes = 0;
const check = (n, c, x) => { if (c) { passes++; console.log('  ok  ' + n); } else { fails++; console.log('FAIL  ' + n + (x !== undefined ? ' :: ' + JSON.stringify(x).slice(0, 400) : '')); } };
const browser = await chromium.launch({executablePath: '/opt/pw-browsers/chromium'});
const errs = [], net = [];
async function open(hash, opts = {}) {
  const ctx = await browser.newContext({viewport: {width: 1100, height: 900}, locale: 'ro-RO', acceptDownloads: true, ...opts});
  await ctx.route(/^https?:/, r => { net.push(r.request().url()); r.abort(); });
  const page = await ctx.newPage();
  page.on('pageerror', e => errs.push(String(e))); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await page.addInitScript(() => { window.__csp = []; document.addEventListener('securitypolicyviolation', e => window.__csp.push(e.violatedDirective)); });
  await page.goto(APP + hash); await page.waitForTimeout(900);
  return {page, ctx};
}
const hrefs = (page, sel) => page.$$eval(sel, a => a.map(x => x.getAttribute('href')));
// ---- 1) Bolta + TerRa „acum”: fără TFIX -> fără t=
let {page, ctx} = await open('#view=link&station=40.4270,-4.2490');
await page.evaluate(() => openDetail('terra')); await page.waitForTimeout(200);
let b = await hrefs(page, 'a[data-bolta]');
check('fișa Pământului: ↗ Bolta, ll rotunjit (2 zecimale), live (fără t=), from=orarium', b.length >= 1 && b[0] === 'https://chiuta.github.io/apps/Bolta/#sky&ll=40.43,-4.25&from=orarium', b);
let tr = await hrefs(page, 'a.tl.big:not([data-bolta])');
check('linkul „acum” spre TerRa nu îngheață ora (fără t=)', tr.length >= 1 && tr.every(h => !/[#&]t=/.test(h)), tr);
check('rel/target', await page.$$eval('a[data-bolta]', a => a.every(x => x.target === '_blank' && /noopener/.test(x.rel))));
await page.evaluate(() => closeDetail());
// panoul Pământ din Link view
b = await hrefs(page, '#lk-out [data-id="terra"] a[data-bolta]');
check('Link view, panoul Pământ: ↗ Bolta', b.length === 1 && /#sky&ll=40\.43,-4\.25&from=orarium$/.test(b[0]), b);
// href proaspăt la click: stația se schimbă fără reconstruirea panoului
await page.fill('#lk-sla', '35.426'); await page.fill('#lk-slo', '-116.89');
await page.dispatchEvent('#lk-out [data-id="terra"] a[data-bolta]', 'pointerdown');
check('href recalculat la pointerdown (stație nouă Goldstone)', (await hrefs(page, '#lk-out [data-id="terra"] a[data-bolta]'))[0].includes('ll=35.43,-116.89'), await hrefs(page, '#lk-out a[data-bolta]'));
// altă limbă
await page.selectOption('#lang-z', 'de'); await page.waitForTimeout(300);
check('titlul Bolta în germană', await page.$eval('#lk-out a[data-bolta]', a => /Planetarium Bolta/.test(a.title) && /Himmel/.test(a.textContent)), await page.$eval('#lk-out a[data-bolta]', a => a.textContent));
await ctx.close();
// ---- 2) TFIX: t= în Bolta; interval 1900–2100
({page, ctx} = await open('#view=link&t=2026-10-18T10:00:00Z&station=44.4300,26.1000'));
await page.evaluate(() => openDetail('terra'));
b = await hrefs(page, 'a[data-bolta]');
check('cu t fixat: #sky&t=…Z&ll=…', b[0] === 'https://chiuta.github.io/apps/Bolta/#sky&t=2026-10-18T10:00:00Z&ll=44.43,26.10&from=orarium', b);
tr = await hrefs(page, 'a.tl.big:not([data-bolta])');
check('cu t fixat: TerRa primește t=', tr.some(h => h.includes('t=2026-10-18T10:00:00Z')), tr);
await ctx.close();
({page, ctx} = await open('#view=link&t=2150-01-01T00:00:00Z'));
await page.evaluate(() => openDetail('terra'));
check('în afara 1900–2100: fără ↗ Bolta (ținta ar ignora t)', (await hrefs(page, 'a[data-bolta]')).length === 0);
await ctx.close();
// ---- 3) .ics
({page, ctx} = await open('#view=link&a=terra&b=marte&t=2026-10-18T10:00:00Z&station=40.4270,-4.2490'));
check('buton export vizibil pentru Pământ ⇄ Marte', await page.isVisible('#pk-ics'));
let t0 = Date.now();
const [dl] = await Promise.all([page.waitForEvent('download'), page.click('#pk-ics')]);
const ms = Date.now() - t0;
const name = dl.suggestedFilename(); const txt = fs.readFileSync(await dl.path(), 'utf8');
check('nume fișier orarium-terra-marte-AAAALLZZ.ics', /^orarium-terra-marte-\d{8}\.ics$/.test(name), name);
check('structură RFC 5545 (CRLF, BEGIN/END, VERSION, PRODID)', txt.startsWith('BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:') && txt.endsWith('END:VCALENDAR\r\n') && !/[^\r]\n/.test(txt));
const lines = txt.split('\r\n').slice(0, -1);
check('nicio linie > 75 octeți', lines.every(l => Buffer.byteLength(l) <= 75), lines.filter(l => Buffer.byteLength(l) > 75));
const unf = txt.replace(/\r\n /g, '');
const evs = unf.split('BEGIN:VEVENT\r\n').slice(1).map(e => Object.fromEntries(e.split('\r\n').filter(x => x.includes(':')).map(x => [x.slice(0, x.indexOf(':')), x.slice(x.indexOf(':') + 1)])));
check('cel puțin o fereastră + o întrerupere de conjuncție', evs.length >= 2 && evs.some(e => /^Fereastră de comunicare/.test(e.SUMMARY)) && evs.some(e => /^Conjuncție solară/.test(e.SUMMARY)), evs.map(e => e.SUMMARY));
check('maxim 21 de evenimente (20 ferestre + 1 întrerupere)', evs.length <= 21, evs.length);
check('DTSTART/DTEND în UTC (…Z), DTEND > DTSTART', evs.every(e => /^\d{8}T\d{6}Z$/.test(e.DTSTART) && /^\d{8}T\d{6}Z$/.test(e.DTEND) && e.DTEND > e.DTSTART), evs[0]);
check('UID-uri unice', new Set(evs.map(e => e.UID)).size === evs.length);
check('SUMMARY cu numele corpurilor', evs[0].SUMMARY.includes('Pământ') && evs[0].SUMMARY.includes('Marte'), evs[0].SUMMARY);
check('fără coordonatele stației în fișier (confidențialitate)', !/40\.4|4\.24|40,4/.test(txt));
// ferestrele din fișier = cele calculate de aplicație (a doua cale de calcul independentă de exportator)
const ref = await page.evaluate(() => { const a = byId.terra, b = byId.marte; readLK(); const w = winScan(t => pairOk(a, b, t), NOW(), 30, 20).filter(x => x.end !== null); return w.slice(0, 3).map(x => [new Date(x.start === null ? NOW() : x.start).toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z', new Date(x.end).toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z']); });
const wins = evs.filter(e => /^Fereastră/.test(e.SUMMARY));
check('primele 3 ferestre coincid cu winScan()', JSON.stringify(wins.slice(0, 3).map(e => [e.DTSTART, e.DTEND])) === JSON.stringify(ref), {ref, got: wins.slice(0, 3).map(e => [e.DTSTART, e.DTEND])});
check('export rapid (< 4 s)', ms < 4000, ms);
fs.writeFileSync('/tmp/orarium-test.ics', txt);   // pentru importul în Orar (pasul 5)
// limba de: SUMMARY în germană
await page.selectOption('#lang-z', 'de'); await page.waitForTimeout(300);
const [dl2] = await Promise.all([page.waitForEvent('download'), page.click('#pk-ics')]);
const t2 = fs.readFileSync(await dl2.path(), 'utf8');
check('SUMMARY în germană (Kommunikationsfenster: Erde ⇄ Mars)', /SUMMARY:Kommunikationsfenster: Erde ⇄ Mars/.test(t2.replace(/\r\n /g, '')), t2.split('\r\n').filter(l => l.startsWith('SUMMARY')).slice(0, 1));
// ---- 4) perechi fără sens: buton ascuns
await page.selectOption('#pk-b', 'terra'); await page.waitForTimeout(500);
check('Pământ ⇄ Pământ: fără buton', !(await page.isVisible('#pk-ics')));
await page.selectOption('#pk-a', 'phobos'); await page.selectOption('#pk-b', 'marte'); await page.waitForTimeout(500);
check('Phobos ⇄ Marte (același sistem): fără buton', !(await page.isVisible('#pk-ics')));
// pereche cu orizont lung
await page.selectOption('#pk-a', 'terra'); await page.selectOption('#pk-b', 'mercur'); await page.waitForTimeout(500);
t0 = Date.now(); const [dl3] = await Promise.all([page.waitForEvent('download'), page.click('#pk-ics')]); const t3 = Date.now() - t0;
const tx3 = fs.readFileSync(await dl3.path(), 'utf8');
check('Pământ ⇄ Mercur: export (orizont 400 zile) < 6 s și valid', t3 < 6000 && /BEGIN:VEVENT/.test(tx3), {t3});
await ctx.close();
check('0 pageerror/console error', errs.length === 0, errs);
check('0 cereri de rețea', net.length === 0, net);
await browser.close();
console.log(`\n${passes} reușite, ${fails} eșuate`); process.exit(fails ? 1 : 0);
