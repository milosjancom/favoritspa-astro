// Sitemap with hreflang alternates for every language version.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { available, hasGuide, meta, url, type Lang, type RouteKey } from '../i18n';

export const GET: APIRoute = async ({ site }) => {
  const products = await getCollection('products');
  const keys: RouteKey[] = ['models', 'features', 'about', 'why' as RouteKey, 'control' as RouteKey, 'brochure' as RouteKey, 'support', 'docs', 'contact', 'quote', 'maintenance', 'gallery', 'reviews', 'faq', 'terms', 'privacy' as RouteKey];
  const pages: { langs: readonly Lang[]; at: (l: Lang) => string }[] = [
    { langs: available, at: (l) => url(l) },
    ...keys.map((k) => ({ langs: available, at: (l: Lang) => url(l, k) })),
    ...products.map((p) => ({ langs: available, at: (l: Lang) => url(l, 'models', p.data.slug) })),
    { langs: available.filter(hasGuide), at: (l: Lang) => url(l, 'guide' as RouteKey) },
  ];
  const abs = (p: string) => new URL(p, site).toString();
  const body = pages.flatMap((pg) => pg.langs.map((l) => `  <url><loc>${abs(pg.at(l))}</loc>${pg.langs.map((a) => `<xhtml:link rel="alternate" hreflang="${meta(a).hreflang}" href="${abs(pg.at(a))}"/>`).join('')}</url>`)).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`, { headers: { 'Content-Type': 'application/xml' } });
};
