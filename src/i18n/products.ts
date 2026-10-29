// Product and equipment texts per language, read from the locale files.
import { locale, type Lang } from './index';

const L = (lang: Lang) => locale(lang) as any;
export const label = (lang: Lang, sr: string) => L(lang).labels?.[sr] ?? locale('en').labels[sr as keyof ReturnType<typeof locale>['labels']] ?? sr;
// Values come from the Serbian data: localize "cca", decimal commas and horsepower.
export const value = (lang: Lang, v: string) => {
  const x = L(lang).values;
  return v.replace(/^cca /, `${x.approx} `).replace(/(\d),(\d)/g, `$1${x.decimal}$2`).replace(/(\d)\s*ks\b/g, `$1 ${x.hp}`).replace(/  +/g, ' ');
};
const prod = (lang: Lang, slug: string) => L(lang).products?.[slug] ?? (locale('en') as any).products[slug];
export const tagline = (lang: Lang, slug: string, _sr?: string) => prod(lang, slug)?.tagline ?? '';
export const description = (lang: Lang, slug: string, _sr?: string) => prod(lang, slug)?.description ?? '';
export const claim = (lang: Lang, slug: string) => prod(lang, slug)?.claim ?? '';
export const upTo = (lang: Lang) => L(lang).values.upTo;

// Equipment rows grouped by theme. Unlisted labels fall into 'comfort'.
export const groupOrder = ['specs', 'massage', 'water', 'control', 'light', 'build', 'comfort', 'finish'] as const;
const groupOf: Record<string, (typeof groupOrder)[number]> = {
  'Broj mesta': 'specs', 'Sedeća mesta / Ležeća mesta': 'specs', 'Zapremina': 'specs', 'Težina': 'specs', 'Potrebna snaga': 'specs',
  'Temperaturni opseg upotrebe': 'specs', 'Materijal lica': 'specs',
  'Hidro pumpa 2ks (komada)': 'massage', 'Hidro pumpa 3ks (komada)': 'massage', 'Aero pumpa': 'massage', 'Hidro mlaznice (komada)': 'massage',
  'Aero mlaznice (komada)': 'massage', 'Aero mlaznice set': 'massage', 'Hidro mlaznice kombo (set)': 'massage', 'Magma mlaznice (4 komada)': 'massage',
  'Svetleće hidro mlaznice': 'massage', 'Svetleće mini mlaznice': 'massage',
  'Cirkulaciona pumpa': 'water', 'Ozonoterapija': 'water', 'Antibakterijski filter': 'water', 'UV lampa': 'water', 'Čist hemijski sistem': 'water',
  'Low water level': 'water', 'Drenažni ventil': 'water',
  'Elektronska kontrola': 'control', 'Kontrolni blok': 'control', 'SPA kontola GECKO IN.K.1000': 'control', 'Smartphone platforma': 'control',
  'Grejač': 'control', 'Dodatni grejač 3kW': 'control', 'Blue energy block': 'control', 'Termo ventilacija': 'control', 'Sigurnosno monofazno napajanje': 'control',
  'Pametno led svetlo': 'light', 'Led mini lampe': 'light', 'Visoko led svetlo': 'light', 'Hromoterapija': 'light', 'Zvučni sistem': 'light',
  'Music system': 'light', 'Aromaterapija': 'light',
  'Fiberglas omotač': 'build', 'Thermostron omotač': 'build', 'Parna membrana': 'build', 'Metal konstrukcija': 'build', 'SMF snažan metalni ram': 'build',
  'HDS okvir stiren visoke gustine': 'build', 'Polar izolacija 10mm': 'build', 'Polar izolacija 30mm': 'build',
  'Termo pokrivač': 'comfort', 'Cirada': 'comfort', 'Jastuk (set)': 'comfort', 'Stepenice': 'comfort', 'Servis 72h': 'comfort',
  'PURE-WHITE finish': 'finish', 'SILVER-PLATINUM finish': 'finish', 'PEARL-WHITE finish': 'finish', 'Termo-stone finish': 'finish',
};
export const group = (label: string) => groupOf[label] ?? 'comfort';

// Technology chips: equipment row -> feature on the Features page. Names come from locale "tech".
export const techMap: { labels: string[]; icon: string; feature: string }[] = [
  { labels: ['Elektronska kontrola'], icon: 'sparkle', feature: 'spa-control' },
  { labels: ['Smartphone platforma'], icon: 'wifi-high', feature: 'online' },
  { labels: ['Hidro pumpa 2ks (komada)', 'Hidro pumpa 3ks (komada)'], icon: 'waves', feature: 'hydro-pump' },
  { labels: ['Aero pumpa'], icon: 'waves', feature: 'aero-pump' },
  { labels: ['Ozonoterapija'], icon: 'drop', feature: 'ozone' },
  { labels: ['UV lampa'], icon: 'sun-horizon', feature: 'uv' },
  { labels: ['Čist hemijski sistem'], icon: 'drop', feature: 'inclear' },
  { labels: ['Antibakterijski filter'], icon: 'shield-check', feature: 'filter' },
  { labels: ['Polar izolacija 10mm', 'Polar izolacija 30mm', 'Thermostron omotač'], icon: 'thermometer-simple', feature: 'insulation' },
  { labels: ['Pametno led svetlo', 'Visoko led svetlo'], icon: 'sun-horizon', feature: 'led' },
  { labels: ['Aromaterapija'], icon: 'flower-lotus', feature: 'aroma' },
  { labels: ['Zvučni sistem', 'Music system'], icon: 'speaker-high', feature: 'sound' },
  { labels: ['Servis 72h'], icon: 'clock', feature: 'service' },
];
export const techName = (lang: Lang, feature: string) => L(lang).tech?.[feature] ?? (locale('en') as any).tech[feature];

// Icons for the package feature names (shown in the package panels).
const pkgIcons: Record<string, string> = {
  'Touch control': 'hand-tap', 'Smart Eco': 'leaf', 'Silent Work': 'ear-slash', 'Ozone generator': 'atom', 'Aromatherapy': 'flower-lotus',
  'Wips frame': 'cube', 'Sound system': 'speaker-high', 'Smart system': 'wifi-high', 'Smart LED light': 'lightbulb', 'SPA heater': 'thermometer-hot',
  'Hydro jets': 'waves', 'Aero jets': 'wind', 'Combo hydro jets': 'circles-three', 'Thermo covers': 'umbrella-simple', 'SPA UV lamp': 'sun',
  'Circulation pump': 'arrows-clockwise', 'Hydro pump': 'fan', 'Aero pump': 'fan', 'SPA water filter': 'funnel', 'Water quality': 'flask',
};
export const pkgIcon = (name: string) => pkgIcons[name] ?? 'check';
