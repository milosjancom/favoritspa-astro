// @ts-check
import { defineConfig } from 'astro/config';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Writes dist/.htaccess for Apache hosting (Loopia).
// Preview (default): only an X-Robots-Tag noindex header, which also covers PDFs and images.
// Live (SEO_MODE=live): 301 redirects from the old site's URLs, taken from seo/redirects.csv.
function htaccess() {
  return {
    name: 'favoritspa-htaccess',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const live = process.env.SEO_MODE === 'live';
        const out = ['# Generated at build time by astro.config.mjs. Edit seo/redirects.csv, not this file.', ''];
        if (!live) {
          out.push('# Preview build: keep every file out of search engines.');
          out.push('<IfModule mod_headers.c>', '  Header set X-Robots-Tag "noindex, nofollow"', '</IfModule>');
        } else {
          const rows = readFileSync(new URL('./seo/redirects.csv', import.meta.url), 'utf8')
            .trim().split(/\r?\n/).slice(1).map((l) => l.split(','))
            .filter(([, , status]) => status === '301');
          const esc = (p) => decodeURIComponent(p).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\/$/, '');
          out.push('# Old favoritspa.com URLs -> new pages (permanent).', '<IfModule mod_alias.c>');
          for (const [from, to] of rows) out.push(`  RedirectMatch 301 "^${esc(from)}/?$" "${to}"`);
          out.push('</IfModule>');
        }
        writeFileSync(fileURLToPath(new URL('.htaccess', dir)), out.join('\n') + '\n');
      },
    },
  };
}

export default defineConfig({
  site: 'https://www.favoritspa.com',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sr', 'hr', 'ba', 'me', 'sl', 'hu', 'de', 'al', 'sv', 'el'],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  image: { responsiveStyles: false },
  integrations: [htaccess()],
});
