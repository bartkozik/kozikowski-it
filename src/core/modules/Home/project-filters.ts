export type Arrangement = 'original' | 'loved' | 'painful' | 'shuffle';

export const projectFilters = {
  loved: ['epoca', 'board-dev', 'pm-traffic-manager'],
  painful: ['ad-template-platform', 'art-network'],
} satisfies Record<string, readonly string[]>;

export function nextArrangement(current: Arrangement, requested: Arrangement): Arrangement {
  return (requested === 'loved' || requested === 'painful') && current === requested ? 'original' : requested;
}

export function isProjectVisible(slug: string, arrangement: Arrangement): boolean {
  return arrangement === 'original' || arrangement === 'shuffle' || projectFilters[arrangement].includes(slug);
}
