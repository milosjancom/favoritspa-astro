// @ts-check
import { defineConfig } from 'astro/config';

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
});
