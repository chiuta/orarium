#!/usr/bin/env python3
"""Check every translation: same keys, non-empty, same {n} placeholders and same HTML tags as the Romanian source."""
import json, re, glob, os, sys
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
keys = json.load(open(os.path.join(root, 'src/i18n/keys.json'), encoding='utf-8'))
ph = lambda s: sorted(re.findall(r'\{\d+\}', s))
tg = lambda s: sorted(re.findall(r'<[^>]+>', s))
bad = 0
for f in sorted(glob.glob(os.path.join(root, 'src/i18n/tr_*.json'))):
    d = json.load(open(f, encoding='utf-8')); n = 0
    if set(d) != set(keys): n += 1; print(f, 'key set differs')
    for k, v in d.items():
        if k in keys and (not v.strip() or ph(k) != ph(v) or tg(k) != tg(v)): n += 1; print(os.path.basename(f), 'issue:', k[:60])
    print(os.path.basename(f), len(d), 'keys,', n, 'issues'); bad += n
sys.exit(1 if bad else 0)
