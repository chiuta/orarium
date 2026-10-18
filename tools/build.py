#!/usr/bin/env python3
"""Assemble index.html = src/template.html + translations (src/i18n/tr_*.json)."""
import json, glob, os
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
t = open(os.path.join(root, 'src', 'template.html'), encoding='utf-8').read()
d = {}
for p in sorted(glob.glob(os.path.join(root, 'src', 'i18n', 'tr_*.json'))):
    lang = os.path.basename(p)[3:-5]
    d[lang] = json.load(open(p, encoding='utf-8'))
js = json.dumps(d, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
assert t.count('/*__DICT__*/{}') == 1
out = t.replace('/*__DICT__*/{}', js)
# CSP: hash-uri sha256 pentru toate scripturile inline (calculate DUPĂ asamblare)
import re, hashlib, base64
def _h(x): return "'sha256-" + base64.b64encode(hashlib.sha256(x.encode('utf8')).digest()).decode() + "'"
_sc = re.findall(r'<script[^>]*>(.*?)</script>', out, flags=re.S)
_csp = "default-src 'none'; script-src " + ' '.join(_h(x) for x in _sc) + "; style-src 'unsafe-inline'; img-src data: blob:; worker-src blob:; connect-src 'none'; base-uri 'none'; form-action 'none'"
assert out.count('<!--CSP-->') == 1
out = out.replace('<!--CSP-->', '<meta http-equiv="Content-Security-Policy" content="' + _csp + '">')
open(os.path.join(root, 'index.html'), 'w', encoding='utf-8').write(out)
print('index.html written,', len(d), 'languages')
