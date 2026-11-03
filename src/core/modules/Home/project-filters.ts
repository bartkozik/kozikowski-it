import type { ProjectSlug } from '../../content/projects.ts';

export type Arrangement = 'original' | 'loved' | 'painful' | 'shuffle';

export const projectFilters: Record<'loved' | 'painful', readonly ProjectSlug[]> = {
  loved: ['epoca', 'board-dev', 'pm-traffic-manager'],
  painful: ['ad-template-platform', 'art-network'],
} satisfies Record<string, readonly ProjectSlug[]>;

export function nextArrangement(current: Arrangement, requested: Arrangement): Arrangement {
  return (requested === 'loved' || requested === 'painful') && current === requested ? 'original' : requested;
}

export function isProjectVisible(slug: string, arrangement: Arrangement): boolean {
  return (
    arrangement === 'original' ||
    arrangement === 'shuffle' ||
    projectFilters[arrangement].some((project) => project === slug)
  );
}
