#!/usr/bin/env python3
"""Verificare fără fff-kit: src/template.html + src/i18n/tr_*.json (cum le asamblează build.py) == index.html,
ignorând doar metaeticheta CSP (generată de build.py/pwa.mjs/fixcsp). Nu scrie nimic. Cod de ieșire 1 dacă derivă."""
import glob, json, os, re, sys
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
t = open(os.path.join(root, 'src', 'template.html'), encoding='utf-8').read()
d = {}
for p in sorted(glob.glob(os.path.join(root, 'src', 'i18n', 'tr_*.json'))):
    d[os.path.basename(p)[3:-5]] = json.load(open(p, encoding='utf-8'))
js = json.dumps(d, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
assert t.count('/*__DICT__*/{}') == 1
built = t.replace('/*__DICT__*/{}', js)
idx = open(os.path.join(root, 'index.html'), encoding='utf-8').read()
def csp(s):  # ignoră ce generează uneltele: CSP, blocul fff-info (sha256/dimensiune) și data-fff-hash
    s = re.sub(r'<meta http-equiv="Content-Security-Policy"[^>]*>|<!--CSP-->', '', s)
    s = re.sub(r'<script type="application/json" id="fff-info">.*?</script>', '', s, flags=re.S)
    return re.sub(r'\sdata-fff-hash="[0-9a-f]*"', '', s)
if csp(built) != csp(idx):
    a, b = csp(built), csp(idx); i = next((k for k in range(min(len(a), len(b))) if a[k] != b[k]), min(len(a), len(b)))
    print('src/template.html + i18n nu corespund lui index.html (prima diferență la caracterul %d: %r vs %r)' % (i, a[i:i+60], b[i:i+60])); sys.exit(1)
print('src/template.html + i18n corespund lui index.html (CSP ignorat)')
