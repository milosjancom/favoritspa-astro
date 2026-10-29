# Make a host-agnostic copy of dist/: relative URLs, explicit index.html, woff2 only.
import os, re, shutil, posixpath, sys
SRC, OUT = sys.argv[1], sys.argv[2]
shutil.rmtree(OUT, ignore_errors=True); shutil.copytree(SRC, OUT)
for root, _, files in os.walk(OUT):
    for f in files:
        if f.endswith('.woff'): os.remove(os.path.join(root, f))
def rel(url, here):
    if not url.startswith('/') or url.startswith('//'): return url
    path, sep, rest = re.match(r'([^?#]*)([?#]?)(.*)', url).groups()
    if path.endswith('/'): path += 'index.html'
    r = posixpath.relpath(path, here)
    return r + (sep + rest if sep else '')
for root, _, files in os.walk(OUT):
    for f in files:
        if not f.endswith('.html'): continue
        p = os.path.join(root, f); here = '/' + posixpath.relpath(root, OUT).replace('.', '') if root != OUT else '/'
        here = '/' + os.path.relpath(root, OUT) if root != OUT else '/'
        s = open(p, encoding='utf-8').read()
        s = re.sub(r',url\([^)]*\.woff\)format\("woff"\)', '', s)
        s = re.sub(r'(\s(?:href|src|action)=")([^"]*)"', lambda m: m.group(1) + rel(m.group(2), here) + '"', s)
        s = re.sub(r'(\ssrcset=")([^"]*)"', lambda m: m.group(1) + ', '.join(' '.join([rel(x.split()[0], here)] + x.split()[1:]) for x in m.group(2).split(',')) + '"', s)
        s = re.sub(r'url\((/[^)]+)\)', lambda m: 'url(' + rel(m.group(1), here) + ')', s)
        # canonical / og stay absolute; restore canonical (it was absolute already)
        open(p, 'w', encoding='utf-8').write(s)
n = sum(len(fs) for _, _, fs in os.walk(OUT)); print('files', n)
