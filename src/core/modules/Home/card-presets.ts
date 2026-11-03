import type { ProjectSlug } from '../../content/projects.ts';
import type { CardPosition } from './board-layout';

export interface CardPreset extends CardPosition {
  readonly slug: ProjectSlug;
  readonly width: number;
  readonly imageRatio: number;
}

const cardLayouts = {
  'epoca-landing-page': { width: 430, imageRatio: 4 / 3, x: 909, y: 425, rotation: 0.95 },
  'liquid-editions': { width: 586, imageRatio: 1, x: 0, y: 532, rotation: -1.01 },
  fanimani: { width: 430, imageRatio: 2 / 3, x: 48, y: 34, rotation: -4.07 },
  'accounting-ui-prototype': { width: 586, imageRatio: 1.5, x: 419, y: 67, rotation: 10.48 },
  'art-network': { width: 430, imageRatio: 0.75, x: 561, y: 0, rotation: 7.41 },
  epoca: { width: 430, imageRatio: 4 / 3, x: 292, y: 347, rotation: 8.8 },
  'ad-template-platform': { width: 586, imageRatio: 2, x: 490, y: 583, rotation: 1.15 },
  'board-dev': { width: 430, imageRatio: 4 / 3, x: 903, y: 101, rotation: -6.17 },
  celina: { width: 430, imageRatio: 4 / 3, x: 886, y: 824, rotation: 4.2 },
  'pm-traffic-manager': { width: 586, imageRatio: 1.5, x: 90, y: 835, rotation: -3.2 },
} satisfies Record<ProjectSlug, Omit<CardPreset, 'slug'>>;

export const cardPresets: readonly CardPreset[] = Object.entries(cardLayouts).map(([slug, layout]) => ({
  ...layout,
  slug: slug as ProjectSlug,
}));
