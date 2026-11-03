import { ArrowIcon } from '@/core/modules/Icons/ArrowIcon';
import { useEffect, useId, useRef, useState } from 'react';

import { projects } from '@/core/content/projects';

import { cardPresets } from './card-presets';
import { isProjectVisible } from './project-filters';
import type { MoveDirection } from './board-layout';
import type { useProjectBoard } from './useProjectBoard';
import styles from './CardMoveControls.module.scss';

const directions = ['left', 'up', 'down', 'right'] as const satisfies readonly MoveDirection[];

export function CardMoveControls({ board }: { readonly board: ReturnType<typeof useProjectBoard> }) {
  const selectId = useId();
  const disclosure = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);

  useEffect(() => {
    function dismiss(event: PointerEvent) {
      const panel = disclosure.current;
      if (panel?.open && event.target instanceof Node && !panel.contains(event.target)) panel.open = false;
    }
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, []);
  const [selectedSlug, setSelectedSlug] = useState<string>(projects[0].slug);
  const visibleProjects = projects.filter((project) => isProjectVisible(project.slug, board.visibleArrangement));
  const selected = visibleProjects.find((project) => project.slug === selectedSlug) ?? visibleProjects[0];
  if (!selected) return null;
  const index = cardPresets.findIndex((preset) => preset.slug === selected.slug);

  return (
    <details
      className={styles.controls}
      ref={disclosure}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && event.currentTarget.open) {
          event.preventDefault();
          event.currentTarget.open = false;
          trigger.current?.focus();
        }
      }}
    >
      <summary ref={trigger}>
        Move a card <ArrowIcon direction="down" size={16} />
      </summary>
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
          {directions.map((direction) => (
            <button
              key={direction}
              type="button"
              aria-label={`Move ${selected.name} ${direction}`}
              onClick={() => board.nudgeCard(index, direction)}
            >
              <ArrowIcon direction={direction} />
            </button>
          ))}
        </div>
      </div>
    </details>
  );
}
