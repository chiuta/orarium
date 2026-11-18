// ORARIUM — teste de regresie din auditul comparativ (v2.3.3). Playwright, Chromium headless.
// Acoperă: ani 0001–0099 în convertor, limita obiectului Date, TT−UTC (tabelul secundelor intercalare + ΔT),
// PRODID din .ics, precesia în elevațiile stațiilor (valori de referință din astronomy-engine), numere recitibile în link,
// și CSP-ul care trebuie să lase service worker-ul, manifestul și icoanele să se încarce (verificat pe http://127.0.0.1).
// Rulare: node tests/regression.test.mjs   (cere playwright)
import {createRequire} from 'module';
import path from 'node:path';
import fs from 'node:fs';
import http from 'node:http';
import {fileURLToPath} from 'node:url';
const require = createRequire(process.env.PW_ROOT || import.meta.url);
const {chromium} = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..');
const APP = 'file://' + path.join(ROOT, 'index.html');
let pass = 0, fail = 0;
const ok = (c, n, i) => { if (c) { pass++; console.log('  ok   ' + n); } else { fail++; console.log('  FAIL ' + n + (i === undefined ? '' : ' ' + JSON.stringify(i).slice(0, 300))); } };
const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || process.env.CHROME || undefined, args: ['--no-sandbox']});
async function open(url, {block = true} = {}) {
  const ctx = await browser.newContext({viewport: {width: 1280, height: 800}, locale: 'en-US', timezoneId: 'UTC'});
  if (block) await ctx.route(/^https?:/, r => r.abort());
  const page = await ctx.newPage(), errs = [];
  page.on('pageerror', e => errs.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' && !/net::ERR|Failed to load resource/.test(m.text())) errs.push(m.text()); });
  await page.goto(url); await page.waitForTimeout(700);
  return {ctx, page, errs};
}

console.log('ORARIUM — regresii din auditul comparativ');

// 1) convertor: ani 0001–0099 (Date.UTC îi mapa la 1901–1999) și limita obiectului Date
{
  const {ctx, page, errs} = await open(APP);
  const conv = async (v, z) => page.evaluate(({v, z}) => { document.getElementById('cv-t').value = v; document.getElementById('cv-z').value = z; try { convCalc(); } catch (e) { return 'EXCEPȚIE: ' + e.message; } return document.getElementById('cv-out').innerText; }, {v, z});
  for (const [v, want] of [['0050-06-15T12:00', 'UTC: 0050-06-15 12:00:00'], ['0001-01-01T00:00', 'UTC: 0001-01-01 00:00:00'], ['0099-12-31T23:59', 'UTC: 0099-12-31 23:59:00'], ['0100-01-01T00:00', 'UTC: 0100-01-01 00:00:00']]) {
    const t = await conv(v, 'UTC');
    ok(t.includes(want), `an din 1–3 cifre/ani 0001–0100: ${v} → ${want}`, t.split('\n').find(l => l.startsWith('UTC')));
  }
  const t1 = await conv('0033-04-03T15:00', 'Asia/Jerusalem');
  ok(t1.includes('UTC: 0033-04-03 12:39:06'), 'fus cu LMT în anul 33 (Asia/Jerusalem, +2:20:54)', t1.split('\n').find(l => l.startsWith('UTC')));
  const t2 = await conv('1850-03-01T12:00', 'Europe/Bucharest');
  ok(t2.includes('UTC: 1850-03-01 10:15:36'), 'LMT București 1850 (+1:44:24)', t2.split('\n').find(l => l.startsWith('UTC')));
  const before = errs.length;
  const t3 = await conv('275760-09-13T00:00', 'America/Los_Angeles');
  ok(errs.length === before && !t3.startsWith('EXCEPȚIE') && !t3.includes('NaN') && t3.length > 5, 'anul 275760 (limita Date): fără excepție, cu mesaj', [errs.slice(before), t3.slice(0, 80)]);
  const t4 = await conv('275760-09-13T00:00', 'UTC');
  ok(errs.length === before && !t4.startsWith('EXCEPȚIE'), 'anul 275760 în UTC: fără excepție', [errs.slice(before), t4.slice(0, 60)]);
  await ctx.close();
}

// 2) TT − UTC
{
  const {ctx, page, errs} = await open(APP);
  const tt = async (iso) => page.evaluate(iso => ttUtc(Date.parse(iso)), iso);
  const cases = [['1972-01-01T00:00:00Z', 42.184], ['1972-07-01T00:00:00Z', 43.184], ['1980-01-01T00:00:00Z', 51.184], ['1999-01-01T00:00:00Z', 64.184], ['2005-12-31T23:59:59Z', 64.184], ['2006-01-01T00:00:00Z', 65.184], ['2012-06-30T23:59:59Z', 66.184], ['2012-07-01T00:00:00Z', 67.184], ['2016-12-31T23:59:59Z', 68.184], ['2017-01-01T00:00:00Z', 69.184], ['2026-11-18T12:00:00Z', 69.184], ['2100-01-01T00:00:00Z', 69.184]];
  for (const [iso, want] of cases) { const v = await tt(iso); ok(Math.abs(v - want) < 1e-9, `TT−UTC la ${iso} = ${want} s`, v); }
  const a = await tt('1971-12-31T23:59:59Z'); ok(Math.abs(a - 42.184) < 0.15, 'continuitate ΔT → tabel în ianuarie 1972', a);
  ok(Math.abs(await tt('1950-01-01T00:00:00Z') - 29.07) < 0.01, 'ΔT(1950) = 29,07 s (Espenak–Meeus)');
  ok(Math.abs(await tt('1900-01-01T00:00:00Z') + 2.79) < 0.01, 'ΔT(1900) = −2,79 s');
  const conv = await page.evaluate(() => { document.getElementById('cv-t').value = '1999-06-01T12:00'; document.getElementById('cv-z').value = 'UTC'; convCalc(); return document.getElementById('cv-out').innerText; });
  ok(/TT = UTC \+ 64\.184/.test(conv), 'convertorul arată TT = UTC + 64,184 s în 1999', conv.split('\n').find(l => l.startsWith('UTC')));
  ok(errs.length === 0, 'fără erori', errs);
  await ctx.close();
}

// 3) .ics: PRODID urmează versiunea aplicației; format RFC 5545 de bază
{
  const {ctx, page, errs} = await open(APP);
  const r = await page.evaluate(() => { const x = pairIcs(byId.terra, byId.marte, Date.UTC(2026, 10, 18)); return x ? {text: x.text, n: x.ev.length, v: document.querySelector('meta[name="application-version"]').content} : null; });
  ok(r && r.n > 0, 'pairIcs Pământ⇄Marte are evenimente');
  if (r) {
    ok(r.text.includes(`PRODID:-//fara frontiere//ORARIUM ${r.v}//RO\r\n`), 'PRODID = versiunea din meta application-version', [r.v, (/PRODID:.*/.exec(r.text) || [''])[0]]);
    const enc = new TextEncoder();
    const lines = r.text.split('\r\n');
    ok(lines[lines.length - 1] === '' && !/[^\r]\n/.test(r.text), 'linii terminate cu CRLF');
    ok(lines.every(l => enc.encode(l).length <= 75), 'nicio linie > 75 octeți');
    ok(/DTSTART:\d{8}T\d{6}Z/.test(r.text) && /UID:orarium-terra-marte-/.test(r.text), 'DTSTART în UTC și UID stabil');
  }
  ok(errs.length === 0, 'fără erori', errs);
  await ctx.close();
}

// 4) precesie: elevațiile stațiilor față de astronomy-engine (Equator ofdate + Horizon), la momente fixe
{
  const {ctx, page, errs} = await open(APP);
  const refs = [['marte', 44.43, 26.10, '2026-11-18T22:00:00Z', 5.883, 0.04], ['marte', 35.426, -116.890, '2035-03-02T03:30:00Z', -77.975, 0.04], ['marte', -35.402, 148.981, '2060-07-15T12:00:00Z', -77.192, 0.04], ['marte', 40.427, -4.249, '2099-12-01T18:45:00Z', 47.501, 0.04],
    ['venus', 44.43, 26.10, '2041-05-05T04:10:00Z', 28.373, 0.04], ['venus', 35.426, -116.890, '2080-09-09T09:09:00Z', -60.392, 0.04], ['luna', 44.43, 26.10, '2030-01-15T20:00:00Z', 66.694, 0.2], ['jupiter', 44.43, 26.10, '2026-12-01T21:00:00Z', 4.060, 0.1]];
  for (const [id, lat, lon, iso, want, tol] of refs) {
    const v = await page.evaluate(({id, lat, lon, iso}) => { LK.lat = lat; LK.lon = lon; const t = Date.parse(iso), g = linkGeom(byId[id], t); return stationEl(g.v, t); }, {id, lat, lon, iso});
    ok(Math.abs(v - want) < tol, `elevație ${id} @ ${lat},${lon} ${iso.slice(0, 10)}: ${v.toFixed(3)}° vs ${want}° (±${tol})`);
  }
  const n = await page.evaluate(() => { const v = precJ2000([0.3, -0.5, 0.8], Date.UTC(2090, 0, 1)); return Math.hypot(...v) - Math.hypot(0.3, -0.5, 0.8); });
  ok(Math.abs(n) < 1e-12, 'precesia păstrează norma vectorului', n);
  const id0 = await page.evaluate(() => { const v = precJ2000([0.3, -0.5, 0.8], Date.UTC(2000, 0, 1, 12) - 69.184e3 + 0); return v; });
  ok(Math.abs(id0[0] - 0.3) < 1e-6 && Math.abs(id0[1] + 0.5) < 1e-6 && Math.abs(id0[2] - 0.8) < 1e-6, 'la J2000 precesia e identitate', id0);
  ok(errs.length === 0, 'fără erori', errs);
  await ctx.close();
}

// 5) linkul unic: numere recitibile (fără notație exponențială) și t= doar de la anul 1 CE
{
  const {ctx, page, errs} = await open(APP);
  const r = await page.evaluate(() => {
    show('link'); document.getElementById('lk-m').value = '1e-7'; document.getElementById('lk-bla').value = '1e-7'; document.getElementById('lk-blo').value = '2e-9'; document.getElementById('mt-h1').value = '1e-7';
    const u = lnkBuild(); const h = u.slice(u.indexOf('#') + 1);
    const q = Object.fromEntries(h.split('&').map(x => x.split('=')));
    location.hash = '#t=0000-06-15T12:00Z'; lnkApply(); const tf = TFIX;
    return {h, q, tf};
  });
  ok(!/\d[eE][-+]?\d/.test(r.h), 'linkul nu conține notație exponențială', r.h);
  ok(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?,\d+(\.\d+)?$/.test(r.q.station), 'station=lat,lon,masca se poate recitit', r.q.station);
  ok(r.tf === null, 't= cu anul 0000 e ignorat', r.tf);
  ok(errs.length === 0, 'fără erori', errs);
  await ctx.close();
}

// 6) PWA: CSP-ul lasă manifestul, service worker-ul și icoanele să funcționeze (pe http://127.0.0.1, nu din file://)
{
  const types = {'.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png'};
  const srv = http.createServer((req, res) => {
    const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '/index.html'));
    if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, {'content-type': types[path.extname(f)] || 'application/octet-stream'}); fs.createReadStream(f).pipe(res);
  });
  await new Promise(r => srv.listen(0, '127.0.0.1', r));
  const port = srv.address().port;
  const {ctx, page, errs} = await open(`http://127.0.0.1:${port}/index.html`, {block: false});
  await page.waitForTimeout(2500);
  const r = await page.evaluate(async () => {
    const csp = document.querySelector('meta[http-equiv="Content-Security-Policy"]').content;
    const regs = await navigator.serviceWorker.getRegistrations();
    return {csp, n: regs.length, active: !!(regs[0] && (regs[0].active || regs[0].installing || regs[0].waiting)), pwa: document.documentElement.outerHTML.includes('fff:pwa:start')};
  });
  const dir = n => { const m = new RegExp('(?:^|;\\s*)' + n + '\\s+([^;]*)').exec(r.csp); return m ? m[1] : ''; };
  if (r.pwa) {
    ok(dir('worker-src').includes("'self'"), "CSP: worker-src conține 'self'", dir('worker-src'));
    ok(dir('manifest-src').includes("'self'"), "CSP: manifest-src conține 'self'", dir('manifest-src'));
    ok(dir('img-src').includes("'self'"), "CSP: img-src conține 'self'", dir('img-src'));
    ok(r.n === 1 && r.active, 'service worker-ul se înregistrează pe http://127.0.0.1', r);
  }
  ok(!errs.some(e => /Content Security Policy/i.test(e)), 'fără încălcări CSP în consolă', errs.filter(e => /Content Security Policy/i.test(e)));
  await ctx.close(); srv.close();
}

await browser.close();
console.log(`\n${pass} reușite, ${fail} eșuate`);
process.exit(fail ? 1 : 0);
