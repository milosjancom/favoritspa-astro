// SEO switch. Default is "preview": every page says noindex, robots.txt blocks all crawlers,
// and no redirects are written, so a preview copy can never compete with the live favoritspa.com.
// Build with `npm run build:live` (SEO_MODE=live) only for the launch on the real domain.
export const seoMode: 'preview' | 'live' = process.env.SEO_MODE === 'live' ? 'live' : 'preview';
export const seoLive = seoMode === 'live';
