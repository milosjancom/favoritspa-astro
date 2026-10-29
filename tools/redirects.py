"""Build seo/redirects.csv: every URL of the old favoritspa.com mapped to its page on the new site.

Input:  seo/old-urls.txt (crawled from the live site) and src/i18n/locales/*.json (new slugs).
Output: seo/redirects.csv with old,new,status. Rows where old == new are kept (status "same")
        so the table documents every old URL; only "301" rows become redirects.

Run:    python3 tools/redirects.py
"""
import csv, json, pathlib, sys, urllib.parse

ROOT = pathlib.Path(__file__).resolve().parent.parent
locales = {p.stem: json.load(open(p, encoding="utf-8")) for p in (ROOT / "src/i18n/locales").glob("*.json")}
models = {"zen", "eden", "pearl", "garden", "fusion", "melody", "point"}

# Old site slugs per language that differ from the new ones (crawled 29 Oct 2026).
OLD = {
    "en": {"jacuzzi-spa-tubs": "models", "functions": "features", "galerija": "gallery", "recenzije": "reviews",
           "about-us": "about", "general-terms-of-business": "terms"},
    "hu": {"jacuzzi-spa-kadi": "models", "funksiok": "features", "galerija": "gallery", "recenzije": "reviews",
           "karbantartás": "maintenance", "kerdesek-es-valaszok": "faq", "altalanos-szerzodesi-feltetelek": "terms"},
    "de": {"whirlpool-spa-badewannen": "models", "funktionen": "features", "galerija": "gallery", "recenzije": "reviews",
           "fragen-und-antworten": "faq", "uber-uns": "about", "allgemeine-geschaftsbedingungen": "terms"},
    "sl": {"jacuzzi-spa-kadi": "models", "funkcije": "features", "recenzije": "reviews",
           "vprasanja-in-odgovori": "faq", "splosni-pogoji-poslovanja": "terms"},
    "ba": {"djakuzi-spa-kade-i-cene": "models"},
    "hr": {"djakuzi-spa-kade-i-cene": "models"},
    "me": {"djakuzi-spa-kade-i-cene": "models"},
    "al": {"xhakuzi-vaska-spa-dhe-cmime": "models", "funksionet": "features", "galerija": "gallery", "recenzije": "reviews",
           "pyetjet-dhe-pergjigjet": "faq", "kontakti": "contact", "kushtet-e-pergjithshme-te-biznesit": "terms"},
}

# Old PDF links: per-model technical drawings and the old brochure (now sent by e-mail from the catalogue page).
FILES = {f"/download/{m}.pdf": f"/download/{m}-tehnicki-crtez.pdf" for m in models}
FILES["/download/tehnicki-crtez-point.pdf"] = "/download/point-tehnicki-crtez.pdf"
FILES["/download/favorit-spa.brochure-2023.pdf"] = "/sr/katalog/"


def new_url(lang, key=None, slug=None):
    r = locales[lang]["routes"].get(key, locales["en"]["routes"].get(key)) if key else None
    return f"/{lang}/" + (f"{r}/" if r else "") + (f"{slug}/" if slug else "")


def map_path(path):
    if path in FILES:
        return FILES[path]
    parts = [urllib.parse.unquote(p) for p in path.strip("/").split("/") if p]
    if not parts:
        return "/"
    lang = parts[0]
    if lang not in locales:
        return None
    if len(parts) == 1:
        return f"/{lang}/"
    by_slug = {v: k for k, v in locales[lang]["routes"].items()}
    key = OLD.get(lang, {}).get(parts[1]) or by_slug.get(parts[1])
    if not key:
        return None
    slug = parts[2] if len(parts) > 2 and parts[2] in models else None
    return new_url(lang, key, slug)


rows, missing = [], []
for line in (ROOT / "seo/old-urls.txt").read_text(encoding="utf-8").splitlines():
    old = line.split(" ")[0].strip()
    if not old:
        continue
    new = map_path(old)
    if new is None:
        missing.append(old)
        continue
    rows.append((old, new, "same" if urllib.parse.unquote(old) == new else "301"))
for old, new in FILES.items():
    rows.append((old, new, "301"))

with open(ROOT / "seo/redirects.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["old", "new", "status"])
    w.writerows(rows)

print(f"{len(rows)} rows, {sum(r[2] == '301' for r in rows)} redirects, {sum(r[2] == 'same' for r in rows)} unchanged")
if missing:
    print("NOT MAPPED:", *missing, sep="\n  ")
    sys.exit(1)
