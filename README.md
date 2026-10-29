# Favorit SPA — new site (Astro)

Static site. Output is plain HTML/CSS in `dist/`, deployable to any host.

    npm install
    npm run dev        # local dev server at http://localhost:4321/sr/
    npm run build      # production build into dist/

## Where things live
- `src/content/products/*.json` — one file per model: specs, packages, prices, images. Edit a price here and rebuild.
- `src/assets/` — source images (Astro converts them to WebP at build time).
- `src/pages/[lang]/` — pages; only `sr` is enabled in `src/i18n/ui.ts` for now.
- `src/data/site.ts` — company address, phones, e-mail.
- `tools/` — scripts used to extract content from the old site and to make the relative-path preview build.

## SEO switch (preview / live)
The build is in **preview** mode by default, so a copy on a test domain can never compete with the live favoritspa.com:

| | `npm run build` (preview, default) | `npm run build:live` (launch only) |
|---|---|---|
| `<meta name="robots">` | `noindex, nofollow` on every page | not set (indexable) |
| `robots.txt` | `Disallow: /` | `Allow: /` + sitemap link |
| `.htaccess` | `X-Robots-Tag: noindex` header (covers PDFs and images) | 301 redirects from every old URL |

Use `build:live` only when the new site replaces the old one on www.favoritspa.com.

- `seo/old-urls.txt` — every URL of the old site (crawled 29 Oct 2026, 154 pages + 8 PDFs).
- `seo/redirects.csv` — old → new for each of them; `same` rows keep their URL, `301` rows become redirects.
- `npm run redirects` regenerates the CSV after a slug changes in `src/i18n/locales/*.json`.
