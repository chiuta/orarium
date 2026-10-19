#!/usr/bin/env python3
"""CI: index.html comis = build.py(src) + blocul fff-info/data-fff-hash adăugat de `fff-kit info`.
Reconstruiește într-un fișier temporar, ignoră cele două elemente generate de kit și compară; nu modifică index.html."""
import os, re, shutil, subprocess, sys, tempfile
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
idx = os.path.join(root, 'index.html')
def norm(t):
    t = re.sub(r'\sdata-fff-hash="[0-9a-f]*"', '', t)
    t = re.sub(r'<!--fff:info:start-->.*?<!--fff:info:end-->\n?', '', t, flags=re.S)
    return t
committed = open(idx, encoding='utf-8').read()
backup = tempfile.mktemp()
shutil.copy(idx, backup)
try:
    subprocess.run([sys.executable, os.path.join(root, 'tools', 'build.py')], check=True, stdout=subprocess.DEVNULL)
    rebuilt = open(idx, encoding='utf-8').read()
finally:
    shutil.copy(backup, idx); os.remove(backup)
if norm(rebuilt) != norm(committed):
    print("index.html nu corespunde sursei: rulează 'python3 tools/build.py', apoi 'node fff-kit/build.mjs info . --slug orarium', și comite")
    sys.exit(1)
print("index.html corespunde sursei (fff-info ignorat)")
