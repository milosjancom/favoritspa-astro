// Languages, localized URLs and interface strings. English is the default.
// All texts live in ./locales/<code>.json; the URL prefix is the code (legacy prefixes kept: ba, me, al).
import en from './locales/en.json';

type Locale = typeof en;
const files = import.meta.glob<Locale>('./locales/*.json', { eager: true, import: 'default' });

// Order of the language menu.
export const langs = ['en', 'sr', 'hr', 'ba', 'me', 'sl', 'hu', 'de', 'al', 'sv', 'el'] as const;
export type Lang = (typeof langs)[number];
export const defaultLang: Lang = 'en';

const loc = (lang: Lang): Locale => files[`./locales/${lang}.json`] ?? en;
export const locale = loc;
export const available = langs.filter((l) => files[`./locales/${l}.json`]);
export const meta = (lang: Lang) => loc(lang).meta;
export const langNames = Object.fromEntries(langs.map((l) => [l, loc(l).meta.name])) as Record<Lang, string>;

export type RouteKey = keyof Locale['routes'];
export const route = (lang: Lang, key: RouteKey) => loc(lang).routes[key] ?? en.routes[key];
export const url = (lang: Lang, key?: RouteKey, slug?: string) =>
  `/${lang}/` + (key ? `${route(lang, key)}/` : '') + (slug ? `${slug}/` : '');
// The same page in every language, for the language switch and hreflang.
export const alts = (key?: RouteKey, slug?: string) =>
  Object.fromEntries(available.map((l) => [l, url(l, key, slug)])) as Record<Lang, string>;

type UI = Locale['ui'];
// Missing keys fall back to English, so a partly translated locale still builds.
export const t = (lang: Lang) => <K extends keyof UI>(key: K): UI[K] & any => (loc(lang).ui as any)[key] ?? (en.ui as any)[key];
export const persons = (lang: Lang) => (n: number) => {
  const forms = loc(lang).persons as Record<string, string>;
  const cat = new Intl.PluralRules(loc(lang).meta.locale).select(n);
  return (forms[cat] ?? forms.other).replace('{n}', String(n));
};
export const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ''));
export const isLang = (x: unknown): x is Lang => langs.includes(x as Lang);

// The user guide exists in English and Serbian; other languages link to the English one.
export const hasGuide = (lang: Lang) => !!(loc(lang) as any).guide;
export const guideUrl = (lang: Lang) => (hasGuide(lang) ? url(lang, 'guide' as RouteKey) : url('en', 'guide' as RouteKey));
