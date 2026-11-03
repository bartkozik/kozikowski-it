import { useId, useState } from 'react';

import { projects } from '@/core/content/projects';

import { cardPresets } from './card-presets';
import { isProjectVisible } from './project-filters';
import type { MoveDirection } from './board-layout';
import type { useProjectBoard } from './useProjectBoard';
import styles from './CardMoveControls.module.scss';

const directions = [
  { direction: 'left', symbol: '←' },
  { direction: 'up', symbol: '↑' },
  { direction: 'down', symbol: '↓' },
  { direction: 'right', symbol: '→' },
] satisfies readonly { direction: MoveDirection; symbol: string }[];

export function CardMoveControls({ board }: { readonly board: ReturnType<typeof useProjectBoard> }) {
  const selectId = useId();
  const [selectedSlug, setSelectedSlug] = useState<string>(projects[0].slug);
  const visibleProjects = projects.filter((project) => isProjectVisible(project.slug, board.arrangement));
  const selected = visibleProjects.find((project) => project.slug === selectedSlug) ?? visibleProjects[0];
  if (!selected) return null;
  const index = cardPresets.findIndex((preset) => preset.slug === selected.slug);

  return (
    <details className={styles.controls}>
      <summary>Move a card</summary>
      <div className={styles.panel}>
        <label htmlFor={selectId}>Project to move</label>
        <select
          id={selectId}
          value={selected.slug}
          onChange={(event) => {
            setSelectedSlug(event.currentTarget.value);
            board.bringToFront(cardPresets.findIndex((preset) => preset.slug === event.currentTarget.value));
          }}
        >
          {visibleProjects.map((project) => (
            <option key={project.slug} value={project.slug}>
              {project.name}
            </option>
          ))}
        </select>
        <div className={styles.directions} role="group" aria-label={`Move ${selected.name}`}>
          {directions.map(({ direction, symbol }) => (
            <button
              key={direction}
              type="button"
              aria-label={`Move ${selected.name} ${direction}`}
              onClick={() => board.nudgeCard(index, direction)}
            >
              <span aria-hidden="true">{symbol}</span>
            </button>
          ))}
        </div>
      </div>
    </details>
  );
}
