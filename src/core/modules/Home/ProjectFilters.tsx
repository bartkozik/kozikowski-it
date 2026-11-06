import type { PointerEvent } from 'react';

import type { Arrangement, ProjectFilter } from './project-filters';

interface ProjectFiltersProps {
  readonly arrangement: Arrangement;
  readonly disabled: boolean;
  readonly onPreview: (event: PointerEvent<HTMLButtonElement>, filter: ProjectFilter) => void;
  readonly onPreviewEnd: () => void;
  readonly onSelect: (filter: ProjectFilter) => void;
}

const filters: readonly { value: ProjectFilter; label: string; title?: string }[] = [
  { value: 'original', label: 'All' },
  { value: 'loved', label: 'Most loved', title: 'EPOCA, Board.Dev and PM Traffic Manager' },
  { value: 'painful', label: 'Most painful', title: 'Ad Template Platform and Art Network' },
];

export function ProjectFilters({ arrangement, disabled, onPreview, onPreviewEnd, onSelect }: ProjectFiltersProps) {
  const selected = arrangement === 'shuffle' ? 'original' : arrangement;

  return filters.map(({ value, label, title }) => (
    <button
      key={value}
      type="button"
      aria-pressed={selected === value}
      title={title}
      disabled={disabled}
      onPointerEnter={(event) => onPreview(event, value)}
      onPointerLeave={onPreviewEnd}
      onPointerCancel={onPreviewEnd}
      onClick={() => onSelect(value)}
    >
      {label}
    </button>
  ));
}
