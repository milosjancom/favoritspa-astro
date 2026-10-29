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
