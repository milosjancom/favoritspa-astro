// Features page content, grouped by theme. Images live in src/assets/features.
import spaControl from '../assets/features/spa-control.jpg';
import online from '../assets/features/online-app.jpg';
import hydroPump from '../assets/features/hydro-pump.jpg';
import aeroPump from '../assets/features/aero-pump.jpg';
import jets from '../assets/features/aero-jets.jpg';
import circPump from '../assets/features/circular-pump.jpg';
import inclear from '../assets/features/clear-chemical.jpg';
import ozone from '../assets/features/ozone-generator.jpg';
import filter from '../assets/features/antibacterial-filter.jpg';
import uv from '../assets/features/spa-uv-lamp.jpg';
import water from '../assets/features/water-quality.jpg';
import heater from '../assets/features/spa-heater.jpg';
import insulation from '../assets/features/spa-insulation.jpg';
import cover from '../assets/features/thermal-covering.jpg';
import tarp from '../assets/features/tarpaulin.jpg';
import frame from '../assets/features/spa-bearing.jpg';
import cladding from '../assets/features/spa-coating.jpg';
import stairs from '../assets/features/stairs.jpg';
import led from '../assets/features/smart-led-light.jpg';
import aroma from '../assets/features/aromatherapy.jpg';
import sound from '../assets/features/sound-system.jpg';
import service from '../assets/features/service-max.jpg';

import { locale, type Lang } from '../i18n';
export type Feature = { id: string; icon: string; img: ImageMetadata; cover?: boolean }; // cover: photo fills the frame edge to edge
export type Group = { id: string; icon: string; items: Feature[] };
export const featureText = (lang: Lang, id: string): { t: string; d: string } => (locale(lang) as any).features?.[id] ?? (locale('en') as any).features[id];
export const groupName = (lang: Lang, id: string): string => (locale(lang) as any).featureGroups?.[id] ?? (locale('en') as any).featureGroups[id];

export const featureGroups: Group[] = [
  {
    id: 'control', icon: 'sliders-horizontal',
    items: [
      { id: 'spa-control', icon: 'cpu', img: spaControl, },
      { id: 'online', icon: 'device-mobile', img: online, cover: true },
    ],
  },
  {
    id: 'massage', icon: 'waves',
    items: [
      { id: 'hydro-pump', icon: 'fan', img: hydroPump, },
      { id: 'aero-pump', icon: 'wind', img: aeroPump, },
      { id: 'jets', icon: 'waves', img: jets, },
    ],
  },
  {
    id: 'water', icon: 'drop-half',
    items: [
      { id: 'circulation', icon: 'arrows-clockwise', img: circPump, cover: true },
      { id: 'inclear', icon: 'drop', img: inclear, },
      { id: 'ozone', icon: 'atom', img: ozone, },
      { id: 'filter', icon: 'funnel', img: filter, },
      { id: 'uv', icon: 'sun', img: uv, },
      { id: 'water', icon: 'flask', img: water, },
    ],
  },
  {
    id: 'warmth', icon: 'thermometer-simple',
    items: [
      { id: 'heater', icon: 'thermometer-hot', img: heater, },
      { id: 'insulation', icon: 'snowflake', img: insulation, cover: true },
      { id: 'cover', icon: 'umbrella-simple', img: cover },
      { id: 'tarp', icon: 'cloud-rain', img: tarp, cover: true },
    ],
  },
  {
    id: 'build', icon: 'cube',
    items: [
      { id: 'frame', icon: 'cube', img: frame, cover: true },
      { id: 'cladding', icon: 'wall', img: cladding, cover: true },
      { id: 'stairs', icon: 'stairs', img: stairs, },
    ],
  },
  {
    id: 'experience', icon: 'sparkle',
    items: [
      { id: 'led', icon: 'lightbulb', img: led, cover: true },
      { id: 'aroma', icon: 'flower-lotus', img: aroma, },
      { id: 'sound', icon: 'speaker-high', img: sound, },
    ],
  },
  {
    id: 'service', icon: 'lifebuoy',
    items: [
      { id: 'service', icon: 'clock', img: service, cover: true },
    ],
  },
];
