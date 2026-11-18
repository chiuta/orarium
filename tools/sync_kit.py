#!/usr/bin/env python3
"""Aduce sursa la zi după `node fff-kit/build.mjs release …`, care modifică direct index.html (bloc de kit, versiune, dată).

  1. blocul <!--fff:kit:start…--> … <!--fff:kit:end--> din index.html  →  src/template.html
  2. meta application-version / last-updated și textul din subsol („v X · AAAA-LL-ZZ”) din index.html  →  src/template.html
  3. rulează check_template.py (fără kit); check_fresh.py (cere hubul: FFF_HUB=<cale>) doar dacă FFF_HUB e setat.

Folosire (din orice director):  python3 tools/sync_kit.py
Fără el, verificarea CI „index.html corespunde sursei” cade la fiecare actualizare de kit."""
import os, re, subprocess, sys

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def rd(p):
    with open(os.path.join(root, p), encoding='utf-8') as f:
        return f.read()


def one(pattern, text, what, flags=0):
    m = list(re.finditer(pattern, text, flags))
    if len(m) != 1:
        sys.exit(f'sync_kit: {what}: se așteaptă exact o apariție, am găsit {len(m)}')
    return m[0]


page, tpl = rd('index.html'), rd('src/template.html')
S, E = '<!--fff:kit:start', '<!--fff:kit:end-->'
if page.count(S) != 1 or page.count(E) != 1 or tpl.count(S) != 1 or tpl.count(E) != 1:
    sys.exit('sync_kit: blocul de kit lipsește sau apare de mai multe ori (index.html / src/template.html)')
tpl = tpl[:tpl.index(S)] + page[page.index(S):page.index(E) + len(E)] + tpl[tpl.index(E) + len(E):]

for name in ('application-version', 'last-updated'):
    pat = r'<meta name="%s" content="([^"]*)">' % name
    val = one(pat, page, 'index.html ' + name).group(1)
    m = one(pat, tpl, 'src/template.html ' + name)
    tpl = tpl[:m.start()] + '<meta name="%s" content="%s">' % (name, val) + tpl[m.end():]
foot = r'(<span id="app-version"[^>]*>)v [0-9][0-9.]* · \d{4}-\d{2}-\d{2}(</span>)'
txt = one(r'<span id="app-version"[^>]*>(v [0-9][0-9.]* · \d{4}-\d{2}-\d{2})</span>', page, 'index.html: subsol').group(1)
m = one(foot, tpl, 'src/template.html: subsol')
tpl = tpl[:m.start()] + m.group(1) + txt + m.group(2) + tpl[m.end():]

with open(os.path.join(root, 'src', 'template.html'), 'w', encoding='utf-8') as f:
    f.write(tpl)
subprocess.run([sys.executable, os.path.join(root, 'tools', 'check_template.py')], check=True)
if os.environ.get('FFF_HUB'):
    subprocess.run([sys.executable, os.path.join(root, 'tools', 'check_fresh.py')], check=True)
