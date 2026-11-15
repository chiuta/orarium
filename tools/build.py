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
# Modulele comune (<script id="fff-mod-...">, ex. fff-texturi) sunt injectate în index.html de uneltele comune (inject-shared.mjs), nu construite din src/:
# se preiau neschimbate din index.html comis, după blocul fff:info, ca o reconstrucție (și verificarea CI „index.html e actual”) să nu le piardă; hash-urile CSP se calculează mai jos.
_prev = os.path.join(root, 'index.html')
_mods = ''.join(m.group(0) for m in re.finditer(r'<script id="fff-mod-[a-z0-9-]+">[\s\S]*?</script>\n?', open(_prev, encoding='utf-8').read())) if os.path.exists(_prev) else ''
_at = max(out.find('<!--fff:info:end-->'), out.find('<!--fff:kit:end-->'))
if _mods and _at >= 0:
    _at = out.index('\n', _at) + 1
    out = out[:_at] + _mods + out[_at:]
_sc = [b for a, b in re.findall(r'<script(?![^>]*\bsrc=)([^>]*)>(.*?)</script>', out, flags=re.S) if 'json' not in a]
_csp = "default-src 'none'; script-src " + ' '.join(_h(x) for x in _sc) + "; style-src 'unsafe-inline'; img-src data: blob:; worker-src blob:; connect-src 'none'; base-uri 'none'; form-action 'none'"
assert out.count('<!--CSP-->') == 1
out = out.replace('<!--CSP-->', '<meta http-equiv="Content-Security-Policy" content="' + _csp + '">')
open(os.path.join(root, 'index.html'), 'w', encoding='utf-8').write(out)
print('index.html written,', len(d), 'languages')
