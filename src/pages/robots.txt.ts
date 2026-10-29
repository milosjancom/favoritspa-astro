// robots.txt follows the SEO switch in src/data/seo.ts.
import type { APIRoute } from 'astro';
import { seoLive } from '../data/seo';

export const GET: APIRoute = ({ site }) => {
  const body = seoLive
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site)}\n`
    : `# Preview build: not for search engines.\nUser-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
