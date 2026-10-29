// Customer installations from the legacy gallery (img/galerija/26).
// Model tags are a visual match from the photos; check and correct before launch.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/installs/*.jpg', { eager: true });
const img = (n: string) => files[`../assets/installs/${n}.jpg`].default;

const tagged: Record<string, string[]> = {
  eden: ['46', '50', '52'],
  point: ['24', '25', '41'],
  fusion: ['17', '32'],
};
const general = ['01', '04', '10', '06', '15', '19', '11', '27', '30', '20', '43', '22', '31', '35', '53', '07'];

export type Install = { src: ImageMetadata; own: boolean };
export const installsFor = (slug: string, order: number, count = 9): Install[] => {
  const own = (tagged[slug] ?? []).map((n) => ({ src: img(n), own: true }));
  const start = (order * 3) % general.length;
  const rest = [...general.slice(start), ...general.slice(0, start)].slice(0, Math.max(0, count - own.length)).map((n) => ({ src: img(n), own: false }));
  return [...own, ...rest];
};
// Every installation photo, own model photos first; for the reviews page.
export const allInstalls = () => [...new Set([...Object.values(tagged).flat(), ...general])].map(img);
