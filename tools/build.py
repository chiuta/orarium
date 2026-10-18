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
open(os.path.join(root, 'index.html'), 'w', encoding='utf-8').write(t.replace('/*__DICT__*/{}', js))
print('index.html written,', len(d), 'languages')
