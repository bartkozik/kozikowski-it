import type { CardPosition } from './board-layout';

export interface CardPreset extends CardPosition {
  readonly slug: string;
  readonly width: number;
  readonly imageRatio: number;
}

export const cardPresets: readonly CardPreset[] = [
  { slug: 'epoca-landing-page', width: 430, imageRatio: 4 / 3, x: 909, y: 425, rotation: 0.95 },
  { slug: 'liquid-editions', width: 586, imageRatio: 1, x: 0, y: 532, rotation: -1.01 },
  { slug: 'fanimani', width: 430, imageRatio: 2 / 3, x: 48, y: 34, rotation: -4.07 },
  { slug: 'accounting-ui-prototype', width: 586, imageRatio: 1.5, x: 419, y: 67, rotation: 10.48 },
  { slug: 'art-network', width: 430, imageRatio: 0.75, x: 561, y: 0, rotation: 7.41 },
  { slug: 'epoca', width: 430, imageRatio: 4 / 3, x: 292, y: 347, rotation: 8.8 },
  { slug: 'ad-template-platform', width: 586, imageRatio: 2, x: 490, y: 583, rotation: 1.15 },
  { slug: 'board-dev', width: 430, imageRatio: 4 / 3, x: 903, y: 101, rotation: -6.17 },
  { slug: 'celina', width: 430, imageRatio: 4 / 3, x: 886, y: 824, rotation: 4.2 },
  { slug: 'pm-traffic-manager', width: 586, imageRatio: 1.5, x: 90, y: 835, rotation: -3.2 },
];
