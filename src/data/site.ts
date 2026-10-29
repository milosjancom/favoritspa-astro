export const company = {
  name: 'Favorit DOO',
  brand: 'Favorit SPA',
  street: 'Borivoja Jevtića bb',
  city: 'Šabac',
  country: 'Srbija',
  email: 'sales@favoritspa.com',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Favorit+SPA+Borivoja+Jevti%C4%87a+%C5%A0abac',
  // The PDF is never linked on the site: visitors leave an e-mail and get the link by mail (lead capture).
  catalogPdf: 'https://www.favoritspa.com/download/favorit-spa.brochure-2023.pdf',
  // POST endpoint that stores the address and sends the catalogue link (e.g. Omnisend or Brevo form/automation). Empty in the preview.
  leadEndpoint: '',
  legacy: 'https://www.favoritspa.com',
  phones: [
    { key: 'Serbia', country: 'Srbija', display: '+381 62 800 12 12', short: '062 800 12 12', tel: '+381628001212' },
    { key: 'Montenegro', country: 'Crna Gora', display: '+382 68 37 10 10', tel: '+38268371010' },
    { key: 'Bosnia', country: 'Bosna i Hercegovina', display: '+387 65 200 105', tel: '+38765200105' },
    { key: 'Croatia', country: 'Hrvatska', display: '+385 91 924 77 27', tel: '+385919247727' },
  ],
};

export const lines = {
  'Effect line': { key: 'effect', label: 'Effect line' },
  'Midl line': { key: 'midl', label: 'Midl line' },
  'Entry line': { key: 'entry', label: 'Entry line' },
} as const;

import { meta, type Lang } from '../i18n';
const fmt = new Map<string, Intl.NumberFormat>();
export const euro = (n: number, lang: Lang = 'sr') => {
  const loc = meta(lang).locale;
  if (!fmt.has(loc)) fmt.set(loc, new Intl.NumberFormat(loc, { style: 'currency', currency: 'EUR', currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0 }));
  return fmt.get(loc)!.format(n).replace(/\u00a0/g, '\u00a0');
};
