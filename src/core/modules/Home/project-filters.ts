import type { ProjectSlug } from '../../content/projects.ts';

export type Arrangement = 'original' | 'loved' | 'painful' | 'shuffle';

export const projectFilters: Record<'loved' | 'painful', readonly ProjectSlug[]> = {
  loved: ['epoca', 'board-dev', 'pm-traffic-manager'],
  painful: ['ad-template-platform', 'art-network'],
} satisfies Record<string, readonly ProjectSlug[]>;

export function nextArrangement(current: Arrangement, requested: Arrangement): Arrangement {
  if (requested === 'shuffle' && (current === 'loved' || current === 'painful')) return current;
  return (requested === 'loved' || requested === 'painful') && current === requested ? 'original' : requested;
}

export function isProjectVisible(slug: string, arrangement: Arrangement): boolean {
  return (
    arrangement === 'original' ||
    arrangement === 'shuffle' ||
    projectFilters[arrangement].some((project) => project === slug)
  );
}

export type ProjectFilter = 'loved' | 'painful';

interface FilterState {
  readonly arrangement: Arrangement;
  readonly preview: ProjectFilter | null;
}

type FilterAction =
  { type: 'preview'; filter: ProjectFilter } | { type: 'leave' } | { type: 'select'; arrangement: Arrangement };

export const initialFilterState: FilterState = { arrangement: 'original', preview: null };

export function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'preview':
      return { ...state, preview: action.filter };
    case 'leave':
      return state.preview === null ? state : { ...state, preview: null };
    case 'select':
      return { arrangement: nextArrangement(state.arrangement, action.arrangement), preview: null };
  }
}
