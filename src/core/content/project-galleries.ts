import celinaMarketsImage from '../../../public/projects/celina-industries.webp';

import type { ProjectVisual } from './project-visuals';

const galleries: Readonly<Partial<Record<string, readonly ProjectVisual[]>>> = {
  celina: [
    {
      ...celinaMarketsImage,
      alt: 'CELINA Markets page presenting the industries served by the company',
    },
  ],
};

export function getProjectGallery(slug: string): readonly ProjectVisual[] {
  return galleries[slug] ?? [];
}
